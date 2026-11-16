import rule from './no-shadcn-paths.js';
import { runRuleTests } from '../lib/ruleTester.js';

runRuleTests('no-shadcn-paths', rule, {
  valid: [
    { code: "import { cn } from '../lib/utils.js';", filename: 'ui/button.tsx' },
    { code: "import { cva } from '../lib/cva.js';", filename: 'ui/badge.tsx' },
    { code: "import { useIsMobile } from '../hooks/use-mobile.js';", filename: 'ui/sidebar.tsx' },
    { code: "import { cn } from '../dist/lib/utils.js';", filename: '.harness/App.tsx' },
    // The upstream registry script keeps its name; it is not an import path.
    { code: "const REGISTRY = 'https://ui.shadcn.com/r/styles/base-vega';", filename: 'scripts/pull-shadcn-base-vega.js' },
  ],
  invalid: [
    {
      code: "import { Button } from '@stevederico/skateboard-ui/shadcn/ui/button';",
      filename: '.harness/App.tsx',
      errors: [{ messageId: 'packagePath', data: { source: '@stevederico/skateboard-ui/shadcn/ui/button', replacement: '@stevederico/skateboard-ui/ui/button' } }],
    },
    {
      code: "import { cn } from '@stevederico/skateboard-ui/shadcn/lib/utils';",
      filename: 'scripts/tool.js',
      errors: [{ messageId: 'packagePath', data: { source: '@stevederico/skateboard-ui/shadcn/lib/utils', replacement: '@stevederico/skateboard-ui/lib/utils' } }],
    },
    {
      code: "import { useIsMobile } from '@stevederico/skateboard-ui/shadcn/hooks/use-mobile';",
      filename: '.harness/App.tsx',
      errors: [{ messageId: 'packagePath', data: { source: '@stevederico/skateboard-ui/shadcn/hooks/use-mobile', replacement: '@stevederico/skateboard-ui/hooks/use-mobile' } }],
    },
    {
      code: "import { Card } from '@stevederico/skateboard-ui/shadcn/ui/card';",
      filename: 'components/views/SettingsView.tsx',
      errors: [{ messageId: 'packagePathLibrary', data: { source: '@stevederico/skateboard-ui/shadcn/ui/card', replacement: '../../ui/card.js' } }],
    },
    {
      code: "import { cn } from '../shadcn/lib/utils.js';",
      filename: 'ui/button.tsx',
      errors: [{ messageId: 'folder', data: { source: '../shadcn/lib/utils.js', replacement: '../lib/utils.js' } }],
    },
    {
      code: "import { useIsMobile } from '../shadcn/hooks/use-mobile.js';",
      filename: 'ui/sidebar.tsx',
      errors: [{ messageId: 'folder', data: { source: '../shadcn/hooks/use-mobile.js', replacement: '../hooks/use-mobile.js' } }],
    },
    {
      code: "import { Button } from '../dist/shadcn/ui/button.js';",
      filename: '.harness/App.tsx',
      errors: [{ messageId: 'folder', data: { source: '../dist/shadcn/ui/button.js', replacement: '../dist/ui/button.js' } }],
    },
    { code: "const m = await import('@stevederico/skateboard-ui/shadcn/ui/dialog');", filename: '.harness/App.tsx', errors: [{ messageId: 'packagePath' }] },
  ],
});
