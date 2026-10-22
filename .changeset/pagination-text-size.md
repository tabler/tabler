---
"@tabler/core": patch
---

Fixed `.page-text` in pagination, which used the body font size instead of the pagination one when used without `.page-link` (a "Page 1 of 9" label or an ellipsis). It now follows `--tblr-pagination-font-size`, including `pagination-sm` and `pagination-lg`, and lines up with the page links.
