// Autosize plugin
const autosizeElements: NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>('[data-bs-toggle="autosize"]')

if (autosizeElements.length) {
  autosizeElements.forEach(function (element: HTMLElement) {
    if (window.autosize) {
      window.autosize(element)
    }
  })
}
