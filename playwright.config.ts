import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";
/**
 * Read environment variables from file.
 */
import dotenv from "dotenv";
dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  /**
   * globalSetup & teardown of test data
   */
  globalSetup: require.resolve("./e2e/global-setup"),

  testDir: "./e2e",
  /* Maximum time one test can run for. */
  timeout: 10 * 10000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 10 * 10000,
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 2,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html", { open: "never" }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    storageState: process.env.STORAGE_STATE_PATH || "storageState.json",
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    screenshot: "off",
    video: "off",
    trace: "on-first-retry",
    baseURL: process.env.ENV_URL,
    launchOptions: {
      logger: {
        isEnabled: () => {
          return false;
        },
        log: (name, severity, message, args) => console.log(`${name}: ${message}`),
      },
    },
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: "Chromium",
      use: {
        browserName: "chromium",
      },
    },
  ],
};

export default config;

