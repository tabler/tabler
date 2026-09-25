import { describe, it, expect, beforeAll, afterEach } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import { EnableActivationTabsFromLocationHash } from '../../src/tab'

describe('tab init from location hash', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
    history.replaceState(null, '', window.location.pathname)
  })

  it('does not throw for a tab link outside a nav', () => {
    fixtureEl.innerHTML = '<div class="card-header"><a data-bs-toggle="tab" href="#lonely">Lonely</a></div><div id="lonely"></div>'
    history.replaceState(null, '', '#lonely')

    expect(() => EnableActivationTabsFromLocationHash()).not.toThrow()
  })

  it('activates the tab matching the hash, also from the data-tblr-toggle alias', () => {
    fixtureEl.innerHTML = '<ul class="nav"><li class="nav-item"><a class="nav-link" data-tblr-toggle="tab" href="#one">One</a></li></ul><div id="one" class="tab-pane"></div>'
    history.replaceState(null, '', '#one')

    EnableActivationTabsFromLocationHash()

    expect(fixtureEl.querySelector('[href="#one"]')!.classList.contains('active')).toBe(true)
  })
})
