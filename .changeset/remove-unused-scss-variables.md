---
'@tabler/core': major
---

Remove unused SCSS `!default` variables (deprecated Bootstrap leftovers such as `$variable-prefix`, `$alert-*-scale`, accordion icon/button variables, `$popover-arrow-*`, numbered `$font-size-*` / `$line-height-*` scales and others). Configuring any of the removed variables via `@use ... with (...)` now raises a Sass error — they had no effect on the compiled CSS before. The color shade ladders (`$blue-100`…`$cyan-900`) and per-color maps (`$blues`…`$cyans`) are kept as configurable API. Compiled CSS output is unchanged.
