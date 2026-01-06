// SortableJS plugin
// Initializes Sortable on elements marked with [data-sortable]
// Allows options via JSON in data attribute: data-sortable='{"animation":150}'

const sortableElements: NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>('[data-sortable]')

if (sortableElements.length) {
  sortableElements.forEach(function (element: HTMLElement) {
    let options: Record<string, any> = {}

    try {
      const rawOptions = element.getAttribute('data-sortable')
      options = rawOptions ? JSON.parse(rawOptions) : {}
    } catch (e) {
      // ignore invalid JSON
    }

    if (window.Sortable) {
      // eslint-disable-next-line no-new
      new window.Sortable(element, options)
    }
  })
}
