import { Tooltip } from './bootstrap'

const tooltipTriggerList: HTMLElement[] = [].slice.call(document.querySelectorAll<HTMLElement>('[data-bs-toggle="tooltip"]'))
tooltipTriggerList.map(function (tooltipTriggerEl: HTMLElement) {
  const options = {
    delay: { show: 50, hide: 50 },
    html: tooltipTriggerEl.getAttribute('data-bs-html') === 'true',
    placement: tooltipTriggerEl.getAttribute('data-bs-placement') ?? 'auto',
  }
  return new Tooltip(tooltipTriggerEl, options)
})
