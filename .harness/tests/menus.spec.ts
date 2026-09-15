import { test, expect } from "@playwright/test"

// Real-browser behavior tests for DropdownMenu and Select. These exercise the
// floating/portal layout, roving focus, and open-state coordination that only
// behave correctly in a real browser. Markup lives in App.tsx (#s-menu).
// One behavior per test.

// ---- DropdownMenu --------------------------------------------------------

test("DropdownMenu opens with its items on trigger click", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Menu" }).click()
  const content = page.locator("[data-slot=dropdown-menu-content]")
  await expect(content).toBeVisible()
  await expect(content.getByRole("menuitem", { name: "Edit" })).toBeVisible()
  await expect(content.getByRole("menuitem", { name: "Duplicate" })).toBeVisible()
  await expect(
    content.getByRole("menuitemcheckbox", { name: "Show grid" })
  ).toBeVisible()
  await expect(content.getByRole("menuitem", { name: "Delete" })).toBeVisible()
})

test("DropdownMenu auto-focuses its first item on open", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Menu" }).click()
  await expect(page.getByRole("menuitem", { name: "Edit" })).toBeFocused()
})

test("DropdownMenu ArrowDown moves focus to the next item", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Menu" }).click()
  await expect(page.getByRole("menuitem", { name: "Edit" })).toBeFocused()
  await page.keyboard.press("ArrowDown")
  await expect(page.getByRole("menuitem", { name: "Duplicate" })).toBeFocused()
})

test("DropdownMenu hovering an item focuses it", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Menu" }).click()
  const del = page.getByRole("menuitem", { name: "Delete" })
  await del.hover()
  await expect(del).toBeFocused()
})

test("DropdownMenu checkbox item toggles aria-checked on click", async ({
  page,
}) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Menu" }).click()
  const item = page.getByRole("menuitemcheckbox", { name: "Show grid" })
  // App seeds menuFlag=true, so it starts checked.
  await expect(item).toHaveAttribute("aria-checked", "true")
  await item.click()
  // Reopen to inspect the new state (clicking an item closes the menu).
  await page.getByRole("button", { name: "Menu" }).click()
  await expect(
    page.getByRole("menuitemcheckbox", { name: "Show grid" })
  ).toHaveAttribute("aria-checked", "false")
})

test("DropdownMenu closes on Escape", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Menu" }).click()
  await expect(page.locator("[data-slot=dropdown-menu-content]")).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(page.locator("[data-slot=dropdown-menu-content]")).toHaveCount(0)
})

test("DropdownMenu closes on an outside click", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Menu" }).click()
  await expect(page.locator("[data-slot=dropdown-menu-content]")).toBeVisible()
  await page.getByRole("heading", { level: 1 }).click()
  await expect(page.locator("[data-slot=dropdown-menu-content]")).toHaveCount(0)
})

// ---- Select --------------------------------------------------------------

test("Select opens a listbox of options on trigger click", async ({ page }) => {
  await page.goto("/")
  await page.locator("[data-slot=select-trigger]").click()
  const content = page.locator("[data-slot=select-content]")
  await expect(content).toBeVisible()
  await expect(content).toHaveAttribute("role", "listbox")
  await expect(content.getByRole("option")).toHaveCount(3)
})

test("Select auto-focuses the first option when no value is set", async ({
  page,
}) => {
  await page.goto("/")
  await page.locator("[data-slot=select-trigger]").click()
  await expect(
    page.locator("[data-slot=select-content]").getByRole("option", { name: "Apple" })
  ).toBeFocused()
})

test("Select picking an option closes it and shows the chosen label", async ({
  page,
}) => {
  await page.goto("/")
  await page.locator("[data-slot=select-trigger]").click()
  await page
    .locator("[data-slot=select-content]")
    .getByRole("option", { name: "Banana" })
    .click()
  await expect(page.locator("[data-slot=select-content]")).toHaveCount(0)
  await expect(page.locator("[data-slot=select-value]")).toHaveText("Banana")
})

test("Select reopen highlights the previously selected option", async ({
  page,
}) => {
  await page.goto("/")
  await page.locator("[data-slot=select-trigger]").click()
  await page
    .locator("[data-slot=select-content]")
    .getByRole("option", { name: "Banana" })
    .click()
  await expect(page.locator("[data-slot=select-value]")).toHaveText("Banana")
  await page.locator("[data-slot=select-trigger]").click()
  const banana = page
    .locator("[data-slot=select-content]")
    .getByRole("option", { name: "Banana" })
  await expect(banana).toBeFocused()
  await expect(banana).toHaveAttribute("aria-selected", "true")
})

test("Select ArrowDown moves the focused option", async ({ page }) => {
  await page.goto("/")
  await page.locator("[data-slot=select-trigger]").click()
  const opts = page.locator("[data-slot=select-content]")
  await expect(opts.getByRole("option", { name: "Apple" })).toBeFocused()
  await page.keyboard.press("ArrowDown")
  await expect(opts.getByRole("option", { name: "Banana" })).toBeFocused()
})

