import { Tooltip } from './bootstrap'
import Manipulator from './bootstrap/dom/manipulator'

const SELECTOR_TOGGLE = '[data-bs-toggle="tooltip"], [data-tblr-toggle="tooltip"]'

// js-docs-start tooltip-init
const initTooltip = (event: Event): void => {
  const tooltipTriggerEl = event.target instanceof Element ? event.target.closest<HTMLElement>(SELECTOR_TOGGLE) : null

  if (!tooltipTriggerEl || Tooltip.getInstance(tooltipTriggerEl)) {
    return
  }

  try {
    const options = {
      delay: Manipulator.getDataAttribute(tooltipTriggerEl, 'delay') ?? { show: 50, hide: 50 },
      placement: Manipulator.getDataAttribute(tooltipTriggerEl, 'placement') ?? 'auto',
    }
    Tooltip.getOrCreateInstance(tooltipTriggerEl, options)
  } catch (error) {
    console.error(error)
  }
}

window.addEventListener('mouseover', initTooltip, true)
window.addEventListener('focusin', initTooltip, true)
window.addEventListener('click', initTooltip, true)
// js-docs-end tooltip-init
