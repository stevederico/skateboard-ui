import rule from './icons-from-vendored-module.js';
import { runRuleTests } from '../lib/ruleTester.js';

const view = 'components/views/LandingView.tsx';

runRuleTests('icons-from-vendored-module', rule, {
  valid: [
    { code: "import { Check, ChevronRight } from '../../icons/index.js';", filename: view },
    { code: "import { CheckIcon } from '../icons/index.js';", filename: 'ui/checkbox.tsx' },
    { code: "import type { LucideIcon } from '../../icons/index.js';", filename: 'components/core/constantsIcon.tsx' },
    { code: "import { forwardRef } from 'react';", filename: 'icons/index.tsx' },
    // The generator names the package in strings and reads it with fs; it never imports it.
    { code: "const pkgDir = join(root, 'node_modules', 'lucide-react');", filename: 'scripts/vendor-lucide-icons.js' },
    { code: "import { Button } from '../dist/ui/button.js';", filename: '.harness/Fixtures.tsx' },
  ],
  invalid: [
    {
      code: "import { Plus, Trash2 } from 'lucide-react';",
      filename: view,
      errors: [{ messageId: 'lucide', data: { source: 'lucide-react', names: 'Plus, Trash2', module: '../../icons/index.js' } }],
    },
    {
      code: "import { XIcon } from 'lucide-react';",
      filename: 'ui/dialog.tsx',
      errors: [{ messageId: 'lucide', data: { source: 'lucide-react', names: 'XIcon', module: '../icons/index.js' } }],
    },
    { code: "import Trash2 from 'lucide-react/dist/esm/icons/trash-2';", filename: view, errors: [{ messageId: 'lucide' }] },
    { code: "import type { LucideProps } from 'lucide-react';", filename: 'App.tsx', errors: [{ messageId: 'lucide', data: { source: 'lucide-react', names: 'LucideProps', module: './icons/index.js' } }] },
    { code: "const icons = await import('lucide-react');", filename: view, errors: [{ messageId: 'lucide' }] },
    { code: "import { createIcons } from 'lucide';", filename: view, errors: [{ messageId: 'lucide' }] },
    { code: "import { Camera } from '@lucide/lab';", filename: view, errors: [{ messageId: 'lucide' }] },
    { code: "import { icons } from 'lucide-react';", filename: 'scripts/vendor-lucide-icons.js', errors: [{ messageId: 'lucideTooling' }] },
    { code: "import { Home } from 'lucide-react';", filename: '.harness/Fixtures.tsx', errors: [{ messageId: 'lucideTooling' }] },
    {
      code: "import { Check } from '../../icons/check.js';",
      filename: view,
      errors: [{ messageId: 'deepIcon', data: { source: '../../icons/check.js', target: 'icons/check.js', expected: 'icons/index.js', names: 'Check', module: '../../icons/index.js' } }],
    },
    { code: "import { Check } from '../icons';", filename: 'ui/checkbox.tsx', errors: [{ messageId: 'deepIcon' }] },
    { code: "import * as Icons from '../../icons/index.js';", filename: 'components/core/constantsIcon.tsx', errors: [{ messageId: 'namespace' }] },
    { code: "export * from './icons/index.js';", filename: 'index.ts', errors: [{ messageId: 'namespace' }] },
  ],
});
