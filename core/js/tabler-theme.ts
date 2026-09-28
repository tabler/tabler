/**
 * demo-theme is specifically loaded right after the body and not deferred
 * to ensure we switch to the chosen dark/light theme as fast as possible.
 * This will prevent any flashes of the light theme (default) before switching.
 */
import { themeDefaults, type ThemeKey } from './src/theme-config'

const params = new URLSearchParams(window.location.search)

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

for (const key in themeDefaults) {
  const param = params.get(key)
  let selectedValue: string

  if (!!param) {
    localStorage.setItem('tabler-' + key, param)
    selectedValue = param
  } else {
    // A stored choice wins; otherwise a server-rendered attribute is the starting value.
    const storedTheme = localStorage.getItem('tabler-' + key)
    const serverValue = document.documentElement.getAttribute('data-bs-' + key)
    selectedValue = storedTheme ?? serverValue ?? themeDefaults[key as ThemeKey]
  }

  if (key === 'theme' && selectedValue === 'auto') {
    selectedValue = prefersDark.matches ? 'dark' : 'light'
  }

  if (selectedValue !== themeDefaults[key as ThemeKey]) {
    document.documentElement.setAttribute('data-bs-' + key, selectedValue)
  } else {
    document.documentElement.removeAttribute('data-bs-' + key)
  }
}

prefersDark.addEventListener('change', (event) => {
  // No stored choice means the default, which is auto.
  if ((localStorage.getItem('tabler-theme') ?? 'auto') === 'auto') {
    if (event.matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-bs-theme')
    }
  }
})
