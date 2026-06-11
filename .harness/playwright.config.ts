import { defineConfig, devices } from "@playwright/test"

// E2E tests run against the built harness (which imports the compiled dist/ui
// components) served by `vite preview`, so they exercise the real published
// output in a real browser — the only environment where native <dialog>,
// floating layout, drag, and focus-visibility behave correctly.
export default defineConfig({
  testDir: "./tests",
  // Serial, single-worker: every test hits one shared `vite preview` server and
  // exercises focus/layout/animation timing; parallel load made those flake.
  // The whole suite still runs in well under a minute.
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : [["list"]],
  use: {
    baseURL: "http://localhost:5199",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    // Build the package, then the harness, then serve it.
    command:
      "cd .. && npm run build && cd .harness && vite build && vite preview --port 5199 --strictPort",
    url: "http://localhost:5199",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
})
