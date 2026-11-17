import parser from '@typescript-eslint/parser';
import banTsComment from './rules/ban-ts-comment.js';
import iconsFromVendoredModule from './rules/icons-from-vendored-module.js';
import imgRequiresAlt from './rules/img-requires-alt.js';
import layerBoundaries from './rules/layer-boundaries.js';
import noBrowserDialogs from './rules/no-browser-dialogs.js';
import noClassComponents from './rules/no-class-components.js';
import noClassnameTemplateTernary from './rules/no-classname-template-ternary.js';
import noDarkVariant from './rules/no-dark-variant.js';
import noDeepPackageImports from './rules/no-deep-package-imports.js';
import noEmojiIcons from './rules/no-emoji-icons.js';
import noEmptyCatch from './rules/no-empty-catch.js';
import noExplicitAny from './rules/no-explicit-any.js';
import noFetchInEffect from './rules/no-fetch-in-effect.js';
import noFocusedOrSkippedTests from './rules/no-focused-or-skipped-tests.js';
import noForeignTestFrameworks from './rules/no-foreign-test-frameworks.js';
import noGlobalsPackage from './rules/no-globals-package.js';
import noInlineSvg from './rules/no-inline-svg.js';
import noOutlineNoneWithoutFocusRing from './rules/no-outline-none-without-focus-ring.js';
import noRawColorClasses from './rules/no-raw-color-classes.js';
import noReactRouterImport from './rules/no-react-router-import.js';
import noRequire from './rules/no-require.js';
import noSelfPackageImport from './rules/no-self-package-import.js';
import noShadcnPaths from './rules/no-shadcn-paths.js';
import noSpaceUtilities from './rules/no-space-utilities.js';
import noUnknownClasses from './rules/no-unknown-classes.js';
import noTransitionAll from './rules/no-transition-all.js';
import peerDependenciesOnly from './rules/peer-dependencies-only.js';
import preferSizeUtility from './rules/prefer-size-utility.js';

const NAMESPACE = 'skateboard-ui';

const BASE_RULES = {
  'ban-ts-comment': banTsComment,
  'no-explicit-any': noExplicitAny,
  'no-require': noRequire,
  'icons-from-vendored-module': iconsFromVendoredModule,
  'no-deep-package-imports': noDeepPackageImports,
  'no-self-package-import': noSelfPackageImport,
  'no-shadcn-paths': noShadcnPaths,
  'peer-dependencies-only': peerDependenciesOnly,
  'no-react-router-import': noReactRouterImport,
  'layer-boundaries': layerBoundaries,
  'no-empty-catch': noEmptyCatch,
  'no-foreign-test-frameworks': noForeignTestFrameworks,
  'no-focused-or-skipped-tests': noFocusedOrSkippedTests,
  'no-globals-package': noGlobalsPackage,
};

const LIBRARY_RULES = {
  'no-fetch-in-effect': noFetchInEffect,
  'no-class-components': noClassComponents,
  'no-browser-dialogs': noBrowserDialogs,
  'img-requires-alt': imgRequiresAlt,
  'no-emoji-icons': noEmojiIcons,
  'no-inline-svg': noInlineSvg,
  'no-classname-template-ternary': noClassnameTemplateTernary,
  'no-unknown-classes': noUnknownClasses,
};

const COMPOSED_RULES = {
  'no-dark-variant': noDarkVariant,
  'no-raw-color-classes': noRawColorClasses,
  'no-transition-all': noTransitionAll,
  'no-space-utilities': noSpaceUtilities,
  'no-outline-none-without-focus-ring': noOutlineNoneWithoutFocusRing,
  'prefer-size-utility': preferSizeUtility,
};

const CORE_RULES = {
  'no-var': 'error',
  'prefer-const': 'error',
  'object-shorthand': ['error', 'always'],
};

const asErrors = (rules) => Object.fromEntries(Object.keys(rules).map((name) => [`${NAMESPACE}/${name}`, 'error']));

const plugin = {
  meta: { name: 'eslint-plugin-skateboard-ui', version: '1.0.0', namespace: NAMESPACE },
  rules: { ...BASE_RULES, ...LIBRARY_RULES, ...COMPOSED_RULES },
  configs: {},
};

plugin.configs = {
  base: {
    name: 'skateboard-ui/base',
    plugins: { [NAMESPACE]: plugin },
    rules: { ...CORE_RULES, ...asErrors(BASE_RULES) },
  },
  library: {
    name: 'skateboard-ui/library',
    plugins: { [NAMESPACE]: plugin },
    rules: asErrors(LIBRARY_RULES),
  },
  composed: {
    name: 'skateboard-ui/composed',
    plugins: { [NAMESPACE]: plugin },
    rules: asErrors(COMPOSED_RULES),
  },
};

export { parser, BASE_RULES, LIBRARY_RULES, COMPOSED_RULES, CORE_RULES };
export default plugin;
