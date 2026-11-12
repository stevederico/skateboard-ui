/**
 * Architectural layers of skateboard-ui and the import edges allowed between them.
 * This table is the single source for the `skateboard-ui/layer-boundaries` lint rule;
 * a dependency-cruiser config (or any other boundary checker) should mirror it 1:1:
 * one `forbidden` entry per pair that is NOT in ALLOWED_EDGES, plus EDGE_EXCEPTIONS.
 *
 * The table was derived from the real import graph at 5.13.0, so it describes how the
 * library is built, not how it might be built:
 *
 *   entry    App.tsx, index.ts            -> everything below
 *   views    components/views/            -> layout, widgets, core, hooks, ui, icons, shadcn
 *   widgets  components/*.tsx             -> core, hooks, ui, icons, shadcn
 *   layout   components/layout/           -> core, hooks, ui, icons, shadcn
 *   hooks    hooks/                       -> core, shadcn
 *   core     components/core/             -> icons, shadcn
 *   ui       ui/                          -> headless, icons, shadcn
 *   headless components/core/{Calendar,Command}.tsx   (leaf)
 *   icons    icons/                                   (leaf)
 *   shadcn   shadcn/                                  (leaf)
 *
 * Paths are repo-relative with forward slashes. The first matching layer wins, so
 * `headless` must stay above `core`, and `views` / `layout` / `core` above `widgets`.
 */

/**
 * @typedef {object} Layer
 * @property {string} name - Short layer id used in messages and ALLOWED_EDGES
 * @property {RegExp} pattern - Matches repo-relative paths in the layer
 * @property {string} description - What lives there (shown in lint messages)
 */

