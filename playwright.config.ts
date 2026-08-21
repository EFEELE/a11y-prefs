import { defineConfig, devices } from "@playwright/test";

/**
 * A real browser, not jsdom. Nearly every assertion here is about a computed
 * style produced by a stylesheet, and jsdom does not resolve those — it would
 * pass a suite that proves nothing.
 *
 * The dev server is the same static server the demo uses, so the tests run
 * against exactly what a person sees at http://localhost:4333/demo/.
 */
export default defineConfig({
  testDir: "tests/component",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: process.env.CI ? "github" : "list",

  use: {
    baseURL: "http://localhost:4333",
    trace: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: {
    command: "node scripts/serve.mjs 4333",
    url: "http://localhost:4333/demo/",
    reuseExistingServer: !process.env.CI,
    stdout: "ignore",
  },
});
