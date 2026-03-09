import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import EventHandler from '../../../src/bootstrap/dom/event-handler'
import { clearFixture, getFixture } from '../../helpers/fixture'

describe('EventHandler', () => {
  let fixtureEl: HTMLElement
  let div: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  beforeEach(() => {
    fixtureEl.innerHTML = '<div><span><button>Click</button></span></div>'
    div = fixtureEl.querySelector('div')!
  })

  afterEach(() => {
    EventHandler.off(div, 'click')
    clearFixture()
  })

  describe('on', () => {
    it('should bind an event listener to an element', () => {
      const handler = vi.fn()

      EventHandler.on(div, 'click', handler)
      div.click()

      expect(handler).toHaveBeenCalledOnce()
    })

    it('should receive the Event object', () => {
      const handler = vi.fn()

      EventHandler.on(div, 'click', handler)
      div.click()

      expect(handler).toHaveBeenCalledWith(expect.any(Event))
    })

    it('should bind multiple different events on the same element', () => {
      const clickHandler = vi.fn()
      const focusHandler = vi.fn()

      EventHandler.on(div, 'click', clickHandler)
      EventHandler.on(div, 'focusin', focusHandler)

      div.click()

      expect(clickHandler).toHaveBeenCalledOnce()
      expect(focusHandler).not.toHaveBeenCalled()

      EventHandler.off(div, 'focusin')
    })

    it('should not add duplicate handlers for the same callback', () => {
      const handler = vi.fn()

      EventHandler.on(div, 'click', handler)
      EventHandler.on(div, 'click', handler)

      div.click()

      expect(handler).toHaveBeenCalledOnce()
    })

    it('should do nothing if element is null', () => {
      expect(() => {
        EventHandler.on(null, 'click', vi.fn())
      }).not.toThrow()
    })

    it('should handle a custom (non-native) event', () => {
      const handler = vi.fn()

      EventHandler.on(div, 'my.custom.event', handler)
      EventHandler.trigger(div, 'my.custom.event')

      expect(handler).toHaveBeenCalledOnce()

      EventHandler.off(div, 'my.custom.event')
    })
  })

  describe('one', () => {
    it('should call the handler only once', () => {
      const handler = vi.fn()

      EventHandler.one(div, 'click', handler)

      div.click()
      div.click()

      expect(handler).toHaveBeenCalledOnce()
    })

    it('should unbind the handler after first call', () => {
      const handler = vi.fn()

      EventHandler.one(div, 'click', handler)
      div.click()

      expect(handler).toHaveBeenCalledOnce()

      div.click()
      expect(handler).toHaveBeenCalledOnce()
    })
  })

  describe('off', () => {
    it('should remove a specific handler', () => {
      const handler = vi.fn()

      EventHandler.on(div, 'click', handler)
      EventHandler.off(div, 'click', handler)

      div.click()

      expect(handler).not.toHaveBeenCalled()
    })

    it('should remove all handlers for an event type', () => {
      const handler1 = vi.fn()
      const handler2 = vi.fn()

      EventHandler.on(div, 'click', handler1)
      EventHandler.on(div, 'click', handler2)
      EventHandler.off(div, 'click')

      div.click()

      expect(handler1).not.toHaveBeenCalled()
      expect(handler2).not.toHaveBeenCalled()
    })

    it('should do nothing if element is null', () => {
      expect(() => {
        EventHandler.off(null, 'click')
      }).not.toThrow()
    })

    it('should do nothing if no handlers are registered', () => {
      const fresh = document.createElement('div')

      expect(() => {
        EventHandler.off(fresh, 'click', vi.fn())
      }).not.toThrow()
    })

    it('should only remove the specified handler, keeping others', () => {
      const handler1 = vi.fn()
      const handler2 = vi.fn()

      EventHandler.on(div, 'click', handler1)
      EventHandler.on(div, 'click', handler2)
      EventHandler.off(div, 'click', handler1)

      div.click()

      expect(handler1).not.toHaveBeenCalled()
      expect(handler2).toHaveBeenCalledOnce()

      EventHandler.off(div, 'click', handler2)
    })
  })

  describe('trigger', () => {
    it('should trigger a native event', () => {
      const handler = vi.fn()

      EventHandler.on(div, 'click', handler)
      EventHandler.trigger(div, 'click')

      expect(handler).toHaveBeenCalledOnce()
    })

    it('should return the dispatched Event object', () => {
      const evt = EventHandler.trigger(div, 'click')

      expect(evt).toBeInstanceOf(Event)
      expect(evt!.type).toBe('click')
    })

    it('should create a bubbling, cancelable event', () => {
      const evt = EventHandler.trigger(div, 'click')

      expect(evt!.bubbles).toBe(true)
      expect(evt!.cancelable).toBe(true)
    })

    it('should return null if element is null', () => {
      const evt = EventHandler.trigger(null, 'click')

      expect(evt).toBeNull()
    })

    it('should hydrate the event with extra args', () => {
      let receivedEvent: Event | null = null

      EventHandler.on(div, 'show.bs.modal', (event: unknown) => {
        receivedEvent = event as Event
      })

      EventHandler.trigger(div, 'show.bs.modal', { relatedTarget: div })

      expect((receivedEvent as unknown as Record<string, unknown>).relatedTarget).toBe(div)

      EventHandler.off(div, 'show.bs.modal')
    })

    it('should trigger a custom (non-native) event', () => {
      const handler = vi.fn()

      EventHandler.on(div, 'show.bs.modal', handler)
      EventHandler.trigger(div, 'show.bs.modal')

      expect(handler).toHaveBeenCalledOnce()

      EventHandler.off(div, 'show.bs.modal')
    })

    it('should allow preventing the default action', () => {
      EventHandler.on(div, 'show.bs.test', (event: unknown) => {
        (event as Event).preventDefault()
      })

      const evt = EventHandler.trigger(div, 'show.bs.test')

      expect(evt!.defaultPrevented).toBe(true)

      EventHandler.off(div, 'show.bs.test')
    })
  })

  describe('namespaces', () => {
    it('should support namespaced events', () => {
      const handler = vi.fn()

      EventHandler.on(div, 'click.bs.test', handler)
      div.click()

      expect(handler).toHaveBeenCalledOnce()

      EventHandler.off(div, 'click.bs.test')
    })

    it('should remove only namespaced handlers with off', () => {
      const handler1 = vi.fn()
      const handler2 = vi.fn()

      EventHandler.on(div, 'click.ns1', handler1)
      EventHandler.on(div, 'click.ns2', handler2)
      EventHandler.off(div, 'click.ns1', handler1)

      div.click()

      expect(handler1).not.toHaveBeenCalled()
      expect(handler2).toHaveBeenCalledOnce()

      EventHandler.off(div, 'click.ns2')
    })

    it('should remove all handlers for a namespace with dot prefix', () => {
      const clickHandler = vi.fn()
      const focusHandler = vi.fn()

      EventHandler.on(div, 'click.bs.test', clickHandler)
      EventHandler.on(div, 'focusin.bs.test', focusHandler)

      EventHandler.off(div, '.bs.test')

      div.click()
      div.dispatchEvent(new Event('focusin'))

      expect(clickHandler).not.toHaveBeenCalled()
      expect(focusHandler).not.toHaveBeenCalled()
    })
  })

  describe('delegation', () => {
    it('should handle delegated events', () => {
      const handler = vi.fn()
      const btn = fixtureEl.querySelector('button')!

      EventHandler.on(div, 'click', 'button', handler)
      btn.click()

      expect(handler).toHaveBeenCalledOnce()

      EventHandler.off(div, 'click')
    })

    it('should not fire for non-matching delegated elements', () => {
      const handler = vi.fn()
      const span = fixtureEl.querySelector('span')!

      EventHandler.on(div, 'click', 'button', handler)
      span.click()

      expect(handler).not.toHaveBeenCalled()

      EventHandler.off(div, 'click')
    })

    it('should set delegateTarget on the event', () => {
      let delegateTarget: EventTarget | null = null
      const btn = fixtureEl.querySelector('button')!

      EventHandler.on(div, 'click', 'button', (event: unknown) => {
        delegateTarget = (event as Record<string, unknown>).delegateTarget as EventTarget
      })

      btn.click()

      expect(delegateTarget).toBe(btn)

      EventHandler.off(div, 'click')
    })

    it('should remove delegated handler with off', () => {
      const handler = vi.fn()
      const btn = fixtureEl.querySelector('button')!

      EventHandler.on(div, 'click', 'button', handler)
      EventHandler.off(div, 'click', 'button', handler)

      btn.click()

      expect(handler).not.toHaveBeenCalled()
    })

    it('should support one-off delegated events', () => {
      const handler = vi.fn()
      const btn = fixtureEl.querySelector('button')!

      EventHandler.one(div, 'click', 'button', handler)

      btn.click()
      btn.click()

      expect(handler).toHaveBeenCalledOnce()
    })
  })

  describe('mouseenter / mouseleave (custom events)', () => {
    it('should fire mouseenter handler when relatedTarget is outside', () => {
      const handler = vi.fn()

      EventHandler.on(div, 'mouseenter', handler)

      const mouseoverEvent = new MouseEvent('mouseover', {
        bubbles: true,
        relatedTarget: document.body
      })
      div.dispatchEvent(mouseoverEvent)

      expect(handler).toHaveBeenCalledOnce()

      EventHandler.off(div, 'mouseenter')
    })

    it('should not fire mouseenter handler when relatedTarget is inside delegateTarget', () => {
      const handler = vi.fn()
      const btn = fixtureEl.querySelector('button')!

      EventHandler.on(div, 'mouseenter', handler)

      const mouseoverEvent = new MouseEvent('mouseover', {
        bubbles: true,
        relatedTarget: btn
      })
      div.dispatchEvent(mouseoverEvent)

      expect(handler).not.toHaveBeenCalled()

      EventHandler.off(div, 'mouseenter')
    })

    it('should fire mouseenter handler when relatedTarget is null', () => {
      const handler = vi.fn()

      EventHandler.on(div, 'mouseenter', handler)

      const mouseoverEvent = new MouseEvent('mouseover', {
        bubbles: true,
        relatedTarget: null
      })
      div.dispatchEvent(mouseoverEvent)

      expect(handler).toHaveBeenCalledOnce()

      EventHandler.off(div, 'mouseenter')
    })
  })

  describe('removeHandler guard', () => {
    it('should not throw when removing a handler that was never added', () => {
      const handler = vi.fn()
      const otherHandler = vi.fn()

      EventHandler.on(div, 'click', handler)

      expect(() => {
        EventHandler.off(div, 'click', otherHandler)
      }).not.toThrow()

      div.click()
      expect(handler).toHaveBeenCalledOnce()

      EventHandler.off(div, 'click')
    })
  })

  describe('trigger extras', () => {
    it('should attach custom properties to the triggered event', () => {
      let receivedEvent: Event | null = null

      EventHandler.on(div, 'show.bs.test', (event: unknown) => {
        receivedEvent = event as Event
      })

      EventHandler.trigger(div, 'show.bs.test', { customProp: 42, anotherProp: 'hello' })

      expect(receivedEvent).not.toBeNull()
      const evt = receivedEvent as unknown as Record<string, unknown>
      expect(evt.customProp).toBe(42)
      expect(evt.anotherProp).toBe('hello')

      EventHandler.off(div, 'show.bs.test')
    })

    it('should work when trigger has no extra args', () => {
      const handler = vi.fn()

      EventHandler.on(div, 'show.bs.test', handler)
      const evt = EventHandler.trigger(div, 'show.bs.test')

      expect(evt).toBeInstanceOf(Event)
      expect(handler).toHaveBeenCalledOnce()

      EventHandler.off(div, 'show.bs.test')
    })

    it('should use Object.defineProperty for read-only properties', () => {
      let receivedEvent: Event | null = null

      EventHandler.on(div, 'click', (event: unknown) => {
        receivedEvent = event as Event
      })

      EventHandler.trigger(div, 'click', { type: 'overridden' })

      expect(receivedEvent).not.toBeNull()
      expect((receivedEvent as unknown as Record<string, unknown>).type).toBe('overridden')

      EventHandler.off(div, 'click')
    })
  })
})
