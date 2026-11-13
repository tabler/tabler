import { Dropdown } from './bootstrap'
import Manipulator from './bootstrap/dom/manipulator'

const SELECTOR_TOGGLE = '[data-bs-toggle="dropdown"], [data-tblr-toggle="dropdown"]'

// js-docs-start dropdown-init
const initDropdown = (event: Event): void => {
  const dropdownTriggerEl = event.target instanceof Element ? event.target.closest<HTMLElement>(SELECTOR_TOGGLE) : null

  if (!dropdownTriggerEl || Dropdown.getInstance(dropdownTriggerEl)) {
    return
  }

  try {
    const options = {
      boundary: Manipulator.getDataAttribute(dropdownTriggerEl, 'boundary') === 'viewport' ? document.documentElement : ('clippingParents' as const),
    }
    Dropdown.getOrCreateInstance(dropdownTriggerEl, options)
  } catch (error) {
    console.error(error)
  }
}

window.addEventListener('click', initDropdown, true)
window.addEventListener('keydown', initDropdown, true)
// js-docs-end dropdown-init
