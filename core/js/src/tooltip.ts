import { Tooltip } from './bootstrap'
import Manipulator from './bootstrap/dom/manipulator'

// js-docs-start tooltip-init
// One element with a broken config must not stop the rest of the bundle, so
// every instance is created on its own. `data-bs-delay` on the element wins
// over the shorter default delay.
for (const tooltipTriggerEl of document.querySelectorAll<HTMLElement>('[data-bs-toggle="tooltip"], [data-tblr-toggle="tooltip"]')) {
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
// js-docs-end tooltip-init
