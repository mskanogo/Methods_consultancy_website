import { defineConfig, devices } from "@playwright/test";

// Tests run against a production build (no dev overlay), on port 3100 so they
// never clash with `npm run dev` on 3000. Stop the dev server before running.
const PORT = 3100;

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  expect: { timeout: 7_000 },
  fullyParallel: true,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npm run build && npm run start -- -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    timeout: 240_000,
    reuseExistingServer: true,
    // A dummy key overrides .env.local, so the tests can never spend real
    // credits. Assistant replies are mocked in the browser tests.
    env: { ANTHROPIC_API_KEY: "test-key-not-real" },
  },
});
