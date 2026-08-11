import { Dropdown } from './bootstrap'

/*
Core dropdowns
 */
// js-docs-start dropdown-init
const dropdownTriggerList: HTMLElement[] = [].slice.call(document.querySelectorAll<HTMLElement>('[data-bs-toggle="dropdown"]'))
dropdownTriggerList.map(function (dropdownTriggerEl: HTMLElement) {
  const options = {
    boundary: dropdownTriggerEl.getAttribute('data-bs-boundary') === 'viewport' ? document.documentElement : 'clippingParents',
  }
  return new Dropdown(dropdownTriggerEl, options)
})
// js-docs-end dropdown-init
