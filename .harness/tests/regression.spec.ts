import { test, expect } from "@playwright/test"

test("Slot composes the child's own onClick with the injected trigger handler", async ({
  page,
}) => {
  await page.goto("/tests.html?fx=slot-compose")
  await page.getByRole("button", { name: /asChild \+ own onClick/ }).click()
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
  await expect(popover).toHaveCount(0)
  await expect(dialog).toHaveJSProperty("open", true)

  await page.keyboard.press("Escape")
  await expect(dialog).toHaveJSProperty("open", false)
})

test("SelectValue shows the selected label on first render (before opening)", async ({
  page,
}) => {
  await page.goto("/tests.html?fx=select-default")
  const value = page.locator("[data-slot=select-value]")
  await expect(value).toHaveText("Banana")
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
  await expect(page.locator(`[id="${controls}"]`)).toHaveCount(1)
})

test("RadioGroup name posts the selected value via a hidden input", async ({
  page,
}) => {
  await page.goto("/tests.html?fx=radio-form")
  await page.getByRole("button", { name: "Submit" }).click()
  await expect(page.getByTestId("radio-form-result")).toHaveText("pro")

  await page.getByRole("radio").first().click()
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

test("Select typeahead focuses the option matching the typed character", async ({
  page,
}) => {
  await page.goto("/tests.html?fx=select-default")
  await page.getByRole("combobox").click()
  await expect(
    page.locator('[role="option"][data-value="banana"]')
  ).toBeFocused()
  await page.keyboard.press("c")
  await expect(
    page.locator('[role="option"][data-value="cherry"]')
  ).toBeFocused()
})

test("Popover moves focus into its content on open and restores it on Escape", async ({
  page,
}) => {
  await page.goto("/tests.html?fx=popover-focus")
  const trigger = page.getByRole("button", { name: "Open popover" })
  await trigger.click()
  await expect(page.getByTestId("inside-button")).toBeFocused()
  await page.keyboard.press("Escape")
  await expect(trigger).toBeFocused()
})

test("Tabs: the first tab stays tabbable when no tab is selected", async ({
  page,
}) => {
  await page.goto("/tests.html?fx=tabs-nodefault")
  await expect(page.getByRole("tab", { name: "One" })).toHaveAttribute(
    "tabindex",
    "0"
  )
  await expect(page.getByRole("tab", { name: "Two" })).toHaveAttribute(
    "tabindex",
    "-1"
  )
})

test("RadioGroup: only the first radio is tabbable when none is selected", async ({
  page,
}) => {
  await page.goto("/tests.html?fx=radio-nodefault")
  const radios = page.getByRole("radio")
  await expect(radios.nth(0)).toHaveAttribute("tabindex", "0")
  await expect(radios.nth(1)).toHaveAttribute("tabindex", "-1")
  await expect(radios.nth(2)).toHaveAttribute("tabindex", "-1")
})

test("Dialog wires aria-labelledby to its title and omits aria-describedby when no description", async ({
  page,
}) => {
  await page.goto("/tests.html?fx=slot-compose")
  await page.getByRole("button", { name: /asChild/ }).click()
  const dlg = page.locator("dialog[data-slot=dialog-overlay]")
  await expect(dlg).toHaveJSProperty("open", true)
  await expect(dlg).toHaveAttribute("aria-labelledby", /.+/)
  const labelledby = await dlg.getAttribute("aria-labelledby")
  await expect(page.locator(`[id="${labelledby}"]`)).toHaveText("Composed")
  await expect(dlg).not.toHaveAttribute("aria-describedby", /.*/)
})

test("Popover gets an accessible name from its title via aria-labelledby", async ({
  page,
}) => {
  await page.goto("/tests.html?fx=popover-titled")
  await page.getByRole("button", { name: "Open" }).click()
  const pop = page.locator("[data-slot=popover-content]")
  await expect(pop).toBeVisible()
  await expect(pop).toHaveAttribute("aria-labelledby", /.+/)
  const id = await pop.getAttribute("aria-labelledby")
  await expect(page.locator(`[id="${id}"]`)).toHaveText("Account")
})

test("DropdownMenu returns focus to the trigger after selecting an item", async ({
  page,
}) => {
  await page.goto("/tests.html?fx=dropdown")
  const trigger = page.getByRole("button", { name: "Menu" })
  await trigger.click()
  await page.getByRole("menuitem", { name: "Profile" }).click()
  await expect(trigger).toBeFocused()
})

test("Slider participates in form submission and names its thumb", async ({
  page,
}) => {
  await page.goto("/tests.html?fx=slider-form")
  await expect(page.getByRole("slider")).toHaveAttribute("aria-label", "Volume")
  await page.getByRole("button", { name: "Submit" }).click()
  await expect(page.getByTestId("slider-form-result")).toHaveText("30")
})

test("Scroll lock is reentrant: closing an inner sheet keeps body locked under the dialog", async ({
  page,
}) => {
  await page.goto("/tests.html?fx=nested-lock")
  const bodyOverflow = () =>
    page.evaluate(() => getComputedStyle(document.body).overflow)
  await expect.poll(bodyOverflow).toBe("hidden")
  await page.getByRole("button", { name: "Open sheet" }).click()
  await expect(page.locator("dialog[data-slot=sheet-content]")).toHaveJSProperty(
    "open",
    true
  )
  await page.getByRole("button", { name: "Close sheet" }).click()
  await expect(page.locator("dialog[data-slot=sheet-content]")).toHaveCount(0)
  await expect.poll(bodyOverflow).toBe("hidden")
})

test("Checkbox exposes aria-checked=mixed for indeterminate and resolves on click", async ({
  page,
}) => {
  await page.goto("/tests.html?fx=checkbox-indeterminate")
  const box = page.getByRole("checkbox")
  await expect(box).toHaveAttribute("aria-checked", "mixed")
  await box.click()
  await expect(box).toHaveAttribute("aria-checked", "true")
})

test("DropdownMenu content is labelled by its trigger via aria-labelledby", async ({
  page,
}) => {
  await page.goto("/tests.html?fx=dropdown")
  const trigger = page.getByRole("button", { name: "Menu" })
  const triggerId = await trigger.getAttribute("id")
  expect(triggerId).toBeTruthy()
  await trigger.click()
  await expect(page.getByRole("menu")).toHaveAttribute(
    "aria-labelledby",
    triggerId ?? ""
  )
})
