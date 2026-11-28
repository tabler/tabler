import { Popover } from './bootstrap'
import Manipulator from './bootstrap/dom/manipulator'
import { registerPlugin } from './bootstrap/util/component-functions'

// js-docs-start popover-init
registerPlugin(Popover, {
  selector: '[data-bs-toggle="popover"], [data-tblr-toggle="popover"]',
  when: 'ready',
  config: (element) => ({
    delay: Manipulator.getDataAttribute(element, 'delay') ?? { show: 50, hide: 50 },
    placement: Manipulator.getDataAttribute(element, 'placement') ?? 'auto',
  }),
})
// js-docs-end popover-init
