import { moduleSourceVisitors, packageName } from '../lib/moduleSources.js';
import { repoRelative, specifierTo } from '../lib/paths.js';
import { LIBRARY_LAYERS, layerOf } from '../layers.js';

/** The vendored router entry, as library code spells it (repo-relative). */
export const ROUTER_MODULE = 'router/index.mjs';

/** The public entry apps import. */
export const PUBLIC_ROUTER = '@stevederico/skateboard-ui/router';

/** Router distributions that would load a second router next to the vendored one. */
const ROUTER_PACKAGES = new Set(['react-router', 'react-router-dom', '@remix-run/router']);

/**
 * True for any react-router package specifier, including subpaths (`react-router/dom`)
 * and the `@react-router/*` scope.
 *
 * @param {string} source - Import specifier
 * @returns {boolean} Whether the specifier names a react-router package
 */
export const isReactRouter = (source) => ROUTER_PACKAGES.has(packageName(source)) || source.startsWith('@react-router/');

/**
 * The vendored file matching a react-router subpath.
 *
 * @param {string} source - Import specifier such as `react-router/dom`
 * @returns {string} Repo-relative vendored module
 */
function vendoredFor(source) {
  return /^react-router(?:-dom)?\/dom$/.test(source) ? 'router/dom-export.mjs' : ROUTER_MODULE;
}

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        "Never import 'react-router' (or react-router-dom, @react-router/*). skateboard-ui vendors react-router into router/ and ships exactly one copy: library code imports router/index.mjs by relative path, apps import '@stevederico/skateboard-ui/router'.",
      source: 'AGENTS.md > Dependencies and imports; CHANGELOG.md 5.16.0',
    },
    schema: [],
    messages: {
      library:
        'Found an import of "{{source}}". Why: since 5.16.0 react-router is vendored into router/ (scripts/vendor-react-router.js) and is no longer a peer, so it is not in a consumer\'s node_modules; where an app still has it, this import loads a second router whose context the shell\'s Outlet, useNavigate and useSafeNavigate cannot see (hooks throw or fall back to full page loads). ' +
        'Fix: import the same names from the vendored copy: `import { ... } from "{{module}}";`.',
      outside:
        'Found an import of "{{source}}" in non-library code. Why: react-router is not a dependency of this repo or of .harness/ since 5.16.0; the shell in dist/ uses its own vendored copy (dist/router), and a second copy splits router context, so a fixture built on it tests a setup no app can have. ' +
        'Fix: in .harness/ import the published copy: `import { ... } from "{{module}}";` (what apps get from "' +
        PUBLIC_ROUTER +
        '"); in scripts/ read files with `readFileSync` instead of importing the router.',
    },
  },
  create(context) {
    const fromPath = repoRelative(context);
    const layer = layerOf(fromPath);
    const isLibrary = layer ? LIBRARY_LAYERS.has(layer.name) : false;
    return moduleSourceVisitors((node, source) => {
      if (!isReactRouter(source)) return;
      const target = vendoredFor(source);
      const module = specifierTo(context, isLibrary ? target : `dist/${target}`);
      context.report({ node, messageId: isLibrary ? 'library' : 'outside', data: { source, module } });
    });
  },
};
