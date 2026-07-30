/**
 * --------------------------------------------------------------------------
 * Bootstrap util/template-factory.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import SelectorEngine from '../dom/selector-engine.js'
import Config from './config'
import { DefaultAllowlist, sanitizeHtml } from './sanitizer'
import { execute, getElement, isElement } from './index'
import type { AllowList, ComponentConfig, ComponentConfigType, SanitizeFn } from '../types'

const NAME = 'TemplateFactory'

interface TemplateFactoryConfig {
  allowList: AllowList
  content: Record<string, unknown>
  extraClass: string | (() => string)
  html: boolean
  sanitize: boolean
  sanitizeFn: SanitizeFn | null
  template: string
}

const Default: TemplateFactoryConfig = {
  allowList: DefaultAllowlist,
  content: {},
  extraClass: '',
  html: false,
  sanitize: true,
  sanitizeFn: null,
  template: '<div></div>'
}

const DefaultType: ComponentConfigType = {
  allowList: 'object',
  content: 'object',
  extraClass: '(string|function)',
  html: 'boolean',
  sanitize: 'boolean',
  sanitizeFn: '(null|function)',
  template: 'string'
}

const DefaultContentType: ComponentConfigType = {
  entry: '(string|element|function|null)',
  selector: '(string|element)'
}

class TemplateFactory extends Config {
  declare _config: TemplateFactoryConfig & ComponentConfig

  constructor(config?: ComponentConfig) {
    super()
    this._config = this._getConfig(config) as TemplateFactoryConfig & ComponentConfig
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

  getContent(): unknown[] {
    return Object.values(this._config.content)
      .map(config => this._resolvePossibleFunction(config))
      .filter(Boolean)
  }

  hasContent(): boolean {
    return this.getContent().length > 0
  }

  changeContent(content: Record<string, unknown>): this {
    this._checkContent(content)
    this._config.content = { ...this._config.content, ...content }
    return this
  }

  toHtml(): Element {
    const templateWrapper = document.createElement('div')
    templateWrapper.innerHTML = this._maybeSanitize(this._config.template)

    for (const [selector, text] of Object.entries(this._config.content)) {
      this._setContent(templateWrapper, text, selector)
    }

    const template = templateWrapper.children[0]
    const extraClass = this._resolvePossibleFunction(this._config.extraClass)

    if (extraClass) {
      template.classList.add(...(extraClass as string).split(' '))
    }

    return template
  }

  _typeCheckConfig(config: ComponentConfig): void {
    super._typeCheckConfig(config)
    this._checkContent(config.content)
  }

  _checkContent(arg: Record<string, unknown>): void {
    for (const [selector, content] of Object.entries(arg)) {
      super._typeCheckConfig({ selector, entry: content }, DefaultContentType)
    }
  }

  _setContent(template: HTMLElement, content: unknown, selector: string): void {
    const templateElement = SelectorEngine.findOne(selector, template)

    if (!templateElement) {
      return
    }

    content = this._resolvePossibleFunction(content)

    if (!content) {
      templateElement.remove()
      return
    }

    if (isElement(content)) {
      this._putElementInTemplate(getElement(content)!, templateElement)
      return
    }

    if (this._config.html) {
      templateElement.innerHTML = this._maybeSanitize(content as string)
      return
    }

    templateElement.textContent = content as string
  }

  _maybeSanitize(arg: string): string {
    return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn!) : arg
  }

  _resolvePossibleFunction(arg: unknown): unknown {
    return execute(arg, [undefined, this])
  }

  _putElementInTemplate(element: HTMLElement, templateElement: Element): void {
    if (this._config.html) {
      templateElement.innerHTML = ''
      templateElement.append(element)
      return
    }

    templateElement.textContent = element.textContent
  }
}

export default TemplateFactory
