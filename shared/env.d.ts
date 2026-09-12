/// <reference types="astro/client" />

// Loaded via page libs (libs.json) as classic <script> globals, not npm packages —
// declared ambiently so `astro check` can resolve them in the demo init scripts.

/** list.js, used by TablerList.astro / AdvancedTable.astro */
declare var List: new (idOrElement: string | Element, options: Record<string, unknown>) => { search(query: string): void; page: number; update(): void }
/** typed.js, used by marketing/hero/Side.astro */
declare var Typed: new (selector: string, options: Record<string, unknown>) => unknown
/** tom-select, used by ui/Select.astro / FormElements1.astro */
declare var TomSelect: (new (element: Element | null, options: Record<string, unknown>) => unknown) | undefined
