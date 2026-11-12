import { builtinModules } from 'node:module';
import { moduleSourceVisitors } from '../lib/moduleSources.js';
import { repoRelative, resolveSpecifier } from '../lib/paths.js';
import { ALLOWED_EDGES, LIBRARY_LAYERS, guidanceFor, isException, layerOf } from '../layers.js';

const BUILTINS = new Set(builtinModules);

/**
 * True for `node:fs`, `fs`, `fs/promises`, and other Node builtin specifiers.
 *
 * @param {string} source - Import specifier
 * @returns {boolean} Whether the specifier is a Node builtin
 */
export const isNodeBuiltin = (source) => source.startsWith('node:') || BUILTINS.has(source) || BUILTINS.has(source.split('/')[0]);

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Respect layer boundaries: ui/ primitives never import components/ (except the headless Calendar and Command), core never imports ui/, layout/ or views/, icons/ and shadcn/ are leaves, nothing imports App.tsx or index.ts, library code never imports scripts/, .harness/, guardrails/, dist/ or Node builtins, and the harness imports only dist/.',
      source: 'AGENTS.md > Layers (table in guardrails/eslint-plugin/layers.js)',
    },
    schema: [],
    messages: {
      crossLayer:
        'Found an import of "{{source}}" from the {{from}} layer ({{fromDesc}}) into the {{to}} layer ({{toDesc}}). Why: {{why}} Fix: {{fix}}',
      nodeBuiltin:
        'Found an import of the Node builtin "{{source}}" in {{from}} code. Why: every library layer is compiled into dist/ and bundled into the consumer\'s browser app, where Node builtins do not exist; the bundler stubs them and the call fails at runtime. ' +
        'Fix: use browser APIs (fetch, URL, crypto.subtle, TextEncoder); if the work is build-time or maintenance, put it in scripts/ and commit its output.',
      outsideLibrary:
        'Found an import of "{{source}}" that resolves to {{target}}, which is not a library source folder. Why: tsconfig compiles only App.tsx, index.ts, ui/, components/, hooks/, icons/ and shadcn/ into dist/, so this file is not in the published package and the import fails for consumers. ' +
        'Fix: move the value into a library folder (components/core/ for constants and helpers), or pass it in from the app through `constants` / props.',
      outsideRepo:
        'Found an import of "{{source}}" that climbs out of the repository. Why: other checkouts, CI and the npm tarball do not have that path, so the build only works on one machine. ' +
        'Fix: copy the code into the layer that owns it (vendored, like shadcn/lib), or make it a peer dependency in package.json.',
    },
  },
  create(context) {
    const fromPath = repoRelative(context);
    const fromLayer = layerOf(fromPath);
    if (!fromLayer) return {};
    const isLibrary = LIBRARY_LAYERS.has(fromLayer.name);

    return moduleSourceVisitors((node, source) => {
      if (isLibrary && isNodeBuiltin(source)) {
        context.report({ node, messageId: 'nodeBuiltin', data: { source, from: fromLayer.name } });
        return;
      }
      const target = resolveSpecifier(context, source);
      if (target === null) return;
      if (target.startsWith('../') || target === '..') {
        context.report({ node, messageId: 'outsideRepo', data: { source } });
        return;
      }
      const toLayer = layerOf(target);
      if (!toLayer) {
        if (isLibrary) context.report({ node, messageId: 'outsideLibrary', data: { source, target } });
        return;
      }
      if (ALLOWED_EDGES[fromLayer.name].includes(toLayer.name) || isException(fromPath, target)) return;
      const { why, fix } = guidanceFor(fromLayer.name, toLayer.name);
      context.report({
        node,
        messageId: 'crossLayer',
        data: { source, from: fromLayer.name, fromDesc: fromLayer.description, to: toLayer.name, toDesc: toLayer.description, why, fix },
      });
    });
  },
};
