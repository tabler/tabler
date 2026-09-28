---
"@tabler/core": patch
---

Fixed `Confetti` firing `end` after `dispose()`, stalling without a 2D context and sizing its canvas with the scrollbar width.
