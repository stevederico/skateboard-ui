#!/usr/bin/env node
// One-shot: turn a Tailwind stylesheet plus the sources that use it into plain, readable CSS.
//
// skateboard-ui and skateboard apps ship hand-edited plain CSS; nobody runs Tailwind. This
// script is how each CSS file was (or will be) produced once. It has no dependencies: Tailwind
// comes from a temporary install outside the repo, passed with --tailwind, and is never added
// to any package.json.
//
//   T=$(mktemp -d) && (cd "$T" && echo '{"private":true}' > package.json && \
//     npm i --no-audit --no-fund tailwindcss@4.3.3 @tailwindcss/node@4.3.3 @tailwindcss/oxide@4.3.3 \
//       @stevederico/skateboard-ui@5.17.0)
//   node scripts/tailwind-to-css.js --tailwind "$T" --input <tailwind css> --scan <dir|file> ... \
//     [--subtract <plain css> ...] [--app] --out <file>
//
//   --input     the Tailwind source stylesheet (`@import "tailwindcss"`, `@theme`, `@apply`, ...).
//               `@import "@stevederico/skateboard-ui/styles.css"` resolves to the Tailwind source
//               of skateboard-ui 5.17.0 from the temporary install (the last release that shipped
//               Tailwind source), so app utilities see the shell's theme and variants.
//   --scan      files or directories whose class names to cover (repeatable). Nothing else is
//               scanned: `@source` lines are ignored.
//   --subtract  plain CSS already loaded before the output (repeatable): every rule, declaration,
//               @font-face, @keyframes and @property it already has is left out of the output.
//               Apps pass node_modules/@stevederico/skateboard-ui/styles.css.
//   --app       also copy the input's own `@theme` declarations into a plain `:root` block, so
//               the app keeps its theme values (brand color, fonts) without Tailwind.
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { basename, dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// ---- args ----
const opts = { scan: [], subtract: [], app: false };
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--tailwind') opts.tailwind = resolve(argv[++i]);
  else if (a === '--input') opts.input = resolve(argv[++i]);
  else if (a === '--scan') opts.scan.push(resolve(argv[++i]));
  else if (a === '--subtract') opts.subtract.push(resolve(argv[++i]));
  else if (a === '--out') opts.out = resolve(argv[++i]);
  else if (a === '--app') opts.app = true;
  else throw new Error(`unknown argument ${a}`);
}
for (const k of ['tailwind', 'input', 'out']) if (!opts[k]) throw new Error(`--${k} is required`);
if (!opts.scan.length) throw new Error('at least one --scan is required');

const req = createRequire(join(opts.tailwind, 'package.json'));
const { compile, optimize } = await import(pathToFileURL(req.resolve('@tailwindcss/node')).href);
const { Scanner } = req('@tailwindcss/oxide');
const twVersion = JSON.parse(readFileSync(req.resolve('tailwindcss/package.json'), 'utf8')).version;
const uiSource = join(opts.tailwind, 'node_modules', '@stevederico', 'skateboard-ui', 'styles.css');

// ---- minimal CSS tree: blocks ({ prelude, children }) and statements (text) ----
/**
 * Parse CSS into nested nodes. Comments are dropped; strings are respected.
 *
 * @param {string} css - Stylesheet text
 * @returns {Array<{ kind: 'stmt', text: string } | { kind: 'block', prelude: string, children: any[] }>} Nodes
 */
export function parse(css) {
  let i = 0;
  const read = () => {
    const nodes = [];
    let buf = '';
    while (i < css.length) {
      const c = css[i];
      if (c === '\\') {
        // Escaped character (class names such as `.\[class\*\=\'size-\'\]`): copy verbatim.
        buf += css.slice(i, i + 2);
        i += 2;
      } else if (c === '/' && css[i + 1] === '*') {
        const end = css.indexOf('*/', i + 2);
        i = end === -1 ? css.length : end + 2;
      } else if (c === '"' || c === "'") {
        let j = i + 1;
        while (j < css.length && css[j] !== c) j += css[j] === '\\' ? 2 : 1;
        buf += css.slice(i, j + 1);
        i = j + 1;
      } else if (c === '{') {
        i++;
        nodes.push({ kind: 'block', prelude: buf.trim().replace(/\s+/g, ' '), children: read() });
        buf = '';
      } else if (c === '}') {
        i++;
        if (buf.trim()) nodes.push({ kind: 'stmt', text: buf.trim().replace(/\s+/g, ' ') });
        return nodes;
      } else if (c === ';') {
        i++;
        if (buf.trim()) nodes.push({ kind: 'stmt', text: buf.trim().replace(/\s+/g, ' ') });
        buf = '';
      } else {
        buf += c;
        i++;
      }
    }
    if (buf.trim()) nodes.push({ kind: 'stmt', text: buf.trim().replace(/\s+/g, ' ') });
    return nodes;
  };
  return read();
}

