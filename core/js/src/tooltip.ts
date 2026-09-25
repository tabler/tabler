import { Tooltip } from './bootstrap'
import { onDOMContentLoaded } from './bootstrap/util/index'

// js-docs-start tooltip-init
onDOMContentLoaded(() => {
  const tooltipTriggerList: HTMLElement[] = [].slice.call(document.querySelectorAll<HTMLElement>('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.map(function (tooltipTriggerEl: HTMLElement) {
    const options = {
      delay: { show: 50, hide: 50 },
      html: tooltipTriggerEl.getAttribute('data-bs-html') === 'true',
      placement: tooltipTriggerEl.getAttribute('data-bs-placement') ?? 'auto',
    }
    return new Tooltip(tooltipTriggerEl, options)
  })
})
// js-docs-end tooltip-init
