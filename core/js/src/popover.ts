import { Popover } from './bootstrap'

/*
Core popovers
 */
const popoverTriggerList: HTMLElement[] = [].slice.call(document.querySelectorAll<HTMLElement>('[data-bs-toggle="popover"]'))
popoverTriggerList.map(function (popoverTriggerEl: HTMLElement) {
  const options = {
    delay: { show: 50, hide: 50 },
    html: popoverTriggerEl.getAttribute('data-bs-html') === 'true',
    placement: popoverTriggerEl.getAttribute('data-bs-placement') ?? 'auto',
  }
  return new Popover(popoverTriggerEl, options)
})
