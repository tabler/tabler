---
"@tabler/core": patch
---

Migrated `rgba()` functions to modern CSS color functions (`color-mix()` and `color-transparent()`) for better browser support and cleaner code. Replaced `rgba(var(--#{$prefix}*-rgb), ...)` with `color-mix(in srgb, var(--#{$prefix}*) ..., transparent)`, static percentage `color-mix()` with `color-transparent()`, and `rgba($variable, ...)` with `color-transparent($variable, ...)`.

