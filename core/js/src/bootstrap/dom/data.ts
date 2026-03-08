/**
 * --------------------------------------------------------------------------
 * Bootstrap dom/data.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

const elementMap = new Map<HTMLElement, Map<string, any>>()

const Data = {
  set(element: HTMLElement, key: string, instance: any): void {
    if (!elementMap.has(element)) {
      elementMap.set(element, new Map())
    }

    const instanceMap = elementMap.get(element)!

    if (!instanceMap.has(key) && instanceMap.size !== 0) {
      // eslint-disable-next-line no-console
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`)
      return
    }

    instanceMap.set(key, instance)
  },

  get(element: HTMLElement, key: string): any {
    if (elementMap.has(element)) {
      return elementMap.get(element)!.get(key) || null
    }

    return null
  },

  remove(element: HTMLElement, key: string): void {
    if (!elementMap.has(element)) {
      return
    }

    const instanceMap = elementMap.get(element)!

    instanceMap.delete(key)

    if (instanceMap.size === 0) {
      elementMap.delete(element)
    }
  }
}

export default Data
