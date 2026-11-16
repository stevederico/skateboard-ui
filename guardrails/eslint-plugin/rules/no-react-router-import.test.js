import rule from './no-react-router-import.js';
import { runRuleTests } from '../lib/ruleTester.js';

const view = 'components/views/SettingsView.tsx';

runRuleTests('no-react-router-import', rule, {
  valid: [
    { code: "import { useNavigate } from '../../router/index.mjs';", filename: view },
    { code: "import type { Location } from '../../router/index.mjs';", filename: 'components/core/Utilities.ts' },
    { code: "import { BrowserRouter } from './router/index.mjs';", filename: 'App.tsx' },
    { code: "import { MemoryRouter } from '../dist/router/index.mjs';", filename: '.harness/Fixtures.tsx' },
    // The vendor script names the package in strings and runs `npm pack`; it never imports it.
    { code: "const pkg = fetchPackage('react-router', RR, tmp);", filename: 'scripts/vendor-react-router.js' },
    "import { useEffect } from 'react';",
  ],
  invalid: [
    {
      code: "import { useNavigate } from 'react-router';",
      filename: view,
      errors: [{ messageId: 'library', data: { source: 'react-router', module: '../../router/index.mjs' } }],
    },
    {
      code: "import { Outlet } from 'react-router';",
      filename: 'components/ProtectedRoute.tsx',
      errors: [{ messageId: 'library', data: { source: 'react-router', module: '../router/index.mjs' } }],
    },
    { code: "import { Link } from 'react-router-dom';", filename: 'App.tsx', errors: [{ messageId: 'library', data: { source: 'react-router-dom', module: './router/index.mjs' } }] },
    {
      code: "import { RouterProvider } from 'react-router/dom';",
      filename: 'App.tsx',
      errors: [{ messageId: 'library', data: { source: 'react-router/dom', module: './router/dom-export.mjs' } }],
    },
    { code: "import type { Location } from 'react-router';", filename: 'components/core/Utilities.ts', errors: [{ messageId: 'library' }] },
    { code: "const rr = await import('react-router');", filename: view, errors: [{ messageId: 'library' }] },
    { code: "export { Link } from 'react-router';", filename: 'index.ts', errors: [{ messageId: 'library' }] },
    { code: "import { reactRouter } from '@react-router/dev/vite';", filename: view, errors: [{ messageId: 'library' }] },
    {
      code: "import { MemoryRouter } from 'react-router';",
      filename: '.harness/Fixtures.tsx',
      errors: [{ messageId: 'outside', data: { source: 'react-router', module: '../dist/router/index.mjs' } }],
    },
    { code: "import { matchPath } from 'react-router';", filename: 'scripts/tool.js', errors: [{ messageId: 'outside' }] },
  ],
});
