import rule from './no-self-package-import.js';
import { runRuleTests } from '../lib/ruleTester.js';

runRuleTests('no-self-package-import', rule, {
  valid: [
    "import { getState } from '../core/Context.js';",
    // JSDoc examples keep the public name; only real imports are checked.
    "/**\n * @example\n * import Sheet from '@stevederico/skateboard-ui/Sheet';\n */\nexport default function Sheet() { return null; }",
    { code: "import { Button } from '@stevederico/skateboard-ui/ui/button';", filename: 'scripts/tool.js' },
    "import { useState } from 'react';",
  ],
  invalid: [
    {
      code: "import { getState } from '@stevederico/skateboard-ui/Context';",
      errors: [{ messageId: 'self', data: { source: '@stevederico/skateboard-ui/Context', example: 'import { getState } from "../core/Context.js";' } }],
    },
    { code: "import { Button } from '@stevederico/skateboard-ui/shadcn/ui/button';", filename: 'ui/card.tsx', errors: [{ messageId: 'self' }] },
    { code: "export * from '@stevederico/skateboard-ui';", filename: 'index.ts', errors: [{ messageId: 'self' }] },
    { code: "const m = await import('@stevederico/skateboard-ui/Utilities');", filename: 'hooks/useAuthGate.ts', errors: [{ messageId: 'self' }] },
  ],
});
