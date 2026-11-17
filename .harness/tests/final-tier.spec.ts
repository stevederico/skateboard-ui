import { test, expect } from "@playwright/test"

test("Command filters its items by the input value (substring)", async ({ page }) => {
  await page.goto("/")
  await page.locator("[data-slot=command-input]").fill("ban")
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

test("Calendar renders a grid of numbered day buttons", async ({ page }) => {
  await page.goto("/")
  const days = page.locator("[data-slot=calendar] table tbody button")
  await expect(days.first()).toBeVisible()
  expect(await days.count()).toBeGreaterThan(27)
})


test("Sidebar renders its menu buttons with the active one marked", async ({ page }) => {
  await page.goto("/")
  const buttons = page.locator("[data-slot=sidebar-menu-button]")
  const home = buttons.filter({ hasText: "Home" })
  const settings = buttons.filter({ hasText: "Settings" })
  await expect(home).toBeVisible()
  await expect(settings).toBeVisible()
  await expect(home).toHaveAttribute("data-active", "")
  await expect(settings).not.toHaveAttribute("data-active", /.*/)
})

test("Legacy shim-path Button import renders as a styled button", async ({ page }) => {
  await page.goto("/")
  const btn = page.getByRole("button", { name: "Legacy import path" })
  await expect(btn).toBeVisible()
  await expect(btn).toHaveAttribute("data-slot", "button")
})

test("Legacy render= trigger opens the alert dialog", async ({ page }) => {
  await page.goto("/")
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
  await expect(trigger).toHaveJSProperty("tagName", "BUTTON")
  await expect(trigger).toHaveClass(/bg-destructive/)
  await expect(trigger).toHaveAttribute("data-slot", "alert-dialog-trigger")
})
