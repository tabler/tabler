/**
 * demo-theme is specifically loaded right after the body and not deferred
 * to ensure we switch to the chosen dark/light theme as fast as possible.
 * This will prevent any flashes of the light theme (default) before switching.
 */
import { themeDefaults, type ThemeKey } from './src/theme-config'

const params = new URLSearchParams(window.location.search)

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

// A setting value is a short token: it ends up as a `data-bs-*` attribute on
// <html> and in localStorage, so anything else from the URL is ignored.
const VALUE_PATTERN = /^[a-z0-9-]{1,32}$/

// Accessing localStorage throws when site data is blocked (Chrome "block all
// cookies", Safari with storage disabled, partitioned third-party frames), so
// every access is guarded and the switcher falls back to the page defaults.
const storage = {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  },
  set(key: string, value: string): void {
    try {
      localStorage.setItem(key, value)
    } catch {
      // ignore: the choice applies to this page only
    }
  },
}

for (const key in themeDefaults) {
  const param = params.get(key)
  let selectedValue: string

  if (param && VALUE_PATTERN.test(param)) {
    storage.set('tabler-' + key, param)
    selectedValue = param
  } else {
    // A stored choice wins; otherwise a server-rendered attribute is the starting value.
    const storedTheme = storage.get('tabler-' + key)
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
  if ((storage.get('tabler-theme') ?? 'auto') === 'auto') {
    if (event.matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-bs-theme')
    }
  }
})
