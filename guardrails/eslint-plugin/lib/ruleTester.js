import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { RuleTester } from 'eslint';
import parser from '@typescript-eslint/parser';

RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;

const DEFAULT_FILE = 'components/views/Example.tsx';

export const fileAt = (rel) => path.join(process.cwd(), rel);

function withFile(testCase) {
  const c = typeof testCase === 'string' ? { code: testCase } : testCase;
  return { ...c, filename: fileAt(c.filename ?? DEFAULT_FILE) };
}

export function runRuleTests(name, rule, { valid, invalid }) {
  describe(`${name} contract`, () => {
    it('documents the written rule and where it lives', () => {
      assert.ok(rule.meta?.docs?.description, 'meta.docs.description must quote the written rule');
      assert.ok(rule.meta?.docs?.source, 'meta.docs.source must name the doc that states the rule');
    });

    it('teaches the root cause and the fix in every message', () => {
      for (const [id, message] of Object.entries(rule.meta.messages ?? {})) {
        assert.match(message, /Why: /, `${name}.${id} must explain why`);
        assert.match(message, /Fix: /, `${name}.${id} must give the fix`);
      }
    });
  });

  const tester = new RuleTester({
    languageOptions: {
      parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  });
  tester.run(name, rule, { valid: valid.map(withFile), invalid: invalid.map(withFile) });
}
