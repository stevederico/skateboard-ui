#!/usr/bin/env node
// Copies non-compiled assets into dist/ after tsc:
// - shadcn/lib/tailwind-merge.js (+ .d.ts)  — vendored prebuilt ESM, excluded from tsc
// - icons/LICENSE (lucide)
import { cpSync, copyFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const copies = [
  ['shadcn/lib/tailwind-merge.js', false],
  ['shadcn/lib/tailwind-merge.d.ts', false],
  ['icons/LICENSE', false],
];

for (const [rel, isDir] of copies) {
  const src = join(root, rel);
  if (!existsSync(src)) {
    console.warn(`copy-dist-assets: skipping missing ${rel}`);
    continue;
  }
  const dest = join(dist, rel);
  mkdirSync(dirname(dest), { recursive: true });
  if (isDir) cpSync(src, dest, { recursive: true });
  else copyFileSync(src, dest);
}

console.log('copy-dist-assets: done');