/**
 * Serialize nodes as readable CSS (2-space indent, a blank line between blocks).
 *
 * @param {any[]} nodes - Parsed nodes
 * @param {string} [indent] - Current indentation
 * @returns {string} CSS text
 */
export function print(nodes, indent = '') {
  const out = [];
  let prevBlock = false;
  for (const n of nodes) {
    if (n.kind === 'stmt') {
      out.push(`${indent}${n.text};`);
      prevBlock = false;
    } else {
      if (prevBlock || out.length) out.push('');
      out.push(`${indent}${n.prelude} {`, print(n.children, `${indent}  `), `${indent}}`);
      prevBlock = true;
    }
  }
  return out.filter((l, k) => !(l === '' && out[k - 1] === '')).join('\n').replace(/\{\n\n/g, '{\n');
}

const fontFamily = (n) => n.children.find((c) => c.kind === 'stmt' && /^font-family\s*:/.test(c.text))?.text.replace(/\s+/g, '');

/**
 * Index a plain stylesheet: statements per block path, plus @font-face families and the
 * names of @keyframes / @property blocks.
 *
 * @param {any[]} nodes - Parsed nodes
 * @returns {{ stmts: Map<string, Set<string>>, fonts: Set<string>, named: Set<string> }} Index
 */
function index(nodes) {
  const idx = { stmts: new Map(), fonts: new Set(), named: new Set() };
  const walk = (list, path) => {
    for (const n of list) {
      if (n.kind === 'stmt') {
        if (!idx.stmts.has(path)) idx.stmts.set(path, new Set());
        idx.stmts.get(path).add(n.text);
      } else if (n.prelude.startsWith('@font-face')) idx.fonts.add(fontFamily(n));
      else if (/^@(keyframes|property)\b/.test(n.prelude)) idx.named.add(n.prelude);
      else walk(n.children, `${path}>${n.prelude}`);
    }
  };
  walk(nodes, '');
  return idx;
}

/**
 * Remove everything the index already has; drop blocks left empty.
 *
 * @param {any[]} nodes - Nodes to prune
 * @param {ReturnType<typeof index>} idx - What is already loaded
 * @param {string} [path] - Block path
 * @returns {any[]} Remaining nodes
 */
function subtract(nodes, idx, path = '') {
  const out = [];
  for (const n of nodes) {
    if (n.kind === 'stmt') {
      if (!idx.stmts.get(path)?.has(n.text)) out.push(n);
    } else if (n.prelude.startsWith('@font-face')) {
      if (!idx.fonts.has(fontFamily(n))) out.push(n);
    } else if (/^@(keyframes|property)\b/.test(n.prelude)) {
      if (!idx.named.has(n.prelude)) out.push(n);
    } else {
      const children = subtract(n.children, idx, `${path}>${n.prelude}`);
      if (children.length) out.push({ ...n, children });
    }
  }
  return out;
}

// ---- input ----
let input = readFileSync(opts.input, 'utf8');
input = input.replace(/@import\s+(?:url\()?["']@stevederico\/skateboard-ui\/styles\.css["']\)?\s*;/g, () => {
  if (!existsSync(uiSource)) throw new Error(`--tailwind ${opts.tailwind} has no @stevederico/skateboard-ui (install 5.17.0 there)`);
  return `@import "${uiSource}";`;
});
input = input.replace(/@source\s+[^;]+;/g, '');
if (opts.app) {
  const decls = [];
  for (const m of input.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/@theme\b[^{]*\{([^}]*)\}/g)) {
    for (const d of m[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) if (!d[1].includes('*')) decls.push(`  ${d[1]}: ${d[2].trim()};`);
  }
  if (decls.length) input += `\n:root {\n${decls.join('\n')}\n}\n`;
}

const compiler = await compile(input, {
  base: dirname(opts.input),
  from: opts.input,
  shouldRewriteUrls: false,
  onDependency: () => {},
  customCssResolver: async (id) => (id === 'tailwindcss' || id.startsWith('tailwindcss/') ? req.resolve(id === 'tailwindcss' ? 'tailwindcss/index.css' : id) : undefined),
});
const sources = opts.scan.map((p) =>
  statSync(p).isDirectory() ? { base: p, pattern: '**/*', negated: false } : { base: dirname(p), pattern: basename(p), negated: false },
);
const candidates = new Scanner({ sources }).scan();
let nodes = parse(optimize(compiler.build(candidates), { minify: false }).code);
for (const file of opts.subtract) nodes = subtract(nodes, index(parse(readFileSync(file, 'utf8'))));

const css = `${print(nodes)}\n`;
writeFileSync(opts.out, css);
const classes = new Set();
for (const m of css.matchAll(/(?:^|[\s,>+~(])\.((?:[\w-]|\\.)+)/gm)) classes.add(m[1].replace(/\\(.)/g, '$1'));
console.log(`tailwind-to-css: Tailwind ${twVersion}, ${candidates.length} candidates, ${classes.size} classes, ${css.length} bytes -> ${opts.out}`);
