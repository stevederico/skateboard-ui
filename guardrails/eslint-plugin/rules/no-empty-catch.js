/**
 * True for a callback that does nothing: `() => {}`, `function () {}`, `() => undefined`.
 * `() => null` is not a no-op: it is the repo's explicit "fall back to null" form, e.g.
 * `(await response.json().catch(() => null))` followed by a `failure?.error ||` default.
 *
 * @param {any} fn - Candidate callback
 * @returns {boolean} Whether the callback swallows its argument
 */
function isNoopCallback(fn) {
  if (fn?.type !== 'ArrowFunctionExpression' && fn?.type !== 'FunctionExpression') return false;
  if (fn.body.type === 'BlockStatement') return fn.body.body.length === 0;
  return fn.body.type === 'Identifier' && fn.body.name === 'undefined';
}

/** A reason shorter than this is a placeholder (`// ignore`), not an explanation. */
const MIN_REASON_LENGTH = 15;

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Never silently swallow errors. An empty catch is allowed only with a comment inside that says why ignoring is safe (the repo uses this for blocked localStorage and the optional Turnstile widget).',
      source: 'AGENTS.md > Errors',
    },
    schema: [],
    messages: {
      emptyCatch:
        'Found an empty catch block with no explanation. Why: the error disappears, so the shell stays in a loading or half-signed-in state inside someone else\'s app and nobody can debug it from the consumer side. ' +
        'Fix: handle it (`console.error("Sign out error:", err)`, set an error state, or rethrow with `{ cause: err }`). If ignoring really is correct, say why inside the block, as the code does for storage: `catch { /* localStorage may be unavailable (private mode); reload anyway */ }` (at least 15 characters).',
      noopCatch:
        'Found `.catch()` with a no-op handler. Why: it marks the promise as handled while throwing the error away, so a failed request looks like success to the caller. ' +
        'Fix: use `try { await p; } catch (err) { console.error(err); /* set error state */ }`. If a fallback value is intended, return it explicitly: `.catch(() => null)` and handle the null.',
    },
  },
  create(context) {
    return {
      CatchClause(node) {
        if (node.body.body.length > 0) return;
        const reason = context.sourceCode.getCommentsInside(node.body).map((c) => c.value.trim()).join(' ');
        if (reason.length < MIN_REASON_LENGTH) context.report({ node, messageId: 'emptyCatch' });
      },
      CallExpression(node) {
        const { callee } = node;
        if (callee.type !== 'MemberExpression' || callee.property.type !== 'Identifier' || callee.property.name !== 'catch') return;
        if (isNoopCallback(node.arguments[0])) context.report({ node: node.arguments[0], messageId: 'noopCatch' });
      },
    };
  },
};
