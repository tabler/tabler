import { Toast } from './bootstrap'
import SelectorEngine from './bootstrap/dom/selector-engine'
import { isDisabled } from './bootstrap/util/index'

const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="toast"], [data-tblr-toggle="toast"]'

// js-docs-start toast-init
document.addEventListener('click', (event: MouseEvent) => {
  const trigger = event.target instanceof Element ? event.target.closest<HTMLElement>(SELECTOR_DATA_TOGGLE) : null
  if (!trigger) {
    return
  }

  if (['A', 'AREA'].includes(trigger.tagName)) {
    event.preventDefault()
  }

  if (isDisabled(trigger)) {
    return
  }

  const toastEl = SelectorEngine.getElementFromSelector(trigger)
  if (toastEl) {
    ;(Toast.getOrCreateInstance(toastEl) as InstanceType<typeof Toast>).show()
  }
})
// js-docs-end toast-init
