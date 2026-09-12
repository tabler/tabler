// Guards the 1.x compatibility layer in .build/postcss-legacy-responsive.ts.
//
// 2.0 renames every responsive class (`.d-md-none` → `.md\:d-none`), and this
// plugin is the only thing keeping markup written for 1.x alive. A gap here is
// invisible: the rule still compiles, the new class still works, and the old
// class silently does nothing in someone else's template.
//
// The breakpoint segment does not sit in one place across families, so the
// mapping is asserted per shape, and the frozen list is checked as a whole so a
// name cannot quietly drop out of the compatibility surface.
import { describe, expect, it } from 'vitest'
import postcss from 'postcss'
import legacyResponsive, { legacyAliases, prefixedNameOf, readLegacyClasses } from '../../../.build/postcss-legacy-responsive.ts'

const run = (css, classes) => postcss([legacyResponsive(classes ? { classes } : {})]).process(css, { from: undefined }).css

describe('prefixedNameOf', () => {
  it('drops the breakpoint segment wherever it sits', () => {
    expect(prefixedNameOf('col-md-6')).toBe('md:col-6')
    expect(prefixedNameOf('d-md-none')).toBe('md:d-none')
    expect(prefixedNameOf('row-cols-lg-3')).toBe('lg:row-cols-3')
    expect(prefixedNameOf('list-group-horizontal-md')).toBe('md:list-group-horizontal')
    expect(prefixedNameOf('modal-fullscreen-md-down')).toBe('md:modal-fullscreen-down')
    expect(prefixedNameOf('sticky-xxl-top')).toBe('xxl:sticky-top')
  })

  it('returns null when there is no breakpoint segment at all', () => {
    expect(prefixedNameOf('card')).toBeNull()
    expect(prefixedNameOf('table-responsive')).toBeNull()
  })

  // Parsing cannot separate a breakpoint from a size, so the frozen list is the
  // only thing standing between `.btn-sm` and a bogus `.sm\:btn` alias. Pinned
  // here so nobody drops the list and keeps the parser.
  it('cannot tell a size modifier from a breakpoint on its own', () => {
    expect(prefixedNameOf('btn-sm')).toBe('sm:btn')
    expect(readLegacyClasses()).not.toContain('btn-sm')
  })
})

describe('the frozen 1.x class list', () => {
  const classes = readLegacyClasses()

  it('covers the full released surface', () => {
    expect(classes).toHaveLength(2480)
  })

  it('maps every name onto a distinct prefixed class', () => {
    const aliases = legacyAliases(classes)
    expect(aliases.size).toBe(classes.length)
  })

  it('holds nothing that is only a size modifier', () => {
    expect(classes.filter((name) => prefixedNameOf(name) === null)).toEqual([])
  })
})

describe('aliasing', () => {
  it('adds the 1.x name to the rule instead of duplicating it', () => {
    expect(run('.md\\:d-none { display: none }')).toBe('.md\\:d-none, .d-md-none { display: none }')
  })

  it('keeps the alias inside the media query the rule came from', () => {
    const css = run('@media (min-width: 768px) { .md\\:col-6 { width: 50% } }')
    expect(css).toContain('.md\\:col-6, .col-md-6')
    expect(css).toContain('@media (min-width: 768px)')
  })

  it('leaves a rule with no responsive class alone', () => {
    expect(run('.btn { padding: 1rem }')).toBe('.btn { padding: 1rem }')
    expect(run('.btn-sm { padding: 0 }')).toBe('.btn-sm { padding: 0 }')
  })

  it('ignores a prefixed class that is not on the list', () => {
    expect(run('.md\\:invented-utility { color: red }')).toBe('.md\\:invented-utility { color: red }')
  })

  it('aliases each selector of a list on its own', () => {
    expect(run('.md\\:g-3, .md\\:gx-3 { --gutter-x: 1rem }')).toBe('.md\\:g-3, .md\\:gx-3, .g-md-3, .gx-md-3 { --gutter-x: 1rem }')
  })

  it('rewrites a prefixed class nested in a compound selector', () => {
    expect(run('.md\\:row-cols-auto > * { flex: 0 0 auto }')).toBe('.md\\:row-cols-auto > *, .row-cols-md-auto > * { flex: 0 0 auto }')
  })

  it('does not add the alias twice when run again', () => {
    const once = run('.md\\:d-none { display: none }')
    expect(run(once)).toBe(once)
  })

  it('escapes a breakpoint name that starts with a digit', () => {
    expect(run('.\\32 xl\\:d-none { display: none }', ['d-2xl-none'])).toBe('.\\32 xl\\:d-none, .d-2xl-none { display: none }')
  })
})
