import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import Modal from '../../src/bootstrap/modal'
import { clearFixture, getFixture } from '../helpers/fixture'

describe('Modal', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
    vi.restoreAllMocks()
    document.body.classList.remove('modal-open')
    for (const el of document.querySelectorAll('.modal-backdrop')) {
      el.remove()
    }
  })

  const createModalHTML = () =>
    [
      '<div class="modal" tabindex="-1">',
      '  <div class="modal-dialog">',
      '    <div class="modal-content">',
      '      <div class="modal-header">',
      '        <h5 class="modal-title">Modal</h5>',
      '        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>',
      '      </div>',
      '      <div class="modal-body"><p>Content</p></div>',
      '    </div>',
      '  </div>',
      '</div>',
    ].join('')

  describe('VERSION', () => {
    it('should return plugin version', () => {
      expect(typeof Modal.VERSION).toBe('string')
    })
  })

  describe('Default', () => {
    it('should return plugin default config', () => {
      expect(Modal.Default).toBeDefined()
      expect(Modal.Default.backdrop).toBe(true)
      expect(Modal.Default.focus).toBe(true)
      expect(Modal.Default.keyboard).toBe(true)
    })
  })

  describe('DefaultType', () => {
    it('should return plugin default type config', () => {
      expect(Modal.DefaultType).toBeDefined()
      expect(Modal.DefaultType.backdrop).toBe('(boolean|string)')
    })
  })

  describe('NAME', () => {
    it('should return plugin name', () => {
      expect(Modal.NAME).toBe('modal')
    })
  })

  describe('constructor', () => {
    it('should create modal instance', () => {
      fixtureEl.innerHTML = createModalHTML()
      const modalEl = fixtureEl.querySelector('.modal')!
      const modal = new Modal(modalEl)

      expect(modal).toBeInstanceOf(Modal)
      expect(Modal.getInstance(modalEl)).toBe(modal)
    })

    it('should find dialog element', () => {
      fixtureEl.innerHTML = createModalHTML()
      const modalEl = fixtureEl.querySelector('.modal')!
      const modal = new Modal(modalEl)

      expect(modal._dialog).not.toBeNull()
    })
  })

  describe('toggle', () => {
    it('should show when hidden', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          expect(modal._isShown).toBe(true)
          resolve()
        })

        modal.toggle()
      })
    })

    it('should hide when shown', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.addEventListener('hidden.bs.modal', () => {
            expect(modal._isShown).toBe(false)
            resolve()
          })

          modal.toggle()
        })

        modal.show()
      })
    })
  })

  describe('show', () => {
    it('should show modal', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          expect(modal._isShown).toBe(true)
          expect(modalEl.classList.contains('show')).toBe(true)
          expect(modalEl.getAttribute('aria-modal')).toBe('true')
          expect(modalEl.getAttribute('role')).toBe('dialog')
          expect(document.body.classList.contains('modal-open')).toBe(true)
          resolve()
        })

        modal.show()
      })
    })

    it('should not show if already shown', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          modal.show()
          setTimeout(() => {
            expect(modal._isShown).toBe(true)
            resolve()
          }, 30)
        })

        modal.show()
      })
    })

    it('should not show if show event is prevented', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl)

        modalEl.addEventListener('show.bs.modal', (event) => {
          event.preventDefault()
          setTimeout(() => {
            expect(modal._isShown).toBe(false)
            resolve()
          }, 30)
        })

        modal.show()
      })
    })

    it('should pass relatedTarget in show event', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML() + '<button id="trigger">Open</button>'
        const modalEl = fixtureEl.querySelector('.modal')!
        const trigger = fixtureEl.querySelector('#trigger') as HTMLElement
        const modal = new Modal(modalEl)

        modalEl.addEventListener('show.bs.modal', (event: any) => {
          expect(event.relatedTarget).toBe(trigger)
          resolve()
        })

        modal.show(trigger)
      })
    })
  })

  describe('return focus', () => {
    const open = (trigger: HTMLElement, el: Element, instance: Modal, via: 'active' | 'related') =>
      new Promise<void>((resolve) => {
        el.addEventListener('shown.bs.modal', () => resolve(), { once: true })
        trigger.focus()
        instance.show(via === 'related' ? trigger : undefined)
      })

    const close = (el: Element, instance: Modal) =>
      new Promise<void>((resolve) => {
        el.addEventListener('hidden.bs.modal', () => resolve(), { once: true })
        instance.hide()
      })

    const setup = () => {
      fixtureEl.innerHTML = `<button id="trigger">Open</button><button id="other">Other</button>${createModalHTML()}`
      const el = fixtureEl.querySelector('.modal')!
      return {
        el,
        instance: new Modal(el),
        trigger: fixtureEl.querySelector<HTMLElement>('#trigger')!,
        other: fixtureEl.querySelector<HTMLElement>('#other')!,
      }
    }

    it('should focus the previously focused element on hide without scrolling', async () => {
      const { el, instance, trigger } = setup()

      await open(trigger, el, instance, 'active')
      const focus = vi.spyOn(trigger, 'focus')
      await close(el, instance)

      expect(document.activeElement).toBe(trigger)
      expect(focus).toHaveBeenCalledExactlyOnceWith({ preventScroll: true })
    })

    it('should focus the relatedTarget on hide', async () => {
      const { el, instance, trigger } = setup()

      await open(trigger, el, instance, 'related')
      trigger.blur()
      await close(el, instance)

      expect(document.activeElement).toBe(trigger)
    })

    it('should not steal focus when the app moved it elsewhere', async () => {
      const { el, instance, trigger, other } = setup()

      await open(trigger, el, instance, 'active')
      el.addEventListener('hidden.bs.modal', () => other.focus(), { once: true })
      await close(el, instance)

      expect(document.activeElement).toBe(other)
    })

    it('should focus a previously focused SVG element on hide', async () => {
      const { el, instance } = setup()
      fixtureEl.insertAdjacentHTML('afterbegin', '<svg id="svg-trigger" tabindex="0" width="16" height="16"><rect width="16" height="16" /></svg>')
      const svg = fixtureEl.querySelector<SVGSVGElement>('#svg-trigger')!

      await new Promise<void>((resolve) => {
        el.addEventListener('shown.bs.modal', () => resolve(), { once: true })
        svg.focus()
        instance.show()
      })
      await close(el, instance)

      expect(document.activeElement).toBe(svg)
    })

    it('should restore focus when a hidden listener disposes the instance', async () => {
      const { el, instance, trigger } = setup()

      await open(trigger, el, instance, 'active')
      el.addEventListener('hidden.bs.modal', () => instance.dispose(), { once: true })
      await close(el, instance)

      expect(document.activeElement).toBe(trigger)
    })

    it('should not restore focus when a hidden listener opens a new instance', async () => {
      const { el, instance, trigger, other } = setup()
      const focusTrigger = vi.spyOn(trigger, 'focus')
      let replacement: Modal | undefined

      await open(trigger, el, instance, 'active')
      const reopened = new Promise<void>((resolve) => {
        el.addEventListener('shown.bs.modal', () => resolve(), { once: true })
      })
      el.addEventListener(
        'hidden.bs.modal',
        () => {
          instance.dispose()
          replacement = new Modal(el)
          replacement.show(other)
        },
        { once: true },
      )
      focusTrigger.mockClear()
      await close(el, instance)

      expect(focusTrigger).not.toHaveBeenCalled()

      await reopened
      await close(el, replacement!)

      expect(document.activeElement).toBe(other)
    })

    it('should keep the new target when a hidden listener reopens it', async () => {
      const { el, instance, trigger, other } = setup()

      await open(trigger, el, instance, 'active')
      const reopened = new Promise<void>((resolve) => {
        el.addEventListener('shown.bs.modal', () => resolve(), { once: true })
      })
      el.addEventListener('hidden.bs.modal', () => instance.show(other), { once: true })
      await close(el, instance)
      await reopened
      await close(el, instance)

      expect(document.activeElement).toBe(other)
    })

    it('should unwrap a jQuery trigger', async () => {
      const { el, instance, trigger } = setup()

      await new Promise<void>((resolve) => {
        el.addEventListener('shown.bs.modal', () => resolve(), { once: true })
        instance.show({ jquery: '3.7.1', 0: trigger, length: 1 } as never)
      })
      await close(el, instance)

      expect(document.activeElement).toBe(trigger)
    })

    it('should ignore the modal itself as the trigger', async () => {
      const { el, instance, trigger } = setup()

      await new Promise<void>((resolve) => {
        el.addEventListener('shown.bs.modal', () => resolve(), { once: true })
        trigger.focus()
        instance.show(el as HTMLElement)
      })
      await close(el, instance)

      expect(document.activeElement).toBe(trigger)
    })

    it('should ignore show during the backdrop hide and allow reopening after hidden', async () => {
      fixtureEl.innerHTML = `<button id="trigger">Open</button><button id="other">Other</button>${createModalHTML().replace('class="modal"', 'class="modal fade"')}`
      const el = fixtureEl.querySelector<HTMLElement>('.modal')!
      const instance = new Modal(el)
      const trigger = fixtureEl.querySelector<HTMLElement>('#trigger')!
      const other = fixtureEl.querySelector<HTMLElement>('#other')!

      await open(trigger, el, instance, 'active')
      const hideBackdrop = instance._backdrop.hide.bind(instance._backdrop)
      const show = vi.fn()
      el.addEventListener('show.bs.modal', show)
      vi.spyOn(instance._backdrop, 'hide').mockImplementationOnce((callback) => {
        hideBackdrop(callback)
        instance.show(other)
        expect(show).not.toHaveBeenCalled()
      })
      await close(el, instance)
      expect(document.activeElement).toBe(trigger)

      await open(other, el, instance, 'related')
      expect(document.body.classList.contains('modal-open')).toBe(true)
      expect(document.querySelector('.modal-backdrop')).not.toBeNull()
      await close(el, instance)

      expect(document.activeElement).toBe(other)
    })

    it('should focus the Data API trigger on hide', async () => {
      fixtureEl.innerHTML = `<button data-tblr-toggle="modal" data-tblr-target="#testModal">Open</button>${createModalHTML().replace('class="modal"', 'class="modal" id="testModal"')}`
      const el = fixtureEl.querySelector<HTMLElement>('#testModal')!
      const btn = fixtureEl.querySelector<HTMLElement>('[data-tblr-toggle="modal"]')!

      await new Promise<void>((resolve) => {
        el.addEventListener('shown.bs.modal', () => resolve(), { once: true })
        btn.click()
      })
      await close(el, Modal.getInstance(el) as Modal)

      expect(document.activeElement).toBe(btn)
    })
  })

  describe('hide', () => {
    it('should hide modal', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          modal.hide()
        })

        modalEl.addEventListener('hidden.bs.modal', () => {
          expect(modal._isShown).toBe(false)
          expect(modalEl.style.display).toBe('none')
          expect(modalEl.getAttribute('aria-hidden')).toBe('true')
          resolve()
        })

        modal.show()
      })
    })

    it('should not hide if not shown', () => {
      fixtureEl.innerHTML = createModalHTML()
      const modalEl = fixtureEl.querySelector('.modal')!
      const modal = new Modal(modalEl)

      modal.hide()
      expect(modal._isShown).toBe(false)
    })

    it('should not hide if hide event is prevented', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.addEventListener('hide.bs.modal', (event) => {
            event.preventDefault()
            setTimeout(() => {
              expect(modal._isShown).toBe(true)
              resolve()
            }, 30)
          })

          modal.hide()
        })

        modal.show()
      })
    })
  })

  describe('dispose', () => {
    it('should dispose modal', () => {
      fixtureEl.innerHTML = createModalHTML()
      const modalEl = fixtureEl.querySelector('.modal')!
      const modal = new Modal(modalEl)

      modal.dispose()
      expect(Modal.getInstance(modalEl)).toBeNull()
    })

    it.each(['unused', 'opening backdrop', 'opening dialog', 'shown', 'backdrop feedback', 'closing dialog', 'closing backdrop', 'hidden'])('should restore its own body and ignore pending callbacks when %s', (phase) => {
      const oldBody = document.body
      const originalStyle = oldBody.style.cssText
      oldBody.style.overflow = 'auto'
      oldBody.style.paddingRight = '12px'
      fixtureEl.innerHTML = createModalHTML().replace('class="modal"', 'class="modal fade"')
      const el = fixtureEl.querySelector<HTMLElement>('.modal')!
      const dialog = el.querySelector<HTMLElement>('.modal-dialog')!
      const instance = new Modal(el, { backdrop: 'static' })
      vi.useFakeTimers()

      try {
        // Step through each transition, leaving its fallback timer pending.
        if (phase !== 'unused') {
          instance.show()
          const backdrop = oldBody.querySelector<HTMLElement>('.modal-backdrop')!
          if (phase !== 'opening backdrop') backdrop.dispatchEvent(new Event('transitionend'))
          if (!['opening backdrop', 'opening dialog'].includes(phase)) dialog.dispatchEvent(new Event('transitionend'))
          if (phase.startsWith('closing') || phase === 'hidden') instance.hide()
          if (['closing backdrop', 'hidden'].includes(phase)) el.dispatchEvent(new Event('transitionend'))
          if (phase === 'hidden') backdrop.dispatchEvent(new Event('transitionend'))
          if (phase === 'backdrop feedback') {
            el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
            el.click()
            expect(el.classList.contains('modal-static')).toBe(true)
          }
        }

        const shown = vi.fn()
        const hidden = vi.fn()
        el.addEventListener('shown.bs.modal', shown)
        el.addEventListener('hidden.bs.modal', hidden)
        const newBody = document.createElement('body')
        newBody.className = 'modal-open'
        newBody.style.cssText = 'overflow: scroll; padding-right: 24px'
        const input = document.createElement('input')
        newBody.append(input)
        oldBody.replaceWith(newBody)
        input.focus()

        instance.dispose()
        vi.runAllTimers()

        expect(Modal.getInstance(el)).toBeNull()
        expect(el.isConnected).toBe(false)
        expect(el.classList.contains('show')).toBe(false)
        expect(el.classList.contains('modal-static')).toBe(false)
        expect(el.style.overflowY).toBe('')
        expect(oldBody.querySelector('.modal-backdrop')).toBeNull()
        expect(oldBody.classList.contains('modal-open')).toBe(false)
        expect(oldBody.style.overflow).toBe('auto')
        expect(oldBody.style.paddingRight).toBe('12px')
        expect(newBody.classList.contains('modal-open')).toBe(true)
        expect(newBody.style.overflow).toBe('scroll')
        expect(newBody.style.paddingRight).toBe('24px')
        expect(newBody.childElementCount).toBe(1)
        expect(document.activeElement).toBe(input)
        expect(shown).not.toHaveBeenCalled()
        expect(hidden).not.toHaveBeenCalled()
      } finally {
        Modal.getInstance(el)?.dispose()
        vi.useRealTimers()
        if (document.body !== oldBody) document.body.replaceWith(oldBody)
        oldBody.style.cssText = originalStyle
      }
    })
  })

  describe('handleUpdate', () => {
    it('should call _adjustDialog', () => {
      fixtureEl.innerHTML = createModalHTML()
      const modalEl = fixtureEl.querySelector('.modal')!
      const modal = new Modal(modalEl)

      const spy = vi.spyOn(modal, '_adjustDialog')
      modal.handleUpdate()
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('_isAnimated', () => {
    it('should return true when fade class is present', () => {
      fixtureEl.innerHTML = '<div class="modal fade"><div class="modal-dialog"></div></div>'
      const modalEl = fixtureEl.querySelector('.modal')!
      const modal = new Modal(modalEl)

      expect(modal._isAnimated()).toBe(true)
    })

    it('should return false without fade class', () => {
      fixtureEl.innerHTML = createModalHTML()
      const modalEl = fixtureEl.querySelector('.modal')!
      const modal = new Modal(modalEl)

      expect(modal._isAnimated()).toBe(false)
    })
  })

  describe('keyboard', () => {
    it('should close on Escape when keyboard is true', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl, { keyboard: true })

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.addEventListener('hidden.bs.modal', () => {
            expect(modal._isShown).toBe(false)
            resolve()
          })

          modalEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
        })

        modal.show()
      })
    })

    it('should not close on Escape when keyboard is false', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl, { keyboard: false })

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))

          setTimeout(() => {
            expect(modal._isShown).toBe(true)
            resolve()
          }, 30)
        })

        modal.show()
      })
    })

    it('should ignore non-Escape keys', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))

          setTimeout(() => {
            expect(modal._isShown).toBe(true)
            resolve()
          }, 30)
        })

        modal.show()
      })
    })
  })

  describe('getInstance', () => {
    it('should return null if no instance', () => {
      expect(Modal.getInstance(fixtureEl)).toBeNull()
    })

    it('should return modal instance', () => {
      fixtureEl.innerHTML = createModalHTML()
      const modalEl = fixtureEl.querySelector('.modal')!
      const modal = new Modal(modalEl)

      expect(Modal.getInstance(modalEl)).toBe(modal)
    })
  })

  describe('getOrCreateInstance', () => {
    it('should return existing instance', () => {
      fixtureEl.innerHTML = createModalHTML()
      const modalEl = fixtureEl.querySelector('.modal')!
      const modal = new Modal(modalEl)

      expect(Modal.getOrCreateInstance(modalEl)).toBe(modal)
    })

    it('should create new instance', () => {
      fixtureEl.innerHTML = createModalHTML()
      const modalEl = fixtureEl.querySelector('.modal')!

      expect(Modal.getInstance(modalEl)).toBeNull()
      expect(Modal.getOrCreateInstance(modalEl)).toBeInstanceOf(Modal)
    })
  })

  describe('_triggerBackdropTransition', () => {
    it('should add and remove modal-static class', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl, { keyboard: false })

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.addEventListener('hidePrevented.bs.modal', () => {
            setTimeout(() => {
              resolve()
            }, 30)
          })

          modalEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
        })

        modal.show()
      })
    })

    it('should not transition if hidePrevented is prevented', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl, { keyboard: false })

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.addEventListener('hidePrevented.bs.modal', (event) => {
            event.preventDefault()
            setTimeout(() => {
              expect(modal._isShown).toBe(true)
              resolve()
            }, 30)
          })

          modalEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
        })

        modal.show()
      })
    })

    it('should early return if overflowY is hidden', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl, { keyboard: false })

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.style.overflowY = 'hidden'

          modalEl.addEventListener('hidePrevented.bs.modal', () => {
            setTimeout(() => {
              expect(modal._isShown).toBe(true)
              resolve()
            }, 30)
          })

          modalEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
        })

        modal.show()
      })
    })

    it('should early return if already has modal-static class', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl, { keyboard: false })

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.classList.add('modal-static')

          modalEl.addEventListener('hidePrevented.bs.modal', () => {
            setTimeout(() => {
              expect(modal._isShown).toBe(true)
              resolve()
            }, 30)
          })

          modalEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
        })

        modal.show()
      })
    })
  })

  describe('backdrop click', () => {
    it('should hide when clicking outside dialog with backdrop true', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl, { backdrop: true })

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.addEventListener('hidden.bs.modal', () => {
            expect(modal._isShown).toBe(false)
            resolve()
          })

          modalEl.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
          modalEl.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

        modal.show()
      })
    })

    it('should not hide when click starts inside dialog', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const dialog = modalEl.querySelector('.modal-dialog')!
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          const mousedownEvent = new MouseEvent('mousedown', { bubbles: true })
          Object.defineProperty(mousedownEvent, 'target', { value: dialog })
          modalEl.dispatchEvent(mousedownEvent)

          modalEl.dispatchEvent(new MouseEvent('click', { bubbles: true }))

          setTimeout(() => {
            expect(modal._isShown).toBe(true)
            resolve()
          }, 50)
        })

        modal.show()
      })
    })

    it('should trigger backdrop transition with static backdrop', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl, { backdrop: 'static' })

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.addEventListener('hidePrevented.bs.modal', () => {
            expect(modal._isShown).toBe(true)
            resolve()
          })

          modalEl.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
          modalEl.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

        modal.show()
      })
    })
  })

  describe('_showElement', () => {
    it('should append to body if not already in DOM', () => {
      const modalEl = document.createElement('div')
      modalEl.classList.add('modal')
      modalEl.setAttribute('tabindex', '-1')
      modalEl.innerHTML = '<div class="modal-dialog"><div class="modal-content"></div></div>'

      const modal = new Modal(modalEl)

      return new Promise<void>((resolve) => {
        modalEl.addEventListener('shown.bs.modal', () => {
          expect(document.body.contains(modalEl)).toBe(true)
          modal.dispose()
          modalEl.remove()
          resolve()
        })

        modal.show()
      })
    })

    it('should scroll modal body to top', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          expect(modalEl.scrollTop).toBe(0)
          resolve()
        })

        modal.show()
      })
    })
  })

  describe('data-tblr-toggle', () => {
    it('should open modal via data-tblr-toggle="modal"', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = ['<button data-tblr-toggle="modal" data-bs-target="#testModal">Open</button>', '<div class="modal" id="testModal" tabindex="-1">', '  <div class="modal-dialog"><div class="modal-content"></div></div>', '</div>'].join('')

        const modalEl = fixtureEl.querySelector('#testModal')!
        const btn = fixtureEl.querySelector('[data-tblr-toggle="modal"]') as HTMLElement

        modalEl.addEventListener('shown.bs.modal', () => {
          const modal = Modal.getInstance(modalEl) as Modal
          expect(modal._isShown).toBe(true)
          resolve()
        })

        btn.click()
      })
    })

    it('should open modal via data-tblr-toggle with data-tblr-target', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = ['<button data-tblr-toggle="modal" data-tblr-target="#testModal">Open</button>', '<div class="modal" id="testModal" tabindex="-1">', '  <div class="modal-dialog"><div class="modal-content"></div></div>', '</div>'].join('')

        const modalEl = fixtureEl.querySelector('#testModal')!
        const btn = fixtureEl.querySelector('[data-tblr-toggle="modal"]') as HTMLElement

        modalEl.addEventListener('shown.bs.modal', () => {
          const modal = Modal.getInstance(modalEl) as Modal
          expect(modal._isShown).toBe(true)
          resolve()
        })

        btn.click()
      })
    })
  })

  describe('data-tblr-dismiss', () => {
    it('should close modal via data-tblr-dismiss="modal"', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = ['<div class="modal" tabindex="-1">', '  <div class="modal-dialog">', '    <div class="modal-content">', '      <button type="button" class="btn-close" data-tblr-dismiss="modal"></button>', '    </div>', '  </div>', '</div>'].join('')

        const modalEl = fixtureEl.querySelector('.modal')!
        const dismissBtn = fixtureEl.querySelector('[data-tblr-dismiss="modal"]') as HTMLElement
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          dismissBtn.click()
        })

        modalEl.addEventListener('hidden.bs.modal', () => {
          expect(modal._isShown).toBe(false)
          resolve()
        })

        modal.show()
      })
    })
  })
})
