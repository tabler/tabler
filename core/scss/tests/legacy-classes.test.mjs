// Guards the 1.x compatibility layer in .build/postcss-legacy-classes.ts.
//
// 2.0 renames every responsive, print and state class (`.d-md-none` →
// `.md\\:d-none`), and this plugin is the only thing keeping markup written for
// 1.x alive. A gap here is invisible: the rule still compiles, the new class
// still works, and the old class silently does nothing in someone else's
// template.
//
// The renamed segment does not sit in one place across the three kinds, so the
// map is asserted per shape, and as a whole so a name cannot quietly drop out
// of the compatibility surface.
import { describe, expect, it } from 'vitest'
import postcss from 'postcss'
import legacyClasses, { readClassMap } from '../../../.build/postcss-legacy-classes.ts'

const map = readClassMap()
const run = (css, classes) => postcss([legacyClasses(classes ? { classes } : {})]).process(css, { from: undefined }).css

describe('the frozen 1.x class map', () => {
  it('covers the full renamed surface', () => {
    expect(map.size).toBe(2505)
  })

  it('pairs every 2.0 name with a distinct 1.x name', () => {
    expect(new Set(map.values()).size).toBe(map.size)
  })

  it('carries all three kinds of rename', () => {
    expect(map.get('md:col-6')).toBe('col-md-6')
    expect(map.get('md:list-group-horizontal')).toBe('list-group-horizontal-md')
    expect(map.get('md:modal-fullscreen-down')).toBe('modal-fullscreen-md-down')
    expect(map.get('print:d-none')).toBe('d-print-none')
    expect(map.get('hover:link-opacity-50')).toBe('link-opacity-50-hover')
  })

  // Nothing in a name separates a breakpoint from a size, so only the written
  // map keeps `.btn-sm` from turning into a bogus `.sm\\:btn`. Pinned here so
  // nobody replaces the map with a parser.
  it('leaves size modifiers alone', () => {
    for (const name of ['btn-sm', 'card-md', 'modal-lg', 'icon-sm', 'table-sm']) expect([...map.values()]).not.toContain(name)
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

  it('aliases a print class', () => {
    expect(run('.print\\:d-none { display: none }')).toBe('.print\\:d-none, .d-print-none { display: none }')
  })

  it('keeps the pseudo-class on a state variant', () => {
    expect(run('.hover\\:link-opacity-50:hover { --link-opacity: 0.5 }')).toBe('.hover\\:link-opacity-50:hover, .link-opacity-50-hover:hover { --link-opacity: 0.5 }')
  })

  it('leaves a rule with no renamed class alone', () => {
    expect(run('.btn { padding: 1rem }')).toBe('.btn { padding: 1rem }')
    expect(run('.btn-sm { padding: 0 }')).toBe('.btn-sm { padding: 0 }')
  })

  it('ignores a prefixed class that is not on the map', () => {
    expect(run('.md\\:invented-utility { color: red }')).toBe('.md\\:invented-utility { color: red }')
  })

  it('aliases each selector of a list on its own', () => {
    expect(run('.md\\:g-3, .md\\:gx-3 { --gutter-x: 1rem }')).toBe('.md\\:g-3, .md\\:gx-3, .g-md-3, .gx-md-3 { --gutter-x: 1rem }')
  })

  it('rewrites a renamed class nested in a compound selector', () => {
    expect(run('.md\\:row-cols-auto > * { flex: 0 0 auto }')).toBe('.md\\:row-cols-auto > *, .row-cols-md-auto > * { flex: 0 0 auto }')
  })

  it('does not add the alias twice when run again', () => {
    const once = run('.md\\:d-none { display: none }')
    expect(run(once)).toBe(once)
  })

  it('escapes a breakpoint name that starts with a digit', () => {
    expect(run('.\\32 xl\\:d-none { display: none }', new Map([['2xl:d-none', 'd-2xl-none']]))).toBe('.\\32 xl\\:d-none, .d-2xl-none { display: none }')
  })
})
