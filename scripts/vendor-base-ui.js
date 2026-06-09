#!/usr/bin/env node
// Vendor @base-ui/react sub-exports as pre-bundled ESM under shadcn/lib/base-ui/.
// React/React-DOM stay external (peer deps). All 5 transitive deps
// (@floating-ui/react-dom, @floating-ui/utils, @babel/runtime,
// use-sync-external-store, @base-ui/utils) are absorbed by the bundle.
//
// Also emits a self-contained <entry>.d.ts next to each <entry>.js via
// dts-bundle-generator (devDep), inlining @base-ui/* and @floating-ui/*
// type declarations so the only external type import is `react`.
//
// Refresh:
//   1. bump BASE_UI_VERSION below
//   2. npm install @base-ui/react@<new-version> --no-save (or update temporarily)
//   3. node scripts/vendor-base-ui.js
//
// Uses `bun build` for bundling (single binary, no npm install required).

import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync, readdirSync, statSync } from "node:fs"
import { execSync } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO_ROOT = path.resolve(__dirname, "..")

const BASE_UI_VERSION = "1.5.0"

// Sub-exports actually imported by shadcn/ui/*.jsx. Extend if a new
// primitive starts using a new base-ui sub-path.
const ENTRIES = [
  "accordion",
  "alert-dialog",
  "avatar",
  "button",
  "checkbox",
  "collapsible",
  "context-menu",
  "dialog",
  "input",
  "menu",
  "menubar",
  "merge-props",
  "navigation-menu",
  "popover",
  "preview-card",
  "progress",
  "radio",
  "radio-group",
  "scroll-area",
  "select",
  "separator",
  "slider",
  "switch",
  "tabs",
  "toggle",
  "toggle-group",
  "tooltip",
  "use-render",
]

const OUT_DIR = path.join(REPO_ROOT, "shadcn/lib/base-ui")
const WRAPPER_DIR = path.join(REPO_ROOT, ".vendor-base-ui-entries")

// Sanity checks
try {
  execSync("bun --version", { stdio: "ignore" })
} catch {
  console.error("✗ bun is required (curl -fsSL https://bun.sh/install | bash)")
  process.exit(1)
}

const installedPkgPath = path.join(REPO_ROOT, "node_modules/@base-ui/react/package.json")
if (!existsSync(installedPkgPath)) {
  console.error("✗ node_modules/@base-ui/react not found. Install it temporarily before vendoring:")
  console.error("    npm install --no-save @base-ui/react@" + BASE_UI_VERSION)
  process.exit(1)
}
const installedPkg = JSON.parse(readFileSync(installedPkgPath, "utf-8"))
if (installedPkg.version !== BASE_UI_VERSION) {
  console.error(`✗ node_modules has @base-ui/react@${installedPkg.version}, expected ${BASE_UI_VERSION}.`)
  console.error(`    npm install --no-save @base-ui/react@${BASE_UI_VERSION}`)
  process.exit(1)
}

console.log(`Vendoring @base-ui/react@${BASE_UI_VERSION} (${ENTRIES.length} entries) → ${path.relative(REPO_ROOT, OUT_DIR)}`)

// 1. Generate wrapper entry files (.ts: same file feeds bun build and dts-bundle-generator)
rmSync(WRAPPER_DIR, { recursive: true, force: true })
mkdirSync(WRAPPER_DIR, { recursive: true })
for (const entry of ENTRIES) {
  writeFileSync(path.join(WRAPPER_DIR, `${entry}.ts`), `export * from "@base-ui/react/${entry}";\n`)
}

// 2. Reset output dir
rmSync(OUT_DIR, { recursive: true, force: true })
mkdirSync(OUT_DIR, { recursive: true })

// 3. Bundle with bun (resolves @base-ui/react from node_modules at REPO_ROOT)
const externals = [
  "react",
  "react-dom",
  "react/jsx-runtime",
  "react/jsx-dev-runtime",
  "react-dom/client",
  "react-dom/server",
  "date-fns",
  "@date-fns/tz",
  "luxon",
]

