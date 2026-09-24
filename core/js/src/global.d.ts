import type { JQueryStaticLike } from './bootstrap/types'

// Plugins that are loaded separately, not bundled: IMask (https://imask.js.org),
// SortableJS (https://sortablejs.github.io/Sortable/) and Vanilla Calendar Pro
// (https://vanilla-calendar.pro). The instance types live in the component
// modules, so they are part of the published `dist/types`.
declare global {
  interface Window {
    VanillaCalendarPro?: typeof import('vanilla-calendar-pro')
    IMask?: new (element: HTMLElement, options: { mask: string; lazy?: boolean }) => import('./input-mask').IMaskInstance
    Sortable?: new (element: HTMLElement, options?: Record<string, unknown>) => import('./sortable').SortableInstance
    jQuery?: JQueryStaticLike
  }
}
