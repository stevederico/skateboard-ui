// Pictographic emoji, excluding the typographic symbols © ® ™ (also Extended_Pictographic).
const EMOJI = /(?![©®™])\p{Extended_Pictographic}/u;

/** JSX attributes that name an icon. */
const ICON_ATTRS = new Set(['icon', 'leftIcon', 'rightIcon', 'startIcon', 'endIcon']);

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Never use emoji as UI icons: use proper icon components.',
      source: 'AGENTS.md > Icons',
    },
    schema: [],
    messages: {
      emoji:
        'Found the emoji "{{emoji}}" in rendered UI. Why: emoji render differently per OS, ignore `size`/`currentColor`/dark mode, and screen readers read out their long Unicode names. ' +
        'Fix: use a vendored icon (e.g. `Lock` for 🔐): `import { Lock } from "<relative>/icons/index.js"` (add missing names with scripts/vendor-lucide-icons.js), then `<Lock size={16} aria-hidden="true" />` next to the text.',
    },
  },
  create(context) {
    /**
     * Report the first emoji in a rendered string.
     *
     * @param {any} node - Node holding the text
     * @param {string} text - Rendered text
     */
    function check(node, text) {
      const match = EMOJI.exec(text);
      if (match) context.report({ node, messageId: 'emoji', data: { emoji: match[0] } });
    }
    return {
      JSXText: (node) => check(node, node.value),
      JSXExpressionContainer(node) {
        const expr = node.expression;
        const isChild = node.parent.type === 'JSXElement' || node.parent.type === 'JSXFragment';
        if (isChild && expr.type === 'Literal' && typeof expr.value === 'string') check(expr, expr.value);
      },
      JSXAttribute(node) {
        if (!ICON_ATTRS.has(node.name.name) || !node.value) return;
        const value = node.value.type === 'JSXExpressionContainer' ? node.value.expression : node.value;
        if (value.type === 'Literal' && typeof value.value === 'string') check(value, value.value);
      },
    };
  },
};
