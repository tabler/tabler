import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import CardFullscreen from '../../src/card-fullscreen'
import { init, dispose } from '../../src/init'

const card = (id: string, attributes = ''): string => `
  <div class="card" id="${id}">
    <div class="card-header">
      <button type="button" class="btn btn-action" data-bs-toggle="card-fullscreen" aria-label="Expand" ${attributes}></button>
    </div>
    <div class="card-body"></div>
  </div>`

describe('CardFullscreen', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  beforeEach(() => {
    fixtureEl.innerHTML = card('one') + card('two')
    init(fixtureEl)
  })

  afterEach(() => {
    dispose(fixtureEl)
    clearFixture()
    document.documentElement.classList.remove('card-fullscreen-open')
  })

  const cardEl = (id = 'one'): HTMLElement => fixtureEl.querySelector(`#${id}`)!
  const button = (id = 'one'): HTMLButtonElement => cardEl(id).querySelector('button')!
  const instance = (id = 'one'): CardFullscreen => CardFullscreen.getInstance(button(id)) as CardFullscreen
  const isExpanded = (id = 'one'): boolean => cardEl(id).classList.contains('card-fullscreen')
  const pageLocked = (): boolean => document.documentElement.classList.contains('card-fullscreen-open')
  const escape = (target: EventTarget = document.body): void => {
    target.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }))
  }

  describe('NAME', () => {
    it('should return plugin name', () => {
      expect(CardFullscreen.NAME).toBe('card-fullscreen')
    })
  })

  describe('data-api', () => {
    it('should create an instance on tabler.init() and set aria-pressed', () => {
      expect(instance()).toBeInstanceOf(CardFullscreen)
      expect(button().getAttribute('aria-pressed')).toBe('false')
    })

    it('should expand the closest card on click and collapse it on a second click', () => {
      button().click()

      expect(isExpanded()).toBe(true)
      expect(pageLocked()).toBe(true)

      button().click()

      expect(isExpanded()).toBe(false)
      expect(pageLocked()).toBe(false)
    })

    it('should expand the card named by data-bs-target', () => {
      fixtureEl.innerHTML = `${card('one')}<button type="button" id="outside" data-bs-toggle="card-fullscreen" data-bs-target="#one"></button>`
      init(fixtureEl)

      fixtureEl.querySelector<HTMLButtonElement>('#outside')!.click()

      expect(isExpanded()).toBe(true)
    })

    it('should also start from data-tblr-toggle', () => {
      fixtureEl.innerHTML = '<div class="card" id="one"><button type="button" data-tblr-toggle="card-fullscreen"></button></div>'
      init(fixtureEl)

      button().click()

      expect(isExpanded()).toBe(true)
    })

    it('should ignore a disabled trigger', () => {
      button().disabled = true
      button().click()

      expect(isExpanded()).toBe(false)
    })

    it('should release the instance on tabler.dispose()', () => {
      dispose(fixtureEl)

      expect(CardFullscreen.getInstance(button())).toBeNull()

      button().click()

      expect(isExpanded()).toBe(false)
    })
  })

  describe('show / hide / toggle', () => {
    it('should return promises that resolve once the state is applied', async () => {
      const shown = instance().show()
      expect(shown).toBeInstanceOf(Promise)
      await shown
      expect(isExpanded()).toBe(true)

      await instance().hide()
      expect(isExpanded()).toBe(false)

      await instance().toggle()
      expect(isExpanded()).toBe(true)
    })

    it('should fire show, shown, hide and hidden on the card', async () => {
      const events: string[] = []
      for (const name of ['show', 'shown', 'hide', 'hidden']) {
        cardEl().addEventListener(`${name}.bs.card-fullscreen`, () => events.push(name))
      }

      await instance().show()
      await instance().hide()

      expect(events).toEqual(['show', 'shown', 'hide', 'hidden'])
    })

    it('should not expand when show is prevented', async () => {
      cardEl().addEventListener('show.bs.card-fullscreen', (event) => event.preventDefault())

      await instance().show()

      expect(isExpanded()).toBe(false)
      expect(pageLocked()).toBe(false)
      expect(button().getAttribute('aria-pressed')).toBe('false')
    })

    it('should stay expanded when hide is prevented', async () => {
      await instance().show()
      cardEl().addEventListener('hide.bs.card-fullscreen', (event) => event.preventDefault())

      await instance().hide()

      expect(isExpanded()).toBe(true)
      expect(pageLocked()).toBe(true)
    })

    it('should keep only one card expanded', async () => {
      await instance('one').show()
      await instance('two').show()

      expect(isExpanded('one')).toBe(false)
      expect(button('one').getAttribute('aria-pressed')).toBe('false')
      expect(isExpanded('two')).toBe(true)
      expect(pageLocked()).toBe(true)
    })

    it('should not expand another card while the first one refuses to close', async () => {
      await instance('one').show()
      cardEl('one').addEventListener('hide.bs.card-fullscreen', (event) => event.preventDefault())

      await instance('two').show()

      expect(isExpanded('one')).toBe(true)
      expect(isExpanded('two')).toBe(false)
    })

    it('should dispatch resize on window after every change', async () => {
      const onResize = vi.fn()
      window.addEventListener('resize', onResize)

      await instance().show()
      await instance().hide()

      window.removeEventListener('resize', onResize)
      expect(onResize).toHaveBeenCalledTimes(2)
    })
  })

  describe('labels', () => {
    it('should swap aria-pressed and the accessible name', async () => {
      await instance().show()

      expect(button().getAttribute('aria-pressed')).toBe('true')
      expect(button().getAttribute('aria-label')).toBe('Collapse')

      await instance().hide()

      expect(button().getAttribute('aria-pressed')).toBe('false')
      expect(button().getAttribute('aria-label')).toBe('Expand')
    })

    it('should use data-bs-label-expand / data-bs-label-collapse and keep title in sync', async () => {
      fixtureEl.innerHTML = card('one', 'title="Maximize" data-bs-label-expand="Maximize" data-bs-label-collapse="Restore"')
      init(fixtureEl)

      await instance().show()

      expect(button().getAttribute('aria-label')).toBe('Restore')
      expect(button().getAttribute('title')).toBe('Restore')

      await instance().hide()

      expect(button().getAttribute('aria-label')).toBe('Maximize')
      expect(button().getAttribute('title')).toBe('Maximize')
    })

    it('should not add aria-label to a button with visible text', () => {
      fixtureEl.innerHTML = '<div class="card" id="one"><button type="button" data-bs-toggle="card-fullscreen">Fullscreen</button></div>'
      init(fixtureEl)

      expect(button().hasAttribute('aria-label')).toBe(false)
    })

    it('should keep focus on the toggle button', async () => {
      button().focus()
      button().click()

      expect(document.activeElement).toBe(button())
    })
  })

  describe('escape', () => {
    it('should collapse the card on Escape', async () => {
      await instance().show()

      escape()

      expect(isExpanded()).toBe(false)
    })

    it('should leave Escape to an open dropdown', async () => {
      cardEl().querySelector('.card-body')!.innerHTML = '<div class="dropdown"><button type="button" data-bs-toggle="dropdown" aria-expanded="true"></button><div class="dropdown-menu show"><a class="dropdown-item" href="#">Item</a></div></div>'
      await instance().show()

      escape(cardEl().querySelector('[data-bs-toggle="dropdown"]')!)
      expect(isExpanded()).toBe(true)

      escape(cardEl().querySelector('.dropdown-item')!)
      expect(isExpanded()).toBe(true)
    })

    it('should close the card while another dropdown on the page stays open', async () => {
      fixtureEl.insertAdjacentHTML('beforeend', '<div class="dropdown-menu show"></div>')
      await instance().show()

      escape(button())

      expect(isExpanded()).toBe(false)
    })

    it('should leave Escape to an open modal', async () => {
      fixtureEl.insertAdjacentHTML('beforeend', '<div class="modal show"></div>')
      await instance().show()

      escape()

      expect(isExpanded()).toBe(true)
    })

    it('should ignore an Escape another handler already prevented', async () => {
      await instance().show()
      const event = new KeyboardEvent('keydown', { key: 'Escape', cancelable: true })
      event.preventDefault()

      window.dispatchEvent(event)

      expect(isExpanded()).toBe(true)
    })

    it('should not listen for Escape while collapsed', () => {
      const spy = vi.spyOn(window, 'addEventListener')

      fixtureEl.innerHTML = card('one')
      init(fixtureEl)
      escape()

      expect(spy.mock.calls.some(([type]) => type === 'keydown')).toBe(false)
      spy.mockRestore()
    })

    it('should remove the Escape listener when collapsed', async () => {
      const spy = vi.spyOn(window, 'removeEventListener')

      await instance().show()
      await instance().hide()

      expect(spy.mock.calls.some(([type]) => type === 'keydown')).toBe(true)
      spy.mockRestore()
    })
  })

  describe('dispose', () => {
    it('should restore the page when disposed while expanded', async () => {
      await instance().show()
      const element = button()

      instance().dispose()

      expect(isExpanded()).toBe(false)
      expect(pageLocked()).toBe(false)
      expect(element.getAttribute('aria-pressed')).toBe('false')

      escape()
      element.click()

      expect(isExpanded()).toBe(false)
    })
  })

  describe('existing state', () => {
    it('should adopt a card rendered expanded', () => {
      fixtureEl.innerHTML = '<div class="card card-fullscreen" id="one"><button type="button" data-bs-toggle="card-fullscreen"></button></div>'
      init(fixtureEl)

      expect(button().getAttribute('aria-pressed')).toBe('true')
      expect(pageLocked()).toBe(true)

      escape()

      expect(isExpanded()).toBe(false)
    })
  })
})
