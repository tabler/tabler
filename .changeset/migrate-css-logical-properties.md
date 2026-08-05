---
"@tabler/core": patch
---

Migrated all physical CSS direction properties to logical properties (`padding-inline`, `margin-inline`, `inset-inline`, `float: inline-start`/`inline-end`, `text-align: start/end`) for improved RTL support and reduced RTL stylesheet generation overhead.

Directional transforms, which have no logical equivalent, now use a `--tblr-dir` direction multiplier (`1` in LTR, `-1` under `[dir="rtl"]`), e.g. `translateX(calc(var(--tblr-dir) * 4px))`. These declarations are identical in `tabler.css` and `tabler.rtl.css` — the flip happens at runtime via the `dir` attribute, so RTL transforms now also work when using plain `tabler.css` with `dir="rtl"`.
