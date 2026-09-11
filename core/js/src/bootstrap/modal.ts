/**
 * --------------------------------------------------------------------------
 * Bootstrap modal.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './base-component'
import EventHandler from './dom/event-handler'
import SelectorEngine from './dom/selector-engine'
import { enableDismissTrigger } from './util/component-functions'
import { isVisible } from './util/index'

/**
 * Constants
 */

const NAME = 'modal'
const DATA_KEY = 'bs.modal'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'

const EVENT_HIDE = `hide${EVENT_KEY}`
const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`
const EVENT_HIDDEN = `hidden${EVENT_KEY}`
const EVENT_SHOW = `show${EVENT_KEY}`
const EVENT_SHOWN = `shown${EVENT_KEY}`
const EVENT_CLICK_DISMISS = `click${EVENT_KEY}`
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`

const CLASS_NAME_OPEN = 'modal-open'
const CLASS_NAME_FADE = 'fade'
const CLASS_NAME_SHOW = 'show'
const CLASS_NAME_STATIC = 'modal-static'

const OPEN_SELECTOR = '.modal[open]'
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
  keyboard: true,
}

const DefaultType: ComponentConfigType = {
  backdrop: '(boolean|string)',
  keyboard: 'boolean',
}

/**
 * Class definition
 */

class Modal extends BaseComponent {
  declare _element: HTMLDialogElement
  _dialog: HTMLElement | null
  _isTransitioning: boolean
  _cancelHandler: (event: Event) => void

  constructor(element: HTMLElement | string, config?: Partial<ComponentConfig>) {
    super(element, config)

    this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element)
    this._isTransitioning = false

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
    return this._element.open ? this.hide() : this.show(relatedTarget)
  }

  show(relatedTarget?: HTMLElement): void {
    if (this._element.open || this._isTransitioning) {
      return
    }

    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW, {
      relatedTarget,
    })

    if (showEvent.defaultPrevented) {
      return
    }

    this._isTransitioning = true

    // showModal() throws on a dialog that isn't connected to the document.
    if (!document.body.contains(this._element)) {
      document.body.append(this._element)
    }

    document.documentElement.classList.add(CLASS_NAME_OPEN)

    this._element.showModal()
    this._element.scrollTop = 0

    const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog)
    if (modalBody) {
      modalBody.scrollTop = 0
    }

    this._element.classList.add(CLASS_NAME_SHOW)

    this._queueCallback(
      () => {
        this._isTransitioning = false
        EventHandler.trigger(this._element, EVENT_SHOWN, {
          relatedTarget,
        })
      },
      this._element,
      this._isAnimated(),
    )
  }

  hide(): void {
    if (!this._element.open || this._isTransitioning) {
      return
    }

    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE)

    if (hideEvent.defaultPrevented) {
      return
    }

    this._isTransitioning = true
    this._element.classList.remove(CLASS_NAME_SHOW)

    this._queueCallback(() => this._closeAndCleanup(), this._element, this._isAnimated())
  }

  dispose(): void {
    EventHandler.off(this._element, 'cancel', this._cancelHandler)

    if (this._element.open) {
      this._closeAndCleanup()
    }

    super.dispose()
  }

  handleUpdate(): void {
    // Provided for API consistency — the native dialog handles its own positioning.
  }

  _closeAndCleanup(): void {
    this._element.close()
    this._isTransitioning = false

    if (!SelectorEngine.findOne(OPEN_SELECTOR)) {
      document.documentElement.classList.remove(CLASS_NAME_OPEN)
    }

    EventHandler.trigger(this._element, EVENT_HIDDEN)
  }

  _isAnimated(): boolean {
    return this._element.classList.contains(CLASS_NAME_FADE)
  }

  _addEventListeners(): void {
    // The native `cancel` event fires on Escape for dialogs opened with
    // showModal(). Intercept it so hide() can run the exit transition instead
    // of letting the browser close the dialog (and drop its ::backdrop) instantly.
    this._cancelHandler = (event: Event) => {
      event.preventDefault()

      if (!this._config.keyboard) {
        this._triggerBackdropTransition()
        return
      }

      this.hide()
    }

    EventHandler.on(this._element, 'cancel', this._cancelHandler)

    EventHandler.on(this._element, EVENT_CLICK_DISMISS, (event: Event) => {
      // A click anywhere inside .modal-dialog/.modal-content bubbles with that
      // element as the target; only a click on ::backdrop targets the dialog itself.
      if (event.target !== this._element) {
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
  }

  _triggerBackdropTransition(): void {
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED)
    if (hideEvent.defaultPrevented) {
      return
    }

    this._element.classList.add(CLASS_NAME_STATIC)
    this._queueCallback(() => {
      this._element.classList.remove(CLASS_NAME_STATIC)
    }, this._element)
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
        this.focus({ preventScroll: true })
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
