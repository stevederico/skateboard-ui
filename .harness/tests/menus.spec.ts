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
  // Wait for the open-time auto-focus, or it can land after the hover.
  await expect(page.getByRole("menuitem", { name: "Edit" })).toBeFocused()
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
  // A checkbox item toggles in place and keeps the menu open (only plain items
  // close it), so read the new state straight from the open menu.
  await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute(
    "aria-expanded",
    "true"
  )
  await expect(item).toHaveAttribute("aria-checked", "false")
})

test("DropdownMenu closes on Escape", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Menu" }).click()
  await expect(page.locator("[data-slot=dropdown-menu-content]")).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(page.locator("[data-slot=dropdown-menu-content]")).toHaveCount(0)
})

test("DropdownMenu closes on Escape pressed before focus moves into it", async ({
  page,
}) => {
  await page.goto("/")
  // Click and press Escape within one frame, so focus is still on the trigger:
  // the menu moves focus to its first item a frame later (requestAnimationFrame).
  // A fast Escape must still close it.
  const open = await page.evaluate(async () => {
    const trigger = [...document.querySelectorAll("button")].find(
      (b) => b.textContent?.trim() === "Menu"
    )!
    trigger.focus()
    trigger.click()
    // React flushes the click's update in a microtask; no frame runs before it.
    await Promise.resolve()
    const wasOpen = trigger.getAttribute("aria-expanded") === "true"
    trigger.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true })
    )
    return { wasOpen, focusOnTrigger: document.activeElement === trigger }
  })
  expect(open).toEqual({ wasOpen: true, focusOnTrigger: true })
  await expect(page.locator("[data-slot=dropdown-menu-content]")).toHaveCount(0)
  await expect(page.getByRole("button", { name: "Menu" })).toBeFocused()
})

test("DropdownMenu closes on an outside click", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Menu" }).click()
  await expect(page.locator("[data-slot=dropdown-menu-content]")).toBeVisible()
  await page.getByRole("heading", { level: 1 }).click()
  await expect(page.locator("[data-slot=dropdown-menu-content]")).toHaveCount(0)
})

test("DropdownMenu Escape while the menu is closed is a no-op", async ({
  page,
}) => {
  const errors: string[] = []
  page.on("pageerror", (err) => errors.push(err.message))
  page.on("console", (msg) => {
    // Network misses (e.g. an offline avatar image) are not script errors.
    if (msg.type() !== "error" || msg.text().startsWith("Failed to load resource")) return
    errors.push(msg.text())
  })
  await page.goto("/")
  const trigger = page.getByRole("button", { name: "Menu" })
  await trigger.focus()
  await page.keyboard.press("Escape")
  await expect(trigger).toHaveAttribute("aria-expanded", "false")
  await expect(page.locator("[data-slot=dropdown-menu-content]")).toHaveCount(0)
  await expect(trigger).toBeFocused()
  expect(errors).toEqual([])
})

// ---- DropdownMenu submenu (#s-menu "Share" > "Export") --------------------

test("DropdownMenu submenu opens from its sub-trigger", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Share" }).click()
  const subTrigger = page.getByRole("menuitem", { name: "Export" })
  await subTrigger.click()
  await expect(subTrigger).toHaveAttribute("aria-expanded", "true")
  const sub = page.locator("[data-slot=dropdown-menu-sub-content]")
  await expect(sub).toBeVisible()
  await expect(sub.getByRole("menuitem", { name: "PDF" })).toBeVisible()
})

test("DropdownMenu submenu item is reachable by keyboard", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Share" }).click()
  await expect(page.getByRole("menuitem", { name: "Copy link" })).toBeFocused()
  await page.keyboard.press("ArrowDown")
  await expect(page.getByRole("menuitem", { name: "Export" })).toBeFocused()
  await page.keyboard.press("ArrowRight")
  const sub = page.locator("[data-slot=dropdown-menu-sub-content]")
  await expect(sub.getByRole("menuitem", { name: "PDF" })).toBeFocused()
  await page.keyboard.press("ArrowDown")
  await expect(sub.getByRole("menuitem", { name: "CSV" })).toBeFocused()
})

test("DropdownMenu submenu item selects and closes the whole menu", async ({
  page,
}) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Share" }).click()
  await page.getByRole("menuitem", { name: "Export" }).click()
  await page
    .locator("[data-slot=dropdown-menu-sub-content]")
    .getByRole("menuitem", { name: "CSV" })
    .click()
  await expect(page.getByTestId("export-format")).toHaveText("csv")
  await expect(page.locator("[data-slot=dropdown-menu-sub-content]")).toHaveCount(0)
  await expect(page.locator("[data-slot=dropdown-menu-content]")).toHaveCount(0)
})

test("DropdownMenu submenu closes on Escape and refocuses its trigger", async ({
  page,
}) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Share" }).click()
  await page.getByRole("menuitem", { name: "Export" }).click()
  const sub = page.locator("[data-slot=dropdown-menu-sub-content]")
  await expect(sub.getByRole("menuitem", { name: "PDF" })).toBeFocused()
  await page.keyboard.press("Escape")
  await expect(sub).toHaveCount(0)
  await expect(page.locator("[data-slot=dropdown-menu-content]")).toBeVisible()
  await expect(page.getByRole("menuitem", { name: "Export" })).toBeFocused()
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

