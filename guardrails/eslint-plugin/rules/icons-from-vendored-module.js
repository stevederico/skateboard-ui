import { moduleSourceVisitors, mergeVisitors, packageName } from '../lib/moduleSources.js';
import { repoRelative, resolveSpecifier, specifierTo } from '../lib/paths.js';
import { LIBRARY_LAYERS, layerOf } from '../layers.js';

/** The one icon module, as imports must spell it (NodeNext needs the `.js` extension). */
export const ICON_MODULE = 'icons/index.js';

/** Lucide distributions. None is a dependency of this package since 5.13.0. */
const LUCIDE_PACKAGES = new Set(['lucide-react', 'lucide', 'lucide-static', 'lucide-react-native']);

/**
 * True for any lucide package specifier, including deep paths and the @lucide scope.
 *
 * @param {string} source - Import specifier
 * @returns {boolean} Whether the specifier names a lucide package
 */
export const isLucide = (source) => LUCIDE_PACKAGES.has(packageName(source)) || source.startsWith('@lucide/');

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Never import lucide-react (or any lucide package); every icon comes from the vendored icons/index.tsx module by relative named import.',
      source: 'AGENTS.md > Icons; CHANGELOG.md 5.13.0',
    },
    schema: [],
    messages: {
      lucide:
        'Found an import of "{{source}}". Why: skateboard-ui dropped lucide-react in 5.13.0 and ships no runtime dependencies, so the package is not in a consumer\'s node_modules and this import fails to resolve in every app (or bundles a second, untree-shaken icon set). ' +
        'Fix: import the same names from the vendored module: `import { {{names}} } from "{{module}}";`. If a name is not exported there yet, add it by running the generator (`npm i --no-save lucide-react@0.546.0 && node scripts/vendor-lucide-icons.js`, then remove node_modules/lucide-react); it scans these imports and copies the SVG data.',
      lucideTooling:
        'Found an import of "{{source}}" in non-library code. Why: lucide-react is not a dependency of this repo or of .harness/ (dropped in 5.13.0), so the import only works on a machine where it happens to be installed and fails in CI. ' +
        'Fix: in scripts/ read the package files with `readFileSync` from a path argument, as scripts/vendor-lucide-icons.js does; in .harness/ render icons through the built components in `../dist/`.',
      deepIcon:
        'Found an icon import of "{{source}}", which resolves to {{target}} instead of {{expected}}. Why: icons/index.tsx is one generated file whose named exports are the audited icon list; any other path either does not exist after the next `node scripts/vendor-lucide-icons.js` run or is a hand-added icon the generator will delete. ' +
        'Fix: use `import { {{names}} } from "{{module}}";` and add missing names through the generator.',
      namespace:
        'Found a namespace or star import of the icon module ("{{source}}"). Why: each vendored icon is its own `/* @__PURE__ */` named export so consumer bundlers tree-shake unused ones; `import *` / `export *` keeps all of them reachable and ships every icon. ' +
        'Fix: import by name: `import { ChevronRight, Check } from "{{module}}";`. For a name-to-icon lookup build an explicit map like components/core/constantsIcon.tsx does.',
    },
  },
  create(context) {
    const fromPath = repoRelative(context);
    const fromLayer = layerOf(fromPath);
    const isLibrary = fromLayer ? LIBRARY_LAYERS.has(fromLayer.name) : false;
    const inIcons = fromLayer?.name === 'icons';
    const module = specifierTo(context, ICON_MODULE);

    /**
     * Names imported by the declaration that owns a specifier node, for the suggested fix.
     *
     * @param {any} node - Specifier (source) node
     * @returns {string} Comma-separated names, or a placeholder
     */
    function importedNames(node) {
      const names = (node.parent?.specifiers ?? [])
        .filter((s) => s.type === 'ImportSpecifier' || s.type === 'ExportSpecifier')
        .map((s) => {
          const id = s.type === 'ImportSpecifier' ? s.imported : s.local;
          return id.type === 'Identifier' ? id.name : id.value;
        });
      return names.length ? names.join(', ') : 'IconName';
    }

    /**
     * True when the specifier resolves to the icon module.
     *
     * @param {string} source - Import specifier
     * @returns {boolean} Whether the import targets icons/index
     */
    const targetsIconModule = (source) => /^icons\/index(?:\.[jt]sx?)?$/.test(resolveSpecifier(context, source) ?? '');

    return mergeVisitors(
      moduleSourceVisitors((node, source) => {
        if (isLucide(source)) {
          context.report({ node, messageId: isLibrary ? 'lucide' : 'lucideTooling', data: { source, names: importedNames(node), module } });
          return;
        }
        if (!isLibrary || inIcons) return;
        const target = resolveSpecifier(context, source);
        if (target === null || !/^icons(?:\/|$)/.test(target) || target === ICON_MODULE) return;
        context.report({ node, messageId: 'deepIcon', data: { source, target, expected: ICON_MODULE, names: importedNames(node), module } });
      }),
      {
        ImportDeclaration(node) {
          if (inIcons || !targetsIconModule(node.source.value)) return;
          if (node.specifiers.some((s) => s.type === 'ImportNamespaceSpecifier')) {
            context.report({ node, messageId: 'namespace', data: { source: node.source.value, module } });
          }
        },
        ExportAllDeclaration(node) {
          if (inIcons || !targetsIconModule(node.source.value)) return;
          context.report({ node, messageId: 'namespace', data: { source: node.source.value, module } });
        },
      },
    );
  },
};
