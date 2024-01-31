/*!
  * Tabler v1.0.0 (https://tabler.io)
  * Copyright 2018-2024 codecalm
  * Licensed under MIT (https://github.com/tabler/tabler/blob/main/LICENSE)
  */
(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
})((function () { 'use strict';

	var e=new Map;function t(t){var o=e.get(t);o&&o.destroy();}function o(t){var o=e.get(t);o&&o.update();}var r=null;"undefined"==typeof window?((r=function(e){return e}).destroy=function(e){return e},r.update=function(e){return e}):((r=function(t,o){return t&&Array.prototype.forEach.call(t.length?t:[t],function(t){return function(t){if(t&&t.nodeName&&"TEXTAREA"===t.nodeName&&!e.has(t)){var o,r=null,n=window.getComputedStyle(t),i=(o=t.value,function(){a({testForHeightReduction:""===o||!t.value.startsWith(o),restoreTextAlign:null}),o=t.value;}),l=function(o){t.removeEventListener("autosize:destroy",l),t.removeEventListener("autosize:update",s),t.removeEventListener("input",i),window.removeEventListener("resize",s),Object.keys(o).forEach(function(e){return t.style[e]=o[e]}),e.delete(t);}.bind(t,{height:t.style.height,resize:t.style.resize,textAlign:t.style.textAlign,overflowY:t.style.overflowY,overflowX:t.style.overflowX,wordWrap:t.style.wordWrap});t.addEventListener("autosize:destroy",l),t.addEventListener("autosize:update",s),t.addEventListener("input",i),window.addEventListener("resize",s),t.style.overflowX="hidden",t.style.wordWrap="break-word",e.set(t,{destroy:l,update:s}),s();}function a(e){var o,i,l=e.restoreTextAlign,s=void 0===l?null:l,d=e.testForHeightReduction,u=void 0===d||d,c=n.overflowY;if(0!==t.scrollHeight&&("vertical"===n.resize?t.style.resize="none":"both"===n.resize&&(t.style.resize="horizontal"),u&&(o=function(e){for(var t=[];e&&e.parentNode&&e.parentNode instanceof Element;)e.parentNode.scrollTop&&t.push([e.parentNode,e.parentNode.scrollTop]),e=e.parentNode;return function(){return t.forEach(function(e){var t=e[0],o=e[1];t.style.scrollBehavior="auto",t.scrollTop=o,t.style.scrollBehavior=null;})}}(t),t.style.height=""),i="content-box"===n.boxSizing?t.scrollHeight-(parseFloat(n.paddingTop)+parseFloat(n.paddingBottom)):t.scrollHeight+parseFloat(n.borderTopWidth)+parseFloat(n.borderBottomWidth),"none"!==n.maxHeight&&i>parseFloat(n.maxHeight)?("hidden"===n.overflowY&&(t.style.overflow="scroll"),i=parseFloat(n.maxHeight)):"hidden"!==n.overflowY&&(t.style.overflow="hidden"),t.style.height=i+"px",s&&(t.style.textAlign=s),o&&o(),r!==i&&(t.dispatchEvent(new Event("autosize:resized",{bubbles:!0})),r=i),c!==n.overflow&&!s)){var v=n.textAlign;"hidden"===n.overflow&&(t.style.textAlign="start"===v?"end":"start"),a({restoreTextAlign:v,testForHeightReduction:!0});}}function s(){a({testForHeightReduction:!0,restoreTextAlign:null});}}(t)}),t}).destroy=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],t),e},r.update=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],o),e});var n=r;

	// Autosize plugin

	var elements = document.querySelectorAll('[data-bs-toggle="autosize"]');
	if (elements.length) {
	  elements.forEach(function (element) {
	    n(element);
	  });
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

	/**
	 * Applies mask on element.
	 * @constructor
	 * @param {HTMLInputElement|HTMLTextAreaElement|MaskElement} el - Element to apply mask
	 * @param {Object} opts - Custom mask options
	 * @return {InputMask}
	 */
	function IMask(el) {
	  let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  // currently available only for input-like elements
	  return new IMask.InputMask(el, opts);
	}

	/**
	  Provides details of changing model value
	  @param {Object} [details]
	  @param {string} [details.inserted] - Inserted symbols
	  @param {boolean} [details.skip] - Can skip chars
	  @param {number} [details.removeCount] - Removed symbols count
	  @param {number} [details.tailShift] - Additional offset if any changes occurred before tail
	*/
	class ChangeDetails {
	  /** Inserted symbols */

	  /** Can skip chars */

	  /** Additional offset if any changes occurred before tail */

	  /** Raw inserted is used by dynamic mask */

	  constructor(details) {
	    Object.assign(this, {
	      inserted: '',
	      rawInserted: '',
	      skip: false,
	      tailShift: 0
	    }, details);
	  }

	  /**
	    Aggregate changes
	    @returns {ChangeDetails} `this`
	  */
	  aggregate(details) {
	    this.rawInserted += details.rawInserted;
	    this.skip = this.skip || details.skip;
	    this.inserted += details.inserted;
	    this.tailShift += details.tailShift;
	    return this;
	  }

	  /** Total offset considering all changes */
	  get offset() {
	    return this.tailShift + this.inserted.length;
	  }
	}
	IMask.ChangeDetails = ChangeDetails;

	/** Checks if value is string */
	function isString(str) {
	  return typeof str === 'string' || str instanceof String;
	}

	/**
	  Direction
	  @prop {string} NONE
	  @prop {string} LEFT
	  @prop {string} FORCE_LEFT
	  @prop {string} RIGHT
	  @prop {string} FORCE_RIGHT
	*/
	const DIRECTION = {
	  NONE: 'NONE',
	  LEFT: 'LEFT',
	  FORCE_LEFT: 'FORCE_LEFT',
	  RIGHT: 'RIGHT',
	  FORCE_RIGHT: 'FORCE_RIGHT'
	};

	/** */
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

	/** Escapes regular expression control chars */
	function escapeRegExp(str) {
	  return str.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
	}
	function normalizePrepare(prep) {
	  return Array.isArray(prep) ? prep : [prep, new ChangeDetails()];
	}

	// cloned from https://github.com/epoberezkin/fast-deep-equal with small changes
	function objectIncludes(b, a) {
	  if (a === b) return true;
	  var arrA = Array.isArray(a),
	    arrB = Array.isArray(b),
	    i;
	  if (arrA && arrB) {
	    if (a.length != b.length) return false;
	    for (i = 0; i < a.length; i++) if (!objectIncludes(a[i], b[i])) return false;
	    return true;
	  }
	  if (arrA != arrB) return false;
	  if (a && b && typeof a === 'object' && typeof b === 'object') {
	    var dateA = a instanceof Date,
	      dateB = b instanceof Date;
	    if (dateA && dateB) return a.getTime() == b.getTime();
	    if (dateA != dateB) return false;
	    var regexpA = a instanceof RegExp,
	      regexpB = b instanceof RegExp;
	    if (regexpA && regexpB) return a.toString() == b.toString();
	    if (regexpA != regexpB) return false;
	    var keys = Object.keys(a);
	    // if (keys.length !== Object.keys(b).length) return false;

	    for (i = 0; i < keys.length; i++)
	    // $FlowFixMe ... ???
	    if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
	    for (i = 0; i < keys.length; i++) if (!objectIncludes(b[keys[i]], a[keys[i]])) return false;
	    return true;
	  } else if (a && b && typeof a === 'function' && typeof b === 'function') {
	    return a.toString() === b.toString();
	  }
	  return false;
	}

	/** Provides details of changing input */
	class ActionDetails {
	  /** Current input value */

	  /** Current cursor position */

	  /** Old input value */

	  /** Old selection */

	  constructor(value, cursorPos, oldValue, oldSelection) {
	    this.value = value;
	    this.cursorPos = cursorPos;
	    this.oldValue = oldValue;
	    this.oldSelection = oldSelection;

	    // double check if left part was changed (autofilling, other non-standard input triggers)
	    while (this.value.slice(0, this.startChangePos) !== this.oldValue.slice(0, this.startChangePos)) {
	      --this.oldSelection.start;
	    }
	  }

	  /**
	    Start changing position
	    @readonly
	  */
	  get startChangePos() {
	    return Math.min(this.cursorPos, this.oldSelection.start);
	  }

	  /**
	    Inserted symbols count
	    @readonly
	  */
	  get insertedCount() {
	    return this.cursorPos - this.startChangePos;
	  }

	  /**
	    Inserted symbols
	    @readonly
	  */
	  get inserted() {
	    return this.value.substr(this.startChangePos, this.insertedCount);
	  }

	  /**
	    Removed symbols count
	    @readonly
	  */
	  get removedCount() {
	    // Math.max for opposite operation
	    return Math.max(this.oldSelection.end - this.startChangePos ||
	    // for Delete
	    this.oldValue.length - this.value.length, 0);
	  }

	  /**
	    Removed symbols
	    @readonly
	  */
	  get removed() {
	    return this.oldValue.substr(this.startChangePos, this.removedCount);
	  }

	  /**
	    Unchanged head symbols
	    @readonly
	  */
	  get head() {
	    return this.value.substring(0, this.startChangePos);
	  }

	  /**
	    Unchanged tail symbols
	    @readonly
	  */
	  get tail() {
	    return this.value.substring(this.startChangePos + this.insertedCount);
	  }

	  /**
	    Remove direction
	    @readonly
	  */
	  get removeDirection() {
	    if (!this.removedCount || this.insertedCount) return DIRECTION.NONE;

	    // align right if delete at right
	    return (this.oldSelection.end === this.cursorPos || this.oldSelection.start === this.cursorPos) &&
	    // if not range removed (event with backspace)
	    this.oldSelection.end === this.oldSelection.start ? DIRECTION.RIGHT : DIRECTION.LEFT;
	  }
	}

	/** Provides details of continuous extracted tail */
	class ContinuousTailDetails {
	  /** Tail value as string */

	  /** Tail start position */

	  /** Start position */

	  constructor() {
	    let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    let from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    let stop = arguments.length > 2 ? arguments[2] : undefined;
	    this.value = value;
	    this.from = from;
	    this.stop = stop;
	  }
	  toString() {
	    return this.value;
	  }
	  extend(tail) {
	    this.value += String(tail);
	  }
	  appendTo(masked) {
	    return masked.append(this.toString(), {
	      tail: true
	    }).aggregate(masked._appendPlaceholder());
	  }
	  get state() {
	    return {
	      value: this.value,
	      from: this.from,
	      stop: this.stop
	    };
	  }
	  set state(state) {
	    Object.assign(this, state);
	  }
	  unshift(beforePos) {
	    if (!this.value.length || beforePos != null && this.from >= beforePos) return '';
	    const shiftChar = this.value[0];
	    this.value = this.value.slice(1);
	    return shiftChar;
	  }
	  shift() {
	    if (!this.value.length) return '';
	    const shiftChar = this.value[this.value.length - 1];
	    this.value = this.value.slice(0, -1);
	    return shiftChar;
	  }
	}

	/** Supported mask type */

	/** Append flags */

	/** Extract flags */

	/** Provides common masking stuff */
	class Masked {
	  // $Shape<MaskedOptions>; TODO after fix https://github.com/facebook/flow/issues/4773

	  /** @type {Mask} */

	  /** */ // $FlowFixMe no ideas
	  /** Transforms value before mask processing */
	  /** Validates if value is acceptable */
	  /** Does additional processing in the end of editing */
	  /** Format typed value to string */
	  /** Parse strgin to get typed value */
	  /** Enable characters overwriting */
	  /** */
	  /** */
	  /** */
	  constructor(opts) {
	    this._value = '';
	    this._update(Object.assign({}, Masked.DEFAULTS, opts));
	    this.isInitialized = true;
	  }

	  /** Sets and applies new options */
	  updateOptions(opts) {
	    if (!Object.keys(opts).length) return;
	    // $FlowFixMe
	    this.withValueRefresh(this._update.bind(this, opts));
	  }

	  /**
	    Sets new options
	    @protected
	  */
	  _update(opts) {
	    Object.assign(this, opts);
	  }

	  /** Mask state */
	  get state() {
	    return {
	      _value: this.value
	    };
	  }
	  set state(state) {
	    this._value = state._value;
	  }

	  /** Resets value */
	  reset() {
	    this._value = '';
	  }

	  /** */
	  get value() {
	    return this._value;
	  }
	  set value(value) {
	    this.resolve(value);
	  }

	  /** Resolve new value */
	  resolve(value) {
	    this.reset();
	    this.append(value, {
	      input: true
	    }, '');
	    this.doCommit();
	    return this.value;
	  }

	  /** */
	  get unmaskedValue() {
	    return this.value;
	  }
	  set unmaskedValue(value) {
	    this.reset();
	    this.append(value, {}, '');
	    this.doCommit();
	  }

	  /** */
	  get typedValue() {
	    return this.doParse(this.value);
	  }
	  set typedValue(value) {
	    this.value = this.doFormat(value);
	  }

	  /** Value that includes raw user input */
	  get rawInputValue() {
	    return this.extractInput(0, this.value.length, {
	      raw: true
	    });
	  }
	  set rawInputValue(value) {
	    this.reset();
	    this.append(value, {
	      raw: true
	    }, '');
	    this.doCommit();
	  }
	  get displayValue() {
	    return this.value;
	  }

	  /** */
	  get isComplete() {
	    return true;
	  }

	  /** */
	  get isFilled() {
	    return this.isComplete;
	  }

	  /** Finds nearest input position in direction */
	  nearestInputPos(cursorPos, direction) {
	    return cursorPos;
	  }
	  totalInputPositions() {
	    let fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    let toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	    return Math.min(this.value.length, toPos - fromPos);
	  }

	  /** Extracts value in range considering flags */
	  extractInput() {
	    let fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    let toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	    return this.value.slice(fromPos, toPos);
	  }

	  /** Extracts tail in range */
	  extractTail() {
	    let fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    let toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	    return new ContinuousTailDetails(this.extractInput(fromPos, toPos), fromPos);
	  }

	  /** Appends tail */
	  // $FlowFixMe no ideas
	  appendTail(tail) {
	    if (isString(tail)) tail = new ContinuousTailDetails(String(tail));
	    return tail.appendTo(this);
	  }

	  /** Appends char */
	  _appendCharRaw(ch) {
	    if (!ch) return new ChangeDetails();
	    this._value += ch;
	    return new ChangeDetails({
	      inserted: ch,
	      rawInserted: ch
	    });
	  }

	  /** Appends char */
	  _appendChar(ch) {
	    let flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    let checkTail = arguments.length > 2 ? arguments[2] : undefined;
	    const consistentState = this.state;
	    let details;
	    [ch, details] = normalizePrepare(this.doPrepare(ch, flags));
	    details = details.aggregate(this._appendCharRaw(ch, flags));
	    if (details.inserted) {
	      let consistentTail;
	      let appended = this.doValidate(flags) !== false;
	      if (appended && checkTail != null) {
	        // validation ok, check tail
	        const beforeTailState = this.state;
	        if (this.overwrite === true) {
	          consistentTail = checkTail.state;
	          checkTail.unshift(this.value.length - details.tailShift);
	        }
	        let tailDetails = this.appendTail(checkTail);
	        appended = tailDetails.rawInserted === checkTail.toString();

	        // not ok, try shift
	        if (!(appended && tailDetails.inserted) && this.overwrite === 'shift') {
	          this.state = beforeTailState;
	          consistentTail = checkTail.state;
	          checkTail.shift();
	          tailDetails = this.appendTail(checkTail);
	          appended = tailDetails.rawInserted === checkTail.toString();
	        }

	        // if ok, rollback state after tail
	        if (appended && tailDetails.inserted) this.state = beforeTailState;
	      }

	      // revert all if something went wrong
	      if (!appended) {
	        details = new ChangeDetails();
	        this.state = consistentState;
	        if (checkTail && consistentTail) checkTail.state = consistentTail;
	      }
	    }
	    return details;
	  }

	  /** Appends optional placeholder at end */
	  _appendPlaceholder() {
	    return new ChangeDetails();
	  }

	  /** Appends optional eager placeholder at end */
	  _appendEager() {
	    return new ChangeDetails();
	  }

	  /** Appends symbols considering flags */
	  // $FlowFixMe no ideas
	  append(str, flags, tail) {
	    if (!isString(str)) throw new Error('value should be string');
	    const details = new ChangeDetails();
	    const checkTail = isString(tail) ? new ContinuousTailDetails(String(tail)) : tail;
	    if (flags !== null && flags !== void 0 && flags.tail) flags._beforeTailState = this.state;
	    for (let ci = 0; ci < str.length; ++ci) {
	      const d = this._appendChar(str[ci], flags, checkTail);
	      if (!d.rawInserted && !this.doSkipInvalid(str[ci], flags, checkTail)) break;
	      details.aggregate(d);
	    }

	    // append tail but aggregate only tailShift
	    if (checkTail != null) {
	      details.tailShift += this.appendTail(checkTail).tailShift;
	      // TODO it's a good idea to clear state after appending ends
	      // but it causes bugs when one append calls another (when dynamic dispatch set rawInputValue)
	      // this._resetBeforeTailState();
	    }

	    if ((this.eager === true || this.eager === 'append') && flags !== null && flags !== void 0 && flags.input && str) {
	      details.aggregate(this._appendEager());
	    }
	    return details;
	  }

	  /** */
	  remove() {
	    let fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    let toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	    this._value = this.value.slice(0, fromPos) + this.value.slice(toPos);
	    return new ChangeDetails();
	  }

	  /** Calls function and reapplies current value */
	  withValueRefresh(fn) {
	    if (this._refreshing || !this.isInitialized) return fn();
	    this._refreshing = true;
	    const rawInput = this.rawInputValue;
	    const value = this.value;
	    const ret = fn();
	    this.rawInputValue = rawInput;
	    // append lost trailing chars at end
	    if (this.value && this.value !== value && value.indexOf(this.value) === 0) {
	      this.append(value.slice(this.value.length), {}, '');
	    }
	    delete this._refreshing;
	    return ret;
	  }

	  /** */
	  runIsolated(fn) {
	    if (this._isolated || !this.isInitialized) return fn(this);
	    this._isolated = true;
	    const state = this.state;
	    const ret = fn(this);
	    this.state = state;
	    delete this._isolated;
	    return ret;
	  }

	  /** */
	  doSkipInvalid(ch) {
	    return this.skipInvalid;
	  }

	  /**
	    Prepares string before mask processing
	    @protected
	  */
	  doPrepare(str) {
	    let flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    return this.prepare ? this.prepare(str, this, flags) : str;
	  }

	  /**
	    Validates if value is acceptable
	    @protected
	  */
	  doValidate(flags) {
	    return (!this.validate || this.validate(this.value, this, flags)) && (!this.parent || this.parent.doValidate(flags));
	  }

	  /**
	    Does additional processing in the end of editing
	    @protected
	  */
	  doCommit() {
	    if (this.commit) this.commit(this.value, this);
	  }

	  /** */
	  doFormat(value) {
	    return this.format ? this.format(value, this) : value;
	  }

	  /** */
	  doParse(str) {
	    return this.parse ? this.parse(str, this) : str;
	  }

	  /** */
	  splice(start, deleteCount, inserted, removeDirection) {
	    let flags = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
	      input: true
	    };
	    const tailPos = start + deleteCount;
	    const tail = this.extractTail(tailPos);
	    const eagerRemove = this.eager === true || this.eager === 'remove';
	    let oldRawValue;
	    if (eagerRemove) {
	      removeDirection = forceDirection(removeDirection);
	      oldRawValue = this.extractInput(0, tailPos, {
	        raw: true
	      });
	    }
	    let startChangePos = start;
	    const details = new ChangeDetails();

	    // if it is just deletion without insertion
	    if (removeDirection !== DIRECTION.NONE) {
	      startChangePos = this.nearestInputPos(start, deleteCount > 1 && start !== 0 && !eagerRemove ? DIRECTION.NONE : removeDirection);

	      // adjust tailShift if start was aligned
	      details.tailShift = startChangePos - start;
	    }
	    details.aggregate(this.remove(startChangePos));
	    if (eagerRemove && removeDirection !== DIRECTION.NONE && oldRawValue === this.rawInputValue) {
	      if (removeDirection === DIRECTION.FORCE_LEFT) {
	        let valLength;
	        while (oldRawValue === this.rawInputValue && (valLength = this.value.length)) {
	          details.aggregate(new ChangeDetails({
	            tailShift: -1
	          })).aggregate(this.remove(valLength - 1));
	        }
	      } else if (removeDirection === DIRECTION.FORCE_RIGHT) {
	        tail.unshift();
	      }
	    }
	    return details.aggregate(this.append(inserted, flags, tail));
	  }
	  maskEquals(mask) {
	    return this.mask === mask;
	  }
	  typedValueEquals(value) {
	    const tval = this.typedValue;
	    return value === tval || Masked.EMPTY_VALUES.includes(value) && Masked.EMPTY_VALUES.includes(tval) || this.doFormat(value) === this.doFormat(this.typedValue);
	  }
	}
	Masked.DEFAULTS = {
	  format: String,
	  parse: v => v,
	  skipInvalid: true
	};
	Masked.EMPTY_VALUES = [undefined, null, ''];
	IMask.Masked = Masked;

	/** Get Masked class by mask type */
	function maskedClass(mask) {
	  if (mask == null) {
	    throw new Error('mask property should be defined');
	  }

	  // $FlowFixMe
	  if (mask instanceof RegExp) return IMask.MaskedRegExp;
	  // $FlowFixMe
	  if (isString(mask)) return IMask.MaskedPattern;
	  // $FlowFixMe
	  if (mask instanceof Date || mask === Date) return IMask.MaskedDate;
	  // $FlowFixMe
	  if (mask instanceof Number || typeof mask === 'number' || mask === Number) return IMask.MaskedNumber;
	  // $FlowFixMe
	  if (Array.isArray(mask) || mask === Array) return IMask.MaskedDynamic;
	  // $FlowFixMe
	  if (IMask.Masked && mask.prototype instanceof IMask.Masked) return mask;
	  // $FlowFixMe
	  if (mask instanceof IMask.Masked) return mask.constructor;
	  // $FlowFixMe
	  if (mask instanceof Function) return IMask.MaskedFunction;
	  console.warn('Mask not found for mask', mask); // eslint-disable-line no-console
	  // $FlowFixMe
	  return IMask.Masked;
	}

	/** Creates new {@link Masked} depending on mask type */
	function createMask(opts) {
	  // $FlowFixMe
	  if (IMask.Masked && opts instanceof IMask.Masked) return opts;
	  opts = Object.assign({}, opts);
	  const mask = opts.mask;

	  // $FlowFixMe
	  if (IMask.Masked && mask instanceof IMask.Masked) return mask;
	  const MaskedClass = maskedClass(mask);
	  if (!MaskedClass) throw new Error('Masked class is not found for provided mask, appropriate module needs to be import manually before creating mask.');
	  return new MaskedClass(opts);
	}
	IMask.createMask = createMask;

	const _excluded$4 = ["parent", "isOptional", "placeholderChar", "displayChar", "lazy", "eager"];

	/** */

	const DEFAULT_INPUT_DEFINITIONS = {
	  '0': /\d/,
	  'a': /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
	  // http://stackoverflow.com/a/22075070
	  '*': /./
	};

	/** */
	class PatternInputDefinition {
	  /** */

	  /** */

	  /** */

	  /** */

	  /** */

	  /** */

	  /** */

	  /** */

	  constructor(opts) {
	    const {
	        parent,
	        isOptional,
	        placeholderChar,
	        displayChar,
	        lazy,
	        eager
	      } = opts,
	      maskOpts = _objectWithoutPropertiesLoose(opts, _excluded$4);
	    this.masked = createMask(maskOpts);
	    Object.assign(this, {
	      parent,
	      isOptional,
	      placeholderChar,
	      displayChar,
	      lazy,
	      eager
	    });
	  }
	  reset() {
	    this.isFilled = false;
	    this.masked.reset();
	  }
	  remove() {
	    let fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    let toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	    if (fromPos === 0 && toPos >= 1) {
	      this.isFilled = false;
	      return this.masked.remove(fromPos, toPos);
	    }
	    return new ChangeDetails();
	  }
	  get value() {
	    return this.masked.value || (this.isFilled && !this.isOptional ? this.placeholderChar : '');
	  }
	  get unmaskedValue() {
	    return this.masked.unmaskedValue;
	  }
	  get displayValue() {
	    return this.masked.value && this.displayChar || this.value;
	  }
	  get isComplete() {
	    return Boolean(this.masked.value) || this.isOptional;
	  }
	  _appendChar(ch) {
	    let flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    if (this.isFilled) return new ChangeDetails();
	    const state = this.masked.state;
	    // simulate input
	    const details = this.masked._appendChar(ch, flags);
	    if (details.inserted && this.doValidate(flags) === false) {
	      details.inserted = details.rawInserted = '';
	      this.masked.state = state;
	    }
	    if (!details.inserted && !this.isOptional && !this.lazy && !flags.input) {
	      details.inserted = this.placeholderChar;
	    }
	    details.skip = !details.inserted && !this.isOptional;
	    this.isFilled = Boolean(details.inserted);
	    return details;
	  }
	  append() {
	    // TODO probably should be done via _appendChar
	    return this.masked.append(...arguments);
	  }
	  _appendPlaceholder() {
	    const details = new ChangeDetails();
	    if (this.isFilled || this.isOptional) return details;
	    this.isFilled = true;
	    details.inserted = this.placeholderChar;
	    return details;
	  }
	  _appendEager() {
	    return new ChangeDetails();
	  }
	  extractTail() {
	    return this.masked.extractTail(...arguments);
	  }
	  appendTail() {
	    return this.masked.appendTail(...arguments);
	  }
	  extractInput() {
	    let fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    let toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	    let flags = arguments.length > 2 ? arguments[2] : undefined;
	    return this.masked.extractInput(fromPos, toPos, flags);
	  }
	  nearestInputPos(cursorPos) {
	    let direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DIRECTION.NONE;
	    const minPos = 0;
	    const maxPos = this.value.length;
	    const boundPos = Math.min(Math.max(cursorPos, minPos), maxPos);
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
	  totalInputPositions() {
	    let fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    let toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	    return this.value.slice(fromPos, toPos).length;
	  }
	  doValidate() {
	    return this.masked.doValidate(...arguments) && (!this.parent || this.parent.doValidate(...arguments));
	  }
	  doCommit() {
	    this.masked.doCommit();
	  }
	  get state() {
	    return {
	      masked: this.masked.state,
	      isFilled: this.isFilled
	    };
	  }
	  set state(state) {
	    this.masked.state = state.masked;
	    this.isFilled = state.isFilled;
	  }
	}

	/** */

	class PatternFixedDefinition {
	  /** */

	  /** */

	  /** */

	  /** */

	  /** */

	  /** */

	  constructor(opts) {
	    Object.assign(this, opts);
	    this._value = '';
	    this.isFixed = true;
	  }
	  get value() {
	    return this._value;
	  }
	  get unmaskedValue() {
	    return this.isUnmasking ? this.value : '';
	  }
	  get displayValue() {
	    return this.value;
	  }
	  reset() {
	    this._isRawInput = false;
	    this._value = '';
	  }
	  remove() {
	    let fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    let toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._value.length;
	    this._value = this._value.slice(0, fromPos) + this._value.slice(toPos);
	    if (!this._value) this._isRawInput = false;
	    return new ChangeDetails();
	  }
	  nearestInputPos(cursorPos) {
	    let direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DIRECTION.NONE;
	    const minPos = 0;
	    const maxPos = this._value.length;
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
	  totalInputPositions() {
	    let fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    let toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._value.length;
	    return this._isRawInput ? toPos - fromPos : 0;
	  }
	  extractInput() {
	    let fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    let toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._value.length;
	    let flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    return flags.raw && this._isRawInput && this._value.slice(fromPos, toPos) || '';
	  }
	  get isComplete() {
	    return true;
	  }
	  get isFilled() {
	    return Boolean(this._value);
	  }
	  _appendChar(ch) {
	    let flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    const details = new ChangeDetails();
	    if (this.isFilled) return details;
	    const appendEager = this.eager === true || this.eager === 'append';
	    const appended = this.char === ch;
	    const isResolved = appended && (this.isUnmasking || flags.input || flags.raw) && (!flags.raw || !appendEager) && !flags.tail;
	    if (isResolved) details.rawInserted = this.char;
	    this._value = details.inserted = this.char;
	    this._isRawInput = isResolved && (flags.raw || flags.input);
	    return details;
	  }
	  _appendEager() {
	    return this._appendChar(this.char, {
	      tail: true
	    });
	  }
	  _appendPlaceholder() {
	    const details = new ChangeDetails();
	    if (this.isFilled) return details;
	    this._value = details.inserted = this.char;
	    return details;
	  }
	  extractTail() {
	    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	    return new ContinuousTailDetails('');
	  }

	  // $FlowFixMe no ideas
	  appendTail(tail) {
	    if (isString(tail)) tail = new ContinuousTailDetails(String(tail));
	    return tail.appendTo(this);
	  }
	  append(str, flags, tail) {
	    const details = this._appendChar(str[0], flags);
	    if (tail != null) {
	      details.tailShift += this.appendTail(tail).tailShift;
	    }
	    return details;
	  }
	  doCommit() {}
	  get state() {
	    return {
	      _value: this._value,
	      _isRawInput: this._isRawInput
	    };
	  }
	  set state(state) {
	    Object.assign(this, state);
	  }
	}

	const _excluded$3 = ["chunks"];
	class ChunksTailDetails {
	  /** */

	  constructor() {
	    let chunks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    let from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    this.chunks = chunks;
	    this.from = from;
	  }
	  toString() {
	    return this.chunks.map(String).join('');
	  }

	  // $FlowFixMe no ideas
	  extend(tailChunk) {
	    if (!String(tailChunk)) return;
	    if (isString(tailChunk)) tailChunk = new ContinuousTailDetails(String(tailChunk));
	    const lastChunk = this.chunks[this.chunks.length - 1];
	    const extendLast = lastChunk && (
	    // if stops are same or tail has no stop
	    lastChunk.stop === tailChunk.stop || tailChunk.stop == null) &&
	    // if tail chunk goes just after last chunk
	    tailChunk.from === lastChunk.from + lastChunk.toString().length;
	    if (tailChunk instanceof ContinuousTailDetails) {
	      // check the ability to extend previous chunk
	      if (extendLast) {
	        // extend previous chunk
	        lastChunk.extend(tailChunk.toString());
	      } else {
	        // append new chunk
	        this.chunks.push(tailChunk);
	      }
	    } else if (tailChunk instanceof ChunksTailDetails) {
	      if (tailChunk.stop == null) {
	        // unwrap floating chunks to parent, keeping `from` pos
	        let firstTailChunk;
	        while (tailChunk.chunks.length && tailChunk.chunks[0].stop == null) {
	          firstTailChunk = tailChunk.chunks.shift();
	          firstTailChunk.from += tailChunk.from;
	          this.extend(firstTailChunk);
	        }
	      }

	      // if tail chunk still has value
	      if (tailChunk.toString()) {
	        // if chunks contains stops, then popup stop to container
	        tailChunk.stop = tailChunk.blockIndex;
	        this.chunks.push(tailChunk);
	      }
	    }
	  }
	  appendTo(masked) {
	    // $FlowFixMe
	    if (!(masked instanceof IMask.MaskedPattern)) {
	      const tail = new ContinuousTailDetails(this.toString());
	      return tail.appendTo(masked);
	    }
	    const details = new ChangeDetails();
	    for (let ci = 0; ci < this.chunks.length && !details.skip; ++ci) {
	      const chunk = this.chunks[ci];
	      const lastBlockIter = masked._mapPosToBlock(masked.value.length);
	      const stop = chunk.stop;
	      let chunkBlock;
	      if (stop != null && (
	      // if block not found or stop is behind lastBlock
	      !lastBlockIter || lastBlockIter.index <= stop)) {
	        if (chunk instanceof ChunksTailDetails ||
	        // for continuous block also check if stop is exist
	        masked._stops.indexOf(stop) >= 0) {
	          const phDetails = masked._appendPlaceholder(stop);
	          details.aggregate(phDetails);
	        }
	        chunkBlock = chunk instanceof ChunksTailDetails && masked._blocks[stop];
	      }
	      if (chunkBlock) {
	        const tailDetails = chunkBlock.appendTail(chunk);
	        tailDetails.skip = false; // always ignore skip, it will be set on last
	        details.aggregate(tailDetails);
	        masked._value += tailDetails.inserted;

	        // get not inserted chars
	        const remainChars = chunk.toString().slice(tailDetails.rawInserted.length);
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
	  get state() {
	    return {
	      chunks: this.chunks.map(c => c.state),
	      from: this.from,
	      stop: this.stop,
	      blockIndex: this.blockIndex
	    };
	  }
	  set state(state) {
	    const {
	        chunks
	      } = state,
	      props = _objectWithoutPropertiesLoose(state, _excluded$3);
	    Object.assign(this, props);
	    this.chunks = chunks.map(cstate => {
	      const chunk = "chunks" in cstate ? new ChunksTailDetails() : new ContinuousTailDetails();
	      // $FlowFixMe already checked above
	      chunk.state = cstate;
	      return chunk;
	    });
	  }
	  unshift(beforePos) {
	    if (!this.chunks.length || beforePos != null && this.from >= beforePos) return '';
	    const chunkShiftPos = beforePos != null ? beforePos - this.from : beforePos;
	    let ci = 0;
	    while (ci < this.chunks.length) {
	      const chunk = this.chunks[ci];
	      const shiftChar = chunk.unshift(chunkShiftPos);
	      if (chunk.toString()) {
	        // chunk still contains value
	        // but not shifted - means no more available chars to shift
	        if (!shiftChar) break;
	        ++ci;
	      } else {
	        // clean if chunk has no value
	        this.chunks.splice(ci, 1);
	      }
	      if (shiftChar) return shiftChar;
	    }
	    return '';
	  }
	  shift() {
	    if (!this.chunks.length) return '';
	    let ci = this.chunks.length - 1;
	    while (0 <= ci) {
	      const chunk = this.chunks[ci];
	      const shiftChar = chunk.shift();
	      if (chunk.toString()) {
	        // chunk still contains value
	        // but not shifted - means no more available chars to shift
	        if (!shiftChar) break;
	        --ci;
	      } else {
	        // clean if chunk has no value
	        this.chunks.splice(ci, 1);
	      }
	      if (shiftChar) return shiftChar;
	    }
	    return '';
	  }
	}

	class PatternCursor {
	  constructor(masked, pos) {
	    this.masked = masked;
	    this._log = [];
	    const {
	      offset,
	      index
	    } = masked._mapPosToBlock(pos) || (pos < 0 ?
	    // first
	    {
	      index: 0,
	      offset: 0
	    } :
	    // last
	    {
	      index: this.masked._blocks.length,
	      offset: 0
	    });
	    this.offset = offset;
	    this.index = index;
	    this.ok = false;
	  }
	  get block() {
	    return this.masked._blocks[this.index];
	  }
	  get pos() {
	    return this.masked._blockStartPos(this.index) + this.offset;
	  }
	  get state() {
	    return {
	      index: this.index,
	      offset: this.offset,
	      ok: this.ok
	    };
	  }
	  set state(s) {
	    Object.assign(this, s);
	  }
	  pushState() {
	    this._log.push(this.state);
	  }
	  popState() {
	    const s = this._log.pop();
	    this.state = s;
	    return s;
	  }
	  bindBlock() {
	    if (this.block) return;
	    if (this.index < 0) {
	      this.index = 0;
	      this.offset = 0;
	    }
	    if (this.index >= this.masked._blocks.length) {
	      this.index = this.masked._blocks.length - 1;
	      this.offset = this.block.value.length;
	    }
	  }
	  _pushLeft(fn) {
	    this.pushState();
	    for (this.bindBlock(); 0 <= this.index; --this.index, this.offset = ((_this$block = this.block) === null || _this$block === void 0 ? void 0 : _this$block.value.length) || 0) {
	      var _this$block;
	      if (fn()) return this.ok = true;
	    }
	    return this.ok = false;
	  }
	  _pushRight(fn) {
	    this.pushState();
	    for (this.bindBlock(); this.index < this.masked._blocks.length; ++this.index, this.offset = 0) {
	      if (fn()) return this.ok = true;
	    }
	    return this.ok = false;
	  }
	  pushLeftBeforeFilled() {
	    return this._pushLeft(() => {
	      if (this.block.isFixed || !this.block.value) return;
	      this.offset = this.block.nearestInputPos(this.offset, DIRECTION.FORCE_LEFT);
	      if (this.offset !== 0) return true;
	    });
	  }
	  pushLeftBeforeInput() {
	    // cases:
	    // filled input: 00|
	    // optional empty input: 00[]|
	    // nested block: XX<[]>|
	    return this._pushLeft(() => {
	      if (this.block.isFixed) return;
	      this.offset = this.block.nearestInputPos(this.offset, DIRECTION.LEFT);
	      return true;
	    });
	  }
	  pushLeftBeforeRequired() {
	    return this._pushLeft(() => {
	      if (this.block.isFixed || this.block.isOptional && !this.block.value) return;
	      this.offset = this.block.nearestInputPos(this.offset, DIRECTION.LEFT);
	      return true;
	    });
	  }
	  pushRightBeforeFilled() {
	    return this._pushRight(() => {
	      if (this.block.isFixed || !this.block.value) return;
	      this.offset = this.block.nearestInputPos(this.offset, DIRECTION.FORCE_RIGHT);
	      if (this.offset !== this.block.value.length) return true;
	    });
	  }
	  pushRightBeforeInput() {
	    return this._pushRight(() => {
	      if (this.block.isFixed) return;

	      // const o = this.offset;
	      this.offset = this.block.nearestInputPos(this.offset, DIRECTION.NONE);
	      // HACK cases like (STILL DOES NOT WORK FOR NESTED)
	      // aa|X
	      // aa<X|[]>X_    - this will not work
	      // if (o && o === this.offset && this.block instanceof PatternInputDefinition) continue;
	      return true;
	    });
	  }
	  pushRightBeforeRequired() {
	    return this._pushRight(() => {
	      if (this.block.isFixed || this.block.isOptional && !this.block.value) return;

	      // TODO check |[*]XX_
	      this.offset = this.block.nearestInputPos(this.offset, DIRECTION.NONE);
	      return true;
	    });
	  }
	}

	/** Masking by RegExp */
	class MaskedRegExp extends Masked {
	  /**
	    @override
	    @param {Object} opts
	  */
	  _update(opts) {
	    if (opts.mask) opts.validate = value => value.search(opts.mask) >= 0;
	    super._update(opts);
	  }
	}
	IMask.MaskedRegExp = MaskedRegExp;

	const _excluded$2 = ["_blocks"];

	/**
	  Pattern mask
	  @param {Object} opts
	  @param {Object} opts.blocks
	  @param {Object} opts.definitions
	  @param {string} opts.placeholderChar
	  @param {string} opts.displayChar
	  @param {boolean} opts.lazy
	*/
	class MaskedPattern extends Masked {
	  /** */

	  /** */

	  /** Single char for empty input */

	  /** Single char for filled input */

	  /** Show placeholder only when needed */

	  constructor() {
	    let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    // TODO type $Shape<MaskedPatternOptions>={} does not work
	    opts.definitions = Object.assign({}, DEFAULT_INPUT_DEFINITIONS, opts.definitions);
	    super(Object.assign({}, MaskedPattern.DEFAULTS, opts));
	  }

	  /**
	    @override
	    @param {Object} opts
	  */
	  _update() {
	    let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    opts.definitions = Object.assign({}, this.definitions, opts.definitions);
	    super._update(opts);
	    this._rebuildMask();
	  }

	  /** */
	  _rebuildMask() {
	    const defs = this.definitions;
	    this._blocks = [];
	    this._stops = [];
	    this._maskedBlocks = {};
	    let pattern = this.mask;
	    if (!pattern || !defs) return;
	    let unmaskingBlock = false;
	    let optionalBlock = false;
	    for (let i = 0; i < pattern.length; ++i) {
	      var _defs$char, _defs$char2;
	      if (this.blocks) {
	        const p = pattern.slice(i);
	        const bNames = Object.keys(this.blocks).filter(bName => p.indexOf(bName) === 0);
	        // order by key length
	        bNames.sort((a, b) => b.length - a.length);
	        // use block name with max length
	        const bName = bNames[0];
	        if (bName) {
	          // $FlowFixMe no ideas
	          const maskedBlock = createMask(Object.assign({
	            parent: this,
	            lazy: this.lazy,
	            eager: this.eager,
	            placeholderChar: this.placeholderChar,
	            displayChar: this.displayChar,
	            overwrite: this.overwrite
	          }, this.blocks[bName]));
	          if (maskedBlock) {
	            this._blocks.push(maskedBlock);

	            // store block index
	            if (!this._maskedBlocks[bName]) this._maskedBlocks[bName] = [];
	            this._maskedBlocks[bName].push(this._blocks.length - 1);
	          }
	          i += bName.length - 1;
	          continue;
	        }
	      }
	      let char = pattern[i];
	      let isInput = (char in defs);
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
	        isInput = false;
	      }
	      const maskOpts = (_defs$char = defs[char]) !== null && _defs$char !== void 0 && _defs$char.mask && !(((_defs$char2 = defs[char]) === null || _defs$char2 === void 0 ? void 0 : _defs$char2.mask.prototype) instanceof IMask.Masked) ? defs[char] : {
	        mask: defs[char]
	      };
	      const def = isInput ? new PatternInputDefinition(Object.assign({
	        parent: this,
	        isOptional: optionalBlock,
	        lazy: this.lazy,
	        eager: this.eager,
	        placeholderChar: this.placeholderChar,
	        displayChar: this.displayChar
	      }, maskOpts)) : new PatternFixedDefinition({
	        char,
	        eager: this.eager,
	        isUnmasking: unmaskingBlock
	      });
	      this._blocks.push(def);
	    }
	  }

	  /**
	    @override
	  */
	  get state() {
	    return Object.assign({}, super.state, {
	      _blocks: this._blocks.map(b => b.state)
	    });
	  }
	  set state(state) {
	    const {
	        _blocks
	      } = state,
	      maskedState = _objectWithoutPropertiesLoose(state, _excluded$2);
	    this._blocks.forEach((b, bi) => b.state = _blocks[bi]);
	    super.state = maskedState;
	  }

	  /**
	    @override
	  */
	  reset() {
	    super.reset();
	    this._blocks.forEach(b => b.reset());
	  }

	  /**
	    @override
	  */
	  get isComplete() {
	    return this._blocks.every(b => b.isComplete);
	  }

	  /**
	    @override
	  */
	  get isFilled() {
	    return this._blocks.every(b => b.isFilled);
	  }
	  get isFixed() {
	    return this._blocks.every(b => b.isFixed);
	  }
	  get isOptional() {
	    return this._blocks.every(b => b.isOptional);
	  }

	  /**
	    @override
	  */
	  doCommit() {
	    this._blocks.forEach(b => b.doCommit());
	    super.doCommit();
	  }

	  /**
	    @override
	  */
	  get unmaskedValue() {
	    return this._blocks.reduce((str, b) => str += b.unmaskedValue, '');
	  }
	  set unmaskedValue(unmaskedValue) {
	    super.unmaskedValue = unmaskedValue;
	  }

	  /**
	    @override
	  */
	  get value() {
	    // TODO return _value when not in change?
	    return this._blocks.reduce((str, b) => str += b.value, '');
	  }
	  set value(value) {
	    super.value = value;
	  }
	  get displayValue() {
	    return this._blocks.reduce((str, b) => str += b.displayValue, '');
	  }

	  /**
	    @override
	  */
	  appendTail(tail) {
	    return super.appendTail(tail).aggregate(this._appendPlaceholder());
	  }

	  /**
	    @override
	  */
	  _appendEager() {
	    var _this$_mapPosToBlock;
	    const details = new ChangeDetails();
	    let startBlockIndex = (_this$_mapPosToBlock = this._mapPosToBlock(this.value.length)) === null || _this$_mapPosToBlock === void 0 ? void 0 : _this$_mapPosToBlock.index;
	    if (startBlockIndex == null) return details;

	    // TODO test if it works for nested pattern masks
	    if (this._blocks[startBlockIndex].isFilled) ++startBlockIndex;
	    for (let bi = startBlockIndex; bi < this._blocks.length; ++bi) {
	      const d = this._blocks[bi]._appendEager();
	      if (!d.inserted) break;
	      details.aggregate(d);
	    }
	    return details;
	  }

	  /**
	    @override
	  */
	  _appendCharRaw(ch) {
	    let flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    const blockIter = this._mapPosToBlock(this.value.length);
	    const details = new ChangeDetails();
	    if (!blockIter) return details;
	    for (let bi = blockIter.index;; ++bi) {
	      var _flags$_beforeTailSta, _flags$_beforeTailSta2;
	      const block = this._blocks[bi];
	      if (!block) break;
	      const blockDetails = block._appendChar(ch, Object.assign({}, flags, {
	        _beforeTailState: (_flags$_beforeTailSta = flags._beforeTailState) === null || _flags$_beforeTailSta === void 0 ? void 0 : (_flags$_beforeTailSta2 = _flags$_beforeTailSta._blocks) === null || _flags$_beforeTailSta2 === void 0 ? void 0 : _flags$_beforeTailSta2[bi]
	      }));
	      const skip = blockDetails.skip;
	      details.aggregate(blockDetails);
	      if (skip || blockDetails.rawInserted) break; // go next char
	    }

	    return details;
	  }

	  /**
	    @override
	  */
	  extractTail() {
	    let fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    let toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	    const chunkTail = new ChunksTailDetails();
	    if (fromPos === toPos) return chunkTail;
	    this._forEachBlocksInRange(fromPos, toPos, (b, bi, bFromPos, bToPos) => {
	      const blockChunk = b.extractTail(bFromPos, bToPos);
	      blockChunk.stop = this._findStopBefore(bi);
	      blockChunk.from = this._blockStartPos(bi);
	      if (blockChunk instanceof ChunksTailDetails) blockChunk.blockIndex = bi;
	      chunkTail.extend(blockChunk);
	    });
	    return chunkTail;
	  }

	  /**
	    @override
	  */
	  extractInput() {
	    let fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    let toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	    let flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    if (fromPos === toPos) return '';
	    let input = '';
	    this._forEachBlocksInRange(fromPos, toPos, (b, _, fromPos, toPos) => {
	      input += b.extractInput(fromPos, toPos, flags);
	    });
	    return input;
	  }
	  _findStopBefore(blockIndex) {
	    let stopBefore;
	    for (let si = 0; si < this._stops.length; ++si) {
	      const stop = this._stops[si];
	      if (stop <= blockIndex) stopBefore = stop;else break;
	    }
	    return stopBefore;
	  }

	  /** Appends placeholder depending on laziness */
	  _appendPlaceholder(toBlockIndex) {
	    const details = new ChangeDetails();
	    if (this.lazy && toBlockIndex == null) return details;
	    const startBlockIter = this._mapPosToBlock(this.value.length);
	    if (!startBlockIter) return details;
	    const startBlockIndex = startBlockIter.index;
	    const endBlockIndex = toBlockIndex != null ? toBlockIndex : this._blocks.length;
	    this._blocks.slice(startBlockIndex, endBlockIndex).forEach(b => {
	      if (!b.lazy || toBlockIndex != null) {
	        // $FlowFixMe `_blocks` may not be present
	        const args = b._blocks != null ? [b._blocks.length] : [];
	        const bDetails = b._appendPlaceholder(...args);
	        this._value += bDetails.inserted;
	        details.aggregate(bDetails);
	      }
	    });
	    return details;
	  }

	  /** Finds block in pos */
	  _mapPosToBlock(pos) {
	    let accVal = '';
	    for (let bi = 0; bi < this._blocks.length; ++bi) {
	      const block = this._blocks[bi];
	      const blockStartPos = accVal.length;
	      accVal += block.value;
	      if (pos <= accVal.length) {
	        return {
	          index: bi,
	          offset: pos - blockStartPos
	        };
	      }
	    }
	  }

	  /** */
	  _blockStartPos(blockIndex) {
	    return this._blocks.slice(0, blockIndex).reduce((pos, b) => pos += b.value.length, 0);
	  }

	  /** */
	  _forEachBlocksInRange(fromPos) {
	    let toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	    let fn = arguments.length > 2 ? arguments[2] : undefined;
	    const fromBlockIter = this._mapPosToBlock(fromPos);
	    if (fromBlockIter) {
	      const toBlockIter = this._mapPosToBlock(toPos);
	      // process first block
	      const isSameBlock = toBlockIter && fromBlockIter.index === toBlockIter.index;
	      const fromBlockStartPos = fromBlockIter.offset;
	      const fromBlockEndPos = toBlockIter && isSameBlock ? toBlockIter.offset : this._blocks[fromBlockIter.index].value.length;
	      fn(this._blocks[fromBlockIter.index], fromBlockIter.index, fromBlockStartPos, fromBlockEndPos);
	      if (toBlockIter && !isSameBlock) {
	        // process intermediate blocks
	        for (let bi = fromBlockIter.index + 1; bi < toBlockIter.index; ++bi) {
	          fn(this._blocks[bi], bi, 0, this._blocks[bi].value.length);
	        }

	        // process last block
	        fn(this._blocks[toBlockIter.index], toBlockIter.index, 0, toBlockIter.offset);
	      }
	    }
	  }

	  /**
	    @override
	  */
	  remove() {
	    let fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    let toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	    const removeDetails = super.remove(fromPos, toPos);
	    this._forEachBlocksInRange(fromPos, toPos, (b, _, bFromPos, bToPos) => {
	      removeDetails.aggregate(b.remove(bFromPos, bToPos));
	    });
	    return removeDetails;
	  }

	  /**
	    @override
	  */
	  nearestInputPos(cursorPos) {
	    let direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DIRECTION.NONE;
	    if (!this._blocks.length) return 0;
	    const cursor = new PatternCursor(this, cursorPos);
	    if (direction === DIRECTION.NONE) {
	      // -------------------------------------------------
	      // NONE should only go out from fixed to the right!
	      // -------------------------------------------------
	      if (cursor.pushRightBeforeInput()) return cursor.pos;
	      cursor.popState();
	      if (cursor.pushLeftBeforeInput()) return cursor.pos;
	      return this.value.length;
	    }

	    // FORCE is only about a|* otherwise is 0
	    if (direction === DIRECTION.LEFT || direction === DIRECTION.FORCE_LEFT) {
	      // try to break fast when *|a
	      if (direction === DIRECTION.LEFT) {
	        cursor.pushRightBeforeFilled();
	        if (cursor.ok && cursor.pos === cursorPos) return cursorPos;
	        cursor.popState();
	      }

	      // forward flow
	      cursor.pushLeftBeforeInput();
	      cursor.pushLeftBeforeRequired();
	      cursor.pushLeftBeforeFilled();

	      // backward flow
	      if (direction === DIRECTION.LEFT) {
	        cursor.pushRightBeforeInput();
	        cursor.pushRightBeforeRequired();
	        if (cursor.ok && cursor.pos <= cursorPos) return cursor.pos;
	        cursor.popState();
	        if (cursor.ok && cursor.pos <= cursorPos) return cursor.pos;
	        cursor.popState();
	      }
	      if (cursor.ok) return cursor.pos;
	      if (direction === DIRECTION.FORCE_LEFT) return 0;
	      cursor.popState();
	      if (cursor.ok) return cursor.pos;
	      cursor.popState();
	      if (cursor.ok) return cursor.pos;

	      // cursor.popState();
	      // if (
	      //   cursor.pushRightBeforeInput() &&
	      //   // TODO HACK for lazy if has aligned left inside fixed and has came to the start - use start position
	      //   (!this.lazy || this.extractInput())
	      // ) return cursor.pos;

	      return 0;
	    }
	    if (direction === DIRECTION.RIGHT || direction === DIRECTION.FORCE_RIGHT) {
	      // forward flow
	      cursor.pushRightBeforeInput();
	      cursor.pushRightBeforeRequired();
	      if (cursor.pushRightBeforeFilled()) return cursor.pos;
	      if (direction === DIRECTION.FORCE_RIGHT) return this.value.length;

	      // backward flow
	      cursor.popState();
	      if (cursor.ok) return cursor.pos;
	      cursor.popState();
	      if (cursor.ok) return cursor.pos;
	      return this.nearestInputPos(cursorPos, DIRECTION.LEFT);
	    }
	    return cursorPos;
	  }

	  /**
	    @override
	  */
	  totalInputPositions() {
	    let fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    let toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	    let total = 0;
	    this._forEachBlocksInRange(fromPos, toPos, (b, _, bFromPos, bToPos) => {
	      total += b.totalInputPositions(bFromPos, bToPos);
	    });
	    return total;
	  }

	  /** Get block by name */
	  maskedBlock(name) {
	    return this.maskedBlocks(name)[0];
	  }

	  /** Get all blocks by name */
	  maskedBlocks(name) {
	    const indices = this._maskedBlocks[name];
	    if (!indices) return [];
	    return indices.map(gi => this._blocks[gi]);
	  }
	}
	MaskedPattern.DEFAULTS = {
	  lazy: true,
	  placeholderChar: '_'
	};
	MaskedPattern.STOP_CHAR = '`';
	MaskedPattern.ESCAPE_CHAR = '\\';
	MaskedPattern.InputDefinition = PatternInputDefinition;
	MaskedPattern.FixedDefinition = PatternFixedDefinition;
	IMask.MaskedPattern = MaskedPattern;

	/** Pattern which accepts ranges */
	class MaskedRange extends MaskedPattern {
	  /**
	    Optionally sets max length of pattern.
	    Used when pattern length is longer then `to` param length. Pads zeros at start in this case.
	  */

	  /** Min bound */

	  /** Max bound */

	  /** */

	  get _matchFrom() {
	    return this.maxLength - String(this.from).length;
	  }

	  /**
	    @override
	  */
	  _update(opts) {
	    // TODO type
	    opts = Object.assign({
	      to: this.to || 0,
	      from: this.from || 0,
	      maxLength: this.maxLength || 0
	    }, opts);
	    let maxLength = String(opts.to).length;
	    if (opts.maxLength != null) maxLength = Math.max(maxLength, opts.maxLength);
	    opts.maxLength = maxLength;
	    const fromStr = String(opts.from).padStart(maxLength, '0');
	    const toStr = String(opts.to).padStart(maxLength, '0');
	    let sameCharsCount = 0;
	    while (sameCharsCount < toStr.length && toStr[sameCharsCount] === fromStr[sameCharsCount]) ++sameCharsCount;
	    opts.mask = toStr.slice(0, sameCharsCount).replace(/0/g, '\\0') + '0'.repeat(maxLength - sameCharsCount);
	    super._update(opts);
	  }

	  /**
	    @override
	  */
	  get isComplete() {
	    return super.isComplete && Boolean(this.value);
	  }
	  boundaries(str) {
	    let minstr = '';
	    let maxstr = '';
	    const [, placeholder, num] = str.match(/^(\D*)(\d*)(\D*)/) || [];
	    if (num) {
	      minstr = '0'.repeat(placeholder.length) + num;
	      maxstr = '9'.repeat(placeholder.length) + num;
	    }
	    minstr = minstr.padEnd(this.maxLength, '0');
	    maxstr = maxstr.padEnd(this.maxLength, '9');
	    return [minstr, maxstr];
	  }

	  // TODO str is a single char everytime
	  /**
	    @override
	  */
	  doPrepare(ch) {
	    let flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    let details;
	    [ch, details] = normalizePrepare(super.doPrepare(ch.replace(/\D/g, ''), flags));
	    if (!this.autofix || !ch) return ch;
	    const fromStr = String(this.from).padStart(this.maxLength, '0');
	    const toStr = String(this.to).padStart(this.maxLength, '0');
	    let nextVal = this.value + ch;
	    if (nextVal.length > this.maxLength) return '';
	    const [minstr, maxstr] = this.boundaries(nextVal);
	    if (Number(maxstr) < this.from) return fromStr[nextVal.length - 1];
	    if (Number(minstr) > this.to) {
	      if (this.autofix === 'pad' && nextVal.length < this.maxLength) {
	        return ['', details.aggregate(this.append(fromStr[nextVal.length - 1] + ch, flags))];
	      }
	      return toStr[nextVal.length - 1];
	    }
	    return ch;
	  }

	  /**
	    @override
	  */
	  doValidate() {
	    const str = this.value;
	    const firstNonZero = str.search(/[^0]/);
	    if (firstNonZero === -1 && str.length <= this._matchFrom) return true;
	    const [minstr, maxstr] = this.boundaries(str);
	    return this.from <= Number(maxstr) && Number(minstr) <= this.to && super.doValidate(...arguments);
	  }
	}
	IMask.MaskedRange = MaskedRange;

	/** Date mask */
	class MaskedDate extends MaskedPattern {
	  /** Pattern mask for date according to {@link MaskedDate#format} */

	  /** Start date */

	  /** End date */

	  /** */

	  /**
	    @param {Object} opts
	  */
	  constructor(opts) {
	    super(Object.assign({}, MaskedDate.DEFAULTS, opts));
	  }

	  /**
	    @override
	  */
	  _update(opts) {
	    if (opts.mask === Date) delete opts.mask;
	    if (opts.pattern) opts.mask = opts.pattern;
	    const blocks = opts.blocks;
	    opts.blocks = Object.assign({}, MaskedDate.GET_DEFAULT_BLOCKS());
	    // adjust year block
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
	    Object.assign(opts.blocks, this.blocks, blocks);

	    // add autofix
	    Object.keys(opts.blocks).forEach(bk => {
	      const b = opts.blocks[bk];
	      if (!('autofix' in b) && 'autofix' in opts) b.autofix = opts.autofix;
	    });
	    super._update(opts);
	  }

	  /**
	    @override
	  */
	  doValidate() {
	    const date = this.date;
	    return super.doValidate(...arguments) && (!this.isComplete || this.isDateExist(this.value) && date != null && (this.min == null || this.min <= date) && (this.max == null || date <= this.max));
	  }

	  /** Checks if date is exists */
	  isDateExist(str) {
	    return this.format(this.parse(str, this), this).indexOf(str) >= 0;
	  }

	  /** Parsed Date */
	  get date() {
	    return this.typedValue;
	  }
	  set date(date) {
	    this.typedValue = date;
	  }

	  /**
	    @override
	  */
	  get typedValue() {
	    return this.isComplete ? super.typedValue : null;
	  }
	  set typedValue(value) {
	    super.typedValue = value;
	  }

	  /**
	    @override
	  */
	  maskEquals(mask) {
	    return mask === Date || super.maskEquals(mask);
	  }
	}
	MaskedDate.DEFAULTS = {
	  pattern: 'd{.}`m{.}`Y',
	  format: date => {
	    if (!date) return '';
	    const day = String(date.getDate()).padStart(2, '0');
	    const month = String(date.getMonth() + 1).padStart(2, '0');
	    const year = date.getFullYear();
	    return [day, month, year].join('.');
	  },
	  parse: str => {
	    const [day, month, year] = str.split('.');
	    return new Date(year, month - 1, day);
	  }
	};
	MaskedDate.GET_DEFAULT_BLOCKS = () => ({
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
	});
	IMask.MaskedDate = MaskedDate;

	/**
	  Generic element API to use with mask
	  @interface
	*/
	class MaskElement {
	  /** */

	  /** */

	  /** */

	  /** Safely returns selection start */
	  get selectionStart() {
	    let start;
	    try {
	      start = this._unsafeSelectionStart;
	    } catch (e) {}
	    return start != null ? start : this.value.length;
	  }

	  /** Safely returns selection end */
	  get selectionEnd() {
	    let end;
	    try {
	      end = this._unsafeSelectionEnd;
	    } catch (e) {}
	    return end != null ? end : this.value.length;
	  }

	  /** Safely sets element selection */
	  select(start, end) {
	    if (start == null || end == null || start === this.selectionStart && end === this.selectionEnd) return;
	    try {
	      this._unsafeSelect(start, end);
	    } catch (e) {}
	  }

	  /** Should be overriden in subclasses */
	  _unsafeSelect(start, end) {}
	  /** Should be overriden in subclasses */
	  get isActive() {
	    return false;
	  }
	  /** Should be overriden in subclasses */
	  bindEvents(handlers) {}
	  /** Should be overriden in subclasses */
	  unbindEvents() {}
	}
	IMask.MaskElement = MaskElement;

	/** Bridge between HTMLElement and {@link Masked} */
	class HTMLMaskElement extends MaskElement {
	  /** Mapping between HTMLElement events and mask internal events */

	  /** HTMLElement to use mask on */

	  /**
	    @param {HTMLInputElement|HTMLTextAreaElement} input
	  */
	  constructor(input) {
	    super();
	    this.input = input;
	    this._handlers = {};
	  }

	  /** */
	  // $FlowFixMe https://github.com/facebook/flow/issues/2839
	  get rootElement() {
	    var _this$input$getRootNo, _this$input$getRootNo2, _this$input;
	    return (_this$input$getRootNo = (_this$input$getRootNo2 = (_this$input = this.input).getRootNode) === null || _this$input$getRootNo2 === void 0 ? void 0 : _this$input$getRootNo2.call(_this$input)) !== null && _this$input$getRootNo !== void 0 ? _this$input$getRootNo : document;
	  }

	  /**
	    Is element in focus
	    @readonly
	  */
	  get isActive() {
	    //$FlowFixMe
	    return this.input === this.rootElement.activeElement;
	  }

	  /**
	    Returns HTMLElement selection start
	    @override
	  */
	  get _unsafeSelectionStart() {
	    return this.input.selectionStart;
	  }

	  /**
	    Returns HTMLElement selection end
	    @override
	  */
	  get _unsafeSelectionEnd() {
	    return this.input.selectionEnd;
	  }

	  /**
	    Sets HTMLElement selection
	    @override
	  */
	  _unsafeSelect(start, end) {
	    this.input.setSelectionRange(start, end);
	  }

	  /**
	    HTMLElement value
	    @override
	  */
	  get value() {
	    return this.input.value;
	  }
	  set value(value) {
	    this.input.value = value;
	  }

	  /**
	    Binds HTMLElement events to mask internal events
	    @override
	  */
	  bindEvents(handlers) {
	    Object.keys(handlers).forEach(event => this._toggleEventHandler(HTMLMaskElement.EVENTS_MAP[event], handlers[event]));
	  }

	  /**
	    Unbinds HTMLElement events to mask internal events
	    @override
	  */
	  unbindEvents() {
	    Object.keys(this._handlers).forEach(event => this._toggleEventHandler(event));
	  }

	  /** */
	  _toggleEventHandler(event, handler) {
	    if (this._handlers[event]) {
	      this.input.removeEventListener(event, this._handlers[event]);
	      delete this._handlers[event];
	    }
	    if (handler) {
	      this.input.addEventListener(event, handler);
	      this._handlers[event] = handler;
	    }
	  }
	}
	HTMLMaskElement.EVENTS_MAP = {
	  selectionChange: 'keydown',
	  input: 'input',
	  drop: 'drop',
	  click: 'click',
	  focus: 'focus',
	  commit: 'blur'
	};
	IMask.HTMLMaskElement = HTMLMaskElement;

	class HTMLContenteditableMaskElement extends HTMLMaskElement {
	  /**
	    Returns HTMLElement selection start
	    @override
	  */
	  get _unsafeSelectionStart() {
	    const root = this.rootElement;
	    const selection = root.getSelection && root.getSelection();
	    const anchorOffset = selection && selection.anchorOffset;
	    const focusOffset = selection && selection.focusOffset;
	    if (focusOffset == null || anchorOffset == null || anchorOffset < focusOffset) {
	      return anchorOffset;
	    }
	    return focusOffset;
	  }

	  /**
	    Returns HTMLElement selection end
	    @override
	  */
	  get _unsafeSelectionEnd() {
	    const root = this.rootElement;
	    const selection = root.getSelection && root.getSelection();
	    const anchorOffset = selection && selection.anchorOffset;
	    const focusOffset = selection && selection.focusOffset;
	    if (focusOffset == null || anchorOffset == null || anchorOffset > focusOffset) {
	      return anchorOffset;
	    }
	    return focusOffset;
	  }

	  /**
	    Sets HTMLElement selection
	    @override
	  */
	  _unsafeSelect(start, end) {
	    if (!this.rootElement.createRange) return;
	    const range = this.rootElement.createRange();
	    range.setStart(this.input.firstChild || this.input, start);
	    range.setEnd(this.input.lastChild || this.input, end);
	    const root = this.rootElement;
	    const selection = root.getSelection && root.getSelection();
	    if (selection) {
	      selection.removeAllRanges();
	      selection.addRange(range);
	    }
	  }

	  /**
	    HTMLElement value
	    @override
	  */
	  get value() {
	    // $FlowFixMe
	    return this.input.textContent;
	  }
	  set value(value) {
	    this.input.textContent = value;
	  }
	}
	IMask.HTMLContenteditableMaskElement = HTMLContenteditableMaskElement;

	const _excluded$1 = ["mask"];

	/** Listens to element events and controls changes between element and {@link Masked} */
	class InputMask {
	  /**
	    View element
	    @readonly
	  */

	  /**
	    Internal {@link Masked} model
	    @readonly
	  */

	  /**
	    @param {MaskElement|HTMLInputElement|HTMLTextAreaElement} el
	    @param {Object} opts
	  */
	  constructor(el, opts) {
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

	    // refresh
	    this.updateValue();
	    this._onChange();
	  }

	  /** Read or update mask */
	  get mask() {
	    return this.masked.mask;
	  }
	  maskEquals(mask) {
	    var _this$masked;
	    return mask == null || ((_this$masked = this.masked) === null || _this$masked === void 0 ? void 0 : _this$masked.maskEquals(mask));
	  }
	  set mask(mask) {
	    if (this.maskEquals(mask)) return;

	    // $FlowFixMe No ideas ... after update
	    if (!(mask instanceof IMask.Masked) && this.masked.constructor === maskedClass(mask)) {
	      this.masked.updateOptions({
	        mask
	      });
	      return;
	    }
	    const masked = createMask({
	      mask
	    });
	    masked.unmaskedValue = this.masked.unmaskedValue;
	    this.masked = masked;
	  }

	  /** Raw value */
	  get value() {
	    return this._value;
	  }
	  set value(str) {
	    if (this.value === str) return;
	    this.masked.value = str;
	    this.updateControl();
	    this.alignCursor();
	  }

	  /** Unmasked value */
	  get unmaskedValue() {
	    return this._unmaskedValue;
	  }
	  set unmaskedValue(str) {
	    if (this.unmaskedValue === str) return;
	    this.masked.unmaskedValue = str;
	    this.updateControl();
	    this.alignCursor();
	  }

	  /** Typed unmasked value */
	  get typedValue() {
	    return this.masked.typedValue;
	  }
	  set typedValue(val) {
	    if (this.masked.typedValueEquals(val)) return;
	    this.masked.typedValue = val;
	    this.updateControl();
	    this.alignCursor();
	  }

	  /** Display value */
	  get displayValue() {
	    return this.masked.displayValue;
	  }

	  /**
	    Starts listening to element events
	    @protected
	  */
	  _bindEvents() {
	    this.el.bindEvents({
	      selectionChange: this._saveSelection,
	      input: this._onInput,
	      drop: this._onDrop,
	      click: this._onClick,
	      focus: this._onFocus,
	      commit: this._onChange
	    });
	  }

	  /**
	    Stops listening to element events
	    @protected
	   */
	  _unbindEvents() {
	    if (this.el) this.el.unbindEvents();
	  }

	  /**
	    Fires custom event
	    @protected
	   */
	  _fireEvent(ev) {
	    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }
	    const listeners = this._listeners[ev];
	    if (!listeners) return;
	    listeners.forEach(l => l(...args));
	  }

	  /**
	    Current selection start
	    @readonly
	  */
	  get selectionStart() {
	    return this._cursorChanging ? this._changingCursorPos : this.el.selectionStart;
	  }

	  /** Current cursor position */
	  get cursorPos() {
	    return this._cursorChanging ? this._changingCursorPos : this.el.selectionEnd;
	  }
	  set cursorPos(pos) {
	    if (!this.el || !this.el.isActive) return;
	    this.el.select(pos, pos);
	    this._saveSelection();
	  }

	  /**
	    Stores current selection
	    @protected
	  */
	  _saveSelection( /* ev */
	  ) {
	    if (this.displayValue !== this.el.value) {
	      console.warn('Element value was changed outside of mask. Syncronize mask using `mask.updateValue()` to work properly.'); // eslint-disable-line no-console
	    }

	    this._selection = {
	      start: this.selectionStart,
	      end: this.cursorPos
	    };
	  }

	  /** Syncronizes model value from view */
	  updateValue() {
	    this.masked.value = this.el.value;
	    this._value = this.masked.value;
	  }

	  /** Syncronizes view from model value, fires change events */
	  updateControl() {
	    const newUnmaskedValue = this.masked.unmaskedValue;
	    const newValue = this.masked.value;
	    const newDisplayValue = this.displayValue;
	    const isChanged = this.unmaskedValue !== newUnmaskedValue || this.value !== newValue;
	    this._unmaskedValue = newUnmaskedValue;
	    this._value = newValue;
	    if (this.el.value !== newDisplayValue) this.el.value = newDisplayValue;
	    if (isChanged) this._fireChangeEvents();
	  }

	  /** Updates options with deep equal check, recreates @{link Masked} model if mask type changes */
	  updateOptions(opts) {
	    const {
	        mask
	      } = opts,
	      restOpts = _objectWithoutPropertiesLoose(opts, _excluded$1);
	    const updateMask = !this.maskEquals(mask);
	    const updateOpts = !objectIncludes(this.masked, restOpts);
	    if (updateMask) this.mask = mask;
	    if (updateOpts) this.masked.updateOptions(restOpts);
	    if (updateMask || updateOpts) this.updateControl();
	  }

	  /** Updates cursor */
	  updateCursor(cursorPos) {
	    if (cursorPos == null) return;
	    this.cursorPos = cursorPos;

	    // also queue change cursor for mobile browsers
	    this._delayUpdateCursor(cursorPos);
	  }

	  /**
	    Delays cursor update to support mobile browsers
	    @private
	  */
	  _delayUpdateCursor(cursorPos) {
	    this._abortUpdateCursor();
	    this._changingCursorPos = cursorPos;
	    this._cursorChanging = setTimeout(() => {
	      if (!this.el) return; // if was destroyed
	      this.cursorPos = this._changingCursorPos;
	      this._abortUpdateCursor();
	    }, 10);
	  }

	  /**
	    Fires custom events
	    @protected
	  */
	  _fireChangeEvents() {
	    this._fireEvent('accept', this._inputEvent);
	    if (this.masked.isComplete) this._fireEvent('complete', this._inputEvent);
	  }

	  /**
	    Aborts delayed cursor update
	    @private
	  */
	  _abortUpdateCursor() {
	    if (this._cursorChanging) {
	      clearTimeout(this._cursorChanging);
	      delete this._cursorChanging;
	    }
	  }

	  /** Aligns cursor to nearest available position */
	  alignCursor() {
	    this.cursorPos = this.masked.nearestInputPos(this.masked.nearestInputPos(this.cursorPos, DIRECTION.LEFT));
	  }

	  /** Aligns cursor only if selection is empty */
	  alignCursorFriendly() {
	    if (this.selectionStart !== this.cursorPos) return; // skip if range is selected
	    this.alignCursor();
	  }

	  /** Adds listener on custom event */
	  on(ev, handler) {
	    if (!this._listeners[ev]) this._listeners[ev] = [];
	    this._listeners[ev].push(handler);
	    return this;
	  }

	  /** Removes custom event listener */
	  off(ev, handler) {
	    if (!this._listeners[ev]) return this;
	    if (!handler) {
	      delete this._listeners[ev];
	      return this;
	    }
	    const hIndex = this._listeners[ev].indexOf(handler);
	    if (hIndex >= 0) this._listeners[ev].splice(hIndex, 1);
	    return this;
	  }

	  /** Handles view input event */
	  _onInput(e) {
	    this._inputEvent = e;
	    this._abortUpdateCursor();

	    // fix strange IE behavior
	    if (!this._selection) return this.updateValue();
	    const details = new ActionDetails(
	    // new state
	    this.el.value, this.cursorPos,
	    // old state
	    this.displayValue, this._selection);
	    const oldRawValue = this.masked.rawInputValue;
	    const offset = this.masked.splice(details.startChangePos, details.removed.length, details.inserted, details.removeDirection, {
	      input: true,
	      raw: true
	    }).offset;

	    // force align in remove direction only if no input chars were removed
	    // otherwise we still need to align with NONE (to get out from fixed symbols for instance)
	    const removeDirection = oldRawValue === this.masked.rawInputValue ? details.removeDirection : DIRECTION.NONE;
	    let cursorPos = this.masked.nearestInputPos(details.startChangePos + offset, removeDirection);
	    if (removeDirection !== DIRECTION.NONE) cursorPos = this.masked.nearestInputPos(cursorPos, DIRECTION.NONE);
	    this.updateControl();
	    this.updateCursor(cursorPos);
	    delete this._inputEvent;
	  }

	  /** Handles view change event and commits model value */
	  _onChange() {
	    if (this.displayValue !== this.el.value) {
	      this.updateValue();
	    }
	    this.masked.doCommit();
	    this.updateControl();
	    this._saveSelection();
	  }

	  /** Handles view drop event, prevents by default */
	  _onDrop(ev) {
	    ev.preventDefault();
	    ev.stopPropagation();
	  }

	  /** Restore last selection on focus */
	  _onFocus(ev) {
	    this.alignCursorFriendly();
	  }

	  /** Restore last selection on focus */
	  _onClick(ev) {
	    this.alignCursorFriendly();
	  }

	  /** Unbind view events and removes element reference */
	  destroy() {
	    this._unbindEvents();
	    // $FlowFixMe why not do so?
	    this._listeners.length = 0;
	    // $FlowFixMe
	    delete this.el;
	  }
	}
	IMask.InputMask = InputMask;

	/** Pattern which validates enum values */
	class MaskedEnum extends MaskedPattern {
	  /**
	    @override
	    @param {Object} opts
	  */
	  _update(opts) {
	    // TODO type
	    if (opts.enum) opts.mask = '*'.repeat(opts.enum[0].length);
	    super._update(opts);
	  }

	  /**
	    @override
	  */
	  doValidate() {
	    return this.enum.some(e => e.indexOf(this.unmaskedValue) >= 0) && super.doValidate(...arguments);
	  }
	}
	IMask.MaskedEnum = MaskedEnum;

	/**
	  Number mask
	  @param {Object} opts
	  @param {string} opts.radix - Single char
	  @param {string} opts.thousandsSeparator - Single char
	  @param {Array<string>} opts.mapToRadix - Array of single chars
	  @param {number} opts.min
	  @param {number} opts.max
	  @param {number} opts.scale - Digits after point
	  @param {boolean} opts.signed - Allow negative
	  @param {boolean} opts.normalizeZeros - Flag to remove leading and trailing zeros in the end of editing
	  @param {boolean} opts.padFractionalZeros - Flag to pad trailing zeros after point in the end of editing
	*/
	class MaskedNumber extends Masked {
	  /** Single char */

	  /** Single char */

	  /** Array of single chars */

	  /** */

	  /** */

	  /** Digits after point */

	  /** */

	  /** Flag to remove leading and trailing zeros in the end of editing */

	  /** Flag to pad trailing zeros after point in the end of editing */

	  constructor(opts) {
	    super(Object.assign({}, MaskedNumber.DEFAULTS, opts));
	  }

	  /**
	    @override
	  */
	  _update(opts) {
	    super._update(opts);
	    this._updateRegExps();
	  }

	  /** */
	  _updateRegExps() {
	    let start = '^' + (this.allowNegative ? '[+|\\-]?' : '');
	    let mid = '\\d*';
	    let end = (this.scale ? "(".concat(escapeRegExp(this.radix), "\\d{0,").concat(this.scale, "})?") : '') + '$';
	    this._numberRegExp = new RegExp(start + mid + end);
	    this._mapToRadixRegExp = new RegExp("[".concat(this.mapToRadix.map(escapeRegExp).join(''), "]"), 'g');
	    this._thousandsSeparatorRegExp = new RegExp(escapeRegExp(this.thousandsSeparator), 'g');
	  }

	  /** */
	  _removeThousandsSeparators(value) {
	    return value.replace(this._thousandsSeparatorRegExp, '');
	  }

	  /** */
	  _insertThousandsSeparators(value) {
	    // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
	    const parts = value.split(this.radix);
	    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator);
	    return parts.join(this.radix);
	  }

	  /**
	    @override
	  */
	  doPrepare(ch) {
	    let flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    ch = this._removeThousandsSeparators(this.scale && this.mapToRadix.length && (
	    /*
	      radix should be mapped when
	      1) input is done from keyboard = flags.input && flags.raw
	      2) unmasked value is set = !flags.input && !flags.raw
	      and should not be mapped when
	      1) value is set = flags.input && !flags.raw
	      2) raw value is set = !flags.input && flags.raw
	    */
	    flags.input && flags.raw || !flags.input && !flags.raw) ? ch.replace(this._mapToRadixRegExp, this.radix) : ch);
	    const [prepCh, details] = normalizePrepare(super.doPrepare(ch, flags));
	    if (ch && !prepCh) details.skip = true;
	    return [prepCh, details];
	  }

	  /** */
	  _separatorsCount(to) {
	    let extendOnSeparators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	    let count = 0;
	    for (let pos = 0; pos < to; ++pos) {
	      if (this._value.indexOf(this.thousandsSeparator, pos) === pos) {
	        ++count;
	        if (extendOnSeparators) to += this.thousandsSeparator.length;
	      }
	    }
	    return count;
	  }

	  /** */
	  _separatorsCountFromSlice() {
	    let slice = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._value;
	    return this._separatorsCount(this._removeThousandsSeparators(slice).length, true);
	  }

	  /**
	    @override
	  */
	  extractInput() {
	    let fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    let toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	    let flags = arguments.length > 2 ? arguments[2] : undefined;
	    [fromPos, toPos] = this._adjustRangeWithSeparators(fromPos, toPos);
	    return this._removeThousandsSeparators(super.extractInput(fromPos, toPos, flags));
	  }

	  /**
	    @override
	  */
	  _appendCharRaw(ch) {
	    let flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    if (!this.thousandsSeparator) return super._appendCharRaw(ch, flags);
	    const prevBeforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;
	    const prevBeforeTailSeparatorsCount = this._separatorsCountFromSlice(prevBeforeTailValue);
	    this._value = this._removeThousandsSeparators(this.value);
	    const appendDetails = super._appendCharRaw(ch, flags);
	    this._value = this._insertThousandsSeparators(this._value);
	    const beforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;
	    const beforeTailSeparatorsCount = this._separatorsCountFromSlice(beforeTailValue);
	    appendDetails.tailShift += (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length;
	    appendDetails.skip = !appendDetails.rawInserted && ch === this.thousandsSeparator;
	    return appendDetails;
	  }

	  /** */
	  _findSeparatorAround(pos) {
	    if (this.thousandsSeparator) {
	      const searchFrom = pos - this.thousandsSeparator.length + 1;
	      const separatorPos = this.value.indexOf(this.thousandsSeparator, searchFrom);
	      if (separatorPos <= pos) return separatorPos;
	    }
	    return -1;
	  }
	  _adjustRangeWithSeparators(from, to) {
	    const separatorAroundFromPos = this._findSeparatorAround(from);
	    if (separatorAroundFromPos >= 0) from = separatorAroundFromPos;
	    const separatorAroundToPos = this._findSeparatorAround(to);
	    if (separatorAroundToPos >= 0) to = separatorAroundToPos + this.thousandsSeparator.length;
	    return [from, to];
	  }

	  /**
	    @override
	  */
	  remove() {
	    let fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    let toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	    [fromPos, toPos] = this._adjustRangeWithSeparators(fromPos, toPos);
	    const valueBeforePos = this.value.slice(0, fromPos);
	    const valueAfterPos = this.value.slice(toPos);
	    const prevBeforeTailSeparatorsCount = this._separatorsCount(valueBeforePos.length);
	    this._value = this._insertThousandsSeparators(this._removeThousandsSeparators(valueBeforePos + valueAfterPos));
	    const beforeTailSeparatorsCount = this._separatorsCountFromSlice(valueBeforePos);
	    return new ChangeDetails({
	      tailShift: (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length
	    });
	  }

	  /**
	    @override
	  */
	  nearestInputPos(cursorPos, direction) {
	    if (!this.thousandsSeparator) return cursorPos;
	    switch (direction) {
	      case DIRECTION.NONE:
	      case DIRECTION.LEFT:
	      case DIRECTION.FORCE_LEFT:
	        {
	          const separatorAtLeftPos = this._findSeparatorAround(cursorPos - 1);
	          if (separatorAtLeftPos >= 0) {
	            const separatorAtLeftEndPos = separatorAtLeftPos + this.thousandsSeparator.length;
	            if (cursorPos < separatorAtLeftEndPos || this.value.length <= separatorAtLeftEndPos || direction === DIRECTION.FORCE_LEFT) {
	              return separatorAtLeftPos;
	            }
	          }
	          break;
	        }
	      case DIRECTION.RIGHT:
	      case DIRECTION.FORCE_RIGHT:
	        {
	          const separatorAtRightPos = this._findSeparatorAround(cursorPos);
	          if (separatorAtRightPos >= 0) {
	            return separatorAtRightPos + this.thousandsSeparator.length;
	          }
	        }
	    }
	    return cursorPos;
	  }

	  /**
	    @override
	  */
	  doValidate(flags) {
	    // validate as string
	    let valid = Boolean(this._removeThousandsSeparators(this.value).match(this._numberRegExp));
	    if (valid) {
	      // validate as number
	      const number = this.number;
	      valid = valid && !isNaN(number) && (
	      // check min bound for negative values
	      this.min == null || this.min >= 0 || this.min <= this.number) && (
	      // check max bound for positive values
	      this.max == null || this.max <= 0 || this.number <= this.max);
	    }
	    return valid && super.doValidate(flags);
	  }

	  /**
	    @override
	  */
	  doCommit() {
	    if (this.value) {
	      const number = this.number;
	      let validnum = number;

	      // check bounds
	      if (this.min != null) validnum = Math.max(validnum, this.min);
	      if (this.max != null) validnum = Math.min(validnum, this.max);
	      if (validnum !== number) this.unmaskedValue = this.doFormat(validnum);
	      let formatted = this.value;
	      if (this.normalizeZeros) formatted = this._normalizeZeros(formatted);
	      if (this.padFractionalZeros && this.scale > 0) formatted = this._padFractionalZeros(formatted);
	      this._value = formatted;
	    }
	    super.doCommit();
	  }

	  /** */
	  _normalizeZeros(value) {
	    const parts = this._removeThousandsSeparators(value).split(this.radix);

	    // remove leading zeros
	    parts[0] = parts[0].replace(/^(\D*)(0*)(\d*)/, (match, sign, zeros, num) => sign + num);
	    // add leading zero
	    if (value.length && !/\d$/.test(parts[0])) parts[0] = parts[0] + '0';
	    if (parts.length > 1) {
	      parts[1] = parts[1].replace(/0*$/, ''); // remove trailing zeros
	      if (!parts[1].length) parts.length = 1; // remove fractional
	    }

	    return this._insertThousandsSeparators(parts.join(this.radix));
	  }

	  /** */
	  _padFractionalZeros(value) {
	    if (!value) return value;
	    const parts = value.split(this.radix);
	    if (parts.length < 2) parts.push('');
	    parts[1] = parts[1].padEnd(this.scale, '0');
	    return parts.join(this.radix);
	  }

	  /** */
	  doSkipInvalid(ch) {
	    let flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    let checkTail = arguments.length > 2 ? arguments[2] : undefined;
	    const dropFractional = this.scale === 0 && ch !== this.thousandsSeparator && (ch === this.radix || ch === MaskedNumber.UNMASKED_RADIX || this.mapToRadix.includes(ch));
	    return super.doSkipInvalid(ch, flags, checkTail) && !dropFractional;
	  }

	  /**
	    @override
	  */
	  get unmaskedValue() {
	    return this._removeThousandsSeparators(this._normalizeZeros(this.value)).replace(this.radix, MaskedNumber.UNMASKED_RADIX);
	  }
	  set unmaskedValue(unmaskedValue) {
	    super.unmaskedValue = unmaskedValue;
	  }

	  /**
	    @override
	  */
	  get typedValue() {
	    return this.doParse(this.unmaskedValue);
	  }
	  set typedValue(n) {
	    this.rawInputValue = this.doFormat(n).replace(MaskedNumber.UNMASKED_RADIX, this.radix);
	  }

	  /** Parsed Number */
	  get number() {
	    return this.typedValue;
	  }
	  set number(number) {
	    this.typedValue = number;
	  }

	  /**
	    Is negative allowed
	    @readonly
	  */
	  get allowNegative() {
	    return this.signed || this.min != null && this.min < 0 || this.max != null && this.max < 0;
	  }

	  /**
	    @override
	  */
	  typedValueEquals(value) {
	    // handle  0 -> '' case (typed = 0 even if value = '')
	    // for details see https://github.com/uNmAnNeR/imaskjs/issues/134
	    return (super.typedValueEquals(value) || MaskedNumber.EMPTY_VALUES.includes(value) && MaskedNumber.EMPTY_VALUES.includes(this.typedValue)) && !(value === 0 && this.value === '');
	  }
	}
	MaskedNumber.UNMASKED_RADIX = '.';
	MaskedNumber.DEFAULTS = {
	  radix: ',',
	  thousandsSeparator: '',
	  mapToRadix: [MaskedNumber.UNMASKED_RADIX],
	  scale: 2,
	  signed: false,
	  normalizeZeros: true,
	  padFractionalZeros: false,
	  parse: Number,
	  format: n => n.toLocaleString('en-US', {
	    useGrouping: false,
	    maximumFractionDigits: 20
	  })
	};
	MaskedNumber.EMPTY_VALUES = [...Masked.EMPTY_VALUES, 0];
	IMask.MaskedNumber = MaskedNumber;

	/** Masking by custom Function */
	class MaskedFunction extends Masked {
	  /**
	    @override
	    @param {Object} opts
	  */
	  _update(opts) {
	    if (opts.mask) opts.validate = opts.mask;
	    super._update(opts);
	  }
	}
	IMask.MaskedFunction = MaskedFunction;

	const _excluded = ["compiledMasks", "currentMaskRef", "currentMask"],
	  _excluded2 = ["mask"];
	/** Dynamic mask for choosing apropriate mask in run-time */
	class MaskedDynamic extends Masked {
	  /** Currently chosen mask */

	  /** Compliled {@link Masked} options */

	  /** Chooses {@link Masked} depending on input value */

	  /**
	    @param {Object} opts
	  */
	  constructor(opts) {
	    super(Object.assign({}, MaskedDynamic.DEFAULTS, opts));
	    this.currentMask = null;
	  }

	  /**
	    @override
	  */
	  _update(opts) {
	    super._update(opts);
	    if ('mask' in opts) {
	      // mask could be totally dynamic with only `dispatch` option
	      this.compiledMasks = Array.isArray(opts.mask) ? opts.mask.map(m => createMask(m)) : [];

	      // this.currentMask = this.doDispatch(''); // probably not needed but lets see
	    }
	  }

	  /**
	    @override
	  */
	  _appendCharRaw(ch) {
	    let flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    const details = this._applyDispatch(ch, flags);
	    if (this.currentMask) {
	      details.aggregate(this.currentMask._appendChar(ch, this.currentMaskFlags(flags)));
	    }
	    return details;
	  }
	  _applyDispatch() {
	    let appended = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    let flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    let tail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	    const prevValueBeforeTail = flags.tail && flags._beforeTailState != null ? flags._beforeTailState._value : this.value;
	    const inputValue = this.rawInputValue;
	    const insertValue = flags.tail && flags._beforeTailState != null ?
	    // $FlowFixMe - tired to fight with type system
	    flags._beforeTailState._rawInputValue : inputValue;
	    const tailValue = inputValue.slice(insertValue.length);
	    const prevMask = this.currentMask;
	    const details = new ChangeDetails();
	    const prevMaskState = prevMask === null || prevMask === void 0 ? void 0 : prevMask.state;

	    // clone flags to prevent overwriting `_beforeTailState`
	    this.currentMask = this.doDispatch(appended, Object.assign({}, flags), tail);

	    // restore state after dispatch
	    if (this.currentMask) {
	      if (this.currentMask !== prevMask) {
	        // if mask changed reapply input
	        this.currentMask.reset();
	        if (insertValue) {
	          // $FlowFixMe - it's ok, we don't change current mask above
	          const d = this.currentMask.append(insertValue, {
	            raw: true
	          });
	          details.tailShift = d.inserted.length - prevValueBeforeTail.length;
	        }
	        if (tailValue) {
	          // $FlowFixMe - it's ok, we don't change current mask above
	          details.tailShift += this.currentMask.append(tailValue, {
	            raw: true,
	            tail: true
	          }).tailShift;
	        }
	      } else {
	        // Dispatch can do something bad with state, so
	        // restore prev mask state
	        this.currentMask.state = prevMaskState;
	      }
	    }
	    return details;
	  }
	  _appendPlaceholder() {
	    const details = this._applyDispatch(...arguments);
	    if (this.currentMask) {
	      details.aggregate(this.currentMask._appendPlaceholder());
	    }
	    return details;
	  }

	  /**
	   @override
	  */
	  _appendEager() {
	    const details = this._applyDispatch(...arguments);
	    if (this.currentMask) {
	      details.aggregate(this.currentMask._appendEager());
	    }
	    return details;
	  }
	  appendTail(tail) {
	    const details = new ChangeDetails();
	    if (tail) details.aggregate(this._applyDispatch('', {}, tail));
	    return details.aggregate(this.currentMask ? this.currentMask.appendTail(tail) : super.appendTail(tail));
	  }
	  currentMaskFlags(flags) {
	    var _flags$_beforeTailSta, _flags$_beforeTailSta2;
	    return Object.assign({}, flags, {
	      _beforeTailState: ((_flags$_beforeTailSta = flags._beforeTailState) === null || _flags$_beforeTailSta === void 0 ? void 0 : _flags$_beforeTailSta.currentMaskRef) === this.currentMask && ((_flags$_beforeTailSta2 = flags._beforeTailState) === null || _flags$_beforeTailSta2 === void 0 ? void 0 : _flags$_beforeTailSta2.currentMask) || flags._beforeTailState
	    });
	  }

	  /**
	    @override
	  */
	  doDispatch(appended) {
	    let flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    let tail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	    return this.dispatch(appended, this, flags, tail);
	  }

	  /**
	    @override
	  */
	  doValidate(flags) {
	    return super.doValidate(flags) && (!this.currentMask || this.currentMask.doValidate(this.currentMaskFlags(flags)));
	  }

	  /**
	    @override
	  */
	  doPrepare(str) {
	    let flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    let [s, details] = normalizePrepare(super.doPrepare(str, flags));
	    if (this.currentMask) {
	      let currentDetails;
	      [s, currentDetails] = normalizePrepare(super.doPrepare(s, this.currentMaskFlags(flags)));
	      details = details.aggregate(currentDetails);
	    }
	    return [s, details];
	  }

	  /**
	    @override
	  */
	  reset() {
	    var _this$currentMask;
	    (_this$currentMask = this.currentMask) === null || _this$currentMask === void 0 ? void 0 : _this$currentMask.reset();
	    this.compiledMasks.forEach(m => m.reset());
	  }

	  /**
	    @override
	  */
	  get value() {
	    return this.currentMask ? this.currentMask.value : '';
	  }
	  set value(value) {
	    super.value = value;
	  }

	  /**
	    @override
	  */
	  get unmaskedValue() {
	    return this.currentMask ? this.currentMask.unmaskedValue : '';
	  }
	  set unmaskedValue(unmaskedValue) {
	    super.unmaskedValue = unmaskedValue;
	  }

	  /**
	    @override
	  */
	  get typedValue() {
	    return this.currentMask ? this.currentMask.typedValue : '';
	  }

	  // probably typedValue should not be used with dynamic
	  set typedValue(value) {
	    let unmaskedValue = String(value);

	    // double check it
	    if (this.currentMask) {
	      this.currentMask.typedValue = value;
	      unmaskedValue = this.currentMask.unmaskedValue;
	    }
	    this.unmaskedValue = unmaskedValue;
	  }
	  get displayValue() {
	    return this.currentMask ? this.currentMask.displayValue : '';
	  }

	  /**
	    @override
	  */
	  get isComplete() {
	    var _this$currentMask2;
	    return Boolean((_this$currentMask2 = this.currentMask) === null || _this$currentMask2 === void 0 ? void 0 : _this$currentMask2.isComplete);
	  }

	  /**
	    @override
	  */
	  get isFilled() {
	    var _this$currentMask3;
	    return Boolean((_this$currentMask3 = this.currentMask) === null || _this$currentMask3 === void 0 ? void 0 : _this$currentMask3.isFilled);
	  }

	  /**
	    @override
	  */
	  remove() {
	    const details = new ChangeDetails();
	    if (this.currentMask) {
	      details.aggregate(this.currentMask.remove(...arguments))
	      // update with dispatch
	      .aggregate(this._applyDispatch());
	    }
	    return details;
	  }

	  /**
	    @override
	  */
	  get state() {
	    var _this$currentMask4;
	    return Object.assign({}, super.state, {
	      _rawInputValue: this.rawInputValue,
	      compiledMasks: this.compiledMasks.map(m => m.state),
	      currentMaskRef: this.currentMask,
	      currentMask: (_this$currentMask4 = this.currentMask) === null || _this$currentMask4 === void 0 ? void 0 : _this$currentMask4.state
	    });
	  }
	  set state(state) {
	    const {
	        compiledMasks,
	        currentMaskRef,
	        currentMask
	      } = state,
	      maskedState = _objectWithoutPropertiesLoose(state, _excluded);
	    this.compiledMasks.forEach((m, mi) => m.state = compiledMasks[mi]);
	    if (currentMaskRef != null) {
	      this.currentMask = currentMaskRef;
	      this.currentMask.state = currentMask;
	    }
	    super.state = maskedState;
	  }

	  /**
	    @override
	  */
	  extractInput() {
	    return this.currentMask ? this.currentMask.extractInput(...arguments) : '';
	  }

	  /**
	    @override
	  */
	  extractTail() {
	    return this.currentMask ? this.currentMask.extractTail(...arguments) : super.extractTail(...arguments);
	  }

	  /**
	    @override
	  */
	  doCommit() {
	    if (this.currentMask) this.currentMask.doCommit();
	    super.doCommit();
	  }

	  /**
	    @override
	  */
	  nearestInputPos() {
	    return this.currentMask ? this.currentMask.nearestInputPos(...arguments) : super.nearestInputPos(...arguments);
	  }
	  get overwrite() {
	    return this.currentMask ? this.currentMask.overwrite : super.overwrite;
	  }
	  set overwrite(overwrite) {
	    console.warn('"overwrite" option is not available in dynamic mask, use this option in siblings');
	  }
	  get eager() {
	    return this.currentMask ? this.currentMask.eager : super.eager;
	  }
	  set eager(eager) {
	    console.warn('"eager" option is not available in dynamic mask, use this option in siblings');
	  }
	  get skipInvalid() {
	    return this.currentMask ? this.currentMask.skipInvalid : super.skipInvalid;
	  }
	  set skipInvalid(skipInvalid) {
	    if (this.isInitialized || skipInvalid !== Masked.DEFAULTS.skipInvalid) {
	      console.warn('"skipInvalid" option is not available in dynamic mask, use this option in siblings');
	    }
	  }

	  /**
	    @override
	  */
	  maskEquals(mask) {
	    return Array.isArray(mask) && this.compiledMasks.every((m, mi) => {
	      if (!mask[mi]) return;
	      const _mask$mi = mask[mi],
	        {
	          mask: oldMask
	        } = _mask$mi,
	        restOpts = _objectWithoutPropertiesLoose(_mask$mi, _excluded2);
	      return objectIncludes(m, restOpts) && m.maskEquals(oldMask);
	    });
	  }

	  /**
	    @override
	  */
	  typedValueEquals(value) {
	    var _this$currentMask5;
	    return Boolean((_this$currentMask5 = this.currentMask) === null || _this$currentMask5 === void 0 ? void 0 : _this$currentMask5.typedValueEquals(value));
	  }
	}
	MaskedDynamic.DEFAULTS = {
	  dispatch: (appended, masked, flags, tail) => {
	    if (!masked.compiledMasks.length) return;
	    const inputValue = masked.rawInputValue;

	    // simulate input
	    const inputs = masked.compiledMasks.map((m, index) => {
	      const isCurrent = masked.currentMask === m;
	      const startInputPos = isCurrent ? m.value.length : m.nearestInputPos(m.value.length, DIRECTION.FORCE_LEFT);
	      if (m.rawInputValue !== inputValue) {
	        m.reset();
	        m.append(inputValue, {
	          raw: true
	        });
	      } else if (!isCurrent) {
	        m.remove(startInputPos);
	      }
	      m.append(appended, masked.currentMaskFlags(flags));
	      m.appendTail(tail);
	      return {
	        index,
	        weight: m.rawInputValue.length,
	        totalInputPositions: m.totalInputPositions(0, Math.max(startInputPos, m.nearestInputPos(m.value.length, DIRECTION.FORCE_LEFT)))
	      };
	    });

	    // pop masks with longer values first
	    inputs.sort((i1, i2) => i2.weight - i1.weight || i2.totalInputPositions - i1.totalInputPositions);
	    return masked.compiledMasks[inputs[0].index];
	  }
	};
	IMask.MaskedDynamic = MaskedDynamic;

	/** Mask pipe source and destination types */
	const PIPE_TYPE = {
	  MASKED: 'value',
	  UNMASKED: 'unmaskedValue',
	  TYPED: 'typedValue'
	};

	/** Creates new pipe function depending on mask type, source and destination options */
	function createPipe(mask) {
	  let from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PIPE_TYPE.MASKED;
	  let to = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PIPE_TYPE.MASKED;
	  const masked = createMask(mask);
	  return value => masked.runIsolated(m => {
	    m[from] = value;
	    return m[to];
	  });
	}

	/** Pipes value through mask depending on mask type, source and destination options */
	function pipe(value) {
	  for (var _len = arguments.length, pipeArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    pipeArgs[_key - 1] = arguments[_key];
	  }
	  return createPipe(...pipeArgs)(value);
	}
	IMask.PIPE_TYPE = PIPE_TYPE;
	IMask.createPipe = createPipe;
	IMask.pipe = pipe;

	try {
	  globalThis.IMask = IMask;
	} catch (e) {}

	// Input mask plugin

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
	var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
	  return acc.concat([placement + "-" + start, placement + "-" + end]);
	}, []);
	var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
	  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
	}, []); // modifiers that need to read the DOM

	var beforeRead = 'beforeRead';
	var read = 'read';
	var afterRead = 'afterRead'; // pure-logic modifiers

	var beforeMain = 'beforeMain';
	var main = 'main';
	var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

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
	  // IE 11 has no ShadowRoot
	  if (typeof ShadowRoot === 'undefined') {
	    return false;
	  }

	  var OwnElement = getWindow(node).ShadowRoot;
	  return node instanceof OwnElement || node instanceof ShadowRoot;
	}

	// and applies them to the HTMLElements such as popper and arrow

	function applyStyles(_ref) {
	  var state = _ref.state;
	  Object.keys(state.elements).forEach(function (name) {
	    var style = state.styles[name] || {};
	    var attributes = state.attributes[name] || {};
	    var element = state.elements[name]; // arrow is optional + virtual elements

	    if (!isHTMLElement(element) || !getNodeName(element)) {
	      return;
	    } // Flow doesn't support to extend this property, but it's the most
	    // effective way to apply styles to an HTMLElement
	    // $FlowFixMe[cannot-write]


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
	      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

	      var style = styleProperties.reduce(function (style, property) {
	        style[property] = '';
	        return style;
	      }, {}); // arrow is optional + virtual elements

	      if (!isHTMLElement(element) || !getNodeName(element)) {
	        return;
	      }

	      Object.assign(element.style, style);
	      Object.keys(attributes).forEach(function (attribute) {
	        element.removeAttribute(attribute);
	      });
	    });
	  };
	} // eslint-disable-next-line import/no-unused-modules


	const applyStyles$1 = {
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

	var max = Math.max;
	var min = Math.min;
	var round = Math.round;

	function getUAString() {
	  var uaData = navigator.userAgentData;

	  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
	    return uaData.brands.map(function (item) {
	      return item.brand + "/" + item.version;
	    }).join(' ');
	  }

	  return navigator.userAgent;
	}

	function isLayoutViewport() {
	  return !/^((?!chrome|android).)*safari/i.test(getUAString());
	}

	function getBoundingClientRect(element, includeScale, isFixedStrategy) {
	  if (includeScale === void 0) {
	    includeScale = false;
	  }

	  if (isFixedStrategy === void 0) {
	    isFixedStrategy = false;
	  }

	  var clientRect = element.getBoundingClientRect();
	  var scaleX = 1;
	  var scaleY = 1;

	  if (includeScale && isHTMLElement(element)) {
	    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
	    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
	  }

	  var _ref = isElement$1(element) ? getWindow(element) : window,
	      visualViewport = _ref.visualViewport;

	  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
	  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
	  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
	  var width = clientRect.width / scaleX;
	  var height = clientRect.height / scaleY;
	  return {
	    width: width,
	    height: height,
	    top: y,
	    right: x + width,
	    bottom: y + height,
	    left: x,
	    x: x,
	    y: y
	  };
	}

	// means it doesn't take into account transforms.

	function getLayoutRect(element) {
	  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
	  // Fixes https://github.com/popperjs/popper-core/issues/1223

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
	  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

	  if (parent.contains(child)) {
	    return true;
	  } // then fallback to custom implementation with Shadow DOM support
	  else if (rootNode && isShadowRoot(rootNode)) {
	      var next = child;

	      do {
	        if (next && parent.isSameNode(next)) {
	          return true;
	        } // $FlowFixMe[prop-missing]: need a better way to handle this...


	        next = next.parentNode || next.host;
	      } while (next);
	    } // Give up, the result is false


	  return false;
	}

	function getComputedStyle$1(element) {
	  return getWindow(element).getComputedStyle(element);
	}

	function isTableElement(element) {
	  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
	}

	function getDocumentElement(element) {
	  // $FlowFixMe[incompatible-return]: assume body is always available
	  return ((isElement$1(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
	  element.document) || window.document).documentElement;
	}

	function getParentNode(element) {
	  if (getNodeName(element) === 'html') {
	    return element;
	  }

	  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
	    // $FlowFixMe[incompatible-return]
	    // $FlowFixMe[prop-missing]
	    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
	    element.parentNode || ( // DOM Element detected
	    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
	    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
	    getDocumentElement(element) // fallback

	  );
	}

	function getTrueOffsetParent(element) {
	  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
	  getComputedStyle$1(element).position === 'fixed') {
	    return null;
	  }

	  return element.offsetParent;
	} // `.offsetParent` reports `null` for fixed elements, while absolute elements
	// return the containing block


	function getContainingBlock(element) {
	  var isFirefox = /firefox/i.test(getUAString());
	  var isIE = /Trident/i.test(getUAString());

	  if (isIE && isHTMLElement(element)) {
	    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
	    var elementCss = getComputedStyle$1(element);

	    if (elementCss.position === 'fixed') {
	      return null;
	    }
	  }

	  var currentNode = getParentNode(element);

	  if (isShadowRoot(currentNode)) {
	    currentNode = currentNode.host;
	  }

	  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
	    var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
	    // create a containing block.
	    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

	    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
	      return currentNode;
	    } else {
	      currentNode = currentNode.parentNode;
	    }
	  }

	  return null;
	} // Gets the closest ancestor positioned element. Handles some edge cases,
	// such as table ancestors and cross browser bugs.


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

	function within(min$1, value, max$1) {
	  return max(min$1, min(value, max$1));
	}
	function withinMaxClamp(min, value, max) {
	  var v = within(min, value, max);
	  return v > max ? max : v;
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
	  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
	  // outside of the popper bounds

	  var min = paddingObject[minProp];
	  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
	  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
	  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

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
	  } // CSS selector


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
	} // eslint-disable-next-line import/no-unused-modules


	const arrow$1 = {
	  name: 'arrow',
	  enabled: true,
	  phase: 'main',
	  fn: arrow,
	  effect: effect$1,
	  requires: ['popperOffsets'],
	  requiresIfExists: ['preventOverflow']
	};

	function getVariation(placement) {
	  return placement.split('-')[1];
	}

	var unsetSides = {
	  top: 'auto',
	  right: 'auto',
	  bottom: 'auto',
	  left: 'auto'
	}; // Round the offsets to the nearest suitable subpixel based on the DPR.
	// Zooming can change the DPR, but it seems to report a value that will
	// cleanly divide the values into the appropriate subpixels.

	function roundOffsetsByDPR(_ref, win) {
	  var x = _ref.x,
	      y = _ref.y;
	  var dpr = win.devicePixelRatio || 1;
	  return {
	    x: round(x * dpr) / dpr || 0,
	    y: round(y * dpr) / dpr || 0
	  };
	}

	function mapToStyles(_ref2) {
	  var _Object$assign2;

	  var popper = _ref2.popper,
	      popperRect = _ref2.popperRect,
	      placement = _ref2.placement,
	      variation = _ref2.variation,
	      offsets = _ref2.offsets,
	      position = _ref2.position,
	      gpuAcceleration = _ref2.gpuAcceleration,
	      adaptive = _ref2.adaptive,
	      roundOffsets = _ref2.roundOffsets,
	      isFixed = _ref2.isFixed;
	  var _offsets$x = offsets.x,
	      x = _offsets$x === void 0 ? 0 : _offsets$x,
	      _offsets$y = offsets.y,
	      y = _offsets$y === void 0 ? 0 : _offsets$y;

	  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
	    x: x,
	    y: y
	  }) : {
	    x: x,
	    y: y
	  };

	  x = _ref3.x;
	  y = _ref3.y;
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

	      if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
	        heightProp = 'scrollHeight';
	        widthProp = 'scrollWidth';
	      }
	    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


	    offsetParent = offsetParent;

	    if (placement === top || (placement === left || placement === right) && variation === end) {
	      sideY = bottom;
	      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
	      offsetParent[heightProp];
	      y -= offsetY - popperRect.height;
	      y *= gpuAcceleration ? 1 : -1;
	    }

	    if (placement === left || (placement === top || placement === bottom) && variation === end) {
	      sideX = right;
	      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
	      offsetParent[widthProp];
	      x -= offsetX - popperRect.width;
	      x *= gpuAcceleration ? 1 : -1;
	    }
	  }

	  var commonStyles = Object.assign({
	    position: position
	  }, adaptive && unsetSides);

	  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
	    x: x,
	    y: y
	  }, getWindow(popper)) : {
	    x: x,
	    y: y
	  };

	  x = _ref4.x;
	  y = _ref4.y;

	  if (gpuAcceleration) {
	    var _Object$assign;

	    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
	  }

	  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
	}

	function computeStyles(_ref5) {
	  var state = _ref5.state,
	      options = _ref5.options;
	  var _options$gpuAccelerat = options.gpuAcceleration,
	      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
	      _options$adaptive = options.adaptive,
	      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
	      _options$roundOffsets = options.roundOffsets,
	      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
	  var commonStyles = {
	    placement: getBasePlacement(state.placement),
	    variation: getVariation(state.placement),
	    popper: state.elements.popper,
	    popperRect: state.rects.popper,
	    gpuAcceleration: gpuAcceleration,
	    isFixed: state.options.strategy === 'fixed'
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
	} // eslint-disable-next-line import/no-unused-modules


	const computeStyles$1 = {
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
	} // eslint-disable-next-line import/no-unused-modules


	const eventListeners = {
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
	  // If <html> has a CSS width greater than the viewport, then this will be
	  // incorrect for RTL.
	  // Popper 1 is broken in this case and never had a bug report so let's assume
	  // it's not an issue. I don't think anyone ever specifies width on <html>
	  // anyway.
	  // Browsers where the left scrollbar doesn't cause an issue report `0` for
	  // this (e.g. Edge 2019, IE11, Safari)
	  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
	}

	function getViewportRect(element, strategy) {
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
	    var layoutViewport = isLayoutViewport();

	    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
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

	// of the `<html>` and `<body>` rect bounds if horizontally scrollable

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
	  // Firefox wants us to check `-x` and `-y` variations as well
	  var _getComputedStyle = getComputedStyle$1(element),
	      overflow = _getComputedStyle.overflow,
	      overflowX = _getComputedStyle.overflowX,
	      overflowY = _getComputedStyle.overflowY;

	  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
	}

	function getScrollParent(node) {
	  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
	    // $FlowFixMe[incompatible-return]: assume body is always available
	    return node.ownerDocument.body;
	  }

	  if (isHTMLElement(node) && isScrollParent(node)) {
	    return node;
	  }

	  return getScrollParent(getParentNode(node));
	}

	/*
	given a DOM element, return the list of all scroll parents, up the list of ancesors
	until we get to the top window object. This list is what we attach scroll listeners
	to, because if any of these parent elements scroll, we'll need to re-calculate the
	reference element's position.
	*/

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
	  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
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

	function getInnerBoundingClientRect(element, strategy) {
	  var rect = getBoundingClientRect(element, false, strategy === 'fixed');
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

	function getClientRectFromMixedType(element, clippingParent, strategy) {
	  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement$1(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
	} // A "clipping parent" is an overflowable container with the characteristic of
	// clipping (or hiding) overflowing elements with a position different from
	// `initial`


	function getClippingParents(element) {
	  var clippingParents = listScrollParents(getParentNode(element));
	  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
	  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

	  if (!isElement$1(clipperElement)) {
	    return [];
	  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


	  return clippingParents.filter(function (clippingParent) {
	    return isElement$1(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
	  });
	} // Gets the maximum area that the element is visible in due to any number of
	// clipping parents


	function getClippingRect(element, boundary, rootBoundary, strategy) {
	  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
	  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
	  var firstClippingParent = clippingParents[0];
	  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
	    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
	    accRect.top = max(rect.top, accRect.top);
	    accRect.right = min(rect.right, accRect.right);
	    accRect.bottom = min(rect.bottom, accRect.bottom);
	    accRect.left = max(rect.left, accRect.left);
	    return accRect;
	  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
	  clippingRect.width = clippingRect.right - clippingRect.left;
	  clippingRect.height = clippingRect.bottom - clippingRect.top;
	  clippingRect.x = clippingRect.left;
	  clippingRect.y = clippingRect.top;
	  return clippingRect;
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
	      _options$strategy = _options.strategy,
	      strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
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
	  var popperRect = state.rects.popper;
	  var element = state.elements[altBoundary ? altContext : elementContext];
	  var clippingClientRect = getClippingRect(isElement$1(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
	  var referenceClientRect = getBoundingClientRect(state.elements.reference);
	  var popperOffsets = computeOffsets({
	    reference: referenceClientRect,
	    element: popperRect,
	    strategy: 'absolute',
	    placement: placement
	  });
	  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
	  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
	  // 0 or negative = within the clipping rect

	  var overflowOffsets = {
	    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
	    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
	    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
	    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
	  };
	  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

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
	  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


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
	    // `2` may be desired in some cases – research later
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
	} // eslint-disable-next-line import/no-unused-modules


	const flip$1 = {
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

	function hide(_ref) {
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
	} // eslint-disable-next-line import/no-unused-modules


	const hide$1 = {
	  name: 'hide',
	  enabled: true,
	  phase: 'main',
	  requiresIfExists: ['preventOverflow'],
	  fn: hide
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
	} // eslint-disable-next-line import/no-unused-modules


	const offset$1 = {
	  name: 'offset',
	  enabled: true,
	  phase: 'main',
	  requires: ['popperOffsets'],
	  fn: offset
	};

	function popperOffsets(_ref) {
	  var state = _ref.state,
	      name = _ref.name;
	  // Offsets are the actual position the popper needs to have to be
	  // properly positioned near its reference element
	  // This is the most basic placement, and will be adjusted by
	  // the modifiers in the next step
	  state.modifiersData[name] = computeOffsets({
	    reference: state.rects.reference,
	    element: state.rects.popper,
	    strategy: 'absolute',
	    placement: state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules


	const popperOffsets$1 = {
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
	  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
	    mainAxis: tetherOffsetValue,
	    altAxis: tetherOffsetValue
	  } : Object.assign({
	    mainAxis: 0,
	    altAxis: 0
	  }, tetherOffsetValue);
	  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
	  var data = {
	    x: 0,
	    y: 0
	  };

	  if (!popperOffsets) {
	    return;
	  }

	  if (checkMainAxis) {
	    var _offsetModifierState$;

	    var mainSide = mainAxis === 'y' ? top : left;
	    var altSide = mainAxis === 'y' ? bottom : right;
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    var offset = popperOffsets[mainAxis];
	    var min$1 = offset + overflow[mainSide];
	    var max$1 = offset - overflow[altSide];
	    var additive = tether ? -popperRect[len] / 2 : 0;
	    var minLen = variation === start ? referenceRect[len] : popperRect[len];
	    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
	    // outside the reference bounds

	    var arrowElement = state.elements.arrow;
	    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
	      width: 0,
	      height: 0
	    };
	    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
	    var arrowPaddingMin = arrowPaddingObject[mainSide];
	    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
	    // to include its full size in the calculation. If the reference is small
	    // and near the edge of a boundary, the popper can overflow even if the
	    // reference is not overflowing as well (e.g. virtual elements with no
	    // width or height)

	    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
	    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
	    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
	    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
	    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
	    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
	    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
	    var tetherMax = offset + maxOffset - offsetModifierValue;
	    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
	    popperOffsets[mainAxis] = preventedOffset;
	    data[mainAxis] = preventedOffset - offset;
	  }

	  if (checkAltAxis) {
	    var _offsetModifierState$2;

	    var _mainSide = mainAxis === 'x' ? top : left;

	    var _altSide = mainAxis === 'x' ? bottom : right;

	    var _offset = popperOffsets[altAxis];

	    var _len = altAxis === 'y' ? 'height' : 'width';

	    var _min = _offset + overflow[_mainSide];

	    var _max = _offset - overflow[_altSide];

	    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

	    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

	    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

	    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

	    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

	    popperOffsets[altAxis] = _preventedOffset;
	    data[altAxis] = _preventedOffset - _offset;
	  }

	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules


	const preventOverflow$1 = {
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

	function isElementScaled(element) {
	  var rect = element.getBoundingClientRect();
	  var scaleX = round(rect.width) / element.offsetWidth || 1;
	  var scaleY = round(rect.height) / element.offsetHeight || 1;
	  return scaleX !== 1 || scaleY !== 1;
	} // Returns the composite rect of an element relative to its offsetParent.
	// Composite means it takes into account transforms as well as layout.


	function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
	  if (isFixed === void 0) {
	    isFixed = false;
	  }

	  var isOffsetParentAnElement = isHTMLElement(offsetParent);
	  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
	  var documentElement = getDocumentElement(offsetParent);
	  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
	  var scroll = {
	    scrollLeft: 0,
	    scrollTop: 0
	  };
	  var offsets = {
	    x: 0,
	    y: 0
	  };

	  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
	    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
	    isScrollParent(documentElement)) {
	      scroll = getNodeScroll(offsetParent);
	    }

	    if (isHTMLElement(offsetParent)) {
	      offsets = getBoundingClientRect(offsetParent, true);
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
	  }); // On visiting object, check for its dependencies and visit them recursively

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
	      // check for visited object
	      sort(modifier);
	    }
	  });
	  return result;
	}

	function orderModifiers(modifiers) {
	  // order based on dependencies
	  var orderedModifiers = order(modifiers); // order based on phase

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
	  }, {}); // IE11 does not support Object.values

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
	      setOptions: function setOptions(setOptionsAction) {
	        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
	        cleanupModifierEffects();
	        state.options = Object.assign({}, defaultOptions, state.options, options);
	        state.scrollParents = {
	          reference: isElement$1(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
	          popper: listScrollParents(popper)
	        }; // Orders the modifiers based on their dependencies and `phase`
	        // properties

	        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

	        state.orderedModifiers = orderedModifiers.filter(function (m) {
	          return m.enabled;
	        });
	        runModifierEffects();
	        return instance.update();
	      },
	      // Sync update – it will always be executed, even if not necessary. This
	      // is useful for low frequency updates where sync behavior simplifies the
	      // logic.
	      // For high frequency updates (e.g. `resize` and `scroll` events), always
	      // prefer the async Popper#update method
	      forceUpdate: function forceUpdate() {
	        if (isDestroyed) {
	          return;
	        }

	        var _state$elements = state.elements,
	            reference = _state$elements.reference,
	            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
	        // anymore

	        if (!areValidElements(reference, popper)) {
	          return;
	        } // Store the reference and popper rects to be read by modifiers


	        state.rects = {
	          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
	          popper: getLayoutRect(popper)
	        }; // Modifiers have the ability to reset the current update cycle. The
	        // most common use case for this is the `flip` modifier changing the
	        // placement, which then needs to re-run all the modifiers, because the
	        // logic was previously ran for the previous placement and is therefore
	        // stale/incorrect

	        state.reset = false;
	        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
	        // is filled with the initial data specified by the modifier. This means
	        // it doesn't persist and is fresh on each update.
	        // To ensure persistent data, use `${name}#persistent`

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
	      // Async and optimistically optimized update – it will not be executed if
	      // not necessary (debounced to run at most once-per-tick)
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
	    }); // Modifiers have the ability to execute arbitrary code before the first
	    // update cycle runs. They will be executed in the same order as the update
	    // cycle. This is useful when a modifier adds some persistent data that
	    // other modifiers need to use, but the modifier is run after the dependent
	    // one.

	    function runModifierEffects() {
	      state.orderedModifiers.forEach(function (_ref) {
	        var name = _ref.name,
	            _ref$options = _ref.options,
	            options = _ref$options === void 0 ? {} : _ref$options,
	            effect = _ref.effect;

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
	var createPopper$2 = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules

	var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
	var createPopper$1 = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers$1
	}); // eslint-disable-next-line import/no-unused-modules

	var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
	var createPopper = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers
	}); // eslint-disable-next-line import/no-unused-modules

	const Popper = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
		__proto__: null,
		afterMain,
		afterRead,
		afterWrite,
		applyStyles: applyStyles$1,
		arrow: arrow$1,
		auto,
		basePlacements,
		beforeMain,
		beforeRead,
		beforeWrite,
		bottom,
		clippingParents,
		computeStyles: computeStyles$1,
		createPopper,
		createPopperBase: createPopper$2,
		createPopperLite: createPopper$1,
		detectOverflow,
		end,
		eventListeners,
		flip: flip$1,
		hide: hide$1,
		left,
		main,
		modifierPhases,
		offset: offset$1,
		placements,
		popper,
		popperGenerator,
		popperOffsets: popperOffsets$1,
		preventOverflow: preventOverflow$1,
		read,
		reference,
		right,
		start,
		top,
		variationPlacements,
		viewport,
		write
	}, Symbol.toStringTag, { value: 'Module' }));

	/*!
	  * Bootstrap v5.3.2 (https://getbootstrap.com/)
	  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap dom/data.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */

	/**
	 * Constants
	 */

	const elementMap = new Map();
	const Data = {
	  set(element, key, instance) {
	    if (!elementMap.has(element)) {
	      elementMap.set(element, new Map());
	    }
	    const instanceMap = elementMap.get(element);

	    // make it clear we only want one instance per element
	    // can be removed later when multiple key/instances are fine to be used
	    if (!instanceMap.has(key) && instanceMap.size !== 0) {
	      // eslint-disable-next-line no-console
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

	    // free up element references if there are no instances left for an element
	    if (instanceMap.size === 0) {
	      elementMap.delete(element);
	    }
	  }
	};

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap util/index.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */

	const MAX_UID = 1000000;
	const MILLISECONDS_MULTIPLIER = 1000;
	const TRANSITION_END = 'transitionend';

	/**
	 * Properly escape IDs selectors to handle weird IDs
	 * @param {string} selector
	 * @returns {string}
	 */
	const parseSelector = selector => {
	  if (selector && window.CSS && window.CSS.escape) {
	    // document.querySelector needs escaping to handle IDs (html5+) containing for instance /
	    selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`);
	  }
	  return selector;
	};

	// Shout-out Angus Croll (https://goo.gl/pxwQGp)
	const toType = object => {
	  if (object === null || object === undefined) {
	    return `${object}`;
	  }
	  return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
	};

	/**
	 * Public Util API
	 */

	const getUID = prefix => {
	  do {
	    prefix += Math.floor(Math.random() * MAX_UID);
	  } while (document.getElementById(prefix));
	  return prefix;
	};
	const getTransitionDurationFromElement = element => {
	  if (!element) {
	    return 0;
	  }

	  // Get transition-duration of the element
	  let {
	    transitionDuration,
	    transitionDelay
	  } = window.getComputedStyle(element);
	  const floatTransitionDuration = Number.parseFloat(transitionDuration);
	  const floatTransitionDelay = Number.parseFloat(transitionDelay);

	  // Return 0 if element or transition duration is not found
	  if (!floatTransitionDuration && !floatTransitionDelay) {
	    return 0;
	  }

	  // If multiple durations are defined, take the first
	  transitionDuration = transitionDuration.split(',')[0];
	  transitionDelay = transitionDelay.split(',')[0];
	  return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
	};
	const triggerTransitionEnd = element => {
	  element.dispatchEvent(new Event(TRANSITION_END));
	};
	const isElement = object => {
	  if (!object || typeof object !== 'object') {
	    return false;
	  }
	  if (typeof object.jquery !== 'undefined') {
	    object = object[0];
	  }
	  return typeof object.nodeType !== 'undefined';
	};
	const getElement = object => {
	  // it's a jQuery object or a node element
	  if (isElement(object)) {
	    return object.jquery ? object[0] : object;
	  }
	  if (typeof object === 'string' && object.length > 0) {
	    return document.querySelector(parseSelector(object));
	  }
	  return null;
	};
	const isVisible = element => {
	  if (!isElement(element) || element.getClientRects().length === 0) {
	    return false;
	  }
	  const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible';
	  // Handle `details` element as its content may falsie appear visible when it is closed
	  const closedDetails = element.closest('details:not([open])');
	  if (!closedDetails) {
	    return elementIsVisible;
	  }
	  if (closedDetails !== element) {
	    const summary = element.closest('summary');
	    if (summary && summary.parentNode !== closedDetails) {
	      return false;
	    }
	    if (summary === null) {
	      return false;
	    }
	  }
	  return elementIsVisible;
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

	  // Can find the shadow root otherwise it'll return the document
	  if (typeof element.getRootNode === 'function') {
	    const root = element.getRootNode();
	    return root instanceof ShadowRoot ? root : null;
	  }
	  if (element instanceof ShadowRoot) {
	    return element;
	  }

	  // when we don't find a shadow root
	  if (!element.parentNode) {
	    return null;
	  }
	  return findShadowRoot(element.parentNode);
	};
	const noop = () => {};

	/**
	 * Trick to restart an element's animation
	 *
	 * @param {HTMLElement} element
	 * @return void
	 *
	 * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
	 */
	const reflow = element => {
	  element.offsetHeight; // eslint-disable-line no-unused-expressions
	};

	const getjQuery = () => {
	  if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	    return window.jQuery;
	  }
	  return null;
	};
	const DOMContentLoadedCallbacks = [];
	const onDOMContentLoaded = callback => {
	  if (document.readyState === 'loading') {
	    // add listener on the first call when the document is in loading state
	    if (!DOMContentLoadedCallbacks.length) {
	      document.addEventListener('DOMContentLoaded', () => {
	        for (const callback of DOMContentLoadedCallbacks) {
	          callback();
	        }
	      });
	    }
	    DOMContentLoadedCallbacks.push(callback);
	  } else {
	    callback();
	  }
	};
	const isRTL = () => document.documentElement.dir === 'rtl';
	const defineJQueryPlugin = plugin => {
	  onDOMContentLoaded(() => {
	    const $ = getjQuery();
	    /* istanbul ignore if */
	    if ($) {
	      const name = plugin.NAME;
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
	const execute = (possibleCallback, args = [], defaultValue = possibleCallback) => {
	  return typeof possibleCallback === 'function' ? possibleCallback(...args) : defaultValue;
	};
	const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
	  if (!waitForTransition) {
	    execute(callback);
	    return;
	  }
	  const durationPadding = 5;
	  const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
	  let called = false;
	  const handler = ({
	    target
	  }) => {
	    if (target !== transitionElement) {
	      return;
	    }
	    called = true;
	    transitionElement.removeEventListener(TRANSITION_END, handler);
	    execute(callback);
	  };
	  transitionElement.addEventListener(TRANSITION_END, handler);
	  setTimeout(() => {
	    if (!called) {
	      triggerTransitionEnd(transitionElement);
	    }
	  }, emulatedDuration);
	};

	/**
	 * Return the previous/next element of a list.
	 *
	 * @param {array} list    The list of elements
	 * @param activeElement   The active element
	 * @param shouldGetNext   Choose to get next or previous element
	 * @param isCycleAllowed
	 * @return {Element|elem} The proper element
	 */
	const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
	  const listLength = list.length;
	  let index = list.indexOf(activeElement);

	  // if the element does not exist in the list return an element
	  // depending on the direction and if cycle is allowed
	  if (index === -1) {
	    return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
	  }
	  index += shouldGetNext ? 1 : -1;
	  if (isCycleAllowed) {
	    index = (index + listLength) % listLength;
	  }
	  return list[Math.max(0, Math.min(index, listLength - 1))];
	};

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap dom/event-handler.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */


	/**
	 * Constants
	 */

	const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
	const stripNameRegex = /\..*/;
	const stripUidRegex = /::\d+$/;
	const eventRegistry = {}; // Events storage
	let uidEvent = 1;
	const customEvents = {
	  mouseenter: 'mouseover',
	  mouseleave: 'mouseout'
	};
	const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);

	/**
	 * Private methods
	 */

	function makeEventUid(element, uid) {
	  return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
	}
	function getElementEvents(element) {
	  const uid = makeEventUid(element);
	  element.uidEvent = uid;
	  eventRegistry[uid] = eventRegistry[uid] || {};
	  return eventRegistry[uid];
	}
	function bootstrapHandler(element, fn) {
	  return function handler(event) {
	    hydrateObj(event, {
	      delegateTarget: element
	    });
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
	      for (const domElement of domElements) {
	        if (domElement !== target) {
	          continue;
	        }
	        hydrateObj(event, {
	          delegateTarget: target
	        });
	        if (handler.oneOff) {
	          EventHandler.off(element, event.type, selector, fn);
	        }
	        return fn.apply(target, [event]);
	      }
	    }
	  };
	}
	function findHandler(events, callable, delegationSelector = null) {
	  return Object.values(events).find(event => event.callable === callable && event.delegationSelector === delegationSelector);
	}
	function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
	  const isDelegated = typeof handler === 'string';
	  // TODO: tooltip passes `false` instead of selector, so we need to check
	  const callable = isDelegated ? delegationFunction : handler || delegationFunction;
	  let typeEvent = getTypeEvent(originalTypeEvent);
	  if (!nativeEvents.has(typeEvent)) {
	    typeEvent = originalTypeEvent;
	  }
	  return [isDelegated, callable, typeEvent];
	}
	function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
	  if (typeof originalTypeEvent !== 'string' || !element) {
	    return;
	  }
	  let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);

	  // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
	  // this prevents the handler from being dispatched the same way as mouseover or mouseout does
	  if (originalTypeEvent in customEvents) {
	    const wrapFunction = fn => {
	      return function (event) {
	        if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
	          return fn.call(this, event);
	        }
	      };
	    };
	    callable = wrapFunction(callable);
	  }
	  const events = getElementEvents(element);
	  const handlers = events[typeEvent] || (events[typeEvent] = {});
	  const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
	  if (previousFunction) {
	    previousFunction.oneOff = previousFunction.oneOff && oneOff;
	    return;
	  }
	  const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
	  const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
	  fn.delegationSelector = isDelegated ? handler : null;
	  fn.callable = callable;
	  fn.oneOff = oneOff;
	  fn.uidEvent = uid;
	  handlers[uid] = fn;
	  element.addEventListener(typeEvent, fn, isDelegated);
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
	  for (const [handlerKey, event] of Object.entries(storeElementEvent)) {
	    if (handlerKey.includes(namespace)) {
	      removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
	    }
	  }
	}
	function getTypeEvent(event) {
	  // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
	  event = event.replace(stripNameRegex, '');
	  return customEvents[event] || event;
	}
	const EventHandler = {
	  on(element, event, handler, delegationFunction) {
	    addHandler(element, event, handler, delegationFunction, false);
	  },
	  one(element, event, handler, delegationFunction) {
	    addHandler(element, event, handler, delegationFunction, true);
	  },
	  off(element, originalTypeEvent, handler, delegationFunction) {
	    if (typeof originalTypeEvent !== 'string' || !element) {
	      return;
	    }
	    const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
	    const inNamespace = typeEvent !== originalTypeEvent;
	    const events = getElementEvents(element);
	    const storeElementEvent = events[typeEvent] || {};
	    const isNamespace = originalTypeEvent.startsWith('.');
	    if (typeof callable !== 'undefined') {
	      // Simplest case: handler is passed, remove that listener ONLY.
	      if (!Object.keys(storeElementEvent).length) {
	        return;
	      }
	      removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
	      return;
	    }
	    if (isNamespace) {
	      for (const elementEvent of Object.keys(events)) {
	        removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
	      }
	    }
	    for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
	      const handlerKey = keyHandlers.replace(stripUidRegex, '');
	      if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
	        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
	      }
	    }
	  },
	  trigger(element, event, args) {
	    if (typeof event !== 'string' || !element) {
	      return null;
	    }
	    const $ = getjQuery();
	    const typeEvent = getTypeEvent(event);
	    const inNamespace = event !== typeEvent;
	    let jQueryEvent = null;
	    let bubbles = true;
	    let nativeDispatch = true;
	    let defaultPrevented = false;
	    if (inNamespace && $) {
	      jQueryEvent = $.Event(event, args);
	      $(element).trigger(jQueryEvent);
	      bubbles = !jQueryEvent.isPropagationStopped();
	      nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
	      defaultPrevented = jQueryEvent.isDefaultPrevented();
	    }
	    const evt = hydrateObj(new Event(event, {
	      bubbles,
	      cancelable: true
	    }), args);
	    if (defaultPrevented) {
	      evt.preventDefault();
	    }
	    if (nativeDispatch) {
	      element.dispatchEvent(evt);
	    }
	    if (evt.defaultPrevented && jQueryEvent) {
	      jQueryEvent.preventDefault();
	    }
	    return evt;
	  }
	};
	function hydrateObj(obj, meta = {}) {
	  for (const [key, value] of Object.entries(meta)) {
	    try {
	      obj[key] = value;
	    } catch (_unused) {
	      Object.defineProperty(obj, key, {
	        configurable: true,
	        get() {
	          return value;
	        }
	      });
	    }
	  }
	  return obj;
	}

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap dom/manipulator.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */

	function normalizeData(value) {
	  if (value === 'true') {
	    return true;
	  }
	  if (value === 'false') {
	    return false;
	  }
	  if (value === Number(value).toString()) {
	    return Number(value);
	  }
	  if (value === '' || value === 'null') {
	    return null;
	  }
	  if (typeof value !== 'string') {
	    return value;
	  }
	  try {
	    return JSON.parse(decodeURIComponent(value));
	  } catch (_unused) {
	    return value;
	  }
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
	    const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));
	    for (const key of bsKeys) {
	      let pureKey = key.replace(/^bs/, '');
	      pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
	      attributes[pureKey] = normalizeData(element.dataset[key]);
	    }
	    return attributes;
	  },
	  getDataAttribute(element, key) {
	    return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
	  }
	};

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap util/config.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */


	/**
	 * Class definition
	 */

	class Config {
	  // Getters
	  static get Default() {
	    return {};
	  }
	  static get DefaultType() {
	    return {};
	  }
	  static get NAME() {
	    throw new Error('You have to implement the static method "NAME", for each component!');
	  }
	  _getConfig(config) {
	    config = this._mergeConfigObj(config);
	    config = this._configAfterMerge(config);
	    this._typeCheckConfig(config);
	    return config;
	  }
	  _configAfterMerge(config) {
	    return config;
	  }
	  _mergeConfigObj(config, element) {
	    const jsonConfig = isElement(element) ? Manipulator.getDataAttribute(element, 'config') : {}; // try to parse

	    return {
	      ...this.constructor.Default,
	      ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
	      ...(isElement(element) ? Manipulator.getDataAttributes(element) : {}),
	      ...(typeof config === 'object' ? config : {})
	    };
	  }
	  _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
	    for (const [property, expectedTypes] of Object.entries(configTypes)) {
	      const value = config[property];
	      const valueType = isElement(value) ? 'element' : toType(value);
	      if (!new RegExp(expectedTypes).test(valueType)) {
	        throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
	      }
	    }
	  }
	}

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap base-component.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */


	/**
	 * Constants
	 */

	const VERSION = '5.3.2';

	/**
	 * Class definition
	 */

	class BaseComponent extends Config {
	  constructor(element, config) {
	    super();
	    element = getElement(element);
	    if (!element) {
	      return;
	    }
	    this._element = element;
	    this._config = this._getConfig(config);
	    Data.set(this._element, this.constructor.DATA_KEY, this);
	  }

	  // Public
	  dispose() {
	    Data.remove(this._element, this.constructor.DATA_KEY);
	    EventHandler.off(this._element, this.constructor.EVENT_KEY);
	    for (const propertyName of Object.getOwnPropertyNames(this)) {
	      this[propertyName] = null;
	    }
	  }
	  _queueCallback(callback, element, isAnimated = true) {
	    executeAfterTransition(callback, element, isAnimated);
	  }
	  _getConfig(config) {
	    config = this._mergeConfigObj(config, this._element);
	    config = this._configAfterMerge(config);
	    this._typeCheckConfig(config);
	    return config;
	  }

	  // Static
	  static getInstance(element) {
	    return Data.get(getElement(element), this.DATA_KEY);
	  }
	  static getOrCreateInstance(element, config = {}) {
	    return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
	  }
	  static get VERSION() {
	    return VERSION;
	  }
	  static get DATA_KEY() {
	    return `bs.${this.NAME}`;
	  }
	  static get EVENT_KEY() {
	    return `.${this.DATA_KEY}`;
	  }
	  static eventName(name) {
	    return `${name}${this.EVENT_KEY}`;
	  }
	}

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap dom/selector-engine.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */

	const getSelector = element => {
	  let selector = element.getAttribute('data-bs-target');
	  if (!selector || selector === '#') {
	    let hrefAttribute = element.getAttribute('href');

	    // The only valid content that could double as a selector are IDs or classes,
	    // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
	    // `document.querySelector` will rightfully complain it is invalid.
	    // See https://github.com/twbs/bootstrap/issues/32273
	    if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
	      return null;
	    }

	    // Just in case some CMS puts out a full URL with the anchor appended
	    if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
	      hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
	    }
	    selector = hrefAttribute && hrefAttribute !== '#' ? parseSelector(hrefAttribute.trim()) : null;
	  }
	  return selector;
	};
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
	    let ancestor = element.parentNode.closest(selector);
	    while (ancestor) {
	      parents.push(ancestor);
	      ancestor = ancestor.parentNode.closest(selector);
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
	  // TODO: this is now unused; remove later along with prev()
	  next(element, selector) {
	    let next = element.nextElementSibling;
	    while (next) {
	      if (next.matches(selector)) {
	        return [next];
	      }
	      next = next.nextElementSibling;
	    }
	    return [];
	  },
	  focusableChildren(element) {
	    const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
	    return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el));
	  },
	  getSelectorFromElement(element) {
	    const selector = getSelector(element);
	    if (selector) {
	      return SelectorEngine.findOne(selector) ? selector : null;
	    }
	    return null;
	  },
	  getElementFromSelector(element) {
	    const selector = getSelector(element);
	    return selector ? SelectorEngine.findOne(selector) : null;
	  },
	  getMultipleElementsFromSelector(element) {
	    const selector = getSelector(element);
	    return selector ? SelectorEngine.find(selector) : [];
	  }
	};

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap util/component-functions.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */

	const enableDismissTrigger = (component, method = 'hide') => {
	  const clickEvent = `click.dismiss${component.EVENT_KEY}`;
	  const name = component.NAME;
	  EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
	    if (['A', 'AREA'].includes(this.tagName)) {
	      event.preventDefault();
	    }
	    if (isDisabled(this)) {
	      return;
	    }
	    const target = SelectorEngine.getElementFromSelector(this) || this.closest(`.${name}`);
	    const instance = component.getOrCreateInstance(target);

	    // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method
	    instance[method]();
	  });
	};

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap alert.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */


	/**
	 * Constants
	 */

	const NAME$f = 'alert';
	const DATA_KEY$a = 'bs.alert';
	const EVENT_KEY$b = `.${DATA_KEY$a}`;
	const EVENT_CLOSE = `close${EVENT_KEY$b}`;
	const EVENT_CLOSED = `closed${EVENT_KEY$b}`;
	const CLASS_NAME_FADE$5 = 'fade';
	const CLASS_NAME_SHOW$8 = 'show';

	/**
	 * Class definition
	 */

	class Alert extends BaseComponent {
	  // Getters
	  static get NAME() {
	    return NAME$f;
	  }

	  // Public
	  close() {
	    const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
	    if (closeEvent.defaultPrevented) {
	      return;
	    }
	    this._element.classList.remove(CLASS_NAME_SHOW$8);
	    const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);
	    this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
	  }

	  // Private
	  _destroyElement() {
	    this._element.remove();
	    EventHandler.trigger(this._element, EVENT_CLOSED);
	    this.dispose();
	  }

	  // Static
	  static jQueryInterface(config) {
	    return this.each(function () {
	      const data = Alert.getOrCreateInstance(this);
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

	/**
	 * Data API implementation
	 */

	enableDismissTrigger(Alert, 'close');

	/**
	 * jQuery
	 */

	defineJQueryPlugin(Alert);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap button.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */


	/**
	 * Constants
	 */

	const NAME$e = 'button';
	const DATA_KEY$9 = 'bs.button';
	const EVENT_KEY$a = `.${DATA_KEY$9}`;
	const DATA_API_KEY$6 = '.data-api';
	const CLASS_NAME_ACTIVE$3 = 'active';
	const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
	const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;

	/**
	 * Class definition
	 */

	class Button extends BaseComponent {
	  // Getters
	  static get NAME() {
	    return NAME$e;
	  }

	  // Public
	  toggle() {
	    // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
	    this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
	  }

	  // Static
	  static jQueryInterface(config) {
	    return this.each(function () {
	      const data = Button.getOrCreateInstance(this);
	      if (config === 'toggle') {
	        data[config]();
	      }
	    });
	  }
	}

	/**
	 * Data API implementation
	 */

	EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, event => {
	  event.preventDefault();
	  const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
	  const data = Button.getOrCreateInstance(button);
	  data.toggle();
	});

	/**
	 * jQuery
	 */

	defineJQueryPlugin(Button);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap util/swipe.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */


	/**
	 * Constants
	 */

	const NAME$d = 'swipe';
	const EVENT_KEY$9 = '.bs.swipe';
	const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$9}`;
	const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$9}`;
	const EVENT_TOUCHEND = `touchend${EVENT_KEY$9}`;
	const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$9}`;
	const EVENT_POINTERUP = `pointerup${EVENT_KEY$9}`;
	const POINTER_TYPE_TOUCH = 'touch';
	const POINTER_TYPE_PEN = 'pen';
	const CLASS_NAME_POINTER_EVENT = 'pointer-event';
	const SWIPE_THRESHOLD = 40;
	const Default$c = {
	  endCallback: null,
	  leftCallback: null,
	  rightCallback: null
	};
	const DefaultType$c = {
	  endCallback: '(function|null)',
	  leftCallback: '(function|null)',
	  rightCallback: '(function|null)'
	};

	/**
	 * Class definition
	 */

	class Swipe extends Config {
	  constructor(element, config) {
	    super();
	    this._element = element;
	    if (!element || !Swipe.isSupported()) {
	      return;
	    }
	    this._config = this._getConfig(config);
	    this._deltaX = 0;
	    this._supportPointerEvents = Boolean(window.PointerEvent);
	    this._initEvents();
	  }

	  // Getters
	  static get Default() {
	    return Default$c;
	  }
	  static get DefaultType() {
	    return DefaultType$c;
	  }
	  static get NAME() {
	    return NAME$d;
	  }

	  // Public
	  dispose() {
	    EventHandler.off(this._element, EVENT_KEY$9);
	  }

	  // Private
	  _start(event) {
	    if (!this._supportPointerEvents) {
	      this._deltaX = event.touches[0].clientX;
	      return;
	    }
	    if (this._eventIsPointerPenTouch(event)) {
	      this._deltaX = event.clientX;
	    }
	  }
	  _end(event) {
	    if (this._eventIsPointerPenTouch(event)) {
	      this._deltaX = event.clientX - this._deltaX;
	    }
	    this._handleSwipe();
	    execute(this._config.endCallback);
	  }
	  _move(event) {
	    this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
	  }
	  _handleSwipe() {
	    const absDeltaX = Math.abs(this._deltaX);
	    if (absDeltaX <= SWIPE_THRESHOLD) {
	      return;
	    }
	    const direction = absDeltaX / this._deltaX;
	    this._deltaX = 0;
	    if (!direction) {
	      return;
	    }
	    execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
	  }
	  _initEvents() {
	    if (this._supportPointerEvents) {
	      EventHandler.on(this._element, EVENT_POINTERDOWN, event => this._start(event));
	      EventHandler.on(this._element, EVENT_POINTERUP, event => this._end(event));
	      this._element.classList.add(CLASS_NAME_POINTER_EVENT);
	    } else {
	      EventHandler.on(this._element, EVENT_TOUCHSTART, event => this._start(event));
	      EventHandler.on(this._element, EVENT_TOUCHMOVE, event => this._move(event));
	      EventHandler.on(this._element, EVENT_TOUCHEND, event => this._end(event));
	    }
	  }
	  _eventIsPointerPenTouch(event) {
	    return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
	  }

	  // Static
	  static isSupported() {
	    return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
	  }
	}

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap carousel.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */


	/**
	 * Constants
	 */

	const NAME$c = 'carousel';
	const DATA_KEY$8 = 'bs.carousel';
	const EVENT_KEY$8 = `.${DATA_KEY$8}`;
	const DATA_API_KEY$5 = '.data-api';
	const ARROW_LEFT_KEY$1 = 'ArrowLeft';
	const ARROW_RIGHT_KEY$1 = 'ArrowRight';
	const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

	const ORDER_NEXT = 'next';
	const ORDER_PREV = 'prev';
	const DIRECTION_LEFT = 'left';
	const DIRECTION_RIGHT = 'right';
	const EVENT_SLIDE = `slide${EVENT_KEY$8}`;
	const EVENT_SLID = `slid${EVENT_KEY$8}`;
	const EVENT_KEYDOWN$1 = `keydown${EVENT_KEY$8}`;
	const EVENT_MOUSEENTER$1 = `mouseenter${EVENT_KEY$8}`;
	const EVENT_MOUSELEAVE$1 = `mouseleave${EVENT_KEY$8}`;
	const EVENT_DRAG_START = `dragstart${EVENT_KEY$8}`;
	const EVENT_LOAD_DATA_API$3 = `load${EVENT_KEY$8}${DATA_API_KEY$5}`;
	const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$8}${DATA_API_KEY$5}`;
	const CLASS_NAME_CAROUSEL = 'carousel';
	const CLASS_NAME_ACTIVE$2 = 'active';
	const CLASS_NAME_SLIDE = 'slide';
	const CLASS_NAME_END = 'carousel-item-end';
	const CLASS_NAME_START = 'carousel-item-start';
	const CLASS_NAME_NEXT = 'carousel-item-next';
	const CLASS_NAME_PREV = 'carousel-item-prev';
	const SELECTOR_ACTIVE = '.active';
	const SELECTOR_ITEM = '.carousel-item';
	const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
	const SELECTOR_ITEM_IMG = '.carousel-item img';
	const SELECTOR_INDICATORS = '.carousel-indicators';
	const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
	const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
	const KEY_TO_DIRECTION = {
	  [ARROW_LEFT_KEY$1]: DIRECTION_RIGHT,
	  [ARROW_RIGHT_KEY$1]: DIRECTION_LEFT
	};
	const Default$b = {
	  interval: 5000,
	  keyboard: true,
	  pause: 'hover',
	  ride: false,
	  touch: true,
	  wrap: true
	};
	const DefaultType$b = {
	  interval: '(number|boolean)',
	  // TODO:v6 remove boolean support
	  keyboard: 'boolean',
	  pause: '(string|boolean)',
	  ride: '(boolean|string)',
	  touch: 'boolean',
	  wrap: 'boolean'
	};

	/**
	 * Class definition
	 */

	class Carousel extends BaseComponent {
	  constructor(element, config) {
	    super(element, config);
	    this._interval = null;
	    this._activeElement = null;
	    this._isSliding = false;
	    this.touchTimeout = null;
	    this._swipeHelper = null;
	    this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
	    this._addEventListeners();
	    if (this._config.ride === CLASS_NAME_CAROUSEL) {
	      this.cycle();
	    }
	  }

	  // Getters
	  static get Default() {
	    return Default$b;
	  }
	  static get DefaultType() {
	    return DefaultType$b;
	  }
	  static get NAME() {
	    return NAME$c;
	  }

	  // Public
	  next() {
	    this._slide(ORDER_NEXT);
	  }
	  nextWhenVisible() {
	    // FIXME TODO use `document.visibilityState`
	    // Don't call next when the page isn't visible
	    // or the carousel or its parent isn't visible
	    if (!document.hidden && isVisible(this._element)) {
	      this.next();
	    }
	  }
	  prev() {
	    this._slide(ORDER_PREV);
	  }
	  pause() {
	    if (this._isSliding) {
	      triggerTransitionEnd(this._element);
	    }
	    this._clearInterval();
	  }
	  cycle() {
	    this._clearInterval();
	    this._updateInterval();
	    this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
	  }
	  _maybeEnableCycle() {
	    if (!this._config.ride) {
	      return;
	    }
	    if (this._isSliding) {
	      EventHandler.one(this._element, EVENT_SLID, () => this.cycle());
	      return;
	    }
	    this.cycle();
	  }
	  to(index) {
	    const items = this._getItems();
	    if (index > items.length - 1 || index < 0) {
	      return;
	    }
	    if (this._isSliding) {
	      EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
	      return;
	    }
	    const activeIndex = this._getItemIndex(this._getActive());
	    if (activeIndex === index) {
	      return;
	    }
	    const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
	    this._slide(order, items[index]);
	  }
	  dispose() {
	    if (this._swipeHelper) {
	      this._swipeHelper.dispose();
	    }
	    super.dispose();
	  }

	  // Private
	  _configAfterMerge(config) {
	    config.defaultInterval = config.interval;
	    return config;
	  }
	  _addEventListeners() {
	    if (this._config.keyboard) {
	      EventHandler.on(this._element, EVENT_KEYDOWN$1, event => this._keydown(event));
	    }
	    if (this._config.pause === 'hover') {
	      EventHandler.on(this._element, EVENT_MOUSEENTER$1, () => this.pause());
	      EventHandler.on(this._element, EVENT_MOUSELEAVE$1, () => this._maybeEnableCycle());
	    }
	    if (this._config.touch && Swipe.isSupported()) {
	      this._addTouchEventListeners();
	    }
	  }
	  _addTouchEventListeners() {
	    for (const img of SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)) {
	      EventHandler.on(img, EVENT_DRAG_START, event => event.preventDefault());
	    }
	    const endCallBack = () => {
	      if (this._config.pause !== 'hover') {
	        return;
	      }

	      // If it's a touch-enabled device, mouseenter/leave are fired as
	      // part of the mouse compatibility events on first tap - the carousel
	      // would stop cycling until user tapped out of it;
	      // here, we listen for touchend, explicitly pause the carousel
	      // (as if it's the second time we tap on it, mouseenter compat event
	      // is NOT fired) and after a timeout (to allow for mouse compatibility
	      // events to fire) we explicitly restart cycling

	      this.pause();
	      if (this.touchTimeout) {
	        clearTimeout(this.touchTimeout);
	      }
	      this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
	    };
	    const swipeConfig = {
	      leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
	      rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
	      endCallback: endCallBack
	    };
	    this._swipeHelper = new Swipe(this._element, swipeConfig);
	  }
	  _keydown(event) {
	    if (/input|textarea/i.test(event.target.tagName)) {
	      return;
	    }
	    const direction = KEY_TO_DIRECTION[event.key];
	    if (direction) {
	      event.preventDefault();
	      this._slide(this._directionToOrder(direction));
	    }
	  }
	  _getItemIndex(element) {
	    return this._getItems().indexOf(element);
	  }
	  _setActiveIndicatorElement(index) {
	    if (!this._indicatorsElement) {
	      return;
	    }
	    const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
	    activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
	    activeIndicator.removeAttribute('aria-current');
	    const newActiveIndicator = SelectorEngine.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);
	    if (newActiveIndicator) {
	      newActiveIndicator.classList.add(CLASS_NAME_ACTIVE$2);
	      newActiveIndicator.setAttribute('aria-current', 'true');
	    }
	  }
	  _updateInterval() {
	    const element = this._activeElement || this._getActive();
	    if (!element) {
	      return;
	    }
	    const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
	    this._config.interval = elementInterval || this._config.defaultInterval;
	  }
	  _slide(order, element = null) {
	    if (this._isSliding) {
	      return;
	    }
	    const activeElement = this._getActive();
	    const isNext = order === ORDER_NEXT;
	    const nextElement = element || getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
	    if (nextElement === activeElement) {
	      return;
	    }
	    const nextElementIndex = this._getItemIndex(nextElement);
	    const triggerEvent = eventName => {
	      return EventHandler.trigger(this._element, eventName, {
	        relatedTarget: nextElement,
	        direction: this._orderToDirection(order),
	        from: this._getItemIndex(activeElement),
	        to: nextElementIndex
	      });
	    };
	    const slideEvent = triggerEvent(EVENT_SLIDE);
	    if (slideEvent.defaultPrevented) {
	      return;
	    }
	    if (!activeElement || !nextElement) {
	      // Some weirdness is happening, so we bail
	      // TODO: change tests that use empty divs to avoid this check
	      return;
	    }
	    const isCycling = Boolean(this._interval);
	    this.pause();
	    this._isSliding = true;
	    this._setActiveIndicatorElement(nextElementIndex);
	    this._activeElement = nextElement;
	    const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
	    const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
	    nextElement.classList.add(orderClassName);
	    reflow(nextElement);
	    activeElement.classList.add(directionalClassName);
	    nextElement.classList.add(directionalClassName);
	    const completeCallBack = () => {
	      nextElement.classList.remove(directionalClassName, orderClassName);
	      nextElement.classList.add(CLASS_NAME_ACTIVE$2);
	      activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
	      this._isSliding = false;
	      triggerEvent(EVENT_SLID);
	    };
	    this._queueCallback(completeCallBack, activeElement, this._isAnimated());
	    if (isCycling) {
	      this.cycle();
	    }
	  }
	  _isAnimated() {
	    return this._element.classList.contains(CLASS_NAME_SLIDE);
	  }
	  _getActive() {
	    return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
	  }
	  _getItems() {
	    return SelectorEngine.find(SELECTOR_ITEM, this._element);
	  }
	  _clearInterval() {
	    if (this._interval) {
	      clearInterval(this._interval);
	      this._interval = null;
	    }
	  }
	  _directionToOrder(direction) {
	    if (isRTL()) {
	      return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
	    }
	    return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
	  }
	  _orderToDirection(order) {
	    if (isRTL()) {
	      return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
	    }
	    return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
	  }

	  // Static
	  static jQueryInterface(config) {
	    return this.each(function () {
	      const data = Carousel.getOrCreateInstance(this, config);
	      if (typeof config === 'number') {
	        data.to(config);
	        return;
	      }
	      if (typeof config === 'string') {
	        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
	          throw new TypeError(`No method named "${config}"`);
	        }
	        data[config]();
	      }
	    });
	  }
	}

	/**
	 * Data API implementation
	 */

	EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, function (event) {
	  const target = SelectorEngine.getElementFromSelector(this);
	  if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
	    return;
	  }
	  event.preventDefault();
	  const carousel = Carousel.getOrCreateInstance(target);
	  const slideIndex = this.getAttribute('data-bs-slide-to');
	  if (slideIndex) {
	    carousel.to(slideIndex);
	    carousel._maybeEnableCycle();
	    return;
	  }
	  if (Manipulator.getDataAttribute(this, 'slide') === 'next') {
	    carousel.next();
	    carousel._maybeEnableCycle();
	    return;
	  }
	  carousel.prev();
	  carousel._maybeEnableCycle();
	});
	EventHandler.on(window, EVENT_LOAD_DATA_API$3, () => {
	  const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
	  for (const carousel of carousels) {
	    Carousel.getOrCreateInstance(carousel);
	  }
	});

	/**
	 * jQuery
	 */

	defineJQueryPlugin(Carousel);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap collapse.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */


	/**
	 * Constants
	 */

	const NAME$b = 'collapse';
	const DATA_KEY$7 = 'bs.collapse';
	const EVENT_KEY$7 = `.${DATA_KEY$7}`;
	const DATA_API_KEY$4 = '.data-api';
	const EVENT_SHOW$6 = `show${EVENT_KEY$7}`;
	const EVENT_SHOWN$6 = `shown${EVENT_KEY$7}`;
	const EVENT_HIDE$6 = `hide${EVENT_KEY$7}`;
	const EVENT_HIDDEN$6 = `hidden${EVENT_KEY$7}`;
	const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$7}${DATA_API_KEY$4}`;
	const CLASS_NAME_SHOW$7 = 'show';
	const CLASS_NAME_COLLAPSE = 'collapse';
	const CLASS_NAME_COLLAPSING = 'collapsing';
	const CLASS_NAME_COLLAPSED = 'collapsed';
	const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
	const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
	const WIDTH = 'width';
	const HEIGHT = 'height';
	const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
	const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
	const Default$a = {
	  parent: null,
	  toggle: true
	};
	const DefaultType$a = {
	  parent: '(null|element)',
	  toggle: 'boolean'
	};

	/**
	 * Class definition
	 */

	class Collapse extends BaseComponent {
	  constructor(element, config) {
	    super(element, config);
	    this._isTransitioning = false;
	    this._triggerArray = [];
	    const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);
	    for (const elem of toggleList) {
	      const selector = SelectorEngine.getSelectorFromElement(elem);
	      const filterElement = SelectorEngine.find(selector).filter(foundElement => foundElement === this._element);
	      if (selector !== null && filterElement.length) {
	        this._triggerArray.push(elem);
	      }
	    }
	    this._initializeChildren();
	    if (!this._config.parent) {
	      this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
	    }
	    if (this._config.toggle) {
	      this.toggle();
	    }
	  }

	  // Getters
	  static get Default() {
	    return Default$a;
	  }
	  static get DefaultType() {
	    return DefaultType$a;
	  }
	  static get NAME() {
	    return NAME$b;
	  }

	  // Public
	  toggle() {
	    if (this._isShown()) {
	      this.hide();
	    } else {
	      this.show();
	    }
	  }
	  show() {
	    if (this._isTransitioning || this._isShown()) {
	      return;
	    }
	    let activeChildren = [];

	    // find active children
	    if (this._config.parent) {
	      activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(element => element !== this._element).map(element => Collapse.getOrCreateInstance(element, {
	        toggle: false
	      }));
	    }
	    if (activeChildren.length && activeChildren[0]._isTransitioning) {
	      return;
	    }
	    const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$6);
	    if (startEvent.defaultPrevented) {
	      return;
	    }
	    for (const activeInstance of activeChildren) {
	      activeInstance.hide();
	    }
	    const dimension = this._getDimension();
	    this._element.classList.remove(CLASS_NAME_COLLAPSE);
	    this._element.classList.add(CLASS_NAME_COLLAPSING);
	    this._element.style[dimension] = 0;
	    this._addAriaAndCollapsedClass(this._triggerArray, true);
	    this._isTransitioning = true;
	    const complete = () => {
	      this._isTransitioning = false;
	      this._element.classList.remove(CLASS_NAME_COLLAPSING);
	      this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
	      this._element.style[dimension] = '';
	      EventHandler.trigger(this._element, EVENT_SHOWN$6);
	    };
	    const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
	    const scrollSize = `scroll${capitalizedDimension}`;
	    this._queueCallback(complete, this._element, true);
	    this._element.style[dimension] = `${this._element[scrollSize]}px`;
	  }
	  hide() {
	    if (this._isTransitioning || !this._isShown()) {
	      return;
	    }
	    const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$6);
	    if (startEvent.defaultPrevented) {
	      return;
	    }
	    const dimension = this._getDimension();
	    this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
	    reflow(this._element);
	    this._element.classList.add(CLASS_NAME_COLLAPSING);
	    this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
	    for (const trigger of this._triggerArray) {
	      const element = SelectorEngine.getElementFromSelector(trigger);
	      if (element && !this._isShown(element)) {
	        this._addAriaAndCollapsedClass([trigger], false);
	      }
	    }
	    this._isTransitioning = true;
	    const complete = () => {
	      this._isTransitioning = false;
	      this._element.classList.remove(CLASS_NAME_COLLAPSING);
	      this._element.classList.add(CLASS_NAME_COLLAPSE);
	      EventHandler.trigger(this._element, EVENT_HIDDEN$6);
	    };
	    this._element.style[dimension] = '';
	    this._queueCallback(complete, this._element, true);
	  }
	  _isShown(element = this._element) {
	    return element.classList.contains(CLASS_NAME_SHOW$7);
	  }

	  // Private
	  _configAfterMerge(config) {
	    config.toggle = Boolean(config.toggle); // Coerce string values
	    config.parent = getElement(config.parent);
	    return config;
	  }
	  _getDimension() {
	    return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
	  }
	  _initializeChildren() {
	    if (!this._config.parent) {
	      return;
	    }
	    const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$4);
	    for (const element of children) {
	      const selected = SelectorEngine.getElementFromSelector(element);
	      if (selected) {
	        this._addAriaAndCollapsedClass([element], this._isShown(selected));
	      }
	    }
	  }
	  _getFirstLevelChildren(selector) {
	    const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
	    // remove children if greater depth
	    return SelectorEngine.find(selector, this._config.parent).filter(element => !children.includes(element));
	  }
	  _addAriaAndCollapsedClass(triggerArray, isOpen) {
	    if (!triggerArray.length) {
	      return;
	    }
	    for (const element of triggerArray) {
	      element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
	      element.setAttribute('aria-expanded', isOpen);
	    }
	  }

	  // Static
	  static jQueryInterface(config) {
	    const _config = {};
	    if (typeof config === 'string' && /show|hide/.test(config)) {
	      _config.toggle = false;
	    }
	    return this.each(function () {
	      const data = Collapse.getOrCreateInstance(this, _config);
	      if (typeof config === 'string') {
	        if (typeof data[config] === 'undefined') {
	          throw new TypeError(`No method named "${config}"`);
	        }
	        data[config]();
	      }
	    });
	  }
	}

	/**
	 * Data API implementation
	 */

	EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
	  // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
	  if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
	    event.preventDefault();
	  }
	  for (const element of SelectorEngine.getMultipleElementsFromSelector(this)) {
	    Collapse.getOrCreateInstance(element, {
	      toggle: false
	    }).toggle();
	  }
	});

	/**
	 * jQuery
	 */

	defineJQueryPlugin(Collapse);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap dropdown.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */


	/**
	 * Constants
	 */

	const NAME$a = 'dropdown';
	const DATA_KEY$6 = 'bs.dropdown';
	const EVENT_KEY$6 = `.${DATA_KEY$6}`;
	const DATA_API_KEY$3 = '.data-api';
	const ESCAPE_KEY$2 = 'Escape';
	const TAB_KEY$1 = 'Tab';
	const ARROW_UP_KEY$1 = 'ArrowUp';
	const ARROW_DOWN_KEY$1 = 'ArrowDown';
	const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

	const EVENT_HIDE$5 = `hide${EVENT_KEY$6}`;
	const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$6}`;
	const EVENT_SHOW$5 = `show${EVENT_KEY$6}`;
	const EVENT_SHOWN$5 = `shown${EVENT_KEY$6}`;
	const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
	const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$6}${DATA_API_KEY$3}`;
	const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$6}${DATA_API_KEY$3}`;
	const CLASS_NAME_SHOW$6 = 'show';
	const CLASS_NAME_DROPUP = 'dropup';
	const CLASS_NAME_DROPEND = 'dropend';
	const CLASS_NAME_DROPSTART = 'dropstart';
	const CLASS_NAME_DROPUP_CENTER = 'dropup-center';
	const CLASS_NAME_DROPDOWN_CENTER = 'dropdown-center';
	const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
	const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE$3}.${CLASS_NAME_SHOW$6}`;
	const SELECTOR_MENU = '.dropdown-menu';
	const SELECTOR_NAVBAR = '.navbar';
	const SELECTOR_NAVBAR_NAV = '.navbar-nav';
	const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
	const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
	const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
	const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
	const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
	const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
	const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
	const PLACEMENT_TOPCENTER = 'top';
	const PLACEMENT_BOTTOMCENTER = 'bottom';
	const Default$9 = {
	  autoClose: true,
	  boundary: 'clippingParents',
	  display: 'dynamic',
	  offset: [0, 2],
	  popperConfig: null,
	  reference: 'toggle'
	};
	const DefaultType$9 = {
	  autoClose: '(boolean|string)',
	  boundary: '(string|element)',
	  display: 'string',
	  offset: '(array|string|function)',
	  popperConfig: '(null|object|function)',
	  reference: '(string|element|object)'
	};

	/**
	 * Class definition
	 */

	class Dropdown extends BaseComponent {
	  constructor(element, config) {
	    super(element, config);
	    this._popper = null;
	    this._parent = this._element.parentNode; // dropdown wrapper
	    // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
	    this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._parent);
	    this._inNavbar = this._detectNavbar();
	  }

	  // Getters
	  static get Default() {
	    return Default$9;
	  }
	  static get DefaultType() {
	    return DefaultType$9;
	  }
	  static get NAME() {
	    return NAME$a;
	  }

	  // Public
	  toggle() {
	    return this._isShown() ? this.hide() : this.show();
	  }
	  show() {
	    if (isDisabled(this._element) || this._isShown()) {
	      return;
	    }
	    const relatedTarget = {
	      relatedTarget: this._element
	    };
	    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$5, relatedTarget);
	    if (showEvent.defaultPrevented) {
	      return;
	    }
	    this._createPopper();

	    // If this is a touch-enabled device we add extra
	    // empty mouseover listeners to the body's immediate children;
	    // only needed because of broken event delegation on iOS
	    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
	    if ('ontouchstart' in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
	      for (const element of [].concat(...document.body.children)) {
	        EventHandler.on(element, 'mouseover', noop);
	      }
	    }
	    this._element.focus();
	    this._element.setAttribute('aria-expanded', true);
	    this._menu.classList.add(CLASS_NAME_SHOW$6);
	    this._element.classList.add(CLASS_NAME_SHOW$6);
	    EventHandler.trigger(this._element, EVENT_SHOWN$5, relatedTarget);
	  }
	  hide() {
	    if (isDisabled(this._element) || !this._isShown()) {
	      return;
	    }
	    const relatedTarget = {
	      relatedTarget: this._element
	    };
	    this._completeHide(relatedTarget);
	  }
	  dispose() {
	    if (this._popper) {
	      this._popper.destroy();
	    }
	    super.dispose();
	  }
	  update() {
	    this._inNavbar = this._detectNavbar();
	    if (this._popper) {
	      this._popper.update();
	    }
	  }

	  // Private
	  _completeHide(relatedTarget) {
	    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$5, relatedTarget);
	    if (hideEvent.defaultPrevented) {
	      return;
	    }

	    // If this is a touch-enabled device we remove the extra
	    // empty mouseover listeners we added for iOS support
	    if ('ontouchstart' in document.documentElement) {
	      for (const element of [].concat(...document.body.children)) {
	        EventHandler.off(element, 'mouseover', noop);
	      }
	    }
	    if (this._popper) {
	      this._popper.destroy();
	    }
	    this._menu.classList.remove(CLASS_NAME_SHOW$6);
	    this._element.classList.remove(CLASS_NAME_SHOW$6);
	    this._element.setAttribute('aria-expanded', 'false');
	    Manipulator.removeDataAttribute(this._menu, 'popper');
	    EventHandler.trigger(this._element, EVENT_HIDDEN$5, relatedTarget);
	  }
	  _getConfig(config) {
	    config = super._getConfig(config);
	    if (typeof config.reference === 'object' && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
	      // Popper virtual elements require a getBoundingClientRect method
	      throw new TypeError(`${NAME$a.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
	    }
	    return config;
	  }
	  _createPopper() {
	    if (typeof Popper === 'undefined') {
	      throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
	    }
	    let referenceElement = this._element;
	    if (this._config.reference === 'parent') {
	      referenceElement = this._parent;
	    } else if (isElement(this._config.reference)) {
	      referenceElement = getElement(this._config.reference);
	    } else if (typeof this._config.reference === 'object') {
	      referenceElement = this._config.reference;
	    }
	    const popperConfig = this._getPopperConfig();
	    this._popper = createPopper(referenceElement, this._menu, popperConfig);
	  }
	  _isShown() {
	    return this._menu.classList.contains(CLASS_NAME_SHOW$6);
	  }
	  _getPlacement() {
	    const parentDropdown = this._parent;
	    if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
	      return PLACEMENT_RIGHT;
	    }
	    if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
	      return PLACEMENT_LEFT;
	    }
	    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
	      return PLACEMENT_TOPCENTER;
	    }
	    if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
	      return PLACEMENT_BOTTOMCENTER;
	    }

	    // We need to trim the value because custom properties can also include spaces
	    const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';
	    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
	      return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
	    }
	    return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
	  }
	  _detectNavbar() {
	    return this._element.closest(SELECTOR_NAVBAR) !== null;
	  }
	  _getOffset() {
	    const {
	      offset
	    } = this._config;
	    if (typeof offset === 'string') {
	      return offset.split(',').map(value => Number.parseInt(value, 10));
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

	    // Disable Popper if we have a static display or Dropdown is in Navbar
	    if (this._inNavbar || this._config.display === 'static') {
	      Manipulator.setDataAttribute(this._menu, 'popper', 'static'); // TODO: v6 remove
	      defaultBsPopperConfig.modifiers = [{
	        name: 'applyStyles',
	        enabled: false
	      }];
	    }
	    return {
	      ...defaultBsPopperConfig,
	      ...execute(this._config.popperConfig, [defaultBsPopperConfig])
	    };
	  }
	  _selectMenuItem({
	    key,
	    target
	  }) {
	    const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(element => isVisible(element));
	    if (!items.length) {
	      return;
	    }

	    // if target isn't included in items (e.g. when expanding the dropdown)
	    // allow cycling to get the last item in case key equals ARROW_UP_KEY
	    getNextActiveElement(items, target, key === ARROW_DOWN_KEY$1, !items.includes(target)).focus();
	  }

	  // Static
	  static jQueryInterface(config) {
	    return this.each(function () {
	      const data = Dropdown.getOrCreateInstance(this, config);
	      if (typeof config !== 'string') {
	        return;
	      }
	      if (typeof data[config] === 'undefined') {
	        throw new TypeError(`No method named "${config}"`);
	      }
	      data[config]();
	    });
	  }
	  static clearMenus(event) {
	    if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY$1) {
	      return;
	    }
	    const openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);
	    for (const toggle of openToggles) {
	      const context = Dropdown.getInstance(toggle);
	      if (!context || context._config.autoClose === false) {
	        continue;
	      }
	      const composedPath = event.composedPath();
	      const isMenuTarget = composedPath.includes(context._menu);
	      if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
	        continue;
	      }

	      // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu
	      if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
	        continue;
	      }
	      const relatedTarget = {
	        relatedTarget: context._element
	      };
	      if (event.type === 'click') {
	        relatedTarget.clickEvent = event;
	      }
	      context._completeHide(relatedTarget);
	    }
	  }
	  static dataApiKeydownHandler(event) {
	    // If not an UP | DOWN | ESCAPE key => not a dropdown command
	    // If input/textarea && if key is other than ESCAPE => not a dropdown command

	    const isInput = /input|textarea/i.test(event.target.tagName);
	    const isEscapeEvent = event.key === ESCAPE_KEY$2;
	    const isUpOrDownEvent = [ARROW_UP_KEY$1, ARROW_DOWN_KEY$1].includes(event.key);
	    if (!isUpOrDownEvent && !isEscapeEvent) {
	      return;
	    }
	    if (isInput && !isEscapeEvent) {
	      return;
	    }
	    event.preventDefault();

	    // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
	    const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE$3, event.delegateTarget.parentNode);
	    const instance = Dropdown.getOrCreateInstance(getToggleButton);
	    if (isUpOrDownEvent) {
	      event.stopPropagation();
	      instance.show();
	      instance._selectMenuItem(event);
	      return;
	    }
	    if (instance._isShown()) {
	      // else is escape and we check if it is shown
	      event.stopPropagation();
	      instance.hide();
	      getToggleButton.focus();
	    }
	  }
	}

	/**
	 * Data API implementation
	 */

	EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
	EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
	EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
	EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
	EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
	  event.preventDefault();
	  Dropdown.getOrCreateInstance(this).toggle();
	});

	/**
	 * jQuery
	 */

	defineJQueryPlugin(Dropdown);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap util/backdrop.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */


	/**
	 * Constants
	 */

	const NAME$9 = 'backdrop';
	const CLASS_NAME_FADE$4 = 'fade';
	const CLASS_NAME_SHOW$5 = 'show';
	const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$9}`;
	const Default$8 = {
	  className: 'modal-backdrop',
	  clickCallback: null,
	  isAnimated: false,
	  isVisible: true,
	  // if false, we use the backdrop helper without adding any element to the dom
	  rootElement: 'body' // give the choice to place backdrop under different elements
	};

	const DefaultType$8 = {
	  className: 'string',
	  clickCallback: '(function|null)',
	  isAnimated: 'boolean',
	  isVisible: 'boolean',
	  rootElement: '(element|string)'
	};

	/**
	 * Class definition
	 */

	class Backdrop extends Config {
	  constructor(config) {
	    super();
	    this._config = this._getConfig(config);
	    this._isAppended = false;
	    this._element = null;
	  }

	  // Getters
	  static get Default() {
	    return Default$8;
	  }
	  static get DefaultType() {
	    return DefaultType$8;
	  }
	  static get NAME() {
	    return NAME$9;
	  }

	  // Public
	  show(callback) {
	    if (!this._config.isVisible) {
	      execute(callback);
	      return;
	    }
	    this._append();
	    const element = this._getElement();
	    if (this._config.isAnimated) {
	      reflow(element);
	    }
	    element.classList.add(CLASS_NAME_SHOW$5);
	    this._emulateAnimation(() => {
	      execute(callback);
	    });
	  }
	  hide(callback) {
	    if (!this._config.isVisible) {
	      execute(callback);
	      return;
	    }
	    this._getElement().classList.remove(CLASS_NAME_SHOW$5);
	    this._emulateAnimation(() => {
	      this.dispose();
	      execute(callback);
	    });
	  }
	  dispose() {
	    if (!this._isAppended) {
	      return;
	    }
	    EventHandler.off(this._element, EVENT_MOUSEDOWN);
	    this._element.remove();
	    this._isAppended = false;
	  }

	  // Private
	  _getElement() {
	    if (!this._element) {
	      const backdrop = document.createElement('div');
	      backdrop.className = this._config.className;
	      if (this._config.isAnimated) {
	        backdrop.classList.add(CLASS_NAME_FADE$4);
	      }
	      this._element = backdrop;
	    }
	    return this._element;
	  }
	  _configAfterMerge(config) {
	    // use getElement() with the default "body" to get a fresh Element on each instantiation
	    config.rootElement = getElement(config.rootElement);
	    return config;
	  }
	  _append() {
	    if (this._isAppended) {
	      return;
	    }
	    const element = this._getElement();
	    this._config.rootElement.append(element);
	    EventHandler.on(element, EVENT_MOUSEDOWN, () => {
	      execute(this._config.clickCallback);
	    });
	    this._isAppended = true;
	  }
	  _emulateAnimation(callback) {
	    executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
	  }
	}

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap util/focustrap.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */


	/**
	 * Constants
	 */

	const NAME$8 = 'focustrap';
	const DATA_KEY$5 = 'bs.focustrap';
	const EVENT_KEY$5 = `.${DATA_KEY$5}`;
	const EVENT_FOCUSIN$2 = `focusin${EVENT_KEY$5}`;
	const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$5}`;
	const TAB_KEY = 'Tab';
	const TAB_NAV_FORWARD = 'forward';
	const TAB_NAV_BACKWARD = 'backward';
	const Default$7 = {
	  autofocus: true,
	  trapElement: null // The element to trap focus inside of
	};

	const DefaultType$7 = {
	  autofocus: 'boolean',
	  trapElement: 'element'
	};

	/**
	 * Class definition
	 */

	class FocusTrap extends Config {
	  constructor(config) {
	    super();
	    this._config = this._getConfig(config);
	    this._isActive = false;
	    this._lastTabNavDirection = null;
	  }

	  // Getters
	  static get Default() {
	    return Default$7;
	  }
	  static get DefaultType() {
	    return DefaultType$7;
	  }
	  static get NAME() {
	    return NAME$8;
	  }

	  // Public
	  activate() {
	    if (this._isActive) {
	      return;
	    }
	    if (this._config.autofocus) {
	      this._config.trapElement.focus();
	    }
	    EventHandler.off(document, EVENT_KEY$5); // guard against infinite focus loop
	    EventHandler.on(document, EVENT_FOCUSIN$2, event => this._handleFocusin(event));
	    EventHandler.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
	    this._isActive = true;
	  }
	  deactivate() {
	    if (!this._isActive) {
	      return;
	    }
	    this._isActive = false;
	    EventHandler.off(document, EVENT_KEY$5);
	  }

	  // Private
	  _handleFocusin(event) {
	    const {
	      trapElement
	    } = this._config;
	    if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
	      return;
	    }
	    const elements = SelectorEngine.focusableChildren(trapElement);
	    if (elements.length === 0) {
	      trapElement.focus();
	    } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
	      elements[elements.length - 1].focus();
	    } else {
	      elements[0].focus();
	    }
	  }
	  _handleKeydown(event) {
	    if (event.key !== TAB_KEY) {
	      return;
	    }
	    this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
	  }
	}

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap util/scrollBar.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */


	/**
	 * Constants
	 */

	const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
	const SELECTOR_STICKY_CONTENT = '.sticky-top';
	const PROPERTY_PADDING = 'padding-right';
	const PROPERTY_MARGIN = 'margin-right';

	/**
	 * Class definition
	 */

	class ScrollBarHelper {
	  constructor() {
	    this._element = document.body;
	  }

	  // Public
	  getWidth() {
	    // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
	    const documentWidth = document.documentElement.clientWidth;
	    return Math.abs(window.innerWidth - documentWidth);
	  }
	  hide() {
	    const width = this.getWidth();
	    this._disableOverFlow();
	    // give padding to element to balance the hidden scrollbar width
	    this._setElementAttributes(this._element, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
	    // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth
	    this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
	    this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, calculatedValue => calculatedValue - width);
	  }
	  reset() {
	    this._resetElementAttributes(this._element, 'overflow');
	    this._resetElementAttributes(this._element, PROPERTY_PADDING);
	    this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
	    this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
	  }
	  isOverflowing() {
	    return this.getWidth() > 0;
	  }

	  // Private
	  _disableOverFlow() {
	    this._saveInitialAttribute(this._element, 'overflow');
	    this._element.style.overflow = 'hidden';
	  }
	  _setElementAttributes(selector, styleProperty, callback) {
	    const scrollbarWidth = this.getWidth();
	    const manipulationCallBack = element => {
	      if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
	        return;
	      }
	      this._saveInitialAttribute(element, styleProperty);
	      const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
	      element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
	    };
	    this._applyManipulationCallback(selector, manipulationCallBack);
	  }
	  _saveInitialAttribute(element, styleProperty) {
	    const actualValue = element.style.getPropertyValue(styleProperty);
	    if (actualValue) {
	      Manipulator.setDataAttribute(element, styleProperty, actualValue);
	    }
	  }
	  _resetElementAttributes(selector, styleProperty) {
	    const manipulationCallBack = element => {
	      const value = Manipulator.getDataAttribute(element, styleProperty);
	      // We only want to remove the property if the value is `null`; the value can also be zero
	      if (value === null) {
	        element.style.removeProperty(styleProperty);
	        return;
	      }
	      Manipulator.removeDataAttribute(element, styleProperty);
	      element.style.setProperty(styleProperty, value);
	    };
	    this._applyManipulationCallback(selector, manipulationCallBack);
	  }
	  _applyManipulationCallback(selector, callBack) {
	    if (isElement(selector)) {
	      callBack(selector);
	      return;
	    }
	    for (const sel of SelectorEngine.find(selector, this._element)) {
	      callBack(sel);
	    }
	  }
	}

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap modal.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */


	/**
	 * Constants
	 */

	const NAME$7 = 'modal';
	const DATA_KEY$4 = 'bs.modal';
	const EVENT_KEY$4 = `.${DATA_KEY$4}`;
	const DATA_API_KEY$2 = '.data-api';
	const ESCAPE_KEY$1 = 'Escape';
	const EVENT_HIDE$4 = `hide${EVENT_KEY$4}`;
	const EVENT_HIDE_PREVENTED$1 = `hidePrevented${EVENT_KEY$4}`;
	const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$4}`;
	const EVENT_SHOW$4 = `show${EVENT_KEY$4}`;
	const EVENT_SHOWN$4 = `shown${EVENT_KEY$4}`;
	const EVENT_RESIZE$1 = `resize${EVENT_KEY$4}`;
	const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$4}`;
	const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$4}`;
	const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$4}`;
	const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$4}${DATA_API_KEY$2}`;
	const CLASS_NAME_OPEN = 'modal-open';
	const CLASS_NAME_FADE$3 = 'fade';
	const CLASS_NAME_SHOW$4 = 'show';
	const CLASS_NAME_STATIC = 'modal-static';
	const OPEN_SELECTOR$1 = '.modal.show';
	const SELECTOR_DIALOG = '.modal-dialog';
	const SELECTOR_MODAL_BODY = '.modal-body';
	const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
	const Default$6 = {
	  backdrop: true,
	  focus: true,
	  keyboard: true
	};
	const DefaultType$6 = {
	  backdrop: '(boolean|string)',
	  focus: 'boolean',
	  keyboard: 'boolean'
	};

	/**
	 * Class definition
	 */

	class Modal extends BaseComponent {
	  constructor(element, config) {
	    super(element, config);
	    this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
	    this._backdrop = this._initializeBackDrop();
	    this._focustrap = this._initializeFocusTrap();
	    this._isShown = false;
	    this._isTransitioning = false;
	    this._scrollBar = new ScrollBarHelper();
	    this._addEventListeners();
	  }

	  // Getters
	  static get Default() {
	    return Default$6;
	  }
	  static get DefaultType() {
	    return DefaultType$6;
	  }
	  static get NAME() {
	    return NAME$7;
	  }

	  // Public
	  toggle(relatedTarget) {
	    return this._isShown ? this.hide() : this.show(relatedTarget);
	  }
	  show(relatedTarget) {
	    if (this._isShown || this._isTransitioning) {
	      return;
	    }
	    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, {
	      relatedTarget
	    });
	    if (showEvent.defaultPrevented) {
	      return;
	    }
	    this._isShown = true;
	    this._isTransitioning = true;
	    this._scrollBar.hide();
	    document.body.classList.add(CLASS_NAME_OPEN);
	    this._adjustDialog();
	    this._backdrop.show(() => this._showElement(relatedTarget));
	  }
	  hide() {
	    if (!this._isShown || this._isTransitioning) {
	      return;
	    }
	    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);
	    if (hideEvent.defaultPrevented) {
	      return;
	    }
	    this._isShown = false;
	    this._isTransitioning = true;
	    this._focustrap.deactivate();
	    this._element.classList.remove(CLASS_NAME_SHOW$4);
	    this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
	  }
	  dispose() {
	    EventHandler.off(window, EVENT_KEY$4);
	    EventHandler.off(this._dialog, EVENT_KEY$4);
	    this._backdrop.dispose();
	    this._focustrap.deactivate();
	    super.dispose();
	  }
	  handleUpdate() {
	    this._adjustDialog();
	  }

	  // Private
	  _initializeBackDrop() {
	    return new Backdrop({
	      isVisible: Boolean(this._config.backdrop),
	      // 'static' option will be translated to true, and booleans will keep their value,
	      isAnimated: this._isAnimated()
	    });
	  }
	  _initializeFocusTrap() {
	    return new FocusTrap({
	      trapElement: this._element
	    });
	  }
	  _showElement(relatedTarget) {
	    // try to append dynamic modal
	    if (!document.body.contains(this._element)) {
	      document.body.append(this._element);
	    }
	    this._element.style.display = 'block';
	    this._element.removeAttribute('aria-hidden');
	    this._element.setAttribute('aria-modal', true);
	    this._element.setAttribute('role', 'dialog');
	    this._element.scrollTop = 0;
	    const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
	    if (modalBody) {
	      modalBody.scrollTop = 0;
	    }
	    reflow(this._element);
	    this._element.classList.add(CLASS_NAME_SHOW$4);
	    const transitionComplete = () => {
	      if (this._config.focus) {
	        this._focustrap.activate();
	      }
	      this._isTransitioning = false;
	      EventHandler.trigger(this._element, EVENT_SHOWN$4, {
	        relatedTarget
	      });
	    };
	    this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
	  }
	  _addEventListeners() {
	    EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, event => {
	      if (event.key !== ESCAPE_KEY$1) {
	        return;
	      }
	      if (this._config.keyboard) {
	        this.hide();
	        return;
	      }
	      this._triggerBackdropTransition();
	    });
	    EventHandler.on(window, EVENT_RESIZE$1, () => {
	      if (this._isShown && !this._isTransitioning) {
	        this._adjustDialog();
	      }
	    });
	    EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, event => {
	      // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
	      EventHandler.one(this._element, EVENT_CLICK_DISMISS, event2 => {
	        if (this._element !== event.target || this._element !== event2.target) {
	          return;
	        }
	        if (this._config.backdrop === 'static') {
	          this._triggerBackdropTransition();
	          return;
	        }
	        if (this._config.backdrop) {
	          this.hide();
	        }
	      });
	    });
	  }
	  _hideModal() {
	    this._element.style.display = 'none';
	    this._element.setAttribute('aria-hidden', true);
	    this._element.removeAttribute('aria-modal');
	    this._element.removeAttribute('role');
	    this._isTransitioning = false;
	    this._backdrop.hide(() => {
	      document.body.classList.remove(CLASS_NAME_OPEN);
	      this._resetAdjustments();
	      this._scrollBar.reset();
	      EventHandler.trigger(this._element, EVENT_HIDDEN$4);
	    });
	  }
	  _isAnimated() {
	    return this._element.classList.contains(CLASS_NAME_FADE$3);
	  }
	  _triggerBackdropTransition() {
	    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED$1);
	    if (hideEvent.defaultPrevented) {
	      return;
	    }
	    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
	    const initialOverflowY = this._element.style.overflowY;
	    // return if the following background transition hasn't yet completed
	    if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
	      return;
	    }
	    if (!isModalOverflowing) {
	      this._element.style.overflowY = 'hidden';
	    }
	    this._element.classList.add(CLASS_NAME_STATIC);
	    this._queueCallback(() => {
	      this._element.classList.remove(CLASS_NAME_STATIC);
	      this._queueCallback(() => {
	        this._element.style.overflowY = initialOverflowY;
	      }, this._dialog);
	    }, this._dialog);
	    this._element.focus();
	  }

	  /**
	   * The following methods are used to handle overflowing modals
	   */

	  _adjustDialog() {
	    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
	    const scrollbarWidth = this._scrollBar.getWidth();
	    const isBodyOverflowing = scrollbarWidth > 0;
	    if (isBodyOverflowing && !isModalOverflowing) {
	      const property = isRTL() ? 'paddingLeft' : 'paddingRight';
	      this._element.style[property] = `${scrollbarWidth}px`;
	    }
	    if (!isBodyOverflowing && isModalOverflowing) {
	      const property = isRTL() ? 'paddingRight' : 'paddingLeft';
	      this._element.style[property] = `${scrollbarWidth}px`;
	    }
	  }
	  _resetAdjustments() {
	    this._element.style.paddingLeft = '';
	    this._element.style.paddingRight = '';
	  }

	  // Static
	  static jQueryInterface(config, relatedTarget) {
	    return this.each(function () {
	      const data = Modal.getOrCreateInstance(this, config);
	      if (typeof config !== 'string') {
	        return;
	      }
	      if (typeof data[config] === 'undefined') {
	        throw new TypeError(`No method named "${config}"`);
	      }
	      data[config](relatedTarget);
	    });
	  }
	}

	/**
	 * Data API implementation
	 */

	EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
	  const target = SelectorEngine.getElementFromSelector(this);
	  if (['A', 'AREA'].includes(this.tagName)) {
	    event.preventDefault();
	  }
	  EventHandler.one(target, EVENT_SHOW$4, showEvent => {
	    if (showEvent.defaultPrevented) {
	      // only register focus restorer if modal will actually get shown
	      return;
	    }
	    EventHandler.one(target, EVENT_HIDDEN$4, () => {
	      if (isVisible(this)) {
	        this.focus();
	      }
	    });
	  });

	  // avoid conflict when clicking modal toggler while another one is open
	  const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);
	  if (alreadyOpen) {
	    Modal.getInstance(alreadyOpen).hide();
	  }
	  const data = Modal.getOrCreateInstance(target);
	  data.toggle(this);
	});
	enableDismissTrigger(Modal);

	/**
	 * jQuery
	 */

	defineJQueryPlugin(Modal);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap offcanvas.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */


	/**
	 * Constants
	 */

	const NAME$6 = 'offcanvas';
	const DATA_KEY$3 = 'bs.offcanvas';
	const EVENT_KEY$3 = `.${DATA_KEY$3}`;
	const DATA_API_KEY$1 = '.data-api';
	const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$3}${DATA_API_KEY$1}`;
	const ESCAPE_KEY = 'Escape';
	const CLASS_NAME_SHOW$3 = 'show';
	const CLASS_NAME_SHOWING$1 = 'showing';
	const CLASS_NAME_HIDING = 'hiding';
	const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
	const OPEN_SELECTOR = '.offcanvas.show';
	const EVENT_SHOW$3 = `show${EVENT_KEY$3}`;
	const EVENT_SHOWN$3 = `shown${EVENT_KEY$3}`;
	const EVENT_HIDE$3 = `hide${EVENT_KEY$3}`;
	const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$3}`;
	const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$3}`;
	const EVENT_RESIZE = `resize${EVENT_KEY$3}`;
	const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$3}${DATA_API_KEY$1}`;
	const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$3}`;
	const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
	const Default$5 = {
	  backdrop: true,
	  keyboard: true,
	  scroll: false
	};
	const DefaultType$5 = {
	  backdrop: '(boolean|string)',
	  keyboard: 'boolean',
	  scroll: 'boolean'
	};

	/**
	 * Class definition
	 */

	class Offcanvas extends BaseComponent {
	  constructor(element, config) {
	    super(element, config);
	    this._isShown = false;
	    this._backdrop = this._initializeBackDrop();
	    this._focustrap = this._initializeFocusTrap();
	    this._addEventListeners();
	  }

	  // Getters
	  static get Default() {
	    return Default$5;
	  }
	  static get DefaultType() {
	    return DefaultType$5;
	  }
	  static get NAME() {
	    return NAME$6;
	  }

	  // Public
	  toggle(relatedTarget) {
	    return this._isShown ? this.hide() : this.show(relatedTarget);
	  }
	  show(relatedTarget) {
	    if (this._isShown) {
	      return;
	    }
	    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
	      relatedTarget
	    });
	    if (showEvent.defaultPrevented) {
	      return;
	    }
	    this._isShown = true;
	    this._backdrop.show();
	    if (!this._config.scroll) {
	      new ScrollBarHelper().hide();
	    }
	    this._element.setAttribute('aria-modal', true);
	    this._element.setAttribute('role', 'dialog');
	    this._element.classList.add(CLASS_NAME_SHOWING$1);
	    const completeCallBack = () => {
	      if (!this._config.scroll || this._config.backdrop) {
	        this._focustrap.activate();
	      }
	      this._element.classList.add(CLASS_NAME_SHOW$3);
	      this._element.classList.remove(CLASS_NAME_SHOWING$1);
	      EventHandler.trigger(this._element, EVENT_SHOWN$3, {
	        relatedTarget
	      });
	    };
	    this._queueCallback(completeCallBack, this._element, true);
	  }
	  hide() {
	    if (!this._isShown) {
	      return;
	    }
	    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);
	    if (hideEvent.defaultPrevented) {
	      return;
	    }
	    this._focustrap.deactivate();
	    this._element.blur();
	    this._isShown = false;
	    this._element.classList.add(CLASS_NAME_HIDING);
	    this._backdrop.hide();
	    const completeCallback = () => {
	      this._element.classList.remove(CLASS_NAME_SHOW$3, CLASS_NAME_HIDING);
	      this._element.removeAttribute('aria-modal');
	      this._element.removeAttribute('role');
	      if (!this._config.scroll) {
	        new ScrollBarHelper().reset();
	      }
	      EventHandler.trigger(this._element, EVENT_HIDDEN$3);
	    };
	    this._queueCallback(completeCallback, this._element, true);
	  }
	  dispose() {
	    this._backdrop.dispose();
	    this._focustrap.deactivate();
	    super.dispose();
	  }

	  // Private
	  _initializeBackDrop() {
	    const clickCallback = () => {
	      if (this._config.backdrop === 'static') {
	        EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
	        return;
	      }
	      this.hide();
	    };

	    // 'static' option will be translated to true, and booleans will keep their value
	    const isVisible = Boolean(this._config.backdrop);
	    return new Backdrop({
	      className: CLASS_NAME_BACKDROP,
	      isVisible,
	      isAnimated: true,
	      rootElement: this._element.parentNode,
	      clickCallback: isVisible ? clickCallback : null
	    });
	  }
	  _initializeFocusTrap() {
	    return new FocusTrap({
	      trapElement: this._element
	    });
	  }
	  _addEventListeners() {
	    EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
	      if (event.key !== ESCAPE_KEY) {
	        return;
	      }
	      if (this._config.keyboard) {
	        this.hide();
	        return;
	      }
	      EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
	    });
	  }

	  // Static
	  static jQueryInterface(config) {
	    return this.each(function () {
	      const data = Offcanvas.getOrCreateInstance(this, config);
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

	/**
	 * Data API implementation
	 */

	EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
	  const target = SelectorEngine.getElementFromSelector(this);
	  if (['A', 'AREA'].includes(this.tagName)) {
	    event.preventDefault();
	  }
	  if (isDisabled(this)) {
	    return;
	  }
	  EventHandler.one(target, EVENT_HIDDEN$3, () => {
	    // focus on trigger when it is closed
	    if (isVisible(this)) {
	      this.focus();
	    }
	  });

	  // avoid conflict when clicking a toggler of an offcanvas, while another is open
	  const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
	  if (alreadyOpen && alreadyOpen !== target) {
	    Offcanvas.getInstance(alreadyOpen).hide();
	  }
	  const data = Offcanvas.getOrCreateInstance(target);
	  data.toggle(this);
	});
	EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
	  for (const selector of SelectorEngine.find(OPEN_SELECTOR)) {
	    Offcanvas.getOrCreateInstance(selector).show();
	  }
	});
	EventHandler.on(window, EVENT_RESIZE, () => {
	  for (const element of SelectorEngine.find('[aria-modal][class*=show][class*=offcanvas-]')) {
	    if (getComputedStyle(element).position !== 'fixed') {
	      Offcanvas.getOrCreateInstance(element).hide();
	    }
	  }
	});
	enableDismissTrigger(Offcanvas);

	/**
	 * jQuery
	 */

	defineJQueryPlugin(Offcanvas);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap util/sanitizer.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */

	// js-docs-start allow-list
	const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
	const DefaultAllowlist = {
	  // Global attributes allowed on any supplied element below.
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
	// js-docs-end allow-list

	const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);

	/**
	 * A pattern that recognizes URLs that are safe wrt. XSS in URL navigation
	 * contexts.
	 *
	 * Shout-out to Angular https://github.com/angular/angular/blob/15.2.8/packages/core/src/sanitization/url_sanitizer.ts#L38
	 */
	// eslint-disable-next-line unicorn/better-regex
	const SAFE_URL_PATTERN = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i;
	const allowedAttribute = (attribute, allowedAttributeList) => {
	  const attributeName = attribute.nodeName.toLowerCase();
	  if (allowedAttributeList.includes(attributeName)) {
	    if (uriAttributes.has(attributeName)) {
	      return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue));
	    }
	    return true;
	  }

	  // Check if a regular expression validates the attribute.
	  return allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp).some(regex => regex.test(attributeName));
	};
	function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
	  if (!unsafeHtml.length) {
	    return unsafeHtml;
	  }
	  if (sanitizeFunction && typeof sanitizeFunction === 'function') {
	    return sanitizeFunction(unsafeHtml);
	  }
	  const domParser = new window.DOMParser();
	  const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
	  const elements = [].concat(...createdDocument.body.querySelectorAll('*'));
	  for (const element of elements) {
	    const elementName = element.nodeName.toLowerCase();
	    if (!Object.keys(allowList).includes(elementName)) {
	      element.remove();
	      continue;
	    }
	    const attributeList = [].concat(...element.attributes);
	    const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);
	    for (const attribute of attributeList) {
	      if (!allowedAttribute(attribute, allowedAttributes)) {
	        element.removeAttribute(attribute.nodeName);
	      }
	    }
	  }
	  return createdDocument.body.innerHTML;
	}

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap util/template-factory.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */


	/**
	 * Constants
	 */

	const NAME$5 = 'TemplateFactory';
	const Default$4 = {
	  allowList: DefaultAllowlist,
	  content: {},
	  // { selector : text ,  selector2 : text2 , }
	  extraClass: '',
	  html: false,
	  sanitize: true,
	  sanitizeFn: null,
	  template: '<div></div>'
	};
	const DefaultType$4 = {
	  allowList: 'object',
	  content: 'object',
	  extraClass: '(string|function)',
	  html: 'boolean',
	  sanitize: 'boolean',
	  sanitizeFn: '(null|function)',
	  template: 'string'
	};
	const DefaultContentType = {
	  entry: '(string|element|function|null)',
	  selector: '(string|element)'
	};

	/**
	 * Class definition
	 */

	class TemplateFactory extends Config {
	  constructor(config) {
	    super();
	    this._config = this._getConfig(config);
	  }

	  // Getters
	  static get Default() {
	    return Default$4;
	  }
	  static get DefaultType() {
	    return DefaultType$4;
	  }
	  static get NAME() {
	    return NAME$5;
	  }

	  // Public
	  getContent() {
	    return Object.values(this._config.content).map(config => this._resolvePossibleFunction(config)).filter(Boolean);
	  }
	  hasContent() {
	    return this.getContent().length > 0;
	  }
	  changeContent(content) {
	    this._checkContent(content);
	    this._config.content = {
	      ...this._config.content,
	      ...content
	    };
	    return this;
	  }
	  toHtml() {
	    const templateWrapper = document.createElement('div');
	    templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
	    for (const [selector, text] of Object.entries(this._config.content)) {
	      this._setContent(templateWrapper, text, selector);
	    }
	    const template = templateWrapper.children[0];
	    const extraClass = this._resolvePossibleFunction(this._config.extraClass);
	    if (extraClass) {
	      template.classList.add(...extraClass.split(' '));
	    }
	    return template;
	  }

	  // Private
	  _typeCheckConfig(config) {
	    super._typeCheckConfig(config);
	    this._checkContent(config.content);
	  }
	  _checkContent(arg) {
	    for (const [selector, content] of Object.entries(arg)) {
	      super._typeCheckConfig({
	        selector,
	        entry: content
	      }, DefaultContentType);
	    }
	  }
	  _setContent(template, content, selector) {
	    const templateElement = SelectorEngine.findOne(selector, template);
	    if (!templateElement) {
	      return;
	    }
	    content = this._resolvePossibleFunction(content);
	    if (!content) {
	      templateElement.remove();
	      return;
	    }
	    if (isElement(content)) {
	      this._putElementInTemplate(getElement(content), templateElement);
	      return;
	    }
	    if (this._config.html) {
	      templateElement.innerHTML = this._maybeSanitize(content);
	      return;
	    }
	    templateElement.textContent = content;
	  }
	  _maybeSanitize(arg) {
	    return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
	  }
	  _resolvePossibleFunction(arg) {
	    return execute(arg, [this]);
	  }
	  _putElementInTemplate(element, templateElement) {
	    if (this._config.html) {
	      templateElement.innerHTML = '';
	      templateElement.append(element);
	      return;
	    }
	    templateElement.textContent = element.textContent;
	  }
	}

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap tooltip.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */


	/**
	 * Constants
	 */

	const NAME$4 = 'tooltip';
	const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
	const CLASS_NAME_FADE$2 = 'fade';
	const CLASS_NAME_MODAL = 'modal';
	const CLASS_NAME_SHOW$2 = 'show';
	const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
	const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
	const EVENT_MODAL_HIDE = 'hide.bs.modal';
	const TRIGGER_HOVER = 'hover';
	const TRIGGER_FOCUS = 'focus';
	const TRIGGER_CLICK = 'click';
	const TRIGGER_MANUAL = 'manual';
	const EVENT_HIDE$2 = 'hide';
	const EVENT_HIDDEN$2 = 'hidden';
	const EVENT_SHOW$2 = 'show';
	const EVENT_SHOWN$2 = 'shown';
	const EVENT_INSERTED = 'inserted';
	const EVENT_CLICK$1 = 'click';
	const EVENT_FOCUSIN$1 = 'focusin';
	const EVENT_FOCUSOUT$1 = 'focusout';
	const EVENT_MOUSEENTER = 'mouseenter';
	const EVENT_MOUSELEAVE = 'mouseleave';
	const AttachmentMap = {
	  AUTO: 'auto',
	  TOP: 'top',
	  RIGHT: isRTL() ? 'left' : 'right',
	  BOTTOM: 'bottom',
	  LEFT: isRTL() ? 'right' : 'left'
	};
	const Default$3 = {
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
	  template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
	  title: '',
	  trigger: 'hover focus'
	};
	const DefaultType$3 = {
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
	};

	/**
	 * Class definition
	 */

	class Tooltip extends BaseComponent {
	  constructor(element, config) {
	    if (typeof Popper === 'undefined') {
	      throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
	    }
	    super(element, config);

	    // Private
	    this._isEnabled = true;
	    this._timeout = 0;
	    this._isHovered = null;
	    this._activeTrigger = {};
	    this._popper = null;
	    this._templateFactory = null;
	    this._newContent = null;

	    // Protected
	    this.tip = null;
	    this._setListeners();
	    if (!this._config.selector) {
	      this._fixTitle();
	    }
	  }

	  // Getters
	  static get Default() {
	    return Default$3;
	  }
	  static get DefaultType() {
	    return DefaultType$3;
	  }
	  static get NAME() {
	    return NAME$4;
	  }

	  // Public
	  enable() {
	    this._isEnabled = true;
	  }
	  disable() {
	    this._isEnabled = false;
	  }
	  toggleEnabled() {
	    this._isEnabled = !this._isEnabled;
	  }
	  toggle() {
	    if (!this._isEnabled) {
	      return;
	    }
	    this._activeTrigger.click = !this._activeTrigger.click;
	    if (this._isShown()) {
	      this._leave();
	      return;
	    }
	    this._enter();
	  }
	  dispose() {
	    clearTimeout(this._timeout);
	    EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
	    if (this._element.getAttribute('data-bs-original-title')) {
	      this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title'));
	    }
	    this._disposePopper();
	    super.dispose();
	  }
	  show() {
	    if (this._element.style.display === 'none') {
	      throw new Error('Please use show on visible elements');
	    }
	    if (!(this._isWithContent() && this._isEnabled)) {
	      return;
	    }
	    const showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW$2));
	    const shadowRoot = findShadowRoot(this._element);
	    const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);
	    if (showEvent.defaultPrevented || !isInTheDom) {
	      return;
	    }

	    // TODO: v6 remove this or make it optional
	    this._disposePopper();
	    const tip = this._getTipElement();
	    this._element.setAttribute('aria-describedby', tip.getAttribute('id'));
	    const {
	      container
	    } = this._config;
	    if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
	      container.append(tip);
	      EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
	    }
	    this._popper = this._createPopper(tip);
	    tip.classList.add(CLASS_NAME_SHOW$2);

	    // If this is a touch-enabled device we add extra
	    // empty mouseover listeners to the body's immediate children;
	    // only needed because of broken event delegation on iOS
	    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
	    if ('ontouchstart' in document.documentElement) {
	      for (const element of [].concat(...document.body.children)) {
	        EventHandler.on(element, 'mouseover', noop);
	      }
	    }
	    const complete = () => {
	      EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOWN$2));
	      if (this._isHovered === false) {
	        this._leave();
	      }
	      this._isHovered = false;
	    };
	    this._queueCallback(complete, this.tip, this._isAnimated());
	  }
	  hide() {
	    if (!this._isShown()) {
	      return;
	    }
	    const hideEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE$2));
	    if (hideEvent.defaultPrevented) {
	      return;
	    }
	    const tip = this._getTipElement();
	    tip.classList.remove(CLASS_NAME_SHOW$2);

	    // If this is a touch-enabled device we remove the extra
	    // empty mouseover listeners we added for iOS support
	    if ('ontouchstart' in document.documentElement) {
	      for (const element of [].concat(...document.body.children)) {
	        EventHandler.off(element, 'mouseover', noop);
	      }
	    }
	    this._activeTrigger[TRIGGER_CLICK] = false;
	    this._activeTrigger[TRIGGER_FOCUS] = false;
	    this._activeTrigger[TRIGGER_HOVER] = false;
	    this._isHovered = null; // it is a trick to support manual triggering

	    const complete = () => {
	      if (this._isWithActiveTrigger()) {
	        return;
	      }
	      if (!this._isHovered) {
	        this._disposePopper();
	      }
	      this._element.removeAttribute('aria-describedby');
	      EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN$2));
	    };
	    this._queueCallback(complete, this.tip, this._isAnimated());
	  }
	  update() {
	    if (this._popper) {
	      this._popper.update();
	    }
	  }

	  // Protected
	  _isWithContent() {
	    return Boolean(this._getTitle());
	  }
	  _getTipElement() {
	    if (!this.tip) {
	      this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
	    }
	    return this.tip;
	  }
	  _createTipElement(content) {
	    const tip = this._getTemplateFactory(content).toHtml();

	    // TODO: remove this check in v6
	    if (!tip) {
	      return null;
	    }
	    tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
	    // TODO: v6 the following can be achieved with CSS only
	    tip.classList.add(`bs-${this.constructor.NAME}-auto`);
	    const tipId = getUID(this.constructor.NAME).toString();
	    tip.setAttribute('id', tipId);
	    if (this._isAnimated()) {
	      tip.classList.add(CLASS_NAME_FADE$2);
	    }
	    return tip;
	  }
	  setContent(content) {
	    this._newContent = content;
	    if (this._isShown()) {
	      this._disposePopper();
	      this.show();
	    }
	  }
	  _getTemplateFactory(content) {
	    if (this._templateFactory) {
	      this._templateFactory.changeContent(content);
	    } else {
	      this._templateFactory = new TemplateFactory({
	        ...this._config,
	        // the `content` var has to be after `this._config`
	        // to override config.content in case of popover
	        content,
	        extraClass: this._resolvePossibleFunction(this._config.customClass)
	      });
	    }
	    return this._templateFactory;
	  }
	  _getContentForTemplate() {
	    return {
	      [SELECTOR_TOOLTIP_INNER]: this._getTitle()
	    };
	  }
	  _getTitle() {
	    return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
	  }

	  // Private
	  _initializeOnDelegatedTarget(event) {
	    return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
	  }
	  _isAnimated() {
	    return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE$2);
	  }
	  _isShown() {
	    return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW$2);
	  }
	  _createPopper(tip) {
	    const placement = execute(this._config.placement, [this, tip, this._element]);
	    const attachment = AttachmentMap[placement.toUpperCase()];
	    return createPopper(this._element, tip, this._getPopperConfig(attachment));
	  }
	  _getOffset() {
	    const {
	      offset
	    } = this._config;
	    if (typeof offset === 'string') {
	      return offset.split(',').map(value => Number.parseInt(value, 10));
	    }
	    if (typeof offset === 'function') {
	      return popperData => offset(popperData, this._element);
	    }
	    return offset;
	  }
	  _resolvePossibleFunction(arg) {
	    return execute(arg, [this._element]);
	  }
	  _getPopperConfig(attachment) {
	    const defaultBsPopperConfig = {
	      placement: attachment,
	      modifiers: [{
	        name: 'flip',
	        options: {
	          fallbackPlacements: this._config.fallbackPlacements
	        }
	      }, {
	        name: 'offset',
	        options: {
	          offset: this._getOffset()
	        }
	      }, {
	        name: 'preventOverflow',
	        options: {
	          boundary: this._config.boundary
	        }
	      }, {
	        name: 'arrow',
	        options: {
	          element: `.${this.constructor.NAME}-arrow`
	        }
	      }, {
	        name: 'preSetPlacement',
	        enabled: true,
	        phase: 'beforeMain',
	        fn: data => {
	          // Pre-set Popper's placement attribute in order to read the arrow sizes properly.
	          // Otherwise, Popper mixes up the width and height dimensions since the initial arrow style is for top placement
	          this._getTipElement().setAttribute('data-popper-placement', data.state.placement);
	        }
	      }]
	    };
	    return {
	      ...defaultBsPopperConfig,
	      ...execute(this._config.popperConfig, [defaultBsPopperConfig])
	    };
	  }
	  _setListeners() {
	    const triggers = this._config.trigger.split(' ');
	    for (const trigger of triggers) {
	      if (trigger === 'click') {
	        EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK$1), this._config.selector, event => {
	          const context = this._initializeOnDelegatedTarget(event);
	          context.toggle();
	        });
	      } else if (trigger !== TRIGGER_MANUAL) {
	        const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN$1);
	        const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT$1);
	        EventHandler.on(this._element, eventIn, this._config.selector, event => {
	          const context = this._initializeOnDelegatedTarget(event);
	          context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
	          context._enter();
	        });
	        EventHandler.on(this._element, eventOut, this._config.selector, event => {
	          const context = this._initializeOnDelegatedTarget(event);
	          context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
	          context._leave();
	        });
	      }
	    }
	    this._hideModalHandler = () => {
	      if (this._element) {
	        this.hide();
	      }
	    };
	    EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
	  }
	  _fixTitle() {
	    const title = this._element.getAttribute('title');
	    if (!title) {
	      return;
	    }
	    if (!this._element.getAttribute('aria-label') && !this._element.textContent.trim()) {
	      this._element.setAttribute('aria-label', title);
	    }
	    this._element.setAttribute('data-bs-original-title', title); // DO NOT USE IT. Is only for backwards compatibility
	    this._element.removeAttribute('title');
	  }
	  _enter() {
	    if (this._isShown() || this._isHovered) {
	      this._isHovered = true;
	      return;
	    }
	    this._isHovered = true;
	    this._setTimeout(() => {
	      if (this._isHovered) {
	        this.show();
	      }
	    }, this._config.delay.show);
	  }
	  _leave() {
	    if (this._isWithActiveTrigger()) {
	      return;
	    }
	    this._isHovered = false;
	    this._setTimeout(() => {
	      if (!this._isHovered) {
	        this.hide();
	      }
	    }, this._config.delay.hide);
	  }
	  _setTimeout(handler, timeout) {
	    clearTimeout(this._timeout);
	    this._timeout = setTimeout(handler, timeout);
	  }
	  _isWithActiveTrigger() {
	    return Object.values(this._activeTrigger).includes(true);
	  }
	  _getConfig(config) {
	    const dataAttributes = Manipulator.getDataAttributes(this._element);
	    for (const dataAttribute of Object.keys(dataAttributes)) {
	      if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
	        delete dataAttributes[dataAttribute];
	      }
	    }
	    config = {
	      ...dataAttributes,
	      ...(typeof config === 'object' && config ? config : {})
	    };
	    config = this._mergeConfigObj(config);
	    config = this._configAfterMerge(config);
	    this._typeCheckConfig(config);
	    return config;
	  }
	  _configAfterMerge(config) {
	    config.container = config.container === false ? document.body : getElement(config.container);
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
	    return config;
	  }
	  _getDelegateConfig() {
	    const config = {};
	    for (const [key, value] of Object.entries(this._config)) {
	      if (this.constructor.Default[key] !== value) {
	        config[key] = value;
	      }
	    }
	    config.selector = false;
	    config.trigger = 'manual';

	    // In the future can be replaced with:
	    // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
	    // `Object.fromEntries(keysWithDifferentValues)`
	    return config;
	  }
	  _disposePopper() {
	    if (this._popper) {
	      this._popper.destroy();
	      this._popper = null;
	    }
	    if (this.tip) {
	      this.tip.remove();
	      this.tip = null;
	    }
	  }

	  // Static
	  static jQueryInterface(config) {
	    return this.each(function () {
	      const data = Tooltip.getOrCreateInstance(this, config);
	      if (typeof config !== 'string') {
	        return;
	      }
	      if (typeof data[config] === 'undefined') {
	        throw new TypeError(`No method named "${config}"`);
	      }
	      data[config]();
	    });
	  }
	}

	/**
	 * jQuery
	 */

	defineJQueryPlugin(Tooltip);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap popover.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */


	/**
	 * Constants
	 */

	const NAME$3 = 'popover';
	const SELECTOR_TITLE = '.popover-header';
	const SELECTOR_CONTENT = '.popover-body';
	const Default$2 = {
	  ...Tooltip.Default,
	  content: '',
	  offset: [0, 8],
	  placement: 'right',
	  template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>',
	  trigger: 'click'
	};
	const DefaultType$2 = {
	  ...Tooltip.DefaultType,
	  content: '(null|string|element|function)'
	};

	/**
	 * Class definition
	 */

	class Popover extends Tooltip {
	  // Getters
	  static get Default() {
	    return Default$2;
	  }
	  static get DefaultType() {
	    return DefaultType$2;
	  }
	  static get NAME() {
	    return NAME$3;
	  }

	  // Overrides
	  _isWithContent() {
	    return this._getTitle() || this._getContent();
	  }

	  // Private
	  _getContentForTemplate() {
	    return {
	      [SELECTOR_TITLE]: this._getTitle(),
	      [SELECTOR_CONTENT]: this._getContent()
	    };
	  }
	  _getContent() {
	    return this._resolvePossibleFunction(this._config.content);
	  }

	  // Static
	  static jQueryInterface(config) {
	    return this.each(function () {
	      const data = Popover.getOrCreateInstance(this, config);
	      if (typeof config !== 'string') {
	        return;
	      }
	      if (typeof data[config] === 'undefined') {
	        throw new TypeError(`No method named "${config}"`);
	      }
	      data[config]();
	    });
	  }
	}

	/**
	 * jQuery
	 */

	defineJQueryPlugin(Popover);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap scrollspy.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */


	/**
	 * Constants
	 */

	const NAME$2 = 'scrollspy';
	const DATA_KEY$2 = 'bs.scrollspy';
	const EVENT_KEY$2 = `.${DATA_KEY$2}`;
	const DATA_API_KEY = '.data-api';
	const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
	const EVENT_CLICK = `click${EVENT_KEY$2}`;
	const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$2}${DATA_API_KEY}`;
	const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
	const CLASS_NAME_ACTIVE$1 = 'active';
	const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
	const SELECTOR_TARGET_LINKS = '[href]';
	const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
	const SELECTOR_NAV_LINKS = '.nav-link';
	const SELECTOR_NAV_ITEMS = '.nav-item';
	const SELECTOR_LIST_ITEMS = '.list-group-item';
	const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
	const SELECTOR_DROPDOWN = '.dropdown';
	const SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
	const Default$1 = {
	  offset: null,
	  // TODO: v6 @deprecated, keep it for backwards compatibility reasons
	  rootMargin: '0px 0px -25%',
	  smoothScroll: false,
	  target: null,
	  threshold: [0.1, 0.5, 1]
	};
	const DefaultType$1 = {
	  offset: '(number|null)',
	  // TODO v6 @deprecated, keep it for backwards compatibility reasons
	  rootMargin: 'string',
	  smoothScroll: 'boolean',
	  target: 'element',
	  threshold: 'array'
	};

	/**
	 * Class definition
	 */

	class ScrollSpy extends BaseComponent {
	  constructor(element, config) {
	    super(element, config);

	    // this._element is the observablesContainer and config.target the menu links wrapper
	    this._targetLinks = new Map();
	    this._observableSections = new Map();
	    this._rootElement = getComputedStyle(this._element).overflowY === 'visible' ? null : this._element;
	    this._activeTarget = null;
	    this._observer = null;
	    this._previousScrollData = {
	      visibleEntryTop: 0,
	      parentScrollTop: 0
	    };
	    this.refresh(); // initialize
	  }

	  // Getters
	  static get Default() {
	    return Default$1;
	  }
	  static get DefaultType() {
	    return DefaultType$1;
	  }
	  static get NAME() {
	    return NAME$2;
	  }

	  // Public
	  refresh() {
	    this._initializeTargetsAndObservables();
	    this._maybeEnableSmoothScroll();
	    if (this._observer) {
	      this._observer.disconnect();
	    } else {
	      this._observer = this._getNewObserver();
	    }
	    for (const section of this._observableSections.values()) {
	      this._observer.observe(section);
	    }
	  }
	  dispose() {
	    this._observer.disconnect();
	    super.dispose();
	  }

	  // Private
	  _configAfterMerge(config) {
	    // TODO: on v6 target should be given explicitly & remove the {target: 'ss-target'} case
	    config.target = getElement(config.target) || document.body;

	    // TODO: v6 Only for backwards compatibility reasons. Use rootMargin only
	    config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;
	    if (typeof config.threshold === 'string') {
	      config.threshold = config.threshold.split(',').map(value => Number.parseFloat(value));
	    }
	    return config;
	  }
	  _maybeEnableSmoothScroll() {
	    if (!this._config.smoothScroll) {
	      return;
	    }

	    // unregister any previous listeners
	    EventHandler.off(this._config.target, EVENT_CLICK);
	    EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, event => {
	      const observableSection = this._observableSections.get(event.target.hash);
	      if (observableSection) {
	        event.preventDefault();
	        const root = this._rootElement || window;
	        const height = observableSection.offsetTop - this._element.offsetTop;
	        if (root.scrollTo) {
	          root.scrollTo({
	            top: height,
	            behavior: 'smooth'
	          });
	          return;
	        }

	        // Chrome 60 doesn't support `scrollTo`
	        root.scrollTop = height;
	      }
	    });
	  }
	  _getNewObserver() {
	    const options = {
	      root: this._rootElement,
	      threshold: this._config.threshold,
	      rootMargin: this._config.rootMargin
	    };
	    return new IntersectionObserver(entries => this._observerCallback(entries), options);
	  }

	  // The logic of selection
	  _observerCallback(entries) {
	    const targetElement = entry => this._targetLinks.get(`#${entry.target.id}`);
	    const activate = entry => {
	      this._previousScrollData.visibleEntryTop = entry.target.offsetTop;
	      this._process(targetElement(entry));
	    };
	    const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
	    const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
	    this._previousScrollData.parentScrollTop = parentScrollTop;
	    for (const entry of entries) {
	      if (!entry.isIntersecting) {
	        this._activeTarget = null;
	        this._clearActiveClass(targetElement(entry));
	        continue;
	      }
	      const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop;
	      // if we are scrolling down, pick the bigger offsetTop
	      if (userScrollsDown && entryIsLowerThanPrevious) {
	        activate(entry);
	        // if parent isn't scrolled, let's keep the first visible item, breaking the iteration
	        if (!parentScrollTop) {
	          return;
	        }
	        continue;
	      }

	      // if we are scrolling up, pick the smallest offsetTop
	      if (!userScrollsDown && !entryIsLowerThanPrevious) {
	        activate(entry);
	      }
	    }
	  }
	  _initializeTargetsAndObservables() {
	    this._targetLinks = new Map();
	    this._observableSections = new Map();
	    const targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);
	    for (const anchor of targetLinks) {
	      // ensure that the anchor has an id and is not disabled
	      if (!anchor.hash || isDisabled(anchor)) {
	        continue;
	      }
	      const observableSection = SelectorEngine.findOne(decodeURI(anchor.hash), this._element);

	      // ensure that the observableSection exists & is visible
	      if (isVisible(observableSection)) {
	        this._targetLinks.set(decodeURI(anchor.hash), anchor);
	        this._observableSections.set(anchor.hash, observableSection);
	      }
	    }
	  }
	  _process(target) {
	    if (this._activeTarget === target) {
	      return;
	    }
	    this._clearActiveClass(this._config.target);
	    this._activeTarget = target;
	    target.classList.add(CLASS_NAME_ACTIVE$1);
	    this._activateParents(target);
	    EventHandler.trigger(this._element, EVENT_ACTIVATE, {
	      relatedTarget: target
	    });
	  }
	  _activateParents(target) {
	    // Activate dropdown parents
	    if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
	      SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$1);
	      return;
	    }
	    for (const listGroup of SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP)) {
	      // Set triggered links parents as active
	      // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
	      for (const item of SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS)) {
	        item.classList.add(CLASS_NAME_ACTIVE$1);
	      }
	    }
	  }
	  _clearActiveClass(parent) {
	    parent.classList.remove(CLASS_NAME_ACTIVE$1);
	    const activeNodes = SelectorEngine.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE$1}`, parent);
	    for (const node of activeNodes) {
	      node.classList.remove(CLASS_NAME_ACTIVE$1);
	    }
	  }

	  // Static
	  static jQueryInterface(config) {
	    return this.each(function () {
	      const data = ScrollSpy.getOrCreateInstance(this, config);
	      if (typeof config !== 'string') {
	        return;
	      }
	      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
	        throw new TypeError(`No method named "${config}"`);
	      }
	      data[config]();
	    });
	  }
	}

	/**
	 * Data API implementation
	 */

	EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => {
	  for (const spy of SelectorEngine.find(SELECTOR_DATA_SPY)) {
	    ScrollSpy.getOrCreateInstance(spy);
	  }
	});

	/**
	 * jQuery
	 */

	defineJQueryPlugin(ScrollSpy);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap tab.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */


	/**
	 * Constants
	 */

	const NAME$1 = 'tab';
	const DATA_KEY$1 = 'bs.tab';
	const EVENT_KEY$1 = `.${DATA_KEY$1}`;
	const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
	const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
	const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
	const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
	const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}`;
	const EVENT_KEYDOWN = `keydown${EVENT_KEY$1}`;
	const EVENT_LOAD_DATA_API = `load${EVENT_KEY$1}`;
	const ARROW_LEFT_KEY = 'ArrowLeft';
	const ARROW_RIGHT_KEY = 'ArrowRight';
	const ARROW_UP_KEY = 'ArrowUp';
	const ARROW_DOWN_KEY = 'ArrowDown';
	const HOME_KEY = 'Home';
	const END_KEY = 'End';
	const CLASS_NAME_ACTIVE = 'active';
	const CLASS_NAME_FADE$1 = 'fade';
	const CLASS_NAME_SHOW$1 = 'show';
	const CLASS_DROPDOWN = 'dropdown';
	const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
	const SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
	const NOT_SELECTOR_DROPDOWN_TOGGLE = `:not(${SELECTOR_DROPDOWN_TOGGLE})`;
	const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
	const SELECTOR_OUTER = '.nav-item, .list-group-item';
	const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
	const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'; // TODO: could only be `tab` in v6
	const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
	const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;

	/**
	 * Class definition
	 */

	class Tab extends BaseComponent {
	  constructor(element) {
	    super(element);
	    this._parent = this._element.closest(SELECTOR_TAB_PANEL);
	    if (!this._parent) {
	      return;
	      // TODO: should throw exception in v6
	      // throw new TypeError(`${element.outerHTML} has not a valid parent ${SELECTOR_INNER_ELEM}`)
	    }

	    // Set up initial aria attributes
	    this._setInitialAttributes(this._parent, this._getChildren());
	    EventHandler.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
	  }

	  // Getters
	  static get NAME() {
	    return NAME$1;
	  }

	  // Public
	  show() {
	    // Shows this elem and deactivate the active sibling if exists
	    const innerElem = this._element;
	    if (this._elemIsActive(innerElem)) {
	      return;
	    }

	    // Search for active tab on same parent to deactivate it
	    const active = this._getActiveElem();
	    const hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE$1, {
	      relatedTarget: innerElem
	    }) : null;
	    const showEvent = EventHandler.trigger(innerElem, EVENT_SHOW$1, {
	      relatedTarget: active
	    });
	    if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
	      return;
	    }
	    this._deactivate(active, innerElem);
	    this._activate(innerElem, active);
	  }

	  // Private
	  _activate(element, relatedElem) {
	    if (!element) {
	      return;
	    }
	    element.classList.add(CLASS_NAME_ACTIVE);
	    this._activate(SelectorEngine.getElementFromSelector(element)); // Search and activate/show the proper section

	    const complete = () => {
	      if (element.getAttribute('role') !== 'tab') {
	        element.classList.add(CLASS_NAME_SHOW$1);
	        return;
	      }
	      element.removeAttribute('tabindex');
	      element.setAttribute('aria-selected', true);
	      this._toggleDropDown(element, true);
	      EventHandler.trigger(element, EVENT_SHOWN$1, {
	        relatedTarget: relatedElem
	      });
	    };
	    this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
	  }
	  _deactivate(element, relatedElem) {
	    if (!element) {
	      return;
	    }
	    element.classList.remove(CLASS_NAME_ACTIVE);
	    element.blur();
	    this._deactivate(SelectorEngine.getElementFromSelector(element)); // Search and deactivate the shown section too

	    const complete = () => {
	      if (element.getAttribute('role') !== 'tab') {
	        element.classList.remove(CLASS_NAME_SHOW$1);
	        return;
	      }
	      element.setAttribute('aria-selected', false);
	      element.setAttribute('tabindex', '-1');
	      this._toggleDropDown(element, false);
	      EventHandler.trigger(element, EVENT_HIDDEN$1, {
	        relatedTarget: relatedElem
	      });
	    };
	    this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
	  }
	  _keydown(event) {
	    if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY, HOME_KEY, END_KEY].includes(event.key)) {
	      return;
	    }
	    event.stopPropagation(); // stopPropagation/preventDefault both added to support up/down keys without scrolling the page
	    event.preventDefault();
	    const children = this._getChildren().filter(element => !isDisabled(element));
	    let nextActiveElement;
	    if ([HOME_KEY, END_KEY].includes(event.key)) {
	      nextActiveElement = children[event.key === HOME_KEY ? 0 : children.length - 1];
	    } else {
	      const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
	      nextActiveElement = getNextActiveElement(children, event.target, isNext, true);
	    }
	    if (nextActiveElement) {
	      nextActiveElement.focus({
	        preventScroll: true
	      });
	      Tab.getOrCreateInstance(nextActiveElement).show();
	    }
	  }
	  _getChildren() {
	    // collection of inner elements
	    return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
	  }
	  _getActiveElem() {
	    return this._getChildren().find(child => this._elemIsActive(child)) || null;
	  }
	  _setInitialAttributes(parent, children) {
	    this._setAttributeIfNotExists(parent, 'role', 'tablist');
	    for (const child of children) {
	      this._setInitialAttributesOnChild(child);
	    }
	  }
	  _setInitialAttributesOnChild(child) {
	    child = this._getInnerElement(child);
	    const isActive = this._elemIsActive(child);
	    const outerElem = this._getOuterElement(child);
	    child.setAttribute('aria-selected', isActive);
	    if (outerElem !== child) {
	      this._setAttributeIfNotExists(outerElem, 'role', 'presentation');
	    }
	    if (!isActive) {
	      child.setAttribute('tabindex', '-1');
	    }
	    this._setAttributeIfNotExists(child, 'role', 'tab');

	    // set attributes to the related panel too
	    this._setInitialAttributesOnTargetPanel(child);
	  }
	  _setInitialAttributesOnTargetPanel(child) {
	    const target = SelectorEngine.getElementFromSelector(child);
	    if (!target) {
	      return;
	    }
	    this._setAttributeIfNotExists(target, 'role', 'tabpanel');
	    if (child.id) {
	      this._setAttributeIfNotExists(target, 'aria-labelledby', `${child.id}`);
	    }
	  }
	  _toggleDropDown(element, open) {
	    const outerElem = this._getOuterElement(element);
	    if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
	      return;
	    }
	    const toggle = (selector, className) => {
	      const element = SelectorEngine.findOne(selector, outerElem);
	      if (element) {
	        element.classList.toggle(className, open);
	      }
	    };
	    toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
	    toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW$1);
	    outerElem.setAttribute('aria-expanded', open);
	  }
	  _setAttributeIfNotExists(element, attribute, value) {
	    if (!element.hasAttribute(attribute)) {
	      element.setAttribute(attribute, value);
	    }
	  }
	  _elemIsActive(elem) {
	    return elem.classList.contains(CLASS_NAME_ACTIVE);
	  }

	  // Try to get the inner element (usually the .nav-link)
	  _getInnerElement(elem) {
	    return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
	  }

	  // Try to get the outer element (usually the .nav-item)
	  _getOuterElement(elem) {
	    return elem.closest(SELECTOR_OUTER) || elem;
	  }

	  // Static
	  static jQueryInterface(config) {
	    return this.each(function () {
	      const data = Tab.getOrCreateInstance(this);
	      if (typeof config !== 'string') {
	        return;
	      }
	      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
	        throw new TypeError(`No method named "${config}"`);
	      }
	      data[config]();
	    });
	  }
	}

	/**
	 * Data API implementation
	 */

	EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
	  if (['A', 'AREA'].includes(this.tagName)) {
	    event.preventDefault();
	  }
	  if (isDisabled(this)) {
	    return;
	  }
	  Tab.getOrCreateInstance(this).show();
	});

	/**
	 * Initialize on focus
	 */
	EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
	  for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
	    Tab.getOrCreateInstance(element);
	  }
	});
	/**
	 * jQuery
	 */

	defineJQueryPlugin(Tab);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap toast.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */


	/**
	 * Constants
	 */

	const NAME = 'toast';
	const DATA_KEY = 'bs.toast';
	const EVENT_KEY = `.${DATA_KEY}`;
	const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
	const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
	const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
	const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
	const EVENT_HIDE = `hide${EVENT_KEY}`;
	const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
	const EVENT_SHOW = `show${EVENT_KEY}`;
	const EVENT_SHOWN = `shown${EVENT_KEY}`;
	const CLASS_NAME_FADE = 'fade';
	const CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility
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

	/**
	 * Class definition
	 */

	class Toast extends BaseComponent {
	  constructor(element, config) {
	    super(element, config);
	    this._timeout = null;
	    this._hasMouseInteraction = false;
	    this._hasKeyboardInteraction = false;
	    this._setListeners();
	  }

	  // Getters
	  static get Default() {
	    return Default;
	  }
	  static get DefaultType() {
	    return DefaultType;
	  }
	  static get NAME() {
	    return NAME;
	  }

	  // Public
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
	      EventHandler.trigger(this._element, EVENT_SHOWN);
	      this._maybeScheduleHide();
	    };
	    this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated
	    reflow(this._element);
	    this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);
	    this._queueCallback(complete, this._element, this._config.animation);
	  }
	  hide() {
	    if (!this.isShown()) {
	      return;
	    }
	    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
	    if (hideEvent.defaultPrevented) {
	      return;
	    }
	    const complete = () => {
	      this._element.classList.add(CLASS_NAME_HIDE); // @deprecated
	      this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);
	      EventHandler.trigger(this._element, EVENT_HIDDEN);
	    };
	    this._element.classList.add(CLASS_NAME_SHOWING);
	    this._queueCallback(complete, this._element, this._config.animation);
	  }
	  dispose() {
	    this._clearTimeout();
	    if (this.isShown()) {
	      this._element.classList.remove(CLASS_NAME_SHOW);
	    }
	    super.dispose();
	  }
	  isShown() {
	    return this._element.classList.contains(CLASS_NAME_SHOW);
	  }

	  // Private

	  _maybeScheduleHide() {
	    if (!this._config.autohide) {
	      return;
	    }
	    if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
	      return;
	    }
	    this._timeout = setTimeout(() => {
	      this.hide();
	    }, this._config.delay);
	  }
	  _onInteraction(event, isInteracting) {
	    switch (event.type) {
	      case 'mouseover':
	      case 'mouseout':
	        {
	          this._hasMouseInteraction = isInteracting;
	          break;
	        }
	      case 'focusin':
	      case 'focusout':
	        {
	          this._hasKeyboardInteraction = isInteracting;
	          break;
	        }
	    }
	    if (isInteracting) {
	      this._clearTimeout();
	      return;
	    }
	    const nextElement = event.relatedTarget;
	    if (this._element === nextElement || this._element.contains(nextElement)) {
	      return;
	    }
	    this._maybeScheduleHide();
	  }
	  _setListeners() {
	    EventHandler.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
	    EventHandler.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
	    EventHandler.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
	    EventHandler.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
	  }
	  _clearTimeout() {
	    clearTimeout(this._timeout);
	    this._timeout = null;
	  }

	  // Static
	  static jQueryInterface(config) {
	    return this.each(function () {
	      const data = Toast.getOrCreateInstance(this, config);
	      if (typeof config === 'string') {
	        if (typeof data[config] === 'undefined') {
	          throw new TypeError(`No method named "${config}"`);
	        }
	        data[config](this);
	      }
	    });
	  }
	}

	/**
	 * Data API implementation
	 */

	enableDismissTrigger(Toast);

	/**
	 * jQuery
	 */

	defineJQueryPlugin(Toast);

	const bootstrap = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
		__proto__: null,
		Alert,
		Button,
		Carousel,
		Collapse,
		Dropdown,
		Modal,
		Offcanvas,
		Popover,
		ScrollSpy,
		Tab,
		Toast,
		Tooltip
	}, Symbol.toStringTag, { value: 'Module' }));

	/*
	Core dropdowns
	 */
	var dropdownTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'));
	dropdownTriggerList.map(function (dropdownTriggerEl) {
	  var options = {
	    boundary: dropdownTriggerEl.getAttribute('data-bs-boundary') === 'viewport' ? document.querySelector('.btn') : 'clippingParents'
	  };
	  return new Dropdown(dropdownTriggerEl, options);
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

	/*
	Core popovers
	 */
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

	/*
	Switch icons
	 */
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
	EnableActivationTabsFromLocationHash();

	/*
	Toasts
	 */
	var toastsTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="toast"]'));
	toastsTriggerList.map(function (toastTriggerEl) {
	  if (!toastTriggerEl.hasAttribute('data-bs-target')) {
	    return;
	  }
	  var toastEl = new Toast(toastTriggerEl.getAttribute('data-bs-target'));
	  toastTriggerEl.addEventListener('click', function () {
	    toastEl.show();
	  });
	});

	var prefix = 'tblr-';
	var hexToRgba = function hexToRgba(hex, opacity) {
	  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	  return result ? "rgba(".concat(parseInt(result[1], 16), ", ").concat(parseInt(result[2], 16), ", ").concat(parseInt(result[3], 16), ", ").concat(opacity, ")") : null;
	};
	var getColor = function getColor(color) {
	  var opacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	  var c = getComputedStyle(document.body).getPropertyValue("--".concat(prefix).concat(color)).trim();
	  if (opacity !== 1) {
	    return hexToRgba(c, opacity);
	  }
	  return c;
	};

	const tabler = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
		__proto__: null,
		getColor,
		hexToRgba,
		prefix
	}, Symbol.toStringTag, { value: 'Module' }));

	//Vendor

	globalThis.bootstrap = bootstrap;
	globalThis.tabler = tabler;

}));
//# sourceMappingURL=tabler.bundle.js.map
