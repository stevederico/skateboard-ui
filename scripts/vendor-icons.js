#!/usr/bin/env node

/**
 * Generate thin lucide-react re-exports under ./icons/.
 *
 * Replaces SVG vendoring: icons live in the lucide-react peer once. This
 * package ships default-export shims so
 * `@stevederico/skateboard-ui/icons/Plus` and the named barrel keep working.
 *
 * On case-insensitive filesystems (macOS default), lucide aliases that differ
 * only by casing share one file; the alias is re-exported from the barrel.
 *
 * Usage: node scripts/vendor-icons.js
 */

import { mkdirSync, writeFileSync, readdirSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const ICONS_DIR = join(ROOT, 'icons');
const require = createRequire(import.meta.url);

/**
 * Discover PascalCase icon component names exported by lucide-react.
 *
 * @returns {Promise<string[]>}
 */
async function listLucideIcons() {
  const pkgPath = require.resolve('lucide-react/package.json');
  const { readFileSync } = await import('node:fs');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  const entry = pkg.module || pkg.main || 'dist/esm/lucide-react.js';
  const mod = await import(pathToFileURL(join(dirname(pkgPath), entry)).href);
  return Object.keys(mod)
    .filter((name) => {
      if (name === 'default' || name === 'icons' || name === 'createLucideIcon') return false;
      if (name.endsWith('Icon')) return false;
      // lucide also re-exports every icon as LucideFoo — skip the duplicate set.
      if (name.startsWith('Lucide')) return false;
      const value = mod[name];
      return typeof value === 'function' || typeof value?.render === 'function';
    })
    .sort();
}

/**
 * @param {string} name
 * @returns {string}
 */
function iconModuleSource(name) {
  return `export { ${name} as default, ${name}, ${name} as ${name}Icon } from 'lucide-react';\n`;
}

async function main() {
  const names = await listLucideIcons();
  if (names.length < 100) {
    throw new Error(`expected hundreds of lucide icons, got ${names.length}`);
  }

  if (existsSync(ICONS_DIR)) {
    for (const file of readdirSync(ICONS_DIR)) {
      if (file === 'LICENSE') continue;
      rmSync(join(ICONS_DIR, file), { recursive: true, force: true });
    }
  } else {
    mkdirSync(ICONS_DIR, { recursive: true });
  }

  writeFileSync(
    join(ICONS_DIR, '_Icon.tsx'),
    `export type { LucideProps as IconProps } from 'lucide-react';\n`,
  );

  /** @type {Map<string, string>} lowercase path -> canonical export name */
  const fileFor = new Map();
  /** @type {string[]} aliases that share a file with a differently-cased name */
  const caseAliases = [];

  for (const name of names) {
    const key = name.toLowerCase();
    if (fileFor.has(key)) {
      caseAliases.push(name);
      continue;
    }
    fileFor.set(key, name);
    writeFileSync(join(ICONS_DIR, `${name}.tsx`), iconModuleSource(name));
  }

  const canonical = [...fileFor.values()].sort();
  const barrelLines = [
    `export type { LucideProps as IconProps } from 'lucide-react';`,
    ...canonical.map(
      (name) =>
        `export { default as ${name}, default as ${name}Icon } from './${name}.js';`,
    ),
  ];
  for (const alias of caseAliases.sort()) {
    const canonicalName = fileFor.get(alias.toLowerCase());
    barrelLines.push(
      `export { default as ${alias}, default as ${alias}Icon } from './${canonicalName}.js';`,
    );
  }
  barrelLines.push('');
  writeFileSync(join(ICONS_DIR, 'index.ts'), barrelLines.join('\n'));

  console.log(
    `Wrote ${canonical.length} icon files + ${caseAliases.length} case aliases (${names.length} exports)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
