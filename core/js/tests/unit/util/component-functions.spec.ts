import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import BaseComponent from '../../../src/bootstrap/base-component'
import { enableDismissTrigger } from '../../../src/bootstrap/util/component-functions'
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
      fixtureEl.innerHTML = [
        '<div id="foo" class="test">',
        '  <button type="button" data-bs-dismiss="test" data-bs-target="#foo"></button>',
        '</div>'
      ].join('')

      const spyGet = vi.spyOn(DummyClass, 'getOrCreateInstance')
      const spyTest = vi.spyOn(DummyClass.prototype, 'testMethod')

      enableDismissTrigger(DummyClass, 'testMethod')
      fixtureEl.querySelector('[data-bs-dismiss="test"]')!.dispatchEvent(createEvent('click'))

      expect(spyGet).toHaveBeenCalled()
      expect(spyTest).toHaveBeenCalled()

      vi.restoreAllMocks()
    })

    it('should use closest class when no data-bs-target', () => {
      fixtureEl.innerHTML = [
        '<div id="foo" class="test">',
        '  <button type="button" data-bs-dismiss="test"></button>',
        '</div>'
      ].join('')

      const spyGet = vi.spyOn(DummyClass, 'getOrCreateInstance')
      const spyHide = vi.spyOn(DummyClass.prototype, 'hide')

      enableDismissTrigger(DummyClass)
      fixtureEl.querySelector('[data-bs-dismiss="test"]')!.dispatchEvent(createEvent('click'))

      expect(spyGet).toHaveBeenCalled()
      expect(spyHide).toHaveBeenCalled()

      vi.restoreAllMocks()
    })

    it('should not trigger if disabled', () => {
      fixtureEl.innerHTML = [
        '<div id="foo" class="test">',
        '  <button type="button" disabled data-bs-dismiss="test"></button>',
        '</div>'
      ].join('')

      const spy = vi.spyOn(DummyClass, 'getOrCreateInstance')

      enableDismissTrigger(DummyClass)
      fixtureEl.querySelector('[data-bs-dismiss="test"]')!.dispatchEvent(createEvent('click'))

      expect(spy).not.toHaveBeenCalled()

      vi.restoreAllMocks()
    })

    it('should preventDefault for <a> elements', () => {
      fixtureEl.innerHTML = [
        '<div id="foo" class="test">',
        '  <a type="button" data-bs-dismiss="test"></a>',
        '</div>'
      ].join('')

      enableDismissTrigger(DummyClass)
      const preventSpy = vi.spyOn(Event.prototype, 'preventDefault')

      fixtureEl.querySelector('[data-bs-dismiss="test"]')!.dispatchEvent(createEvent('click'))

      expect(preventSpy).toHaveBeenCalled()

      vi.restoreAllMocks()
    })
  })
})
