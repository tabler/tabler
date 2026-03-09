/**
 * --------------------------------------------------------------------------
 * Bootstrap util/component-functions.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import EventHandler from '../dom/event-handler.js'
import SelectorEngine from '../dom/selector-engine.js'
import { isDisabled } from './index'

interface DismissibleComponent {
  EVENT_KEY: string
  NAME: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getOrCreateInstance(element: HTMLElement | string | null): any
}

const enableDismissTrigger = (component: DismissibleComponent, method = 'hide'): void => {
  const clickEvent = `click.dismiss${component.EVENT_KEY}`
  const name = component.NAME

  EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"], [data-tblr-dismiss="${name}"]`, function (this: HTMLElement, event: Event) {
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault()
    }

    if (isDisabled(this)) {
      return
    }

    const target = SelectorEngine.getElementFromSelector(this) || this.closest(`.${name}`)
    const instance = component.getOrCreateInstance(target)

    instance[method]()
  })
}

export {
  enableDismissTrigger
}
