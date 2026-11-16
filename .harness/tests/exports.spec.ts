import { test, expect } from "@playwright/test"
import { existsSync, readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"

// 5.17.0 drops the "shadcn" name: shadcn/lib moved to lib/, shadcn/hooks to
// hooks/, and every "./shadcn/*" export path is gone. Checks the published
// exports map against the built dist/ (the webServer builds it first).

const root = fileURLToPath(new URL("../../", import.meta.url))
const pkg = JSON.parse(readFileSync(`${root}package.json`, "utf8")) as {
  exports: Record<string, { types?: string; import?: string; default?: string }>
  peerDependencies?: Record<string, string>
}

test("no ./shadcn export paths remain", () => {
  expect(Object.keys(pkg.exports).filter((k) => k.includes("shadcn"))).toEqual([])
})

test("./lib/utils and ./hooks/use-mobile point at built files", () => {
  for (const key of ["./lib/utils", "./hooks/use-mobile"]) {
    const entry = pkg.exports[key]
    expect(entry, key).toBeTruthy()
    for (const target of [entry.types, entry.import, entry.default]) {
      expect(target && existsSync(`${root}${target}`), `${key} -> ${target}`).toBe(true)
    }
  }
})

test("cn from dist/lib/utils merges conflicting Tailwind classes", async () => {
  const { cn } = await import("../../dist/lib/utils.js")
  expect(cn("px-2 py-1", false && "hidden", "px-4")).toBe("py-1 px-4")
})

// 5.18.0: skateboard-ui ships plain, hand-edited CSS for its own components and theme
// (produced once with a converter, removed in 5.20.0), so apps and this harness run no Tailwind.
test("styles.css is plain CSS with the theme and no Tailwind directives", () => {
  const css = readFileSync(`${root}styles.css`, "utf8")
  for (const directive of ['@import "tailwindcss"', "@apply", "@theme", "@source", "@custom-variant", "@utility", "@plugin"]) {
    expect(css.includes(directive), directive).toBe(false)
  }
  for (const needle of ["--color-app:", ".bg-background", ".animate-in", "@font-face", ".dark {"]) {
    expect(css.includes(needle), needle).toBe(true)
  }
  expect(pkg.exports["./styles.css"]?.default).toBe("./styles.css")
  expect(pkg.peerDependencies?.tailwindcss).toBeUndefined()
})

test("the harness page is styled by the shipped CSS (no Tailwind in the build)", async ({ page }) => {
  await page.goto("/tests.html?fx=icons")
  // bg-background on <body> resolves through the shipped theme variables.
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
  expect(bg).not.toBe("rgba(0, 0, 0, 0)")
  const font = await page.evaluate(() => getComputedStyle(document.body).fontFamily)
  expect(font).toContain("Geist")
})
