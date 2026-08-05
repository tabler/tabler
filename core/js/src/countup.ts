// js-docs-start countup-init
const countupElements: NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>('[data-countup]')

if (countupElements.length) {
  countupElements.forEach(function (element: HTMLElement) {
    let options: Record<string, any> = {}
    try {
      const dataOptions = element.getAttribute('data-countup') ? JSON.parse(element.getAttribute('data-countup')!) : {}
      options = Object.assign(
        {
          enableScrollSpy: true,
        },
        dataOptions,
      )
    } catch (error) {
      // ignore invalid JSON
    }

    // Strip thousands separators, currency symbols and other non-numeric characters
    // so formatted targets like "1,234", "1 234" or "$99.5" parse correctly.
    const value = parseFloat((element.textContent ?? '').replace(/[^0-9.-]/g, ''))

    if (!Number.isNaN(value) && window.countUp && window.countUp.CountUp) {
      const countUp = new window.countUp.CountUp(element, value, options)
      // When scrollSpy is enabled CountUp starts the animation itself once the
      // element scrolls into view, so only start manually when it's disabled.
      if (!countUp.error && !options.enableScrollSpy) {
        countUp.start()
      }
    }
  })
}
// js-docs-end countup-init
