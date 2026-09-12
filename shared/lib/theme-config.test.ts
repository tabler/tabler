import { describe, it, expect } from 'vitest'
import { themeDefaults, themeSections, themeSettings, themePresets, sidebarOnlyKeys, navbarOnlyKeys, themeDataAttributes, type ThemeKey, type ThemePreset } from './theme-config'

describe('themeSettings', () => {
  it('covers every key the switcher knows, exactly once', () => {
    const keys = themeSettings.flatMap((setting) => (setting.control === 'preset' ? Object.keys((setting.options[0] as ThemePreset).values) : [setting.key]))

    expect([...keys].sort()).toEqual(Object.keys(themeDefaults).sort())
    expect(new Set(keys).size).toBe(keys.length)
  })

  it('offers the default value as one of the options', () => {
    for (const setting of themeSettings.filter((s) => s.control !== 'preset')) {
      const values = setting.options.map((option) => option.value)

      expect(values, setting.key).toContain(themeDefaults[setting.key as ThemeKey])
    }
  })

  it('has one preset that is exactly the defaults', () => {
    for (const [name, presets] of Object.entries(themePresets)) {
      const matching = Object.values(presets).filter((values) => Object.entries(values).every(([key, value]) => themeDefaults[key as ThemeKey] === value))

      expect(matching, name).toHaveLength(1)
    }
  })

  it('sets the same keys in every preset of a group', () => {
    for (const presets of Object.values(themePresets)) {
      const shapes = new Set(Object.values(presets).map((values) => Object.keys(values).sort().join(',')))

      expect(shapes.size).toBe(1)
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

  it('marks the settings that depend on the navigation position', () => {
    expect(sidebarOnlyKeys).toEqual(['sidebar'])
    expect(navbarOnlyKeys).toEqual(['navbar'])
  })

  it('offers the color scheme as presets over theme and navbar-theme', () => {
    expect(Object.keys(themePresets)).toEqual(['scheme'])
    expect(Object.keys(themePresets.scheme!)).toEqual(['auto', 'light', 'dark', 'dark-nav', 'colored'])
    expect(themePresets.scheme!.colored).toEqual({ 'theme': 'light', 'navbar-theme': 'primary' })
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
    const values: Partial<Record<ThemeKey, string>> = { 'layout': 'fluid', 'navbar': 'sticky', 'navbar-theme': 'primary' }

    expect(themeDataAttributes(values)).toEqual({
      'data-bs-layout': 'fluid',
      'data-bs-navbar': 'sticky',
      'data-bs-navbar-theme': 'primary',
    })
  })
})
