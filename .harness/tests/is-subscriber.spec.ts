import { test, expect } from "@playwright/test"

// isSubscriber() reads the status from POST /usage {"operation":"check"}:
// backends have no GET /isSubscriber route.

test("isSubscriber posts a usage check with the CSRF token and returns isSubscriber", async ({ page }) => {
  const calls: { method: string; path: string; body: string | null; csrf?: string; type?: string }[] = []
  await page.route("**/harness-api/**", async (route) => {
    const req = route.request()
    calls.push({
      method: req.method(),
      path: new URL(req.url()).pathname,
      body: req.postData(),
      csrf: req.headers()["x-csrf-token"],
      type: req.headers()["content-type"],
    })
    await route.fulfill({ json: { remaining: -1, total: -1, isSubscriber: true } })
  })
  await page.goto("/tests.html?fx=is-subscriber")
  await expect(page.getByTestId("is-subscriber")).toHaveText("true")
  expect(calls).toEqual([
    {
      method: "POST",
      path: "/harness-api/usage",
      body: JSON.stringify({ operation: "check" }),
      csrf: "harness-csrf",
      type: "application/json",
    },
  ])
})

test("isSubscriber is false when the usage check says so", async ({ page }) => {
  await page.route("**/harness-api/usage", (route) =>
    route.fulfill({ json: { remaining: 3, total: 5, isSubscriber: false } })
  )
  await page.goto("/tests.html?fx=is-subscriber")
  await expect(page.getByTestId("is-subscriber")).toHaveText("false")
})

test("isSubscriber is false when the usage check fails", async ({ page }) => {
  await page.route("**/harness-api/usage", (route) =>
    route.fulfill({ status: 401, json: { error: "Unauthorized" } })
  )
  await page.goto("/tests.html?fx=is-subscriber")
  await expect(page.getByTestId("is-subscriber")).toHaveText("false")
})
