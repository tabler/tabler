/**
 * --------------------------------------------------------------------------
 * Bootstrap offcanvas.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './base-component'
import EventHandler from './dom/event-handler'
import SelectorEngine from './dom/selector-engine'
import Backdrop from './util/backdrop'
import { enableDismissTrigger } from './util/component-functions'
import FocusTrap from './util/focustrap'
import { isDisabled, isVisible } from './util/index'
import ScrollBarHelper from './util/scrollbar'

/**
 * Constants
 */

const NAME = 'offcanvas'
const DATA_KEY = 'bs.offcanvas'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'
const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`
const ESCAPE_KEY = 'Escape'

const CLASS_NAME_SHOW = 'show'
const CLASS_NAME_SHOWING = 'showing'
const CLASS_NAME_HIDING = 'hiding'
const CLASS_NAME_BACKDROP = 'offcanvas-backdrop'
const OPEN_SELECTOR = '.offcanvas.show'

const EVENT_SHOW = `show${EVENT_KEY}`
const EVENT_SHOWN = `shown${EVENT_KEY}`
const EVENT_HIDE = `hide${EVENT_KEY}`
const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`
const EVENT_HIDDEN = `hidden${EVENT_KEY}`
const EVENT_RESIZE = `resize${EVENT_KEY}`
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`
const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`

const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="offcanvas"], [data-tblr-toggle="offcanvas"]'

interface ComponentConfig {
  [key: string]: any
}

interface ComponentConfigType {
  [key: string]: string
}

const Default: ComponentConfig = {
  backdrop: true,
  keyboard: true,
  scroll: false
}

const DefaultType: ComponentConfigType = {
  backdrop: '(boolean|string)',
  keyboard: 'boolean',
  scroll: 'boolean'
}

/**
 * Class definition
 */

class Offcanvas extends BaseComponent {
  _isShown: boolean
  _backdrop: Backdrop
  _focustrap: FocusTrap

  constructor(element: HTMLElement | string, config?: Partial<ComponentConfig>) {
    super(element, config)

    this._isShown = false
    this._backdrop = this._initializeBackDrop()
    this._focustrap = this._initializeFocusTrap()
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
    if (this._isShown) {
      return
    }

    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW, { relatedTarget })

    if (showEvent.defaultPrevented) {
      return
    }

    this._isShown = true
    this._backdrop.show()

    if (!this._config.scroll) {
      new ScrollBarHelper().hide()
    }

    this._element.setAttribute('aria-modal', 'true')
    this._element.setAttribute('role', 'dialog')
    this._element.classList.add(CLASS_NAME_SHOWING)

    const completeCallBack = () => {
      if (!this._config.scroll || this._config.backdrop) {
        this._focustrap.activate()
      }

      this._element.classList.add(CLASS_NAME_SHOW)
      this._element.classList.remove(CLASS_NAME_SHOWING)
      EventHandler.trigger(this._element, EVENT_SHOWN, { relatedTarget })
    }

    this._queueCallback(completeCallBack, this._element, true)
  }

  hide(): void {
    if (!this._isShown) {
      return
    }

    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE)

    if (hideEvent.defaultPrevented) {
      return
    }

    this._focustrap.deactivate()
    this._element.blur()
    this._isShown = false
    this._element.classList.add(CLASS_NAME_HIDING)
    this._backdrop.hide()

    const completeCallback = () => {
      this._element.classList.remove(CLASS_NAME_SHOW, CLASS_NAME_HIDING)
      this._element.removeAttribute('aria-modal')
      this._element.removeAttribute('role')

      if (!this._config.scroll) {
        new ScrollBarHelper().reset()
      }

      EventHandler.trigger(this._element, EVENT_HIDDEN)
    }

    this._queueCallback(completeCallback, this._element, true)
  }

  dispose(): void {
    this._backdrop.dispose()
    this._focustrap.deactivate()
    super.dispose()
  }

  _initializeBackDrop(): Backdrop {
    const clickCallback = () => {
      if (this._config.backdrop === 'static') {
        EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED)
        return
      }

      this.hide()
    }

    const isBackdropVisible = Boolean(this._config.backdrop)

    return new Backdrop({
      className: CLASS_NAME_BACKDROP,
      isVisible: isBackdropVisible,
      isAnimated: true,
      rootElement: this._element.parentNode as HTMLElement,
      clickCallback: isBackdropVisible ? clickCallback : null
    })
  }

  _initializeFocusTrap(): FocusTrap {
    return new FocusTrap({
      trapElement: this._element
    })
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

      EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED)
    })
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

  if (isDisabled(this)) {
    return
  }

  EventHandler.one(target, EVENT_HIDDEN, () => {
    if (isVisible(this)) {
      this.focus()
    }
  })

  const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR)
  if (alreadyOpen && alreadyOpen !== target) {
    ;(Offcanvas.getInstance(alreadyOpen) as Offcanvas).hide()
  }

  const data = Offcanvas.getOrCreateInstance(target) as Offcanvas
  data.toggle(this)
})

EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
  for (const selector of SelectorEngine.find(OPEN_SELECTOR)) {
    ;(Offcanvas.getOrCreateInstance(selector) as Offcanvas).show()
  }
})

EventHandler.on(window, EVENT_RESIZE, () => {
  for (const element of SelectorEngine.find('[aria-modal][class*=show][class*=offcanvas-]')) {
    if (getComputedStyle(element).position !== 'fixed') {
      ;(Offcanvas.getOrCreateInstance(element) as Offcanvas).hide()
    }
  }
})

enableDismissTrigger(Offcanvas)

export default Offcanvas
