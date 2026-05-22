#!/usr/bin/env node

/**
 * Vendor tailwind-merge as a single ESM file.
 *
 * Fetches the prebuilt ESM bundle from the npm registry at a pinned version
 * and writes it to ./shadcn/lib/tailwind-merge.js with attribution.
 *
 * Re-run when bumping the pinned version to track a new Tailwind release.
 *
 * Usage: node scripts/vendor-tailwind-merge.js
 */

import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const TM_VERSION = '3.5.0';
const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const OUT_FILE = join(ROOT, 'shadcn/lib/tailwind-merge.js');
const TMP_DIR = '/tmp/tailwind-merge-vendor';

function fetchTarball() {
  if (existsSync(TMP_DIR)) rmSync(TMP_DIR, { recursive: true, force: true });
  mkdirSync(TMP_DIR, { recursive: true });
  const url = `https://registry.npmjs.org/tailwind-merge/-/tailwind-merge-${TM_VERSION}.tgz`;
  console.log(`Fetching tailwind-merge@${TM_VERSION}...`);
  execSync(`curl -sL "${url}" | tar -xz -C "${TMP_DIR}"`, { stdio: 'inherit' });
}

function vendor() {
  fetchTarball();
  const bundle = readFileSync(join(TMP_DIR, 'package/dist/bundle-mjs.mjs'), 'utf8');
  const license = readFileSync(join(TMP_DIR, 'package/LICENSE.md'), 'utf8').trim();
  const header = `/**
 * Vendored from tailwind-merge v${TM_VERSION}
 * https://github.com/dcastil/tailwind-merge
 *
 * Re-vendor with: node scripts/vendor-tailwind-merge.js
 *
 * ---
${license.split('\n').map(l => ` * ${l}`.trimEnd()).join('\n')}
 */

`;
  writeFileSync(OUT_FILE, header + bundle);
  console.log(`Wrote ${OUT_FILE} (${(bundle.length / 1024).toFixed(1)} KB)`);
  rmSync(TMP_DIR, { recursive: true, force: true });
}

vendor();
