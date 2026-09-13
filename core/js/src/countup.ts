/**
 * --------------------------------------------------------------------------
 * Tabler countup.ts
 * Licensed under MIT (https://github.com/tabler/tabler/blob/dev/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './bootstrap/base-component'
import EventHandler from './bootstrap/dom/event-handler'
import SelectorEngine from './bootstrap/dom/selector-engine'
import type { ElementSelector } from './bootstrap/types'

type ComponentConfig = {
  /** start when the element scrolls into view; off starts at once */
  autoAnimate: boolean
  startVal: number
  /** seconds */
  duration: number
  decimalPlaces: number
  useEasing: boolean
  useGrouping: boolean
  separator: string
  decimal: string
  prefix: string
  suffix: string
}

type ComponentConfigInput = Partial<ComponentConfig> & Record<string, unknown>

/**
 * Constants
 */

const NAME = 'countup'
const DATA_KEY = `bs.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`
const DATA_ATTRIBUTE = `data-${NAME}`

const EVENT_START = `start${EVENT_KEY}`
const EVENT_COMPLETE = `complete${EVENT_KEY}`

const DATA_ATTRIBUTE_ALIAS = `data-tblr-${NAME}`

const SELECTOR_DATA_COUNTUP = `[${DATA_ATTRIBUTE}], [${DATA_ATTRIBUTE_ALIAS}]`

const Default: ComponentConfig = {
  autoAnimate: true,
  startVal: 0,
  duration: 2,
  decimalPlaces: 0,
  useEasing: true,
  useGrouping: true,
  separator: ',',
  decimal: '.',
  prefix: '',
  suffix: '',
}

const DefaultType: Record<keyof ComponentConfig, string> = {
  autoAnimate: 'boolean',
  startVal: 'number',
  duration: 'number',
  decimalPlaces: 'number',
  useEasing: 'boolean',
  useGrouping: 'boolean',
  separator: 'string',
  decimal: 'string',
  prefix: 'string',
  suffix: 'string',
}

/**
 * Helpers
 */

// Strips thousands separators, currency symbols and other non-numeric
// characters, so formatted targets like "1,234", "1 234" or "$99.5" parse.
const parseValue = (input: string | number): number => (typeof input === 'number' ? input : Number.parseFloat(input.replace(/[^0-9.-]/g, '')))

// easeOutExpo, the same curve countUp.js used
const easeOut = (t: number): number => (t >= 1 ? 1 : ((1 - 2 ** (-10 * t)) * 1024) / 1023)

const reducedMotion = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Class definition
 *
 * Animates the number written inside the element from `startVal` to it,
 * formatted with grouping, decimals, a prefix and a suffix. Options come from
 * the `data-countup` attribute as JSON, or from the config object.
 */

class CountUp extends BaseComponent {
  declare _element: HTMLElement
  declare _config: ComponentConfig
  _endVal = 0
  _value = 0
  _frame = 0
  _observer: IntersectionObserver | null = null
  // animation in progress: where it goes, how far it got
  _from = 0
  _elapsed = 0
  _running = false
  _paused = false

  constructor(element: ElementSelector, config?: ComponentConfigInput) {
    super(element, config)

    if (!this._element) {
      return
    }

    const value = parseValue(this._element.textContent ?? '')
    if (Number.isNaN(value)) {
      return
    }

    this._endVal = value
    this._value = this._config.startVal
    this._print(this._value)

    if (!this._config.autoAnimate) {
      this.start()
      return
    }

    // Wait for the element to scroll into view, then run once.
    if (typeof IntersectionObserver === 'undefined') {
      this.start()
      return
    }

    this._observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        this._observer?.disconnect()
        this._observer = null
        this.start()
      }
    })
    this._observer.observe(this._element)
  }

  // Getters
  static get Default(): ComponentConfig {
    return Default
  }

  static get DefaultType(): Record<keyof ComponentConfig, string> {
    return DefaultType
  }

  static get NAME(): string {
    return NAME
  }

  // Public
  start(): void {
    this._animate(this._value, this._endVal)
  }

  reset(): void {
    this._stop()
    this._value = this._config.startVal
    this._print(this._value)
  }

  update(value: number | string): void {
    const parsed = parseValue(value)
    if (Number.isNaN(parsed)) {
      return
    }

    this._endVal = parsed
    this._animate(this._value, this._endVal)
  }

  pauseResume(): void {
    if (this._paused) {
      this._paused = false
      this._run()
    } else if (this._running) {
      this._paused = true
      cancelAnimationFrame(this._frame)
    }
  }

  dispose(): void {
    this._stop()
    this._observer?.disconnect()
    super.dispose()
  }

  // Private
  _mergeConfigObj(config?: Record<string, unknown>, element?: HTMLElement): Record<string, unknown> {
    // `data-countup='{"duration":4}'` carries the options as JSON; a bare
    // `data-countup` or invalid JSON means defaults.
    let dataOptions: Record<string, unknown> = {}
    const raw = element?.getAttribute(DATA_ATTRIBUTE) ?? element?.getAttribute(DATA_ATTRIBUTE_ALIAS)

    if (raw) {
      try {
        dataOptions = JSON.parse(raw)
      } catch {
        // ignore invalid JSON
      }
    }

    return super._mergeConfigObj({ ...dataOptions, ...config }, element)
  }

  _animate(from: number, to: number): void {
    this._stop()

    // Users who asked for less motion get the final number at once.
    if (from === to || this._config.duration <= 0 || reducedMotion()) {
      this._finish(to)
      return
    }

    this._from = from
    this._elapsed = 0
    this._running = true
    EventHandler.trigger(this._element, EVENT_START)
    this._run()
  }

  _run(): void {
    const duration = this._config.duration * 1000
    let last = performance.now()

    const step = (now: number): void => {
      this._elapsed += now - last
      last = now

      const t = Math.min(1, this._elapsed / duration)
      const progress = this._config.useEasing ? easeOut(t) : t
      this._value = this._from + (this._endVal - this._from) * progress
      this._print(this._value)

      if (t < 1) {
        this._frame = requestAnimationFrame(step)
      } else {
        this._finish(this._endVal)
      }
    }

    this._frame = requestAnimationFrame(step)
  }

  _finish(value: number): void {
    this._running = false
    this._paused = false
    this._value = value
    this._print(value)
    EventHandler.trigger(this._element, EVENT_COMPLETE)
  }

  _stop(): void {
    cancelAnimationFrame(this._frame)
    this._running = false
    this._paused = false
  }

  _print(value: number): void {
    this._element.textContent = this._format(value)
  }

  _format(value: number): string {
    const { decimalPlaces, useGrouping, separator, decimal, prefix, suffix } = this._config
    const [integer, fraction] = Math.abs(value).toFixed(decimalPlaces).split('.') as [string, string | undefined]
    const grouped = useGrouping ? integer.replace(/\B(?=(\d{3})+(?!\d))/g, separator) : integer

    return `${value < 0 ? '-' : ''}${prefix}${grouped}${fraction ? decimal + fraction : ''}${suffix}`
  }
}

/**
 * Data API implementation
 */

// js-docs-start countup-init
for (const element of SelectorEngine.find(SELECTOR_DATA_COUNTUP)) {
  CountUp.getOrCreateInstance(element)
}
// js-docs-end countup-init

export default CountUp
