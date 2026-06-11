import { test, expect } from "@playwright/test"

// Regression tests for the 15 bugs found in the multi-agent review. Each pins a
// specific fix so a future refactor can't silently reintroduce it. Every test
// loads its fixture in isolation (?fx=...) so a modal/focus-trapping fixture
// can't contaminate the others.

test("Slot composes the child's own onClick with the injected trigger handler", async ({
  page,
}) => {
  await page.goto("/tests.html?fx=slot-compose")
  await page.getByRole("button", { name: /asChild \+ own onClick/ }).click()
  // Both ran: the consumer counter incremented AND the dialog opened.
  await expect(page.getByTestId("consumer-clicks")).toHaveText("1")
  await expect(page.locator("dialog[data-slot=dialog-overlay]")).toHaveJSProperty(
    "open",
    true
  )
})

test("Escape closes only the topmost layer (popover inside dialog)", async ({
  page,
}) => {
  await page.goto("/tests.html?fx=escape-stack")
  const dialog = page.locator("dialog[data-slot=dialog-overlay]")
  await expect(dialog).toHaveJSProperty("open", true)
  await page.getByRole("button", { name: "Open inner popover" }).click()
  const popover = page.locator("[data-slot=popover-content]")
  await expect(popover).toBeVisible()

  await page.keyboard.press("Escape")
  // First Escape closes the popover only; the dialog stays open.
  await expect(popover).toHaveCount(0)
  await expect(dialog).toHaveJSProperty("open", true)

  await page.keyboard.press("Escape")
  // Second Escape closes the dialog.
  await expect(dialog).toHaveJSProperty("open", false)
})

test("SelectValue shows the selected label on first render (before opening)", async ({
  page,
}) => {
  await page.goto("/tests.html?fx=select-default")
  const value = page.locator("[data-slot=select-value]")
  await expect(value).toHaveText("Banana")
  // And it is not styled/marked as a placeholder.
  await expect(value).not.toHaveAttribute("data-placeholder", /.*/)
})

test("Tab values with spaces produce valid, resolvable ARIA id references", async ({
  page,
}) => {
  await page.goto("/tests.html?fx=tab-space")
  const tab = page.getByRole("tab", { name: "Account" })
  const controls = await tab.getAttribute("aria-controls")
  expect(controls).toBeTruthy()
  expect(controls).not.toContain(" ")
  // The referenced panel actually exists.
  await expect(page.locator(`[id="${controls}"]`)).toHaveCount(1)
})

test("RadioGroup name posts the selected value via a hidden input", async ({
  page,
}) => {
  await page.goto("/tests.html?fx=radio-form")
  await page.getByRole("button", { name: "Submit" }).click()
  await expect(page.getByTestId("radio-form-result")).toHaveText("pro")

  await page.getByRole("radio").first().click() // select "free"
  await page.getByRole("button", { name: "Submit" }).click()
  await expect(page.getByTestId("radio-form-result")).toHaveText("free")
})

test("Slider responds to keyboard (ArrowRight increments aria-valuenow)", async ({
  page,
}) => {
  await page.goto("/tests.html?fx=slider")
  const thumb = page.getByRole("slider")
  await expect(thumb).toHaveAttribute("aria-valuenow", "40")
  await thumb.focus()
  await page.keyboard.press("ArrowRight")
  await expect(thumb).toHaveAttribute("aria-valuenow", "41")
})
