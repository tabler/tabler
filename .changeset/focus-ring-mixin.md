---
'@tabler/core': minor
---

Changed the focus indicator from a `box-shadow` ring to an `outline`, following Bootstrap v6. `focus-ring($offset, $color)` is the single focus mixin, driven by the new `--focus-ring`, `--focus-ring-offset` and `--focus-ring-color` tokens. Removed the `$*-focus-box-shadow` Sass variables and the
`--btn-focus-box-shadow`, `--pagination-focus-box-shadow`, `--accordion-btn-focus-box-shadow` and `--btn-close-focus-shadow` custom properties.
