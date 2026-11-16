import { test, expect } from "@playwright/test"

// 5.15.0 vendors the lucide icons skateboard apps use, so apps can import them
// from @stevederico/skateboard-ui/icons instead of lucide-react.

test("app icons render as lucide markup and old aliases are the canonical icon", async ({ page }) => {
  await page.goto("/tests.html?fx=icons")
  await expect(page.getByTestId("alias-identity")).toHaveText("true")
  const expected: Record<string, string> = {
    AlertCircle: "lucide-circle-alert",
    Loader2: "lucide-loader-circle",
    MoreHorizontal: "lucide-ellipsis",
    SquarePen: "lucide-square-pen",
    PenSquare: "lucide-square-pen",
    Twitter: "lucide-twitter",
    Wrench: "lucide-wrench",
  }
  for (const [name, cls] of Object.entries(expected)) {
    const svg = page.getByTestId(`icon-${name}`).locator("svg")
    await expect(svg).toHaveClass(new RegExp(`\\blucide ${cls}\\b`))
    await expect(svg).toHaveAttribute("width", "16")
    await expect(svg).toHaveAttribute("viewBox", "0 0 24 24")
    await expect(svg).toHaveAttribute("aria-hidden", "true")
  }
})

test("ConstantsIcon resolves the newly vendored constants.json icon strings", async ({ page }) => {
  await page.goto("/tests.html?fx=icons")
  for (const name of ["flag", "factory", "ev-charger", "git-pull-request", "corner-up-right", "arrow-right-left"]) {
    await expect(page.getByTestId(`constants-${name}`).locator("svg")).toHaveClass(
      new RegExp(`\\blucide-${name}\\b`)
    )
  }
  // Not in lucide-react 0.546.0 (see todo.md): renders nothing.
  for (const name of ["solar-panel", "workspace"]) {
    await expect(page.getByTestId(`constants-${name}`).locator("svg")).toHaveCount(0)
  }
})
