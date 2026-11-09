import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import Toggler from '../../src/bootstrap/toggler'
import { clearFixture, getFixture } from '../helpers/fixture'

describe('Toggler', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
  })

  describe('VERSION', () => {
    it('should return plugin version', () => {
      expect(typeof Toggler.VERSION).toBe('string')
    })
  })

  describe('constructor', () => {
    it('should take care of element either passed as a CSS selector or DOM element', () => {
      fixtureEl.innerHTML = '<div data-bs-toggle="toggler" data-bs-value="bg-warning" data-bs-attribute="class"></div>'

      const togglerEl = fixtureEl.querySelector<HTMLElement>('[data-bs-toggle="toggler"]')!
      const togglerBySelector = new Toggler('[data-bs-toggle="toggler"]')
      expect(togglerBySelector._element).toEqual(togglerEl)

      const togglerByElement = new Toggler(togglerEl)
      expect(togglerByElement._element).toEqual(togglerEl)
    })
  })

  describe('toggle', () => {
    it('should toggle class on the element', () => {
      fixtureEl.innerHTML = '<div data-bs-toggle="toggler" data-bs-value="bg-warning" data-bs-attribute="class"></div>'

      const togglerEl = fixtureEl.querySelector<HTMLElement>('[data-bs-toggle="toggler"]')!
      const toggler = new Toggler(togglerEl)

      toggler.toggle()
      expect(togglerEl.classList.contains('bg-warning')).toBe(true)

      toggler.toggle()
      expect(togglerEl.classList.contains('bg-warning')).toBe(false)
    })

    it('should toggle every class from a space separated value', () => {
      fixtureEl.innerHTML = '<div class="bg-info" data-bs-toggle="toggler" data-bs-value="bg-warning  bg-info"></div>'

      const togglerEl = fixtureEl.querySelector<HTMLElement>('[data-bs-toggle="toggler"]')!
      const toggler = new Toggler(togglerEl)

      toggler.toggle()
      expect(togglerEl.classList.contains('bg-warning')).toBe(true)
      expect(togglerEl.classList.contains('bg-info')).toBe(false)

      toggler.toggle()
      expect(togglerEl.classList.contains('bg-warning')).toBe(false)
      expect(togglerEl.classList.contains('bg-info')).toBe(true)
    })

    it('should toggle attribute on the element', () => {
      fixtureEl.innerHTML = '<div data-bs-toggle="toggler" data-bs-value="true" data-bs-attribute="hidden"></div>'

      const togglerEl = fixtureEl.querySelector<HTMLElement>('[data-bs-toggle="toggler"]')!
      const toggler = new Toggler(togglerEl)

      toggler.toggle()
      expect(togglerEl.getAttribute('hidden')).toEqual('true')

      toggler.toggle()
      expect(togglerEl.hasAttribute('hidden')).toBe(false)
    })

    it('should not throw and should be a no-op when no value is provided', () => {
      fixtureEl.innerHTML = '<div data-bs-toggle="toggler" data-bs-attribute="class"></div>'

      const togglerEl = fixtureEl.querySelector<HTMLElement>('[data-bs-toggle="toggler"]')!
      const toggler = new Toggler(togglerEl)
      const classNameBefore = togglerEl.className

      expect(() => toggler.toggle()).not.toThrow()
      expect(togglerEl.className).toEqual(classNameBefore)
    })

    it('should not toggle id attribute', () => {
      fixtureEl.innerHTML = '<div data-bs-toggle="toggler" data-bs-value="new-id" data-bs-attribute="id"></div>'

      const togglerEl = fixtureEl.querySelector<HTMLElement>('[data-bs-toggle="toggler"]')!
      const toggler = new Toggler(togglerEl)

      toggler.toggle()
      expect(togglerEl.getAttribute('id')).toBeNull()
    })

    it('should trigger events', () => {
      fixtureEl.innerHTML = '<div data-bs-toggle="toggler" data-bs-value="bg-warning" data-bs-attribute="class"></div>'

      const togglerEl = fixtureEl.querySelector<HTMLElement>('[data-bs-toggle="toggler"]')!
      const toggler = new Toggler(togglerEl)

      const toggleSpy = vi.fn()
      const toggledSpy = vi.fn()

      togglerEl.addEventListener('toggle.bs.toggler', toggleSpy)
      togglerEl.addEventListener('toggled.bs.toggler', toggledSpy)

      toggler.toggle()

      expect(toggleSpy).toHaveBeenCalled()
      expect(toggledSpy).toHaveBeenCalled()
    })

    it('should not trigger toggled event if toggle is prevented', () => {
      fixtureEl.innerHTML = '<div data-bs-toggle="toggler" data-bs-value="bg-warning" data-bs-attribute="class"></div>'

      const togglerEl = fixtureEl.querySelector<HTMLElement>('[data-bs-toggle="toggler"]')!
      const toggler = new Toggler(togglerEl)

      const toggledSpy = vi.fn()

      togglerEl.addEventListener('toggle.bs.toggler', (event) => {
        event.preventDefault()
      })
      togglerEl.addEventListener('toggled.bs.toggler', toggledSpy)

      toggler.toggle()

      expect(toggledSpy).not.toHaveBeenCalled()
    })
  })

  describe('dispose', () => {
    it('should dispose a toggler', () => {
      fixtureEl.innerHTML = '<div data-bs-toggle="toggler" data-bs-value="bg-warning" data-bs-attribute="class"></div>'

      const togglerEl = fixtureEl.querySelector<HTMLElement>('[data-bs-toggle="toggler"]')!
      const toggler = new Toggler(togglerEl)

      expect(Toggler.getInstance(togglerEl)).not.toBeNull()

      toggler.dispose()

      expect(Toggler.getInstance(togglerEl)).toBeNull()
    })
  })

  describe('getInstance', () => {
    it('should return null if there is no instance', () => {
      expect(Toggler.getInstance(fixtureEl)).toBeNull()
    })

    it('should return this instance', () => {
      fixtureEl.innerHTML = '<div data-bs-toggle="toggler" data-bs-value="bg-warning" data-bs-attribute="class"></div>'

      const togglerEl = fixtureEl.querySelector<HTMLElement>('[data-bs-toggle="toggler"]')!
      const toggler = new Toggler(togglerEl)

      expect(Toggler.getInstance(togglerEl)).toEqual(toggler)
      expect(Toggler.getInstance(togglerEl)).toBeInstanceOf(Toggler)
    })
  })

  describe('getOrCreateInstance', () => {
    it('should return toggler instance', () => {
      fixtureEl.innerHTML = '<div data-bs-toggle="toggler" data-bs-value="bg-warning" data-bs-attribute="class"></div>'

      const togglerEl = fixtureEl.querySelector<HTMLElement>('[data-bs-toggle="toggler"]')!
      const toggler = new Toggler(togglerEl)

      expect(Toggler.getOrCreateInstance(togglerEl)).toEqual(toggler)
      expect(Toggler.getInstance(togglerEl)).toEqual(Toggler.getOrCreateInstance(togglerEl, {}))
      expect(Toggler.getOrCreateInstance(togglerEl)).toBeInstanceOf(Toggler)
    })

    it('should return new instance when there is no toggler instance', () => {
      fixtureEl.innerHTML = '<div data-bs-toggle="toggler" data-bs-value="bg-warning" data-bs-attribute="class"></div>'

      const togglerEl = fixtureEl.querySelector<HTMLElement>('[data-bs-toggle="toggler"]')!

      expect(Toggler.getInstance(togglerEl)).toBeNull()
      expect(Toggler.getOrCreateInstance(togglerEl)).toBeInstanceOf(Toggler)
    })
  })

  describe('data-api', () => {
    it('should toggle class on click', () => {
      fixtureEl.innerHTML = '<div data-bs-toggle="toggler" data-bs-value="bg-warning" data-bs-attribute="class"></div>'

      const togglerEl = fixtureEl.querySelector<HTMLElement>('[data-bs-toggle="toggler"]')!

      togglerEl.click()
      expect(togglerEl.classList.contains('bg-warning')).toBe(true)

      togglerEl.click()
      expect(togglerEl.classList.contains('bg-warning')).toBe(false)
    })

    it('should toggle attribute on click', () => {
      fixtureEl.innerHTML = '<div data-bs-toggle="toggler" data-bs-value="true" data-bs-attribute="hidden"></div>'

      const togglerEl = fixtureEl.querySelector<HTMLElement>('[data-bs-toggle="toggler"]')!

      togglerEl.click()
      expect(togglerEl.getAttribute('hidden')).toEqual('true')

      togglerEl.click()
      expect(togglerEl.hasAttribute('hidden')).toBe(false)
    })

    it('should not toggle id attribute on click', () => {
      fixtureEl.innerHTML = '<div data-bs-toggle="toggler" data-bs-value="new-id" data-bs-attribute="id"></div>'

      const togglerEl = fixtureEl.querySelector<HTMLElement>('[data-bs-toggle="toggler"]')!

      togglerEl.click()
      expect(togglerEl.getAttribute('id')).toBeNull()
    })

    it('should toggle class on target element via data-bs-target with ID selector', () => {
      fixtureEl.innerHTML = ['<button data-bs-toggle="toggler" data-bs-target="#target-element"></button>', '<div id="target-element" data-bs-value="bg-info" data-bs-attribute="class"></div>'].join('')

      const triggerEl = fixtureEl.querySelector<HTMLElement>('[data-bs-toggle="toggler"]')!
      const targetEl = fixtureEl.querySelector<HTMLElement>('#target-element')!

      triggerEl.click()
      expect(targetEl.classList.contains('bg-info')).toBe(true)

      triggerEl.click()
      expect(targetEl.classList.contains('bg-info')).toBe(false)
    })

    it('should toggle class on multiple target elements via data-bs-target with class selector', () => {
      fixtureEl.innerHTML = [
        '<button data-bs-toggle="toggler" data-bs-target=".target-class"></button>',
        '<div class="target-class" data-bs-value="bg-warning" data-bs-attribute="class"></div>',
        '<div class="target-class" data-bs-value="bg-info" data-bs-attribute="class"></div>',
        '<div class="target-class" data-bs-value="bg-danger" data-bs-attribute="class"></div>',
      ].join('')

      const triggerEl = fixtureEl.querySelector<HTMLElement>('[data-bs-toggle="toggler"]')!
      const targetEls = fixtureEl.querySelectorAll('.target-class')

      triggerEl.click()
      expect(targetEls[0].classList.contains('bg-warning')).toBe(true)
      expect(targetEls[1].classList.contains('bg-info')).toBe(true)
      expect(targetEls[2].classList.contains('bg-danger')).toBe(true)

      triggerEl.click()
      expect(targetEls[0].classList.contains('bg-warning')).toBe(false)
      expect(targetEls[1].classList.contains('bg-info')).toBe(false)
      expect(targetEls[2].classList.contains('bg-danger')).toBe(false)
    })

    it('should toggle attribute on target element via data-bs-target', () => {
      fixtureEl.innerHTML = ['<button data-bs-toggle="toggler" data-bs-target="#target-fieldset"></button>', '<fieldset id="target-fieldset" data-bs-value="disabled" data-bs-attribute="disabled"></fieldset>'].join('')

      const triggerEl = fixtureEl.querySelector<HTMLElement>('[data-bs-toggle="toggler"]')!
      const targetEl = fixtureEl.querySelector<HTMLElement>('#target-fieldset')!

      triggerEl.click()
      expect(targetEl.getAttribute('disabled')).toEqual('disabled')

      triggerEl.click()
      expect(targetEl.hasAttribute('disabled')).toBe(false)
    })

    it('should toggle target element via href attribute as fallback', () => {
      fixtureEl.innerHTML = ['<a data-bs-toggle="toggler" href="#target-via-href"></a>', '<div id="target-via-href" data-bs-value="active" data-bs-attribute="class"></div>'].join('')

      const triggerEl = fixtureEl.querySelector<HTMLElement>('[data-bs-toggle="toggler"]')!
      const targetEl = fixtureEl.querySelector<HTMLElement>('#target-via-href')!

      triggerEl.click()
      expect(targetEl.classList.contains('active')).toBe(true)

      triggerEl.click()
      expect(targetEl.classList.contains('active')).toBe(false)
    })

    it('should work with the data-tblr- prefix', () => {
      fixtureEl.innerHTML = ['<button data-tblr-toggle="toggler" data-tblr-target="#target-tblr"></button>', '<div id="target-tblr" data-tblr-value="active"></div>'].join('')

      const triggerEl = fixtureEl.querySelector<HTMLElement>('[data-tblr-toggle="toggler"]')!
      const targetEl = fixtureEl.querySelector<HTMLElement>('#target-tblr')!

      triggerEl.click()
      expect(targetEl.classList.contains('active')).toBe(true)
    })

    it('should not toggle when the trigger is disabled', () => {
      fixtureEl.innerHTML = ['<button data-bs-toggle="toggler" data-bs-value="active" disabled></button>', '<a href="#" class="disabled" data-tblr-toggle="toggler" data-tblr-value="active"></a>'].join('')

      const buttonEl = fixtureEl.querySelector<HTMLElement>('button')!
      const linkEl = fixtureEl.querySelector<HTMLElement>('a')!

      buttonEl.click()
      linkEl.click()
      expect(buttonEl.classList.contains('active')).toBe(false)
      expect(linkEl.classList.contains('active')).toBe(false)
    })
  })
})
