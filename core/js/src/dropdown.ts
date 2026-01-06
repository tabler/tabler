import { Dropdown } from './bootstrap'

/*
Core dropdowns
 */
const dropdownTriggerList: HTMLElement[] = [].slice.call(document.querySelectorAll<HTMLElement>('[data-bs-toggle="dropdown"]'))
dropdownTriggerList.map(function (dropdownTriggerEl: HTMLElement) {
  const options = {
    boundary: dropdownTriggerEl.getAttribute('data-bs-boundary') === 'viewport' ? document.querySelector('.btn') : 'clippingParents',
  }
  return new Dropdown(dropdownTriggerEl, options)
})
