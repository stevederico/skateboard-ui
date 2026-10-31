import { test, expect } from "@playwright/test"

// A Stripe free trial reports subscription status "trialing". Trial users have
// the paid plan, so they count as paid everywhere "active" does.

test("isPaidStatus is true only for active and trialing", async ({ page }) => {
  await page.goto("/tests.html?fx=subscription")
  await expect(page.getByTestId("paid-statuses")).toHaveText(
    "active=true trialing=true canceled=false past_due=false incomplete=false empty=false null=false undefined=false"
  )
})

for (const status of ["active", "trialing"]) {
  test(`${status} user is paid: no upgrade sheet, Pro and Active badges`, async ({ page }) => {
    await page.goto(`/tests.html?fx=subscription&status=${status}`)
    await page.getByRole("button", { name: "Try upgrade" }).click()
    // Give the async showUpgradeSheet a chance to (wrongly) open the sheet.
    await page.waitForTimeout(100)
    await expect(page.getByTestId("upgrade-shown")).toHaveText("0")

    await expect(page.getByText("Pro", { exact: true })).toBeVisible()
    const billing = page.locator("[data-slot=card]").filter({ hasText: "Billing" })
    await expect(billing.locator("[data-slot=badge]")).toHaveText("Active")
    await expect(billing.getByText(/^Plan /)).toHaveCount(0)
  })
}

test("user without a subscription sees the upgrade sheet and Free", async ({ page }) => {
  await page.goto("/tests.html?fx=subscription")
  await page.getByRole("button", { name: "Try upgrade" }).click()
  await expect(page.getByTestId("upgrade-shown")).toHaveText("1")

  await expect(page.getByText("Pro", { exact: true })).toHaveCount(0)
  const billing = page.locator("[data-slot=card]").filter({ hasText: "Billing" })
  await expect(billing.locator("[data-slot=badge]")).toHaveText("Free")
})

test("canceled user still sees the upgrade sheet", async ({ page }) => {
  await page.goto("/tests.html?fx=subscription&status=canceled")
  await page.getByRole("button", { name: "Try upgrade" }).click()
  await expect(page.getByTestId("upgrade-shown")).toHaveText("1")
  await expect(page.getByText("Pro", { exact: true })).toHaveCount(0)
})
