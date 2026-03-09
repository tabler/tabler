import { defineConfig } from 'vitest/config'
export default defineConfig({
   test: {
      environment: 'jsdom',
      include: ['js/tests/**/*.spec.ts'],
      globals: true,
      css: false,
      coverage: {
         provider: 'v8',
         include: ['js/src/bootstrap/**/*.ts'],
         reporter: ['text', 'html', 'lcov'],
         reportsDirectory: 'coverage'
      }
   }
})
