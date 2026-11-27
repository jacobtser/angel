import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  use: {
    baseURL: 'http://127.0.0.1:8765',
    headless: true,
  },
  webServer: {
    command: 'npm run start',
    url: 'http://127.0.0.1:8765',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
