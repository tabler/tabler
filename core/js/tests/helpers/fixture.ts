const FIXTURE_ID = 'fixture'

export const getFixture = (): HTMLElement => {
  let el = document.getElementById(FIXTURE_ID)

  if (!el) {
    el = document.createElement('div')
    el.id = FIXTURE_ID
    el.style.position = 'absolute'
    el.style.top = '-10000px'
    el.style.left = '-10000px'
    el.style.width = '10000px'
    el.style.height = '10000px'
    document.body.append(el)
  }

  return el
}

export const clearFixture = (): void => {
  getFixture().innerHTML = ''
}

export const createEvent = (eventName: string, parameters: EventInit = {}): Event => {
  return new Event(eventName, parameters)
}

export const clearBodyAndDocument = (): void => {
  for (const attribute of ['data-bs-padding-right', 'data-tblr-padding-right', 'style']) {
    document.documentElement.removeAttribute(attribute)
    document.body.removeAttribute(attribute)
  }
}
