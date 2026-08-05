import { Toast } from './bootstrap'

/*
Toasts
 */
// js-docs-start toast-init
const toastsTriggerList: HTMLElement[] = [].slice.call(document.querySelectorAll<HTMLElement>('[data-bs-toggle="toast"]'))
toastsTriggerList.map(function (toastTriggerEl: HTMLElement) {
  const target = toastTriggerEl.getAttribute('data-bs-target')
  if (target === null) {
    return
  }

  const toastEl = new Toast(target)

  toastTriggerEl.addEventListener('click', () => {
    toastEl.show()
  })
})
// js-docs-end toast-init
