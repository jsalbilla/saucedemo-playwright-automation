import 'dotenv/config'
import { defineConfig, devices } from '@playwright/test'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  /* Run tests from the "tests" directory, relative to this configuration file. */
  testDir: './tests',

  /* Setting up timeout for each test steps */
  timeout: 60_000, // 60 seconds
  /* Setting up global timeout for each test steps */
  globalTimeout: 60 * 60_000, // 60 minutes

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : 2,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? [['github'], ['html'], ['list']]
    : [['html'], ['list']],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: process.env.SAUCEDEMO_BASE_URL,
    testIdAttribute: 'data-test',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  // webServer: {
  //   command: process.env.CI
  //     ? 'pnpm build && node .output/server/index.mjs'
  //     : 'pnpm dev',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: process.env.CI ? 180_000 : 120_000,
  //   stdout: 'pipe', //  NORMAL messages from your server (startup logs, ready messages)
  //   stderr: 'pipe', // ERROR messages from your server (crashes, missing modules, port conflicts)
  // },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      /* grants clipboard read permission to the tests running in this project, allowing them to access the clipboard content during test execution. */
      use: { ...devices['Desktop Chrome'], permissions: ['clipboard-read'] },
    },

    // {
    //   name: 'firefox',
    //   /* ensures setup project runs before this one, allowing us to set up the environment (e.g., log in) before running tests that require it. */
    //   dependencies: ['setup'],
    //   use: { ...devices['Desktop Firefox'], permissions: ['clipboard-read'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },

  ],
})
