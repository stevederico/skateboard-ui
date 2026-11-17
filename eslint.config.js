import plugin, { parser } from './guardrails/eslint-plugin/index.js';

const LIBRARY = ['App.tsx', 'index.ts', 'components/**/*.{ts,tsx}', 'hooks/**/*.{ts,tsx}', 'ui/**/*.{ts,tsx}', 'icons/**/*.{ts,tsx}', 'lib/**/*.{ts,tsx}'];

export default [
  {
    name: 'skateboard-ui/ignores',
    ignores: [
      '**/node_modules/**',
      'dist/**',
      '.harness/dist/**',
      '.harness/test-results/**',
      '.harness/playwright-report/**',
      'lib/tailwind-merge.js',
      'lib/tailwind-merge.d.ts',
      'router/**',
    ],
  },
  {
    name: 'skateboard-ui/parser',
    files: ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
    languageOptions: {
      parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    linterOptions: { reportUnusedDisableDirectives: 'error' },
  },
  {
    ...plugin.configs.base,
    files: [
      ...LIBRARY,
      'scripts/**/*.{js,mjs,ts}',
      '.design-sync/**/*.{js,mjs,ts}',
      '.harness/**/*.{ts,tsx,js,mjs}',
      'eslint.config.js',
      'guardrails/eslint-plugin/**/*.js',
    ],
  },
  {
    ...plugin.configs.library,
    files: LIBRARY,
  },
  {
    ...plugin.configs.composed,
    files: ['App.tsx', 'components/**/*.{ts,tsx}', 'hooks/**/*.{ts,tsx}'],
  },
  {
    name: 'skateboard-ui/no-op-classes',
    files: LIBRARY,
    rules: {
      'skateboard-ui/no-unknown-classes': [
        'error',
        {
          ignore: [
            'data-open:animate-in', 'data-open:fade-in-0', 'data-open:zoom-in-95',
            'data-closed:animate-out', 'data-closed:fade-out-0', 'data-closed:zoom-out-95',
            'data-[side=bottom]:slide-in-from-top-2', 'data-[side=top]:slide-in-from-bottom-2',
            'data-[side=left]:slide-in-from-right-2', 'data-[side=right]:slide-in-from-left-2',
            'slide-in-from-bottom-52', 'slide-out-to-bottom-52',
            'no-scrollbar', 'cn-calendar-caption-label', 'cn-calendar-dropdown-root',
          ],
        },
      ],
    },
  },
  {
    name: 'skateboard-ui/vendored',
    files: ['lib/cva.ts', 'lib/clsx.ts'],
    rules: { 'skateboard-ui/no-explicit-any': 'off' },
  },
];
