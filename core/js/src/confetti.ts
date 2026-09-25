/**
 * --------------------------------------------------------------------------
 * Tabler confetti.ts
 * Licensed under MIT (https://github.com/tabler/tabler/blob/dev/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './bootstrap/base-component'
import EventHandler from './bootstrap/dom/event-handler'
import Manipulator from './bootstrap/dom/manipulator'
import SelectorEngine from './bootstrap/dom/selector-engine'
import { isDisabled } from './bootstrap/util/index'
import type { ComponentConfig as BaseConfig, ElementSelector } from './bootstrap/types'

type ComponentConfig = {
  /** how many pieces one burst pours out */
  count: number
  /** ms during which pieces keep pouring; the first frames get the most */
  duration: number
  /** how fast the pour thins out; higher means a sharper splash at the start */
  decay: number
  /** share of the viewport height at the bottom where pieces fade out */
  fade: number
  /** multiplier for the fall speed */
  speed: number
  /** piece colours; `null` reads the Tabler palette from CSS custom properties */
  colors: string[] | null
}

type ComponentConfigInput = Partial<Omit<ComponentConfig, 'colors'>> & {
  colors?: string[] | string | null
}

type Particle = {
  emitter: Emitter
  x: number
  y: number
  w: number
  h: number
  color: string
  vx: number
  vy: number
  speed: number
  angle: number
  spin: number
  flip: number
  flipSpeed: number
  sway: number
  alpha: number
}

type Emitter = {
  element: HTMLElement
  config: ComponentConfig
  colors: string[]
  startedAt: number
  emitted: number
  /** `stop()` was called: nothing new is poured, what is in the air still falls */
  stopped: boolean
  /** every piece has landed and `end` was fired */
  done: boolean
}

/**
 * Constants
 */

const NAME = 'confetti'
const DATA_KEY = `bs.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_START = `start${EVENT_KEY}`
const EVENT_END = `end${EVENT_KEY}`
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}.data-api`

const CLASS_NAME_CANVAS = `${NAME}-canvas`

const SELECTOR_DATA_TOGGLE = `[data-bs-toggle="${NAME}"], [data-tblr-toggle="${NAME}"]`

// Palette names looked up as `--tblr-<name>` on the root element; the hex
// values are the fallback for a page that loads the script without the CSS.
const PALETTE: [string, string][] = [
  ['blue', '#066fd1'],
  ['azure', '#4299e1'],
  ['indigo', '#4263eb'],
  ['purple', '#ae3ec9'],
  ['pink', '#d6336c'],
  ['red', '#d63939'],
  ['orange', '#f76707'],
  ['yellow', '#f59f00'],
  ['lime', '#74b816'],
  ['green', '#2fb344'],
  ['teal', '#0ca678'],
  ['cyan', '#17a2b8'],
]

// The physics below is tuned for this viewport height; taller windows get
// proportionally faster pieces so the fall takes the same time everywhere.
const REFERENCE_HEIGHT = 800
const FRAME_MS = 1000 / 60
const MAX_DPR = 2

const Default: ComponentConfig = {
  count: 220,
  duration: 3500,
  decay: 3.5,
  fade: 0.15,
  speed: 1,
  colors: null,
}

const DefaultType: Record<keyof ComponentConfig, string> = {
  count: 'number',
  duration: 'number',
  decay: 'number',
  fade: 'number',
  speed: 'number',
  colors: '(array|string|null)',
}

/**
 * Stage
 *
 * One fixed canvas shared by every burst on the page. It is created on the
 * first burst and removed once the last piece has landed, so an idle page
 * carries no extra element and no running animation frame.
 */

