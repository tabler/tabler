---
"@tabler/core": minor
---

Migrated the core build system from Rollup to Vite. Replaced `rollup.config.mjs` with `vite.config.mjs` and updated build scripts to use `vite build` instead of `rollup`. Build outputs remain identical (UMD and ESM formats) with no breaking changes for end users.
