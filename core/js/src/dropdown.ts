import { Dropdown } from './bootstrap'
import { onDOMContentLoaded } from './bootstrap/util/index'

// js-docs-start dropdown-init
onDOMContentLoaded(() => {
  const dropdownTriggerList: HTMLElement[] = [].slice.call(document.querySelectorAll<HTMLElement>('[data-bs-toggle="dropdown"]'))
  dropdownTriggerList.map(function (dropdownTriggerEl: HTMLElement) {
    const options = {
      boundary: dropdownTriggerEl.getAttribute('data-bs-boundary') === 'viewport' ? document.documentElement : ('clippingParents' as const),
    }
    return new Dropdown(dropdownTriggerEl, options)
  })
})
// js-docs-end dropdown-init
