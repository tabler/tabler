---
"@tabler/core": patch
---

Fixed white space on left side when scrollbar is present by replacing `margin-inline-start: calc(100vw - 100%)` with `scrollbar-gutter: stable` on `html` element, with `overflow-y: scroll` fallback for unsupported browsers.
