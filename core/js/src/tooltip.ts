import { Tooltip } from './bootstrap'
import Manipulator from './bootstrap/dom/manipulator'
import { initAll } from './bootstrap/util/component-functions'
import { onDOMContentLoaded } from './bootstrap/util/index'

// js-docs-start tooltip-init
// `data-bs-delay` on the element wins over the shorter default delay.
onDOMContentLoaded(() => {
  initAll('[data-bs-toggle="tooltip"], [data-tblr-toggle="tooltip"]', Tooltip, null, (element) => ({
    delay: Manipulator.getDataAttribute(element, 'delay') ?? { show: 50, hide: 50 },
    placement: Manipulator.getDataAttribute(element, 'placement') ?? 'auto',
  }))
})
// js-docs-end tooltip-init
