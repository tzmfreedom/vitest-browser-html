import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [],
  test: {
    name: 'vanilla',
    browser: {
      enabled: true,
      headless: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium' }],
    },
  },
});
