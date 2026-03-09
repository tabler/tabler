/**
 * --------------------------------------------------------------------------
 * Bootstrap util/scrollbar.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import Manipulator from '../dom/manipulator.js'
import SelectorEngine from '../dom/selector-engine.js'
import { isElement } from './index'

const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top'
const SELECTOR_STICKY_CONTENT = '.sticky-top'
const PROPERTY_PADDING = 'padding-right'
const PROPERTY_MARGIN = 'margin-right'

class ScrollBarHelper {
  _element: HTMLElement

  constructor() {
    this._element = document.body
  }

  getWidth(): number {
    const documentWidth = document.documentElement.clientWidth
    return Math.abs(window.innerWidth - documentWidth)
  }

  hide(): void {
    const width = this.getWidth()
    this._disableOverFlow()
    this._setElementAttributes(this._element, PROPERTY_PADDING, calculatedValue => calculatedValue + width)
    this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, calculatedValue => calculatedValue + width)
    this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, calculatedValue => calculatedValue - width)
  }

  reset(): void {
    this._resetElementAttributes(this._element, 'overflow')
    this._resetElementAttributes(this._element, PROPERTY_PADDING)
    this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING)
    this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN)
  }

  isOverflowing(): boolean {
    return this.getWidth() > 0
  }

  _disableOverFlow(): void {
    this._saveInitialAttribute(this._element, 'overflow')
    this._element.style.overflow = 'hidden'
  }

  _setElementAttributes(selector: string | HTMLElement, styleProperty: string, callback: (value: number) => number): void {
    const scrollbarWidth = this.getWidth()
    const manipulationCallBack = (element: HTMLElement): void => {
      if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
        return
      }

      this._saveInitialAttribute(element, styleProperty)
      const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty)
      element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`)
    }

    this._applyManipulationCallback(selector, manipulationCallBack)
  }

  _saveInitialAttribute(element: HTMLElement, styleProperty: string): void {
    const actualValue = element.style.getPropertyValue(styleProperty)
    if (actualValue) {
      Manipulator.setDataAttribute(element, styleProperty, actualValue)
    }
  }

  _resetElementAttributes(selector: string | HTMLElement, styleProperty: string): void {
    const manipulationCallBack = (element: HTMLElement): void => {
      const value = Manipulator.getDataAttribute(element, styleProperty)
      if (value === null) {
        element.style.removeProperty(styleProperty)
        return
      }

      Manipulator.removeDataAttribute(element, styleProperty)
      element.style.setProperty(styleProperty, String(value))
    }

    this._applyManipulationCallback(selector, manipulationCallBack)
  }

  _applyManipulationCallback(selector: string | HTMLElement, callBack: (element: HTMLElement) => void): void {
    if (isElement(selector)) {
      callBack(selector)
      return
    }

    for (const sel of SelectorEngine.find(selector, this._element)) {
      callBack(sel)
    }
  }
}

export default ScrollBarHelper
