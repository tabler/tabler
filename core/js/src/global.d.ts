interface Window {
  autosize?: (element: HTMLElement | HTMLTextAreaElement) => void
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
