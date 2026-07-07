import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import Toast from '../../src/bootstrap/toast'
import { clearFixture, createEvent, getFixture } from '../helpers/fixture'

describe('Toast', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
  })

  describe('VERSION', () => {
    it('should return plugin version', () => {
      expect(typeof Toast.VERSION).toBe('string')
    })
  })

  describe('DATA_KEY', () => {
    it('should return plugin data key', () => {
      expect(Toast.DATA_KEY).toBe('bs.toast')
    })
  })

  describe('constructor', () => {
    it('should accept element as CSS selector or DOM element', () => {
      fixtureEl.innerHTML = '<div class="toast"></div>'

      const toastEl = fixtureEl.querySelector('.toast')!
      const toastBySelector = new Toast('.toast')
      const toastByElement = new Toast(toastEl)

      expect(toastBySelector._element).toBe(toastEl)
      expect(toastByElement._element).toBe(toastEl)
    })

    it('should allow config in js', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="toast">',
          '  <div class="toast-body">a simple toast</div>',
          '</div>'
        ].join('')

        const toastEl = fixtureEl.querySelector('div')!
        const toast = new Toast(toastEl, { delay: 1 })

        toastEl.addEventListener('shown.bs.toast', () => {
          expect(toastEl.classList.contains('show')).toBe(true)
          resolve()
        })

        toast.show()
      })
    })

    it('should close toast when dismiss button is clicked', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="toast" data-bs-delay="1" data-bs-autohide="false" data-bs-animation="false">',
          '  <button type="button" class="btn-close" data-bs-dismiss="toast"></button>',
          '</div>'
        ].join('')

        const toastEl = fixtureEl.querySelector('div')!
        const toast = new Toast(toastEl)

        toastEl.addEventListener('shown.bs.toast', () => {
          expect(toastEl.classList.contains('show')).toBe(true)
          const button = toastEl.querySelector('.btn-close') as HTMLElement
          button.click()
        })

        toastEl.addEventListener('hidden.bs.toast', () => {
          expect(toastEl.classList.contains('show')).toBe(false)
          resolve()
        })

        toast.show()
      })
    })

    it('should close toast via data-tblr-dismiss', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="toast" data-bs-delay="1" data-bs-autohide="false" data-bs-animation="false">',
          '  <button type="button" class="btn-close" data-tblr-dismiss="toast"></button>',
          '</div>'
        ].join('')

        const toastEl = fixtureEl.querySelector('div')!
        const toast = new Toast(toastEl)

        toastEl.addEventListener('shown.bs.toast', () => {
          expect(toastEl.classList.contains('show')).toBe(true)
          const button = toastEl.querySelector('.btn-close') as HTMLElement
          button.click()
        })

        toastEl.addEventListener('hidden.bs.toast', () => {
          expect(toastEl.classList.contains('show')).toBe(false)
          resolve()
        })

        toast.show()
      })
    })
  })

  describe('Default', () => {
    it('should expose default settings', () => {
      const defaultDelay = 1000
      const origDelay = Toast.Default.delay

      Toast.Default.delay = defaultDelay

      fixtureEl.innerHTML = [
        '<div class="toast" data-bs-autohide="false" data-bs-animation="false">',
        '  <button type="button" class="btn-close" data-bs-dismiss="toast"></button>',
        '</div>'
      ].join('')

      const toastEl = fixtureEl.querySelector('div')!
      const toast = new Toast(toastEl)

      expect(toast._config.delay).toBe(defaultDelay)

      Toast.Default.delay = origDelay
    })
  })

  describe('DefaultType', () => {
    it('should expose default setting types', () => {
      expect(typeof Toast.DefaultType).toBe('object')
    })
  })

  describe('show', () => {
    it('should auto hide', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="toast" data-bs-delay="1">',
          '  <div class="toast-body">a simple toast</div>',
          '</div>'
        ].join('')

        const toastEl = fixtureEl.querySelector('.toast')!
        const toast = new Toast(toastEl)

        toastEl.addEventListener('hidden.bs.toast', () => {
          expect(toastEl.classList.contains('show')).toBe(false)
          resolve()
        })

        toast.show()
      })
    })

    it('should not add fade class when animation is false', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="toast" data-bs-delay="1" data-bs-animation="false">',
          '  <div class="toast-body">a simple toast</div>',
          '</div>'
        ].join('')

        const toastEl = fixtureEl.querySelector('.toast')!
        const toast = new Toast(toastEl)

        toastEl.addEventListener('shown.bs.toast', () => {
          expect(toastEl.classList.contains('fade')).toBe(false)
          resolve()
        })

        toast.show()
      })
    })

    it('should not trigger shown if show is prevented', () => {
      return new Promise<void>((resolve, reject) => {
        fixtureEl.innerHTML = [
          '<div class="toast" data-bs-delay="1" data-bs-animation="false">',
          '  <div class="toast-body">a simple toast</div>',
          '</div>'
        ].join('')

        const toastEl = fixtureEl.querySelector('.toast')!
        const toast = new Toast(toastEl)

        toastEl.addEventListener('show.bs.toast', event => {
          event.preventDefault()
          setTimeout(() => {
            expect(toastEl.classList.contains('show')).toBe(false)
            resolve()
          }, 20)
        })

        toastEl.addEventListener('shown.bs.toast', () => {
          reject(new Error('shown should not fire'))
        })

        toast.show()
      })
    })

    it('should clear timeout on mouse interaction', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="toast">',
          '  <div class="toast-body">a simple toast</div>',
          '</div>'
        ].join('')

        const toastEl = fixtureEl.querySelector('.toast')!
        const toast = new Toast(toastEl)

        toastEl.addEventListener('shown.bs.toast', () => {
          const clearSpy = vi.spyOn(toast, '_clearTimeout' as any)

          toastEl.dispatchEvent(createEvent('mouseover'))

          setTimeout(() => {
            expect(clearSpy).toHaveBeenCalled()
            expect(toast._timeout).toBeNull()
            resolve()
          }, 10)
        })

        toast.show()
      })
    })

    it('should clear timeout on keyboard interaction', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<button id="outside">outside</button>',
          '<div class="toast">',
          '  <div class="toast-body">a simple toast <button>inside</button></div>',
          '</div>'
        ].join('')

        const toastEl = fixtureEl.querySelector('.toast')!
        const toast = new Toast(toastEl)

        toastEl.addEventListener('shown.bs.toast', () => {
          const clearSpy = vi.spyOn(toast, '_clearTimeout' as any)
          const insideBtn = toastEl.querySelector('button')!

          insideBtn.focus()

          setTimeout(() => {
            expect(clearSpy).toHaveBeenCalled()
            expect(toast._timeout).toBeNull()
            resolve()
          }, 10)
        })

        toast.show()
      })
    })

    it('should still auto hide after mouse and keyboard leave', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<button id="outside-focusable">outside</button>',
          '<div class="toast">',
          '  <div class="toast-body">a simple toast <button>inside</button></div>',
          '</div>'
        ].join('')

        const toastEl = fixtureEl.querySelector('.toast')!
        const toast = new Toast(toastEl)

        toastEl.addEventListener('shown.bs.toast', () => {
          toastEl.dispatchEvent(createEvent('mouseover'))

          const insideBtn = toastEl.querySelector('button')!
          insideBtn.focus()

          const mouseOutEvent = new MouseEvent('mouseout', { bubbles: true, relatedTarget: document.querySelector('#outside-focusable') })
          toastEl.dispatchEvent(mouseOutEvent)

          const outsideFocusable = document.querySelector('#outside-focusable') as HTMLElement
          outsideFocusable.focus()

          setTimeout(() => {
            expect(toast._timeout).not.toBeNull()
            resolve()
          }, 10)
        })

        toast.show()
      })
    })

    it('should not auto hide if focus leaves but mouse remains inside', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<button id="outside-focusable">outside</button>',
          '<div class="toast">',
          '  <div class="toast-body">a simple toast <button>inside</button></div>',
          '</div>'
        ].join('')

        const toastEl = fixtureEl.querySelector('.toast')!
        const toast = new Toast(toastEl)

        toastEl.addEventListener('shown.bs.toast', () => {
          toastEl.dispatchEvent(createEvent('mouseover'))

          const insideBtn = toastEl.querySelector('button')!
          insideBtn.focus()

          const outsideFocusable = document.querySelector('#outside-focusable') as HTMLElement
          outsideFocusable.focus()

          setTimeout(() => {
            expect(toast._timeout).toBeNull()
            resolve()
          }, 10)
        })

        toast.show()
      })
    })

    it('should not auto hide if mouse leaves but focus remains inside', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<button id="outside-focusable">outside</button>',
          '<div class="toast">',
          '  <div class="toast-body">a simple toast <button>inside</button></div>',
          '</div>'
        ].join('')

        const toastEl = fixtureEl.querySelector('.toast')!
        const toast = new Toast(toastEl)

        toastEl.addEventListener('shown.bs.toast', () => {
          toastEl.dispatchEvent(createEvent('mouseover'))

          const insideBtn = toastEl.querySelector('button')!
          insideBtn.focus()

          const mouseOutEvent = new MouseEvent('mouseout', { bubbles: true, relatedTarget: document.querySelector('#outside-focusable') })
          toastEl.dispatchEvent(mouseOutEvent)

          setTimeout(() => {
            expect(toast._timeout).toBeNull()
            resolve()
          }, 10)
        })

        toast.show()
      })
    })

    it('should handle _onInteraction with unknown event type', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="toast">',
          '  <div class="toast-body">a simple toast</div>',
          '</div>'
        ].join('')

        const toastEl = fixtureEl.querySelector('.toast')!
        const toast = new Toast(toastEl)

        toastEl.addEventListener('shown.bs.toast', () => {
          const scheduleSpy = vi.spyOn(toast, '_maybeScheduleHide' as any)

          toast._onInteraction(createEvent('click'), false)

          expect(toast._hasMouseInteraction).toBe(false)
          expect(toast._hasKeyboardInteraction).toBe(false)
          expect(scheduleSpy).toHaveBeenCalled()
          resolve()
        })

        toast.show()
      })
    })

    it('should not schedule hide when relatedTarget is within the toast', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<button id="outside-focusable">outside</button>',
          '<div class="toast">',
          '  <div class="toast-body">a simple toast <button id="inside-btn">inside</button></div>',
          '</div>'
        ].join('')

        const toastEl = fixtureEl.querySelector('.toast')!
        const insideBtn = toastEl.querySelector('#inside-btn')!
        const toast = new Toast(toastEl)

        toastEl.addEventListener('shown.bs.toast', () => {
          const scheduleSpy = vi.spyOn(toast, '_maybeScheduleHide' as any)

          const focusOutEvent = new FocusEvent('focusout', {
            bubbles: true,
            relatedTarget: insideBtn
          })
          toast._onInteraction(focusOutEvent, false)

          expect(scheduleSpy).not.toHaveBeenCalled()
          resolve()
        })

        toast.show()
      })
    })
  })

  describe('hide', () => {
    it('should allow to hide toast manually', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="toast" data-bs-delay="1" data-bs-autohide="false">',
          '  <div class="toast-body">a simple toast</div>',
          '</div>'
        ].join('')

        const toastEl = fixtureEl.querySelector('.toast')!
        const toast = new Toast(toastEl)

        toastEl.addEventListener('shown.bs.toast', () => {
          toast.hide()
        })

        toastEl.addEventListener('hidden.bs.toast', () => {
          expect(toastEl.classList.contains('show')).toBe(false)
          resolve()
        })

        toast.show()
      })
    })

    it('should do nothing on a non shown toast', () => {
      fixtureEl.innerHTML = '<div></div>'

      const toastEl = fixtureEl.querySelector('div')!
      const toast = new Toast(toastEl)
      const spy = vi.spyOn(toastEl.classList, 'contains')

      toast.hide()

      expect(spy).toHaveBeenCalled()
    })

    it('should not trigger hidden if hide is prevented', () => {
      return new Promise<void>((resolve, reject) => {
        fixtureEl.innerHTML = [
          '<div class="toast" data-bs-delay="1" data-bs-animation="false">',
          '  <div class="toast-body">a simple toast</div>',
          '</div>'
        ].join('')

        const toastEl = fixtureEl.querySelector('.toast')!
        const toast = new Toast(toastEl)

        toastEl.addEventListener('shown.bs.toast', () => {
          toast.hide()
        })

        toastEl.addEventListener('hide.bs.toast', event => {
          event.preventDefault()
          setTimeout(() => {
            expect(toastEl.classList.contains('show')).toBe(true)
            resolve()
          }, 20)
        })

        toastEl.addEventListener('hidden.bs.toast', () => {
          reject(new Error('hidden should not fire'))
        })

        toast.show()
      })
    })
  })

  describe('dispose', () => {
    it('should allow to destroy toast', () => {
      fixtureEl.innerHTML = '<div></div>'

      const toastEl = fixtureEl.querySelector('div')!
      const toast = new Toast(toastEl)

      expect(Toast.getInstance(toastEl)).not.toBeNull()

      toast.dispose()

      expect(Toast.getInstance(toastEl)).toBeNull()
    })

    it('should destroy and hide shown toast', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="toast" data-bs-delay="0" data-bs-autohide="false">',
          '  <div class="toast-body">a simple toast</div>',
          '</div>'
        ].join('')

        const toastEl = fixtureEl.querySelector('div')!
        const toast = new Toast(toastEl)

        toastEl.addEventListener('shown.bs.toast', () => {
          setTimeout(() => {
            expect(toastEl.classList.contains('show')).toBe(true)
            expect(Toast.getInstance(toastEl)).not.toBeNull()

            toast.dispose()

            expect(Toast.getInstance(toastEl)).toBeNull()
            expect(toastEl.classList.contains('show')).toBe(false)
            resolve()
          }, 1)
        })

        toast.show()
      })
    })
  })

  describe('getInstance', () => {
    it('should return toast instance', () => {
      fixtureEl.innerHTML = '<div></div>'

      const div = fixtureEl.querySelector('div')!
      const toast = new Toast(div)

      expect(Toast.getInstance(div)).toBe(toast)
      expect(Toast.getInstance(div)).toBeInstanceOf(Toast)
    })

    it('should return null when there is no toast instance', () => {
      fixtureEl.innerHTML = '<div></div>'
      const div = fixtureEl.querySelector('div')!
      expect(Toast.getInstance(div)).toBeNull()
    })
  })

  describe('getOrCreateInstance', () => {
    it('should return toast instance', () => {
      fixtureEl.innerHTML = '<div></div>'

      const div = fixtureEl.querySelector('div')!
      const toast = new Toast(div)

      expect(Toast.getOrCreateInstance(div)).toBe(toast)
      expect(Toast.getOrCreateInstance(div)).toBeInstanceOf(Toast)
    })

    it('should return new instance when there is no toast instance', () => {
      fixtureEl.innerHTML = '<div></div>'
      const div = fixtureEl.querySelector('div')!

      expect(Toast.getInstance(div)).toBeNull()
      expect(Toast.getOrCreateInstance(div)).toBeInstanceOf(Toast)
    })

    it('should return new instance with given configuration', () => {
      fixtureEl.innerHTML = '<div></div>'
      const div = fixtureEl.querySelector('div')!

      const toast = Toast.getOrCreateInstance(div, { delay: 1 })
      expect(toast).toBeInstanceOf(Toast)
      expect(toast._config.delay).toBe(1)
    })

    it('should return existing instance ignoring new configuration', () => {
      fixtureEl.innerHTML = '<div></div>'
      const div = fixtureEl.querySelector('div')!

      const toast = new Toast(div, { delay: 1 })
      const toast2 = Toast.getOrCreateInstance(div, { delay: 2 })

      expect(toast2).toBe(toast)
      expect(toast2._config.delay).toBe(1)
    })
  })
})
