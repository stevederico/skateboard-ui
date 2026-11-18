import { test, expect, type Locator, type Page } from "@playwright/test"

type HarnessWindow = Window & { __closedClasses?: string[]; __authOutcomes?: string[] }

async function boxOf(locator: Locator) {
  const box = await locator.boundingBox()
  if (!box) throw new Error("element has no bounding box")
  return box
}

const nextFrames = (page: Page) =>
  page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))))

test("authOverlayReducer parks callbacks without calling them and clears them on hide and success", async () => {
  const { authOverlayReducer } = await import("../../dist/components/core/Context.js")
  const calls: string[] = []
  const callback = (outcome: string) => {
    calls.push(outcome)
  }
  const closed = { visible: false, pendingCallbacks: [] }
  const shown = authOverlayReducer(closed, { type: "SHOW_AUTH_OVERLAY", payload: callback })
  expect(shown).toEqual({ visible: true, pendingCallbacks: [callback] })
  expect(authOverlayReducer(closed, { type: "SHOW_AUTH_OVERLAY", payload: callback })).toEqual(shown)
  expect(authOverlayReducer(shown, { type: "SHOW_AUTH_OVERLAY" })).toEqual(shown)
  expect(authOverlayReducer(shown, { type: "HIDE_AUTH_OVERLAY" })).toEqual(closed)
  expect(authOverlayReducer(shown, { type: "AUTH_OVERLAY_SUCCESS" })).toEqual(closed)
  expect(closed.pendingCallbacks).toEqual([])
  expect(shown.pendingCallbacks).toEqual([callback])
  expect(calls).toEqual([])
})

test("the auth overlay opens in the mode it is asked for, and forgets it on close", async () => {
  const { authOverlayReducer } = await import("../../dist/components/core/Context.js")
  const closed = { visible: false, pendingCallbacks: [] }
  const signup = authOverlayReducer(closed, { type: "SHOW_AUTH_OVERLAY", mode: "signup" })
  expect(signup.mode).toBe("signup")
  expect(authOverlayReducer(closed, { type: "SHOW_AUTH_OVERLAY", mode: "signin" }).mode).toBe("signin")
  expect(authOverlayReducer(closed, { type: "SHOW_AUTH_OVERLAY" }).mode).toBeUndefined()
  expect(authOverlayReducer(signup, { type: "HIDE_AUTH_OVERLAY" }).mode).toBeUndefined()
})

test("AuthOverlay runs a parked callback once with cancel when dismissed", async ({ page }) => {
  await page.goto("/tests.html?fx=auth-overlay")
  const outcomes = () => page.evaluate(() => (window as HarnessWindow).__authOutcomes ?? [])
  await page.getByRole("button", { name: "Park callback" }).click()
  const dialog = page.locator("dialog[data-slot=dialog-overlay]")
  await expect(dialog).toHaveJSProperty("open", true)
  expect(await outcomes()).toEqual([])
  await page.keyboard.press("Escape")
  await expect(dialog).toHaveJSProperty("open", false)
  await expect.poll(outcomes).toEqual(["cancel"])
})

test("Dialog backdrop closes only when the press starts and ends on the backdrop", async ({ page }) => {
  await page.goto("/tests.html?fx=dialog-backdrop")
  const dialog = page.locator("dialog[data-slot=dialog-overlay]")
  await expect(dialog).toHaveJSProperty("open", true)
  const text = await boxOf(page.getByTestId("dialog-text"))
  await page.mouse.move(text.x + 2, text.y + text.height / 2)
  await page.mouse.down()
  await page.mouse.move(5, 5, { steps: 5 })
  await page.mouse.up()
  await nextFrames(page)
  await expect(dialog).toHaveJSProperty("open", true)
  await page.mouse.click(5, 5)
  await expect(dialog).toHaveJSProperty("open", false)
})

test("Drawer drag-dismiss closes without animate-out so the panel does not snap back", async ({ page }) => {
  await page.goto("/tests.html?fx=drawer-drag")
  const content = page.locator("dialog[data-slot=drawer-content]")
  await expect(content).toHaveJSProperty("open", true)
  await page.evaluate(() => {
    const w = window as HarnessWindow
    const closedClasses: string[] = []
    w.__closedClasses = closedClasses
    new MutationObserver((records) => {
      for (const record of records) {
        const el = record.target as HTMLElement
        if (el.matches("[data-slot=drawer-content][data-closed]")) closedClasses.push(el.className)
      }
    }).observe(document.body, { attributes: true, subtree: true, attributeFilter: ["data-closed", "class"] })
  })
  const body = await boxOf(page.getByTestId("drawer-body"))
  const x = body.x + body.width / 2
  await page.mouse.move(x, body.y + 5)
  await page.mouse.down()
  await page.mouse.move(x, body.y + 220, { steps: 10 })
  await page.mouse.up()
  await expect(content).toHaveCount(0)
  const closedClasses = await page.evaluate(() => (window as HarnessWindow).__closedClasses ?? [])
  expect(closedClasses.length).toBeGreaterThan(0)
  for (const className of closedClasses) expect(className).not.toContain("animate-out")
})

test("Slider drag keeps a controlled parent's min-gap push instead of overwriting it with stale values", async ({ page }) => {
  await page.goto("/tests.html?fx=slider-gap")
  const track = await boxOf(page.locator("[data-slot=slider-track]"))
  const y = track.y + track.height / 2
  await page.mouse.move(track.x + track.width * 0.2, y)
  await page.mouse.down()
  await page.mouse.move(track.x + track.width * 0.7, y, { steps: 30 })
  await page.mouse.up()
  const values = async () =>
    ((await page.getByTestId("slider-gap-values").textContent()) ?? "").split(",").map(Number)
  await expect.poll(async () => (await values())[0]).toBeGreaterThanOrEqual(65)
  const [low, high] = await values()
  expect(high - low).toBeGreaterThanOrEqual(10)
})

test("useFloating positions a floating node that attaches frames after open", async ({ page }) => {
  await page.goto("/tests.html?fx=late-floating")
  const status = page.getByTestId("floating-pos")
  await expect(status).toHaveText("none")
  await page.getByRole("button", { name: "Attach floating" }).click()
  await expect(status).toHaveText("positioned")
})

test("Avatar shows the fallback when src changes to empty after the image loaded", async ({ page }) => {
  await page.goto("/tests.html?fx=avatar-empty-src")
  const avatar = page.locator("[data-slot=avatar]")
  await expect(avatar.locator("[data-slot=avatar-fallback]")).toHaveCount(0)
  await page.getByRole("button", { name: "Clear src" }).click()
  await expect(avatar.locator("[data-slot=avatar-fallback]")).toHaveText("ES")
  await expect(avatar.locator("[data-slot=avatar-image]")).toHaveCount(0)
})
