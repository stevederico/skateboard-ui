#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, posix, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'router');
const [RR = '7.18.5', COOKIE = '1.1.1', SCP = '2.7.3'] = process.argv.slice(2);

const ALLOWED_BARE = new Set(['react', 'react-dom']);
const SHIMS = { cookie: 'vendor/cookie.mjs', 'set-cookie-parser': 'vendor/set-cookie-parser.mjs' };
const ENTRIES = ['index.mjs', 'dom-export.mjs', 'lib/types/internal.mjs'];
const MIN_AGE_DAYS = 7;

const npm = (args) => execFileSync('npm', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] }).trim();

function fetchPackage(name, version, into) {
  const raw = JSON.parse(npm(['view', name, 'time', '--json']));
  const time = Array.isArray(raw) ? raw[0] : raw;
  const published = new Date(time[version]);
  const ageDays = (Date.now() - published.getTime()) / 86_400_000;
  if (!(ageDays >= MIN_AGE_DAYS)) throw new Error(`${name}@${version} is ${ageDays.toFixed(1)} days old; the repo needs ${MIN_AGE_DAYS}+`);
  const tgz = npm(['pack', `${name}@${version}`, '--pack-destination', into, '--silent', '--ignore-scripts']).split('\n').pop();
  const dir = join(into, name);
  mkdirSync(dir, { recursive: true });
  execFileSync('tar', ['xzf', join(into, tgz), '-C', dir, '--strip-components=1']);
  return dir;
}

function satisfiesCaret(version, range) {
  const m = range.match(/^\^(\d+)\.(\d+)\.(\d+)$/);
  if (!m) throw new Error(`unsupported range ${range}; check it by hand`);
  const [a, b, c] = version.split('.').map(Number);
  const [x, y, z] = m.slice(1).map(Number);
  return a === x && (b > y || (b === y && c >= z));
}

