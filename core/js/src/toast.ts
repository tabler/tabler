import { Toast } from './bootstrap'
import { getElement } from './bootstrap/util/index'

// js-docs-start toast-init
const toastsTriggerList: HTMLElement[] = [].slice.call(document.querySelectorAll<HTMLElement>('[data-bs-toggle="toast"]'))
toastsTriggerList.map(function (toastTriggerEl: HTMLElement) {
  const target = toastTriggerEl.getAttribute('data-bs-target')
  if (target === null) {
    return
  }

  const el = getElement(target)
  if (!el) {
    return
  }

  const toastEl = Toast.getOrCreateInstance(el) as Toast

  toastTriggerEl.addEventListener('click', () => {
    toastEl.show()
  })
})
// js-docs-end toast-init
