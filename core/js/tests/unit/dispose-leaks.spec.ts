import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import * as VanillaCalendarPro from 'vanilla-calendar-pro'
import { clearFixture, getFixture } from '../helpers/fixture'
import { getRegistry } from '../../src/bootstrap/util/component-functions'
import type { RegisteredPlugin } from '../../src/bootstrap/util/component-functions'
import '../../tabler'

vi.mock('@popperjs/core', () => ({
  createPopper: vi.fn(() => ({
    destroy: vi.fn(),
    update: vi.fn(),
    setOptions: vi.fn(),
  })),
}))

type Instance = Record<string, unknown> & { dispose(): void }

interface Scenario {
  markup: string
  element: string
  exercise?: (instance: Instance) => unknown
}

interface Listener {
  target: EventTarget
  type: string
  listener: EventListenerOrEventListenerObject | null
  capture: boolean
}

type Observable = { observe: (...args: unknown[]) => void; disconnect: () => void }

const wait = (ms = 0): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

const call = (method: string) => (instance: Instance) => (instance[method] as () => unknown).call(instance)

const SCENARIOS: Record<string, Scenario> = {
  'autosize': { markup: '<textarea data-bs-toggle="autosize"></textarea>', element: 'textarea' },
  'banner': { markup: '<div class="banner"><button type="button" data-bs-dismiss="banner"></button></div>', element: '.banner' },
  'card-fullscreen': { markup: '<div class="card"><button type="button" data-bs-toggle="card-fullscreen"></button></div>', element: 'button', exercise: call('show') },
  'clipboard': { markup: '<input id="api-key" value="key"><button type="button" data-bs-toggle="clipboard" data-bs-target="#api-key">Copy</button>', element: 'button' },
  'combobox': {
    markup: '<form><button class="form-select combobox-toggle" type="button" data-bs-toggle="combobox"><span class="combobox-value"></span></button><div class="dropdown-menu"><button class="dropdown-item" type="button" data-bs-value="a">Alpha</button></div></form>',
    element: '[data-bs-toggle="combobox"]',
    exercise: call('show'),
  },
  'confetti': { markup: '<button type="button"></button>', element: 'button', exercise: call('burst') },
  'countup': { markup: '<h1 data-countup>300</h1>', element: 'h1' },
  'datepicker': { markup: '<input type="text" data-bs-toggle="datepicker">', element: 'input', exercise: call('show') },
  'dropzone': { markup: '<form><div class="dropzone" data-bs-toggle="dropzone"><label class="dropzone-area"><input class="dropzone-input" type="file" name="files" multiple></label></div></form>', element: '.dropzone' },
  'input-mask': { markup: '<input type="text" data-mask="(00) 0000-0000">', element: 'input' },
  'otpInput': { markup: '<div class="otp" data-bs-toggle="otp"><input type="text"></div>', element: '.otp' },
  'phoneInput': { markup: '<input type="tel" class="form-control">', element: 'input' },
  'sortable': { markup: '<ul data-sortable><li>a</li><li>b</li></ul>', element: 'ul' },
  'sparkline': { markup: '<span class="sparkline" data-bs-toggle="sparkline" data-bs-values="3,4,2,6"></span>', element: '.sparkline' },
  'numberInput': {
    markup: '<div class="number-input" data-bs-toggle="number-input"><button type="button" data-bs-number-input-action="decrement">-</button><input type="text" value="1"><button type="button" data-bs-number-input-action="increment">+</button></div>',
    element: '.number-input',
  },
  'selectAll': {
    markup: '<div data-bs-toggle="select-all"><table class="table-selectable"><thead><tr><th><input type="checkbox" class="table-selectable-check" data-bs-select-all-check></th></tr></thead><tbody><tr><td><input type="checkbox" class="table-selectable-check"></td></tr></tbody></table></div>',
    element: '[data-bs-toggle="select-all"]',
  },
  'strength': { markup: '<div><input type="password"><div class="strength" data-bs-strength><span class="strength-segment"></span></div></div>', element: '.strength' },
  'switch-icon': { markup: '<button type="button" class="switch-icon" data-bs-toggle="switch-icon"></button>', element: 'button' },
  'alert': { markup: '<div class="alert"></div>', element: '.alert' },
  'button': { markup: '<button data-bs-toggle="button">Toggle</button>', element: 'button', exercise: call('toggle') },
  'carousel': { markup: '<div class="carousel slide"><div class="carousel-inner"><div class="carousel-item active"></div><div class="carousel-item"></div></div></div>', element: '.carousel', exercise: call('cycle') },
  'collapse': { markup: '<div class="collapse"></div>', element: '.collapse', exercise: call('show') },
  'dropdown': {
    markup: '<div class="dropdown"><button class="dropdown-toggle" data-bs-toggle="dropdown">Menu</button><div class="dropdown-menu"><a class="dropdown-item" href="#">Link</a></div></div>',
    element: '[data-bs-toggle="dropdown"]',
    exercise: call('show'),
  },
  'modal': { markup: '<div class="modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><button type="button" data-bs-dismiss="modal">Close</button></div></div></div>', element: '.modal', exercise: call('show') },
  'navoverflow': { markup: '<div class="nav-overflow"><ul class="nav"><li class="nav-item"><a class="nav-link" href="#">Link</a></li></ul></div>', element: '.nav-overflow' },
  'offcanvas': { markup: '<div class="offcanvas offcanvas-start" tabindex="-1"><button type="button" data-bs-dismiss="offcanvas">Close</button></div>', element: '.offcanvas', exercise: call('show') },
  'popover': { markup: '<a href="#" title="Title" data-bs-content="Body">Trigger</a>', element: 'a', exercise: call('show') },
  'scrollspy': {
    markup: '<nav id="spy-nav"><a href="#spy-one">One</a></nav><div data-bs-target="#spy-nav" style="height: 50px; overflow: auto"><div id="spy-one" style="height: 100px"></div></div>',
    element: '[data-bs-target]',
  },
  'tab': {
    markup: '<ul class="nav"><li><a class="nav-link" data-bs-toggle="tab" href="#tab-pane">Tab</a></li></ul><div class="tab-content"><div class="tab-pane" id="tab-pane"></div></div>',
    element: '[data-bs-toggle="tab"]',
    exercise: call('show'),
  },
  'toast': { markup: '<div class="toast"></div>', element: '.toast', exercise: call('show') },
  'toggler': { markup: '<div data-bs-toggle="toggler" data-bs-value="bg-warning" data-bs-attribute="class"></div>', element: 'div', exercise: call('toggle') },
  'tooltip': { markup: '<a href="#" title="Title">Trigger</a>', element: 'a', exercise: call('show') },
}

