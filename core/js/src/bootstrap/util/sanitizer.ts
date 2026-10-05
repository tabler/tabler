/**
 * --------------------------------------------------------------------------
 * Bootstrap util/sanitizer.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import type { AllowList, SanitizeFn } from '../types'

// js-docs-start allow-list
const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i

export const DefaultAllowlist: AllowList = {
  '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
  'a': ['target', 'href', 'title', 'rel'],
  'area': [],
  'b': [],
  'br': [],
  'col': [],
  'code': [],
  'dd': [],
  'div': [],
  'dl': [],
  'dt': [],
  'em': [],
  'hr': [],
  'h1': [],
  'h2': [],
  'h3': [],
  'h4': [],
  'h5': [],
  'h6': [],
  'i': [],
  'img': ['src', 'srcset', 'alt', 'title', 'width', 'height'],
  'li': [],
  'ol': [],
  'p': [],
  'pre': [],
  's': [],
  'small': [],
  'span': [],
  'sub': [],
  'sup': [],
  'strong': [],
  'u': [],
  'ul': [],
}
// js-docs-end allow-list

// js-docs-start icon-allow-list
export const DefaultIconAllowlist: AllowList = {
  '*': ['class', 'role', ARIA_ATTRIBUTE_PATTERN],
  'svg': ['xmlns', 'width', 'height', 'viewbox', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'focusable'],
  'path': ['d', 'fill', 'stroke', 'stroke-width', 'fill-rule', 'clip-rule'],
  'line': ['x1', 'y1', 'x2', 'y2', 'stroke', 'stroke-width', 'stroke-linecap'],
  'circle': ['cx', 'cy', 'r', 'fill', 'stroke', 'stroke-width'],
  'rect': ['x', 'y', 'width', 'height', 'rx', 'ry', 'fill', 'stroke', 'stroke-width'],
  'polyline': ['points', 'fill', 'stroke', 'stroke-width'],
  'polygon': ['points', 'fill', 'stroke', 'stroke-width'],
  'g': ['fill', 'stroke', 'stroke-width', 'transform'],
  'span': [],
  'i': [],
}
// js-docs-end icon-allow-list

const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'])

const SAFE_URL_PATTERN = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i

const allowedAttribute = (attribute: Attr, allowedAttributeList: (string | RegExp)[]): boolean => {
  const attributeName = attribute.nodeName.toLowerCase()

  if (allowedAttributeList.includes(attributeName)) {
    if (uriAttributes.has(attributeName)) {
      return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue!))
    }

    return true
  }

  return allowedAttributeList.filter((attributeRegex) => attributeRegex instanceof RegExp).some((regex) => regex.test(attributeName))
}

export function sanitizeHtml(unsafeHtml: string, allowList: AllowList, sanitizeFunction?: SanitizeFn): string {
  if (!unsafeHtml.length) {
    return unsafeHtml
  }

  if (sanitizeFunction && typeof sanitizeFunction === 'function') {
    return sanitizeFunction(unsafeHtml)
  }

  const domParser = new window.DOMParser()
  const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html')
  const elements = Array.from(createdDocument.body.querySelectorAll('*'))

  for (const element of elements) {
    const elementName = element.nodeName.toLowerCase()

    if (!Object.keys(allowList).includes(elementName)) {
      element.remove()
      continue
    }

    const attributeList = Array.from(element.attributes)
    const allowedAttributes = [...(allowList['*'] || []), ...(allowList[elementName] || [])]

    for (const attribute of attributeList) {
      if (!allowedAttribute(attribute, allowedAttributes)) {
        element.removeAttribute(attribute.nodeName)
      }
    }
  }

  return createdDocument.body.innerHTML
}
