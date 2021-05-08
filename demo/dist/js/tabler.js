/*!
* Tabler v1.0.0-beta3 (https://tabler.io)
* @version 1.0.0-beta3
* @link https://tabler.io
* Copyright 2018-2021 The Tabler Authors
* Copyright 2018-2021 codecalm.net Paweł Kuna
* Licensed under MIT (https://github.com/tabler/tabler/blob/master/LICENSE)
*/
(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}((function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var autosize$1 = {exports: {}};

	/*!
		autosize 4.0.2
		license: MIT
		http://www.jacklmoore.com/autosize
	*/
	(function (module, exports) {
	(function (global, factory) {
		{
			factory(module, exports);
		}
	})(commonjsGlobal, function (module, exports) {
		var map = typeof Map === "function" ? new Map() : function () {
			var keys = [];
			var values = [];
			return {
				has: function has(key) {
					return keys.indexOf(key) > -1;
				},
				get: function get(key) {
					return values[keys.indexOf(key)];
				},
				set: function set(key, value) {
					if (keys.indexOf(key) === -1) {
						keys.push(key);
						values.push(value);
					}
				},
				delete: function _delete(key) {
					var index = keys.indexOf(key);
					if (index > -1) {
						keys.splice(index, 1);
						values.splice(index, 1);
					}
				}
			};
		}();
		var createEvent = function createEvent(name) {
			return new Event(name, { bubbles: true });
		};
		try {
			new Event('test');
		} catch (e) {
			createEvent = function createEvent(name) {
				var evt = document.createEvent('Event');
				evt.initEvent(name, true, false);
				return evt;
			};
		}
		function assign(ta) {
			if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || map.has(ta)) return;
			var heightOffset = null;
			var clientWidth = null;
			var cachedHeight = null;
			function init() {
				var style = window.getComputedStyle(ta, null);
				if (style.resize === 'vertical') {
					ta.style.resize = 'none';
				} else if (style.resize === 'both') {
					ta.style.resize = 'horizontal';
				}
				if (style.boxSizing === 'content-box') {
					heightOffset = -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
				} else {
					heightOffset = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
				}
				if (isNaN(heightOffset)) {
					heightOffset = 0;
				}
				update();
			}
			function changeOverflow(value) {
				{
					var width = ta.style.width;
					ta.style.width = '0px';
					ta.offsetWidth;
					ta.style.width = width;
				}
				ta.style.overflowY = value;
			}
			function getParentOverflows(el) {
				var arr = [];
				while (el && el.parentNode && el.parentNode instanceof Element) {
					if (el.parentNode.scrollTop) {
						arr.push({
							node: el.parentNode,
							scrollTop: el.parentNode.scrollTop
						});
					}
					el = el.parentNode;
				}
				return arr;
			}
			function resize() {
				if (ta.scrollHeight === 0) {
					return;
				}
				var overflows = getParentOverflows(ta);
				var docTop = document.documentElement && document.documentElement.scrollTop;
				ta.style.height = '';
				ta.style.height = ta.scrollHeight + heightOffset + 'px';
				clientWidth = ta.clientWidth;
				overflows.forEach(function (el) {
					el.node.scrollTop = el.scrollTop;
				});
				if (docTop) {
					document.documentElement.scrollTop = docTop;
				}
			}
			function update() {
				resize();
				var styleHeight = Math.round(parseFloat(ta.style.height));
				var computed = window.getComputedStyle(ta, null);
				var actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(computed.height)) : ta.offsetHeight;
				if (actualHeight < styleHeight) {
					if (computed.overflowY === 'hidden') {
						changeOverflow('scroll');
						resize();
						actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
					}
				} else {
					if (computed.overflowY !== 'hidden') {
						changeOverflow('hidden');
						resize();
						actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
					}
				}
				if (cachedHeight !== actualHeight) {
					cachedHeight = actualHeight;
					var evt = createEvent('autosize:resized');
					try {
						ta.dispatchEvent(evt);
					} catch (err) {
					}
				}
			}
			var pageResize = function pageResize() {
				if (ta.clientWidth !== clientWidth) {
					update();
				}
			};
			var destroy = function (style) {
				window.removeEventListener('resize', pageResize, false);
				ta.removeEventListener('input', update, false);
				ta.removeEventListener('keyup', update, false);
				ta.removeEventListener('autosize:destroy', destroy, false);
				ta.removeEventListener('autosize:update', update, false);
				Object.keys(style).forEach(function (key) {
					ta.style[key] = style[key];
				});
				map.delete(ta);
			}.bind(ta, {
				height: ta.style.height,
				resize: ta.style.resize,
				overflowY: ta.style.overflowY,
				overflowX: ta.style.overflowX,
				wordWrap: ta.style.wordWrap
			});
			ta.addEventListener('autosize:destroy', destroy, false);
			if ('onpropertychange' in ta && 'oninput' in ta) {
				ta.addEventListener('keyup', update, false);
			}
			window.addEventListener('resize', pageResize, false);
			ta.addEventListener('input', update, false);
			ta.addEventListener('autosize:update', update, false);
			ta.style.overflowX = 'hidden';
			ta.style.wordWrap = 'break-word';
			map.set(ta, {
				destroy: destroy,
				update: update
			});
			init();
		}
		function destroy(ta) {
			var methods = map.get(ta);
			if (methods) {
				methods.destroy();
			}
		}
		function update(ta) {
			var methods = map.get(ta);
			if (methods) {
				methods.update();
			}
		}
		var autosize = null;
		if (typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') {
			autosize = function autosize(el) {
				return el;
			};
			autosize.destroy = function (el) {
				return el;
			};
			autosize.update = function (el) {
				return el;
			};
		} else {
			autosize = function autosize(el, options) {
				if (el) {
					Array.prototype.forEach.call(el.length ? el : [el], function (x) {
						return assign(x);
					});
				}
				return el;
			};
			autosize.destroy = function (el) {
				if (el) {
					Array.prototype.forEach.call(el.length ? el : [el], destroy);
				}
				return el;
			};
			autosize.update = function (el) {
				if (el) {
					Array.prototype.forEach.call(el.length ? el : [el], update);
				}
				return el;
			};
		}
		exports.default = autosize;
		module.exports = exports['default'];
	});
	}(autosize$1, autosize$1.exports));
	var autosize = autosize$1.exports;

	var elements = document.querySelectorAll('[data-bs-toggle="autosize"]');
	if (elements.length) {
	  elements.forEach(function (element) {
	    autosize(element);
	  });
	}

	function _typeof(obj) {
	  "@babel/helpers - typeof";
	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }
	  return _typeof(obj);
	}
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}
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
	function _defineProperty(obj, key, value) {
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
	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }
	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}
	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}
	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };
	  return _setPrototypeOf(o, p);
	}
	function _isNativeReflectConstruct() {
	  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	  if (Reflect.construct.sham) return false;
	  if (typeof Proxy === "function") return true;
	  try {
	    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}
	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;
	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }
	  return target;
	}
	function _objectWithoutProperties(source, excluded) {
	  if (source == null) return {};
	  var target = _objectWithoutPropertiesLoose(source, excluded);
	  var key, i;
	  if (Object.getOwnPropertySymbols) {
	    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
	    for (i = 0; i < sourceSymbolKeys.length; i++) {
	      key = sourceSymbolKeys[i];
	      if (excluded.indexOf(key) >= 0) continue;
	      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
	      target[key] = source[key];
	    }
	  }
	  return target;
	}
	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	  return self;
	}
	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  }
	  return _assertThisInitialized(self);
	}
	function _createSuper(Derived) {
	  var hasNativeReflectConstruct = _isNativeReflectConstruct();
	  return function _createSuperInternal() {
	    var Super = _getPrototypeOf(Derived),
	        result;
	    if (hasNativeReflectConstruct) {
	      var NewTarget = _getPrototypeOf(this).constructor;
	      result = Reflect.construct(Super, arguments, NewTarget);
	    } else {
	      result = Super.apply(this, arguments);
	    }
	    return _possibleConstructorReturn(this, result);
	  };
	}
	function _superPropBase(object, property) {
	  while (!Object.prototype.hasOwnProperty.call(object, property)) {
	    object = _getPrototypeOf(object);
	    if (object === null) break;
	  }
	  return object;
	}
	function _get(target, property, receiver) {
	  if (typeof Reflect !== "undefined" && Reflect.get) {
	    _get = Reflect.get;
	  } else {
	    _get = function _get(target, property, receiver) {
	      var base = _superPropBase(target, property);
	      if (!base) return;
	      var desc = Object.getOwnPropertyDescriptor(base, property);
	      if (desc.get) {
	        return desc.get.call(receiver);
	      }
	      return desc.value;
	    };
	  }
	  return _get(target, property, receiver || target);
	}
	function set(target, property, value, receiver) {
	  if (typeof Reflect !== "undefined" && Reflect.set) {
	    set = Reflect.set;
	  } else {
	    set = function set(target, property, value, receiver) {
	      var base = _superPropBase(target, property);
	      var desc;
	      if (base) {
	        desc = Object.getOwnPropertyDescriptor(base, property);
	        if (desc.set) {
	          desc.set.call(receiver, value);
	          return true;
	        } else if (!desc.writable) {
	          return false;
	        }
	      }
	      desc = Object.getOwnPropertyDescriptor(receiver, property);
	      if (desc) {
	        if (!desc.writable) {
	          return false;
	        }
	        desc.value = value;
	        Object.defineProperty(receiver, property, desc);
	      } else {
	        _defineProperty(receiver, property, value);
	      }
	      return true;
	    };
	  }
	  return set(target, property, value, receiver);
	}
	function _set(target, property, value, receiver, isStrict) {
	  var s = set(target, property, value, receiver || target);
	  if (!s && isStrict) {
	    throw new Error('failed to set property');
	  }
	  return value;
	}
	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
	}
	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}
	function _iterableToArrayLimit(arr, i) {
	  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;
	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);
	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }
	  return _arr;
	}
	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}
	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;
	  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	  return arr2;
	}
	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	function isString(str) {
	  return typeof str === 'string' || str instanceof String;
	}
	var DIRECTION = {
	  NONE: 'NONE',
	  LEFT: 'LEFT',
	  FORCE_LEFT: 'FORCE_LEFT',
	  RIGHT: 'RIGHT',
	  FORCE_RIGHT: 'FORCE_RIGHT'
	};
	function forceDirection(direction) {
	  switch (direction) {
	    case DIRECTION.LEFT:
	      return DIRECTION.FORCE_LEFT;
	    case DIRECTION.RIGHT:
	      return DIRECTION.FORCE_RIGHT;
	    default:
	      return direction;
	  }
	}
	function escapeRegExp(str) {
	  return str.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
	}
	function objectIncludes(b, a) {
	  if (a === b) return true;
	  var arrA = Array.isArray(a),
	      arrB = Array.isArray(b),
	      i;
	  if (arrA && arrB) {
	    if (a.length != b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (!objectIncludes(a[i], b[i])) return false;
	    }
	    return true;
	  }
	  if (arrA != arrB) return false;
	  if (a && b && _typeof(a) === 'object' && _typeof(b) === 'object') {
	    var dateA = a instanceof Date,
	        dateB = b instanceof Date;
	    if (dateA && dateB) return a.getTime() == b.getTime();
	    if (dateA != dateB) return false;
	    var regexpA = a instanceof RegExp,
	        regexpB = b instanceof RegExp;
	    if (regexpA && regexpB) return a.toString() == b.toString();
	    if (regexpA != regexpB) return false;
	    var keys = Object.keys(a);
	    for (i = 0; i < keys.length; i++) {
	      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
	    }
	    for (i = 0; i < keys.length; i++) {
	      if (!objectIncludes(b[keys[i]], a[keys[i]])) return false;
	    }
	    return true;
	  } else if (a && b && typeof a === 'function' && typeof b === 'function') {
	    return a.toString() === b.toString();
	  }
	  return false;
	}

	var ActionDetails = function () {
	  function ActionDetails(value, cursorPos, oldValue, oldSelection) {
	    _classCallCheck(this, ActionDetails);
	    this.value = value;
	    this.cursorPos = cursorPos;
	    this.oldValue = oldValue;
	    this.oldSelection = oldSelection;
	    while (this.value.slice(0, this.startChangePos) !== this.oldValue.slice(0, this.startChangePos)) {
	      --this.oldSelection.start;
	    }
	  }
	  _createClass(ActionDetails, [{
	    key: "startChangePos",
	    get: function get() {
	      return Math.min(this.cursorPos, this.oldSelection.start);
	    }
	  }, {
	    key: "insertedCount",
	    get: function get() {
	      return this.cursorPos - this.startChangePos;
	    }
	  }, {
	    key: "inserted",
	    get: function get() {
	      return this.value.substr(this.startChangePos, this.insertedCount);
	    }
	  }, {
	    key: "removedCount",
	    get: function get() {
	      return Math.max(this.oldSelection.end - this.startChangePos ||
	      this.oldValue.length - this.value.length, 0);
	    }
	  }, {
	    key: "removed",
	    get: function get() {
	      return this.oldValue.substr(this.startChangePos, this.removedCount);
	    }
	  }, {
	    key: "head",
	    get: function get() {
	      return this.value.substring(0, this.startChangePos);
	    }
	  }, {
	    key: "tail",
	    get: function get() {
	      return this.value.substring(this.startChangePos + this.insertedCount);
	    }
	  }, {
	    key: "removeDirection",
	    get: function get() {
	      if (!this.removedCount || this.insertedCount) return DIRECTION.NONE;
	      return this.oldSelection.end === this.cursorPos || this.oldSelection.start === this.cursorPos ? DIRECTION.RIGHT : DIRECTION.LEFT;
	    }
	  }]);
	  return ActionDetails;
	}();

	var ChangeDetails = function () {
	  function ChangeDetails(details) {
	    _classCallCheck(this, ChangeDetails);
	    Object.assign(this, {
	      inserted: '',
	      rawInserted: '',
	      skip: false,
	      tailShift: 0
	    }, details);
	  }
	  _createClass(ChangeDetails, [{
	    key: "aggregate",
	    value: function aggregate(details) {
	      this.rawInserted += details.rawInserted;
	      this.skip = this.skip || details.skip;
	      this.inserted += details.inserted;
	      this.tailShift += details.tailShift;
	      return this;
	    }
	  }, {
	    key: "offset",
	    get: function get() {
	      return this.tailShift + this.inserted.length;
	    }
	  }]);
	  return ChangeDetails;
	}();

	var ContinuousTailDetails = function () {
	  function ContinuousTailDetails() {
	    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    var stop = arguments.length > 2 ? arguments[2] : undefined;
	    _classCallCheck(this, ContinuousTailDetails);
	    this.value = value;
	    this.from = from;
	    this.stop = stop;
	  }
	  _createClass(ContinuousTailDetails, [{
	    key: "toString",
	    value: function toString() {
	      return this.value;
	    }
	  }, {
	    key: "extend",
	    value: function extend(tail) {
	      this.value += String(tail);
	    }
	  }, {
	    key: "appendTo",
	    value: function appendTo(masked) {
	      return masked.append(this.toString(), {
	        tail: true
	      }).aggregate(masked._appendPlaceholder());
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return {
	        value: this.value,
	        from: this.from,
	        stop: this.stop
	      };
	    },
	    set: function set(state) {
	      Object.assign(this, state);
	    }
	  }, {
	    key: "shiftBefore",
	    value: function shiftBefore(pos) {
	      if (this.from >= pos || !this.value.length) return '';
	      var shiftChar = this.value[0];
	      this.value = this.value.slice(1);
	      return shiftChar;
	    }
	  }]);
	  return ContinuousTailDetails;
	}();

	function IMask(el) {
	  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  return new IMask.InputMask(el, opts);
	}

	var Masked = function () {
	  function Masked(opts) {
	    _classCallCheck(this, Masked);
	    this._value = '';
	    this._update(Object.assign({}, Masked.DEFAULTS, opts));
	    this.isInitialized = true;
	  }
	  _createClass(Masked, [{
	    key: "updateOptions",
	    value: function updateOptions(opts) {
	      if (!Object.keys(opts).length) return;
	      this.withValueRefresh(this._update.bind(this, opts));
	    }
	  }, {
	    key: "_update",
	    value: function _update(opts) {
	      Object.assign(this, opts);
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return {
	        _value: this.value
	      };
	    },
	    set: function set(state) {
	      this._value = state._value;
	    }
	  }, {
	    key: "reset",
	    value: function reset() {
	      this._value = '';
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      return this._value;
	    },
	    set: function set(value) {
	      this.resolve(value);
	    }
	  }, {
	    key: "resolve",
	    value: function resolve(value) {
	      this.reset();
	      this.append(value, {
	        input: true
	      }, '');
	      this.doCommit();
	      return this.value;
	    }
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this.value;
	    },
	    set: function set(value) {
	      this.reset();
	      this.append(value, {}, '');
	      this.doCommit();
	    }
	  }, {
	    key: "typedValue",
	    get: function get() {
	      return this.doParse(this.value);
	    },
	    set: function set(value) {
	      this.value = this.doFormat(value);
	    }
	  }, {
	    key: "rawInputValue",
	    get: function get() {
	      return this.extractInput(0, this.value.length, {
	        raw: true
	      });
	    },
	    set: function set(value) {
	      this.reset();
	      this.append(value, {
	        raw: true
	      }, '');
	      this.doCommit();
	    }
	  }, {
	    key: "isComplete",
	    get: function get() {
	      return true;
	    }
	  }, {
	    key: "nearestInputPos",
	    value: function nearestInputPos(cursorPos, direction) {
	      return cursorPos;
	    }
	  }, {
	    key: "extractInput",
	    value: function extractInput() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      return this.value.slice(fromPos, toPos);
	    }
	  }, {
	    key: "extractTail",
	    value: function extractTail() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      return new ContinuousTailDetails(this.extractInput(fromPos, toPos), fromPos);
	    }
	  }, {
	    key: "appendTail",
	    value: function appendTail(tail) {
	      if (isString(tail)) tail = new ContinuousTailDetails(String(tail));
	      return tail.appendTo(this);
	    }
	  }, {
	    key: "_appendCharRaw",
	    value: function _appendCharRaw(ch) {
	      if (!ch) return new ChangeDetails();
	      this._value += ch;
	      return new ChangeDetails({
	        inserted: ch,
	        rawInserted: ch
	      });
	    }
	  }, {
	    key: "_appendChar",
	    value: function _appendChar(ch) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var checkTail = arguments.length > 2 ? arguments[2] : undefined;
	      var consistentState = this.state;
	      var details = this._appendCharRaw(this.doPrepare(ch, flags), flags);
	      if (details.inserted) {
	        var consistentTail;
	        var appended = this.doValidate(flags) !== false;
	        if (appended && checkTail != null) {
	          var beforeTailState = this.state;
	          if (this.overwrite) {
	            consistentTail = checkTail.state;
	            checkTail.shiftBefore(this.value.length);
	          }
	          var tailDetails = this.appendTail(checkTail);
	          appended = tailDetails.rawInserted === checkTail.toString();
	          if (appended && tailDetails.inserted) this.state = beforeTailState;
	        }
	        if (!appended) {
	          details = new ChangeDetails();
	          this.state = consistentState;
	          if (checkTail && consistentTail) checkTail.state = consistentTail;
	        }
	      }
	      return details;
	    }
	  }, {
	    key: "_appendPlaceholder",
	    value: function _appendPlaceholder() {
	      return new ChangeDetails();
	    }
	  }, {
	    key: "append",
	    value: function append(str, flags, tail) {
	      if (!isString(str)) throw new Error('value should be string');
	      var details = new ChangeDetails();
	      var checkTail = isString(tail) ? new ContinuousTailDetails(String(tail)) : tail;
	      if (flags && flags.tail) flags._beforeTailState = this.state;
	      for (var ci = 0; ci < str.length; ++ci) {
	        details.aggregate(this._appendChar(str[ci], flags, checkTail));
	      }
	      if (checkTail != null) {
	        details.tailShift += this.appendTail(checkTail).tailShift;
	      }
	      return details;
	    }
	  }, {
	    key: "remove",
	    value: function remove() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      this._value = this.value.slice(0, fromPos) + this.value.slice(toPos);
	      return new ChangeDetails();
	    }
	  }, {
	    key: "withValueRefresh",
	    value: function withValueRefresh(fn) {
	      if (this._refreshing || !this.isInitialized) return fn();
	      this._refreshing = true;
	      var rawInput = this.rawInputValue;
	      var value = this.value;
	      var ret = fn();
	      this.rawInputValue = rawInput;
	      if (this.value && this.value !== value && value.indexOf(this.value) === 0) {
	        this.append(value.slice(this.value.length), {}, '');
	      }
	      delete this._refreshing;
	      return ret;
	    }
	  }, {
	    key: "runIsolated",
	    value: function runIsolated(fn) {
	      if (this._isolated || !this.isInitialized) return fn(this);
	      this._isolated = true;
	      var state = this.state;
	      var ret = fn(this);
	      this.state = state;
	      delete this._isolated;
	      return ret;
	    }
	  }, {
	    key: "doPrepare",
	    value: function doPrepare(str) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      return this.prepare ? this.prepare(str, this, flags) : str;
	    }
	  }, {
	    key: "doValidate",
	    value: function doValidate(flags) {
	      return (!this.validate || this.validate(this.value, this, flags)) && (!this.parent || this.parent.doValidate(flags));
	    }
	  }, {
	    key: "doCommit",
	    value: function doCommit() {
	      if (this.commit) this.commit(this.value, this);
	    }
	  }, {
	    key: "doFormat",
	    value: function doFormat(value) {
	      return this.format ? this.format(value, this) : value;
	    }
	  }, {
	    key: "doParse",
	    value: function doParse(str) {
	      return this.parse ? this.parse(str, this) : str;
	    }
	  }, {
	    key: "splice",
	    value: function splice(start, deleteCount, inserted, removeDirection) {
	      var tailPos = start + deleteCount;
	      var tail = this.extractTail(tailPos);
	      var startChangePos = this.nearestInputPos(start, removeDirection);
	      var changeDetails = new ChangeDetails({
	        tailShift: startChangePos - start
	      }).aggregate(this.remove(startChangePos)).aggregate(this.append(inserted, {
	        input: true
	      }, tail));
	      return changeDetails;
	    }
	  }]);
	  return Masked;
	}();
	Masked.DEFAULTS = {
	  format: function format(v) {
	    return v;
	  },
	  parse: function parse(v) {
	    return v;
	  }
	};
	IMask.Masked = Masked;

	function maskedClass(mask) {
	  if (mask == null) {
	    throw new Error('mask property should be defined');
	  }
	  if (mask instanceof RegExp) return IMask.MaskedRegExp;
	  if (isString(mask)) return IMask.MaskedPattern;
	  if (mask instanceof Date || mask === Date) return IMask.MaskedDate;
	  if (mask instanceof Number || typeof mask === 'number' || mask === Number) return IMask.MaskedNumber;
	  if (Array.isArray(mask) || mask === Array) return IMask.MaskedDynamic;
	  if (IMask.Masked && mask.prototype instanceof IMask.Masked) return mask;
	  if (mask instanceof Function) return IMask.MaskedFunction;
	  if (mask instanceof IMask.Masked) return mask.constructor;
	  console.warn('Mask not found for mask', mask);
	  return IMask.Masked;
	}
	function createMask(opts) {
	  if (IMask.Masked && opts instanceof IMask.Masked) return opts;
	  opts = Object.assign({}, opts);
	  var mask = opts.mask;
	  if (IMask.Masked && mask instanceof IMask.Masked) return mask;
	  var MaskedClass = maskedClass(mask);
	  if (!MaskedClass) throw new Error('Masked class is not found for provided mask, appropriate module needs to be import manually before creating mask.');
	  return new MaskedClass(opts);
	}
	IMask.createMask = createMask;

	var DEFAULT_INPUT_DEFINITIONS = {
	  '0': /\d/,
	  'a': /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
	  '*': /./
	};
	var PatternInputDefinition = function () {
	  function PatternInputDefinition(opts) {
	    _classCallCheck(this, PatternInputDefinition);
	    var mask = opts.mask,
	        blockOpts = _objectWithoutProperties(opts, ["mask"]);
	    this.masked = createMask({
	      mask: mask
	    });
	    Object.assign(this, blockOpts);
	  }
	  _createClass(PatternInputDefinition, [{
	    key: "reset",
	    value: function reset() {
	      this._isFilled = false;
	      this.masked.reset();
	    }
	  }, {
	    key: "remove",
	    value: function remove() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      if (fromPos === 0 && toPos >= 1) {
	        this._isFilled = false;
	        return this.masked.remove(fromPos, toPos);
	      }
	      return new ChangeDetails();
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      return this.masked.value || (this._isFilled && !this.isOptional ? this.placeholderChar : '');
	    }
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this.masked.unmaskedValue;
	    }
	  }, {
	    key: "isComplete",
	    get: function get() {
	      return Boolean(this.masked.value) || this.isOptional;
	    }
	  }, {
	    key: "_appendChar",
	    value: function _appendChar(str) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      if (this._isFilled) return new ChangeDetails();
	      var state = this.masked.state;
	      var details = this.masked._appendChar(str, flags);
	      if (details.inserted && this.doValidate(flags) === false) {
	        details.inserted = details.rawInserted = '';
	        this.masked.state = state;
	      }
	      if (!details.inserted && !this.isOptional && !this.lazy && !flags.input) {
	        details.inserted = this.placeholderChar;
	      }
	      details.skip = !details.inserted && !this.isOptional;
	      this._isFilled = Boolean(details.inserted);
	      return details;
	    }
	  }, {
	    key: "append",
	    value: function append() {
	      var _this$masked;
	      return (_this$masked = this.masked).append.apply(_this$masked, arguments);
	    }
	  }, {
	    key: "_appendPlaceholder",
	    value: function _appendPlaceholder() {
	      var details = new ChangeDetails();
	      if (this._isFilled || this.isOptional) return details;
	      this._isFilled = true;
	      details.inserted = this.placeholderChar;
	      return details;
	    }
	  }, {
	    key: "extractTail",
	    value: function extractTail() {
	      var _this$masked2;
	      return (_this$masked2 = this.masked).extractTail.apply(_this$masked2, arguments);
	    }
	  }, {
	    key: "appendTail",
	    value: function appendTail() {
	      var _this$masked3;
	      return (_this$masked3 = this.masked).appendTail.apply(_this$masked3, arguments);
	    }
	  }, {
	    key: "extractInput",
	    value: function extractInput() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      var flags = arguments.length > 2 ? arguments[2] : undefined;
	      return this.masked.extractInput(fromPos, toPos, flags);
	    }
	  }, {
	    key: "nearestInputPos",
	    value: function nearestInputPos(cursorPos) {
	      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DIRECTION.NONE;
	      var minPos = 0;
	      var maxPos = this.value.length;
	      var boundPos = Math.min(Math.max(cursorPos, minPos), maxPos);
	      switch (direction) {
	        case DIRECTION.LEFT:
	        case DIRECTION.FORCE_LEFT:
	          return this.isComplete ? boundPos : minPos;
	        case DIRECTION.RIGHT:
	        case DIRECTION.FORCE_RIGHT:
	          return this.isComplete ? boundPos : maxPos;
	        case DIRECTION.NONE:
	        default:
	          return boundPos;
	      }
	    }
	  }, {
	    key: "doValidate",
	    value: function doValidate() {
	      var _this$masked4, _this$parent;
	      return (_this$masked4 = this.masked).doValidate.apply(_this$masked4, arguments) && (!this.parent || (_this$parent = this.parent).doValidate.apply(_this$parent, arguments));
	    }
	  }, {
	    key: "doCommit",
	    value: function doCommit() {
	      this.masked.doCommit();
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return {
	        masked: this.masked.state,
	        _isFilled: this._isFilled
	      };
	    },
	    set: function set(state) {
	      this.masked.state = state.masked;
	      this._isFilled = state._isFilled;
	    }
	  }]);
	  return PatternInputDefinition;
	}();

	var PatternFixedDefinition = function () {
	  function PatternFixedDefinition(opts) {
	    _classCallCheck(this, PatternFixedDefinition);
	    Object.assign(this, opts);
	    this._value = '';
	  }
	  _createClass(PatternFixedDefinition, [{
	    key: "value",
	    get: function get() {
	      return this._value;
	    }
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this.isUnmasking ? this.value : '';
	    }
	  }, {
	    key: "reset",
	    value: function reset() {
	      this._isRawInput = false;
	      this._value = '';
	    }
	  }, {
	    key: "remove",
	    value: function remove() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._value.length;
	      this._value = this._value.slice(0, fromPos) + this._value.slice(toPos);
	      if (!this._value) this._isRawInput = false;
	      return new ChangeDetails();
	    }
	  }, {
	    key: "nearestInputPos",
	    value: function nearestInputPos(cursorPos) {
	      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DIRECTION.NONE;
	      var minPos = 0;
	      var maxPos = this._value.length;
	      switch (direction) {
	        case DIRECTION.LEFT:
	        case DIRECTION.FORCE_LEFT:
	          return minPos;
	        case DIRECTION.NONE:
	        case DIRECTION.RIGHT:
	        case DIRECTION.FORCE_RIGHT:
	        default:
	          return maxPos;
	      }
	    }
	  }, {
	    key: "extractInput",
	    value: function extractInput() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._value.length;
	      var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	      return flags.raw && this._isRawInput && this._value.slice(fromPos, toPos) || '';
	    }
	  }, {
	    key: "isComplete",
	    get: function get() {
	      return true;
	    }
	  }, {
	    key: "_appendChar",
	    value: function _appendChar(str) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var details = new ChangeDetails();
	      if (this._value) return details;
	      var appended = this.char === str[0];
	      var isResolved = appended && (this.isUnmasking || flags.input || flags.raw) && !flags.tail;
	      if (isResolved) details.rawInserted = this.char;
	      this._value = details.inserted = this.char;
	      this._isRawInput = isResolved && (flags.raw || flags.input);
	      return details;
	    }
	  }, {
	    key: "_appendPlaceholder",
	    value: function _appendPlaceholder() {
	      var details = new ChangeDetails();
	      if (this._value) return details;
	      this._value = details.inserted = this.char;
	      return details;
	    }
	  }, {
	    key: "extractTail",
	    value: function extractTail() {
	      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      return new ContinuousTailDetails('');
	    }
	  }, {
	    key: "appendTail",
	    value: function appendTail(tail) {
	      if (isString(tail)) tail = new ContinuousTailDetails(String(tail));
	      return tail.appendTo(this);
	    }
	  }, {
	    key: "append",
	    value: function append(str, flags, tail) {
	      var details = this._appendChar(str, flags);
	      if (tail != null) {
	        details.tailShift += this.appendTail(tail).tailShift;
	      }
	      return details;
	    }
	  }, {
	    key: "doCommit",
	    value: function doCommit() {}
	  }, {
	    key: "state",
	    get: function get() {
	      return {
	        _value: this._value,
	        _isRawInput: this._isRawInput
	      };
	    },
	    set: function set(state) {
	      Object.assign(this, state);
	    }
	  }]);
	  return PatternFixedDefinition;
	}();

	var ChunksTailDetails = function () {
	  function ChunksTailDetails() {
	    var chunks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    _classCallCheck(this, ChunksTailDetails);
	    this.chunks = chunks;
	    this.from = from;
	  }
	  _createClass(ChunksTailDetails, [{
	    key: "toString",
	    value: function toString() {
	      return this.chunks.map(String).join('');
	    }
	  }, {
	    key: "extend",
	    value: function extend(tailChunk) {
	      if (!String(tailChunk)) return;
	      if (isString(tailChunk)) tailChunk = new ContinuousTailDetails(String(tailChunk));
	      var lastChunk = this.chunks[this.chunks.length - 1];
	      var extendLast = lastChunk && (
	      lastChunk.stop === tailChunk.stop || tailChunk.stop == null) &&
	      tailChunk.from === lastChunk.from + lastChunk.toString().length;
	      if (tailChunk instanceof ContinuousTailDetails) {
	        if (extendLast) {
	          lastChunk.extend(tailChunk.toString());
	        } else {
	          this.chunks.push(tailChunk);
	        }
	      } else if (tailChunk instanceof ChunksTailDetails) {
	        if (tailChunk.stop == null) {
	          var firstTailChunk;
	          while (tailChunk.chunks.length && tailChunk.chunks[0].stop == null) {
	            firstTailChunk = tailChunk.chunks.shift();
	            firstTailChunk.from += tailChunk.from;
	            this.extend(firstTailChunk);
	          }
	        }
	        if (tailChunk.toString()) {
	          tailChunk.stop = tailChunk.blockIndex;
	          this.chunks.push(tailChunk);
	        }
	      }
	    }
	  }, {
	    key: "appendTo",
	    value: function appendTo(masked) {
	      if (!(masked instanceof IMask.MaskedPattern)) {
	        var tail = new ContinuousTailDetails(this.toString());
	        return tail.appendTo(masked);
	      }
	      var details = new ChangeDetails();
	      for (var ci = 0; ci < this.chunks.length && !details.skip; ++ci) {
	        var chunk = this.chunks[ci];
	        var lastBlockIter = masked._mapPosToBlock(masked.value.length);
	        var stop = chunk.stop;
	        var chunkBlock = void 0;
	        if (stop != null && (
	        !lastBlockIter || lastBlockIter.index <= stop)) {
	          if (chunk instanceof ChunksTailDetails ||
	          masked._stops.indexOf(stop) >= 0) {
	            details.aggregate(masked._appendPlaceholder(stop));
	          }
	          chunkBlock = chunk instanceof ChunksTailDetails && masked._blocks[stop];
	        }
	        if (chunkBlock) {
	          var tailDetails = chunkBlock.appendTail(chunk);
	          tailDetails.skip = false;
	          details.aggregate(tailDetails);
	          masked._value += tailDetails.inserted;
	          var remainChars = chunk.toString().slice(tailDetails.rawInserted.length);
	          if (remainChars) details.aggregate(masked.append(remainChars, {
	            tail: true
	          }));
	        } else {
	          details.aggregate(masked.append(chunk.toString(), {
	            tail: true
	          }));
	        }
	      }
	      return details;
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return {
	        chunks: this.chunks.map(function (c) {
	          return c.state;
	        }),
	        from: this.from,
	        stop: this.stop,
	        blockIndex: this.blockIndex
	      };
	    },
	    set: function set(state) {
	      var chunks = state.chunks,
	          props = _objectWithoutProperties(state, ["chunks"]);
	      Object.assign(this, props);
	      this.chunks = chunks.map(function (cstate) {
	        var chunk = "chunks" in cstate ? new ChunksTailDetails() : new ContinuousTailDetails();
	        chunk.state = cstate;
	        return chunk;
	      });
	    }
	  }, {
	    key: "shiftBefore",
	    value: function shiftBefore(pos) {
	      if (this.from >= pos || !this.chunks.length) return '';
	      var chunkShiftPos = pos - this.from;
	      var ci = 0;
	      while (ci < this.chunks.length) {
	        var chunk = this.chunks[ci];
	        var shiftChar = chunk.shiftBefore(chunkShiftPos);
	        if (chunk.toString()) {
	          if (!shiftChar) break;
	          ++ci;
	        } else {
	          this.chunks.splice(ci, 1);
	        }
	        if (shiftChar) return shiftChar;
	      }
	      return '';
	    }
	  }]);
	  return ChunksTailDetails;
	}();

	var MaskedRegExp = function (_Masked) {
	  _inherits(MaskedRegExp, _Masked);
	  var _super = _createSuper(MaskedRegExp);
	  function MaskedRegExp() {
	    _classCallCheck(this, MaskedRegExp);
	    return _super.apply(this, arguments);
	  }
	  _createClass(MaskedRegExp, [{
	    key: "_update",
	    value:
	    function _update(opts) {
	      if (opts.mask) opts.validate = function (value) {
	        return value.search(opts.mask) >= 0;
	      };
	      _get(_getPrototypeOf(MaskedRegExp.prototype), "_update", this).call(this, opts);
	    }
	  }]);
	  return MaskedRegExp;
	}(Masked);
	IMask.MaskedRegExp = MaskedRegExp;

	var MaskedPattern = function (_Masked) {
	  _inherits(MaskedPattern, _Masked);
	  var _super = _createSuper(MaskedPattern);
	  function MaskedPattern() {
	    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    _classCallCheck(this, MaskedPattern);
	    opts.definitions = Object.assign({}, DEFAULT_INPUT_DEFINITIONS, opts.definitions);
	    return _super.call(this, Object.assign({}, MaskedPattern.DEFAULTS, opts));
	  }
	  _createClass(MaskedPattern, [{
	    key: "_update",
	    value: function _update() {
	      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      opts.definitions = Object.assign({}, this.definitions, opts.definitions);
	      _get(_getPrototypeOf(MaskedPattern.prototype), "_update", this).call(this, opts);
	      this._rebuildMask();
	    }
	  }, {
	    key: "_rebuildMask",
	    value: function _rebuildMask() {
	      var _this = this;
	      var defs = this.definitions;
	      this._blocks = [];
	      this._stops = [];
	      this._maskedBlocks = {};
	      var pattern = this.mask;
	      if (!pattern || !defs) return;
	      var unmaskingBlock = false;
	      var optionalBlock = false;
	      for (var i = 0; i < pattern.length; ++i) {
	        if (this.blocks) {
	          var _ret = function () {
	            var p = pattern.slice(i);
	            var bNames = Object.keys(_this.blocks).filter(function (bName) {
	              return p.indexOf(bName) === 0;
	            });
	            bNames.sort(function (a, b) {
	              return b.length - a.length;
	            });
	            var bName = bNames[0];
	            if (bName) {
	              var maskedBlock = createMask(Object.assign({
	                parent: _this,
	                lazy: _this.lazy,
	                placeholderChar: _this.placeholderChar,
	                overwrite: _this.overwrite
	              }, _this.blocks[bName]));
	              if (maskedBlock) {
	                _this._blocks.push(maskedBlock);
	                if (!_this._maskedBlocks[bName]) _this._maskedBlocks[bName] = [];
	                _this._maskedBlocks[bName].push(_this._blocks.length - 1);
	              }
	              i += bName.length - 1;
	              return "continue";
	            }
	          }();
	          if (_ret === "continue") continue;
	        }
	        var char = pattern[i];
	        var _isInput = (char in defs);
	        if (char === MaskedPattern.STOP_CHAR) {
	          this._stops.push(this._blocks.length);
	          continue;
	        }
	        if (char === '{' || char === '}') {
	          unmaskingBlock = !unmaskingBlock;
	          continue;
	        }
	        if (char === '[' || char === ']') {
	          optionalBlock = !optionalBlock;
	          continue;
	        }
	        if (char === MaskedPattern.ESCAPE_CHAR) {
	          ++i;
	          char = pattern[i];
	          if (!char) break;
	          _isInput = false;
	        }
	        var def = _isInput ? new PatternInputDefinition({
	          parent: this,
	          lazy: this.lazy,
	          placeholderChar: this.placeholderChar,
	          mask: defs[char],
	          isOptional: optionalBlock
	        }) : new PatternFixedDefinition({
	          char: char,
	          isUnmasking: unmaskingBlock
	        });
	        this._blocks.push(def);
	      }
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return Object.assign({}, _get(_getPrototypeOf(MaskedPattern.prototype), "state", this), {
	        _blocks: this._blocks.map(function (b) {
	          return b.state;
	        })
	      });
	    },
	    set: function set(state) {
	      var _blocks = state._blocks,
	          maskedState = _objectWithoutProperties(state, ["_blocks"]);
	      this._blocks.forEach(function (b, bi) {
	        return b.state = _blocks[bi];
	      });
	      _set(_getPrototypeOf(MaskedPattern.prototype), "state", maskedState, this, true);
	    }
	  }, {
	    key: "reset",
	    value: function reset() {
	      _get(_getPrototypeOf(MaskedPattern.prototype), "reset", this).call(this);
	      this._blocks.forEach(function (b) {
	        return b.reset();
	      });
	    }
	  }, {
	    key: "isComplete",
	    get: function get() {
	      return this._blocks.every(function (b) {
	        return b.isComplete;
	      });
	    }
	  }, {
	    key: "doCommit",
	    value: function doCommit() {
	      this._blocks.forEach(function (b) {
	        return b.doCommit();
	      });
	      _get(_getPrototypeOf(MaskedPattern.prototype), "doCommit", this).call(this);
	    }
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this._blocks.reduce(function (str, b) {
	        return str += b.unmaskedValue;
	      }, '');
	    },
	    set: function set(unmaskedValue) {
	      _set(_getPrototypeOf(MaskedPattern.prototype), "unmaskedValue", unmaskedValue, this, true);
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      return this._blocks.reduce(function (str, b) {
	        return str += b.value;
	      }, '');
	    },
	    set: function set(value) {
	      _set(_getPrototypeOf(MaskedPattern.prototype), "value", value, this, true);
	    }
	  }, {
	    key: "appendTail",
	    value: function appendTail(tail) {
	      return _get(_getPrototypeOf(MaskedPattern.prototype), "appendTail", this).call(this, tail).aggregate(this._appendPlaceholder());
	    }
	  }, {
	    key: "_appendCharRaw",
	    value: function _appendCharRaw(ch) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var blockIter = this._mapPosToBlock(this.value.length);
	      var details = new ChangeDetails();
	      if (!blockIter) return details;
	      for (var bi = blockIter.index;; ++bi) {
	        var _block = this._blocks[bi];
	        if (!_block) break;
	        var blockDetails = _block._appendChar(ch, flags);
	        var skip = blockDetails.skip;
	        details.aggregate(blockDetails);
	        if (skip || blockDetails.rawInserted) break;
	      }
	      return details;
	    }
	  }, {
	    key: "extractTail",
	    value: function extractTail() {
	      var _this2 = this;
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      var chunkTail = new ChunksTailDetails();
	      if (fromPos === toPos) return chunkTail;
	      this._forEachBlocksInRange(fromPos, toPos, function (b, bi, bFromPos, bToPos) {
	        var blockChunk = b.extractTail(bFromPos, bToPos);
	        blockChunk.stop = _this2._findStopBefore(bi);
	        blockChunk.from = _this2._blockStartPos(bi);
	        if (blockChunk instanceof ChunksTailDetails) blockChunk.blockIndex = bi;
	        chunkTail.extend(blockChunk);
	      });
	      return chunkTail;
	    }
	  }, {
	    key: "extractInput",
	    value: function extractInput() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	      if (fromPos === toPos) return '';
	      var input = '';
	      this._forEachBlocksInRange(fromPos, toPos, function (b, _, fromPos, toPos) {
	        input += b.extractInput(fromPos, toPos, flags);
	      });
	      return input;
	    }
	  }, {
	    key: "_findStopBefore",
	    value: function _findStopBefore(blockIndex) {
	      var stopBefore;
	      for (var si = 0; si < this._stops.length; ++si) {
	        var stop = this._stops[si];
	        if (stop <= blockIndex) stopBefore = stop;else break;
	      }
	      return stopBefore;
	    }
	  }, {
	    key: "_appendPlaceholder",
	    value: function _appendPlaceholder(toBlockIndex) {
	      var _this3 = this;
	      var details = new ChangeDetails();
	      if (this.lazy && toBlockIndex == null) return details;
	      var startBlockIter = this._mapPosToBlock(this.value.length);
	      if (!startBlockIter) return details;
	      var startBlockIndex = startBlockIter.index;
	      var endBlockIndex = toBlockIndex != null ? toBlockIndex : this._blocks.length;
	      this._blocks.slice(startBlockIndex, endBlockIndex).forEach(function (b) {
	        if (!b.lazy || toBlockIndex != null) {
	          var args = b._blocks != null ? [b._blocks.length] : [];
	          var bDetails = b._appendPlaceholder.apply(b, args);
	          _this3._value += bDetails.inserted;
	          details.aggregate(bDetails);
	        }
	      });
	      return details;
	    }
	  }, {
	    key: "_mapPosToBlock",
	    value: function _mapPosToBlock(pos) {
	      var accVal = '';
	      for (var bi = 0; bi < this._blocks.length; ++bi) {
	        var _block2 = this._blocks[bi];
	        var blockStartPos = accVal.length;
	        accVal += _block2.value;
	        if (pos <= accVal.length) {
	          return {
	            index: bi,
	            offset: pos - blockStartPos
	          };
	        }
	      }
	    }
	  }, {
	    key: "_blockStartPos",
	    value: function _blockStartPos(blockIndex) {
	      return this._blocks.slice(0, blockIndex).reduce(function (pos, b) {
	        return pos += b.value.length;
	      }, 0);
	    }
	  }, {
	    key: "_forEachBlocksInRange",
	    value: function _forEachBlocksInRange(fromPos) {
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      var fn = arguments.length > 2 ? arguments[2] : undefined;
	      var fromBlockIter = this._mapPosToBlock(fromPos);
	      if (fromBlockIter) {
	        var toBlockIter = this._mapPosToBlock(toPos);
	        var isSameBlock = toBlockIter && fromBlockIter.index === toBlockIter.index;
	        var fromBlockStartPos = fromBlockIter.offset;
	        var fromBlockEndPos = toBlockIter && isSameBlock ? toBlockIter.offset : this._blocks[fromBlockIter.index].value.length;
	        fn(this._blocks[fromBlockIter.index], fromBlockIter.index, fromBlockStartPos, fromBlockEndPos);
	        if (toBlockIter && !isSameBlock) {
	          for (var bi = fromBlockIter.index + 1; bi < toBlockIter.index; ++bi) {
	            fn(this._blocks[bi], bi, 0, this._blocks[bi].value.length);
	          }
	          fn(this._blocks[toBlockIter.index], toBlockIter.index, 0, toBlockIter.offset);
	        }
	      }
	    }
	  }, {
	    key: "remove",
	    value: function remove() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      var removeDetails = _get(_getPrototypeOf(MaskedPattern.prototype), "remove", this).call(this, fromPos, toPos);
	      this._forEachBlocksInRange(fromPos, toPos, function (b, _, bFromPos, bToPos) {
	        removeDetails.aggregate(b.remove(bFromPos, bToPos));
	      });
	      return removeDetails;
	    }
	  }, {
	    key: "nearestInputPos",
	    value: function nearestInputPos(cursorPos) {
	      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DIRECTION.NONE;
	      var beginBlockData = this._mapPosToBlock(cursorPos) || {
	        index: 0,
	        offset: 0
	      };
	      var beginBlockOffset = beginBlockData.offset,
	          beginBlockIndex = beginBlockData.index;
	      var beginBlock = this._blocks[beginBlockIndex];
	      if (!beginBlock) return cursorPos;
	      var beginBlockCursorPos = beginBlockOffset;
	      if (beginBlockCursorPos !== 0 && beginBlockCursorPos < beginBlock.value.length) {
	        beginBlockCursorPos = beginBlock.nearestInputPos(beginBlockOffset, forceDirection(direction));
	      }
	      var cursorAtRight = beginBlockCursorPos === beginBlock.value.length;
	      var cursorAtLeft = beginBlockCursorPos === 0;
	      if (!cursorAtLeft && !cursorAtRight) return this._blockStartPos(beginBlockIndex) + beginBlockCursorPos;
	      var searchBlockIndex = cursorAtRight ? beginBlockIndex + 1 : beginBlockIndex;
	      if (direction === DIRECTION.NONE) {
	        if (searchBlockIndex > 0) {
	          var blockIndexAtLeft = searchBlockIndex - 1;
	          var blockAtLeft = this._blocks[blockIndexAtLeft];
	          var blockInputPos = blockAtLeft.nearestInputPos(0, DIRECTION.NONE);
	          if (!blockAtLeft.value.length || blockInputPos !== blockAtLeft.value.length) {
	            return this._blockStartPos(searchBlockIndex);
	          }
	        }
	        var firstInputAtRight = searchBlockIndex;
	        for (var bi = firstInputAtRight; bi < this._blocks.length; ++bi) {
	          var blockAtRight = this._blocks[bi];
	          var _blockInputPos = blockAtRight.nearestInputPos(0, DIRECTION.NONE);
	          if (!blockAtRight.value.length || _blockInputPos !== blockAtRight.value.length) {
	            return this._blockStartPos(bi) + _blockInputPos;
	          }
	        }
	        for (var _bi = searchBlockIndex - 1; _bi >= 0; --_bi) {
	          var _block3 = this._blocks[_bi];
	          var _blockInputPos2 = _block3.nearestInputPos(0, DIRECTION.NONE);
	          if (!_block3.value.length || _blockInputPos2 !== _block3.value.length) {
	            return this._blockStartPos(_bi) + _block3.value.length;
	          }
	        }
	        return cursorPos;
	      }
	      if (direction === DIRECTION.LEFT || direction === DIRECTION.FORCE_LEFT) {
	        var firstFilledBlockIndexAtRight;
	        for (var _bi2 = searchBlockIndex; _bi2 < this._blocks.length; ++_bi2) {
	          if (this._blocks[_bi2].value) {
	            firstFilledBlockIndexAtRight = _bi2;
	            break;
	          }
	        }
	        if (firstFilledBlockIndexAtRight != null) {
	          var filledBlock = this._blocks[firstFilledBlockIndexAtRight];
	          var _blockInputPos3 = filledBlock.nearestInputPos(0, DIRECTION.RIGHT);
	          if (_blockInputPos3 === 0 && filledBlock.unmaskedValue.length) {
	            return this._blockStartPos(firstFilledBlockIndexAtRight) + _blockInputPos3;
	          }
	        }
	        var firstFilledInputBlockIndex = -1;
	        var firstEmptyInputBlockIndex;
	        for (var _bi3 = searchBlockIndex - 1; _bi3 >= 0; --_bi3) {
	          var _block4 = this._blocks[_bi3];
	          var _blockInputPos4 = _block4.nearestInputPos(_block4.value.length, DIRECTION.FORCE_LEFT);
	          if (!_block4.value || _blockInputPos4 !== 0) firstEmptyInputBlockIndex = _bi3;
	          if (_blockInputPos4 !== 0) {
	            if (_blockInputPos4 !== _block4.value.length) {
	              return this._blockStartPos(_bi3) + _blockInputPos4;
	            } else {
	              firstFilledInputBlockIndex = _bi3;
	              break;
	            }
	          }
	        }
	        if (direction === DIRECTION.LEFT) {
	          for (var _bi4 = firstFilledInputBlockIndex + 1; _bi4 <= Math.min(searchBlockIndex, this._blocks.length - 1); ++_bi4) {
	            var _block5 = this._blocks[_bi4];
	            var _blockInputPos5 = _block5.nearestInputPos(0, DIRECTION.NONE);
	            var blockAlignedPos = this._blockStartPos(_bi4) + _blockInputPos5;
	            if (blockAlignedPos > cursorPos) break;
	            if (_blockInputPos5 !== _block5.value.length) return blockAlignedPos;
	          }
	        }
	        if (firstFilledInputBlockIndex >= 0) {
	          return this._blockStartPos(firstFilledInputBlockIndex) + this._blocks[firstFilledInputBlockIndex].value.length;
	        }
	        if (direction === DIRECTION.FORCE_LEFT || this.lazy && !this.extractInput() && !isInput(this._blocks[searchBlockIndex])) {
	          return 0;
	        }
	        if (firstEmptyInputBlockIndex != null) {
	          return this._blockStartPos(firstEmptyInputBlockIndex);
	        }
	        for (var _bi5 = searchBlockIndex; _bi5 < this._blocks.length; ++_bi5) {
	          var _block6 = this._blocks[_bi5];
	          var _blockInputPos6 = _block6.nearestInputPos(0, DIRECTION.NONE);
	          if (!_block6.value.length || _blockInputPos6 !== _block6.value.length) {
	            return this._blockStartPos(_bi5) + _blockInputPos6;
	          }
	        }
	        return 0;
	      }
	      if (direction === DIRECTION.RIGHT || direction === DIRECTION.FORCE_RIGHT) {
	        var firstInputBlockAlignedIndex;
	        var firstInputBlockAlignedPos;
	        for (var _bi6 = searchBlockIndex; _bi6 < this._blocks.length; ++_bi6) {
	          var _block7 = this._blocks[_bi6];
	          var _blockInputPos7 = _block7.nearestInputPos(0, DIRECTION.NONE);
	          if (_blockInputPos7 !== _block7.value.length) {
	            firstInputBlockAlignedPos = this._blockStartPos(_bi6) + _blockInputPos7;
	            firstInputBlockAlignedIndex = _bi6;
	            break;
	          }
	        }
	        if (firstInputBlockAlignedIndex != null && firstInputBlockAlignedPos != null) {
	          for (var _bi7 = firstInputBlockAlignedIndex; _bi7 < this._blocks.length; ++_bi7) {
	            var _block8 = this._blocks[_bi7];
	            var _blockInputPos8 = _block8.nearestInputPos(0, DIRECTION.FORCE_RIGHT);
	            if (_blockInputPos8 !== _block8.value.length) {
	              return this._blockStartPos(_bi7) + _blockInputPos8;
	            }
	          }
	          return direction === DIRECTION.FORCE_RIGHT ? this.value.length : firstInputBlockAlignedPos;
	        }
	        for (var _bi8 = Math.min(searchBlockIndex, this._blocks.length - 1); _bi8 >= 0; --_bi8) {
	          var _block9 = this._blocks[_bi8];
	          var _blockInputPos9 = _block9.nearestInputPos(_block9.value.length, DIRECTION.LEFT);
	          if (_blockInputPos9 !== 0) {
	            var alignedPos = this._blockStartPos(_bi8) + _blockInputPos9;
	            if (alignedPos >= cursorPos) return alignedPos;
	            break;
	          }
	        }
	      }
	      return cursorPos;
	    }
	  }, {
	    key: "maskedBlock",
	    value: function maskedBlock(name) {
	      return this.maskedBlocks(name)[0];
	    }
	  }, {
	    key: "maskedBlocks",
	    value: function maskedBlocks(name) {
	      var _this4 = this;
	      var indices = this._maskedBlocks[name];
	      if (!indices) return [];
	      return indices.map(function (gi) {
	        return _this4._blocks[gi];
	      });
	    }
	  }]);
	  return MaskedPattern;
	}(Masked);
	MaskedPattern.DEFAULTS = {
	  lazy: true,
	  placeholderChar: '_'
	};
	MaskedPattern.STOP_CHAR = '`';
	MaskedPattern.ESCAPE_CHAR = '\\';
	MaskedPattern.InputDefinition = PatternInputDefinition;
	MaskedPattern.FixedDefinition = PatternFixedDefinition;
	function isInput(block) {
	  if (!block) return false;
	  var value = block.value;
	  return !value || block.nearestInputPos(0, DIRECTION.NONE) !== value.length;
	}
	IMask.MaskedPattern = MaskedPattern;

	var MaskedRange = function (_MaskedPattern) {
	  _inherits(MaskedRange, _MaskedPattern);
	  var _super = _createSuper(MaskedRange);
	  function MaskedRange() {
	    _classCallCheck(this, MaskedRange);
	    return _super.apply(this, arguments);
	  }
	  _createClass(MaskedRange, [{
	    key: "_matchFrom",
	    get:
	    function get() {
	      return this.maxLength - String(this.from).length;
	    }
	  }, {
	    key: "_update",
	    value: function _update(opts) {
	      opts = Object.assign({
	        to: this.to || 0,
	        from: this.from || 0
	      }, opts);
	      var maxLength = String(opts.to).length;
	      if (opts.maxLength != null) maxLength = Math.max(maxLength, opts.maxLength);
	      opts.maxLength = maxLength;
	      var fromStr = String(opts.from).padStart(maxLength, '0');
	      var toStr = String(opts.to).padStart(maxLength, '0');
	      var sameCharsCount = 0;
	      while (sameCharsCount < toStr.length && toStr[sameCharsCount] === fromStr[sameCharsCount]) {
	        ++sameCharsCount;
	      }
	      opts.mask = toStr.slice(0, sameCharsCount).replace(/0/g, '\\0') + '0'.repeat(maxLength - sameCharsCount);
	      _get(_getPrototypeOf(MaskedRange.prototype), "_update", this).call(this, opts);
	    }
	  }, {
	    key: "isComplete",
	    get: function get() {
	      return _get(_getPrototypeOf(MaskedRange.prototype), "isComplete", this) && Boolean(this.value);
	    }
	  }, {
	    key: "boundaries",
	    value: function boundaries(str) {
	      var minstr = '';
	      var maxstr = '';
	      var _ref = str.match(/^(\D*)(\d*)(\D*)/) || [],
	          _ref2 = _slicedToArray(_ref, 3),
	          placeholder = _ref2[1],
	          num = _ref2[2];
	      if (num) {
	        minstr = '0'.repeat(placeholder.length) + num;
	        maxstr = '9'.repeat(placeholder.length) + num;
	      }
	      minstr = minstr.padEnd(this.maxLength, '0');
	      maxstr = maxstr.padEnd(this.maxLength, '9');
	      return [minstr, maxstr];
	    }
	  }, {
	    key: "doPrepare",
	    value: function doPrepare(str) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      str = _get(_getPrototypeOf(MaskedRange.prototype), "doPrepare", this).call(this, str, flags).replace(/\D/g, '');
	      if (!this.autofix) return str;
	      var fromStr = String(this.from).padStart(this.maxLength, '0');
	      var toStr = String(this.to).padStart(this.maxLength, '0');
	      var val = this.value;
	      var prepStr = '';
	      for (var ci = 0; ci < str.length; ++ci) {
	        var nextVal = val + prepStr + str[ci];
	        var _this$boundaries = this.boundaries(nextVal),
	            _this$boundaries2 = _slicedToArray(_this$boundaries, 2),
	            minstr = _this$boundaries2[0],
	            maxstr = _this$boundaries2[1];
	        if (Number(maxstr) < this.from) prepStr += fromStr[nextVal.length - 1];else if (Number(minstr) > this.to) prepStr += toStr[nextVal.length - 1];else prepStr += str[ci];
	      }
	      return prepStr;
	    }
	  }, {
	    key: "doValidate",
	    value: function doValidate() {
	      var _get2;
	      var str = this.value;
	      var firstNonZero = str.search(/[^0]/);
	      if (firstNonZero === -1 && str.length <= this._matchFrom) return true;
	      var _this$boundaries3 = this.boundaries(str),
	          _this$boundaries4 = _slicedToArray(_this$boundaries3, 2),
	          minstr = _this$boundaries4[0],
	          maxstr = _this$boundaries4[1];
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	      return this.from <= Number(maxstr) && Number(minstr) <= this.to && (_get2 = _get(_getPrototypeOf(MaskedRange.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args));
	    }
	  }]);
	  return MaskedRange;
	}(MaskedPattern);
	IMask.MaskedRange = MaskedRange;

	var MaskedDate = function (_MaskedPattern) {
	  _inherits(MaskedDate, _MaskedPattern);
	  var _super = _createSuper(MaskedDate);
	  function MaskedDate(opts) {
	    _classCallCheck(this, MaskedDate);
	    return _super.call(this, Object.assign({}, MaskedDate.DEFAULTS, opts));
	  }
	  _createClass(MaskedDate, [{
	    key: "_update",
	    value: function _update(opts) {
	      if (opts.mask === Date) delete opts.mask;
	      if (opts.pattern) opts.mask = opts.pattern;
	      var blocks = opts.blocks;
	      opts.blocks = Object.assign({}, MaskedDate.GET_DEFAULT_BLOCKS());
	      if (opts.min) opts.blocks.Y.from = opts.min.getFullYear();
	      if (opts.max) opts.blocks.Y.to = opts.max.getFullYear();
	      if (opts.min && opts.max && opts.blocks.Y.from === opts.blocks.Y.to) {
	        opts.blocks.m.from = opts.min.getMonth() + 1;
	        opts.blocks.m.to = opts.max.getMonth() + 1;
	        if (opts.blocks.m.from === opts.blocks.m.to) {
	          opts.blocks.d.from = opts.min.getDate();
	          opts.blocks.d.to = opts.max.getDate();
	        }
	      }
	      Object.assign(opts.blocks, blocks);
	      Object.keys(opts.blocks).forEach(function (bk) {
	        var b = opts.blocks[bk];
	        if (!('autofix' in b)) b.autofix = opts.autofix;
	      });
	      _get(_getPrototypeOf(MaskedDate.prototype), "_update", this).call(this, opts);
	    }
	  }, {
	    key: "doValidate",
	    value: function doValidate() {
	      var _get2;
	      var date = this.date;
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	      return (_get2 = _get(_getPrototypeOf(MaskedDate.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args)) && (!this.isComplete || this.isDateExist(this.value) && date != null && (this.min == null || this.min <= date) && (this.max == null || date <= this.max));
	    }
	  }, {
	    key: "isDateExist",
	    value: function isDateExist(str) {
	      return this.format(this.parse(str, this), this).indexOf(str) >= 0;
	    }
	  }, {
	    key: "date",
	    get: function get() {
	      return this.typedValue;
	    },
	    set: function set(date) {
	      this.typedValue = date;
	    }
	  }, {
	    key: "typedValue",
	    get: function get() {
	      return this.isComplete ? _get(_getPrototypeOf(MaskedDate.prototype), "typedValue", this) : null;
	    },
	    set: function set(value) {
	      _set(_getPrototypeOf(MaskedDate.prototype), "typedValue", value, this, true);
	    }
	  }]);
	  return MaskedDate;
	}(MaskedPattern);
	MaskedDate.DEFAULTS = {
	  pattern: 'd{.}`m{.}`Y',
	  format: function format(date) {
	    var day = String(date.getDate()).padStart(2, '0');
	    var month = String(date.getMonth() + 1).padStart(2, '0');
	    var year = date.getFullYear();
	    return [day, month, year].join('.');
	  },
	  parse: function parse(str) {
	    var _str$split = str.split('.'),
	        _str$split2 = _slicedToArray(_str$split, 3),
	        day = _str$split2[0],
	        month = _str$split2[1],
	        year = _str$split2[2];
	    return new Date(year, month - 1, day);
	  }
	};
	MaskedDate.GET_DEFAULT_BLOCKS = function () {
	  return {
	    d: {
	      mask: MaskedRange,
	      from: 1,
	      to: 31,
	      maxLength: 2
	    },
	    m: {
	      mask: MaskedRange,
	      from: 1,
	      to: 12,
	      maxLength: 2
	    },
	    Y: {
	      mask: MaskedRange,
	      from: 1900,
	      to: 9999
	    }
	  };
	};
	IMask.MaskedDate = MaskedDate;

	var MaskElement = function () {
	  function MaskElement() {
	    _classCallCheck(this, MaskElement);
	  }
	  _createClass(MaskElement, [{
	    key: "selectionStart",
	    get:
	    function get() {
	      var start;
	      try {
	        start = this._unsafeSelectionStart;
	      } catch (e) {}
	      return start != null ? start : this.value.length;
	    }
	  }, {
	    key: "selectionEnd",
	    get: function get() {
	      var end;
	      try {
	        end = this._unsafeSelectionEnd;
	      } catch (e) {}
	      return end != null ? end : this.value.length;
	    }
	  }, {
	    key: "select",
	    value: function select(start, end) {
	      if (start == null || end == null || start === this.selectionStart && end === this.selectionEnd) return;
	      try {
	        this._unsafeSelect(start, end);
	      } catch (e) {}
	    }
	  }, {
	    key: "_unsafeSelect",
	    value: function _unsafeSelect(start, end) {}
	  }, {
	    key: "isActive",
	    get: function get() {
	      return false;
	    }
	  }, {
	    key: "bindEvents",
	    value: function bindEvents(handlers) {}
	  }, {
	    key: "unbindEvents",
	    value: function unbindEvents() {}
	  }]);
	  return MaskElement;
	}();
	IMask.MaskElement = MaskElement;

	var HTMLMaskElement = function (_MaskElement) {
	  _inherits(HTMLMaskElement, _MaskElement);
	  var _super = _createSuper(HTMLMaskElement);
	  function HTMLMaskElement(input) {
	    var _this;
	    _classCallCheck(this, HTMLMaskElement);
	    _this = _super.call(this);
	    _this.input = input;
	    _this._handlers = {};
	    return _this;
	  }
	  _createClass(HTMLMaskElement, [{
	    key: "rootElement",
	    get: function get() {
	      return this.input.getRootNode ? this.input.getRootNode() : document;
	    }
	  }, {
	    key: "isActive",
	    get: function get() {
	      return this.input === this.rootElement.activeElement;
	    }
	  }, {
	    key: "_unsafeSelectionStart",
	    get: function get() {
	      return this.input.selectionStart;
	    }
	  }, {
	    key: "_unsafeSelectionEnd",
	    get: function get() {
	      return this.input.selectionEnd;
	    }
	  }, {
	    key: "_unsafeSelect",
	    value: function _unsafeSelect(start, end) {
	      this.input.setSelectionRange(start, end);
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      return this.input.value;
	    },
	    set: function set(value) {
	      this.input.value = value;
	    }
	  }, {
	    key: "bindEvents",
	    value: function bindEvents(handlers) {
	      var _this2 = this;
	      Object.keys(handlers).forEach(function (event) {
	        return _this2._toggleEventHandler(HTMLMaskElement.EVENTS_MAP[event], handlers[event]);
	      });
	    }
	  }, {
	    key: "unbindEvents",
	    value: function unbindEvents() {
	      var _this3 = this;
	      Object.keys(this._handlers).forEach(function (event) {
	        return _this3._toggleEventHandler(event);
	      });
	    }
	  }, {
	    key: "_toggleEventHandler",
	    value: function _toggleEventHandler(event, handler) {
	      if (this._handlers[event]) {
	        this.input.removeEventListener(event, this._handlers[event]);
	        delete this._handlers[event];
	      }
	      if (handler) {
	        this.input.addEventListener(event, handler);
	        this._handlers[event] = handler;
	      }
	    }
	  }]);
	  return HTMLMaskElement;
	}(MaskElement);
	HTMLMaskElement.EVENTS_MAP = {
	  selectionChange: 'keydown',
	  input: 'input',
	  drop: 'drop',
	  click: 'click',
	  focus: 'focus',
	  commit: 'blur'
	};
	IMask.HTMLMaskElement = HTMLMaskElement;

	var HTMLContenteditableMaskElement = function (_HTMLMaskElement) {
	  _inherits(HTMLContenteditableMaskElement, _HTMLMaskElement);
	  var _super = _createSuper(HTMLContenteditableMaskElement);
	  function HTMLContenteditableMaskElement() {
	    _classCallCheck(this, HTMLContenteditableMaskElement);
	    return _super.apply(this, arguments);
	  }
	  _createClass(HTMLContenteditableMaskElement, [{
	    key: "_unsafeSelectionStart",
	    get:
	    function get() {
	      var root = this.rootElement;
	      var selection = root.getSelection && root.getSelection();
	      return selection && selection.anchorOffset;
	    }
	  }, {
	    key: "_unsafeSelectionEnd",
	    get: function get() {
	      var root = this.rootElement;
	      var selection = root.getSelection && root.getSelection();
	      return selection && this._unsafeSelectionStart + String(selection).length;
	    }
	  }, {
	    key: "_unsafeSelect",
	    value: function _unsafeSelect(start, end) {
	      if (!this.rootElement.createRange) return;
	      var range = this.rootElement.createRange();
	      range.setStart(this.input.firstChild || this.input, start);
	      range.setEnd(this.input.lastChild || this.input, end);
	      var root = this.rootElement;
	      var selection = root.getSelection && root.getSelection();
	      if (selection) {
	        selection.removeAllRanges();
	        selection.addRange(range);
	      }
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      return this.input.textContent;
	    },
	    set: function set(value) {
	      this.input.textContent = value;
	    }
	  }]);
	  return HTMLContenteditableMaskElement;
	}(HTMLMaskElement);
	IMask.HTMLContenteditableMaskElement = HTMLContenteditableMaskElement;

	var InputMask = function () {
	  function InputMask(el, opts) {
	    _classCallCheck(this, InputMask);
	    this.el = el instanceof MaskElement ? el : el.isContentEditable && el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA' ? new HTMLContenteditableMaskElement(el) : new HTMLMaskElement(el);
	    this.masked = createMask(opts);
	    this._listeners = {};
	    this._value = '';
	    this._unmaskedValue = '';
	    this._saveSelection = this._saveSelection.bind(this);
	    this._onInput = this._onInput.bind(this);
	    this._onChange = this._onChange.bind(this);
	    this._onDrop = this._onDrop.bind(this);
	    this._onFocus = this._onFocus.bind(this);
	    this._onClick = this._onClick.bind(this);
	    this.alignCursor = this.alignCursor.bind(this);
	    this.alignCursorFriendly = this.alignCursorFriendly.bind(this);
	    this._bindEvents();
	    this.updateValue();
	    this._onChange();
	  }
	  _createClass(InputMask, [{
	    key: "mask",
	    get: function get() {
	      return this.masked.mask;
	    },
	    set: function set(mask) {
	      if (this.maskEquals(mask)) return;
	      if (!(mask instanceof IMask.Masked) && this.masked.constructor === maskedClass(mask)) {
	        this.masked.updateOptions({
	          mask: mask
	        });
	        return;
	      }
	      var masked = createMask({
	        mask: mask
	      });
	      masked.unmaskedValue = this.masked.unmaskedValue;
	      this.masked = masked;
	    }
	  }, {
	    key: "maskEquals",
	    value: function maskEquals(mask) {
	      return mask == null || mask === this.masked.mask || mask === Date && this.masked instanceof MaskedDate;
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      return this._value;
	    },
	    set: function set(str) {
	      this.masked.value = str;
	      this.updateControl();
	      this.alignCursor();
	    }
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this._unmaskedValue;
	    },
	    set: function set(str) {
	      this.masked.unmaskedValue = str;
	      this.updateControl();
	      this.alignCursor();
	    }
	  }, {
	    key: "typedValue",
	    get: function get() {
	      return this.masked.typedValue;
	    },
	    set: function set(val) {
	      this.masked.typedValue = val;
	      this.updateControl();
	      this.alignCursor();
	    }
	  }, {
	    key: "_bindEvents",
	    value: function _bindEvents() {
	      this.el.bindEvents({
	        selectionChange: this._saveSelection,
	        input: this._onInput,
	        drop: this._onDrop,
	        click: this._onClick,
	        focus: this._onFocus,
	        commit: this._onChange
	      });
	    }
	  }, {
	    key: "_unbindEvents",
	    value: function _unbindEvents() {
	      if (this.el) this.el.unbindEvents();
	    }
	  }, {
	    key: "_fireEvent",
	    value: function _fireEvent(ev) {
	      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }
	      var listeners = this._listeners[ev];
	      if (!listeners) return;
	      listeners.forEach(function (l) {
	        return l.apply(void 0, args);
	      });
	    }
	  }, {
	    key: "selectionStart",
	    get: function get() {
	      return this._cursorChanging ? this._changingCursorPos : this.el.selectionStart;
	    }
	  }, {
	    key: "cursorPos",
	    get: function get() {
	      return this._cursorChanging ? this._changingCursorPos : this.el.selectionEnd;
	    },
	    set: function set(pos) {
	      if (!this.el || !this.el.isActive) return;
	      this.el.select(pos, pos);
	      this._saveSelection();
	    }
	  }, {
	    key: "_saveSelection",
	    value: function _saveSelection()
	    {
	      if (this.value !== this.el.value) {
	        console.warn('Element value was changed outside of mask. Syncronize mask using `mask.updateValue()` to work properly.');
	      }
	      this._selection = {
	        start: this.selectionStart,
	        end: this.cursorPos
	      };
	    }
	  }, {
	    key: "updateValue",
	    value: function updateValue() {
	      this.masked.value = this.el.value;
	      this._value = this.masked.value;
	    }
	  }, {
	    key: "updateControl",
	    value: function updateControl() {
	      var newUnmaskedValue = this.masked.unmaskedValue;
	      var newValue = this.masked.value;
	      var isChanged = this.unmaskedValue !== newUnmaskedValue || this.value !== newValue;
	      this._unmaskedValue = newUnmaskedValue;
	      this._value = newValue;
	      if (this.el.value !== newValue) this.el.value = newValue;
	      if (isChanged) this._fireChangeEvents();
	    }
	  }, {
	    key: "updateOptions",
	    value: function updateOptions(opts) {
	      var mask = opts.mask,
	          restOpts = _objectWithoutProperties(opts, ["mask"]);
	      var updateMask = !this.maskEquals(mask);
	      var updateOpts = !objectIncludes(this.masked, restOpts);
	      if (updateMask) this.mask = mask;
	      if (updateOpts) this.masked.updateOptions(restOpts);
	      if (updateMask || updateOpts) this.updateControl();
	    }
	  }, {
	    key: "updateCursor",
	    value: function updateCursor(cursorPos) {
	      if (cursorPos == null) return;
	      this.cursorPos = cursorPos;
	      this._delayUpdateCursor(cursorPos);
	    }
	  }, {
	    key: "_delayUpdateCursor",
	    value: function _delayUpdateCursor(cursorPos) {
	      var _this = this;
	      this._abortUpdateCursor();
	      this._changingCursorPos = cursorPos;
	      this._cursorChanging = setTimeout(function () {
	        if (!_this.el) return;
	        _this.cursorPos = _this._changingCursorPos;
	        _this._abortUpdateCursor();
	      }, 10);
	    }
	  }, {
	    key: "_fireChangeEvents",
	    value: function _fireChangeEvents() {
	      this._fireEvent('accept', this._inputEvent);
	      if (this.masked.isComplete) this._fireEvent('complete', this._inputEvent);
	    }
	  }, {
	    key: "_abortUpdateCursor",
	    value: function _abortUpdateCursor() {
	      if (this._cursorChanging) {
	        clearTimeout(this._cursorChanging);
	        delete this._cursorChanging;
	      }
	    }
	  }, {
	    key: "alignCursor",
	    value: function alignCursor() {
	      this.cursorPos = this.masked.nearestInputPos(this.cursorPos, DIRECTION.LEFT);
	    }
	  }, {
	    key: "alignCursorFriendly",
	    value: function alignCursorFriendly() {
	      if (this.selectionStart !== this.cursorPos) return;
	      this.alignCursor();
	    }
	  }, {
	    key: "on",
	    value: function on(ev, handler) {
	      if (!this._listeners[ev]) this._listeners[ev] = [];
	      this._listeners[ev].push(handler);
	      return this;
	    }
	  }, {
	    key: "off",
	    value: function off(ev, handler) {
	      if (!this._listeners[ev]) return this;
	      if (!handler) {
	        delete this._listeners[ev];
	        return this;
	      }
	      var hIndex = this._listeners[ev].indexOf(handler);
	      if (hIndex >= 0) this._listeners[ev].splice(hIndex, 1);
	      return this;
	    }
	  }, {
	    key: "_onInput",
	    value: function _onInput(e) {
	      this._inputEvent = e;
	      this._abortUpdateCursor();
	      if (!this._selection) return this.updateValue();
	      var details = new ActionDetails(
	      this.el.value, this.cursorPos,
	      this.value, this._selection);
	      var oldRawValue = this.masked.rawInputValue;
	      var offset = this.masked.splice(details.startChangePos, details.removed.length, details.inserted, details.removeDirection).offset;
	      var removeDirection = oldRawValue === this.masked.rawInputValue ? details.removeDirection : DIRECTION.NONE;
	      var cursorPos = this.masked.nearestInputPos(details.startChangePos + offset, removeDirection);
	      this.updateControl();
	      this.updateCursor(cursorPos);
	      delete this._inputEvent;
	    }
	  }, {
	    key: "_onChange",
	    value: function _onChange() {
	      if (this.value !== this.el.value) {
	        this.updateValue();
	      }
	      this.masked.doCommit();
	      this.updateControl();
	      this._saveSelection();
	    }
	  }, {
	    key: "_onDrop",
	    value: function _onDrop(ev) {
	      ev.preventDefault();
	      ev.stopPropagation();
	    }
	  }, {
	    key: "_onFocus",
	    value: function _onFocus(ev) {
	      this.alignCursorFriendly();
	    }
	  }, {
	    key: "_onClick",
	    value: function _onClick(ev) {
	      this.alignCursorFriendly();
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this._unbindEvents();
	      this._listeners.length = 0;
	      delete this.el;
	    }
	  }]);
	  return InputMask;
	}();
	IMask.InputMask = InputMask;

	var MaskedEnum = function (_MaskedPattern) {
	  _inherits(MaskedEnum, _MaskedPattern);
	  var _super = _createSuper(MaskedEnum);
	  function MaskedEnum() {
	    _classCallCheck(this, MaskedEnum);
	    return _super.apply(this, arguments);
	  }
	  _createClass(MaskedEnum, [{
	    key: "_update",
	    value:
	    function _update(opts) {
	      if (opts.enum) opts.mask = '*'.repeat(opts.enum[0].length);
	      _get(_getPrototypeOf(MaskedEnum.prototype), "_update", this).call(this, opts);
	    }
	  }, {
	    key: "doValidate",
	    value: function doValidate() {
	      var _this = this,
	          _get2;
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	      return this.enum.some(function (e) {
	        return e.indexOf(_this.unmaskedValue) >= 0;
	      }) && (_get2 = _get(_getPrototypeOf(MaskedEnum.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args));
	    }
	  }]);
	  return MaskedEnum;
	}(MaskedPattern);
	IMask.MaskedEnum = MaskedEnum;

	var MaskedNumber = function (_Masked) {
	  _inherits(MaskedNumber, _Masked);
	  var _super = _createSuper(MaskedNumber);
	  function MaskedNumber(opts) {
	    _classCallCheck(this, MaskedNumber);
	    return _super.call(this, Object.assign({}, MaskedNumber.DEFAULTS, opts));
	  }
	  _createClass(MaskedNumber, [{
	    key: "_update",
	    value: function _update(opts) {
	      _get(_getPrototypeOf(MaskedNumber.prototype), "_update", this).call(this, opts);
	      this._updateRegExps();
	    }
	  }, {
	    key: "_updateRegExps",
	    value: function _updateRegExps() {
	      var start = '^' + (this.allowNegative ? '[+|\\-]?' : '');
	      var midInput = '(0|([1-9]+\\d*))?';
	      var mid = '\\d*';
	      var end = (this.scale ? '(' + escapeRegExp(this.radix) + '\\d{0,' + this.scale + '})?' : '') + '$';
	      this._numberRegExpInput = new RegExp(start + midInput + end);
	      this._numberRegExp = new RegExp(start + mid + end);
	      this._mapToRadixRegExp = new RegExp('[' + this.mapToRadix.map(escapeRegExp).join('') + ']', 'g');
	      this._thousandsSeparatorRegExp = new RegExp(escapeRegExp(this.thousandsSeparator), 'g');
	    }
	  }, {
	    key: "_removeThousandsSeparators",
	    value: function _removeThousandsSeparators(value) {
	      return value.replace(this._thousandsSeparatorRegExp, '');
	    }
	  }, {
	    key: "_insertThousandsSeparators",
	    value: function _insertThousandsSeparators(value) {
	      var parts = value.split(this.radix);
	      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator);
	      return parts.join(this.radix);
	    }
	  }, {
	    key: "doPrepare",
	    value: function doPrepare(str) {
	      var _get2;
	      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }
	      return (_get2 = _get(_getPrototypeOf(MaskedNumber.prototype), "doPrepare", this)).call.apply(_get2, [this, this._removeThousandsSeparators(str.replace(this._mapToRadixRegExp, this.radix))].concat(args));
	    }
	  }, {
	    key: "_separatorsCount",
	    value: function _separatorsCount(to) {
	      var extendOnSeparators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	      var count = 0;
	      for (var pos = 0; pos < to; ++pos) {
	        if (this._value.indexOf(this.thousandsSeparator, pos) === pos) {
	          ++count;
	          if (extendOnSeparators) to += this.thousandsSeparator.length;
	        }
	      }
	      return count;
	    }
	  }, {
	    key: "_separatorsCountFromSlice",
	    value: function _separatorsCountFromSlice() {
	      var slice = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._value;
	      return this._separatorsCount(this._removeThousandsSeparators(slice).length, true);
	    }
	  }, {
	    key: "extractInput",
	    value: function extractInput() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      var flags = arguments.length > 2 ? arguments[2] : undefined;
	      var _this$_adjustRangeWit = this._adjustRangeWithSeparators(fromPos, toPos);
	      var _this$_adjustRangeWit2 = _slicedToArray(_this$_adjustRangeWit, 2);
	      fromPos = _this$_adjustRangeWit2[0];
	      toPos = _this$_adjustRangeWit2[1];
	      return this._removeThousandsSeparators(_get(_getPrototypeOf(MaskedNumber.prototype), "extractInput", this).call(this, fromPos, toPos, flags));
	    }
	  }, {
	    key: "_appendCharRaw",
	    value: function _appendCharRaw(ch) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      if (!this.thousandsSeparator) return _get(_getPrototypeOf(MaskedNumber.prototype), "_appendCharRaw", this).call(this, ch, flags);
	      var prevBeforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;
	      var prevBeforeTailSeparatorsCount = this._separatorsCountFromSlice(prevBeforeTailValue);
	      this._value = this._removeThousandsSeparators(this.value);
	      var appendDetails = _get(_getPrototypeOf(MaskedNumber.prototype), "_appendCharRaw", this).call(this, ch, flags);
	      this._value = this._insertThousandsSeparators(this._value);
	      var beforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;
	      var beforeTailSeparatorsCount = this._separatorsCountFromSlice(beforeTailValue);
	      appendDetails.tailShift += (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length;
	      appendDetails.skip = !appendDetails.rawInserted && ch === this.thousandsSeparator;
	      return appendDetails;
	    }
	  }, {
	    key: "_findSeparatorAround",
	    value: function _findSeparatorAround(pos) {
	      if (this.thousandsSeparator) {
	        var searchFrom = pos - this.thousandsSeparator.length + 1;
	        var separatorPos = this.value.indexOf(this.thousandsSeparator, searchFrom);
	        if (separatorPos <= pos) return separatorPos;
	      }
	      return -1;
	    }
	  }, {
	    key: "_adjustRangeWithSeparators",
	    value: function _adjustRangeWithSeparators(from, to) {
	      var separatorAroundFromPos = this._findSeparatorAround(from);
	      if (separatorAroundFromPos >= 0) from = separatorAroundFromPos;
	      var separatorAroundToPos = this._findSeparatorAround(to);
	      if (separatorAroundToPos >= 0) to = separatorAroundToPos + this.thousandsSeparator.length;
	      return [from, to];
	    }
	  }, {
	    key: "remove",
	    value: function remove() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      var _this$_adjustRangeWit3 = this._adjustRangeWithSeparators(fromPos, toPos);
	      var _this$_adjustRangeWit4 = _slicedToArray(_this$_adjustRangeWit3, 2);
	      fromPos = _this$_adjustRangeWit4[0];
	      toPos = _this$_adjustRangeWit4[1];
	      var valueBeforePos = this.value.slice(0, fromPos);
	      var valueAfterPos = this.value.slice(toPos);
	      var prevBeforeTailSeparatorsCount = this._separatorsCount(valueBeforePos.length);
	      this._value = this._insertThousandsSeparators(this._removeThousandsSeparators(valueBeforePos + valueAfterPos));
	      var beforeTailSeparatorsCount = this._separatorsCountFromSlice(valueBeforePos);
	      return new ChangeDetails({
	        tailShift: (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length
	      });
	    }
	  }, {
	    key: "nearestInputPos",
	    value: function nearestInputPos(cursorPos, direction) {
	      if (!this.thousandsSeparator) return cursorPos;
	      switch (direction) {
	        case DIRECTION.NONE:
	        case DIRECTION.LEFT:
	        case DIRECTION.FORCE_LEFT:
	          {
	            var separatorAtLeftPos = this._findSeparatorAround(cursorPos - 1);
	            if (separatorAtLeftPos >= 0) {
	              var separatorAtLeftEndPos = separatorAtLeftPos + this.thousandsSeparator.length;
	              if (cursorPos < separatorAtLeftEndPos || this.value.length <= separatorAtLeftEndPos || direction === DIRECTION.FORCE_LEFT) {
	                return separatorAtLeftPos;
	              }
	            }
	            break;
	          }
	        case DIRECTION.RIGHT:
	        case DIRECTION.FORCE_RIGHT:
	          {
	            var separatorAtRightPos = this._findSeparatorAround(cursorPos);
	            if (separatorAtRightPos >= 0) {
	              return separatorAtRightPos + this.thousandsSeparator.length;
	            }
	          }
	      }
	      return cursorPos;
	    }
	  }, {
	    key: "doValidate",
	    value: function doValidate(flags) {
	      var regexp = flags.input ? this._numberRegExpInput : this._numberRegExp;
	      var valid = regexp.test(this._removeThousandsSeparators(this.value));
	      if (valid) {
	        var number = this.number;
	        valid = valid && !isNaN(number) && (
	        this.min == null || this.min >= 0 || this.min <= this.number) && (
	        this.max == null || this.max <= 0 || this.number <= this.max);
	      }
	      return valid && _get(_getPrototypeOf(MaskedNumber.prototype), "doValidate", this).call(this, flags);
	    }
	  }, {
	    key: "doCommit",
	    value: function doCommit() {
	      if (this.value) {
	        var number = this.number;
	        var validnum = number;
	        if (this.min != null) validnum = Math.max(validnum, this.min);
	        if (this.max != null) validnum = Math.min(validnum, this.max);
	        if (validnum !== number) this.unmaskedValue = String(validnum);
	        var formatted = this.value;
	        if (this.normalizeZeros) formatted = this._normalizeZeros(formatted);
	        if (this.padFractionalZeros) formatted = this._padFractionalZeros(formatted);
	        this._value = formatted;
	      }
	      _get(_getPrototypeOf(MaskedNumber.prototype), "doCommit", this).call(this);
	    }
	  }, {
	    key: "_normalizeZeros",
	    value: function _normalizeZeros(value) {
	      var parts = this._removeThousandsSeparators(value).split(this.radix);
	      parts[0] = parts[0].replace(/^(\D*)(0*)(\d*)/, function (match, sign, zeros, num) {
	        return sign + num;
	      });
	      if (value.length && !/\d$/.test(parts[0])) parts[0] = parts[0] + '0';
	      if (parts.length > 1) {
	        parts[1] = parts[1].replace(/0*$/, '');
	        if (!parts[1].length) parts.length = 1;
	      }
	      return this._insertThousandsSeparators(parts.join(this.radix));
	    }
	  }, {
	    key: "_padFractionalZeros",
	    value: function _padFractionalZeros(value) {
	      if (!value) return value;
	      var parts = value.split(this.radix);
	      if (parts.length < 2) parts.push('');
	      parts[1] = parts[1].padEnd(this.scale, '0');
	      return parts.join(this.radix);
	    }
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this._removeThousandsSeparators(this._normalizeZeros(this.value)).replace(this.radix, '.');
	    },
	    set: function set(unmaskedValue) {
	      _set(_getPrototypeOf(MaskedNumber.prototype), "unmaskedValue", unmaskedValue.replace('.', this.radix), this, true);
	    }
	  }, {
	    key: "typedValue",
	    get: function get() {
	      return Number(this.unmaskedValue);
	    },
	    set: function set(n) {
	      _set(_getPrototypeOf(MaskedNumber.prototype), "unmaskedValue", String(n), this, true);
	    }
	  }, {
	    key: "number",
	    get: function get() {
	      return this.typedValue;
	    },
	    set: function set(number) {
	      this.typedValue = number;
	    }
	  }, {
	    key: "allowNegative",
	    get: function get() {
	      return this.signed || this.min != null && this.min < 0 || this.max != null && this.max < 0;
	    }
	  }]);
	  return MaskedNumber;
	}(Masked);
	MaskedNumber.DEFAULTS = {
	  radix: ',',
	  thousandsSeparator: '',
	  mapToRadix: ['.'],
	  scale: 2,
	  signed: false,
	  normalizeZeros: true,
	  padFractionalZeros: false
	};
	IMask.MaskedNumber = MaskedNumber;

	var MaskedFunction = function (_Masked) {
	  _inherits(MaskedFunction, _Masked);
	  var _super = _createSuper(MaskedFunction);
	  function MaskedFunction() {
	    _classCallCheck(this, MaskedFunction);
	    return _super.apply(this, arguments);
	  }
	  _createClass(MaskedFunction, [{
	    key: "_update",
	    value:
	    function _update(opts) {
	      if (opts.mask) opts.validate = opts.mask;
	      _get(_getPrototypeOf(MaskedFunction.prototype), "_update", this).call(this, opts);
	    }
	  }]);
	  return MaskedFunction;
	}(Masked);
	IMask.MaskedFunction = MaskedFunction;

	var MaskedDynamic = function (_Masked) {
	  _inherits(MaskedDynamic, _Masked);
	  var _super = _createSuper(MaskedDynamic);
	  function MaskedDynamic(opts) {
	    var _this;
	    _classCallCheck(this, MaskedDynamic);
	    _this = _super.call(this, Object.assign({}, MaskedDynamic.DEFAULTS, opts));
	    _this.currentMask = null;
	    return _this;
	  }
	  _createClass(MaskedDynamic, [{
	    key: "_update",
	    value: function _update(opts) {
	      _get(_getPrototypeOf(MaskedDynamic.prototype), "_update", this).call(this, opts);
	      if ('mask' in opts) {
	        this.compiledMasks = Array.isArray(opts.mask) ? opts.mask.map(function (m) {
	          return createMask(m);
	        }) : [];
	      }
	    }
	  }, {
	    key: "_appendCharRaw",
	    value: function _appendCharRaw(ch) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var details = this._applyDispatch(ch, flags);
	      if (this.currentMask) {
	        details.aggregate(this.currentMask._appendChar(ch, flags));
	      }
	      return details;
	    }
	  }, {
	    key: "_applyDispatch",
	    value: function _applyDispatch() {
	      var appended = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var prevValueBeforeTail = flags.tail && flags._beforeTailState != null ? flags._beforeTailState._value : this.value;
	      var inputValue = this.rawInputValue;
	      var insertValue = flags.tail && flags._beforeTailState != null ?
	      flags._beforeTailState._rawInputValue : inputValue;
	      var tailValue = inputValue.slice(insertValue.length);
	      var prevMask = this.currentMask;
	      var details = new ChangeDetails();
	      var prevMaskState = prevMask && prevMask.state;
	      this.currentMask = this.doDispatch(appended, Object.assign({}, flags));
	      if (this.currentMask) {
	        if (this.currentMask !== prevMask) {
	          this.currentMask.reset();
	          if (insertValue) {
	            var d = this.currentMask.append(insertValue, {
	              raw: true
	            });
	            details.tailShift = d.inserted.length - prevValueBeforeTail.length;
	          }
	          if (tailValue) {
	            details.tailShift += this.currentMask.append(tailValue, {
	              raw: true,
	              tail: true
	            }).tailShift;
	          }
	        } else {
	          this.currentMask.state = prevMaskState;
	        }
	      }
	      return details;
	    }
	  }, {
	    key: "_appendPlaceholder",
	    value: function _appendPlaceholder() {
	      var details = this._applyDispatch.apply(this, arguments);
	      if (this.currentMask) {
	        details.aggregate(this.currentMask._appendPlaceholder());
	      }
	      return details;
	    }
	  }, {
	    key: "doDispatch",
	    value: function doDispatch(appended) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      return this.dispatch(appended, this, flags);
	    }
	  }, {
	    key: "doValidate",
	    value: function doValidate() {
	      var _get2, _this$currentMask;
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	      return (_get2 = _get(_getPrototypeOf(MaskedDynamic.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args)) && (!this.currentMask || (_this$currentMask = this.currentMask).doValidate.apply(_this$currentMask, args));
	    }
	  }, {
	    key: "reset",
	    value: function reset() {
	      if (this.currentMask) this.currentMask.reset();
	      this.compiledMasks.forEach(function (m) {
	        return m.reset();
	      });
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      return this.currentMask ? this.currentMask.value : '';
	    },
	    set: function set(value) {
	      _set(_getPrototypeOf(MaskedDynamic.prototype), "value", value, this, true);
	    }
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this.currentMask ? this.currentMask.unmaskedValue : '';
	    },
	    set: function set(unmaskedValue) {
	      _set(_getPrototypeOf(MaskedDynamic.prototype), "unmaskedValue", unmaskedValue, this, true);
	    }
	  }, {
	    key: "typedValue",
	    get: function get() {
	      return this.currentMask ? this.currentMask.typedValue : '';
	    }
	    ,
	    set: function set(value) {
	      var unmaskedValue = String(value);
	      if (this.currentMask) {
	        this.currentMask.typedValue = value;
	        unmaskedValue = this.currentMask.unmaskedValue;
	      }
	      this.unmaskedValue = unmaskedValue;
	    }
	  }, {
	    key: "isComplete",
	    get: function get() {
	      return !!this.currentMask && this.currentMask.isComplete;
	    }
	  }, {
	    key: "remove",
	    value: function remove() {
	      var details = new ChangeDetails();
	      if (this.currentMask) {
	        var _this$currentMask2;
	        details.aggregate((_this$currentMask2 = this.currentMask).remove.apply(_this$currentMask2, arguments))
	        .aggregate(this._applyDispatch());
	      }
	      return details;
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return Object.assign({}, _get(_getPrototypeOf(MaskedDynamic.prototype), "state", this), {
	        _rawInputValue: this.rawInputValue,
	        compiledMasks: this.compiledMasks.map(function (m) {
	          return m.state;
	        }),
	        currentMaskRef: this.currentMask,
	        currentMask: this.currentMask && this.currentMask.state
	      });
	    },
	    set: function set(state) {
	      var compiledMasks = state.compiledMasks,
	          currentMaskRef = state.currentMaskRef,
	          currentMask = state.currentMask,
	          maskedState = _objectWithoutProperties(state, ["compiledMasks", "currentMaskRef", "currentMask"]);
	      this.compiledMasks.forEach(function (m, mi) {
	        return m.state = compiledMasks[mi];
	      });
	      if (currentMaskRef != null) {
	        this.currentMask = currentMaskRef;
	        this.currentMask.state = currentMask;
	      }
	      _set(_getPrototypeOf(MaskedDynamic.prototype), "state", maskedState, this, true);
	    }
	  }, {
	    key: "extractInput",
	    value: function extractInput() {
	      var _this$currentMask3;
	      return this.currentMask ? (_this$currentMask3 = this.currentMask).extractInput.apply(_this$currentMask3, arguments) : '';
	    }
	  }, {
	    key: "extractTail",
	    value: function extractTail() {
	      var _this$currentMask4, _get3;
	      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }
	      return this.currentMask ? (_this$currentMask4 = this.currentMask).extractTail.apply(_this$currentMask4, args) : (_get3 = _get(_getPrototypeOf(MaskedDynamic.prototype), "extractTail", this)).call.apply(_get3, [this].concat(args));
	    }
	  }, {
	    key: "doCommit",
	    value: function doCommit() {
	      if (this.currentMask) this.currentMask.doCommit();
	      _get(_getPrototypeOf(MaskedDynamic.prototype), "doCommit", this).call(this);
	    }
	  }, {
	    key: "nearestInputPos",
	    value: function nearestInputPos() {
	      var _this$currentMask5, _get4;
	      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }
	      return this.currentMask ? (_this$currentMask5 = this.currentMask).nearestInputPos.apply(_this$currentMask5, args) : (_get4 = _get(_getPrototypeOf(MaskedDynamic.prototype), "nearestInputPos", this)).call.apply(_get4, [this].concat(args));
	    }
	  }, {
	    key: "overwrite",
	    get: function get() {
	      return this.currentMask ? this.currentMask.overwrite : _get(_getPrototypeOf(MaskedDynamic.prototype), "overwrite", this);
	    },
	    set: function set(overwrite) {
	      console.warn('"overwrite" option is not available in dynamic mask, use this option in siblings');
	    }
	  }]);
	  return MaskedDynamic;
	}(Masked);
	MaskedDynamic.DEFAULTS = {
	  dispatch: function dispatch(appended, masked, flags) {
	    if (!masked.compiledMasks.length) return;
	    var inputValue = masked.rawInputValue;
	    var inputs = masked.compiledMasks.map(function (m, index) {
	      m.reset();
	      m.append(inputValue, {
	        raw: true
	      });
	      m.append(appended, flags);
	      var weight = m.rawInputValue.length;
	      return {
	        weight: weight,
	        index: index
	      };
	    });
	    inputs.sort(function (i1, i2) {
	      return i2.weight - i1.weight;
	    });
	    return masked.compiledMasks[inputs[0].index];
	  }
	};
	IMask.MaskedDynamic = MaskedDynamic;

	var PIPE_TYPE = {
	  MASKED: 'value',
	  UNMASKED: 'unmaskedValue',
	  TYPED: 'typedValue'
	};
	function createPipe(mask) {
	  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PIPE_TYPE.MASKED;
	  var to = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PIPE_TYPE.MASKED;
	  var masked = createMask(mask);
	  return function (value) {
	    return masked.runIsolated(function (m) {
	      m[from] = value;
	      return m[to];
	    });
	  };
	}
	function pipe(value) {
	  for (var _len = arguments.length, pipeArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    pipeArgs[_key - 1] = arguments[_key];
	  }
	  return createPipe.apply(void 0, pipeArgs)(value);
	}
	IMask.PIPE_TYPE = PIPE_TYPE;
	IMask.createPipe = createPipe;
	IMask.pipe = pipe;

	try {
	  globalThis.IMask = IMask;
	} catch (e) {}

	var maskElementList = [].slice.call(document.querySelectorAll('[data-mask]'));
	maskElementList.map(function (maskEl) {
	  return new IMask(maskEl, {
	    mask: maskEl.dataset.mask,
	    lazy: maskEl.dataset['mask-visible'] === 'true'
	  });
	});

	var top = 'top';
	var bottom = 'bottom';
	var right = 'right';
	var left = 'left';
	var auto = 'auto';
	var basePlacements = [top, bottom, right, left];
	var start = 'start';
	var end = 'end';
	var clippingParents = 'clippingParents';
	var viewport = 'viewport';
	var popper = 'popper';
	var reference = 'reference';
	var variationPlacements = basePlacements.reduce(function (acc, placement) {
	  return acc.concat([placement + "-" + start, placement + "-" + end]);
	}, []);
	var placements = [].concat(basePlacements, [auto]).reduce(function (acc, placement) {
	  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
	}, []);
	var beforeRead = 'beforeRead';
	var read = 'read';
	var afterRead = 'afterRead';
	var beforeMain = 'beforeMain';
	var main = 'main';
	var afterMain = 'afterMain';
	var beforeWrite = 'beforeWrite';
	var write = 'write';
	var afterWrite = 'afterWrite';
	var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

	function getNodeName(element) {
	  return element ? (element.nodeName || '').toLowerCase() : null;
	}

	function getWindow(node) {
	  if (node == null) {
	    return window;
	  }
	  if (node.toString() !== '[object Window]') {
	    var ownerDocument = node.ownerDocument;
	    return ownerDocument ? ownerDocument.defaultView || window : window;
	  }
	  return node;
	}

	function isElement$1(node) {
	  var OwnElement = getWindow(node).Element;
	  return node instanceof OwnElement || node instanceof Element;
	}
	function isHTMLElement(node) {
	  var OwnElement = getWindow(node).HTMLElement;
	  return node instanceof OwnElement || node instanceof HTMLElement;
	}
	function isShadowRoot(node) {
	  if (typeof ShadowRoot === 'undefined') {
	    return false;
	  }
	  var OwnElement = getWindow(node).ShadowRoot;
	  return node instanceof OwnElement || node instanceof ShadowRoot;
	}

	function applyStyles(_ref) {
	  var state = _ref.state;
	  Object.keys(state.elements).forEach(function (name) {
	    var style = state.styles[name] || {};
	    var attributes = state.attributes[name] || {};
	    var element = state.elements[name];
	    if (!isHTMLElement(element) || !getNodeName(element)) {
	      return;
	    }
	    Object.assign(element.style, style);
	    Object.keys(attributes).forEach(function (name) {
	      var value = attributes[name];
	      if (value === false) {
	        element.removeAttribute(name);
	      } else {
	        element.setAttribute(name, value === true ? '' : value);
	      }
	    });
	  });
	}
	function effect$2(_ref2) {
	  var state = _ref2.state;
	  var initialStyles = {
	    popper: {
	      position: state.options.strategy,
	      left: '0',
	      top: '0',
	      margin: '0'
	    },
	    arrow: {
	      position: 'absolute'
	    },
	    reference: {}
	  };
	  Object.assign(state.elements.popper.style, initialStyles.popper);
	  state.styles = initialStyles;
	  if (state.elements.arrow) {
	    Object.assign(state.elements.arrow.style, initialStyles.arrow);
	  }
	  return function () {
	    Object.keys(state.elements).forEach(function (name) {
	      var element = state.elements[name];
	      var attributes = state.attributes[name] || {};
	      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
	      var style = styleProperties.reduce(function (style, property) {
	        style[property] = '';
	        return style;
	      }, {});
	      if (!isHTMLElement(element) || !getNodeName(element)) {
	        return;
	      }
	      Object.assign(element.style, style);
	      Object.keys(attributes).forEach(function (attribute) {
	        element.removeAttribute(attribute);
	      });
	    });
	  };
	}
	var applyStyles$1 = {
	  name: 'applyStyles',
	  enabled: true,
	  phase: 'write',
	  fn: applyStyles,
	  effect: effect$2,
	  requires: ['computeStyles']
	};

	function getBasePlacement(placement) {
	  return placement.split('-')[0];
	}

	function getBoundingClientRect(element) {
	  var rect = element.getBoundingClientRect();
	  return {
	    width: rect.width,
	    height: rect.height,
	    top: rect.top,
	    right: rect.right,
	    bottom: rect.bottom,
	    left: rect.left,
	    x: rect.left,
	    y: rect.top
	  };
	}

	function getLayoutRect(element) {
	  var clientRect = getBoundingClientRect(element);
	  var width = element.offsetWidth;
	  var height = element.offsetHeight;
	  if (Math.abs(clientRect.width - width) <= 1) {
	    width = clientRect.width;
	  }
	  if (Math.abs(clientRect.height - height) <= 1) {
	    height = clientRect.height;
	  }
	  return {
	    x: element.offsetLeft,
	    y: element.offsetTop,
	    width: width,
	    height: height
	  };
	}

	function contains(parent, child) {
	  var rootNode = child.getRootNode && child.getRootNode();
	  if (parent.contains(child)) {
	    return true;
	  }
	  else if (rootNode && isShadowRoot(rootNode)) {
	      var next = child;
	      do {
	        if (next && parent.isSameNode(next)) {
	          return true;
	        }
	        next = next.parentNode || next.host;
	      } while (next);
	    }
	  return false;
	}

	function getComputedStyle$1(element) {
	  return getWindow(element).getComputedStyle(element);
	}

	function isTableElement(element) {
	  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
	}

	function getDocumentElement(element) {
	  return ((isElement$1(element) ? element.ownerDocument :
	  element.document) || window.document).documentElement;
	}

	function getParentNode(element) {
	  if (getNodeName(element) === 'html') {
	    return element;
	  }
	  return (
	    element.assignedSlot ||
	    element.parentNode || (
	    isShadowRoot(element) ? element.host : null) ||
	    getDocumentElement(element)
	  );
	}

	function getTrueOffsetParent(element) {
	  if (!isHTMLElement(element) ||
	  getComputedStyle$1(element).position === 'fixed') {
	    return null;
	  }
	  return element.offsetParent;
	}
	function getContainingBlock(element) {
	  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
	  var isIE = navigator.userAgent.indexOf('Trident') !== -1;
	  if (isIE && isHTMLElement(element)) {
	    var elementCss = getComputedStyle$1(element);
	    if (elementCss.position === 'fixed') {
	      return null;
	    }
	  }
	  var currentNode = getParentNode(element);
	  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
	    var css = getComputedStyle$1(currentNode);
	    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
	      return currentNode;
	    } else {
	      currentNode = currentNode.parentNode;
	    }
	  }
	  return null;
	}
	function getOffsetParent(element) {
	  var window = getWindow(element);
	  var offsetParent = getTrueOffsetParent(element);
	  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
	    offsetParent = getTrueOffsetParent(offsetParent);
	  }
	  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
	    return window;
	  }
	  return offsetParent || getContainingBlock(element) || window;
	}

	function getMainAxisFromPlacement(placement) {
	  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
	}

	var max = Math.max;
	var min = Math.min;
	var round = Math.round;

	function within(min$1, value, max$1) {
	  return max(min$1, min(value, max$1));
	}

	function getFreshSideObject() {
	  return {
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0
	  };
	}

	function mergePaddingObject(paddingObject) {
	  return Object.assign({}, getFreshSideObject(), paddingObject);
	}

	function expandToHashMap(value, keys) {
	  return keys.reduce(function (hashMap, key) {
	    hashMap[key] = value;
	    return hashMap;
	  }, {});
	}

	var toPaddingObject = function toPaddingObject(padding, state) {
	  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : padding;
	  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	};
	function arrow(_ref) {
	  var _state$modifiersData$;
	  var state = _ref.state,
	      name = _ref.name,
	      options = _ref.options;
	  var arrowElement = state.elements.arrow;
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var basePlacement = getBasePlacement(state.placement);
	  var axis = getMainAxisFromPlacement(basePlacement);
	  var isVertical = [left, right].indexOf(basePlacement) >= 0;
	  var len = isVertical ? 'height' : 'width';
	  if (!arrowElement || !popperOffsets) {
	    return;
	  }
	  var paddingObject = toPaddingObject(options.padding, state);
	  var arrowRect = getLayoutRect(arrowElement);
	  var minProp = axis === 'y' ? top : left;
	  var maxProp = axis === 'y' ? bottom : right;
	  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
	  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
	  var arrowOffsetParent = getOffsetParent(arrowElement);
	  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
	  var centerToReference = endDiff / 2 - startDiff / 2;
	  var min = paddingObject[minProp];
	  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
	  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
	  var offset = within(min, center, max);
	  var axisProp = axis;
	  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
	}
	function effect$1(_ref2) {
	  var state = _ref2.state,
	      options = _ref2.options;
	  var _options$element = options.element,
	      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;
	  if (arrowElement == null) {
	    return;
	  }
	  if (typeof arrowElement === 'string') {
	    arrowElement = state.elements.popper.querySelector(arrowElement);
	    if (!arrowElement) {
	      return;
	    }
	  }
	  if (!contains(state.elements.popper, arrowElement)) {
	    return;
	  }
	  state.elements.arrow = arrowElement;
	}
	var arrow$1 = {
	  name: 'arrow',
	  enabled: true,
	  phase: 'main',
	  fn: arrow,
	  effect: effect$1,
	  requires: ['popperOffsets'],
	  requiresIfExists: ['preventOverflow']
	};

	var unsetSides = {
	  top: 'auto',
	  right: 'auto',
	  bottom: 'auto',
	  left: 'auto'
	};
	function roundOffsetsByDPR(_ref) {
	  var x = _ref.x,
	      y = _ref.y;
	  var win = window;
	  var dpr = win.devicePixelRatio || 1;
	  return {
	    x: round(round(x * dpr) / dpr) || 0,
	    y: round(round(y * dpr) / dpr) || 0
	  };
	}
	function mapToStyles(_ref2) {
	  var _Object$assign2;
	  var popper = _ref2.popper,
	      popperRect = _ref2.popperRect,
	      placement = _ref2.placement,
	      offsets = _ref2.offsets,
	      position = _ref2.position,
	      gpuAcceleration = _ref2.gpuAcceleration,
	      adaptive = _ref2.adaptive,
	      roundOffsets = _ref2.roundOffsets;
	  var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === 'function' ? roundOffsets(offsets) : offsets,
	      _ref3$x = _ref3.x,
	      x = _ref3$x === void 0 ? 0 : _ref3$x,
	      _ref3$y = _ref3.y,
	      y = _ref3$y === void 0 ? 0 : _ref3$y;
	  var hasX = offsets.hasOwnProperty('x');
	  var hasY = offsets.hasOwnProperty('y');
	  var sideX = left;
	  var sideY = top;
	  var win = window;
	  if (adaptive) {
	    var offsetParent = getOffsetParent(popper);
	    var heightProp = 'clientHeight';
	    var widthProp = 'clientWidth';
	    if (offsetParent === getWindow(popper)) {
	      offsetParent = getDocumentElement(popper);
	      if (getComputedStyle$1(offsetParent).position !== 'static') {
	        heightProp = 'scrollHeight';
	        widthProp = 'scrollWidth';
	      }
	    }
	    offsetParent = offsetParent;
	    if (placement === top) {
	      sideY = bottom;
	      y -= offsetParent[heightProp] - popperRect.height;
	      y *= gpuAcceleration ? 1 : -1;
	    }
	    if (placement === left) {
	      sideX = right;
	      x -= offsetParent[widthProp] - popperRect.width;
	      x *= gpuAcceleration ? 1 : -1;
	    }
	  }
	  var commonStyles = Object.assign({
	    position: position
	  }, adaptive && unsetSides);
	  if (gpuAcceleration) {
	    var _Object$assign;
	    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
	  }
	  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
	}
	function computeStyles(_ref4) {
	  var state = _ref4.state,
	      options = _ref4.options;
	  var _options$gpuAccelerat = options.gpuAcceleration,
	      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
	      _options$adaptive = options.adaptive,
	      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
	      _options$roundOffsets = options.roundOffsets,
	      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
	  var commonStyles = {
	    placement: getBasePlacement(state.placement),
	    popper: state.elements.popper,
	    popperRect: state.rects.popper,
	    gpuAcceleration: gpuAcceleration
	  };
	  if (state.modifiersData.popperOffsets != null) {
	    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.popperOffsets,
	      position: state.options.strategy,
	      adaptive: adaptive,
	      roundOffsets: roundOffsets
	    })));
	  }
	  if (state.modifiersData.arrow != null) {
	    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.arrow,
	      position: 'absolute',
	      adaptive: false,
	      roundOffsets: roundOffsets
	    })));
	  }
	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-placement': state.placement
	  });
	}
	var computeStyles$1 = {
	  name: 'computeStyles',
	  enabled: true,
	  phase: 'beforeWrite',
	  fn: computeStyles,
	  data: {}
	};

	var passive = {
	  passive: true
	};
	function effect(_ref) {
	  var state = _ref.state,
	      instance = _ref.instance,
	      options = _ref.options;
	  var _options$scroll = options.scroll,
	      scroll = _options$scroll === void 0 ? true : _options$scroll,
	      _options$resize = options.resize,
	      resize = _options$resize === void 0 ? true : _options$resize;
	  var window = getWindow(state.elements.popper);
	  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
	  if (scroll) {
	    scrollParents.forEach(function (scrollParent) {
	      scrollParent.addEventListener('scroll', instance.update, passive);
	    });
	  }
	  if (resize) {
	    window.addEventListener('resize', instance.update, passive);
	  }
	  return function () {
	    if (scroll) {
	      scrollParents.forEach(function (scrollParent) {
	        scrollParent.removeEventListener('scroll', instance.update, passive);
	      });
	    }
	    if (resize) {
	      window.removeEventListener('resize', instance.update, passive);
	    }
	  };
	}
	var eventListeners = {
	  name: 'eventListeners',
	  enabled: true,
	  phase: 'write',
	  fn: function fn() {},
	  effect: effect,
	  data: {}
	};

	var hash$1 = {
	  left: 'right',
	  right: 'left',
	  bottom: 'top',
	  top: 'bottom'
	};
	function getOppositePlacement(placement) {
	  return placement.replace(/left|right|bottom|top/g, function (matched) {
	    return hash$1[matched];
	  });
	}

	var hash = {
	  start: 'end',
	  end: 'start'
	};
	function getOppositeVariationPlacement(placement) {
	  return placement.replace(/start|end/g, function (matched) {
	    return hash[matched];
	  });
	}

	function getWindowScroll(node) {
	  var win = getWindow(node);
	  var scrollLeft = win.pageXOffset;
	  var scrollTop = win.pageYOffset;
	  return {
	    scrollLeft: scrollLeft,
	    scrollTop: scrollTop
	  };
	}

	function getWindowScrollBarX(element) {
	  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
	}

	function getViewportRect(element) {
	  var win = getWindow(element);
	  var html = getDocumentElement(element);
	  var visualViewport = win.visualViewport;
	  var width = html.clientWidth;
	  var height = html.clientHeight;
	  var x = 0;
	  var y = 0;
	  if (visualViewport) {
	    width = visualViewport.width;
	    height = visualViewport.height;
	    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
	      x = visualViewport.offsetLeft;
	      y = visualViewport.offsetTop;
	    }
	  }
	  return {
	    width: width,
	    height: height,
	    x: x + getWindowScrollBarX(element),
	    y: y
	  };
	}

	function getDocumentRect(element) {
	  var _element$ownerDocumen;
	  var html = getDocumentElement(element);
	  var winScroll = getWindowScroll(element);
	  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
	  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
	  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
	  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
	  var y = -winScroll.scrollTop;
	  if (getComputedStyle$1(body || html).direction === 'rtl') {
	    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
	  }
	  return {
	    width: width,
	    height: height,
	    x: x,
	    y: y
	  };
	}

	function isScrollParent(element) {
	  var _getComputedStyle = getComputedStyle$1(element),
	      overflow = _getComputedStyle.overflow,
	      overflowX = _getComputedStyle.overflowX,
	      overflowY = _getComputedStyle.overflowY;
	  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
	}

	function getScrollParent(node) {
	  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
	    return node.ownerDocument.body;
	  }
	  if (isHTMLElement(node) && isScrollParent(node)) {
	    return node;
	  }
	  return getScrollParent(getParentNode(node));
	}

	function listScrollParents(element, list) {
	  var _element$ownerDocumen;
	  if (list === void 0) {
	    list = [];
	  }
	  var scrollParent = getScrollParent(element);
	  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
	  var win = getWindow(scrollParent);
	  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
	  var updatedList = list.concat(target);
	  return isBody ? updatedList :
	  updatedList.concat(listScrollParents(getParentNode(target)));
	}

	function rectToClientRect(rect) {
	  return Object.assign({}, rect, {
	    left: rect.x,
	    top: rect.y,
	    right: rect.x + rect.width,
	    bottom: rect.y + rect.height
	  });
	}

	function getInnerBoundingClientRect(element) {
	  var rect = getBoundingClientRect(element);
	  rect.top = rect.top + element.clientTop;
	  rect.left = rect.left + element.clientLeft;
	  rect.bottom = rect.top + element.clientHeight;
	  rect.right = rect.left + element.clientWidth;
	  rect.width = element.clientWidth;
	  rect.height = element.clientHeight;
	  rect.x = rect.left;
	  rect.y = rect.top;
	  return rect;
	}
	function getClientRectFromMixedType(element, clippingParent) {
	  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
	}
	function getClippingParents(element) {
	  var clippingParents = listScrollParents(getParentNode(element));
	  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
	  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
	  if (!isElement$1(clipperElement)) {
	    return [];
	  }
	  return clippingParents.filter(function (clippingParent) {
	    return isElement$1(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
	  });
	}
	function getClippingRect(element, boundary, rootBoundary) {
	  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
	  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
	  var firstClippingParent = clippingParents[0];
	  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
	    var rect = getClientRectFromMixedType(element, clippingParent);
	    accRect.top = max(rect.top, accRect.top);
	    accRect.right = min(rect.right, accRect.right);
	    accRect.bottom = min(rect.bottom, accRect.bottom);
	    accRect.left = max(rect.left, accRect.left);
	    return accRect;
	  }, getClientRectFromMixedType(element, firstClippingParent));
	  clippingRect.width = clippingRect.right - clippingRect.left;
	  clippingRect.height = clippingRect.bottom - clippingRect.top;
	  clippingRect.x = clippingRect.left;
	  clippingRect.y = clippingRect.top;
	  return clippingRect;
	}

	function getVariation(placement) {
	  return placement.split('-')[1];
	}

	function computeOffsets(_ref) {
	  var reference = _ref.reference,
	      element = _ref.element,
	      placement = _ref.placement;
	  var basePlacement = placement ? getBasePlacement(placement) : null;
	  var variation = placement ? getVariation(placement) : null;
	  var commonX = reference.x + reference.width / 2 - element.width / 2;
	  var commonY = reference.y + reference.height / 2 - element.height / 2;
	  var offsets;
	  switch (basePlacement) {
	    case top:
	      offsets = {
	        x: commonX,
	        y: reference.y - element.height
	      };
	      break;
	    case bottom:
	      offsets = {
	        x: commonX,
	        y: reference.y + reference.height
	      };
	      break;
	    case right:
	      offsets = {
	        x: reference.x + reference.width,
	        y: commonY
	      };
	      break;
	    case left:
	      offsets = {
	        x: reference.x - element.width,
	        y: commonY
	      };
	      break;
	    default:
	      offsets = {
	        x: reference.x,
	        y: reference.y
	      };
	  }
	  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
	  if (mainAxis != null) {
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    switch (variation) {
	      case start:
	        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
	        break;
	      case end:
	        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
	        break;
	    }
	  }
	  return offsets;
	}

	function detectOverflow(state, options) {
	  if (options === void 0) {
	    options = {};
	  }
	  var _options = options,
	      _options$placement = _options.placement,
	      placement = _options$placement === void 0 ? state.placement : _options$placement,
	      _options$boundary = _options.boundary,
	      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
	      _options$rootBoundary = _options.rootBoundary,
	      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
	      _options$elementConte = _options.elementContext,
	      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
	      _options$altBoundary = _options.altBoundary,
	      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
	      _options$padding = _options.padding,
	      padding = _options$padding === void 0 ? 0 : _options$padding;
	  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	  var altContext = elementContext === popper ? reference : popper;
	  var referenceElement = state.elements.reference;
	  var popperRect = state.rects.popper;
	  var element = state.elements[altBoundary ? altContext : elementContext];
	  var clippingClientRect = getClippingRect(isElement$1(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
	  var referenceClientRect = getBoundingClientRect(referenceElement);
	  var popperOffsets = computeOffsets({
	    reference: referenceClientRect,
	    element: popperRect,
	    strategy: 'absolute',
	    placement: placement
	  });
	  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
	  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
	  var overflowOffsets = {
	    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
	    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
	    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
	    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
	  };
	  var offsetData = state.modifiersData.offset;
	  if (elementContext === popper && offsetData) {
	    var offset = offsetData[placement];
	    Object.keys(overflowOffsets).forEach(function (key) {
	      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
	      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
	      overflowOffsets[key] += offset[axis] * multiply;
	    });
	  }
	  return overflowOffsets;
	}

	function computeAutoPlacement(state, options) {
	  if (options === void 0) {
	    options = {};
	  }
	  var _options = options,
	      placement = _options.placement,
	      boundary = _options.boundary,
	      rootBoundary = _options.rootBoundary,
	      padding = _options.padding,
	      flipVariations = _options.flipVariations,
	      _options$allowedAutoP = _options.allowedAutoPlacements,
	      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
	  var variation = getVariation(placement);
	  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
	    return getVariation(placement) === variation;
	  }) : basePlacements;
	  var allowedPlacements = placements$1.filter(function (placement) {
	    return allowedAutoPlacements.indexOf(placement) >= 0;
	  });
	  if (allowedPlacements.length === 0) {
	    allowedPlacements = placements$1;
	  }
	  var overflows = allowedPlacements.reduce(function (acc, placement) {
	    acc[placement] = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding
	    })[getBasePlacement(placement)];
	    return acc;
	  }, {});
	  return Object.keys(overflows).sort(function (a, b) {
	    return overflows[a] - overflows[b];
	  });
	}

	function getExpandedFallbackPlacements(placement) {
	  if (getBasePlacement(placement) === auto) {
	    return [];
	  }
	  var oppositePlacement = getOppositePlacement(placement);
	  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
	}
	function flip(_ref) {
	  var state = _ref.state,
	      options = _ref.options,
	      name = _ref.name;
	  if (state.modifiersData[name]._skip) {
	    return;
	  }
	  var _options$mainAxis = options.mainAxis,
	      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	      _options$altAxis = options.altAxis,
	      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
	      specifiedFallbackPlacements = options.fallbackPlacements,
	      padding = options.padding,
	      boundary = options.boundary,
	      rootBoundary = options.rootBoundary,
	      altBoundary = options.altBoundary,
	      _options$flipVariatio = options.flipVariations,
	      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
	      allowedAutoPlacements = options.allowedAutoPlacements;
	  var preferredPlacement = state.options.placement;
	  var basePlacement = getBasePlacement(preferredPlacement);
	  var isBasePlacement = basePlacement === preferredPlacement;
	  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
	  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
	    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding,
	      flipVariations: flipVariations,
	      allowedAutoPlacements: allowedAutoPlacements
	    }) : placement);
	  }, []);
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var checksMap = new Map();
	  var makeFallbackChecks = true;
	  var firstFittingPlacement = placements[0];
	  for (var i = 0; i < placements.length; i++) {
	    var placement = placements[i];
	    var _basePlacement = getBasePlacement(placement);
	    var isStartVariation = getVariation(placement) === start;
	    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
	    var len = isVertical ? 'width' : 'height';
	    var overflow = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      altBoundary: altBoundary,
	      padding: padding
	    });
	    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
	    if (referenceRect[len] > popperRect[len]) {
	      mainVariationSide = getOppositePlacement(mainVariationSide);
	    }
	    var altVariationSide = getOppositePlacement(mainVariationSide);
	    var checks = [];
	    if (checkMainAxis) {
	      checks.push(overflow[_basePlacement] <= 0);
	    }
	    if (checkAltAxis) {
	      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
	    }
	    if (checks.every(function (check) {
	      return check;
	    })) {
	      firstFittingPlacement = placement;
	      makeFallbackChecks = false;
	      break;
	    }
	    checksMap.set(placement, checks);
	  }
	  if (makeFallbackChecks) {
	    var numberOfChecks = flipVariations ? 3 : 1;
	    var _loop = function _loop(_i) {
	      var fittingPlacement = placements.find(function (placement) {
	        var checks = checksMap.get(placement);
	        if (checks) {
	          return checks.slice(0, _i).every(function (check) {
	            return check;
	          });
	        }
	      });
	      if (fittingPlacement) {
	        firstFittingPlacement = fittingPlacement;
	        return "break";
	      }
	    };
	    for (var _i = numberOfChecks; _i > 0; _i--) {
	      var _ret = _loop(_i);
	      if (_ret === "break") break;
	    }
	  }
	  if (state.placement !== firstFittingPlacement) {
	    state.modifiersData[name]._skip = true;
	    state.placement = firstFittingPlacement;
	    state.reset = true;
	  }
	}
	var flip$1 = {
	  name: 'flip',
	  enabled: true,
	  phase: 'main',
	  fn: flip,
	  requiresIfExists: ['offset'],
	  data: {
	    _skip: false
	  }
	};

	function getSideOffsets(overflow, rect, preventedOffsets) {
	  if (preventedOffsets === void 0) {
	    preventedOffsets = {
	      x: 0,
	      y: 0
	    };
	  }
	  return {
	    top: overflow.top - rect.height - preventedOffsets.y,
	    right: overflow.right - rect.width + preventedOffsets.x,
	    bottom: overflow.bottom - rect.height + preventedOffsets.y,
	    left: overflow.left - rect.width - preventedOffsets.x
	  };
	}
	function isAnySideFullyClipped(overflow) {
	  return [top, right, bottom, left].some(function (side) {
	    return overflow[side] >= 0;
	  });
	}
	function hide$1(_ref) {
	  var state = _ref.state,
	      name = _ref.name;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var preventedOffsets = state.modifiersData.preventOverflow;
	  var referenceOverflow = detectOverflow(state, {
	    elementContext: 'reference'
	  });
	  var popperAltOverflow = detectOverflow(state, {
	    altBoundary: true
	  });
	  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
	  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
	  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
	  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
	  state.modifiersData[name] = {
	    referenceClippingOffsets: referenceClippingOffsets,
	    popperEscapeOffsets: popperEscapeOffsets,
	    isReferenceHidden: isReferenceHidden,
	    hasPopperEscaped: hasPopperEscaped
	  };
	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-reference-hidden': isReferenceHidden,
	    'data-popper-escaped': hasPopperEscaped
	  });
	}
	var hide$2 = {
	  name: 'hide',
	  enabled: true,
	  phase: 'main',
	  requiresIfExists: ['preventOverflow'],
	  fn: hide$1
	};

	function distanceAndSkiddingToXY(placement, rects, offset) {
	  var basePlacement = getBasePlacement(placement);
	  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
	  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
	    placement: placement
	  })) : offset,
	      skidding = _ref[0],
	      distance = _ref[1];
	  skidding = skidding || 0;
	  distance = (distance || 0) * invertDistance;
	  return [left, right].indexOf(basePlacement) >= 0 ? {
	    x: distance,
	    y: skidding
	  } : {
	    x: skidding,
	    y: distance
	  };
	}
	function offset(_ref2) {
	  var state = _ref2.state,
	      options = _ref2.options,
	      name = _ref2.name;
	  var _options$offset = options.offset,
	      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
	  var data = placements.reduce(function (acc, placement) {
	    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
	    return acc;
	  }, {});
	  var _data$state$placement = data[state.placement],
	      x = _data$state$placement.x,
	      y = _data$state$placement.y;
	  if (state.modifiersData.popperOffsets != null) {
	    state.modifiersData.popperOffsets.x += x;
	    state.modifiersData.popperOffsets.y += y;
	  }
	  state.modifiersData[name] = data;
	}
	var offset$1 = {
	  name: 'offset',
	  enabled: true,
	  phase: 'main',
	  requires: ['popperOffsets'],
	  fn: offset
	};

	function popperOffsets(_ref) {
	  var state = _ref.state,
	      name = _ref.name;
	  state.modifiersData[name] = computeOffsets({
	    reference: state.rects.reference,
	    element: state.rects.popper,
	    strategy: 'absolute',
	    placement: state.placement
	  });
	}
	var popperOffsets$1 = {
	  name: 'popperOffsets',
	  enabled: true,
	  phase: 'read',
	  fn: popperOffsets,
	  data: {}
	};

	function getAltAxis(axis) {
	  return axis === 'x' ? 'y' : 'x';
	}

	function preventOverflow(_ref) {
	  var state = _ref.state,
	      options = _ref.options,
	      name = _ref.name;
	  var _options$mainAxis = options.mainAxis,
	      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	      _options$altAxis = options.altAxis,
	      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
	      boundary = options.boundary,
	      rootBoundary = options.rootBoundary,
	      altBoundary = options.altBoundary,
	      padding = options.padding,
	      _options$tether = options.tether,
	      tether = _options$tether === void 0 ? true : _options$tether,
	      _options$tetherOffset = options.tetherOffset,
	      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
	  var overflow = detectOverflow(state, {
	    boundary: boundary,
	    rootBoundary: rootBoundary,
	    padding: padding,
	    altBoundary: altBoundary
	  });
	  var basePlacement = getBasePlacement(state.placement);
	  var variation = getVariation(state.placement);
	  var isBasePlacement = !variation;
	  var mainAxis = getMainAxisFromPlacement(basePlacement);
	  var altAxis = getAltAxis(mainAxis);
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : tetherOffset;
	  var data = {
	    x: 0,
	    y: 0
	  };
	  if (!popperOffsets) {
	    return;
	  }
	  if (checkMainAxis || checkAltAxis) {
	    var mainSide = mainAxis === 'y' ? top : left;
	    var altSide = mainAxis === 'y' ? bottom : right;
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    var offset = popperOffsets[mainAxis];
	    var min$1 = popperOffsets[mainAxis] + overflow[mainSide];
	    var max$1 = popperOffsets[mainAxis] - overflow[altSide];
	    var additive = tether ? -popperRect[len] / 2 : 0;
	    var minLen = variation === start ? referenceRect[len] : popperRect[len];
	    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
	    var arrowElement = state.elements.arrow;
	    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
	      width: 0,
	      height: 0
	    };
	    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
	    var arrowPaddingMin = arrowPaddingObject[mainSide];
	    var arrowPaddingMax = arrowPaddingObject[altSide];
	    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
	    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
	    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
	    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
	    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
	    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
	    var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
	    var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;
	    if (checkMainAxis) {
	      var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
	      popperOffsets[mainAxis] = preventedOffset;
	      data[mainAxis] = preventedOffset - offset;
	    }
	    if (checkAltAxis) {
	      var _mainSide = mainAxis === 'x' ? top : left;
	      var _altSide = mainAxis === 'x' ? bottom : right;
	      var _offset = popperOffsets[altAxis];
	      var _min = _offset + overflow[_mainSide];
	      var _max = _offset - overflow[_altSide];
	      var _preventedOffset = within(tether ? min(_min, tetherMin) : _min, _offset, tether ? max(_max, tetherMax) : _max);
	      popperOffsets[altAxis] = _preventedOffset;
	      data[altAxis] = _preventedOffset - _offset;
	    }
	  }
	  state.modifiersData[name] = data;
	}
	var preventOverflow$1 = {
	  name: 'preventOverflow',
	  enabled: true,
	  phase: 'main',
	  fn: preventOverflow,
	  requiresIfExists: ['offset']
	};

	function getHTMLElementScroll(element) {
	  return {
	    scrollLeft: element.scrollLeft,
	    scrollTop: element.scrollTop
	  };
	}

	function getNodeScroll(node) {
	  if (node === getWindow(node) || !isHTMLElement(node)) {
	    return getWindowScroll(node);
	  } else {
	    return getHTMLElementScroll(node);
	  }
	}

	function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
	  if (isFixed === void 0) {
	    isFixed = false;
	  }
	  var documentElement = getDocumentElement(offsetParent);
	  var rect = getBoundingClientRect(elementOrVirtualElement);
	  var isOffsetParentAnElement = isHTMLElement(offsetParent);
	  var scroll = {
	    scrollLeft: 0,
	    scrollTop: 0
	  };
	  var offsets = {
	    x: 0,
	    y: 0
	  };
	  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
	    if (getNodeName(offsetParent) !== 'body' ||
	    isScrollParent(documentElement)) {
	      scroll = getNodeScroll(offsetParent);
	    }
	    if (isHTMLElement(offsetParent)) {
	      offsets = getBoundingClientRect(offsetParent);
	      offsets.x += offsetParent.clientLeft;
	      offsets.y += offsetParent.clientTop;
	    } else if (documentElement) {
	      offsets.x = getWindowScrollBarX(documentElement);
	    }
	  }
	  return {
	    x: rect.left + scroll.scrollLeft - offsets.x,
	    y: rect.top + scroll.scrollTop - offsets.y,
	    width: rect.width,
	    height: rect.height
	  };
	}

	function order(modifiers) {
	  var map = new Map();
	  var visited = new Set();
	  var result = [];
	  modifiers.forEach(function (modifier) {
	    map.set(modifier.name, modifier);
	  });
	  function sort(modifier) {
	    visited.add(modifier.name);
	    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
	    requires.forEach(function (dep) {
	      if (!visited.has(dep)) {
	        var depModifier = map.get(dep);
	        if (depModifier) {
	          sort(depModifier);
	        }
	      }
	    });
	    result.push(modifier);
	  }
	  modifiers.forEach(function (modifier) {
	    if (!visited.has(modifier.name)) {
	      sort(modifier);
	    }
	  });
	  return result;
	}
	function orderModifiers(modifiers) {
	  var orderedModifiers = order(modifiers);
	  return modifierPhases.reduce(function (acc, phase) {
	    return acc.concat(orderedModifiers.filter(function (modifier) {
	      return modifier.phase === phase;
	    }));
	  }, []);
	}

	function debounce(fn) {
	  var pending;
	  return function () {
	    if (!pending) {
	      pending = new Promise(function (resolve) {
	        Promise.resolve().then(function () {
	          pending = undefined;
	          resolve(fn());
	        });
	      });
	    }
	    return pending;
	  };
	}

	function mergeByName(modifiers) {
	  var merged = modifiers.reduce(function (merged, current) {
	    var existing = merged[current.name];
	    merged[current.name] = existing ? Object.assign({}, existing, current, {
	      options: Object.assign({}, existing.options, current.options),
	      data: Object.assign({}, existing.data, current.data)
	    }) : current;
	    return merged;
	  }, {});
	  return Object.keys(merged).map(function (key) {
	    return merged[key];
	  });
	}

	var DEFAULT_OPTIONS = {
	  placement: 'bottom',
	  modifiers: [],
	  strategy: 'absolute'
	};
	function areValidElements() {
	  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	  return !args.some(function (element) {
	    return !(element && typeof element.getBoundingClientRect === 'function');
	  });
	}
	function popperGenerator(generatorOptions) {
	  if (generatorOptions === void 0) {
	    generatorOptions = {};
	  }
	  var _generatorOptions = generatorOptions,
	      _generatorOptions$def = _generatorOptions.defaultModifiers,
	      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
	      _generatorOptions$def2 = _generatorOptions.defaultOptions,
	      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
	  return function createPopper(reference, popper, options) {
	    if (options === void 0) {
	      options = defaultOptions;
	    }
	    var state = {
	      placement: 'bottom',
	      orderedModifiers: [],
	      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
	      modifiersData: {},
	      elements: {
	        reference: reference,
	        popper: popper
	      },
	      attributes: {},
	      styles: {}
	    };
	    var effectCleanupFns = [];
	    var isDestroyed = false;
	    var instance = {
	      state: state,
	      setOptions: function setOptions(options) {
	        cleanupModifierEffects();
	        state.options = Object.assign({}, defaultOptions, state.options, options);
	        state.scrollParents = {
	          reference: isElement$1(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
	          popper: listScrollParents(popper)
	        };
	        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers)));
	        state.orderedModifiers = orderedModifiers.filter(function (m) {
	          return m.enabled;
	        });
	        runModifierEffects();
	        return instance.update();
	      },
	      forceUpdate: function forceUpdate() {
	        if (isDestroyed) {
	          return;
	        }
	        var _state$elements = state.elements,
	            reference = _state$elements.reference,
	            popper = _state$elements.popper;
	        if (!areValidElements(reference, popper)) {
	          return;
	        }
	        state.rects = {
	          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
	          popper: getLayoutRect(popper)
	        };
	        state.reset = false;
	        state.placement = state.options.placement;
	        state.orderedModifiers.forEach(function (modifier) {
	          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
	        });
	        for (var index = 0; index < state.orderedModifiers.length; index++) {
	          if (state.reset === true) {
	            state.reset = false;
	            index = -1;
	            continue;
	          }
	          var _state$orderedModifie = state.orderedModifiers[index],
	              fn = _state$orderedModifie.fn,
	              _state$orderedModifie2 = _state$orderedModifie.options,
	              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
	              name = _state$orderedModifie.name;
	          if (typeof fn === 'function') {
	            state = fn({
	              state: state,
	              options: _options,
	              name: name,
	              instance: instance
	            }) || state;
	          }
	        }
	      },
	      update: debounce(function () {
	        return new Promise(function (resolve) {
	          instance.forceUpdate();
	          resolve(state);
	        });
	      }),
	      destroy: function destroy() {
	        cleanupModifierEffects();
	        isDestroyed = true;
	      }
	    };
	    if (!areValidElements(reference, popper)) {
	      return instance;
	    }
	    instance.setOptions(options).then(function (state) {
	      if (!isDestroyed && options.onFirstUpdate) {
	        options.onFirstUpdate(state);
	      }
	    });
	    function runModifierEffects() {
	      state.orderedModifiers.forEach(function (_ref3) {
	        var name = _ref3.name,
	            _ref3$options = _ref3.options,
	            options = _ref3$options === void 0 ? {} : _ref3$options,
	            effect = _ref3.effect;
	        if (typeof effect === 'function') {
	          var cleanupFn = effect({
	            state: state,
	            name: name,
	            instance: instance,
	            options: options
	          });
	          var noopFn = function noopFn() {};
	          effectCleanupFns.push(cleanupFn || noopFn);
	        }
	      });
	    }
	    function cleanupModifierEffects() {
	      effectCleanupFns.forEach(function (fn) {
	        return fn();
	      });
	      effectCleanupFns = [];
	    }
	    return instance;
	  };
	}
	var createPopper$2 = popperGenerator();

	var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
	var createPopper$1 = popperGenerator({
	  defaultModifiers: defaultModifiers$1
	});

	var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$2];
	var createPopper = popperGenerator({
	  defaultModifiers: defaultModifiers
	});

	var Popper = /*#__PURE__*/Object.freeze({
		__proto__: null,
		popperGenerator: popperGenerator,
		detectOverflow: detectOverflow,
		createPopperBase: createPopper$2,
		createPopper: createPopper,
		createPopperLite: createPopper$1,
		top: top,
		bottom: bottom,
		right: right,
		left: left,
		auto: auto,
		basePlacements: basePlacements,
		start: start,
		end: end,
		clippingParents: clippingParents,
		viewport: viewport,
		popper: popper,
		reference: reference,
		variationPlacements: variationPlacements,
		placements: placements,
		beforeRead: beforeRead,
		read: read,
		afterRead: afterRead,
		beforeMain: beforeMain,
		main: main,
		afterMain: afterMain,
		beforeWrite: beforeWrite,
		write: write,
		afterWrite: afterWrite,
		modifierPhases: modifierPhases,
		applyStyles: applyStyles$1,
		arrow: arrow$1,
		computeStyles: computeStyles$1,
		eventListeners: eventListeners,
		flip: flip$1,
		hide: hide$2,
		offset: offset$1,
		popperOffsets: popperOffsets$1,
		preventOverflow: preventOverflow$1
	});

	/*!
	  * Bootstrap v5.0.0-beta3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */
	const MAX_UID = 1000000;
	const MILLISECONDS_MULTIPLIER = 1000;
	const TRANSITION_END = 'transitionend';
	const toType = obj => {
	  if (obj === null || obj === undefined) {
	    return `${obj}`;
	  }
	  return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
	};
	const getUID = prefix => {
	  do {
	    prefix += Math.floor(Math.random() * MAX_UID);
	  } while (document.getElementById(prefix));
	  return prefix;
	};
	const getSelector = element => {
	  let selector = element.getAttribute('data-bs-target');
	  if (!selector || selector === '#') {
	    let hrefAttr = element.getAttribute('href');
	    if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
	      return null;
	    }
	    if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
	      hrefAttr = '#' + hrefAttr.split('#')[1];
	    }
	    selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
	  }
	  return selector;
	};
	const getSelectorFromElement = element => {
	  const selector = getSelector(element);
	  if (selector) {
	    return document.querySelector(selector) ? selector : null;
	  }
	  return null;
	};
	const getElementFromSelector = element => {
	  const selector = getSelector(element);
	  return selector ? document.querySelector(selector) : null;
	};
	const getTransitionDurationFromElement = element => {
	  if (!element) {
	    return 0;
	  }
	  let {
	    transitionDuration,
	    transitionDelay
	  } = window.getComputedStyle(element);
	  const floatTransitionDuration = Number.parseFloat(transitionDuration);
	  const floatTransitionDelay = Number.parseFloat(transitionDelay);
	  if (!floatTransitionDuration && !floatTransitionDelay) {
	    return 0;
	  }
	  transitionDuration = transitionDuration.split(',')[0];
	  transitionDelay = transitionDelay.split(',')[0];
	  return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
	};
	const triggerTransitionEnd = element => {
	  element.dispatchEvent(new Event(TRANSITION_END));
	};
	const isElement = obj => (obj[0] || obj).nodeType;
	const emulateTransitionEnd = (element, duration) => {
	  let called = false;
	  const durationPadding = 5;
	  const emulatedDuration = duration + durationPadding;
	  function listener() {
	    called = true;
	    element.removeEventListener(TRANSITION_END, listener);
	  }
	  element.addEventListener(TRANSITION_END, listener);
	  setTimeout(() => {
	    if (!called) {
	      triggerTransitionEnd(element);
	    }
	  }, emulatedDuration);
	};
	const typeCheckConfig = (componentName, config, configTypes) => {
	  Object.keys(configTypes).forEach(property => {
	    const expectedTypes = configTypes[property];
	    const value = config[property];
	    const valueType = value && isElement(value) ? 'element' : toType(value);
	    if (!new RegExp(expectedTypes).test(valueType)) {
	      throw new TypeError(`${componentName.toUpperCase()}: ` + `Option "${property}" provided type "${valueType}" ` + `but expected type "${expectedTypes}".`);
	    }
	  });
	};
	const isVisible = element => {
	  if (!element) {
	    return false;
	  }
	  if (element.style && element.parentNode && element.parentNode.style) {
	    const elementStyle = getComputedStyle(element);
	    const parentNodeStyle = getComputedStyle(element.parentNode);
	    return elementStyle.display !== 'none' && parentNodeStyle.display !== 'none' && elementStyle.visibility !== 'hidden';
	  }
	  return false;
	};
	const isDisabled = element => {
	  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	    return true;
	  }
	  if (element.classList.contains('disabled')) {
	    return true;
	  }
	  if (typeof element.disabled !== 'undefined') {
	    return element.disabled;
	  }
	  return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
	};
	const findShadowRoot = element => {
	  if (!document.documentElement.attachShadow) {
	    return null;
	  }
	  if (typeof element.getRootNode === 'function') {
	    const root = element.getRootNode();
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
	const noop = () => function () {};
	const reflow = element => element.offsetHeight;
	const getjQuery = () => {
	  const {
	    jQuery
	  } = window;
	  if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	    return jQuery;
	  }
	  return null;
	};
	const onDOMContentLoaded = callback => {
	  if (document.readyState === 'loading') {
	    document.addEventListener('DOMContentLoaded', callback);
	  } else {
	    callback();
	  }
	};
	const isRTL = () => document.documentElement.dir === 'rtl';
	const defineJQueryPlugin = (name, plugin) => {
	  onDOMContentLoaded(() => {
	    const $ = getjQuery();
	    if ($) {
	      const JQUERY_NO_CONFLICT = $.fn[name];
	      $.fn[name] = plugin.jQueryInterface;
	      $.fn[name].Constructor = plugin;
	      $.fn[name].noConflict = () => {
	        $.fn[name] = JQUERY_NO_CONFLICT;
	        return plugin.jQueryInterface;
	      };
	    }
	  });
	};
	const elementMap = new Map();
	var Data = {
	  set(element, key, instance) {
	    if (!elementMap.has(element)) {
	      elementMap.set(element, new Map());
	    }
	    const instanceMap = elementMap.get(element);
	    if (!instanceMap.has(key) && instanceMap.size !== 0) {
	      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
	      return;
	    }
	    instanceMap.set(key, instance);
	  },
	  get(element, key) {
	    if (elementMap.has(element)) {
	      return elementMap.get(element).get(key) || null;
	    }
	    return null;
	  },
	  remove(element, key) {
	    if (!elementMap.has(element)) {
	      return;
	    }
	    const instanceMap = elementMap.get(element);
	    instanceMap.delete(key);
	    if (instanceMap.size === 0) {
	      elementMap.delete(element);
	    }
	  }
	};
	const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
	const stripNameRegex = /\..*/;
	const stripUidRegex = /::\d+$/;
	const eventRegistry = {};
	let uidEvent = 1;
	const customEvents = {
	  mouseenter: 'mouseover',
	  mouseleave: 'mouseout'
	};
	const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
	function getUidEvent(element, uid) {
	  return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
	}
	function getEvent(element) {
	  const uid = getUidEvent(element);
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
	    const domElements = element.querySelectorAll(selector);
	    for (let {
	      target
	    } = event; target && target !== this; target = target.parentNode) {
	      for (let i = domElements.length; i--;) {
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
	function findHandler(events, handler, delegationSelector = null) {
	  const uidEventList = Object.keys(events);
	  for (let i = 0, len = uidEventList.length; i < len; i++) {
	    const event = events[uidEventList[i]];
	    if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
	      return event;
	    }
	  }
	  return null;
	}
	function normalizeParams(originalTypeEvent, handler, delegationFn) {
	  const delegation = typeof handler === 'string';
	  const originalHandler = delegation ? delegationFn : handler;
	  let typeEvent = originalTypeEvent.replace(stripNameRegex, '');
	  const custom = customEvents[typeEvent];
	  if (custom) {
	    typeEvent = custom;
	  }
	  const isNative = nativeEvents.has(typeEvent);
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
	  const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
	  const events = getEvent(element);
	  const handlers = events[typeEvent] || (events[typeEvent] = {});
	  const previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);
	  if (previousFn) {
	    previousFn.oneOff = previousFn.oneOff && oneOff;
	    return;
	  }
	  const uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
	  const fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
	  fn.delegationSelector = delegation ? handler : null;
	  fn.originalHandler = originalHandler;
	  fn.oneOff = oneOff;
	  fn.uidEvent = uid;
	  handlers[uid] = fn;
	  element.addEventListener(typeEvent, fn, delegation);
	}
	function removeHandler(element, events, typeEvent, handler, delegationSelector) {
	  const fn = findHandler(events[typeEvent], handler, delegationSelector);
	  if (!fn) {
	    return;
	  }
	  element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
	  delete events[typeEvent][fn.uidEvent];
	}
	function removeNamespacedHandlers(element, events, typeEvent, namespace) {
	  const storeElementEvent = events[typeEvent] || {};
	  Object.keys(storeElementEvent).forEach(handlerKey => {
	    if (handlerKey.includes(namespace)) {
	      const event = storeElementEvent[handlerKey];
	      removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
	    }
	  });
	}
	const EventHandler = {
	  on(element, event, handler, delegationFn) {
	    addHandler(element, event, handler, delegationFn, false);
	  },
	  one(element, event, handler, delegationFn) {
	    addHandler(element, event, handler, delegationFn, true);
	  },
	  off(element, originalTypeEvent, handler, delegationFn) {
	    if (typeof originalTypeEvent !== 'string' || !element) {
	      return;
	    }
	    const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
	    const inNamespace = typeEvent !== originalTypeEvent;
	    const events = getEvent(element);
	    const isNamespace = originalTypeEvent.startsWith('.');
	    if (typeof originalHandler !== 'undefined') {
	      if (!events || !events[typeEvent]) {
	        return;
	      }
	      removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
	      return;
	    }
	    if (isNamespace) {
	      Object.keys(events).forEach(elementEvent => {
	        removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
	      });
	    }
	    const storeElementEvent = events[typeEvent] || {};
	    Object.keys(storeElementEvent).forEach(keyHandlers => {
	      const handlerKey = keyHandlers.replace(stripUidRegex, '');
	      if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
	        const event = storeElementEvent[keyHandlers];
	        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
	      }
	    });
	  },
	  trigger(element, event, args) {
	    if (typeof event !== 'string' || !element) {
	      return null;
	    }
	    const $ = getjQuery();
	    const typeEvent = event.replace(stripNameRegex, '');
	    const inNamespace = event !== typeEvent;
	    const isNative = nativeEvents.has(typeEvent);
	    let jQueryEvent;
	    let bubbles = true;
	    let nativeDispatch = true;
	    let defaultPrevented = false;
	    let evt = null;
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
	        bubbles,
	        cancelable: true
	      });
	    }
	    if (typeof args !== 'undefined') {
	      Object.keys(args).forEach(key => {
	        Object.defineProperty(evt, key, {
	          get() {
	            return args[key];
	          }
	        });
	      });
	    }
	    if (defaultPrevented) {
	      evt.preventDefault();
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
	const VERSION = '5.0.0-beta3';
	class BaseComponent {
	  constructor(element) {
	    element = typeof element === 'string' ? document.querySelector(element) : element;
	    if (!element) {
	      return;
	    }
	    this._element = element;
	    Data.set(this._element, this.constructor.DATA_KEY, this);
	  }
	  dispose() {
	    Data.remove(this._element, this.constructor.DATA_KEY);
	    this._element = null;
	  }
	  static getInstance(element) {
	    return Data.get(element, this.DATA_KEY);
	  }
	  static get VERSION() {
	    return VERSION;
	  }
	}
	const NAME$b = 'alert';
	const DATA_KEY$b = 'bs.alert';
	const EVENT_KEY$b = `.${DATA_KEY$b}`;
	const DATA_API_KEY$8 = '.data-api';
	const SELECTOR_DISMISS = '[data-bs-dismiss="alert"]';
	const EVENT_CLOSE = `close${EVENT_KEY$b}`;
	const EVENT_CLOSED = `closed${EVENT_KEY$b}`;
	const EVENT_CLICK_DATA_API$7 = `click${EVENT_KEY$b}${DATA_API_KEY$8}`;
	const CLASS_NAME_ALERT = 'alert';
	const CLASS_NAME_FADE$5 = 'fade';
	const CLASS_NAME_SHOW$8 = 'show';
	class Alert extends BaseComponent {
	  static get DATA_KEY() {
	    return DATA_KEY$b;
	  }
	  close(element) {
	    const rootElement = element ? this._getRootElement(element) : this._element;
	    const customEvent = this._triggerCloseEvent(rootElement);
	    if (customEvent === null || customEvent.defaultPrevented) {
	      return;
	    }
	    this._removeElement(rootElement);
	  }
	  _getRootElement(element) {
	    return getElementFromSelector(element) || element.closest(`.${CLASS_NAME_ALERT}`);
	  }
	  _triggerCloseEvent(element) {
	    return EventHandler.trigger(element, EVENT_CLOSE);
	  }
	  _removeElement(element) {
	    element.classList.remove(CLASS_NAME_SHOW$8);
	    if (!element.classList.contains(CLASS_NAME_FADE$5)) {
	      this._destroyElement(element);
	      return;
	    }
	    const transitionDuration = getTransitionDurationFromElement(element);
	    EventHandler.one(element, 'transitionend', () => this._destroyElement(element));
	    emulateTransitionEnd(element, transitionDuration);
	  }
	  _destroyElement(element) {
	    if (element.parentNode) {
	      element.parentNode.removeChild(element);
	    }
	    EventHandler.trigger(element, EVENT_CLOSED);
	  }
	  static jQueryInterface(config) {
	    return this.each(function () {
	      let data = Data.get(this, DATA_KEY$b);
	      if (!data) {
	        data = new Alert(this);
	      }
	      if (config === 'close') {
	        data[config](this);
	      }
	    });
	  }
	  static handleDismiss(alertInstance) {
	    return function (event) {
	      if (event) {
	        event.preventDefault();
	      }
	      alertInstance.close(this);
	    };
	  }
	}
	EventHandler.on(document, EVENT_CLICK_DATA_API$7, SELECTOR_DISMISS, Alert.handleDismiss(new Alert()));
	defineJQueryPlugin(NAME$b, Alert);
	const NAME$a = 'button';
	const DATA_KEY$a = 'bs.button';
	const EVENT_KEY$a = `.${DATA_KEY$a}`;
	const DATA_API_KEY$7 = '.data-api';
	const CLASS_NAME_ACTIVE$3 = 'active';
	const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
	const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$a}${DATA_API_KEY$7}`;
	class Button extends BaseComponent {
	  static get DATA_KEY() {
	    return DATA_KEY$a;
	  }
	  toggle() {
	    this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
	  }
	  static jQueryInterface(config) {
	    return this.each(function () {
	      let data = Data.get(this, DATA_KEY$a);
	      if (!data) {
	        data = new Button(this);
	      }
	      if (config === 'toggle') {
	        data[config]();
	      }
	    });
	  }
	}
	EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, event => {
	  event.preventDefault();
	  const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
	  let data = Data.get(button, DATA_KEY$a);
	  if (!data) {
	    data = new Button(button);
	  }
	  data.toggle();
	});
	defineJQueryPlugin(NAME$a, Button);
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
	  return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
	}
	const Manipulator = {
	  setDataAttribute(element, key, value) {
	    element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
	  },
	  removeDataAttribute(element, key) {
	    element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
	  },
	  getDataAttributes(element) {
	    if (!element) {
	      return {};
	    }
	    const attributes = {};
	    Object.keys(element.dataset).filter(key => key.startsWith('bs')).forEach(key => {
	      let pureKey = key.replace(/^bs/, '');
	      pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
	      attributes[pureKey] = normalizeData(element.dataset[key]);
	    });
	    return attributes;
	  },
	  getDataAttribute(element, key) {
	    return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
	  },
	  offset(element) {
	    const rect = element.getBoundingClientRect();
	    return {
	      top: rect.top + document.body.scrollTop,
	      left: rect.left + document.body.scrollLeft
	    };
	  },
	  position(element) {
	    return {
	      top: element.offsetTop,
	      left: element.offsetLeft
	    };
	  }
	};
	const NODE_TEXT = 3;
	const SelectorEngine = {
	  find(selector, element = document.documentElement) {
	    return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
	  },
	  findOne(selector, element = document.documentElement) {
	    return Element.prototype.querySelector.call(element, selector);
	  },
	  children(element, selector) {
	    return [].concat(...element.children).filter(child => child.matches(selector));
	  },
	  parents(element, selector) {
	    const parents = [];
	    let ancestor = element.parentNode;
	    while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
	      if (ancestor.matches(selector)) {
	        parents.push(ancestor);
	      }
	      ancestor = ancestor.parentNode;
	    }
	    return parents;
	  },
	  prev(element, selector) {
	    let previous = element.previousElementSibling;
	    while (previous) {
	      if (previous.matches(selector)) {
	        return [previous];
	      }
	      previous = previous.previousElementSibling;
	    }
	    return [];
	  },
	  next(element, selector) {
	    let next = element.nextElementSibling;
	    while (next) {
	      if (next.matches(selector)) {
	        return [next];
	      }
	      next = next.nextElementSibling;
	    }
	    return [];
	  }
	};
	const NAME$9 = 'carousel';
	const DATA_KEY$9 = 'bs.carousel';
	const EVENT_KEY$9 = `.${DATA_KEY$9}`;
	const DATA_API_KEY$6 = '.data-api';
	const ARROW_LEFT_KEY = 'ArrowLeft';
	const ARROW_RIGHT_KEY = 'ArrowRight';
	const TOUCHEVENT_COMPAT_WAIT = 500;
	const SWIPE_THRESHOLD = 40;
	const Default$8 = {
	  interval: 5000,
	  keyboard: true,
	  slide: false,
	  pause: 'hover',
	  wrap: true,
	  touch: true
	};
	const DefaultType$8 = {
	  interval: '(number|boolean)',
	  keyboard: 'boolean',
	  slide: '(boolean|string)',
	  pause: '(string|boolean)',
	  wrap: 'boolean',
	  touch: 'boolean'
	};
	const ORDER_NEXT = 'next';
	const ORDER_PREV = 'prev';
	const DIRECTION_LEFT = 'left';
	const DIRECTION_RIGHT = 'right';
	const EVENT_SLIDE = `slide${EVENT_KEY$9}`;
	const EVENT_SLID = `slid${EVENT_KEY$9}`;
	const EVENT_KEYDOWN = `keydown${EVENT_KEY$9}`;
	const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY$9}`;
	const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY$9}`;
	const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$9}`;
	const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$9}`;
	const EVENT_TOUCHEND = `touchend${EVENT_KEY$9}`;
	const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$9}`;
	const EVENT_POINTERUP = `pointerup${EVENT_KEY$9}`;
	const EVENT_DRAG_START = `dragstart${EVENT_KEY$9}`;
	const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$9}${DATA_API_KEY$6}`;
	const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$9}${DATA_API_KEY$6}`;
	const CLASS_NAME_CAROUSEL = 'carousel';
	const CLASS_NAME_ACTIVE$2 = 'active';
	const CLASS_NAME_SLIDE = 'slide';
	const CLASS_NAME_END = 'carousel-item-end';
	const CLASS_NAME_START = 'carousel-item-start';
	const CLASS_NAME_NEXT = 'carousel-item-next';
	const CLASS_NAME_PREV = 'carousel-item-prev';
	const CLASS_NAME_POINTER_EVENT = 'pointer-event';
	const SELECTOR_ACTIVE$1 = '.active';
	const SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
	const SELECTOR_ITEM = '.carousel-item';
	const SELECTOR_ITEM_IMG = '.carousel-item img';
	const SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
	const SELECTOR_INDICATORS = '.carousel-indicators';
	const SELECTOR_INDICATOR = '[data-bs-target]';
	const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
	const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
	const POINTER_TYPE_TOUCH = 'touch';
	const POINTER_TYPE_PEN = 'pen';
	class Carousel extends BaseComponent {
	  constructor(element, config) {
	    super(element);
	    this._items = null;
	    this._interval = null;
	    this._activeElement = null;
	    this._isPaused = false;
	    this._isSliding = false;
	    this.touchTimeout = null;
	    this.touchStartX = 0;
	    this.touchDeltaX = 0;
	    this._config = this._getConfig(config);
	    this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
	    this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
	    this._pointerEvent = Boolean(window.PointerEvent);
	    this._addEventListeners();
	  }
	  static get Default() {
	    return Default$8;
	  }
	  static get DATA_KEY() {
	    return DATA_KEY$9;
	  }
	  next() {
	    if (!this._isSliding) {
	      this._slide(ORDER_NEXT);
	    }
	  }
	  nextWhenVisible() {
	    if (!document.hidden && isVisible(this._element)) {
	      this.next();
	    }
	  }
	  prev() {
	    if (!this._isSliding) {
	      this._slide(ORDER_PREV);
	    }
	  }
	  pause(event) {
	    if (!event) {
	      this._isPaused = true;
	    }
	    if (SelectorEngine.findOne(SELECTOR_NEXT_PREV, this._element)) {
	      triggerTransitionEnd(this._element);
	      this.cycle(true);
	    }
	    clearInterval(this._interval);
	    this._interval = null;
	  }
	  cycle(event) {
	    if (!event) {
	      this._isPaused = false;
	    }
	    if (this._interval) {
	      clearInterval(this._interval);
	      this._interval = null;
	    }
	    if (this._config && this._config.interval && !this._isPaused) {
	      this._updateInterval();
	      this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
	    }
	  }
	  to(index) {
	    this._activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
	    const activeIndex = this._getItemIndex(this._activeElement);
	    if (index > this._items.length - 1 || index < 0) {
	      return;
	    }
	    if (this._isSliding) {
	      EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
	      return;
	    }
	    if (activeIndex === index) {
	      this.pause();
	      this.cycle();
	      return;
	    }
	    const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
	    this._slide(order, this._items[index]);
	  }
	  dispose() {
	    EventHandler.off(this._element, EVENT_KEY$9);
	    this._items = null;
	    this._config = null;
	    this._interval = null;
	    this._isPaused = null;
	    this._isSliding = null;
	    this._activeElement = null;
	    this._indicatorsElement = null;
	    super.dispose();
	  }
	  _getConfig(config) {
	    config = { ...Default$8,
	      ...config
	    };
	    typeCheckConfig(NAME$9, config, DefaultType$8);
	    return config;
	  }
	  _handleSwipe() {
	    const absDeltax = Math.abs(this.touchDeltaX);
	    if (absDeltax <= SWIPE_THRESHOLD) {
	      return;
	    }
	    const direction = absDeltax / this.touchDeltaX;
	    this.touchDeltaX = 0;
	    if (!direction) {
	      return;
	    }
	    this._slide(direction > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
	  }
	  _addEventListeners() {
	    if (this._config.keyboard) {
	      EventHandler.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
	    }
	    if (this._config.pause === 'hover') {
	      EventHandler.on(this._element, EVENT_MOUSEENTER, event => this.pause(event));
	      EventHandler.on(this._element, EVENT_MOUSELEAVE, event => this.cycle(event));
	    }
	    if (this._config.touch && this._touchSupported) {
	      this._addTouchEventListeners();
	    }
	  }
	  _addTouchEventListeners() {
	    const start = event => {
	      if (this._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH)) {
	        this.touchStartX = event.clientX;
	      } else if (!this._pointerEvent) {
	        this.touchStartX = event.touches[0].clientX;
	      }
	    };
	    const move = event => {
	      this.touchDeltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this.touchStartX;
	    };
	    const end = event => {
	      if (this._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH)) {
	        this.touchDeltaX = event.clientX - this.touchStartX;
	      }
	      this._handleSwipe();
	      if (this._config.pause === 'hover') {
	        this.pause();
	        if (this.touchTimeout) {
	          clearTimeout(this.touchTimeout);
	        }
	        this.touchTimeout = setTimeout(event => this.cycle(event), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
	      }
	    };
	    SelectorEngine.find(SELECTOR_ITEM_IMG, this._element).forEach(itemImg => {
	      EventHandler.on(itemImg, EVENT_DRAG_START, e => e.preventDefault());
	    });
	    if (this._pointerEvent) {
	      EventHandler.on(this._element, EVENT_POINTERDOWN, event => start(event));
	      EventHandler.on(this._element, EVENT_POINTERUP, event => end(event));
	      this._element.classList.add(CLASS_NAME_POINTER_EVENT);
	    } else {
	      EventHandler.on(this._element, EVENT_TOUCHSTART, event => start(event));
	      EventHandler.on(this._element, EVENT_TOUCHMOVE, event => move(event));
	      EventHandler.on(this._element, EVENT_TOUCHEND, event => end(event));
	    }
	  }
	  _keydown(event) {
	    if (/input|textarea/i.test(event.target.tagName)) {
	      return;
	    }
	    if (event.key === ARROW_LEFT_KEY) {
	      event.preventDefault();
	      this._slide(DIRECTION_LEFT);
	    } else if (event.key === ARROW_RIGHT_KEY) {
	      event.preventDefault();
	      this._slide(DIRECTION_RIGHT);
	    }
	  }
	  _getItemIndex(element) {
	    this._items = element && element.parentNode ? SelectorEngine.find(SELECTOR_ITEM, element.parentNode) : [];
	    return this._items.indexOf(element);
	  }
	  _getItemByOrder(order, activeElement) {
	    const isNext = order === ORDER_NEXT;
	    const isPrev = order === ORDER_PREV;
	    const activeIndex = this._getItemIndex(activeElement);
	    const lastItemIndex = this._items.length - 1;
	    const isGoingToWrap = isPrev && activeIndex === 0 || isNext && activeIndex === lastItemIndex;
	    if (isGoingToWrap && !this._config.wrap) {
	      return activeElement;
	    }
	    const delta = isPrev ? -1 : 1;
	    const itemIndex = (activeIndex + delta) % this._items.length;
	    return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
	  }
	  _triggerSlideEvent(relatedTarget, eventDirectionName) {
	    const targetIndex = this._getItemIndex(relatedTarget);
	    const fromIndex = this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element));
	    return EventHandler.trigger(this._element, EVENT_SLIDE, {
	      relatedTarget,
	      direction: eventDirectionName,
	      from: fromIndex,
	      to: targetIndex
	    });
	  }
	  _setActiveIndicatorElement(element) {
	    if (this._indicatorsElement) {
	      const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE$1, this._indicatorsElement);
	      activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
	      activeIndicator.removeAttribute('aria-current');
	      const indicators = SelectorEngine.find(SELECTOR_INDICATOR, this._indicatorsElement);
	      for (let i = 0; i < indicators.length; i++) {
	        if (Number.parseInt(indicators[i].getAttribute('data-bs-slide-to'), 10) === this._getItemIndex(element)) {
	          indicators[i].classList.add(CLASS_NAME_ACTIVE$2);
	          indicators[i].setAttribute('aria-current', 'true');
	          break;
	        }
	      }
	    }
	  }
	  _updateInterval() {
	    const element = this._activeElement || SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
	    if (!element) {
	      return;
	    }
	    const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
	    if (elementInterval) {
	      this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
	      this._config.interval = elementInterval;
	    } else {
	      this._config.interval = this._config.defaultInterval || this._config.interval;
	    }
	  }
	  _slide(directionOrOrder, element) {
	    const order = this._directionToOrder(directionOrOrder);
	    const activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
	    const activeElementIndex = this._getItemIndex(activeElement);
	    const nextElement = element || this._getItemByOrder(order, activeElement);
	    const nextElementIndex = this._getItemIndex(nextElement);
	    const isCycling = Boolean(this._interval);
	    const isNext = order === ORDER_NEXT;
	    const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
	    const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
	    const eventDirectionName = this._orderToDirection(order);
	    if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE$2)) {
	      this._isSliding = false;
	      return;
	    }
	    const slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
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
	    this._activeElement = nextElement;
	    if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
	      nextElement.classList.add(orderClassName);
	      reflow(nextElement);
	      activeElement.classList.add(directionalClassName);
	      nextElement.classList.add(directionalClassName);
	      const transitionDuration = getTransitionDurationFromElement(activeElement);
	      EventHandler.one(activeElement, 'transitionend', () => {
	        nextElement.classList.remove(directionalClassName, orderClassName);
	        nextElement.classList.add(CLASS_NAME_ACTIVE$2);
	        activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
	        this._isSliding = false;
	        setTimeout(() => {
	          EventHandler.trigger(this._element, EVENT_SLID, {
	            relatedTarget: nextElement,
	            direction: eventDirectionName,
	            from: activeElementIndex,
	            to: nextElementIndex
	          });
	        }, 0);
	      });
	      emulateTransitionEnd(activeElement, transitionDuration);
	    } else {
	      activeElement.classList.remove(CLASS_NAME_ACTIVE$2);
	      nextElement.classList.add(CLASS_NAME_ACTIVE$2);
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
	  _directionToOrder(direction) {
	    if (![DIRECTION_RIGHT, DIRECTION_LEFT].includes(direction)) {
	      return direction;
	    }
	    if (isRTL()) {
	      return direction === DIRECTION_RIGHT ? ORDER_PREV : ORDER_NEXT;
	    }
	    return direction === DIRECTION_RIGHT ? ORDER_NEXT : ORDER_PREV;
	  }
	  _orderToDirection(order) {
	    if (![ORDER_NEXT, ORDER_PREV].includes(order)) {
	      return order;
	    }
	    if (isRTL()) {
	      return order === ORDER_NEXT ? DIRECTION_LEFT : DIRECTION_RIGHT;
	    }
	    return order === ORDER_NEXT ? DIRECTION_RIGHT : DIRECTION_LEFT;
	  }
	  static carouselInterface(element, config) {
	    let data = Data.get(element, DATA_KEY$9);
	    let _config = { ...Default$8,
	      ...Manipulator.getDataAttributes(element)
	    };
	    if (typeof config === 'object') {
	      _config = { ..._config,
	        ...config
	      };
	    }
	    const action = typeof config === 'string' ? config : _config.slide;
	    if (!data) {
	      data = new Carousel(element, _config);
	    }
	    if (typeof config === 'number') {
	      data.to(config);
	    } else if (typeof action === 'string') {
	      if (typeof data[action] === 'undefined') {
	        throw new TypeError(`No method named "${action}"`);
	      }
	      data[action]();
	    } else if (_config.interval && _config.ride) {
	      data.pause();
	      data.cycle();
	    }
	  }
	  static jQueryInterface(config) {
	    return this.each(function () {
	      Carousel.carouselInterface(this, config);
	    });
	  }
	  static dataApiClickHandler(event) {
	    const target = getElementFromSelector(this);
	    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
	      return;
	    }
	    const config = { ...Manipulator.getDataAttributes(target),
	      ...Manipulator.getDataAttributes(this)
	    };
	    const slideIndex = this.getAttribute('data-bs-slide-to');
	    if (slideIndex) {
	      config.interval = false;
	    }
	    Carousel.carouselInterface(target, config);
	    if (slideIndex) {
	      Data.get(target, DATA_KEY$9).to(slideIndex);
	    }
	    event.preventDefault();
	  }
	}
	EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
	EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
	  const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
	  for (let i = 0, len = carousels.length; i < len; i++) {
	    Carousel.carouselInterface(carousels[i], Data.get(carousels[i], DATA_KEY$9));
	  }
	});
	defineJQueryPlugin(NAME$9, Carousel);
	const NAME$8 = 'collapse';
	const DATA_KEY$8 = 'bs.collapse';
	const EVENT_KEY$8 = `.${DATA_KEY$8}`;
	const DATA_API_KEY$5 = '.data-api';
	const Default$7 = {
	  toggle: true,
	  parent: ''
	};
	const DefaultType$7 = {
	  toggle: 'boolean',
	  parent: '(string|element)'
	};
	const EVENT_SHOW$5 = `show${EVENT_KEY$8}`;
	const EVENT_SHOWN$5 = `shown${EVENT_KEY$8}`;
	const EVENT_HIDE$5 = `hide${EVENT_KEY$8}`;
	const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$8}`;
	const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$8}${DATA_API_KEY$5}`;
	const CLASS_NAME_SHOW$7 = 'show';
	const CLASS_NAME_COLLAPSE = 'collapse';
	const CLASS_NAME_COLLAPSING = 'collapsing';
	const CLASS_NAME_COLLAPSED = 'collapsed';
	const WIDTH = 'width';
	const HEIGHT = 'height';
	const SELECTOR_ACTIVES = '.show, .collapsing';
	const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
	class Collapse extends BaseComponent {
	  constructor(element, config) {
	    super(element);
	    this._isTransitioning = false;
	    this._config = this._getConfig(config);
	    this._triggerArray = SelectorEngine.find(`${SELECTOR_DATA_TOGGLE$4}[href="#${this._element.id}"],` + `${SELECTOR_DATA_TOGGLE$4}[data-bs-target="#${this._element.id}"]`);
	    const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);
	    for (let i = 0, len = toggleList.length; i < len; i++) {
	      const elem = toggleList[i];
	      const selector = getSelectorFromElement(elem);
	      const filterElement = SelectorEngine.find(selector).filter(foundElem => foundElem === this._element);
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
	  }
	  static get Default() {
	    return Default$7;
	  }
	  static get DATA_KEY() {
	    return DATA_KEY$8;
	  }
	  toggle() {
	    if (this._element.classList.contains(CLASS_NAME_SHOW$7)) {
	      this.hide();
	    } else {
	      this.show();
	    }
	  }
	  show() {
	    if (this._isTransitioning || this._element.classList.contains(CLASS_NAME_SHOW$7)) {
	      return;
	    }
	    let actives;
	    let activesData;
	    if (this._parent) {
	      actives = SelectorEngine.find(SELECTOR_ACTIVES, this._parent).filter(elem => {
	        if (typeof this._config.parent === 'string') {
	          return elem.getAttribute('data-bs-parent') === this._config.parent;
	        }
	        return elem.classList.contains(CLASS_NAME_COLLAPSE);
	      });
	      if (actives.length === 0) {
	        actives = null;
	      }
	    }
	    const container = SelectorEngine.findOne(this._selector);
	    if (actives) {
	      const tempActiveData = actives.find(elem => container !== elem);
	      activesData = tempActiveData ? Data.get(tempActiveData, DATA_KEY$8) : null;
	      if (activesData && activesData._isTransitioning) {
	        return;
	      }
	    }
	    const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$5);
	    if (startEvent.defaultPrevented) {
	      return;
	    }
	    if (actives) {
	      actives.forEach(elemActive => {
	        if (container !== elemActive) {
	          Collapse.collapseInterface(elemActive, 'hide');
	        }
	        if (!activesData) {
	          Data.set(elemActive, DATA_KEY$8, null);
	        }
	      });
	    }
	    const dimension = this._getDimension();
	    this._element.classList.remove(CLASS_NAME_COLLAPSE);
	    this._element.classList.add(CLASS_NAME_COLLAPSING);
	    this._element.style[dimension] = 0;
	    if (this._triggerArray.length) {
	      this._triggerArray.forEach(element => {
	        element.classList.remove(CLASS_NAME_COLLAPSED);
	        element.setAttribute('aria-expanded', true);
	      });
	    }
	    this.setTransitioning(true);
	    const complete = () => {
	      this._element.classList.remove(CLASS_NAME_COLLAPSING);
	      this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
	      this._element.style[dimension] = '';
	      this.setTransitioning(false);
	      EventHandler.trigger(this._element, EVENT_SHOWN$5);
	    };
	    const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
	    const scrollSize = `scroll${capitalizedDimension}`;
	    const transitionDuration = getTransitionDurationFromElement(this._element);
	    EventHandler.one(this._element, 'transitionend', complete);
	    emulateTransitionEnd(this._element, transitionDuration);
	    this._element.style[dimension] = `${this._element[scrollSize]}px`;
	  }
	  hide() {
	    if (this._isTransitioning || !this._element.classList.contains(CLASS_NAME_SHOW$7)) {
	      return;
	    }
	    const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$5);
	    if (startEvent.defaultPrevented) {
	      return;
	    }
	    const dimension = this._getDimension();
	    this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
	    reflow(this._element);
	    this._element.classList.add(CLASS_NAME_COLLAPSING);
	    this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
	    const triggerArrayLength = this._triggerArray.length;
	    if (triggerArrayLength > 0) {
	      for (let i = 0; i < triggerArrayLength; i++) {
	        const trigger = this._triggerArray[i];
	        const elem = getElementFromSelector(trigger);
	        if (elem && !elem.classList.contains(CLASS_NAME_SHOW$7)) {
	          trigger.classList.add(CLASS_NAME_COLLAPSED);
	          trigger.setAttribute('aria-expanded', false);
	        }
	      }
	    }
	    this.setTransitioning(true);
	    const complete = () => {
	      this.setTransitioning(false);
	      this._element.classList.remove(CLASS_NAME_COLLAPSING);
	      this._element.classList.add(CLASS_NAME_COLLAPSE);
	      EventHandler.trigger(this._element, EVENT_HIDDEN$5);
	    };
	    this._element.style[dimension] = '';
	    const transitionDuration = getTransitionDurationFromElement(this._element);
	    EventHandler.one(this._element, 'transitionend', complete);
	    emulateTransitionEnd(this._element, transitionDuration);
	  }
	  setTransitioning(isTransitioning) {
	    this._isTransitioning = isTransitioning;
	  }
	  dispose() {
	    super.dispose();
	    this._config = null;
	    this._parent = null;
	    this._triggerArray = null;
	    this._isTransitioning = null;
	  }
	  _getConfig(config) {
	    config = { ...Default$7,
	      ...config
	    };
	    config.toggle = Boolean(config.toggle);
	    typeCheckConfig(NAME$8, config, DefaultType$7);
	    return config;
	  }
	  _getDimension() {
	    return this._element.classList.contains(WIDTH) ? WIDTH : HEIGHT;
	  }
	  _getParent() {
	    let {
	      parent
	    } = this._config;
	    if (isElement(parent)) {
	      if (typeof parent.jquery !== 'undefined' || typeof parent[0] !== 'undefined') {
	        parent = parent[0];
	      }
	    } else {
	      parent = SelectorEngine.findOne(parent);
	    }
	    const selector = `${SELECTOR_DATA_TOGGLE$4}[data-bs-parent="${parent}"]`;
	    SelectorEngine.find(selector, parent).forEach(element => {
	      const selected = getElementFromSelector(element);
	      this._addAriaAndCollapsedClass(selected, [element]);
	    });
	    return parent;
	  }
	  _addAriaAndCollapsedClass(element, triggerArray) {
	    if (!element || !triggerArray.length) {
	      return;
	    }
	    const isOpen = element.classList.contains(CLASS_NAME_SHOW$7);
	    triggerArray.forEach(elem => {
	      if (isOpen) {
	        elem.classList.remove(CLASS_NAME_COLLAPSED);
	      } else {
	        elem.classList.add(CLASS_NAME_COLLAPSED);
	      }
	      elem.setAttribute('aria-expanded', isOpen);
	    });
	  }
	  static collapseInterface(element, config) {
	    let data = Data.get(element, DATA_KEY$8);
	    const _config = { ...Default$7,
	      ...Manipulator.getDataAttributes(element),
	      ...(typeof config === 'object' && config ? config : {})
	    };
	    if (!data && _config.toggle && typeof config === 'string' && /show|hide/.test(config)) {
	      _config.toggle = false;
	    }
	    if (!data) {
	      data = new Collapse(element, _config);
	    }
	    if (typeof config === 'string') {
	      if (typeof data[config] === 'undefined') {
	        throw new TypeError(`No method named "${config}"`);
	      }
	      data[config]();
	    }
	  }
	  static jQueryInterface(config) {
	    return this.each(function () {
	      Collapse.collapseInterface(this, config);
	    });
	  }
	}
	EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
	  if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
	    event.preventDefault();
	  }
	  const triggerData = Manipulator.getDataAttributes(this);
	  const selector = getSelectorFromElement(this);
	  const selectorElements = SelectorEngine.find(selector);
	  selectorElements.forEach(element => {
	    const data = Data.get(element, DATA_KEY$8);
	    let config;
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
	defineJQueryPlugin(NAME$8, Collapse);
	const NAME$7 = 'dropdown';
	const DATA_KEY$7 = 'bs.dropdown';
	const EVENT_KEY$7 = `.${DATA_KEY$7}`;
	const DATA_API_KEY$4 = '.data-api';
	const ESCAPE_KEY$2 = 'Escape';
	const SPACE_KEY = 'Space';
	const TAB_KEY = 'Tab';
	const ARROW_UP_KEY = 'ArrowUp';
	const ARROW_DOWN_KEY = 'ArrowDown';
	const RIGHT_MOUSE_BUTTON = 2;
	const REGEXP_KEYDOWN = new RegExp(`${ARROW_UP_KEY}|${ARROW_DOWN_KEY}|${ESCAPE_KEY$2}`);
	const EVENT_HIDE$4 = `hide${EVENT_KEY$7}`;
	const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$7}`;
	const EVENT_SHOW$4 = `show${EVENT_KEY$7}`;
	const EVENT_SHOWN$4 = `shown${EVENT_KEY$7}`;
	const EVENT_CLICK = `click${EVENT_KEY$7}`;
	const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$7}${DATA_API_KEY$4}`;
	const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$7}${DATA_API_KEY$4}`;
	const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$7}${DATA_API_KEY$4}`;
	const CLASS_NAME_DISABLED = 'disabled';
	const CLASS_NAME_SHOW$6 = 'show';
	const CLASS_NAME_DROPUP = 'dropup';
	const CLASS_NAME_DROPEND = 'dropend';
	const CLASS_NAME_DROPSTART = 'dropstart';
	const CLASS_NAME_NAVBAR = 'navbar';
	const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]';
	const SELECTOR_MENU = '.dropdown-menu';
	const SELECTOR_NAVBAR_NAV = '.navbar-nav';
	const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
	const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
	const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
	const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
	const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
	const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
	const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
	const Default$6 = {
	  offset: [0, 2],
	  boundary: 'clippingParents',
	  reference: 'toggle',
	  display: 'dynamic',
	  popperConfig: null
	};
	const DefaultType$6 = {
	  offset: '(array|string|function)',
	  boundary: '(string|element)',
	  reference: '(string|element|object)',
	  display: 'string',
	  popperConfig: '(null|object|function)'
	};
	class Dropdown extends BaseComponent {
	  constructor(element, config) {
	    super(element);
	    this._popper = null;
	    this._config = this._getConfig(config);
	    this._menu = this._getMenuElement();
	    this._inNavbar = this._detectNavbar();
	    this._addEventListeners();
	  }
	  static get Default() {
	    return Default$6;
	  }
	  static get DefaultType() {
	    return DefaultType$6;
	  }
	  static get DATA_KEY() {
	    return DATA_KEY$7;
	  }
	  toggle() {
	    if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED)) {
	      return;
	    }
	    const isActive = this._element.classList.contains(CLASS_NAME_SHOW$6);
	    Dropdown.clearMenus();
	    if (isActive) {
	      return;
	    }
	    this.show();
	  }
	  show() {
	    if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED) || this._menu.classList.contains(CLASS_NAME_SHOW$6)) {
	      return;
	    }
	    const parent = Dropdown.getParentFromElement(this._element);
	    const relatedTarget = {
	      relatedTarget: this._element
	    };
	    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, relatedTarget);
	    if (showEvent.defaultPrevented) {
	      return;
	    }
	    if (this._inNavbar) {
	      Manipulator.setDataAttribute(this._menu, 'popper', 'none');
	    } else {
	      if (typeof Popper === 'undefined') {
	        throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
	      }
	      let referenceElement = this._element;
	      if (this._config.reference === 'parent') {
	        referenceElement = parent;
	      } else if (isElement(this._config.reference)) {
	        referenceElement = this._config.reference;
	        if (typeof this._config.reference.jquery !== 'undefined') {
	          referenceElement = this._config.reference[0];
	        }
	      } else if (typeof this._config.reference === 'object') {
	        referenceElement = this._config.reference;
	      }
	      const popperConfig = this._getPopperConfig();
	      const isDisplayStatic = popperConfig.modifiers.find(modifier => modifier.name === 'applyStyles' && modifier.enabled === false);
	      this._popper = createPopper(referenceElement, this._menu, popperConfig);
	      if (isDisplayStatic) {
	        Manipulator.setDataAttribute(this._menu, 'popper', 'static');
	      }
	    }
	    if ('ontouchstart' in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
	      [].concat(...document.body.children).forEach(elem => EventHandler.on(elem, 'mouseover', null, noop()));
	    }
	    this._element.focus();
	    this._element.setAttribute('aria-expanded', true);
	    this._menu.classList.toggle(CLASS_NAME_SHOW$6);
	    this._element.classList.toggle(CLASS_NAME_SHOW$6);
	    EventHandler.trigger(this._element, EVENT_SHOWN$4, relatedTarget);
	  }
	  hide() {
	    if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED) || !this._menu.classList.contains(CLASS_NAME_SHOW$6)) {
	      return;
	    }
	    const relatedTarget = {
	      relatedTarget: this._element
	    };
	    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4, relatedTarget);
	    if (hideEvent.defaultPrevented) {
	      return;
	    }
	    if (this._popper) {
	      this._popper.destroy();
	    }
	    this._menu.classList.toggle(CLASS_NAME_SHOW$6);
	    this._element.classList.toggle(CLASS_NAME_SHOW$6);
	    Manipulator.removeDataAttribute(this._menu, 'popper');
	    EventHandler.trigger(this._element, EVENT_HIDDEN$4, relatedTarget);
	  }
	  dispose() {
	    EventHandler.off(this._element, EVENT_KEY$7);
	    this._menu = null;
	    if (this._popper) {
	      this._popper.destroy();
	      this._popper = null;
	    }
	    super.dispose();
	  }
	  update() {
	    this._inNavbar = this._detectNavbar();
	    if (this._popper) {
	      this._popper.update();
	    }
	  }
	  _addEventListeners() {
	    EventHandler.on(this._element, EVENT_CLICK, event => {
	      event.preventDefault();
	      this.toggle();
	    });
	  }
	  _getConfig(config) {
	    config = { ...this.constructor.Default,
	      ...Manipulator.getDataAttributes(this._element),
	      ...config
	    };
	    typeCheckConfig(NAME$7, config, this.constructor.DefaultType);
	    if (typeof config.reference === 'object' && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
	      throw new TypeError(`${NAME$7.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
	    }
	    return config;
	  }
	  _getMenuElement() {
	    return SelectorEngine.next(this._element, SELECTOR_MENU)[0];
	  }
	  _getPlacement() {
	    const parentDropdown = this._element.parentNode;
	    if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
	      return PLACEMENT_RIGHT;
	    }
	    if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
	      return PLACEMENT_LEFT;
	    }
	    const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';
	    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
	      return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
	    }
	    return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
	  }
	  _detectNavbar() {
	    return this._element.closest(`.${CLASS_NAME_NAVBAR}`) !== null;
	  }
	  _getOffset() {
	    const {
	      offset
	    } = this._config;
	    if (typeof offset === 'string') {
	      return offset.split(',').map(val => Number.parseInt(val, 10));
	    }
	    if (typeof offset === 'function') {
	      return popperData => offset(popperData, this._element);
	    }
	    return offset;
	  }
	  _getPopperConfig() {
	    const defaultBsPopperConfig = {
	      placement: this._getPlacement(),
	      modifiers: [{
	        name: 'preventOverflow',
	        options: {
	          boundary: this._config.boundary
	        }
	      }, {
	        name: 'offset',
	        options: {
	          offset: this._getOffset()
	        }
	      }]
	    };
	    if (this._config.display === 'static') {
	      defaultBsPopperConfig.modifiers = [{
	        name: 'applyStyles',
	        enabled: false
	      }];
	    }
	    return { ...defaultBsPopperConfig,
	      ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
	    };
	  }
	  static dropdownInterface(element, config) {
	    let data = Data.get(element, DATA_KEY$7);
	    const _config = typeof config === 'object' ? config : null;
	    if (!data) {
	      data = new Dropdown(element, _config);
	    }
	    if (typeof config === 'string') {
	      if (typeof data[config] === 'undefined') {
	        throw new TypeError(`No method named "${config}"`);
	      }
	      data[config]();
	    }
	  }
	  static jQueryInterface(config) {
	    return this.each(function () {
	      Dropdown.dropdownInterface(this, config);
	    });
	  }
	  static clearMenus(event) {
	    if (event) {
	      if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY) {
	        return;
	      }
	      if (/input|select|textarea|form/i.test(event.target.tagName)) {
	        return;
	      }
	    }
	    const toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$3);
	    for (let i = 0, len = toggles.length; i < len; i++) {
	      const context = Data.get(toggles[i], DATA_KEY$7);
	      const relatedTarget = {
	        relatedTarget: toggles[i]
	      };
	      if (event && event.type === 'click') {
	        relatedTarget.clickEvent = event;
	      }
	      if (!context) {
	        continue;
	      }
	      const dropdownMenu = context._menu;
	      if (!toggles[i].classList.contains(CLASS_NAME_SHOW$6)) {
	        continue;
	      }
	      if (event) {
	        if ([context._element].some(element => event.composedPath().includes(element))) {
	          continue;
	        }
	        if (event.type === 'keyup' && event.key === TAB_KEY && dropdownMenu.contains(event.target)) {
	          continue;
	        }
	      }
	      const hideEvent = EventHandler.trigger(toggles[i], EVENT_HIDE$4, relatedTarget);
	      if (hideEvent.defaultPrevented) {
	        continue;
	      }
	      if ('ontouchstart' in document.documentElement) {
	        [].concat(...document.body.children).forEach(elem => EventHandler.off(elem, 'mouseover', null, noop()));
	      }
	      toggles[i].setAttribute('aria-expanded', 'false');
	      if (context._popper) {
	        context._popper.destroy();
	      }
	      dropdownMenu.classList.remove(CLASS_NAME_SHOW$6);
	      toggles[i].classList.remove(CLASS_NAME_SHOW$6);
	      Manipulator.removeDataAttribute(dropdownMenu, 'popper');
	      EventHandler.trigger(toggles[i], EVENT_HIDDEN$4, relatedTarget);
	    }
	  }
	  static getParentFromElement(element) {
	    return getElementFromSelector(element) || element.parentNode;
	  }
	  static dataApiKeydownHandler(event) {
	    if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY$2 && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
	      return;
	    }
	    event.preventDefault();
	    event.stopPropagation();
	    if (this.disabled || this.classList.contains(CLASS_NAME_DISABLED)) {
	      return;
	    }
	    const parent = Dropdown.getParentFromElement(this);
	    const isActive = this.classList.contains(CLASS_NAME_SHOW$6);
	    if (event.key === ESCAPE_KEY$2) {
	      const button = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0];
	      button.focus();
	      Dropdown.clearMenus();
	      return;
	    }
	    if (!isActive && (event.key === ARROW_UP_KEY || event.key === ARROW_DOWN_KEY)) {
	      const button = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0];
	      button.click();
	      return;
	    }
	    if (!isActive || event.key === SPACE_KEY) {
	      Dropdown.clearMenus();
	      return;
	    }
	    const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, parent).filter(isVisible);
	    if (!items.length) {
	      return;
	    }
	    let index = items.indexOf(event.target);
	    if (event.key === ARROW_UP_KEY && index > 0) {
	      index--;
	    }
	    if (event.key === ARROW_DOWN_KEY && index < items.length - 1) {
	      index++;
	    }
	    index = index === -1 ? 0 : index;
	    items[index].focus();
	  }
	}
	EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
	EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
	EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
	EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
	EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
	  event.preventDefault();
	  Dropdown.dropdownInterface(this);
	});
	defineJQueryPlugin(NAME$7, Dropdown);
	const NAME$6 = 'modal';
	const DATA_KEY$6 = 'bs.modal';
	const EVENT_KEY$6 = `.${DATA_KEY$6}`;
	const DATA_API_KEY$3 = '.data-api';
	const ESCAPE_KEY$1 = 'Escape';
	const Default$5 = {
	  backdrop: true,
	  keyboard: true,
	  focus: true
	};
	const DefaultType$5 = {
	  backdrop: '(boolean|string)',
	  keyboard: 'boolean',
	  focus: 'boolean'
	};
	const EVENT_HIDE$3 = `hide${EVENT_KEY$6}`;
	const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$6}`;
	const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$6}`;
	const EVENT_SHOW$3 = `show${EVENT_KEY$6}`;
	const EVENT_SHOWN$3 = `shown${EVENT_KEY$6}`;
	const EVENT_FOCUSIN$1 = `focusin${EVENT_KEY$6}`;
	const EVENT_RESIZE = `resize${EVENT_KEY$6}`;
	const EVENT_CLICK_DISMISS$2 = `click.dismiss${EVENT_KEY$6}`;
	const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$6}`;
	const EVENT_MOUSEUP_DISMISS = `mouseup.dismiss${EVENT_KEY$6}`;
	const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$6}`;
	const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
	const CLASS_NAME_SCROLLBAR_MEASURER = 'modal-scrollbar-measure';
	const CLASS_NAME_BACKDROP = 'modal-backdrop';
	const CLASS_NAME_OPEN = 'modal-open';
	const CLASS_NAME_FADE$4 = 'fade';
	const CLASS_NAME_SHOW$5 = 'show';
	const CLASS_NAME_STATIC = 'modal-static';
	const SELECTOR_DIALOG = '.modal-dialog';
	const SELECTOR_MODAL_BODY = '.modal-body';
	const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
	const SELECTOR_DATA_DISMISS$2 = '[data-bs-dismiss="modal"]';
	const SELECTOR_FIXED_CONTENT$1 = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
	const SELECTOR_STICKY_CONTENT$1 = '.sticky-top';
	class Modal extends BaseComponent {
	  constructor(element, config) {
	    super(element);
	    this._config = this._getConfig(config);
	    this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
	    this._backdrop = null;
	    this._isShown = false;
	    this._isBodyOverflowing = false;
	    this._ignoreBackdropClick = false;
	    this._isTransitioning = false;
	    this._scrollbarWidth = 0;
	  }
	  static get Default() {
	    return Default$5;
	  }
	  static get DATA_KEY() {
	    return DATA_KEY$6;
	  }
	  toggle(relatedTarget) {
	    return this._isShown ? this.hide() : this.show(relatedTarget);
	  }
	  show(relatedTarget) {
	    if (this._isShown || this._isTransitioning) {
	      return;
	    }
	    if (this._isAnimated()) {
	      this._isTransitioning = true;
	    }
	    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
	      relatedTarget
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
	    EventHandler.on(this._element, EVENT_CLICK_DISMISS$2, SELECTOR_DATA_DISMISS$2, event => this.hide(event));
	    EventHandler.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, () => {
	      EventHandler.one(this._element, EVENT_MOUSEUP_DISMISS, event => {
	        if (event.target === this._element) {
	          this._ignoreBackdropClick = true;
	        }
	      });
	    });
	    this._showBackdrop(() => this._showElement(relatedTarget));
	  }
	  hide(event) {
	    if (event) {
	      event.preventDefault();
	    }
	    if (!this._isShown || this._isTransitioning) {
	      return;
	    }
	    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);
	    if (hideEvent.defaultPrevented) {
	      return;
	    }
	    this._isShown = false;
	    const isAnimated = this._isAnimated();
	    if (isAnimated) {
	      this._isTransitioning = true;
	    }
	    this._setEscapeEvent();
	    this._setResizeEvent();
	    EventHandler.off(document, EVENT_FOCUSIN$1);
	    this._element.classList.remove(CLASS_NAME_SHOW$5);
	    EventHandler.off(this._element, EVENT_CLICK_DISMISS$2);
	    EventHandler.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);
	    if (isAnimated) {
	      const transitionDuration = getTransitionDurationFromElement(this._element);
	      EventHandler.one(this._element, 'transitionend', event => this._hideModal(event));
	      emulateTransitionEnd(this._element, transitionDuration);
	    } else {
	      this._hideModal();
	    }
	  }
	  dispose() {
	    [window, this._element, this._dialog].forEach(htmlElement => EventHandler.off(htmlElement, EVENT_KEY$6));
	    super.dispose();
	    EventHandler.off(document, EVENT_FOCUSIN$1);
	    this._config = null;
	    this._dialog = null;
	    this._backdrop = null;
	    this._isShown = null;
	    this._isBodyOverflowing = null;
	    this._ignoreBackdropClick = null;
	    this._isTransitioning = null;
	    this._scrollbarWidth = null;
	  }
	  handleUpdate() {
	    this._adjustDialog();
	  }
	  _getConfig(config) {
	    config = { ...Default$5,
	      ...config
	    };
	    typeCheckConfig(NAME$6, config, DefaultType$5);
	    return config;
	  }
	  _showElement(relatedTarget) {
	    const isAnimated = this._isAnimated();
	    const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
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
	    if (isAnimated) {
	      reflow(this._element);
	    }
	    this._element.classList.add(CLASS_NAME_SHOW$5);
	    if (this._config.focus) {
	      this._enforceFocus();
	    }
	    const transitionComplete = () => {
	      if (this._config.focus) {
	        this._element.focus();
	      }
	      this._isTransitioning = false;
	      EventHandler.trigger(this._element, EVENT_SHOWN$3, {
	        relatedTarget
	      });
	    };
	    if (isAnimated) {
	      const transitionDuration = getTransitionDurationFromElement(this._dialog);
	      EventHandler.one(this._dialog, 'transitionend', transitionComplete);
	      emulateTransitionEnd(this._dialog, transitionDuration);
	    } else {
	      transitionComplete();
	    }
	  }
	  _enforceFocus() {
	    EventHandler.off(document, EVENT_FOCUSIN$1);
	    EventHandler.on(document, EVENT_FOCUSIN$1, event => {
	      if (document !== event.target && this._element !== event.target && !this._element.contains(event.target)) {
	        this._element.focus();
	      }
	    });
	  }
	  _setEscapeEvent() {
	    if (this._isShown) {
	      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
	        if (this._config.keyboard && event.key === ESCAPE_KEY$1) {
	          event.preventDefault();
	          this.hide();
	        } else if (!this._config.keyboard && event.key === ESCAPE_KEY$1) {
	          this._triggerBackdropTransition();
	        }
	      });
	    } else {
	      EventHandler.off(this._element, EVENT_KEYDOWN_DISMISS);
	    }
	  }
	  _setResizeEvent() {
	    if (this._isShown) {
	      EventHandler.on(window, EVENT_RESIZE, () => this._adjustDialog());
	    } else {
	      EventHandler.off(window, EVENT_RESIZE);
	    }
	  }
	  _hideModal() {
	    this._element.style.display = 'none';
	    this._element.setAttribute('aria-hidden', true);
	    this._element.removeAttribute('aria-modal');
	    this._element.removeAttribute('role');
	    this._isTransitioning = false;
	    this._showBackdrop(() => {
	      document.body.classList.remove(CLASS_NAME_OPEN);
	      this._resetAdjustments();
	      this._resetScrollbar();
	      EventHandler.trigger(this._element, EVENT_HIDDEN$3);
	    });
	  }
	  _removeBackdrop() {
	    this._backdrop.parentNode.removeChild(this._backdrop);
	    this._backdrop = null;
	  }
	  _showBackdrop(callback) {
	    const isAnimated = this._isAnimated();
	    if (this._isShown && this._config.backdrop) {
	      this._backdrop = document.createElement('div');
	      this._backdrop.className = CLASS_NAME_BACKDROP;
	      if (isAnimated) {
	        this._backdrop.classList.add(CLASS_NAME_FADE$4);
	      }
	      document.body.appendChild(this._backdrop);
	      EventHandler.on(this._element, EVENT_CLICK_DISMISS$2, event => {
	        if (this._ignoreBackdropClick) {
	          this._ignoreBackdropClick = false;
	          return;
	        }
	        if (event.target !== event.currentTarget) {
	          return;
	        }
	        if (this._config.backdrop === 'static') {
	          this._triggerBackdropTransition();
	        } else {
	          this.hide();
	        }
	      });
	      if (isAnimated) {
	        reflow(this._backdrop);
	      }
	      this._backdrop.classList.add(CLASS_NAME_SHOW$5);
	      if (!isAnimated) {
	        callback();
	        return;
	      }
	      const backdropTransitionDuration = getTransitionDurationFromElement(this._backdrop);
	      EventHandler.one(this._backdrop, 'transitionend', callback);
	      emulateTransitionEnd(this._backdrop, backdropTransitionDuration);
	    } else if (!this._isShown && this._backdrop) {
	      this._backdrop.classList.remove(CLASS_NAME_SHOW$5);
	      const callbackRemove = () => {
	        this._removeBackdrop();
	        callback();
	      };
	      if (isAnimated) {
	        const backdropTransitionDuration = getTransitionDurationFromElement(this._backdrop);
	        EventHandler.one(this._backdrop, 'transitionend', callbackRemove);
	        emulateTransitionEnd(this._backdrop, backdropTransitionDuration);
	      } else {
	        callbackRemove();
	      }
	    } else {
	      callback();
	    }
	  }
	  _isAnimated() {
	    return this._element.classList.contains(CLASS_NAME_FADE$4);
	  }
	  _triggerBackdropTransition() {
	    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
	    if (hideEvent.defaultPrevented) {
	      return;
	    }
	    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
	    if (!isModalOverflowing) {
	      this._element.style.overflowY = 'hidden';
	    }
	    this._element.classList.add(CLASS_NAME_STATIC);
	    const modalTransitionDuration = getTransitionDurationFromElement(this._dialog);
	    EventHandler.off(this._element, 'transitionend');
	    EventHandler.one(this._element, 'transitionend', () => {
	      this._element.classList.remove(CLASS_NAME_STATIC);
	      if (!isModalOverflowing) {
	        EventHandler.one(this._element, 'transitionend', () => {
	          this._element.style.overflowY = '';
	        });
	        emulateTransitionEnd(this._element, modalTransitionDuration);
	      }
	    });
	    emulateTransitionEnd(this._element, modalTransitionDuration);
	    this._element.focus();
	  }
	  _adjustDialog() {
	    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
	    if (!this._isBodyOverflowing && isModalOverflowing && !isRTL() || this._isBodyOverflowing && !isModalOverflowing && isRTL()) {
	      this._element.style.paddingLeft = `${this._scrollbarWidth}px`;
	    }
	    if (this._isBodyOverflowing && !isModalOverflowing && !isRTL() || !this._isBodyOverflowing && isModalOverflowing && isRTL()) {
	      this._element.style.paddingRight = `${this._scrollbarWidth}px`;
	    }
	  }
	  _resetAdjustments() {
	    this._element.style.paddingLeft = '';
	    this._element.style.paddingRight = '';
	  }
	  _checkScrollbar() {
	    const rect = document.body.getBoundingClientRect();
	    this._isBodyOverflowing = Math.round(rect.left + rect.right) < window.innerWidth;
	    this._scrollbarWidth = this._getScrollbarWidth();
	  }
	  _setScrollbar() {
	    if (this._isBodyOverflowing) {
	      this._setElementAttributes(SELECTOR_FIXED_CONTENT$1, 'paddingRight', calculatedValue => calculatedValue + this._scrollbarWidth);
	      this._setElementAttributes(SELECTOR_STICKY_CONTENT$1, 'marginRight', calculatedValue => calculatedValue - this._scrollbarWidth);
	      this._setElementAttributes('body', 'paddingRight', calculatedValue => calculatedValue + this._scrollbarWidth);
	    }
	    document.body.classList.add(CLASS_NAME_OPEN);
	  }
	  _setElementAttributes(selector, styleProp, callback) {
	    SelectorEngine.find(selector).forEach(element => {
	      if (element !== document.body && window.innerWidth > element.clientWidth + this._scrollbarWidth) {
	        return;
	      }
	      const actualValue = element.style[styleProp];
	      const calculatedValue = window.getComputedStyle(element)[styleProp];
	      Manipulator.setDataAttribute(element, styleProp, actualValue);
	      element.style[styleProp] = callback(Number.parseFloat(calculatedValue)) + 'px';
	    });
	  }
	  _resetScrollbar() {
	    this._resetElementAttributes(SELECTOR_FIXED_CONTENT$1, 'paddingRight');
	    this._resetElementAttributes(SELECTOR_STICKY_CONTENT$1, 'marginRight');
	    this._resetElementAttributes('body', 'paddingRight');
	  }
	  _resetElementAttributes(selector, styleProp) {
	    SelectorEngine.find(selector).forEach(element => {
	      const value = Manipulator.getDataAttribute(element, styleProp);
	      if (typeof value === 'undefined' && element === document.body) {
	        element.style[styleProp] = '';
	      } else {
	        Manipulator.removeDataAttribute(element, styleProp);
	        element.style[styleProp] = value;
	      }
	    });
	  }
	  _getScrollbarWidth() {
	    const scrollDiv = document.createElement('div');
	    scrollDiv.className = CLASS_NAME_SCROLLBAR_MEASURER;
	    document.body.appendChild(scrollDiv);
	    const scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
	    document.body.removeChild(scrollDiv);
	    return scrollbarWidth;
	  }
	  static jQueryInterface(config, relatedTarget) {
	    return this.each(function () {
	      let data = Data.get(this, DATA_KEY$6);
	      const _config = { ...Default$5,
	        ...Manipulator.getDataAttributes(this),
	        ...(typeof config === 'object' && config ? config : {})
	      };
	      if (!data) {
	        data = new Modal(this, _config);
	      }
	      if (typeof config === 'string') {
	        if (typeof data[config] === 'undefined') {
	          throw new TypeError(`No method named "${config}"`);
	        }
	        data[config](relatedTarget);
	      }
	    });
	  }
	}
	EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
	  const target = getElementFromSelector(this);
	  if (this.tagName === 'A' || this.tagName === 'AREA') {
	    event.preventDefault();
	  }
	  EventHandler.one(target, EVENT_SHOW$3, showEvent => {
	    if (showEvent.defaultPrevented) {
	      return;
	    }
	    EventHandler.one(target, EVENT_HIDDEN$3, () => {
	      if (isVisible(this)) {
	        this.focus();
	      }
	    });
	  });
	  let data = Data.get(target, DATA_KEY$6);
	  if (!data) {
	    const config = { ...Manipulator.getDataAttributes(target),
	      ...Manipulator.getDataAttributes(this)
	    };
	    data = new Modal(target, config);
	  }
	  data.toggle(this);
	});
	defineJQueryPlugin(NAME$6, Modal);
	const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed';
	const SELECTOR_STICKY_CONTENT = '.sticky-top';
	const getWidth = () => {
	  const documentWidth = document.documentElement.clientWidth;
	  return Math.abs(window.innerWidth - documentWidth);
	};
	const hide = (width = getWidth()) => {
	  document.body.style.overflow = 'hidden';
	  _setElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight', calculatedValue => calculatedValue + width);
	  _setElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight', calculatedValue => calculatedValue - width);
	  _setElementAttributes('body', 'paddingRight', calculatedValue => calculatedValue + width);
	};
	const _setElementAttributes = (selector, styleProp, callback) => {
	  const scrollbarWidth = getWidth();
	  SelectorEngine.find(selector).forEach(element => {
	    if (element !== document.body && window.innerWidth > element.clientWidth + scrollbarWidth) {
	      return;
	    }
	    const actualValue = element.style[styleProp];
	    const calculatedValue = window.getComputedStyle(element)[styleProp];
	    Manipulator.setDataAttribute(element, styleProp, actualValue);
	    element.style[styleProp] = callback(Number.parseFloat(calculatedValue)) + 'px';
	  });
	};
	const reset = () => {
	  document.body.style.overflow = 'auto';
	  _resetElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight');
	  _resetElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight');
	  _resetElementAttributes('body', 'paddingRight');
	};
	const _resetElementAttributes = (selector, styleProp) => {
	  SelectorEngine.find(selector).forEach(element => {
	    const value = Manipulator.getDataAttribute(element, styleProp);
	    if (typeof value === 'undefined' && element === document.body) {
	      element.style.removeProperty(styleProp);
	    } else {
	      Manipulator.removeDataAttribute(element, styleProp);
	      element.style[styleProp] = value;
	    }
	  });
	};
	const NAME$5 = 'offcanvas';
	const DATA_KEY$5 = 'bs.offcanvas';
	const EVENT_KEY$5 = `.${DATA_KEY$5}`;
	const DATA_API_KEY$2 = '.data-api';
	const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$5}${DATA_API_KEY$2}`;
	const ESCAPE_KEY = 'Escape';
	const Default$4 = {
	  backdrop: true,
	  keyboard: true,
	  scroll: false
	};
	const DefaultType$4 = {
	  backdrop: 'boolean',
	  keyboard: 'boolean',
	  scroll: 'boolean'
	};
	const CLASS_NAME_BACKDROP_BODY = 'offcanvas-backdrop';
	const CLASS_NAME_SHOW$4 = 'show';
	const CLASS_NAME_TOGGLING = 'offcanvas-toggling';
	const OPEN_SELECTOR = '.offcanvas.show';
	const ACTIVE_SELECTOR = `${OPEN_SELECTOR}, .${CLASS_NAME_TOGGLING}`;
	const EVENT_SHOW$2 = `show${EVENT_KEY$5}`;
	const EVENT_SHOWN$2 = `shown${EVENT_KEY$5}`;
	const EVENT_HIDE$2 = `hide${EVENT_KEY$5}`;
	const EVENT_HIDDEN$2 = `hidden${EVENT_KEY$5}`;
	const EVENT_FOCUSIN = `focusin${EVENT_KEY$5}`;
	const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$5}${DATA_API_KEY$2}`;
	const EVENT_CLICK_DISMISS$1 = `click.dismiss${EVENT_KEY$5}`;
	const SELECTOR_DATA_DISMISS$1 = '[data-bs-dismiss="offcanvas"]';
	const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
	class Offcanvas extends BaseComponent {
	  constructor(element, config) {
	    super(element);
	    this._config = this._getConfig(config);
	    this._isShown = false;
	    this._addEventListeners();
	  }
	  static get Default() {
	    return Default$4;
	  }
	  static get DATA_KEY() {
	    return DATA_KEY$5;
	  }
	  toggle(relatedTarget) {
	    return this._isShown ? this.hide() : this.show(relatedTarget);
	  }
	  show(relatedTarget) {
	    if (this._isShown) {
	      return;
	    }
	    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$2, {
	      relatedTarget
	    });
	    if (showEvent.defaultPrevented) {
	      return;
	    }
	    this._isShown = true;
	    this._element.style.visibility = 'visible';
	    if (this._config.backdrop) {
	      document.body.classList.add(CLASS_NAME_BACKDROP_BODY);
	    }
	    if (!this._config.scroll) {
	      hide();
	    }
	    this._element.classList.add(CLASS_NAME_TOGGLING);
	    this._element.removeAttribute('aria-hidden');
	    this._element.setAttribute('aria-modal', true);
	    this._element.setAttribute('role', 'dialog');
	    this._element.classList.add(CLASS_NAME_SHOW$4);
	    const completeCallBack = () => {
	      this._element.classList.remove(CLASS_NAME_TOGGLING);
	      EventHandler.trigger(this._element, EVENT_SHOWN$2, {
	        relatedTarget
	      });
	      this._enforceFocusOnElement(this._element);
	    };
	    setTimeout(completeCallBack, getTransitionDurationFromElement(this._element));
	  }
	  hide() {
	    if (!this._isShown) {
	      return;
	    }
	    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$2);
	    if (hideEvent.defaultPrevented) {
	      return;
	    }
	    this._element.classList.add(CLASS_NAME_TOGGLING);
	    EventHandler.off(document, EVENT_FOCUSIN);
	    this._element.blur();
	    this._isShown = false;
	    this._element.classList.remove(CLASS_NAME_SHOW$4);
	    const completeCallback = () => {
	      this._element.setAttribute('aria-hidden', true);
	      this._element.removeAttribute('aria-modal');
	      this._element.removeAttribute('role');
	      this._element.style.visibility = 'hidden';
	      if (this._config.backdrop) {
	        document.body.classList.remove(CLASS_NAME_BACKDROP_BODY);
	      }
	      if (!this._config.scroll) {
	        reset();
	      }
	      EventHandler.trigger(this._element, EVENT_HIDDEN$2);
	      this._element.classList.remove(CLASS_NAME_TOGGLING);
	    };
	    setTimeout(completeCallback, getTransitionDurationFromElement(this._element));
	  }
	  _getConfig(config) {
	    config = { ...Default$4,
	      ...Manipulator.getDataAttributes(this._element),
	      ...(typeof config === 'object' ? config : {})
	    };
	    typeCheckConfig(NAME$5, config, DefaultType$4);
	    return config;
	  }
	  _enforceFocusOnElement(element) {
	    EventHandler.off(document, EVENT_FOCUSIN);
	    EventHandler.on(document, EVENT_FOCUSIN, event => {
	      if (document !== event.target && element !== event.target && !element.contains(event.target)) {
	        element.focus();
	      }
	    });
	    element.focus();
	  }
	  _addEventListeners() {
	    EventHandler.on(this._element, EVENT_CLICK_DISMISS$1, SELECTOR_DATA_DISMISS$1, () => this.hide());
	    EventHandler.on(document, 'keydown', event => {
	      if (this._config.keyboard && event.key === ESCAPE_KEY) {
	        this.hide();
	      }
	    });
	    EventHandler.on(document, EVENT_CLICK_DATA_API$1, event => {
	      const target = SelectorEngine.findOne(getSelectorFromElement(event.target));
	      if (!this._element.contains(event.target) && target !== this._element) {
	        this.hide();
	      }
	    });
	  }
	  static jQueryInterface(config) {
	    return this.each(function () {
	      const data = Data.get(this, DATA_KEY$5) || new Offcanvas(this, typeof config === 'object' ? config : {});
	      if (typeof config !== 'string') {
	        return;
	      }
	      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
	        throw new TypeError(`No method named "${config}"`);
	      }
	      data[config](this);
	    });
	  }
	}
	EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
	  const target = getElementFromSelector(this);
	  if (['A', 'AREA'].includes(this.tagName)) {
	    event.preventDefault();
	  }
	  if (isDisabled(this)) {
	    return;
	  }
	  EventHandler.one(target, EVENT_HIDDEN$2, () => {
	    if (isVisible(this)) {
	      this.focus();
	    }
	  });
	  const allReadyOpen = SelectorEngine.findOne(ACTIVE_SELECTOR);
	  if (allReadyOpen && allReadyOpen !== target) {
	    return;
	  }
	  const data = Data.get(target, DATA_KEY$5) || new Offcanvas(target);
	  data.toggle(this);
	});
	EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => {
	  SelectorEngine.find(OPEN_SELECTOR).forEach(el => (Data.get(el, DATA_KEY$5) || new Offcanvas(el)).show());
	});
	defineJQueryPlugin(NAME$5, Offcanvas);
	const uriAttrs = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
	const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
	const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/i;
	const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
	const allowedAttribute = (attr, allowedAttributeList) => {
	  const attrName = attr.nodeName.toLowerCase();
	  if (allowedAttributeList.includes(attrName)) {
	    if (uriAttrs.has(attrName)) {
	      return Boolean(SAFE_URL_PATTERN.test(attr.nodeValue) || DATA_URL_PATTERN.test(attr.nodeValue));
	    }
	    return true;
	  }
	  const regExp = allowedAttributeList.filter(attrRegex => attrRegex instanceof RegExp);
	  for (let i = 0, len = regExp.length; i < len; i++) {
	    if (regExp[i].test(attrName)) {
	      return true;
	    }
	  }
	  return false;
	};
	const DefaultAllowlist = {
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
	  if (!unsafeHtml.length) {
	    return unsafeHtml;
	  }
	  if (sanitizeFn && typeof sanitizeFn === 'function') {
	    return sanitizeFn(unsafeHtml);
	  }
	  const domParser = new window.DOMParser();
	  const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
	  const allowlistKeys = Object.keys(allowList);
	  const elements = [].concat(...createdDocument.body.querySelectorAll('*'));
	  for (let i = 0, len = elements.length; i < len; i++) {
	    const el = elements[i];
	    const elName = el.nodeName.toLowerCase();
	    if (!allowlistKeys.includes(elName)) {
	      el.parentNode.removeChild(el);
	      continue;
	    }
	    const attributeList = [].concat(...el.attributes);
	    const allowedAttributes = [].concat(allowList['*'] || [], allowList[elName] || []);
	    attributeList.forEach(attr => {
	      if (!allowedAttribute(attr, allowedAttributes)) {
	        el.removeAttribute(attr.nodeName);
	      }
	    });
	  }
	  return createdDocument.body.innerHTML;
	}
	const NAME$4 = 'tooltip';
	const DATA_KEY$4 = 'bs.tooltip';
	const EVENT_KEY$4 = `.${DATA_KEY$4}`;
	const CLASS_PREFIX$1 = 'bs-tooltip';
	const BSCLS_PREFIX_REGEX$1 = new RegExp(`(^|\\s)${CLASS_PREFIX$1}\\S+`, 'g');
	const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
	const DefaultType$3 = {
	  animation: 'boolean',
	  template: 'string',
	  title: '(string|element|function)',
	  trigger: 'string',
	  delay: '(number|object)',
	  html: 'boolean',
	  selector: '(string|boolean)',
	  placement: '(string|function)',
	  offset: '(array|string|function)',
	  container: '(string|element|boolean)',
	  fallbackPlacements: 'array',
	  boundary: '(string|element)',
	  customClass: '(string|function)',
	  sanitize: 'boolean',
	  sanitizeFn: '(null|function)',
	  allowList: 'object',
	  popperConfig: '(null|object|function)'
	};
	const AttachmentMap = {
	  AUTO: 'auto',
	  TOP: 'top',
	  RIGHT: isRTL() ? 'left' : 'right',
	  BOTTOM: 'bottom',
	  LEFT: isRTL() ? 'right' : 'left'
	};
	const Default$3 = {
	  animation: true,
	  template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
	  trigger: 'hover focus',
	  title: '',
	  delay: 0,
	  html: false,
	  selector: false,
	  placement: 'top',
	  offset: [0, 0],
	  container: false,
	  fallbackPlacements: ['top', 'right', 'bottom', 'left'],
	  boundary: 'clippingParents',
	  customClass: '',
	  sanitize: true,
	  sanitizeFn: null,
	  allowList: DefaultAllowlist,
	  popperConfig: null
	};
	const Event$2 = {
	  HIDE: `hide${EVENT_KEY$4}`,
	  HIDDEN: `hidden${EVENT_KEY$4}`,
	  SHOW: `show${EVENT_KEY$4}`,
	  SHOWN: `shown${EVENT_KEY$4}`,
	  INSERTED: `inserted${EVENT_KEY$4}`,
	  CLICK: `click${EVENT_KEY$4}`,
	  FOCUSIN: `focusin${EVENT_KEY$4}`,
	  FOCUSOUT: `focusout${EVENT_KEY$4}`,
	  MOUSEENTER: `mouseenter${EVENT_KEY$4}`,
	  MOUSELEAVE: `mouseleave${EVENT_KEY$4}`
	};
	const CLASS_NAME_FADE$3 = 'fade';
	const CLASS_NAME_MODAL = 'modal';
	const CLASS_NAME_SHOW$3 = 'show';
	const HOVER_STATE_SHOW = 'show';
	const HOVER_STATE_OUT = 'out';
	const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
	const TRIGGER_HOVER = 'hover';
	const TRIGGER_FOCUS = 'focus';
	const TRIGGER_CLICK = 'click';
	const TRIGGER_MANUAL = 'manual';
	class Tooltip extends BaseComponent {
	  constructor(element, config) {
	    if (typeof Popper === 'undefined') {
	      throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
	    }
	    super(element);
	    this._isEnabled = true;
	    this._timeout = 0;
	    this._hoverState = '';
	    this._activeTrigger = {};
	    this._popper = null;
	    this.config = this._getConfig(config);
	    this.tip = null;
	    this._setListeners();
	  }
	  static get Default() {
	    return Default$3;
	  }
	  static get NAME() {
	    return NAME$4;
	  }
	  static get DATA_KEY() {
	    return DATA_KEY$4;
	  }
	  static get Event() {
	    return Event$2;
	  }
	  static get EVENT_KEY() {
	    return EVENT_KEY$4;
	  }
	  static get DefaultType() {
	    return DefaultType$3;
	  }
	  enable() {
	    this._isEnabled = true;
	  }
	  disable() {
	    this._isEnabled = false;
	  }
	  toggleEnabled() {
	    this._isEnabled = !this._isEnabled;
	  }
	  toggle(event) {
	    if (!this._isEnabled) {
	      return;
	    }
	    if (event) {
	      const context = this._initializeOnDelegatedTarget(event);
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
	  }
	  dispose() {
	    clearTimeout(this._timeout);
	    EventHandler.off(this._element, this.constructor.EVENT_KEY);
	    EventHandler.off(this._element.closest(`.${CLASS_NAME_MODAL}`), 'hide.bs.modal', this._hideModalHandler);
	    if (this.tip && this.tip.parentNode) {
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
	    this.config = null;
	    this.tip = null;
	    super.dispose();
	  }
	  show() {
	    if (this._element.style.display === 'none') {
	      throw new Error('Please use show on visible elements');
	    }
	    if (!(this.isWithContent() && this._isEnabled)) {
	      return;
	    }
	    const showEvent = EventHandler.trigger(this._element, this.constructor.Event.SHOW);
	    const shadowRoot = findShadowRoot(this._element);
	    const isInTheDom = shadowRoot === null ? this._element.ownerDocument.documentElement.contains(this._element) : shadowRoot.contains(this._element);
	    if (showEvent.defaultPrevented || !isInTheDom) {
	      return;
	    }
	    const tip = this.getTipElement();
	    const tipId = getUID(this.constructor.NAME);
	    tip.setAttribute('id', tipId);
	    this._element.setAttribute('aria-describedby', tipId);
	    this.setContent();
	    if (this.config.animation) {
	      tip.classList.add(CLASS_NAME_FADE$3);
	    }
	    const placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this._element) : this.config.placement;
	    const attachment = this._getAttachment(placement);
	    this._addAttachmentClass(attachment);
	    const container = this._getContainer();
	    Data.set(tip, this.constructor.DATA_KEY, this);
	    if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
	      container.appendChild(tip);
	      EventHandler.trigger(this._element, this.constructor.Event.INSERTED);
	    }
	    if (this._popper) {
	      this._popper.update();
	    } else {
	      this._popper = createPopper(this._element, tip, this._getPopperConfig(attachment));
	    }
	    tip.classList.add(CLASS_NAME_SHOW$3);
	    const customClass = typeof this.config.customClass === 'function' ? this.config.customClass() : this.config.customClass;
	    if (customClass) {
	      tip.classList.add(...customClass.split(' '));
	    }
	    if ('ontouchstart' in document.documentElement) {
	      [].concat(...document.body.children).forEach(element => {
	        EventHandler.on(element, 'mouseover', noop());
	      });
	    }
	    const complete = () => {
	      const prevHoverState = this._hoverState;
	      this._hoverState = null;
	      EventHandler.trigger(this._element, this.constructor.Event.SHOWN);
	      if (prevHoverState === HOVER_STATE_OUT) {
	        this._leave(null, this);
	      }
	    };
	    if (this.tip.classList.contains(CLASS_NAME_FADE$3)) {
	      const transitionDuration = getTransitionDurationFromElement(this.tip);
	      EventHandler.one(this.tip, 'transitionend', complete);
	      emulateTransitionEnd(this.tip, transitionDuration);
	    } else {
	      complete();
	    }
	  }
	  hide() {
	    if (!this._popper) {
	      return;
	    }
	    const tip = this.getTipElement();
	    const complete = () => {
	      if (this._isWithActiveTrigger()) {
	        return;
	      }
	      if (this._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {
	        tip.parentNode.removeChild(tip);
	      }
	      this._cleanTipClass();
	      this._element.removeAttribute('aria-describedby');
	      EventHandler.trigger(this._element, this.constructor.Event.HIDDEN);
	      if (this._popper) {
	        this._popper.destroy();
	        this._popper = null;
	      }
	    };
	    const hideEvent = EventHandler.trigger(this._element, this.constructor.Event.HIDE);
	    if (hideEvent.defaultPrevented) {
	      return;
	    }
	    tip.classList.remove(CLASS_NAME_SHOW$3);
	    if ('ontouchstart' in document.documentElement) {
	      [].concat(...document.body.children).forEach(element => EventHandler.off(element, 'mouseover', noop));
	    }
	    this._activeTrigger[TRIGGER_CLICK] = false;
	    this._activeTrigger[TRIGGER_FOCUS] = false;
	    this._activeTrigger[TRIGGER_HOVER] = false;
	    if (this.tip.classList.contains(CLASS_NAME_FADE$3)) {
	      const transitionDuration = getTransitionDurationFromElement(tip);
	      EventHandler.one(tip, 'transitionend', complete);
	      emulateTransitionEnd(tip, transitionDuration);
	    } else {
	      complete();
	    }
	    this._hoverState = '';
	  }
	  update() {
	    if (this._popper !== null) {
	      this._popper.update();
	    }
	  }
	  isWithContent() {
	    return Boolean(this.getTitle());
	  }
	  getTipElement() {
	    if (this.tip) {
	      return this.tip;
	    }
	    const element = document.createElement('div');
	    element.innerHTML = this.config.template;
	    this.tip = element.children[0];
	    return this.tip;
	  }
	  setContent() {
	    const tip = this.getTipElement();
	    this.setElementContent(SelectorEngine.findOne(SELECTOR_TOOLTIP_INNER, tip), this.getTitle());
	    tip.classList.remove(CLASS_NAME_FADE$3, CLASS_NAME_SHOW$3);
	  }
	  setElementContent(element, content) {
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
	  }
	  getTitle() {
	    let title = this._element.getAttribute('data-bs-original-title');
	    if (!title) {
	      title = typeof this.config.title === 'function' ? this.config.title.call(this._element) : this.config.title;
	    }
	    return title;
	  }
	  updateAttachment(attachment) {
	    if (attachment === 'right') {
	      return 'end';
	    }
	    if (attachment === 'left') {
	      return 'start';
	    }
	    return attachment;
	  }
	  _initializeOnDelegatedTarget(event, context) {
	    const dataKey = this.constructor.DATA_KEY;
	    context = context || Data.get(event.delegateTarget, dataKey);
	    if (!context) {
	      context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
	      Data.set(event.delegateTarget, dataKey, context);
	    }
	    return context;
	  }
	  _getOffset() {
	    const {
	      offset
	    } = this.config;
	    if (typeof offset === 'string') {
	      return offset.split(',').map(val => Number.parseInt(val, 10));
	    }
	    if (typeof offset === 'function') {
	      return popperData => offset(popperData, this._element);
	    }
	    return offset;
	  }
	  _getPopperConfig(attachment) {
	    const defaultBsPopperConfig = {
	      placement: attachment,
	      modifiers: [{
	        name: 'flip',
	        options: {
	          altBoundary: true,
	          fallbackPlacements: this.config.fallbackPlacements
	        }
	      }, {
	        name: 'offset',
	        options: {
	          offset: this._getOffset()
	        }
	      }, {
	        name: 'preventOverflow',
	        options: {
	          boundary: this.config.boundary
	        }
	      }, {
	        name: 'arrow',
	        options: {
	          element: `.${this.constructor.NAME}-arrow`
	        }
	      }, {
	        name: 'onChange',
	        enabled: true,
	        phase: 'afterWrite',
	        fn: data => this._handlePopperPlacementChange(data)
	      }],
	      onFirstUpdate: data => {
	        if (data.options.placement !== data.placement) {
	          this._handlePopperPlacementChange(data);
	        }
	      }
	    };
	    return { ...defaultBsPopperConfig,
	      ...(typeof this.config.popperConfig === 'function' ? this.config.popperConfig(defaultBsPopperConfig) : this.config.popperConfig)
	    };
	  }
	  _addAttachmentClass(attachment) {
	    this.getTipElement().classList.add(`${CLASS_PREFIX$1}-${this.updateAttachment(attachment)}`);
	  }
	  _getContainer() {
	    if (this.config.container === false) {
	      return document.body;
	    }
	    if (isElement(this.config.container)) {
	      return this.config.container;
	    }
	    return SelectorEngine.findOne(this.config.container);
	  }
	  _getAttachment(placement) {
	    return AttachmentMap[placement.toUpperCase()];
	  }
	  _setListeners() {
	    const triggers = this.config.trigger.split(' ');
	    triggers.forEach(trigger => {
	      if (trigger === 'click') {
	        EventHandler.on(this._element, this.constructor.Event.CLICK, this.config.selector, event => this.toggle(event));
	      } else if (trigger !== TRIGGER_MANUAL) {
	        const eventIn = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSEENTER : this.constructor.Event.FOCUSIN;
	        const eventOut = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSELEAVE : this.constructor.Event.FOCUSOUT;
	        EventHandler.on(this._element, eventIn, this.config.selector, event => this._enter(event));
	        EventHandler.on(this._element, eventOut, this.config.selector, event => this._leave(event));
	      }
	    });
	    this._hideModalHandler = () => {
	      if (this._element) {
	        this.hide();
	      }
	    };
	    EventHandler.on(this._element.closest(`.${CLASS_NAME_MODAL}`), 'hide.bs.modal', this._hideModalHandler);
	    if (this.config.selector) {
	      this.config = { ...this.config,
	        trigger: 'manual',
	        selector: ''
	      };
	    } else {
	      this._fixTitle();
	    }
	  }
	  _fixTitle() {
	    const title = this._element.getAttribute('title');
	    const originalTitleType = typeof this._element.getAttribute('data-bs-original-title');
	    if (title || originalTitleType !== 'string') {
	      this._element.setAttribute('data-bs-original-title', title || '');
	      if (title && !this._element.getAttribute('aria-label') && !this._element.textContent) {
	        this._element.setAttribute('aria-label', title);
	      }
	      this._element.setAttribute('title', '');
	    }
	  }
	  _enter(event, context) {
	    context = this._initializeOnDelegatedTarget(event, context);
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
	    context._timeout = setTimeout(() => {
	      if (context._hoverState === HOVER_STATE_SHOW) {
	        context.show();
	      }
	    }, context.config.delay.show);
	  }
	  _leave(event, context) {
	    context = this._initializeOnDelegatedTarget(event, context);
	    if (event) {
	      context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
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
	    context._timeout = setTimeout(() => {
	      if (context._hoverState === HOVER_STATE_OUT) {
	        context.hide();
	      }
	    }, context.config.delay.hide);
	  }
	  _isWithActiveTrigger() {
	    for (const trigger in this._activeTrigger) {
	      if (this._activeTrigger[trigger]) {
	        return true;
	      }
	    }
	    return false;
	  }
	  _getConfig(config) {
	    const dataAttributes = Manipulator.getDataAttributes(this._element);
	    Object.keys(dataAttributes).forEach(dataAttr => {
	      if (DISALLOWED_ATTRIBUTES.has(dataAttr)) {
	        delete dataAttributes[dataAttr];
	      }
	    });
	    if (config && typeof config.container === 'object' && config.container.jquery) {
	      config.container = config.container[0];
	    }
	    config = { ...this.constructor.Default,
	      ...dataAttributes,
	      ...(typeof config === 'object' && config ? config : {})
	    };
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
	    typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
	    if (config.sanitize) {
	      config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
	    }
	    return config;
	  }
	  _getDelegateConfig() {
	    const config = {};
	    if (this.config) {
	      for (const key in this.config) {
	        if (this.constructor.Default[key] !== this.config[key]) {
	          config[key] = this.config[key];
	        }
	      }
	    }
	    return config;
	  }
	  _cleanTipClass() {
	    const tip = this.getTipElement();
	    const tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX$1);
	    if (tabClass !== null && tabClass.length > 0) {
	      tabClass.map(token => token.trim()).forEach(tClass => tip.classList.remove(tClass));
	    }
	  }
	  _handlePopperPlacementChange(popperData) {
	    const {
	      state
	    } = popperData;
	    if (!state) {
	      return;
	    }
	    this.tip = state.elements.popper;
	    this._cleanTipClass();
	    this._addAttachmentClass(this._getAttachment(state.placement));
	  }
	  static jQueryInterface(config) {
	    return this.each(function () {
	      let data = Data.get(this, DATA_KEY$4);
	      const _config = typeof config === 'object' && config;
	      if (!data && /dispose|hide/.test(config)) {
	        return;
	      }
	      if (!data) {
	        data = new Tooltip(this, _config);
	      }
	      if (typeof config === 'string') {
	        if (typeof data[config] === 'undefined') {
	          throw new TypeError(`No method named "${config}"`);
	        }
	        data[config]();
	      }
	    });
	  }
	}
	defineJQueryPlugin(NAME$4, Tooltip);
	const NAME$3 = 'popover';
	const DATA_KEY$3 = 'bs.popover';
	const EVENT_KEY$3 = `.${DATA_KEY$3}`;
	const CLASS_PREFIX = 'bs-popover';
	const BSCLS_PREFIX_REGEX = new RegExp(`(^|\\s)${CLASS_PREFIX}\\S+`, 'g');
	const Default$2 = { ...Tooltip.Default,
	  placement: 'right',
	  offset: [0, 8],
	  trigger: 'click',
	  content: '',
	  template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>'
	};
	const DefaultType$2 = { ...Tooltip.DefaultType,
	  content: '(string|element|function)'
	};
	const Event$1 = {
	  HIDE: `hide${EVENT_KEY$3}`,
	  HIDDEN: `hidden${EVENT_KEY$3}`,
	  SHOW: `show${EVENT_KEY$3}`,
	  SHOWN: `shown${EVENT_KEY$3}`,
	  INSERTED: `inserted${EVENT_KEY$3}`,
	  CLICK: `click${EVENT_KEY$3}`,
	  FOCUSIN: `focusin${EVENT_KEY$3}`,
	  FOCUSOUT: `focusout${EVENT_KEY$3}`,
	  MOUSEENTER: `mouseenter${EVENT_KEY$3}`,
	  MOUSELEAVE: `mouseleave${EVENT_KEY$3}`
	};
	const CLASS_NAME_FADE$2 = 'fade';
	const CLASS_NAME_SHOW$2 = 'show';
	const SELECTOR_TITLE = '.popover-header';
	const SELECTOR_CONTENT = '.popover-body';
	class Popover extends Tooltip {
	  static get Default() {
	    return Default$2;
	  }
	  static get NAME() {
	    return NAME$3;
	  }
	  static get DATA_KEY() {
	    return DATA_KEY$3;
	  }
	  static get Event() {
	    return Event$1;
	  }
	  static get EVENT_KEY() {
	    return EVENT_KEY$3;
	  }
	  static get DefaultType() {
	    return DefaultType$2;
	  }
	  isWithContent() {
	    return this.getTitle() || this._getContent();
	  }
	  setContent() {
	    const tip = this.getTipElement();
	    this.setElementContent(SelectorEngine.findOne(SELECTOR_TITLE, tip), this.getTitle());
	    let content = this._getContent();
	    if (typeof content === 'function') {
	      content = content.call(this._element);
	    }
	    this.setElementContent(SelectorEngine.findOne(SELECTOR_CONTENT, tip), content);
	    tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
	  }
	  _addAttachmentClass(attachment) {
	    this.getTipElement().classList.add(`${CLASS_PREFIX}-${this.updateAttachment(attachment)}`);
	  }
	  _getContent() {
	    return this._element.getAttribute('data-bs-content') || this.config.content;
	  }
	  _cleanTipClass() {
	    const tip = this.getTipElement();
	    const tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX);
	    if (tabClass !== null && tabClass.length > 0) {
	      tabClass.map(token => token.trim()).forEach(tClass => tip.classList.remove(tClass));
	    }
	  }
	  static jQueryInterface(config) {
	    return this.each(function () {
	      let data = Data.get(this, DATA_KEY$3);
	      const _config = typeof config === 'object' ? config : null;
	      if (!data && /dispose|hide/.test(config)) {
	        return;
	      }
	      if (!data) {
	        data = new Popover(this, _config);
	        Data.set(this, DATA_KEY$3, data);
	      }
	      if (typeof config === 'string') {
	        if (typeof data[config] === 'undefined') {
	          throw new TypeError(`No method named "${config}"`);
	        }
	        data[config]();
	      }
	    });
	  }
	}
	defineJQueryPlugin(NAME$3, Popover);
	const NAME$2 = 'scrollspy';
	const DATA_KEY$2 = 'bs.scrollspy';
	const EVENT_KEY$2 = `.${DATA_KEY$2}`;
	const DATA_API_KEY$1 = '.data-api';
	const Default$1 = {
	  offset: 10,
	  method: 'auto',
	  target: ''
	};
	const DefaultType$1 = {
	  offset: 'number',
	  method: 'string',
	  target: '(string|element)'
	};
	const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
	const EVENT_SCROLL = `scroll${EVENT_KEY$2}`;
	const EVENT_LOAD_DATA_API = `load${EVENT_KEY$2}${DATA_API_KEY$1}`;
	const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
	const CLASS_NAME_ACTIVE$1 = 'active';
	const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
	const SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
	const SELECTOR_NAV_LINKS = '.nav-link';
	const SELECTOR_NAV_ITEMS = '.nav-item';
	const SELECTOR_LIST_ITEMS = '.list-group-item';
	const SELECTOR_DROPDOWN$1 = '.dropdown';
	const SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
	const METHOD_OFFSET = 'offset';
	const METHOD_POSITION = 'position';
	class ScrollSpy extends BaseComponent {
	  constructor(element, config) {
	    super(element);
	    this._scrollElement = this._element.tagName === 'BODY' ? window : this._element;
	    this._config = this._getConfig(config);
	    this._selector = `${this._config.target} ${SELECTOR_NAV_LINKS}, ${this._config.target} ${SELECTOR_LIST_ITEMS}, ${this._config.target} .${CLASS_NAME_DROPDOWN_ITEM}`;
	    this._offsets = [];
	    this._targets = [];
	    this._activeTarget = null;
	    this._scrollHeight = 0;
	    EventHandler.on(this._scrollElement, EVENT_SCROLL, () => this._process());
	    this.refresh();
	    this._process();
	  }
	  static get Default() {
	    return Default$1;
	  }
	  static get DATA_KEY() {
	    return DATA_KEY$2;
	  }
	  refresh() {
	    const autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
	    const offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
	    const offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
	    this._offsets = [];
	    this._targets = [];
	    this._scrollHeight = this._getScrollHeight();
	    const targets = SelectorEngine.find(this._selector);
	    targets.map(element => {
	      const targetSelector = getSelectorFromElement(element);
	      const target = targetSelector ? SelectorEngine.findOne(targetSelector) : null;
	      if (target) {
	        const targetBCR = target.getBoundingClientRect();
	        if (targetBCR.width || targetBCR.height) {
	          return [Manipulator[offsetMethod](target).top + offsetBase, targetSelector];
	        }
	      }
	      return null;
	    }).filter(item => item).sort((a, b) => a[0] - b[0]).forEach(item => {
	      this._offsets.push(item[0]);
	      this._targets.push(item[1]);
	    });
	  }
	  dispose() {
	    super.dispose();
	    EventHandler.off(this._scrollElement, EVENT_KEY$2);
	    this._scrollElement = null;
	    this._config = null;
	    this._selector = null;
	    this._offsets = null;
	    this._targets = null;
	    this._activeTarget = null;
	    this._scrollHeight = null;
	  }
	  _getConfig(config) {
	    config = { ...Default$1,
	      ...(typeof config === 'object' && config ? config : {})
	    };
	    if (typeof config.target !== 'string' && isElement(config.target)) {
	      let {
	        id
	      } = config.target;
	      if (!id) {
	        id = getUID(NAME$2);
	        config.target.id = id;
	      }
	      config.target = `#${id}`;
	    }
	    typeCheckConfig(NAME$2, config, DefaultType$1);
	    return config;
	  }
	  _getScrollTop() {
	    return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
	  }
	  _getScrollHeight() {
	    return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
	  }
	  _getOffsetHeight() {
	    return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
	  }
	  _process() {
	    const scrollTop = this._getScrollTop() + this._config.offset;
	    const scrollHeight = this._getScrollHeight();
	    const maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();
	    if (this._scrollHeight !== scrollHeight) {
	      this.refresh();
	    }
	    if (scrollTop >= maxScroll) {
	      const target = this._targets[this._targets.length - 1];
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
	    for (let i = this._offsets.length; i--;) {
	      const isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);
	      if (isActiveTarget) {
	        this._activate(this._targets[i]);
	      }
	    }
	  }
	  _activate(target) {
	    this._activeTarget = target;
	    this._clear();
	    const queries = this._selector.split(',').map(selector => `${selector}[data-bs-target="${target}"],${selector}[href="${target}"]`);
	    const link = SelectorEngine.findOne(queries.join(','));
	    if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
	      SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, link.closest(SELECTOR_DROPDOWN$1)).classList.add(CLASS_NAME_ACTIVE$1);
	      link.classList.add(CLASS_NAME_ACTIVE$1);
	    } else {
	      link.classList.add(CLASS_NAME_ACTIVE$1);
	      SelectorEngine.parents(link, SELECTOR_NAV_LIST_GROUP$1).forEach(listGroup => {
	        SelectorEngine.prev(listGroup, `${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`).forEach(item => item.classList.add(CLASS_NAME_ACTIVE$1));
	        SelectorEngine.prev(listGroup, SELECTOR_NAV_ITEMS).forEach(navItem => {
	          SelectorEngine.children(navItem, SELECTOR_NAV_LINKS).forEach(item => item.classList.add(CLASS_NAME_ACTIVE$1));
	        });
	      });
	    }
	    EventHandler.trigger(this._scrollElement, EVENT_ACTIVATE, {
	      relatedTarget: target
	    });
	  }
	  _clear() {
	    SelectorEngine.find(this._selector).filter(node => node.classList.contains(CLASS_NAME_ACTIVE$1)).forEach(node => node.classList.remove(CLASS_NAME_ACTIVE$1));
	  }
	  static jQueryInterface(config) {
	    return this.each(function () {
	      let data = Data.get(this, DATA_KEY$2);
	      const _config = typeof config === 'object' && config;
	      if (!data) {
	        data = new ScrollSpy(this, _config);
	      }
	      if (typeof config === 'string') {
	        if (typeof data[config] === 'undefined') {
	          throw new TypeError(`No method named "${config}"`);
	        }
	        data[config]();
	      }
	    });
	  }
	}
	EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
	  SelectorEngine.find(SELECTOR_DATA_SPY).forEach(spy => new ScrollSpy(spy, Manipulator.getDataAttributes(spy)));
	});
	defineJQueryPlugin(NAME$2, ScrollSpy);
	const NAME$1 = 'tab';
	const DATA_KEY$1 = 'bs.tab';
	const EVENT_KEY$1 = `.${DATA_KEY$1}`;
	const DATA_API_KEY = '.data-api';
	const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
	const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
	const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
	const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
	const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}${DATA_API_KEY}`;
	const CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
	const CLASS_NAME_ACTIVE = 'active';
	const CLASS_NAME_FADE$1 = 'fade';
	const CLASS_NAME_SHOW$1 = 'show';
	const SELECTOR_DROPDOWN = '.dropdown';
	const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
	const SELECTOR_ACTIVE = '.active';
	const SELECTOR_ACTIVE_UL = ':scope > li > .active';
	const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
	const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
	const SELECTOR_DROPDOWN_ACTIVE_CHILD = ':scope > .dropdown-menu .active';
	class Tab extends BaseComponent {
	  static get DATA_KEY() {
	    return DATA_KEY$1;
	  }
	  show() {
	    if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE) || isDisabled(this._element)) {
	      return;
	    }
	    let previous;
	    const target = getElementFromSelector(this._element);
	    const listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP);
	    if (listElement) {
	      const itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
	      previous = SelectorEngine.find(itemSelector, listElement);
	      previous = previous[previous.length - 1];
	    }
	    const hideEvent = previous ? EventHandler.trigger(previous, EVENT_HIDE$1, {
	      relatedTarget: this._element
	    }) : null;
	    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, {
	      relatedTarget: previous
	    });
	    if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
	      return;
	    }
	    this._activate(this._element, listElement);
	    const complete = () => {
	      EventHandler.trigger(previous, EVENT_HIDDEN$1, {
	        relatedTarget: this._element
	      });
	      EventHandler.trigger(this._element, EVENT_SHOWN$1, {
	        relatedTarget: previous
	      });
	    };
	    if (target) {
	      this._activate(target, target.parentNode, complete);
	    } else {
	      complete();
	    }
	  }
	  _activate(element, container, callback) {
	    const activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? SelectorEngine.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine.children(container, SELECTOR_ACTIVE);
	    const active = activeElements[0];
	    const isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE$1);
	    const complete = () => this._transitionComplete(element, active, callback);
	    if (active && isTransitioning) {
	      const transitionDuration = getTransitionDurationFromElement(active);
	      active.classList.remove(CLASS_NAME_SHOW$1);
	      EventHandler.one(active, 'transitionend', complete);
	      emulateTransitionEnd(active, transitionDuration);
	    } else {
	      complete();
	    }
	  }
	  _transitionComplete(element, active, callback) {
	    if (active) {
	      active.classList.remove(CLASS_NAME_ACTIVE);
	      const dropdownChild = SelectorEngine.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);
	      if (dropdownChild) {
	        dropdownChild.classList.remove(CLASS_NAME_ACTIVE);
	      }
	      if (active.getAttribute('role') === 'tab') {
	        active.setAttribute('aria-selected', false);
	      }
	    }
	    element.classList.add(CLASS_NAME_ACTIVE);
	    if (element.getAttribute('role') === 'tab') {
	      element.setAttribute('aria-selected', true);
	    }
	    reflow(element);
	    if (element.classList.contains(CLASS_NAME_FADE$1)) {
	      element.classList.add(CLASS_NAME_SHOW$1);
	    }
	    if (element.parentNode && element.parentNode.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
	      const dropdownElement = element.closest(SELECTOR_DROPDOWN);
	      if (dropdownElement) {
	        SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE).forEach(dropdown => dropdown.classList.add(CLASS_NAME_ACTIVE));
	      }
	      element.setAttribute('aria-expanded', true);
	    }
	    if (callback) {
	      callback();
	    }
	  }
	  static jQueryInterface(config) {
	    return this.each(function () {
	      const data = Data.get(this, DATA_KEY$1) || new Tab(this);
	      if (typeof config === 'string') {
	        if (typeof data[config] === 'undefined') {
	          throw new TypeError(`No method named "${config}"`);
	        }
	        data[config]();
	      }
	    });
	  }
	}
	EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
	  event.preventDefault();
	  const data = Data.get(this, DATA_KEY$1) || new Tab(this);
	  data.show();
	});
	defineJQueryPlugin(NAME$1, Tab);
	const NAME = 'toast';
	const DATA_KEY = 'bs.toast';
	const EVENT_KEY = `.${DATA_KEY}`;
	const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
	const EVENT_HIDE = `hide${EVENT_KEY}`;
	const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
	const EVENT_SHOW = `show${EVENT_KEY}`;
	const EVENT_SHOWN = `shown${EVENT_KEY}`;
	const CLASS_NAME_FADE = 'fade';
	const CLASS_NAME_HIDE = 'hide';
	const CLASS_NAME_SHOW = 'show';
	const CLASS_NAME_SHOWING = 'showing';
	const DefaultType = {
	  animation: 'boolean',
	  autohide: 'boolean',
	  delay: 'number'
	};
	const Default = {
	  animation: true,
	  autohide: true,
	  delay: 5000
	};
	const SELECTOR_DATA_DISMISS = '[data-bs-dismiss="toast"]';
	class Toast extends BaseComponent {
	  constructor(element, config) {
	    super(element);
	    this._config = this._getConfig(config);
	    this._timeout = null;
	    this._setListeners();
	  }
	  static get DefaultType() {
	    return DefaultType;
	  }
	  static get Default() {
	    return Default;
	  }
	  static get DATA_KEY() {
	    return DATA_KEY;
	  }
	  show() {
	    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);
	    if (showEvent.defaultPrevented) {
	      return;
	    }
	    this._clearTimeout();
	    if (this._config.animation) {
	      this._element.classList.add(CLASS_NAME_FADE);
	    }
	    const complete = () => {
	      this._element.classList.remove(CLASS_NAME_SHOWING);
	      this._element.classList.add(CLASS_NAME_SHOW);
	      EventHandler.trigger(this._element, EVENT_SHOWN);
	      if (this._config.autohide) {
	        this._timeout = setTimeout(() => {
	          this.hide();
	        }, this._config.delay);
	      }
	    };
	    this._element.classList.remove(CLASS_NAME_HIDE);
	    reflow(this._element);
	    this._element.classList.add(CLASS_NAME_SHOWING);
	    if (this._config.animation) {
	      const transitionDuration = getTransitionDurationFromElement(this._element);
	      EventHandler.one(this._element, 'transitionend', complete);
	      emulateTransitionEnd(this._element, transitionDuration);
	    } else {
	      complete();
	    }
	  }
	  hide() {
	    if (!this._element.classList.contains(CLASS_NAME_SHOW)) {
	      return;
	    }
	    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
	    if (hideEvent.defaultPrevented) {
	      return;
	    }
	    const complete = () => {
	      this._element.classList.add(CLASS_NAME_HIDE);
	      EventHandler.trigger(this._element, EVENT_HIDDEN);
	    };
	    this._element.classList.remove(CLASS_NAME_SHOW);
	    if (this._config.animation) {
	      const transitionDuration = getTransitionDurationFromElement(this._element);
	      EventHandler.one(this._element, 'transitionend', complete);
	      emulateTransitionEnd(this._element, transitionDuration);
	    } else {
	      complete();
	    }
	  }
	  dispose() {
	    this._clearTimeout();
	    if (this._element.classList.contains(CLASS_NAME_SHOW)) {
	      this._element.classList.remove(CLASS_NAME_SHOW);
	    }
	    EventHandler.off(this._element, EVENT_CLICK_DISMISS);
	    super.dispose();
	    this._config = null;
	  }
	  _getConfig(config) {
	    config = { ...Default,
	      ...Manipulator.getDataAttributes(this._element),
	      ...(typeof config === 'object' && config ? config : {})
	    };
	    typeCheckConfig(NAME, config, this.constructor.DefaultType);
	    return config;
	  }
	  _setListeners() {
	    EventHandler.on(this._element, EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, () => this.hide());
	  }
	  _clearTimeout() {
	    clearTimeout(this._timeout);
	    this._timeout = null;
	  }
	  static jQueryInterface(config) {
	    return this.each(function () {
	      let data = Data.get(this, DATA_KEY);
	      const _config = typeof config === 'object' && config;
	      if (!data) {
	        data = new Toast(this, _config);
	      }
	      if (typeof config === 'string') {
	        if (typeof data[config] === 'undefined') {
	          throw new TypeError(`No method named "${config}"`);
	        }
	        data[config](this);
	      }
	    });
	  }
	}
	defineJQueryPlugin(NAME, Toast);

	var dropdownTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'));
	dropdownTriggerList.map(function (dropdownTriggerEl) {
	  return new Dropdown(dropdownTriggerEl);
	});
	var selectors = '.dropdown, .dropup, .dropend, .dropstart',
	    dropdowns = document.querySelectorAll(selectors);
	var currentTarget = undefined;
	dropdowns.forEach(function (dropdown) {
	  dropdown.addEventListener('mousedown', function (e) {
	    e.stopPropagation();
	    if (e.target.dataset.bsToggle && e.target.dataset.bsToggle === 'dropdown') {
	      currentTarget = e.currentTarget;
	    }
	  });
	  dropdown.addEventListener('hide.bs.dropdown', function (e) {
	    e.stopPropagation();
	    var parent = currentTarget ? currentTarget.parentElement.closest(selectors) : undefined;
	    if (parent && parent === dropdown) {
	      e.preventDefault();
	    }
	    currentTarget = undefined;
	  });
	});

	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
	tooltipTriggerList.map(function (tooltipTriggerEl) {
	  var _ref, _tooltipTriggerEl$get;
	  var options = {
	    delay: {
	      show: 50,
	      hide: 50
	    },
	    html: (_ref = tooltipTriggerEl.getAttribute("data-bs-html") === "true") !== null && _ref !== void 0 ? _ref : false,
	    placement: (_tooltipTriggerEl$get = tooltipTriggerEl.getAttribute('data-bs-placement')) !== null && _tooltipTriggerEl$get !== void 0 ? _tooltipTriggerEl$get : 'auto'
	  };
	  return new Tooltip(tooltipTriggerEl, options);
	});

	var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
	popoverTriggerList.map(function (popoverTriggerEl) {
	  var _ref, _popoverTriggerEl$get;
	  var options = {
	    delay: {
	      show: 50,
	      hide: 50
	    },
	    html: (_ref = popoverTriggerEl.getAttribute('data-bs-html') === "true") !== null && _ref !== void 0 ? _ref : false,
	    placement: (_popoverTriggerEl$get = popoverTriggerEl.getAttribute('data-bs-placement')) !== null && _popoverTriggerEl$get !== void 0 ? _popoverTriggerEl$get : 'auto'
	  };
	  return new Popover(popoverTriggerEl, options);
	});

	var switchesTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="switch-icon"]'));
	switchesTriggerList.map(function (switchTriggerEl) {
	  switchTriggerEl.addEventListener('click', function (e) {
	    e.stopPropagation();
	    switchTriggerEl.classList.toggle('active');
	  });
	});

	var EnableActivationTabsFromLocationHash = function EnableActivationTabsFromLocationHash() {
	  var locationHash = window.location.hash;
	  if (locationHash) {
	    var tabsList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tab"]'));
	    var matchedTabs = tabsList.filter(function (tab) {
	      return tab.hash === locationHash;
	    });
	    matchedTabs.map(function (tab) {
	      new Tab(tab).show();
	    });
	  }
	};

	var toastsTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="toast"]'));
	toastsTriggerList.map(function (toastTriggerEl) {
	  return new Toast(toastTriggerEl);
	});

	EnableActivationTabsFromLocationHash();

})));
