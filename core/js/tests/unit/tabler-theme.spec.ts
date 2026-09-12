import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { themeDefaults, type ThemeKey } from '../../src/theme-config'

// tabler-theme does its work at import time, so each case arranges the URL,
// storage and attributes first and then imports a fresh instance of it. The
// browser caches a module per URL, so the query string is what forces a new
// evaluation — vi.resetModules() has no effect on the browser's registry.
let run = 0
async function runThemeScript(): Promise<void> {
  run += 1
  await import(/* @vite-ignore */ `../../tabler-theme.ts?run=${run}`)
}

const attribute = (key: ThemeKey): string | null => document.documentElement.getAttribute(`data-bs-${key}`)

describe('tabler-theme', () => {
  beforeEach(() => {
    localStorage.clear()
    for (const key of Object.keys(themeDefaults)) {
      document.documentElement.removeAttribute(`data-bs-${key}`)
    }
    history.replaceState(null, '', window.location.pathname)
  })

  afterEach(() => {
    localStorage.clear()
    for (const key of Object.keys(themeDefaults)) {
      document.documentElement.removeAttribute(`data-bs-${key}`)
    }
    history.replaceState(null, '', window.location.pathname)
  })

  it('writes no attribute for a default value', async () => {
    await runThemeScript()

    expect(attribute('navbar-position')).toBeNull()
    expect(attribute('layout')).toBeNull()
  })

  it('applies a stored value', async () => {
    localStorage.setItem('tabler-layout', 'boxed')

    await runThemeScript()

    expect(attribute('layout')).toBe('boxed')
  })

  it('applies a URL parameter and stores it', async () => {
    history.replaceState(null, '', '?navbar=sticky')

    await runThemeScript()

    expect(attribute('navbar')).toBe('sticky')
    expect(localStorage.getItem('tabler-navbar')).toBe('sticky')
  })

  it('prefers a URL parameter over a stored value', async () => {
    localStorage.setItem('tabler-layout', 'boxed')
    history.replaceState(null, '', '?layout=fluid')

    await runThemeScript()

    expect(attribute('layout')).toBe('fluid')
    expect(localStorage.getItem('tabler-layout')).toBe('fluid')
  })

  it('prefers a stored value over the attribute the page rendered', async () => {
    document.documentElement.setAttribute('data-bs-navbar-position', 'vertical')
    localStorage.setItem('tabler-navbar-position', 'horizontal')

    await runThemeScript()

    expect(attribute('navbar-position')).toBeNull()
  })

  it('keeps the attribute the page rendered when nothing is stored', async () => {
    document.documentElement.setAttribute('data-bs-navbar-position', 'vertical')

    await runThemeScript()

    expect(attribute('navbar-position')).toBe('vertical')
  })

  it('removes an attribute whose stored value is the default', async () => {
    document.documentElement.setAttribute('data-bs-sidebar', 'folded')
    localStorage.setItem('tabler-sidebar', 'default')

    await runThemeScript()

    expect(attribute('sidebar')).toBeNull()
  })

  it('resolves the auto color mode to a concrete value', async () => {
    localStorage.setItem('tabler-theme', 'auto')

    await runThemeScript()

    expect(['light', 'dark']).toContain(attribute('theme'))
  })
})
