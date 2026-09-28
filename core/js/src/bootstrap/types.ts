/**
 * --------------------------------------------------------------------------
 * Bootstrap types.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

export type ComponentConfig = Record<string, unknown>

export type ComponentConfigType = Record<string, string>

export type ElementSelector = string | HTMLElement

export interface ConfigStatic {
  NAME: string
  Default: ComponentConfig
  DefaultType: ComponentConfigType
}

export interface BaseComponentStatic extends ConfigStatic {
  DATA_KEY: string
  EVENT_KEY: string
}

export type AllowList = Record<string, (string | RegExp)[]>

export type SanitizeFn = (unsafeHtml: string) => string

export interface JQueryEventLike {
  isPropagationStopped(): boolean
  isImmediatePropagationStopped(): boolean
  isDefaultPrevented(): boolean
  preventDefault(): void
}

export interface JQueryCollectionLike {
  trigger(event: JQueryEventLike): unknown
  each(callback: (this: HTMLElement, index: number) => void): unknown
}

export interface JQueryPluginFunction {
  (this: JQueryCollectionLike, config?: unknown, ...args: unknown[]): unknown
  Constructor?: unknown
  noConflict?: () => JQueryPluginFunction
}

export interface JQueryStaticLike {
  fn: Record<string, JQueryPluginFunction>
  (selector: EventTarget): JQueryCollectionLike
  Event(name: string, args?: Record<string, unknown>): JQueryEventLike
}

export interface JQueryPluginStatic {
  NAME: string
  jQueryInterface: JQueryPluginFunction
}
