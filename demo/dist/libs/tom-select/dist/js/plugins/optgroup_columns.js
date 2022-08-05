/**
* Tom Select v2.1.0
* Licensed under the Apache License, Version 2.0 (the "License");
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.optgroup_columns = factory());
})(this, (function () { 'use strict';

	const KEY_LEFT = 37;
	const KEY_RIGHT = 39;
	typeof navigator === 'undefined' ? false : /Mac/.test(navigator.userAgent);
	 // ctrl key or apple key for ma

	// @ts-ignore TS2691 "An import path cannot end with a '.ts' extension"
	const latin_convert = {
	  'æ': 'ae',
	  'ⱥ': 'a',
	  'ø': 'o'
	};
	new RegExp(Object.keys(latin_convert).join('|'), 'gu');

	/**
	 * Get the closest node to the evt.target matching the selector
	 * Stops at wrapper
	 *
	 */

	const parentMatch = (target, selector, wrapper) => {
	  if (wrapper && !wrapper.contains(target)) {
	    return;
	  }

	  while (target && target.matches) {
	    if (target.matches(selector)) {
	      return target;
	    }

	    target = target.parentNode;
	  }
	};
	/**
	 * Get the index of an element amongst sibling nodes of the same type
	 *
	 */

	const nodeIndex = (el, amongst) => {
	  if (!el) return -1;
	  amongst = amongst || el.nodeName;
	  var i = 0;

	  while (el = el.previousElementSibling) {
	    if (el.matches(amongst)) {
	      i++;
	    }
	  }

	  return i;
	};

	/**
	 * Plugin: "optgroup_columns" (Tom Select.js)
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
	function plugin () {
	  var self = this;
	  var orig_keydown = self.onKeyDown;
	  self.hook('instead', 'onKeyDown', evt => {
	    var index, option, options, optgroup;

	    if (!self.isOpen || !(evt.keyCode === KEY_LEFT || evt.keyCode === KEY_RIGHT)) {
	      return orig_keydown.call(self, evt);
	    }

	    self.ignoreHover = true;
	    optgroup = parentMatch(self.activeOption, '[data-group]');
	    index = nodeIndex(self.activeOption, '[data-selectable]');

	    if (!optgroup) {
	      return;
	    }

	    if (evt.keyCode === KEY_LEFT) {
	      optgroup = optgroup.previousSibling;
	    } else {
	      optgroup = optgroup.nextSibling;
	    }

	    if (!optgroup) {
	      return;
	    }

	    options = optgroup.querySelectorAll('[data-selectable]');
	    option = options[Math.min(options.length - 1, index)];

	    if (option) {
	      self.setActiveOption(option);
	    }
	  });
	}

	return plugin;

}));
//# sourceMappingURL=optgroup_columns.js.map
