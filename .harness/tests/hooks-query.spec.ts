import { test, expect } from "@playwright/test"
import type { Page, Route } from "@playwright/test"

const hookLog = (page: Page) =>
  page.evaluate(() => (window as Window & { __hookLog?: string[] }).__hookLog ?? [])

const setVisibility = (page: Page, state: "visible" | "hidden") =>
  page.evaluate((s) => {
    Object.defineProperty(document, "visibilityState", { configurable: true, get: () => s })
    document.dispatchEvent(new Event("visibilitychange"))
  }, state)

test("useQuery: a key change aborts the request in flight and ignores its late response", async ({ page }) => {
  const held: Route[] = []
  const failed: string[] = []
  page.on("requestfailed", (req) => failed.push(new URL(req.url()).pathname))
  await page.route("**/harness-api/q/a", (route) => void held.push(route))
  await page.route("**/harness-api/q/b", (route) => route.fulfill({ json: { v: "b" } }))
  await page.goto("/tests.html?fx=hook-query")
  await expect.poll(() => held.length).toBe(1)
  await expect(page.getByTestId("q-loading")).toHaveText("true")

  await page.getByRole("button", { name: "Key B" }).click()
  await expect(page.getByTestId("q-data")).toHaveText("b")
  await expect(page.getByTestId("q-loading")).toHaveText("false")
  await expect.poll(() => failed).toContain("/harness-api/q/a")
  await held[0].fulfill({ json: { v: "late a" } }).catch(() => null)
  await page.waitForTimeout(100)
  await expect(page.getByTestId("q-data")).toHaveText("b")
})

test("useQuery: the abort keeps loading true until the new key resolves", async ({ page }) => {
  await page.goto("/tests.html?fx=hook-query&fetcher=manual")
  await expect.poll(() => hookLog(page)).toEqual(["start:/q/a"])
  await page.getByRole("button", { name: "Rerender" }).click()
  await page.getByRole("button", { name: "Rerender" }).click()
  await expect(page.getByTestId("q-renders")).toHaveText("2")
  expect(await hookLog(page)).toEqual(["start:/q/a"])

  await page.getByRole("button", { name: "Key B" }).click()
  await expect.poll(() => hookLog(page)).toEqual(["start:/q/a", "abort:/q/a", "start:/q/b"])
  await expect(page.getByTestId("q-loading")).toHaveText("true")
  await page.evaluate(() => (window as Window & { __resolve?: Record<string, (v: { v: string }) => void> }).__resolve?.["/q/b"]({ v: "manual b" }))
  await expect(page.getByTestId("q-data")).toHaveText("manual b")
  await expect(page.getByTestId("q-loading")).toHaveText("false")
})

test("useQuery: a null key skips the fetch until a key is set", async ({ page }) => {
  let calls = 0
  await page.route("**/harness-api/**", (route) => {
    calls++
    return route.fulfill({ json: { v: "a" } })
  })
  await page.goto("/tests.html?fx=hook-query&key=null")
  await expect(page.getByTestId("q-loading")).toHaveText("false")
  await expect(page.getByTestId("q-data")).toHaveText("initial")
  await page.waitForTimeout(200)
  expect(calls).toBe(0)

  await page.getByRole("button", { name: "Key A" }).click()
  await expect(page.getByTestId("q-data")).toHaveText("a")
  expect(calls).toBe(1)
})

test("useQuery: errors, refetch and setData", async ({ page }) => {
  let calls = 0
  await page.route("**/harness-api/q/a", (route) => {
    calls++
    return calls === 1 ? route.fulfill({ status: 500, body: "{}" }) : route.fulfill({ json: { v: `a${calls}` } })
  })
  await page.goto("/tests.html?fx=hook-query")
  await expect(page.getByTestId("q-error")).toContainText("Request failed: 500")
  await expect(page.getByTestId("q-data")).toHaveText("initial")

  await page.getByRole("button", { name: "Refetch" }).click()
  await expect(page.getByTestId("q-data")).toHaveText("a2")
  await expect(page.getByTestId("q-error")).toHaveText("none")

  await page.getByRole("button", { name: "Set local" }).click()
  await expect(page.getByTestId("q-data")).toHaveText("local")
})

test("useQuery: live polls while visible, pauses while hidden or with a null key, and refreshes on return", async ({ page }) => {
  await page.clock.install()
  let calls = 0
  await page.route("**/harness-api/q/a", (route) => {
    calls++
    return route.fulfill({ json: { v: `a${calls}` } })
  })
  await page.goto("/tests.html?fx=hook-query&live=1000")
  await expect(page.getByTestId("q-data")).toHaveText("a1")

  await page.clock.runFor(1000)
  await expect(page.getByTestId("q-data")).toHaveText("a2")
  await expect(page.getByTestId("q-loading")).toHaveText("false")

  await setVisibility(page, "hidden")
  await page.clock.runFor(5000)
  await page.waitForTimeout(100)
  expect(calls).toBe(2)

  await setVisibility(page, "visible")
  await expect(page.getByTestId("q-data")).toHaveText("a3")

  await page.getByRole("button", { name: "Key null" }).click()
  await page.clock.runFor(5000)
  await page.waitForTimeout(100)
  expect(calls).toBe(3)
  await expect(page.getByTestId("q-data")).toHaveText("a3")
})

test("useListData still sorts rows through the useQuery wrapper", async ({ page }) => {
  await page.route("**/harness-api/list", (route) => route.fulfill({ json: [{ n: 3 }, { n: 1 }, { n: 2 }] }))
  await page.goto("/tests.html?fx=hook-list")
  await expect(page.getByTestId("list-data")).toHaveText("1,2,3")
  await expect(page.getByTestId("list-loading")).toHaveText("false")
  await expect(page.getByTestId("list-error")).toHaveText("none")
})
