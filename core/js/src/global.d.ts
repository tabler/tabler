import type { JQueryStaticLike } from './bootstrap/types'

// Plugins that are loaded separately, not bundled: IMask (https://imask.js.org),
// SortableJS (https://sortablejs.github.io/Sortable/) and Vanilla Calendar Pro
// (https://vanilla-calendar.pro). None of these are typed against their real
// package here, since all three are optional peer dependencies: a consumer who
// never touches the component that uses one would otherwise get a
// `Cannot find module` error from this file alone, which ships in `dist/types`
// and is checked for every consumer, not only those using the component.
declare global {
  interface Window {
    VanillaCalendarPro?: unknown
    IMask?: new (element: HTMLElement, options: { mask: unknown; lazy?: boolean } & Record<string, unknown>) => import('./input-mask').IMaskInstance
    Sortable?: new (element: HTMLElement, options?: Record<string, unknown>) => import('./sortable').SortableInstance
    jQuery?: JQueryStaticLike
  }
}
