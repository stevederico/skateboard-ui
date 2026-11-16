import { test, expect } from "@playwright/test"
import { existsSync, readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"

// 5.17.0 drops the "shadcn" name: shadcn/lib moved to lib/, shadcn/hooks to
// hooks/, and every "./shadcn/*" export path is gone. Checks the published
// exports map against the built dist/ (the webServer builds it first).

const root = fileURLToPath(new URL("../../", import.meta.url))
const pkg = JSON.parse(readFileSync(`${root}package.json`, "utf8")) as {
  exports: Record<string, { types?: string; import?: string; default?: string }>
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
