import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
   test: {
      browser: {
         enabled: true,
         provider: playwright(),
         headless: true,
         instances: [
            { browser: 'chromium' },
         ],
      },
      include: ['js/tests/**/*.spec.ts'],
      globals: true,
      css: false,
      coverage: {
         provider: 'istanbul',
         include: ['js/src/bootstrap/**/*.ts'],
         reporter: ['text', 'html', 'lcov'],
         reportsDirectory: 'coverage'
      }
   }
})
