interface SettingItem {
  localStorage: string
  default: string
}

interface SettingsItems {
  [key: string]: SettingItem
}

const items: SettingsItems = {
  'menu-position': { localStorage: 'tablerMenuPosition', default: 'top' },
  'menu-behavior': { localStorage: 'tablerMenuBehavior', default: 'sticky' },
  'container-layout': {
    localStorage: 'tablerContainerLayout',
    default: 'boxed',
  },
}

const config: Record<string, string> = {}
for (const [key, params] of Object.entries(items)) {
  const lsParams = localStorage.getItem(params.localStorage)
  config[key] = lsParams ? lsParams : params.default
}

const parseUrl = (): void => {
  const search = window.location.search.substring(1)
  const params = search.split('&')

  for (const param of params) {
    const [key, value] = param.split('=')
    const item = key !== undefined ? items[key] : undefined

    if (item && key !== undefined && value !== undefined) {
      localStorage.setItem(item.localStorage, value)
      config[key] = value
    }
  }
}

const toggleFormControls = (form: HTMLFormElement): void => {
  for (const [key] of Object.entries(items)) {
    const elem = form.querySelector(`[name="settings-${key}"][value="${config[key]}"]`) as HTMLInputElement | null

    if (elem) {
      elem.checked = true
    }
  }
}

const submitForm = (form: HTMLFormElement): void => {
  for (const [key, params] of Object.entries(items)) {
    const checkedInput = form.querySelector(`[name="settings-${key}"]:checked`) as HTMLInputElement
    if (checkedInput) {
      const value = checkedInput.value
      localStorage.setItem(params.localStorage, value)
      config[key] = value
    }
  }

  window.dispatchEvent(new Event('resize'))

  const bootstrap = (window as Window & { bootstrap?: { Offcanvas: new (form: HTMLFormElement) => { hide(): void } } }).bootstrap
  if (bootstrap) {
    new bootstrap.Offcanvas(form).hide()
  }
}

parseUrl()

const form = document.querySelector('#offcanvas-settings') as HTMLFormElement | null

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault()
    submitForm(form)
  })

  toggleFormControls(form)
}
