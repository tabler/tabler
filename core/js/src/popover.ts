import { Popover } from './bootstrap'
import Manipulator from './bootstrap/dom/manipulator'
import { initAll } from './bootstrap/util/component-functions'
import { onDOMContentLoaded } from './bootstrap/util/index'

// js-docs-start popover-init
onDOMContentLoaded(() => {
  initAll('[data-bs-toggle="popover"], [data-tblr-toggle="popover"]', Popover, null, (element) => ({
    delay: Manipulator.getDataAttribute(element, 'delay') ?? { show: 50, hide: 50 },
    placement: Manipulator.getDataAttribute(element, 'placement') ?? 'auto',
  }))
})
// js-docs-end popover-init
