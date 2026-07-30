---
"@tabler/core": patch
---

Fixed invalid Sass `if(sass(cond): a; else: b)` syntax back to the correct `if(cond, a, b)` form across `core/scss`, which was breaking the Sass build.
