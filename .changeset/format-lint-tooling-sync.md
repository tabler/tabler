---
"@tabler/core": patch
"@tabler/docs": patch
"@tabler/preview": patch
---

Unified local and CI quality gates: added root-level `lint-prettier`/`format-prettier` scripts covering `core`, `preview`, and `shared`, wired `check` to run lint and type-check together, and updated the lint workflow to run both. Reformatted the covered files with Prettier.
