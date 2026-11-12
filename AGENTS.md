# AGENTS.md

Project guidance for AI agents working in this repository.
This file is the source of truth; `CLAUDE.md` is a symlink to it.

skateboard-ui is the published React shell (`@stevederico/skateboard-ui`) that skateboard apps import. Everything here ships into other people's apps, so the rules below are stricter than app code.

## Commands

```bash
npm ci                       # root: typescript, react-router, tailwindcss, @types (pinned)
npm run typecheck            # tsc --noEmit, strict
npm run build                # tsc -> dist/, then scripts/copy-dist-assets.js
npm run guardrails:install   # once: ESLint + TS parser into guardrails/ (nested, pinned)
npm run lint                 # local guardrails plugin (see Guardrails)
npm run test:guardrails      # RuleTester suite for every rule (node --test)
cd .harness && npm ci && npx playwright test   # Playwright suite against the built dist/
npm pack --dry-run           # must list only dist/, styles.css, fonts/, CHANGELOG, README, LICENSE-lucide
```

## Guardrails

Every written "never / always" rule an agent keeps breaking becomes a machine check whose error message teaches the root cause and the fix. The rules in this file are the spec; `npm run lint` enforces the ones a single file's AST or path can prove.

- **Where:** `guardrails/eslint-plugin/`, zero-dependency ES modules, one file per rule in `rules/` with a `<rule>.test.js` next to it. `eslint.config.js` wires three configs: `base` (every linted file), `library` (all library React code), `composed` (styling rules for `App.tsx`, `components/`, `hooks/`).
- **Why nested:** ESLint, `@typescript-eslint/parser` and its TypeScript live in `guardrails/package.json` with their own lockfile, so the root package gains no dependencies and the npm tarball is unchanged. Never add them to the root, and never add third-party rule packs, shareable configs or the `globals` package.
- **Adding a rule:** when you write a new "never" rule here, add a lint rule for it if one file can prove it. Every message must say what was found, `Why:` the repo forbids it, and `Fix:` with the exact file, export or command (the test harness asserts this). Register it in `guardrails/eslint-plugin/index.js`.
- **Disabling:** only with `// eslint-disable-next-line skateboard-ui/<rule> -- <reason>`; unused disables fail lint.

## Rules enforced by lint

### Dependencies and imports

| Rule | Lint rule |
|---|---|
| Library code imports only its peers (`react`, `react-dom`, `react-router`) and relative files. The package has no `dependencies`; everything else is vendored (`shadcn/lib`, `components/core/Command.tsx`, `Calendar.tsx`, `icons/`) | `peer-dependencies-only` |
| Never import `@stevederico/skateboard-ui/...` from inside the package; use relative paths with the `.js` extension | `no-self-package-import` |
| Never import through `node_modules/` or a package's `dist/`, `build/`, `esm/`, `cjs/` | `no-deep-package-imports` |
| ES modules only, never `require()` or `module.exports` | `no-require` |
| Never add the `globals` package | `no-globals-package` |

### Icons

| Rule | Lint rule |
|---|---|
| Never import `lucide-react` (or any lucide package), anywhere. Every icon is a named, relative import from `icons/index.js`; no deep `icons/...` paths, no `import *` / `export *` of the icon module | `icons-from-vendored-module` |
| No inline `<svg>` in components | `no-inline-svg` |
| No emoji as UI icons | `no-emoji-icons` |

`icons/index.tsx` is generated. Do not edit it; add icons with `npm i --no-save lucide-react@0.546.0 && node scripts/vendor-lucide-icons.js`, then remove `node_modules/lucide-react`. Apps import the same icons by name from the public `@stevederico/skateboard-ui/icons` export (5.13.1); inside the package, always use the relative `icons/index.js` path. There is no public DynamicIcon.

### Layers

`guardrails/eslint-plugin/layers.js` is the layer table and the allowed import edges; `layer-boundaries` enforces it. It was derived from the real import graph.

| Layer | Path | May import |
|---|---|---|
| entry | `App.tsx`, `index.ts` | every library layer below |
| views | `components/views/` | layout, widgets, core, hooks, ui, icons, shadcn |
| widgets | `components/*.tsx` | core, hooks, ui, icons, shadcn |
| layout | `components/layout/` | core, hooks, ui, icons, shadcn |
| hooks | `hooks/` | core, shadcn |
| core | `components/core/` | icons, shadcn |
| ui | `ui/` | headless, icons, shadcn |
| headless | `components/core/Calendar.tsx`, `Command.tsx` | nothing (leaf) |
| icons | `icons/` | nothing (leaf) |
| shadcn | `shadcn/` | nothing (leaf) |
| tooling | `scripts/`, `.design-sync/` | itself only |
| harness | `.harness/` | itself and `dist/` only |
| guardrails | `guardrails/`, `eslint.config.js` | itself only |

- `ui/` primitives never import `components/` (only the two headless files); they must render with no app context, router or backend.
- Nothing imports `App.tsx` or `index.ts`.
- Library code never imports `scripts/`, `.harness/`, `guardrails/`, `dist/`, Node builtins, or files outside the library folders.
- The harness tests the built `dist/`, never source files.
- One named exception: `components/AuthOverlay.tsx` may import the sign-in and sign-up views. Add exceptions in `layers.js` with a reason, never to silence a new violation.

