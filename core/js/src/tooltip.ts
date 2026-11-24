import { Tooltip } from './bootstrap'
import Manipulator from './bootstrap/dom/manipulator'
import { registerPlugin } from './bootstrap/util/component-functions'

// js-docs-start tooltip-init
// `data-bs-delay` on the element wins over the shorter default delay.
registerPlugin(Tooltip, {
  selector: '[data-bs-toggle="tooltip"], [data-tblr-toggle="tooltip"]',
  when: 'ready',
  config: (element) => ({
    delay: Manipulator.getDataAttribute(element, 'delay') ?? { show: 50, hide: 50 },
    placement: Manipulator.getDataAttribute(element, 'placement') ?? 'auto',
  }),
})
// js-docs-end tooltip-init
