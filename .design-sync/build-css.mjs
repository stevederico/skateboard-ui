#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dsDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dsDir, '..');
const cacheDir = path.join(dsDir, '.cache');
fs.mkdirSync(cacheDir, { recursive: true });

const baseCss = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const brutalist = fs.readFileSync(path.join(dsDir, 'brutalist-theme.css'), 'utf8');

const rewrittenBase = baseCss.replace(/@source\s+['"][^'"]+['"]\s*;/g, `@source "${root}";`);

const input = `${rewrittenBase}\n\n${brutalist}\n`;
const inputPath = path.join(root, '.ds-sync', '_tw-input.css');
fs.writeFileSync(inputPath, input);

const outPath = path.join(cacheDir, 'compiled-styles.css');
const bin = path.join(dsDir, '..', '.ds-sync', 'node_modules', '.bin', 'tailwindcss');

console.error('[build-css] compiling Tailwind v4 + brutalist layer …');
execFileSync(bin, ['-i', inputPath, '-o', outPath, '--optimize'], {
  cwd: root,
  stdio: ['ignore', 'inherit', 'inherit'],
});

let out = fs.readFileSync(outPath, 'utf8');
out = out.replace(/url\(\s*['"]?\.\/fonts\/([^'")]+)['"]?\)/g, "url('../../fonts/$1')");
fs.writeFileSync(outPath, out);

const kb = (fs.statSync(outPath).size / 1024).toFixed(0);
console.error(`[build-css] wrote ${path.relative(root, outPath)} (${kb} KB)`);
