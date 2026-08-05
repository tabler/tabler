// The `--tblr-` custom-property prefix, applied at build time.
//
// Custom properties are authored bare in scss (`--card-bg`) rather than through
// a Sass interpolation on every declaration and every var() call; the public
// prefix is added here, in the css pipeline (see build-css.ts).
//
// Lives in its own module so scss/tests/css-var-prefix.test.mjs asserts against
// the same configuration the build uses.
import type { Root } from 'postcss'

export const cssVarPrefix = 'tblr-'

// Names that must survive unprefixed. Everything here belongs to a third-party
// stylesheet we theme, and those libraries read their variables by their own
// name — prefixing one detaches the theming with no error anywhere, in css or
// at build time. Add an entry whenever a vendor override introduces a new
// foreign name.
export const cssVarIgnore = [
  /^--tblr-/, // already prefixed, e.g. names that cannot round-trip postcss (see $navbar-light-icon-color)
  /^--bs-/, // bootstrap
  /^--fc-/, // fullcalendar
  /^--gl-/, // star-rating.js
  /^--litepicker-/, // litepicker
  /^--plyr-/, // plyr
  /^--ts-/, // tom-select
  '--section-bg', // marketing sections, unprefixed since it was introduced
]

// postcss parks a comment trailing a declaration value in `raws.value.raw` and
// hands plugins the cleaned `value`, so any plugin that writes `decl.value`
// back drops the comment. That silently ate every `/*rtl:ignore*/` marker — the
// ones rtlcss reads to leave a declaration alone in the .rtl build. Folding raw
// into value first costs nothing (it stringifies identically) and leaves the
// comment in the value proper, where postcss-value-parser round-trips it.
export const inlineValueComments = {
  postcssPlugin: 'tabler-inline-value-comments',
  Once(root: Root) {
    root.walkDecls((decl) => {
      if (decl.raws.value) decl.value = decl.raws.value.raw
    })
  },
}
