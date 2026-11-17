import { test, expect } from "@playwright/test"

test("useStoredState: reads lazily and writes in the setter", async ({ page }) => {
  await page.addInitScript(() => {
    if (!localStorage.getItem("harness-stored")) localStorage.setItem("harness-stored", JSON.stringify({ n: 5 }))
  })
  await page.goto("/tests.html?fx=hook-stored")
  await expect(page.getByTestId("stored-n")).toHaveText("5")
  await page.getByRole("button", { name: "Increment" }).click()
  await expect(page.getByTestId("stored-n")).toHaveText("6")
  expect(await page.evaluate(() => localStorage.getItem("harness-stored"))).toBe('{"n":6}')
})

test("useStoredState: session storage is used when asked", async ({ page }) => {
  await page.goto("/tests.html?fx=hook-stored&area=session")
  await page.getByRole("button", { name: "Increment" }).click()
  await expect(page.getByTestId("stored-n")).toHaveText("1")
  expect(await page.evaluate(() => sessionStorage.getItem("harness-stored"))).toBe('{"n":1}')
  expect(await page.evaluate(() => localStorage.getItem("harness-stored"))).toBeNull()
})

test("useStoredState: syncs across tabs through the storage event", async ({ context }) => {
  const one = await context.newPage()
  const two = await context.newPage()
  await one.goto("/tests.html?fx=hook-stored")
  await two.goto("/tests.html?fx=hook-stored")
  await two.getByRole("button", { name: "Increment" }).click()
  await two.getByRole("button", { name: "Increment" }).click()
  await expect(two.getByTestId("stored-n")).toHaveText("2")
  await expect(one.getByTestId("stored-n")).toHaveText("2")

  await two.evaluate(() => localStorage.clear())
  await expect(one.getByTestId("stored-n")).toHaveText("0")
})

test("useStoredState: works in memory when storage access throws", async ({ page }) => {
  const errors: string[] = []
  page.on("pageerror", (e) => errors.push(e.message))
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get() {
        throw new DOMException("blocked", "SecurityError")
      },
    })
  })
  await page.goto("/tests.html?fx=hook-stored")
  await expect(page.getByTestId("stored-n")).toHaveText("0")
  await page.getByRole("button", { name: "Increment" }).click()
  await expect(page.getByTestId("stored-n")).toHaveText("1")
  expect(errors).toEqual([])
})

test("useStoredState: works in memory when getItem and setItem throw", async ({ page }) => {
  const errors: string[] = []
  page.on("pageerror", (e) => errors.push(e.message))
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new DOMException("denied", "SecurityError")
    }
    Storage.prototype.setItem = () => {
      throw new DOMException("full", "QuotaExceededError")
    }
  })
  await page.goto("/tests.html?fx=hook-stored")
  await expect(page.getByTestId("stored-n")).toHaveText("0")
  await page.getByRole("button", { name: "Increment" }).click()
  await page.getByRole("button", { name: "Increment" }).click()
  await expect(page.getByTestId("stored-n")).toHaveText("2")
  expect(errors).toEqual([])
})
