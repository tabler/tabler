import { Dropdown } from './bootstrap'
import Manipulator from './bootstrap/dom/manipulator'
import { registerPlugin } from './bootstrap/util/component-functions'

// js-docs-start dropdown-init
registerPlugin(Dropdown, {
  selector: '[data-bs-toggle="dropdown"], [data-tblr-toggle="dropdown"]',
  when: 'ready',
  config: (element) => ({
    boundary: Manipulator.getDataAttribute(element, 'boundary') === 'viewport' ? document.documentElement : ('clippingParents' as const),
  }),
})
// js-docs-end dropdown-init
