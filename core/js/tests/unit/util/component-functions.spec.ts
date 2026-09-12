import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import BaseComponent from '../../../src/bootstrap/base-component'
import { enableDismissTrigger, eventActionOnPlugin } from '../../../src/bootstrap/util/component-functions'
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
})
