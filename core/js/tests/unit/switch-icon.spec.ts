import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import SwitchIcon from '../../src/switch-icon'

describe('SwitchIcon', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  beforeEach(() => {
    fixtureEl.innerHTML = '<div id="parent"><button type="button" class="switch-icon" data-bs-toggle="switch-icon" aria-pressed="false"></button></div>'
  })

  afterEach(() => {
    clearFixture()
  })

  const button = (): HTMLButtonElement => fixtureEl.querySelector('button')!

  describe('NAME', () => {
    it('should return plugin name', () => {
      expect(SwitchIcon.NAME).toBe('switch-icon')
    })
  })

  describe('constructor', () => {
    it('should set aria-pressed from the active class when missing', () => {
      fixtureEl.innerHTML = '<button type="button" class="switch-icon active" data-bs-toggle="switch-icon"></button>'

      new SwitchIcon(button())

      expect(button().getAttribute('aria-pressed')).toBe('true')
    })

    it('should keep an existing aria-pressed value', () => {
      new SwitchIcon(button())

      expect(button().getAttribute('aria-pressed')).toBe('false')
    })
  })

  describe('toggle', () => {
    it('should toggle the active class and aria-pressed', () => {
      const instance = new SwitchIcon(button())

      instance.toggle()
      expect(button().classList.contains('active')).toBe(true)
      expect(button().getAttribute('aria-pressed')).toBe('true')
      expect(instance.isActive).toBe(true)

      instance.toggle()
      expect(button().classList.contains('active')).toBe(false)
      expect(button().getAttribute('aria-pressed')).toBe('false')
    })

    it('should force the state with an argument', () => {
      const instance = new SwitchIcon(button())

      instance.toggle(true)
      instance.toggle(true)

      expect(instance.isActive).toBe(true)
    })

    it('should trigger change.bs.switch-icon with the new state', () => {
      const instance = new SwitchIcon(button())
      const spy = vi.fn()
      button().addEventListener('change.bs.switch-icon', spy)

      instance.toggle()

      expect(spy).toHaveBeenCalledTimes(1)
      expect((spy.mock.calls[0][0] as Event & { active: boolean }).active).toBe(true)
    })
  })

  describe('click', () => {
    it('should toggle on click and stop propagation', () => {
      new SwitchIcon(button())
      const parentSpy = vi.fn()
      fixtureEl.querySelector('#parent')!.addEventListener('click', parentSpy)

      button().click()

      expect(button().classList.contains('active')).toBe(true)
      expect(parentSpy).not.toHaveBeenCalled()
    })

    it('should stop toggling after dispose', () => {
      const instance = new SwitchIcon(button())
      instance.dispose()

      button().click()

      expect(button().classList.contains('active')).toBe(false)
      expect(SwitchIcon.getInstance(button())).toBeNull()
    })
  })
})
