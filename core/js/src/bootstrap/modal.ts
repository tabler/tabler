/**
 * --------------------------------------------------------------------------
 * Bootstrap modal.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './base-component'
import EventHandler from './dom/event-handler'
import SelectorEngine from './dom/selector-engine'
import Backdrop from './util/backdrop'
import { enableDismissTrigger } from './util/component-functions'
import FocusTrap from './util/focustrap'
import {
  isRTL, isVisible, reflow
} from './util/index'
import ScrollBarHelper from './util/scrollbar'

/**
 * Constants
 */

const NAME = 'modal'
const DATA_KEY = 'bs.modal'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'
const ESCAPE_KEY = 'Escape'

const EVENT_HIDE = `hide${EVENT_KEY}`
const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`
const EVENT_HIDDEN = `hidden${EVENT_KEY}`
const EVENT_SHOW = `show${EVENT_KEY}`
const EVENT_SHOWN = `shown${EVENT_KEY}`
const EVENT_RESIZE = `resize${EVENT_KEY}`
const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`
const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY}`
const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`

const CLASS_NAME_OPEN = 'modal-open'
const CLASS_NAME_FADE = 'fade'
const CLASS_NAME_SHOW = 'show'
const CLASS_NAME_STATIC = 'modal-static'

const OPEN_SELECTOR = '.modal.show'
const SELECTOR_DIALOG = '.modal-dialog'
const SELECTOR_MODAL_BODY = '.modal-body'
const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="modal"], [data-tblr-toggle="modal"]'

interface ComponentConfig {
  [key: string]: any
}

interface ComponentConfigType {
  [key: string]: string
}

const Default: ComponentConfig = {
  backdrop: true,
  focus: true,
  keyboard: true
}

const DefaultType: ComponentConfigType = {
  backdrop: '(boolean|string)',
  focus: 'boolean',
  keyboard: 'boolean'
}

/**
 * Class definition
 */

class Modal extends BaseComponent {
  _dialog: HTMLElement | null
  _backdrop: Backdrop
  _focustrap: FocusTrap
  _isShown: boolean
  _isTransitioning: boolean
  _scrollBar: ScrollBarHelper

  constructor(element: HTMLElement | string, config?: Partial<ComponentConfig>) {
    super(element, config)

    this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element)
    this._backdrop = this._initializeBackDrop()
    this._focustrap = this._initializeFocusTrap()
    this._isShown = false
    this._isTransitioning = false
    this._scrollBar = new ScrollBarHelper()

