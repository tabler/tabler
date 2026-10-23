import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import Offcanvas from '../../src/bootstrap/offcanvas'
import { clearFixture, getFixture } from '../helpers/fixture'

describe('Offcanvas', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
    vi.restoreAllMocks()
    for (const el of document.querySelectorAll('.offcanvas-backdrop')) {
      el.remove()
    }
  })

  const createOffcanvasHTML = () =>
    ['<div class="offcanvas offcanvas-start" tabindex="-1">', '  <div class="offcanvas-header">', '    <h5 class="offcanvas-title">Offcanvas</h5>', '    <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>', '  </div>', '  <div class="offcanvas-body">Content</div>', '</div>'].join('')

  describe('VERSION', () => {
    it('should return plugin version', () => {
      expect(typeof Offcanvas.VERSION).toBe('string')
    })
  })

  describe('Default', () => {
    it('should return plugin default config', () => {
      expect(Offcanvas.Default).toBeDefined()
      expect(Offcanvas.Default.backdrop).toBe(true)
      expect(Offcanvas.Default.keyboard).toBe(true)
      expect(Offcanvas.Default.scroll).toBe(false)
    })
  })

  describe('DefaultType', () => {
    it('should return plugin default type config', () => {
      expect(Offcanvas.DefaultType).toBeDefined()
      expect(Offcanvas.DefaultType.backdrop).toBe('(boolean|string)')
    })
  })

  describe('NAME', () => {
    it('should return plugin name', () => {
      expect(Offcanvas.NAME).toBe('offcanvas')
    })
  })

  describe('constructor', () => {
    it('should create offcanvas instance', () => {
      fixtureEl.innerHTML = createOffcanvasHTML()
      const el = fixtureEl.querySelector('.offcanvas')!
      const instance = new Offcanvas(el)

      expect(instance).toBeInstanceOf(Offcanvas)
      expect(Offcanvas.getInstance(el)).toBe(instance)
    })
  })

  describe('toggle', () => {
    it('should show when hidden', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createOffcanvasHTML()
        const el = fixtureEl.querySelector('.offcanvas')!
        const instance = new Offcanvas(el)

        el.addEventListener('shown.bs.offcanvas', () => {
          expect(instance._isShown).toBe(true)
          resolve()
        })

        instance.toggle()
      })
    })

    it('should hide when shown', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createOffcanvasHTML()
        const el = fixtureEl.querySelector('.offcanvas')!
        const instance = new Offcanvas(el)

        el.addEventListener('shown.bs.offcanvas', () => {
          el.addEventListener('hidden.bs.offcanvas', () => {
            expect(instance._isShown).toBe(false)
            resolve()
          })

          instance.toggle()
        })

        instance.show()
      })
    })
  })

  describe('show', () => {
    it('should show offcanvas', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createOffcanvasHTML()
        const el = fixtureEl.querySelector('.offcanvas')!
        const instance = new Offcanvas(el)

        el.addEventListener('shown.bs.offcanvas', () => {
          expect(instance._isShown).toBe(true)
          expect(el.classList.contains('show')).toBe(true)
          expect(el.getAttribute('aria-modal')).toBe('true')
          expect(el.getAttribute('role')).toBe('dialog')
          resolve()
        })

        instance.show()
      })
    })

    it('should not show if already shown', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createOffcanvasHTML()
        const el = fixtureEl.querySelector('.offcanvas')!
        const instance = new Offcanvas(el)
        let showCount = 0

        el.addEventListener('show.bs.offcanvas', () => {
          showCount++
        })

        el.addEventListener('shown.bs.offcanvas', () => {
          instance.show()
          setTimeout(() => {
            expect(showCount).toBe(1)
            resolve()
          }, 30)
        })

        instance.show()
      })
    })

    it('should not show if show event is prevented', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createOffcanvasHTML()
        const el = fixtureEl.querySelector('.offcanvas')!
        const instance = new Offcanvas(el)

        el.addEventListener('show.bs.offcanvas', (event) => {
          event.preventDefault()
          setTimeout(() => {
            expect(instance._isShown).toBe(false)
            resolve()
          }, 30)
        })

        instance.show()
      })
    })

    it('should pass relatedTarget in show event', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createOffcanvasHTML() + '<button id="trigger">Open</button>'
        const el = fixtureEl.querySelector('.offcanvas')!
        const trigger = fixtureEl.querySelector('#trigger') as HTMLElement
        const instance = new Offcanvas(el)

        el.addEventListener('show.bs.offcanvas', (event: any) => {
          expect(event.relatedTarget).toBe(trigger)
          resolve()
        })

        instance.show(trigger)
      })
    })
  })

  describe('return focus', () => {
    const open = (trigger: HTMLElement, el: Element, instance: Offcanvas, via: 'active' | 'related') =>
      new Promise<void>((resolve) => {
        el.addEventListener('shown.bs.offcanvas', () => resolve(), { once: true })
        trigger.focus()
        instance.show(via === 'related' ? trigger : undefined)
      })

    const close = (el: Element, instance: Offcanvas) =>
      new Promise<void>((resolve) => {
        el.addEventListener('hidden.bs.offcanvas', () => resolve(), { once: true })
        instance.hide()
      })

    const setup = () => {
      fixtureEl.innerHTML = `<button id="trigger">Open</button><button id="other">Other</button>${createOffcanvasHTML()}`
      const el = fixtureEl.querySelector('.offcanvas')!
      return {
        el,
        instance: new Offcanvas(el),
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
      el.addEventListener('hidden.bs.offcanvas', () => other.focus(), { once: true })
      await close(el, instance)

      expect(document.activeElement).toBe(other)
    })

    it('should focus a previously focused SVG element on hide', async () => {
      const { el, instance } = setup()
      fixtureEl.insertAdjacentHTML('afterbegin', '<svg id="svg-trigger" tabindex="0" width="16" height="16"><rect width="16" height="16" /></svg>')
      const svg = fixtureEl.querySelector<SVGSVGElement>('#svg-trigger')!

      await new Promise<void>((resolve) => {
        el.addEventListener('shown.bs.offcanvas', () => resolve(), { once: true })
        svg.focus()
        instance.show()
      })
      await close(el, instance)

      expect(document.activeElement).toBe(svg)
    })

    it('should restore focus when a hidden listener disposes the instance', async () => {
      const { el, instance, trigger } = setup()

      await open(trigger, el, instance, 'active')
      el.addEventListener('hidden.bs.offcanvas', () => instance.dispose(), { once: true })
      await close(el, instance)

      expect(document.activeElement).toBe(trigger)
    })

    it('should not restore focus when a hidden listener opens a new instance', async () => {
      const { el, instance, trigger, other } = setup()
      const focusTrigger = vi.spyOn(trigger, 'focus')
      let replacement: Offcanvas | undefined

      await open(trigger, el, instance, 'active')
      const reopened = new Promise<void>((resolve) => {
        el.addEventListener('shown.bs.offcanvas', () => resolve(), { once: true })
      })
      el.addEventListener(
        'hidden.bs.offcanvas',
        () => {
          instance.dispose()
          replacement = new Offcanvas(el)
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
        el.addEventListener('shown.bs.offcanvas', () => resolve(), { once: true })
      })
      el.addEventListener('hidden.bs.offcanvas', () => instance.show(other), { once: true })
      await close(el, instance)
      await reopened
      await close(el, instance)

      expect(document.activeElement).toBe(other)
    })

    it('should unwrap a jQuery trigger', async () => {
      const { el, instance, trigger } = setup()

      await new Promise<void>((resolve) => {
        el.addEventListener('shown.bs.offcanvas', () => resolve(), { once: true })
        instance.show({ jquery: '3.7.1', 0: trigger, length: 1 } as never)
      })
      await close(el, instance)

      expect(document.activeElement).toBe(trigger)
    })

    it('should ignore the offcanvas itself as the trigger', async () => {
      const { el, instance, trigger } = setup()

      await new Promise<void>((resolve) => {
        el.addEventListener('shown.bs.offcanvas', () => resolve(), { once: true })
        trigger.focus()
        instance.show(el as HTMLElement)
      })
      await close(el, instance)

      expect(document.activeElement).toBe(trigger)
    })

    it('should keep the new target when reopened during the hide transition', async () => {
      const { el, instance, trigger, other } = setup()

      await open(trigger, el, instance, 'active')
      const reopened = new Promise<void>((resolve) => {
        el.addEventListener('shown.bs.offcanvas', () => resolve(), { once: true })
      })
      instance.hide()
      instance.show(other)
      await reopened
      await close(el, instance)

      expect(document.activeElement).toBe(other)
    })

    it('should focus the Data API trigger on hide', async () => {
      fixtureEl.innerHTML = '<button data-tblr-toggle="offcanvas" data-tblr-target="#testOffcanvas">Open</button><div class="offcanvas offcanvas-start" id="testOffcanvas" tabindex="-1"><div class="offcanvas-body">Content</div></div>'
      const el = fixtureEl.querySelector<HTMLElement>('#testOffcanvas')!
      const btn = fixtureEl.querySelector<HTMLElement>('[data-tblr-toggle="offcanvas"]')!

      await new Promise<void>((resolve) => {
        el.addEventListener('shown.bs.offcanvas', () => resolve(), { once: true })
        btn.click()
      })
      await close(el, Offcanvas.getInstance(el) as Offcanvas)

      expect(document.activeElement).toBe(btn)
    })
  })

  describe('hide', () => {
    it('should hide offcanvas', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createOffcanvasHTML()
        const el = fixtureEl.querySelector('.offcanvas')!
        const instance = new Offcanvas(el)

        el.addEventListener('shown.bs.offcanvas', () => {
          instance.hide()
        })

        el.addEventListener('hidden.bs.offcanvas', () => {
          expect(instance._isShown).toBe(false)
          expect(el.classList.contains('show')).toBe(false)
          resolve()
        })

        instance.show()
      })
    })

    it('should not hide if not shown', () => {
      fixtureEl.innerHTML = createOffcanvasHTML()
      const el = fixtureEl.querySelector('.offcanvas')!
      const instance = new Offcanvas(el)
      let hideCount = 0

      el.addEventListener('hide.bs.offcanvas', () => {
        hideCount++
      })

      instance.hide()
      expect(hideCount).toBe(0)
    })

    it('should not hide if hide event is prevented', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createOffcanvasHTML()
        const el = fixtureEl.querySelector('.offcanvas')!
        const instance = new Offcanvas(el)

        el.addEventListener('shown.bs.offcanvas', () => {
          el.addEventListener('hide.bs.offcanvas', (event) => {
            event.preventDefault()
            setTimeout(() => {
              expect(instance._isShown).toBe(true)
              resolve()
            }, 30)
          })

          instance.hide()
        })

        instance.show()
      })
    })
  })

  describe('dispose', () => {
    it('should dispose offcanvas', () => {
      fixtureEl.innerHTML = createOffcanvasHTML()
      const el = fixtureEl.querySelector('.offcanvas')!
      const instance = new Offcanvas(el)

      instance.dispose()
      expect(Offcanvas.getInstance(el)).toBeNull()
    })
  })

  describe('keyboard', () => {
    it('should close on Escape when keyboard is true', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createOffcanvasHTML()
        const el = fixtureEl.querySelector('.offcanvas')!
        const instance = new Offcanvas(el, { keyboard: true })

        el.addEventListener('shown.bs.offcanvas', () => {
          el.addEventListener('hidden.bs.offcanvas', () => {
            expect(instance._isShown).toBe(false)
            resolve()
          })

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
        })

        instance.show()
      })
    })

    it('should fire hidePrevented when keyboard is false and Escape pressed', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createOffcanvasHTML()
        const el = fixtureEl.querySelector('.offcanvas')!
        new Offcanvas(el, { keyboard: false })

        el.addEventListener('shown.bs.offcanvas', () => {
          el.addEventListener('hidePrevented.bs.offcanvas', () => {
            resolve()
          })

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
        })

        Offcanvas.getOrCreateInstance(el)?.show()
      })
    })

    it('should ignore non-Escape keys', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createOffcanvasHTML()
        const el = fixtureEl.querySelector('.offcanvas')!
        const instance = new Offcanvas(el)

        el.addEventListener('shown.bs.offcanvas', () => {
          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))

          setTimeout(() => {
            expect(instance._isShown).toBe(true)
            resolve()
          }, 30)
        })

        instance.show()
      })
    })
  })

  describe('getInstance', () => {
    it('should return null if no instance', () => {
      expect(Offcanvas.getInstance(fixtureEl)).toBeNull()
    })

    it('should return offcanvas instance', () => {
      fixtureEl.innerHTML = createOffcanvasHTML()
      const el = fixtureEl.querySelector('.offcanvas')!
      const instance = new Offcanvas(el)

      expect(Offcanvas.getInstance(el)).toBe(instance)
    })
  })

  describe('getOrCreateInstance', () => {
    it('should return existing instance', () => {
      fixtureEl.innerHTML = createOffcanvasHTML()
      const el = fixtureEl.querySelector('.offcanvas')!
      const instance = new Offcanvas(el)

      expect(Offcanvas.getOrCreateInstance(el)).toBe(instance)
    })

    it('should create new instance', () => {
      fixtureEl.innerHTML = createOffcanvasHTML()
      const el = fixtureEl.querySelector('.offcanvas')!

      expect(Offcanvas.getInstance(el)).toBeNull()
      expect(Offcanvas.getOrCreateInstance(el)).toBeInstanceOf(Offcanvas)
    })
  })

  describe('scroll option', () => {
    it('should not hide scrollbar when scroll is true', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createOffcanvasHTML()
        const el = fixtureEl.querySelector('.offcanvas')!
        const instance = new Offcanvas(el, { scroll: true })

        el.addEventListener('shown.bs.offcanvas', () => {
          expect(instance._isShown).toBe(true)
          resolve()
        })

        instance.show()
      })
    })
  })

  describe('backdrop option', () => {
    it('should work with backdrop set to false', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createOffcanvasHTML()
        const el = fixtureEl.querySelector('.offcanvas')!
        const instance = new Offcanvas(el, { backdrop: false })

        el.addEventListener('shown.bs.offcanvas', () => {
          expect(instance._isShown).toBe(true)
          resolve()
        })

        instance.show()
      })
    })

    it('should create offcanvas with static backdrop option', () => {
      fixtureEl.innerHTML = createOffcanvasHTML()
      const el = fixtureEl.querySelector('.offcanvas')!
      const instance = new Offcanvas(el, { backdrop: 'static' })

      expect(instance).toBeInstanceOf(Offcanvas)
    })
  })

  describe('data-tblr-toggle', () => {
    it('should open offcanvas via data-tblr-toggle="offcanvas"', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = ['<button data-tblr-toggle="offcanvas" data-bs-target="#testOffcanvas">Open</button>', '<div class="offcanvas offcanvas-start" id="testOffcanvas" tabindex="-1">', '  <div class="offcanvas-body">Content</div>', '</div>'].join('')

        const offcanvasEl = fixtureEl.querySelector('#testOffcanvas')!
        const btn = fixtureEl.querySelector('[data-tblr-toggle="offcanvas"]') as HTMLElement

        offcanvasEl.addEventListener('shown.bs.offcanvas', () => {
          const instance = Offcanvas.getInstance(offcanvasEl) as Offcanvas
          expect(instance._isShown).toBe(true)
          resolve()
        })

        btn.click()
      })
    })

    it('should open offcanvas via data-tblr-toggle with data-tblr-target', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = ['<button data-tblr-toggle="offcanvas" data-tblr-target="#testOffcanvas">Open</button>', '<div class="offcanvas offcanvas-start" id="testOffcanvas" tabindex="-1">', '  <div class="offcanvas-body">Content</div>', '</div>'].join('')

        const offcanvasEl = fixtureEl.querySelector('#testOffcanvas')!
        const btn = fixtureEl.querySelector('[data-tblr-toggle="offcanvas"]') as HTMLElement

        offcanvasEl.addEventListener('shown.bs.offcanvas', () => {
          const instance = Offcanvas.getInstance(offcanvasEl) as Offcanvas
          expect(instance._isShown).toBe(true)
          resolve()
        })

        btn.click()
      })
    })
  })

  describe('data-tblr-dismiss', () => {
    it('should close offcanvas via data-tblr-dismiss="offcanvas"', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = ['<div class="offcanvas offcanvas-start" tabindex="-1">', '  <div class="offcanvas-header">', '    <button type="button" class="btn-close" data-tblr-dismiss="offcanvas"></button>', '  </div>', '  <div class="offcanvas-body">Content</div>', '</div>'].join('')

        const el = fixtureEl.querySelector('.offcanvas')!
        const dismissBtn = fixtureEl.querySelector('[data-tblr-dismiss="offcanvas"]') as HTMLElement
        const instance = new Offcanvas(el)

        el.addEventListener('shown.bs.offcanvas', () => {
          dismissBtn.click()
        })

        el.addEventListener('hidden.bs.offcanvas', () => {
          expect(instance._isShown).toBe(false)
          resolve()
        })

        instance.show()
      })
    })
  })
})
