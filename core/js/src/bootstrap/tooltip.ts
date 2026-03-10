/**
 * --------------------------------------------------------------------------
 * Bootstrap tooltip.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import * as Popper from '@popperjs/core'
import BaseComponent from './base-component'
import EventHandler from './dom/event-handler'
import Manipulator from './dom/manipulator'
import { execute, findShadowRoot, getElement, getUID, isRTL, noop } from './util/index'
import { DefaultAllowlist } from './util/sanitizer'
import TemplateFactory from './util/template-factory'

/**
 * Constants
 */

const NAME = 'tooltip'
const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn'])

const CLASS_NAME_FADE = 'fade'
const CLASS_NAME_MODAL = 'modal'
const CLASS_NAME_SHOW = 'show'

const SELECTOR_TOOLTIP_INNER = '.tooltip-inner'
const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`

const EVENT_MODAL_HIDE = 'hide.bs.modal'

const TRIGGER_HOVER = 'hover'
const TRIGGER_FOCUS = 'focus'
const TRIGGER_CLICK = 'click'
const TRIGGER_MANUAL = 'manual'

const EVENT_HIDE = 'hide'
const EVENT_HIDDEN = 'hidden'
const EVENT_SHOW = 'show'
const EVENT_SHOWN = 'shown'
const EVENT_INSERTED = 'inserted'
const EVENT_CLICK = 'click'
const EVENT_FOCUSIN = 'focusin'
const EVENT_FOCUSOUT = 'focusout'
const EVENT_MOUSEENTER = 'mouseenter'
const EVENT_MOUSELEAVE = 'mouseleave'

interface ComponentConfig {
  [key: string]: any
}

interface ComponentConfigType {
  [key: string]: string
}

const AttachmentMap: Record<string, string> = {
  AUTO: 'auto',
  TOP: 'top',
  RIGHT: isRTL() ? 'left' : 'right',
  BOTTOM: 'bottom',
  LEFT: isRTL() ? 'right' : 'left'
}

const Default: ComponentConfig = {
  allowList: DefaultAllowlist,
  animation: true,
  boundary: 'clippingParents',
  container: false,
  customClass: '',
  delay: 0,
  fallbackPlacements: ['top', 'right', 'bottom', 'left'],
  html: false,
  offset: [0, 6],
  placement: 'top',
  popperConfig: null,
  sanitize: true,
  sanitizeFn: null,
  selector: false,
  template: '<div class="tooltip" role="tooltip">' +
            '<div class="tooltip-arrow"></div>' +
            '<div class="tooltip-inner"></div>' +
            '</div>',
  title: '',
  trigger: 'hover focus'
}

const DefaultType: ComponentConfigType = {
  allowList: 'object',
  animation: 'boolean',
  boundary: '(string|element)',
  container: '(string|element|boolean)',
  customClass: '(string|function)',
  delay: '(number|object)',
  fallbackPlacements: 'array',
  html: 'boolean',
  offset: '(array|string|function)',
  placement: '(string|function)',
  popperConfig: '(null|object|function)',
  sanitize: 'boolean',
  sanitizeFn: '(null|function)',
  selector: '(string|boolean)',
  template: 'string',
  title: '(string|element|function)',
  trigger: 'string'
}

/**
 * Class definition
 */

class Tooltip extends BaseComponent {
  _isEnabled: boolean
  _timeout: ReturnType<typeof setTimeout> | number
  _isHovered: boolean | null
  _activeTrigger: Record<string, boolean>
  _popper: Popper.Instance | null
  _templateFactory: TemplateFactory | null
  _newContent: Record<string, any> | null
  tip: HTMLElement | null
  _hideModalHandler: (() => void) | null

  constructor(element: HTMLElement | string, config?: Partial<ComponentConfig>) {
    if (typeof Popper === 'undefined') {
      throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org/docs/v2/)')
    }

    super(element, config)

    this._isEnabled = true
    this._timeout = 0
    this._isHovered = null
    this._activeTrigger = {}
    this._popper = null
    this._templateFactory = null
    this._newContent = null

    this.tip = null
    this._hideModalHandler = null

    this._setListeners()

    if (!this._config.selector) {
      this._fixTitle()
    }
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

  enable(): void {
    this._isEnabled = true
  }

  disable(): void {
    this._isEnabled = false
  }

  toggleEnabled(): void {
    this._isEnabled = !this._isEnabled
  }

  toggle(): void {
    if (!this._isEnabled) {
      return
    }

    if (this._isShown()) {
      this._leave()
      return
    }

    this._enter()
  }

  dispose(): void {
    clearTimeout(this._timeout)

    EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler)

    if (this._element.getAttribute('data-bs-original-title') || this._element.getAttribute('data-tblr-original-title')) {
      this._element.setAttribute('title',
        this._element.getAttribute('data-bs-original-title') ||
        this._element.getAttribute('data-tblr-original-title') || '')
    }

    this._disposePopper()
    super.dispose()
  }

  show(): void {
    if (this._element.style.display === 'none') {
      throw new Error('Please use show on visible elements')
    }

    if (!(this._isWithContent() && this._isEnabled)) {
      return
    }

    const showEvent = EventHandler.trigger(this._element, (this.constructor as typeof Tooltip).eventName(EVENT_SHOW))
    const shadowRoot = findShadowRoot(this._element)
    const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element)

    if (showEvent.defaultPrevented || !isInTheDom) {
      return
    }

    this._disposePopper()

    const tip = this._getTipElement()

    this._element.setAttribute('aria-describedby', tip!.getAttribute('id')!)

    const { container } = this._config

    if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
      container.append(tip)
      EventHandler.trigger(this._element, (this.constructor as typeof Tooltip).eventName(EVENT_INSERTED))
    }

    this._popper = this._createPopper(tip!)

    tip!.classList.add(CLASS_NAME_SHOW)

    if ('ontouchstart' in document.documentElement) {
      for (const element of [].concat(...(document.body.children as any))) {
        EventHandler.on(element, 'mouseover', noop)
      }
    }

    const complete = () => {
      EventHandler.trigger(this._element, (this.constructor as typeof Tooltip).eventName(EVENT_SHOWN))

      if (this._isHovered === false) {
        this._leave()
      }

      this._isHovered = false
    }

    this._queueCallback(complete, this.tip!, this._isAnimated())
  }

  hide(): void {
    if (!this._isShown()) {
      return
    }

    const hideEvent = EventHandler.trigger(this._element, (this.constructor as typeof Tooltip).eventName(EVENT_HIDE))
    if (hideEvent.defaultPrevented) {
      return
    }

    const tip = this._getTipElement()
    tip!.classList.remove(CLASS_NAME_SHOW)

    if ('ontouchstart' in document.documentElement) {
      for (const element of [].concat(...(document.body.children as any))) {
        EventHandler.off(element, 'mouseover', noop)
      }
    }

    this._activeTrigger[TRIGGER_CLICK] = false
    this._activeTrigger[TRIGGER_FOCUS] = false
    this._activeTrigger[TRIGGER_HOVER] = false
    this._isHovered = null

    const complete = () => {
      if (this._isWithActiveTrigger()) {
        return
      }

      if (!this._isHovered) {
        this._disposePopper()
      }

      this._element.removeAttribute('aria-describedby')
      EventHandler.trigger(this._element, (this.constructor as typeof Tooltip).eventName(EVENT_HIDDEN))
    }

    this._queueCallback(complete, this.tip!, this._isAnimated())
  }

  update(): void {
    if (this._popper) {
      this._popper.update()
    }
  }

  _isWithContent(): boolean {
    return Boolean(this._getTitle())
  }

  _getTipElement(): HTMLElement | null {
    if (!this.tip) {
      this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())
    }

    return this.tip
  }

  _createTipElement(content: Record<string, any>): HTMLElement | null {
    const tip = this._getTemplateFactory(content).toHtml() as HTMLElement

    if (!tip) {
      return null
    }

    tip.classList.remove(CLASS_NAME_FADE, CLASS_NAME_SHOW)
    tip.classList.add(`bs-${(this.constructor as typeof Tooltip).NAME}-auto`)

    const tipId = getUID((this.constructor as typeof Tooltip).NAME).toString()

    tip.setAttribute('id', tipId)

    if (this._isAnimated()) {
      tip.classList.add(CLASS_NAME_FADE)
    }

    return tip
  }

  setContent(content: Record<string, any>): void {
    this._newContent = content
    if (this._isShown()) {
      this._disposePopper()
      this.show()
    }
  }

  _getTemplateFactory(content: Record<string, any>): TemplateFactory {
    if (this._templateFactory) {
      this._templateFactory.changeContent(content)
    } else {
      this._templateFactory = new TemplateFactory({
        ...this._config,
        content,
        extraClass: this._resolvePossibleFunction(this._config.customClass)
      })
    }

    return this._templateFactory
  }

  _getContentForTemplate(): Record<string, any> {
    return {
      [SELECTOR_TOOLTIP_INNER]: this._getTitle()
    }
  }

  _getTitle(): string {
    return this._resolvePossibleFunction(this._config.title) ||
      this._element.getAttribute('data-bs-original-title') ||
      this._element.getAttribute('data-tblr-original-title') || ''
  }

  _initializeOnDelegatedTarget(event: Event & { delegateTarget?: HTMLElement }): Tooltip {
    return (this.constructor as typeof Tooltip).getOrCreateInstance(event.delegateTarget!, this._getDelegateConfig()) as Tooltip
  }

  _isAnimated(): boolean {
    return this._config.animation || (this.tip !== null && this.tip.classList.contains(CLASS_NAME_FADE))
  }

  _isShown(): boolean {
    return this.tip !== null && this.tip.classList.contains(CLASS_NAME_SHOW)
  }

  _createPopper(tip: HTMLElement): Popper.Instance {
    const placement = execute(this._config.placement, [this, tip, this._element]) as string
    const attachment = AttachmentMap[placement.toUpperCase()]
    return Popper.createPopper(this._element, tip, this._getPopperConfig(attachment))
  }

  _getOffset(): number[] | ((popperData: any) => number[]) {
    const { offset } = this._config

    if (typeof offset === 'string') {
      return offset.split(',').map((value: string) => Number.parseInt(value, 10))
    }

    if (typeof offset === 'function') {
      return (popperData: any) => (offset as Function)(popperData, this._element)
    }

    return offset as number[]
  }

  _resolvePossibleFunction(arg: any): any {
    return execute(arg, [this._element, this._element])
  }

  _getPopperConfig(attachment: string): Partial<Popper.Options> {
    const defaultBsPopperConfig: Partial<Popper.Options> = {
      placement: attachment as Popper.Placement,
      modifiers: [
        {
          name: 'flip',
          options: {
            fallbackPlacements: this._config.fallbackPlacements
          }
        },
        {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        },
        {
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        },
        {
          name: 'arrow',
          options: {
            element: `.${(this.constructor as typeof Tooltip).NAME}-arrow`
          }
        },
        {
          name: 'preSetPlacement',
          enabled: true,
          phase: 'beforeMain',
          fn: (data: any) => {
            this._getTipElement()!.setAttribute('data-popper-placement', data.state.placement)
          }
        }
      ]
    }

    const popperConfig = execute(this._config.popperConfig, [undefined, defaultBsPopperConfig])
    return {
      ...defaultBsPopperConfig,
      ...(typeof popperConfig === 'object' && popperConfig !== null ? popperConfig : {})
    }
  }

  _setListeners(): void {
    const triggers = this._config.trigger.split(' ')

    for (const trigger of triggers) {
      if (trigger === 'click') {
        EventHandler.on(this._element, (this.constructor as typeof Tooltip).eventName(EVENT_CLICK), this._config.selector, (event: Event) => {
          const context = this._initializeOnDelegatedTarget(event)
          context._activeTrigger[TRIGGER_CLICK] = !(context._isShown() && context._activeTrigger[TRIGGER_CLICK])
          context.toggle()
        })
      } else if (trigger !== TRIGGER_MANUAL) {
        const eventIn = trigger === TRIGGER_HOVER ?
          (this.constructor as typeof Tooltip).eventName(EVENT_MOUSEENTER) :
          (this.constructor as typeof Tooltip).eventName(EVENT_FOCUSIN)
        const eventOut = trigger === TRIGGER_HOVER ?
          (this.constructor as typeof Tooltip).eventName(EVENT_MOUSELEAVE) :
          (this.constructor as typeof Tooltip).eventName(EVENT_FOCUSOUT)

        EventHandler.on(this._element, eventIn, this._config.selector, (event: Event) => {
          const context = this._initializeOnDelegatedTarget(event)
          context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true
          context._enter()
        })
        EventHandler.on(this._element, eventOut, this._config.selector, (event: Event & { relatedTarget?: HTMLElement }) => {
          const context = this._initializeOnDelegatedTarget(event)
          context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] =
            context._element.contains(event.relatedTarget as Node)

          context._leave()
        })
      }
    }

    this._hideModalHandler = () => {
      if (this._element) {
        this.hide()
      }
    }

    EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler)
  }

  _fixTitle(): void {
    const title = this._element.getAttribute('title')

    if (!title) {
      return
    }

    if (!this._element.getAttribute('aria-label') && !this._element.textContent!.trim()) {
      this._element.setAttribute('aria-label', title)
    }

    this._element.setAttribute('data-bs-original-title', title)
    this._element.removeAttribute('title')
  }

  _enter(): void {
    if (this._isShown() || this._isHovered) {
      this._isHovered = true
      return
    }

    this._isHovered = true

    this._setTimeout(() => {
      if (this._isHovered) {
        this.show()
      }
    }, this._config.delay.show)
  }

  _leave(): void {
    if (this._isWithActiveTrigger()) {
      return
    }

    this._isHovered = false

    this._setTimeout(() => {
      if (!this._isHovered) {
        this.hide()
      }
    }, this._config.delay.hide)
  }

  _setTimeout(handler: () => void, timeout: number): void {
    clearTimeout(this._timeout)
    this._timeout = setTimeout(handler, timeout)
  }

  _isWithActiveTrigger(): boolean {
    return Object.values(this._activeTrigger).includes(true)
  }

  _getConfig(config: Partial<ComponentConfig>): ComponentConfig {
    const dataAttributes = Manipulator.getDataAttributes(this._element)

    for (const dataAttribute of Object.keys(dataAttributes)) {
      if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
        delete dataAttributes[dataAttribute]
      }
    }

    config = {
      ...dataAttributes,
      ...(typeof config === 'object' && config ? config : {})
    }
    config = this._mergeConfigObj(config)
    config = this._configAfterMerge(config)
    this._typeCheckConfig(config)
    return config
  }

  _configAfterMerge(config: ComponentConfig): ComponentConfig {
    config.container = config.container === false ? document.body : getElement(config.container)

    if (typeof config.delay === 'number') {
      config.delay = {
        show: config.delay,
        hide: config.delay
      }
    }

    if (typeof config.title === 'number') {
      config.title = config.title.toString()
    }

    if (typeof config.content === 'number') {
      config.content = config.content.toString()
    }

    return config
  }

  _getDelegateConfig(): Partial<ComponentConfig> {
    const config: Partial<ComponentConfig> = {}

    for (const [key, value] of Object.entries(this._config)) {
      if ((this.constructor as typeof Tooltip).Default[key] !== value) {
        config[key] = value
      }
    }

    config.selector = false
    config.trigger = 'manual'

    return config
  }

  _disposePopper(): void {
    if (this._popper) {
      this._popper.destroy()
      this._popper = null
    }

    if (this.tip) {
      this.tip.remove()
      this.tip = null
    }
  }
}

export default Tooltip
