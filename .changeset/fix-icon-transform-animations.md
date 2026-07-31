---
"@tabler/core": patch
---

Fixed transform animations (`.icon-pulse`, `.icon-tada`, `.icon-rotate`) not working on webfont icons by adding `display: inline-block` and `transform-origin: center` to `.icon`.
