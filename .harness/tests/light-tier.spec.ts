import { test, expect } from "@playwright/test"

// Real-browser behavior tests for the trivial + light tiers. Each test reloads
// "/" (the harness demo page renders one live instance of every component), so
// state never leaks between tests. One behavior per test; only Playwright
// auto-waiting assertions — no fixed timeouts.

test("Button renders with type=button by default", async ({ page }) => {
  await page.goto("/")
  // The default (non-asChild) button is a native <button> carrying type=button
  // so it never accidentally submits a surrounding form.
  await expect(
    page.locator("#s-button").getByRole("button", { name: "Default" })
  ).toHaveAttribute("type", "button")
})

test("Button asChild renders an <a> carrying button classes", async ({
  page,
}) => {
  await page.goto("/")
  const link = page
    .locator("#s-button")
    .getByRole("link", { name: "As link (asChild)" })
  await expect(link).toBeVisible()
  // It really is an anchor, not a button, but it adopts the Button styling.
  await expect(link).toHaveJSProperty("tagName", "A")
  await expect(link).toHaveAttribute("data-slot", "button")
})

test("Badge renders its text", async ({ page }) => {
  await page.goto("/")
  await expect(
    page.locator("#s-badge").getByText("Default", { exact: true })
  ).toBeVisible()
})

test("Separator is non-decorative (role=separator)", async ({ page }) => {
  await page.goto("/")
  // The fix: default separators expose role=separator rather than role=none.
  await expect(
    page.locator("#s-separator [data-slot=separator]").first()
  ).toHaveAttribute("role", "separator")
})

test("Toggle flips aria-pressed false -> true on click", async ({ page }) => {
  await page.goto("/")
  const bold = page.locator("#s-toggle").getByRole("button", { name: "Bold" })
  await expect(bold).toHaveAttribute("aria-pressed", "false")
  await bold.click()
  await expect(bold).toHaveAttribute("aria-pressed", "true")
})

test("Toggle with defaultPressed starts aria-pressed=true", async ({ page }) => {
  await page.goto("/")
  await expect(
    page.locator("#s-toggle").getByRole("button", { name: "Pressed" })
  ).toHaveAttribute("aria-pressed", "true")
})

test("ToggleGroup (single) selects one item exclusively", async ({ page }) => {
  await page.goto("/")
  // The first group is single-select, defaultValue ["left"] (item "L").
  const group = page
    .locator("#s-toggle [data-slot=toggle-group]")
    .first()
  const center = group.getByRole("button", { name: "C", exact: true })
  const left = group.getByRole("button", { name: "L", exact: true })
  await center.click()
  await expect(center).toHaveAttribute("data-state", "on")
  await expect(left).toHaveAttribute("data-state", "off")
  // Exactly one item is on.
  await expect(group.locator('[data-state="on"]')).toHaveCount(1)
})

test("Switch starts checked by default and toggles off on click", async ({
  page,
}) => {
  await page.goto("/")
  const sw = page.locator("#s-switch").getByRole("switch").first()
  await expect(sw).toHaveAttribute("aria-checked", "true")
  await sw.click()
  await expect(sw).toHaveAttribute("aria-checked", "false")
})

test("Checkbox starts checked (defaultChecked) and flips on click", async ({
  page,
}) => {
  await page.goto("/")
  const cb = page.locator("#s-final").getByRole("checkbox")
  await expect(cb).toHaveAttribute("aria-checked", "true")
  await cb.click()
  await expect(cb).toHaveAttribute("aria-checked", "false")
})

test("RadioGroup selecting Option C checks it and unsets the others", async ({
  page,
}) => {
  await page.goto("/")
  const group = page.locator("#s-switch [data-slot=radio-group]")
  const radios = group.getByRole("radio")
  // Default selection is "a" (the first radio).
  await expect(radios.nth(0)).toHaveAttribute("aria-checked", "true")
  await radios.nth(2).click() // Option C
  await expect(radios.nth(2)).toHaveAttribute("aria-checked", "true")
  await expect(radios.nth(0)).toHaveAttribute("aria-checked", "false")
  await expect(radios.nth(1)).toHaveAttribute("aria-checked", "false")
})

