import { test, expect } from "@playwright/test"

test("Popover opens on trigger click and is positioned with a data-side", async ({
  page,
}) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Open popover" }).click()
  const content = page.locator("[data-slot=popover-content]")
  await expect(content).toBeVisible()
  await expect(content).toHaveAttribute("data-side", /top|bottom|left|right/)
})

test("Popover closes on Escape", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Open popover" }).click()
  const content = page.locator("[data-slot=popover-content]")
  await expect(content).toBeVisible()

  await page.keyboard.press("Escape")
  await expect(content).toHaveCount(0)
})

test("Popover closes on an outside click", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Open popover" }).click()
  const content = page.locator("[data-slot=popover-content]")
  await expect(content).toBeVisible()

  await page.getByRole("heading", { level: 1 }).click()
  await expect(content).toHaveCount(0)
})

test("Tooltip appears on hover with its text and disappears on unhover", async ({
  page,
}) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Hover me" }).hover()
  const tip = page.locator("[data-slot=tooltip-content]")
  await expect(tip).toBeVisible()
  await expect(tip).toHaveText("Tooltip text")

  await page.getByRole("heading", { level: 1 }).hover()
  await expect(tip).toHaveCount(0)
})

test("Dialog opens as a native dialog with open=true", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Open dialog" }).click()
  await expect(page.locator("dialog[data-slot=dialog-overlay]")).toHaveJSProperty(
    "open",
    true
  )
})

test("Dialog focus-traps: the focused element is inside the open dialog", async ({
  page,
}) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Open dialog" }).click()
  await expect(page.locator("dialog[data-slot=dialog-overlay]")).toHaveJSProperty(
    "open",
    true
  )
  const focusedInside = await page.evaluate(() =>
    document
      .querySelector("dialog[data-slot=dialog-overlay][open]")
      ?.contains(document.activeElement)
  )
  expect(focusedInside).toBe(true)
})

test("Dialog closes when a DialogClose button (Cancel) is clicked", async ({
  page,
}) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Open dialog" }).click()
  const overlay = page.locator("dialog[data-slot=dialog-overlay]")
  await expect(overlay).toHaveJSProperty("open", true)

  await overlay.getByRole("button", { name: "Cancel" }).click()
  await expect(overlay).toHaveJSProperty("open", false)
})

test("Dialog closes on Escape", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Open dialog" }).click()
  const overlay = page.locator("dialog[data-slot=dialog-overlay]")
  await expect(overlay).toHaveJSProperty("open", true)

  await page.keyboard.press("Escape")
  await expect(overlay).toHaveJSProperty("open", false)
})

test("AlertDialog opens with role=alertdialog and closes via Cancel", async ({
  page,
}) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Delete…" }).click()
  const alert = page.locator("dialog[role=alertdialog]").first()
  await expect(alert).toHaveJSProperty("open", true)

  await alert.getByRole("button", { name: "Cancel" }).click()
  await expect(alert).toHaveJSProperty("open", false)
})

test("Sheet opens anchored to the right edge", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Open sheet" }).click()
  const content = page.locator("dialog[data-slot=sheet-content]")
  await expect(content).toHaveJSProperty("open", true)
  await expect(content).toHaveAttribute("data-side", "right")

  const viewport = page.viewportSize()!
  await expect
    .poll(async () => {
      const box = await content.boundingBox()
      return box ? Math.round(Math.abs(box.x + box.width - viewport.width)) : 999
    })
    .toBeLessThanOrEqual(2)
})

test("Drawer opens pinned to the bottom and spans the full width", async ({
  page,
}) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Open drawer" }).click()
  const content = page.locator("dialog[data-slot=drawer-content]")
  await expect(content).toHaveJSProperty("open", true)

  const box = await content.boundingBox()
  const viewport = page.viewportSize()!
  expect(box).not.toBeNull()
  expect(Math.abs(box!.y + box!.height - viewport.height)).toBeLessThanOrEqual(2)
  expect(Math.abs(box!.width - viewport.width)).toBeLessThanOrEqual(2)
})

test("Drawer closes when its Close button is clicked", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Open drawer" }).click()
  const content = page.locator("dialog[data-slot=drawer-content]")
  await expect(content).toHaveJSProperty("open", true)

  await content.getByRole("button", { name: "Close" }).click()
  await expect(content).toHaveCount(0)
})

test("Slider keyboard: ArrowRight increments aria-valuenow by the step", async ({
  page,
}) => {
  await page.goto("/")
  const thumb = page.locator("#s-menu").getByRole("slider")
  await expect(thumb).toHaveAttribute("aria-valuenow", "30")
  await thumb.focus()
  await page.keyboard.press("ArrowRight")
  await expect(thumb).toHaveAttribute("aria-valuenow", "31")
})

test("Slider pointer: a pointerdown on the track jumps the value to that spot", async ({
  page,
}) => {
  await page.goto("/")
  const thumb = page.locator("#s-menu").getByRole("slider")
  await expect(thumb).toHaveAttribute("aria-valuenow", "30")

  const track = page.locator("#s-menu [data-slot=slider-track]")
  const box = await track.boundingBox()
  expect(box).not.toBeNull()
  await track.dispatchEvent("pointerdown", {
    bubbles: true,
    clientX: box!.x + box!.width * 0.8,
    clientY: box!.y + box!.height / 2,
    pointerId: 1,
  })
  await expect
    .poll(async () => Number(await thumb.getAttribute("aria-valuenow")))
    .toBeGreaterThan(50)
})

test("ScrollArea shows a thumb that tracks the viewport scroll position", async ({
  page,
}) => {
  await page.goto("/")
  const thumb = page.locator("#s-menu [data-slot=scroll-area-thumb]")
  await expect(thumb).toBeVisible()

  const topBefore = await thumb.evaluate(
    (el) => (el as HTMLElement).style.top
  )

  await page.locator("#s-menu [data-slot=scroll-area-viewport]").evaluate((el) => {
    el.scrollTop = el.scrollHeight
  })

  await expect
    .poll(async () =>
      thumb.evaluate((el) => (el as HTMLElement).style.top)
    )
    .not.toBe(topBefore)
})
