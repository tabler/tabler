// The `autosize` package ships no type definitions
declare module 'autosize' {
  type AutosizeTarget = Element | ArrayLike<Element>

  interface Autosize {
    (target: AutosizeTarget): AutosizeTarget
    update(target: AutosizeTarget): AutosizeTarget
    destroy(target: AutosizeTarget): AutosizeTarget
  }

  const autosize: Autosize
  export default autosize
}

// IMask (https://imask.js.org) is loaded separately, not bundled
interface IMaskInstance {
  value: string
  unmaskedValue: string
  updateValue(): void
  updateOptions(options: Record<string, unknown>): void
  destroy(): void
}

// SortableJS (https://sortablejs.github.io/Sortable/) is loaded separately, not bundled
interface SortableInstance {
  option(name: string, value?: unknown): unknown
  toArray(): string[]
  sort(order: string[], useAnimation?: boolean): void
  destroy(): void
}

interface Window {
  IMask?: new (element: HTMLElement, options: { mask: string; lazy?: boolean }) => IMaskInstance
  Sortable?: new (element: HTMLElement, options?: Record<string, unknown>) => SortableInstance
}
