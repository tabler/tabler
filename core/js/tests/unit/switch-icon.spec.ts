import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import SwitchIcon from '../../src/switch-icon'

type ToggleEvent = Event & { active: boolean; wait: (promise: Promise<unknown>) => void }

const tick = () => new Promise((resolve) => setTimeout(resolve, 0))

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

    it('should trigger toggle.bs.switch-icon before and change.bs.switch-icon after the change', () => {
      const instance = new SwitchIcon(button())
      const toggleSpy = vi.fn()
      const changeSpy = vi.fn()
      button().addEventListener('toggle.bs.switch-icon', toggleSpy)
      button().addEventListener('change.bs.switch-icon', changeSpy)

      instance.toggle()

      expect(toggleSpy).toHaveBeenCalledTimes(1)
      expect((toggleSpy.mock.calls[0][0] as ToggleEvent).active).toBe(true)
      expect(changeSpy).toHaveBeenCalledTimes(1)
      expect((changeSpy.mock.calls[0][0] as Event & { active: boolean }).active).toBe(true)
    })

    it('should not change when toggle.bs.switch-icon is prevented', () => {
      const instance = new SwitchIcon(button())
      const changeSpy = vi.fn()
      button().addEventListener('toggle.bs.switch-icon', (event) => event.preventDefault())
      button().addEventListener('change.bs.switch-icon', changeSpy)

      instance.toggle()

      expect(instance.isActive).toBe(false)
      expect(button().getAttribute('aria-pressed')).toBe('false')
      expect(changeSpy).not.toHaveBeenCalled()
    })
  })

  describe('wait', () => {
    it('should show the loading state until the promise resolves, then switch', async () => {
      const instance = new SwitchIcon(button())
      let resolve!: () => void
      button().addEventListener('toggle.bs.switch-icon', (event) => {
        ;(event as ToggleEvent).wait(new Promise<void>((r) => (resolve = r)))
      })

      instance.toggle()
      expect(instance.isLoading).toBe(true)
      expect(button().classList.contains('switch-icon-loading')).toBe(true)
      expect(button().getAttribute('aria-busy')).toBe('true')
      expect(instance.isActive).toBe(false)

      // a toggle while loading is ignored
      instance.toggle()
      expect(instance.isLoading).toBe(true)

      resolve()
      await tick()
      expect(instance.isLoading).toBe(false)
      expect(button().hasAttribute('aria-busy')).toBe(false)
      expect(instance.isActive).toBe(true)
      expect(button().getAttribute('aria-pressed')).toBe('true')
    })

    it('should keep the previous state when the promise rejects', async () => {
      const instance = new SwitchIcon(button())
      button().addEventListener('toggle.bs.switch-icon', (event) => {
        ;(event as ToggleEvent).wait(Promise.reject(new Error('nope')))
      })

      instance.toggle()
      expect(instance.isLoading).toBe(true)

      await tick()
      expect(instance.isLoading).toBe(false)
      expect(instance.isActive).toBe(false)
      expect(button().getAttribute('aria-pressed')).toBe('false')
    })

    it('should ignore a toggle on a button rendered in the loading state', () => {
      fixtureEl.innerHTML = '<button type="button" class="switch-icon switch-icon-loading" data-bs-toggle="switch-icon" aria-pressed="false"></button>'
      const instance = new SwitchIcon(button())

      instance.toggle()

      expect(instance.isActive).toBe(false)
    })
  })

  describe('wrapping button', () => {
    beforeEach(() => {
      fixtureEl.innerHTML = '<button type="button" class="btn btn-action" data-bs-toggle="switch-icon" aria-pressed="false"><span class="switch-icon"></span></button>'
    })

    const icon = (): HTMLElement => fixtureEl.querySelector('.switch-icon')!

    it('should toggle the inner switch-icon and keep aria-pressed on the button', () => {
      const instance = new SwitchIcon(button())

      instance.toggle()

      expect(icon().classList.contains('active')).toBe(true)
      expect(button().classList.contains('active')).toBe(false)
      expect(button().getAttribute('aria-pressed')).toBe('true')
      expect(instance.isActive).toBe(true)
    })

    it('should put the loading class on the inner switch-icon and aria-busy on the button', async () => {
      const instance = new SwitchIcon(button())
      let resolve!: () => void
      button().addEventListener('toggle.bs.switch-icon', (event) => {
        ;(event as ToggleEvent).wait(new Promise<void>((r) => (resolve = r)))
      })

      instance.toggle()
      expect(icon().classList.contains('switch-icon-loading')).toBe(true)
      expect(button().classList.contains('switch-icon-loading')).toBe(false)
      expect(button().getAttribute('aria-busy')).toBe('true')

      resolve()
      await tick()
      expect(icon().classList.contains('active')).toBe(true)
      expect(button().hasAttribute('aria-busy')).toBe(false)
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

    it('should ignore clicks on a button with the disabled class or aria-disabled', () => {
      fixtureEl.innerHTML = '<button type="button" class="switch-icon disabled" data-bs-toggle="switch-icon" aria-pressed="false"></button>'
      new SwitchIcon(button())

      button().click()
      expect(button().classList.contains('active')).toBe(false)

      button().classList.remove('disabled')
      button().setAttribute('aria-disabled', 'true')
      button().click()
      expect(button().classList.contains('active')).toBe(false)
    })

    it('should stop toggling after dispose', () => {
      const instance = new SwitchIcon(button())
      instance.dispose()

      button().click()

      expect(button().classList.contains('active')).toBe(false)
      expect(SwitchIcon.getInstance(button())).toBeNull()
    })
  })

  describe('dispose while waiting', () => {
    it('ignores a wait() that settles after dispose', async () => {
      const instance = new SwitchIcon(button())
      let settle!: () => void
      button().addEventListener('toggle.bs.switch-icon', (event) => {
        ;(event as ToggleEvent).wait(new Promise<void>((resolve) => (settle = resolve)))
      })
      instance.toggle()
      const element = button()

      instance.dispose()
      settle()
      await tick()

      expect(element.classList.contains('switch-icon-loading')).toBe(false)
    })
  })
})
