import { Dropdown } from './bootstrap'
import Manipulator from './bootstrap/dom/manipulator'
import { initAll } from './bootstrap/util/component-functions'
import { onDOMContentLoaded } from './bootstrap/util/index'

// js-docs-start dropdown-init
onDOMContentLoaded(() => {
  initAll('[data-bs-toggle="dropdown"], [data-tblr-toggle="dropdown"]', Dropdown, null, (element) => ({
    boundary: Manipulator.getDataAttribute(element, 'boundary') === 'viewport' ? document.documentElement : ('clippingParents' as const),
  }))
})
// js-docs-end dropdown-init
