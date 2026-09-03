/**
 * Every setting the theme switcher understands, with its default value. Each
 * key becomes a `data-bs-<key>` attribute on `<html>`, a `tabler-<key>`
 * localStorage entry and a `?<key>=` URL parameter, written only when the value
 * differs from the default. Adding a key here is all the JavaScript a new
 * setting needs; the switcher loops over this object.
 */
export const themeDefaults = {
  'theme': 'auto',
  'theme-base': 'gray',
  'theme-font': 'sans-serif',
  'theme-primary': 'blue',
  'theme-radius': '1',
  'layout': 'default',
  'navbar': 'default',
  'navbar-position': 'horizontal',
  'navbar-theme': 'default',
  'sidebar': 'default',
  'sidebar-theme': 'default',
} as const

export type ThemeKey = keyof typeof themeDefaults
