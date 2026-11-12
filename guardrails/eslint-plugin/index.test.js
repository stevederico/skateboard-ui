import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import plugin, { BASE_RULES, COMPOSED_RULES, LIBRARY_RULES, parser } from './index.js';
import { ALLOWED_EDGES, EDGE_EXCEPTIONS, LAYERS, LIBRARY_LAYERS, TARGET_GUIDANCE, guidanceFor, isException, layerOf } from './layers.js';

const RULES_DIR = fileURLToPath(new URL('./rules/', import.meta.url));
const files = readdirSync(RULES_DIR);
const ruleFiles = files.filter((f) => f.endsWith('.js') && !f.endsWith('.test.js')).map((f) => f.slice(0, -3));
const PREFIX = 'skateboard-ui/';

describe('plugin registry', () => {
  it('registers every rule file under its file name', () => {
    assert.deepEqual(Object.keys(plugin.rules).sort(), ruleFiles.sort());
  });

  it('ships a RuleTester file for every rule', () => {
    const missing = ruleFiles.filter((name) => !files.includes(`${name}.test.js`));
    assert.deepEqual(missing, []);
  });

  it('enables every rule in exactly one config', () => {
    const enabled = Object.values(plugin.configs)
      .flatMap((config) => Object.keys(config.rules))
      .filter((key) => key.startsWith(PREFIX))
      .map((key) => key.slice(PREFIX.length));
    assert.deepEqual(enabled.sort(), Object.keys(plugin.rules).sort());
    const total = Object.keys(BASE_RULES).length + Object.keys(LIBRARY_RULES).length + Object.keys(COMPOSED_RULES).length;
    assert.equal(total, Object.keys(plugin.rules).length, 'a rule is listed in two configs');
  });

  it('re-exports the TypeScript parser for the root config', () => {
    assert.equal(typeof parser.parseForESLint, 'function');
  });

  it('exposes meta with the skateboard-ui namespace', () => {
    assert.equal(plugin.meta.namespace, 'skateboard-ui');
  });
});

describe('layer table', () => {
  it('gives every layer allowed edges and teaching guidance', () => {
    for (const { name } of LAYERS) {
      assert.ok(ALLOWED_EDGES[name], `ALLOWED_EDGES is missing ${name}`);
      assert.ok(TARGET_GUIDANCE[name]?.why && TARGET_GUIDANCE[name]?.fix, `TARGET_GUIDANCE is missing ${name}`);
    }
  });

  it('only allows edges to known layers', () => {
    const names = new Set(LAYERS.map((l) => l.name));
    for (const targets of Object.values(ALLOWED_EDGES)) for (const t of targets) assert.ok(names.has(t), `unknown layer ${t}`);
    for (const name of LIBRARY_LAYERS) assert.ok(names.has(name), `unknown library layer ${name}`);
  });

  it('keeps the leaf layers leaf and the entry unimported', () => {
    for (const leaf of ['headless', 'icons', 'shadcn']) assert.deepEqual(ALLOWED_EDGES[leaf], [leaf]);
    for (const [from, targets] of Object.entries(ALLOWED_EDGES)) {
      if (from !== 'entry') assert.ok(!targets.includes('entry'), `${from} may not import the entry`);
    }
  });

  it('never lets library layers reach tooling, harness, guardrails or dist', () => {
    for (const name of LIBRARY_LAYERS) {
      for (const banned of ['tooling', 'harness', 'guardrails', 'dist']) {
        assert.ok(!ALLOWED_EDGES[name].includes(banned), `${name} may not import ${banned}`);
      }
    }
  });

  it('classifies the real repo layout', () => {
    assert.equal(layerOf('App.tsx')?.name, 'entry');
    assert.equal(layerOf('index.ts')?.name, 'entry');
    assert.equal(layerOf('components/views/SettingsView.tsx')?.name, 'views');
    assert.equal(layerOf('components/layout/Sidebar.tsx')?.name, 'layout');
    assert.equal(layerOf('components/core/Calendar.tsx')?.name, 'headless');
    assert.equal(layerOf('components/core/Command.js')?.name, 'headless');
    assert.equal(layerOf('components/core/Utilities.ts')?.name, 'core');
    assert.equal(layerOf('components/core/constantsIcon.tsx')?.name, 'core');
    assert.equal(layerOf('components/AuthOverlay.tsx')?.name, 'widgets');
    assert.equal(layerOf('hooks/useAuthGate.ts')?.name, 'hooks');
    assert.equal(layerOf('ui/button.tsx')?.name, 'ui');
    assert.equal(layerOf('icons/index.tsx')?.name, 'icons');
    assert.equal(layerOf('shadcn/lib/utils.ts')?.name, 'shadcn');
    assert.equal(layerOf('scripts/vendor-lucide-icons.js')?.name, 'tooling');
    assert.equal(layerOf('.harness/tests/menus.spec.ts')?.name, 'harness');
    assert.equal(layerOf('eslint.config.js')?.name, 'guardrails');
    assert.equal(layerOf('guardrails/eslint-plugin/index.js')?.name, 'guardrails');
    assert.equal(layerOf('dist/index.js')?.name, 'dist');
    assert.equal(layerOf('package.json'), undefined);
  });

  it('documents every exception and scopes it to single files', () => {
    for (const e of EDGE_EXCEPTIONS) assert.ok(e.reason.length > 20, 'an exception needs a reason');
    assert.ok(isException('components/AuthOverlay.tsx', 'components/views/SignInView.js'));
    assert.ok(!isException('components/AuthOverlay.tsx', 'components/views/SettingsView.js'));
    assert.ok(!isException('components/Sheet.tsx', 'components/views/SignInView.js'));
  });

  it('tells non-library code to use dist/ or fs instead of importing source', () => {
    assert.equal(guidanceFor('harness', 'ui'), TARGET_GUIDANCE.library);
    assert.equal(guidanceFor('tooling', 'icons'), TARGET_GUIDANCE.library);
    assert.equal(guidanceFor('ui', 'core'), TARGET_GUIDANCE.core);
  });
});
