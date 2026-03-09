/**
 * --------------------------------------------------------------------------
 * Bootstrap dom/manipulator.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

type DataValue = string | number | boolean | null | Record<string, unknown>

function normalizeData(value: string): DataValue {
  if (value === 'true') {
    return true
  }

  if (value === 'false') {
    return false
  }

  if (value === Number(value).toString()) {
    return Number(value)
  }

  if (value === '' || value === 'null') {
    return null
  }

  if (typeof value !== 'string') {
    return value
  }

  try {
    return JSON.parse(decodeURIComponent(value))
  } catch {
    return value
  }
}

function normalizeDataKey(key: string): string {
  return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`)
}

const PREFIXES = ['tblr', 'bs'] as const

const Manipulator = {
  setDataAttribute(element: HTMLElement, key: string, value: string): void {
    element.setAttribute(`data-tblr-${normalizeDataKey(key)}`, value)
  },

  removeDataAttribute(element: HTMLElement, key: string): void {
    for (const prefix of PREFIXES) {
      element.removeAttribute(`data-${prefix}-${normalizeDataKey(key)}`)
    }
  },

  getDataAttributes(element: HTMLElement | null): Record<string, DataValue> {
    if (!element) {
      return {}
    }

    const attributes: Record<string, DataValue> = {}

    for (const prefix of PREFIXES) {
      const keys = Object.keys(element.dataset).filter(key => key.startsWith(prefix) && !key.startsWith(`${prefix}Config`))

      for (const key of keys) {
        let pureKey = key.replace(new RegExp(`^${prefix}`), '')
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1)
        if (!(pureKey in attributes)) {
          attributes[pureKey] = normalizeData(element.dataset[key]!)
        }
      }
    }

    return attributes
  },

  getDataAttribute(element: HTMLElement, key: string): DataValue {
    for (const prefix of PREFIXES) {
      const value = element.getAttribute(`data-${prefix}-${normalizeDataKey(key)}`)
      if (value !== null) {
        return normalizeData(value)
      }
    }

    return null
  }
}

export default Manipulator
