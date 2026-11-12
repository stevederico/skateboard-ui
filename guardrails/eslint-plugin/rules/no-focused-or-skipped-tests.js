const TEST_FUNCTIONS = new Set(['describe', 'it', 'test', 'suite']);
const MODIFIERS = new Set(['only', 'skip', 'fixme']);

/**
 * Dotted name of a callee built from identifiers: `it`, `test.only`, `test.describe.skip`.
 *
 * @param {any} callee - CallExpression callee
 * @returns {string[] | null} Name parts, or null when the callee is computed
 */
function calleeParts(callee) {
  if (callee.type === 'Identifier') return [callee.name];
  if (callee.type === 'MemberExpression' && !callee.computed && callee.property.type === 'Identifier') {
    const head = calleeParts(callee.object);
    return head ? [...head, callee.property.name] : null;
  }
  return null;
}

/**
 * True when a `.skip(...)` / `.fixme(...)` call is the conditional form that Playwright
 * evaluates at run time: `test.skip(browserName === 'webkit', 'reason')`.
 *
 * @param {any} node - CallExpression
 * @returns {boolean} Whether the first argument is a computed condition
 */
function isConditional(node) {
  const [first] = node.arguments;
  if (!first) return false;
  const isTitle = (first.type === 'Literal' && typeof first.value === 'string') || first.type === 'TemplateLiteral';
  const isAlwaysTrue = first.type === 'Literal' && first.value === true;
  return !isTitle && !isAlwaysTrue && first.type !== 'ArrowFunctionExpression' && first.type !== 'FunctionExpression';
}

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'No `.only`, `.skip` or `.fixme` left in the harness specs or the guardrail tests.',
      source: 'AGENTS.md > Tests; .github/workflows/publish.yml (publish is gated on the harness suite)',
    },
    schema: [],
    messages: {
      modifier:
        'Found {{name}}.{{modifier}}(). Why: publish.yml only publishes when the .harness Playwright suite passes; `.only` silently drops every other test from that run and `.skip` / `.fixme` hide a test forever, so the gate goes green without testing the build. ' +
        'Fix: remove ".{{modifier}}" and make the test pass. For a test that cannot run in one environment use the conditional form with a reason: `test.skip(browserName === "webkit", "why")` (Playwright) or `it("...", { skip: !CONDITION }, fn)` (node:test).',
      option:
        'Found the literal option { {{modifier}}: true } on {{name}}(). Why: a hard-coded {{modifier}} flag drops tests from every run, so the publish gate goes green without testing the build. ' +
        'Fix: delete the option, or make it a real condition, e.g. { skip: !CONDITION }.',
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        const parts = calleeParts(node.callee);
        if (!parts || !TEST_FUNCTIONS.has(parts[0])) return;
        const name = parts[0];
        const modifier = parts.length > 1 ? parts[parts.length - 1] : null;
        if (modifier && MODIFIERS.has(modifier) && !(modifier !== 'only' && isConditional(node))) {
          context.report({ node: node.callee.property, messageId: 'modifier', data: { name: parts.slice(0, -1).join('.'), modifier } });
        }
        for (const arg of node.arguments) {
          if (arg.type !== 'ObjectExpression') continue;
          for (const prop of arg.properties) {
            if (prop.type !== 'Property' || prop.key.type !== 'Identifier' || !MODIFIERS.has(prop.key.name)) continue;
            if (prop.value.type === 'Literal' && prop.value.value === true) {
              context.report({ node: prop, messageId: 'option', data: { name, modifier: prop.key.name } });
            }
          }
        }
      },
    };
  },
};
