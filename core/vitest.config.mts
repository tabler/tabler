import { defineConfig } from 'vitest/config'
export default defineConfig({
   test: {
      environment: 'happy-dom',
      include: ['js/tests/**/*.spec.ts'],
      globals: true,
      css: false
   }
})
