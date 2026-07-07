import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import BaseComponent from '../../src/bootstrap/base-component'
import EventHandler from '../../src/bootstrap/dom/event-handler'
import { noop } from '../../src/bootstrap/util/index'
import { clearFixture, getFixture } from '../helpers/fixture'

class DummyClass extends BaseComponent {
  constructor(element: string | HTMLElement) {
    super(element)
    EventHandler.on(this._element, `click${DummyClass.EVENT_KEY}`, noop as EventListener)
  }

  static get NAME(): string {
    return 'dummy'
  }
}

describe('BaseComponent', () => {
  let fixtureEl: HTMLElement
  let element: HTMLElement
  let instance: DummyClass

  const createInstance = () => {
    fixtureEl.innerHTML = '<div id="foo"></div>'
    element = fixtureEl.querySelector('#foo')!
    instance = new DummyClass(element)
  }

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
  })

  describe('Static Methods', () => {
    it('VERSION should return a string', () => {
      expect(typeof DummyClass.VERSION).toBe('string')
    })

    it('DATA_KEY should return plugin data key', () => {
      expect(DummyClass.DATA_KEY).toBe('bs.dummy')
    })

    it('NAME should throw if not overridden', () => {
      expect(() => BaseComponent.NAME).toThrow(Error)
    })

    it('NAME should return plugin name', () => {
      expect(DummyClass.NAME).toBe('dummy')
    })

    it('EVENT_KEY should return plugin event key', () => {
      expect(DummyClass.EVENT_KEY).toBe('.bs.dummy')
    })

    it('eventName should return namespaced event', () => {
      expect(DummyClass.eventName('show')).toBe('show.bs.dummy')
    })
  })

  describe('constructor', () => {
    it('should accept element passed as DOM element', () => {
      fixtureEl.innerHTML = '<div id="foo"></div>'
      const el = fixtureEl.querySelector('#foo')!
      const inst = new DummyClass(el)
      expect(inst._element).toBe(el)
    })

    it('should accept element passed as CSS selector', () => {
      fixtureEl.innerHTML = '<div id="bar"></div>'
      const inst = new DummyClass('#bar')
      expect(inst._element).toBe(fixtureEl.querySelector('#bar'))
    })

    it('should not initialize if element is not found', () => {
      fixtureEl.innerHTML = ''
      const inst = new DummyClass('#nonexistent')
      expect(inst._element).toBeUndefined()
    })
  })

  describe('dispose', () => {
    it('should dispose a component', () => {
      createInstance()
      expect(DummyClass.getInstance(element)).not.toBeNull()

      instance.dispose()

      expect(DummyClass.getInstance(element)).toBeNull()
      expect(instance._element).toBeNull()
    })

    it('should de-register element event listeners', () => {
      createInstance()
      const spy = vi.spyOn(EventHandler, 'off')

      instance.dispose()

      expect(spy).toHaveBeenCalledWith(element, DummyClass.EVENT_KEY)
      vi.restoreAllMocks()
    })
  })

  describe('getInstance', () => {
    it('should return an instance', () => {
      createInstance()
      expect(DummyClass.getInstance(element)).toBe(instance)
      expect(DummyClass.getInstance(element)).toBeInstanceOf(DummyClass)
    })

    it('should accept CSS selector', () => {
      createInstance()
      expect(DummyClass.getInstance('#foo')).toBe(instance)
    })

    it('should return null when there is no instance', () => {
      fixtureEl.innerHTML = '<div></div>'
      const div = fixtureEl.querySelector('div')!
      expect(DummyClass.getInstance(div)).toBeNull()
    })
  })

  describe('getOrCreateInstance', () => {
    it('should return existing instance', () => {
      createInstance()
      expect(DummyClass.getOrCreateInstance(element)).toBe(instance)
      expect(DummyClass.getOrCreateInstance(element)).toBeInstanceOf(DummyClass)
    })

    it('should create new instance if none exists', () => {
      fixtureEl.innerHTML = '<div id="foo"></div>'
      element = fixtureEl.querySelector('#foo')!

      expect(DummyClass.getInstance(element)).toBeNull()
      expect(DummyClass.getOrCreateInstance(element)).toBeInstanceOf(DummyClass)
    })

    it('should pass null config when config is not an object', () => {
      fixtureEl.innerHTML = '<div id="foo"></div>'
      element = fixtureEl.querySelector('#foo')!

      const inst = DummyClass.getOrCreateInstance(element, 'string-config' as unknown as Record<string, unknown>)
      expect(inst).toBeInstanceOf(DummyClass)
    })
  })

  describe('_queueCallback', () => {
    it('should execute callback immediately when isAnimated is false', () => {
      createInstance()
      const callback = vi.fn()
      instance._queueCallback(callback, element, false)
      expect(callback).toHaveBeenCalledOnce()
    })

    it('should execute callback after transition when isAnimated is true', () => {
      createInstance()
      const callback = vi.fn()
      instance._queueCallback(callback, element, true)
      expect(callback).not.toHaveBeenCalled()
      element.dispatchEvent(new Event('transitionend'))
      expect(callback).toHaveBeenCalledOnce()
    })
  })
})
