import { defineConfig, devices } from "@playwright/test";

/**
 * Browser tests (e2e/). Run with `bun run test:e2e`.
 * Starts the Vite dev server, which also serves /api/subscribe locally.
 * BEEHIIV_API_KEY is blanked so tests can never create real subscribers.
 */
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:8080",
    trace: "off",
    // Optional: point at a preinstalled Chromium instead of `playwright install`.
    launchOptions: { executablePath: process.env.PW_CHROMIUM_PATH || undefined },
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "bun run dev",
    url: "http://localhost:8080",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    env: { BEEHIIV_API_KEY: "" },
  },
});
