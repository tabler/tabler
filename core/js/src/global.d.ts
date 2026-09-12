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

interface Window {
  countUp?: {
    CountUp: new (
      target: HTMLElement,
      endVal: number,
      options?: Record<string, unknown>,
    ) => {
      error: boolean
      start: () => void
    }
  }
  IMask?: new (element: HTMLElement, options: { mask: string; lazy?: boolean }) => unknown
  Sortable?: new (element: HTMLElement, options?: Record<string, unknown>) => unknown
}
