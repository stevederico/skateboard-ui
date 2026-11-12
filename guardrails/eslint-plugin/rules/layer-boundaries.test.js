import rule from './layer-boundaries.js';
import { runRuleTests } from '../lib/ruleTester.js';
import { LAYERS, guidanceFor, layerOf } from '../layers.js';

const view = 'components/views/SettingsView.tsx';
const primitive = 'ui/button.tsx';

/**
 * Invalid case for a forbidden edge, asserting the full message data so each case proves
 * which layers were detected and which guidance was chosen.
 *
 * @param {string} source - Import specifier
 * @param {string} filename - Repo-relative importing file
 * @param {string} to - Expected target layer name
 * @returns {object} RuleTester invalid case
 */
function crossLayer(source, filename, to) {
  const from = layerOf(filename);
  const target = LAYERS.find((l) => l.name === to);
  const data = { source, from: from.name, fromDesc: from.description, to, toDesc: target.description, ...guidanceFor(from.name, to) };
  return { code: `import x from '${source}';`, filename, errors: [{ messageId: 'crossLayer', data }] };
}

runRuleTests('layer-boundaries', rule, {
  valid: [
    // Real edges from the 5.13.0 import graph.
    { code: "import { Button } from '../../ui/button.js';", filename: view },
    { code: "import Header from '../layout/Header.js';", filename: view },
    { code: "import ThemeToggle from '../ThemeToggle.js';", filename: view },
    { code: "import { getState } from '../core/Context.js';", filename: view },
    { code: "import { Check } from '../../icons/index.js';", filename: view },
    { code: "import { cn } from '../../shadcn/lib/utils.js';", filename: 'components/layout/TabBar.tsx' },
    { code: "import { cn } from '../shadcn/lib/utils.js';", filename: primitive },
    { code: "import { Slot } from './slot.js';", filename: primitive },
    { code: "import { useIsMobile } from '../shadcn/hooks/use-mobile.js';", filename: 'ui/sidebar.tsx' },
    { code: "import { DayPicker } from '../components/core/Calendar.js';", filename: 'ui/calendar.tsx' },
    { code: "import { Command as CommandPrimitive } from '../components/core/Command.js';", filename: 'ui/command.tsx' },
    { code: "import { Home } from '../../icons/index.js';", filename: 'components/core/constantsIcon.tsx' },
    { code: "import { getState } from '../components/core/Context.js';", filename: 'hooks/useAuthGate.ts' },
    { code: "import SignInView from './views/SignInView.js';", filename: 'components/AuthOverlay.tsx' },
    { code: "import Layout from './components/layout/Layout.js';", filename: 'App.tsx' },
    { code: "export { createSkateboardApp } from './App.js';", filename: 'index.ts' },
    { code: "import { useState } from 'react';", filename: view },
    { code: "import { readFileSync } from 'node:fs';", filename: 'scripts/vendor-lucide-icons.js' },
    { code: "import { Button } from '../dist/ui/button.js';", filename: '.harness/Fixtures.tsx' },
    { code: "import { test, expect } from '@playwright/test';", filename: '.harness/tests/menus.spec.ts' },
    { code: "import plugin from './guardrails/eslint-plugin/index.js';", filename: 'eslint.config.js' },
    { code: "import { x } from '../../somewhere.js';", filename: 'fonts/readme.js' },
  ],
  invalid: [
    crossLayer('../components/ThemeToggle.js', primitive, 'widgets'),
    crossLayer('../components/core/Context.js', primitive, 'core'),
    crossLayer('../components/views/SettingsView.js', primitive, 'views'),
    crossLayer('../components/layout/Header.js', primitive, 'layout'),
    crossLayer('../hooks/useAuthGate.js', primitive, 'hooks'),
    crossLayer('../../ui/button.js', 'components/core/ThemeProvider.tsx', 'ui'),
    crossLayer('../layout/Layout.js', 'components/core/Utilities.ts', 'layout'),
    crossLayer('../../hooks/useAuthGate.js', 'components/core/Context.tsx', 'hooks'),
    crossLayer('../views/SignInView.js', 'components/layout/Header.tsx', 'views'),
    crossLayer('../ThemeToggle.js', 'components/layout/Header.tsx', 'widgets'),
    crossLayer('./views/NotFound.js', 'components/ProtectedRoute.tsx', 'views'),
    // The AuthOverlay exception covers only the sign-in and sign-up views.
    crossLayer('./views/SettingsView.js', 'components/AuthOverlay.tsx', 'views'),
    crossLayer('./layout/Header.js', 'components/Sheet.tsx', 'layout'),
    crossLayer('../core/Calendar.js', view, 'headless'),
    crossLayer('../../icons/index.js', 'components/core/Calendar.tsx', 'icons'),
    crossLayer('../../shadcn/lib/utils.js', 'components/core/Command.tsx', 'shadcn'),
    crossLayer('../shadcn/lib/utils.js', 'icons/index.tsx', 'shadcn'),
    crossLayer('../../ui/button.js', 'shadcn/lib/utils.ts', 'ui'),
    crossLayer('../../App.js', view, 'entry'),
    crossLayer('../index.js', 'hooks/useAuthGate.ts', 'entry'),
    crossLayer('../../scripts/vendor-lucide-icons.js', view, 'tooling'),
    crossLayer('../.harness/Fixtures.js', primitive, 'harness'),
    crossLayer('../guardrails/eslint-plugin/layers.js', primitive, 'guardrails'),
    crossLayer('../../dist/ui/button.js', view, 'dist'),
    // Non-library code gets the "import dist/ or read with fs" guidance.
    crossLayer('../ui/button.js', '.harness/Fixtures.tsx', 'ui'),
    crossLayer('../../components/core/Utilities.js', '.harness/tests/is-subscriber.spec.ts', 'core'),
    crossLayer('../icons/index.js', 'scripts/vendor-lucide-icons.js', 'icons'),
    crossLayer('../guardrails/eslint-plugin/layers.js', 'scripts/tool.js', 'guardrails'),
    crossLayer('../../shadcn/lib/utils.js', 'guardrails/eslint-plugin/index.js', 'shadcn'),
    { code: "import { readFileSync } from 'node:fs';", filename: view, errors: [{ messageId: 'nodeBuiltin' }] },
    { code: "import path from 'path';", filename: 'shadcn/lib/utils.ts', errors: [{ messageId: 'nodeBuiltin' }] },
    { code: "import pkg from '../../package.json';", filename: view, errors: [{ messageId: 'outsideLibrary' }] },
    { code: "import { x } from '../../../other-repo/x.js';", filename: 'scripts/tool.js', errors: [{ messageId: 'outsideRepo' }] },
  ],
});
