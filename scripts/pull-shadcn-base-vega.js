#!/usr/bin/env node
// One-shot: pull official shadcn Base UI (base-vega style) TSX components and
// rewire their imports to this package's vendored layout. Writes to a staging
// dir + a deviation ledger (normalized diff vs the current shadcn/ui files) —
// it does NOT overwrite shadcn/ui/ itself; adoption is a reviewed copy.
//
// Usage: node scripts/pull-shadcn-base-vega.js [staging-dir]
// Registry: https://ui.shadcn.com/r/styles/base-vega/<name>.json (fetched 2026-06)
import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import ts from 'typescript';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const STAGING = process.argv[2] || '/tmp/base-vega-staging';
const REGISTRY = 'https://ui.shadcn.com/r/styles/base-vega';

// Groups A (primitive-backed) + B (useRender composites) + C (CSS-only).
// Excluded (hand-converted in place, no usable upstream): button, drawer, calendar, command.
const NAMES = [
  // A
  'accordion', 'alert-dialog', 'avatar', 'checkbox', 'collapsible', 'context-menu',
  'dialog', 'dropdown-menu', 'hover-card', 'input', 'menubar', 'navigation-menu',
  'popover', 'progress', 'radio-group', 'scroll-area', 'select', 'separator',
  'sheet', 'slider', 'switch', 'tabs', 'toggle', 'toggle-group', 'tooltip',
  // B
  'item', 'button-group', 'sidebar',
  // C
  'alert', 'aspect-ratio', 'badge', 'breadcrumb', 'card', 'empty', 'field',
  'input-group', 'kbd', 'label', 'pagination', 'skeleton', 'spinner', 'table', 'textarea',
];

function rewrite(src) {
  let out = src;

  // IconPlaceholder JSX -> vendored lucide icon, collecting names for the import.
  const iconNames = new Set();
  out = out.replace(/<IconPlaceholder\b([\s\S]*?)\/>/g, (m, attrs) => {
    const lucide = attrs.match(/lucide="([^"]+)"/);
    if (!lucide) throw new Error('IconPlaceholder without lucide attr');
    iconNames.add(lucide[1]);
    return `<${lucide[1]} />`;
  });
  out = out.replace(
    /import \{ IconPlaceholder \} from "@\/app\/\(create\)\/components\/icon-placeholder"\n?/,
    iconNames.size ? `import { ${[...iconNames].join(', ')} } from "../../icons/index.js"\n` : ''
  );

  // Package + registry-alias imports -> vendored relative paths.
  out = out
    .replace(/"@base-ui\/react\/([a-z-]+)"/g, '"../lib/base-ui/$1.js"')
    .replace(/"class-variance-authority"/g, '"../lib/cva.js"')
    .replace(/"@\/registry\/base-vega\/lib\/utils"/g, '"../lib/utils.js"')
    .replace(/"@\/registry\/base-vega\/ui\/([a-z-]+)"/g, '"./$1.js"')
    .replace(/"@\/registry\/base-vega\/hooks\/use-mobile"/g, '"../hooks/use-mobile.js"')
    .replace(/"@\/hooks\/use-mobile"/g, '"../hooks/use-mobile.js"');

  const leftover = out.match(/from "(@[^"]+|[a-z][^."]*)"/g)?.filter(s => !s.includes('react'));
  if (leftover?.length) throw new Error(`unrewritten imports: ${leftover.join(', ')}`);
  return out;
}

// Strip types (keep JSX) so pulled TSX can be diffed against the current JSX.
function normalize(src) {
  const js = ts.transpileModule(src, {
    compilerOptions: { target: ts.ScriptTarget.ESNext, jsx: ts.JsxEmit.Preserve, module: ts.ModuleKind.ESNext },
  }).outputText;
  return js
    .replace(/^"use client";?\n?/m, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '')
    .split('\n').map(l => l.trim()).filter(Boolean).join('\n');
}

mkdirSync(join(STAGING, 'ledger'), { recursive: true });
const summary = [];
for (const name of NAMES) {
  let json;
  try {
    json = JSON.parse(execFileSync('curl', ['-sf', `${REGISTRY}/${name}.json`], { maxBuffer: 16 * 1024 * 1024 }));
  } catch {
    summary.push(`${name}: FETCH FAILED`);
    continue;
  }
  if (json.files.length !== 1) summary.push(`${name}: NOTE ${json.files.length} files (${json.files.map(f => f.path).join(', ')}) — using ui/*.tsx only`);
  const file = json.files.find(f => f.path.endsWith(`ui/${name}.tsx`)) || json.files[0];
  let tsx;
  try {
    tsx = rewrite(file.content);
  } catch (e) {
    summary.push(`${name}: REWRITE FAILED — ${e.message}`);
    continue;
  }
  writeFileSync(join(STAGING, `${name}.tsx`), tsx);

  const oldPath = join(ROOT, 'shadcn/ui', `${name}.jsx`);
  if (existsSync(oldPath)) {
    writeFileSync(join(STAGING, 'ledger', `${name}.new.js`), normalize(tsx));
    writeFileSync(join(STAGING, 'ledger', `${name}.old.js`), normalize(readFileSync(oldPath, 'utf8')));
  } else {
    summary.push(`${name}: no existing .jsx counterpart`);
  }
  summary.push(`${name}: ok`);
}
console.log(summary.join('\n'));
console.log(`\nstaged in ${STAGING} — diff ledger pairs with: for f in ${STAGING}/ledger/*.old.js; do diff -u "$f" "\${f%.old.js}.new.js"; done`);