/** @type {Layer[]} */
export const LAYERS = [
  {
    name: 'entry',
    pattern: /^(?:App|index)(?:\.[jt]sx?)?$/,
    description: 'App.tsx + index.ts: package entry points that wire every view into createSkateboardApp',
  },
  { name: 'views', pattern: /^components\/views\//, description: 'components/views: full-page route views' },
  { name: 'layout', pattern: /^components\/layout\//, description: 'components/layout: the app frame (Layout, Sidebar, TabBar, Header)' },
  {
    name: 'headless',
    pattern: /^components\/core\/(?:Calendar|Command)(?:\.[jt]sx?)?$/,
    description: 'components/core/Calendar.tsx + Command.tsx: dependency-free headless primitives that ui/ styles',
  },
  {
    name: 'core',
    pattern: /^components\/core\//,
    description: 'components/core: context, Utilities (apiRequest, data hooks), ThemeProvider, constantsIcon',
  },
  {
    name: 'widgets',
    pattern: /^components\/[^/]+$/,
    description: 'components/*.tsx: shell widgets (AuthOverlay, ProtectedRoute, Sheet, UpgradeSheet, ThemeToggle, ErrorBoundary)',
  },
  { name: 'hooks', pattern: /^hooks\//, description: 'hooks/: public hooks built on core state (useAuthGate)' },
  { name: 'ui', pattern: /^ui\//, description: 'ui/: shadcn-style primitives, published as ./ui/* and ./shadcn/ui/*' },
  { name: 'icons', pattern: /^icons\//, description: 'icons/: the vendored lucide icon module (generated)' },
  { name: 'shadcn', pattern: /^shadcn\//, description: 'shadcn/: vendored class helpers (cn, cva, clsx, tailwind-merge) and use-mobile' },
  { name: 'tooling', pattern: /^(?:scripts|\.design-sync)\//, description: 'scripts/ + .design-sync/: Node maintenance and generator scripts' },
  { name: 'harness', pattern: /^\.harness\//, description: '.harness/: Playwright suite that tests the built dist/' },
  { name: 'guardrails', pattern: /^(?:guardrails\/|eslint\.config\.js$)/, description: 'guardrails/ + eslint.config.js: lint tooling' },
  { name: 'dist', pattern: /^dist\//, description: 'dist/: tsc build output, the only code that is published' },
];

/**
 * Allowed import edges: layer -> layers it may import from. Anything else is forbidden.
 *
 * @type {Record<string, string[]>}
 */
export const ALLOWED_EDGES = {
  entry: ['entry', 'views', 'layout', 'widgets', 'core', 'hooks', 'ui', 'icons', 'shadcn'],
  views: ['views', 'layout', 'widgets', 'core', 'hooks', 'ui', 'icons', 'shadcn'],
  widgets: ['widgets', 'core', 'hooks', 'ui', 'icons', 'shadcn'],
  layout: ['layout', 'core', 'hooks', 'ui', 'icons', 'shadcn'],
  hooks: ['hooks', 'core', 'shadcn'],
  core: ['core', 'icons', 'shadcn'],
  ui: ['ui', 'headless', 'icons', 'shadcn'],
  headless: ['headless'],
  icons: ['icons'],
  shadcn: ['shadcn'],
  tooling: ['tooling'],
  harness: ['harness', 'dist'],
  guardrails: ['guardrails'],
  dist: ['dist'],
};

/**
 * Named, file-level exceptions to ALLOWED_EDGES. Each one is an edge the real code
 * needs today; add a new one only with a reason, never to silence a new violation.
 *
 * @type {Array<{ from: RegExp, to: RegExp, reason: string }>}
 */
export const EDGE_EXCEPTIONS = [
  {
    from: /^components\/AuthOverlay\.tsx$/,
    to: /^components\/views\/Sign(?:In|Up)View(?:\.[jt]sx?)?$/,
    reason: 'AuthOverlay is the dialog that embeds the sign-in and sign-up views; it is the only widget that renders a view.',
  },
];

/** Layers compiled by tsc into dist/ and run in the consumer's browser bundle. */
export const LIBRARY_LAYERS = new Set(['entry', 'views', 'layout', 'widgets', 'hooks', 'core', 'headless', 'ui', 'icons', 'shadcn']);

/**
 * Why each layer is off-limits and what to do instead, keyed by the TARGET layer.
 *
 * @type {Record<string, { why: string, fix: string }>}
 */
export const TARGET_GUIDANCE = {
  entry: {
    why: 'App.tsx imports every view, layout and widget to build the router, so anything that imports it back creates a cycle and pulls the whole shell (and its createRoot call) into that module.',
    fix: 'import the specific module you need (e.g. `components/core/Utilities.js`, `components/core/Context.js`); if the value only exists in App.tsx, move it down into components/core/ and import it from both places.',
  },
  views: {
    why: 'views are full route pages at the top of the library; a lower layer that imports one drags a whole page (forms, auth flow, router hooks) into a primitive and creates a cycle, since views are built from those layers.',
    fix: 'take the view as a prop or `children`, or move the shared piece down into components/ (a widget) or ui/ (a primitive) and import that from both.',
  },
  layout: {
    why: 'components/layout is the app frame (Sidebar, TabBar, Header) and depends on router and context state; only views and the entry compose it, so importing it from a lower layer inverts the tree.',
    fix: 'pass the layout piece in as a prop or `children`, or move the shared part into ui/ (styled primitive) or components/core/ (state, helpers).',
  },
  widgets: {
    why: 'components/*.tsx are shell widgets wired to app context, auth and the router; lower layers (ui/, core, hooks, layout) must work without them, and ui/ in particular is published as standalone primitives.',
    fix: 'compose the widget from a view or the entry instead; if a lower layer needs the behavior, move the generic part into ui/ and keep the app wiring in the widget.',
  },
  hooks: {
    why: 'hooks/ are public hooks built on core context; core, ui/ and the leaf layers sit below them, so importing a hook there creates a cycle or ties a primitive to app state.',
    fix: 'read the state directly in the lower layer (`getState()` in components/core/Context.tsx) or accept the value as a prop.',
  },
  core: {
    why: 'components/core holds app state and network code (Context, Utilities, ThemeProvider); ui/ primitives, icons/ and shadcn/ are published as standalone building blocks and must render with no app context, router or backend.',
    fix: 'pass the data in as props from the component that composes the primitive. The only core files ui/ may import are the headless primitives components/core/Calendar.tsx and Command.tsx.',
  },
  headless: {
    why: 'components/core/Calendar.tsx and Command.tsx are unstyled, dependency-free replacements for react-day-picker and cmdk; ui/calendar.tsx and ui/command.tsx are their only styled wrappers, and every other layer would bypass the styling and public API.',
    fix: 'import the styled primitive instead: `ui/calendar.js` or `ui/command.js`.',
  },
  ui: {
    why: 'ui/ primitives are styled React components; core state, hooks/, the headless primitives, icons/ and shadcn/ sit below them and must stay usable without any styled component.',
    fix: 'move the shared logic down (a helper in shadcn/lib or components/core/) and let the ui/ file import it, or compose the primitive one level up in components/.',
  },
  icons: {
    why: 'icons/ is generated React SVG output; the layers below it (headless primitives, shadcn/ helpers, hooks/) and Node tooling must not depend on generated JSX.',
    fix: 'accept the icon as a prop or `children` (the headless Calendar takes a `Chevron` component), and let the ui/ or components/ caller pass the vendored icon in.',
  },
  shadcn: {
    why: 'shadcn/ holds vendored helpers (cn, cva, clsx, tailwind-merge, use-mobile); the headless primitives and icons/ are leaf modules with no styling dependency, and tooling must not import browser code.',
    fix: 'keep the leaf module dependency-free: accept `className` as a prop and join class names with a plain template string, or do the styling in the ui/ wrapper.',
  },
  tooling: {
    why: 'scripts/ and .design-sync/ are Node-only maintenance tools (fs, child_process, the TypeScript compiler API); they are excluded from tsconfig and never published, so library code that imports them fails typecheck and breaks in the browser.',
    fix: 'move the shared helper into the library layer that needs it (shadcn/lib for pure helpers), or duplicate the few lines.',
  },
  harness: {
    why: '.harness/ is a separate private package (Vite, Playwright) that is never published; importing it makes the library depend on test fixtures that consumers do not have.',
    fix: 'move the code into the library layer that owns it and import the built file from the harness (`../dist/...`).',
  },
  guardrails: {
    why: 'guardrails/ is lint tooling with its own node_modules; the library, scripts and harness must build and run without it installed, and it is not part of the npm tarball.',
    fix: 'do not import lint code; copy the constant you need, or express the check as a lint rule instead.',
  },
  dist: {
    why: 'dist/ is tsc build output that is deleted and rebuilt by `npm run build`; source that imports it compiles against stale or missing files and creates a build-order cycle. Only the harness tests dist/, because dist/ is what gets published.',
    fix: 'import the source file relatively with its `.js` extension (e.g. `../core/Utilities.js`); from the harness keep importing `../dist/...`.',
  },
  library: {
    why: 'the harness exists to test what is published, and that is dist/ (the Playwright webServer rebuilds it first); importing source files tests code paths Vite compiled differently from tsc and can pass while the published build is broken. Tooling reads source files as text (fs) and must not execute browser code in Node.',
    fix: 'from .harness/ import the built file: `../dist/<same path>.js`. From scripts/ read the file with `readFileSync` (see scripts/vendor-lucide-icons.js) instead of importing it.',
  },
};

/**
 * Find the layer a repo-relative path belongs to.
 *
 * @param {string} relPath - Repo-relative path with forward slashes
 * @returns {Layer | undefined} The first matching layer, or undefined (root files such as package.json)
 */
export function layerOf(relPath) {
  return LAYERS.find((layer) => layer.pattern.test(relPath));
}

/**
 * True when a named exception permits this exact file-to-file edge.
 *
 * @param {string} fromPath - Repo-relative importing file
 * @param {string} toPath - Repo-relative imported path
 * @returns {boolean} Whether the edge is a listed exception
 */
export function isException(fromPath, toPath) {
  return EDGE_EXCEPTIONS.some((e) => e.from.test(fromPath) && e.to.test(toPath));
}

/**
 * Guidance for a forbidden edge. Non-library layers importing library source get the
 * `library` entry (import dist/ or read with fs) instead of a per-layer explanation.
 *
 * @param {string} fromName - Importing layer name
 * @param {string} toName - Imported layer name
 * @returns {{ why: string, fix: string }} Root cause and fix
 */
export function guidanceFor(fromName, toName) {
  if (!LIBRARY_LAYERS.has(fromName) && LIBRARY_LAYERS.has(toName)) return TARGET_GUIDANCE.library;
  return TARGET_GUIDANCE[toName];
}
