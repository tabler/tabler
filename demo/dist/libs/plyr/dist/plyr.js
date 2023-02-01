typeof navigator === "object" && (function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define('Plyr', factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Plyr = factory());
})(this, (function () { 'use strict';

  function _defineProperty$1(obj, key, value) {
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
  }

  function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }
  function _createClass(e, t, n) {
    return t && _defineProperties(e.prototype, t), n && _defineProperties(e, n), e;
  }
  function _defineProperty(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }
  function ownKeys(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t && (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, r);
    }
    return n;
  }
  function _objectSpread2(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? ownKeys(Object(n), !0).forEach(function (t) {
        _defineProperty(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ownKeys(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }
    return e;
  }
  var defaults$1 = {
    addCSS: !0,
    thumbWidth: 15,
    watch: !0
  };
  function matches$1(e, t) {
    return function () {
      return Array.from(document.querySelectorAll(t)).includes(this);
    }.call(e, t);
  }
  function trigger(e, t) {
    if (e && t) {
      var n = new Event(t, {
        bubbles: !0
      });
      e.dispatchEvent(n);
    }
  }
  var getConstructor$1 = function (e) {
      return null != e ? e.constructor : null;
    },
    instanceOf$1 = function (e, t) {
      return !!(e && t && e instanceof t);
    },
    isNullOrUndefined$1 = function (e) {
      return null == e;
    },
    isObject$1 = function (e) {
      return getConstructor$1(e) === Object;
    },
    isNumber$1 = function (e) {
      return getConstructor$1(e) === Number && !Number.isNaN(e);
    },
    isString$1 = function (e) {
      return getConstructor$1(e) === String;
    },
    isBoolean$1 = function (e) {
      return getConstructor$1(e) === Boolean;
    },
    isFunction$1 = function (e) {
      return getConstructor$1(e) === Function;
    },
    isArray$1 = function (e) {
      return Array.isArray(e);
    },
    isNodeList$1 = function (e) {
      return instanceOf$1(e, NodeList);
    },
    isElement$1 = function (e) {
      return instanceOf$1(e, Element);
    },
    isEvent$1 = function (e) {
      return instanceOf$1(e, Event);
    },
    isEmpty$1 = function (e) {
      return isNullOrUndefined$1(e) || (isString$1(e) || isArray$1(e) || isNodeList$1(e)) && !e.length || isObject$1(e) && !Object.keys(e).length;
    },
    is$1 = {
      nullOrUndefined: isNullOrUndefined$1,
      object: isObject$1,
      number: isNumber$1,
      string: isString$1,
      boolean: isBoolean$1,
      function: isFunction$1,
      array: isArray$1,
      nodeList: isNodeList$1,
      element: isElement$1,
      event: isEvent$1,
      empty: isEmpty$1
    };
  function getDecimalPlaces(e) {
    var t = "".concat(e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0;
  }
  function round(e, t) {
    if (1 > t) {
      var n = getDecimalPlaces(t);
      return parseFloat(e.toFixed(n));
    }
    return Math.round(e / t) * t;
  }
  var RangeTouch = function () {
    function e(t, n) {
      _classCallCheck(this, e), is$1.element(t) ? this.element = t : is$1.string(t) && (this.element = document.querySelector(t)), is$1.element(this.element) && is$1.empty(this.element.rangeTouch) && (this.config = _objectSpread2({}, defaults$1, {}, n), this.init());
    }
    return _createClass(e, [{
      key: "init",
      value: function () {
        e.enabled && (this.config.addCSS && (this.element.style.userSelect = "none", this.element.style.webKitUserSelect = "none", this.element.style.touchAction = "manipulation"), this.listeners(!0), this.element.rangeTouch = this);
      }
    }, {
      key: "destroy",
      value: function () {
        e.enabled && (this.config.addCSS && (this.element.style.userSelect = "", this.element.style.webKitUserSelect = "", this.element.style.touchAction = ""), this.listeners(!1), this.element.rangeTouch = null);
      }
    }, {
      key: "listeners",
      value: function (e) {
        var t = this,
          n = e ? "addEventListener" : "removeEventListener";
        ["touchstart", "touchmove", "touchend"].forEach(function (e) {
          t.element[n](e, function (e) {
            return t.set(e);
          }, !1);
        });
      }
    }, {
      key: "get",
      value: function (t) {
        if (!e.enabled || !is$1.event(t)) return null;
        var n,
          r = t.target,
          i = t.changedTouches[0],
          o = parseFloat(r.getAttribute("min")) || 0,
          s = parseFloat(r.getAttribute("max")) || 100,
          u = parseFloat(r.getAttribute("step")) || 1,
          c = r.getBoundingClientRect(),
          a = 100 / c.width * (this.config.thumbWidth / 2) / 100;
        return 0 > (n = 100 / c.width * (i.clientX - c.left)) ? n = 0 : 100 < n && (n = 100), 50 > n ? n -= (100 - 2 * n) * a : 50 < n && (n += 2 * (n - 50) * a), o + round(n / 100 * (s - o), u);
      }
    }, {
      key: "set",
      value: function (t) {
        e.enabled && is$1.event(t) && !t.target.disabled && (t.preventDefault(), t.target.value = this.get(t), trigger(t.target, "touchend" === t.type ? "change" : "input"));
      }
    }], [{
      key: "setup",
      value: function (t) {
        var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
          r = null;
        if (is$1.empty(t) || is$1.string(t) ? r = Array.from(document.querySelectorAll(is$1.string(t) ? t : 'input[type="range"]')) : is$1.element(t) ? r = [t] : is$1.nodeList(t) ? r = Array.from(t) : is$1.array(t) && (r = t.filter(is$1.element)), is$1.empty(r)) return null;
        var i = _objectSpread2({}, defaults$1, {}, n);
        if (is$1.string(t) && i.watch) {
          var o = new MutationObserver(function (n) {
            Array.from(n).forEach(function (n) {
              Array.from(n.addedNodes).forEach(function (n) {
                is$1.element(n) && matches$1(n, t) && new e(n, i);
              });
            });
          });
          o.observe(document.body, {
            childList: !0,
            subtree: !0
          });
        }
        return r.map(function (t) {
          return new e(t, n);
        });
      }
    }, {
      key: "enabled",
      get: function () {
        return "ontouchstart" in document.documentElement;
      }
    }]), e;
  }();

  // ==========================================================================
  // Type checking utils
  // ==========================================================================

  const getConstructor = input => input !== null && typeof input !== 'undefined' ? input.constructor : null;
  const instanceOf = (input, constructor) => Boolean(input && constructor && input instanceof constructor);
  const isNullOrUndefined = input => input === null || typeof input === 'undefined';
  const isObject = input => getConstructor(input) === Object;
  const isNumber = input => getConstructor(input) === Number && !Number.isNaN(input);
  const isString = input => getConstructor(input) === String;
  const isBoolean = input => getConstructor(input) === Boolean;
  const isFunction = input => typeof input === 'function';
  const isArray = input => Array.isArray(input);
  const isWeakMap = input => instanceOf(input, WeakMap);
  const isNodeList = input => instanceOf(input, NodeList);
  const isTextNode = input => getConstructor(input) === Text;
  const isEvent = input => instanceOf(input, Event);
  const isKeyboardEvent = input => instanceOf(input, KeyboardEvent);
  const isCue = input => instanceOf(input, window.TextTrackCue) || instanceOf(input, window.VTTCue);
  const isTrack = input => instanceOf(input, TextTrack) || !isNullOrUndefined(input) && isString(input.kind);
  const isPromise = input => instanceOf(input, Promise) && isFunction(input.then);
  const isElement = input => input !== null && typeof input === 'object' && input.nodeType === 1 && typeof input.style === 'object' && typeof input.ownerDocument === 'object';
  const isEmpty = input => isNullOrUndefined(input) || (isString(input) || isArray(input) || isNodeList(input)) && !input.length || isObject(input) && !Object.keys(input).length;
  const isUrl = input => {
    // Accept a URL object
    if (instanceOf(input, window.URL)) {
      return true;
    }

    // Must be string from here
    if (!isString(input)) {
      return false;
    }

    // Add the protocol if required
    let string = input;
    if (!input.startsWith('http://') || !input.startsWith('https://')) {
      string = `http://${input}`;
    }
    try {
      return !isEmpty(new URL(string).hostname);
    } catch (_) {
      return false;
    }
  };
  var is = {
    nullOrUndefined: isNullOrUndefined,
    object: isObject,
    number: isNumber,
    string: isString,
    boolean: isBoolean,
    function: isFunction,
    array: isArray,
    weakMap: isWeakMap,
    nodeList: isNodeList,
    element: isElement,
    textNode: isTextNode,
    event: isEvent,
    keyboardEvent: isKeyboardEvent,
    cue: isCue,
    track: isTrack,
    promise: isPromise,
    url: isUrl,
    empty: isEmpty
  };

  // ==========================================================================
  const transitionEndEvent = (() => {
    const element = document.createElement('span');
    const events = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend'
    };
    const type = Object.keys(events).find(event => element.style[event] !== undefined);
    return is.string(type) ? events[type] : false;
  })();

  // Force repaint of element
  function repaint(element, delay) {
    setTimeout(() => {
      try {
        // eslint-disable-next-line no-param-reassign
        element.hidden = true;

        // eslint-disable-next-line no-unused-expressions
        element.offsetHeight;

        // eslint-disable-next-line no-param-reassign
        element.hidden = false;
      } catch (_) {
        // Do nothing
      }
    }, delay);
  }

  // ==========================================================================
  // Browser sniffing
  // Unfortunately, due to mixed support, UA sniffing is required
  // ==========================================================================

  const browser = {
    isIE: Boolean(window.document.documentMode),
    isEdge: /Edge/g.test(navigator.userAgent),
    isWebkit: 'WebkitAppearance' in document.documentElement.style && !/Edge/g.test(navigator.userAgent),
    isIPhone: /iPhone|iPod/gi.test(navigator.userAgent) && navigator.maxTouchPoints > 1,
    isIos: /iPad|iPhone|iPod/gi.test(navigator.userAgent) && navigator.maxTouchPoints > 1
  };

  // ==========================================================================

  // Clone nested objects
  function cloneDeep(object) {
    return JSON.parse(JSON.stringify(object));
  }

  // Get a nested value in an object
  function getDeep(object, path) {
    return path.split('.').reduce((obj, key) => obj && obj[key], object);
  }

  // Deep extend destination object with N more objects
  function extend(target = {}, ...sources) {
    if (!sources.length) {
      return target;
    }
    const source = sources.shift();
    if (!is.object(source)) {
      return target;
    }
    Object.keys(source).forEach(key => {
      if (is.object(source[key])) {
        if (!Object.keys(target).includes(key)) {
          Object.assign(target, {
            [key]: {}
          });
        }
        extend(target[key], source[key]);
      } else {
        Object.assign(target, {
          [key]: source[key]
        });
      }
    });
    return extend(target, ...sources);
  }

  // ==========================================================================

  // Wrap an element
  function wrap(elements, wrapper) {
    // Convert `elements` to an array, if necessary.
    const targets = elements.length ? elements : [elements];

    // Loops backwards to prevent having to clone the wrapper on the
    // first element (see `child` below).
    Array.from(targets).reverse().forEach((element, index) => {
      const child = index > 0 ? wrapper.cloneNode(true) : wrapper;
      // Cache the current parent and sibling.
      const parent = element.parentNode;
      const sibling = element.nextSibling;

      // Wrap the element (is automatically removed from its current
      // parent).
      child.appendChild(element);

      // If the element had a sibling, insert the wrapper before
      // the sibling to maintain the HTML structure; otherwise, just
      // append it to the parent.
      if (sibling) {
        parent.insertBefore(child, sibling);
      } else {
        parent.appendChild(child);
      }
    });
  }

  // Set attributes
  function setAttributes(element, attributes) {
    if (!is.element(element) || is.empty(attributes)) {
      return;
    }

    // Assume null and undefined attributes should be left out,
    // Setting them would otherwise convert them to "null" and "undefined"
    Object.entries(attributes).filter(([, value]) => !is.nullOrUndefined(value)).forEach(([key, value]) => element.setAttribute(key, value));
  }

  // Create a DocumentFragment
  function createElement(type, attributes, text) {
    // Create a new <element>
    const element = document.createElement(type);

    // Set all passed attributes
    if (is.object(attributes)) {
      setAttributes(element, attributes);
    }

    // Add text node
    if (is.string(text)) {
      element.innerText = text;
    }

    // Return built element
    return element;
  }

  // Inaert an element after another
  function insertAfter(element, target) {
    if (!is.element(element) || !is.element(target)) {
      return;
    }
    target.parentNode.insertBefore(element, target.nextSibling);
  }

  // Insert a DocumentFragment
  function insertElement(type, parent, attributes, text) {
    if (!is.element(parent)) {
      return;
    }
    parent.appendChild(createElement(type, attributes, text));
  }

  // Remove element(s)
  function removeElement(element) {
    if (is.nodeList(element) || is.array(element)) {
      Array.from(element).forEach(removeElement);
      return;
    }
    if (!is.element(element) || !is.element(element.parentNode)) {
      return;
    }
    element.parentNode.removeChild(element);
  }

  // Remove all child elements
  function emptyElement(element) {
    if (!is.element(element)) {
      return;
    }
    let {
      length
    } = element.childNodes;
    while (length > 0) {
      element.removeChild(element.lastChild);
      length -= 1;
    }
  }

  // Replace element
  function replaceElement(newChild, oldChild) {
    if (!is.element(oldChild) || !is.element(oldChild.parentNode) || !is.element(newChild)) {
      return null;
    }
    oldChild.parentNode.replaceChild(newChild, oldChild);
    return newChild;
  }

  // Get an attribute object from a string selector
  function getAttributesFromSelector(sel, existingAttributes) {
    // For example:
    // '.test' to { class: 'test' }
    // '#test' to { id: 'test' }
    // '[data-test="test"]' to { 'data-test': 'test' }

    if (!is.string(sel) || is.empty(sel)) {
      return {};
    }
    const attributes = {};
    const existing = extend({}, existingAttributes);
    sel.split(',').forEach(s => {
      // Remove whitespace
      const selector = s.trim();
      const className = selector.replace('.', '');
      const stripped = selector.replace(/[[\]]/g, '');
      // Get the parts and value
      const parts = stripped.split('=');
      const [key] = parts;
      const value = parts.length > 1 ? parts[1].replace(/["']/g, '') : '';
      // Get the first character
      const start = selector.charAt(0);
      switch (start) {
        case '.':
          // Add to existing classname
          if (is.string(existing.class)) {
            attributes.class = `${existing.class} ${className}`;
          } else {
            attributes.class = className;
          }
          break;
        case '#':
          // ID selector
          attributes.id = selector.replace('#', '');
          break;
        case '[':
          // Attribute selector
          attributes[key] = value;
          break;
      }
    });
    return extend(existing, attributes);
  }

  // Toggle hidden
  function toggleHidden(element, hidden) {
    if (!is.element(element)) {
      return;
    }
    let hide = hidden;
    if (!is.boolean(hide)) {
      hide = !element.hidden;
    }

    // eslint-disable-next-line no-param-reassign
    element.hidden = hide;
  }

  // Mirror Element.classList.toggle, with IE compatibility for "force" argument
  function toggleClass(element, className, force) {
    if (is.nodeList(element)) {
      return Array.from(element).map(e => toggleClass(e, className, force));
    }
    if (is.element(element)) {
      let method = 'toggle';
      if (typeof force !== 'undefined') {
        method = force ? 'add' : 'remove';
      }
      element.classList[method](className);
      return element.classList.contains(className);
    }
    return false;
  }

  // Has class name
  function hasClass(element, className) {
    return is.element(element) && element.classList.contains(className);
  }

  // Element matches selector
  function matches(element, selector) {
    const {
      prototype
    } = Element;
    function match() {
      return Array.from(document.querySelectorAll(selector)).includes(this);
    }
    const method = prototype.matches || prototype.webkitMatchesSelector || prototype.mozMatchesSelector || prototype.msMatchesSelector || match;
    return method.call(element, selector);
  }

  // Closest ancestor element matching selector (also tests element itself)
  function closest$1(element, selector) {
    const {
      prototype
    } = Element;

    // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
    function closestElement() {
      let el = this;
      do {
        if (matches.matches(el, selector)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    }
    const method = prototype.closest || closestElement;
    return method.call(element, selector);
  }

  // Find all elements
  function getElements(selector) {
    return this.elements.container.querySelectorAll(selector);
  }

  // Find a single element
  function getElement(selector) {
    return this.elements.container.querySelector(selector);
  }

  // Set focus and tab focus class
  function setFocus(element = null, tabFocus = false) {
    if (!is.element(element)) {
      return;
    }

    // Set regular focus
    element.focus({
      preventScroll: true
    });

    // If we want to mimic keyboard focus via tab
    if (tabFocus) {
      toggleClass(element, this.config.classNames.tabFocus);
    }
  }

  // ==========================================================================

  // Default codecs for checking mimetype support
  const defaultCodecs = {
    'audio/ogg': 'vorbis',
    'audio/wav': '1',
    'video/webm': 'vp8, vorbis',
    'video/mp4': 'avc1.42E01E, mp4a.40.2',
    'video/ogg': 'theora'
  };

  // Check for feature support
  const support = {
    // Basic support
    audio: 'canPlayType' in document.createElement('audio'),
    video: 'canPlayType' in document.createElement('video'),
    // Check for support
    // Basic functionality vs full UI
    check(type, provider, playsinline) {
      const canPlayInline = browser.isIPhone && playsinline && support.playsinline;
      const api = support[type] || provider !== 'html5';
      const ui = api && support.rangeInput && (type !== 'video' || !browser.isIPhone || canPlayInline);
      return {
        api,
        ui
      };
    },
    // Picture-in-picture support
    // Safari & Chrome only currently
    pip: (() => {
      // While iPhone's support picture-in-picture for some apps, seemingly Safari isn't one of them
      // It will throw the following error when trying to enter picture-in-picture
      // `NotSupportedError: The Picture-in-Picture mode is not supported.`
      if (browser.isIPhone) {
        return false;
      }

      // Safari
      // https://developer.apple.com/documentation/webkitjs/adding_picture_in_picture_to_your_safari_media_controls
      if (is.function(createElement('video').webkitSetPresentationMode)) {
        return true;
      }

      // Chrome
      // https://developers.google.com/web/updates/2018/10/watch-video-using-picture-in-picture
      if (document.pictureInPictureEnabled && !createElement('video').disablePictureInPicture) {
        return true;
      }
      return false;
    })(),
    // Airplay support
    // Safari only currently
    airplay: is.function(window.WebKitPlaybackTargetAvailabilityEvent),
    // Inline playback support
    // https://webkit.org/blog/6784/new-video-policies-for-ios/
    playsinline: 'playsInline' in document.createElement('video'),
    // Check for mime type support against a player instance
    // Credits: http://diveintohtml5.info/everything.html
    // Related: http://www.leanbackplayer.com/test/h5mt.html
    mime(input) {
      if (is.empty(input)) {
        return false;
      }
      const [mediaType] = input.split('/');
      let type = input;

      // Verify we're using HTML5 and there's no media type mismatch
      if (!this.isHTML5 || mediaType !== this.type) {
        return false;
      }

      // Add codec if required
      if (Object.keys(defaultCodecs).includes(type)) {
        type += `; codecs="${defaultCodecs[input]}"`;
      }
      try {
        return Boolean(type && this.media.canPlayType(type).replace(/no/, ''));
      } catch (_) {
        return false;
      }
    },
    // Check for textTracks support
    textTracks: 'textTracks' in document.createElement('video'),
    // <input type="range"> Sliders
    rangeInput: (() => {
      const range = document.createElement('input');
      range.type = 'range';
      return range.type === 'range';
    })(),
    // Touch
    // NOTE: Remember a device can be mouse + touch enabled so we check on first touch event
    touch: 'ontouchstart' in document.documentElement,
    // Detect transitions support
    transitions: transitionEndEvent !== false,
    // Reduced motion iOS & MacOS setting
    // https://webkit.org/blog/7551/responsive-design-for-motion/
    reducedMotion: 'matchMedia' in window && window.matchMedia('(prefers-reduced-motion)').matches
  };

  // ==========================================================================

  // Check for passive event listener support
  // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
  // https://www.youtube.com/watch?v=NPM6172J22g
  const supportsPassiveListeners = (() => {
    // Test via a getter in the options object to see if the passive property is accessed
    let supported = false;
    try {
      const options = Object.defineProperty({}, 'passive', {
        get() {
          supported = true;
          return null;
        }
      });
      window.addEventListener('test', null, options);
      window.removeEventListener('test', null, options);
    } catch (_) {
      // Do nothing
    }
    return supported;
  })();

  // Toggle event listener
  function toggleListener(element, event, callback, toggle = false, passive = true, capture = false) {
    // Bail if no element, event, or callback
    if (!element || !('addEventListener' in element) || is.empty(event) || !is.function(callback)) {
      return;
    }

    // Allow multiple events
    const events = event.split(' ');
    // Build options
    // Default to just the capture boolean for browsers with no passive listener support
    let options = capture;

    // If passive events listeners are supported
    if (supportsPassiveListeners) {
      options = {
        // Whether the listener can be passive (i.e. default never prevented)
        passive,
        // Whether the listener is a capturing listener or not
        capture
      };
    }

    // If a single node is passed, bind the event listener
    events.forEach(type => {
      if (this && this.eventListeners && toggle) {
        // Cache event listener
        this.eventListeners.push({
          element,
          type,
          callback,
          options
        });
      }
      element[toggle ? 'addEventListener' : 'removeEventListener'](type, callback, options);
    });
  }

  // Bind event handler
  function on(element, events = '', callback, passive = true, capture = false) {
    toggleListener.call(this, element, events, callback, true, passive, capture);
  }

  // Unbind event handler
  function off(element, events = '', callback, passive = true, capture = false) {
    toggleListener.call(this, element, events, callback, false, passive, capture);
  }

  // Bind once-only event handler
  function once(element, events = '', callback, passive = true, capture = false) {
    const onceCallback = (...args) => {
      off(element, events, onceCallback, passive, capture);
      callback.apply(this, args);
    };
    toggleListener.call(this, element, events, onceCallback, true, passive, capture);
  }

  // Trigger event
  function triggerEvent(element, type = '', bubbles = false, detail = {}) {
    // Bail if no element
    if (!is.element(element) || is.empty(type)) {
      return;
    }

    // Create and dispatch the event
    const event = new CustomEvent(type, {
      bubbles,
      detail: {
        ...detail,
        plyr: this
      }
    });

    // Dispatch the event
    element.dispatchEvent(event);
  }

  // Unbind all cached event listeners
  function unbindListeners() {
    if (this && this.eventListeners) {
      this.eventListeners.forEach(item => {
        const {
          element,
          type,
          callback,
          options
        } = item;
        element.removeEventListener(type, callback, options);
      });
      this.eventListeners = [];
    }
  }

  // Run method when / if player is ready
  function ready() {
    return new Promise(resolve => this.ready ? setTimeout(resolve, 0) : on.call(this, this.elements.container, 'ready', resolve)).then(() => {});
  }

  /**
   * Silence a Promise-like object.
   * This is useful for avoiding non-harmful, but potentially confusing "uncaught
   * play promise" rejection error messages.
   * @param  {Object} value An object that may or may not be `Promise`-like.
   */
  function silencePromise(value) {
    if (is.promise(value)) {
      value.then(null, () => {});
    }
  }

  // ==========================================================================

  // Remove duplicates in an array
  function dedupe(array) {
    if (!is.array(array)) {
      return array;
    }
    return array.filter((item, index) => array.indexOf(item) === index);
  }

  // Get the closest value in an array
  function closest(array, value) {
    if (!is.array(array) || !array.length) {
      return null;
    }
    return array.reduce((prev, curr) => Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev);
  }

  // ==========================================================================

  // Check support for a CSS declaration
  function supportsCSS(declaration) {
    if (!window || !window.CSS) {
      return false;
    }
    return window.CSS.supports(declaration);
  }

  // Standard/common aspect ratios
  const standardRatios = [[1, 1], [4, 3], [3, 4], [5, 4], [4, 5], [3, 2], [2, 3], [16, 10], [10, 16], [16, 9], [9, 16], [21, 9], [9, 21], [32, 9], [9, 32]].reduce((out, [x, y]) => ({
    ...out,
    [x / y]: [x, y]
  }), {});

  // Validate an aspect ratio
  function validateAspectRatio(input) {
    if (!is.array(input) && (!is.string(input) || !input.includes(':'))) {
      return false;
    }
    const ratio = is.array(input) ? input : input.split(':');
    return ratio.map(Number).every(is.number);
  }

  // Reduce an aspect ratio to it's lowest form
  function reduceAspectRatio(ratio) {
    if (!is.array(ratio) || !ratio.every(is.number)) {
      return null;
    }
    const [width, height] = ratio;
    const getDivider = (w, h) => h === 0 ? w : getDivider(h, w % h);
    const divider = getDivider(width, height);
    return [width / divider, height / divider];
  }

  // Calculate an aspect ratio
  function getAspectRatio(input) {
    const parse = ratio => validateAspectRatio(ratio) ? ratio.split(':').map(Number) : null;
    // Try provided ratio
    let ratio = parse(input);

    // Get from config
    if (ratio === null) {
      ratio = parse(this.config.ratio);
    }

    // Get from embed
    if (ratio === null && !is.empty(this.embed) && is.array(this.embed.ratio)) {
      ({
        ratio
      } = this.embed);
    }

    // Get from HTML5 video
    if (ratio === null && this.isHTML5) {
      const {
        videoWidth,
        videoHeight
      } = this.media;
      ratio = [videoWidth, videoHeight];
    }
    return reduceAspectRatio(ratio);
  }

  // Set aspect ratio for responsive container
  function setAspectRatio(input) {
    if (!this.isVideo) {
      return {};
    }
    const {
      wrapper
    } = this.elements;
    const ratio = getAspectRatio.call(this, input);
    if (!is.array(ratio)) {
      return {};
    }
    const [x, y] = reduceAspectRatio(ratio);
    const useNative = supportsCSS(`aspect-ratio: ${x}/${y}`);
    const padding = 100 / x * y;
    if (useNative) {
      wrapper.style.aspectRatio = `${x}/${y}`;
    } else {
      wrapper.style.paddingBottom = `${padding}%`;
    }

    // For Vimeo we have an extra <div> to hide the standard controls and UI
    if (this.isVimeo && !this.config.vimeo.premium && this.supported.ui) {
      const height = 100 / this.media.offsetWidth * parseInt(window.getComputedStyle(this.media).paddingBottom, 10);
      const offset = (height - padding) / (height / 50);
      if (this.fullscreen.active) {
        wrapper.style.paddingBottom = null;
      } else {
        this.media.style.transform = `translateY(-${offset}%)`;
      }
    } else if (this.isHTML5) {
      wrapper.classList.add(this.config.classNames.videoFixedRatio);
    }
    return {
      padding,
      ratio
    };
  }

  // Round an aspect ratio to closest standard ratio
  function roundAspectRatio(x, y, tolerance = 0.05) {
    const ratio = x / y;
    const closestRatio = closest(Object.keys(standardRatios), ratio);

    // Check match is within tolerance
    if (Math.abs(closestRatio - ratio) <= tolerance) {
      return standardRatios[closestRatio];
    }

    // No match
    return [x, y];
  }

  // Get the size of the viewport
  // https://stackoverflow.com/questions/1248081/how-to-get-the-browser-viewport-dimensions
  function getViewportSize() {
    const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    return [width, height];
  }

  // ==========================================================================
  const html5 = {
    getSources() {
      if (!this.isHTML5) {
        return [];
      }
      const sources = Array.from(this.media.querySelectorAll('source'));

      // Filter out unsupported sources (if type is specified)
      return sources.filter(source => {
        const type = source.getAttribute('type');
        if (is.empty(type)) {
          return true;
        }
        return support.mime.call(this, type);
      });
    },
    // Get quality levels
    getQualityOptions() {
      // Whether we're forcing all options (e.g. for streaming)
      if (this.config.quality.forced) {
        return this.config.quality.options;
      }

      // Get sizes from <source> elements
      return html5.getSources.call(this).map(source => Number(source.getAttribute('size'))).filter(Boolean);
    },
    setup() {
      if (!this.isHTML5) {
        return;
      }
      const player = this;

      // Set speed options from config
      player.options.speed = player.config.speed.options;

      // Set aspect ratio if fixed
      if (!is.empty(this.config.ratio)) {
        setAspectRatio.call(player);
      }

      // Quality
      Object.defineProperty(player.media, 'quality', {
        get() {
          // Get sources
          const sources = html5.getSources.call(player);
          const source = sources.find(s => s.getAttribute('src') === player.source);

          // Return size, if match is found
          return source && Number(source.getAttribute('size'));
        },
        set(input) {
          if (player.quality === input) {
            return;
          }

          // If we're using an external handler...
          if (player.config.quality.forced && is.function(player.config.quality.onChange)) {
            player.config.quality.onChange(input);
          } else {
            // Get sources
            const sources = html5.getSources.call(player);
            // Get first match for requested size
            const source = sources.find(s => Number(s.getAttribute('size')) === input);

            // No matching source found
            if (!source) {
              return;
            }

            // Get current state
            const {
              currentTime,
              paused,
              preload,
              readyState,
              playbackRate
            } = player.media;

            // Set new source
            player.media.src = source.getAttribute('src');

            // Prevent loading if preload="none" and the current source isn't loaded (#1044)
            if (preload !== 'none' || readyState) {
              // Restore time
              player.once('loadedmetadata', () => {
                player.speed = playbackRate;
                player.currentTime = currentTime;

                // Resume playing
                if (!paused) {
                  silencePromise(player.play());
                }
              });

              // Load new source
              player.media.load();
            }
          }

          // Trigger change event
          triggerEvent.call(player, player.media, 'qualitychange', false, {
            quality: input
          });
        }
      });
    },
    // Cancel current network requests
    // See https://github.com/sampotts/plyr/issues/174
    cancelRequests() {
      if (!this.isHTML5) {
        return;
      }

      // Remove child sources
      removeElement(html5.getSources.call(this));

      // Set blank video src attribute
      // This is to prevent a MEDIA_ERR_SRC_NOT_SUPPORTED error
      // Info: http://stackoverflow.com/questions/32231579/how-to-properly-dispose-of-an-html5-video-and-close-socket-or-connection
      this.media.setAttribute('src', this.config.blankVideo);

      // Load the new empty source
      // This will cancel existing requests
      // See https://github.com/sampotts/plyr/issues/174
      this.media.load();

      // Debugging
      this.debug.log('Cancelled network requests');
    }
  };

  // ==========================================================================

  // Generate a random ID
  function generateId(prefix) {
    return `${prefix}-${Math.floor(Math.random() * 10000)}`;
  }

  // Format string
  function format(input, ...args) {
    if (is.empty(input)) return input;
    return input.toString().replace(/{(\d+)}/g, (match, i) => args[i].toString());
  }

  // Get percentage
  function getPercentage(current, max) {
    if (current === 0 || max === 0 || Number.isNaN(current) || Number.isNaN(max)) {
      return 0;
    }
    return (current / max * 100).toFixed(2);
  }

  // Replace all occurrences of a string in a string
  const replaceAll = (input = '', find = '', replace = '') => input.replace(new RegExp(find.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1'), 'g'), replace.toString());

  // Convert to title case
  const toTitleCase = (input = '') => input.toString().replace(/\w\S*/g, text => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase());

  // Convert string to pascalCase
  function toPascalCase(input = '') {
    let string = input.toString();

    // Convert kebab case
    string = replaceAll(string, '-', ' ');

    // Convert snake case
    string = replaceAll(string, '_', ' ');

    // Convert to title case
    string = toTitleCase(string);

    // Convert to pascal case
    return replaceAll(string, ' ', '');
  }

  // Convert string to pascalCase
  function toCamelCase(input = '') {
    let string = input.toString();

    // Convert to pascal case
    string = toPascalCase(string);

    // Convert first character to lowercase
    return string.charAt(0).toLowerCase() + string.slice(1);
  }

  // Remove HTML from a string
  function stripHTML(source) {
    const fragment = document.createDocumentFragment();
    const element = document.createElement('div');
    fragment.appendChild(element);
    element.innerHTML = source;
    return fragment.firstChild.innerText;
  }

  // Like outerHTML, but also works for DocumentFragment
  function getHTML(element) {
    const wrapper = document.createElement('div');
    wrapper.appendChild(element);
    return wrapper.innerHTML;
  }

  // ==========================================================================

  // Skip i18n for abbreviations and brand names
  const resources = {
    pip: 'PIP',
    airplay: 'AirPlay',
    html5: 'HTML5',
    vimeo: 'Vimeo',
    youtube: 'YouTube'
  };
  const i18n = {
    get(key = '', config = {}) {
      if (is.empty(key) || is.empty(config)) {
        return '';
      }
      let string = getDeep(config.i18n, key);
      if (is.empty(string)) {
        if (Object.keys(resources).includes(key)) {
          return resources[key];
        }
        return '';
      }
      const replace = {
        '{seektime}': config.seekTime,
        '{title}': config.title
      };
      Object.entries(replace).forEach(([k, v]) => {
        string = replaceAll(string, k, v);
      });
      return string;
    }
  };

  class Storage {
    constructor(player) {
      _defineProperty$1(this, "get", key => {
        if (!Storage.supported || !this.enabled) {
          return null;
        }
        const store = window.localStorage.getItem(this.key);
        if (is.empty(store)) {
          return null;
        }
        const json = JSON.parse(store);
        return is.string(key) && key.length ? json[key] : json;
      });
      _defineProperty$1(this, "set", object => {
        // Bail if we don't have localStorage support or it's disabled
        if (!Storage.supported || !this.enabled) {
          return;
        }

        // Can only store objectst
        if (!is.object(object)) {
          return;
        }

        // Get current storage
        let storage = this.get();

        // Default to empty object
        if (is.empty(storage)) {
          storage = {};
        }

        // Update the working copy of the values
        extend(storage, object);

        // Update storage
        try {
          window.localStorage.setItem(this.key, JSON.stringify(storage));
        } catch (_) {
          // Do nothing
        }
      });
      this.enabled = player.config.storage.enabled;
      this.key = player.config.storage.key;
    }

    // Check for actual support (see if we can use it)
    static get supported() {
      try {
        if (!('localStorage' in window)) {
          return false;
        }
        const test = '___test';

        // Try to use it (it might be disabled, e.g. user is in private mode)
        // see: https://github.com/sampotts/plyr/issues/131
        window.localStorage.setItem(test, test);
        window.localStorage.removeItem(test);
        return true;
      } catch (_) {
        return false;
      }
    }
  }

  // ==========================================================================
  // Fetch wrapper
  // Using XHR to avoid issues with older browsers
  // ==========================================================================

  function fetch(url, responseType = 'text') {
    return new Promise((resolve, reject) => {
      try {
        const request = new XMLHttpRequest();

        // Check for CORS support
        if (!('withCredentials' in request)) {
          return;
        }
        request.addEventListener('load', () => {
          if (responseType === 'text') {
            try {
              resolve(JSON.parse(request.responseText));
            } catch (_) {
              resolve(request.responseText);
            }
          } else {
            resolve(request.response);
          }
        });
        request.addEventListener('error', () => {
          throw new Error(request.status);
        });
        request.open('GET', url, true);

        // Set the required response type
        request.responseType = responseType;
        request.send();
      } catch (error) {
        reject(error);
      }
    });
  }

  // ==========================================================================

  // Load an external SVG sprite
  function loadSprite(url, id) {
    if (!is.string(url)) {
      return;
    }
    const prefix = 'cache';
    const hasId = is.string(id);
    let isCached = false;
    const exists = () => document.getElementById(id) !== null;
    const update = (container, data) => {
      // eslint-disable-next-line no-param-reassign
      container.innerHTML = data;

      // Check again incase of race condition
      if (hasId && exists()) {
        return;
      }

      // Inject the SVG to the body
      document.body.insertAdjacentElement('afterbegin', container);
    };

    // Only load once if ID set
    if (!hasId || !exists()) {
      const useStorage = Storage.supported;
      // Create container
      const container = document.createElement('div');
      container.setAttribute('hidden', '');
      if (hasId) {
        container.setAttribute('id', id);
      }

      // Check in cache
      if (useStorage) {
        const cached = window.localStorage.getItem(`${prefix}-${id}`);
        isCached = cached !== null;
        if (isCached) {
          const data = JSON.parse(cached);
          update(container, data.content);
        }
      }

      // Get the sprite
      fetch(url).then(result => {
        if (is.empty(result)) {
          return;
        }
        if (useStorage) {
          try {
            window.localStorage.setItem(`${prefix}-${id}`, JSON.stringify({
              content: result
            }));
          } catch (_) {
            // Do nothing
          }
        }
        update(container, result);
      }).catch(() => {});
    }
  }

  // ==========================================================================

  // Time helpers
  const getHours = value => Math.trunc(value / 60 / 60 % 60, 10);
  const getMinutes = value => Math.trunc(value / 60 % 60, 10);
  const getSeconds = value => Math.trunc(value % 60, 10);

  // Format time to UI friendly string
  function formatTime(time = 0, displayHours = false, inverted = false) {
    // Bail if the value isn't a number
    if (!is.number(time)) {
      return formatTime(undefined, displayHours, inverted);
    }

    // Format time component to add leading zero
    const format = value => `0${value}`.slice(-2);
    // Breakdown to hours, mins, secs
    let hours = getHours(time);
    const mins = getMinutes(time);
    const secs = getSeconds(time);

    // Do we need to display hours?
    if (displayHours || hours > 0) {
      hours = `${hours}:`;
    } else {
      hours = '';
    }

    // Render
    return `${inverted && time > 0 ? '-' : ''}${hours}${format(mins)}:${format(secs)}`;
  }

  // ==========================================================================

  // TODO: Don't export a massive object - break down and create class
  const controls = {
    // Get icon URL
    getIconUrl() {
      const url = new URL(this.config.iconUrl, window.location);
      const host = window.location.host ? window.location.host : window.top.location.host;
      const cors = url.host !== host || browser.isIE && !window.svg4everybody;
      return {
        url: this.config.iconUrl,
        cors
      };
    },
    // Find the UI controls
    findElements() {
      try {
        this.elements.controls = getElement.call(this, this.config.selectors.controls.wrapper);

        // Buttons
        this.elements.buttons = {
          play: getElements.call(this, this.config.selectors.buttons.play),
          pause: getElement.call(this, this.config.selectors.buttons.pause),
          restart: getElement.call(this, this.config.selectors.buttons.restart),
          rewind: getElement.call(this, this.config.selectors.buttons.rewind),
          fastForward: getElement.call(this, this.config.selectors.buttons.fastForward),
          mute: getElement.call(this, this.config.selectors.buttons.mute),
          pip: getElement.call(this, this.config.selectors.buttons.pip),
          airplay: getElement.call(this, this.config.selectors.buttons.airplay),
          settings: getElement.call(this, this.config.selectors.buttons.settings),
          captions: getElement.call(this, this.config.selectors.buttons.captions),
          fullscreen: getElement.call(this, this.config.selectors.buttons.fullscreen)
        };

        // Progress
        this.elements.progress = getElement.call(this, this.config.selectors.progress);

        // Inputs
        this.elements.inputs = {
          seek: getElement.call(this, this.config.selectors.inputs.seek),
          volume: getElement.call(this, this.config.selectors.inputs.volume)
        };

        // Display
        this.elements.display = {
          buffer: getElement.call(this, this.config.selectors.display.buffer),
          currentTime: getElement.call(this, this.config.selectors.display.currentTime),
          duration: getElement.call(this, this.config.selectors.display.duration)
        };

        // Seek tooltip
        if (is.element(this.elements.progress)) {
          this.elements.display.seekTooltip = this.elements.progress.querySelector(`.${this.config.classNames.tooltip}`);
        }
        return true;
      } catch (error) {
        // Log it
        this.debug.warn('It looks like there is a problem with your custom controls HTML', error);

        // Restore native video controls
        this.toggleNativeControls(true);
        return false;
      }
    },
    // Create <svg> icon
    createIcon(type, attributes) {
      const namespace = 'http://www.w3.org/2000/svg';
      const iconUrl = controls.getIconUrl.call(this);
      const iconPath = `${!iconUrl.cors ? iconUrl.url : ''}#${this.config.iconPrefix}`;
      // Create <svg>
      const icon = document.createElementNS(namespace, 'svg');
      setAttributes(icon, extend(attributes, {
        'aria-hidden': 'true',
        focusable: 'false'
      }));

      // Create the <use> to reference sprite
      const use = document.createElementNS(namespace, 'use');
      const path = `${iconPath}-${type}`;

      // Set `href` attributes
      // https://github.com/sampotts/plyr/issues/460
      // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/xlink:href
      if ('href' in use) {
        use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', path);
      }

      // Always set the older attribute even though it's "deprecated" (it'll be around for ages)
      use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', path);

      // Add <use> to <svg>
      icon.appendChild(use);
      return icon;
    },
    // Create hidden text label
    createLabel(key, attr = {}) {
      const text = i18n.get(key, this.config);
      const attributes = {
        ...attr,
        class: [attr.class, this.config.classNames.hidden].filter(Boolean).join(' ')
      };
      return createElement('span', attributes, text);
    },
    // Create a badge
    createBadge(text) {
      if (is.empty(text)) {
        return null;
      }
      const badge = createElement('span', {
        class: this.config.classNames.menu.value
      });
      badge.appendChild(createElement('span', {
        class: this.config.classNames.menu.badge
      }, text));
      return badge;
    },
    // Create a <button>
    createButton(buttonType, attr) {
      const attributes = extend({}, attr);
      let type = toCamelCase(buttonType);
      const props = {
        element: 'button',
        toggle: false,
        label: null,
        icon: null,
        labelPressed: null,
        iconPressed: null
      };
      ['element', 'icon', 'label'].forEach(key => {
        if (Object.keys(attributes).includes(key)) {
          props[key] = attributes[key];
          delete attributes[key];
        }
      });

      // Default to 'button' type to prevent form submission
      if (props.element === 'button' && !Object.keys(attributes).includes('type')) {
        attributes.type = 'button';
      }

      // Set class name
      if (Object.keys(attributes).includes('class')) {
        if (!attributes.class.split(' ').some(c => c === this.config.classNames.control)) {
          extend(attributes, {
            class: `${attributes.class} ${this.config.classNames.control}`
          });
        }
      } else {
        attributes.class = this.config.classNames.control;
      }

      // Large play button
      switch (buttonType) {
        case 'play':
          props.toggle = true;
          props.label = 'play';
          props.labelPressed = 'pause';
          props.icon = 'play';
          props.iconPressed = 'pause';
          break;
        case 'mute':
          props.toggle = true;
          props.label = 'mute';
          props.labelPressed = 'unmute';
          props.icon = 'volume';
          props.iconPressed = 'muted';
          break;
        case 'captions':
          props.toggle = true;
          props.label = 'enableCaptions';
          props.labelPressed = 'disableCaptions';
          props.icon = 'captions-off';
          props.iconPressed = 'captions-on';
          break;
        case 'fullscreen':
          props.toggle = true;
          props.label = 'enterFullscreen';
          props.labelPressed = 'exitFullscreen';
          props.icon = 'enter-fullscreen';
          props.iconPressed = 'exit-fullscreen';
          break;
        case 'play-large':
          attributes.class += ` ${this.config.classNames.control}--overlaid`;
          type = 'play';
          props.label = 'play';
          props.icon = 'play';
          break;
        default:
          if (is.empty(props.label)) {
            props.label = type;
          }
          if (is.empty(props.icon)) {
            props.icon = buttonType;
          }
      }
      const button = createElement(props.element);

      // Setup toggle icon and labels
      if (props.toggle) {
        // Icon
        button.appendChild(controls.createIcon.call(this, props.iconPressed, {
          class: 'icon--pressed'
        }));
        button.appendChild(controls.createIcon.call(this, props.icon, {
          class: 'icon--not-pressed'
        }));

        // Label/Tooltip
        button.appendChild(controls.createLabel.call(this, props.labelPressed, {
          class: 'label--pressed'
        }));
        button.appendChild(controls.createLabel.call(this, props.label, {
          class: 'label--not-pressed'
        }));
      } else {
        button.appendChild(controls.createIcon.call(this, props.icon));
        button.appendChild(controls.createLabel.call(this, props.label));
      }

      // Merge and set attributes
      extend(attributes, getAttributesFromSelector(this.config.selectors.buttons[type], attributes));
      setAttributes(button, attributes);

      // We have multiple play buttons
      if (type === 'play') {
        if (!is.array(this.elements.buttons[type])) {
          this.elements.buttons[type] = [];
        }
        this.elements.buttons[type].push(button);
      } else {
        this.elements.buttons[type] = button;
      }
      return button;
    },
    // Create an <input type='range'>
    createRange(type, attributes) {
      // Seek input
      const input = createElement('input', extend(getAttributesFromSelector(this.config.selectors.inputs[type]), {
        type: 'range',
        min: 0,
        max: 100,
        step: 0.01,
        value: 0,
        autocomplete: 'off',
        // A11y fixes for https://github.com/sampotts/plyr/issues/905
        role: 'slider',
        'aria-label': i18n.get(type, this.config),
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        'aria-valuenow': 0
      }, attributes));
      this.elements.inputs[type] = input;

      // Set the fill for webkit now
      controls.updateRangeFill.call(this, input);

      // Improve support on touch devices
      RangeTouch.setup(input);
      return input;
    },
    // Create a <progress>
    createProgress(type, attributes) {
      const progress = createElement('progress', extend(getAttributesFromSelector(this.config.selectors.display[type]), {
        min: 0,
        max: 100,
        value: 0,
        role: 'progressbar',
        'aria-hidden': true
      }, attributes));

      // Create the label inside
      if (type !== 'volume') {
        progress.appendChild(createElement('span', null, '0'));
        const suffixKey = {
          played: 'played',
          buffer: 'buffered'
        }[type];
        const suffix = suffixKey ? i18n.get(suffixKey, this.config) : '';
        progress.innerText = `% ${suffix.toLowerCase()}`;
      }
      this.elements.display[type] = progress;
      return progress;
    },
    // Create time display
    createTime(type, attrs) {
      const attributes = getAttributesFromSelector(this.config.selectors.display[type], attrs);
      const container = createElement('div', extend(attributes, {
        class: `${attributes.class ? attributes.class : ''} ${this.config.classNames.display.time} `.trim(),
        'aria-label': i18n.get(type, this.config)
      }), '00:00');

      // Reference for updates
      this.elements.display[type] = container;
      return container;
    },
    // Bind keyboard shortcuts for a menu item
    // We have to bind to keyup otherwise Firefox triggers a click when a keydown event handler shifts focus
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1220143
    bindMenuItemShortcuts(menuItem, type) {
      // Navigate through menus via arrow keys and space
      on.call(this, menuItem, 'keydown keyup', event => {
        // We only care about space and ⬆️ ⬇️️ ➡️
        if (!['Space', 'ArrowUp', 'ArrowDown', 'ArrowRight'].includes(event.key)) {
          return;
        }

        // Prevent play / seek
        event.preventDefault();
        event.stopPropagation();

        // We're just here to prevent the keydown bubbling
        if (event.type === 'keydown') {
          return;
        }
        const isRadioButton = matches(menuItem, '[role="menuitemradio"]');

        // Show the respective menu
        if (!isRadioButton && ['Space', 'ArrowRight'].includes(event.key)) {
          controls.showMenuPanel.call(this, type, true);
        } else {
          let target;
          if (event.key !== 'Space') {
            if (event.key === 'ArrowDown' || isRadioButton && event.key === 'ArrowRight') {
              target = menuItem.nextElementSibling;
              if (!is.element(target)) {
                target = menuItem.parentNode.firstElementChild;
              }
            } else {
              target = menuItem.previousElementSibling;
              if (!is.element(target)) {
                target = menuItem.parentNode.lastElementChild;
              }
            }
            setFocus.call(this, target, true);
          }
        }
      }, false);

      // Enter will fire a `click` event but we still need to manage focus
      // So we bind to keyup which fires after and set focus here
      on.call(this, menuItem, 'keyup', event => {
        if (event.key !== 'Return') return;
        controls.focusFirstMenuItem.call(this, null, true);
      });
    },
    // Create a settings menu item
    createMenuItem({
      value,
      list,
      type,
      title,
      badge = null,
      checked = false
    }) {
      const attributes = getAttributesFromSelector(this.config.selectors.inputs[type]);
      const menuItem = createElement('button', extend(attributes, {
        type: 'button',
        role: 'menuitemradio',
        class: `${this.config.classNames.control} ${attributes.class ? attributes.class : ''}`.trim(),
        'aria-checked': checked,
        value
      }));
      const flex = createElement('span');

      // We have to set as HTML incase of special characters
      flex.innerHTML = title;
      if (is.element(badge)) {
        flex.appendChild(badge);
      }
      menuItem.appendChild(flex);

      // Replicate radio button behavior
      Object.defineProperty(menuItem, 'checked', {
        enumerable: true,
        get() {
          return menuItem.getAttribute('aria-checked') === 'true';
        },
        set(check) {
          // Ensure exclusivity
          if (check) {
            Array.from(menuItem.parentNode.children).filter(node => matches(node, '[role="menuitemradio"]')).forEach(node => node.setAttribute('aria-checked', 'false'));
          }
          menuItem.setAttribute('aria-checked', check ? 'true' : 'false');
        }
      });
      this.listeners.bind(menuItem, 'click keyup', event => {
        if (is.keyboardEvent(event) && event.key !== 'Space') {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        menuItem.checked = true;
        switch (type) {
          case 'language':
            this.currentTrack = Number(value);
            break;
          case 'quality':
            this.quality = value;
            break;
          case 'speed':
            this.speed = parseFloat(value);
            break;
        }
        controls.showMenuPanel.call(this, 'home', is.keyboardEvent(event));
      }, type, false);
      controls.bindMenuItemShortcuts.call(this, menuItem, type);
      list.appendChild(menuItem);
    },
    // Format a time for display
    formatTime(time = 0, inverted = false) {
      // Bail if the value isn't a number
      if (!is.number(time)) {
        return time;
      }

      // Always display hours if duration is over an hour
      const forceHours = getHours(this.duration) > 0;
      return formatTime(time, forceHours, inverted);
    },
    // Update the displayed time
    updateTimeDisplay(target = null, time = 0, inverted = false) {
      // Bail if there's no element to display or the value isn't a number
      if (!is.element(target) || !is.number(time)) {
        return;
      }

      // eslint-disable-next-line no-param-reassign
      target.innerText = controls.formatTime(time, inverted);
    },
    // Update volume UI and storage
    updateVolume() {
      if (!this.supported.ui) {
        return;
      }

      // Update range
      if (is.element(this.elements.inputs.volume)) {
        controls.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume);
      }

      // Update mute state
      if (is.element(this.elements.buttons.mute)) {
        this.elements.buttons.mute.pressed = this.muted || this.volume === 0;
      }
    },
    // Update seek value and lower fill
    setRange(target, value = 0) {
      if (!is.element(target)) {
        return;
      }

      // eslint-disable-next-line
      target.value = value;

      // Webkit range fill
      controls.updateRangeFill.call(this, target);
    },
    // Update <progress> elements
    updateProgress(event) {
      if (!this.supported.ui || !is.event(event)) {
        return;
      }
      let value = 0;
      const setProgress = (target, input) => {
        const val = is.number(input) ? input : 0;
        const progress = is.element(target) ? target : this.elements.display.buffer;

        // Update value and label
        if (is.element(progress)) {
          progress.value = val;

          // Update text label inside
          const label = progress.getElementsByTagName('span')[0];
          if (is.element(label)) {
            label.childNodes[0].nodeValue = val;
          }
        }
      };
      if (event) {
        switch (event.type) {
          // Video playing
          case 'timeupdate':
          case 'seeking':
          case 'seeked':
            value = getPercentage(this.currentTime, this.duration);

            // Set seek range value only if it's a 'natural' time event
            if (event.type === 'timeupdate') {
              controls.setRange.call(this, this.elements.inputs.seek, value);
            }
            break;

          // Check buffer status
          case 'playing':
          case 'progress':
            setProgress(this.elements.display.buffer, this.buffered * 100);
            break;
        }
      }
    },
    // Webkit polyfill for lower fill range
    updateRangeFill(target) {
      // Get range from event if event passed
      const range = is.event(target) ? target.target : target;

      // Needs to be a valid <input type='range'>
      if (!is.element(range) || range.getAttribute('type') !== 'range') {
        return;
      }

      // Set aria values for https://github.com/sampotts/plyr/issues/905
      if (matches(range, this.config.selectors.inputs.seek)) {
        range.setAttribute('aria-valuenow', this.currentTime);
        const currentTime = controls.formatTime(this.currentTime);
        const duration = controls.formatTime(this.duration);
        const format = i18n.get('seekLabel', this.config);
        range.setAttribute('aria-valuetext', format.replace('{currentTime}', currentTime).replace('{duration}', duration));
      } else if (matches(range, this.config.selectors.inputs.volume)) {
        const percent = range.value * 100;
        range.setAttribute('aria-valuenow', percent);
        range.setAttribute('aria-valuetext', `${percent.toFixed(1)}%`);
      } else {
        range.setAttribute('aria-valuenow', range.value);
      }

      // WebKit only
      if (!browser.isWebkit) {
        return;
      }

      // Set CSS custom property
      range.style.setProperty('--value', `${range.value / range.max * 100}%`);
    },
    // Update hover tooltip for seeking
    updateSeekTooltip(event) {
      var _this$config$markers, _this$config$markers$;
      // Bail if setting not true
      if (!this.config.tooltips.seek || !is.element(this.elements.inputs.seek) || !is.element(this.elements.display.seekTooltip) || this.duration === 0) {
        return;
      }
      const tipElement = this.elements.display.seekTooltip;
      const visible = `${this.config.classNames.tooltip}--visible`;
      const toggle = show => toggleClass(tipElement, visible, show);

      // Hide on touch
      if (this.touch) {
        toggle(false);
        return;
      }

      // Determine percentage, if already visible
      let percent = 0;
      const clientRect = this.elements.progress.getBoundingClientRect();
      if (is.event(event)) {
        percent = 100 / clientRect.width * (event.pageX - clientRect.left);
      } else if (hasClass(tipElement, visible)) {
        percent = parseFloat(tipElement.style.left, 10);
      } else {
        return;
      }

      // Set bounds
      if (percent < 0) {
        percent = 0;
      } else if (percent > 100) {
        percent = 100;
      }
      const time = this.duration / 100 * percent;

      // Display the time a click would seek to
      tipElement.innerText = controls.formatTime(time);

      // Get marker point for time
      const point = (_this$config$markers = this.config.markers) === null || _this$config$markers === void 0 ? void 0 : (_this$config$markers$ = _this$config$markers.points) === null || _this$config$markers$ === void 0 ? void 0 : _this$config$markers$.find(({
        time: t
      }) => t === Math.round(time));

      // Append the point label to the tooltip
      if (point) {
        tipElement.insertAdjacentHTML('afterbegin', `${point.label}<br>`);
      }

      // Set position
      tipElement.style.left = `${percent}%`;

      // Show/hide the tooltip
      // If the event is a moues in/out and percentage is inside bounds
      if (is.event(event) && ['mouseenter', 'mouseleave'].includes(event.type)) {
        toggle(event.type === 'mouseenter');
      }
    },
    // Handle time change event
    timeUpdate(event) {
      // Only invert if only one time element is displayed and used for both duration and currentTime
      const invert = !is.element(this.elements.display.duration) && this.config.invertTime;

      // Duration
      controls.updateTimeDisplay.call(this, this.elements.display.currentTime, invert ? this.duration - this.currentTime : this.currentTime, invert);

      // Ignore updates while seeking
      if (event && event.type === 'timeupdate' && this.media.seeking) {
        return;
      }

      // Playing progress
      controls.updateProgress.call(this, event);
    },
    // Show the duration on metadataloaded or durationchange events
    durationUpdate() {
      // Bail if no UI or durationchange event triggered after playing/seek when invertTime is false
      if (!this.supported.ui || !this.config.invertTime && this.currentTime) {
        return;
      }

      // If duration is the 2**32 (shaka), Infinity (HLS), DASH-IF (Number.MAX_SAFE_INTEGER || Number.MAX_VALUE) indicating live we hide the currentTime and progressbar.
      // https://github.com/video-dev/hls.js/blob/5820d29d3c4c8a46e8b75f1e3afa3e68c1a9a2db/src/controller/buffer-controller.js#L415
      // https://github.com/google/shaka-player/blob/4d889054631f4e1cf0fbd80ddd2b71887c02e232/lib/media/streaming_engine.js#L1062
      // https://github.com/Dash-Industry-Forum/dash.js/blob/69859f51b969645b234666800d4cb596d89c602d/src/dash/models/DashManifestModel.js#L338
      if (this.duration >= 2 ** 32) {
        toggleHidden(this.elements.display.currentTime, true);
        toggleHidden(this.elements.progress, true);
        return;
      }

      // Update ARIA values
      if (is.element(this.elements.inputs.seek)) {
        this.elements.inputs.seek.setAttribute('aria-valuemax', this.duration);
      }

      // If there's a spot to display duration
      const hasDuration = is.element(this.elements.display.duration);

      // If there's only one time display, display duration there
      if (!hasDuration && this.config.displayDuration && this.paused) {
        controls.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration);
      }

      // If there's a duration element, update content
      if (hasDuration) {
        controls.updateTimeDisplay.call(this, this.elements.display.duration, this.duration);
      }
      if (this.config.markers.enabled) {
        controls.setMarkers.call(this);
      }

      // Update the tooltip (if visible)
      controls.updateSeekTooltip.call(this);
    },
    // Hide/show a tab
    toggleMenuButton(setting, toggle) {
      toggleHidden(this.elements.settings.buttons[setting], !toggle);
    },
    // Update the selected setting
    updateSetting(setting, container, input) {
      const pane = this.elements.settings.panels[setting];
      let value = null;
      let list = container;
      if (setting === 'captions') {
        value = this.currentTrack;
      } else {
        value = !is.empty(input) ? input : this[setting];

        // Get default
        if (is.empty(value)) {
          value = this.config[setting].default;
        }

        // Unsupported value
        if (!is.empty(this.options[setting]) && !this.options[setting].includes(value)) {
          this.debug.warn(`Unsupported value of '${value}' for ${setting}`);
          return;
        }

        // Disabled value
        if (!this.config[setting].options.includes(value)) {
          this.debug.warn(`Disabled value of '${value}' for ${setting}`);
          return;
        }
      }

      // Get the list if we need to
      if (!is.element(list)) {
        list = pane && pane.querySelector('[role="menu"]');
      }

      // If there's no list it means it's not been rendered...
      if (!is.element(list)) {
        return;
      }

      // Update the label
      const label = this.elements.settings.buttons[setting].querySelector(`.${this.config.classNames.menu.value}`);
      label.innerHTML = controls.getLabel.call(this, setting, value);

      // Find the radio option and check it
      const target = list && list.querySelector(`[value="${value}"]`);
      if (is.element(target)) {
        target.checked = true;
      }
    },
    // Translate a value into a nice label
    getLabel(setting, value) {
      switch (setting) {
        case 'speed':
          return value === 1 ? i18n.get('normal', this.config) : `${value}&times;`;
        case 'quality':
          if (is.number(value)) {
            const label = i18n.get(`qualityLabel.${value}`, this.config);
            if (!label.length) {
              return `${value}p`;
            }
            return label;
          }
          return toTitleCase(value);
        case 'captions':
          return captions.getLabel.call(this);
        default:
          return null;
      }
    },
    // Set the quality menu
    setQualityMenu(options) {
      // Menu required
      if (!is.element(this.elements.settings.panels.quality)) {
        return;
      }
      const type = 'quality';
      const list = this.elements.settings.panels.quality.querySelector('[role="menu"]');

      // Set options if passed and filter based on uniqueness and config
      if (is.array(options)) {
        this.options.quality = dedupe(options).filter(quality => this.config.quality.options.includes(quality));
      }

      // Toggle the pane and tab
      const toggle = !is.empty(this.options.quality) && this.options.quality.length > 1;
      controls.toggleMenuButton.call(this, type, toggle);

      // Empty the menu
      emptyElement(list);

      // Check if we need to toggle the parent
      controls.checkMenu.call(this);

      // If we're hiding, nothing more to do
      if (!toggle) {
        return;
      }

      // Get the badge HTML for HD, 4K etc
      const getBadge = quality => {
        const label = i18n.get(`qualityBadge.${quality}`, this.config);
        if (!label.length) {
          return null;
        }
        return controls.createBadge.call(this, label);
      };

      // Sort options by the config and then render options
      this.options.quality.sort((a, b) => {
        const sorting = this.config.quality.options;
        return sorting.indexOf(a) > sorting.indexOf(b) ? 1 : -1;
      }).forEach(quality => {
        controls.createMenuItem.call(this, {
          value: quality,
          list,
          type,
          title: controls.getLabel.call(this, 'quality', quality),
          badge: getBadge(quality)
        });
      });
      controls.updateSetting.call(this, type, list);
    },
    // Set the looping options
    /* setLoopMenu() {
          // Menu required
          if (!is.element(this.elements.settings.panels.loop)) {
              return;
          }
           const options = ['start', 'end', 'all', 'reset'];
          const list = this.elements.settings.panels.loop.querySelector('[role="menu"]');
           // Show the pane and tab
          toggleHidden(this.elements.settings.buttons.loop, false);
          toggleHidden(this.elements.settings.panels.loop, false);
           // Toggle the pane and tab
          const toggle = !is.empty(this.loop.options);
          controls.toggleMenuButton.call(this, 'loop', toggle);
           // Empty the menu
          emptyElement(list);
           options.forEach(option => {
              const item = createElement('li');
               const button = createElement(
                  'button',
                  extend(getAttributesFromSelector(this.config.selectors.buttons.loop), {
                      type: 'button',
                      class: this.config.classNames.control,
                      'data-plyr-loop-action': option,
                  }),
                  i18n.get(option, this.config)
              );
               if (['start', 'end'].includes(option)) {
                  const badge = controls.createBadge.call(this, '00:00');
                  button.appendChild(badge);
              }
               item.appendChild(button);
              list.appendChild(item);
          });
      }, */

    // Get current selected caption language
    // TODO: rework this to user the getter in the API?

    // Set a list of available captions languages
    setCaptionsMenu() {
      // Menu required
      if (!is.element(this.elements.settings.panels.captions)) {
        return;
      }

      // TODO: Captions or language? Currently it's mixed
      const type = 'captions';
      const list = this.elements.settings.panels.captions.querySelector('[role="menu"]');
      const tracks = captions.getTracks.call(this);
      const toggle = Boolean(tracks.length);

      // Toggle the pane and tab
      controls.toggleMenuButton.call(this, type, toggle);

      // Empty the menu
      emptyElement(list);

      // Check if we need to toggle the parent
      controls.checkMenu.call(this);

      // If there's no captions, bail
      if (!toggle) {
        return;
      }

      // Generate options data
      const options = tracks.map((track, value) => ({
        value,
        checked: this.captions.toggled && this.currentTrack === value,
        title: captions.getLabel.call(this, track),
        badge: track.language && controls.createBadge.call(this, track.language.toUpperCase()),
        list,
        type: 'language'
      }));

      // Add the "Disabled" option to turn off captions
      options.unshift({
        value: -1,
        checked: !this.captions.toggled,
        title: i18n.get('disabled', this.config),
        list,
        type: 'language'
      });

      // Generate options
      options.forEach(controls.createMenuItem.bind(this));
      controls.updateSetting.call(this, type, list);
    },
    // Set a list of available captions languages
    setSpeedMenu() {
      // Menu required
      if (!is.element(this.elements.settings.panels.speed)) {
        return;
      }
      const type = 'speed';
      const list = this.elements.settings.panels.speed.querySelector('[role="menu"]');

      // Filter out invalid speeds
      this.options.speed = this.options.speed.filter(o => o >= this.minimumSpeed && o <= this.maximumSpeed);

      // Toggle the pane and tab
      const toggle = !is.empty(this.options.speed) && this.options.speed.length > 1;
      controls.toggleMenuButton.call(this, type, toggle);

      // Empty the menu
      emptyElement(list);

      // Check if we need to toggle the parent
      controls.checkMenu.call(this);

      // If we're hiding, nothing more to do
      if (!toggle) {
        return;
      }

      // Create items
      this.options.speed.forEach(speed => {
        controls.createMenuItem.call(this, {
          value: speed,
          list,
          type,
          title: controls.getLabel.call(this, 'speed', speed)
        });
      });
      controls.updateSetting.call(this, type, list);
    },
    // Check if we need to hide/show the settings menu
    checkMenu() {
      const {
        buttons
      } = this.elements.settings;
      const visible = !is.empty(buttons) && Object.values(buttons).some(button => !button.hidden);
      toggleHidden(this.elements.settings.menu, !visible);
    },
    // Focus the first menu item in a given (or visible) menu
    focusFirstMenuItem(pane, tabFocus = false) {
      if (this.elements.settings.popup.hidden) {
        return;
      }
      let target = pane;
      if (!is.element(target)) {
        target = Object.values(this.elements.settings.panels).find(p => !p.hidden);
      }
      const firstItem = target.querySelector('[role^="menuitem"]');
      setFocus.call(this, firstItem, tabFocus);
    },
    // Show/hide menu
    toggleMenu(input) {
      const {
        popup
      } = this.elements.settings;
      const button = this.elements.buttons.settings;

      // Menu and button are required
      if (!is.element(popup) || !is.element(button)) {
        return;
      }

      // True toggle by default
      const {
        hidden
      } = popup;
      let show = hidden;
      if (is.boolean(input)) {
        show = input;
      } else if (is.keyboardEvent(input) && input.key === 'Escape') {
        show = false;
      } else if (is.event(input)) {
        // If Plyr is in a shadowDOM, the event target is set to the component, instead of the
        // Element in the shadowDOM. The path, if available, is complete.
        const target = is.function(input.composedPath) ? input.composedPath()[0] : input.target;
        const isMenuItem = popup.contains(target);

        // If the click was inside the menu or if the click
        // wasn't the button or menu item and we're trying to
        // show the menu (a doc click shouldn't show the menu)
        if (isMenuItem || !isMenuItem && input.target !== button && show) {
          return;
        }
      }

      // Set button attributes
      button.setAttribute('aria-expanded', show);

      // Show the actual popup
      toggleHidden(popup, !show);

      // Add class hook
      toggleClass(this.elements.container, this.config.classNames.menu.open, show);

      // Focus the first item if key interaction
      if (show && is.keyboardEvent(input)) {
        controls.focusFirstMenuItem.call(this, null, true);
      } else if (!show && !hidden) {
        // If closing, re-focus the button
        setFocus.call(this, button, is.keyboardEvent(input));
      }
    },
    // Get the natural size of a menu panel
    getMenuSize(tab) {
      const clone = tab.cloneNode(true);
      clone.style.position = 'absolute';
      clone.style.opacity = 0;
      clone.removeAttribute('hidden');

      // Append to parent so we get the "real" size
      tab.parentNode.appendChild(clone);

      // Get the sizes before we remove
      const width = clone.scrollWidth;
      const height = clone.scrollHeight;

      // Remove from the DOM
      removeElement(clone);
      return {
        width,
        height
      };
    },
    // Show a panel in the menu
    showMenuPanel(type = '', tabFocus = false) {
      const target = this.elements.container.querySelector(`#plyr-settings-${this.id}-${type}`);

      // Nothing to show, bail
      if (!is.element(target)) {
        return;
      }

      // Hide all other panels
      const container = target.parentNode;
      const current = Array.from(container.children).find(node => !node.hidden);

      // If we can do fancy animations, we'll animate the height/width
      if (support.transitions && !support.reducedMotion) {
        // Set the current width as a base
        container.style.width = `${current.scrollWidth}px`;
        container.style.height = `${current.scrollHeight}px`;

        // Get potential sizes
        const size = controls.getMenuSize.call(this, target);

        // Restore auto height/width
        const restore = event => {
          // We're only bothered about height and width on the container
          if (event.target !== container || !['width', 'height'].includes(event.propertyName)) {
            return;
          }

          // Revert back to auto
          container.style.width = '';
          container.style.height = '';

          // Only listen once
          off.call(this, container, transitionEndEvent, restore);
        };

        // Listen for the transition finishing and restore auto height/width
        on.call(this, container, transitionEndEvent, restore);

        // Set dimensions to target
        container.style.width = `${size.width}px`;
        container.style.height = `${size.height}px`;
      }

      // Set attributes on current tab
      toggleHidden(current, true);

      // Set attributes on target
      toggleHidden(target, false);

      // Focus the first item
      controls.focusFirstMenuItem.call(this, target, tabFocus);
    },
    // Set the download URL
    setDownloadUrl() {
      const button = this.elements.buttons.download;

      // Bail if no button
      if (!is.element(button)) {
        return;
      }

      // Set attribute
      button.setAttribute('href', this.download);
    },
    // Build the default HTML
    create(data) {
      const {
        bindMenuItemShortcuts,
        createButton,
        createProgress,
        createRange,
        createTime,
        setQualityMenu,
        setSpeedMenu,
        showMenuPanel
      } = controls;
      this.elements.controls = null;

      // Larger overlaid play button
      if (is.array(this.config.controls) && this.config.controls.includes('play-large')) {
        this.elements.container.appendChild(createButton.call(this, 'play-large'));
      }

      // Create the container
      const container = createElement('div', getAttributesFromSelector(this.config.selectors.controls.wrapper));
      this.elements.controls = container;

      // Default item attributes
      const defaultAttributes = {
        class: 'plyr__controls__item'
      };

      // Loop through controls in order
      dedupe(is.array(this.config.controls) ? this.config.controls : []).forEach(control => {
        // Restart button
        if (control === 'restart') {
          container.appendChild(createButton.call(this, 'restart', defaultAttributes));
        }

        // Rewind button
        if (control === 'rewind') {
          container.appendChild(createButton.call(this, 'rewind', defaultAttributes));
        }

        // Play/Pause button
        if (control === 'play') {
          container.appendChild(createButton.call(this, 'play', defaultAttributes));
        }

        // Fast forward button
        if (control === 'fast-forward') {
          container.appendChild(createButton.call(this, 'fast-forward', defaultAttributes));
        }

        // Progress
        if (control === 'progress') {
          const progressContainer = createElement('div', {
            class: `${defaultAttributes.class} plyr__progress__container`
          });
          const progress = createElement('div', getAttributesFromSelector(this.config.selectors.progress));

          // Seek range slider
          progress.appendChild(createRange.call(this, 'seek', {
            id: `plyr-seek-${data.id}`
          }));

          // Buffer progress
          progress.appendChild(createProgress.call(this, 'buffer'));

          // TODO: Add loop display indicator

          // Seek tooltip
          if (this.config.tooltips.seek) {
            const tooltip = createElement('span', {
              class: this.config.classNames.tooltip
            }, '00:00');
            progress.appendChild(tooltip);
            this.elements.display.seekTooltip = tooltip;
          }
          this.elements.progress = progress;
          progressContainer.appendChild(this.elements.progress);
          container.appendChild(progressContainer);
        }

        // Media current time display
        if (control === 'current-time') {
          container.appendChild(createTime.call(this, 'currentTime', defaultAttributes));
        }

        // Media duration display
        if (control === 'duration') {
          container.appendChild(createTime.call(this, 'duration', defaultAttributes));
        }

        // Volume controls
        if (control === 'mute' || control === 'volume') {
          let {
            volume
          } = this.elements;

          // Create the volume container if needed
          if (!is.element(volume) || !container.contains(volume)) {
            volume = createElement('div', extend({}, defaultAttributes, {
              class: `${defaultAttributes.class} plyr__volume`.trim()
            }));
            this.elements.volume = volume;
            container.appendChild(volume);
          }

          // Toggle mute button
          if (control === 'mute') {
            volume.appendChild(createButton.call(this, 'mute'));
          }

          // Volume range control
          // Ignored on iOS as it's handled globally
          // https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html
          if (control === 'volume' && !browser.isIos) {
            // Set the attributes
            const attributes = {
              max: 1,
              step: 0.05,
              value: this.config.volume
            };

            // Create the volume range slider
            volume.appendChild(createRange.call(this, 'volume', extend(attributes, {
              id: `plyr-volume-${data.id}`
            })));
          }
        }

        // Toggle captions button
        if (control === 'captions') {
          container.appendChild(createButton.call(this, 'captions', defaultAttributes));
        }

        // Settings button / menu
        if (control === 'settings' && !is.empty(this.config.settings)) {
          const wrapper = createElement('div', extend({}, defaultAttributes, {
            class: `${defaultAttributes.class} plyr__menu`.trim(),
            hidden: ''
          }));
          wrapper.appendChild(createButton.call(this, 'settings', {
            'aria-haspopup': true,
            'aria-controls': `plyr-settings-${data.id}`,
            'aria-expanded': false
          }));
          const popup = createElement('div', {
            class: 'plyr__menu__container',
            id: `plyr-settings-${data.id}`,
            hidden: ''
          });
          const inner = createElement('div');
          const home = createElement('div', {
            id: `plyr-settings-${data.id}-home`
          });

          // Create the menu
          const menu = createElement('div', {
            role: 'menu'
          });
          home.appendChild(menu);
          inner.appendChild(home);
          this.elements.settings.panels.home = home;

          // Build the menu items
          this.config.settings.forEach(type => {
            // TODO: bundle this with the createMenuItem helper and bindings
            const menuItem = createElement('button', extend(getAttributesFromSelector(this.config.selectors.buttons.settings), {
              type: 'button',
              class: `${this.config.classNames.control} ${this.config.classNames.control}--forward`,
              role: 'menuitem',
              'aria-haspopup': true,
              hidden: ''
            }));

            // Bind menu shortcuts for keyboard users
            bindMenuItemShortcuts.call(this, menuItem, type);

            // Show menu on click
            on.call(this, menuItem, 'click', () => {
              showMenuPanel.call(this, type, false);
            });
            const flex = createElement('span', null, i18n.get(type, this.config));
            const value = createElement('span', {
              class: this.config.classNames.menu.value
            });

            // Speed contains HTML entities
            value.innerHTML = data[type];
            flex.appendChild(value);
            menuItem.appendChild(flex);
            menu.appendChild(menuItem);

            // Build the panes
            const pane = createElement('div', {
              id: `plyr-settings-${data.id}-${type}`,
              hidden: ''
            });

            // Back button
            const backButton = createElement('button', {
              type: 'button',
              class: `${this.config.classNames.control} ${this.config.classNames.control}--back`
            });

            // Visible label
            backButton.appendChild(createElement('span', {
              'aria-hidden': true
            }, i18n.get(type, this.config)));

            // Screen reader label
            backButton.appendChild(createElement('span', {
              class: this.config.classNames.hidden
            }, i18n.get('menuBack', this.config)));

            // Go back via keyboard
            on.call(this, pane, 'keydown', event => {
              if (event.key !== 'ArrowLeft') return;

              // Prevent seek
              event.preventDefault();
              event.stopPropagation();

              // Show the respective menu
              showMenuPanel.call(this, 'home', true);
            }, false);

            // Go back via button click
            on.call(this, backButton, 'click', () => {
              showMenuPanel.call(this, 'home', false);
            });

            // Add to pane
            pane.appendChild(backButton);

            // Menu
            pane.appendChild(createElement('div', {
              role: 'menu'
            }));
            inner.appendChild(pane);
            this.elements.settings.buttons[type] = menuItem;
            this.elements.settings.panels[type] = pane;
          });
          popup.appendChild(inner);
          wrapper.appendChild(popup);
          container.appendChild(wrapper);
          this.elements.settings.popup = popup;
          this.elements.settings.menu = wrapper;
        }

        // Picture in picture button
        if (control === 'pip' && support.pip) {
          container.appendChild(createButton.call(this, 'pip', defaultAttributes));
        }

        // Airplay button
        if (control === 'airplay' && support.airplay) {
          container.appendChild(createButton.call(this, 'airplay', defaultAttributes));
        }

        // Download button
        if (control === 'download') {
          const attributes = extend({}, defaultAttributes, {
            element: 'a',
            href: this.download,
            target: '_blank'
          });

          // Set download attribute for HTML5 only
          if (this.isHTML5) {
            attributes.download = '';
          }
          const {
            download
          } = this.config.urls;
          if (!is.url(download) && this.isEmbed) {
            extend(attributes, {
              icon: `logo-${this.provider}`,
              label: this.provider
            });
          }
          container.appendChild(createButton.call(this, 'download', attributes));
        }

        // Toggle fullscreen button
        if (control === 'fullscreen') {
          container.appendChild(createButton.call(this, 'fullscreen', defaultAttributes));
        }
      });

      // Set available quality levels
      if (this.isHTML5) {
        setQualityMenu.call(this, html5.getQualityOptions.call(this));
      }
      setSpeedMenu.call(this);
      return container;
    },
    // Insert controls
    inject() {
      // Sprite
      if (this.config.loadSprite) {
        const icon = controls.getIconUrl.call(this);

        // Only load external sprite using AJAX
        if (icon.cors) {
          loadSprite(icon.url, 'sprite-plyr');
        }
      }

      // Create a unique ID
      this.id = Math.floor(Math.random() * 10000);

      // Null by default
      let container = null;
      this.elements.controls = null;

      // Set template properties
      const props = {
        id: this.id,
        seektime: this.config.seekTime,
        title: this.config.title
      };
      let update = true;

      // If function, run it and use output
      if (is.function(this.config.controls)) {
        this.config.controls = this.config.controls.call(this, props);
      }

      // Convert falsy controls to empty array (primarily for empty strings)
      if (!this.config.controls) {
        this.config.controls = [];
      }
      if (is.element(this.config.controls) || is.string(this.config.controls)) {
        // HTMLElement or Non-empty string passed as the option
        container = this.config.controls;
      } else {
        // Create controls
        container = controls.create.call(this, {
          id: this.id,
          seektime: this.config.seekTime,
          speed: this.speed,
          quality: this.quality,
          captions: captions.getLabel.call(this)
          // TODO: Looping
          // loop: 'None',
        });

        update = false;
      }

      // Replace props with their value
      const replace = input => {
        let result = input;
        Object.entries(props).forEach(([key, value]) => {
          result = replaceAll(result, `{${key}}`, value);
        });
        return result;
      };

      // Update markup
      if (update) {
        if (is.string(this.config.controls)) {
          container = replace(container);
        }
      }

      // Controls container
      let target;

      // Inject to custom location
      if (is.string(this.config.selectors.controls.container)) {
        target = document.querySelector(this.config.selectors.controls.container);
      }

      // Inject into the container by default
      if (!is.element(target)) {
        target = this.elements.container;
      }

      // Inject controls HTML (needs to be before captions, hence "afterbegin")
      const insertMethod = is.element(container) ? 'insertAdjacentElement' : 'insertAdjacentHTML';
      target[insertMethod]('afterbegin', container);

      // Find the elements if need be
      if (!is.element(this.elements.controls)) {
        controls.findElements.call(this);
      }

      // Add pressed property to buttons
      if (!is.empty(this.elements.buttons)) {
        const addProperty = button => {
          const className = this.config.classNames.controlPressed;
          button.setAttribute('aria-pressed', 'false');
          Object.defineProperty(button, 'pressed', {
            configurable: true,
            enumerable: true,
            get() {
              return hasClass(button, className);
            },
            set(pressed = false) {
              toggleClass(button, className, pressed);
              button.setAttribute('aria-pressed', pressed ? 'true' : 'false');
            }
          });
        };

        // Toggle classname when pressed property is set
        Object.values(this.elements.buttons).filter(Boolean).forEach(button => {
          if (is.array(button) || is.nodeList(button)) {
            Array.from(button).filter(Boolean).forEach(addProperty);
          } else {
            addProperty(button);
          }
        });
      }

      // Edge sometimes doesn't finish the paint so force a repaint
      if (browser.isEdge) {
        repaint(target);
      }

      // Setup tooltips
      if (this.config.tooltips.controls) {
        const {
          classNames,
          selectors
        } = this.config;
        const selector = `${selectors.controls.wrapper} ${selectors.labels} .${classNames.hidden}`;
        const labels = getElements.call(this, selector);
        Array.from(labels).forEach(label => {
          toggleClass(label, this.config.classNames.hidden, false);
          toggleClass(label, this.config.classNames.tooltip, true);
        });
      }
    },
    // Set media metadata
    setMediaMetadata() {
      try {
        if ('mediaSession' in navigator) {
          navigator.mediaSession.metadata = new window.MediaMetadata({
            title: this.config.mediaMetadata.title,
            artist: this.config.mediaMetadata.artist,
            album: this.config.mediaMetadata.album,
            artwork: this.config.mediaMetadata.artwork
          });
        }
      } catch (_) {
        // Do nothing
      }
    },
    // Add markers
    setMarkers() {
      var _this$config$markers2, _this$config$markers3;
      if (!this.duration || this.elements.markers) return;

      // Get valid points
      const points = (_this$config$markers2 = this.config.markers) === null || _this$config$markers2 === void 0 ? void 0 : (_this$config$markers3 = _this$config$markers2.points) === null || _this$config$markers3 === void 0 ? void 0 : _this$config$markers3.filter(({
        time
      }) => time > 0 && time < this.duration);
      if (!(points !== null && points !== void 0 && points.length)) return;
      const containerFragment = document.createDocumentFragment();
      const pointsFragment = document.createDocumentFragment();
      let tipElement = null;
      const tipVisible = `${this.config.classNames.tooltip}--visible`;
      const toggleTip = show => toggleClass(tipElement, tipVisible, show);

      // Inject markers to progress container
      points.forEach(point => {
        const markerElement = createElement('span', {
          class: this.config.classNames.marker
        }, '');
        const left = `${point.time / this.duration * 100}%`;
        if (tipElement) {
          // Show on hover
          markerElement.addEventListener('mouseenter', () => {
            if (point.label) return;
            tipElement.style.left = left;
            tipElement.innerHTML = point.label;
            toggleTip(true);
          });

          // Hide on leave
          markerElement.addEventListener('mouseleave', () => {
            toggleTip(false);
          });
        }
        markerElement.addEventListener('click', () => {
          this.currentTime = point.time;
        });
        markerElement.style.left = left;
        pointsFragment.appendChild(markerElement);
      });
      containerFragment.appendChild(pointsFragment);

      // Inject a tooltip if needed
      if (!this.config.tooltips.seek) {
        tipElement = createElement('span', {
          class: this.config.classNames.tooltip
        }, '');
        containerFragment.appendChild(tipElement);
      }
      this.elements.markers = {
        points: pointsFragment,
        tip: tipElement
      };
      this.elements.progress.appendChild(containerFragment);
    }
  };

  // ==========================================================================

  /**
   * Parse a string to a URL object
   * @param {String} input - the URL to be parsed
   * @param {Boolean} safe - failsafe parsing
   */
  function parseUrl(input, safe = true) {
    let url = input;
    if (safe) {
      const parser = document.createElement('a');
      parser.href = url;
      url = parser.href;
    }
    try {
      return new URL(url);
    } catch (_) {
      return null;
    }
  }

  // Convert object to URLSearchParams
  function buildUrlParams(input) {
    const params = new URLSearchParams();
    if (is.object(input)) {
      Object.entries(input).forEach(([key, value]) => {
        params.set(key, value);
      });
    }
    return params;
  }

  // ==========================================================================
  const captions = {
    // Setup captions
    setup() {
      // Requires UI support
      if (!this.supported.ui) {
        return;
      }

      // Only Vimeo and HTML5 video supported at this point
      if (!this.isVideo || this.isYouTube || this.isHTML5 && !support.textTracks) {
        // Clear menu and hide
        if (is.array(this.config.controls) && this.config.controls.includes('settings') && this.config.settings.includes('captions')) {
          controls.setCaptionsMenu.call(this);
        }
        return;
      }

      // Inject the container
      if (!is.element(this.elements.captions)) {
        this.elements.captions = createElement('div', getAttributesFromSelector(this.config.selectors.captions));
        this.elements.captions.setAttribute('dir', 'auto');
        insertAfter(this.elements.captions, this.elements.wrapper);
      }

      // Fix IE captions if CORS is used
      // Fetch captions and inject as blobs instead (data URIs not supported!)
      if (browser.isIE && window.URL) {
        const elements = this.media.querySelectorAll('track');
        Array.from(elements).forEach(track => {
          const src = track.getAttribute('src');
          const url = parseUrl(src);
          if (url !== null && url.hostname !== window.location.href.hostname && ['http:', 'https:'].includes(url.protocol)) {
            fetch(src, 'blob').then(blob => {
              track.setAttribute('src', window.URL.createObjectURL(blob));
            }).catch(() => {
              removeElement(track);
            });
          }
        });
      }

      // Get and set initial data
      // The "preferred" options are not realized unless / until the wanted language has a match
      // * languages: Array of user's browser languages.
      // * language:  The language preferred by user settings or config
      // * active:    The state preferred by user settings or config
      // * toggled:   The real captions state

      const browserLanguages = navigator.languages || [navigator.language || navigator.userLanguage || 'en'];
      const languages = dedupe(browserLanguages.map(language => language.split('-')[0]));
      let language = (this.storage.get('language') || this.config.captions.language || 'auto').toLowerCase();

      // Use first browser language when language is 'auto'
      if (language === 'auto') {
        [language] = languages;
      }
      let active = this.storage.get('captions');
      if (!is.boolean(active)) {
        ({
          active
        } = this.config.captions);
      }
      Object.assign(this.captions, {
        toggled: false,
        active,
        language,
        languages
      });

      // Watch changes to textTracks and update captions menu
      if (this.isHTML5) {
        const trackEvents = this.config.captions.update ? 'addtrack removetrack' : 'removetrack';
        on.call(this, this.media.textTracks, trackEvents, captions.update.bind(this));
      }

      // Update available languages in list next tick (the event must not be triggered before the listeners)
      setTimeout(captions.update.bind(this), 0);
    },
    // Update available language options in settings based on tracks
    update() {
      const tracks = captions.getTracks.call(this, true);
      // Get the wanted language
      const {
        active,
        language,
        meta,
        currentTrackNode
      } = this.captions;
      const languageExists = Boolean(tracks.find(track => track.language === language));

      // Handle tracks (add event listener and "pseudo"-default)
      if (this.isHTML5 && this.isVideo) {
        tracks.filter(track => !meta.get(track)).forEach(track => {
          this.debug.log('Track added', track);

          // Attempt to store if the original dom element was "default"
          meta.set(track, {
            default: track.mode === 'showing'
          });

          // Turn off native caption rendering to avoid double captions
          // Note: mode='hidden' forces a track to download. To ensure every track
          // isn't downloaded at once, only 'showing' tracks should be reassigned
          // eslint-disable-next-line no-param-reassign
          if (track.mode === 'showing') {
            // eslint-disable-next-line no-param-reassign
            track.mode = 'hidden';
          }

          // Add event listener for cue changes
          on.call(this, track, 'cuechange', () => captions.updateCues.call(this));
        });
      }

      // Update language first time it matches, or if the previous matching track was removed
      if (languageExists && this.language !== language || !tracks.includes(currentTrackNode)) {
        captions.setLanguage.call(this, language);
        captions.toggle.call(this, active && languageExists);
      }

      // Enable or disable captions based on track length
      if (this.elements) {
        toggleClass(this.elements.container, this.config.classNames.captions.enabled, !is.empty(tracks));
      }

      // Update available languages in list
      if (is.array(this.config.controls) && this.config.controls.includes('settings') && this.config.settings.includes('captions')) {
        controls.setCaptionsMenu.call(this);
      }
    },
    // Toggle captions display
    // Used internally for the toggleCaptions method, with the passive option forced to false
    toggle(input, passive = true) {
      // If there's no full support
      if (!this.supported.ui) {
        return;
      }
      const {
        toggled
      } = this.captions; // Current state
      const activeClass = this.config.classNames.captions.active;
      // Get the next state
      // If the method is called without parameter, toggle based on current value
      const active = is.nullOrUndefined(input) ? !toggled : input;

      // Update state and trigger event
      if (active !== toggled) {
        // When passive, don't override user preferences
        if (!passive) {
          this.captions.active = active;
          this.storage.set({
            captions: active
          });
        }

        // Force language if the call isn't passive and there is no matching language to toggle to
        if (!this.language && active && !passive) {
          const tracks = captions.getTracks.call(this);
          const track = captions.findTrack.call(this, [this.captions.language, ...this.captions.languages], true);

          // Override user preferences to avoid switching languages if a matching track is added
          this.captions.language = track.language;

          // Set caption, but don't store in localStorage as user preference
          captions.set.call(this, tracks.indexOf(track));
          return;
        }

        // Toggle button if it's enabled
        if (this.elements.buttons.captions) {
          this.elements.buttons.captions.pressed = active;
        }

        // Add class hook
        toggleClass(this.elements.container, activeClass, active);
        this.captions.toggled = active;

        // Update settings menu
        controls.updateSetting.call(this, 'captions');

        // Trigger event (not used internally)
        triggerEvent.call(this, this.media, active ? 'captionsenabled' : 'captionsdisabled');
      }

      // Wait for the call stack to clear before setting mode='hidden'
      // on the active track - forcing the browser to download it
      setTimeout(() => {
        if (active && this.captions.toggled) {
          this.captions.currentTrackNode.mode = 'hidden';
        }
      });
    },
    // Set captions by track index
    // Used internally for the currentTrack setter with the passive option forced to false
    set(index, passive = true) {
      const tracks = captions.getTracks.call(this);

      // Disable captions if setting to -1
      if (index === -1) {
        captions.toggle.call(this, false, passive);
        return;
      }
      if (!is.number(index)) {
        this.debug.warn('Invalid caption argument', index);
        return;
      }
      if (!(index in tracks)) {
        this.debug.warn('Track not found', index);
        return;
      }
      if (this.captions.currentTrack !== index) {
        this.captions.currentTrack = index;
        const track = tracks[index];
        const {
          language
        } = track || {};

        // Store reference to node for invalidation on remove
        this.captions.currentTrackNode = track;

        // Update settings menu
        controls.updateSetting.call(this, 'captions');

        // When passive, don't override user preferences
        if (!passive) {
          this.captions.language = language;
          this.storage.set({
            language
          });
        }

        // Handle Vimeo captions
        if (this.isVimeo) {
          this.embed.enableTextTrack(language);
        }

        // Trigger event
        triggerEvent.call(this, this.media, 'languagechange');
      }

      // Show captions
      captions.toggle.call(this, true, passive);
      if (this.isHTML5 && this.isVideo) {
        // If we change the active track while a cue is already displayed we need to update it
        captions.updateCues.call(this);
      }
    },
    // Set captions by language
    // Used internally for the language setter with the passive option forced to false
    setLanguage(input, passive = true) {
      if (!is.string(input)) {
        this.debug.warn('Invalid language argument', input);
        return;
      }
      // Normalize
      const language = input.toLowerCase();
      this.captions.language = language;

      // Set currentTrack
      const tracks = captions.getTracks.call(this);
      const track = captions.findTrack.call(this, [language]);
      captions.set.call(this, tracks.indexOf(track), passive);
    },
    // Get current valid caption tracks
    // If update is false it will also ignore tracks without metadata
    // This is used to "freeze" the language options when captions.update is false
    getTracks(update = false) {
      // Handle media or textTracks missing or null
      const tracks = Array.from((this.media || {}).textTracks || []);
      // For HTML5, use cache instead of current tracks when it exists (if captions.update is false)
      // Filter out removed tracks and tracks that aren't captions/subtitles (for example metadata)
      return tracks.filter(track => !this.isHTML5 || update || this.captions.meta.has(track)).filter(track => ['captions', 'subtitles'].includes(track.kind));
    },
    // Match tracks based on languages and get the first
    findTrack(languages, force = false) {
      const tracks = captions.getTracks.call(this);
      const sortIsDefault = track => Number((this.captions.meta.get(track) || {}).default);
      const sorted = Array.from(tracks).sort((a, b) => sortIsDefault(b) - sortIsDefault(a));
      let track;
      languages.every(language => {
        track = sorted.find(t => t.language === language);
        return !track; // Break iteration if there is a match
      });

      // If no match is found but is required, get first
      return track || (force ? sorted[0] : undefined);
    },
    // Get the current track
    getCurrentTrack() {
      return captions.getTracks.call(this)[this.currentTrack];
    },
    // Get UI label for track
    getLabel(track) {
      let currentTrack = track;
      if (!is.track(currentTrack) && support.textTracks && this.captions.toggled) {
        currentTrack = captions.getCurrentTrack.call(this);
      }
      if (is.track(currentTrack)) {
        if (!is.empty(currentTrack.label)) {
          return currentTrack.label;
        }
        if (!is.empty(currentTrack.language)) {
          return track.language.toUpperCase();
        }
        return i18n.get('enabled', this.config);
      }
      return i18n.get('disabled', this.config);
    },
    // Update captions using current track's active cues
    // Also optional array argument in case there isn't any track (ex: vimeo)
    updateCues(input) {
      // Requires UI
      if (!this.supported.ui) {
        return;
      }
      if (!is.element(this.elements.captions)) {
        this.debug.warn('No captions element to render to');
        return;
      }

      // Only accept array or empty input
      if (!is.nullOrUndefined(input) && !Array.isArray(input)) {
        this.debug.warn('updateCues: Invalid input', input);
        return;
      }
      let cues = input;

      // Get cues from track
      if (!cues) {
        const track = captions.getCurrentTrack.call(this);
        cues = Array.from((track || {}).activeCues || []).map(cue => cue.getCueAsHTML()).map(getHTML);
      }

      // Set new caption text
      const content = cues.map(cueText => cueText.trim()).join('\n');
      const changed = content !== this.elements.captions.innerHTML;
      if (changed) {
        // Empty the container and create a new child element
        emptyElement(this.elements.captions);
        const caption = createElement('span', getAttributesFromSelector(this.config.selectors.caption));
        caption.innerHTML = content;
        this.elements.captions.appendChild(caption);

        // Trigger event
        triggerEvent.call(this, this.media, 'cuechange');
      }
    }
  };

  // ==========================================================================
  // Plyr default config
  // ==========================================================================

  const defaults = {
    // Disable
    enabled: true,
    // Custom media title
    title: '',
    // Logging to console
    debug: false,
    // Auto play (if supported)
    autoplay: false,
    // Only allow one media playing at once (vimeo only)
    autopause: true,
    // Allow inline playback on iOS (this effects YouTube/Vimeo - HTML5 requires the attribute present)
    // TODO: Remove iosNative fullscreen option in favour of this (logic needs work)
    playsinline: true,
    // Default time to skip when rewind/fast forward
    seekTime: 10,
    // Default volume
    volume: 1,
    muted: false,
    // Pass a custom duration
    duration: null,
    // Display the media duration on load in the current time position
    // If you have opted to display both duration and currentTime, this is ignored
    displayDuration: true,
    // Invert the current time to be a countdown
    invertTime: true,
    // Clicking the currentTime inverts it's value to show time left rather than elapsed
    toggleInvert: true,
    // Force an aspect ratio
    // The format must be `'w:h'` (e.g. `'16:9'`)
    ratio: null,
    // Click video container to play/pause
    clickToPlay: true,
    // Auto hide the controls
    hideControls: true,
    // Reset to start when playback ended
    resetOnEnd: false,
    // Disable the standard context menu
    disableContextMenu: true,
    // Sprite (for icons)
    loadSprite: true,
    iconPrefix: 'plyr',
    iconUrl: 'https://cdn.plyr.io/3.7.3/plyr.svg',
    // Blank video (used to prevent errors on source change)
    blankVideo: 'https://cdn.plyr.io/static/blank.mp4',
    // Quality default
    quality: {
      default: 576,
      // The options to display in the UI, if available for the source media
      options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
      forced: false,
      onChange: null
    },
    // Set loops
    loop: {
      active: false
      // start: null,
      // end: null,
    },

    // Speed default and options to display
    speed: {
      selected: 1,
      // The options to display in the UI, if available for the source media (e.g. Vimeo and YouTube only support 0.5x-4x)
      options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4]
    },
    // Keyboard shortcut settings
    keyboard: {
      focused: true,
      global: false
    },
    // Display tooltips
    tooltips: {
      controls: false,
      seek: true
    },
    // Captions settings
    captions: {
      active: false,
      language: 'auto',
      // Listen to new tracks added after Plyr is initialized.
      // This is needed for streaming captions, but may result in unselectable options
      update: false
    },
    // Fullscreen settings
    fullscreen: {
      enabled: true,
      // Allow fullscreen?
      fallback: true,
      // Fallback using full viewport/window
      iosNative: false // Use the native fullscreen in iOS (disables custom controls)
      // Selector for the fullscreen container so contextual / non-player content can remain visible in fullscreen mode
      // Non-ancestors of the player element will be ignored
      // container: null, // defaults to the player element
    },

    // Local storage
    storage: {
      enabled: true,
      key: 'plyr'
    },
    // Default controls
    controls: ['play-large',
    // 'restart',
    // 'rewind',
    'play',
    // 'fast-forward',
    'progress', 'current-time',
    // 'duration',
    'mute', 'volume', 'captions', 'settings', 'pip', 'airplay',
    // 'download',
    'fullscreen'],
    settings: ['captions', 'quality', 'speed'],
    // Localisation
    i18n: {
      restart: 'Restart',
      rewind: 'Rewind {seektime}s',
      play: 'Play',
      pause: 'Pause',
      fastForward: 'Forward {seektime}s',
      seek: 'Seek',
      seekLabel: '{currentTime} of {duration}',
      played: 'Played',
      buffered: 'Buffered',
      currentTime: 'Current time',
      duration: 'Duration',
      volume: 'Volume',
      mute: 'Mute',
      unmute: 'Unmute',
      enableCaptions: 'Enable captions',
      disableCaptions: 'Disable captions',
      download: 'Download',
      enterFullscreen: 'Enter fullscreen',
      exitFullscreen: 'Exit fullscreen',
      frameTitle: 'Player for {title}',
      captions: 'Captions',
      settings: 'Settings',
      pip: 'PIP',
      menuBack: 'Go back to previous menu',
      speed: 'Speed',
      normal: 'Normal',
      quality: 'Quality',
      loop: 'Loop',
      start: 'Start',
      end: 'End',
      all: 'All',
      reset: 'Reset',
      disabled: 'Disabled',
      enabled: 'Enabled',
      advertisement: 'Ad',
      qualityBadge: {
        2160: '4K',
        1440: 'HD',
        1080: 'HD',
        720: 'HD',
        576: 'SD',
        480: 'SD'
      }
    },
    // URLs
    urls: {
      download: null,
      vimeo: {
        sdk: 'https://player.vimeo.com/api/player.js',
        iframe: 'https://player.vimeo.com/video/{0}?{1}',
        api: 'https://vimeo.com/api/oembed.json?url={0}'
      },
      youtube: {
        sdk: 'https://www.youtube.com/iframe_api',
        api: 'https://noembed.com/embed?url=https://www.youtube.com/watch?v={0}'
      },
      googleIMA: {
        sdk: 'https://imasdk.googleapis.com/js/sdkloader/ima3.js'
      }
    },
    // Custom control listeners
    listeners: {
      seek: null,
      play: null,
      pause: null,
      restart: null,
      rewind: null,
      fastForward: null,
      mute: null,
      volume: null,
      captions: null,
      download: null,
      fullscreen: null,
      pip: null,
      airplay: null,
      speed: null,
      quality: null,
      loop: null,
      language: null
    },
    // Events to watch and bubble
    events: [
    // Events to watch on HTML5 media elements and bubble
    // https://developer.mozilla.org/en/docs/Web/Guide/Events/Media_events
    'ended', 'progress', 'stalled', 'playing', 'waiting', 'canplay', 'canplaythrough', 'loadstart', 'loadeddata', 'loadedmetadata', 'timeupdate', 'volumechange', 'play', 'pause', 'error', 'seeking', 'seeked', 'emptied', 'ratechange', 'cuechange',
    // Custom events
    'download', 'enterfullscreen', 'exitfullscreen', 'captionsenabled', 'captionsdisabled', 'languagechange', 'controlshidden', 'controlsshown', 'ready',
    // YouTube
    'statechange',
    // Quality
    'qualitychange',
    // Ads
    'adsloaded', 'adscontentpause', 'adscontentresume', 'adstarted', 'adsmidpoint', 'adscomplete', 'adsallcomplete', 'adsimpression', 'adsclick'],
    // Selectors
    // Change these to match your template if using custom HTML
    selectors: {
      editable: 'input, textarea, select, [contenteditable]',
      container: '.plyr',
      controls: {
        container: null,
        wrapper: '.plyr__controls'
      },
      labels: '[data-plyr]',
      buttons: {
        play: '[data-plyr="play"]',
        pause: '[data-plyr="pause"]',
        restart: '[data-plyr="restart"]',
        rewind: '[data-plyr="rewind"]',
        fastForward: '[data-plyr="fast-forward"]',
        mute: '[data-plyr="mute"]',
        captions: '[data-plyr="captions"]',
        download: '[data-plyr="download"]',
        fullscreen: '[data-plyr="fullscreen"]',
        pip: '[data-plyr="pip"]',
        airplay: '[data-plyr="airplay"]',
        settings: '[data-plyr="settings"]',
        loop: '[data-plyr="loop"]'
      },
      inputs: {
        seek: '[data-plyr="seek"]',
        volume: '[data-plyr="volume"]',
        speed: '[data-plyr="speed"]',
        language: '[data-plyr="language"]',
        quality: '[data-plyr="quality"]'
      },
      display: {
        currentTime: '.plyr__time--current',
        duration: '.plyr__time--duration',
        buffer: '.plyr__progress__buffer',
        loop: '.plyr__progress__loop',
        // Used later
        volume: '.plyr__volume--display'
      },
      progress: '.plyr__progress',
      captions: '.plyr__captions',
      caption: '.plyr__caption'
    },
    // Class hooks added to the player in different states
    classNames: {
      type: 'plyr--{0}',
      provider: 'plyr--{0}',
      video: 'plyr__video-wrapper',
      embed: 'plyr__video-embed',
      videoFixedRatio: 'plyr__video-wrapper--fixed-ratio',
      embedContainer: 'plyr__video-embed__container',
      poster: 'plyr__poster',
      posterEnabled: 'plyr__poster-enabled',
      ads: 'plyr__ads',
      control: 'plyr__control',
      controlPressed: 'plyr__control--pressed',
      playing: 'plyr--playing',
      paused: 'plyr--paused',
      stopped: 'plyr--stopped',
      loading: 'plyr--loading',
      hover: 'plyr--hover',
      tooltip: 'plyr__tooltip',
      cues: 'plyr__cues',
      marker: 'plyr__progress__marker',
      hidden: 'plyr__sr-only',
      hideControls: 'plyr--hide-controls',
      isIos: 'plyr--is-ios',
      isTouch: 'plyr--is-touch',
      uiSupported: 'plyr--full-ui',
      noTransition: 'plyr--no-transition',
      display: {
        time: 'plyr__time'
      },
      menu: {
        value: 'plyr__menu__value',
        badge: 'plyr__badge',
        open: 'plyr--menu-open'
      },
      captions: {
        enabled: 'plyr--captions-enabled',
        active: 'plyr--captions-active'
      },
      fullscreen: {
        enabled: 'plyr--fullscreen-enabled',
        fallback: 'plyr--fullscreen-fallback'
      },
      pip: {
        supported: 'plyr--pip-supported',
        active: 'plyr--pip-active'
      },
      airplay: {
        supported: 'plyr--airplay-supported',
        active: 'plyr--airplay-active'
      },
      tabFocus: 'plyr__tab-focus',
      previewThumbnails: {
        // Tooltip thumbs
        thumbContainer: 'plyr__preview-thumb',
        thumbContainerShown: 'plyr__preview-thumb--is-shown',
        imageContainer: 'plyr__preview-thumb__image-container',
        timeContainer: 'plyr__preview-thumb__time-container',
        // Scrubbing
        scrubbingContainer: 'plyr__preview-scrubbing',
        scrubbingContainerShown: 'plyr__preview-scrubbing--is-shown'
      }
    },
    // Embed attributes
    attributes: {
      embed: {
        provider: 'data-plyr-provider',
        id: 'data-plyr-embed-id',
        hash: 'data-plyr-embed-hash'
      }
    },
    // Advertisements plugin
    // Register for an account here: http://vi.ai/publisher-video-monetization/?aid=plyrio
    ads: {
      enabled: false,
      publisherId: '',
      tagUrl: ''
    },
    // Preview Thumbnails plugin
    previewThumbnails: {
      enabled: false,
      src: ''
    },
    // Vimeo plugin
    vimeo: {
      byline: false,
      portrait: false,
      title: false,
      speed: true,
      transparent: false,
      // Custom settings from Plyr
      customControls: true,
      referrerPolicy: null,
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/referrerPolicy
      // Whether the owner of the video has a Pro or Business account
      // (which allows us to properly hide controls without CSS hacks, etc)
      premium: false
    },
    // YouTube plugin
    youtube: {
      rel: 0,
      // No related vids
      showinfo: 0,
      // Hide info
      iv_load_policy: 3,
      // Hide annotations
      modestbranding: 1,
      // Hide logos as much as possible (they still show one in the corner when paused)
      // Custom settings from Plyr
      customControls: true,
      noCookie: false // Whether to use an alternative version of YouTube without cookies
    },

    // Media Metadata
    mediaMetadata: {
      title: '',
      artist: '',
      album: '',
      artwork: []
    },
    // Markers
    markers: {
      enabled: false,
      points: []
    }
  };

  // ==========================================================================
  // Plyr states
  // ==========================================================================

  const pip = {
    active: 'picture-in-picture',
    inactive: 'inline'
  };

  // ==========================================================================
  // Plyr supported types and providers
  // ==========================================================================

  const providers = {
    html5: 'html5',
    youtube: 'youtube',
    vimeo: 'vimeo'
  };
  const types = {
    audio: 'audio',
    video: 'video'
  };

  /**
   * Get provider by URL
   * @param {String} url
   */
  function getProviderByUrl(url) {
    // YouTube
    if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(url)) {
      return providers.youtube;
    }

    // Vimeo
    if (/^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(url)) {
      return providers.vimeo;
    }
    return null;
  }

  // ==========================================================================
  // Console wrapper
  // ==========================================================================

  const noop = () => {};
  class Console {
    constructor(enabled = false) {
      this.enabled = window.console && enabled;
      if (this.enabled) {
        this.log('Debugging enabled');
      }
    }
    get log() {
      // eslint-disable-next-line no-console
      return this.enabled ? Function.prototype.bind.call(console.log, console) : noop;
    }
    get warn() {
      // eslint-disable-next-line no-console
      return this.enabled ? Function.prototype.bind.call(console.warn, console) : noop;
    }
    get error() {
      // eslint-disable-next-line no-console
      return this.enabled ? Function.prototype.bind.call(console.error, console) : noop;
    }
  }

  class Fullscreen {
    constructor(player) {
      _defineProperty$1(this, "onChange", () => {
        if (!this.enabled) {
          return;
        }

        // Update toggle button
        const button = this.player.elements.buttons.fullscreen;
        if (is.element(button)) {
          button.pressed = this.active;
        }

        // Always trigger events on the plyr / media element (not a fullscreen container) and let them bubble up
        const target = this.target === this.player.media ? this.target : this.player.elements.container;
        // Trigger an event
        triggerEvent.call(this.player, target, this.active ? 'enterfullscreen' : 'exitfullscreen', true);
      });
      _defineProperty$1(this, "toggleFallback", (toggle = false) => {
        // Store or restore scroll position
        if (toggle) {
          this.scrollPosition = {
            x: window.scrollX || 0,
            y: window.scrollY || 0
          };
        } else {
          window.scrollTo(this.scrollPosition.x, this.scrollPosition.y);
        }

        // Toggle scroll
        document.body.style.overflow = toggle ? 'hidden' : '';

        // Toggle class hook
        toggleClass(this.target, this.player.config.classNames.fullscreen.fallback, toggle);

        // Force full viewport on iPhone X+
        if (browser.isIos) {
          let viewport = document.head.querySelector('meta[name="viewport"]');
          const property = 'viewport-fit=cover';

          // Inject the viewport meta if required
          if (!viewport) {
            viewport = document.createElement('meta');
            viewport.setAttribute('name', 'viewport');
          }

          // Check if the property already exists
          const hasProperty = is.string(viewport.content) && viewport.content.includes(property);
          if (toggle) {
            this.cleanupViewport = !hasProperty;
            if (!hasProperty) {
              viewport.content += `,${property}`;
            }
          } else if (this.cleanupViewport) {
            viewport.content = viewport.content.split(',').filter(part => part.trim() !== property).join(',');
          }
        }

        // Toggle button and fire events
        this.onChange();
      });
      _defineProperty$1(this, "trapFocus", event => {
        // Bail if iOS, not active, not the tab key
        if (browser.isIos || !this.active || event.key !== 'Tab') {
          return;
        }

        // Get the current focused element
        const focused = document.activeElement;
        const focusable = getElements.call(this.player, 'a[href], button:not(:disabled), input:not(:disabled), [tabindex]');
        const [first] = focusable;
        const last = focusable[focusable.length - 1];
        if (focused === last && !event.shiftKey) {
          // Move focus to first element that can be tabbed if Shift isn't used
          first.focus();
          event.preventDefault();
        } else if (focused === first && event.shiftKey) {
          // Move focus to last element that can be tabbed if Shift is used
          last.focus();
          event.preventDefault();
        }
      });
      _defineProperty$1(this, "update", () => {
        if (this.enabled) {
          let mode;
          if (this.forceFallback) {
            mode = 'Fallback (forced)';
          } else if (Fullscreen.native) {
            mode = 'Native';
          } else {
            mode = 'Fallback';
          }
          this.player.debug.log(`${mode} fullscreen enabled`);
        } else {
          this.player.debug.log('Fullscreen not supported and fallback disabled');
        }

        // Add styling hook to show button
        toggleClass(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled);
      });
      _defineProperty$1(this, "enter", () => {
        if (!this.enabled) {
          return;
        }

        // iOS native fullscreen doesn't need the request step
        if (browser.isIos && this.player.config.fullscreen.iosNative) {
          if (this.player.isVimeo) {
            this.player.embed.requestFullscreen();
          } else {
            this.target.webkitEnterFullscreen();
          }
        } else if (!Fullscreen.native || this.forceFallback) {
          this.toggleFallback(true);
        } else if (!this.prefix) {
          this.target.requestFullscreen({
            navigationUI: 'hide'
          });
        } else if (!is.empty(this.prefix)) {
          this.target[`${this.prefix}Request${this.property}`]();
        }
      });
      _defineProperty$1(this, "exit", () => {
        if (!this.enabled) {
          return;
        }

        // iOS native fullscreen
        if (browser.isIos && this.player.config.fullscreen.iosNative) {
          this.target.webkitExitFullscreen();
          silencePromise(this.player.play());
        } else if (!Fullscreen.native || this.forceFallback) {
          this.toggleFallback(false);
        } else if (!this.prefix) {
          (document.cancelFullScreen || document.exitFullscreen).call(document);
        } else if (!is.empty(this.prefix)) {
          const action = this.prefix === 'moz' ? 'Cancel' : 'Exit';
          document[`${this.prefix}${action}${this.property}`]();
        }
      });
      _defineProperty$1(this, "toggle", () => {
        if (!this.active) {
          this.enter();
        } else {
          this.exit();
        }
      });
      // Keep reference to parent
      this.player = player;

      // Get prefix
      this.prefix = Fullscreen.prefix;
      this.property = Fullscreen.property;

      // Scroll position
      this.scrollPosition = {
        x: 0,
        y: 0
      };

      // Force the use of 'full window/browser' rather than fullscreen
      this.forceFallback = player.config.fullscreen.fallback === 'force';

      // Get the fullscreen element
      // Checks container is an ancestor, defaults to null
      this.player.elements.fullscreen = player.config.fullscreen.container && closest$1(this.player.elements.container, player.config.fullscreen.container);

      // Register event listeners
      // Handle event (incase user presses escape etc)
      on.call(this.player, document, this.prefix === 'ms' ? 'MSFullscreenChange' : `${this.prefix}fullscreenchange`, () => {
        // TODO: Filter for target??
        this.onChange();
      });

      // Fullscreen toggle on double click
      on.call(this.player, this.player.elements.container, 'dblclick', event => {
        // Ignore double click in controls
        if (is.element(this.player.elements.controls) && this.player.elements.controls.contains(event.target)) {
          return;
        }
        this.player.listeners.proxy(event, this.toggle, 'fullscreen');
      });

      // Tap focus when in fullscreen
      on.call(this, this.player.elements.container, 'keydown', event => this.trapFocus(event));

      // Update the UI
      this.update();

      // this.toggle = this.toggle.bind(this);
    }

    // Determine if native supported
    static get native() {
      return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled);
    }

    // If we're actually using native
    get usingNative() {
      return Fullscreen.native && !this.forceFallback;
    }

    // Get the prefix for handlers
    static get prefix() {
      // No prefix
      if (is.function(document.exitFullscreen)) {
        return '';
      }

      // Check for fullscreen support by vendor prefix
      let value = '';
      const prefixes = ['webkit', 'moz', 'ms'];
      prefixes.some(pre => {
        if (is.function(document[`${pre}ExitFullscreen`]) || is.function(document[`${pre}CancelFullScreen`])) {
          value = pre;
          return true;
        }
        return false;
      });
      return value;
    }
    static get property() {
      return this.prefix === 'moz' ? 'FullScreen' : 'Fullscreen';
    }

    // Determine if fullscreen is enabled
    get enabled() {
      return (Fullscreen.native || this.player.config.fullscreen.fallback) && this.player.config.fullscreen.enabled && this.player.supported.ui && this.player.isVideo;
    }

    // Get active state
    get active() {
      if (!this.enabled) {
        return false;
      }

      // Fallback using classname
      if (!Fullscreen.native || this.forceFallback) {
        return hasClass(this.target, this.player.config.classNames.fullscreen.fallback);
      }
      const element = !this.prefix ? this.target.getRootNode().fullscreenElement : this.target.getRootNode()[`${this.prefix}${this.property}Element`];
      return element && element.shadowRoot ? element === this.target.getRootNode().host : element === this.target;
    }

    // Get target element
    get target() {
      return browser.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.fullscreen || this.player.elements.container;
    }
  }

  // ==========================================================================
  // Load image avoiding xhr/fetch CORS issues
  // Server status can't be obtained this way unfortunately, so this uses "naturalWidth" to determine if the image has loaded
  // By default it checks if it is at least 1px, but you can add a second argument to change this
  // ==========================================================================

  function loadImage(src, minWidth = 1) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      const handler = () => {
        delete image.onload;
        delete image.onerror;
        (image.naturalWidth >= minWidth ? resolve : reject)(image);
      };
      Object.assign(image, {
        onload: handler,
        onerror: handler,
        src
      });
    });
  }

  // ==========================================================================
  const ui = {
    addStyleHook() {
      toggleClass(this.elements.container, this.config.selectors.container.replace('.', ''), true);
      toggleClass(this.elements.container, this.config.classNames.uiSupported, this.supported.ui);
    },
    // Toggle native HTML5 media controls
    toggleNativeControls(toggle = false) {
      if (toggle && this.isHTML5) {
        this.media.setAttribute('controls', '');
      } else {
        this.media.removeAttribute('controls');
      }
    },
    // Setup the UI
    build() {
      // Re-attach media element listeners
      // TODO: Use event bubbling?
      this.listeners.media();

      // Don't setup interface if no support
      if (!this.supported.ui) {
        this.debug.warn(`Basic support only for ${this.provider} ${this.type}`);

        // Restore native controls
        ui.toggleNativeControls.call(this, true);

        // Bail
        return;
      }

      // Inject custom controls if not present
      if (!is.element(this.elements.controls)) {
        // Inject custom controls
        controls.inject.call(this);

        // Re-attach control listeners
        this.listeners.controls();
      }

      // Remove native controls
      ui.toggleNativeControls.call(this);

      // Setup captions for HTML5
      if (this.isHTML5) {
        captions.setup.call(this);
      }

      // Reset volume
      this.volume = null;

      // Reset mute state
      this.muted = null;

      // Reset loop state
      this.loop = null;

      // Reset quality setting
      this.quality = null;

      // Reset speed
      this.speed = null;

      // Reset volume display
      controls.updateVolume.call(this);

      // Reset time display
      controls.timeUpdate.call(this);

      // Reset duration display
      controls.durationUpdate.call(this);

      // Update the UI
      ui.checkPlaying.call(this);

      // Check for picture-in-picture support
      toggleClass(this.elements.container, this.config.classNames.pip.supported, support.pip && this.isHTML5 && this.isVideo);

      // Check for airplay support
      toggleClass(this.elements.container, this.config.classNames.airplay.supported, support.airplay && this.isHTML5);

      // Add iOS class
      toggleClass(this.elements.container, this.config.classNames.isIos, browser.isIos);

      // Add touch class
      toggleClass(this.elements.container, this.config.classNames.isTouch, this.touch);

      // Ready for API calls
      this.ready = true;

      // Ready event at end of execution stack
      setTimeout(() => {
        triggerEvent.call(this, this.media, 'ready');
      }, 0);

      // Set the title
      ui.setTitle.call(this);

      // Assure the poster image is set, if the property was added before the element was created
      if (this.poster) {
        ui.setPoster.call(this, this.poster, false).catch(() => {});
      }

      // Manually set the duration if user has overridden it.
      // The event listeners for it doesn't get called if preload is disabled (#701)
      if (this.config.duration) {
        controls.durationUpdate.call(this);
      }

      // Media metadata
      if (this.config.mediaMetadata) {
        controls.setMediaMetadata.call(this);
      }
    },
    // Setup aria attribute for play and iframe title
    setTitle() {
      // Find the current text
      let label = i18n.get('play', this.config);

      // If there's a media title set, use that for the label
      if (is.string(this.config.title) && !is.empty(this.config.title)) {
        label += `, ${this.config.title}`;
      }

      // If there's a play button, set label
      Array.from(this.elements.buttons.play || []).forEach(button => {
        button.setAttribute('aria-label', label);
      });

      // Set iframe title
      // https://github.com/sampotts/plyr/issues/124
      if (this.isEmbed) {
        const iframe = getElement.call(this, 'iframe');
        if (!is.element(iframe)) {
          return;
        }

        // Default to media type
        const title = !is.empty(this.config.title) ? this.config.title : 'video';
        const format = i18n.get('frameTitle', this.config);
        iframe.setAttribute('title', format.replace('{title}', title));
      }
    },
    // Toggle poster
    togglePoster(enable) {
      toggleClass(this.elements.container, this.config.classNames.posterEnabled, enable);
    },
    // Set the poster image (async)
    // Used internally for the poster setter, with the passive option forced to false
    setPoster(poster, passive = true) {
      // Don't override if call is passive
      if (passive && this.poster) {
        return Promise.reject(new Error('Poster already set'));
      }

      // Set property synchronously to respect the call order
      this.media.setAttribute('data-poster', poster);

      // Show the poster
      this.elements.poster.removeAttribute('hidden');

      // Wait until ui is ready
      return ready.call(this)
      // Load image
      .then(() => loadImage(poster)).catch(error => {
        // Hide poster on error unless it's been set by another call
        if (poster === this.poster) {
          ui.togglePoster.call(this, false);
        }
        // Rethrow
        throw error;
      }).then(() => {
        // Prevent race conditions
        if (poster !== this.poster) {
          throw new Error('setPoster cancelled by later call to setPoster');
        }
      }).then(() => {
        Object.assign(this.elements.poster.style, {
          backgroundImage: `url('${poster}')`,
          // Reset backgroundSize as well (since it can be set to "cover" for padded thumbnails for youtube)
          backgroundSize: ''
        });
        ui.togglePoster.call(this, true);
        return poster;
      });
    },
    // Check playing state
    checkPlaying(event) {
      // Class hooks
      toggleClass(this.elements.container, this.config.classNames.playing, this.playing);
      toggleClass(this.elements.container, this.config.classNames.paused, this.paused);
      toggleClass(this.elements.container, this.config.classNames.stopped, this.stopped);

      // Set state
      Array.from(this.elements.buttons.play || []).forEach(target => {
        Object.assign(target, {
          pressed: this.playing
        });
        target.setAttribute('aria-label', i18n.get(this.playing ? 'pause' : 'play', this.config));
      });

      // Only update controls on non timeupdate events
      if (is.event(event) && event.type === 'timeupdate') {
        return;
      }

      // Toggle controls
      ui.toggleControls.call(this);
    },
    // Check if media is loading
    checkLoading(event) {
      this.loading = ['stalled', 'waiting'].includes(event.type);

      // Clear timer
      clearTimeout(this.timers.loading);

      // Timer to prevent flicker when seeking
      this.timers.loading = setTimeout(() => {
        // Update progress bar loading class state
        toggleClass(this.elements.container, this.config.classNames.loading, this.loading);

        // Update controls visibility
        ui.toggleControls.call(this);
      }, this.loading ? 250 : 0);
    },
    // Toggle controls based on state and `force` argument
    toggleControls(force) {
      const {
        controls: controlsElement
      } = this.elements;
      if (controlsElement && this.config.hideControls) {
        // Don't hide controls if a touch-device user recently seeked. (Must be limited to touch devices, or it occasionally prevents desktop controls from hiding.)
        const recentTouchSeek = this.touch && this.lastSeekTime + 2000 > Date.now();

        // Show controls if force, loading, paused, button interaction, or recent seek, otherwise hide
        this.toggleControls(Boolean(force || this.loading || this.paused || controlsElement.pressed || controlsElement.hover || recentTouchSeek));
      }
    },
    // Migrate any custom properties from the media to the parent
    migrateStyles() {
      // Loop through values (as they are the keys when the object is spread 🤔)
      Object.values({
        ...this.media.style
      })
      // We're only fussed about Plyr specific properties
      .filter(key => !is.empty(key) && is.string(key) && key.startsWith('--plyr')).forEach(key => {
        // Set on the container
        this.elements.container.style.setProperty(key, this.media.style.getPropertyValue(key));

        // Clean up from media element
        this.media.style.removeProperty(key);
      });

      // Remove attribute if empty
      if (is.empty(this.media.style)) {
        this.media.removeAttribute('style');
      }
    }
  };

  class Listeners {
    constructor(_player) {
      _defineProperty$1(this, "firstTouch", () => {
        const {
          player
        } = this;
        const {
          elements
        } = player;
        player.touch = true;

        // Add touch class
        toggleClass(elements.container, player.config.classNames.isTouch, true);
      });
      _defineProperty$1(this, "setTabFocus", event => {
        const {
          player
        } = this;
        const {
          elements
        } = player;
        const {
          key,
          type,
          timeStamp
        } = event;
        clearTimeout(this.focusTimer);

        // Ignore any key other than tab
        if (type === 'keydown' && key !== 'Tab') {
          return;
        }

        // Store reference to event timeStamp
        if (type === 'keydown') {
          this.lastKeyDown = timeStamp;
        }

        // Remove current classes
        const removeCurrent = () => {
          const className = player.config.classNames.tabFocus;
          const current = getElements.call(player, `.${className}`);
          toggleClass(current, className, false);
        };

        // Determine if a key was pressed to trigger this event
        const wasKeyDown = timeStamp - this.lastKeyDown <= 20;

        // Ignore focus events if a key was pressed prior
        if (type === 'focus' && !wasKeyDown) {
          return;
        }

        // Remove all current
        removeCurrent();

        // Delay the adding of classname until the focus has changed
        // This event fires before the focusin event
        if (type !== 'focusout') {
          this.focusTimer = setTimeout(() => {
            const focused = document.activeElement;

            // Ignore if current focus element isn't inside the player
            if (!elements.container.contains(focused)) {
              return;
            }
            toggleClass(document.activeElement, player.config.classNames.tabFocus, true);
          }, 10);
        }
      });
      _defineProperty$1(this, "global", (toggle = true) => {
        const {
          player
        } = this;

        // Keyboard shortcuts
        if (player.config.keyboard.global) {
          toggleListener.call(player, window, 'keydown keyup', this.handleKey, toggle, false);
        }

        // Click anywhere closes menu
        toggleListener.call(player, document.body, 'click', this.toggleMenu, toggle);

        // Detect touch by events
        once.call(player, document.body, 'touchstart', this.firstTouch);

        // Tab focus detection
        toggleListener.call(player, document.body, 'keydown focus blur focusout', this.setTabFocus, toggle, false, true);
      });
      _defineProperty$1(this, "container", () => {
        const {
          player
        } = this;
        const {
          config,
          elements,
          timers
        } = player;

        // Keyboard shortcuts
        if (!config.keyboard.global && config.keyboard.focused) {
          on.call(player, elements.container, 'keydown keyup', this.handleKey, false);
        }

        // Toggle controls on mouse events and entering fullscreen
        on.call(player, elements.container, 'mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen', event => {
          const {
            controls: controlsElement
          } = elements;

          // Remove button states for fullscreen
          if (controlsElement && event.type === 'enterfullscreen') {
            controlsElement.pressed = false;
            controlsElement.hover = false;
          }

          // Show, then hide after a timeout unless another control event occurs
          const show = ['touchstart', 'touchmove', 'mousemove'].includes(event.type);
          let delay = 0;
          if (show) {
            ui.toggleControls.call(player, true);
            // Use longer timeout for touch devices
            delay = player.touch ? 3000 : 2000;
          }

          // Clear timer
          clearTimeout(timers.controls);

          // Set new timer to prevent flicker when seeking
          timers.controls = setTimeout(() => ui.toggleControls.call(player, false), delay);
        });

        // Set a gutter for Vimeo
        const setGutter = () => {
          if (!player.isVimeo || player.config.vimeo.premium) {
            return;
          }
          const target = elements.wrapper;
          const {
            active
          } = player.fullscreen;
          const [videoWidth, videoHeight] = getAspectRatio.call(player);
          const useNativeAspectRatio = supportsCSS(`aspect-ratio: ${videoWidth} / ${videoHeight}`);

          // If not active, remove styles
          if (!active) {
            if (useNativeAspectRatio) {
              target.style.width = null;
              target.style.height = null;
            } else {
              target.style.maxWidth = null;
              target.style.margin = null;
            }
            return;
          }

          // Determine which dimension will overflow and constrain view
          const [viewportWidth, viewportHeight] = getViewportSize();
          const overflow = viewportWidth / viewportHeight > videoWidth / videoHeight;
          if (useNativeAspectRatio) {
            target.style.width = overflow ? 'auto' : '100%';
            target.style.height = overflow ? '100%' : 'auto';
          } else {
            target.style.maxWidth = overflow ? `${viewportHeight / videoHeight * videoWidth}px` : null;
            target.style.margin = overflow ? '0 auto' : null;
          }
        };

        // Handle resizing
        const resized = () => {
          clearTimeout(timers.resized);
          timers.resized = setTimeout(setGutter, 50);
        };
        on.call(player, elements.container, 'enterfullscreen exitfullscreen', event => {
          const {
            target
          } = player.fullscreen;

          // Ignore events not from target
          if (target !== elements.container) {
            return;
          }

          // If it's not an embed and no ratio specified
          if (!player.isEmbed && is.empty(player.config.ratio)) {
            return;
          }

          // Set Vimeo gutter
          setGutter();

          // Watch for resizes
          const method = event.type === 'enterfullscreen' ? on : off;
          method.call(player, window, 'resize', resized);
        });
      });
      _defineProperty$1(this, "media", () => {
        const {
          player
        } = this;
        const {
          elements
        } = player;

        // Time change on media
        on.call(player, player.media, 'timeupdate seeking seeked', event => controls.timeUpdate.call(player, event));

        // Display duration
        on.call(player, player.media, 'durationchange loadeddata loadedmetadata', event => controls.durationUpdate.call(player, event));

        // Handle the media finishing
        on.call(player, player.media, 'ended', () => {
          // Show poster on end
          if (player.isHTML5 && player.isVideo && player.config.resetOnEnd) {
            // Restart
            player.restart();

            // Call pause otherwise IE11 will start playing the video again
            player.pause();
          }
        });

        // Check for buffer progress
        on.call(player, player.media, 'progress playing seeking seeked', event => controls.updateProgress.call(player, event));

        // Handle volume changes
        on.call(player, player.media, 'volumechange', event => controls.updateVolume.call(player, event));

        // Handle play/pause
        on.call(player, player.media, 'playing play pause ended emptied timeupdate', event => ui.checkPlaying.call(player, event));

        // Loading state
        on.call(player, player.media, 'waiting canplay seeked playing', event => ui.checkLoading.call(player, event));

        // Click video
        if (player.supported.ui && player.config.clickToPlay && !player.isAudio) {
          // Re-fetch the wrapper
          const wrapper = getElement.call(player, `.${player.config.classNames.video}`);

          // Bail if there's no wrapper (this should never happen)
          if (!is.element(wrapper)) {
            return;
          }

          // On click play, pause or restart
          on.call(player, elements.container, 'click', event => {
            const targets = [elements.container, wrapper];

            // Ignore if click if not container or in video wrapper
            if (!targets.includes(event.target) && !wrapper.contains(event.target)) {
              return;
            }

            // Touch devices will just show controls (if hidden)
            if (player.touch && player.config.hideControls) {
              return;
            }
            if (player.ended) {
              this.proxy(event, player.restart, 'restart');
              this.proxy(event, () => {
                silencePromise(player.play());
              }, 'play');
            } else {
              this.proxy(event, () => {
                silencePromise(player.togglePlay());
              }, 'play');
            }
          });
        }

        // Disable right click
        if (player.supported.ui && player.config.disableContextMenu) {
          on.call(player, elements.wrapper, 'contextmenu', event => {
            event.preventDefault();
          }, false);
        }

        // Volume change
        on.call(player, player.media, 'volumechange', () => {
          // Save to storage
          player.storage.set({
            volume: player.volume,
            muted: player.muted
          });
        });

        // Speed change
        on.call(player, player.media, 'ratechange', () => {
          // Update UI
          controls.updateSetting.call(player, 'speed');

          // Save to storage
          player.storage.set({
            speed: player.speed
          });
        });

        // Quality change
        on.call(player, player.media, 'qualitychange', event => {
          // Update UI
          controls.updateSetting.call(player, 'quality', null, event.detail.quality);
        });

        // Update download link when ready and if quality changes
        on.call(player, player.media, 'ready qualitychange', () => {
          controls.setDownloadUrl.call(player);
        });

        // Proxy events to container
        // Bubble up key events for Edge
        const proxyEvents = player.config.events.concat(['keyup', 'keydown']).join(' ');
        on.call(player, player.media, proxyEvents, event => {
          let {
            detail = {}
          } = event;

          // Get error details from media
          if (event.type === 'error') {
            detail = player.media.error;
          }
          triggerEvent.call(player, elements.container, event.type, true, detail);
        });
      });
      _defineProperty$1(this, "proxy", (event, defaultHandler, customHandlerKey) => {
        const {
          player
        } = this;
        const customHandler = player.config.listeners[customHandlerKey];
        const hasCustomHandler = is.function(customHandler);
        let returned = true;

        // Execute custom handler
        if (hasCustomHandler) {
          returned = customHandler.call(player, event);
        }

        // Only call default handler if not prevented in custom handler
        if (returned !== false && is.function(defaultHandler)) {
          defaultHandler.call(player, event);
        }
      });
      _defineProperty$1(this, "bind", (element, type, defaultHandler, customHandlerKey, passive = true) => {
        const {
          player
        } = this;
        const customHandler = player.config.listeners[customHandlerKey];
        const hasCustomHandler = is.function(customHandler);
        on.call(player, element, type, event => this.proxy(event, defaultHandler, customHandlerKey), passive && !hasCustomHandler);
      });
      _defineProperty$1(this, "controls", () => {
        const {
          player
        } = this;
        const {
          elements
        } = player;
        // IE doesn't support input event, so we fallback to change
        const inputEvent = browser.isIE ? 'change' : 'input';

        // Play/pause toggle
        if (elements.buttons.play) {
          Array.from(elements.buttons.play).forEach(button => {
            this.bind(button, 'click', () => {
              silencePromise(player.togglePlay());
            }, 'play');
          });
        }

        // Pause
        this.bind(elements.buttons.restart, 'click', player.restart, 'restart');

        // Rewind
        this.bind(elements.buttons.rewind, 'click', () => {
          // Record seek time so we can prevent hiding controls for a few seconds after rewind
          player.lastSeekTime = Date.now();
          player.rewind();
        }, 'rewind');

        // Rewind
        this.bind(elements.buttons.fastForward, 'click', () => {
          // Record seek time so we can prevent hiding controls for a few seconds after fast forward
          player.lastSeekTime = Date.now();
          player.forward();
        }, 'fastForward');

        // Mute toggle
        this.bind(elements.buttons.mute, 'click', () => {
          player.muted = !player.muted;
        }, 'mute');

        // Captions toggle
        this.bind(elements.buttons.captions, 'click', () => player.toggleCaptions());

        // Download
        this.bind(elements.buttons.download, 'click', () => {
          triggerEvent.call(player, player.media, 'download');
        }, 'download');

        // Fullscreen toggle
        this.bind(elements.buttons.fullscreen, 'click', () => {
          player.fullscreen.toggle();
        }, 'fullscreen');

        // Picture-in-Picture
        this.bind(elements.buttons.pip, 'click', () => {
          player.pip = 'toggle';
        }, 'pip');

        // Airplay
        this.bind(elements.buttons.airplay, 'click', player.airplay, 'airplay');

        // Settings menu - click toggle
        this.bind(elements.buttons.settings, 'click', event => {
          // Prevent the document click listener closing the menu
          event.stopPropagation();
          event.preventDefault();
          controls.toggleMenu.call(player, event);
        }, null, false); // Can't be passive as we're preventing default

        // Settings menu - keyboard toggle
        // We have to bind to keyup otherwise Firefox triggers a click when a keydown event handler shifts focus
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1220143
        this.bind(elements.buttons.settings, 'keyup', event => {
          if (!['Space', 'Enter'].includes(event.key)) {
            return;
          }

          // Because return triggers a click anyway, all we need to do is set focus
          if (event.key === 'Enter') {
            controls.focusFirstMenuItem.call(player, null, true);
            return;
          }

          // Prevent scroll
          event.preventDefault();

          // Prevent playing video (Firefox)
          event.stopPropagation();

          // Toggle menu
          controls.toggleMenu.call(player, event);
        }, null, false // Can't be passive as we're preventing default
        );

        // Escape closes menu
        this.bind(elements.settings.menu, 'keydown', event => {
          if (event.key === 'Escape') {
            controls.toggleMenu.call(player, event);
          }
        });

        // Set range input alternative "value", which matches the tooltip time (#954)
        this.bind(elements.inputs.seek, 'mousedown mousemove', event => {
          const rect = elements.progress.getBoundingClientRect();
          const percent = 100 / rect.width * (event.pageX - rect.left);
          event.currentTarget.setAttribute('seek-value', percent);
        });

        // Pause while seeking
        this.bind(elements.inputs.seek, 'mousedown mouseup keydown keyup touchstart touchend', event => {
          const seek = event.currentTarget;
          const attribute = 'play-on-seeked';
          if (is.keyboardEvent(event) && !['ArrowLeft', 'ArrowRight'].includes(event.key)) {
            return;
          }

          // Record seek time so we can prevent hiding controls for a few seconds after seek
          player.lastSeekTime = Date.now();

          // Was playing before?
          const play = seek.hasAttribute(attribute);
          // Done seeking
          const done = ['mouseup', 'touchend', 'keyup'].includes(event.type);

          // If we're done seeking and it was playing, resume playback
          if (play && done) {
            seek.removeAttribute(attribute);
            silencePromise(player.play());
          } else if (!done && player.playing) {
            seek.setAttribute(attribute, '');
            player.pause();
          }
        });

        // Fix range inputs on iOS
        // Super weird iOS bug where after you interact with an <input type="range">,
        // it takes over further interactions on the page. This is a hack
        if (browser.isIos) {
          const inputs = getElements.call(player, 'input[type="range"]');
          Array.from(inputs).forEach(input => this.bind(input, inputEvent, event => repaint(event.target)));
        }

        // Seek
        this.bind(elements.inputs.seek, inputEvent, event => {
          const seek = event.currentTarget;
          // If it exists, use seek-value instead of "value" for consistency with tooltip time (#954)
          let seekTo = seek.getAttribute('seek-value');
          if (is.empty(seekTo)) {
            seekTo = seek.value;
          }
          seek.removeAttribute('seek-value');
          player.currentTime = seekTo / seek.max * player.duration;
        }, 'seek');

        // Seek tooltip
        this.bind(elements.progress, 'mouseenter mouseleave mousemove', event => controls.updateSeekTooltip.call(player, event));

        // Preview thumbnails plugin
        // TODO: Really need to work on some sort of plug-in wide event bus or pub-sub for this
        this.bind(elements.progress, 'mousemove touchmove', event => {
          const {
            previewThumbnails
          } = player;
          if (previewThumbnails && previewThumbnails.loaded) {
            previewThumbnails.startMove(event);
          }
        });

        // Hide thumbnail preview - on mouse click, mouse leave, and video play/seek. All four are required, e.g., for buffering
        this.bind(elements.progress, 'mouseleave touchend click', () => {
          const {
            previewThumbnails
          } = player;
          if (previewThumbnails && previewThumbnails.loaded) {
            previewThumbnails.endMove(false, true);
          }
        });

        // Show scrubbing preview
        this.bind(elements.progress, 'mousedown touchstart', event => {
          const {
            previewThumbnails
          } = player;
          if (previewThumbnails && previewThumbnails.loaded) {
            previewThumbnails.startScrubbing(event);
          }
        });
        this.bind(elements.progress, 'mouseup touchend', event => {
          const {
            previewThumbnails
          } = player;
          if (previewThumbnails && previewThumbnails.loaded) {
            previewThumbnails.endScrubbing(event);
          }
        });

        // Polyfill for lower fill in <input type="range"> for webkit
        if (browser.isWebkit) {
          Array.from(getElements.call(player, 'input[type="range"]')).forEach(element => {
            this.bind(element, 'input', event => controls.updateRangeFill.call(player, event.target));
          });
        }

        // Current time invert
        // Only if one time element is used for both currentTime and duration
        if (player.config.toggleInvert && !is.element(elements.display.duration)) {
          this.bind(elements.display.currentTime, 'click', () => {
            // Do nothing if we're at the start
            if (player.currentTime === 0) {
              return;
            }
            player.config.invertTime = !player.config.invertTime;
            controls.timeUpdate.call(player);
          });
        }

        // Volume
        this.bind(elements.inputs.volume, inputEvent, event => {
          player.volume = event.target.value;
        }, 'volume');

        // Update controls.hover state (used for ui.toggleControls to avoid hiding when interacting)
        this.bind(elements.controls, 'mouseenter mouseleave', event => {
          elements.controls.hover = !player.touch && event.type === 'mouseenter';
        });

        // Also update controls.hover state for any non-player children of fullscreen element (as above)
        if (elements.fullscreen) {
          Array.from(elements.fullscreen.children).filter(c => !c.contains(elements.container)).forEach(child => {
            this.bind(child, 'mouseenter mouseleave', event => {
              if (elements.controls) {
                elements.controls.hover = !player.touch && event.type === 'mouseenter';
              }
            });
          });
        }

        // Update controls.pressed state (used for ui.toggleControls to avoid hiding when interacting)
        this.bind(elements.controls, 'mousedown mouseup touchstart touchend touchcancel', event => {
          elements.controls.pressed = ['mousedown', 'touchstart'].includes(event.type);
        });

        // Show controls when they receive focus (e.g., when using keyboard tab key)
        this.bind(elements.controls, 'focusin', () => {
          const {
            config,
            timers
          } = player;

          // Skip transition to prevent focus from scrolling the parent element
          toggleClass(elements.controls, config.classNames.noTransition, true);

          // Toggle
          ui.toggleControls.call(player, true);

          // Restore transition
          setTimeout(() => {
            toggleClass(elements.controls, config.classNames.noTransition, false);
          }, 0);

          // Delay a little more for mouse users
          const delay = this.touch ? 3000 : 4000;

          // Clear timer
          clearTimeout(timers.controls);

          // Hide again after delay
          timers.controls = setTimeout(() => ui.toggleControls.call(player, false), delay);
        });

        // Mouse wheel for volume
        this.bind(elements.inputs.volume, 'wheel', event => {
          // Detect "natural" scroll - supported on OS X Safari only
          // Other browsers on OS X will be inverted until support improves
          const inverted = event.webkitDirectionInvertedFromDevice;
          // Get delta from event. Invert if `inverted` is true
          const [x, y] = [event.deltaX, -event.deltaY].map(value => inverted ? -value : value);
          // Using the biggest delta, normalize to 1 or -1 (or 0 if no delta)
          const direction = Math.sign(Math.abs(x) > Math.abs(y) ? x : y);

          // Change the volume by 2%
          player.increaseVolume(direction / 50);

          // Don't break page scrolling at max and min
          const {
            volume
          } = player.media;
          if (direction === 1 && volume < 1 || direction === -1 && volume > 0) {
            event.preventDefault();
          }
        }, 'volume', false);
      });
      this.player = _player;
      this.lastKey = null;
      this.focusTimer = null;
      this.lastKeyDown = null;
      this.handleKey = this.handleKey.bind(this);
      this.toggleMenu = this.toggleMenu.bind(this);
      this.setTabFocus = this.setTabFocus.bind(this);
      this.firstTouch = this.firstTouch.bind(this);
    }

    // Handle key presses
    handleKey(event) {
      const {
        player
      } = this;
      const {
        elements
      } = player;
      const {
        key,
        type,
        altKey,
        ctrlKey,
        metaKey,
        shiftKey
      } = event;
      const pressed = type === 'keydown';
      const repeat = pressed && key === this.lastKey;

      // Bail if a modifier key is set
      if (altKey || ctrlKey || metaKey || shiftKey) {
        return;
      }

      // If the event is bubbled from the media element
      // Firefox doesn't get the key for whatever reason
      if (!key) {
        return;
      }

      // Seek by increment
      const seekByIncrement = increment => {
        // Divide the max duration into 10th's and times by the number value
        player.currentTime = player.duration / 10 * increment;
      };

      // Handle the key on keydown
      // Reset on keyup
      if (pressed) {
        // Check focused element
        // and if the focused element is not editable (e.g. text input)
        // and any that accept key input http://webaim.org/techniques/keyboard/
        const focused = document.activeElement;
        if (is.element(focused)) {
          const {
            editable
          } = player.config.selectors;
          const {
            seek
          } = elements.inputs;
          if (focused !== seek && matches(focused, editable)) {
            return;
          }
          if (event.key === 'Space' && matches(focused, 'button, [role^="menuitem"]')) {
            return;
          }
        }

        // Which keys should we prevent default
        const preventDefault = ['Space', 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'c', 'f', 'k', 'l', 'm'];

        // If the key is found prevent default (e.g. prevent scrolling for arrows)
        if (preventDefault.includes(key)) {
          event.preventDefault();
          event.stopPropagation();
        }
        switch (key) {
          case '0':
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
          case '7':
          case '8':
          case '9':
            if (!repeat) {
              seekByIncrement(parseInt(key, 10));
            }
            break;
          case 'Space':
          case 'k':
            if (!repeat) {
              silencePromise(player.togglePlay());
            }
            break;
          case 'ArrowUp':
            player.increaseVolume(0.1);
            break;
          case 'ArrowDown':
            player.decreaseVolume(0.1);
            break;
          case 'm':
            if (!repeat) {
              player.muted = !player.muted;
            }
            break;
          case 'ArrowRight':
            player.forward();
            break;
          case 'ArrowLeft':
            player.rewind();
            break;
          case 'f':
            player.fullscreen.toggle();
            break;
          case 'c':
            if (!repeat) {
              player.toggleCaptions();
            }
            break;
          case 'l':
            player.loop = !player.loop;
            break;
        }

        // Escape is handle natively when in full screen
        // So we only need to worry about non native
        if (key === 'Escape' && !player.fullscreen.usingNative && player.fullscreen.active) {
          player.fullscreen.toggle();
        }

        // Store last key for next cycle
        this.lastKey = key;
      } else {
        this.lastKey = null;
      }
    }

    // Toggle menu
    toggleMenu(event) {
      controls.toggleMenu.call(this.player, event);
    }

    // Device is touch enabled
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var loadjs_umd = createCommonjsModule(function (module, exports) {
    (function (root, factory) {
      {
        module.exports = factory();
      }
    })(commonjsGlobal, function () {
      /**
       * Global dependencies.
       * @global {Object} document - DOM
       */

      var devnull = function () {},
        bundleIdCache = {},
        bundleResultCache = {},
        bundleCallbackQueue = {};

      /**
       * Subscribe to bundle load event.
       * @param {string[]} bundleIds - Bundle ids
       * @param {Function} callbackFn - The callback function
       */
      function subscribe(bundleIds, callbackFn) {
        // listify
        bundleIds = bundleIds.push ? bundleIds : [bundleIds];
        var depsNotFound = [],
          i = bundleIds.length,
          numWaiting = i,
          fn,
          bundleId,
          r,
          q;

        // define callback function
        fn = function (bundleId, pathsNotFound) {
          if (pathsNotFound.length) depsNotFound.push(bundleId);
          numWaiting--;
          if (!numWaiting) callbackFn(depsNotFound);
        };

        // register callback
        while (i--) {
          bundleId = bundleIds[i];

          // execute callback if in result cache
          r = bundleResultCache[bundleId];
          if (r) {
            fn(bundleId, r);
            continue;
          }

          // add to callback queue
          q = bundleCallbackQueue[bundleId] = bundleCallbackQueue[bundleId] || [];
          q.push(fn);
        }
      }

      /**
       * Publish bundle load event.
       * @param {string} bundleId - Bundle id
       * @param {string[]} pathsNotFound - List of files not found
       */
      function publish(bundleId, pathsNotFound) {
        // exit if id isn't defined
        if (!bundleId) return;
        var q = bundleCallbackQueue[bundleId];

        // cache result
        bundleResultCache[bundleId] = pathsNotFound;

        // exit if queue is empty
        if (!q) return;

        // empty callback queue
        while (q.length) {
          q[0](bundleId, pathsNotFound);
          q.splice(0, 1);
        }
      }

      /**
       * Execute callbacks.
       * @param {Object or Function} args - The callback args
       * @param {string[]} depsNotFound - List of dependencies not found
       */
      function executeCallbacks(args, depsNotFound) {
        // accept function as argument
        if (args.call) args = {
          success: args
        };

        // success and error callbacks
        if (depsNotFound.length) (args.error || devnull)(depsNotFound);else (args.success || devnull)(args);
      }

      /**
       * Load individual file.
       * @param {string} path - The file path
       * @param {Function} callbackFn - The callback function
       */
      function loadFile(path, callbackFn, args, numTries) {
        var doc = document,
          async = args.async,
          maxTries = (args.numRetries || 0) + 1,
          beforeCallbackFn = args.before || devnull,
          pathname = path.replace(/[\?|#].*$/, ''),
          pathStripped = path.replace(/^(css|img)!/, ''),
          isLegacyIECss,
          e;
        numTries = numTries || 0;
        if (/(^css!|\.css$)/.test(pathname)) {
          // css
          e = doc.createElement('link');
          e.rel = 'stylesheet';
          e.href = pathStripped;

          // tag IE9+
          isLegacyIECss = 'hideFocus' in e;

          // use preload in IE Edge (to detect load errors)
          if (isLegacyIECss && e.relList) {
            isLegacyIECss = 0;
            e.rel = 'preload';
            e.as = 'style';
          }
        } else if (/(^img!|\.(png|gif|jpg|svg|webp)$)/.test(pathname)) {
          // image
          e = doc.createElement('img');
          e.src = pathStripped;
        } else {
          // javascript
          e = doc.createElement('script');
          e.src = path;
          e.async = async === undefined ? true : async;
        }
        e.onload = e.onerror = e.onbeforeload = function (ev) {
          var result = ev.type[0];

          // treat empty stylesheets as failures to get around lack of onerror
          // support in IE9-11
          if (isLegacyIECss) {
            try {
              if (!e.sheet.cssText.length) result = 'e';
            } catch (x) {
              // sheets objects created from load errors don't allow access to
              // `cssText` (unless error is Code:18 SecurityError)
              if (x.code != 18) result = 'e';
            }
          }

          // handle retries in case of load failure
          if (result == 'e') {
            // increment counter
            numTries += 1;

            // exit function and try again
            if (numTries < maxTries) {
              return loadFile(path, callbackFn, args, numTries);
            }
          } else if (e.rel == 'preload' && e.as == 'style') {
            // activate preloaded stylesheets
            return e.rel = 'stylesheet'; // jshint ignore:line
          }

          // execute callback
          callbackFn(path, result, ev.defaultPrevented);
        };

        // add to document (unless callback returns `false`)
        if (beforeCallbackFn(path, e) !== false) doc.head.appendChild(e);
      }

      /**
       * Load multiple files.
       * @param {string[]} paths - The file paths
       * @param {Function} callbackFn - The callback function
       */
      function loadFiles(paths, callbackFn, args) {
        // listify paths
        paths = paths.push ? paths : [paths];
        var numWaiting = paths.length,
          x = numWaiting,
          pathsNotFound = [],
          fn,
          i;

        // define callback function
        fn = function (path, result, defaultPrevented) {
          // handle error
          if (result == 'e') pathsNotFound.push(path);

          // handle beforeload event. If defaultPrevented then that means the load
          // will be blocked (ex. Ghostery/ABP on Safari)
          if (result == 'b') {
            if (defaultPrevented) pathsNotFound.push(path);else return;
          }
          numWaiting--;
          if (!numWaiting) callbackFn(pathsNotFound);
        };

        // load scripts
        for (i = 0; i < x; i++) loadFile(paths[i], fn, args);
      }

      /**
       * Initiate script load and register bundle.
       * @param {(string|string[])} paths - The file paths
       * @param {(string|Function|Object)} [arg1] - The (1) bundleId or (2) success
       *   callback or (3) object literal with success/error arguments, numRetries,
       *   etc.
       * @param {(Function|Object)} [arg2] - The (1) success callback or (2) object
       *   literal with success/error arguments, numRetries, etc.
       */
      function loadjs(paths, arg1, arg2) {
        var bundleId, args;

        // bundleId (if string)
        if (arg1 && arg1.trim) bundleId = arg1;

        // args (default is {})
        args = (bundleId ? arg2 : arg1) || {};

        // throw error if bundle is already defined
        if (bundleId) {
          if (bundleId in bundleIdCache) {
            throw "LoadJS";
          } else {
            bundleIdCache[bundleId] = true;
          }
        }
        function loadFn(resolve, reject) {
          loadFiles(paths, function (pathsNotFound) {
            // execute callbacks
            executeCallbacks(args, pathsNotFound);

            // resolve Promise
            if (resolve) {
              executeCallbacks({
                success: resolve,
                error: reject
              }, pathsNotFound);
            }

            // publish bundle load event
            publish(bundleId, pathsNotFound);
          }, args);
        }
        if (args.returnPromise) return new Promise(loadFn);else loadFn();
      }

      /**
       * Execute callbacks when dependencies have been satisfied.
       * @param {(string|string[])} deps - List of bundle ids
       * @param {Object} args - success/error arguments
       */
      loadjs.ready = function ready(deps, args) {
        // subscribe to bundle load event
        subscribe(deps, function (depsNotFound) {
          // execute callbacks
          executeCallbacks(args, depsNotFound);
        });
        return loadjs;
      };

      /**
       * Manually satisfy bundle dependencies.
       * @param {string} bundleId - The bundle id
       */
      loadjs.done = function done(bundleId) {
        publish(bundleId, []);
      };

      /**
       * Reset loadjs dependencies statuses
       */
      loadjs.reset = function reset() {
        bundleIdCache = {};
        bundleResultCache = {};
        bundleCallbackQueue = {};
      };

      /**
       * Determine if bundle has already been defined
       * @param String} bundleId - The bundle id
       */
      loadjs.isDefined = function isDefined(bundleId) {
        return bundleId in bundleIdCache;
      };

      // export
      return loadjs;
    });
  });

  // ==========================================================================
  function loadScript(url) {
    return new Promise((resolve, reject) => {
      loadjs_umd(url, {
        success: resolve,
        error: reject
      });
    });
  }

  // ==========================================================================

  // Parse Vimeo ID from URL
  function parseId$1(url) {
    if (is.empty(url)) {
      return null;
    }
    if (is.number(Number(url))) {
      return url;
    }
    const regex = /^.*(vimeo.com\/|video\/)(\d+).*/;
    return url.match(regex) ? RegExp.$2 : url;
  }

  // Try to extract a hash for private videos from the URL
  function parseHash(url) {
    /* This regex matches a hexadecimal hash if given in any of these forms:
     *  - [https://player.]vimeo.com/video/{id}/{hash}[?params]
     *  - [https://player.]vimeo.com/video/{id}?h={hash}[&params]
     *  - [https://player.]vimeo.com/video/{id}?[params]&h={hash}
     *  - video/{id}/{hash}
     * If matched, the hash is available in capture group 4
     */
    const regex = /^.*(vimeo.com\/|video\/)(\d+)(\?.*&*h=|\/)+([\d,a-f]+)/;
    const found = url.match(regex);
    return found && found.length === 5 ? found[4] : null;
  }

  // Set playback state and trigger change (only on actual change)
  function assurePlaybackState$1(play) {
    if (play && !this.embed.hasPlayed) {
      this.embed.hasPlayed = true;
    }
    if (this.media.paused === play) {
      this.media.paused = !play;
      triggerEvent.call(this, this.media, play ? 'play' : 'pause');
    }
  }
  const vimeo = {
    setup() {
      const player = this;

      // Add embed class for responsive
      toggleClass(player.elements.wrapper, player.config.classNames.embed, true);

      // Set speed options from config
      player.options.speed = player.config.speed.options;

      // Set intial ratio
      setAspectRatio.call(player);

      // Load the SDK if not already
      if (!is.object(window.Vimeo)) {
        loadScript(player.config.urls.vimeo.sdk).then(() => {
          vimeo.ready.call(player);
        }).catch(error => {
          player.debug.warn('Vimeo SDK (player.js) failed to load', error);
        });
      } else {
        vimeo.ready.call(player);
      }
    },
    // API Ready
    ready() {
      const player = this;
      const config = player.config.vimeo;
      const {
        premium,
        referrerPolicy,
        ...frameParams
      } = config;
      // Get the source URL or ID
      let source = player.media.getAttribute('src');
      let hash = '';
      // Get from <div> if needed
      if (is.empty(source)) {
        source = player.media.getAttribute(player.config.attributes.embed.id);
        // hash can also be set as attribute on the <div>
        hash = player.media.getAttribute(player.config.attributes.embed.hash);
      } else {
        hash = parseHash(source);
      }
      const hashParam = hash ? {
        h: hash
      } : {};

      // If the owner has a pro or premium account then we can hide controls etc
      if (premium) {
        Object.assign(frameParams, {
          controls: false,
          sidedock: false
        });
      }

      // Get Vimeo params for the iframe
      const params = buildUrlParams({
        loop: player.config.loop.active,
        autoplay: player.autoplay,
        muted: player.muted,
        gesture: 'media',
        playsinline: !this.config.fullscreen.iosNative,
        // hash has to be added to iframe-URL
        ...hashParam,
        ...frameParams
      });
      const id = parseId$1(source);
      // Build an iframe
      const iframe = createElement('iframe');
      const src = format(player.config.urls.vimeo.iframe, id, params);
      iframe.setAttribute('src', src);
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('allow', ['autoplay', 'fullscreen', 'picture-in-picture', 'encrypted-media', 'accelerometer', 'gyroscope'].join('; '));

      // Set the referrer policy if required
      if (!is.empty(referrerPolicy)) {
        iframe.setAttribute('referrerPolicy', referrerPolicy);
      }

      // Inject the package
      if (premium || !config.customControls) {
        iframe.setAttribute('data-poster', player.poster);
        player.media = replaceElement(iframe, player.media);
      } else {
        const wrapper = createElement('div', {
          class: player.config.classNames.embedContainer,
          'data-poster': player.poster
        });
        wrapper.appendChild(iframe);
        player.media = replaceElement(wrapper, player.media);
      }

      // Get poster image
      if (!config.customControls) {
        fetch(format(player.config.urls.vimeo.api, src)).then(response => {
          if (is.empty(response) || !response.thumbnail_url) {
            return;
          }

          // Set and show poster
          ui.setPoster.call(player, response.thumbnail_url).catch(() => {});
        });
      }

      // Setup instance
      // https://github.com/vimeo/player.js
      player.embed = new window.Vimeo.Player(iframe, {
        autopause: player.config.autopause,
        muted: player.muted
      });
      player.media.paused = true;
      player.media.currentTime = 0;

      // Disable native text track rendering
      if (player.supported.ui) {
        player.embed.disableTextTrack();
      }

      // Create a faux HTML5 API using the Vimeo API
      player.media.play = () => {
        assurePlaybackState$1.call(player, true);
        return player.embed.play();
      };
      player.media.pause = () => {
        assurePlaybackState$1.call(player, false);
        return player.embed.pause();
      };
      player.media.stop = () => {
        player.pause();
        player.currentTime = 0;
      };

      // Seeking
      let {
        currentTime
      } = player.media;
      Object.defineProperty(player.media, 'currentTime', {
        get() {
          return currentTime;
        },
        set(time) {
          // Vimeo will automatically play on seek if the video hasn't been played before

          // Get current paused state and volume etc
          const {
            embed,
            media,
            paused,
            volume
          } = player;
          const restorePause = paused && !embed.hasPlayed;

          // Set seeking state and trigger event
          media.seeking = true;
          triggerEvent.call(player, media, 'seeking');

          // If paused, mute until seek is complete
          Promise.resolve(restorePause && embed.setVolume(0))
          // Seek
          .then(() => embed.setCurrentTime(time))
          // Restore paused
          .then(() => restorePause && embed.pause())
          // Restore volume
          .then(() => restorePause && embed.setVolume(volume)).catch(() => {
            // Do nothing
          });
        }
      });

      // Playback speed
      let speed = player.config.speed.selected;
      Object.defineProperty(player.media, 'playbackRate', {
        get() {
          return speed;
        },
        set(input) {
          player.embed.setPlaybackRate(input).then(() => {
            speed = input;
            triggerEvent.call(player, player.media, 'ratechange');
          }).catch(() => {
            // Cannot set Playback Rate, Video is probably not on Pro account
            player.options.speed = [1];
          });
        }
      });

      // Volume
      let {
        volume
      } = player.config;
      Object.defineProperty(player.media, 'volume', {
        get() {
          return volume;
        },
        set(input) {
          player.embed.setVolume(input).then(() => {
            volume = input;
            triggerEvent.call(player, player.media, 'volumechange');
          });
        }
      });

      // Muted
      let {
        muted
      } = player.config;
      Object.defineProperty(player.media, 'muted', {
        get() {
          return muted;
        },
        set(input) {
          const toggle = is.boolean(input) ? input : false;
          player.embed.setVolume(toggle ? 0 : player.config.volume).then(() => {
            muted = toggle;
            triggerEvent.call(player, player.media, 'volumechange');
          });
        }
      });

      // Loop
      let {
        loop
      } = player.config;
      Object.defineProperty(player.media, 'loop', {
        get() {
          return loop;
        },
        set(input) {
          const toggle = is.boolean(input) ? input : player.config.loop.active;
          player.embed.setLoop(toggle).then(() => {
            loop = toggle;
          });
        }
      });

      // Source
      let currentSrc;
      player.embed.getVideoUrl().then(value => {
        currentSrc = value;
        controls.setDownloadUrl.call(player);
      }).catch(error => {
        this.debug.warn(error);
      });
      Object.defineProperty(player.media, 'currentSrc', {
        get() {
          return currentSrc;
        }
      });

      // Ended
      Object.defineProperty(player.media, 'ended', {
        get() {
          return player.currentTime === player.duration;
        }
      });

      // Set aspect ratio based on video size
      Promise.all([player.embed.getVideoWidth(), player.embed.getVideoHeight()]).then(dimensions => {
        const [width, height] = dimensions;
        player.embed.ratio = roundAspectRatio(width, height);
        setAspectRatio.call(this);
      });

      // Set autopause
      player.embed.setAutopause(player.config.autopause).then(state => {
        player.config.autopause = state;
      });

      // Get title
      player.embed.getVideoTitle().then(title => {
        player.config.title = title;
        ui.setTitle.call(this);
      });

      // Get current time
      player.embed.getCurrentTime().then(value => {
        currentTime = value;
        triggerEvent.call(player, player.media, 'timeupdate');
      });

      // Get duration
      player.embed.getDuration().then(value => {
        player.media.duration = value;
        triggerEvent.call(player, player.media, 'durationchange');
      });

      // Get captions
      player.embed.getTextTracks().then(tracks => {
        player.media.textTracks = tracks;
        captions.setup.call(player);
      });
      player.embed.on('cuechange', ({
        cues = []
      }) => {
        const strippedCues = cues.map(cue => stripHTML(cue.text));
        captions.updateCues.call(player, strippedCues);
      });
      player.embed.on('loaded', () => {
        // Assure state and events are updated on autoplay
        player.embed.getPaused().then(paused => {
          assurePlaybackState$1.call(player, !paused);
          if (!paused) {
            triggerEvent.call(player, player.media, 'playing');
          }
        });
        if (is.element(player.embed.element) && player.supported.ui) {
          const frame = player.embed.element;

          // Fix keyboard focus issues
          // https://github.com/sampotts/plyr/issues/317
          frame.setAttribute('tabindex', -1);
        }
      });
      player.embed.on('bufferstart', () => {
        triggerEvent.call(player, player.media, 'waiting');
      });
      player.embed.on('bufferend', () => {
        triggerEvent.call(player, player.media, 'playing');
      });
      player.embed.on('play', () => {
        assurePlaybackState$1.call(player, true);
        triggerEvent.call(player, player.media, 'playing');
      });
      player.embed.on('pause', () => {
        assurePlaybackState$1.call(player, false);
      });
      player.embed.on('timeupdate', data => {
        player.media.seeking = false;
        currentTime = data.seconds;
        triggerEvent.call(player, player.media, 'timeupdate');
      });
      player.embed.on('progress', data => {
        player.media.buffered = data.percent;
        triggerEvent.call(player, player.media, 'progress');

        // Check all loaded
        if (parseInt(data.percent, 10) === 1) {
          triggerEvent.call(player, player.media, 'canplaythrough');
        }

        // Get duration as if we do it before load, it gives an incorrect value
        // https://github.com/sampotts/plyr/issues/891
        player.embed.getDuration().then(value => {
          if (value !== player.media.duration) {
            player.media.duration = value;
            triggerEvent.call(player, player.media, 'durationchange');
          }
        });
      });
      player.embed.on('seeked', () => {
        player.media.seeking = false;
        triggerEvent.call(player, player.media, 'seeked');
      });
      player.embed.on('ended', () => {
        player.media.paused = true;
        triggerEvent.call(player, player.media, 'ended');
      });
      player.embed.on('error', detail => {
        player.media.error = detail;
        triggerEvent.call(player, player.media, 'error');
      });

      // Rebuild UI
      if (config.customControls) {
        setTimeout(() => ui.build.call(player), 0);
      }
    }
  };

  // ==========================================================================

  // Parse YouTube ID from URL
  function parseId(url) {
    if (is.empty(url)) {
      return null;
    }
    const regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    return url.match(regex) ? RegExp.$2 : url;
  }

  // Set playback state and trigger change (only on actual change)
  function assurePlaybackState(play) {
    if (play && !this.embed.hasPlayed) {
      this.embed.hasPlayed = true;
    }
    if (this.media.paused === play) {
      this.media.paused = !play;
      triggerEvent.call(this, this.media, play ? 'play' : 'pause');
    }
  }
  function getHost(config) {
    if (config.noCookie) {
      return 'https://www.youtube-nocookie.com';
    }
    if (window.location.protocol === 'http:') {
      return 'http://www.youtube.com';
    }

    // Use YouTube's default
    return undefined;
  }
  const youtube = {
    setup() {
      // Add embed class for responsive
      toggleClass(this.elements.wrapper, this.config.classNames.embed, true);

      // Setup API
      if (is.object(window.YT) && is.function(window.YT.Player)) {
        youtube.ready.call(this);
      } else {
        // Reference current global callback
        const callback = window.onYouTubeIframeAPIReady;

        // Set callback to process queue
        window.onYouTubeIframeAPIReady = () => {
          // Call global callback if set
          if (is.function(callback)) {
            callback();
          }
          youtube.ready.call(this);
        };

        // Load the SDK
        loadScript(this.config.urls.youtube.sdk).catch(error => {
          this.debug.warn('YouTube API failed to load', error);
        });
      }
    },
    // Get the media title
    getTitle(videoId) {
      const url = format(this.config.urls.youtube.api, videoId);
      fetch(url).then(data => {
        if (is.object(data)) {
          const {
            title,
            height,
            width
          } = data;

          // Set title
          this.config.title = title;
          ui.setTitle.call(this);

          // Set aspect ratio
          this.embed.ratio = roundAspectRatio(width, height);
        }
        setAspectRatio.call(this);
      }).catch(() => {
        // Set aspect ratio
        setAspectRatio.call(this);
      });
    },
    // API ready
    ready() {
      const player = this;
      const config = player.config.youtube;
      // Ignore already setup (race condition)
      const currentId = player.media && player.media.getAttribute('id');
      if (!is.empty(currentId) && currentId.startsWith('youtube-')) {
        return;
      }

      // Get the source URL or ID
      let source = player.media.getAttribute('src');

      // Get from <div> if needed
      if (is.empty(source)) {
        source = player.media.getAttribute(this.config.attributes.embed.id);
      }

      // Replace the <iframe> with a <div> due to YouTube API issues
      const videoId = parseId(source);
      const id = generateId(player.provider);
      // Replace media element
      const container = createElement('div', {
        id,
        'data-poster': config.customControls ? player.poster : undefined
      });
      player.media = replaceElement(container, player.media);

      // Only load the poster when using custom controls
      if (config.customControls) {
        const posterSrc = s => `https://i.ytimg.com/vi/${videoId}/${s}default.jpg`;

        // Check thumbnail images in order of quality, but reject fallback thumbnails (120px wide)
        loadImage(posterSrc('maxres'), 121) // Higest quality and unpadded
        .catch(() => loadImage(posterSrc('sd'), 121)) // 480p padded 4:3
        .catch(() => loadImage(posterSrc('hq'))) // 360p padded 4:3. Always exists
        .then(image => ui.setPoster.call(player, image.src)).then(src => {
          // If the image is padded, use background-size "cover" instead (like youtube does too with their posters)
          if (!src.includes('maxres')) {
            player.elements.poster.style.backgroundSize = 'cover';
          }
        }).catch(() => {});
      }

      // Setup instance
      // https://developers.google.com/youtube/iframe_api_reference
      player.embed = new window.YT.Player(player.media, {
        videoId,
        host: getHost(config),
        playerVars: extend({}, {
          // Autoplay
          autoplay: player.config.autoplay ? 1 : 0,
          // iframe interface language
          hl: player.config.hl,
          // Only show controls if not fully supported or opted out
          controls: player.supported.ui && config.customControls ? 0 : 1,
          // Disable keyboard as we handle it
          disablekb: 1,
          // Allow iOS inline playback
          playsinline: !player.config.fullscreen.iosNative ? 1 : 0,
          // Captions are flaky on YouTube
          cc_load_policy: player.captions.active ? 1 : 0,
          cc_lang_pref: player.config.captions.language,
          // Tracking for stats
          widget_referrer: window ? window.location.href : null
        }, config),
        events: {
          onError(event) {
            // YouTube may fire onError twice, so only handle it once
            if (!player.media.error) {
              const code = event.data;
              // Messages copied from https://developers.google.com/youtube/iframe_api_reference#onError
              const message = {
                2: 'The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.',
                5: 'The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.',
                100: 'The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.',
                101: 'The owner of the requested video does not allow it to be played in embedded players.',
                150: 'The owner of the requested video does not allow it to be played in embedded players.'
              }[code] || 'An unknown error occured';
              player.media.error = {
                code,
                message
              };
              triggerEvent.call(player, player.media, 'error');
            }
          },
          onPlaybackRateChange(event) {
            // Get the instance
            const instance = event.target;

            // Get current speed
            player.media.playbackRate = instance.getPlaybackRate();
            triggerEvent.call(player, player.media, 'ratechange');
          },
          onReady(event) {
            // Bail if onReady has already been called. See issue #1108
            if (is.function(player.media.play)) {
              return;
            }
            // Get the instance
            const instance = event.target;

            // Get the title
            youtube.getTitle.call(player, videoId);

            // Create a faux HTML5 API using the YouTube API
            player.media.play = () => {
              assurePlaybackState.call(player, true);
              instance.playVideo();
            };
            player.media.pause = () => {
              assurePlaybackState.call(player, false);
              instance.pauseVideo();
            };
            player.media.stop = () => {
              instance.stopVideo();
            };
            player.media.duration = instance.getDuration();
            player.media.paused = true;

            // Seeking
            player.media.currentTime = 0;
            Object.defineProperty(player.media, 'currentTime', {
              get() {
                return Number(instance.getCurrentTime());
              },
              set(time) {
                // If paused and never played, mute audio preventively (YouTube starts playing on seek if the video hasn't been played yet).
                if (player.paused && !player.embed.hasPlayed) {
                  player.embed.mute();
                }

                // Set seeking state and trigger event
                player.media.seeking = true;
                triggerEvent.call(player, player.media, 'seeking');

                // Seek after events sent
                instance.seekTo(time);
              }
            });

            // Playback speed
            Object.defineProperty(player.media, 'playbackRate', {
              get() {
                return instance.getPlaybackRate();
              },
              set(input) {
                instance.setPlaybackRate(input);
              }
            });

            // Volume
            let {
              volume
            } = player.config;
            Object.defineProperty(player.media, 'volume', {
              get() {
                return volume;
              },
              set(input) {
                volume = input;
                instance.setVolume(volume * 100);
                triggerEvent.call(player, player.media, 'volumechange');
              }
            });

            // Muted
            let {
              muted
            } = player.config;
            Object.defineProperty(player.media, 'muted', {
              get() {
                return muted;
              },
              set(input) {
                const toggle = is.boolean(input) ? input : muted;
                muted = toggle;
                instance[toggle ? 'mute' : 'unMute']();
                instance.setVolume(volume * 100);
                triggerEvent.call(player, player.media, 'volumechange');
              }
            });

            // Source
            Object.defineProperty(player.media, 'currentSrc', {
              get() {
                return instance.getVideoUrl();
              }
            });

            // Ended
            Object.defineProperty(player.media, 'ended', {
              get() {
                return player.currentTime === player.duration;
              }
            });

            // Get available speeds
            const speeds = instance.getAvailablePlaybackRates();
            // Filter based on config
            player.options.speed = speeds.filter(s => player.config.speed.options.includes(s));

            // Set the tabindex to avoid focus entering iframe
            if (player.supported.ui && config.customControls) {
              player.media.setAttribute('tabindex', -1);
            }
            triggerEvent.call(player, player.media, 'timeupdate');
            triggerEvent.call(player, player.media, 'durationchange');

            // Reset timer
            clearInterval(player.timers.buffering);

            // Setup buffering
            player.timers.buffering = setInterval(() => {
              // Get loaded % from YouTube
              player.media.buffered = instance.getVideoLoadedFraction();

              // Trigger progress only when we actually buffer something
              if (player.media.lastBuffered === null || player.media.lastBuffered < player.media.buffered) {
                triggerEvent.call(player, player.media, 'progress');
              }

              // Set last buffer point
              player.media.lastBuffered = player.media.buffered;

              // Bail if we're at 100%
              if (player.media.buffered === 1) {
                clearInterval(player.timers.buffering);

                // Trigger event
                triggerEvent.call(player, player.media, 'canplaythrough');
              }
            }, 200);

            // Rebuild UI
            if (config.customControls) {
              setTimeout(() => ui.build.call(player), 50);
            }
          },
          onStateChange(event) {
            // Get the instance
            const instance = event.target;

            // Reset timer
            clearInterval(player.timers.playing);
            const seeked = player.media.seeking && [1, 2].includes(event.data);
            if (seeked) {
              // Unset seeking and fire seeked event
              player.media.seeking = false;
              triggerEvent.call(player, player.media, 'seeked');
            }

            // Handle events
            // -1   Unstarted
            // 0    Ended
            // 1    Playing
            // 2    Paused
            // 3    Buffering
            // 5    Video cued
            switch (event.data) {
              case -1:
                // Update scrubber
                triggerEvent.call(player, player.media, 'timeupdate');

                // Get loaded % from YouTube
                player.media.buffered = instance.getVideoLoadedFraction();
                triggerEvent.call(player, player.media, 'progress');
                break;
              case 0:
                assurePlaybackState.call(player, false);

                // YouTube doesn't support loop for a single video, so mimick it.
                if (player.media.loop) {
                  // YouTube needs a call to `stopVideo` before playing again
                  instance.stopVideo();
                  instance.playVideo();
                } else {
                  triggerEvent.call(player, player.media, 'ended');
                }
                break;
              case 1:
                // Restore paused state (YouTube starts playing on seek if the video hasn't been played yet)
                if (config.customControls && !player.config.autoplay && player.media.paused && !player.embed.hasPlayed) {
                  player.media.pause();
                } else {
                  assurePlaybackState.call(player, true);
                  triggerEvent.call(player, player.media, 'playing');

                  // Poll to get playback progress
                  player.timers.playing = setInterval(() => {
                    triggerEvent.call(player, player.media, 'timeupdate');
                  }, 50);

                  // Check duration again due to YouTube bug
                  // https://github.com/sampotts/plyr/issues/374
                  // https://code.google.com/p/gdata-issues/issues/detail?id=8690
                  if (player.media.duration !== instance.getDuration()) {
                    player.media.duration = instance.getDuration();
                    triggerEvent.call(player, player.media, 'durationchange');
                  }
                }
                break;
              case 2:
                // Restore audio (YouTube starts playing on seek if the video hasn't been played yet)
                if (!player.muted) {
                  player.embed.unMute();
                }
                assurePlaybackState.call(player, false);
                break;
              case 3:
                // Trigger waiting event to add loading classes to container as the video buffers.
                triggerEvent.call(player, player.media, 'waiting');
                break;
            }
            triggerEvent.call(player, player.elements.container, 'statechange', false, {
              code: event.data
            });
          }
        }
      });
    }
  };

  // ==========================================================================
  const media = {
    // Setup media
    setup() {
      // If there's no media, bail
      if (!this.media) {
        this.debug.warn('No media element found!');
        return;
      }

      // Add type class
      toggleClass(this.elements.container, this.config.classNames.type.replace('{0}', this.type), true);

      // Add provider class
      toggleClass(this.elements.container, this.config.classNames.provider.replace('{0}', this.provider), true);

      // Add video class for embeds
      // This will require changes if audio embeds are added
      if (this.isEmbed) {
        toggleClass(this.elements.container, this.config.classNames.type.replace('{0}', 'video'), true);
      }

      // Inject the player wrapper
      if (this.isVideo) {
        // Create the wrapper div
        this.elements.wrapper = createElement('div', {
          class: this.config.classNames.video
        });

        // Wrap the video in a container
        wrap(this.media, this.elements.wrapper);

        // Poster image container
        this.elements.poster = createElement('div', {
          class: this.config.classNames.poster
        });
        this.elements.wrapper.appendChild(this.elements.poster);
      }
      if (this.isHTML5) {
        html5.setup.call(this);
      } else if (this.isYouTube) {
        youtube.setup.call(this);
      } else if (this.isVimeo) {
        vimeo.setup.call(this);
      }
    }
  };

  const destroy = instance => {
    // Destroy our adsManager
    if (instance.manager) {
      instance.manager.destroy();
    }

    // Destroy our adsManager
    if (instance.elements.displayContainer) {
      instance.elements.displayContainer.destroy();
    }
    instance.elements.container.remove();
  };
  class Ads {
    /**
     * Ads constructor.
     * @param {Object} player
     * @return {Ads}
     */
    constructor(player) {
      _defineProperty$1(this, "load", () => {
        if (!this.enabled) {
          return;
        }

        // Check if the Google IMA3 SDK is loaded or load it ourselves
        if (!is.object(window.google) || !is.object(window.google.ima)) {
          loadScript(this.player.config.urls.googleIMA.sdk).then(() => {
            this.ready();
          }).catch(() => {
            // Script failed to load or is blocked
            this.trigger('error', new Error('Google IMA SDK failed to load'));
          });
        } else {
          this.ready();
        }
      });
      _defineProperty$1(this, "ready", () => {
        // Double check we're enabled
        if (!this.enabled) {
          destroy(this);
        }

        // Start ticking our safety timer. If the whole advertisement
        // thing doesn't resolve within our set time; we bail
        this.startSafetyTimer(12000, 'ready()');

        // Clear the safety timer
        this.managerPromise.then(() => {
          this.clearSafetyTimer('onAdsManagerLoaded()');
        });

        // Set listeners on the Plyr instance
        this.listeners();

        // Setup the IMA SDK
        this.setupIMA();
      });
      _defineProperty$1(this, "setupIMA", () => {
        // Create the container for our advertisements
        this.elements.container = createElement('div', {
          class: this.player.config.classNames.ads
        });
        this.player.elements.container.appendChild(this.elements.container);

        // So we can run VPAID2
        google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);

        // Set language
        google.ima.settings.setLocale(this.player.config.ads.language);

        // Set playback for iOS10+
        google.ima.settings.setDisableCustomPlaybackForIOS10Plus(this.player.config.playsinline);

        // We assume the adContainer is the video container of the plyr element that will house the ads
        this.elements.displayContainer = new google.ima.AdDisplayContainer(this.elements.container, this.player.media);

        // Create ads loader
        this.loader = new google.ima.AdsLoader(this.elements.displayContainer);

        // Listen and respond to ads loaded and error events
        this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, event => this.onAdsManagerLoaded(event), false);
        this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, error => this.onAdError(error), false);

        // Request video ads to be pre-loaded
        this.requestAds();
      });
      _defineProperty$1(this, "requestAds", () => {
        const {
          container
        } = this.player.elements;
        try {
          // Request video ads
          const request = new google.ima.AdsRequest();
          request.adTagUrl = this.tagUrl;

          // Specify the linear and nonlinear slot sizes. This helps the SDK
          // to select the correct creative if multiple are returned
          request.linearAdSlotWidth = container.offsetWidth;
          request.linearAdSlotHeight = container.offsetHeight;
          request.nonLinearAdSlotWidth = container.offsetWidth;
          request.nonLinearAdSlotHeight = container.offsetHeight;

          // We only overlay ads as we only support video.
          request.forceNonLinearFullSlot = false;

          // Mute based on current state
          request.setAdWillPlayMuted(!this.player.muted);
          this.loader.requestAds(request);
        } catch (error) {
          this.onAdError(error);
        }
      });
      _defineProperty$1(this, "pollCountdown", (start = false) => {
        if (!start) {
          clearInterval(this.countdownTimer);
          this.elements.container.removeAttribute('data-badge-text');
          return;
        }
        const update = () => {
          const time = formatTime(Math.max(this.manager.getRemainingTime(), 0));
          const label = `${i18n.get('advertisement', this.player.config)} - ${time}`;
          this.elements.container.setAttribute('data-badge-text', label);
        };
        this.countdownTimer = setInterval(update, 100);
      });
      _defineProperty$1(this, "onAdsManagerLoaded", event => {
        // Load could occur after a source change (race condition)
        if (!this.enabled) {
          return;
        }

        // Get the ads manager
        const settings = new google.ima.AdsRenderingSettings();

        // Tell the SDK to save and restore content video state on our behalf
        settings.restoreCustomPlaybackStateOnAdBreakComplete = true;
        settings.enablePreloading = true;

        // The SDK is polling currentTime on the contentPlayback. And needs a duration
        // so it can determine when to start the mid- and post-roll
        this.manager = event.getAdsManager(this.player, settings);

        // Get the cue points for any mid-rolls by filtering out the pre- and post-roll
        this.cuePoints = this.manager.getCuePoints();

        // Add listeners to the required events
        // Advertisement error events
        this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, error => this.onAdError(error));

        // Advertisement regular events
        Object.keys(google.ima.AdEvent.Type).forEach(type => {
          this.manager.addEventListener(google.ima.AdEvent.Type[type], e => this.onAdEvent(e));
        });

        // Resolve our adsManager
        this.trigger('loaded');
      });
      _defineProperty$1(this, "addCuePoints", () => {
        // Add advertisement cue's within the time line if available
        if (!is.empty(this.cuePoints)) {
          this.cuePoints.forEach(cuePoint => {
            if (cuePoint !== 0 && cuePoint !== -1 && cuePoint < this.player.duration) {
              const seekElement = this.player.elements.progress;
              if (is.element(seekElement)) {
                const cuePercentage = 100 / this.player.duration * cuePoint;
                const cue = createElement('span', {
                  class: this.player.config.classNames.cues
                });
                cue.style.left = `${cuePercentage.toString()}%`;
                seekElement.appendChild(cue);
              }
            }
          });
        }
      });
      _defineProperty$1(this, "onAdEvent", event => {
        const {
          container
        } = this.player.elements;
        // Retrieve the ad from the event. Some events (e.g. ALL_ADS_COMPLETED)
        // don't have ad object associated
        const ad = event.getAd();
        const adData = event.getAdData();

        // Proxy event
        const dispatchEvent = type => {
          triggerEvent.call(this.player, this.player.media, `ads${type.replace(/_/g, '').toLowerCase()}`);
        };

        // Bubble the event
        dispatchEvent(event.type);
        switch (event.type) {
          case google.ima.AdEvent.Type.LOADED:
            // This is the first event sent for an ad - it is possible to determine whether the
            // ad is a video ad or an overlay
            this.trigger('loaded');

            // Start countdown
            this.pollCountdown(true);
            if (!ad.isLinear()) {
              // Position AdDisplayContainer correctly for overlay
              ad.width = container.offsetWidth;
              ad.height = container.offsetHeight;
            }

            // console.info('Ad type: ' + event.getAd().getAdPodInfo().getPodIndex());
            // console.info('Ad time: ' + event.getAd().getAdPodInfo().getTimeOffset());

            break;
          case google.ima.AdEvent.Type.STARTED:
            // Set volume to match player
            this.manager.setVolume(this.player.volume);
            break;
          case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
            // All ads for the current videos are done. We can now request new advertisements
            // in case the video is re-played

            // TODO: Example for what happens when a next video in a playlist would be loaded.
            // So here we load a new video when all ads are done.
            // Then we load new ads within a new adsManager. When the video
            // Is started - after - the ads are loaded, then we get ads.
            // You can also easily test cancelling and reloading by running
            // player.ads.cancel() and player.ads.play from the console I guess.
            // this.player.source = {
            //     type: 'video',
            //     title: 'View From A Blue Moon',
            //     sources: [{
            //         src:
            // 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.mp4', type:
            // 'video/mp4', }], poster:
            // 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg', tracks:
            // [ { kind: 'captions', label: 'English', srclang: 'en', src:
            // 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt',
            // default: true, }, { kind: 'captions', label: 'French', srclang: 'fr', src:
            // 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt', }, ],
            // };

            // TODO: So there is still this thing where a video should only be allowed to start
            // playing when the IMA SDK is ready or has failed

            if (this.player.ended) {
              this.loadAds();
            } else {
              // The SDK won't allow new ads to be called without receiving a contentComplete()
              this.loader.contentComplete();
            }
            break;
          case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
            // This event indicates the ad has started - the video player can adjust the UI,
            // for example display a pause button and remaining time. Fired when content should
            // be paused. This usually happens right before an ad is about to cover the content

            this.pauseContent();
            break;
          case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
            // This event indicates the ad has finished - the video player can perform
            // appropriate UI actions, such as removing the timer for remaining time detection.
            // Fired when content should be resumed. This usually happens when an ad finishes
            // or collapses

            this.pollCountdown();
            this.resumeContent();
            break;
          case google.ima.AdEvent.Type.LOG:
            if (adData.adError) {
              this.player.debug.warn(`Non-fatal ad error: ${adData.adError.getMessage()}`);
            }
            break;
        }
      });
      _defineProperty$1(this, "onAdError", event => {
        this.cancel();
        this.player.debug.warn('Ads error', event);
      });
      _defineProperty$1(this, "listeners", () => {
        const {
          container
        } = this.player.elements;
        let time;
        this.player.on('canplay', () => {
          this.addCuePoints();
        });
        this.player.on('ended', () => {
          this.loader.contentComplete();
        });
        this.player.on('timeupdate', () => {
          time = this.player.currentTime;
        });
        this.player.on('seeked', () => {
          const seekedTime = this.player.currentTime;
          if (is.empty(this.cuePoints)) {
            return;
          }
          this.cuePoints.forEach((cuePoint, index) => {
            if (time < cuePoint && cuePoint < seekedTime) {
              this.manager.discardAdBreak();
              this.cuePoints.splice(index, 1);
            }
          });
        });

        // Listen to the resizing of the window. And resize ad accordingly
        // TODO: eventually implement ResizeObserver
        window.addEventListener('resize', () => {
          if (this.manager) {
            this.manager.resize(container.offsetWidth, container.offsetHeight, google.ima.ViewMode.NORMAL);
          }
        });
      });
      _defineProperty$1(this, "play", () => {
        const {
          container
        } = this.player.elements;
        if (!this.managerPromise) {
          this.resumeContent();
        }

        // Play the requested advertisement whenever the adsManager is ready
        this.managerPromise.then(() => {
          // Set volume to match player
          this.manager.setVolume(this.player.volume);

          // Initialize the container. Must be done via a user action on mobile devices
          this.elements.displayContainer.initialize();
          try {
            if (!this.initialized) {
              // Initialize the ads manager. Ad rules playlist will start at this time
              this.manager.init(container.offsetWidth, container.offsetHeight, google.ima.ViewMode.NORMAL);

              // Call play to start showing the ad. Single video and overlay ads will
              // start at this time; the call will be ignored for ad rules
              this.manager.start();
            }
            this.initialized = true;
          } catch (adError) {
            // An error may be thrown if there was a problem with the
            // VAST response
            this.onAdError(adError);
          }
        }).catch(() => {});
      });
      _defineProperty$1(this, "resumeContent", () => {
        // Hide the advertisement container
        this.elements.container.style.zIndex = '';

        // Ad is stopped
        this.playing = false;

        // Play video
        silencePromise(this.player.media.play());
      });
      _defineProperty$1(this, "pauseContent", () => {
        // Show the advertisement container
        this.elements.container.style.zIndex = 3;

        // Ad is playing
        this.playing = true;

        // Pause our video.
        this.player.media.pause();
      });
      _defineProperty$1(this, "cancel", () => {
        // Pause our video
        if (this.initialized) {
          this.resumeContent();
        }

        // Tell our instance that we're done for now
        this.trigger('error');

        // Re-create our adsManager
        this.loadAds();
      });
      _defineProperty$1(this, "loadAds", () => {
        // Tell our adsManager to go bye bye
        this.managerPromise.then(() => {
          // Destroy our adsManager
          if (this.manager) {
            this.manager.destroy();
          }

          // Re-set our adsManager promises
          this.managerPromise = new Promise(resolve => {
            this.on('loaded', resolve);
            this.player.debug.log(this.manager);
          });
          // Now that the manager has been destroyed set it to also be un-initialized
          this.initialized = false;

          // Now request some new advertisements
          this.requestAds();
        }).catch(() => {});
      });
      _defineProperty$1(this, "trigger", (event, ...args) => {
        const handlers = this.events[event];
        if (is.array(handlers)) {
          handlers.forEach(handler => {
            if (is.function(handler)) {
              handler.apply(this, args);
            }
          });
        }
      });
      _defineProperty$1(this, "on", (event, callback) => {
        if (!is.array(this.events[event])) {
          this.events[event] = [];
        }
        this.events[event].push(callback);
        return this;
      });
      _defineProperty$1(this, "startSafetyTimer", (time, from) => {
        this.player.debug.log(`Safety timer invoked from: ${from}`);
        this.safetyTimer = setTimeout(() => {
          this.cancel();
          this.clearSafetyTimer('startSafetyTimer()');
        }, time);
      });
      _defineProperty$1(this, "clearSafetyTimer", from => {
        if (!is.nullOrUndefined(this.safetyTimer)) {
          this.player.debug.log(`Safety timer cleared from: ${from}`);
          clearTimeout(this.safetyTimer);
          this.safetyTimer = null;
        }
      });
      this.player = player;
      this.config = player.config.ads;
      this.playing = false;
      this.initialized = false;
      this.elements = {
        container: null,
        displayContainer: null
      };
      this.manager = null;
      this.loader = null;
      this.cuePoints = null;
      this.events = {};
      this.safetyTimer = null;
      this.countdownTimer = null;

      // Setup a promise to resolve when the IMA manager is ready
      this.managerPromise = new Promise((resolve, reject) => {
        // The ad is loaded and ready
        this.on('loaded', resolve);

        // Ads failed
        this.on('error', reject);
      });
      this.load();
    }
    get enabled() {
      const {
        config
      } = this;
      return this.player.isHTML5 && this.player.isVideo && config.enabled && (!is.empty(config.publisherId) || is.url(config.tagUrl));
    }

    /**
     * Load the IMA SDK
     */

    // Build the tag URL
    get tagUrl() {
      const {
        config
      } = this;
      if (is.url(config.tagUrl)) {
        return config.tagUrl;
      }
      const params = {
        AV_PUBLISHERID: '58c25bb0073ef448b1087ad6',
        AV_CHANNELID: '5a0458dc28a06145e4519d21',
        AV_URL: window.location.hostname,
        cb: Date.now(),
        AV_WIDTH: 640,
        AV_HEIGHT: 480,
        AV_CDIM2: config.publisherId
      };
      const base = 'https://go.aniview.com/api/adserver6/vast/';
      return `${base}?${buildUrlParams(params)}`;
    }

    /**
     * In order for the SDK to display ads for our video, we need to tell it where to put them,
     * so here we define our ad container. This div is set up to render on top of the video player.
     * Using the code below, we tell the SDK to render ads within that div. We also provide a
     * handle to the content video player - the SDK will poll the current time of our player to
     * properly place mid-rolls. After we create the ad display container, we initialize it. On
     * mobile devices, this initialization is done as the result of a user action.
     */
  }

  /**
   * Returns a number whose value is limited to the given range.
   *
   * Example: limit the output of this computation to between 0 and 255
   * (x * 255).clamp(0, 255)
   *
   * @param {Number} input
   * @param {Number} min The lower boundary of the output range
   * @param {Number} max The upper boundary of the output range
   * @returns A number within the bounds of min and max
   * @type Number
   */
  function clamp(input = 0, min = 0, max = 255) {
    return Math.min(Math.max(input, min), max);
  }

  // Arg: vttDataString example: "WEBVTT\n\n1\n00:00:05.000 --> 00:00:10.000\n1080p-00001.jpg"
  const parseVtt = vttDataString => {
    const processedList = [];
    const frames = vttDataString.split(/\r\n\r\n|\n\n|\r\r/);
    frames.forEach(frame => {
      const result = {};
      const lines = frame.split(/\r\n|\n|\r/);
      lines.forEach(line => {
        if (!is.number(result.startTime)) {
          // The line with start and end times on it is the first line of interest
          const matchTimes = line.match(/([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/); // Note that this currently ignores caption formatting directives that are optionally on the end of this line - fine for non-captions VTT

          if (matchTimes) {
            result.startTime = Number(matchTimes[1] || 0) * 60 * 60 + Number(matchTimes[2]) * 60 + Number(matchTimes[3]) + Number(`0.${matchTimes[4]}`);
            result.endTime = Number(matchTimes[6] || 0) * 60 * 60 + Number(matchTimes[7]) * 60 + Number(matchTimes[8]) + Number(`0.${matchTimes[9]}`);
          }
        } else if (!is.empty(line.trim()) && is.empty(result.text)) {
          // If we already have the startTime, then we're definitely up to the text line(s)
          const lineSplit = line.trim().split('#xywh=');
          [result.text] = lineSplit;

          // If there's content in lineSplit[1], then we have sprites. If not, then it's just one frame per image
          if (lineSplit[1]) {
            [result.x, result.y, result.w, result.h] = lineSplit[1].split(',');
          }
        }
      });
      if (result.text) {
        processedList.push(result);
      }
    });
    return processedList;
  };

  /**
   * Preview thumbnails for seek hover and scrubbing
   * Seeking: Hover over the seek bar (desktop only): shows a small preview container above the seek bar
   * Scrubbing: Click and drag the seek bar (desktop and mobile): shows the preview image over the entire video, as if the video is scrubbing at very high speed
   *
   * Notes:
   * - Thumbs are set via JS settings on Plyr init, not HTML5 'track' property. Using the track property would be a bit gross, because it doesn't support custom 'kinds'. kind=metadata might be used for something else, and we want to allow multiple thumbnails tracks. Tracks must have a unique combination of 'kind' and 'label'. We would have to do something like kind=metadata,label=thumbnails1 / kind=metadata,label=thumbnails2. Square peg, round hole
   * - VTT info: the image URL is relative to the VTT, not the current document. But if the url starts with a slash, it will naturally be relative to the current domain. https://support.jwplayer.com/articles/how-to-add-preview-thumbnails
   * - This implementation uses multiple separate img elements. Other implementations use background-image on one element. This would be nice and simple, but Firefox and Safari have flickering issues with replacing backgrounds of larger images. It seems that YouTube perhaps only avoids this because they don't have the option for high-res previews (even the fullscreen ones, when mousedown/seeking). Images appear over the top of each other, and previous ones are discarded once the new ones have been rendered
   */

  const fitRatio = (ratio, outer) => {
    const targetRatio = outer.width / outer.height;
    const result = {};
    if (ratio > targetRatio) {
      result.width = outer.width;
      result.height = 1 / ratio * outer.width;
    } else {
      result.height = outer.height;
      result.width = ratio * outer.height;
    }
    return result;
  };
  class PreviewThumbnails {
    /**
     * PreviewThumbnails constructor.
     * @param {Plyr} player
     * @return {PreviewThumbnails}
     */
    constructor(player) {
      _defineProperty$1(this, "load", () => {
        // Toggle the regular seek tooltip
        if (this.player.elements.display.seekTooltip) {
          this.player.elements.display.seekTooltip.hidden = this.enabled;
        }
        if (!this.enabled) return;
        this.getThumbnails().then(() => {
          if (!this.enabled) {
            return;
          }

          // Render DOM elements
          this.render();

          // Check to see if thumb container size was specified manually in CSS
          this.determineContainerAutoSizing();
          this.loaded = true;
        });
      });
      _defineProperty$1(this, "getThumbnails", () => {
        return new Promise(resolve => {
          const {
            src
          } = this.player.config.previewThumbnails;
          if (is.empty(src)) {
            throw new Error('Missing previewThumbnails.src config attribute');
          }

          // Resolve promise
          const sortAndResolve = () => {
            // Sort smallest to biggest (e.g., [120p, 480p, 1080p])
            this.thumbnails.sort((x, y) => x.height - y.height);
            this.player.debug.log('Preview thumbnails', this.thumbnails);
            resolve();
          };

          // Via callback()
          if (is.function(src)) {
            src(thumbnails => {
              this.thumbnails = thumbnails;
              sortAndResolve();
            });
          }
          // VTT urls
          else {
            // If string, convert into single-element list
            const urls = is.string(src) ? [src] : src;
            // Loop through each src URL. Download and process the VTT file, storing the resulting data in this.thumbnails
            const promises = urls.map(u => this.getThumbnail(u));
            // Resolve
            Promise.all(promises).then(sortAndResolve);
          }
        });
      });
      _defineProperty$1(this, "getThumbnail", url => {
        return new Promise(resolve => {
          fetch(url).then(response => {
            const thumbnail = {
              frames: parseVtt(response),
              height: null,
              urlPrefix: ''
            };

            // If the URLs don't start with '/', then we need to set their relative path to be the location of the VTT file
            // If the URLs do start with '/', then they obviously don't need a prefix, so it will remain blank
            // If the thumbnail URLs start with with none of '/', 'http://' or 'https://', then we need to set their relative path to be the location of the VTT file
            if (!thumbnail.frames[0].text.startsWith('/') && !thumbnail.frames[0].text.startsWith('http://') && !thumbnail.frames[0].text.startsWith('https://')) {
              thumbnail.urlPrefix = url.substring(0, url.lastIndexOf('/') + 1);
            }

            // Download the first frame, so that we can determine/set the height of this thumbnailsDef
            const tempImage = new Image();
            tempImage.onload = () => {
              thumbnail.height = tempImage.naturalHeight;
              thumbnail.width = tempImage.naturalWidth;
              this.thumbnails.push(thumbnail);
              resolve();
            };
            tempImage.src = thumbnail.urlPrefix + thumbnail.frames[0].text;
          });
        });
      });
      _defineProperty$1(this, "startMove", event => {
        if (!this.loaded) return;
        if (!is.event(event) || !['touchmove', 'mousemove'].includes(event.type)) return;

        // Wait until media has a duration
        if (!this.player.media.duration) return;
        if (event.type === 'touchmove') {
          // Calculate seek hover position as approx video seconds
          this.seekTime = this.player.media.duration * (this.player.elements.inputs.seek.value / 100);
        } else {
          var _this$player$config$m, _this$player$config$m2;
          // Calculate seek hover position as approx video seconds
          const clientRect = this.player.elements.progress.getBoundingClientRect();
          const percentage = 100 / clientRect.width * (event.pageX - clientRect.left);
          this.seekTime = this.player.media.duration * (percentage / 100);
          if (this.seekTime < 0) {
            // The mousemove fires for 10+px out to the left
            this.seekTime = 0;
          }
          if (this.seekTime > this.player.media.duration - 1) {
            // Took 1 second off the duration for safety, because different players can disagree on the real duration of a video
            this.seekTime = this.player.media.duration - 1;
          }
          this.mousePosX = event.pageX;

          // Set time text inside image container
          this.elements.thumb.time.innerText = formatTime(this.seekTime);

          // Get marker point for time
          const point = (_this$player$config$m = this.player.config.markers) === null || _this$player$config$m === void 0 ? void 0 : (_this$player$config$m2 = _this$player$config$m.points) === null || _this$player$config$m2 === void 0 ? void 0 : _this$player$config$m2.find(({
            time: t
          }) => t === Math.round(this.seekTime));

          // Append the point label to the tooltip
          if (point) {
            // this.elements.thumb.time.innerText.concat('\n');
            this.elements.thumb.time.insertAdjacentHTML('afterbegin', `${point.label}<br>`);
          }
        }

        // Download and show image
        this.showImageAtCurrentTime();
      });
      _defineProperty$1(this, "endMove", () => {
        this.toggleThumbContainer(false, true);
      });
      _defineProperty$1(this, "startScrubbing", event => {
        // Only act on left mouse button (0), or touch device (event.button does not exist or is false)
        if (is.nullOrUndefined(event.button) || event.button === false || event.button === 0) {
          this.mouseDown = true;

          // Wait until media has a duration
          if (this.player.media.duration) {
            this.toggleScrubbingContainer(true);
            this.toggleThumbContainer(false, true);

            // Download and show image
            this.showImageAtCurrentTime();
          }
        }
      });
      _defineProperty$1(this, "endScrubbing", () => {
        this.mouseDown = false;

        // Hide scrubbing preview. But wait until the video has successfully seeked before hiding the scrubbing preview
        if (Math.ceil(this.lastTime) === Math.ceil(this.player.media.currentTime)) {
          // The video was already seeked/loaded at the chosen time - hide immediately
          this.toggleScrubbingContainer(false);
        } else {
          // The video hasn't seeked yet. Wait for that
          once.call(this.player, this.player.media, 'timeupdate', () => {
            // Re-check mousedown - we might have already started scrubbing again
            if (!this.mouseDown) {
              this.toggleScrubbingContainer(false);
            }
          });
        }
      });
      _defineProperty$1(this, "listeners", () => {
        // Hide thumbnail preview - on mouse click, mouse leave (in listeners.js for now), and video play/seek. All four are required, e.g., for buffering
        this.player.on('play', () => {
          this.toggleThumbContainer(false, true);
        });
        this.player.on('seeked', () => {
          this.toggleThumbContainer(false);
        });
        this.player.on('timeupdate', () => {
          this.lastTime = this.player.media.currentTime;
        });
      });
      _defineProperty$1(this, "render", () => {
        // Create HTML element: plyr__preview-thumbnail-container
        this.elements.thumb.container = createElement('div', {
          class: this.player.config.classNames.previewThumbnails.thumbContainer
        });

        // Wrapper for the image for styling
        this.elements.thumb.imageContainer = createElement('div', {
          class: this.player.config.classNames.previewThumbnails.imageContainer
        });
        this.elements.thumb.container.appendChild(this.elements.thumb.imageContainer);

        // Create HTML element, parent+span: time text (e.g., 01:32:00)
        const timeContainer = createElement('div', {
          class: this.player.config.classNames.previewThumbnails.timeContainer
        });
        this.elements.thumb.time = createElement('span', {}, '00:00');
        timeContainer.appendChild(this.elements.thumb.time);
        this.elements.thumb.imageContainer.appendChild(timeContainer);

        // Inject the whole thumb
        if (is.element(this.player.elements.progress)) {
          this.player.elements.progress.appendChild(this.elements.thumb.container);
        }

        // Create HTML element: plyr__preview-scrubbing-container
        this.elements.scrubbing.container = createElement('div', {
          class: this.player.config.classNames.previewThumbnails.scrubbingContainer
        });
        this.player.elements.wrapper.appendChild(this.elements.scrubbing.container);
      });
      _defineProperty$1(this, "destroy", () => {
        if (this.elements.thumb.container) {
          this.elements.thumb.container.remove();
        }
        if (this.elements.scrubbing.container) {
          this.elements.scrubbing.container.remove();
        }
      });
      _defineProperty$1(this, "showImageAtCurrentTime", () => {
        if (this.mouseDown) {
          this.setScrubbingContainerSize();
        } else {
          this.setThumbContainerSizeAndPos();
        }

        // Find the desired thumbnail index
        // TODO: Handle a video longer than the thumbs where thumbNum is null
        const thumbNum = this.thumbnails[0].frames.findIndex(frame => this.seekTime >= frame.startTime && this.seekTime <= frame.endTime);
        const hasThumb = thumbNum >= 0;
        let qualityIndex = 0;

        // Show the thumb container if we're not scrubbing
        if (!this.mouseDown) {
          this.toggleThumbContainer(hasThumb);
        }

        // No matching thumb found
        if (!hasThumb) {
          return;
        }

        // Check to see if we've already downloaded higher quality versions of this image
        this.thumbnails.forEach((thumbnail, index) => {
          if (this.loadedImages.includes(thumbnail.frames[thumbNum].text)) {
            qualityIndex = index;
          }
        });

        // Only proceed if either thumb num or thumbfilename has changed
        if (thumbNum !== this.showingThumb) {
          this.showingThumb = thumbNum;
          this.loadImage(qualityIndex);
        }
      });
      _defineProperty$1(this, "loadImage", (qualityIndex = 0) => {
        const thumbNum = this.showingThumb;
        const thumbnail = this.thumbnails[qualityIndex];
        const {
          urlPrefix
        } = thumbnail;
        const frame = thumbnail.frames[thumbNum];
        const thumbFilename = thumbnail.frames[thumbNum].text;
        const thumbUrl = urlPrefix + thumbFilename;
        if (!this.currentImageElement || this.currentImageElement.dataset.filename !== thumbFilename) {
          // If we're already loading a previous image, remove its onload handler - we don't want it to load after this one
          // Only do this if not using sprites. Without sprites we really want to show as many images as possible, as a best-effort
          if (this.loadingImage && this.usingSprites) {
            this.loadingImage.onload = null;
          }

          // We're building and adding a new image. In other implementations of similar functionality (YouTube), background image
          // is instead used. But this causes issues with larger images in Firefox and Safari - switching between background
          // images causes a flicker. Putting a new image over the top does not
          const previewImage = new Image();
          previewImage.src = thumbUrl;
          previewImage.dataset.index = thumbNum;
          previewImage.dataset.filename = thumbFilename;
          this.showingThumbFilename = thumbFilename;
          this.player.debug.log(`Loading image: ${thumbUrl}`);

          // For some reason, passing the named function directly causes it to execute immediately. So I've wrapped it in an anonymous function...
          previewImage.onload = () => this.showImage(previewImage, frame, qualityIndex, thumbNum, thumbFilename, true);
          this.loadingImage = previewImage;
          this.removeOldImages(previewImage);
        } else {
          // Update the existing image
          this.showImage(this.currentImageElement, frame, qualityIndex, thumbNum, thumbFilename, false);
          this.currentImageElement.dataset.index = thumbNum;
          this.removeOldImages(this.currentImageElement);
        }
      });
      _defineProperty$1(this, "showImage", (previewImage, frame, qualityIndex, thumbNum, thumbFilename, newImage = true) => {
        this.player.debug.log(`Showing thumb: ${thumbFilename}. num: ${thumbNum}. qual: ${qualityIndex}. newimg: ${newImage}`);
        this.setImageSizeAndOffset(previewImage, frame);
        if (newImage) {
          this.currentImageContainer.appendChild(previewImage);
          this.currentImageElement = previewImage;
          if (!this.loadedImages.includes(thumbFilename)) {
            this.loadedImages.push(thumbFilename);
          }
        }

        // Preload images before and after the current one
        // Show higher quality of the same frame
        // Each step here has a short time delay, and only continues if still hovering/seeking the same spot. This is to protect slow connections from overloading
        this.preloadNearby(thumbNum, true).then(this.preloadNearby(thumbNum, false)).then(this.getHigherQuality(qualityIndex, previewImage, frame, thumbFilename));
      });
      _defineProperty$1(this, "removeOldImages", currentImage => {
        // Get a list of all images, convert it from a DOM list to an array
        Array.from(this.currentImageContainer.children).forEach(image => {
          if (image.tagName.toLowerCase() !== 'img') {
            return;
          }
          const removeDelay = this.usingSprites ? 500 : 1000;
          if (image.dataset.index !== currentImage.dataset.index && !image.dataset.deleting) {
            // Wait 200ms, as the new image can take some time to show on certain browsers (even though it was downloaded before showing). This will prevent flicker, and show some generosity towards slower clients
            // First set attribute 'deleting' to prevent multi-handling of this on repeat firing of this function
            // eslint-disable-next-line no-param-reassign
            image.dataset.deleting = true;

            // This has to be set before the timeout - to prevent issues switching between hover and scrub
            const {
              currentImageContainer
            } = this;
            setTimeout(() => {
              currentImageContainer.removeChild(image);
              this.player.debug.log(`Removing thumb: ${image.dataset.filename}`);
            }, removeDelay);
          }
        });
      });
      _defineProperty$1(this, "preloadNearby", (thumbNum, forward = true) => {
        return new Promise(resolve => {
          setTimeout(() => {
            const oldThumbFilename = this.thumbnails[0].frames[thumbNum].text;
            if (this.showingThumbFilename === oldThumbFilename) {
              // Find the nearest thumbs with different filenames. Sometimes it'll be the next index, but in the case of sprites, it might be 100+ away
              let thumbnailsClone;
              if (forward) {
                thumbnailsClone = this.thumbnails[0].frames.slice(thumbNum);
              } else {
                thumbnailsClone = this.thumbnails[0].frames.slice(0, thumbNum).reverse();
              }
              let foundOne = false;
              thumbnailsClone.forEach(frame => {
                const newThumbFilename = frame.text;
                if (newThumbFilename !== oldThumbFilename) {
                  // Found one with a different filename. Make sure it hasn't already been loaded on this page visit
                  if (!this.loadedImages.includes(newThumbFilename)) {
                    foundOne = true;
                    this.player.debug.log(`Preloading thumb filename: ${newThumbFilename}`);
                    const {
                      urlPrefix
                    } = this.thumbnails[0];
                    const thumbURL = urlPrefix + newThumbFilename;
                    const previewImage = new Image();
                    previewImage.src = thumbURL;
                    previewImage.onload = () => {
                      this.player.debug.log(`Preloaded thumb filename: ${newThumbFilename}`);
                      if (!this.loadedImages.includes(newThumbFilename)) this.loadedImages.push(newThumbFilename);

                      // We don't resolve until the thumb is loaded
                      resolve();
                    };
                  }
                }
              });

              // If there are none to preload then we want to resolve immediately
              if (!foundOne) {
                resolve();
              }
            }
          }, 300);
        });
      });
      _defineProperty$1(this, "getHigherQuality", (currentQualityIndex, previewImage, frame, thumbFilename) => {
        if (currentQualityIndex < this.thumbnails.length - 1) {
          // Only use the higher quality version if it's going to look any better - if the current thumb is of a lower pixel density than the thumbnail container
          let previewImageHeight = previewImage.naturalHeight;
          if (this.usingSprites) {
            previewImageHeight = frame.h;
          }
          if (previewImageHeight < this.thumbContainerHeight) {
            // Recurse back to the loadImage function - show a higher quality one, but only if the viewer is on this frame for a while
            setTimeout(() => {
              // Make sure the mouse hasn't already moved on and started hovering at another image
              if (this.showingThumbFilename === thumbFilename) {
                this.player.debug.log(`Showing higher quality thumb for: ${thumbFilename}`);
                this.loadImage(currentQualityIndex + 1);
              }
            }, 300);
          }
        }
      });
      _defineProperty$1(this, "toggleThumbContainer", (toggle = false, clearShowing = false) => {
        const className = this.player.config.classNames.previewThumbnails.thumbContainerShown;
        this.elements.thumb.container.classList.toggle(className, toggle);
        if (!toggle && clearShowing) {
          this.showingThumb = null;
          this.showingThumbFilename = null;
        }
      });
      _defineProperty$1(this, "toggleScrubbingContainer", (toggle = false) => {
        const className = this.player.config.classNames.previewThumbnails.scrubbingContainerShown;
        this.elements.scrubbing.container.classList.toggle(className, toggle);
        if (!toggle) {
          this.showingThumb = null;
          this.showingThumbFilename = null;
        }
      });
      _defineProperty$1(this, "determineContainerAutoSizing", () => {
        if (this.elements.thumb.imageContainer.clientHeight > 20 || this.elements.thumb.imageContainer.clientWidth > 20) {
          // This will prevent auto sizing in this.setThumbContainerSizeAndPos()
          this.sizeSpecifiedInCSS = true;
        }
      });
      _defineProperty$1(this, "setThumbContainerSizeAndPos", () => {
        const {
          imageContainer
        } = this.elements.thumb;
        if (!this.sizeSpecifiedInCSS) {
          const thumbWidth = Math.floor(this.thumbContainerHeight * this.thumbAspectRatio);
          imageContainer.style.height = `${this.thumbContainerHeight}px`;
          imageContainer.style.width = `${thumbWidth}px`;
        } else if (imageContainer.clientHeight > 20 && imageContainer.clientWidth < 20) {
          const thumbWidth = Math.floor(imageContainer.clientHeight * this.thumbAspectRatio);
          imageContainer.style.width = `${thumbWidth}px`;
        } else if (imageContainer.clientHeight < 20 && imageContainer.clientWidth > 20) {
          const thumbHeight = Math.floor(imageContainer.clientWidth / this.thumbAspectRatio);
          imageContainer.style.height = `${thumbHeight}px`;
        }
        this.setThumbContainerPos();
      });
      _defineProperty$1(this, "setThumbContainerPos", () => {
        const scrubberRect = this.player.elements.progress.getBoundingClientRect();
        const containerRect = this.player.elements.container.getBoundingClientRect();
        const {
          container
        } = this.elements.thumb;
        // Find the lowest and highest desired left-position, so we don't slide out the side of the video container
        const min = containerRect.left - scrubberRect.left + 10;
        const max = containerRect.right - scrubberRect.left - container.clientWidth - 10;
        // Set preview container position to: mousepos, minus seekbar.left, minus half of previewContainer.clientWidth
        const position = this.mousePosX - scrubberRect.left - container.clientWidth / 2;
        const clamped = clamp(position, min, max);

        // Move the popover position
        container.style.left = `${clamped}px`;

        // The arrow can follow the cursor
        container.style.setProperty('--preview-arrow-offset', `${position - clamped}px`);
      });
      _defineProperty$1(this, "setScrubbingContainerSize", () => {
        const {
          width,
          height
        } = fitRatio(this.thumbAspectRatio, {
          width: this.player.media.clientWidth,
          height: this.player.media.clientHeight
        });
        this.elements.scrubbing.container.style.width = `${width}px`;
        this.elements.scrubbing.container.style.height = `${height}px`;
      });
      _defineProperty$1(this, "setImageSizeAndOffset", (previewImage, frame) => {
        if (!this.usingSprites) return;

        // Find difference between height and preview container height
        const multiplier = this.thumbContainerHeight / frame.h;

        // eslint-disable-next-line no-param-reassign
        previewImage.style.height = `${previewImage.naturalHeight * multiplier}px`;
        // eslint-disable-next-line no-param-reassign
        previewImage.style.width = `${previewImage.naturalWidth * multiplier}px`;
        // eslint-disable-next-line no-param-reassign
        previewImage.style.left = `-${frame.x * multiplier}px`;
        // eslint-disable-next-line no-param-reassign
        previewImage.style.top = `-${frame.y * multiplier}px`;
      });
      this.player = player;
      this.thumbnails = [];
      this.loaded = false;
      this.lastMouseMoveTime = Date.now();
      this.mouseDown = false;
      this.loadedImages = [];
      this.elements = {
        thumb: {},
        scrubbing: {}
      };
      this.load();
    }
    get enabled() {
      return this.player.isHTML5 && this.player.isVideo && this.player.config.previewThumbnails.enabled;
    }
    get currentImageContainer() {
      return this.mouseDown ? this.elements.scrubbing.container : this.elements.thumb.imageContainer;
    }
    get usingSprites() {
      return Object.keys(this.thumbnails[0].frames[0]).includes('w');
    }
    get thumbAspectRatio() {
      if (this.usingSprites) {
        return this.thumbnails[0].frames[0].w / this.thumbnails[0].frames[0].h;
      }
      return this.thumbnails[0].width / this.thumbnails[0].height;
    }
    get thumbContainerHeight() {
      if (this.mouseDown) {
        const {
          height
        } = fitRatio(this.thumbAspectRatio, {
          width: this.player.media.clientWidth,
          height: this.player.media.clientHeight
        });
        return height;
      }

      // If css is used this needs to return the css height for sprites to work (see setImageSizeAndOffset)
      if (this.sizeSpecifiedInCSS) {
        return this.elements.thumb.imageContainer.clientHeight;
      }
      return Math.floor(this.player.media.clientWidth / this.thumbAspectRatio / 4);
    }
    get currentImageElement() {
      return this.mouseDown ? this.currentScrubbingImageElement : this.currentThumbnailImageElement;
    }
    set currentImageElement(element) {
      if (this.mouseDown) {
        this.currentScrubbingImageElement = element;
      } else {
        this.currentThumbnailImageElement = element;
      }
    }
  }

  // ==========================================================================
  const source = {
    // Add elements to HTML5 media (source, tracks, etc)
    insertElements(type, attributes) {
      if (is.string(attributes)) {
        insertElement(type, this.media, {
          src: attributes
        });
      } else if (is.array(attributes)) {
        attributes.forEach(attribute => {
          insertElement(type, this.media, attribute);
        });
      }
    },
    // Update source
    // Sources are not checked for support so be careful
    change(input) {
      if (!getDeep(input, 'sources.length')) {
        this.debug.warn('Invalid source format');
        return;
      }

      // Cancel current network requests
      html5.cancelRequests.call(this);

      // Destroy instance and re-setup
      this.destroy.call(this, () => {
        // Reset quality options
        this.options.quality = [];

        // Remove elements
        removeElement(this.media);
        this.media = null;

        // Reset class name
        if (is.element(this.elements.container)) {
          this.elements.container.removeAttribute('class');
        }

        // Set the type and provider
        const {
          sources,
          type
        } = input;
        const [{
          provider = providers.html5,
          src
        }] = sources;
        const tagName = provider === 'html5' ? type : 'div';
        const attributes = provider === 'html5' ? {} : {
          src
        };
        Object.assign(this, {
          provider,
          type,
          // Check for support
          supported: support.check(type, provider, this.config.playsinline),
          // Create new element
          media: createElement(tagName, attributes)
        });

        // Inject the new element
        this.elements.container.appendChild(this.media);

        // Autoplay the new source?
        if (is.boolean(input.autoplay)) {
          this.config.autoplay = input.autoplay;
        }

        // Set attributes for audio and video
        if (this.isHTML5) {
          if (this.config.crossorigin) {
            this.media.setAttribute('crossorigin', '');
          }
          if (this.config.autoplay) {
            this.media.setAttribute('autoplay', '');
          }
          if (!is.empty(input.poster)) {
            this.poster = input.poster;
          }
          if (this.config.loop.active) {
            this.media.setAttribute('loop', '');
          }
          if (this.config.muted) {
            this.media.setAttribute('muted', '');
          }
          if (this.config.playsinline) {
            this.media.setAttribute('playsinline', '');
          }
        }

        // Restore class hook
        ui.addStyleHook.call(this);

        // Set new sources for html5
        if (this.isHTML5) {
          source.insertElements.call(this, 'source', sources);
        }

        // Set video title
        this.config.title = input.title;

        // Set up from scratch
        media.setup.call(this);

        // HTML5 stuff
        if (this.isHTML5) {
          // Setup captions
          if (Object.keys(input).includes('tracks')) {
            source.insertElements.call(this, 'track', input.tracks);
          }
        }

        // If HTML5 or embed but not fully supported, setupInterface and call ready now
        if (this.isHTML5 || this.isEmbed && !this.supported.ui) {
          // Setup interface
          ui.build.call(this);
        }

        // Load HTML5 sources
        if (this.isHTML5) {
          this.media.load();
        }

        // Update previewThumbnails config & reload plugin
        if (!is.empty(input.previewThumbnails)) {
          Object.assign(this.config.previewThumbnails, input.previewThumbnails);

          // Cleanup previewThumbnails plugin if it was loaded
          if (this.previewThumbnails && this.previewThumbnails.loaded) {
            this.previewThumbnails.destroy();
            this.previewThumbnails = null;
          }

          // Create new instance if it is still enabled
          if (this.config.previewThumbnails.enabled) {
            this.previewThumbnails = new PreviewThumbnails(this);
          }
        }

        // Update the fullscreen support
        this.fullscreen.update();
      }, true);
    }
  };

  // Private properties
  // TODO: Use a WeakMap for private globals
  // const globals = new WeakMap();

  // Plyr instance
  class Plyr {
    constructor(target, options) {
      _defineProperty$1(this, "play", () => {
        if (!is.function(this.media.play)) {
          return null;
        }

        // Intecept play with ads
        if (this.ads && this.ads.enabled) {
          this.ads.managerPromise.then(() => this.ads.play()).catch(() => silencePromise(this.media.play()));
        }

        // Return the promise (for HTML5)
        return this.media.play();
      });
      _defineProperty$1(this, "pause", () => {
        if (!this.playing || !is.function(this.media.pause)) {
          return null;
        }
        return this.media.pause();
      });
      _defineProperty$1(this, "togglePlay", input => {
        // Toggle based on current state if nothing passed
        const toggle = is.boolean(input) ? input : !this.playing;
        if (toggle) {
          return this.play();
        }
        return this.pause();
      });
      _defineProperty$1(this, "stop", () => {
        if (this.isHTML5) {
          this.pause();
          this.restart();
        } else if (is.function(this.media.stop)) {
          this.media.stop();
        }
      });
      _defineProperty$1(this, "restart", () => {
        this.currentTime = 0;
      });
      _defineProperty$1(this, "rewind", seekTime => {
        this.currentTime -= is.number(seekTime) ? seekTime : this.config.seekTime;
      });
      _defineProperty$1(this, "forward", seekTime => {
        this.currentTime += is.number(seekTime) ? seekTime : this.config.seekTime;
      });
      _defineProperty$1(this, "increaseVolume", step => {
        const volume = this.media.muted ? 0 : this.volume;
        this.volume = volume + (is.number(step) ? step : 0);
      });
      _defineProperty$1(this, "decreaseVolume", step => {
        this.increaseVolume(-step);
      });
      _defineProperty$1(this, "airplay", () => {
        // Show dialog if supported
        if (support.airplay) {
          this.media.webkitShowPlaybackTargetPicker();
        }
      });
      _defineProperty$1(this, "toggleControls", toggle => {
        // Don't toggle if missing UI support or if it's audio
        if (this.supported.ui && !this.isAudio) {
          // Get state before change
          const isHidden = hasClass(this.elements.container, this.config.classNames.hideControls);
          // Negate the argument if not undefined since adding the class to hides the controls
          const force = typeof toggle === 'undefined' ? undefined : !toggle;
          // Apply and get updated state
          const hiding = toggleClass(this.elements.container, this.config.classNames.hideControls, force);

          // Close menu
          if (hiding && is.array(this.config.controls) && this.config.controls.includes('settings') && !is.empty(this.config.settings)) {
            controls.toggleMenu.call(this, false);
          }

          // Trigger event on change
          if (hiding !== isHidden) {
            const eventName = hiding ? 'controlshidden' : 'controlsshown';
            triggerEvent.call(this, this.media, eventName);
          }
          return !hiding;
        }
        return false;
      });
      _defineProperty$1(this, "on", (event, callback) => {
        on.call(this, this.elements.container, event, callback);
      });
      _defineProperty$1(this, "once", (event, callback) => {
        once.call(this, this.elements.container, event, callback);
      });
      _defineProperty$1(this, "off", (event, callback) => {
        off(this.elements.container, event, callback);
      });
      _defineProperty$1(this, "destroy", (callback, soft = false) => {
        if (!this.ready) {
          return;
        }
        const done = () => {
          // Reset overflow (incase destroyed while in fullscreen)
          document.body.style.overflow = '';

          // GC for embed
          this.embed = null;

          // If it's a soft destroy, make minimal changes
          if (soft) {
            if (Object.keys(this.elements).length) {
              // Remove elements
              removeElement(this.elements.buttons.play);
              removeElement(this.elements.captions);
              removeElement(this.elements.controls);
              removeElement(this.elements.wrapper);

              // Clear for GC
              this.elements.buttons.play = null;
              this.elements.captions = null;
              this.elements.controls = null;
              this.elements.wrapper = null;
            }

            // Callback
            if (is.function(callback)) {
              callback();
            }
          } else {
            // Unbind listeners
            unbindListeners.call(this);

            // Cancel current network requests
            html5.cancelRequests.call(this);

            // Replace the container with the original element provided
            replaceElement(this.elements.original, this.elements.container);

            // Event
            triggerEvent.call(this, this.elements.original, 'destroyed', true);

            // Callback
            if (is.function(callback)) {
              callback.call(this.elements.original);
            }

            // Reset state
            this.ready = false;

            // Clear for garbage collection
            setTimeout(() => {
              this.elements = null;
              this.media = null;
            }, 200);
          }
        };

        // Stop playback
        this.stop();

        // Clear timeouts
        clearTimeout(this.timers.loading);
        clearTimeout(this.timers.controls);
        clearTimeout(this.timers.resized);

        // Provider specific stuff
        if (this.isHTML5) {
          // Restore native video controls
          ui.toggleNativeControls.call(this, true);

          // Clean up
          done();
        } else if (this.isYouTube) {
          // Clear timers
          clearInterval(this.timers.buffering);
          clearInterval(this.timers.playing);

          // Destroy YouTube API
          if (this.embed !== null && is.function(this.embed.destroy)) {
            this.embed.destroy();
          }

          // Clean up
          done();
        } else if (this.isVimeo) {
          // Destroy Vimeo API
          // then clean up (wait, to prevent postmessage errors)
          if (this.embed !== null) {
            this.embed.unload().then(done);
          }

          // Vimeo does not always return
          setTimeout(done, 200);
        }
      });
      _defineProperty$1(this, "supports", type => support.mime.call(this, type));
      this.timers = {};

      // State
      this.ready = false;
      this.loading = false;
      this.failed = false;

      // Touch device
      this.touch = support.touch;

      // Set the media element
      this.media = target;

      // String selector passed
      if (is.string(this.media)) {
        this.media = document.querySelectorAll(this.media);
      }

      // jQuery, NodeList or Array passed, use first element
      if (window.jQuery && this.media instanceof jQuery || is.nodeList(this.media) || is.array(this.media)) {
        // eslint-disable-next-line
        this.media = this.media[0];
      }

      // Set config
      this.config = extend({}, defaults, Plyr.defaults, options || {}, (() => {
        try {
          return JSON.parse(this.media.getAttribute('data-plyr-config'));
        } catch (_) {
          return {};
        }
      })());

      // Elements cache
      this.elements = {
        container: null,
        fullscreen: null,
        captions: null,
        buttons: {},
        display: {},
        progress: {},
        inputs: {},
        settings: {
          popup: null,
          menu: null,
          panels: {},
          buttons: {}
        }
      };

      // Captions
      this.captions = {
        active: null,
        currentTrack: -1,
        meta: new WeakMap()
      };

      // Fullscreen
      this.fullscreen = {
        active: false
      };

      // Options
      this.options = {
        speed: [],
        quality: []
      };

      // Debugging
      // TODO: move to globals
      this.debug = new Console(this.config.debug);

      // Log config options and support
      this.debug.log('Config', this.config);
      this.debug.log('Support', support);

      // We need an element to setup
      if (is.nullOrUndefined(this.media) || !is.element(this.media)) {
        this.debug.error('Setup failed: no suitable element passed');
        return;
      }

      // Bail if the element is initialized
      if (this.media.plyr) {
        this.debug.warn('Target already setup');
        return;
      }

      // Bail if not enabled
      if (!this.config.enabled) {
        this.debug.error('Setup failed: disabled by config');
        return;
      }

      // Bail if disabled or no basic support
      // You may want to disable certain UAs etc
      if (!support.check().api) {
        this.debug.error('Setup failed: no support');
        return;
      }

      // Cache original element state for .destroy()
      const clone = this.media.cloneNode(true);
      clone.autoplay = false;
      this.elements.original = clone;

      // Set media type based on tag or data attribute
      // Supported: video, audio, vimeo, youtube
      const _type = this.media.tagName.toLowerCase();
      // Embed properties
      let iframe = null;
      let url = null;

      // Different setup based on type
      switch (_type) {
        case 'div':
          // Find the frame
          iframe = this.media.querySelector('iframe');

          // <iframe> type
          if (is.element(iframe)) {
            // Detect provider
            url = parseUrl(iframe.getAttribute('src'));
            this.provider = getProviderByUrl(url.toString());

            // Rework elements
            this.elements.container = this.media;
            this.media = iframe;

            // Reset classname
            this.elements.container.className = '';

            // Get attributes from URL and set config
            if (url.search.length) {
              const truthy = ['1', 'true'];
              if (truthy.includes(url.searchParams.get('autoplay'))) {
                this.config.autoplay = true;
              }
              if (truthy.includes(url.searchParams.get('loop'))) {
                this.config.loop.active = true;
              }

              // TODO: replace fullscreen.iosNative with this playsinline config option
              // YouTube requires the playsinline in the URL
              if (this.isYouTube) {
                this.config.playsinline = truthy.includes(url.searchParams.get('playsinline'));
                this.config.youtube.hl = url.searchParams.get('hl'); // TODO: Should this be setting language?
              } else {
                this.config.playsinline = true;
              }
            }
          } else {
            // <div> with attributes
            this.provider = this.media.getAttribute(this.config.attributes.embed.provider);

            // Remove attribute
            this.media.removeAttribute(this.config.attributes.embed.provider);
          }

          // Unsupported or missing provider
          if (is.empty(this.provider) || !Object.values(providers).includes(this.provider)) {
            this.debug.error('Setup failed: Invalid provider');
            return;
          }

          // Audio will come later for external providers
          this.type = types.video;
          break;
        case 'video':
        case 'audio':
          this.type = _type;
          this.provider = providers.html5;

          // Get config from attributes
          if (this.media.hasAttribute('crossorigin')) {
            this.config.crossorigin = true;
          }
          if (this.media.hasAttribute('autoplay')) {
            this.config.autoplay = true;
          }
          if (this.media.hasAttribute('playsinline') || this.media.hasAttribute('webkit-playsinline')) {
            this.config.playsinline = true;
          }
          if (this.media.hasAttribute('muted')) {
            this.config.muted = true;
          }
          if (this.media.hasAttribute('loop')) {
            this.config.loop.active = true;
          }
          break;
        default:
          this.debug.error('Setup failed: unsupported type');
          return;
      }

      // Check for support again but with type
      this.supported = support.check(this.type, this.provider, this.config.playsinline);

      // If no support for even API, bail
      if (!this.supported.api) {
        this.debug.error('Setup failed: no support');
        return;
      }
      this.eventListeners = [];

      // Create listeners
      this.listeners = new Listeners(this);

      // Setup local storage for user settings
      this.storage = new Storage(this);

      // Store reference
      this.media.plyr = this;

      // Wrap media
      if (!is.element(this.elements.container)) {
        this.elements.container = createElement('div', {
          tabindex: 0
        });
        wrap(this.media, this.elements.container);
      }

      // Migrate custom properties from media to container (so they work 😉)
      ui.migrateStyles.call(this);

      // Add style hook
      ui.addStyleHook.call(this);

      // Setup media
      media.setup.call(this);

      // Listen for events if debugging
      if (this.config.debug) {
        on.call(this, this.elements.container, this.config.events.join(' '), event => {
          this.debug.log(`event: ${event.type}`);
        });
      }

      // Setup fullscreen
      this.fullscreen = new Fullscreen(this);

      // Setup interface
      // If embed but not fully supported, build interface now to avoid flash of controls
      if (this.isHTML5 || this.isEmbed && !this.supported.ui) {
        ui.build.call(this);
      }

      // Container listeners
      this.listeners.container();

      // Global listeners
      this.listeners.global();

      // Setup ads if provided
      if (this.config.ads.enabled) {
        this.ads = new Ads(this);
      }

      // Autoplay if required
      if (this.isHTML5 && this.config.autoplay) {
        this.once('canplay', () => silencePromise(this.play()));
      }

      // Seek time will be recorded (in listeners.js) so we can prevent hiding controls for a few seconds after seek
      this.lastSeekTime = 0;

      // Setup preview thumbnails if enabled
      if (this.config.previewThumbnails.enabled) {
        this.previewThumbnails = new PreviewThumbnails(this);
      }
    }

    // ---------------------------------------
    // API
    // ---------------------------------------

    /**
     * Types and provider helpers
     */
    get isHTML5() {
      return this.provider === providers.html5;
    }
    get isEmbed() {
      return this.isYouTube || this.isVimeo;
    }
    get isYouTube() {
      return this.provider === providers.youtube;
    }
    get isVimeo() {
      return this.provider === providers.vimeo;
    }
    get isVideo() {
      return this.type === types.video;
    }
    get isAudio() {
      return this.type === types.audio;
    }

    /**
     * Play the media, or play the advertisement (if they are not blocked)
     */

    /**
     * Get playing state
     */
    get playing() {
      return Boolean(this.ready && !this.paused && !this.ended);
    }

    /**
     * Get paused state
     */
    get paused() {
      return Boolean(this.media.paused);
    }

    /**
     * Get stopped state
     */
    get stopped() {
      return Boolean(this.paused && this.currentTime === 0);
    }

    /**
     * Get ended state
     */
    get ended() {
      return Boolean(this.media.ended);
    }

    /**
     * Toggle playback based on current status
     * @param {Boolean} input
     */

    /**
     * Seek to a time
     * @param {Number} input - where to seek to in seconds. Defaults to 0 (the start)
     */
    set currentTime(input) {
      // Bail if media duration isn't available yet
      if (!this.duration) {
        return;
      }

      // Validate input
      const inputIsValid = is.number(input) && input > 0;

      // Set
      this.media.currentTime = inputIsValid ? Math.min(input, this.duration) : 0;

      // Logging
      this.debug.log(`Seeking to ${this.currentTime} seconds`);
    }

    /**
     * Get current time
     */
    get currentTime() {
      return Number(this.media.currentTime);
    }

    /**
     * Get buffered
     */
    get buffered() {
      const {
        buffered
      } = this.media;

      // YouTube / Vimeo return a float between 0-1
      if (is.number(buffered)) {
        return buffered;
      }

      // HTML5
      // TODO: Handle buffered chunks of the media
      // (i.e. seek to another section buffers only that section)
      if (buffered && buffered.length && this.duration > 0) {
        return buffered.end(0) / this.duration;
      }
      return 0;
    }

    /**
     * Get seeking status
     */
    get seeking() {
      return Boolean(this.media.seeking);
    }

    /**
     * Get the duration of the current media
     */
    get duration() {
      // Faux duration set via config
      const fauxDuration = parseFloat(this.config.duration);
      // Media duration can be NaN or Infinity before the media has loaded
      const realDuration = (this.media || {}).duration;
      const duration = !is.number(realDuration) || realDuration === Infinity ? 0 : realDuration;

      // If config duration is funky, use regular duration
      return fauxDuration || duration;
    }

    /**
     * Set the player volume
     * @param {Number} value - must be between 0 and 1. Defaults to the value from local storage and config.volume if not set in storage
     */
    set volume(value) {
      let volume = value;
      const max = 1;
      const min = 0;
      if (is.string(volume)) {
        volume = Number(volume);
      }

      // Load volume from storage if no value specified
      if (!is.number(volume)) {
        volume = this.storage.get('volume');
      }

      // Use config if all else fails
      if (!is.number(volume)) {
        ({
          volume
        } = this.config);
      }

      // Maximum is volumeMax
      if (volume > max) {
        volume = max;
      }
      // Minimum is volumeMin
      if (volume < min) {
        volume = min;
      }

      // Update config
      this.config.volume = volume;

      // Set the player volume
      this.media.volume = volume;

      // If muted, and we're increasing volume manually, reset muted state
      if (!is.empty(value) && this.muted && volume > 0) {
        this.muted = false;
      }
    }

    /**
     * Get the current player volume
     */
    get volume() {
      return Number(this.media.volume);
    }

    /**
     * Increase volume
     * @param {Boolean} step - How much to decrease by (between 0 and 1)
     */

    /**
     * Set muted state
     * @param {Boolean} mute
     */
    set muted(mute) {
      let toggle = mute;

      // Load muted state from storage
      if (!is.boolean(toggle)) {
        toggle = this.storage.get('muted');
      }

      // Use config if all else fails
      if (!is.boolean(toggle)) {
        toggle = this.config.muted;
      }

      // Update config
      this.config.muted = toggle;

      // Set mute on the player
      this.media.muted = toggle;
    }

    /**
     * Get current muted state
     */
    get muted() {
      return Boolean(this.media.muted);
    }

    /**
     * Check if the media has audio
     */
    get hasAudio() {
      // Assume yes for all non HTML5 (as we can't tell...)
      if (!this.isHTML5) {
        return true;
      }
      if (this.isAudio) {
        return true;
      }

      // Get audio tracks
      return Boolean(this.media.mozHasAudio) || Boolean(this.media.webkitAudioDecodedByteCount) || Boolean(this.media.audioTracks && this.media.audioTracks.length);
    }

    /**
     * Set playback speed
     * @param {Number} input - the speed of playback (0.5-2.0)
     */
    set speed(input) {
      let speed = null;
      if (is.number(input)) {
        speed = input;
      }
      if (!is.number(speed)) {
        speed = this.storage.get('speed');
      }
      if (!is.number(speed)) {
        speed = this.config.speed.selected;
      }

      // Clamp to min/max
      const {
        minimumSpeed: min,
        maximumSpeed: max
      } = this;
      speed = clamp(speed, min, max);

      // Update config
      this.config.speed.selected = speed;

      // Set media speed
      setTimeout(() => {
        if (this.media) {
          this.media.playbackRate = speed;
        }
      }, 0);
    }

    /**
     * Get current playback speed
     */
    get speed() {
      return Number(this.media.playbackRate);
    }

    /**
     * Get the minimum allowed speed
     */
    get minimumSpeed() {
      if (this.isYouTube) {
        // https://developers.google.com/youtube/iframe_api_reference#setPlaybackRate
        return Math.min(...this.options.speed);
      }
      if (this.isVimeo) {
        // https://github.com/vimeo/player.js/#setplaybackrateplaybackrate-number-promisenumber-rangeerrorerror
        return 0.5;
      }

      // https://stackoverflow.com/a/32320020/1191319
      return 0.0625;
    }

    /**
     * Get the maximum allowed speed
     */
    get maximumSpeed() {
      if (this.isYouTube) {
        // https://developers.google.com/youtube/iframe_api_reference#setPlaybackRate
        return Math.max(...this.options.speed);
      }
      if (this.isVimeo) {
        // https://github.com/vimeo/player.js/#setplaybackrateplaybackrate-number-promisenumber-rangeerrorerror
        return 2;
      }

      // https://stackoverflow.com/a/32320020/1191319
      return 16;
    }

    /**
     * Set playback quality
     * Currently HTML5 & YouTube only
     * @param {Number} input - Quality level
     */
    set quality(input) {
      const config = this.config.quality;
      const options = this.options.quality;
      if (!options.length) {
        return;
      }
      let quality = [!is.empty(input) && Number(input), this.storage.get('quality'), config.selected, config.default].find(is.number);
      let updateStorage = true;
      if (!options.includes(quality)) {
        const value = closest(options, quality);
        this.debug.warn(`Unsupported quality option: ${quality}, using ${value} instead`);
        quality = value;

        // Don't update storage if quality is not supported
        updateStorage = false;
      }

      // Update config
      config.selected = quality;

      // Set quality
      this.media.quality = quality;

      // Save to storage
      if (updateStorage) {
        this.storage.set({
          quality
        });
      }
    }

    /**
     * Get current quality level
     */
    get quality() {
      return this.media.quality;
    }

    /**
     * Toggle loop
     * TODO: Finish fancy new logic. Set the indicator on load as user may pass loop as config
     * @param {Boolean} input - Whether to loop or not
     */
    set loop(input) {
      const toggle = is.boolean(input) ? input : this.config.loop.active;
      this.config.loop.active = toggle;
      this.media.loop = toggle;

      // Set default to be a true toggle
      /* const type = ['start', 'end', 'all', 'none', 'toggle'].includes(input) ? input : 'toggle';
           switch (type) {
              case 'start':
                  if (this.config.loop.end && this.config.loop.end <= this.currentTime) {
                      this.config.loop.end = null;
                  }
                  this.config.loop.start = this.currentTime;
                  // this.config.loop.indicator.start = this.elements.display.played.value;
                  break;
               case 'end':
                  if (this.config.loop.start >= this.currentTime) {
                      return this;
                  }
                  this.config.loop.end = this.currentTime;
                  // this.config.loop.indicator.end = this.elements.display.played.value;
                  break;
               case 'all':
                  this.config.loop.start = 0;
                  this.config.loop.end = this.duration - 2;
                  this.config.loop.indicator.start = 0;
                  this.config.loop.indicator.end = 100;
                  break;
               case 'toggle':
                  if (this.config.loop.active) {
                      this.config.loop.start = 0;
                      this.config.loop.end = null;
                  } else {
                      this.config.loop.start = 0;
                      this.config.loop.end = this.duration - 2;
                  }
                  break;
               default:
                  this.config.loop.start = 0;
                  this.config.loop.end = null;
                  break;
          } */
    }

    /**
     * Get current loop state
     */
    get loop() {
      return Boolean(this.media.loop);
    }

    /**
     * Set new media source
     * @param {Object} input - The new source object (see docs)
     */
    set source(input) {
      source.change.call(this, input);
    }

    /**
     * Get current source
     */
    get source() {
      return this.media.currentSrc;
    }

    /**
     * Get a download URL (either source or custom)
     */
    get download() {
      const {
        download
      } = this.config.urls;
      return is.url(download) ? download : this.source;
    }

    /**
     * Set the download URL
     */
    set download(input) {
      if (!is.url(input)) {
        return;
      }
      this.config.urls.download = input;
      controls.setDownloadUrl.call(this);
    }

    /**
     * Set the poster image for a video
     * @param {String} input - the URL for the new poster image
     */
    set poster(input) {
      if (!this.isVideo) {
        this.debug.warn('Poster can only be set for video');
        return;
      }
      ui.setPoster.call(this, input, false).catch(() => {});
    }

    /**
     * Get the current poster image
     */
    get poster() {
      if (!this.isVideo) {
        return null;
      }
      return this.media.getAttribute('poster') || this.media.getAttribute('data-poster');
    }

    /**
     * Get the current aspect ratio in use
     */
    get ratio() {
      if (!this.isVideo) {
        return null;
      }
      const ratio = reduceAspectRatio(getAspectRatio.call(this));
      return is.array(ratio) ? ratio.join(':') : ratio;
    }

    /**
     * Set video aspect ratio
     */
    set ratio(input) {
      if (!this.isVideo) {
        this.debug.warn('Aspect ratio can only be set for video');
        return;
      }
      if (!is.string(input) || !validateAspectRatio(input)) {
        this.debug.error(`Invalid aspect ratio specified (${input})`);
        return;
      }
      this.config.ratio = reduceAspectRatio(input);
      setAspectRatio.call(this);
    }

    /**
     * Set the autoplay state
     * @param {Boolean} input - Whether to autoplay or not
     */
    set autoplay(input) {
      this.config.autoplay = is.boolean(input) ? input : this.config.autoplay;
    }

    /**
     * Get the current autoplay state
     */
    get autoplay() {
      return Boolean(this.config.autoplay);
    }

    /**
     * Toggle captions
     * @param {Boolean} input - Whether to enable captions
     */
    toggleCaptions(input) {
      captions.toggle.call(this, input, false);
    }

    /**
     * Set the caption track by index
     * @param {Number} input - Caption index
     */
    set currentTrack(input) {
      captions.set.call(this, input, false);
      captions.setup.call(this);
    }

    /**
     * Get the current caption track index (-1 if disabled)
     */
    get currentTrack() {
      const {
        toggled,
        currentTrack
      } = this.captions;
      return toggled ? currentTrack : -1;
    }

    /**
     * Set the wanted language for captions
     * Since tracks can be added later it won't update the actual caption track until there is a matching track
     * @param {String} input - Two character ISO language code (e.g. EN, FR, PT, etc)
     */
    set language(input) {
      captions.setLanguage.call(this, input, false);
    }

    /**
     * Get the current track's language
     */
    get language() {
      return (captions.getCurrentTrack.call(this) || {}).language;
    }

    /**
     * Toggle picture-in-picture playback on WebKit/MacOS
     * TODO: update player with state, support, enabled
     * TODO: detect outside changes
     */
    set pip(input) {
      // Bail if no support
      if (!support.pip) {
        return;
      }

      // Toggle based on current state if not passed
      const toggle = is.boolean(input) ? input : !this.pip;

      // Toggle based on current state
      // Safari
      if (is.function(this.media.webkitSetPresentationMode)) {
        this.media.webkitSetPresentationMode(toggle ? pip.active : pip.inactive);
      }

      // Chrome
      if (is.function(this.media.requestPictureInPicture)) {
        if (!this.pip && toggle) {
          this.media.requestPictureInPicture();
        } else if (this.pip && !toggle) {
          document.exitPictureInPicture();
        }
      }
    }

    /**
     * Get the current picture-in-picture state
     */
    get pip() {
      if (!support.pip) {
        return null;
      }

      // Safari
      if (!is.empty(this.media.webkitPresentationMode)) {
        return this.media.webkitPresentationMode === pip.active;
      }

      // Chrome
      return this.media === document.pictureInPictureElement;
    }

    /**
     * Sets the preview thubmnails for the current source
     */
    setPreviewThumbnails(thumbnailSource) {
      if (this.previewThumbnails && this.previewThumbnails.loaded) {
        this.previewThumbnails.destroy();
        this.previewThumbnails = null;
      }
      Object.assign(this.config.previewThumbnails, thumbnailSource);

      // Create new instance if it is still enabled
      if (this.config.previewThumbnails.enabled) {
        this.previewThumbnails = new PreviewThumbnails(this);
      }
    }

    /**
     * Trigger the airplay dialog
     * TODO: update player with state, support, enabled
     */

    /**
     * Check for support
     * @param {String} type - Player type (audio/video)
     * @param {String} provider - Provider (html5/youtube/vimeo)
     * @param {Boolean} inline - Where player has `playsinline` sttribute
     */
    static supported(type, provider, inline) {
      return support.check(type, provider, inline);
    }

    /**
     * Load an SVG sprite into the page
     * @param {String} url - URL for the SVG sprite
     * @param {String} [id] - Unique ID
     */
    static loadSprite(url, id) {
      return loadSprite(url, id);
    }

    /**
     * Setup multiple instances
     * @param {*} selector
     * @param {Object} options
     */
    static setup(selector, options = {}) {
      let targets = null;
      if (is.string(selector)) {
        targets = Array.from(document.querySelectorAll(selector));
      } else if (is.nodeList(selector)) {
        targets = Array.from(selector);
      } else if (is.array(selector)) {
        targets = selector.filter(is.element);
      }
      if (is.empty(targets)) {
        return null;
      }
      return targets.map(t => new Plyr(t, options));
    }
  }
  Plyr.defaults = cloneDeep(defaults);

  return Plyr;

}));
//# sourceMappingURL=plyr.js.map
