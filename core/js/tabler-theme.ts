/**
 * demo-theme is specifically loaded right after the body and not deferred
 * to ensure we switch to the chosen dark/light theme as fast as possible.
 * This will prevent any flashes of the light theme (default) before switching.
 */
interface ThemeConfig {
  'theme': string
  'theme-base': string
  'theme-font': string
  'theme-primary': string
  'theme-radius': string
  'sidebar': string
}

const themeConfig: ThemeConfig = {
  'theme': 'auto',
  'theme-base': 'gray',
  'theme-font': 'sans-serif',
  'theme-primary': 'blue',
  'theme-radius': '1',
  'sidebar': 'default',
}

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams: URLSearchParams, prop: string): string | null => searchParams.get(prop),
})

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

for (const key in themeConfig) {
  const param = params[key]
  let selectedValue: string

  if (!!param) {
    localStorage.setItem('tabler-' + key, param)
    selectedValue = param
  } else {
    // A stored choice wins; otherwise a server-rendered attribute is the starting value.
    const storedTheme = localStorage.getItem('tabler-' + key)
    const serverValue = document.documentElement.getAttribute('data-bs-' + key)
    selectedValue = storedTheme ?? serverValue ?? themeConfig[key as keyof ThemeConfig]
  }

  if (key === 'theme' && selectedValue === 'auto') {
    selectedValue = prefersDark.matches ? 'dark' : 'light'
  }

  if (selectedValue !== themeConfig[key as keyof ThemeConfig]) {
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
