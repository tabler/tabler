import { Toast } from './bootstrap'

/*
Toasts
 */
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
