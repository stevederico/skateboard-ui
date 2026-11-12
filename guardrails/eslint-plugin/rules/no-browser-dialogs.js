const DIALOGS = new Set(['alert', 'confirm', 'prompt']);
const GLOBALS = new Set(['window', 'globalThis', 'self']);

const FIXES = {
  alert: 'render the message in the component: an error state shown with `<Alert>` from ui/alert.js, or inline text next to the field (the sign-in views use `setErrorMessage`)',
  confirm: 'use `<AlertDialog>` from ui/alert-dialog.js (AlertDialogAction / AlertDialogCancel) and run the action in its onClick handler',
  prompt: 'use `<Dialog>` from ui/dialog.js with a `<Label>` (ui/label.js) + `<Input>` (ui/input.js) and a submit `<Button>`',
};

/**
 * Dialog name called by this expression (`alert(...)`, `window.confirm(...)`), or null.
 *
 * @param {any} callee - CallExpression callee
 * @returns {string | null} `alert`, `confirm`, `prompt`, or null
 */
function dialogName(callee) {
  if (callee.type === 'Identifier' && DIALOGS.has(callee.name)) return callee.name;
  if (
    callee.type === 'MemberExpression' && !callee.computed &&
    callee.object.type === 'Identifier' && GLOBALS.has(callee.object.name) &&
    DIALOGS.has(callee.property.name)
  ) return callee.property.name;
  return null;
}

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Never use `alert()`, `confirm()`, or `prompt()`: use the ui/ Dialog and AlertDialog primitives.',
      source: 'AGENTS.md > React',
    },
    schema: [],
    messages: {
      dialog:
        'Found a native `{{name}}()` call. Why: browser dialogs block the main thread, cannot be styled or themed, break in iOS/PWA web views, and bypass the ui/ layer stack that manages focus and Escape; a library must never open one inside a host app. ' +
        'Fix: {{fix}}.',
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        const name = dialogName(node.callee);
        if (name) context.report({ node, messageId: 'dialog', data: { name, fix: FIXES[name] } });
      },
    };
  },
};
