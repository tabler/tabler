import { describe, it, expect } from 'vitest'
import { themeDefaults, themeSections, themeSettings, sidebarOnlyKeys, themeDataAttributes, type ThemeKey } from './theme-config'

describe('themeSettings', () => {
  it('covers every key the switcher knows, exactly once', () => {
    const keys = themeSettings.map((setting) => setting.key)

    expect([...keys].sort()).toEqual(Object.keys(themeDefaults).sort())
    expect(new Set(keys).size).toBe(keys.length)
  })

  it('offers the default value as one of the options', () => {
    for (const setting of themeSettings) {
      const values = setting.options.map((option) => option.value)

      expect(values, setting.key).toContain(themeDefaults[setting.key])
    }
  })

  it('labels every option', () => {
    for (const setting of themeSettings) {
      for (const option of setting.options) {
        expect(option.label.length, `${setting.key}=${option.value}`).toBeGreaterThan(0)
      }
    }
  })

  it('groups the settings into Appearance and Layout', () => {
    expect(themeSections.map((section) => section.title)).toEqual(['Appearance', 'Layout'])
  })

  it('marks the sidebar-dependent settings', () => {
    expect(sidebarOnlyKeys).toEqual(['sidebar', 'sidebar-theme'])
  })
})

describe('themeDataAttributes', () => {
  it('prefixes the keys', () => {
    expect(themeDataAttributes({ 'navbar-position': 'vertical' })).toEqual({ 'data-bs-navbar-position': 'vertical' })
  })

  it('omits values equal to the default', () => {
    expect(themeDataAttributes({ 'navbar-position': 'horizontal', 'layout': 'boxed' })).toEqual({ 'data-bs-layout': 'boxed' })
  })

  it('omits undefined values', () => {
    expect(themeDataAttributes({ layout: undefined })).toEqual({})
  })

  it('returns nothing for an empty set', () => {
    expect(themeDataAttributes({})).toEqual({})
  })

  it('keeps several settings at once', () => {
    const values: Partial<Record<ThemeKey, string>> = { 'layout': 'fluid', 'navbar': 'sticky', 'sidebar-theme': 'dark' }

    expect(themeDataAttributes(values)).toEqual({
      'data-bs-layout': 'fluid',
      'data-bs-navbar': 'sticky',
      'data-bs-sidebar-theme': 'dark',
    })
  })
})
