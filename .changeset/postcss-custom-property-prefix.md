---
"@tabler/core": minor
---

Removed the `$prefix` Sass variable and its `--#{$prefix}` interpolations; the `--tblr-` custom property prefix is now applied at build time by `postcss-prefix-custom-properties`. Compiled CSS is unchanged, but the prefix can no longer be customised by overriding `$prefix` before importing the Sass sources.
