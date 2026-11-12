import rule from './no-foreign-test-frameworks.js';
import { runRuleTests } from '../lib/ruleTester.js';

runRuleTests('no-foreign-test-frameworks', rule, {
  valid: [
    { code: "import { test, expect } from '@playwright/test';", filename: '.harness/tests/menus.spec.ts' },
    { code: "import { describe, it } from 'node:test';\nimport assert from 'node:assert/strict';", filename: 'guardrails/eslint-plugin/index.test.js' },
  ],
  invalid: [
    { code: "import { describe, it, expect } from 'vitest';", filename: 'ui/button.test.tsx', errors: [{ messageId: 'banned' }] },
    { code: "import { jest } from '@jest/globals';", filename: '.harness/tests/menus.spec.ts', errors: [{ messageId: 'banned' }] },
    { code: "import { render } from '@testing-library/react';", filename: 'ui/button.test.tsx', errors: [{ messageId: 'banned' }] },
    { code: "import Mocha from 'mocha';", filename: 'scripts/tool.test.js', errors: [{ messageId: 'banned' }] },
  ],
});