function specifiers(code) {
  const out = [];
  for (const m of code.matchAll(/^(?:import|export)\b[^;]*?\bfrom\s*(['"])([^'"\n]+)\1/gm)) out.push(m[2]);
  for (const m of code.matchAll(/^import\s*(['"])([^'"\n]+)\1/gm)) out.push(m[2]);
  return out;
}

const tmp = mkdtempSync(join(tmpdir(), 'vendor-react-router-'));
try {
  const rrDir = fetchPackage('react-router', RR, tmp);
  const rrPkg = JSON.parse(readFileSync(join(rrDir, 'package.json'), 'utf8'));
  for (const [dep, version] of [['cookie', COOKIE], ['set-cookie-parser', SCP]]) {
    const range = rrPkg.dependencies?.[dep];
    if (!range || !satisfiesCaret(version, range)) throw new Error(`${dep}@${version} does not satisfy react-router ${RR} range ${range}`);
  }
  const extra = Object.keys(rrPkg.dependencies ?? {}).filter((d) => !(d in SHIMS));
  if (extra.length) throw new Error(`react-router ${RR} has new dependencies: ${extra.join(', ')}; vendor them first`);
  const cookieDir = fetchPackage('cookie', COOKIE, tmp);
  const scpDir = fetchPackage('set-cookie-parser', SCP, tmp);

  rmSync(OUT, { recursive: true, force: true });
  mkdirSync(join(OUT, 'vendor'), { recursive: true });

  const src = join(rrDir, 'dist', 'development');
  const queue = ENTRIES.flatMap((e) => [e, e.replace(/\.mjs$/, '.d.mts')]);
  const seen = new Set();
  while (queue.length) {
    const rel = queue.shift();
    if (seen.has(rel)) continue;
    seen.add(rel);
    let code = readFileSync(join(src, rel), 'utf8');
    for (const spec of specifiers(code)) {
      if (spec.startsWith('.')) {
        const target = posix.normalize(posix.join(posix.dirname(rel), spec));
        queue.push(rel.endsWith('.d.mts') ? target.replace(/\.mjs$/, '.d.mts') : target);
      } else if (spec in SHIMS) {
        const to = posix.relative(posix.dirname(rel), SHIMS[spec]);
        const re = new RegExp(`(^(?:import|export)\\b[^;]*?\\bfrom\\s*)(['"])${spec}\\2`, 'gm');
        code = code.replace(re, (_, head, q) => `${head}${q}${to.startsWith('.') ? to : `./${to}`}${q}`);
      } else if (!ALLOWED_BARE.has(spec)) {
        throw new Error(`${rel} imports "${spec}", which is neither a peer nor vendored`);
      }
    }
    mkdirSync(dirname(join(OUT, rel)), { recursive: true });
    writeFileSync(join(OUT, rel), code);
  }

  const shim = async (name, version, license, mainRel, typesRel) => {
    const file = join(name === 'cookie' ? cookieDir : scpDir, mainRel);
    const body = readFileSync(file, 'utf8').replace(/^\/\/# sourceMappingURL=.*$/m, '').trimEnd();
    const cjs = (await import(pathToFileURL(file).href)).default;
    const names = Object.keys(cjs).filter((k) => /^[A-Za-z_$][\w$]*$/.test(k) && k !== 'default' && k !== '__esModule');
    const exportsLines = names.map((k) => `export const ${k} = __cjs.${k};`).join('\n');
    const copyright = license.split('\n').filter((l) => /^Copyright/.test(l)).join('\n * ');
    const out = `/**
 * ${name} v${version} (MIT), vendored by scripts/vendor-react-router.js; do not edit.
 * ${copyright}
 * Full license: LICENSE-react-router at the package root.
 *
 * ESM wrapper around the unmodified CommonJS file ${mainRel}: the original body runs
 * inside a function with its own \`module\` and \`exports\`, then its exports are re-exported.
 */
const __module = { exports: {} };
(function (module, exports) {
${body}
})(__module, __module.exports);
const __cjs = __module.exports;
export default __cjs;
${exportsLines}
`;
    writeFileSync(join(OUT, 'vendor', `${name}.mjs`), out);
    if (typesRel) copyFileSync(join(name === 'cookie' ? cookieDir : scpDir, typesRel), join(OUT, 'vendor', `${name}.d.mts`));
  };
  const licenseOf = (dir) => readFileSync(join(dir, existsSync(join(dir, 'LICENSE')) ? 'LICENSE' : 'LICENSE.md'), 'utf8').trim();
  const cookiePkg = JSON.parse(readFileSync(join(cookieDir, 'package.json'), 'utf8'));
  const scpPkg = JSON.parse(readFileSync(join(scpDir, 'package.json'), 'utf8'));
  await shim('cookie', COOKIE, licenseOf(cookieDir), cookiePkg.main, cookiePkg.types);
  await shim('set-cookie-parser', SCP, licenseOf(scpDir), scpPkg.main, null);

  writeFileSync(
    join(root, 'LICENSE-react-router'),
    `skateboard-ui vendors react-router ${RR} into dist/router (generated by
scripts/vendor-react-router.js), with cookie ${COOKIE} and set-cookie-parser ${SCP},
which react-router imports. Their licenses follow.

========================================================================
react-router ${RR}
https://github.com/remix-run/react-router
========================================================================

${licenseOf(rrDir)}

========================================================================
cookie ${COOKIE}
https://github.com/jshttp/cookie
========================================================================

${licenseOf(cookieDir)}

========================================================================
set-cookie-parser ${SCP}
https://github.com/nfriedly/set-cookie-parser
========================================================================

${licenseOf(scpDir)}
`,
  );

  console.log(`vendor-react-router: react-router ${RR}, cookie ${COOKIE}, set-cookie-parser ${SCP}`);
  for (const f of [...seen].sort()) console.log(`  router/${f}`);
  console.log(`  router/vendor/cookie.mjs, cookie.d.mts, set-cookie-parser.mjs`);
  console.log(`  ${relative(root, join(root, 'LICENSE-react-router'))}`);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
