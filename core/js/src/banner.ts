/**
 * --------------------------------------------------------------------------
 * Tabler banner.ts
 * Licensed under MIT (https://github.com/tabler/tabler/blob/dev/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './bootstrap/base-component'
import EventHandler from './bootstrap/dom/event-handler'
import SelectorEngine from './bootstrap/dom/selector-engine'
import { enableDismissTrigger } from './bootstrap/util/component-functions'

/**
 * Constants
 */

const NAME = 'banner'
const DATA_KEY = `bs.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_CLOSE = `close${EVENT_KEY}`
const EVENT_CLOSED = `closed${EVENT_KEY}`

const ATTRIBUTE_ID = 'data-bs-banner-id'
const SELECTOR_REMEMBERED = `[${ATTRIBUTE_ID}]`

// Shared with tabler-theme.js, which hides the closed banners before the first paint.
const STORAGE_KEY = 'tabler-banner'
const ID_PATTERN = /^[a-z0-9-]{1,32}$/

const readClosed = (): string[] => {
  try {
    return (localStorage.getItem(STORAGE_KEY) ?? '').split(' ').filter(Boolean)
  } catch {
    return []
  }
}

const writeClosed = (ids: string[]): void => {
  try {
    if (ids.length) {
      localStorage.setItem(STORAGE_KEY, ids.join(' '))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // ignore: the banner stays closed on this page only
  }
}

/**
 * Class definition
 */

class Banner extends BaseComponent {
  declare _element: HTMLElement

  // Getters
  static get NAME(): string {
    return NAME
  }

  // Public
  close(): void {
    const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE)

    if (closeEvent?.defaultPrevented) {
      return
    }

    const id = this._element.getAttribute(ATTRIBUTE_ID)
    if (id && ID_PATTERN.test(id)) {
      writeClosed([...new Set([...readClosed(), id])])
    }

    this._element.remove()
    EventHandler.trigger(this._element, EVENT_CLOSED)
    this.dispose()
  }

  // Static
  static isClosed(id: string): boolean {
    return readClosed().includes(id)
  }

  static reset(id?: string): void {
    writeClosed(id ? readClosed().filter((closedId) => closedId !== id) : [])
  }
}

/**
 * Data API implementation
 */

enableDismissTrigger(Banner, 'close')

// js-docs-start banner-init
const closedBanners = readClosed()
for (const element of SelectorEngine.find(SELECTOR_REMEMBERED)) {
  if (closedBanners.includes(element.getAttribute(ATTRIBUTE_ID) ?? '')) {
    element.remove()
  }
}
// js-docs-end banner-init

export default Banner
