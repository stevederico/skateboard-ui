#!/usr/bin/env node

/**
 * Vendor lucide-icons SVGs as React components.
 *
 * Clones lucide-icons/lucide at a pinned tag, reads every icons/*.svg,
 * generates one ./icons/<Name>.jsx per icon plus an index.js barrel.
 *
 * Re-run when you want to refresh the icon set against a newer lucide release.
 *
 * Usage: node scripts/vendor-icons.js
 */

import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync, readdirSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const LUCIDE_TAG = '1.14.0';
const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const ICONS_DIR = join(ROOT, 'icons');
const TMP_DIR = '/tmp/lucide-vendor';

function pascal(name) {
  return name.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
}

function camelAttrs(svg) {
  return svg.replace(/(\s)([a-z]+)-([a-z])/g, (_, ws, a, b) => `${ws}${a}${b.toUpperCase()}`);
}

function extractInner(svg) {
  const open = svg.indexOf('>');
  const close = svg.lastIndexOf('</svg>');
  return svg.slice(open + 1, close).trim();
}

function ensureLucide() {
  if (existsSync(join(TMP_DIR, 'icons'))) return;
  console.log(`Cloning lucide@${LUCIDE_TAG}...`);
  rmSync(TMP_DIR, { recursive: true, force: true });
  execSync(
    `git clone --depth 1 --branch ${LUCIDE_TAG} --single-branch https://github.com/lucide-icons/lucide.git ${TMP_DIR}`,
    { stdio: 'pipe' }
  );
}

function writeIconWrapper() {
  const code = `const Icon = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  className,
  children,
  ref,
  ...props
}) => (
  <svg
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {children}
  </svg>
);

export default Icon;
`;
  writeFileSync(join(ICONS_DIR, '_Icon.jsx'), code);
}

function generate() {
  ensureLucide();
  rmSync(ICONS_DIR, { recursive: true, force: true });
  mkdirSync(ICONS_DIR, { recursive: true });
  writeIconWrapper();

  const svgFiles = readdirSync(join(TMP_DIR, 'icons')).filter(f => f.endsWith('.svg')).sort();
  const exports = [];

  for (const file of svgFiles) {
    const name = file.replace(/\.svg$/, '');
    const componentName = pascal(name);
    const raw = readFileSync(join(TMP_DIR, 'icons', file), 'utf8');
    const inner = camelAttrs(extractInner(raw));

    const code = `import Icon from './_Icon.jsx';

const ${componentName} = (props) => (
  <Icon {...props}>
    ${inner.replace(/\n/g, '\n    ')}
  </Icon>
);

export default ${componentName};
`;
    writeFileSync(join(ICONS_DIR, `${componentName}.jsx`), code);
    exports.push(`export { default as ${componentName}, default as ${componentName}Icon } from './${componentName}.jsx';`);

    const metaPath = join(TMP_DIR, 'icons', `${name}.json`);
    if (existsSync(metaPath)) {
      const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
      for (const alias of meta.aliases || []) {
        const aliasName = pascal(alias.name);
        if (aliasName === componentName) continue;
        exports.push(`export { default as ${aliasName}, default as ${aliasName}Icon } from './${componentName}.jsx';`);
      }
    }
  }

  writeFileSync(join(ICONS_DIR, 'index.js'), exports.join('\n') + '\n');
  console.log(`Vendored ${svgFiles.length} icons → icons/`);
}

generate();
