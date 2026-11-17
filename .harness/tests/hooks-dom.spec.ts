import { test, expect } from "@playwright/test"
import type { Page } from "@playwright/test"

const hookLog = (page: Page) =>
  page.evaluate(() => (window as Window & { __hookLog?: string[] }).__hookLog ?? [])

test("useEventListener uses the latest handler and removes listeners on target change, null and unmount", async ({ page }) => {
  await page.goto("/tests.html?fx=hook-event-listener")
  const a = page.getByRole("button", { name: "Target A" })
  const b = page.getByRole("button", { name: "Target B" })

  await a.click()
  await page.getByRole("button", { name: "Bump" }).click()
  await a.click()
  await page.keyboard.press("x")
  expect(await hookLog(page)).toEqual(["click:Target A:0", "click:Target A:1", "key:x:1"])

  await page.getByRole("button", { name: "Use B" }).click()
  await a.click()
  await b.click()
  expect((await hookLog(page)).slice(3)).toEqual(["click:Target B:1"])

  await page.getByRole("button", { name: "Use none" }).click()
  await a.click()
  await b.click()
  await page.keyboard.press("y")
  expect((await hookLog(page)).slice(4)).toEqual(["key:y:1"])

  await page.getByRole("button", { name: "Use A" }).click()
  await page.getByRole("button", { name: "Toggle mount" }).click()
  await expect(page.getByTestId("el-mounted")).toHaveText("false")
  await a.click()
  await page.keyboard.press("z")
  expect((await hookLog(page)).slice(5)).toEqual([])
})

test("useMediaQuery and useIsMobile follow media query changes", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 800 })
  await page.emulateMedia({ colorScheme: "light" })
  await page.goto("/tests.html?fx=hook-media")
  await expect(page.getByTestId("media-mobile")).toHaveText("false")
  await expect(page.getByTestId("media-dark")).toHaveText("false")

  await page.setViewportSize({ width: 767, height: 800 })
  await expect(page.getByTestId("media-mobile")).toHaveText("true")
  await page.setViewportSize({ width: 768, height: 800 })
  await expect(page.getByTestId("media-mobile")).toHaveText("false")

  await page.emulateMedia({ colorScheme: "dark" })
  await expect(page.getByTestId("media-dark")).toHaveText("true")
})

test("useInterval and useTimeout run the latest fn and pause on null", async ({ page }) => {
  await page.clock.install()
  await page.goto("/tests.html?fx=hook-timers")
  const total = page.getByTestId("timer-total")
  const fired = page.getByTestId("timer-fired")

  await page.clock.runFor(3000)
  await expect(total).toHaveText("3")
  await page.getByRole("button", { name: "Step 10" }).click()
  await page.clock.runFor(1000)
  await expect(total).toHaveText("13")

  await page.getByRole("button", { name: "Toggle interval" }).click()
  await page.clock.runFor(5000)
  await expect(total).toHaveText("13")
  await page.getByRole("button", { name: "Toggle interval" }).click()
  await page.clock.runFor(1000)
  await expect(total).toHaveText("23")
  await page.getByRole("button", { name: "Toggle interval" }).click()

  await page.getByRole("button", { name: "Toggle timeout" }).click()
  await page.clock.runFor(1900)
  await expect(fired).toHaveText("0")
  await page.clock.runFor(200)
  await expect(fired).toHaveText("1")
  await page.clock.runFor(5000)
  await expect(fired).toHaveText("1")

  await page.getByRole("button", { name: "Toggle timeout" }).click()
  await page.getByRole("button", { name: "Toggle timeout" }).click()
  await page.clock.runFor(1000)
  await page.getByRole("button", { name: "Toggle timeout" }).click()
  await page.clock.runFor(5000)
  await expect(fired).toHaveText("1")
})

test("useMountEffect runs once per mount and cleans up on unmount", async ({ page }) => {
  await page.goto("/tests.html?fx=hook-mount")
  for (let i = 0; i < 3; i++) await page.getByRole("button", { name: "Rerender" }).click()
  await expect(page.getByTestId("mount-n")).toHaveText("3")
  expect(await hookLog(page)).toEqual(["mount"])

  await page.getByRole("button", { name: "Toggle child" }).click()
  expect(await hookLog(page)).toEqual(["mount", "unmount"])
  await page.getByRole("button", { name: "Toggle child" }).click()
  await expect(page.getByTestId("mount-n")).toHaveText("3")
  expect(await hookLog(page)).toEqual(["mount", "unmount", "mount"])
})

test("the package root exports every effect hook", async ({ page }) => {
  await page.goto("/tests.html?fx=hook-root-exports")
  await expect(page.getByTestId("root-exports")).toHaveText(
    "useQuery,useListData,useEventListener,useMediaQuery,useIsMobile,useInterval,useTimeout,useStoredState,useMountEffect",
  )
})
