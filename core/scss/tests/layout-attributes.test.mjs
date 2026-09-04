// Guards the runtime layout switches: the theme script writes data-bs-* on
// <html>, and these selectors are the only thing that turns those attributes
// into a layout. They are easy to break silently — a renamed class in the
// markup, a lost :has() guard, or a rule that stops beating the folded
// --sidebar-width declaration — and nothing else in the suite would notice.
import { describe, expect, it } from 'vitest'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { compile as compileSass } from 'sass'

const scssDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const { css } = compileSass(path.join(scssDir, 'tabler.scss'), { loadPaths: ['node_modules'], style: 'expanded' })

/** Collapses whitespace so a selector can be matched regardless of line breaks. */
// Custom properties are bare here: the `--tblr-` prefix is a build-time postcss
// pass (see css-var-prefix.test.mjs), not part of the Sass output.
const flat = css.replace(/\s+/g, ' ')

describe('container width', () => {
  it('keeps the class and the attribute route on the same rule', () => {
    expect(flat).toContain('.layout-fluid .container, .layout-fluid [class^=container-]')
    expect(flat).toContain('html[data-bs-layout=fluid] .container')
    expect(flat).toContain('.layout-boxed, html[data-bs-layout=boxed] body {')
  })

  it('contains the boxed frame so a fixed sidebar stays inside it', () => {
    expect(flat).toContain('html[data-bs-layout=boxed] body .page { contain: layout;')
  })
})

describe('sticky navbar', () => {
  it('sticks only the horizontal navbar', () => {
    expect(flat).toContain('html[data-bs-navbar=sticky] .page > .navbar:not(.navbar-vertical) { position: sticky; top: 0; z-index: 1020; }')
  })
})

describe('navbar position', () => {
  it('hides the sidebar when the attribute is absent, which is the horizontal default', () => {
    expect(flat).toContain('html:not([data-bs-navbar-position=vertical]) .page:has(> [class*=navbar-expand]:not(.navbar-vertical)) > .navbar-vertical { display: none; }')
  })

  it('drops the sidebar offset from the page with no sidebar on it', () => {
    expect(flat).toMatch(/html:not\(\[data-bs-navbar-position=vertical\]\) \.page:has\(> \[class\*=navbar-expand\]:not\(\.navbar-vertical\)\) > \.navbar,[^{]*> \.page-wrapper \{ --sidebar-width: 0; \}/)
  })

  it('hides the horizontal navbar in the vertical position', () => {
    expect(flat).toContain('html[data-bs-navbar-position=vertical] .page:has(> .navbar-vertical) > [class*=navbar-expand]:not(.navbar-vertical) { display: none; }')
  })

  it('comes after the folded sidebar rule, so the two agree on --sidebar-width', () => {
    expect(flat.indexOf('html[data-bs-sidebar^=folded]')).toBeLessThan(flat.indexOf('html:not([data-bs-navbar-position=vertical])'))
  })
})

describe('navbar theme', () => {
  it('gives whichever navigation shows the dark color mode', () => {
    expect(flat).toMatch(/html\[data-bs-navbar-theme=dark\] \.page > \.navbar[^{]*\{[^}]*color-scheme: dark/)
  })

  it('gives the navigation the dark navbar variables', () => {
    // Sass merges the extend into `.navbar[data-bs-theme=dark]`; the sidebar
    // is `.navbar.navbar-vertical`, so one selector serves both navigations.
    expect(flat).toMatch(/html\[data-bs-navbar-theme=dark\] \.page > \.navbar[^{]*\{[^}]*--navbar-color/)
  })

  it('paints the primary variant on the primary color with the dark palette', () => {
    expect(flat).toContain('html[data-bs-navbar-theme=primary] .page > .navbar { --navbar-bg: var(--primary); --navbar-border-color: transparent; }')
    expect(flat).toMatch(/html\[data-bs-navbar-theme=primary\] \.page > \.navbar[^{]*\{[^}]*color-scheme: dark/)
  })
})
