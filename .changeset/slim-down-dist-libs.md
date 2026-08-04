---
"@tabler/core": patch
---

Fixed oversized `dist/libs` by copying only the runtime files each library declares in `libs.json`, plus the assets HugeRTE loads at runtime and every upstream license file.
