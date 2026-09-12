// js-docs-start autosize-init
const autosizeElements: NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>('[data-bs-toggle="autosize"]')

if (autosizeElements.length) {
  autosizeElements.forEach(function (element: HTMLElement) {
    if (window.autosize) {
      window.autosize(element)
    }
  })
}
// js-docs-end autosize-init