const ALLOWED_LEFTOVERS: Record<string, string[]> = {
  confetti: ['resize'],
}

const plugins = (): RegisteredPlugin[] => [...new Set(getRegistry().map((registration) => registration.Plugin))]

const isCapture = (options?: boolean | EventListenerOptions): boolean => (typeof options === 'boolean' ? options : Boolean(options?.capture))

const describeTarget = (target: EventTarget): string => {
  if (target === document) {
    return 'document'
  }

  if (target === window) {
    return 'window'
  }

  return target instanceof Element ? target.nodeName.toLowerCase() : 'target'
}

describe('dispose', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
    window.VanillaCalendarPro = VanillaCalendarPro
    window.Sortable = vi.fn(function (this: Record<string, unknown>) {
      this.destroy = vi.fn()
    }) as unknown as Window['Sortable']
  })

  afterEach(() => {
    vi.restoreAllMocks()
    clearFixture()
    document.body.classList.remove('modal-open')
    document.body.removeAttribute('style')
    for (const backdrop of document.querySelectorAll('.modal-backdrop, .offcanvas-backdrop')) {
      backdrop.remove()
    }
  })

  it('has a scenario for every registered plugin', () => {
    const missing = plugins()
      .map((Plugin) => Plugin.NAME)
      .filter((name) => !(name in SCENARIOS))

    expect(missing).toEqual([])
  })

  it.each(Object.keys(SCENARIOS))('%s leaves no listeners or observers outside its markup', async (name) => {
    const Plugin = plugins().find((plugin) => plugin.NAME === name)
    expect(Plugin, name).toBeDefined()

    const scenario = SCENARIOS[name]
    fixtureEl.innerHTML = scenario.markup
    const element = fixtureEl.querySelector<HTMLElement>(scenario.element)!

    const listeners: Listener[] = []
    const observers = new Set<object>()
    const { addEventListener, removeEventListener } = EventTarget.prototype

    vi.spyOn(EventTarget.prototype, 'addEventListener').mockImplementation(function (this: EventTarget, type, listener, options) {
      listeners.push({ target: this, type, listener, capture: isCapture(options) })
      addEventListener.call(this, type, listener, options)
    })
    vi.spyOn(EventTarget.prototype, 'removeEventListener').mockImplementation(function (this: EventTarget, type, listener, options) {
      const index = listeners.findIndex((entry) => entry.target === this && entry.type === type && entry.listener === listener && entry.capture === isCapture(options))
      if (index !== -1) {
        listeners.splice(index, 1)
      }

      removeEventListener.call(this, type, listener, options)
    })

    for (const Observer of [ResizeObserver, IntersectionObserver, MutationObserver]) {
      const prototype = Observer.prototype as unknown as Observable
      const { observe, disconnect } = prototype
      vi.spyOn(prototype, 'observe').mockImplementation(function (this: object, ...args: unknown[]) {
        observers.add(this)
        observe.apply(this, args)
      })
      vi.spyOn(prototype, 'disconnect').mockImplementation(function (this: object) {
        observers.delete(this)
        disconnect.call(this)
      })
    }

    const instance = Plugin!.getOrCreateInstance(element) as Instance
    await scenario.exercise?.(instance)
    await wait(50)
    instance.dispose()
    await wait()

    const isOutside = (target: EventTarget): boolean => !(target instanceof Node) || (target.isConnected && !fixtureEl.contains(target))
    const allowed = ALLOWED_LEFTOVERS[name] ?? []
    const leftovers = listeners.filter((entry) => isOutside(entry.target) && !allowed.includes(entry.type)).map((entry) => `${describeTarget(entry.target)} ${entry.type}`)

    expect(leftovers).toEqual([])
    expect(observers.size).toBe(0)
  })
})
