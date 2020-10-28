/*!
* Tabler v1.0.0-alpha.8 (https://tabler.io)
* @version 1.0.0-alpha.8
* @link https://tabler.io
* Copyright 2018-2020 The Tabler Authors
* Copyright 2018-2020 codecalm.net Paweł Kuna
* Licensed under MIT (https://github.com/tabler/tabler/blob/master/LICENSE)
*/
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  /**!
   * @fileOverview Kickass library to create and place poppers near their reference elements.
   * @version 1.16.1
   * @license
   * Copyright (c) 2016 Federico Zivolo and contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
  var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';
  var timeoutDuration = function () {
    var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
    for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
      if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
        return 1;
      }
    }
    return 0;
  }();
  function microtaskDebounce(fn) {
    var called = false;
    return function () {
      if (called) {
        return;
      }
      called = true;
      window.Promise.resolve().then(function () {
        called = false;
        fn();
      });
    };
  }
  function taskDebounce(fn) {
    var scheduled = false;
    return function () {
      if (!scheduled) {
        scheduled = true;
        setTimeout(function () {
          scheduled = false;
          fn();
        }, timeoutDuration);
      }
    };
  }
  var supportsMicroTasks = isBrowser && window.Promise;
  var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;
  function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }
  function getStyleComputedProperty(element, property) {
    if (element.nodeType !== 1) {
      return [];
    }
    var window = element.ownerDocument.defaultView;
    var css = window.getComputedStyle(element, null);
    return property ? css[property] : css;
  }
  function getParentNode(element) {
    if (element.nodeName === 'HTML') {
      return element;
    }
    return element.parentNode || element.host;
  }
  function getScrollParent(element) {
    if (!element) {
      return document.body;
    }
    switch (element.nodeName) {
      case 'HTML':
      case 'BODY':
        return element.ownerDocument.body;
      case '#document':
        return element.body;
    }
    var _getStyleComputedProp = getStyleComputedProperty(element),
        overflow = _getStyleComputedProp.overflow,
        overflowX = _getStyleComputedProp.overflowX,
        overflowY = _getStyleComputedProp.overflowY;
    if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
      return element;
    }
    return getScrollParent(getParentNode(element));
  }
  function getReferenceNode(reference) {
    return reference && reference.referenceNode ? reference.referenceNode : reference;
  }
  var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
  var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);
  function isIE(version) {
    if (version === 11) {
      return isIE11;
    }
    if (version === 10) {
      return isIE10;
    }
    return isIE11 || isIE10;
  }
  function getOffsetParent(element) {
    if (!element) {
      return document.documentElement;
    }
    var noOffsetParent = isIE(10) ? document.body : null;
    var offsetParent = element.offsetParent || null;
    while (offsetParent === noOffsetParent && element.nextElementSibling) {
      offsetParent = (element = element.nextElementSibling).offsetParent;
    }
    var nodeName = offsetParent && offsetParent.nodeName;
    if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
      return element ? element.ownerDocument.documentElement : document.documentElement;
    }
    if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
      return getOffsetParent(offsetParent);
    }
    return offsetParent;
  }
  function isOffsetContainer(element) {
    var nodeName = element.nodeName;
    if (nodeName === 'BODY') {
      return false;
    }
    return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
  }
  function getRoot(node) {
    if (node.parentNode !== null) {
      return getRoot(node.parentNode);
    }
    return node;
  }
  function findCommonOffsetParent(element1, element2) {
    if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
      return document.documentElement;
    }
    var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
    var start = order ? element1 : element2;
    var end = order ? element2 : element1;
    var range = document.createRange();
    range.setStart(start, 0);
    range.setEnd(end, 0);
    var commonAncestorContainer = range.commonAncestorContainer;
    if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
      if (isOffsetContainer(commonAncestorContainer)) {
        return commonAncestorContainer;
      }
      return getOffsetParent(commonAncestorContainer);
    }
    var element1root = getRoot(element1);
    if (element1root.host) {
      return findCommonOffsetParent(element1root.host, element2);
    } else {
      return findCommonOffsetParent(element1, getRoot(element2).host);
    }
  }
  function getScroll(element) {
    var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
    var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
    var nodeName = element.nodeName;
    if (nodeName === 'BODY' || nodeName === 'HTML') {
      var html = element.ownerDocument.documentElement;
      var scrollingElement = element.ownerDocument.scrollingElement || html;
      return scrollingElement[upperSide];
    }
    return element[upperSide];
  }
  function includeScroll(rect, element) {
    var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var scrollTop = getScroll(element, 'top');
    var scrollLeft = getScroll(element, 'left');
    var modifier = subtract ? -1 : 1;
    rect.top += scrollTop * modifier;
    rect.bottom += scrollTop * modifier;
    rect.left += scrollLeft * modifier;
    rect.right += scrollLeft * modifier;
    return rect;
  }
  function getBordersSize(styles, axis) {
    var sideA = axis === 'x' ? 'Left' : 'Top';
    var sideB = sideA === 'Left' ? 'Right' : 'Bottom';
    return parseFloat(styles['border' + sideA + 'Width']) + parseFloat(styles['border' + sideB + 'Width']);
  }
  function getSize(axis, body, html, computedStyle) {
    return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
  }
  function getWindowSizes(document) {
    var body = document.body;
    var html = document.documentElement;
    var computedStyle = isIE(10) && getComputedStyle(html);
    return {
      height: getSize('Height', body, html, computedStyle),
      width: getSize('Width', body, html, computedStyle)
    };
  }
  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  };
  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  function getClientRect(offsets) {
    return _extends({}, offsets, {
      right: offsets.left + offsets.width,
      bottom: offsets.top + offsets.height
    });
  }
  function getBoundingClientRect(element) {
    var rect = {};
    try {
      if (isIE(10)) {
        rect = element.getBoundingClientRect();
        var scrollTop = getScroll(element, 'top');
        var scrollLeft = getScroll(element, 'left');
        rect.top += scrollTop;
        rect.left += scrollLeft;
        rect.bottom += scrollTop;
        rect.right += scrollLeft;
      } else {
        rect = element.getBoundingClientRect();
      }
    } catch (e) {}
    var result = {
      left: rect.left,
      top: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };
    var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
    var width = sizes.width || element.clientWidth || result.width;
    var height = sizes.height || element.clientHeight || result.height;
    var horizScrollbar = element.offsetWidth - width;
    var vertScrollbar = element.offsetHeight - height;
    if (horizScrollbar || vertScrollbar) {
      var styles = getStyleComputedProperty(element);
      horizScrollbar -= getBordersSize(styles, 'x');
      vertScrollbar -= getBordersSize(styles, 'y');
      result.width -= horizScrollbar;
      result.height -= vertScrollbar;
    }
    return getClientRect(result);
  }
  function getOffsetRectRelativeToArbitraryNode(children, parent) {
    var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var isIE10 = isIE(10);
    var isHTML = parent.nodeName === 'HTML';
    var childrenRect = getBoundingClientRect(children);
    var parentRect = getBoundingClientRect(parent);
    var scrollParent = getScrollParent(children);
    var styles = getStyleComputedProperty(parent);
    var borderTopWidth = parseFloat(styles.borderTopWidth);
    var borderLeftWidth = parseFloat(styles.borderLeftWidth);
    if (fixedPosition && isHTML) {
      parentRect.top = Math.max(parentRect.top, 0);
      parentRect.left = Math.max(parentRect.left, 0);
    }
    var offsets = getClientRect({
      top: childrenRect.top - parentRect.top - borderTopWidth,
      left: childrenRect.left - parentRect.left - borderLeftWidth,
      width: childrenRect.width,
      height: childrenRect.height
    });
    offsets.marginTop = 0;
    offsets.marginLeft = 0;
    if (!isIE10 && isHTML) {
      var marginTop = parseFloat(styles.marginTop);
      var marginLeft = parseFloat(styles.marginLeft);
      offsets.top -= borderTopWidth - marginTop;
      offsets.bottom -= borderTopWidth - marginTop;
      offsets.left -= borderLeftWidth - marginLeft;
      offsets.right -= borderLeftWidth - marginLeft;
      offsets.marginTop = marginTop;
      offsets.marginLeft = marginLeft;
    }
    if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
      offsets = includeScroll(offsets, parent);
    }
    return offsets;
  }
  function getViewportOffsetRectRelativeToArtbitraryNode(element) {
    var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var html = element.ownerDocument.documentElement;
    var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
    var width = Math.max(html.clientWidth, window.innerWidth || 0);
    var height = Math.max(html.clientHeight, window.innerHeight || 0);
    var scrollTop = !excludeScroll ? getScroll(html) : 0;
    var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;
    var offset = {
      top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
      left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
      width: width,
      height: height
    };
    return getClientRect(offset);
  }
  function isFixed(element) {
    var nodeName = element.nodeName;
    if (nodeName === 'BODY' || nodeName === 'HTML') {
      return false;
    }
    if (getStyleComputedProperty(element, 'position') === 'fixed') {
      return true;
    }
    var parentNode = getParentNode(element);
    if (!parentNode) {
      return false;
    }
    return isFixed(parentNode);
  }
  function getFixedPositionOffsetParent(element) {
    if (!element || !element.parentElement || isIE()) {
      return document.documentElement;
    }
    var el = element.parentElement;
    while (el && getStyleComputedProperty(el, 'transform') === 'none') {
      el = el.parentElement;
    }
    return el || document.documentElement;
  }
  function getBoundaries(popper, reference, padding, boundariesElement) {
    var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var boundaries = { top: 0, left: 0 };
    var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
    if (boundariesElement === 'viewport') {
      boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
    } else {
      var boundariesNode = void 0;
      if (boundariesElement === 'scrollParent') {
        boundariesNode = getScrollParent(getParentNode(reference));
        if (boundariesNode.nodeName === 'BODY') {
          boundariesNode = popper.ownerDocument.documentElement;
        }
      } else if (boundariesElement === 'window') {
        boundariesNode = popper.ownerDocument.documentElement;
      } else {
        boundariesNode = boundariesElement;
      }
      var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);
      if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
        var _getWindowSizes = getWindowSizes(popper.ownerDocument),
            height = _getWindowSizes.height,
            width = _getWindowSizes.width;
        boundaries.top += offsets.top - offsets.marginTop;
        boundaries.bottom = height + offsets.top;
        boundaries.left += offsets.left - offsets.marginLeft;
        boundaries.right = width + offsets.left;
      } else {
        boundaries = offsets;
      }
    }
    padding = padding || 0;
    var isPaddingNumber = typeof padding === 'number';
    boundaries.left += isPaddingNumber ? padding : padding.left || 0;
    boundaries.top += isPaddingNumber ? padding : padding.top || 0;
    boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
    boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;
    return boundaries;
  }
  function getArea(_ref) {
    var width = _ref.width,
        height = _ref.height;
    return width * height;
  }
  function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
    var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    if (placement.indexOf('auto') === -1) {
      return placement;
    }
    var boundaries = getBoundaries(popper, reference, padding, boundariesElement);
    var rects = {
      top: {
        width: boundaries.width,
        height: refRect.top - boundaries.top
      },
      right: {
        width: boundaries.right - refRect.right,
        height: boundaries.height
      },
      bottom: {
        width: boundaries.width,
        height: boundaries.bottom - refRect.bottom
      },
      left: {
        width: refRect.left - boundaries.left,
        height: boundaries.height
      }
    };
    var sortedAreas = Object.keys(rects).map(function (key) {
      return _extends({
        key: key
      }, rects[key], {
        area: getArea(rects[key])
      });
    }).sort(function (a, b) {
      return b.area - a.area;
    });
    var filteredAreas = sortedAreas.filter(function (_ref2) {
      var width = _ref2.width,
          height = _ref2.height;
      return width >= popper.clientWidth && height >= popper.clientHeight;
    });
    var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;
    var variation = placement.split('-')[1];
    return computedPlacement + (variation ? '-' + variation : '');
  }
  function getReferenceOffsets(state, popper, reference) {
    var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
    return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
  }
  function getOuterSizes(element) {
    var window = element.ownerDocument.defaultView;
    var styles = window.getComputedStyle(element);
    var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
    var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
    var result = {
      width: element.offsetWidth + y,
      height: element.offsetHeight + x
    };
    return result;
  }
  function getOppositePlacement(placement) {
    var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash[matched];
    });
  }
  function getPopperOffsets(popper, referenceOffsets, placement) {
    placement = placement.split('-')[0];
    var popperRect = getOuterSizes(popper);
    var popperOffsets = {
      width: popperRect.width,
      height: popperRect.height
    };
    var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
    var mainSide = isHoriz ? 'top' : 'left';
    var secondarySide = isHoriz ? 'left' : 'top';
    var measurement = isHoriz ? 'height' : 'width';
    var secondaryMeasurement = !isHoriz ? 'height' : 'width';
    popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
    if (placement === secondarySide) {
      popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
    } else {
      popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
    }
    return popperOffsets;
  }
  function find(arr, check) {
    if (Array.prototype.find) {
      return arr.find(check);
    }
    return arr.filter(check)[0];
  }
  function findIndex(arr, prop, value) {
    if (Array.prototype.findIndex) {
      return arr.findIndex(function (cur) {
        return cur[prop] === value;
      });
    }
    var match = find(arr, function (obj) {
      return obj[prop] === value;
    });
    return arr.indexOf(match);
  }
  function runModifiers(modifiers, data, ends) {
    var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));
    modifiersToRun.forEach(function (modifier) {
      if (modifier['function']) {
        console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      }
      var fn = modifier['function'] || modifier.fn;
      if (modifier.enabled && isFunction(fn)) {
        data.offsets.popper = getClientRect(data.offsets.popper);
        data.offsets.reference = getClientRect(data.offsets.reference);
        data = fn(data, modifier);
      }
    });
    return data;
  }
  function update() {
    if (this.state.isDestroyed) {
      return;
    }
    var data = {
      instance: this,
      styles: {},
      arrowStyles: {},
      attributes: {},
      flipped: false,
      offsets: {}
    };
    data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);
    data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);
    data.originalPlacement = data.placement;
    data.positionFixed = this.options.positionFixed;
    data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
    data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';
    data = runModifiers(this.modifiers, data);
    if (!this.state.isCreated) {
      this.state.isCreated = true;
      this.options.onCreate(data);
    } else {
      this.options.onUpdate(data);
    }
  }
  function isModifierEnabled(modifiers, modifierName) {
    return modifiers.some(function (_ref) {
      var name = _ref.name,
          enabled = _ref.enabled;
      return enabled && name === modifierName;
    });
  }
  function getSupportedPropertyName(property) {
    var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
    var upperProp = property.charAt(0).toUpperCase() + property.slice(1);
    for (var i = 0; i < prefixes.length; i++) {
      var prefix = prefixes[i];
      var toCheck = prefix ? '' + prefix + upperProp : property;
      if (typeof document.body.style[toCheck] !== 'undefined') {
        return toCheck;
      }
    }
    return null;
  }
  function destroy() {
    this.state.isDestroyed = true;
    if (isModifierEnabled(this.modifiers, 'applyStyle')) {
      this.popper.removeAttribute('x-placement');
      this.popper.style.position = '';
      this.popper.style.top = '';
      this.popper.style.left = '';
      this.popper.style.right = '';
      this.popper.style.bottom = '';
      this.popper.style.willChange = '';
      this.popper.style[getSupportedPropertyName('transform')] = '';
    }
    this.disableEventListeners();
    if (this.options.removeOnDestroy) {
      this.popper.parentNode.removeChild(this.popper);
    }
    return this;
  }
  function getWindow(element) {
    var ownerDocument = element.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
  }
  function attachToScrollParents(scrollParent, event, callback, scrollParents) {
    var isBody = scrollParent.nodeName === 'BODY';
    var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
    target.addEventListener(event, callback, { passive: true });
    if (!isBody) {
      attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
    }
    scrollParents.push(target);
  }
  function setupEventListeners(reference, options, state, updateBound) {
    state.updateBound = updateBound;
    getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });
    var scrollElement = getScrollParent(reference);
    attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
    state.scrollElement = scrollElement;
    state.eventsEnabled = true;
    return state;
  }
  function enableEventListeners() {
    if (!this.state.eventsEnabled) {
      this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
    }
  }
  function removeEventListeners(reference, state) {
    getWindow(reference).removeEventListener('resize', state.updateBound);
    state.scrollParents.forEach(function (target) {
      target.removeEventListener('scroll', state.updateBound);
    });
    state.updateBound = null;
    state.scrollParents = [];
    state.scrollElement = null;
    state.eventsEnabled = false;
    return state;
  }
  function disableEventListeners() {
    if (this.state.eventsEnabled) {
      cancelAnimationFrame(this.scheduleUpdate);
      this.state = removeEventListeners(this.reference, this.state);
    }
  }
  function isNumeric(n) {
    return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
  }
  function setStyles(element, styles) {
    Object.keys(styles).forEach(function (prop) {
      var unit = '';
      if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
        unit = 'px';
      }
      element.style[prop] = styles[prop] + unit;
    });
  }
  function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(function (prop) {
      var value = attributes[prop];
      if (value !== false) {
        element.setAttribute(prop, attributes[prop]);
      } else {
        element.removeAttribute(prop);
      }
    });
  }
  function applyStyle(data) {
    setStyles(data.instance.popper, data.styles);
    setAttributes(data.instance.popper, data.attributes);
    if (data.arrowElement && Object.keys(data.arrowStyles).length) {
      setStyles(data.arrowElement, data.arrowStyles);
    }
    return data;
  }
  function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
    var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);
    var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);
    popper.setAttribute('x-placement', placement);
    setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });
    return options;
  }
  function getRoundedOffsets(data, shouldRound) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var round = Math.round,
        floor = Math.floor;
    var noRound = function noRound(v) {
      return v;
    };
    var referenceWidth = round(reference.width);
    var popperWidth = round(popper.width);
    var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
    var isVariation = data.placement.indexOf('-') !== -1;
    var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
    var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;
    var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
    var verticalToInteger = !shouldRound ? noRound : round;
    return {
      left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
      top: verticalToInteger(popper.top),
      bottom: verticalToInteger(popper.bottom),
      right: horizontalToInteger(popper.right)
    };
  }
  var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);
  function computeStyle(data, options) {
    var x = options.x,
        y = options.y;
    var popper = data.offsets.popper;
    var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'applyStyle';
    }).gpuAcceleration;
    if (legacyGpuAccelerationOption !== undefined) {
      console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
    }
    var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;
    var offsetParent = getOffsetParent(data.instance.popper);
    var offsetParentRect = getBoundingClientRect(offsetParent);
    var styles = {
      position: popper.position
    };
    var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);
    var sideA = x === 'bottom' ? 'top' : 'bottom';
    var sideB = y === 'right' ? 'left' : 'right';
    var prefixedProperty = getSupportedPropertyName('transform');
    var left = void 0,
        top = void 0;
    if (sideA === 'bottom') {
      if (offsetParent.nodeName === 'HTML') {
        top = -offsetParent.clientHeight + offsets.bottom;
      } else {
        top = -offsetParentRect.height + offsets.bottom;
      }
    } else {
      top = offsets.top;
    }
    if (sideB === 'right') {
      if (offsetParent.nodeName === 'HTML') {
        left = -offsetParent.clientWidth + offsets.right;
      } else {
        left = -offsetParentRect.width + offsets.right;
      }
    } else {
      left = offsets.left;
    }
    if (gpuAcceleration && prefixedProperty) {
      styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
      styles[sideA] = 0;
      styles[sideB] = 0;
      styles.willChange = 'transform';
    } else {
      var invertTop = sideA === 'bottom' ? -1 : 1;
      var invertLeft = sideB === 'right' ? -1 : 1;
      styles[sideA] = top * invertTop;
      styles[sideB] = left * invertLeft;
      styles.willChange = sideA + ', ' + sideB;
    }
    var attributes = {
      'x-placement': data.placement
    };
    data.attributes = _extends({}, attributes, data.attributes);
    data.styles = _extends({}, styles, data.styles);
    data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);
    return data;
  }
  function isModifierRequired(modifiers, requestingName, requestedName) {
    var requesting = find(modifiers, function (_ref) {
      var name = _ref.name;
      return name === requestingName;
    });
    var isRequired = !!requesting && modifiers.some(function (modifier) {
      return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
    });
    if (!isRequired) {
      var _requesting = '`' + requestingName + '`';
      var requested = '`' + requestedName + '`';
      console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
    }
    return isRequired;
  }
  function arrow(data, options) {
    var _data$offsets$arrow;
    if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
      return data;
    }
    var arrowElement = options.element;
    if (typeof arrowElement === 'string') {
      arrowElement = data.instance.popper.querySelector(arrowElement);
      if (!arrowElement) {
        return data;
      }
    } else {
      if (!data.instance.popper.contains(arrowElement)) {
        console.warn('WARNING: `arrow.element` must be child of its popper element!');
        return data;
      }
    }
    var placement = data.placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var isVertical = ['left', 'right'].indexOf(placement) !== -1;
    var len = isVertical ? 'height' : 'width';
    var sideCapitalized = isVertical ? 'Top' : 'Left';
    var side = sideCapitalized.toLowerCase();
    var altSide = isVertical ? 'left' : 'top';
    var opSide = isVertical ? 'bottom' : 'right';
    var arrowElementSize = getOuterSizes(arrowElement)[len];
    if (reference[opSide] - arrowElementSize < popper[side]) {
      data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
    }
    if (reference[side] + arrowElementSize > popper[opSide]) {
      data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
    }
    data.offsets.popper = getClientRect(data.offsets.popper);
    var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;
    var css = getStyleComputedProperty(data.instance.popper);
    var popperMarginSide = parseFloat(css['margin' + sideCapitalized]);
    var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width']);
    var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;
    sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);
    data.arrowElement = arrowElement;
    data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);
    return data;
  }
  function getOppositeVariation(variation) {
    if (variation === 'end') {
      return 'start';
    } else if (variation === 'start') {
      return 'end';
    }
    return variation;
  }
  var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];
  var validPlacements = placements.slice(3);
  function clockwise(placement) {
    var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var index = validPlacements.indexOf(placement);
    var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
    return counter ? arr.reverse() : arr;
  }
  var BEHAVIORS = {
    FLIP: 'flip',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'
  };
  function flip(data, options) {
    if (isModifierEnabled(data.instance.modifiers, 'inner')) {
      return data;
    }
    if (data.flipped && data.placement === data.originalPlacement) {
      return data;
    }
    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);
    var placement = data.placement.split('-')[0];
    var placementOpposite = getOppositePlacement(placement);
    var variation = data.placement.split('-')[1] || '';
    var flipOrder = [];
    switch (options.behavior) {
      case BEHAVIORS.FLIP:
        flipOrder = [placement, placementOpposite];
        break;
      case BEHAVIORS.CLOCKWISE:
        flipOrder = clockwise(placement);
        break;
      case BEHAVIORS.COUNTERCLOCKWISE:
        flipOrder = clockwise(placement, true);
        break;
      default:
        flipOrder = options.behavior;
    }
    flipOrder.forEach(function (step, index) {
      if (placement !== step || flipOrder.length === index + 1) {
        return data;
      }
      placement = data.placement.split('-')[0];
      placementOpposite = getOppositePlacement(placement);
      var popperOffsets = data.offsets.popper;
      var refOffsets = data.offsets.reference;
      var floor = Math.floor;
      var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);
      var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
      var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
      var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
      var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);
      var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;
      var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
      var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);
      var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);
      var flippedVariation = flippedVariationByRef || flippedVariationByContent;
      if (overlapsRef || overflowsBoundaries || flippedVariation) {
        data.flipped = true;
        if (overlapsRef || overflowsBoundaries) {
          placement = flipOrder[index + 1];
        }
        if (flippedVariation) {
          variation = getOppositeVariation(variation);
        }
        data.placement = placement + (variation ? '-' + variation : '');
        data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));
        data = runModifiers(data.instance.modifiers, data, 'flip');
      }
    });
    return data;
  }
  function keepTogether(data) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var placement = data.placement.split('-')[0];
    var floor = Math.floor;
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var side = isVertical ? 'right' : 'bottom';
    var opSide = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';
    if (popper[side] < floor(reference[opSide])) {
      data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
    }
    if (popper[opSide] > floor(reference[side])) {
      data.offsets.popper[opSide] = floor(reference[side]);
    }
    return data;
  }
  function toValue(str, measurement, popperOffsets, referenceOffsets) {
    var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
    var value = +split[1];
    var unit = split[2];
    if (!value) {
      return str;
    }
    if (unit.indexOf('%') === 0) {
      var element = void 0;
      switch (unit) {
        case '%p':
          element = popperOffsets;
          break;
        case '%':
        case '%r':
        default:
          element = referenceOffsets;
      }
      var rect = getClientRect(element);
      return rect[measurement] / 100 * value;
    } else if (unit === 'vh' || unit === 'vw') {
      var size = void 0;
      if (unit === 'vh') {
        size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      } else {
        size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      }
      return size / 100 * value;
    } else {
      return value;
    }
  }
  function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
    var offsets = [0, 0];
    var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;
    var fragments = offset.split(/(\+|\-)/).map(function (frag) {
      return frag.trim();
    });
    var divider = fragments.indexOf(find(fragments, function (frag) {
      return frag.search(/,|\s/) !== -1;
    }));
    if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
      console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    }
    var splitRegex = /\s*,\s*|\s+/;
    var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];
    ops = ops.map(function (op, index) {
      var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
      var mergeWithPrevious = false;
      return op
      .reduce(function (a, b) {
        if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
          a[a.length - 1] = b;
          mergeWithPrevious = true;
          return a;
        } else if (mergeWithPrevious) {
          a[a.length - 1] += b;
          mergeWithPrevious = false;
          return a;
        } else {
          return a.concat(b);
        }
      }, [])
      .map(function (str) {
        return toValue(str, measurement, popperOffsets, referenceOffsets);
      });
    });
    ops.forEach(function (op, index) {
      op.forEach(function (frag, index2) {
        if (isNumeric(frag)) {
          offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
        }
      });
    });
    return offsets;
  }
  function offset(data, _ref) {
    var offset = _ref.offset;
    var placement = data.placement,
        _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var basePlacement = placement.split('-')[0];
    var offsets = void 0;
    if (isNumeric(+offset)) {
      offsets = [+offset, 0];
    } else {
      offsets = parseOffset(offset, popper, reference, basePlacement);
    }
    if (basePlacement === 'left') {
      popper.top += offsets[0];
      popper.left -= offsets[1];
    } else if (basePlacement === 'right') {
      popper.top += offsets[0];
      popper.left += offsets[1];
    } else if (basePlacement === 'top') {
      popper.left += offsets[0];
      popper.top -= offsets[1];
    } else if (basePlacement === 'bottom') {
      popper.left += offsets[0];
      popper.top += offsets[1];
    }
    data.popper = popper;
    return data;
  }
  function preventOverflow(data, options) {
    var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);
    if (data.instance.reference === boundariesElement) {
      boundariesElement = getOffsetParent(boundariesElement);
    }
    var transformProp = getSupportedPropertyName('transform');
    var popperStyles = data.instance.popper.style;
    var top = popperStyles.top,
        left = popperStyles.left,
        transform = popperStyles[transformProp];
    popperStyles.top = '';
    popperStyles.left = '';
    popperStyles[transformProp] = '';
    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);
    popperStyles.top = top;
    popperStyles.left = left;
    popperStyles[transformProp] = transform;
    options.boundaries = boundaries;
    var order = options.priority;
    var popper = data.offsets.popper;
    var check = {
      primary: function primary(placement) {
        var value = popper[placement];
        if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
          value = Math.max(popper[placement], boundaries[placement]);
        }
        return defineProperty({}, placement, value);
      },
      secondary: function secondary(placement) {
        var mainSide = placement === 'right' ? 'left' : 'top';
        var value = popper[mainSide];
        if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
          value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
        }
        return defineProperty({}, mainSide, value);
      }
    };
    order.forEach(function (placement) {
      var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
      popper = _extends({}, popper, check[side](placement));
    });
    data.offsets.popper = popper;
    return data;
  }
  function shift(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var shiftvariation = placement.split('-')[1];
    if (shiftvariation) {
      var _data$offsets = data.offsets,
          reference = _data$offsets.reference,
          popper = _data$offsets.popper;
      var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
      var side = isVertical ? 'left' : 'top';
      var measurement = isVertical ? 'width' : 'height';
      var shiftOffsets = {
        start: defineProperty({}, side, reference[side]),
        end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
      };
      data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
    }
    return data;
  }
  function hide(data) {
    if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
      return data;
    }
    var refRect = data.offsets.reference;
    var bound = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'preventOverflow';
    }).boundaries;
    if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
      if (data.hide === true) {
        return data;
      }
      data.hide = true;
      data.attributes['x-out-of-boundaries'] = '';
    } else {
      if (data.hide === false) {
        return data;
      }
      data.hide = false;
      data.attributes['x-out-of-boundaries'] = false;
    }
    return data;
  }
  function inner(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;
    var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;
    popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);
    data.placement = getOppositePlacement(placement);
    data.offsets.popper = getClientRect(popper);
    return data;
  }
  var modifiers = {
    shift: {
      order: 100,
      enabled: true,
      fn: shift
    },
    offset: {
      order: 200,
      enabled: true,
      fn: offset,
      offset: 0
    },
    preventOverflow: {
      order: 300,
      enabled: true,
      fn: preventOverflow,
      priority: ['left', 'right', 'top', 'bottom'],
      padding: 5,
      boundariesElement: 'scrollParent'
    },
    keepTogether: {
      order: 400,
      enabled: true,
      fn: keepTogether
    },
    arrow: {
      order: 500,
      enabled: true,
      fn: arrow,
      element: '[x-arrow]'
    },
    flip: {
      order: 600,
      enabled: true,
      fn: flip,
      behavior: 'flip',
      padding: 5,
      boundariesElement: 'viewport',
      flipVariations: false,
      flipVariationsByContent: false
    },
    inner: {
      order: 700,
      enabled: false,
      fn: inner
    },
    hide: {
      order: 800,
      enabled: true,
      fn: hide
    },
    computeStyle: {
      order: 850,
      enabled: true,
      fn: computeStyle,
      gpuAcceleration: true,
      x: 'bottom',
      y: 'right'
    },
    applyStyle: {
      order: 900,
      enabled: true,
      fn: applyStyle,
      onLoad: applyStyleOnLoad,
      gpuAcceleration: undefined
    }
  };
  var Defaults = {
    placement: 'bottom',
    positionFixed: false,
    eventsEnabled: true,
    removeOnDestroy: false,
    onCreate: function onCreate() {},
    onUpdate: function onUpdate() {},
    modifiers: modifiers
  };
  var Popper = function () {
    function Popper(reference, popper) {
      var _this = this;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      classCallCheck(this, Popper);
      this.scheduleUpdate = function () {
        return requestAnimationFrame(_this.update);
      };
      this.update = debounce(this.update.bind(this));
      this.options = _extends({}, Popper.Defaults, options);
      this.state = {
        isDestroyed: false,
        isCreated: false,
        scrollParents: []
      };
      this.reference = reference && reference.jquery ? reference[0] : reference;
      this.popper = popper && popper.jquery ? popper[0] : popper;
      this.options.modifiers = {};
      Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
        _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
      });
      this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
        return _extends({
          name: name
        }, _this.options.modifiers[name]);
      })
      .sort(function (a, b) {
        return a.order - b.order;
      });
      this.modifiers.forEach(function (modifierOptions) {
        if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
          modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
        }
      });
      this.update();
      var eventsEnabled = this.options.eventsEnabled;
      if (eventsEnabled) {
        this.enableEventListeners();
      }
      this.state.eventsEnabled = eventsEnabled;
    }
    createClass(Popper, [{
      key: 'update',
      value: function update$$1() {
        return update.call(this);
      }
    }, {
      key: 'destroy',
      value: function destroy$$1() {
        return destroy.call(this);
      }
    }, {
      key: 'enableEventListeners',
      value: function enableEventListeners$$1() {
        return enableEventListeners.call(this);
      }
    }, {
      key: 'disableEventListeners',
      value: function disableEventListeners$$1() {
        return disableEventListeners.call(this);
      }
    }]);
    return Popper;
  }();
  Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
  Popper.placements = placements;
  Popper.Defaults = Defaults;

  /*!
    * Bootstrap v5.0.0-alpha2 (https://getbootstrap.com/)
    * Copyright 2011-2020 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    */
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  function _extends$1() {
    _extends$1 = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends$1.apply(this, arguments);
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000;
  var TRANSITION_END = 'transitionend';
  var toType = function toType(obj) {
    if (obj === null || obj === undefined) {
      return "" + obj;
    }
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  };
  var getUID = function getUID(prefix) {
    do {
      prefix += Math.floor(Math.random() * MAX_UID);
    } while (document.getElementById(prefix));
    return prefix;
  };
  var getSelector = function getSelector(element) {
    var selector = element.getAttribute('data-target');
    if (!selector || selector === '#') {
      var hrefAttr = element.getAttribute('href');
      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
    }
    return selector;
  };
  var getSelectorFromElement = function getSelectorFromElement(element) {
    var selector = getSelector(element);
    if (selector) {
      return document.querySelector(selector) ? selector : null;
    }
    return null;
  };
  var getElementFromSelector = function getElementFromSelector(element) {
    var selector = getSelector(element);
    return selector ? document.querySelector(selector) : null;
  };
  var getTransitionDurationFromElement = function getTransitionDurationFromElement(element) {
    if (!element) {
      return 0;
    }
    var _window$getComputedSt = window.getComputedStyle(element),
        transitionDuration = _window$getComputedSt.transitionDuration,
        transitionDelay = _window$getComputedSt.transitionDelay;
    var floatTransitionDuration = parseFloat(transitionDuration);
    var floatTransitionDelay = parseFloat(transitionDelay);
    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    }
    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };
  var triggerTransitionEnd = function triggerTransitionEnd(element) {
    element.dispatchEvent(new Event(TRANSITION_END));
  };
  var isElement = function isElement(obj) {
    return (obj[0] || obj).nodeType;
  };
  var emulateTransitionEnd = function emulateTransitionEnd(element, duration) {
    var called = false;
    var durationPadding = 5;
    var emulatedDuration = duration + durationPadding;
    function listener() {
      called = true;
      element.removeEventListener(TRANSITION_END, listener);
    }
    element.addEventListener(TRANSITION_END, listener);
    setTimeout(function () {
      if (!called) {
        triggerTransitionEnd(element);
      }
    }, emulatedDuration);
  };
  var typeCheckConfig = function typeCheckConfig(componentName, config, configTypes) {
    Object.keys(configTypes).forEach(function (property) {
      var expectedTypes = configTypes[property];
      var value = config[property];
      var valueType = value && isElement(value) ? 'element' : toType(value);
      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
      }
    });
  };
  var isVisible = function isVisible(element) {
    if (!element) {
      return false;
    }
    if (element.style && element.parentNode && element.parentNode.style) {
      var elementStyle = getComputedStyle(element);
      var parentNodeStyle = getComputedStyle(element.parentNode);
      return elementStyle.display !== 'none' && parentNodeStyle.display !== 'none' && elementStyle.visibility !== 'hidden';
    }
    return false;
  };
  var findShadowRoot = function findShadowRoot(element) {
    if (!document.documentElement.attachShadow) {
      return null;
    }
    if (typeof element.getRootNode === 'function') {
      var root = element.getRootNode();
      return root instanceof ShadowRoot ? root : null;
    }
    if (element instanceof ShadowRoot) {
      return element;
    }
    if (!element.parentNode) {
      return null;
    }
    return findShadowRoot(element.parentNode);
  };
  var noop = function noop() {
    return function () {};
  };
  var reflow = function reflow(element) {
    return element.offsetHeight;
  };
  var getjQuery = function getjQuery() {
    var _window = window,
        jQuery = _window.jQuery;
    if (jQuery && !document.body.hasAttribute('data-no-jquery')) {
      return jQuery;
    }
    return null;
  };
  var mapData = function () {
    var storeData = {};
    var id = 1;
    return {
      set: function set(element, key, data) {
        if (typeof element.bsKey === 'undefined') {
          element.bsKey = {
            key: key,
            id: id
          };
          id++;
        }
        storeData[element.bsKey.id] = data;
      },
      get: function get(element, key) {
        if (!element || typeof element.bsKey === 'undefined') {
          return null;
        }
        var keyProperties = element.bsKey;
        if (keyProperties.key === key) {
          return storeData[keyProperties.id];
        }
        return null;
      },
      delete: function _delete(element, key) {
        if (typeof element.bsKey === 'undefined') {
          return;
        }
        var keyProperties = element.bsKey;
        if (keyProperties.key === key) {
          delete storeData[keyProperties.id];
          delete element.bsKey;
        }
      }
    };
  }();
  var Data = {
    setData: function setData(instance, key, data) {
      mapData.set(instance, key, data);
    },
    getData: function getData(instance, key) {
      return mapData.get(instance, key);
    },
    removeData: function removeData(instance, key) {
      mapData.delete(instance, key);
    }
  };
  var find$1 = Element.prototype.querySelectorAll;
  var findOne = Element.prototype.querySelector;
  var defaultPreventedPreservedOnDispatch = function () {
    var e = new CustomEvent('Bootstrap', {
      cancelable: true
    });
    var element = document.createElement('div');
    element.addEventListener('Bootstrap', function () {
      return null;
    });
    e.preventDefault();
    element.dispatchEvent(e);
    return e.defaultPrevented;
  }();
  var scopeSelectorRegex = /:scope\b/;
  var supportScopeQuery = function () {
    var element = document.createElement('div');
    try {
      element.querySelectorAll(':scope *');
    } catch (_) {
      return false;
    }
    return true;
  }();
  if (!supportScopeQuery) {
    find$1 = function find(selector) {
      if (!scopeSelectorRegex.test(selector)) {
        return this.querySelectorAll(selector);
      }
      var hasId = Boolean(this.id);
      if (!hasId) {
        this.id = getUID('scope');
      }
      var nodeList = null;
      try {
        selector = selector.replace(scopeSelectorRegex, "#" + this.id);
        nodeList = this.querySelectorAll(selector);
      } finally {
        if (!hasId) {
          this.removeAttribute('id');
        }
      }
      return nodeList;
    };
    findOne = function findOne(selector) {
      if (!scopeSelectorRegex.test(selector)) {
        return this.querySelector(selector);
      }
      var matches = find$1.call(this, selector);
      if (typeof matches[0] !== 'undefined') {
        return matches[0];
      }
      return null;
    };
  }
  var $ = getjQuery();
  var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  var stripNameRegex = /\..*/;
  var stripUidRegex = /::\d+$/;
  var eventRegistry = {};
  var uidEvent = 1;
  var customEvents = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };
  var nativeEvents = ['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll'];
  function getUidEvent(element, uid) {
    return uid && uid + "::" + uidEvent++ || element.uidEvent || uidEvent++;
  }
  function getEvent(element) {
    var uid = getUidEvent(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }
  function bootstrapHandler(element, fn) {
    return function handler(event) {
      event.delegateTarget = element;
      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }
      return fn.apply(element, [event]);
    };
  }
  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      var domElements = element.querySelectorAll(selector);
      for (var target = event.target; target && target !== this; target = target.parentNode) {
        for (var i = domElements.length; i--;) {
          if (domElements[i] === target) {
            event.delegateTarget = target;
            if (handler.oneOff) {
              EventHandler.off(element, event.type, fn);
            }
            return fn.apply(target, [event]);
          }
        }
      }
      return null;
    };
  }
  function findHandler(events, handler, delegationSelector) {
    if (delegationSelector === void 0) {
      delegationSelector = null;
    }
    var uidEventList = Object.keys(events);
    for (var i = 0, len = uidEventList.length; i < len; i++) {
      var event = events[uidEventList[i]];
      if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
        return event;
      }
    }
    return null;
  }
  function normalizeParams(originalTypeEvent, handler, delegationFn) {
    var delegation = typeof handler === 'string';
    var originalHandler = delegation ? delegationFn : handler;
    var typeEvent = originalTypeEvent.replace(stripNameRegex, '');
    var custom = customEvents[typeEvent];
    if (custom) {
      typeEvent = custom;
    }
    var isNative = nativeEvents.indexOf(typeEvent) > -1;
    if (!isNative) {
      typeEvent = originalTypeEvent;
    }
    return [delegation, originalHandler, typeEvent];
  }
  function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }
    if (!handler) {
      handler = delegationFn;
      delegationFn = null;
    }
    var _normalizeParams = normalizeParams(originalTypeEvent, handler, delegationFn),
        delegation = _normalizeParams[0],
        originalHandler = _normalizeParams[1],
        typeEvent = _normalizeParams[2];
    var events = getEvent(element);
    var handlers = events[typeEvent] || (events[typeEvent] = {});
    var previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);
    if (previousFn) {
      previousFn.oneOff = previousFn.oneOff && oneOff;
      return;
    }
    var uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
    var fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
    fn.delegationSelector = delegation ? handler : null;
    fn.originalHandler = originalHandler;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, delegation);
  }
  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    var fn = findHandler(events[typeEvent], handler, delegationSelector);
    if (!fn) {
      return;
    }
    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }
  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    var storeElementEvent = events[typeEvent] || {};
    Object.keys(storeElementEvent).forEach(function (handlerKey) {
      if (handlerKey.indexOf(namespace) > -1) {
        var event = storeElementEvent[handlerKey];
        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
      }
    });
  }
  var EventHandler = {
    on: function on(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, false);
    },
    one: function one(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, true);
    },
    off: function off(element, originalTypeEvent, handler, delegationFn) {
      if (typeof originalTypeEvent !== 'string' || !element) {
        return;
      }
      var _normalizeParams2 = normalizeParams(originalTypeEvent, handler, delegationFn),
          delegation = _normalizeParams2[0],
          originalHandler = _normalizeParams2[1],
          typeEvent = _normalizeParams2[2];
      var inNamespace = typeEvent !== originalTypeEvent;
      var events = getEvent(element);
      var isNamespace = originalTypeEvent.charAt(0) === '.';
      if (typeof originalHandler !== 'undefined') {
        if (!events || !events[typeEvent]) {
          return;
        }
        removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
        return;
      }
      if (isNamespace) {
        Object.keys(events).forEach(function (elementEvent) {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        });
      }
      var storeElementEvent = events[typeEvent] || {};
      Object.keys(storeElementEvent).forEach(function (keyHandlers) {
        var handlerKey = keyHandlers.replace(stripUidRegex, '');
        if (!inNamespace || originalTypeEvent.indexOf(handlerKey) > -1) {
          var event = storeElementEvent[keyHandlers];
          removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
        }
      });
    },
    trigger: function trigger(element, event, args) {
      if (typeof event !== 'string' || !element) {
        return null;
      }
      var typeEvent = event.replace(stripNameRegex, '');
      var inNamespace = event !== typeEvent;
      var isNative = nativeEvents.indexOf(typeEvent) > -1;
      var jQueryEvent;
      var bubbles = true;
      var nativeDispatch = true;
      var defaultPrevented = false;
      var evt = null;
      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }
      if (isNative) {
        evt = document.createEvent('HTMLEvents');
        evt.initEvent(typeEvent, bubbles, true);
      } else {
        evt = new CustomEvent(event, {
          bubbles: bubbles,
          cancelable: true
        });
      }
      if (typeof args !== 'undefined') {
        Object.keys(args).forEach(function (key) {
          Object.defineProperty(evt, key, {
            get: function get() {
              return args[key];
            }
          });
        });
      }
      if (defaultPrevented) {
        evt.preventDefault();
        if (!defaultPreventedPreservedOnDispatch) {
          Object.defineProperty(evt, 'defaultPrevented', {
            get: function get() {
              return true;
            }
          });
        }
      }
      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }
      if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
        jQueryEvent.preventDefault();
      }
      return evt;
    }
  };
  var NAME = 'alert';
  var VERSION = '5.0.0-alpha2';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var SELECTOR_DISMISS = '[data-dismiss="alert"]';
  var EVENT_CLOSE = "close" + EVENT_KEY;
  var EVENT_CLOSED = "closed" + EVENT_KEY;
  var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
  var CLASSNAME_ALERT = 'alert';
  var CLASSNAME_FADE = 'fade';
  var CLASSNAME_SHOW = 'show';
  var Alert = function () {
    function Alert(element) {
      this._element = element;
      if (this._element) {
        Data.setData(element, DATA_KEY, this);
      }
    }
    var _proto = Alert.prototype;
    _proto.close = function close(element) {
      var rootElement = element ? this._getRootElement(element) : this._element;
      var customEvent = this._triggerCloseEvent(rootElement);
      if (customEvent === null || customEvent.defaultPrevented) {
        return;
      }
      this._removeElement(rootElement);
    };
    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY);
      this._element = null;
    }
    ;
    _proto._getRootElement = function _getRootElement(element) {
      return getElementFromSelector(element) || element.closest("." + CLASSNAME_ALERT);
    };
    _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
      return EventHandler.trigger(element, EVENT_CLOSE);
    };
    _proto._removeElement = function _removeElement(element) {
      var _this = this;
      element.classList.remove(CLASSNAME_SHOW);
      if (!element.classList.contains(CLASSNAME_FADE)) {
        this._destroyElement(element);
        return;
      }
      var transitionDuration = getTransitionDurationFromElement(element);
      EventHandler.one(element, TRANSITION_END, function () {
        return _this._destroyElement(element);
      });
      emulateTransitionEnd(element, transitionDuration);
    };
    _proto._destroyElement = function _destroyElement(element) {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
      EventHandler.trigger(element, EVENT_CLOSED);
    }
    ;
    Alert.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY);
        if (!data) {
          data = new Alert(this);
        }
        if (config === 'close') {
          data[config](this);
        }
      });
    };
    Alert.handleDismiss = function handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }
        alertInstance.close(this);
      };
    };
    Alert.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY);
    };
    _createClass(Alert, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);
    return Alert;
  }();
  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DISMISS, Alert.handleDismiss(new Alert()));
  var $$1 = getjQuery();
  if ($$1) {
    var JQUERY_NO_CONFLICT = $$1.fn[NAME];
    $$1.fn[NAME] = Alert.jQueryInterface;
    $$1.fn[NAME].Constructor = Alert;
    $$1.fn[NAME].noConflict = function () {
      $$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Alert.jQueryInterface;
    };
  }
  var NAME$1 = 'button';
  var VERSION$1 = '5.0.0-alpha2';
  var DATA_KEY$1 = 'bs.button';
  var EVENT_KEY$1 = "." + DATA_KEY$1;
  var DATA_API_KEY$1 = '.data-api';
  var CLASS_NAME_ACTIVE = 'active';
  var SELECTOR_DATA_TOGGLE = '[data-toggle="button"]';
  var EVENT_CLICK_DATA_API$1 = "click" + EVENT_KEY$1 + DATA_API_KEY$1;
  var Button = function () {
    function Button(element) {
      this._element = element;
      Data.setData(element, DATA_KEY$1, this);
    }
    var _proto = Button.prototype;
    _proto.toggle = function toggle() {
      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE));
    };
    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY$1);
      this._element = null;
    }
    ;
    Button.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$1);
        if (!data) {
          data = new Button(this);
        }
        if (config === 'toggle') {
          data[config]();
        }
      });
    };
    Button.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$1);
    };
    _createClass(Button, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$1;
      }
    }]);
    return Button;
  }();
  EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE, function (event) {
    event.preventDefault();
    var button = event.target.closest(SELECTOR_DATA_TOGGLE);
    var data = Data.getData(button, DATA_KEY$1);
    if (!data) {
      data = new Button(button);
    }
    data.toggle();
  });
  var $$2 = getjQuery();
  if ($$2) {
    var JQUERY_NO_CONFLICT$1 = $$2.fn[NAME$1];
    $$2.fn[NAME$1] = Button.jQueryInterface;
    $$2.fn[NAME$1].Constructor = Button;
    $$2.fn[NAME$1].noConflict = function () {
      $$2.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
      return Button.jQueryInterface;
    };
  }
  function normalizeData(val) {
    if (val === 'true') {
      return true;
    }
    if (val === 'false') {
      return false;
    }
    if (val === Number(val).toString()) {
      return Number(val);
    }
    if (val === '' || val === 'null') {
      return null;
    }
    return val;
  }
  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, function (chr) {
      return "-" + chr.toLowerCase();
    });
  }
  var Manipulator = {
    setDataAttribute: function setDataAttribute(element, key, value) {
      element.setAttribute("data-" + normalizeDataKey(key), value);
    },
    removeDataAttribute: function removeDataAttribute(element, key) {
      element.removeAttribute("data-" + normalizeDataKey(key));
    },
    getDataAttributes: function getDataAttributes(element) {
      if (!element) {
        return {};
      }
      var attributes = _extends$1({}, element.dataset);
      Object.keys(attributes).forEach(function (key) {
        attributes[key] = normalizeData(attributes[key]);
      });
      return attributes;
    },
    getDataAttribute: function getDataAttribute(element, key) {
      return normalizeData(element.getAttribute("data-" + normalizeDataKey(key)));
    },
    offset: function offset(element) {
      var rect = element.getBoundingClientRect();
      return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
      };
    },
    position: function position(element) {
      return {
        top: element.offsetTop,
        left: element.offsetLeft
      };
    },
    toggleClass: function toggleClass(element, className) {
      if (!element) {
        return;
      }
      if (element.classList.contains(className)) {
        element.classList.remove(className);
      } else {
        element.classList.add(className);
      }
    }
  };
  var NODE_TEXT = 3;
  var SelectorEngine = {
    matches: function matches(element, selector) {
      return element.matches(selector);
    },
    find: function find$1$1(selector, element) {
      var _ref;
      if (element === void 0) {
        element = document.documentElement;
      }
      return (_ref = []).concat.apply(_ref, find$1.call(element, selector));
    },
    findOne: function findOne$1(selector, element) {
      if (element === void 0) {
        element = document.documentElement;
      }
      return findOne.call(element, selector);
    },
    children: function children(element, selector) {
      var _ref2;
      var children = (_ref2 = []).concat.apply(_ref2, element.children);
      return children.filter(function (child) {
        return child.matches(selector);
      });
    },
    parents: function parents(element, selector) {
      var parents = [];
      var ancestor = element.parentNode;
      while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
        if (this.matches(ancestor, selector)) {
          parents.push(ancestor);
        }
        ancestor = ancestor.parentNode;
      }
      return parents;
    },
    prev: function prev(element, selector) {
      var previous = element.previousElementSibling;
      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }
        previous = previous.previousElementSibling;
      }
      return [];
    },
    next: function next(element, selector) {
      var next = element.nextElementSibling;
      while (next) {
        if (this.matches(next, selector)) {
          return [next];
        }
        next = next.nextElementSibling;
      }
      return [];
    }
  };
  var NAME$2 = 'carousel';
  var VERSION$2 = '5.0.0-alpha2';
  var DATA_KEY$2 = 'bs.carousel';
  var EVENT_KEY$2 = "." + DATA_KEY$2;
  var DATA_API_KEY$2 = '.data-api';
  var ARROW_LEFT_KEY = 'ArrowLeft';
  var ARROW_RIGHT_KEY = 'ArrowRight';
  var TOUCHEVENT_COMPAT_WAIT = 500;
  var SWIPE_THRESHOLD = 40;
  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  var DIRECTION_NEXT = 'next';
  var DIRECTION_PREV = 'prev';
  var DIRECTION_LEFT = 'left';
  var DIRECTION_RIGHT = 'right';
  var EVENT_SLIDE = "slide" + EVENT_KEY$2;
  var EVENT_SLID = "slid" + EVENT_KEY$2;
  var EVENT_KEYDOWN = "keydown" + EVENT_KEY$2;
  var EVENT_MOUSEENTER = "mouseenter" + EVENT_KEY$2;
  var EVENT_MOUSELEAVE = "mouseleave" + EVENT_KEY$2;
  var EVENT_TOUCHSTART = "touchstart" + EVENT_KEY$2;
  var EVENT_TOUCHMOVE = "touchmove" + EVENT_KEY$2;
  var EVENT_TOUCHEND = "touchend" + EVENT_KEY$2;
  var EVENT_POINTERDOWN = "pointerdown" + EVENT_KEY$2;
  var EVENT_POINTERUP = "pointerup" + EVENT_KEY$2;
  var EVENT_DRAG_START = "dragstart" + EVENT_KEY$2;
  var EVENT_LOAD_DATA_API = "load" + EVENT_KEY$2 + DATA_API_KEY$2;
  var EVENT_CLICK_DATA_API$2 = "click" + EVENT_KEY$2 + DATA_API_KEY$2;
  var CLASS_NAME_CAROUSEL = 'carousel';
  var CLASS_NAME_ACTIVE$1 = 'active';
  var CLASS_NAME_SLIDE = 'slide';
  var CLASS_NAME_RIGHT = 'carousel-item-right';
  var CLASS_NAME_LEFT = 'carousel-item-left';
  var CLASS_NAME_NEXT = 'carousel-item-next';
  var CLASS_NAME_PREV = 'carousel-item-prev';
  var CLASS_NAME_POINTER_EVENT = 'pointer-event';
  var SELECTOR_ACTIVE = '.active';
  var SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
  var SELECTOR_ITEM = '.carousel-item';
  var SELECTOR_ITEM_IMG = '.carousel-item img';
  var SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
  var SELECTOR_INDICATORS = '.carousel-indicators';
  var SELECTOR_DATA_SLIDE = '[data-slide], [data-slide-to]';
  var SELECTOR_DATA_RIDE = '[data-ride="carousel"]';
  var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
  };
  var Carousel = function () {
    function Carousel(element, config) {
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this._config = this._getConfig(config);
      this._element = element;
      this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent = Boolean(window.PointerEvent);
      this._addEventListeners();
      Data.setData(element, DATA_KEY$2, this);
    }
    var _proto = Carousel.prototype;
    _proto.next = function next() {
      if (!this._isSliding) {
        this._slide(DIRECTION_NEXT);
      }
    };
    _proto.nextWhenVisible = function nextWhenVisible() {
      if (!document.hidden && isVisible(this._element)) {
        this.next();
      }
    };
    _proto.prev = function prev() {
      if (!this._isSliding) {
        this._slide(DIRECTION_PREV);
      }
    };
    _proto.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }
      if (SelectorEngine.findOne(SELECTOR_NEXT_PREV, this._element)) {
        triggerTransitionEnd(this._element);
        this.cycle(true);
      }
      clearInterval(this._interval);
      this._interval = null;
    };
    _proto.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }
      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }
      if (this._config && this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };
    _proto.to = function to(index) {
      var _this = this;
      this._activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
      var activeIndex = this._getItemIndex(this._activeElement);
      if (index > this._items.length - 1 || index < 0) {
        return;
      }
      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, function () {
          return _this.to(index);
        });
        return;
      }
      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }
      var direction = index > activeIndex ? DIRECTION_NEXT : DIRECTION_PREV;
      this._slide(direction, this._items[index]);
    };
    _proto.dispose = function dispose() {
      EventHandler.off(this._element, EVENT_KEY$2);
      Data.removeData(this._element, DATA_KEY$2);
      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    }
    ;
    _proto._getConfig = function _getConfig(config) {
      config = _extends$1({}, Default, config);
      typeCheckConfig(NAME$2, config, DefaultType);
      return config;
    };
    _proto._handleSwipe = function _handleSwipe() {
      var absDeltax = Math.abs(this.touchDeltaX);
      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      }
      var direction = absDeltax / this.touchDeltaX;
      this.touchDeltaX = 0;
      if (direction > 0) {
        this.prev();
      }
      if (direction < 0) {
        this.next();
      }
    };
    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this;
      if (this._config.keyboard) {
        EventHandler.on(this._element, EVENT_KEYDOWN, function (event) {
          return _this2._keydown(event);
        });
      }
      if (this._config.pause === 'hover') {
        EventHandler.on(this._element, EVENT_MOUSEENTER, function (event) {
          return _this2.pause(event);
        });
        EventHandler.on(this._element, EVENT_MOUSELEAVE, function (event) {
          return _this2.cycle(event);
        });
      }
      if (this._config.touch && this._touchSupported) {
        this._addTouchEventListeners();
      }
    };
    _proto._addTouchEventListeners = function _addTouchEventListeners() {
      var _this3 = this;
      var start = function start(event) {
        if (_this3._pointerEvent && PointerType[event.pointerType.toUpperCase()]) {
          _this3.touchStartX = event.clientX;
        } else if (!_this3._pointerEvent) {
          _this3.touchStartX = event.touches[0].clientX;
        }
      };
      var move = function move(event) {
        if (event.touches && event.touches.length > 1) {
          _this3.touchDeltaX = 0;
        } else {
          _this3.touchDeltaX = event.touches[0].clientX - _this3.touchStartX;
        }
      };
      var end = function end(event) {
        if (_this3._pointerEvent && PointerType[event.pointerType.toUpperCase()]) {
          _this3.touchDeltaX = event.clientX - _this3.touchStartX;
        }
        _this3._handleSwipe();
        if (_this3._config.pause === 'hover') {
          _this3.pause();
          if (_this3.touchTimeout) {
            clearTimeout(_this3.touchTimeout);
          }
          _this3.touchTimeout = setTimeout(function (event) {
            return _this3.cycle(event);
          }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
        }
      };
      SelectorEngine.find(SELECTOR_ITEM_IMG, this._element).forEach(function (itemImg) {
        EventHandler.on(itemImg, EVENT_DRAG_START, function (e) {
          return e.preventDefault();
        });
      });
      if (this._pointerEvent) {
        EventHandler.on(this._element, EVENT_POINTERDOWN, function (event) {
          return start(event);
        });
        EventHandler.on(this._element, EVENT_POINTERUP, function (event) {
          return end(event);
        });
        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        EventHandler.on(this._element, EVENT_TOUCHSTART, function (event) {
          return start(event);
        });
        EventHandler.on(this._element, EVENT_TOUCHMOVE, function (event) {
          return move(event);
        });
        EventHandler.on(this._element, EVENT_TOUCHEND, function (event) {
          return end(event);
        });
      }
    };
    _proto._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }
      switch (event.key) {
        case ARROW_LEFT_KEY:
          event.preventDefault();
          this.prev();
          break;
        case ARROW_RIGHT_KEY:
          event.preventDefault();
          this.next();
          break;
      }
    };
    _proto._getItemIndex = function _getItemIndex(element) {
      this._items = element && element.parentNode ? SelectorEngine.find(SELECTOR_ITEM, element.parentNode) : [];
      return this._items.indexOf(element);
    };
    _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === DIRECTION_NEXT;
      var isPrevDirection = direction === DIRECTION_PREV;
      var activeIndex = this._getItemIndex(activeElement);
      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;
      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }
      var delta = direction === DIRECTION_PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;
      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };
    _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);
      var fromIndex = this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element));
      return EventHandler.trigger(this._element, EVENT_SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
    };
    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        var indicators = SelectorEngine.find(SELECTOR_ACTIVE, this._indicatorsElement);
        for (var i = 0; i < indicators.length; i++) {
          indicators[i].classList.remove(CLASS_NAME_ACTIVE$1);
        }
        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];
        if (nextIndicator) {
          nextIndicator.classList.add(CLASS_NAME_ACTIVE$1);
        }
      }
    };
    _proto._slide = function _slide(direction, element) {
      var _this4 = this;
      var activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
      var activeElementIndex = this._getItemIndex(activeElement);
      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);
      var nextElementIndex = this._getItemIndex(nextElement);
      var isCycling = Boolean(this._interval);
      var directionalClassName;
      var orderClassName;
      var eventDirectionName;
      if (direction === DIRECTION_NEXT) {
        directionalClassName = CLASS_NAME_LEFT;
        orderClassName = CLASS_NAME_NEXT;
        eventDirectionName = DIRECTION_LEFT;
      } else {
        directionalClassName = CLASS_NAME_RIGHT;
        orderClassName = CLASS_NAME_PREV;
        eventDirectionName = DIRECTION_RIGHT;
      }
      if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE$1)) {
        this._isSliding = false;
        return;
      }
      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
      if (slideEvent.defaultPrevented) {
        return;
      }
      if (!activeElement || !nextElement) {
        return;
      }
      this._isSliding = true;
      if (isCycling) {
        this.pause();
      }
      this._setActiveIndicatorElement(nextElement);
      if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
        nextElement.classList.add(orderClassName);
        reflow(nextElement);
        activeElement.classList.add(directionalClassName);
        nextElement.classList.add(directionalClassName);
        var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);
        if (nextElementInterval) {
          this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
          this._config.interval = nextElementInterval;
        } else {
          this._config.interval = this._config.defaultInterval || this._config.interval;
        }
        var transitionDuration = getTransitionDurationFromElement(activeElement);
        EventHandler.one(activeElement, TRANSITION_END, function () {
          nextElement.classList.remove(directionalClassName, orderClassName);
          nextElement.classList.add(CLASS_NAME_ACTIVE$1);
          activeElement.classList.remove(CLASS_NAME_ACTIVE$1, orderClassName, directionalClassName);
          _this4._isSliding = false;
          setTimeout(function () {
            EventHandler.trigger(_this4._element, EVENT_SLID, {
              relatedTarget: nextElement,
              direction: eventDirectionName,
              from: activeElementIndex,
              to: nextElementIndex
            });
          }, 0);
        });
        emulateTransitionEnd(activeElement, transitionDuration);
      } else {
        activeElement.classList.remove(CLASS_NAME_ACTIVE$1);
        nextElement.classList.add(CLASS_NAME_ACTIVE$1);
        this._isSliding = false;
        EventHandler.trigger(this._element, EVENT_SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        });
      }
      if (isCycling) {
        this.cycle();
      }
    }
    ;
    Carousel.carouselInterface = function carouselInterface(element, config) {
      var data = Data.getData(element, DATA_KEY$2);
      var _config = _extends$1({}, Default, Manipulator.getDataAttributes(element));
      if (typeof config === 'object') {
        _config = _extends$1({}, _config, config);
      }
      var action = typeof config === 'string' ? config : _config.slide;
      if (!data) {
        data = new Carousel(element, _config);
      }
      if (typeof config === 'number') {
        data.to(config);
      } else if (typeof action === 'string') {
        if (typeof data[action] === 'undefined') {
          throw new TypeError("No method named \"" + action + "\"");
        }
        data[action]();
      } else if (_config.interval && _config.ride) {
        data.pause();
        data.cycle();
      }
    };
    Carousel.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        Carousel.carouselInterface(this, config);
      });
    };
    Carousel.dataApiClickHandler = function dataApiClickHandler(event) {
      var target = getElementFromSelector(this);
      if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
        return;
      }
      var config = _extends$1({}, Manipulator.getDataAttributes(target), Manipulator.getDataAttributes(this));
      var slideIndex = this.getAttribute('data-slide-to');
      if (slideIndex) {
        config.interval = false;
      }
      Carousel.carouselInterface(target, config);
      if (slideIndex) {
        Data.getData(target, DATA_KEY$2).to(slideIndex);
      }
      event.preventDefault();
    };
    Carousel.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$2);
    };
    _createClass(Carousel, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$2;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);
    return Carousel;
  }();
  EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
  EventHandler.on(window, EVENT_LOAD_DATA_API, function () {
    var carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
    for (var i = 0, len = carousels.length; i < len; i++) {
      Carousel.carouselInterface(carousels[i], Data.getData(carousels[i], DATA_KEY$2));
    }
  });
  var $$3 = getjQuery();
  if ($$3) {
    var JQUERY_NO_CONFLICT$2 = $$3.fn[NAME$2];
    $$3.fn[NAME$2] = Carousel.jQueryInterface;
    $$3.fn[NAME$2].Constructor = Carousel;
    $$3.fn[NAME$2].noConflict = function () {
      $$3.fn[NAME$2] = JQUERY_NO_CONFLICT$2;
      return Carousel.jQueryInterface;
    };
  }
  var NAME$3 = 'collapse';
  var VERSION$3 = '5.0.0-alpha2';
  var DATA_KEY$3 = 'bs.collapse';
  var EVENT_KEY$3 = "." + DATA_KEY$3;
  var DATA_API_KEY$3 = '.data-api';
  var Default$1 = {
    toggle: true,
    parent: ''
  };
  var DefaultType$1 = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var EVENT_SHOW = "show" + EVENT_KEY$3;
  var EVENT_SHOWN = "shown" + EVENT_KEY$3;
  var EVENT_HIDE = "hide" + EVENT_KEY$3;
  var EVENT_HIDDEN = "hidden" + EVENT_KEY$3;
  var EVENT_CLICK_DATA_API$3 = "click" + EVENT_KEY$3 + DATA_API_KEY$3;
  var CLASS_NAME_SHOW = 'show';
  var CLASS_NAME_COLLAPSE = 'collapse';
  var CLASS_NAME_COLLAPSING = 'collapsing';
  var CLASS_NAME_COLLAPSED = 'collapsed';
  var WIDTH = 'width';
  var HEIGHT = 'height';
  var SELECTOR_ACTIVES = '.show, .collapsing';
  var SELECTOR_DATA_TOGGLE$1 = '[data-toggle="collapse"]';
  var Collapse = function () {
    function Collapse(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = SelectorEngine.find(SELECTOR_DATA_TOGGLE$1 + "[href=\"#" + element.id + "\"]," + (SELECTOR_DATA_TOGGLE$1 + "[data-target=\"#" + element.id + "\"]"));
      var toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$1);
      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = getSelectorFromElement(elem);
        var filterElement = SelectorEngine.find(selector).filter(function (foundElem) {
          return foundElem === element;
        });
        if (selector !== null && filterElement.length) {
          this._selector = selector;
          this._triggerArray.push(elem);
        }
      }
      this._parent = this._config.parent ? this._getParent() : null;
      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }
      if (this._config.toggle) {
        this.toggle();
      }
      Data.setData(element, DATA_KEY$3, this);
    }
    var _proto = Collapse.prototype;
    _proto.toggle = function toggle() {
      if (this._element.classList.contains(CLASS_NAME_SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };
    _proto.show = function show() {
      var _this = this;
      if (this._isTransitioning || this._element.classList.contains(CLASS_NAME_SHOW)) {
        return;
      }
      var actives;
      var activesData;
      if (this._parent) {
        actives = SelectorEngine.find(SELECTOR_ACTIVES, this._parent).filter(function (elem) {
          if (typeof _this._config.parent === 'string') {
            return elem.getAttribute('data-parent') === _this._config.parent;
          }
          return elem.classList.contains(CLASS_NAME_COLLAPSE);
        });
        if (actives.length === 0) {
          actives = null;
        }
      }
      var container = SelectorEngine.findOne(this._selector);
      if (actives) {
        var tempActiveData = actives.filter(function (elem) {
          return container !== elem;
        });
        activesData = tempActiveData[0] ? Data.getData(tempActiveData[0], DATA_KEY$3) : null;
        if (activesData && activesData._isTransitioning) {
          return;
        }
      }
      var startEvent = EventHandler.trigger(this._element, EVENT_SHOW);
      if (startEvent.defaultPrevented) {
        return;
      }
      if (actives) {
        actives.forEach(function (elemActive) {
          if (container !== elemActive) {
            Collapse.collapseInterface(elemActive, 'hide');
          }
          if (!activesData) {
            Data.setData(elemActive, DATA_KEY$3, null);
          }
        });
      }
      var dimension = this._getDimension();
      this._element.classList.remove(CLASS_NAME_COLLAPSE);
      this._element.classList.add(CLASS_NAME_COLLAPSING);
      this._element.style[dimension] = 0;
      if (this._triggerArray.length) {
        this._triggerArray.forEach(function (element) {
          element.classList.remove(CLASS_NAME_COLLAPSED);
          element.setAttribute('aria-expanded', true);
        });
      }
      this.setTransitioning(true);
      var complete = function complete() {
        _this._element.classList.remove(CLASS_NAME_COLLAPSING);
        _this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
        _this._element.style[dimension] = '';
        _this.setTransitioning(false);
        EventHandler.trigger(_this._element, EVENT_SHOWN);
      };
      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      var transitionDuration = getTransitionDurationFromElement(this._element);
      EventHandler.one(this._element, TRANSITION_END, complete);
      emulateTransitionEnd(this._element, transitionDuration);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };
    _proto.hide = function hide() {
      var _this2 = this;
      if (this._isTransitioning || !this._element.classList.contains(CLASS_NAME_SHOW)) {
        return;
      }
      var startEvent = EventHandler.trigger(this._element, EVENT_HIDE);
      if (startEvent.defaultPrevented) {
        return;
      }
      var dimension = this._getDimension();
      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_COLLAPSING);
      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
      var triggerArrayLength = this._triggerArray.length;
      if (triggerArrayLength > 0) {
        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i];
          var elem = getElementFromSelector(trigger);
          if (elem && !elem.classList.contains(CLASS_NAME_SHOW)) {
            trigger.classList.add(CLASS_NAME_COLLAPSED);
            trigger.setAttribute('aria-expanded', false);
          }
        }
      }
      this.setTransitioning(true);
      var complete = function complete() {
        _this2.setTransitioning(false);
        _this2._element.classList.remove(CLASS_NAME_COLLAPSING);
        _this2._element.classList.add(CLASS_NAME_COLLAPSE);
        EventHandler.trigger(_this2._element, EVENT_HIDDEN);
      };
      this._element.style[dimension] = '';
      var transitionDuration = getTransitionDurationFromElement(this._element);
      EventHandler.one(this._element, TRANSITION_END, complete);
      emulateTransitionEnd(this._element, transitionDuration);
    };
    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };
    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY$3);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    }
    ;
    _proto._getConfig = function _getConfig(config) {
      config = _extends$1({}, Default$1, config);
      config.toggle = Boolean(config.toggle);
      typeCheckConfig(NAME$3, config, DefaultType$1);
      return config;
    };
    _proto._getDimension = function _getDimension() {
      return this._element.classList.contains(WIDTH) ? WIDTH : HEIGHT;
    };
    _proto._getParent = function _getParent() {
      var _this3 = this;
      var parent = this._config.parent;
      if (isElement(parent)) {
        if (typeof parent.jquery !== 'undefined' || typeof parent[0] !== 'undefined') {
          parent = parent[0];
        }
      } else {
        parent = SelectorEngine.findOne(parent);
      }
      var selector = SELECTOR_DATA_TOGGLE$1 + "[data-parent=\"" + parent + "\"]";
      SelectorEngine.find(selector, parent).forEach(function (element) {
        var selected = getElementFromSelector(element);
        _this3._addAriaAndCollapsedClass(selected, [element]);
      });
      return parent;
    };
    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      if (!element || !triggerArray.length) {
        return;
      }
      var isOpen = element.classList.contains(CLASS_NAME_SHOW);
      triggerArray.forEach(function (elem) {
        if (isOpen) {
          elem.classList.remove(CLASS_NAME_COLLAPSED);
        } else {
          elem.classList.add(CLASS_NAME_COLLAPSED);
        }
        elem.setAttribute('aria-expanded', isOpen);
      });
    }
    ;
    Collapse.collapseInterface = function collapseInterface(element, config) {
      var data = Data.getData(element, DATA_KEY$3);
      var _config = _extends$1({}, Default$1, Manipulator.getDataAttributes(element), typeof config === 'object' && config ? config : {});
      if (!data && _config.toggle && typeof config === 'string' && /show|hide/.test(config)) {
        _config.toggle = false;
      }
      if (!data) {
        data = new Collapse(element, _config);
      }
      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"" + config + "\"");
        }
        data[config]();
      }
    };
    Collapse.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        Collapse.collapseInterface(this, config);
      });
    };
    Collapse.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$3);
    };
    _createClass(Collapse, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$3;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$1;
      }
    }]);
    return Collapse;
  }();
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$1, function (event) {
    if (event.target.tagName === 'A') {
      event.preventDefault();
    }
    var triggerData = Manipulator.getDataAttributes(this);
    var selector = getSelectorFromElement(this);
    var selectorElements = SelectorEngine.find(selector);
    selectorElements.forEach(function (element) {
      var data = Data.getData(element, DATA_KEY$3);
      var config;
      if (data) {
        if (data._parent === null && typeof triggerData.parent === 'string') {
          data._config.parent = triggerData.parent;
          data._parent = data._getParent();
        }
        config = 'toggle';
      } else {
        config = triggerData;
      }
      Collapse.collapseInterface(element, config);
    });
  });
  var $$4 = getjQuery();
  if ($$4) {
    var JQUERY_NO_CONFLICT$3 = $$4.fn[NAME$3];
    $$4.fn[NAME$3] = Collapse.jQueryInterface;
    $$4.fn[NAME$3].Constructor = Collapse;
    $$4.fn[NAME$3].noConflict = function () {
      $$4.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
      return Collapse.jQueryInterface;
    };
  }
  var NAME$4 = 'dropdown';
  var VERSION$4 = '5.0.0-alpha2';
  var DATA_KEY$4 = 'bs.dropdown';
  var EVENT_KEY$4 = "." + DATA_KEY$4;
  var DATA_API_KEY$4 = '.data-api';
  var ESCAPE_KEY = 'Escape';
  var SPACE_KEY = 'Space';
  var TAB_KEY = 'Tab';
  var ARROW_UP_KEY = 'ArrowUp';
  var ARROW_DOWN_KEY = 'ArrowDown';
  var RIGHT_MOUSE_BUTTON = 2;
  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEY + "|" + ARROW_DOWN_KEY + "|" + ESCAPE_KEY);
  var EVENT_HIDE$1 = "hide" + EVENT_KEY$4;
  var EVENT_HIDDEN$1 = "hidden" + EVENT_KEY$4;
  var EVENT_SHOW$1 = "show" + EVENT_KEY$4;
  var EVENT_SHOWN$1 = "shown" + EVENT_KEY$4;
  var EVENT_CLICK = "click" + EVENT_KEY$4;
  var EVENT_CLICK_DATA_API$4 = "click" + EVENT_KEY$4 + DATA_API_KEY$4;
  var EVENT_KEYDOWN_DATA_API = "keydown" + EVENT_KEY$4 + DATA_API_KEY$4;
  var EVENT_KEYUP_DATA_API = "keyup" + EVENT_KEY$4 + DATA_API_KEY$4;
  var CLASS_NAME_DISABLED = 'disabled';
  var CLASS_NAME_SHOW$1 = 'show';
  var CLASS_NAME_DROPUP = 'dropup';
  var CLASS_NAME_DROPRIGHT = 'dropright';
  var CLASS_NAME_DROPLEFT = 'dropleft';
  var CLASS_NAME_MENURIGHT = 'dropdown-menu-right';
  var CLASS_NAME_NAVBAR = 'navbar';
  var CLASS_NAME_POSITION_STATIC = 'position-static';
  var SELECTOR_DATA_TOGGLE$2 = '[data-toggle="dropdown"]';
  var SELECTOR_FORM_CHILD = '.dropdown form';
  var SELECTOR_MENU = '.dropdown-menu';
  var SELECTOR_NAVBAR_NAV = '.navbar-nav';
  var SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
  var PLACEMENT_TOP = 'top-start';
  var PLACEMENT_TOPEND = 'top-end';
  var PLACEMENT_BOTTOM = 'bottom-start';
  var PLACEMENT_BOTTOMEND = 'bottom-end';
  var PLACEMENT_RIGHT = 'right-start';
  var PLACEMENT_LEFT = 'left-start';
  var Default$2 = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic',
    popperConfig: null
  };
  var DefaultType$2 = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string',
    popperConfig: '(null|object)'
  };
  var Dropdown = function () {
    function Dropdown(element, config) {
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();
      this._addEventListeners();
      Data.setData(element, DATA_KEY$4, this);
    }
    var _proto = Dropdown.prototype;
    _proto.toggle = function toggle() {
      if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED)) {
        return;
      }
      var isActive = this._element.classList.contains(CLASS_NAME_SHOW$1);
      Dropdown.clearMenus();
      if (isActive) {
        return;
      }
      this.show();
    };
    _proto.show = function show() {
      if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED) || this._menu.classList.contains(CLASS_NAME_SHOW$1)) {
        return;
      }
      var parent = Dropdown.getParentFromElement(this._element);
      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, relatedTarget);
      if (showEvent.defaultPrevented) {
        return;
      }
      if (!this._inNavbar) {
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org)');
        }
        var referenceElement = this._element;
        if (this._config.reference === 'parent') {
          referenceElement = parent;
        } else if (isElement(this._config.reference)) {
          referenceElement = this._config.reference;
          if (typeof this._config.reference.jquery !== 'undefined') {
            referenceElement = this._config.reference[0];
          }
        }
        if (this._config.boundary !== 'scrollParent') {
          parent.classList.add(CLASS_NAME_POSITION_STATIC);
        }
        this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
      }
      if ('ontouchstart' in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
        var _ref;
        (_ref = []).concat.apply(_ref, document.body.children).forEach(function (elem) {
          return EventHandler.on(elem, 'mouseover', null, noop());
        });
      }
      this._element.focus();
      this._element.setAttribute('aria-expanded', true);
      Manipulator.toggleClass(this._menu, CLASS_NAME_SHOW$1);
      Manipulator.toggleClass(this._element, CLASS_NAME_SHOW$1);
      EventHandler.trigger(parent, EVENT_SHOWN$1, relatedTarget);
    };
    _proto.hide = function hide() {
      if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED) || !this._menu.classList.contains(CLASS_NAME_SHOW$1)) {
        return;
      }
      var parent = Dropdown.getParentFromElement(this._element);
      var relatedTarget = {
        relatedTarget: this._element
      };
      var hideEvent = EventHandler.trigger(parent, EVENT_HIDE$1, relatedTarget);
      if (hideEvent.defaultPrevented) {
        return;
      }
      if (this._popper) {
        this._popper.destroy();
      }
      Manipulator.toggleClass(this._menu, CLASS_NAME_SHOW$1);
      Manipulator.toggleClass(this._element, CLASS_NAME_SHOW$1);
      EventHandler.trigger(parent, EVENT_HIDDEN$1, relatedTarget);
    };
    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY$4);
      EventHandler.off(this._element, EVENT_KEY$4);
      this._element = null;
      this._menu = null;
      if (this._popper) {
        this._popper.destroy();
        this._popper = null;
      }
    };
    _proto.update = function update() {
      this._inNavbar = this._detectNavbar();
      if (this._popper) {
        this._popper.scheduleUpdate();
      }
    }
    ;
    _proto._addEventListeners = function _addEventListeners() {
      var _this = this;
      EventHandler.on(this._element, EVENT_CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();
        _this.toggle();
      });
    };
    _proto._getConfig = function _getConfig(config) {
      config = _extends$1({}, this.constructor.Default, Manipulator.getDataAttributes(this._element), config);
      typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
      return config;
    };
    _proto._getMenuElement = function _getMenuElement() {
      return SelectorEngine.next(this._element, SELECTOR_MENU)[0];
    };
    _proto._getPlacement = function _getPlacement() {
      var parentDropdown = this._element.parentNode;
      var placement = PLACEMENT_BOTTOM;
      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
        placement = PLACEMENT_TOP;
        if (this._menu.classList.contains(CLASS_NAME_MENURIGHT)) {
          placement = PLACEMENT_TOPEND;
        }
      } else if (parentDropdown.classList.contains(CLASS_NAME_DROPRIGHT)) {
        placement = PLACEMENT_RIGHT;
      } else if (parentDropdown.classList.contains(CLASS_NAME_DROPLEFT)) {
        placement = PLACEMENT_LEFT;
      } else if (this._menu.classList.contains(CLASS_NAME_MENURIGHT)) {
        placement = PLACEMENT_BOTTOMEND;
      }
      return placement;
    };
    _proto._detectNavbar = function _detectNavbar() {
      return Boolean(this._element.closest("." + CLASS_NAME_NAVBAR));
    };
    _proto._getOffset = function _getOffset() {
      var _this2 = this;
      var offset = {};
      if (typeof this._config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _extends$1({}, data.offsets, _this2._config.offset(data.offsets, _this2._element) || {});
          return data;
        };
      } else {
        offset.offset = this._config.offset;
      }
      return offset;
    };
    _proto._getPopperConfig = function _getPopperConfig() {
      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        }
      };
      if (this._config.display === 'static') {
        popperConfig.modifiers.applyStyle = {
          enabled: false
        };
      }
      return _extends$1({}, popperConfig, this._config.popperConfig);
    }
    ;
    Dropdown.dropdownInterface = function dropdownInterface(element, config) {
      var data = Data.getData(element, DATA_KEY$4);
      var _config = typeof config === 'object' ? config : null;
      if (!data) {
        data = new Dropdown(element, _config);
      }
      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"" + config + "\"");
        }
        data[config]();
      }
    };
    Dropdown.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        Dropdown.dropdownInterface(this, config);
      });
    };
    Dropdown.clearMenus = function clearMenus(event) {
      if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY)) {
        return;
      }
      var toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$2);
      for (var i = 0, len = toggles.length; i < len; i++) {
        var parent = Dropdown.getParentFromElement(toggles[i]);
        var context = Data.getData(toggles[i], DATA_KEY$4);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };
        if (event && event.type === 'click') {
          relatedTarget.clickEvent = event;
        }
        if (!context) {
          continue;
        }
        var dropdownMenu = context._menu;
        if (!toggles[i].classList.contains(CLASS_NAME_SHOW$1)) {
          continue;
        }
        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.key === TAB_KEY) && dropdownMenu.contains(event.target)) {
          continue;
        }
        var hideEvent = EventHandler.trigger(parent, EVENT_HIDE$1, relatedTarget);
        if (hideEvent.defaultPrevented) {
          continue;
        }
        if ('ontouchstart' in document.documentElement) {
          var _ref2;
          (_ref2 = []).concat.apply(_ref2, document.body.children).forEach(function (elem) {
            return EventHandler.off(elem, 'mouseover', null, noop());
          });
        }
        toggles[i].setAttribute('aria-expanded', 'false');
        if (context._popper) {
          context._popper.destroy();
        }
        dropdownMenu.classList.remove(CLASS_NAME_SHOW$1);
        toggles[i].classList.remove(CLASS_NAME_SHOW$1);
        EventHandler.trigger(parent, EVENT_HIDDEN$1, relatedTarget);
      }
    };
    Dropdown.getParentFromElement = function getParentFromElement(element) {
      return getElementFromSelector(element) || element.parentNode;
    };
    Dropdown.dataApiKeydownHandler = function dataApiKeydownHandler(event) {
      if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      if (this.disabled || this.classList.contains(CLASS_NAME_DISABLED)) {
        return;
      }
      var parent = Dropdown.getParentFromElement(this);
      var isActive = this.classList.contains(CLASS_NAME_SHOW$1);
      if (event.key === ESCAPE_KEY) {
        var button = this.matches(SELECTOR_DATA_TOGGLE$2) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$2)[0];
        button.focus();
        Dropdown.clearMenus();
        return;
      }
      if (!isActive || event.key === SPACE_KEY) {
        Dropdown.clearMenus();
        return;
      }
      var items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, parent).filter(isVisible);
      if (!items.length) {
        return;
      }
      var index = items.indexOf(event.target);
      if (event.key === ARROW_UP_KEY && index > 0) {
        index--;
      }
      if (event.key === ARROW_DOWN_KEY && index < items.length - 1) {
        index++;
      }
      index = index === -1 ? 0 : index;
      items[index].focus();
    };
    Dropdown.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$4);
    };
    _createClass(Dropdown, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$4;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$2;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$2;
      }
    }]);
    return Dropdown;
  }();
  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$2, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_CLICK_DATA_API$4, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$2, function (event) {
    event.preventDefault();
    event.stopPropagation();
    Dropdown.dropdownInterface(this, 'toggle');
  });
  EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_FORM_CHILD, function (e) {
    return e.stopPropagation();
  });
  var $$5 = getjQuery();
  if ($$5) {
    var JQUERY_NO_CONFLICT$4 = $$5.fn[NAME$4];
    $$5.fn[NAME$4] = Dropdown.jQueryInterface;
    $$5.fn[NAME$4].Constructor = Dropdown;
    $$5.fn[NAME$4].noConflict = function () {
      $$5.fn[NAME$4] = JQUERY_NO_CONFLICT$4;
      return Dropdown.jQueryInterface;
    };
  }
  var NAME$5 = 'modal';
  var VERSION$5 = '5.0.0-alpha2';
  var DATA_KEY$5 = 'bs.modal';
  var EVENT_KEY$5 = "." + DATA_KEY$5;
  var DATA_API_KEY$5 = '.data-api';
  var ESCAPE_KEY$1 = 'Escape';
  var Default$3 = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };
  var DefaultType$3 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };
  var EVENT_HIDE$2 = "hide" + EVENT_KEY$5;
  var EVENT_HIDE_PREVENTED = "hidePrevented" + EVENT_KEY$5;
  var EVENT_HIDDEN$2 = "hidden" + EVENT_KEY$5;
  var EVENT_SHOW$2 = "show" + EVENT_KEY$5;
  var EVENT_SHOWN$2 = "shown" + EVENT_KEY$5;
  var EVENT_FOCUSIN = "focusin" + EVENT_KEY$5;
  var EVENT_RESIZE = "resize" + EVENT_KEY$5;
  var EVENT_CLICK_DISMISS = "click.dismiss" + EVENT_KEY$5;
  var EVENT_KEYDOWN_DISMISS = "keydown.dismiss" + EVENT_KEY$5;
  var EVENT_MOUSEUP_DISMISS = "mouseup.dismiss" + EVENT_KEY$5;
  var EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss" + EVENT_KEY$5;
  var EVENT_CLICK_DATA_API$5 = "click" + EVENT_KEY$5 + DATA_API_KEY$5;
  var CLASS_NAME_SCROLLBAR_MEASURER = 'modal-scrollbar-measure';
  var CLASS_NAME_BACKDROP = 'modal-backdrop';
  var CLASS_NAME_OPEN = 'modal-open';
  var CLASS_NAME_FADE = 'fade';
  var CLASS_NAME_SHOW$2 = 'show';
  var CLASS_NAME_STATIC = 'modal-static';
  var SELECTOR_DIALOG = '.modal-dialog';
  var SELECTOR_MODAL_BODY = '.modal-body';
  var SELECTOR_DATA_TOGGLE$3 = '[data-toggle="modal"]';
  var SELECTOR_DATA_DISMISS = '[data-dismiss="modal"]';
  var SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
  var SELECTOR_STICKY_CONTENT = '.sticky-top';
  var Modal = function () {
    function Modal(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, element);
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollbarWidth = 0;
      Data.setData(element, DATA_KEY$5, this);
    }
    var _proto = Modal.prototype;
    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };
    _proto.show = function show(relatedTarget) {
      var _this = this;
      if (this._isShown || this._isTransitioning) {
        return;
      }
      if (this._element.classList.contains(CLASS_NAME_FADE)) {
        this._isTransitioning = true;
      }
      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$2, {
        relatedTarget: relatedTarget
      });
      if (this._isShown || showEvent.defaultPrevented) {
        return;
      }
      this._isShown = true;
      this._checkScrollbar();
      this._setScrollbar();
      this._adjustDialog();
      this._setEscapeEvent();
      this._setResizeEvent();
      EventHandler.on(this._element, EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, function (event) {
        return _this.hide(event);
      });
      EventHandler.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, function () {
        EventHandler.one(_this._element, EVENT_MOUSEUP_DISMISS, function (event) {
          if (event.target === _this._element) {
            _this._ignoreBackdropClick = true;
          }
        });
      });
      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    };
    _proto.hide = function hide(event) {
      var _this2 = this;
      if (event) {
        event.preventDefault();
      }
      if (!this._isShown || this._isTransitioning) {
        return;
      }
      var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$2);
      if (hideEvent.defaultPrevented) {
        return;
      }
      this._isShown = false;
      var transition = this._element.classList.contains(CLASS_NAME_FADE);
      if (transition) {
        this._isTransitioning = true;
      }
      this._setEscapeEvent();
      this._setResizeEvent();
      EventHandler.off(document, EVENT_FOCUSIN);
      this._element.classList.remove(CLASS_NAME_SHOW$2);
      EventHandler.off(this._element, EVENT_CLICK_DISMISS);
      EventHandler.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);
      if (transition) {
        var transitionDuration = getTransitionDurationFromElement(this._element);
        EventHandler.one(this._element, TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        });
        emulateTransitionEnd(this._element, transitionDuration);
      } else {
        this._hideModal();
      }
    };
    _proto.dispose = function dispose() {
      [window, this._element, this._dialog].forEach(function (htmlElement) {
        return EventHandler.off(htmlElement, EVENT_KEY$5);
      });
      EventHandler.off(document, EVENT_FOCUSIN);
      Data.removeData(this._element, DATA_KEY$5);
      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._isTransitioning = null;
      this._scrollbarWidth = null;
    };
    _proto.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    }
    ;
    _proto._getConfig = function _getConfig(config) {
      config = _extends$1({}, Default$3, config);
      typeCheckConfig(NAME$5, config, DefaultType$3);
      return config;
    };
    _proto._showElement = function _showElement(relatedTarget) {
      var _this3 = this;
      var transition = this._element.classList.contains(CLASS_NAME_FADE);
      var modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        document.body.appendChild(this._element);
      }
      this._element.style.display = 'block';
      this._element.removeAttribute('aria-hidden');
      this._element.setAttribute('aria-modal', true);
      this._element.setAttribute('role', 'dialog');
      this._element.scrollTop = 0;
      if (modalBody) {
        modalBody.scrollTop = 0;
      }
      if (transition) {
        reflow(this._element);
      }
      this._element.classList.add(CLASS_NAME_SHOW$2);
      if (this._config.focus) {
        this._enforceFocus();
      }
      var transitionComplete = function transitionComplete() {
        if (_this3._config.focus) {
          _this3._element.focus();
        }
        _this3._isTransitioning = false;
        EventHandler.trigger(_this3._element, EVENT_SHOWN$2, {
          relatedTarget: relatedTarget
        });
      };
      if (transition) {
        var transitionDuration = getTransitionDurationFromElement(this._dialog);
        EventHandler.one(this._dialog, TRANSITION_END, transitionComplete);
        emulateTransitionEnd(this._dialog, transitionDuration);
      } else {
        transitionComplete();
      }
    };
    _proto._enforceFocus = function _enforceFocus() {
      var _this4 = this;
      EventHandler.off(document, EVENT_FOCUSIN);
      EventHandler.on(document, EVENT_FOCUSIN, function (event) {
        if (document !== event.target && _this4._element !== event.target && !_this4._element.contains(event.target)) {
          _this4._element.focus();
        }
      });
    };
    _proto._setEscapeEvent = function _setEscapeEvent() {
      var _this5 = this;
      if (this._isShown) {
        EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, function (event) {
          if (_this5._config.keyboard && event.key === ESCAPE_KEY$1) {
            event.preventDefault();
            _this5.hide();
          } else if (!_this5._config.keyboard && event.key === ESCAPE_KEY$1) {
            _this5._triggerBackdropTransition();
          }
        });
      } else {
        EventHandler.off(this._element, EVENT_KEYDOWN_DISMISS);
      }
    };
    _proto._setResizeEvent = function _setResizeEvent() {
      var _this6 = this;
      if (this._isShown) {
        EventHandler.on(window, EVENT_RESIZE, function () {
          return _this6._adjustDialog();
        });
      } else {
        EventHandler.off(window, EVENT_RESIZE);
      }
    };
    _proto._hideModal = function _hideModal() {
      var _this7 = this;
      this._element.style.display = 'none';
      this._element.setAttribute('aria-hidden', true);
      this._element.removeAttribute('aria-modal');
      this._element.removeAttribute('role');
      this._isTransitioning = false;
      this._showBackdrop(function () {
        document.body.classList.remove(CLASS_NAME_OPEN);
        _this7._resetAdjustments();
        _this7._resetScrollbar();
        EventHandler.trigger(_this7._element, EVENT_HIDDEN$2);
      });
    };
    _proto._removeBackdrop = function _removeBackdrop() {
      this._backdrop.parentNode.removeChild(this._backdrop);
      this._backdrop = null;
    };
    _proto._showBackdrop = function _showBackdrop(callback) {
      var _this8 = this;
      var animate = this._element.classList.contains(CLASS_NAME_FADE) ? CLASS_NAME_FADE : '';
      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = CLASS_NAME_BACKDROP;
        if (animate) {
          this._backdrop.classList.add(animate);
        }
        document.body.appendChild(this._backdrop);
        EventHandler.on(this._element, EVENT_CLICK_DISMISS, function (event) {
          if (_this8._ignoreBackdropClick) {
            _this8._ignoreBackdropClick = false;
            return;
          }
          if (event.target !== event.currentTarget) {
            return;
          }
          _this8._triggerBackdropTransition();
        });
        if (animate) {
          reflow(this._backdrop);
        }
        this._backdrop.classList.add(CLASS_NAME_SHOW$2);
        if (!animate) {
          callback();
          return;
        }
        var backdropTransitionDuration = getTransitionDurationFromElement(this._backdrop);
        EventHandler.one(this._backdrop, TRANSITION_END, callback);
        emulateTransitionEnd(this._backdrop, backdropTransitionDuration);
      } else if (!this._isShown && this._backdrop) {
        this._backdrop.classList.remove(CLASS_NAME_SHOW$2);
        var callbackRemove = function callbackRemove() {
          _this8._removeBackdrop();
          callback();
        };
        if (this._element.classList.contains(CLASS_NAME_FADE)) {
          var _backdropTransitionDuration = getTransitionDurationFromElement(this._backdrop);
          EventHandler.one(this._backdrop, TRANSITION_END, callbackRemove);
          emulateTransitionEnd(this._backdrop, _backdropTransitionDuration);
        } else {
          callbackRemove();
        }
      } else {
        callback();
      }
    };
    _proto._triggerBackdropTransition = function _triggerBackdropTransition() {
      var _this9 = this;
      if (this._config.backdrop === 'static') {
        var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
        if (hideEvent.defaultPrevented) {
          return;
        }
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
        if (!isModalOverflowing) {
          this._element.style.overflowY = 'hidden';
        }
        this._element.classList.add(CLASS_NAME_STATIC);
        var modalTransitionDuration = getTransitionDurationFromElement(this._dialog);
        EventHandler.off(this._element, TRANSITION_END);
        EventHandler.one(this._element, TRANSITION_END, function () {
          _this9._element.classList.remove(CLASS_NAME_STATIC);
          if (!isModalOverflowing) {
            EventHandler.one(_this9._element, TRANSITION_END, function () {
              _this9._element.style.overflowY = '';
            });
            emulateTransitionEnd(_this9._element, modalTransitionDuration);
          }
        });
        emulateTransitionEnd(this._element, modalTransitionDuration);
        this._element.focus();
      } else {
        this.hide();
      }
    }
    ;
    _proto._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + "px";
      }
      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + "px";
      }
    };
    _proto._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };
    _proto._checkScrollbar = function _checkScrollbar() {
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = Math.round(rect.left + rect.right) < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };
    _proto._setScrollbar = function _setScrollbar() {
      var _this10 = this;
      if (this._isBodyOverflowing) {
        SelectorEngine.find(SELECTOR_FIXED_CONTENT).forEach(function (element) {
          var actualPadding = element.style.paddingRight;
          var calculatedPadding = window.getComputedStyle(element)['padding-right'];
          Manipulator.setDataAttribute(element, 'padding-right', actualPadding);
          element.style.paddingRight = parseFloat(calculatedPadding) + _this10._scrollbarWidth + "px";
        });
        SelectorEngine.find(SELECTOR_STICKY_CONTENT).forEach(function (element) {
          var actualMargin = element.style.marginRight;
          var calculatedMargin = window.getComputedStyle(element)['margin-right'];
          Manipulator.setDataAttribute(element, 'margin-right', actualMargin);
          element.style.marginRight = parseFloat(calculatedMargin) - _this10._scrollbarWidth + "px";
        });
        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = window.getComputedStyle(document.body)['padding-right'];
        Manipulator.setDataAttribute(document.body, 'padding-right', actualPadding);
        document.body.style.paddingRight = parseFloat(calculatedPadding) + this._scrollbarWidth + "px";
      }
      document.body.classList.add(CLASS_NAME_OPEN);
    };
    _proto._resetScrollbar = function _resetScrollbar() {
      SelectorEngine.find(SELECTOR_FIXED_CONTENT).forEach(function (element) {
        var padding = Manipulator.getDataAttribute(element, 'padding-right');
        if (typeof padding !== 'undefined') {
          Manipulator.removeDataAttribute(element, 'padding-right');
          element.style.paddingRight = padding;
        }
      });
      SelectorEngine.find("" + SELECTOR_STICKY_CONTENT).forEach(function (element) {
        var margin = Manipulator.getDataAttribute(element, 'margin-right');
        if (typeof margin !== 'undefined') {
          Manipulator.removeDataAttribute(element, 'margin-right');
          element.style.marginRight = margin;
        }
      });
      var padding = Manipulator.getDataAttribute(document.body, 'padding-right');
      if (typeof padding === 'undefined') {
        document.body.style.paddingRight = '';
      } else {
        Manipulator.removeDataAttribute(document.body, 'padding-right');
        document.body.style.paddingRight = padding;
      }
    };
    _proto._getScrollbarWidth = function _getScrollbarWidth() {
      var scrollDiv = document.createElement('div');
      scrollDiv.className = CLASS_NAME_SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    }
    ;
    Modal.jQueryInterface = function jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$5);
        var _config = _extends$1({}, Default$3, Manipulator.getDataAttributes(this), typeof config === 'object' && config ? config : {});
        if (!data) {
          data = new Modal(this, _config);
        }
        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }
          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };
    Modal.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$5);
    };
    _createClass(Modal, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$5;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$3;
      }
    }]);
    return Modal;
  }();
  EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_TOGGLE$3, function (event) {
    var _this11 = this;
    var target = getElementFromSelector(this);
    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }
    EventHandler.one(target, EVENT_SHOW$2, function (showEvent) {
      if (showEvent.defaultPrevented) {
        return;
      }
      EventHandler.one(target, EVENT_HIDDEN$2, function () {
        if (isVisible(_this11)) {
          _this11.focus();
        }
      });
    });
    var data = Data.getData(target, DATA_KEY$5);
    if (!data) {
      var config = _extends$1({}, Manipulator.getDataAttributes(target), Manipulator.getDataAttributes(this));
      data = new Modal(target, config);
    }
    data.show(this);
  });
  var $$6 = getjQuery();
  if ($$6) {
    var JQUERY_NO_CONFLICT$5 = $$6.fn[NAME$5];
    $$6.fn[NAME$5] = Modal.jQueryInterface;
    $$6.fn[NAME$5].Constructor = Modal;
    $$6.fn[NAME$5].noConflict = function () {
      $$6.fn[NAME$5] = JQUERY_NO_CONFLICT$5;
      return Modal.jQueryInterface;
    };
  }
  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi;
  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
  var allowedAttribute = function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();
    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
      }
      return true;
    }
    var regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp;
    });
    for (var i = 0, len = regExp.length; i < len; i++) {
      if (attrName.match(regExp[i])) {
        return true;
      }
    }
    return false;
  };
  var DefaultAllowlist = {
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
    var _ref;
    if (!unsafeHtml.length) {
      return unsafeHtml;
    }
    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }
    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var allowlistKeys = Object.keys(allowList);
    var elements = (_ref = []).concat.apply(_ref, createdDocument.body.querySelectorAll('*'));
    var _loop = function _loop(i, len) {
      var _ref2;
      var el = elements[i];
      var elName = el.nodeName.toLowerCase();
      if (allowlistKeys.indexOf(elName) === -1) {
        el.parentNode.removeChild(el);
        return "continue";
      }
      var attributeList = (_ref2 = []).concat.apply(_ref2, el.attributes);
      var allowedAttributes = [].concat(allowList['*'] || [], allowList[elName] || []);
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, allowedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    };
    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret = _loop(i);
      if (_ret === "continue") continue;
    }
    return createdDocument.body.innerHTML;
  }
  var NAME$6 = 'tooltip';
  var VERSION$6 = '5.0.0-alpha2';
  var DATA_KEY$6 = 'bs.tooltip';
  var EVENT_KEY$6 = "." + DATA_KEY$6;
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DISALLOWED_ATTRIBUTES = ['sanitize', 'allowList', 'sanitizeFn'];
  var DefaultType$4 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    allowList: 'object',
    popperConfig: '(null|object)'
  };
  var AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };
  var Default$4 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent',
    sanitize: true,
    sanitizeFn: null,
    allowList: DefaultAllowlist,
    popperConfig: null
  };
  var Event$1 = {
    HIDE: "hide" + EVENT_KEY$6,
    HIDDEN: "hidden" + EVENT_KEY$6,
    SHOW: "show" + EVENT_KEY$6,
    SHOWN: "shown" + EVENT_KEY$6,
    INSERTED: "inserted" + EVENT_KEY$6,
    CLICK: "click" + EVENT_KEY$6,
    FOCUSIN: "focusin" + EVENT_KEY$6,
    FOCUSOUT: "focusout" + EVENT_KEY$6,
    MOUSEENTER: "mouseenter" + EVENT_KEY$6,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$6
  };
  var CLASS_NAME_FADE$1 = 'fade';
  var CLASS_NAME_MODAL = 'modal';
  var CLASS_NAME_SHOW$3 = 'show';
  var HOVER_STATE_SHOW = 'show';
  var HOVER_STATE_OUT = 'out';
  var SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
  var TRIGGER_HOVER = 'hover';
  var TRIGGER_FOCUS = 'focus';
  var TRIGGER_CLICK = 'click';
  var TRIGGER_MANUAL = 'manual';
  var Tooltip = function () {
    function Tooltip(element, config) {
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org)');
      }
      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null;
      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;
      this._setListeners();
      Data.setData(element, this.constructor.DATA_KEY, this);
    }
    var _proto = Tooltip.prototype;
    _proto.enable = function enable() {
      this._isEnabled = true;
    };
    _proto.disable = function disable() {
      this._isEnabled = false;
    };
    _proto.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };
    _proto.toggle = function toggle(event) {
      if (!this._isEnabled) {
        return;
      }
      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = Data.getData(event.delegateTarget, dataKey);
        if (!context) {
          context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
          Data.setData(event.delegateTarget, dataKey, context);
        }
        context._activeTrigger.click = !context._activeTrigger.click;
        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if (this.getTipElement().classList.contains(CLASS_NAME_SHOW$3)) {
          this._leave(null, this);
          return;
        }
        this._enter(null, this);
      }
    };
    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      Data.removeData(this.element, this.constructor.DATA_KEY);
      EventHandler.off(this.element, this.constructor.EVENT_KEY);
      EventHandler.off(this.element.closest("." + CLASS_NAME_MODAL), 'hide.bs.modal', this._hideModalHandler);
      if (this.tip) {
        this.tip.parentNode.removeChild(this.tip);
      }
      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;
      if (this._popper) {
        this._popper.destroy();
      }
      this._popper = null;
      this.element = null;
      this.config = null;
      this.tip = null;
    };
    _proto.show = function show() {
      var _this = this;
      if (this.element.style.display === 'none') {
        throw new Error('Please use show on visible elements');
      }
      if (this.isWithContent() && this._isEnabled) {
        var showEvent = EventHandler.trigger(this.element, this.constructor.Event.SHOW);
        var shadowRoot = findShadowRoot(this.element);
        var isInTheDom = shadowRoot === null ? this.element.ownerDocument.documentElement.contains(this.element) : shadowRoot.contains(this.element);
        if (showEvent.defaultPrevented || !isInTheDom) {
          return;
        }
        var tip = this.getTipElement();
        var tipId = getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);
        this.setContent();
        if (this.config.animation) {
          tip.classList.add(CLASS_NAME_FADE$1);
        }
        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;
        var attachment = this._getAttachment(placement);
        this._addAttachmentClass(attachment);
        var container = this._getContainer();
        Data.setData(tip, this.constructor.DATA_KEY, this);
        if (!this.element.ownerDocument.documentElement.contains(this.tip)) {
          container.appendChild(tip);
        }
        EventHandler.trigger(this.element, this.constructor.Event.INSERTED);
        this._popper = new Popper(this.element, tip, this._getPopperConfig(attachment));
        tip.classList.add(CLASS_NAME_SHOW$3);
        if ('ontouchstart' in document.documentElement) {
          var _ref;
          (_ref = []).concat.apply(_ref, document.body.children).forEach(function (element) {
            EventHandler.on(element, 'mouseover', noop());
          });
        }
        var complete = function complete() {
          if (_this.config.animation) {
            _this._fixTransition();
          }
          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          EventHandler.trigger(_this.element, _this.constructor.Event.SHOWN);
          if (prevHoverState === HOVER_STATE_OUT) {
            _this._leave(null, _this);
          }
        };
        if (this.tip.classList.contains(CLASS_NAME_FADE$1)) {
          var transitionDuration = getTransitionDurationFromElement(this.tip);
          EventHandler.one(this.tip, TRANSITION_END, complete);
          emulateTransitionEnd(this.tip, transitionDuration);
        } else {
          complete();
        }
      }
    };
    _proto.hide = function hide() {
      var _this2 = this;
      if (!this._popper) {
        return;
      }
      var tip = this.getTipElement();
      var complete = function complete() {
        if (_this2._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }
        _this2._cleanTipClass();
        _this2.element.removeAttribute('aria-describedby');
        EventHandler.trigger(_this2.element, _this2.constructor.Event.HIDDEN);
        _this2._popper.destroy();
      };
      var hideEvent = EventHandler.trigger(this.element, this.constructor.Event.HIDE);
      if (hideEvent.defaultPrevented) {
        return;
      }
      tip.classList.remove(CLASS_NAME_SHOW$3);
      if ('ontouchstart' in document.documentElement) {
        var _ref2;
        (_ref2 = []).concat.apply(_ref2, document.body.children).forEach(function (element) {
          return EventHandler.off(element, 'mouseover', noop);
        });
      }
      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;
      if (this.tip.classList.contains(CLASS_NAME_FADE$1)) {
        var transitionDuration = getTransitionDurationFromElement(tip);
        EventHandler.one(tip, TRANSITION_END, complete);
        emulateTransitionEnd(tip, transitionDuration);
      } else {
        complete();
      }
      this._hoverState = '';
    };
    _proto.update = function update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    }
    ;
    _proto.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };
    _proto.getTipElement = function getTipElement() {
      if (this.tip) {
        return this.tip;
      }
      var element = document.createElement('div');
      element.innerHTML = this.config.template;
      this.tip = element.children[0];
      return this.tip;
    };
    _proto.setContent = function setContent() {
      var tip = this.getTipElement();
      this.setElementContent(SelectorEngine.findOne(SELECTOR_TOOLTIP_INNER, tip), this.getTitle());
      tip.classList.remove(CLASS_NAME_FADE$1, CLASS_NAME_SHOW$3);
    };
    _proto.setElementContent = function setElementContent(element, content) {
      if (element === null) {
        return;
      }
      if (typeof content === 'object' && isElement(content)) {
        if (content.jquery) {
          content = content[0];
        }
        if (this.config.html) {
          if (content.parentNode !== element) {
            element.innerHTML = '';
            element.appendChild(content);
          }
        } else {
          element.textContent = content.textContent;
        }
        return;
      }
      if (this.config.html) {
        if (this.config.sanitize) {
          content = sanitizeHtml(content, this.config.allowList, this.config.sanitizeFn);
        }
        element.innerHTML = content;
      } else {
        element.textContent = content;
      }
    };
    _proto.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');
      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }
      return title;
    }
    ;
    _proto._getPopperConfig = function _getPopperConfig(attachment) {
      var _this3 = this;
      var defaultBsConfig = {
        placement: attachment,
        modifiers: {
          offset: this._getOffset(),
          flip: {
            behavior: this.config.fallbackPlacement
          },
          arrow: {
            element: "." + this.constructor.NAME + "-arrow"
          },
          preventOverflow: {
            boundariesElement: this.config.boundary
          }
        },
        onCreate: function onCreate(data) {
          if (data.originalPlacement !== data.placement) {
            _this3._handlePopperPlacementChange(data);
          }
        },
        onUpdate: function onUpdate(data) {
          return _this3._handlePopperPlacementChange(data);
        }
      };
      return _extends$1({}, defaultBsConfig, this.config.popperConfig);
    };
    _proto._addAttachmentClass = function _addAttachmentClass(attachment) {
      this.getTipElement().classList.add(CLASS_PREFIX + "-" + attachment);
    };
    _proto._getOffset = function _getOffset() {
      var _this4 = this;
      var offset = {};
      if (typeof this.config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _extends$1({}, data.offsets, _this4.config.offset(data.offsets, _this4.element) || {});
          return data;
        };
      } else {
        offset.offset = this.config.offset;
      }
      return offset;
    };
    _proto._getContainer = function _getContainer() {
      if (this.config.container === false) {
        return document.body;
      }
      if (isElement(this.config.container)) {
        return this.config.container;
      }
      return SelectorEngine.findOne(this.config.container);
    };
    _proto._getAttachment = function _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    };
    _proto._setListeners = function _setListeners() {
      var _this5 = this;
      var triggers = this.config.trigger.split(' ');
      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          EventHandler.on(_this5.element, _this5.constructor.Event.CLICK, _this5.config.selector, function (event) {
            return _this5.toggle(event);
          });
        } else if (trigger !== TRIGGER_MANUAL) {
          var eventIn = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSEENTER : _this5.constructor.Event.FOCUSIN;
          var eventOut = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSELEAVE : _this5.constructor.Event.FOCUSOUT;
          EventHandler.on(_this5.element, eventIn, _this5.config.selector, function (event) {
            return _this5._enter(event);
          });
          EventHandler.on(_this5.element, eventOut, _this5.config.selector, function (event) {
            return _this5._leave(event);
          });
        }
      });
      this._hideModalHandler = function () {
        if (_this5.element) {
          _this5.hide();
        }
      };
      EventHandler.on(this.element.closest("." + CLASS_NAME_MODAL), 'hide.bs.modal', this._hideModalHandler);
      if (this.config.selector) {
        this.config = _extends$1({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };
    _proto._fixTitle = function _fixTitle() {
      var titleType = typeof this.element.getAttribute('data-original-title');
      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };
    _proto._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || Data.getData(event.delegateTarget, dataKey);
      if (!context) {
        context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
        Data.setData(event.delegateTarget, dataKey, context);
      }
      if (event) {
        context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
      }
      if (context.getTipElement().classList.contains(CLASS_NAME_SHOW$3) || context._hoverState === HOVER_STATE_SHOW) {
        context._hoverState = HOVER_STATE_SHOW;
        return;
      }
      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_SHOW;
      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }
      context._timeout = setTimeout(function () {
        if (context._hoverState === HOVER_STATE_SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };
    _proto._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || Data.getData(event.delegateTarget, dataKey);
      if (!context) {
        context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
        Data.setData(event.delegateTarget, dataKey, context);
      }
      if (event) {
        context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = false;
      }
      if (context._isWithActiveTrigger()) {
        return;
      }
      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_OUT;
      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }
      context._timeout = setTimeout(function () {
        if (context._hoverState === HOVER_STATE_OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };
    _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }
      return false;
    };
    _proto._getConfig = function _getConfig(config) {
      var dataAttributes = Manipulator.getDataAttributes(this.element);
      Object.keys(dataAttributes).forEach(function (dataAttr) {
        if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
          delete dataAttributes[dataAttr];
        }
      });
      if (config && typeof config.container === 'object' && config.container.jquery) {
        config.container = config.container[0];
      }
      config = _extends$1({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {});
      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }
      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }
      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }
      typeCheckConfig(NAME$6, config, this.constructor.DefaultType);
      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
      }
      return config;
    };
    _proto._getDelegateConfig = function _getDelegateConfig() {
      var config = {};
      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }
      return config;
    };
    _proto._cleanTipClass = function _cleanTipClass() {
      var tip = this.getTipElement();
      var tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX);
      if (tabClass !== null && tabClass.length > 0) {
        tabClass.map(function (token) {
          return token.trim();
        }).forEach(function (tClass) {
          return tip.classList.remove(tClass);
        });
      }
    };
    _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
      this.tip = popperData.instance.popper;
      this._cleanTipClass();
      this._addAttachmentClass(this._getAttachment(popperData.placement));
    };
    _proto._fixTransition = function _fixTransition() {
      var tip = this.getTipElement();
      var initConfigAnimation = this.config.animation;
      if (tip.getAttribute('x-placement') !== null) {
        return;
      }
      tip.classList.remove(CLASS_NAME_FADE$1);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    }
    ;
    Tooltip.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$6);
        var _config = typeof config === 'object' && config;
        if (!data && /dispose|hide/.test(config)) {
          return;
        }
        if (!data) {
          data = new Tooltip(this, _config);
        }
        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }
          data[config]();
        }
      });
    };
    Tooltip.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$6);
    };
    _createClass(Tooltip, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$6;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$4;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$6;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$6;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$1;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$6;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$4;
      }
    }]);
    return Tooltip;
  }();
  var $$7 = getjQuery();
  if ($$7) {
    var JQUERY_NO_CONFLICT$6 = $$7.fn[NAME$6];
    $$7.fn[NAME$6] = Tooltip.jQueryInterface;
    $$7.fn[NAME$6].Constructor = Tooltip;
    $$7.fn[NAME$6].noConflict = function () {
      $$7.fn[NAME$6] = JQUERY_NO_CONFLICT$6;
      return Tooltip.jQueryInterface;
    };
  }
  var NAME$7 = 'popover';
  var VERSION$7 = '5.0.0-alpha2';
  var DATA_KEY$7 = 'bs.popover';
  var EVENT_KEY$7 = "." + DATA_KEY$7;
  var CLASS_PREFIX$1 = 'bs-popover';
  var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');
  var Default$5 = _extends$1({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });
  var DefaultType$5 = _extends$1({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });
  var Event$2 = {
    HIDE: "hide" + EVENT_KEY$7,
    HIDDEN: "hidden" + EVENT_KEY$7,
    SHOW: "show" + EVENT_KEY$7,
    SHOWN: "shown" + EVENT_KEY$7,
    INSERTED: "inserted" + EVENT_KEY$7,
    CLICK: "click" + EVENT_KEY$7,
    FOCUSIN: "focusin" + EVENT_KEY$7,
    FOCUSOUT: "focusout" + EVENT_KEY$7,
    MOUSEENTER: "mouseenter" + EVENT_KEY$7,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$7
  };
  var CLASS_NAME_FADE$2 = 'fade';
  var CLASS_NAME_SHOW$4 = 'show';
  var SELECTOR_TITLE = '.popover-header';
  var SELECTOR_CONTENT = '.popover-body';
  var Popover = function (_Tooltip) {
    _inheritsLoose(Popover, _Tooltip);
    function Popover() {
      return _Tooltip.apply(this, arguments) || this;
    }
    var _proto = Popover.prototype;
    _proto.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };
    _proto.setContent = function setContent() {
      var tip = this.getTipElement();
      this.setElementContent(SelectorEngine.findOne(SELECTOR_TITLE, tip), this.getTitle());
      var content = this._getContent();
      if (typeof content === 'function') {
        content = content.call(this.element);
      }
      this.setElementContent(SelectorEngine.findOne(SELECTOR_CONTENT, tip), content);
      tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$4);
    }
    ;
    _proto._addAttachmentClass = function _addAttachmentClass(attachment) {
      this.getTipElement().classList.add(CLASS_PREFIX$1 + "-" + attachment);
    };
    _proto._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || this.config.content;
    };
    _proto._cleanTipClass = function _cleanTipClass() {
      var tip = this.getTipElement();
      var tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX$1);
      if (tabClass !== null && tabClass.length > 0) {
        tabClass.map(function (token) {
          return token.trim();
        }).forEach(function (tClass) {
          return tip.classList.remove(tClass);
        });
      }
    }
    ;
    Popover.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$7);
        var _config = typeof config === 'object' ? config : null;
        if (!data && /dispose|hide/.test(config)) {
          return;
        }
        if (!data) {
          data = new Popover(this, _config);
          Data.setData(this, DATA_KEY$7, data);
        }
        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }
          data[config]();
        }
      });
    };
    Popover.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$7);
    };
    _createClass(Popover, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$5;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$7;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$7;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$2;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$7;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$5;
      }
    }]);
    return Popover;
  }(Tooltip);
  var $$8 = getjQuery();
  if ($$8) {
    var JQUERY_NO_CONFLICT$7 = $$8.fn[NAME$7];
    $$8.fn[NAME$7] = Popover.jQueryInterface;
    $$8.fn[NAME$7].Constructor = Popover;
    $$8.fn[NAME$7].noConflict = function () {
      $$8.fn[NAME$7] = JQUERY_NO_CONFLICT$7;
      return Popover.jQueryInterface;
    };
  }
  var NAME$8 = 'scrollspy';
  var VERSION$8 = '5.0.0-alpha2';
  var DATA_KEY$8 = 'bs.scrollspy';
  var EVENT_KEY$8 = "." + DATA_KEY$8;
  var DATA_API_KEY$6 = '.data-api';
  var Default$6 = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType$6 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  var EVENT_ACTIVATE = "activate" + EVENT_KEY$8;
  var EVENT_SCROLL = "scroll" + EVENT_KEY$8;
  var EVENT_LOAD_DATA_API$1 = "load" + EVENT_KEY$8 + DATA_API_KEY$6;
  var CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  var CLASS_NAME_ACTIVE$2 = 'active';
  var SELECTOR_DATA_SPY = '[data-spy="scroll"]';
  var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  var SELECTOR_NAV_LINKS = '.nav-link';
  var SELECTOR_NAV_ITEMS = '.nav-item';
  var SELECTOR_LIST_ITEMS = '.list-group-item';
  var SELECTOR_DROPDOWN = '.dropdown';
  var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  var METHOD_OFFSET = 'offset';
  var METHOD_POSITION = 'position';
  var ScrollSpy = function () {
    function ScrollSpy(element, config) {
      var _this = this;
      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + " " + SELECTOR_NAV_LINKS + ", " + this._config.target + " " + SELECTOR_LIST_ITEMS + ", " + this._config.target + " ." + CLASS_NAME_DROPDOWN_ITEM;
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      EventHandler.on(this._scrollElement, EVENT_SCROLL, function (event) {
        return _this._process(event);
      });
      this.refresh();
      this._process();
      Data.setData(element, DATA_KEY$8, this);
    }
    var _proto = ScrollSpy.prototype;
    _proto.refresh = function refresh() {
      var _this2 = this;
      var autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = SelectorEngine.find(this._selector);
      targets.map(function (element) {
        var targetSelector = getSelectorFromElement(element);
        var target = targetSelector ? SelectorEngine.findOne(targetSelector) : null;
        if (target) {
          var targetBCR = target.getBoundingClientRect();
          if (targetBCR.width || targetBCR.height) {
            return [Manipulator[offsetMethod](target).top + offsetBase, targetSelector];
          }
        }
        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this2._offsets.push(item[0]);
        _this2._targets.push(item[1]);
      });
    };
    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY$8);
      EventHandler.off(this._scrollElement, EVENT_KEY$8);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    }
    ;
    _proto._getConfig = function _getConfig(config) {
      config = _extends$1({}, Default$6, typeof config === 'object' && config ? config : {});
      if (typeof config.target !== 'string' && isElement(config.target)) {
        var id = config.target.id;
        if (!id) {
          id = getUID(NAME$8);
          config.target.id = id;
        }
        config.target = "#" + id;
      }
      typeCheckConfig(NAME$8, config, DefaultType$6);
      return config;
    };
    _proto._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };
    _proto._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };
    _proto._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    };
    _proto._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;
      var scrollHeight = this._getScrollHeight();
      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();
      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }
      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];
        if (this._activeTarget !== target) {
          this._activate(target);
        }
        return;
      }
      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;
        this._clear();
        return;
      }
      for (var i = this._offsets.length; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);
        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };
    _proto._activate = function _activate(target) {
      this._activeTarget = target;
      this._clear();
      var queries = this._selector.split(',').map(function (selector) {
        return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
      });
      var link = SelectorEngine.findOne(queries.join(','));
      if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
        SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE, link.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$2);
        link.classList.add(CLASS_NAME_ACTIVE$2);
      } else {
        link.classList.add(CLASS_NAME_ACTIVE$2);
        SelectorEngine.parents(link, SELECTOR_NAV_LIST_GROUP).forEach(function (listGroup) {
          SelectorEngine.prev(listGroup, SELECTOR_NAV_LINKS + ", " + SELECTOR_LIST_ITEMS).forEach(function (item) {
            return item.classList.add(CLASS_NAME_ACTIVE$2);
          });
          SelectorEngine.prev(listGroup, SELECTOR_NAV_ITEMS).forEach(function (navItem) {
            SelectorEngine.children(navItem, SELECTOR_NAV_LINKS).forEach(function (item) {
              return item.classList.add(CLASS_NAME_ACTIVE$2);
            });
          });
        });
      }
      EventHandler.trigger(this._scrollElement, EVENT_ACTIVATE, {
        relatedTarget: target
      });
    };
    _proto._clear = function _clear() {
      SelectorEngine.find(this._selector).filter(function (node) {
        return node.classList.contains(CLASS_NAME_ACTIVE$2);
      }).forEach(function (node) {
        return node.classList.remove(CLASS_NAME_ACTIVE$2);
      });
    }
    ;
    ScrollSpy.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$8);
        var _config = typeof config === 'object' && config;
        if (!data) {
          data = new ScrollSpy(this, _config);
        }
        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }
          data[config]();
        }
      });
    };
    ScrollSpy.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$8);
    };
    _createClass(ScrollSpy, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$8;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$6;
      }
    }]);
    return ScrollSpy;
  }();
  EventHandler.on(window, EVENT_LOAD_DATA_API$1, function () {
    SelectorEngine.find(SELECTOR_DATA_SPY).forEach(function (spy) {
      return new ScrollSpy(spy, Manipulator.getDataAttributes(spy));
    });
  });
  var $$9 = getjQuery();
  if ($$9) {
    var JQUERY_NO_CONFLICT$8 = $$9.fn[NAME$8];
    $$9.fn[NAME$8] = ScrollSpy.jQueryInterface;
    $$9.fn[NAME$8].Constructor = ScrollSpy;
    $$9.fn[NAME$8].noConflict = function () {
      $$9.fn[NAME$8] = JQUERY_NO_CONFLICT$8;
      return ScrollSpy.jQueryInterface;
    };
  }
  var NAME$9 = 'tab';
  var VERSION$9 = '5.0.0-alpha2';
  var DATA_KEY$9 = 'bs.tab';
  var EVENT_KEY$9 = "." + DATA_KEY$9;
  var DATA_API_KEY$7 = '.data-api';
  var EVENT_HIDE$3 = "hide" + EVENT_KEY$9;
  var EVENT_HIDDEN$3 = "hidden" + EVENT_KEY$9;
  var EVENT_SHOW$3 = "show" + EVENT_KEY$9;
  var EVENT_SHOWN$3 = "shown" + EVENT_KEY$9;
  var EVENT_CLICK_DATA_API$6 = "click" + EVENT_KEY$9 + DATA_API_KEY$7;
  var CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
  var CLASS_NAME_ACTIVE$3 = 'active';
  var CLASS_NAME_DISABLED$1 = 'disabled';
  var CLASS_NAME_FADE$3 = 'fade';
  var CLASS_NAME_SHOW$5 = 'show';
  var SELECTOR_DROPDOWN$1 = '.dropdown';
  var SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
  var SELECTOR_ACTIVE$1 = '.active';
  var SELECTOR_ACTIVE_UL = ':scope > li > .active';
  var SELECTOR_DATA_TOGGLE$4 = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]';
  var SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
  var SELECTOR_DROPDOWN_ACTIVE_CHILD = ':scope > .dropdown-menu .active';
  var Tab = function () {
    function Tab(element) {
      this._element = element;
      Data.setData(this._element, DATA_KEY$9, this);
    }
    var _proto = Tab.prototype;
    _proto.show = function show() {
      var _this = this;
      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE$3) || this._element.classList.contains(CLASS_NAME_DISABLED$1)) {
        return;
      }
      var previous;
      var target = getElementFromSelector(this._element);
      var listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP$1);
      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE$1;
        previous = SelectorEngine.find(itemSelector, listElement);
        previous = previous[previous.length - 1];
      }
      var hideEvent = null;
      if (previous) {
        hideEvent = EventHandler.trigger(previous, EVENT_HIDE$3, {
          relatedTarget: this._element
        });
      }
      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
        relatedTarget: previous
      });
      if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
        return;
      }
      this._activate(this._element, listElement);
      var complete = function complete() {
        EventHandler.trigger(previous, EVENT_HIDDEN$3, {
          relatedTarget: _this._element
        });
        EventHandler.trigger(_this._element, EVENT_SHOWN$3, {
          relatedTarget: previous
        });
      };
      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };
    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY$9);
      this._element = null;
    }
    ;
    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;
      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? SelectorEngine.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine.children(container, SELECTOR_ACTIVE$1);
      var active = activeElements[0];
      var isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE$3);
      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      };
      if (active && isTransitioning) {
        var transitionDuration = getTransitionDurationFromElement(active);
        active.classList.remove(CLASS_NAME_SHOW$5);
        EventHandler.one(active, TRANSITION_END, complete);
        emulateTransitionEnd(active, transitionDuration);
      } else {
        complete();
      }
    };
    _proto._transitionComplete = function _transitionComplete(element, active, callback) {
      if (active) {
        active.classList.remove(CLASS_NAME_ACTIVE$3);
        var dropdownChild = SelectorEngine.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);
        if (dropdownChild) {
          dropdownChild.classList.remove(CLASS_NAME_ACTIVE$3);
        }
        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }
      element.classList.add(CLASS_NAME_ACTIVE$3);
      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }
      reflow(element);
      if (element.classList.contains(CLASS_NAME_FADE$3)) {
        element.classList.add(CLASS_NAME_SHOW$5);
      }
      if (element.parentNode && element.parentNode.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
        var dropdownElement = element.closest(SELECTOR_DROPDOWN$1);
        if (dropdownElement) {
          SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE$1).forEach(function (dropdown) {
            return dropdown.classList.add(CLASS_NAME_ACTIVE$3);
          });
        }
        element.setAttribute('aria-expanded', true);
      }
      if (callback) {
        callback();
      }
    }
    ;
    Tab.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$9) || new Tab(this);
        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }
          data[config]();
        }
      });
    };
    Tab.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$9);
    };
    _createClass(Tab, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$9;
      }
    }]);
    return Tab;
  }();
  EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$4, function (event) {
    event.preventDefault();
    var data = Data.getData(this, DATA_KEY$9) || new Tab(this);
    data.show();
  });
  var $$a = getjQuery();
  if ($$a) {
    var JQUERY_NO_CONFLICT$9 = $$a.fn[NAME$9];
    $$a.fn[NAME$9] = Tab.jQueryInterface;
    $$a.fn[NAME$9].Constructor = Tab;
    $$a.fn[NAME$9].noConflict = function () {
      $$a.fn[NAME$9] = JQUERY_NO_CONFLICT$9;
      return Tab.jQueryInterface;
    };
  }
  var NAME$a = 'toast';
  var VERSION$a = '5.0.0-alpha2';
  var DATA_KEY$a = 'bs.toast';
  var EVENT_KEY$a = "." + DATA_KEY$a;
  var EVENT_CLICK_DISMISS$1 = "click.dismiss" + EVENT_KEY$a;
  var EVENT_HIDE$4 = "hide" + EVENT_KEY$a;
  var EVENT_HIDDEN$4 = "hidden" + EVENT_KEY$a;
  var EVENT_SHOW$4 = "show" + EVENT_KEY$a;
  var EVENT_SHOWN$4 = "shown" + EVENT_KEY$a;
  var CLASS_NAME_FADE$4 = 'fade';
  var CLASS_NAME_HIDE = 'hide';
  var CLASS_NAME_SHOW$6 = 'show';
  var CLASS_NAME_SHOWING = 'showing';
  var DefaultType$7 = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  var Default$7 = {
    animation: true,
    autohide: true,
    delay: 5000
  };
  var SELECTOR_DATA_DISMISS$1 = '[data-dismiss="toast"]';
  var Toast = function () {
    function Toast(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
      this._timeout = null;
      this._setListeners();
      Data.setData(element, DATA_KEY$a, this);
    }
    var _proto = Toast.prototype;
    _proto.show = function show() {
      var _this = this;
      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4);
      if (showEvent.defaultPrevented) {
        return;
      }
      this._clearTimeout();
      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE$4);
      }
      var complete = function complete() {
        _this._element.classList.remove(CLASS_NAME_SHOWING);
        _this._element.classList.add(CLASS_NAME_SHOW$6);
        EventHandler.trigger(_this._element, EVENT_SHOWN$4);
        if (_this._config.autohide) {
          _this._timeout = setTimeout(function () {
            _this.hide();
          }, _this._config.delay);
        }
      };
      this._element.classList.remove(CLASS_NAME_HIDE);
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_SHOWING);
      if (this._config.animation) {
        var transitionDuration = getTransitionDurationFromElement(this._element);
        EventHandler.one(this._element, TRANSITION_END, complete);
        emulateTransitionEnd(this._element, transitionDuration);
      } else {
        complete();
      }
    };
    _proto.hide = function hide() {
      var _this2 = this;
      if (!this._element.classList.contains(CLASS_NAME_SHOW$6)) {
        return;
      }
      var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);
      if (hideEvent.defaultPrevented) {
        return;
      }
      var complete = function complete() {
        _this2._element.classList.add(CLASS_NAME_HIDE);
        EventHandler.trigger(_this2._element, EVENT_HIDDEN$4);
      };
      this._element.classList.remove(CLASS_NAME_SHOW$6);
      if (this._config.animation) {
        var transitionDuration = getTransitionDurationFromElement(this._element);
        EventHandler.one(this._element, TRANSITION_END, complete);
        emulateTransitionEnd(this._element, transitionDuration);
      } else {
        complete();
      }
    };
    _proto.dispose = function dispose() {
      this._clearTimeout();
      if (this._element.classList.contains(CLASS_NAME_SHOW$6)) {
        this._element.classList.remove(CLASS_NAME_SHOW$6);
      }
      EventHandler.off(this._element, EVENT_CLICK_DISMISS$1);
      Data.removeData(this._element, DATA_KEY$a);
      this._element = null;
      this._config = null;
    }
    ;
    _proto._getConfig = function _getConfig(config) {
      config = _extends$1({}, Default$7, Manipulator.getDataAttributes(this._element), typeof config === 'object' && config ? config : {});
      typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
      return config;
    };
    _proto._setListeners = function _setListeners() {
      var _this3 = this;
      EventHandler.on(this._element, EVENT_CLICK_DISMISS$1, SELECTOR_DATA_DISMISS$1, function () {
        return _this3.hide();
      });
    };
    _proto._clearTimeout = function _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
    ;
    Toast.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$a);
        var _config = typeof config === 'object' && config;
        if (!data) {
          data = new Toast(this, _config);
        }
        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }
          data[config](this);
        }
      });
    };
    Toast.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$a);
    };
    _createClass(Toast, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$a;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$7;
      }
    }]);
    return Toast;
  }();
  var $$b = getjQuery();
  if ($$b) {
    var JQUERY_NO_CONFLICT$a = $$b.fn[NAME$a];
    $$b.fn[NAME$a] = Toast.jQueryInterface;
    $$b.fn[NAME$a].Constructor = Toast;
    $$b.fn[NAME$a].noConflict = function () {
      $$b.fn[NAME$a] = JQUERY_NO_CONFLICT$a;
      return Toast.jQueryInterface;
    };
  }

  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    var options = {
      delay: {
        show: 50,
        hide: 50
      },
      html: true,
      placement: 'auto'
    };
    return new bootstrap.Tooltip(tooltipTriggerEl, options);
  });
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'));
  popoverTriggerList.map(function (popoverTriggerEl) {
    var options = {
      delay: {
        show: 50,
        hide: 50
      },
      html: true,
      placement: 'auto'
    };
    return new bootstrap.Popover(popoverTriggerEl, options);
  });

})));
