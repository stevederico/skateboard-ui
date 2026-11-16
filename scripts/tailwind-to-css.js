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
//               the app keeps its theme values (brand color, fonts) without Tailwind, and keep
//               the input's `@import "@stevederico/skateboard-ui/styles.css"` as the first line.
//
// Splitting Tailwind's output into two files changes the cascade: an app rule that Tailwind
// ordered before a shell rule now comes after it and wins (an app `line-clamp-1` beating the
// shell's `flex` on `display`). With --subtract, a subtracted rule is therefore written again
// after the app rules when it sets the same property family as an app rule, Tailwind ordered it
// later, and both classes appear in the same string literal or line of a scanned file (or of the
// installed skateboard-ui dist). Compare light and dark screenshots before and after anyway.
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
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

// Build the app's classes together with every class the --subtract files define, so the
// output has Tailwind's single global utility order across both files.
const subtractTexts = opts.subtract.map((file) => readFileSync(file, 'utf8'));
const subtractClasses = new Set();
for (const text of subtractTexts) for (const c of classNames(text)) subtractClasses.add(c);
let nodes = parse(optimize(compiler.build([...new Set([...candidates, ...subtractClasses])]), { minify: false }).code);

if (subtractTexts.length) {
  const idx = index(subtractTexts.flatMap((t) => parse(t)));
  // Class strings: the scanned app sources plus the shell's own components (the published
  // 5.17.0 dist from the temporary install), for which classes share an element.
  const uiDist = join(opts.tailwind, 'node_modules', '@stevederico', 'skateboard-ui', 'dist');
  nodes = keepPrecedence(nodes, idx, cooccurrence([...opts.scan, ...(existsSync(uiDist) ? [uiDist] : [])]));
}

/**
 * Which class tokens can share an element: tokens in the same string literal or on the
 * same source line. Over-approximates (safe: it only re-emits more rules).
 *
 * @param {string[]} paths - Files or directories to read (.ts/.tsx/.js/.jsx/.html/.mjs)
 * @returns {Map<string, Set<string>>} token -> tokens seen with it
 */
function cooccurrence(paths) {
  const map = new Map();
  const add = (tokens) => {
    for (const t of tokens) {
      if (!map.has(t)) map.set(t, new Set());
      for (const o of tokens) if (o !== t) map.get(t).add(o);
    }
  };
  const files = [];
  const walk = (p) => {
    if (statSync(p).isDirectory()) {
      for (const e of readdirSync(p)) if (e !== 'node_modules' && !e.startsWith('.')) walk(join(p, e));
    } else if (/\.(?:[cm]?[jt]sx?|html)$/.test(p)) files.push(p);
  };
  paths.forEach(walk);
  for (const f of files) {
    const text = readFileSync(f, 'utf8');
    for (const m of text.matchAll(/"([^"\n]*)"|'([^'\n]*)'|`([^`]*)`/g)) add((m[1] ?? m[2] ?? m[3]).split(/\s+/).filter(Boolean));
    for (const line of text.split('\n')) {
      const tokens = [];
      for (const m of line.matchAll(/"([^"]*)"|'([^']*)'|`([^`]*)`/g)) tokens.push(...(m[1] ?? m[2] ?? m[3]).split(/\s+/).filter(Boolean));
      add(tokens);
    }
  }
  return map;
}

/**
 * Class names a stylesheet defines (unescaped `.name` selectors in rule preludes).
 *
 * @param {string} text - Plain CSS
 * @returns {Set<string>} Class names
 */
function classNames(text) {
  const out = new Set();
  const walk = (list) => {
    for (const n of list) {
      if (n.kind !== 'block') continue;
      if (!n.prelude.startsWith('@')) {
        for (const m of n.prelude.matchAll(/\.(-?(?:[A-Za-z_]|\\.)(?:[\w-]|\\.)*)/g)) out.add(m[1].replace(/\\(.)/g, '$1'));
      }
      walk(n.children);
    }
  };
  walk(parse(text));
  return out;
}

/**
 * Property families a rule sets: longhands and shorthands of one property share a family
 * (padding / padding-inline, gap / row-gap, inset / top), vendor prefixes are dropped, and
 * every custom property is its own family. Over-grouping is safe (it only re-emits more).
 *
 * @param {any[]} children - Statements of one style rule
 * @returns {Set<string>} Families
 */
