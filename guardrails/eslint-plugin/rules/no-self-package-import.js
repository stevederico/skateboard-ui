import { moduleSourceVisitors, packageName } from '../lib/moduleSources.js';
import { repoRelative, specifierTo } from '../lib/paths.js';
import { LIBRARY_LAYERS, layerOf } from '../layers.js';

/** This package's own name, as apps import it. */
const SELF = '@stevederico/skateboard-ui';

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Library source never imports "@stevederico/skateboard-ui/..." (its own package name); internal imports are relative with a `.js` extension.',
      source: 'AGENTS.md > Dependencies and imports',
    },
    schema: [],
    messages: {
      self:
        'Found an import of "{{source}}" inside the package that publishes it. Why: the name resolves through package.json "exports" to dist/, which is missing in a fresh checkout and stale until the next build; in an app it can also load a second copy of the module, so Context, the layer stack and theme state split in two. ' +
        'Fix: import the source file relatively with its `.js` extension, e.g. `{{example}}`. "exports" in package.json shows which file each public subpath maps to (dist/ mirrors the repo layout). The package name belongs only in JSDoc `@example` blocks and README snippets.',
    },
  },
  create(context) {
    const layer = layerOf(repoRelative(context));
    if (!layer || !LIBRARY_LAYERS.has(layer.name)) return {};
    return moduleSourceVisitors((node, source) => {
      if (packageName(source) !== SELF) return;
      context.report({
        node,
        messageId: 'self',
        data: { source, example: `import { getState } from "${specifierTo(context, 'components/core/Context.js')}";` },
      });
    });
  },
};
