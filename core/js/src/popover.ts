import { Popover } from './bootstrap'
import { onDOMContentLoaded } from './bootstrap/util/index'

// js-docs-start popover-init
onDOMContentLoaded(() => {
  const popoverTriggerList: HTMLElement[] = [].slice.call(document.querySelectorAll<HTMLElement>('[data-bs-toggle="popover"]'))
  popoverTriggerList.map(function (popoverTriggerEl: HTMLElement) {
    const options = {
      delay: { show: 50, hide: 50 },
      html: popoverTriggerEl.getAttribute('data-bs-html') === 'true',
      placement: popoverTriggerEl.getAttribute('data-bs-placement') ?? 'auto',
    }
    return new Popover(popoverTriggerEl, options)
  })
})
// js-docs-end popover-init
