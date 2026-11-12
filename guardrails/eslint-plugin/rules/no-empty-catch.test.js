import rule from './no-empty-catch.js';
import { runRuleTests } from '../lib/ruleTester.js';

runRuleTests('no-empty-catch', rule, {
  valid: [
    'try { run(); } catch (err) { console.error(err); }',
    'try { return JSON.parse(text); } catch { return false; }',
    // Real code: storage can be blocked, and the comment says so.
    'try { localStorage.setItem(KEY, next); } catch {\n  // localStorage may be unavailable (e.g. private mode), ignore\n}',
    "try { localStorage.setItem(HAD_ACCOUNT_KEY, '1'); } catch { /* storage blocked */ }",
    'const failure = await response.json().catch(() => null);',
    'main().catch((e) => { console.error(e); process.exit(1); });',
  ],
  invalid: [
    { code: 'try { run(); } catch (err) {}', errors: [{ messageId: 'emptyCatch' }] },
    { code: 'try { run(); } catch {\n  // ignore\n}', errors: [{ messageId: 'emptyCatch' }] },
    { code: 'try { run(); } catch { /* */ }', errors: [{ messageId: 'emptyCatch' }] },
    { code: 'save().catch(() => {});', errors: [{ messageId: 'noopCatch' }] },
    { code: 'save().catch(() => undefined);', errors: [{ messageId: 'noopCatch' }] },
    { code: 'save().catch(function () {});', errors: [{ messageId: 'noopCatch' }] },
  ],
});