const stage = {
  canvas: null as HTMLCanvasElement | null,
  context: null as CanvasRenderingContext2D | null,
  particles: [] as Particle[],
  emitters: [] as Emitter[],
  frame: 0,
  lastTick: 0,

  add(emitter: Emitter): void {
    this.emitters.push(emitter)
    this._mount()

    if (!this.frame) {
      this.lastTick = performance.now()
      this.frame = requestAnimationFrame((now) => this._tick(now))
    }
  },

  _mount(): void {
    if (this.canvas) {
      return
    }

    const canvas = document.createElement('canvas')
    canvas.className = CLASS_NAME_CANVAS
    canvas.setAttribute('aria-hidden', 'true')
    Object.assign(canvas.style, {
      position: 'fixed',
      inset: '0',
      width: '100%',
      height: '100%',
      zIndex: '9999',
      pointerEvents: 'none',
      display: 'block',
    })

    document.body.append(canvas)
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this._resize()
    window.addEventListener('resize', this._onResize)
  },

  _unmount(): void {
    cancelAnimationFrame(this.frame)
    this.frame = 0
    window.removeEventListener('resize', this._onResize)
    this.canvas?.remove()
    this.canvas = null
    this.context = null
    this.particles = []
    this.emitters = []
  },

  _onResize: (): void => {
    stage._resize()
  },

  _resize(): void {
    if (!this.canvas || !this.context) {
      return
    }

    // The backing store is scaled for HiDPI screens; the CSS size above keeps
    // the element at the viewport size, so the drawing stays sharp and 1:1.
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
    this.canvas.width = window.innerWidth * dpr
    this.canvas.height = window.innerHeight * dpr
    this.context.setTransform(dpr, 0, 0, dpr, 0, 0)
  },

  _spawn(emitter: Emitter): Particle {
    const { colors, config } = emitter
    const speed = (window.innerHeight / REFERENCE_HEIGHT) * config.speed

    return {
      emitter,
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * 30,
      w: 6 + Math.random() * 3.6,
      h: 10 + Math.random() * 4.4,
      color: colors[Math.floor(Math.random() * colors.length)] ?? '#000',
      vx: (Math.random() - 0.5) * 1.2,
      vy: (1.5 + Math.random() * 2.1) * speed,
      speed,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.25,
      flip: Math.random() * Math.PI * 2,
      flipSpeed: 0.12 + Math.random() * 0.15,
      sway: Math.random() * Math.PI * 2,
      alpha: 1,
    }
  },

  // Pour: the share of pieces emitted by time t follows 1 - e^(-k t), so the
  // first frames get the most and the tail thins out to single pieces.
  _pour(emitter: Emitter, now: number): void {
    const { count, duration, decay } = emitter.config
    const elapsed = now - emitter.startedAt

    if (emitter.stopped || elapsed >= duration) {
      return
    }

    const t = elapsed / duration
    const target = Math.round((count * (1 - Math.exp(-decay * t))) / (1 - Math.exp(-decay)))

    while (emitter.emitted < target) {
      this.particles.push(this._spawn(emitter))
      emitter.emitted++
    }
  },

  _tick(now: number): void {
    const context = this.context
    if (!context) {
      return
    }

    // Steps are scaled to the real frame time so a 120 Hz screen or a
    // throttled tab animate at the same pace as 60 Hz.
    const step = Math.min((now - this.lastTick) / FRAME_MS, 3)
    this.lastTick = now

    const width = window.innerWidth
    const height = window.innerHeight
    context.clearRect(0, 0, width, height)

    for (const emitter of this.emitters) {
      this._pour(emitter, now)
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i]!
      const fadeFrom = height * (1 - p.emitter.config.fade)

      p.sway += 0.05 * step
      p.vy = Math.min(p.vy + 0.025 * p.speed * step, 4.2 * p.speed)
      p.x += (p.vx + Math.sin(p.sway) * 0.7) * step
      p.y += p.vy * step
      p.angle += p.spin * step
      p.flip += p.flipSpeed * step

      if (p.y > fadeFrom) {
        p.alpha = Math.max(0, 1 - (p.y - fadeFrom) / (height - fadeFrom))
      }

      if (p.alpha === 0) {
        this.particles.splice(i, 1)
        continue
      }

      context.save()
      context.globalAlpha = p.alpha
      context.translate(p.x, p.y)
      context.rotate(p.angle)
      // The flip squashes the piece along one axis, which reads as tumbling.
      context.scale(1, Math.cos(p.flip))
      context.fillStyle = p.color
      context.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
      context.restore()
    }

    this._settle(now)

    if (this.emitters.length === 0) {
      this._unmount()
      return
    }

    this.frame = requestAnimationFrame((next) => this._tick(next))
  },

  // An emitter is finished once it pours nothing more and none of its pieces
  // is still in the air; `end` fires on its element and it leaves the stage.
  _settle(now: number): void {
    for (let i = this.emitters.length - 1; i >= 0; i--) {
      const emitter = this.emitters[i]!
      const pouring = !emitter.stopped && now - emitter.startedAt < emitter.config.duration
      const airborne = this.particles.some((p) => p.emitter === emitter)

      if (pouring || airborne) {
        continue
      }

      this.emitters.splice(i, 1)
      emitter.done = true
      EventHandler.trigger(emitter.element, EVENT_END)
    }
  },
}

/**
 * Class definition
 *
 * Pours a short shower of confetti over the page, like a bucket emptied from
 * the top edge: dense at first, then thinning out. Nothing is drawn when the
 * user prefers reduced motion, but the events still fire.
 */

class Confetti extends BaseComponent {
  declare _element: HTMLElement
  declare _config: ComponentConfig
  _emitter: Emitter | null = null

  constructor(element: ElementSelector, config?: ComponentConfigInput) {
    super(element, config as BaseConfig | undefined)
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
  burst(): void {
    const startEvent = EventHandler.trigger(this._element, EVENT_START)

    if (startEvent?.defaultPrevented) {
      return
    }

    // A second burst while one is pouring restarts the pour; pieces already
    // in the air keep falling.
    this.stop()

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      EventHandler.trigger(this._element, EVENT_END)
      return
    }

    this._emitter = {
      element: this._element,
      config: this._config,
      colors: this._colors(),
      startedAt: performance.now(),
      emitted: 0,
      stopped: false,
      done: false,
    }

    stage.add(this._emitter)
  }

  stop(): void {
    if (this._emitter && !this._emitter.done) {
      this._emitter.stopped = true
    }

    this._emitter = null
  }

  dispose(): void {
    this.stop()
    super.dispose()
  }

  // Private
  _configAfterMerge(config: BaseConfig): BaseConfig {
    if (typeof config.colors === 'string') {
      config.colors = config.colors
        .split(',')
        .map((color) => color.trim())
        .filter(Boolean)
    }

    return config
  }

  _colors(): string[] {
    const { colors } = this._config
    if (colors && colors.length > 0) {
      return colors
    }

    // The palette is read at burst time, so a theme switched at runtime is
    // picked up without re-creating the instance.
    const style = getComputedStyle(document.documentElement)
    return PALETTE.map(([name, fallback]) => style.getPropertyValue(`--tblr-${name}`).trim() || fallback)
  }
}

/**
 * Data API implementation
 *
 * A trigger bursts on its `data-bs-target` when it has one, otherwise on
 * itself, so the events fire where the page can listen for them.
 */

EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (this: HTMLElement, event: Event) {
  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault()
  }

  if (isDisabled(this)) {
    return
  }

  const target = SelectorEngine.getElementFromSelector(this) || this
  const instance = Confetti.getOrCreateInstance(target, Manipulator.getDataAttributes(this)) as Confetti
  instance.burst()
})

export default Confetti
