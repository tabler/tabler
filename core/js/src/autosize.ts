/**
 * --------------------------------------------------------------------------
 * Tabler autosize.ts
 * Licensed under MIT (https://github.com/tabler/tabler/blob/dev/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './bootstrap/base-component'
import EventHandler from './bootstrap/dom/event-handler'
import { initAll } from './bootstrap/util/component-functions'
import type { ElementSelector } from './bootstrap/types'

type ComponentConfig = Record<string, never>

type ComponentConfigInput = Record<string, unknown>

/**
 * Constants
 */

const NAME = 'autosize'
const DATA_KEY = `bs.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_RESIZED = `resized${EVENT_KEY}`

const SELECTOR_DATA_TOGGLE = `[data-bs-toggle="${NAME}"], [data-tblr-toggle="${NAME}"]`

const Default: ComponentConfig = {}

const DefaultType: Record<keyof ComponentConfig, string> = {}

/**
 * Class definition
 *
 * Grows a textarea with its content and shrinks it back when text is removed.
 * The height follows `scrollHeight`, so `rows` sets the starting height and
 * `max-height` caps the growth, after which the field scrolls again.
 */

class Autosize extends BaseComponent {
  declare _element: HTMLTextAreaElement
  declare _config: ComponentConfig
  _observer: ResizeObserver | null = null
  _inlineStyle = ''
  _width = 0
  _onInput = (): void => this.update()

  constructor(element: ElementSelector, config?: ComponentConfigInput) {
    super(element, config)

    if (!this._element) {
      return
    }

    this._inlineStyle = this._element.getAttribute('style') ?? ''
    this._element.style.resize = 'none'
    this._element.style.overflowY = 'hidden'

    // `input` is not in EventHandler's list of native events, so it is bound
    // directly.
    this._element.addEventListener('input', this._onInput)

    // Text wraps differently when the field changes width (a resized window,
    // a collapsing sidebar), so the height is measured again then.
    if (typeof ResizeObserver !== 'undefined') {
      this._observer = new ResizeObserver(() => {
        if (this._element.offsetWidth !== this._width) {
          this._width = this._element.offsetWidth
          this.update()
        }
      })
      this._observer.observe(this._element)
    }

    this.update()
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
  update(): void {
    const element = this._element
    if (!element.isConnected || element.getClientRects().length === 0) {
      return
    }

    // Collapsing the field to measure it can move the page; the scroll
    // position is put back afterwards.
    const { scrollTop } = document.documentElement
    const style = getComputedStyle(element)
    // scrollHeight is the padding box: a border-box field adds its borders, a
    // content-box field drops its padding.
    const extra = style.boxSizing === 'border-box' ? Number.parseFloat(style.borderTopWidth) + Number.parseFloat(style.borderBottomWidth) : -(Number.parseFloat(style.paddingTop) + Number.parseFloat(style.paddingBottom))
    const before = element.style.height

    // Measured without a scrollbar: one left over from the previous size
    // would wrap the text and add a phantom line.
    element.style.overflowY = 'hidden'
    element.style.height = 'auto'
    const height = `${element.scrollHeight + extra}px`
    element.style.height = height

    // Past max-height the content no longer fits, so let the field scroll.
    element.style.overflowY = element.scrollHeight > element.clientHeight ? 'auto' : 'hidden'
    document.documentElement.scrollTop = scrollTop

    if (height !== before) {
      EventHandler.trigger(element, EVENT_RESIZED)
    }
  }

  dispose(): void {
    this._element.removeEventListener('input', this._onInput)
    this._observer?.disconnect()
    if (this._inlineStyle) {
      this._element.setAttribute('style', this._inlineStyle)
    } else {
      this._element.removeAttribute('style')
    }

    super.dispose()
  }
}

/**
 * Data API implementation
 */

// js-docs-start autosize-init
initAll(SELECTOR_DATA_TOGGLE, Autosize)
// js-docs-end autosize-init

export default Autosize
