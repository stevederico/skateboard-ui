import { jsxName } from '../lib/jsx.js';
import { repoRelative } from '../lib/paths.js';

/** The vendored icon module: the only place SVG markup is built. */
const ICON_MODULE = /^icons\//;

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'No inline `<svg>` in components: icons come from the vendored icons/index.tsx module.',
      source: 'AGENTS.md > Icons',
    },
    schema: [],
    messages: {
      inlineSvg:
        'Found an inline `<svg>` in a component. Why: hand-pasted SVGs bypass the vendored icon module, so the shipped icon set stops being one audited, generated list (LICENSE-lucide covers exactly that file), and size, stroke width and `aria-hidden` handling drift from every other icon. ' +
        'Fix: import the icon by name from icons/index.js (`import { ChevronRight } from "<relative>/icons/index.js"`). If the name is not exported yet, add it with the generator: `npm i --no-save lucide-react@0.546.0 && node scripts/vendor-lucide-icons.js`.',
    },
  },
  create(context) {
    if (ICON_MODULE.test(repoRelative(context))) return {};
    return {
      JSXOpeningElement(node) {
        if (jsxName(node.name) === 'svg') context.report({ node, messageId: 'inlineSvg' });
      },
    };
  },
};
