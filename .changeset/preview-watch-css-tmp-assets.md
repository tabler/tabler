---
"@tabler/preview": patch
---

Fixed a dev-server `ENOENT` race: preview's `watch:css` now writes to `tmp-assets/css` and `copy-assets` syncs it into `public/`.
