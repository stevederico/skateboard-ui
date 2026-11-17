# AGENTS.md

Project guidance for AI agents working in this repository.
This file is the source of truth; `CLAUDE.md` is a symlink to it.

skateboard-ui is the published React shell (`@stevederico/skateboard-ui`) that skateboard apps import. Everything here ships into other people's apps, so the rules below are stricter than app code.

## Commands

```bash
npm ci                       # root: typescript, @types (pinned)
npm run typecheck            # tsc --noEmit, strict
npm run build                # tsc -> dist/, then scripts/copy-dist-assets.js
npm run guardrails:install   # once: ESLint + TS parser into guardrails/ (nested, pinned)
npm run lint                 # local guardrails plugin (see Guardrails)
npm run test:guardrails      # RuleTester suite for every rule (node --test)
cd .harness && npm ci && npx playwright test   # Playwright suite against the built dist/
npm pack --dry-run           # must list only dist/, styles.css, fonts/, CHANGELOG, README, LICENSE-lucide, LICENSE-react-router
node scripts/vendor-react-router.js 7.18.5 1.1.1 2.7.3   # re-copy react-router (+ cookie, set-cookie-parser) into router/
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
| Library code imports only its peers (`react`, `react-dom`) and relative files. The package has no `dependencies`; everything else is vendored (`lib/` (cn, cva, clsx, tailwind-merge), `components/core/Command.tsx`, `Calendar.tsx`, `icons/`, `router/`) | `peer-dependencies-only` |
| Never import `react-router` (or `react-router-dom`, `react-router/dom`, `@react-router/*`). The router is vendored in `router/` and the package ships exactly one copy: library code imports `router/index.mjs` (or `router/dom-export.mjs`) by relative path, the harness imports `../dist/router/index.mjs`, apps import `@stevederico/skateboard-ui/router` | `no-react-router-import` |
| Never import `@stevederico/skateboard-ui/shadcn/...` or the `shadcn/` folder (removed in 5.17.0): helpers are in `lib/` (`./lib/utils`), `useIsMobile` in `hooks/use-mobile.ts` (`./hooks/use-mobile`), primitives in `ui/` (`./ui/*`). The only remaining "shadcn" names are upstream references (the base-vega source of `ui/`) | `no-shadcn-paths` |
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
| views | `components/views/` | layout, widgets, core, hooks, ui, icons, lib, router |
| widgets | `components/*.tsx` | core, hooks, ui, icons, lib, router |
| layout | `components/layout/` | core, hooks, ui, icons, lib, router |
| hooks | `hooks/` camelCase files (`useAuthGate.ts`) | core, lib, router |
| core | `components/core/` | icons, lib, router |
| ui | `ui/` | headless, icons, lib |
| headless | `components/core/Calendar.tsx`, `Command.tsx` | nothing (leaf) |
| icons | `icons/` | nothing (leaf) |
| router | `router/` (vendored react-router, generated) | nothing (leaf; only `react`, `react-dom`) |
| lib | `lib/`, `hooks/use-*.ts` (dependency-free hooks: `use-mobile`, `use-media-query`, `use-event-listener`, `use-interval`, `use-timeout`, `use-stored-state`, `use-mount-effect`, internal `use-latest`) | nothing (leaf) |
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
| Every static class token in library code (`className`, `cn()`, `cva()`) is defined by `styles.css`. Marker classes (`group/x`, `peer/x`) are always fine; known no-op tokens are listed with a reason in `eslint.config.js` | `no-unknown-classes` |

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
| Semantic tokens only (`bg-background`, `text-foreground`, `border-border`, `bg-app`, status `success` / `warning` / `info` / `danger`), never raw palette colors or hex | `no-raw-color-classes` |
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
| Never add a `dependencies` block to `package.json`; peers are `react`, `react-dom`. Never add `react-router` or `tailwindcss` back as a peer or devDependency | JSON. `peer-dependencies-only` and `no-react-router-import` cover the import side |
| Never loosen `strict` in `tsconfig.json`; relative imports carry the `.js` extension (`.mjs` for the vendored `router/`) | `npm run typecheck` enforces both |
| Never publish by hand. A release is a pushed version tag; `publish.yml` checks tag = `package.json` version, then `npm ci`, typecheck, build and the harness suite | CI workflow, not source |
| Workflow actions are pinned to commit SHAs and npm to an exact version | YAML |
| Bump `version` in `package.json` and `package-lock.json` together and add a `CHANGELOG.md` entry in the existing style (version line, then short two-space-indented items) | JSON and Markdown |
| The tarball is `dist/`, `styles.css`, `fonts/`, `CHANGELOG.md`, `README.md`, `LICENSE-lucide`, `LICENSE-react-router` only. Never add `guardrails/`, `.harness/` or `scripts/` to `files` | JSON. Check with `npm pack --dry-run` |
| A new public component needs an `exports` entry in `package.json` and a row in the README table | Cross-file (JSON plus Markdown) |
| Never edit generated files: `icons/index.tsx` (`scripts/vendor-lucide-icons.js`), `lib/tailwind-merge.js` (`scripts/vendor-tailwind-merge.js`), `router/` and `LICENSE-react-router` (`scripts/vendor-react-router.js`), |
| Never add `tailwindcss`, `@tailwindcss/*` or any CSS framework to any `package.json` here (root, `.harness/`, `guardrails/`). `styles.css` is plain CSS, edited by hand: a component that uses a new class gets its rule added to `styles.css` (the plain-CSS equivalent, using the theme variables) in the same commit | JSON. `no-unknown-classes` covers the class side |
| No Tailwind tooling lives here (no converter, no build plugin): `styles.css` and `.harness/harness.css` are edited by hand | Process rule |
| Security advisories for react-router (and cookie, set-cookie-parser) are watched by hand: check https://github.com/remix-run/react-router/security/advisories and re-run `scripts/vendor-react-router.js` when one applies | No dependency, so no `npm audit` or Dependabot sees it |
| Never overwrite `ui/` from upstream. An upstream change is adopted as a reviewed copy that keeps this repo's deviations (vendored icons, `lib/` imports, plain CSS classes) | Process rule |
| New behavior gets a Playwright spec in `.harness/tests/` with a fixture that imports from `../dist/` | Needs to know what changed |
| Skeletons for content waits, spinners for actions | Design judgment |
| Escape closes overlays, focus is trapped and restored, menus are keyboard reachable | Runtime behavior; the harness specs cover it |
| README, JSDoc and code stay in sync | Prose |

## Effects

Apps never call `useEffect`, `useLayoutEffect` or `useInsertionEffect`; the app lint message points here. Every legitimate use has a home below, and skateboard-ui is the one place effects live. Library code here may still use effects, but new code should use these hooks too.

All hooks import from the package root (`@stevederico/skateboard-ui`) or their own path: `useQuery` and `useListData` from `/Utilities`; the rest from `/hooks/use-event-listener`, `/hooks/use-media-query`, `/hooks/use-mobile`, `/hooks/use-interval`, `/hooks/use-timeout`, `/hooks/use-stored-state`, `/hooks/use-mount-effect`.

| You want to | Use | Not |
|---|---|---|
| Derive a value from props or state | Compute it in render (`useMemo` if it is slow); reset state on an id change with `key={id}` | An effect that calls `setState` |
| React to a user event | Do it in the event handler | An effect that watches state the handler just set |
| Fetch or poll data | `useQuery(key, fetcher?, { live, initial })`, `useListData` for lists | `fetch` in an effect |
| Listen to window, document or element events, including keys | `useEventListener(target, type, handler)` | `addEventListener` in an effect |
| Read a media query | `useMediaQuery(query)`, `useIsMobile()` | `matchMedia` or `resize` in an effect |
| Run a timer | `useInterval(fn, ms \| null)`, `useTimeout(fn, ms \| null)` | `setInterval` in an effect |
| Persist state in storage | `useStoredState(key, initial, { storage })` | An effect that writes `localStorage` |
| Touch the DOM (focus, scroll, observers) | `autoFocus`, a ref callback that returns a cleanup, or the handler that caused it | An effect that reads a ref |
| Set the page title | Render `<title>` | `document.title` in an effect |
| One-time setup or tracking (widgets, impressions, unmount cleanup) | `useMountEffect(fn)`; to run it again, remount with `key` | An effect with `[]` |

`useMountEffect` is the escape hatch. It must not read props it does not own: if the work depends on a prop, it belongs in a handler, `useQuery`, or a remount with `key`.

### Derived state

Before:

```tsx
const [draft, setDraft] = useState(name)
useEffect(() => setDraft(name), [name])
```

After:

```tsx
<NameEditor key={name} name={name} />
function NameEditor({ name }) {
  const [draft, setDraft] = useState(name)
  return <input value={draft} onChange={(e) => setDraft(e.target.value)} />
}
```

### Reacting to an event

Before:

```tsx
useEffect(() => { if (mode === 'edit') navigate('/edit') }, [mode])
```

After:

```tsx
function startEditing() {
  setMode('edit')
  navigate('/edit')
}
```

### Fetch or poll

Before:

```tsx
const [deal, setDeal] = useState(null)
useEffect(() => {
  if (!id) return
  const c = new AbortController()
  apiRequest(`/deals/${id}`, { signal: c.signal }).then(setDeal)
  const t = setInterval(() => apiRequest(`/deals/${id}`).then(setDeal), 4000)
  return () => { c.abort(); clearInterval(t) }
}, [id])
```

After:

```tsx
const { data: deal, loading, error, refetch } = useQuery(id ? `/deals/${id}` : null, undefined, { live: 4000 })
```

A custom fetcher takes the abort signal: `useQuery(key, (signal) => apiRequest(key, { method: 'POST', body, signal }))`. The fetcher may change every render; only `key` and `live` start a new request.

### Listeners and keys

Before:

```tsx
useEffect(() => {
  if (!open) return
  const onKey = (e) => { if (e.key === 'Escape') onClose() }
  window.addEventListener('keydown', onKey)
  return () => window.removeEventListener('keydown', onKey)
}, [open, onClose])
```

After:

```tsx
useEventListener(open ? window : null, 'keydown', (e) => { if (e.key === 'Escape') onClose() })
```

The handler is always the latest one, so there is no dependency list. `null` turns the listener off. The target may be `window`, `document`, an element, or a ref.

### Media queries

Before:

```tsx
const [dark, setDark] = useState(false)
useEffect(() => {
  const mql = matchMedia('(prefers-color-scheme: dark)')
  setDark(mql.matches)
  const onChange = () => setDark(mql.matches)
  mql.addEventListener('change', onChange)
  return () => mql.removeEventListener('change', onChange)
}, [])
```

After:

```tsx
const dark = useMediaQuery('(prefers-color-scheme: dark)')
```

### Timers

Before:

```tsx
useEffect(() => {
  const t = setInterval(() => setNow(new Date()), 1000)
  return () => clearInterval(t)
}, [])
```

After:

```tsx
useInterval(() => setNow(new Date()), paused ? null : 1000)
```

`useTimeout(fn, ms)` runs `fn` once after `ms`; a new `ms` restarts it and `null` cancels it.

### Storage

Before:

```tsx
const [collapsed, setCollapsed] = useState(() => localStorage.getItem('collapsed') === 'true')
useEffect(() => { localStorage.setItem('collapsed', String(collapsed)) }, [collapsed])
```

After:

```tsx
const [collapsed, setCollapsed] = useStoredState('collapsed', false)
```

Values are JSON. It reads once, writes in the setter, follows other tabs through the `storage` event, and keeps working in memory when storage throws. `{ storage: 'session' }` uses `sessionStorage`.

### DOM

Before:

```tsx
const ref = useRef(null)
useEffect(() => {
  const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
  ro.observe(ref.current)
  return () => ro.disconnect()
}, [])
```

After:

```tsx
const measure = useCallback((node) => {
  const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
  ro.observe(node)
  return () => ro.disconnect()
}, [])
<div ref={measure} />
```

Keep the ref callback stable (`useCallback` or a module function); an inline one detaches and reattaches on every render.

Focus on open is `autoFocus`; scroll to the newest message from the send handler.

### One-time setup or tracking

Before:

```tsx
useEffect(() => {
  track('match_shown')
}, [])
```

After:

```tsx
useMountEffect(() => {
  track('match_shown')
})
```

It runs after the first render and its cleanup runs on unmount. In development StrictMode React mounts twice (setup, cleanup, setup), so return a cleanup for anything that must not leak.
