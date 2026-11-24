import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import BaseComponent from '../../../src/bootstrap/base-component'
import { enableDismissTrigger, eventActionOnPlugin, getRegistry, registerPlugin } from '../../../src/bootstrap/util/component-functions'
import { clearFixture, createEvent, getFixture } from '../../helpers/fixture'

class DummyClass extends BaseComponent {
  static get NAME(): string {
    return 'test'
  }

  hide() {
    return true
  }

  testMethod() {
    return true
  }
}

describe('Component Functions', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
  })

  describe('data-bs-dismiss', () => {
    it('should get plugin and execute given method on click', () => {
      fixtureEl.innerHTML = ['<div id="foo" class="test">', '  <button type="button" data-bs-dismiss="test" data-bs-target="#foo"></button>', '</div>'].join('')

      const spyGet = vi.spyOn(DummyClass, 'getOrCreateInstance')
      const spyTest = vi.spyOn(DummyClass.prototype, 'testMethod')

      enableDismissTrigger(DummyClass, 'testMethod')
      fixtureEl.querySelector('[data-bs-dismiss="test"]')!.dispatchEvent(createEvent('click'))

      expect(spyGet).toHaveBeenCalled()
      expect(spyTest).toHaveBeenCalled()

      vi.restoreAllMocks()
    })

    it('should use closest class when no data-bs-target', () => {
      fixtureEl.innerHTML = ['<div id="foo" class="test">', '  <button type="button" data-bs-dismiss="test"></button>', '</div>'].join('')

      const spyGet = vi.spyOn(DummyClass, 'getOrCreateInstance')
      const spyHide = vi.spyOn(DummyClass.prototype, 'hide')

      enableDismissTrigger(DummyClass)
      fixtureEl.querySelector('[data-bs-dismiss="test"]')!.dispatchEvent(createEvent('click'))

      expect(spyGet).toHaveBeenCalled()
      expect(spyHide).toHaveBeenCalled()

      vi.restoreAllMocks()
    })

    it('should not trigger if disabled', () => {
      fixtureEl.innerHTML = ['<div id="foo" class="test">', '  <button type="button" disabled data-bs-dismiss="test"></button>', '</div>'].join('')

      const spy = vi.spyOn(DummyClass, 'getOrCreateInstance')

      enableDismissTrigger(DummyClass)
      fixtureEl.querySelector('[data-bs-dismiss="test"]')!.dispatchEvent(createEvent('click'))

      expect(spy).not.toHaveBeenCalled()

      vi.restoreAllMocks()
    })

    it('should preventDefault for <a> elements', () => {
      fixtureEl.innerHTML = ['<div id="foo" class="test">', '  <a type="button" data-bs-dismiss="test"></a>', '</div>'].join('')

      enableDismissTrigger(DummyClass)
      const preventSpy = vi.spyOn(Event.prototype, 'preventDefault')

      fixtureEl.querySelector('[data-bs-dismiss="test"]')!.dispatchEvent(createEvent('click'))

      expect(preventSpy).toHaveBeenCalled()

      vi.restoreAllMocks()
    })
  })

  describe('eventActionOnPlugin', () => {
    it('should get plugin for the trigger element and execute given method on click', () => {
      fixtureEl.innerHTML = '<button type="button" data-bs-toggle="test"></button>'

      const spyGet = vi.spyOn(DummyClass, 'getOrCreateInstance')
      const spyTest = vi.spyOn(DummyClass.prototype, 'testMethod')

      eventActionOnPlugin(DummyClass, 'click', '[data-bs-toggle="test"]', 'testMethod')
      fixtureEl.querySelector('[data-bs-toggle="test"]')!.dispatchEvent(createEvent('click'))

      expect(spyGet).toHaveBeenCalledWith(fixtureEl.querySelector('[data-bs-toggle="test"]'))
      expect(spyTest).toHaveBeenCalled()

      vi.restoreAllMocks()
    })

    it('should resolve targets from data-bs-target and call the callback with instances', () => {
      fixtureEl.innerHTML = ['<button type="button" data-bs-toggle="test2" data-bs-target=".target"></button>', '<div class="target"></div>', '<div class="target"></div>'].join('')

      const spyTest = vi.spyOn(DummyClass.prototype, 'testMethod')
      const callback = vi.fn()

      eventActionOnPlugin(DummyClass, 'click', '[data-bs-toggle="test2"]', 'testMethod', callback)
      fixtureEl.querySelector('[data-bs-toggle="test2"]')!.dispatchEvent(createEvent('click'))

      expect(spyTest).toHaveBeenCalledTimes(2)
      expect(callback).toHaveBeenCalledTimes(1)
      expect(callback.mock.calls[0][0].instances).toHaveLength(2)
      expect(callback.mock.calls[0][0].targets).toEqual([...fixtureEl.querySelectorAll('.target')])

      vi.restoreAllMocks()
    })

    it('should not trigger if disabled', () => {
      fixtureEl.innerHTML = '<button type="button" disabled data-bs-toggle="test3"></button>'

      const spy = vi.spyOn(DummyClass, 'getOrCreateInstance')

      eventActionOnPlugin(DummyClass, 'click', '[data-bs-toggle="test3"]', 'testMethod')
      fixtureEl.querySelector('[data-bs-toggle="test3"]')!.dispatchEvent(createEvent('click'))

      expect(spy).not.toHaveBeenCalled()

      vi.restoreAllMocks()
    })

    it('should preventDefault for <a> elements', () => {
      fixtureEl.innerHTML = '<a href="#" data-bs-toggle="test4"></a>'

      const preventSpy = vi.spyOn(Event.prototype, 'preventDefault')

      eventActionOnPlugin(DummyClass, 'click', '[data-bs-toggle="test4"]', 'testMethod')
      fixtureEl.querySelector('[data-bs-toggle="test4"]')!.dispatchEvent(createEvent('click'))

      expect(preventSpy).toHaveBeenCalled()

      vi.restoreAllMocks()
    })
  })
  describe('registerPlugin', () => {
    it('should create an instance for every matching element', () => {
      fixtureEl.innerHTML = '<div class="init-all"></div><div class="init-all"></div>'

      registerPlugin(DummyClass, { selector: '.init-all' })

      for (const element of fixtureEl.querySelectorAll<HTMLElement>('.init-all')) {
        expect(DummyClass.getInstance(element)).toBeInstanceOf(DummyClass)
      }
    })

    it('should skip the elements the filter rejects', () => {
      fixtureEl.innerHTML = '<div class="init-all" id="skip"></div><div class="init-all" id="keep"></div>'

      registerPlugin(DummyClass, { selector: '.init-all', filter: (element) => element.id === 'keep' })

      expect(DummyClass.getInstance(fixtureEl.querySelector<HTMLElement>('#skip'))).toBeNull()
      expect(DummyClass.getInstance(fixtureEl.querySelector<HTMLElement>('#keep'))).toBeInstanceOf(DummyClass)
    })

    it('should pass the options the config callback returns for the element', () => {
      fixtureEl.innerHTML = '<div class="init-config" id="first"></div>'
      const spy = vi.spyOn(DummyClass, 'getOrCreateInstance')

      registerPlugin(DummyClass, { selector: '.init-config', config: (element) => ({ from: element.id }) })

      expect(spy).toHaveBeenCalledWith(fixtureEl.querySelector('#first'), { from: 'first' })

      spy.mockRestore()
    })

    it('should register a plugin and selector pair once', () => {
      const count = () => getRegistry().filter((entry) => entry.Plugin === DummyClass && entry.selector === '.init-once').length

      registerPlugin(DummyClass, { selector: '.init-once' })
      registerPlugin(DummyClass, { selector: '.init-once' })

      expect(count()).toBe(1)
    })

    it('should wait for the document to be parsed when `when` is ready', () => {
      fixtureEl.innerHTML = '<div class="init-ready"></div>'
      Object.defineProperty(document, 'readyState', { configurable: true, get: () => 'loading' })

      registerPlugin(DummyClass, { selector: '.init-ready', when: 'ready' })
      expect(DummyClass.getInstance(fixtureEl.querySelector<HTMLElement>('.init-ready'))).toBeNull()

      delete (document as unknown as Record<string, unknown>).readyState
      document.dispatchEvent(new Event('DOMContentLoaded'))
      expect(DummyClass.getInstance(fixtureEl.querySelector<HTMLElement>('.init-ready'))).toBeInstanceOf(DummyClass)
    })

    it('should wait for the window load event when `when` is load', () => {
      fixtureEl.innerHTML = '<div class="init-load"></div>'

      registerPlugin(DummyClass, { selector: '.init-load', when: 'load' })
      expect(DummyClass.getInstance(fixtureEl.querySelector<HTMLElement>('.init-load'))).toBeNull()

      window.dispatchEvent(new Event('load'))
      expect(DummyClass.getInstance(fixtureEl.querySelector<HTMLElement>('.init-load'))).toBeInstanceOf(DummyClass)
    })

    it('should call onCreate only for an instance it created', () => {
      fixtureEl.innerHTML = '<div class="init-create" id="old"></div><div class="init-create" id="new"></div>'
      const old = DummyClass.getOrCreateInstance(fixtureEl.querySelector<HTMLElement>('#old'))
      const onCreate = vi.fn()

      registerPlugin(DummyClass, { selector: '.init-create', onCreate })

      expect(onCreate).toHaveBeenCalledTimes(1)
      expect(onCreate).toHaveBeenCalledWith(DummyClass.getInstance(fixtureEl.querySelector<HTMLElement>('#new')), fixtureEl.querySelector('#new'))
      expect(onCreate).not.toHaveBeenCalledWith(old, expect.anything())
    })

    it('should run onInit with the document and log its error', () => {
      const error = new TypeError('TEST: broken onInit')
      const spyError = vi.spyOn(console, 'error').mockImplementation(() => {})
      const onInit = vi.fn(() => {
        throw error
      })

      expect(() => registerPlugin(DummyClass, { selector: '.init-oninit', onInit })).not.toThrow()
      expect(onInit).toHaveBeenCalledWith(document)
      expect(spyError).toHaveBeenCalledWith(error)

      spyError.mockRestore()
    })

    it('should only remember a plugin without a selector', () => {
      const Lazy = { NAME: 'lazy', getInstance: () => null, getOrCreateInstance: vi.fn() }

      registerPlugin(Lazy)

      expect(Lazy.getOrCreateInstance).not.toHaveBeenCalled()
      expect(getRegistry().some((entry) => entry.Plugin === Lazy && entry.selector === null)).toBe(true)
    })

    it('should log the error and go on when one element throws', () => {
      fixtureEl.innerHTML = '<div class="init-all" id="broken"></div><div class="init-all" id="fine"></div>'

      const error = new TypeError('TEST: bad option')
      const spyError = vi.spyOn(console, 'error').mockImplementation(() => {})
      const Throwing = {
        NAME: 'test',
        getInstance: () => null,
        getOrCreateInstance(element: HTMLElement | string | null) {
          if ((element as HTMLElement).id === 'broken') {
            throw error
          }

          return DummyClass.getOrCreateInstance(element as HTMLElement)
        },
      }

      expect(() => registerPlugin(Throwing, { selector: '.init-all' })).not.toThrow()
      expect(spyError).toHaveBeenCalledWith(error)
      expect(DummyClass.getInstance(fixtureEl.querySelector<HTMLElement>('#fine'))).toBeInstanceOf(DummyClass)

      spyError.mockRestore()
    })
  })
})
