// SortableJS plugin
// Initializes Sortable on elements marked with [data-sortable]
// Allows options via JSON in data attribute: data-sortable='{"animation":150}'

const sortableElements = document.querySelectorAll('[data-sortable]');

if (sortableElements.length) {
  sortableElements.forEach(function (element) {
    let options = {};

    try {
      const rawOptions = element.getAttribute('data-sortable');
      options = rawOptions ? JSON.parse(rawOptions) : {};
    } catch (e) {
      // ignore invalid JSON
    }

    if (window.Sortable) {
      // eslint-disable-next-line no-new
      new window.Sortable(element, options);
    }
  });
}