const entryArgs = ENTRIES.map((e) => `"${path.relative(REPO_ROOT, path.join(WRAPPER_DIR, `${e}.ts`))}"`).join(" ")
const externalArgs = externals.map((e) => `--external "${e}"`).join(" ")
const cmd = `bun build ${entryArgs} --outdir "${path.relative(REPO_ROOT, OUT_DIR)}" --target browser --format esm --splitting --entry-naming="[name].[ext]" --chunk-naming="_chunk-[hash].[ext]" ${externalArgs}`

execSync(cmd, { cwd: REPO_ROOT, stdio: "inherit" })

// 3b. Emit self-contained type declarations (<entry>.d.ts) with dts-bundle-generator.
// Inlines all @base-ui/* and @floating-ui/* declarations so consumers only need react types.
const INLINED_LIBRARIES = [
  "@base-ui/react",
  "@base-ui/utils",
  "@floating-ui/react-dom",
  "@floating-ui/dom",
  "@floating-ui/core",
  "@floating-ui/utils",
]

// Entries dts-bundle-generator cannot process get a hand-written loose .d.ts instead.
// menubar: its type graph reaches `Menu.Root.Props` (context-menu → menu namespace
// import), which crashes dts-bundle-generator 9.5.1 with "Cannot get local names for
// symbol 'Root' while generating namespaced export". Re-verify on each base-ui bump.
const FALLBACK_DTS = {
  menubar: `import * as React from 'react';

type HTMLProps<T = any> = React.HTMLAttributes<T> & {
  ref?: React.Ref<T> | undefined;
};
type ComponentRenderFn<Props, State> = (props: Props, state: State) => React.ReactElement<unknown>;
type BaseUIComponentProps<ElementType extends React.ElementType, State, RenderFunctionProps = HTMLProps> = Omit<React.ComponentPropsWithRef<ElementType>, 'className' | 'color' | 'defaultValue' | 'defaultChecked' | 'style'> & {
  /** CSS class applied to the element, or a function that returns a class based on the component's state. */
  className?: string | ((state: State) => string | undefined) | undefined;
  /** Replace the component's HTML element with a different tag, or compose it with another component. */
  render?: React.ReactElement | ComponentRenderFn<RenderFunctionProps, State> | undefined;
  /** Style applied to the element, or a function that returns a style object based on the component's state. */
  style?: React.CSSProperties | ((state: State) => React.CSSProperties | undefined) | undefined;
};
type MenubarOrientation = 'horizontal' | 'vertical';
export interface MenubarState {
  /** The orientation of the menubar. */
  orientation: MenubarOrientation;
  /** Whether the menubar is modal. */
  modal: boolean;
  /** Whether any submenu within the menubar is open. */
  hasSubmenuOpen: boolean;
}
export interface MenubarProps extends BaseUIComponentProps<'div', MenubarState> {
  /** Whether the menubar is modal. @default true */
  modal?: boolean | undefined;
  /** Whether the whole menubar is disabled. @default false */
  disabled?: boolean | undefined;
  /** The orientation of the menubar. @default 'horizontal' */
  orientation?: MenubarOrientation | undefined;
  /** Whether to loop keyboard focus back to the first item when the end of the list is reached while using the arrow keys. @default true */
  loopFocus?: boolean | undefined;
}
/**
 * The container for menus.
 *
 * Documentation: [Base UI Menubar](https://base-ui.com/react/components/menubar)
 */
export declare const Menubar: React.ForwardRefExoticComponent<Omit<MenubarProps, 'ref'> & React.RefAttributes<HTMLDivElement>>;
export declare namespace Menubar {
  type State = MenubarState;
  type Props = MenubarProps;
}

export {};
`,
}

