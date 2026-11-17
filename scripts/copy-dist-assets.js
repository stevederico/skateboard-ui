#!/usr/bin/env node
import { cpSync, copyFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const copies = [
  ['lib/tailwind-merge.js', false],
  ['lib/tailwind-merge.d.ts', false],
  ['router', true],
];

for (const [rel, isDir] of copies) {
  const src = join(root, rel);
  if (!existsSync(src)) {
    if (rel === 'router') throw new Error('copy-dist-assets: router/ is missing; run node scripts/vendor-react-router.js');
    console.warn(`copy-dist-assets: skipping missing ${rel}`);
    continue;
  }
  const dest = join(dist, rel);
  mkdirSync(dirname(dest), { recursive: true });
  if (isDir) cpSync(src, dest, { recursive: true });
  else copyFileSync(src, dest);
}

console.log('copy-dist-assets: done');