### React

| Rule | Lint rule |
|---|---|
| No data fetching inside `useEffect` / `useLayoutEffect` (`fetch`, `apiRequest` and the other Utilities request helpers, axios-style clients). Reads go through a data hook in `components/core/Utilities.ts` (`useListData`, or a new `use*` hook added there); writes go in event handlers. `use*` hooks in `Utilities.ts` are the one place an effect may fetch | `no-fetch-in-effect` |
| Function components only; the one allowed class is an error boundary | `no-class-components` |
| Never `alert()`, `confirm()`, `prompt()`; use `ui/alert-dialog`, `ui/dialog` | `no-browser-dialogs` |
| Every `<img>` has `alt` | `img-requires-alt` |
| Conditional classes use `cn()`, never a template literal ternary | `no-classname-template-ternary` |

### TypeScript

| Rule | Lint rule |
|---|---|
| Never `any` for values; use `unknown` and narrow. Allowed only in three public-API idioms: `ComponentType<any>`, a pass-through `[key: string]: any` props index signature, and a generic default `<T = any>` | `no-explicit-any` |
| Never `@ts-ignore` or `@ts-nocheck`; `@ts-expect-error` needs a reason | `ban-ts-comment` |
| `const` over `let`, never `var`, object shorthand | ESLint core `prefer-const`, `no-var`, `object-shorthand` |

### Errors

| Rule | Lint rule |
|---|---|
| Never swallow errors. An empty `catch` is allowed only with a comment inside that says why ignoring is safe (blocked `localStorage`, optional Turnstile). No `.catch(() => {})`; an explicit fallback is `.catch(() => null)` | `no-empty-catch` |

### Styling (`App.tsx`, `components/`, `hooks/`)

These do not run on `ui/`, whose class lists follow the upstream shadcn base-vega source.

| Rule | Lint rule |
|---|---|
| Semantic tokens only (`bg-background`, `text-foreground`, `border-border`, `bg-app`), never raw palette colors or hex | `no-raw-color-classes` |
| Never manual `dark:` overrides | `no-dark-variant` |
| Never `transition-all` | `no-transition-all` |
| `gap-*`, never `space-x-*` / `space-y-*` | `no-space-utilities` |
| Never `outline-none` without a focus-visible replacement | `no-outline-none-without-focus-ring` |
| `size-*` for squares, not `w-N h-N` | `prefer-size-utility` |

### Tests

| Rule | Lint rule |
|---|---|
| Two runners only: Playwright in `.harness/` and `node --test` for guardrails. No Jest, Vitest, Mocha, Testing Library, Cypress | `no-foreign-test-frameworks` |
| No `.only`, `.skip`, `.fixme` left in specs (Playwright's conditional `test.skip(condition, reason)` is fine) | `no-focused-or-skipped-tests` |

## Rules that are NOT linted (and why)

| Rule | Why not linted |
|---|---|
| Every dependency (root, `.harness/`, `guardrails/`) is pinned exactly, no `^` / `~`, at least 7 days old (`npm view <pkg> time`), with a committed lockfile; install with `npm ci` | JSON and registry data, not source. Check by hand before adding |
| Never add a `dependencies` block to `package.json`; peers are `react`, `react-dom`, `react-router`, `tailwindcss` | JSON. `peer-dependencies-only` covers the import side |
| Never loosen `strict` in `tsconfig.json`; relative imports carry the `.js` extension | `npm run typecheck` enforces both |
| Never publish by hand. A release is a pushed version tag; `publish.yml` checks tag = `package.json` version, then `npm ci`, typecheck, build and the harness suite | CI workflow, not source |
| Workflow actions are pinned to commit SHAs and npm to an exact version | YAML |
| Bump `version` in `package.json` and `package-lock.json` together and add a `CHANGELOG.md` entry in the existing style (version line, then short two-space-indented items) | JSON and Markdown |
| The tarball is `dist/`, `styles.css`, `fonts/`, `CHANGELOG.md`, `README.md`, `LICENSE-lucide` only. Never add `guardrails/`, `.harness/` or `scripts/` to `files` | JSON. Check with `npm pack --dry-run` |
| A new public component needs an `exports` entry in `package.json` and a row in the README table | Cross-file (JSON plus Markdown) |
| Never edit generated files: `icons/index.tsx` (`scripts/vendor-lucide-icons.js`), `shadcn/lib/tailwind-merge.js` (`scripts/vendor-tailwind-merge.js`) | Needs a diff against generator output |
| Never overwrite `ui/` from upstream. `scripts/pull-shadcn-base-vega.js` writes to a staging directory with a deviation ledger; adoption is a reviewed copy | Process rule |
| New behavior gets a Playwright spec in `.harness/tests/` with a fixture that imports from `../dist/` | Needs to know what changed |
| Skeletons for content waits, spinners for actions | Design judgment |
| Escape closes overlays, focus is trapped and restored, menus are keyboard reachable | Runtime behavior; the harness specs cover it |
| README, JSDoc and code stay in sync | Prose |
