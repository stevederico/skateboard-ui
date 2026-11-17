import { test, expect, type Page } from "@playwright/test"

const STATUS_COLORS = {
  success: "oklch(69.6% .17 162.48)",
  warning: "oklch(79.5% .184 86.047)",
  info: "oklch(62.3% .214 259.815)",
  danger: "oklch(63.7% .237 25.331)",
}

type Theme = "light" | "dark-class" | "dark-media"

async function readStatusColors(page: Page, theme: Theme) {
  await page.emulateMedia({ colorScheme: theme === "dark-media" ? "dark" : "light" })
  await page.goto("/")
  return page.evaluate(
    ({ colors, isDarkClass }) => {
      document.documentElement.classList.toggle("dark", isDarkClass)
      const probe = (className: string, inlineColor = "") => {
        const el = document.createElement("div")
        el.className = className
        if (inlineColor) el.style.color = inlineColor
        document.body.append(el)
        const style = getComputedStyle(el)
        const read = {
          color: style.color,
          background: style.backgroundColor,
          border: style.borderTopColor,
        }
        el.remove()
        return read
      }
      return Object.fromEntries(
        Object.entries(colors).map(([name, value]) => [
          name,
          {
            expected: probe("", value).color,
            text: probe(`text-${name}`).color,
            background: probe(`bg-${name}`).background,
            tint: probe(`bg-${name}/10`).background,
            border: probe(`border border-${name}`).border,
          },
        ])
      )
    },
    { colors: STATUS_COLORS, isDarkClass: theme === "dark-class" }
  )
}

for (const theme of ["light", "dark-class", "dark-media"] as const) {
  test(`status color classes resolve to their tokens (${theme})`, async ({ page }) => {
    const colors = await readStatusColors(page, theme)
    for (const [name, read] of Object.entries(colors)) {
      expect(read.text, `text-${name}`).toBe(read.expected)
      expect(read.background, `bg-${name}`).toBe(read.expected)
      expect(read.border, `border-${name}`).toBe(read.expected)
      expect(read.tint, `bg-${name}/10`).not.toBe(read.expected)
      expect(read.tint, `bg-${name}/10`).not.toBe("rgba(0, 0, 0, 0)")
    }
  })
}

test("text-danger stays readable in dark mode where text-destructive is dark", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" })
  await page.goto("/")
  const lightness = await page.evaluate(() => {
    document.documentElement.classList.add("dark")
    const readL = (className: string) => {
      const el = document.createElement("div")
      el.className = className
      document.body.append(el)
      const { color } = getComputedStyle(el)
      el.remove()
      return Number(/oklch\(([\d.]+)/.exec(color)?.[1] ?? Number.NaN)
    }
    return { danger: readL("text-danger"), destructive: readL("text-destructive") }
  })
  expect(lightness.destructive).toBeLessThan(0.45)
  expect(lightness.danger).toBeGreaterThan(0.6)
})
