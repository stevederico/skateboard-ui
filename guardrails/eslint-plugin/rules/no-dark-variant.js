import { classGroupVisitors } from '../lib/classStrings.js';

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Support dark mode with semantic tokens: never manual `dark:` overrides (`dark:bg-gray-800`).',
      source: 'AGENTS.md > Styling',
    },
    schema: [],
    messages: {
      dark:
        'Found the manual dark-mode class "{{token}}". Why: semantic tokens (bg-background, bg-card, bg-accent, text-foreground, border-border) already switch with the theme, ' +
        'so a `dark:` override forks the palette per component and ignores the theme variables an app overrides. ' +
        'Fix: delete "{{token}}" and use the semantic token on the base class; if dark mode genuinely needs a different value, set the CSS variable once under `.dark { ... }` in styles.css. (`dark:` is tolerated only in ui/, where it comes from the upstream shadcn base-vega source.)',
    },
  },
  create(context) {
    return classGroupVisitors((tokens) => {
      for (const t of tokens) {
        if (t.variants.includes('dark')) context.report({ node: t.node, messageId: 'dark', data: { token: t.raw } });
      }
    });
  },
};
