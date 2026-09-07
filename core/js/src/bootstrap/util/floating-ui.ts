/**
 * --------------------------------------------------------------------------
 * Bootstrap util/floating-ui.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import { autoUpdate, computePosition, type Boundary, type Middleware, type OffsetOptions, type Placement, type ReferenceElement, type Strategy } from '@floating-ui/dom'
import { getElement, isElement } from './index'

/**
 * Constants
 */

const ATTRIBUTE_PLACEMENT = 'data-popper-placement'
const STRATEGY_ABSOLUTE = 'absolute'
const BOUNDARY_CLIPPING_ANCESTORS = 'clippingAncestors'

/**
 * Types
 */

type OffsetValue = number | { mainAxis?: number; crossAxis?: number; alignmentAxis?: number | null }

export interface FloatingConfig {
  placement?: Placement
  strategy?: Strategy
  middleware?: Middleware[]
}

/**
 * Class definition
 *
 * Thin wrapper around Floating UI that keeps the DOM writes Popper used to do
 * for us: positioning styles, the placement attribute and the arrow offset.
 */

class FloatingUi {
  _cleanup: (() => void) | null
  _compute: (() => void) | null

  constructor() {
    if (typeof computePosition === 'undefined') {
      throw new TypeError('Tabler requires Floating UI (https://floating-ui.com/)')
    }

    this._cleanup = null
    this._compute = null
  }

  calculate(reference: ReferenceElement, floating: HTMLElement, config: FloatingConfig, arrowElement: HTMLElement | null = null): void {
    this.stop()

    // Take the element out of the flow before anything is measured, the way
    // Popper's `applyStyles` effect did. A floating element still laid out as
    // a block would be measured at its container's width.
    Object.assign(floating.style, {
      position: config.strategy ?? STRATEGY_ABSOLUTE,
      top: '0',
      right: 'auto',
      bottom: 'auto',
      left: '0',
      margin: '0',
    })

    if (arrowElement) {
      arrowElement.style.position = 'absolute'
    }

    this._compute = () => {
      void computePosition(reference, floating, { strategy: STRATEGY_ABSOLUTE, ...config }).then(({ x, y, strategy, placement, middlewareData }) => {
        Object.assign(floating.style, {
          position: strategy,
          top: `${y}px`,
          right: 'auto',
          bottom: 'auto',
          left: `${x}px`,
        })

        floating.setAttribute(ATTRIBUTE_PLACEMENT, placement)

        if (arrowElement && middlewareData.arrow) {
          const { x: arrowX, y: arrowY } = middlewareData.arrow

          // Only the axis Floating UI resolved is written, so the stylesheet
          // keeps owning the side the arrow sticks out of.
          Object.assign(arrowElement.style, {
            left: arrowX === undefined ? '' : `${arrowX}px`,
            top: arrowY === undefined ? '' : `${arrowY}px`,
          })
        }
      })
    }

    // `autoUpdate` positions the element straight away and keeps it in place
    // while scrolling or resizing. It returns the listener cleanup.
    this._cleanup = autoUpdate(reference, floating, this._compute)
  }

  update(): void {
    if (this._compute) {
      this._compute()
    }
  }

  stop(): void {
    if (this._cleanup) {
      this._cleanup()
      this._cleanup = null
    }

    this._compute = null
  }

  static getReferenceElement(reference: unknown, defaultElement: HTMLElement, parent: HTMLElement): ReferenceElement {
    if (reference === 'parent') {
      return parent
    }

    if (isElement(reference)) {
      return getElement(reference as HTMLElement | string)!
    }

    if (typeof reference === 'object' && reference !== null) {
      return reference as ReferenceElement
    }

    return defaultElement
  }

  // Popper set the placement attribute in its `beforeMain` phase so the arrow
  // was measured with the stylesheet rules of the placement it ends up in.
  static setPlacement(floating: HTMLElement): Middleware {
    return {
      name: 'preSetPlacement',
      fn({ placement }) {
        floating.setAttribute(ATTRIBUTE_PLACEMENT, placement)
        return {}
      },
    }
  }

  static getBoundary(boundary: unknown): Boundary {
    if (typeof boundary === 'string' || !boundary) {
      return BOUNDARY_CLIPPING_ANCESTORS
    }

    return boundary as Boundary
  }

  // Popper took `[skidding, distance]`, Floating UI takes named axes.
  static parseOffset(value: unknown, element: HTMLElement): OffsetOptions {
    if (typeof value === 'function') {
      return (state) => normalizeOffset((value as (state: unknown, element: HTMLElement) => unknown)(state, element))
    }

    return normalizeOffset(value)
  }
}

function normalizeOffset(value: unknown): OffsetValue {
  let raw = value

  if (typeof raw === 'string') {
    raw = raw.split(',').map((part) => Number.parseInt(part, 10))
  }

  if (Array.isArray(raw)) {
    const [crossAxis = 0, mainAxis = 0] = raw
    return { mainAxis, crossAxis }
  }

  if (typeof raw === 'number' || (typeof raw === 'object' && raw !== null)) {
    return raw as OffsetValue
  }

  return 0
}

export default FloatingUi
