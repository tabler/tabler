import { Toast } from './bootstrap'
import SelectorEngine from './bootstrap/dom/selector-engine'
import { onDOMContentLoaded } from './bootstrap/util/index'

// js-docs-start toast-init
onDOMContentLoaded(() => {
  for (const toastTriggerEl of document.querySelectorAll<HTMLElement>('[data-bs-toggle="toast"], [data-tblr-toggle="toast"]')) {
    try {
      // A trigger whose target is missing is left alone instead of getting a
      // click handler that throws.
      const toastEl = SelectorEngine.getElementFromSelector(toastTriggerEl)
      if (!toastEl) {
        continue
      }

      const toast = Toast.getOrCreateInstance(toastEl) as InstanceType<typeof Toast>
      toastTriggerEl.addEventListener('click', () => {
        toast.show()
      })
    } catch (error) {
      console.error(error)
    }
  }
})
// js-docs-end toast-init
