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

    const value = parseInt(element.innerHTML, 10)

    if (window.countUp && window.countUp.CountUp) {
      const countUp = new window.countUp.CountUp(element, value, options)
      if (!countUp.error) {
        countUp.start()
      }
    }
  })
}
