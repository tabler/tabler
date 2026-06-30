---
"@tabler/core": patch
---

Derived form control and checkbox/radio borders from the text color token so the
control boundary reaches the 3:1 non-text contrast required by WCAG 1.4.11. The
previous `gray-200` border sat at ~1.2:1 on light surfaces.
