/**
* Tom Select v2.3.1
* Licensed under the Apache License, Version 2.0 (the "License");
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.checkbox_options = factory());
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
	const hash_key = value => {
	  if (typeof value === 'undefined' || value === null) return null;
	  return get_hash(value);
	};
	const get_hash = value => {
	  if (typeof value === 'boolean') return value ? '1' : '0';
	  return value + '';
	};

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
	 * Plugin: "checkbox_options" (Tom Select)
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

	function plugin (userOptions) {
	  var self = this;
	  var orig_onOptionSelect = self.onOptionSelect;
	  self.settings.hideSelected = false;
	  const cbOptions = Object.assign({
	    // so that the user may add different ones as well
	    className: "tomselect-checkbox",
	    // the following default to the historic plugin's values
	    checkedClassNames: undefined,
	    uncheckedClassNames: undefined
	  }, userOptions);
	  var UpdateChecked = function UpdateChecked(checkbox, toCheck) {
	    if (toCheck) {
	      checkbox.checked = true;
	      if (cbOptions.uncheckedClassNames) {
	        checkbox.classList.remove(...cbOptions.uncheckedClassNames);
	      }
	      if (cbOptions.checkedClassNames) {
	        checkbox.classList.add(...cbOptions.checkedClassNames);
	      }
	    } else {
	      checkbox.checked = false;
	      if (cbOptions.checkedClassNames) {
	        checkbox.classList.remove(...cbOptions.checkedClassNames);
	      }
	      if (cbOptions.uncheckedClassNames) {
	        checkbox.classList.add(...cbOptions.uncheckedClassNames);
	      }
	    }
	  };

	  // update the checkbox for an option
	  var UpdateCheckbox = function UpdateCheckbox(option) {
	    setTimeout(() => {
	      var checkbox = option.querySelector('input.' + cbOptions.className);
	      if (checkbox instanceof HTMLInputElement) {
	        UpdateChecked(checkbox, option.classList.contains('selected'));
	      }
	    }, 1);
	  };

	  // add checkbox to option template
	  self.hook('after', 'setupTemplates', () => {
	    var orig_render_option = self.settings.render.option;
	    self.settings.render.option = (data, escape_html) => {
	      var rendered = getDom(orig_render_option.call(self, data, escape_html));
	      var checkbox = document.createElement('input');
	      if (cbOptions.className) {
	        checkbox.classList.add(cbOptions.className);
	      }
	      checkbox.addEventListener('click', function (evt) {
	        preventDefault(evt);
	      });
	      checkbox.type = 'checkbox';
	      const hashed = hash_key(data[self.settings.valueField]);
	      UpdateChecked(checkbox, !!(hashed && self.items.indexOf(hashed) > -1));
	      rendered.prepend(checkbox);
	      return rendered;
	    };
	  });

	  // uncheck when item removed
	  self.on('item_remove', value => {
	    var option = self.getOption(value);
	    if (option) {
	      // if dropdown hasn't been opened yet, the option won't exist
	      option.classList.remove('selected'); // selected class won't be removed yet
	      UpdateCheckbox(option);
	    }
	  });

	  // check when item added
	  self.on('item_add', value => {
	    var option = self.getOption(value);
	    if (option) {
	      // if dropdown hasn't been opened yet, the option won't exist
	      UpdateCheckbox(option);
	    }
	  });

	  // remove items when selected option is clicked
	  self.hook('instead', 'onOptionSelect', (evt, option) => {
	    if (option.classList.contains('selected')) {
	      option.classList.remove('selected');
	      self.removeItem(option.dataset.value);
	      self.refreshOptions();
	      preventDefault(evt, true);
	      return;
	    }
	    orig_onOptionSelect.call(self, evt, option);
	    UpdateCheckbox(option);
	  });
	}

	return plugin;

}));
//# sourceMappingURL=checkbox_options.js.map
