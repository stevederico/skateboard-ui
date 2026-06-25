#!/usr/bin/env node
// Compile skateboard-ui's Tailwind v4 source CSS + the brutalist theme layer into
// a single plain stylesheet that design-sync uses as cfg.cssEntry.
//
// Why this exists: skateboard-ui ships styles.css as Tailwind v4 SOURCE
// (@import "tailwindcss", @theme, @apply, @custom-variant). That is not valid
// plain CSS — browsers can't parse it, so designs would render unstyled. We run
// the Tailwind compiler over the component source to emit the real utility CSS,
// then append the brutalist token/utility layer (brutalist-theme.css).
//
// Output: .design-sync/.cache/compiled-styles.css (gitignored; regenerated each build).
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dsDir = path.dirname(fileURLToPath(import.meta.url));      // .design-sync
const root = path.resolve(dsDir, '..');                         // skateboard-ui root
const cacheDir = path.join(dsDir, '.cache');
fs.mkdirSync(cacheDir, { recursive: true });

const baseCss = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const brutalist = fs.readFileSync(path.join(dsDir, 'brutalist-theme.css'), 'utf8');

// Replace the package's broad `@source '../'` (scans every sibling repo) with a
// scan of skateboard-ui's own source only — Tailwind v4 auto-ignores gitignored
// paths (node_modules, dist) so this picks up components/, ui/, shadcn/, App.tsx.
const rewrittenBase = baseCss.replace(/@source\s+['"][^'"]+['"]\s*;/g, `@source "${root}";`);

const input = `${rewrittenBase}\n\n${brutalist}\n`;
// Write the input next to .ds-sync/node_modules so `@import "tailwindcss"` resolves.
const inputPath = path.join(root, '.ds-sync', '_tw-input.css');
fs.writeFileSync(inputPath, input);

const outPath = path.join(cacheDir, 'compiled-styles.css');
const bin = path.join(dsDir, '..', '.ds-sync', 'node_modules', '.bin', 'tailwindcss');

console.error('[build-css] compiling Tailwind v4 + brutalist layer …');
execFileSync(bin, ['-i', inputPath, '-o', outPath, '--optimize'], {
  cwd: root,
  stdio: ['ignore', 'inherit', 'inherit'],
});

// Fonts ship in skateboard-ui/fonts/. The @font-face url()s are `./fonts/...`,
// relative to the original styles.css at repo root. The compiled file lives in
// .design-sync/.cache/, so rewrite those to resolve from there (../../fonts/).
let out = fs.readFileSync(outPath, 'utf8');
out = out.replace(/url\(\s*['"]?\.\/fonts\/([^'")]+)['"]?\)/g, "url('../../fonts/$1')");
fs.writeFileSync(outPath, out);

const kb = (fs.statSync(outPath).size / 1024).toFixed(0);
console.error(`[build-css] wrote ${path.relative(root, outPath)} (${kb} KB)`);
