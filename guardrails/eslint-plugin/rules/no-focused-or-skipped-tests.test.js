import rule from './no-focused-or-skipped-tests.js';
import { runRuleTests } from '../lib/ruleTester.js';

const filename = '.harness/tests/menus.spec.ts';
const unit = 'guardrails/eslint-plugin/rules/example.test.js';

runRuleTests('no-focused-or-skipped-tests', rule, {
  valid: [
    { code: "test('opens the menu', async ({ page }) => { await page.goto('/'); });", filename },
    { code: "test.describe('menus', () => {});", filename },
    // Playwright's conditional skip is evaluated at run time and carries a reason.
    { code: "test('x', async ({ browserName }) => { test.skip(browserName === 'webkit', 'no popover API'); });", filename },
    { code: "describe('layers', { skip: !HAS_REPO }, () => {});", filename: unit },
    { code: "it('works', (t) => { t.skip(); });", filename: unit },
    { code: 'list.skip(1);', filename: unit },
  ],
  invalid: [
    { code: "test.only('a', async () => {});", filename, errors: [{ messageId: 'modifier', data: { name: 'test', modifier: 'only' } }] },
    { code: "test.skip('a', async () => {});", filename, errors: [{ messageId: 'modifier', data: { name: 'test', modifier: 'skip' } }] },
    { code: "test.fixme('a', async () => {});", filename, errors: [{ messageId: 'modifier', data: { name: 'test', modifier: 'fixme' } }] },
    { code: "test.describe.only('a', () => {});", filename, errors: [{ messageId: 'modifier', data: { name: 'test.describe', modifier: 'only' } }] },
    { code: "test('a', async () => { test.skip(); });", filename, errors: [{ messageId: 'modifier' }] },
    { code: "it.only('a', () => {});", filename: unit, errors: [{ messageId: 'modifier', data: { name: 'it', modifier: 'only' } }] },
    { code: "describe.skip('a', () => {});", filename: unit, errors: [{ messageId: 'modifier' }] },
    { code: "test('a', { only: true }, () => {});", filename: unit, errors: [{ messageId: 'option', data: { name: 'test', modifier: 'only' } }] },
    { code: "suite('a', { skip: true }, () => {});", filename: unit, errors: [{ messageId: 'option' }] },
  ],
});
