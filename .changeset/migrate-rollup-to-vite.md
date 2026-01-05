---
"@tabler/core": minor
"@tabler/preview": minor
"@tabler/docs": minor
---

Migrated build system from Rollup to Vite across all packages. Replaced `rollup.config.mjs` with `vite.config.mjs` and updated build scripts to use `vite build` instead of `rollup`. Build outputs remain identical (UMD and ESM formats) with no breaking changes for end users.

