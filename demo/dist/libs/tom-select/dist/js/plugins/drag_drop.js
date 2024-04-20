/**
* Tom Select v2.3.1
* Licensed under the Apache License, Version 2.0 (the "License");
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.drag_drop = factory());
})(this, (function () { 'use strict';

	/**
	 * Converts a scalar to its best string representation
	 * for hash keys and HTML attribute values.
	 *
	 * Transformations:
	 *   'str'     -> 'str'
	 *   null      -> ''
	 *   undefined -> ''
	 *   true      -> '1'
	 *   false     -> '0'
	 *   0         -> '0'
	 *   1         -> '1'
	 *
	 */

	/**
	 * Prevent default
	 *
	 */
	const preventDefault = (evt, stop = false) => {
	  if (evt) {
	    evt.preventDefault();
	    if (stop) {
	      evt.stopPropagation();
	    }
	  }
	};

	/**
	 * Add event helper
	 *
	 */
	const addEvent = (target, type, callback, options) => {
	  target.addEventListener(type, callback, options);
	};

	/*! @orchidjs/unicode-variants | https://github.com/orchidjs/unicode-variants | Apache License (v2) */
	const accent_pat = '[\u0300-\u036F\u{b7}\u{2be}\u{2bc}]';
	/** @type {TUnicodeMap} */

	const latin_convert = {};
	/** @type {TUnicodeMap} */

	const latin_condensed = {
	  '/': '⁄∕',
	  '0': '߀',
	  "a": "ⱥɐɑ",
	  "aa": "ꜳ",
	  "ae": "æǽǣ",
	  "ao": "ꜵ",
	  "au": "ꜷ",
	  "av": "ꜹꜻ",
	  "ay": "ꜽ",
	  "b": "ƀɓƃ",
	  "c": "ꜿƈȼↄ",
	  "d": "đɗɖᴅƌꮷԁɦ",
	  "e": "ɛǝᴇɇ",
	  "f": "ꝼƒ",
	  "g": "ǥɠꞡᵹꝿɢ",
	  "h": "ħⱨⱶɥ",
	  "i": "ɨı",
	  "j": "ɉȷ",
	  "k": "ƙⱪꝁꝃꝅꞣ",
	  "l": "łƚɫⱡꝉꝇꞁɭ",
	  "m": "ɱɯϻ",
	  "n": "ꞥƞɲꞑᴎлԉ",
	  "o": "øǿɔɵꝋꝍᴑ",
	  "oe": "œ",
	  "oi": "ƣ",
	  "oo": "ꝏ",
	  "ou": "ȣ",
	  "p": "ƥᵽꝑꝓꝕρ",
	  "q": "ꝗꝙɋ",
	  "r": "ɍɽꝛꞧꞃ",
	  "s": "ßȿꞩꞅʂ",
	  "t": "ŧƭʈⱦꞇ",
	  "th": "þ",
	  "tz": "ꜩ",
	  "u": "ʉ",
	  "v": "ʋꝟʌ",
	  "vy": "ꝡ",
	  "w": "ⱳ",
	  "y": "ƴɏỿ",
	  "z": "ƶȥɀⱬꝣ",
	  "hv": "ƕ"
	};

	for (let latin in latin_condensed) {
	  let unicode = latin_condensed[latin] || '';

	  for (let i = 0; i < unicode.length; i++) {
	    let char = unicode.substring(i, i + 1);
	    latin_convert[char] = latin;
	  }
	}

	new RegExp(Object.keys(latin_convert).join('|') + '|' + accent_pat, 'gu');

	/**
	 * Iterates over arrays and hashes.
	 *
	 * ```
	 * iterate(this.items, function(item, id) {
	 *    // invoked for each item
	 * });
	 * ```
	 *
	 */
	const iterate = (object, callback) => {
	  if (Array.isArray(object)) {
	    object.forEach(callback);
	  } else {
	    for (var key in object) {
	      if (object.hasOwnProperty(key)) {
	        callback(object[key], key);
	      }
	    }
	  }
	};

	/**
	 * Return a dom element from either a dom query string, jQuery object, a dom element or html string
	 * https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
	 *
	 * param query should be {}
	 */
	const getDom = query => {
	  if (query.jquery) {
	    return query[0];
	  }
	  if (query instanceof HTMLElement) {
	    return query;
	  }
	  if (isHtmlString(query)) {
	    var tpl = document.createElement('template');
	    tpl.innerHTML = query.trim(); // Never return a text node of whitespace as the result
	    return tpl.content.firstChild;
	  }
	  return document.querySelector(query);
	};
	const isHtmlString = arg => {
	  if (typeof arg === 'string' && arg.indexOf('<') > -1) {
	    return true;
	  }
	  return false;
	};

	/**
	 * Set attributes of an element
	 *
	 */
	const setAttr = (el, attrs) => {
	  iterate(attrs, (val, attr) => {
	    if (val == null) {
	      el.removeAttribute(attr);
	    } else {
	      el.setAttribute(attr, '' + val);
	    }
	  });
	};

	/**
	 * Plugin: "drag_drop" (Tom Select)
	 * Copyright (c) contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	 * file except in compliance with the License. You may obtain a copy of the License at:
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software distributed under
	 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	 * ANY KIND, either express or implied. See the License for the specific language
	 * governing permissions and limitations under the License.
	 *
	 */

	const insertAfter = (referenceNode, newNode) => {
	  var _referenceNode$parent;
	  (_referenceNode$parent = referenceNode.parentNode) == null || _referenceNode$parent.insertBefore(newNode, referenceNode.nextSibling);
	};
	const insertBefore = (referenceNode, newNode) => {
	  var _referenceNode$parent2;
	  (_referenceNode$parent2 = referenceNode.parentNode) == null || _referenceNode$parent2.insertBefore(newNode, referenceNode);
	};
	const isBefore = (referenceNode, newNode) => {
	  do {
	    var _newNode;
	    newNode = (_newNode = newNode) == null ? void 0 : _newNode.previousElementSibling;
	    if (referenceNode == newNode) {
	      return true;
	    }
	  } while (newNode && newNode.previousElementSibling);
	  return false;
	};
	function plugin () {
	  var self = this;
	  if (self.settings.mode !== 'multi') return;
	  var orig_lock = self.lock;
	  var orig_unlock = self.unlock;
	  let sortable = true;
	  let drag_item;

	  /**
	   * Add draggable attribute to item
	   */
	  self.hook('after', 'setupTemplates', () => {
	    var orig_render_item = self.settings.render.item;
	    self.settings.render.item = (data, escape) => {
	      const item = getDom(orig_render_item.call(self, data, escape));
	      setAttr(item, {
	        'draggable': 'true'
	      });

	      // prevent doc_mousedown (see tom-select.ts)
	      const mousedown = evt => {
	        if (!sortable) preventDefault(evt);
	        evt.stopPropagation();
	      };
	      const dragStart = evt => {
	        drag_item = item;
	        setTimeout(() => {
	          item.classList.add('ts-dragging');
	        }, 0);
	      };
	      const dragOver = evt => {
	        evt.preventDefault();
	        item.classList.add('ts-drag-over');
	        moveitem(item, drag_item);
	      };
	      const dragLeave = () => {
	        item.classList.remove('ts-drag-over');
	      };
	      const moveitem = (targetitem, dragitem) => {
	        if (dragitem === undefined) return;
	        if (isBefore(dragitem, item)) {
	          insertAfter(targetitem, dragitem);
	        } else {
	          insertBefore(targetitem, dragitem);
	        }
	      };
	      const dragend = () => {
	        var _drag_item;
	        document.querySelectorAll('.ts-drag-over').forEach(el => el.classList.remove('ts-drag-over'));
	        (_drag_item = drag_item) == null || _drag_item.classList.remove('ts-dragging');
	        drag_item = undefined;
	        var values = [];
	        self.control.querySelectorAll(`[data-value]`).forEach(el => {
	          if (el.dataset.value) {
	            let value = el.dataset.value;
	            if (value) {
	              values.push(value);
	            }
	          }
	        });
	        self.setValue(values);
	      };
	      addEvent(item, 'mousedown', mousedown);
	      addEvent(item, 'dragstart', dragStart);
	      addEvent(item, 'dragenter', dragOver);
	      addEvent(item, 'dragover', dragOver);
	      addEvent(item, 'dragleave', dragLeave);
	      addEvent(item, 'dragend', dragend);
	      return item;
	    };
	  });
	  self.hook('instead', 'lock', () => {
	    sortable = false;
	    return orig_lock.call(self);
	  });
	  self.hook('instead', 'unlock', () => {
	    sortable = true;
	    return orig_unlock.call(self);
	  });
	}

	return plugin;

}));
//# sourceMappingURL=drag_drop.js.map
