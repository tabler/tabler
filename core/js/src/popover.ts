import { Popover } from './bootstrap'
import Manipulator from './bootstrap/dom/manipulator'

// js-docs-start popover-init
for (const popoverTriggerEl of document.querySelectorAll<HTMLElement>('[data-bs-toggle="popover"], [data-tblr-toggle="popover"]')) {
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
// js-docs-end popover-init
