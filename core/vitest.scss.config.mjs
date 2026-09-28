import { defineConfig } from 'vitest/config'

// Standalone project for SCSS unit tests (sass-true).
// Runs in the default Node environment — intentionally separate from the
// browser-mode JS/TS config in vitest.config.mts so the two never overlap.
export default defineConfig({
  test: {
    include: ['scss/tests/**/*.test.mjs'],
    // These tests compile whole SCSS entry points with sass, which takes longer
    // than vitest's 5 s default on a CI runner.
    testTimeout: 30_000,
  },
})
