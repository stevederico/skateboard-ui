import { test, expect } from "@playwright/test"

// Final-tier tests for the remaining in-house drop-ins (HoverCard, Command,
// Calendar, ButtonGroup, Item, Sidebar) plus the 4.0.0 linker: the legacy
// dist/shadcn/ui shim import path and base-ui `render=` trigger compat.
// Checkbox is covered elsewhere. All markup lives in App.tsx under #s-final
// and #s-legacy. Every test loads the demo at "/" first and asserts one
// behavior, relying on Playwright auto-waiting (no fixed timeouts).

// ===== HoverCard (#s-final) =====

test("HoverCard opens on trigger hover after its open delay", async ({ page }) => {
  await page.goto("/")
  const content = page.locator("[data-slot=hover-card-content]")
  await expect(content).toHaveCount(0)
  // Hovering the trigger opens the card after a ~700ms delay; auto-retry past it.
  await page.getByRole("link", { name: "@hovercard" }).hover()
  await expect(content).toBeVisible({ timeout: 2000 })
})

test("HoverCard closes when the pointer moves away", async ({ page }) => {
  await page.goto("/")
  const content = page.locator("[data-slot=hover-card-content]")
  await page.getByRole("link", { name: "@hovercard" }).hover()
  await expect(content).toBeVisible({ timeout: 2000 })
  // Move the pointer off the trigger; the card dismisses.
  await page.getByRole("heading", { level: 1 }).hover()
  await expect(content).toHaveCount(0)
})

// ===== Command (#s-final) =====

test("Command filters its items by the input value (substring)", async ({ page }) => {
  await page.goto("/")
  await page.locator("[data-slot=command-input]").fill("ban")
  // Filtered-out items are removed from the DOM, leaving only Banana.
  const items = page.locator("[data-slot=command-item]")
  await expect(items).toHaveCount(1)
  await expect(items).toHaveText("Banana")
})

test("Command shows the empty message when nothing matches", async ({ page }) => {
  await page.goto("/")
  await page.locator("[data-slot=command-input]").fill("zzz")
  await expect(page.locator("[data-slot=command-item]")).toHaveCount(0)
  await expect(page.locator("[data-slot=command-empty]")).toHaveText("No results.")
})

// ===== Calendar (#s-final) =====

test("Calendar renders a grid of numbered day buttons", async ({ page }) => {
  await page.goto("/")
  // Day buttons live inside the calendar table body; a full month grid has 35+.
  const days = page.locator("[data-slot=calendar] table tbody button")
  await expect(days.first()).toBeVisible()
  expect(await days.count()).toBeGreaterThan(27)
})

// ===== ButtonGroup (#s-final) =====

test("ButtonGroup renders its grouped buttons", async ({ page }) => {
  await page.goto("/")
  const group = page.locator("[data-slot=button-group]")
  await expect(group.getByRole("button", { name: "One" })).toBeVisible()
  await expect(group.getByRole("button", { name: "Two" })).toBeVisible()
})

// ===== Item (#s-final) =====

test("Item renders its title and description", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByText("Item title")).toBeVisible()
  await expect(page.getByText("Item description.")).toBeVisible()
})

// ===== Sidebar (#s-final) =====

test("Sidebar renders its menu buttons with the active one marked", async ({ page }) => {
  await page.goto("/")
  const buttons = page.locator("[data-slot=sidebar-menu-button]")
  const home = buttons.filter({ hasText: "Home" })
  const settings = buttons.filter({ hasText: "Settings" })
  await expect(home).toBeVisible()
  await expect(settings).toBeVisible()
  // isActive renders data-active on the Home button only.
  await expect(home).toHaveAttribute("data-active", "")
  await expect(settings).not.toHaveAttribute("data-active", /.*/)
})

// ===== Legacy linker (#s-legacy) =====

test("Legacy shim-path Button import renders as a styled button", async ({ page }) => {
  await page.goto("/")
  // Imported from dist/shadcn/ui/button shim — proves the legacy path resolves.
  const btn = page.getByRole("button", { name: "Legacy import path" })
  await expect(btn).toBeVisible()
  await expect(btn).toHaveAttribute("data-slot", "button")
})

test("Legacy render= trigger opens the alert dialog", async ({ page }) => {
  await page.goto("/")
  // The legacy render= alertdialog is the second one in DOM order.
  const dialog = page.locator("dialog[role=alertdialog]").last()
  await expect(dialog).toHaveJSProperty("open", false)
  await page.getByRole("button", { name: "Delete (render=)" }).click()
  await expect(dialog).toHaveJSProperty("open", true)
  await expect(page.getByText("Confirm via render= trigger")).toBeVisible()
})

test("Legacy render= trigger merges trigger props onto the rendered Button element", async ({
  page,
}) => {
  await page.goto("/")
  const trigger = page.getByRole("button", { name: "Delete (render=)" })
  // Rendered as a real <button> (the render= Button element)...
  await expect(trigger).toHaveJSProperty("tagName", "BUTTON")
  // ...carrying BOTH the destructive Button styling...
  await expect(trigger).toHaveClass(/bg-destructive/)
  // ...AND the trigger's data-slot, proving Slot merged props onto the element.
  await expect(trigger).toHaveAttribute("data-slot", "alert-dialog-trigger")
})
