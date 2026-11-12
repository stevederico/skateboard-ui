import { moduleSourceVisitors, packageName } from '../lib/moduleSources.js';
import { repoRelative } from '../lib/paths.js';
import { LIBRARY_LAYERS, layerOf } from '../layers.js';
import { isLucide } from './icons-from-vendored-module.js';
import { isNodeBuiltin } from './layer-boundaries.js';

/**
 * Packages library code may import: the runtime peers in package.json "peerDependencies".
 * tailwindcss is a peer too, but only styles.css uses it. Keep this list in sync with
 * package.json in the same change.
 */
export const PEERS = new Set(['react', 'react-dom', 'react-router']);

/** This package's own name; reported by no-self-package-import instead. */
const SELF = '@stevederico/skateboard-ui';

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Library code imports only its peers (react, react-dom, react-router) and relative files; the package has no `dependencies`, so everything else is vendored.',
      source: 'AGENTS.md > Dependencies and imports; CHANGELOG.md (dependencies block removed, 5.12.0 react-router peer, 5.13.0 lucide vendored)',
    },
    schema: [],
    messages: {
      notPeer:
        'Found an import of "{{source}}" (package "{{pkg}}") in library code. Why: skateboard-ui publishes no `dependencies`; only the peers react, react-dom and react-router are guaranteed to be in a consumer\'s node_modules, so any other bare import fails to resolve in apps, or installs a second copy that splits React/router context. ' +
        'Fix: use a peer or a browser API. For a helper, vendor a minimal implementation in the repo the way the existing code does: shadcn/lib/clsx.ts and cva.ts (clsx, class-variance-authority), shadcn/lib/tailwind-merge.js (scripts/vendor-tailwind-merge.js), components/core/Command.tsx (cmdk), components/core/Calendar.tsx (react-day-picker), icons/index.tsx (lucide). ' +
        'Only if the package must be shared with the app (like the router), add it to "peerDependencies" in package.json and to PEERS in this rule in the same change.',
    },
  },
  create(context) {
    const layer = layerOf(repoRelative(context));
    if (!layer || !LIBRARY_LAYERS.has(layer.name)) return {};
    return moduleSourceVisitors((node, source) => {
      if (source.startsWith('.') || source.startsWith('/')) return;
      // Each of these has its own rule with a more specific fix.
      if (isNodeBuiltin(source) || isLucide(source)) return;
      const pkg = packageName(source);
      if (pkg === SELF || PEERS.has(pkg)) return;
      context.report({ node, messageId: 'notPeer', data: { source, pkg } });
    });
  },
};
