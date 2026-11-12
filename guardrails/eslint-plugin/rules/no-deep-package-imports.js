import { moduleSourceVisitors, packageName } from '../lib/moduleSources.js';

/**
 * Classify a specifier that reaches past a package's public entry points.
 *
 * @param {string} source - Import specifier
 * @returns {'nodeModules' | 'dist' | null} Kind of deep import, or null when fine
 */
function deepKind(source) {
  if (/(^|\/)node_modules\//.test(source)) return 'nodeModules';
  if (source.startsWith('.') || source.startsWith('/')) return null;
  const subpath = source.slice(packageName(source).length);
  // `lib/` is left out on purpose: some packages document it as public (highlight.js/lib/core).
  if (/^\/(dist|build|esm|cjs)(\/|$)/.test(subpath)) return 'dist';
  return null;
}

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        "Never import package internals: no path containing node_modules/, no '<package>/dist/...' (or build/, esm/, cjs/) such as 'lucide-react/dist/esm/icons/...'.",
      source: 'AGENTS.md > Dependencies and imports / Icons',
    },
    schema: [],
    messages: {
      nodeModules:
        'Found an import through node_modules ("{{source}}"). Why: it hard-codes one install layout (hoisting, workspaces and the consumer\'s tree all differ) and skips the package\'s `exports` map, so it breaks on the next install and never resolves inside an app. ' +
        'Fix: import a peer by its public name (`react`, `react-dom/client`, `react-router`); for an icon use the vendored module (`import { Check } from "<relative>/icons/index.js"`); for anything else vendor the code into the repo. Scripts that need package files read them with `readFileSync`.',
      dist:
        'Found an import of a build-output path ("{{source}}"). Why: dist/, build/, esm/ and cjs/ are a package\'s private build artifacts; they bypass its `exports` map, move between releases, and can load a second module instance next to the public entry. ' +
        'Fix: import the package\'s documented entry point (`react-router`, `react-dom/client`); for an icon use the vendored module (`import { Check } from "<relative>/icons/index.js"`), never a `lucide-react/dist/...` path.',
    },
  },
  create(context) {
    return moduleSourceVisitors((node, source) => {
      const kind = deepKind(source);
      if (kind) context.report({ node, messageId: kind, data: { source } });
    });
  },
};