writeFileSync(
  path.join(WRAPPER_DIR, "tsconfig.json"),
  JSON.stringify(
    {
      compilerOptions: {
        target: "ES2022",
        module: "ESNext",
        moduleResolution: "Bundler",
        jsx: "react-jsx",
        strict: true,
        skipLibCheck: true,
        lib: ["ES2022", "DOM", "DOM.Iterable"],
        types: [],
      },
    },
    null,
    2,
  ),
)

// One dts-bundle-generator process per entry: batching entries into a single
// config shares one TS program, and cross-entry symbol usage then re-triggers
// the namespaced-export bug (see FALLBACK_DTS) on entries that pass in isolation.
const dtsEntries = ENTRIES.filter((e) => !(e in FALLBACK_DTS))
const dtsBin = path.join(REPO_ROOT, "node_modules/.bin/dts-bundle-generator")
const dtsConfigPath = path.join(WRAPPER_DIR, "dts-config.json")
console.log(`Generating type declarations (${dtsEntries.length} entries) with dts-bundle-generator…`)
for (const entry of dtsEntries) {
  const dtsConfig = {
    compilationOptions: {
      preferredConfigPath: path.join(WRAPPER_DIR, "tsconfig.json"),
    },
    entries: [
      {
        filePath: path.join(WRAPPER_DIR, `${entry}.ts`),
        outFile: path.join(OUT_DIR, `${entry}.d.ts`),
        noCheck: true,
        libraries: { inlinedLibraries: INLINED_LIBRARIES },
        output: { noBanner: true, exportReferencedTypes: true },
      },
    ],
  }
  writeFileSync(dtsConfigPath, JSON.stringify(dtsConfig, null, 2))
  try {
    execSync(`"${dtsBin}" --config "${dtsConfigPath}" --silent`, { cwd: REPO_ROOT, stdio: "pipe" })
    process.stdout.write(`  ${entry}.d.ts\n`)
  } catch (err) {
    console.error(`✗ dts-bundle-generator failed for "${entry}":`)
    console.error(String(err.stderr || err.stdout || err.message))
    console.error('  Add a hand-written declaration to FALLBACK_DTS for this entry if upstream types are unprocessable.')
    process.exit(1)
  }
}

for (const [entry, dts] of Object.entries(FALLBACK_DTS)) {
  writeFileSync(path.join(OUT_DIR, `${entry}.d.ts`), dts)
  console.log(`Wrote hand-written fallback ${entry}.d.ts (dts-bundle-generator cannot process this entry)`)
}

// 4. Copy upstream LICENSE
const licensePath = path.join(REPO_ROOT, "node_modules/@base-ui/react/LICENSE")
if (existsSync(licensePath)) {
  cpSync(licensePath, path.join(OUT_DIR, "LICENSE"))
}

// 5. Prepend a banner to each entry file (skip chunks to keep them small)
const banner = `/* @base-ui/react ${BASE_UI_VERSION} — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
`
for (const entry of ENTRIES) {
  for (const ext of [".js", ".d.ts"]) {
    const filePath = path.join(OUT_DIR, `${entry}${ext}`)
    if (existsSync(filePath)) {
      const content = readFileSync(filePath, "utf-8")
      writeFileSync(filePath, banner + content)
    }
  }
}

// 6. Cleanup wrapper dir
rmSync(WRAPPER_DIR, { recursive: true, force: true })

// 7. Summary
const files = readdirSync(OUT_DIR).filter((f) => f.endsWith(".js"))
const dtsFiles = readdirSync(OUT_DIR).filter((f) => f.endsWith(".d.ts"))
const missingDts = ENTRIES.filter((e) => !existsSync(path.join(OUT_DIR, `${e}.d.ts`)))
const totalKb = files.reduce((a, f) => a + statSync(path.join(OUT_DIR, f)).size, 0) / 1024
console.log(`✓ Vendored ${ENTRIES.length} entries → ${files.length} JS files (${totalKb.toFixed(0)} KB), ${dtsFiles.length} .d.ts files`)
if (missingDts.length > 0) {
  console.error(`✗ Missing .d.ts for: ${missingDts.join(", ")}`)
  process.exit(1)
}
