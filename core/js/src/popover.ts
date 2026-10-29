import { Popover } from './bootstrap'
import Manipulator from './bootstrap/dom/manipulator'

const SELECTOR_TOGGLE = '[data-bs-toggle="popover"], [data-tblr-toggle="popover"]'

// js-docs-start popover-init
const initPopover = (event: Event): void => {
  const popoverTriggerEl = event.target instanceof Element ? event.target.closest<HTMLElement>(SELECTOR_TOGGLE) : null

  if (!popoverTriggerEl || Popover.getInstance(popoverTriggerEl)) {
    return
  }

  try {
    const options = {
      delay: Manipulator.getDataAttribute(popoverTriggerEl, 'delay') ?? { show: 50, hide: 50 },
      placement: Manipulator.getDataAttribute(popoverTriggerEl, 'placement') ?? 'auto',
    }
    Popover.getOrCreateInstance(popoverTriggerEl, options)
  } catch (error) {
    console.error(error)
  }
}

window.addEventListener('mouseover', initPopover, true)
window.addEventListener('focusin', initPopover, true)
window.addEventListener('click', initPopover, true)
// js-docs-end popover-init
