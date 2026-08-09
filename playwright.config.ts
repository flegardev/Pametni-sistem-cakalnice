import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/smoke",
  timeout: 45_000,
  workers: 1,
  expect: {
    timeout: 8_000,
  },
  fullyParallel: false,
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:5173",
    channel: process.env.PW_CHANNEL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run build && npm run preview -- --port 5173 --strictPort",
    url: "http://127.0.0.1:5173",
    reuseExistingServer: process.env.PW_REUSE_SERVER === "true",
    timeout: 120_000,
  },
  projects: [
    {
      name: "desktop-1440",
      use: { viewport: { width: 1440, height: 900 } },
    },
    {
      name: "laptop-1280",
      use: { viewport: { width: 1280, height: 720 } },
    },
    {
      name: "tablet-768",
      use: { viewport: { width: 768, height: 1024 } },
    },
    {
      name: "mobile-390",
      use: { ...devices["Pixel 5"], viewport: { width: 390, height: 844 } },
    },
  ],
});
