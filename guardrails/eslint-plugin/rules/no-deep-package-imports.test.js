import rule from './no-deep-package-imports.js';
import { runRuleTests } from '../lib/ruleTester.js';

runRuleTests('no-deep-package-imports', rule, {
  valid: [
    "import { createRoot } from 'react-dom/client';",
    "import { jsx } from 'react/jsx-runtime';",
    "import { Check } from '../../icons/index.js';",
    // The harness imports the repo's own build output by relative path; that is the layer rule's business.
    { code: "import { Button } from '../dist/ui/button.js';", filename: '.harness/Fixtures.tsx' },
  ],
  invalid: [
    { code: "import Trash2 from 'lucide-react/dist/esm/icons/trash-2';", errors: [{ messageId: 'dist', data: { source: 'lucide-react/dist/esm/icons/trash-2' } }] },
    { code: "import { Router } from 'react-router/dist/development/index.js';", errors: [{ messageId: 'dist' }] },
    { code: "import Trash2 from '../../node_modules/lucide-react/dist/esm/icons/trash-2.js';", errors: [{ messageId: 'nodeModules' }] },
    { code: "import ts from '../node_modules/typescript/lib/typescript.js';", filename: 'scripts/tool.js', errors: [{ messageId: 'nodeModules' }] },
    { code: "import { RuleTester } from 'eslint/dist/rule-tester.js';", filename: 'guardrails/eslint-plugin/lib/ruleTester.js', errors: [{ messageId: 'dist' }] },
  ],
});
