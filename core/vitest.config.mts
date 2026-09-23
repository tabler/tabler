import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [{ browser: 'chromium' }],
    },
    include: ['js/tests/**/*.spec.ts'],
    globals: true,
    // Only the cascade-layers spec needs a real stylesheet; it imports
    // scss/tabler.scss?inline, which Vite compiles with the sass package.
    css: { include: [/scss\/tabler\.scss$/] },
    coverage: {
      provider: 'istanbul',
      include: ['js/src/bootstrap/**/*.ts'],
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: 'coverage',
    },
  },
})