    this._addEventListeners()
  }

  static get Default(): ComponentConfig {
    return Default
  }

  static get DefaultType(): ComponentConfigType {
    return DefaultType
  }

  static get NAME(): string {
    return NAME
  }

  toggle(relatedTarget?: HTMLElement): void {
    return this._isShown ? this.hide() : this.show(relatedTarget)
  }

  show(relatedTarget?: HTMLElement): void {
    if (this._isShown || this._isTransitioning) {
      return
    }

    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW, {
      relatedTarget
    })

    if (showEvent.defaultPrevented) {
      return
    }

    this._isShown = true
    this._isTransitioning = true

    this._scrollBar.hide()

    document.body.classList.add(CLASS_NAME_OPEN)

    this._adjustDialog()

    this._backdrop.show(() => this._showElement(relatedTarget))
  }

  hide(): void {
    if (!this._isShown || this._isTransitioning) {
      return
    }

    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE)

    if (hideEvent.defaultPrevented) {
      return
    }

    this._isShown = false
    this._isTransitioning = true
    this._focustrap.deactivate()

    this._element.classList.remove(CLASS_NAME_SHOW)

    this._queueCallback(() => this._hideModal(), this._element, this._isAnimated())
  }

  dispose(): void {
    EventHandler.off(window, EVENT_KEY)
    EventHandler.off(this._dialog, EVENT_KEY)

    this._backdrop.dispose()
    this._focustrap.deactivate()

    super.dispose()
  }

  handleUpdate(): void {
    this._adjustDialog()
  }

  _initializeBackDrop(): Backdrop {
    return new Backdrop({
      isVisible: Boolean(this._config.backdrop),
      isAnimated: this._isAnimated()
    })
  }

  _initializeFocusTrap(): FocusTrap {
    return new FocusTrap({
      trapElement: this._element
    })
  }

  _showElement(relatedTarget?: HTMLElement): void {
    if (!document.body.contains(this._element)) {
      document.body.append(this._element)
    }

    this._element.style.display = 'block'
    this._element.removeAttribute('aria-hidden')
    this._element.setAttribute('aria-modal', 'true')
    this._element.setAttribute('role', 'dialog')
    this._element.scrollTop = 0

    const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog)
    if (modalBody) {
      modalBody.scrollTop = 0
    }

    reflow(this._element)

    this._element.classList.add(CLASS_NAME_SHOW)

    const transitionComplete = () => {
      if (this._config.focus) {
        this._focustrap.activate()
      }

      this._isTransitioning = false
      EventHandler.trigger(this._element, EVENT_SHOWN, {
        relatedTarget
      })
    }

    this._queueCallback(transitionComplete, this._dialog!, this._isAnimated())
  }

  _addEventListeners(): void {
    EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, (event: Event) => {
      if ((event as KeyboardEvent).key !== ESCAPE_KEY) {
        return
      }

      if (this._config.keyboard) {
        this.hide()
        return
      }

      this._triggerBackdropTransition()
    })

    EventHandler.on(window, EVENT_RESIZE, () => {
      if (this._isShown && !this._isTransitioning) {
        this._adjustDialog()
      }
    })

    EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, (event: Event) => {
      EventHandler.one(this._element, EVENT_CLICK_DISMISS, (event2: Event) => {
        if (this._element !== event.target || this._element !== event2.target) {
          return
        }

        if (this._config.backdrop === 'static') {
          this._triggerBackdropTransition()
          return
        }

        if (this._config.backdrop) {
          this.hide()
        }
      })
    })
  }

  _hideModal(): void {
    this._element.style.display = 'none'
    this._element.setAttribute('aria-hidden', 'true')
    this._element.removeAttribute('aria-modal')
    this._element.removeAttribute('role')
    this._isTransitioning = false

    this._backdrop.hide(() => {
      document.body.classList.remove(CLASS_NAME_OPEN)
      this._resetAdjustments()
      this._scrollBar.reset()
      EventHandler.trigger(this._element, EVENT_HIDDEN)
    })
  }

  _isAnimated(): boolean {
    return this._element.classList.contains(CLASS_NAME_FADE)
  }

  _triggerBackdropTransition(): void {
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED)
    if (hideEvent.defaultPrevented) {
      return
    }

    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight
    const initialOverflowY = this._element.style.overflowY
    if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
      return
    }

    if (!isModalOverflowing) {
      this._element.style.overflowY = 'hidden'
    }

    this._element.classList.add(CLASS_NAME_STATIC)
    this._queueCallback(() => {
      this._element.classList.remove(CLASS_NAME_STATIC)
      this._queueCallback(() => {
        this._element.style.overflowY = initialOverflowY
      }, this._dialog!)
    }, this._dialog!)

    this._element.focus()
  }

  _adjustDialog(): void {
    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight
    const scrollbarWidth = this._scrollBar.getWidth()
    const isBodyOverflowing = scrollbarWidth > 0

    if (isBodyOverflowing && !isModalOverflowing) {
      const property = isRTL() ? 'paddingLeft' : 'paddingRight'
      this._element.style[property] = `${scrollbarWidth}px`
    }

    if (!isBodyOverflowing && isModalOverflowing) {
      const property = isRTL() ? 'paddingRight' : 'paddingLeft'
      this._element.style[property] = `${scrollbarWidth}px`
    }
  }

  _resetAdjustments(): void {
    this._element.style.paddingLeft = ''
    this._element.style.paddingRight = ''
  }
}

/**
 * Data API implementation
 */

EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (this: HTMLElement, event: Event) {
  const target = SelectorEngine.getElementFromSelector(this)

  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault()
  }

  EventHandler.one(target, EVENT_SHOW, (showEvent: Event) => {
    if (showEvent.defaultPrevented) {
      return
    }

    EventHandler.one(target, EVENT_HIDDEN, () => {
      if (isVisible(this)) {
        this.focus()
      }
    })
  })

  const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR)
  if (alreadyOpen) {
    ;(Modal.getInstance(alreadyOpen) as Modal).hide()
  }

  const data = Modal.getOrCreateInstance(target) as Modal

  data.toggle(this)
})

enableDismissTrigger(Modal)

export default Modal
