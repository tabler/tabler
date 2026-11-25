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
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
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

    it('should focus the previously focused element on hide', async () => {
      const { el, instance, trigger } = setup()

      await open(trigger, el, instance, 'active')
      await close(el, instance)

      expect(document.activeElement).toBe(trigger)
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

    it('should keep the new target when reopened during the backdrop hide', async () => {
      fixtureEl.innerHTML = `<button id="trigger">Open</button><button id="other">Other</button>${createModalHTML().replace('class="modal"', 'class="modal fade"')}`
      const el = fixtureEl.querySelector<HTMLElement>('.modal')!
      const instance = new Modal(el)
      const trigger = fixtureEl.querySelector<HTMLElement>('#trigger')!
      const other = fixtureEl.querySelector<HTMLElement>('#other')!

      await open(trigger, el, instance, 'active')
      const reopened = new Promise<void>((resolve) => {
        el.addEventListener('shown.bs.modal', () => resolve(), { once: true })
      })
      const hideBackdrop = instance._backdrop.hide.bind(instance._backdrop)
      vi.spyOn(instance._backdrop, 'hide').mockImplementationOnce((callback) => {
        hideBackdrop(callback)
        instance.show(other)
      })
      instance.hide()
      await reopened
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

  describe('stacked', () => {
    const createStackedHTML = () =>
      [
        '<div class="modal" id="parentModal" tabindex="-1" style="z-index: 1055">',
        '  <div class="modal-dialog"><div class="modal-content">',
        '    <button id="openChild" data-bs-toggle="modal" data-bs-target="#childModal">Open</button>',
        '    <button id="openOther" data-bs-toggle="modal" data-bs-target="#otherModal">Swap</button>',
        '  </div></div>',
        '</div>',
        '<div class="modal" id="childModal" tabindex="-1" data-bs-stacked="true">',
        '  <div class="modal-dialog"><div class="modal-content"><button data-bs-dismiss="modal">Close</button></div></div>',
        '</div>',
        '<div class="modal" id="otherModal" tabindex="-1">',
        '  <div class="modal-dialog"><div class="modal-content"></div></div>',
        '</div>',
      ].join('')

    const openStack = () =>
      new Promise<{ parentEl: HTMLElement; childEl: HTMLElement; parent: Modal; child: Modal }>((resolve) => {
        fixtureEl.innerHTML = createStackedHTML()

        const parentEl = fixtureEl.querySelector<HTMLElement>('#parentModal')!
        const childEl = fixtureEl.querySelector<HTMLElement>('#childModal')!
        const parent = new Modal(parentEl)

        parentEl.addEventListener('shown.bs.modal', () => {
          fixtureEl.querySelector<HTMLElement>('#openChild')!.click()
        })

        childEl.addEventListener('shown.bs.modal', () => {
          resolve({ parentEl, childEl, parent, child: Modal.getInstance(childEl) as Modal })
        })

        parent.show()
      })

    it('should have stacked disabled by default', () => {
      expect(Modal.Default.stacked).toBe(false)
    })

    it('should keep the open modal shown and mark it as stacked', async () => {
      const { parentEl, childEl, parent, child } = await openStack()

      expect(parent._isShown).toBe(true)
      expect(child._isShown).toBe(true)
      expect(parentEl.classList.contains('show')).toBe(true)
      expect(parentEl.classList.contains('modal-stacked')).toBe(true)
      expect(childEl.style.zIndex).toBe('1065')
      expect(child._backdrop._getElement().style.zIndex).toBe('1060')
      expect(document.querySelectorAll('.modal-backdrop')).toHaveLength(2)
    })

    it('should move the focus trap to the stacked modal', async () => {
      const { parent, child } = await openStack()

      expect(parent._focustrap._isActive).toBe(false)
      expect(child._focustrap._isActive).toBe(true)
    })

    it('should return to the parent modal when the stacked modal is hidden', async () => {
      const { parentEl, childEl, parent, child } = await openStack()

      await new Promise<void>((resolve) => {
        childEl.addEventListener('hidden.bs.modal', () => resolve())
        child.hide()
      })

      expect(parent._isShown).toBe(true)
      expect(parentEl.classList.contains('modal-stacked')).toBe(false)
      expect(parent._focustrap._isActive).toBe(true)
      expect(childEl.style.zIndex).toBe('')
      expect(document.body.classList.contains('modal-open')).toBe(true)
      expect(document.body.style.overflow).toBe('hidden')
      expect(document.activeElement).toBe(fixtureEl.querySelector('#openChild'))
    })

    it('should hide the stacked modal when its parent is hidden', async () => {
      const { parentEl, childEl, parent, child } = await openStack()

      await new Promise<void>((resolve) => {
        let hidden = 0
        const onHidden = () => {
          hidden += 1
          if (hidden === 2) {
            resolve()
          }
        }

        parentEl.addEventListener('hidden.bs.modal', onHidden)
        childEl.addEventListener('hidden.bs.modal', onHidden)
        parent.hide()
      })

      expect(parent._isShown).toBe(false)
      expect(child._isShown).toBe(false)
      expect(document.body.classList.contains('modal-open')).toBe(false)
      expect(document.body.style.overflow).toBe('')
    })

    it('should still swap modals when the target is not stacked', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createStackedHTML()

        const parentEl = fixtureEl.querySelector<HTMLElement>('#parentModal')!
        const otherEl = fixtureEl.querySelector<HTMLElement>('#otherModal')!
        const parent = new Modal(parentEl)

        parentEl.addEventListener('shown.bs.modal', () => {
          fixtureEl.querySelector<HTMLElement>('#openOther')!.click()
          expect(parent._isShown).toBe(false)
        })

        otherEl.addEventListener('shown.bs.modal', () => {
          expect(parentEl.classList.contains('modal-stacked')).toBe(false)
          resolve()
        })

        parent.show()
      })
    })

    it('should open as a regular modal when no other modal is open', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createStackedHTML()

        const childEl = fixtureEl.querySelector<HTMLElement>('#childModal')!
        const child = new Modal(childEl)

        childEl.addEventListener('shown.bs.modal', () => {
          expect(child._parent).toBeNull()
          expect(childEl.style.zIndex).toBe('')
          resolve()
        })

        child.show()
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

  describe('_adjustDialog', () => {
    afterEach(() => {
      document.documentElement.dir = ''
    })

    const createModal = (scrollbarWidth: number, overflowing: boolean) => {
      fixtureEl.innerHTML = createModalHTML()
      const modalEl = fixtureEl.querySelector<HTMLElement>('.modal')!
      const modal = new Modal(modalEl)
      vi.spyOn(modal._scrollBar, 'getWidth').mockReturnValue(scrollbarWidth)
      if (overflowing) {
        modalEl.style.height = `${document.documentElement.clientHeight + 100}px`
      }

      return { modal, modalEl }
    }

    it('should pad the modal on the scrollbar side when only the body overflows', () => {
      const { modal, modalEl } = createModal(15, false)

      modal._adjustDialog()

      expect(modalEl.style.paddingRight).toBe('15px')
      expect(modalEl.style.paddingLeft).toBe('')
    })

    it('should pad the left side in RTL when only the body overflows', () => {
      document.documentElement.dir = 'rtl'
      const { modal, modalEl } = createModal(15, false)

      modal._adjustDialog()

      expect(modalEl.style.paddingLeft).toBe('15px')
      expect(modalEl.style.paddingRight).toBe('')
    })

    it('should set the opposite side when only the modal overflows', () => {
      const { modal, modalEl } = createModal(0, true)

      modal._adjustDialog()

      expect(modalEl.style.paddingLeft).toBe('0px')
      expect(modalEl.style.paddingRight).toBe('')
    })

    it('should set the right side in RTL when only the modal overflows', () => {
      document.documentElement.dir = 'rtl'
      const { modal, modalEl } = createModal(0, true)

      modal._adjustDialog()

      expect(modalEl.style.paddingRight).toBe('0px')
      expect(modalEl.style.paddingLeft).toBe('')
    })

    it('should leave the padding alone when both or neither overflow', () => {
      const both = createModal(15, true)
      both.modal._adjustDialog()
      expect(both.modalEl.style.paddingRight).toBe('')

      const neither = createModal(0, false)
      neither.modal._adjustDialog()
      expect(neither.modalEl.style.paddingLeft).toBe('')
    })

    it('should clear both sides in _resetAdjustments', () => {
      const { modal, modalEl } = createModal(15, false)
      modalEl.style.paddingLeft = '15px'
      modalEl.style.paddingRight = '15px'

      modal._resetAdjustments()

      expect(modalEl.style.paddingLeft).toBe('')
      expect(modalEl.style.paddingRight).toBe('')
    })
  })

  describe('resize', () => {
    it('should adjust the dialog only while the modal is shown', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl)
        const spy = vi.spyOn(modal, '_adjustDialog')

        window.dispatchEvent(new Event('resize'))
        expect(spy).not.toHaveBeenCalled()

        modalEl.addEventListener('shown.bs.modal', () => {
          spy.mockClear()
          window.dispatchEvent(new Event('resize'))
          expect(spy).toHaveBeenCalledTimes(1)
          resolve()
        })

        modal.show()
      })
    })
  })

  describe('data-api trigger', () => {
    const click = (selector: string): MouseEvent => {
      const event = new MouseEvent('click', { bubbles: true, cancelable: true })
      fixtureEl.querySelector(selector)!.dispatchEvent(event)
      return event
    }

    it('should hide an open modal before showing another one', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = ['<div class="modal" id="first" tabindex="-1"><div class="modal-dialog"><button data-bs-toggle="modal" data-bs-target="#second">Next</button></div></div>', '<div class="modal" id="second" tabindex="-1"><div class="modal-dialog"></div></div>'].join('')
        const firstEl = fixtureEl.querySelector('#first')!
        const secondEl = fixtureEl.querySelector('#second')!
        const first = new Modal(firstEl)
        const hide = vi.spyOn(first, 'hide')

        firstEl.addEventListener('shown.bs.modal', () => click('button'))
        secondEl.addEventListener('shown.bs.modal', () => {
          expect(hide).toHaveBeenCalledTimes(1)
          resolve()
        })

        first.show()
      })
    })

    it('should not follow a link trigger', () => {
      fixtureEl.innerHTML = '<a href="#linked" data-bs-toggle="modal">Open</a><div class="modal" id="linked" tabindex="-1"><div class="modal-dialog"></div></div>'

      expect(click('a').defaultPrevented).toBe(true)
      expect(Modal.getInstance(fixtureEl.querySelector('#linked')!)).not.toBeNull()
    })

    it('should ignore a trigger without a target', () => {
      fixtureEl.innerHTML = '<button data-bs-toggle="modal" data-bs-target="#missing">Open</button>'

      expect(() => click('button')).not.toThrow()
      expect(document.querySelector('.modal-backdrop')).toBeNull()
    })
  })
})
