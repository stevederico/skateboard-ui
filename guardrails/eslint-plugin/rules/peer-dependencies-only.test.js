import rule from './peer-dependencies-only.js';
import { runRuleTests } from '../lib/ruleTester.js';

runRuleTests('peer-dependencies-only', rule, {
  valid: [
    "import { useEffect } from 'react';",
    "import { jsx } from 'react/jsx-runtime';",
    { code: "import { createRoot } from 'react-dom/client';", filename: 'App.tsx' },
    { code: "import { createPortal } from 'react-dom';", filename: 'ui/portal.tsx' },
    "import { useNavigate } from 'react-router';",
    "import { cn } from '../../shadcn/lib/utils.js';",
    // Tooling and the harness have their own dependencies.
    { code: "import ts from 'typescript';", filename: 'scripts/pull-shadcn-base-vega.js' },
    { code: "import { test } from '@playwright/test';", filename: '.harness/tests/menus.spec.ts' },
    { code: "import { RuleTester } from 'eslint';", filename: 'guardrails/eslint-plugin/lib/ruleTester.js' },
    // Reported by their own rules instead.
    "import { Plus } from 'lucide-react';",
    "import { readFileSync } from 'node:fs';",
    "import { getState } from '@stevederico/skateboard-ui/Context';",
  ],
  invalid: [
    { code: "import { clsx } from 'clsx';", filename: 'shadcn/lib/utils.ts', errors: [{ messageId: 'notPeer', data: { source: 'clsx', pkg: 'clsx' } }] },
    { code: "import { Command } from 'cmdk';", filename: 'ui/command.tsx', errors: [{ messageId: 'notPeer' }] },
    { code: "import { DayPicker } from 'react-day-picker';", filename: 'ui/calendar.tsx', errors: [{ messageId: 'notPeer' }] },
    { code: "import * as Dialog from '@radix-ui/react-dialog';", filename: 'ui/dialog.tsx', errors: [{ messageId: 'notPeer', data: { source: '@radix-ui/react-dialog', pkg: '@radix-ui/react-dialog' } }] },
    { code: "import { Link } from 'react-router-dom';", errors: [{ messageId: 'notPeer' }] },
    { code: "import axios from 'axios';", filename: 'components/core/Utilities.ts', errors: [{ messageId: 'notPeer' }] },
    { code: "import type { Properties } from 'csstype';", filename: 'ui/slot.tsx', errors: [{ messageId: 'notPeer' }] },
    { code: "const { toast } = await import('sonner');", errors: [{ messageId: 'notPeer' }] },
  ],
});
