import { createBannedImportRule, packages } from '../lib/bannedImports.js';

/** Test runners and their assertion/mocking companions that this repo does not use. */
const RUNNERS = [
  'jest', '@jest/globals', 'mocha', 'chai', 'jasmine', 'jasmine-core', 'vitest', '@vitest/expect', '@vitest/spy', 'ava', 'tap', 'uvu',
  '@testing-library/react', '@testing-library/dom', '@testing-library/jest-dom', 'cypress',
];

export default createBannedImportRule({
  description:
    'Two test runners only: Playwright for the .harness suite (against the built dist/) and `node --test` for the guardrail rules. No Jest, Vitest, Mocha, Testing Library or Cypress.',
  source: 'AGENTS.md > Tests; .github/workflows/publish.yml',
  entries: [
    {
      match: packages(RUNNERS),
      why:
        'publish.yml runs exactly one suite before publishing (`npx playwright test` in .harness/, against the built dist/), and `npm run test:guardrails` runs `node --test`; tests written for another runner are never executed, so they give false confidence and add an unpinned toolchain.',
      fix:
        'for component behavior add a Playwright spec in .harness/tests/*.spec.ts (`import { test, expect } from "@playwright/test";`) with a fixture in .harness/Fixtures.tsx that imports from `../dist/`; for lint rules use `import { describe, it } from "node:test";` and `import assert from "node:assert/strict";`.',
    },
  ],
});