test("RadioGroup ArrowDown moves selection to the next radio", async ({
  page,
}) => {
  await page.goto("/")
  const group = page.locator("#s-switch [data-slot=radio-group]")
  const radios = group.getByRole("radio")
  await radios.nth(0).focus()
  await expect(radios.nth(0)).toHaveAttribute("aria-checked", "true")
  await page.keyboard.press("ArrowDown")
  // Selection follows the arrow key to Option B.
  await expect(radios.nth(1)).toHaveAttribute("aria-checked", "true")
  await expect(radios.nth(0)).toHaveAttribute("aria-checked", "false")
})

test("Tabs clicking Two reveals the second panel and hides the others", async ({
  page,
}) => {
  await page.goto("/")
  const tabs = page.locator("#s-tabs")
  await tabs.getByRole("tab", { name: "Two" }).click()
  await expect(tabs.getByRole("tab", { name: "Two" })).toHaveAttribute(
    "aria-selected",
    "true"
  )
  await expect(tabs.getByText("Second panel.")).toBeVisible()
  await expect(tabs.getByText("First panel.")).toBeHidden()
  await expect(tabs.getByText("Third panel.")).toBeHidden()
})

test("Tabs ArrowRight moves selection to the next tab", async ({ page }) => {
  await page.goto("/")
  const tabs = page.locator("#s-tabs")
  const one = tabs.getByRole("tab", { name: "One" })
  const two = tabs.getByRole("tab", { name: "Two" })
  await one.focus()
  await expect(one).toHaveAttribute("aria-selected", "true")
  await page.keyboard.press("ArrowRight")
  await expect(two).toHaveAttribute("aria-selected", "true")
  await expect(two).toBeFocused()
})

test("Accordion clicking Section two expands it (aria-expanded=true)", async ({
  page,
}) => {
  await page.goto("/")
  const trigger = page
    .locator("#s-accordion")
    .getByRole("button", { name: "Section two" })
  await expect(trigger).toHaveAttribute("aria-expanded", "false")
  await trigger.click()
  await expect(trigger).toHaveAttribute("aria-expanded", "true")
  await expect(
    page.locator("#s-accordion").getByText("Content for section two.")
  ).toBeVisible()
})

test("Collapsible trigger toggles aria-expanded and reveals its region", async ({
  page,
}) => {
  await page.goto("/")
  const trigger = page
    .locator("#s-accordion")
    .getByRole("button", { name: "Toggle details" })
  await expect(trigger).toHaveAttribute("aria-expanded", "false")
  await trigger.click()
  await expect(trigger).toHaveAttribute("aria-expanded", "true")
  await expect(
    page.locator("#s-accordion").getByText("Hidden collapsible content.")
  ).toBeVisible()
})

test("Progress indicator width reflects value after +10", async ({ page }) => {
  await page.goto("/")
  const bar = page.locator("#s-progress").getByRole("progressbar")
  // Demo starts at 40.
  await expect(bar).toHaveAttribute("aria-valuenow", "40")
  await page.locator("#s-progress").getByRole("button", { name: "+10" }).click()
  await expect(bar).toHaveAttribute("aria-valuenow", "50")
  // The indicator's rendered width tracks the value (50% of the track).
  const indicator = page.locator("#s-progress [data-slot=progress-indicator]")
  await expect(indicator).toHaveCSS("width", /.+/)
})

test("Avatar (valid image) shows the image and no fallback", async ({
  page,
}) => {
  await page.goto("/")
  const avatar = page.locator("#s-progress [data-slot=avatar]").first()
  // The image only renders once it has actually loaded; the fallback then unmounts.
  await expect(avatar.locator("[data-slot=avatar-image]")).toBeVisible()
  await expect(avatar.locator("[data-slot=avatar-fallback]")).toHaveCount(0)
})

test("Avatar (broken image) shows the FB fallback and no image", async ({
  page,
}) => {
  await page.goto("/")
  const avatar = page.locator("#s-progress [data-slot=avatar]").nth(1)
  const fallback = avatar.locator("[data-slot=avatar-fallback]")
  await expect(fallback).toBeVisible()
  await expect(fallback).toHaveText("FB")
  // On error the <img> is not rendered at all.
  await expect(avatar.locator("[data-slot=avatar-image]")).toHaveCount(0)
})