function families(children) {
  const ALIAS = { top: 'inset', right: 'inset', bottom: 'inset', left: 'inset', 'row-gap': 'gap', 'column-gap': 'gap' };
  const out = new Set();
  for (const c of children) {
    if (c.kind !== 'stmt') continue;
    const prop = c.text.split(':')[0].trim();
    if (prop.startsWith('--')) out.add(prop);
    else {
      const bare = prop.replace(/^-(?:webkit|moz|ms)-/, '');
      out.add(ALIAS[bare] ?? bare.split('-')[0]);
    }
  }
  return out;
}

/**
 * Subtract what the earlier stylesheet(s) already define, but keep Tailwind's precedence.
 * In the single Tailwind build a later utility beats an earlier one on the same property.
 * Split into two files, an app rule that Tailwind ordered BEFORE a shell rule now comes
 * after it and wins instead (`line-clamp-1` vs `flex` on `display`). So every shell rule
 * that shares a property family with an emitted rule and is ordered after it is emitted
 * again after it when the two classes can share an element (same class string or line),
 * repeated until nothing changes. Base, theme and the rest subtract as usual.
 *
 * @param {any[]} tree - Full build (app + shell classes)
 * @param {ReturnType<typeof index>} idx - Index of the earlier stylesheet(s)
 * @param {Map<string, Set<string>>} cooc - Which class tokens can share an element
 * @returns {any[]} Nodes for the app's file
 */
function keepPrecedence(tree, idx, cooc) {
  const entries = [];
  const collect = (list, path) => {
    for (const n of list) {
      if (n.kind !== 'block' || /^@(keyframes|property|font-face)\b/.test(n.prelude)) continue;
      const stmts = n.children.filter((c) => c.kind === 'stmt');
      const nested = n.children.filter((c) => c.kind === 'block');
      if (stmts.length && !n.prelude.startsWith('@')) {
        const known = idx.stmts.get(`${path}>${n.prelude}`);
        const cls = [...n.prelude.matchAll(/\.(-?(?:[A-Za-z_]|\\.)(?:[\w-]|\\.)*)/g)].map((m) => m[1].replace(/\\(.)/g, '$1'));
        entries.push({ node: n, shell: Boolean(known) && stmts.every((s) => known.has(s.text)), fam: families(stmts), cls });
      }
      collect(nested, `${path}>${n.prelude}`);
    }
  };
  const layer = tree.find((n) => n.kind === 'block' && n.prelude === '@layer utilities');
  if (layer) collect(layer.children, '>@layer utilities');
  const keep = new Set(entries.filter((e) => !e.shell).map((e) => e.node));
  let changed = true;
  while (changed) {
    changed = false;
    entries.forEach((a, i) => {
      if (!keep.has(a.node)) return;
      for (let j = i + 1; j < entries.length; j++) {
        const u = entries[j];
        if (keep.has(u.node) || !u.shell) continue;
        const together = a.cls.some((x) => u.cls.some((y) => cooc.get(x)?.has(y)));
        if (together && [...u.fam].some((f) => a.fam.has(f))) {
          keep.add(u.node);
          changed = true;
        }
      }
    });
  }
  const filterLayer = (list) => {
    const out = [];
    for (const n of list) {
      if (n.kind === 'stmt') continue;
      if (keep.has(n)) {
        out.push({ ...n, children: n.children.filter((c) => c.kind === 'stmt').concat(filterLayer(n.children.filter((c) => c.kind === 'block'))) });
        continue;
      }
      if (/^@(keyframes|property|font-face)\b/.test(n.prelude)) continue;
      const children = filterLayer(n.children);
      if (children.length) out.push({ ...n, children });
    }
    return out;
  };
  return tree.flatMap((n) => {
    if (n === layer) {
      const children = filterLayer(n.children);
      return children.length ? [{ ...n, children }] : [];
    }
    return subtract([n], idx);
  });
}

const keepImport = opts.app && /@import\s+(?:url\()?["']@stevederico\/skateboard-ui\/styles\.css["']/.test(readFileSync(opts.input, 'utf8'));
const css = `${keepImport ? '@import "@stevederico/skateboard-ui/styles.css";\n\n' : ''}${print(nodes)}\n`;
writeFileSync(opts.out, css);
const classes = new Set();
for (const m of css.matchAll(/(?:^|[\s,>+~(])\.((?:[\w-]|\\.)+)/gm)) classes.add(m[1].replace(/\\(.)/g, '$1'));
console.log(`tailwind-to-css: Tailwind ${twVersion}, ${candidates.length} candidates, ${classes.size} classes, ${css.length} bytes -> ${opts.out}`);
