import { test, expect } from "@playwright/test"
import type { Page } from "@playwright/test"

const location = (page: Page) => page.getByTestId("location")
const boots = (page: Page) => page.getByTestId("boots")

const errors = new WeakMap<Page, string[]>()

test.beforeEach(async ({ page }) => {
  const list: string[] = []
  errors.set(page, list)
  page.on("pageerror", (e) => list.push(e.message))
  page.on("console", (m) => {
    if (m.type() === "error") list.push(m.text())
  })
})

test.afterEach(async ({ page }) => {
  expect(errors.get(page)).toEqual([])
})

test("useNavigate and Link navigate client-side", async ({ page }) => {
  await page.goto("/router")
  await expect(page.getByRole("heading", { name: "Router home" })).toBeVisible()
  await page.getByRole("button", { name: "Navigate to user 42" }).click()
  await expect(page).toHaveURL(/\/router\/users\/42$/)
  await expect(page.getByRole("heading", { name: "User 42" })).toBeVisible()
  await page.getByRole("link", { name: "Search link" }).click()
  await expect(location(page)).toHaveText("/search?q=hello")
  await expect(boots(page)).toHaveText("1")
})

test("route params and a nested Outlet render through two levels", async ({ page }) => {
  await page.goto("/router/users/5")
  await expect(page.getByRole("heading", { name: "User 5" })).toBeVisible()
  await expect(page.getByTestId("post")).toHaveCount(0)
  await page.getByRole("link", { name: "Post 9" }).click()
  await expect(page).toHaveURL(/\/router\/users\/5\/posts\/9$/)
  await expect(page.getByTestId("outlet").getByTestId("user-outlet").getByTestId("post")).toHaveText("Post 9 of user 5")
  await page.goto("/router/users/3/posts/11")
  await expect(page.getByTestId("post")).toHaveText("Post 11 of user 3")
})

test("search params read from the URL and update it", async ({ page }) => {
  await page.goto("/router/search?q=hello")
  await expect(page.getByTestId("q")).toHaveText("hello")
  await page.getByRole("button", { name: "Set q to world" }).click()
  await expect(page).toHaveURL(/\/router\/search\?q=world$/)
  await expect(page.getByTestId("q")).toHaveText("world")
  await page.goBack()
  await expect(page.getByTestId("q")).toHaveText("hello")
})

test("Navigate redirects and replaces the history entry", async ({ page }) => {
  await page.goto("/router")
  await page.getByRole("link", { name: "User 42 link" }).click()
  await expect(location(page)).toHaveText("/users/42")
  await page.goto("/router/old")
  await expect(page).toHaveURL(/\/router\/users\/7$/)
  await expect(page.getByRole("heading", { name: "User 7" })).toBeVisible()
  await page.goBack()
  await expect(page).toHaveURL(/\/router\/users\/42$/)
  await expect(page.getByRole("heading", { name: "User 42" })).toBeVisible()
})

test("browser back and forward move through client-side history", async ({ page }) => {
  await page.goto("/router")
  await page.getByRole("link", { name: "User 42 link" }).click()
  await expect(location(page)).toHaveText("/users/42")
  await page.getByRole("link", { name: "Post 9" }).click()
  await expect(location(page)).toHaveText("/users/42/posts/9")
  await page.getByRole("link", { name: "Search link" }).click()
  await expect(location(page)).toHaveText("/search?q=hello")

  await page.goBack()
  await expect(location(page)).toHaveText("/users/42/posts/9")
  await expect(page.getByTestId("post")).toHaveText("Post 9 of user 42")
  await page.goBack()
  await expect(location(page)).toHaveText("/users/42")
  await page.goBack()
  await expect(location(page)).toHaveText("/")
  await expect(page.getByRole("heading", { name: "Router home" })).toBeVisible()
  await page.goForward()
  await expect(location(page)).toHaveText("/users/42")
  await expect(boots(page)).toHaveText("1")
})

test("the shell's useSafeNavigate shares the app's router (one copy)", async ({ page }) => {
  await page.goto("/router")
  await page.getByRole("button", { name: "Safe navigate to search" }).click()
  await expect(location(page)).toHaveText("/search?q=safe")
  await expect(page.getByTestId("q")).toHaveText("safe")
  await expect(boots(page)).toHaveText("1")
})
