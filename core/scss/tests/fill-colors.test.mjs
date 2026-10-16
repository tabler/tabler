// Guards the fill tokens. The color fills are opaque mixes tuned to match the
// design file, so a lost light-dark() pair or a changed amount shifts every
// alert, status and `.bg-*-fill` utility without any other test noticing.
import { describe, expect, it } from 'vitest'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { compile as compileSass } from 'sass'

const scssDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const { css } = compileSass(path.join(scssDir, 'tabler.scss'), { loadPaths: ['node_modules'], style: 'expanded' })

// Custom properties are bare here: the `--tblr-` prefix is a build-time postcss pass.
const flat = css.replace(/\s+/g, ' ')

describe('neutral fills', () => {
  it('declares the four levels and the --fill alias', () => {
    expect(flat).toContain('--fill-primary: color-mix(in oklab, var(--body-color) 16%, transparent);')
    expect(flat).toContain('--fill-secondary: color-mix(in oklab, var(--body-color) 8%, transparent);')
    expect(flat).toContain('--fill-tertiary: light-dark(color-mix(in oklab, var(--body-color) 4%, transparent), color-mix(in oklab, var(--body-color) 6%, transparent));')
    expect(flat).toContain('--fill-quaternary: color-mix(in oklab, var(--body-color) 2%, transparent);')
    expect(flat).toContain('--fill: var(--fill-primary);')
  })

  it('points the hover background at the tertiary fill', () => {
    expect(flat).toContain('--hover-bg: var(--fill-tertiary);')
  })

  it('ships .bg-fill as an alias of .bg-fill-primary', () => {
    expect(flat).toContain('.bg-fill { background-color: var(--fill) !important; }')
    expect(flat).toContain('.bg-fill-quaternary { background-color: var(--fill-quaternary) !important; }')
  })
})

describe('color fills', () => {
  it('mixes each theme color with white in light mode and #111 in dark mode', () => {
    expect(flat).toContain('--blue-fill: light-dark(color-mix(in oklab, var(--blue) 8%, #fff), color-mix(in oklab, var(--blue) 12%, #111));')
    expect(flat).toContain('--blue-fill-hover: light-dark(color-mix(in oklab, var(--blue) 15%, #fff), color-mix(in oklab, var(--blue) 20%, #111));')
    expect(flat).toContain('--blue-fill-active: light-dark(color-mix(in oklab, var(--blue) 24%, #fff), color-mix(in oklab, var(--blue) 27%, #111));')
    expect(flat).toContain('--danger-fill: light-dark(')
  })

  it('does not generate fills for the social colors', () => {
    expect(flat).not.toContain('--facebook-fill')
  })

  it('ships the .bg-{color}-fill utilities', () => {
    expect(flat).toContain('.bg-blue-fill-hover { background-color: var(--blue-fill-hover) !important; }')
  })

  it('uses the color fill for alerts and statuses', () => {
    expect(flat).toContain('.alert-danger { --alert-variant-color: var(--danger); --alert-bg: var(--danger-fill); }')
    expect(flat).toContain('.status-green { --status-color: var(--green); --status-bg: var(--green-fill); }')
  })
})
