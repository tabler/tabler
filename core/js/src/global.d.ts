import type { JQueryStaticLike } from './bootstrap/types'

declare global {
  interface Window {
    VanillaCalendarPro?: typeof import('vanilla-calendar-pro')
    IMask?: new (element: HTMLElement, options: { mask: unknown; lazy?: boolean } & Record<string, unknown>) => import('./input-mask').IMaskInstance
    maplibregl?: import('./map').MapLibrary
    Sortable?: new (element: HTMLElement, options?: Record<string, unknown>) => import('./sortable').SortableInstance
    jQuery?: JQueryStaticLike
    tablerVectorMaps?: Record<string, import('./vector-map').VectorMapData>
  }
}
