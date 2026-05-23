#!/usr/bin/env node
// Vendor @base-ui/react sub-exports as pre-bundled ESM under shadcn/lib/base-ui/.
// React/React-DOM stay external (peer deps). All 5 transitive deps
// (@floating-ui/react-dom, @floating-ui/utils, @babel/runtime,
// use-sync-external-store, @base-ui/utils) are absorbed by the bundle.
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

const BASE_UI_VERSION = "1.4.1"

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

// 1. Generate wrapper entry files
rmSync(WRAPPER_DIR, { recursive: true, force: true })
mkdirSync(WRAPPER_DIR, { recursive: true })
for (const entry of ENTRIES) {
  writeFileSync(path.join(WRAPPER_DIR, `${entry}.js`), `export * from "@base-ui/react/${entry}";\n`)
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

const entryArgs = ENTRIES.map((e) => `"${path.relative(REPO_ROOT, path.join(WRAPPER_DIR, `${e}.js`))}"`).join(" ")
const externalArgs = externals.map((e) => `--external "${e}"`).join(" ")
const cmd = `bun build ${entryArgs} --outdir "${path.relative(REPO_ROOT, OUT_DIR)}" --target browser --format esm --splitting --entry-naming="[name].[ext]" --chunk-naming="_chunk-[hash].[ext]" ${externalArgs}`

execSync(cmd, { cwd: REPO_ROOT, stdio: "inherit" })

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
  const filePath = path.join(OUT_DIR, `${entry}.js`)
  if (existsSync(filePath)) {
    const content = readFileSync(filePath, "utf-8")
    writeFileSync(filePath, banner + content)
  }
}

// 6. Cleanup wrapper dir
rmSync(WRAPPER_DIR, { recursive: true, force: true })

// 7. Summary
const files = readdirSync(OUT_DIR).filter((f) => f.endsWith(".js"))
const totalKb = files.reduce((a, f) => a + statSync(path.join(OUT_DIR, f)).size, 0) / 1024
console.log(`✓ Vendored ${ENTRIES.length} entries → ${files.length} files, ${totalKb.toFixed(0)} KB total`)
