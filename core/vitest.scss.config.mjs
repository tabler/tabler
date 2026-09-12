import { defineConfig } from 'vitest/config'

// Standalone project for SCSS unit tests (sass-true).
// Runs in the default Node environment — intentionally separate from the
// browser-mode JS/TS config in vitest.config.mts so the two never overlap.
export default defineConfig({
  test: {
    include: ['scss/tests/**/*.test.mjs'],
    // Specs that compile every Sass entry point in parallel need more than the 5s default on CI.
    testTimeout: 30_000,
  },
})
