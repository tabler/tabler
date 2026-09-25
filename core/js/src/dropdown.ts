import { Dropdown } from './bootstrap'
import Manipulator from './bootstrap/dom/manipulator'

// js-docs-start dropdown-init
for (const dropdownTriggerEl of document.querySelectorAll<HTMLElement>('[data-bs-toggle="dropdown"], [data-tblr-toggle="dropdown"]')) {
  try {
    const options = {
      boundary: Manipulator.getDataAttribute(dropdownTriggerEl, 'boundary') === 'viewport' ? document.documentElement : ('clippingParents' as const),
    }
    Dropdown.getOrCreateInstance(dropdownTriggerEl, options)
  } catch (error) {
    console.error(error)
  }
}
// js-docs-end dropdown-init
