/**
 * --------------------------------------------------------------------------
 * Bootstrap types.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

export type ComponentConfig = Record<string, any>

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
