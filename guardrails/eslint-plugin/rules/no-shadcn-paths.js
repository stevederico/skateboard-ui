import { moduleSourceVisitors } from '../lib/moduleSources.js';
import { repoRelative, resolveSpecifier, specifierTo } from '../lib/paths.js';
import { LIBRARY_LAYERS, layerOf } from '../layers.js';

const SHADCN = '@stevederico/skateboard-ui/shadcn';

export function newSubpath(source) {
  const rest = source.slice(SHADCN.length).replace(/^\//, '');
  if (rest.startsWith('ui/')) return rest;
  if (rest.startsWith('hooks/')) return rest;
  return 'lib/utils';
}

function newRepoPath(target) {
  return target.replace(/^shadcn\/(?:ui\/)/, 'ui/').replace(/^shadcn\//, '');
}

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        "Never import '@stevederico/skateboard-ui/shadcn/...' or the shadcn/ folder (both removed in 5.17.0). Helpers live in lib/ (./lib/utils), useIsMobile in hooks/ (./hooks/use-mobile), primitives in ui/ (./ui/*).",
      source: 'AGENTS.md > Dependencies and imports; CHANGELOG.md 5.17.0',
    },
    schema: [],
    messages: {
      packagePath:
        'Found an import of "{{source}}". Why: skateboard-ui 5.17.0 removed every "./shadcn/*" export (the folder became lib/ and hooks/, and shadcn/ui was only an alias of ui/), so this path no longer resolves and the build fails. ' +
        'Fix: import "{{replacement}}" instead (same exports).',
      packagePathLibrary:
        'Found an import of "{{source}}" in library code. Why: the "./shadcn/*" exports were removed in 5.17.0, and library code never imports its own package name (that resolves to stale dist/). ' +
        'Fix: import the source file relatively: `{{replacement}}`.',
      folder:
        'Found an import of "{{source}}", which points into the removed shadcn/ folder. Why: 5.17.0 moved shadcn/lib/* to lib/ and shadcn/hooks/use-mobile.ts to hooks/, so this file does not exist. ' +
        'Fix: import `{{replacement}}`.',
    },
  },
  create(context) {
    const layer = layerOf(repoRelative(context));
    const isLibrary = layer ? LIBRARY_LAYERS.has(layer.name) : false;
    return moduleSourceVisitors((node, source) => {
      if (source === SHADCN || source.startsWith(`${SHADCN}/`)) {
        const sub = newSubpath(source);
        if (isLibrary) {
          context.report({ node, messageId: 'packagePathLibrary', data: { source, replacement: specifierTo(context, `${sub}.js`) } });
        } else {
          context.report({ node, messageId: 'packagePath', data: { source, replacement: `@stevederico/skateboard-ui/${sub}` } });
        }
        return;
      }
      const target = resolveSpecifier(context, source);
      if (target === null || !/^(?:dist\/)?shadcn(?:\/|$)/.test(target)) return;
      const fixed = target.startsWith('dist/') ? `dist/${newRepoPath(target.slice(5))}` : newRepoPath(target);
      context.report({ node, messageId: 'folder', data: { source, replacement: specifierTo(context, fixed) } });
    });
  },
};
