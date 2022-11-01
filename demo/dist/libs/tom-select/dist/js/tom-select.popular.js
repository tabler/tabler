/**
* Tom Select v2.2.2
* Licensed under the Apache License, Version 2.0 (the "License");
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.TomSelect = factory());
})(this, (function () { 'use strict';

	/**
	 * MicroEvent - to make any js object an event emitter
	 *
	 * - pure javascript - server compatible, browser compatible
	 * - dont rely on the browser doms
	 * - super simple - you get it immediatly, no mistery, no magic involved
	 *
	 * @author Jerome Etienne (https://github.com/jeromeetienne)
	 */

	/**
	 * Execute callback for each event in space separated list of event names
	 *
	 */
	function forEvents(events, callback) {
	  events.split(/\s+/).forEach(event => {
	    callback(event);
	  });
	}

	class MicroEvent {
	  constructor() {
	    this._events = void 0;
	    this._events = {};
	  }

	  on(events, fct) {
	    forEvents(events, event => {
	      const event_array = this._events[event] || [];
	      event_array.push(fct);
	      this._events[event] = event_array;
	    });
	  }

	  off(events, fct) {
	    var n = arguments.length;

	    if (n === 0) {
	      this._events = {};
	      return;
	    }

	    forEvents(events, event => {
	      if (n === 1) {
	        delete this._events[event];
	        return;
	      }

	      const event_array = this._events[event];
	      if (event_array === undefined) return;
	      event_array.splice(event_array.indexOf(fct), 1);
	      this._events[event] = event_array;
	    });
	  }

	  trigger(events, ...args) {
	    var self = this;
	    forEvents(events, event => {
	      const event_array = self._events[event];
	      if (event_array === undefined) return;
	      event_array.forEach(fct => {
	        fct.apply(self, args);
	      });
	    });
	  }

	}

	/**
	 * microplugin.js
	 * Copyright (c) 2013 Brian Reavis & contributors
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
	 * @author Brian Reavis <brian@thirdroute.com>
	 */
	function MicroPlugin(Interface) {
	  Interface.plugins = {};
	  return class extends Interface {
	    constructor(...args) {
	      super(...args);
	      this.plugins = {
	        names: [],
	        settings: {},
	        requested: {},
	        loaded: {}
	      };
	    }

	    /**
	     * Registers a plugin.
	     *
	     * @param {function} fn
	     */
	    static define(name, fn) {
	      Interface.plugins[name] = {
	        'name': name,
	        'fn': fn
	      };
	    }
	    /**
	     * Initializes the listed plugins (with options).
	     * Acceptable formats:
	     *
	     * List (without options):
	     *   ['a', 'b', 'c']
	     *
	     * List (with options):
	     *   [{'name': 'a', options: {}}, {'name': 'b', options: {}}]
	     *
	     * Hash (with options):
	     *   {'a': { ... }, 'b': { ... }, 'c': { ... }}
	     *
	     * @param {array|object} plugins
	     */


	    initializePlugins(plugins) {
	      var key, name;
	      const self = this;
	      const queue = [];

	      if (Array.isArray(plugins)) {
	        plugins.forEach(plugin => {
	          if (typeof plugin === 'string') {
	            queue.push(plugin);
	          } else {
	            self.plugins.settings[plugin.name] = plugin.options;
	            queue.push(plugin.name);
	          }
	        });
	      } else if (plugins) {
	        for (key in plugins) {
	          if (plugins.hasOwnProperty(key)) {
	            self.plugins.settings[key] = plugins[key];
	            queue.push(key);
	          }
	        }
	      }

	      while (name = queue.shift()) {
	        self.require(name);
	      }
	    }

	    loadPlugin(name) {
	      var self = this;
	      var plugins = self.plugins;
	      var plugin = Interface.plugins[name];

	      if (!Interface.plugins.hasOwnProperty(name)) {
	        throw new Error('Unable to find "' + name + '" plugin');
	      }

	      plugins.requested[name] = true;
	      plugins.loaded[name] = plugin.fn.apply(self, [self.plugins.settings[name] || {}]);
	      plugins.names.push(name);
	    }
	    /**
	     * Initializes a plugin.
	     *
	     */


	    require(name) {
	      var self = this;
	      var plugins = self.plugins;

	      if (!self.plugins.loaded.hasOwnProperty(name)) {
	        if (plugins.requested[name]) {
	          throw new Error('Plugin has circular dependency ("' + name + '")');
	        }

	        self.loadPlugin(name);
	      }

	      return plugins.loaded[name];
	    }

	  };
	}

	/*! @orchidjs/unicode-variants | https://github.com/orchidjs/unicode-variants | Apache License (v2) */
	/**
	 * Convert array of strings to a regular expression
	 *	ex ['ab','a'] => (?:ab|a)
	 * 	ex ['a','b'] => [ab]
	 * @param {string[]} chars
	 * @return {string}
	 */
	const arrayToPattern = chars => {
	  chars = chars.filter(Boolean);

	  if (chars.length < 2) {
	    return chars[0] || '';
	  }

	  return maxValueLength(chars) == 1 ? '[' + chars.join('') + ']' : '(?:' + chars.join('|') + ')';
	};
	/**
	 * @param {string[]} array
	 * @return {string}
	 */

	const sequencePattern = array => {
	  if (!hasDuplicates(array)) {
	    return array.join('');
	  }

	  let pattern = '';
	  let prev_char_count = 0;

	  const prev_pattern = () => {
	    if (prev_char_count > 1) {
	      pattern += '{' + prev_char_count + '}';
	    }
	  };

	  array.forEach((char, i) => {
	    if (char === array[i - 1]) {
	      prev_char_count++;
	      return;
	    }

	    prev_pattern();
	    pattern += char;
	    prev_char_count = 1;
	  });
	  prev_pattern();
	  return pattern;
	};
	/**
	 * Convert array of strings to a regular expression
	 *	ex ['ab','a'] => (?:ab|a)
	 * 	ex ['a','b'] => [ab]
	 * @param {Set<string>} chars
	 * @return {string}
	 */

	const setToPattern = chars => {
	  let array = toArray(chars);
	  return arrayToPattern(array);
	};
	/**
	 *
	 * https://stackoverflow.com/questions/7376598/in-javascript-how-do-i-check-if-an-array-has-duplicate-values
	 * @param {any[]} array
	 */

	const hasDuplicates = array => {
	  return new Set(array).size !== array.length;
	};
	/**
	 * https://stackoverflow.com/questions/63006601/why-does-u-throw-an-invalid-escape-error
	 * @param {string} str
	 * @return {string}
	 */

	const escape_regex = str => {
	  return (str + '').replace(/([\$\(\)\*\+\.\?\[\]\^\{\|\}\\])/gu, '\\$1');
	};
	/**
	 * Return the max length of array values
	 * @param {string[]} array
	 *
	 */

	const maxValueLength = array => {
	  return array.reduce((longest, value) => Math.max(longest, unicodeLength(value)), 0);
	};
	/**
	 * @param {string} str
	 */

	const unicodeLength = str => {
	  return toArray(str).length;
	};
	/**
	 * @param {any} p
	 * @return {any[]}
	 */

	const toArray = p => Array.from(p);

	/*! @orchidjs/unicode-variants | https://github.com/orchidjs/unicode-variants | Apache License (v2) */
	/**
	 * Get all possible combinations of substrings that add up to the given string
	 * https://stackoverflow.com/questions/30169587/find-all-the-combination-of-substrings-that-add-up-to-the-given-string
	 * @param {string} input
	 * @return {string[][]}
	 */
	const allSubstrings = input => {
	  if (input.length === 1) return [[input]];
	  /** @type {string[][]} */

	  let result = [];
	  const start = input.substring(1);
	  const suba = allSubstrings(start);
	  suba.forEach(function (subresult) {
	    let tmp = subresult.slice(0);
	    tmp[0] = input.charAt(0) + tmp[0];
	    result.push(tmp);
	    tmp = subresult.slice(0);
	    tmp.unshift(input.charAt(0));
	    result.push(tmp);
	  });
	  return result;
	};

	/*! @orchidjs/unicode-variants | https://github.com/orchidjs/unicode-variants | Apache License (v2) */

	/**
	 * @typedef {{[key:string]:string}} TUnicodeMap
	 * @typedef {{[key:string]:Set<string>}} TUnicodeSets
	 * @typedef {[[number,number]]} TCodePoints
	 * @typedef {{folded:string,composed:string,code_point:number}} TCodePointObj
	 * @typedef {{start:number,end:number,length:number,substr:string}} TSequencePart
	 */
	/** @type {TCodePoints} */

	const code_points = [[0, 65535]];
	const accent_pat = '[\u0300-\u036F\u{b7}\u{2be}\u{2bc}]';
	/** @type {TUnicodeMap} */

	let unicode_map;
	/** @type {RegExp} */

	let multi_char_reg;
	const max_char_length = 3;
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

	const convert_pat = new RegExp(Object.keys(latin_convert).join('|') + '|' + accent_pat, 'gu');
	/**
	 * Initialize the unicode_map from the give code point ranges
	 *
	 * @param {TCodePoints=} _code_points
	 */

	const initialize = _code_points => {
	  if (unicode_map !== undefined) return;
	  unicode_map = generateMap(_code_points || code_points);
	};
	/**
	 * Helper method for normalize a string
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
	 * @param {string} str
	 * @param {string} form
	 */

	const normalize = (str, form = 'NFKD') => str.normalize(form);
	/**
	 * Remove accents without reordering string
	 * calling str.normalize('NFKD') on \u{594}\u{595}\u{596} becomes \u{596}\u{594}\u{595}
	 * via https://github.com/krisk/Fuse/issues/133#issuecomment-318692703
	 * @param {string} str
	 * @return {string}
	 */

	const asciifold = str => {
	  return toArray(str).reduce(
	  /**
	   * @param {string} result
	   * @param {string} char
	   */
	  (result, char) => {
	    return result + _asciifold(char);
	  }, '');
	};
	/**
	 * @param {string} str
	 * @return {string}
	 */

	const _asciifold = str => {
	  str = normalize(str).toLowerCase().replace(convert_pat, (
	  /** @type {string} */
	  char) => {
	    return latin_convert[char] || '';
	  }); //return str;

	  return normalize(str, 'NFC');
	};
	/**
	 * Generate a list of unicode variants from the list of code points
	 * @param {TCodePoints} code_points
	 * @yield {TCodePointObj}
	 */

	function* generator(code_points) {
	  for (const [code_point_min, code_point_max] of code_points) {
	    for (let i = code_point_min; i <= code_point_max; i++) {
	      let composed = String.fromCharCode(i);
	      let folded = asciifold(composed);

	      if (folded == composed.toLowerCase()) {
	        continue;
	      } // skip when folded is a string longer than 3 characters long
	      // bc the resulting regex patterns will be long
	      // eg:
	      // folded صلى الله عليه وسلم length 18 code point 65018
	      // folded جل جلاله length 8 code point 65019


	      if (folded.length > max_char_length) {
	        continue;
	      }

	      if (folded.length == 0) {
	        continue;
	      }

	      yield {
	        folded: folded,
	        composed: composed,
	        code_point: i
	      };
	    }
	  }
	}
	/**
	 * Generate a unicode map from the list of code points
	 * @param {TCodePoints} code_points
	 * @return {TUnicodeSets}
	 */

	const generateSets = code_points => {
	  /** @type {{[key:string]:Set<string>}} */
	  const unicode_sets = {};
	  /**
	   * @param {string} folded
	   * @param {string} to_add
	   */

	  const addMatching = (folded, to_add) => {
	    /** @type {Set<string>} */
	    const folded_set = unicode_sets[folded] || new Set();
	    const patt = new RegExp('^' + setToPattern(folded_set) + '$', 'iu');

	    if (to_add.match(patt)) {
	      return;
	    }

	    folded_set.add(escape_regex(to_add));
	    unicode_sets[folded] = folded_set;
	  };

	  for (let value of generator(code_points)) {
	    addMatching(value.folded, value.folded);
	    addMatching(value.folded, value.composed);
	  }

	  return unicode_sets;
	};
	/**
	 * Generate a unicode map from the list of code points
	 * ae => (?:(?:ae|Æ|Ǽ|Ǣ)|(?:A|Ⓐ|Ａ...)(?:E|ɛ|Ⓔ...))
	 *
	 * @param {TCodePoints} code_points
	 * @return {TUnicodeMap}
	 */

	const generateMap = code_points => {
	  /** @type {TUnicodeSets} */
	  const unicode_sets = generateSets(code_points);
	  /** @type {TUnicodeMap} */

	  const unicode_map = {};
	  /** @type {string[]} */

	  let multi_char = [];

	  for (let folded in unicode_sets) {
	    let set = unicode_sets[folded];

	    if (set) {
	      unicode_map[folded] = setToPattern(set);
	    }

	    if (folded.length > 1) {
	      multi_char.push(escape_regex(folded));
	    }
	  }

	  multi_char.sort((a, b) => b.length - a.length);
	  const multi_char_patt = arrayToPattern(multi_char);
	  multi_char_reg = new RegExp('^' + multi_char_patt, 'u');
	  return unicode_map;
	};
	/**
	 * Map each element of an array from it's folded value to all possible unicode matches
	 * @param {string[]} strings
	 * @param {number} min_replacement
	 * @return {string}
	 */

	const mapSequence = (strings, min_replacement = 1) => {
	  let chars_replaced = 0;
	  strings = strings.map(str => {
	    if (unicode_map[str]) {
	      chars_replaced += str.length;
	    }

	    return unicode_map[str] || str;
	  });

	  if (chars_replaced >= min_replacement) {
	    return sequencePattern(strings);
	  }

	  return '';
	};
	/**
	 * Convert a short string and split it into all possible patterns
	 * Keep a pattern only if min_replacement is met
	 *
	 * 'abc'
	 * 		=> [['abc'],['ab','c'],['a','bc'],['a','b','c']]
	 *		=> ['abc-pattern','ab-c-pattern'...]
	 *
	 *
	 * @param {string} str
	 * @param {number} min_replacement
	 * @return {string}
	 */

	const substringsToPattern = (str, min_replacement = 1) => {
	  min_replacement = Math.max(min_replacement, str.length - 1);
	  return arrayToPattern(allSubstrings(str).map(sub_pat => {
	    return mapSequence(sub_pat, min_replacement);
	  }));
	};
	/**
	 * Convert an array of sequences into a pattern
	 * [{start:0,end:3,length:3,substr:'iii'}...] => (?:iii...)
	 *
	 * @param {Sequence[]} sequences
	 * @param {boolean} all
	 */

	const sequencesToPattern = (sequences, all = true) => {
	  let min_replacement = sequences.length > 1 ? 1 : 0;
	  return arrayToPattern(sequences.map(sequence => {
	    let seq = [];
	    const len = all ? sequence.length() : sequence.length() - 1;

	    for (let j = 0; j < len; j++) {
	      seq.push(substringsToPattern(sequence.substrs[j] || '', min_replacement));
	    }

	    return sequencePattern(seq);
	  }));
	};
	/**
	 * Return true if the sequence is already in the sequences
	 * @param {Sequence} needle_seq
	 * @param {Sequence[]} sequences
	 */


	const inSequences = (needle_seq, sequences) => {
	  for (const seq of sequences) {
	    if (seq.start != needle_seq.start || seq.end != needle_seq.end) {
	      continue;
	    }

	    if (seq.substrs.join('') !== needle_seq.substrs.join('')) {
	      continue;
	    }

	    let needle_parts = needle_seq.parts;
	    /**
	     * @param {TSequencePart} part
	     */

	    const filter = part => {
	      for (const needle_part of needle_parts) {
	        if (needle_part.start === part.start && needle_part.substr === part.substr) {
	          return false;
	        }

	        if (part.length == 1 || needle_part.length == 1) {
	          continue;
	        } // check for overlapping parts
	        // a = ['::=','==']
	        // b = ['::','===']
	        // a = ['r','sm']
	        // b = ['rs','m']


	        if (part.start < needle_part.start && part.end > needle_part.start) {
	          return true;
	        }

	        if (needle_part.start < part.start && needle_part.end > part.start) {
	          return true;
	        }
	      }

	      return false;
	    };

	    let filtered = seq.parts.filter(filter);

	    if (filtered.length > 0) {
	      continue;
	    }

	    return true;
	  }

	  return false;
	};

	class Sequence {
	  constructor() {
	    /** @type {TSequencePart[]} */
	    this.parts = [];
	    /** @type {string[]} */

	    this.substrs = [];
	    this.start = 0;
	    this.end = 0;
	  }
	  /**
	   * @param {TSequencePart|undefined} part
	   */


	  add(part) {
	    if (part) {
	      this.parts.push(part);
	      this.substrs.push(part.substr);
	      this.start = Math.min(part.start, this.start);
	      this.end = Math.max(part.end, this.end);
	    }
	  }

	  last() {
	    return this.parts[this.parts.length - 1];
	  }

	  length() {
	    return this.parts.length;
	  }
	  /**
	   * @param {number} position
	   * @param {TSequencePart} last_piece
	   */


	  clone(position, last_piece) {
	    let clone = new Sequence();
	    let parts = JSON.parse(JSON.stringify(this.parts));
	    let last_part = parts.pop();

	    for (const part of parts) {
	      clone.add(part);
	    }

	    let last_substr = last_piece.substr.substring(0, position - last_part.start);
	    let clone_last_len = last_substr.length;
	    clone.add({
	      start: last_part.start,
	      end: last_part.start + clone_last_len,
	      length: clone_last_len,
	      substr: last_substr
	    });
	    return clone;
	  }

	}
	/**
	 * Expand a regular expression pattern to include unicode variants
	 * 	eg /a/ becomes /aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐɑAⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ/
	 *
	 * Issue:
	 *  ﺊﺋ [ 'ﺊ = \\u{fe8a}', 'ﺋ = \\u{fe8b}' ]
	 *	becomes:	ئئ [ 'ي = \\u{64a}', 'ٔ = \\u{654}', 'ي = \\u{64a}', 'ٔ = \\u{654}' ]
	 *
	 *	İĲ = IIJ = ⅡJ
	 *
	 * 	1/2/4
	 *
	 * @param {string} str
	 * @return {string|undefined}
	 */


	const getPattern = str => {
	  initialize();
	  str = asciifold(str);
	  let pattern = '';
	  let sequences = [new Sequence()];

	  for (let i = 0; i < str.length; i++) {
	    let substr = str.substring(i);
	    let match = substr.match(multi_char_reg);
	    const char = str.substring(i, i + 1);
	    const match_str = match ? match[0] : null; // loop through sequences
	    // add either the char or multi_match

	    let overlapping = [];
	    let added_types = new Set();

	    for (const sequence of sequences) {
	      const last_piece = sequence.last();

	      if (!last_piece || last_piece.length == 1 || last_piece.end <= i) {
	        // if we have a multi match
	        if (match_str) {
	          const len = match_str.length;
	          sequence.add({
	            start: i,
	            end: i + len,
	            length: len,
	            substr: match_str
	          });
	          added_types.add('1');
	        } else {
	          sequence.add({
	            start: i,
	            end: i + 1,
	            length: 1,
	            substr: char
	          });
	          added_types.add('2');
	        }
	      } else if (match_str) {
	        let clone = sequence.clone(i, last_piece);
	        const len = match_str.length;
	        clone.add({
	          start: i,
	          end: i + len,
	          length: len,
	          substr: match_str
	        });
	        overlapping.push(clone);
	      } else {
	        // don't add char
	        // adding would create invalid patterns: 234 => [2,34,4]
	        added_types.add('3');
	      }
	    } // if we have overlapping


	    if (overlapping.length > 0) {
	      // ['ii','iii'] before ['i','i','iii']
	      overlapping = overlapping.sort((a, b) => {
	        return a.length() - b.length();
	      });

	      for (let clone of overlapping) {
	        // don't add if we already have an equivalent sequence
	        if (inSequences(clone, sequences)) {
	          continue;
	        }

	        sequences.push(clone);
	      }

	      continue;
	    } // if we haven't done anything unique
	    // clean up the patterns
	    // helps keep patterns smaller
	    // if str = 'r₨㎧aarss', pattern will be 446 instead of 655


	    if (i > 0 && added_types.size == 1 && !added_types.has('3')) {
	      pattern += sequencesToPattern(sequences, false);
	      let new_seq = new Sequence();
	      const old_seq = sequences[0];

	      if (old_seq) {
	        new_seq.add(old_seq.last());
	      }

	      sequences = [new_seq];
	    }
	  }

	  pattern += sequencesToPattern(sequences, true);
	  return pattern;
	};

	/*! sifter.js | https://github.com/orchidjs/sifter.js | Apache License (v2) */

	/**
	 * A property getter resolving dot-notation
	 * @param  {Object}  obj     The root object to fetch property on
	 * @param  {String}  name    The optionally dotted property name to fetch
	 * @return {Object}          The resolved property value
	 */
	const getAttr = (obj, name) => {
	  if (!obj) return;
	  return obj[name];
	};
	/**
	 * A property getter resolving dot-notation
	 * @param  {Object}  obj     The root object to fetch property on
	 * @param  {String}  name    The optionally dotted property name to fetch
	 * @return {Object}          The resolved property value
	 */

	const getAttrNesting = (obj, name) => {
	  if (!obj) return;
	  var part,
	      names = name.split(".");

	  while ((part = names.shift()) && (obj = obj[part]));

	  return obj;
	};
	/**
	 * Calculates how close of a match the
	 * given value is against a search token.
	 *
	 */

	const scoreValue = (value, token, weight) => {
	  var score, pos;
	  if (!value) return 0;
	  value = value + '';
	  if (token.regex == null) return 0;
	  pos = value.search(token.regex);
	  if (pos === -1) return 0;
	  score = token.string.length / value.length;
	  if (pos === 0) score += 0.5;
	  return score * weight;
	};
	/**
	 * Cast object property to an array if it exists and has a value
	 *
	 */

	const propToArray = (obj, key) => {
	  var value = obj[key];
	  if (typeof value == 'function') return value;

	  if (value && !Array.isArray(value)) {
	    obj[key] = [value];
	  }
	};
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

	const iterate$1 = (object, callback) => {
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
	const cmp = (a, b) => {
	  if (typeof a === 'number' && typeof b === 'number') {
	    return a > b ? 1 : a < b ? -1 : 0;
	  }

	  a = asciifold(a + '').toLowerCase();
	  b = asciifold(b + '').toLowerCase();
	  if (a > b) return 1;
	  if (b > a) return -1;
	  return 0;
	};

	/*! sifter.js | https://github.com/orchidjs/sifter.js | Apache License (v2) */

	/**
	 * sifter.js
	 * Copyright (c) 2013–2020 Brian Reavis & contributors
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
	 * @author Brian Reavis <brian@thirdroute.com>
	 */

	class Sifter {
	  // []|{};

	  /**
	   * Textually searches arrays and hashes of objects
	   * by property (or multiple properties). Designed
	   * specifically for autocomplete.
	   *
	   */
	  constructor(items, settings) {
	    this.items = void 0;
	    this.settings = void 0;
	    this.items = items;
	    this.settings = settings || {
	      diacritics: true
	    };
	  }

	  /**
	   * Splits a search string into an array of individual
	   * regexps to be used to match results.
	   *
	   */
	  tokenize(query, respect_word_boundaries, weights) {
	    if (!query || !query.length) return [];
	    const tokens = [];
	    const words = query.split(/\s+/);
	    var field_regex;

	    if (weights) {
	      field_regex = new RegExp('^(' + Object.keys(weights).map(escape_regex).join('|') + ')\:(.*)$');
	    }

	    words.forEach(word => {
	      let field_match;
	      let field = null;
	      let regex = null; // look for "field:query" tokens

	      if (field_regex && (field_match = word.match(field_regex))) {
	        field = field_match[1];
	        word = field_match[2];
	      }

	      if (word.length > 0) {
	        if (this.settings.diacritics) {
	          regex = getPattern(word) || null;
	        } else {
	          regex = escape_regex(word);
	        }

	        if (regex && respect_word_boundaries) regex = "\\b" + regex;
	      }

	      tokens.push({
	        string: word,
	        regex: regex ? new RegExp(regex, 'iu') : null,
	        field: field
	      });
	    });
	    return tokens;
	  }

	  /**
	   * Returns a function to be used to score individual results.
	   *
	   * Good matches will have a higher score than poor matches.
	   * If an item is not a match, 0 will be returned by the function.
	   *
	   * @returns {T.ScoreFn}
	   */
	  getScoreFunction(query, options) {
	    var search = this.prepareSearch(query, options);
	    return this._getScoreFunction(search);
	  }
	  /**
	   * @returns {T.ScoreFn}
	   *
	   */


	  _getScoreFunction(search) {
	    const tokens = search.tokens,
	          token_count = tokens.length;

	    if (!token_count) {
	      return function () {
	        return 0;
	      };
	    }

	    const fields = search.options.fields,
	          weights = search.weights,
	          field_count = fields.length,
	          getAttrFn = search.getAttrFn;

	    if (!field_count) {
	      return function () {
	        return 1;
	      };
	    }
	    /**
	     * Calculates the score of an object
	     * against the search query.
	     *
	     */


	    const scoreObject = function () {
	      if (field_count === 1) {
	        return function (token, data) {
	          const field = fields[0].field;
	          return scoreValue(getAttrFn(data, field), token, weights[field] || 1);
	        };
	      }

	      return function (token, data) {
	        var sum = 0; // is the token specific to a field?

	        if (token.field) {
	          const value = getAttrFn(data, token.field);

	          if (!token.regex && value) {
	            sum += 1 / field_count;
	          } else {
	            sum += scoreValue(value, token, 1);
	          }
	        } else {
	          iterate$1(weights, (weight, field) => {
	            sum += scoreValue(getAttrFn(data, field), token, weight);
	          });
	        }

	        return sum / field_count;
	      };
	    }();

	    if (token_count === 1) {
	      return function (data) {
	        return scoreObject(tokens[0], data);
	      };
	    }

	    if (search.options.conjunction === 'and') {
	      return function (data) {
	        var score,
	            sum = 0;

	        for (let token of tokens) {
	          score = scoreObject(token, data);
	          if (score <= 0) return 0;
	          sum += score;
	        }

	        return sum / token_count;
	      };
	    } else {
	      return function (data) {
	        var sum = 0;
	        iterate$1(tokens, token => {
	          sum += scoreObject(token, data);
	        });
	        return sum / token_count;
	      };
	    }
	  }

	  /**
	   * Returns a function that can be used to compare two
	   * results, for sorting purposes. If no sorting should
	   * be performed, `null` will be returned.
	   *
	   * @return function(a,b)
	   */
	  getSortFunction(query, options) {
	    var search = this.prepareSearch(query, options);
	    return this._getSortFunction(search);
	  }

	  _getSortFunction(search) {
	    var implicit_score,
	        sort_flds = [];
	    const self = this,
	          options = search.options,
	          sort = !search.query && options.sort_empty ? options.sort_empty : options.sort;

	    if (typeof sort == 'function') {
	      return sort.bind(this);
	    }
	    /**
	     * Fetches the specified sort field value
	     * from a search result item.
	     *
	     */


	    const get_field = function get_field(name, result) {
	      if (name === '$score') return result.score;
	      return search.getAttrFn(self.items[result.id], name);
	    }; // parse options


	    if (sort) {
	      for (let s of sort) {
	        if (search.query || s.field !== '$score') {
	          sort_flds.push(s);
	        }
	      }
	    } // the "$score" field is implied to be the primary
	    // sort field, unless it's manually specified


	    if (search.query) {
	      implicit_score = true;

	      for (let fld of sort_flds) {
	        if (fld.field === '$score') {
	          implicit_score = false;
	          break;
	        }
	      }

	      if (implicit_score) {
	        sort_flds.unshift({
	          field: '$score',
	          direction: 'desc'
	        });
	      } // without a search.query, all items will have the same score

	    } else {
	      sort_flds = sort_flds.filter(fld => fld.field !== '$score');
	    } // build function


	    const sort_flds_count = sort_flds.length;

	    if (!sort_flds_count) {
	      return null;
	    }

	    return function (a, b) {
	      var result, field;

	      for (let sort_fld of sort_flds) {
	        field = sort_fld.field;
	        let multiplier = sort_fld.direction === 'desc' ? -1 : 1;
	        result = multiplier * cmp(get_field(field, a), get_field(field, b));
	        if (result) return result;
	      }

	      return 0;
	    };
	  }

	  /**
	   * Parses a search query and returns an object
	   * with tokens and fields ready to be populated
	   * with results.
	   *
	   */
	  prepareSearch(query, optsUser) {
	    const weights = {};
	    var options = Object.assign({}, optsUser);
	    propToArray(options, 'sort');
	    propToArray(options, 'sort_empty'); // convert fields to new format

	    if (options.fields) {
	      propToArray(options, 'fields');
	      const fields = [];
	      options.fields.forEach(field => {
	        if (typeof field == 'string') {
	          field = {
	            field: field,
	            weight: 1
	          };
	        }

	        fields.push(field);
	        weights[field.field] = 'weight' in field ? field.weight : 1;
	      });
	      options.fields = fields;
	    }

	    return {
	      options: options,
	      query: query.toLowerCase().trim(),
	      tokens: this.tokenize(query, options.respect_word_boundaries, weights),
	      total: 0,
	      items: [],
	      weights: weights,
	      getAttrFn: options.nesting ? getAttrNesting : getAttr
	    };
	  }

	  /**
	   * Searches through all items and returns a sorted array of matches.
	   *
	   */
	  search(query, options) {
	    var self = this,
	        score,
	        search;
	    search = this.prepareSearch(query, options);
	    options = search.options;
	    query = search.query; // generate result scoring function

	    const fn_score = options.score || self._getScoreFunction(search); // perform search and sort


	    if (query.length) {
	      iterate$1(self.items, (item, id) => {
	        score = fn_score(item);

	        if (options.filter === false || score > 0) {
	          search.items.push({
	            'score': score,
	            'id': id
	          });
	        }
	      });
	    } else {
	      iterate$1(self.items, (_, id) => {
	        search.items.push({
	          'score': 1,
	          'id': id
	        });
	      });
	    }

	    const fn_sort = self._getSortFunction(search);

	    if (fn_sort) search.items.sort(fn_sort); // apply limits

	    search.total = search.items.length;

	    if (typeof options.limit === 'number') {
	      search.items = search.items.slice(0, options.limit);
	    }

	    return search;
	  }

	}

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
	const escapeQuery = query => {
	  return query.replace(/['"\\]/g, '\\$&');
	};
	/**
	 * Dispatch an event
	 *
	 */

	const triggerEvent = (dom_el, event_name) => {
	  var event = document.createEvent('HTMLEvents');
	  event.initEvent(event_name, true, false);
	  dom_el.dispatchEvent(event);
	};
	/**
	 * Apply CSS rules to a dom element
	 *
	 */

	const applyCSS = (dom_el, css) => {
	  Object.assign(dom_el.style, css);
	};
	/**
	 * Add css classes
	 *
	 */

	const addClasses = (elmts, ...classes) => {
	  var norm_classes = classesArray(classes);
	  elmts = castAsArray(elmts);
	  elmts.map(el => {
	    norm_classes.map(cls => {
	      el.classList.add(cls);
	    });
	  });
	};
	/**
	 * Remove css classes
	 *
	 */

	const removeClasses = (elmts, ...classes) => {
	  var norm_classes = classesArray(classes);
	  elmts = castAsArray(elmts);
	  elmts.map(el => {
	    norm_classes.map(cls => {
	      el.classList.remove(cls);
	    });
	  });
	};
	/**
	 * Return arguments
	 *
	 */

	const classesArray = args => {
	  var classes = [];
	  iterate(args, _classes => {
	    if (typeof _classes === 'string') {
	      _classes = _classes.trim().split(/[\11\12\14\15\40]/);
	    }

	    if (Array.isArray(_classes)) {
	      classes = classes.concat(_classes);
	    }
	  });
	  return classes.filter(Boolean);
	};
	/**
	 * Create an array from arg if it's not already an array
	 *
	 */

	const castAsArray = arg => {
	  if (!Array.isArray(arg)) {
	    arg = [arg];
	  }

	  return arg;
	};
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
	 * Get the first or last item from an array
	 *
	 * > 0 - right (last)
	 * <= 0 - left (first)
	 *
	 */

	const getTail = (list, direction = 0) => {
	  if (direction > 0) {
	    return list[list.length - 1];
	  }

	  return list[0];
	};
	/**
	 * Return true if an object is empty
	 *
	 */

	const isEmptyObject = obj => {
	  return Object.keys(obj).length === 0;
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
	 * Replace a node
	 */

	const replaceNode = (existing, replacement) => {
	  if (existing.parentNode) existing.parentNode.replaceChild(replacement, existing);
	};

	/**
	 * highlight v3 | MIT license | Johann Burkard <jb@eaio.com>
	 * Highlights arbitrary terms in a node.
	 *
	 * - Modified by Marshal <beatgates@gmail.com> 2011-6-24 (added regex)
	 * - Modified by Brian Reavis <brian@thirdroute.com> 2012-8-27 (cleanup)
	 */
	const highlight = (element, regex) => {
	  if (regex === null) return; // convet string to regex

	  if (typeof regex === 'string') {
	    if (!regex.length) return;
	    regex = new RegExp(regex, 'i');
	  } // Wrap matching part of text node with highlighting <span>, e.g.
	  // Soccer  ->  <span class="highlight">Soc</span>cer  for regex = /soc/i


	  const highlightText = node => {
	    var match = node.data.match(regex);

	    if (match && node.data.length > 0) {
	      var spannode = document.createElement('span');
	      spannode.className = 'highlight';
	      var middlebit = node.splitText(match.index);
	      middlebit.splitText(match[0].length);
	      var middleclone = middlebit.cloneNode(true);
	      spannode.appendChild(middleclone);
	      replaceNode(middlebit, spannode);
	      return 1;
	    }

	    return 0;
	  }; // Recurse element node, looking for child text nodes to highlight, unless element
	  // is childless, <script>, <style>, or already highlighted: <span class="hightlight">


	  const highlightChildren = node => {
	    if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName) && (node.className !== 'highlight' || node.tagName !== 'SPAN')) {
	      Array.from(node.childNodes).forEach(element => {
	        highlightRecursive(element);
	      });
	    }
	  };

	  const highlightRecursive = node => {
	    if (node.nodeType === 3) {
	      return highlightText(node);
	    }

	    highlightChildren(node);
	    return 0;
	  };

	  highlightRecursive(element);
	};
	/**
	 * removeHighlight fn copied from highlight v5 and
	 * edited to remove with(), pass js strict mode, and use without jquery
	 */

	const removeHighlight = el => {
	  var elements = el.querySelectorAll("span.highlight");
	  Array.prototype.forEach.call(elements, function (el) {
	    var parent = el.parentNode;
	    parent.replaceChild(el.firstChild, el);
	    parent.normalize();
	  });
	};

	const KEY_A = 65;
	const KEY_RETURN = 13;
	const KEY_ESC = 27;
	const KEY_LEFT = 37;
	const KEY_UP = 38;
	const KEY_RIGHT = 39;
	const KEY_DOWN = 40;
	const KEY_BACKSPACE = 8;
	const KEY_DELETE = 46;
	const KEY_TAB = 9;
	const IS_MAC = typeof navigator === 'undefined' ? false : /Mac/.test(navigator.userAgent);
	const KEY_SHORTCUT = IS_MAC ? 'metaKey' : 'ctrlKey'; // ctrl key or apple key for ma

	var defaults = {
	  options: [],
	  optgroups: [],
	  plugins: [],
	  delimiter: ',',
	  splitOn: null,
	  // regexp or string for splitting up values from a paste command
	  persist: true,
	  diacritics: true,
	  create: null,
	  createOnBlur: false,
	  createFilter: null,
	  highlight: true,
	  openOnFocus: true,
	  shouldOpen: null,
	  maxOptions: 50,
	  maxItems: null,
	  hideSelected: null,
	  duplicates: false,
	  addPrecedence: false,
	  selectOnTab: false,
	  preload: null,
	  allowEmptyOption: false,
	  //closeAfterSelect: false,
	  loadThrottle: 300,
	  loadingClass: 'loading',
	  dataAttr: null,
	  //'data-data',
	  optgroupField: 'optgroup',
	  valueField: 'value',
	  labelField: 'text',
	  disabledField: 'disabled',
	  optgroupLabelField: 'label',
	  optgroupValueField: 'value',
	  lockOptgroupOrder: false,
	  sortField: '$order',
	  searchField: ['text'],
	  searchConjunction: 'and',
	  mode: null,
	  wrapperClass: 'ts-wrapper',
	  controlClass: 'ts-control',
	  dropdownClass: 'ts-dropdown',
	  dropdownContentClass: 'ts-dropdown-content',
	  itemClass: 'item',
	  optionClass: 'option',
	  dropdownParent: null,
	  controlInput: '<input type="text" autocomplete="off" size="1" />',
	  copyClassesToDropdown: false,
	  placeholder: null,
	  hidePlaceholder: null,
	  shouldLoad: function (query) {
	    return query.length > 0;
	  },

	  /*
	  load                 : null, // function(query, callback) { ... }
	  score                : null, // function(search) { ... }
	  onInitialize         : null, // function() { ... }
	  onChange             : null, // function(value) { ... }
	  onItemAdd            : null, // function(value, $item) { ... }
	  onItemRemove         : null, // function(value) { ... }
	  onClear              : null, // function() { ... }
	  onOptionAdd          : null, // function(value, data) { ... }
	  onOptionRemove       : null, // function(value) { ... }
	  onOptionClear        : null, // function() { ... }
	  onOptionGroupAdd     : null, // function(id, data) { ... }
	  onOptionGroupRemove  : null, // function(id) { ... }
	  onOptionGroupClear   : null, // function() { ... }
	  onDropdownOpen       : null, // function(dropdown) { ... }
	  onDropdownClose      : null, // function(dropdown) { ... }
	  onType               : null, // function(str) { ... }
	  onDelete             : null, // function(values) { ... }
	  */
	  render: {
	    /*
	    item: null,
	    optgroup: null,
	    optgroup_header: null,
	    option: null,
	    option_create: null
	    */
	  }
	};

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
	 * Escapes a string for use within HTML.
	 *
	 */

	const escape_html = str => {
	  return (str + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	};
	/**
	 * Debounce the user provided load function
	 *
	 */

	const loadDebounce = (fn, delay) => {
	  var timeout;
	  return function (value, callback) {
	    var self = this;

	    if (timeout) {
	      self.loading = Math.max(self.loading - 1, 0);
	      clearTimeout(timeout);
	    }

	    timeout = setTimeout(function () {
	      timeout = null;
	      self.loadedSearches[value] = true;
	      fn.call(self, value, callback);
	    }, delay);
	  };
	};
	/**
	 * Debounce all fired events types listed in `types`
	 * while executing the provided `fn`.
	 *
	 */

	const debounce_events = (self, types, fn) => {
	  var type;
	  var trigger = self.trigger;
	  var event_args = {}; // override trigger method

	  self.trigger = function () {
	    var type = arguments[0];

	    if (types.indexOf(type) !== -1) {
	      event_args[type] = arguments;
	    } else {
	      return trigger.apply(self, arguments);
	    }
	  }; // invoke provided function


	  fn.apply(self, []);
	  self.trigger = trigger; // trigger queued events

	  for (type of types) {
	    if (type in event_args) {
	      trigger.apply(self, event_args[type]);
	    }
	  }
	};
	/**
	 * Determines the current selection within a text input control.
	 * Returns an object containing:
	 *   - start
	 *   - length
	 *
	 */

	const getSelection = input => {
	  return {
	    start: input.selectionStart || 0,
	    length: (input.selectionEnd || 0) - (input.selectionStart || 0)
	  };
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
	/**
	 * Add event helper
	 *
	 */

	const addEvent = (target, type, callback, options) => {
	  target.addEventListener(type, callback, options);
	};
	/**
	 * Return true if the requested key is down
	 * Will return false if more than one control character is pressed ( when [ctrl+shift+a] != [ctrl+a] )
	 * The current evt may not always set ( eg calling advanceSelection() )
	 *
	 */

	const isKeyDown = (key_name, evt) => {
	  if (!evt) {
	    return false;
	  }

	  if (!evt[key_name]) {
	    return false;
	  }

	  var count = (evt.altKey ? 1 : 0) + (evt.ctrlKey ? 1 : 0) + (evt.shiftKey ? 1 : 0) + (evt.metaKey ? 1 : 0);

	  if (count === 1) {
	    return true;
	  }

	  return false;
	};
	/**
	 * Get the id of an element
	 * If the id attribute is not set, set the attribute with the given id
	 *
	 */

	const getId = (el, id) => {
	  const existing_id = el.getAttribute('id');

	  if (existing_id) {
	    return existing_id;
	  }

	  el.setAttribute('id', id);
	  return id;
	};
	/**
	 * Returns a string with backslashes added before characters that need to be escaped.
	 */

	const addSlashes = str => {
	  return str.replace(/[\\"']/g, '\\$&');
	};
	/**
	 *
	 */

	const append = (parent, node) => {
	  if (node) parent.append(node);
	};

	function getSettings(input, settings_user) {
	  var settings = Object.assign({}, defaults, settings_user);
	  var attr_data = settings.dataAttr;
	  var field_label = settings.labelField;
	  var field_value = settings.valueField;
	  var field_disabled = settings.disabledField;
	  var field_optgroup = settings.optgroupField;
	  var field_optgroup_label = settings.optgroupLabelField;
	  var field_optgroup_value = settings.optgroupValueField;
	  var tag_name = input.tagName.toLowerCase();
	  var placeholder = input.getAttribute('placeholder') || input.getAttribute('data-placeholder');

	  if (!placeholder && !settings.allowEmptyOption) {
	    let option = input.querySelector('option[value=""]');

	    if (option) {
	      placeholder = option.textContent;
	    }
	  }

	  var settings_element = {
	    placeholder: placeholder,
	    options: [],
	    optgroups: [],
	    items: [],
	    maxItems: null
	  };
	  /**
	   * Initialize from a <select> element.
	   *
	   */

	  var init_select = () => {
	    var tagName;
	    var options = settings_element.options;
	    var optionsMap = {};
	    var group_count = 1;

	    var readData = el => {
	      var data = Object.assign({}, el.dataset); // get plain object from DOMStringMap

	      var json = attr_data && data[attr_data];

	      if (typeof json === 'string' && json.length) {
	        data = Object.assign(data, JSON.parse(json));
	      }

	      return data;
	    };

	    var addOption = (option, group) => {
	      var value = hash_key(option.value);
	      if (value == null) return;
	      if (!value && !settings.allowEmptyOption) return; // if the option already exists, it's probably been
	      // duplicated in another optgroup. in this case, push
	      // the current group to the "optgroup" property on the
	      // existing option so that it's rendered in both places.

	      if (optionsMap.hasOwnProperty(value)) {
	        if (group) {
	          var arr = optionsMap[value][field_optgroup];

	          if (!arr) {
	            optionsMap[value][field_optgroup] = group;
	          } else if (!Array.isArray(arr)) {
	            optionsMap[value][field_optgroup] = [arr, group];
	          } else {
	            arr.push(group);
	          }
	        }
	      } else {
	        var option_data = readData(option);
	        option_data[field_label] = option_data[field_label] || option.textContent;
	        option_data[field_value] = option_data[field_value] || value;
	        option_data[field_disabled] = option_data[field_disabled] || option.disabled;
	        option_data[field_optgroup] = option_data[field_optgroup] || group;
	        option_data.$option = option;
	        optionsMap[value] = option_data;
	        options.push(option_data);
	      }

	      if (option.selected) {
	        settings_element.items.push(value);
	      }
	    };

	    var addGroup = optgroup => {
	      var id, optgroup_data;
	      optgroup_data = readData(optgroup);
	      optgroup_data[field_optgroup_label] = optgroup_data[field_optgroup_label] || optgroup.getAttribute('label') || '';
	      optgroup_data[field_optgroup_value] = optgroup_data[field_optgroup_value] || group_count++;
	      optgroup_data[field_disabled] = optgroup_data[field_disabled] || optgroup.disabled;
	      settings_element.optgroups.push(optgroup_data);
	      id = optgroup_data[field_optgroup_value];
	      iterate(optgroup.children, option => {
	        addOption(option, id);
	      });
	    };

	    settings_element.maxItems = input.hasAttribute('multiple') ? null : 1;
	    iterate(input.children, child => {
	      tagName = child.tagName.toLowerCase();

	      if (tagName === 'optgroup') {
	        addGroup(child);
	      } else if (tagName === 'option') {
	        addOption(child);
	      }
	    });
	  };
	  /**
	   * Initialize from a <input type="text"> element.
	   *
	   */


	  var init_textbox = () => {
	    const data_raw = input.getAttribute(attr_data);

	    if (!data_raw) {
	      var value = input.value.trim() || '';
	      if (!settings.allowEmptyOption && !value.length) return;
	      const values = value.split(settings.delimiter);
	      iterate(values, value => {
	        const option = {};
	        option[field_label] = value;
	        option[field_value] = value;
	        settings_element.options.push(option);
	      });
	      settings_element.items = values;
	    } else {
	      settings_element.options = JSON.parse(data_raw);
	      iterate(settings_element.options, opt => {
	        settings_element.items.push(opt[field_value]);
	      });
	    }
	  };

	  if (tag_name === 'select') {
	    init_select();
	  } else {
	    init_textbox();
	  }

	  return Object.assign({}, defaults, settings_element, settings_user);
	}

	var instance_i = 0;
	class TomSelect extends MicroPlugin(MicroEvent) {
	  // @deprecated 1.8
	  constructor(input_arg, user_settings) {
	    super();
	    this.control_input = void 0;
	    this.wrapper = void 0;
	    this.dropdown = void 0;
	    this.control = void 0;
	    this.dropdown_content = void 0;
	    this.focus_node = void 0;
	    this.order = 0;
	    this.settings = void 0;
	    this.input = void 0;
	    this.tabIndex = void 0;
	    this.is_select_tag = void 0;
	    this.rtl = void 0;
	    this.inputId = void 0;
	    this._destroy = void 0;
	    this.sifter = void 0;
	    this.isOpen = false;
	    this.isDisabled = false;
	    this.isRequired = void 0;
	    this.isInvalid = false;
	    this.isValid = true;
	    this.isLocked = false;
	    this.isFocused = false;
	    this.isInputHidden = false;
	    this.isSetup = false;
	    this.ignoreFocus = false;
	    this.ignoreHover = false;
	    this.hasOptions = false;
	    this.currentResults = void 0;
	    this.lastValue = '';
	    this.caretPos = 0;
	    this.loading = 0;
	    this.loadedSearches = {};
	    this.activeOption = null;
	    this.activeItems = [];
	    this.optgroups = {};
	    this.options = {};
	    this.userOptions = {};
	    this.items = [];
	    instance_i++;
	    var dir;
	    var input = getDom(input_arg);

	    if (input.tomselect) {
	      throw new Error('Tom Select already initialized on this element');
	    }

	    input.tomselect = this; // detect rtl environment

	    var computedStyle = window.getComputedStyle && window.getComputedStyle(input, null);
	    dir = computedStyle.getPropertyValue('direction'); // setup default state

	    const settings = getSettings(input, user_settings);
	    this.settings = settings;
	    this.input = input;
	    this.tabIndex = input.tabIndex || 0;
	    this.is_select_tag = input.tagName.toLowerCase() === 'select';
	    this.rtl = /rtl/i.test(dir);
	    this.inputId = getId(input, 'tomselect-' + instance_i);
	    this.isRequired = input.required; // search system

	    this.sifter = new Sifter(this.options, {
	      diacritics: settings.diacritics
	    }); // option-dependent defaults

	    settings.mode = settings.mode || (settings.maxItems === 1 ? 'single' : 'multi');

	    if (typeof settings.hideSelected !== 'boolean') {
	      settings.hideSelected = settings.mode === 'multi';
	    }

	    if (typeof settings.hidePlaceholder !== 'boolean') {
	      settings.hidePlaceholder = settings.mode !== 'multi';
	    } // set up createFilter callback


	    var filter = settings.createFilter;

	    if (typeof filter !== 'function') {
	      if (typeof filter === 'string') {
	        filter = new RegExp(filter);
	      }

	      if (filter instanceof RegExp) {
	        settings.createFilter = input => filter.test(input);
	      } else {
	        settings.createFilter = value => {
	          return this.settings.duplicates || !this.options[value];
	        };
	      }
	    }

	    this.initializePlugins(settings.plugins);
	    this.setupCallbacks();
	    this.setupTemplates(); // Create all elements

	    const wrapper = getDom('<div>');
	    const control = getDom('<div>');

	    const dropdown = this._render('dropdown');

	    const dropdown_content = getDom(`<div role="listbox" tabindex="-1">`);
	    const classes = this.input.getAttribute('class') || '';
	    const inputMode = settings.mode;
	    var control_input;
	    addClasses(wrapper, settings.wrapperClass, classes, inputMode);
	    addClasses(control, settings.controlClass);
	    append(wrapper, control);
	    addClasses(dropdown, settings.dropdownClass, inputMode);

	    if (settings.copyClassesToDropdown) {
	      addClasses(dropdown, classes);
	    }

	    addClasses(dropdown_content, settings.dropdownContentClass);
	    append(dropdown, dropdown_content);
	    getDom(settings.dropdownParent || wrapper).appendChild(dropdown); // default controlInput

	    if (isHtmlString(settings.controlInput)) {
	      control_input = getDom(settings.controlInput); // set attributes

	      var attrs = ['autocorrect', 'autocapitalize', 'autocomplete'];
	      iterate$1(attrs, attr => {
	        if (input.getAttribute(attr)) {
	          setAttr(control_input, {
	            [attr]: input.getAttribute(attr)
	          });
	        }
	      });
	      control_input.tabIndex = -1;
	      control.appendChild(control_input);
	      this.focus_node = control_input; // dom element
	    } else if (settings.controlInput) {
	      control_input = getDom(settings.controlInput);
	      this.focus_node = control_input;
	    } else {
	      control_input = getDom('<input/>');
	      this.focus_node = control;
	    }

	    this.wrapper = wrapper;
	    this.dropdown = dropdown;
	    this.dropdown_content = dropdown_content;
	    this.control = control;
	    this.control_input = control_input;
	    this.setup();
	  }
	  /**
	   * set up event bindings.
	   *
	   */


	  setup() {
	    const self = this;
	    const settings = self.settings;
	    const control_input = self.control_input;
	    const dropdown = self.dropdown;
	    const dropdown_content = self.dropdown_content;
	    const wrapper = self.wrapper;
	    const control = self.control;
	    const input = self.input;
	    const focus_node = self.focus_node;
	    const passive_event = {
	      passive: true
	    };
	    const listboxId = self.inputId + '-ts-dropdown';
	    setAttr(dropdown_content, {
	      id: listboxId
	    });
	    setAttr(focus_node, {
	      role: 'combobox',
	      'aria-haspopup': 'listbox',
	      'aria-expanded': 'false',
	      'aria-controls': listboxId
	    });
	    const control_id = getId(focus_node, self.inputId + '-ts-control');
	    const query = "label[for='" + escapeQuery(self.inputId) + "']";
	    const label = document.querySelector(query);
	    const label_click = self.focus.bind(self);

	    if (label) {
	      addEvent(label, 'click', label_click);
	      setAttr(label, {
	        for: control_id
	      });
	      const label_id = getId(label, self.inputId + '-ts-label');
	      setAttr(focus_node, {
	        'aria-labelledby': label_id
	      });
	      setAttr(dropdown_content, {
	        'aria-labelledby': label_id
	      });
	    }

	    wrapper.style.width = input.style.width;

	    if (self.plugins.names.length) {
	      const classes_plugins = 'plugin-' + self.plugins.names.join(' plugin-');
	      addClasses([wrapper, dropdown], classes_plugins);
	    }

	    if ((settings.maxItems === null || settings.maxItems > 1) && self.is_select_tag) {
	      setAttr(input, {
	        multiple: 'multiple'
	      });
	    }

	    if (settings.placeholder) {
	      setAttr(control_input, {
	        placeholder: settings.placeholder
	      });
	    } // if splitOn was not passed in, construct it from the delimiter to allow pasting universally


	    if (!settings.splitOn && settings.delimiter) {
	      settings.splitOn = new RegExp('\\s*' + escape_regex(settings.delimiter) + '+\\s*');
	    } // debounce user defined load() if loadThrottle > 0
	    // after initializePlugins() so plugins can create/modify user defined loaders


	    if (settings.load && settings.loadThrottle) {
	      settings.load = loadDebounce(settings.load, settings.loadThrottle);
	    }

	    self.control_input.type = input.type;
	    addEvent(dropdown, 'mousemove', () => {
	      self.ignoreHover = false;
	    });
	    addEvent(dropdown, 'mouseenter', e => {
	      var target_match = parentMatch(e.target, '[data-selectable]', dropdown);
	      if (target_match) self.onOptionHover(e, target_match);
	    }, {
	      capture: true
	    }); // clicking on an option should select it

	    addEvent(dropdown, 'click', evt => {
	      const option = parentMatch(evt.target, '[data-selectable]');

	      if (option) {
	        self.onOptionSelect(evt, option);
	        preventDefault(evt, true);
	      }
	    });
	    addEvent(control, 'click', evt => {
	      var target_match = parentMatch(evt.target, '[data-ts-item]', control);

	      if (target_match && self.onItemSelect(evt, target_match)) {
	        preventDefault(evt, true);
	        return;
	      } // retain focus (see control_input mousedown)


	      if (control_input.value != '') {
	        return;
	      }

	      self.onClick();
	      preventDefault(evt, true);
	    }); // keydown on focus_node for arrow_down/arrow_up

	    addEvent(focus_node, 'keydown', e => self.onKeyDown(e)); // keypress and input/keyup

	    addEvent(control_input, 'keypress', e => self.onKeyPress(e));
	    addEvent(control_input, 'input', e => self.onInput(e));
	    addEvent(focus_node, 'blur', e => self.onBlur(e));
	    addEvent(focus_node, 'focus', e => self.onFocus(e));
	    addEvent(control_input, 'paste', e => self.onPaste(e));

	    const doc_mousedown = evt => {
	      // blur if target is outside of this instance
	      // dropdown is not always inside wrapper
	      const target = evt.composedPath()[0];

	      if (!wrapper.contains(target) && !dropdown.contains(target)) {
	        if (self.isFocused) {
	          self.blur();
	        }

	        self.inputState();
	        return;
	      } // retain focus by preventing native handling. if the
	      // event target is the input it should not be modified.
	      // otherwise, text selection within the input won't work.
	      // Fixes bug #212 which is no covered by tests


	      if (target == control_input && self.isOpen) {
	        evt.stopPropagation(); // clicking anywhere in the control should not blur the control_input (which would close the dropdown)
	      } else {
	        preventDefault(evt, true);
	      }
	    };

	    const win_scroll = () => {
	      if (self.isOpen) {
	        self.positionDropdown();
	      }
	    };

	    addEvent(document, 'mousedown', doc_mousedown);
	    addEvent(window, 'scroll', win_scroll, passive_event);
	    addEvent(window, 'resize', win_scroll, passive_event);

	    this._destroy = () => {
	      document.removeEventListener('mousedown', doc_mousedown);
	      window.removeEventListener('scroll', win_scroll);
	      window.removeEventListener('resize', win_scroll);
	      if (label) label.removeEventListener('click', label_click);
	    }; // store original html and tab index so that they can be
	    // restored when the destroy() method is called.


	    this.revertSettings = {
	      innerHTML: input.innerHTML,
	      tabIndex: input.tabIndex
	    };
	    input.tabIndex = -1;
	    input.insertAdjacentElement('afterend', self.wrapper);
	    self.sync(false);
	    settings.items = [];
	    delete settings.optgroups;
	    delete settings.options;
	    addEvent(input, 'invalid', () => {
	      if (self.isValid) {
	        self.isValid = false;
	        self.isInvalid = true;
	        self.refreshState();
	      }
	    });
	    self.updateOriginalInput();
	    self.refreshItems();
	    self.close(false);
	    self.inputState();
	    self.isSetup = true;

	    if (input.disabled) {
	      self.disable();
	    } else {
	      self.enable(); //sets tabIndex
	    }

	    self.on('change', this.onChange);
	    addClasses(input, 'tomselected', 'ts-hidden-accessible');
	    self.trigger('initialize'); // preload options

	    if (settings.preload === true) {
	      self.preload();
	    }
	  }
	  /**
	   * Register options and optgroups
	   *
	   */


	  setupOptions(options = [], optgroups = []) {
	    // build options table
	    this.addOptions(options); // build optgroup table

	    iterate$1(optgroups, optgroup => {
	      this.registerOptionGroup(optgroup);
	    });
	  }
	  /**
	   * Sets up default rendering functions.
	   */


	  setupTemplates() {
	    var self = this;
	    var field_label = self.settings.labelField;
	    var field_optgroup = self.settings.optgroupLabelField;
	    var templates = {
	      'optgroup': data => {
	        let optgroup = document.createElement('div');
	        optgroup.className = 'optgroup';
	        optgroup.appendChild(data.options);
	        return optgroup;
	      },
	      'optgroup_header': (data, escape) => {
	        return '<div class="optgroup-header">' + escape(data[field_optgroup]) + '</div>';
	      },
	      'option': (data, escape) => {
	        return '<div>' + escape(data[field_label]) + '</div>';
	      },
	      'item': (data, escape) => {
	        return '<div>' + escape(data[field_label]) + '</div>';
	      },
	      'option_create': (data, escape) => {
	        return '<div class="create">Add <strong>' + escape(data.input) + '</strong>&hellip;</div>';
	      },
	      'no_results': () => {
	        return '<div class="no-results">No results found</div>';
	      },
	      'loading': () => {
	        return '<div class="spinner"></div>';
	      },
	      'not_loading': () => {},
	      'dropdown': () => {
	        return '<div></div>';
	      }
	    };
	    self.settings.render = Object.assign({}, templates, self.settings.render);
	  }
	  /**
	   * Maps fired events to callbacks provided
	   * in the settings used when creating the control.
	   */


	  setupCallbacks() {
	    var key, fn;
	    var callbacks = {
	      'initialize': 'onInitialize',
	      'change': 'onChange',
	      'item_add': 'onItemAdd',
	      'item_remove': 'onItemRemove',
	      'item_select': 'onItemSelect',
	      'clear': 'onClear',
	      'option_add': 'onOptionAdd',
	      'option_remove': 'onOptionRemove',
	      'option_clear': 'onOptionClear',
	      'optgroup_add': 'onOptionGroupAdd',
	      'optgroup_remove': 'onOptionGroupRemove',
	      'optgroup_clear': 'onOptionGroupClear',
	      'dropdown_open': 'onDropdownOpen',
	      'dropdown_close': 'onDropdownClose',
	      'type': 'onType',
	      'load': 'onLoad',
	      'focus': 'onFocus',
	      'blur': 'onBlur'
	    };

	    for (key in callbacks) {
	      fn = this.settings[callbacks[key]];
	      if (fn) this.on(key, fn);
	    }
	  }
	  /**
	   * Sync the Tom Select instance with the original input or select
	   *
	   */


	  sync(get_settings = true) {
	    const self = this;
	    const settings = get_settings ? getSettings(self.input, {
	      delimiter: self.settings.delimiter
	    }) : self.settings;
	    self.setupOptions(settings.options, settings.optgroups);
	    self.setValue(settings.items || [], true); // silent prevents recursion

	    self.lastQuery = null; // so updated options will be displayed in dropdown
	  }
	  /**
	   * Triggered when the main control element
	   * has a click event.
	   *
	   */


	  onClick() {
	    var self = this;

	    if (self.activeItems.length > 0) {
	      self.clearActiveItems();
	      self.focus();
	      return;
	    }

	    if (self.isFocused && self.isOpen) {
	      self.blur();
	    } else {
	      self.focus();
	    }
	  }
	  /**
	   * @deprecated v1.7
	   *
	   */


	  onMouseDown() {}
	  /**
	   * Triggered when the value of the control has been changed.
	   * This should propagate the event to the original DOM
	   * input / select element.
	   */


	  onChange() {
	    triggerEvent(this.input, 'input');
	    triggerEvent(this.input, 'change');
	  }
	  /**
	   * Triggered on <input> paste.
	   *
	   */


	  onPaste(e) {
	    var self = this;

	    if (self.isInputHidden || self.isLocked) {
	      preventDefault(e);
	      return;
	    } // If a regex or string is included, this will split the pasted
	    // input and create Items for each separate value


	    if (!self.settings.splitOn) {
	      return;
	    } // Wait for pasted text to be recognized in value


	    setTimeout(() => {
	      var pastedText = self.inputValue();

	      if (!pastedText.match(self.settings.splitOn)) {
	        return;
	      }

	      var splitInput = pastedText.trim().split(self.settings.splitOn);
	      iterate$1(splitInput, piece => {
	        const hash = hash_key(piece);

	        if (hash) {
	          if (this.options[piece]) {
	            self.addItem(piece);
	          } else {
	            self.createItem(piece);
	          }
	        }
	      });
	    }, 0);
	  }
	  /**
	   * Triggered on <input> keypress.
	   *
	   */


	  onKeyPress(e) {
	    var self = this;

	    if (self.isLocked) {
	      preventDefault(e);
	      return;
	    }

	    var character = String.fromCharCode(e.keyCode || e.which);

	    if (self.settings.create && self.settings.mode === 'multi' && character === self.settings.delimiter) {
	      self.createItem();
	      preventDefault(e);
	      return;
	    }
	  }
	  /**
	   * Triggered on <input> keydown.
	   *
	   */


	  onKeyDown(e) {
	    var self = this;
	    self.ignoreHover = true;

	    if (self.isLocked) {
	      if (e.keyCode !== KEY_TAB) {
	        preventDefault(e);
	      }

	      return;
	    }

	    switch (e.keyCode) {
	      // ctrl+A: select all
	      case KEY_A:
	        if (isKeyDown(KEY_SHORTCUT, e)) {
	          if (self.control_input.value == '') {
	            preventDefault(e);
	            self.selectAll();
	            return;
	          }
	        }

	        break;
	      // esc: close dropdown

	      case KEY_ESC:
	        if (self.isOpen) {
	          preventDefault(e, true);
	          self.close();
	        }

	        self.clearActiveItems();
	        return;
	      // down: open dropdown or move selection down

	      case KEY_DOWN:
	        if (!self.isOpen && self.hasOptions) {
	          self.open();
	        } else if (self.activeOption) {
	          let next = self.getAdjacent(self.activeOption, 1);
	          if (next) self.setActiveOption(next);
	        }

	        preventDefault(e);
	        return;
	      // up: move selection up

	      case KEY_UP:
	        if (self.activeOption) {
	          let prev = self.getAdjacent(self.activeOption, -1);
	          if (prev) self.setActiveOption(prev);
	        }

	        preventDefault(e);
	        return;
	      // return: select active option

	      case KEY_RETURN:
	        if (self.canSelect(self.activeOption)) {
	          self.onOptionSelect(e, self.activeOption);
	          preventDefault(e); // if the option_create=null, the dropdown might be closed
	        } else if (self.settings.create && self.createItem()) {
	          preventDefault(e); // don't submit form when searching for a value
	        } else if (document.activeElement == self.control_input && self.isOpen) {
	          preventDefault(e);
	        }

	        return;
	      // left: modifiy item selection to the left

	      case KEY_LEFT:
	        self.advanceSelection(-1, e);
	        return;
	      // right: modifiy item selection to the right

	      case KEY_RIGHT:
	        self.advanceSelection(1, e);
	        return;
	      // tab: select active option and/or create item

	      case KEY_TAB:
	        if (self.settings.selectOnTab) {
	          if (self.canSelect(self.activeOption)) {
	            self.onOptionSelect(e, self.activeOption); // prevent default [tab] behaviour of jump to the next field
	            // if select isFull, then the dropdown won't be open and [tab] will work normally

	            preventDefault(e);
	          }

	          if (self.settings.create && self.createItem()) {
	            preventDefault(e);
	          }
	        }

	        return;
	      // delete|backspace: delete items

	      case KEY_BACKSPACE:
	      case KEY_DELETE:
	        self.deleteSelection(e);
	        return;
	    } // don't enter text in the control_input when active items are selected


	    if (self.isInputHidden && !isKeyDown(KEY_SHORTCUT, e)) {
	      preventDefault(e);
	    }
	  }
	  /**
	   * Triggered on <input> keyup.
	   *
	   */


	  onInput(e) {
	    var self = this;

	    if (self.isLocked) {
	      return;
	    }

	    var value = self.inputValue();

	    if (self.lastValue !== value) {
	      self.lastValue = value;

	      if (self.settings.shouldLoad.call(self, value)) {
	        self.load(value);
	      }

	      self.refreshOptions();
	      self.trigger('type', value);
	    }
	  }
	  /**
	   * Triggered when the user rolls over
	   * an option in the autocomplete dropdown menu.
	   *
	   */


	  onOptionHover(evt, option) {
	    if (this.ignoreHover) return;
	    this.setActiveOption(option, false);
	  }
	  /**
	   * Triggered on <input> focus.
	   *
	   */


	  onFocus(e) {
	    var self = this;
	    var wasFocused = self.isFocused;

	    if (self.isDisabled) {
	      self.blur();
	      preventDefault(e);
	      return;
	    }

	    if (self.ignoreFocus) return;
	    self.isFocused = true;
	    if (self.settings.preload === 'focus') self.preload();
	    if (!wasFocused) self.trigger('focus');

	    if (!self.activeItems.length) {
	      self.showInput();
	      self.refreshOptions(!!self.settings.openOnFocus);
	    }

	    self.refreshState();
	  }
	  /**
	   * Triggered on <input> blur.
	   *
	   */


	  onBlur(e) {
	    if (document.hasFocus() === false) return;
	    var self = this;
	    if (!self.isFocused) return;
	    self.isFocused = false;
	    self.ignoreFocus = false;

	    var deactivate = () => {
	      self.close();
	      self.setActiveItem();
	      self.setCaret(self.items.length);
	      self.trigger('blur');
	    };

	    if (self.settings.create && self.settings.createOnBlur) {
	      self.createItem(null, deactivate);
	    } else {
	      deactivate();
	    }
	  }
	  /**
	   * Triggered when the user clicks on an option
	   * in the autocomplete dropdown menu.
	   *
	   */


	  onOptionSelect(evt, option) {
	    var value,
	        self = this; // should not be possible to trigger a option under a disabled optgroup

	    if (option.parentElement && option.parentElement.matches('[data-disabled]')) {
	      return;
	    }

	    if (option.classList.contains('create')) {
	      self.createItem(null, () => {
	        if (self.settings.closeAfterSelect) {
	          self.close();
	        }
	      });
	    } else {
	      value = option.dataset.value;

	      if (typeof value !== 'undefined') {
	        self.lastQuery = null;
	        self.addItem(value);

	        if (self.settings.closeAfterSelect) {
	          self.close();
	        }

	        if (!self.settings.hideSelected && evt.type && /click/.test(evt.type)) {
	          self.setActiveOption(option);
	        }
	      }
	    }
	  }
	  /**
	   * Return true if the given option can be selected
	   *
	   */


	  canSelect(option) {
	    if (this.isOpen && option && this.dropdown_content.contains(option)) {
	      return true;
	    }

	    return false;
	  }
	  /**
	   * Triggered when the user clicks on an item
	   * that has been selected.
	   *
	   */


	  onItemSelect(evt, item) {
	    var self = this;

	    if (!self.isLocked && self.settings.mode === 'multi') {
	      preventDefault(evt);
	      self.setActiveItem(item, evt);
	      return true;
	    }

	    return false;
	  }
	  /**
	   * Determines whether or not to invoke
	   * the user-provided option provider / loader
	   *
	   * Note, there is a subtle difference between
	   * this.canLoad() and this.settings.shouldLoad();
	   *
	   *	- settings.shouldLoad() is a user-input validator.
	   *	When false is returned, the not_loading template
	   *	will be added to the dropdown
	   *
	   *	- canLoad() is lower level validator that checks
	   * 	the Tom Select instance. There is no inherent user
	   *	feedback when canLoad returns false
	   *
	   */


	  canLoad(value) {
	    if (!this.settings.load) return false;
	    if (this.loadedSearches.hasOwnProperty(value)) return false;
	    return true;
	  }
	  /**
	   * Invokes the user-provided option provider / loader.
	   *
	   */


	  load(value) {
	    const self = this;
	    if (!self.canLoad(value)) return;
	    addClasses(self.wrapper, self.settings.loadingClass);
	    self.loading++;
	    const callback = self.loadCallback.bind(self);
	    self.settings.load.call(self, value, callback);
	  }
	  /**
	   * Invoked by the user-provided option provider
	   *
	   */


	  loadCallback(options, optgroups) {
	    const self = this;
	    self.loading = Math.max(self.loading - 1, 0);
	    self.lastQuery = null;
	    self.clearActiveOption(); // when new results load, focus should be on first option

	    self.setupOptions(options, optgroups);
	    self.refreshOptions(self.isFocused && !self.isInputHidden);

	    if (!self.loading) {
	      removeClasses(self.wrapper, self.settings.loadingClass);
	    }

	    self.trigger('load', options, optgroups);
	  }

	  preload() {
	    var classList = this.wrapper.classList;
	    if (classList.contains('preloaded')) return;
	    classList.add('preloaded');
	    this.load('');
	  }
	  /**
	   * Sets the input field of the control to the specified value.
	   *
	   */


	  setTextboxValue(value = '') {
	    var input = this.control_input;
	    var changed = input.value !== value;

	    if (changed) {
	      input.value = value;
	      triggerEvent(input, 'update');
	      this.lastValue = value;
	    }
	  }
	  /**
	   * Returns the value of the control. If multiple items
	   * can be selected (e.g. <select multiple>), this returns
	   * an array. If only one item can be selected, this
	   * returns a string.
	   *
	   */


	  getValue() {
	    if (this.is_select_tag && this.input.hasAttribute('multiple')) {
	      return this.items;
	    }

	    return this.items.join(this.settings.delimiter);
	  }
	  /**
	   * Resets the selected items to the given value.
	   *
	   */


	  setValue(value, silent) {
	    var events = silent ? [] : ['change'];
	    debounce_events(this, events, () => {
	      this.clear(silent);
	      this.addItems(value, silent);
	    });
	  }
	  /**
	   * Resets the number of max items to the given value
	   *
	   */


	  setMaxItems(value) {
	    if (value === 0) value = null; //reset to unlimited items.

	    this.settings.maxItems = value;
	    this.refreshState();
	  }
	  /**
	   * Sets the selected item.
	   *
	   */


	  setActiveItem(item, e) {
	    var self = this;
	    var eventName;
	    var i, begin, end, swap;
	    var last;
	    if (self.settings.mode === 'single') return; // clear the active selection

	    if (!item) {
	      self.clearActiveItems();

	      if (self.isFocused) {
	        self.showInput();
	      }

	      return;
	    } // modify selection


	    eventName = e && e.type.toLowerCase();

	    if (eventName === 'click' && isKeyDown('shiftKey', e) && self.activeItems.length) {
	      last = self.getLastActive();
	      begin = Array.prototype.indexOf.call(self.control.children, last);
	      end = Array.prototype.indexOf.call(self.control.children, item);

	      if (begin > end) {
	        swap = begin;
	        begin = end;
	        end = swap;
	      }

	      for (i = begin; i <= end; i++) {
	        item = self.control.children[i];

	        if (self.activeItems.indexOf(item) === -1) {
	          self.setActiveItemClass(item);
	        }
	      }

	      preventDefault(e);
	    } else if (eventName === 'click' && isKeyDown(KEY_SHORTCUT, e) || eventName === 'keydown' && isKeyDown('shiftKey', e)) {
	      if (item.classList.contains('active')) {
	        self.removeActiveItem(item);
	      } else {
	        self.setActiveItemClass(item);
	      }
	    } else {
	      self.clearActiveItems();
	      self.setActiveItemClass(item);
	    } // ensure control has focus


	    self.hideInput();

	    if (!self.isFocused) {
	      self.focus();
	    }
	  }
	  /**
	   * Set the active and last-active classes
	   *
	   */


	  setActiveItemClass(item) {
	    const self = this;
	    const last_active = self.control.querySelector('.last-active');
	    if (last_active) removeClasses(last_active, 'last-active');
	    addClasses(item, 'active last-active');
	    self.trigger('item_select', item);

	    if (self.activeItems.indexOf(item) == -1) {
	      self.activeItems.push(item);
	    }
	  }
	  /**
	   * Remove active item
	   *
	   */


	  removeActiveItem(item) {
	    var idx = this.activeItems.indexOf(item);
	    this.activeItems.splice(idx, 1);
	    removeClasses(item, 'active');
	  }
	  /**
	   * Clears all the active items
	   *
	   */


	  clearActiveItems() {
	    removeClasses(this.activeItems, 'active');
	    this.activeItems = [];
	  }
	  /**
	   * Sets the selected item in the dropdown menu
	   * of available options.
	   *
	   */


	  setActiveOption(option, scroll = true) {
	    if (option === this.activeOption) {
	      return;
	    }

	    this.clearActiveOption();
	    if (!option) return;
	    this.activeOption = option;
	    setAttr(this.focus_node, {
	      'aria-activedescendant': option.getAttribute('id')
	    });
	    setAttr(option, {
	      'aria-selected': 'true'
	    });
	    addClasses(option, 'active');
	    if (scroll) this.scrollToOption(option);
	  }
	  /**
	   * Sets the dropdown_content scrollTop to display the option
	   *
	   */


	  scrollToOption(option, behavior) {
	    if (!option) return;
	    const content = this.dropdown_content;
	    const height_menu = content.clientHeight;
	    const scrollTop = content.scrollTop || 0;
	    const height_item = option.offsetHeight;
	    const y = option.getBoundingClientRect().top - content.getBoundingClientRect().top + scrollTop;

	    if (y + height_item > height_menu + scrollTop) {
	      this.scroll(y - height_menu + height_item, behavior);
	    } else if (y < scrollTop) {
	      this.scroll(y, behavior);
	    }
	  }
	  /**
	   * Scroll the dropdown to the given position
	   *
	   */


	  scroll(scrollTop, behavior) {
	    const content = this.dropdown_content;

	    if (behavior) {
	      content.style.scrollBehavior = behavior;
	    }

	    content.scrollTop = scrollTop;
	    content.style.scrollBehavior = '';
	  }
	  /**
	   * Clears the active option
	   *
	   */


	  clearActiveOption() {
	    if (this.activeOption) {
	      removeClasses(this.activeOption, 'active');
	      setAttr(this.activeOption, {
	        'aria-selected': null
	      });
	    }

	    this.activeOption = null;
	    setAttr(this.focus_node, {
	      'aria-activedescendant': null
	    });
	  }
	  /**
	   * Selects all items (CTRL + A).
	   */


	  selectAll() {
	    const self = this;
	    if (self.settings.mode === 'single') return;
	    const activeItems = self.controlChildren();
	    if (!activeItems.length) return;
	    self.hideInput();
	    self.close();
	    self.activeItems = activeItems;
	    iterate$1(activeItems, item => {
	      self.setActiveItemClass(item);
	    });
	  }
	  /**
	   * Determines if the control_input should be in a hidden or visible state
	   *
	   */


	  inputState() {
	    var self = this;
	    if (!self.control.contains(self.control_input)) return;
	    setAttr(self.control_input, {
	      placeholder: self.settings.placeholder
	    });

	    if (self.activeItems.length > 0 || !self.isFocused && self.settings.hidePlaceholder && self.items.length > 0) {
	      self.setTextboxValue();
	      self.isInputHidden = true;
	    } else {
	      if (self.settings.hidePlaceholder && self.items.length > 0) {
	        setAttr(self.control_input, {
	          placeholder: ''
	        });
	      }

	      self.isInputHidden = false;
	    }

	    self.wrapper.classList.toggle('input-hidden', self.isInputHidden);
	  }
	  /**
	   * Hides the input element out of view, while
	   * retaining its focus.
	   * @deprecated 1.3
	   */


	  hideInput() {
	    this.inputState();
	  }
	  /**
	   * Restores input visibility.
	   * @deprecated 1.3
	   */


	  showInput() {
	    this.inputState();
	  }
	  /**
	   * Get the input value
	   */


	  inputValue() {
	    return this.control_input.value.trim();
	  }
	  /**
	   * Gives the control focus.
	   */


	  focus() {
	    var self = this;
	    if (self.isDisabled) return;
	    self.ignoreFocus = true;

	    if (self.control_input.offsetWidth) {
	      self.control_input.focus();
	    } else {
	      self.focus_node.focus();
	    }

	    setTimeout(() => {
	      self.ignoreFocus = false;
	      self.onFocus();
	    }, 0);
	  }
	  /**
	   * Forces the control out of focus.
	   *
	   */


	  blur() {
	    this.focus_node.blur();
	    this.onBlur();
	  }
	  /**
	   * Returns a function that scores an object
	   * to show how good of a match it is to the
	   * provided query.
	   *
	   * @return {function}
	   */


	  getScoreFunction(query) {
	    return this.sifter.getScoreFunction(query, this.getSearchOptions());
	  }
	  /**
	   * Returns search options for sifter (the system
	   * for scoring and sorting results).
	   *
	   * @see https://github.com/orchidjs/sifter.js
	   * @return {object}
	   */


	  getSearchOptions() {
	    var settings = this.settings;
	    var sort = settings.sortField;

	    if (typeof settings.sortField === 'string') {
	      sort = [{
	        field: settings.sortField
	      }];
	    }

	    return {
	      fields: settings.searchField,
	      conjunction: settings.searchConjunction,
	      sort: sort,
	      nesting: settings.nesting
	    };
	  }
	  /**
	   * Searches through available options and returns
	   * a sorted array of matches.
	   *
	   */


	  search(query) {
	    var result, calculateScore;
	    var self = this;
	    var options = this.getSearchOptions(); // validate user-provided result scoring function

	    if (self.settings.score) {
	      calculateScore = self.settings.score.call(self, query);

	      if (typeof calculateScore !== 'function') {
	        throw new Error('Tom Select "score" setting must be a function that returns a function');
	      }
	    } // perform search


	    if (query !== self.lastQuery) {
	      self.lastQuery = query;
	      result = self.sifter.search(query, Object.assign(options, {
	        score: calculateScore
	      }));
	      self.currentResults = result;
	    } else {
	      result = Object.assign({}, self.currentResults);
	    } // filter out selected items


	    if (self.settings.hideSelected) {
	      result.items = result.items.filter(item => {
	        let hashed = hash_key(item.id);
	        return !(hashed && self.items.indexOf(hashed) !== -1);
	      });
	    }

	    return result;
	  }
	  /**
	   * Refreshes the list of available options shown
	   * in the autocomplete dropdown menu.
	   *
	   */


	  refreshOptions(triggerDropdown = true) {
	    var i, j, k, n, optgroup, optgroups, html, has_create_option, active_group;
	    var create;
	    const groups = {};
	    const groups_order = [];
	    var self = this;
	    var query = self.inputValue();
	    const same_query = query === self.lastQuery || query == '' && self.lastQuery == null;
	    var results = self.search(query);
	    var active_option = null;
	    var show_dropdown = self.settings.shouldOpen || false;
	    var dropdown_content = self.dropdown_content;

	    if (same_query) {
	      active_option = self.activeOption;

	      if (active_option) {
	        active_group = active_option.closest('[data-group]');
	      }
	    } // build markup


	    n = results.items.length;

	    if (typeof self.settings.maxOptions === 'number') {
	      n = Math.min(n, self.settings.maxOptions);
	    }

	    if (n > 0) {
	      show_dropdown = true;
	    } // render and group available options individually


	    for (i = 0; i < n; i++) {
	      // get option dom element
	      let item = results.items[i];
	      if (!item) continue;
	      let opt_value = item.id;
	      let option = self.options[opt_value];
	      if (option === undefined) continue;
	      let opt_hash = get_hash(opt_value);
	      let option_el = self.getOption(opt_hash, true); // toggle 'selected' class

	      if (!self.settings.hideSelected) {
	        option_el.classList.toggle('selected', self.items.includes(opt_hash));
	      }

	      optgroup = option[self.settings.optgroupField] || '';
	      optgroups = Array.isArray(optgroup) ? optgroup : [optgroup];

	      for (j = 0, k = optgroups && optgroups.length; j < k; j++) {
	        optgroup = optgroups[j];

	        if (!self.optgroups.hasOwnProperty(optgroup)) {
	          optgroup = '';
	        }

	        let group_fragment = groups[optgroup];

	        if (group_fragment === undefined) {
	          group_fragment = document.createDocumentFragment();
	          groups_order.push(optgroup);
	        } // nodes can only have one parent, so if the option is in mutple groups, we need a clone


	        if (j > 0) {
	          option_el = option_el.cloneNode(true);
	          setAttr(option_el, {
	            id: option.$id + '-clone-' + j,
	            'aria-selected': null
	          });
	          option_el.classList.add('ts-cloned');
	          removeClasses(option_el, 'active'); // make sure we keep the activeOption in the same group

	          if (self.activeOption && self.activeOption.dataset.value == opt_value) {
	            if (active_group && active_group.dataset.group === optgroup.toString()) {
	              active_option = option_el;
	            }
	          }
	        }

	        group_fragment.appendChild(option_el);
	        groups[optgroup] = group_fragment;
	      }
	    } // sort optgroups


	    if (self.settings.lockOptgroupOrder) {
	      groups_order.sort((a, b) => {
	        const grp_a = self.optgroups[a];
	        const grp_b = self.optgroups[b];
	        const a_order = grp_a && grp_a.$order || 0;
	        const b_order = grp_b && grp_b.$order || 0;
	        return a_order - b_order;
	      });
	    } // render optgroup headers & join groups


	    html = document.createDocumentFragment();
	    iterate$1(groups_order, optgroup => {
	      let group_fragment = groups[optgroup];
	      if (!group_fragment || !group_fragment.children.length) return;
	      let group_heading = self.optgroups[optgroup];

	      if (group_heading !== undefined) {
	        let group_options = document.createDocumentFragment();
	        let header = self.render('optgroup_header', group_heading);
	        append(group_options, header);
	        append(group_options, group_fragment);
	        let group_html = self.render('optgroup', {
	          group: group_heading,
	          options: group_options
	        });
	        append(html, group_html);
	      } else {
	        append(html, group_fragment);
	      }
	    });
	    dropdown_content.innerHTML = '';
	    append(dropdown_content, html); // highlight matching terms inline

	    if (self.settings.highlight) {
	      removeHighlight(dropdown_content);

	      if (results.query.length && results.tokens.length) {
	        iterate$1(results.tokens, tok => {
	          highlight(dropdown_content, tok.regex);
	        });
	      }
	    } // helper method for adding templates to dropdown


	    var add_template = template => {
	      let content = self.render(template, {
	        input: query
	      });

	      if (content) {
	        show_dropdown = true;
	        dropdown_content.insertBefore(content, dropdown_content.firstChild);
	      }

	      return content;
	    }; // add loading message


	    if (self.loading) {
	      add_template('loading'); // invalid query
	    } else if (!self.settings.shouldLoad.call(self, query)) {
	      add_template('not_loading'); // add no_results message
	    } else if (results.items.length === 0) {
	      add_template('no_results');
	    } // add create option


	    has_create_option = self.canCreate(query);

	    if (has_create_option) {
	      create = add_template('option_create');
	    } // activate


	    self.hasOptions = results.items.length > 0 || has_create_option;

	    if (show_dropdown) {
	      if (results.items.length > 0) {
	        if (!active_option && self.settings.mode === 'single' && self.items[0] != undefined) {
	          active_option = self.getOption(self.items[0]);
	        }

	        if (!dropdown_content.contains(active_option)) {
	          let active_index = 0;

	          if (create && !self.settings.addPrecedence) {
	            active_index = 1;
	          }

	          active_option = self.selectable()[active_index];
	        }
	      } else if (create) {
	        active_option = create;
	      }

	      if (triggerDropdown && !self.isOpen) {
	        self.open();
	        self.scrollToOption(active_option, 'auto');
	      }

	      self.setActiveOption(active_option);
	    } else {
	      self.clearActiveOption();

	      if (triggerDropdown && self.isOpen) {
	        self.close(false); // if create_option=null, we want the dropdown to close but not reset the textbox value
	      }
	    }
	  }
	  /**
	   * Return list of selectable options
	   *
	   */


	  selectable() {
	    return this.dropdown_content.querySelectorAll('[data-selectable]');
	  }
	  /**
	   * Adds an available option. If it already exists,
	   * nothing will happen. Note: this does not refresh
	   * the options list dropdown (use `refreshOptions`
	   * for that).
	   *
	   * Usage:
	   *
	   *   this.addOption(data)
	   *
	   */


	  addOption(data, user_created = false) {
	    const self = this; // @deprecated 1.7.7
	    // use addOptions( array, user_created ) for adding multiple options

	    if (Array.isArray(data)) {
	      self.addOptions(data, user_created);
	      return false;
	    }

	    const key = hash_key(data[self.settings.valueField]);

	    if (key === null || self.options.hasOwnProperty(key)) {
	      return false;
	    }

	    data.$order = data.$order || ++self.order;
	    data.$id = self.inputId + '-opt-' + data.$order;
	    self.options[key] = data;
	    self.lastQuery = null;

	    if (user_created) {
	      self.userOptions[key] = user_created;
	      self.trigger('option_add', key, data);
	    }

	    return key;
	  }
	  /**
	   * Add multiple options
	   *
	   */


	  addOptions(data, user_created = false) {
	    iterate$1(data, dat => {
	      this.addOption(dat, user_created);
	    });
	  }
	  /**
	   * @deprecated 1.7.7
	   */


	  registerOption(data) {
	    return this.addOption(data);
	  }
	  /**
	   * Registers an option group to the pool of option groups.
	   *
	   * @return {boolean|string}
	   */


	  registerOptionGroup(data) {
	    var key = hash_key(data[this.settings.optgroupValueField]);
	    if (key === null) return false;
	    data.$order = data.$order || ++this.order;
	    this.optgroups[key] = data;
	    return key;
	  }
	  /**
	   * Registers a new optgroup for options
	   * to be bucketed into.
	   *
	   */


	  addOptionGroup(id, data) {
	    var hashed_id;
	    data[this.settings.optgroupValueField] = id;

	    if (hashed_id = this.registerOptionGroup(data)) {
	      this.trigger('optgroup_add', hashed_id, data);
	    }
	  }
	  /**
	   * Removes an existing option group.
	   *
	   */


	  removeOptionGroup(id) {
	    if (this.optgroups.hasOwnProperty(id)) {
	      delete this.optgroups[id];
	      this.clearCache();
	      this.trigger('optgroup_remove', id);
	    }
	  }
	  /**
	   * Clears all existing option groups.
	   */


	  clearOptionGroups() {
	    this.optgroups = {};
	    this.clearCache();
	    this.trigger('optgroup_clear');
	  }
	  /**
	   * Updates an option available for selection. If
	   * it is visible in the selected items or options
	   * dropdown, it will be re-rendered automatically.
	   *
	   */


	  updateOption(value, data) {
	    const self = this;
	    var item_new;
	    var index_item;
	    const value_old = hash_key(value);
	    const value_new = hash_key(data[self.settings.valueField]); // sanity checks

	    if (value_old === null) return;
	    const data_old = self.options[value_old];
	    if (data_old == undefined) return;
	    if (typeof value_new !== 'string') throw new Error('Value must be set in option data');
	    const option = self.getOption(value_old);
	    const item = self.getItem(value_old);
	    data.$order = data.$order || data_old.$order;
	    delete self.options[value_old]; // invalidate render cache
	    // don't remove existing node yet, we'll remove it after replacing it

	    self.uncacheValue(value_new);
	    self.options[value_new] = data; // update the option if it's in the dropdown

	    if (option) {
	      if (self.dropdown_content.contains(option)) {
	        const option_new = self._render('option', data);

	        replaceNode(option, option_new);

	        if (self.activeOption === option) {
	          self.setActiveOption(option_new);
	        }
	      }

	      option.remove();
	    } // update the item if we have one


	    if (item) {
	      index_item = self.items.indexOf(value_old);

	      if (index_item !== -1) {
	        self.items.splice(index_item, 1, value_new);
	      }

	      item_new = self._render('item', data);
	      if (item.classList.contains('active')) addClasses(item_new, 'active');
	      replaceNode(item, item_new);
	    } // invalidate last query because we might have updated the sortField


	    self.lastQuery = null;
	  }
	  /**
	   * Removes a single option.
	   *
	   */


	  removeOption(value, silent) {
	    const self = this;
	    value = get_hash(value);
	    self.uncacheValue(value);
	    delete self.userOptions[value];
	    delete self.options[value];
	    self.lastQuery = null;
	    self.trigger('option_remove', value);
	    self.removeItem(value, silent);
	  }
	  /**
	   * Clears all options.
	   */


	  clearOptions(filter) {
	    const boundFilter = (filter || this.clearFilter).bind(this);
	    this.loadedSearches = {};
	    this.userOptions = {};
	    this.clearCache();
	    const selected = {};
	    iterate$1(this.options, (option, key) => {
	      if (boundFilter(option, key)) {
	        selected[key] = option;
	      }
	    });
	    this.options = this.sifter.items = selected;
	    this.lastQuery = null;
	    this.trigger('option_clear');
	  }
	  /**
	   * Used by clearOptions() to decide whether or not an option should be removed
	   * Return true to keep an option, false to remove
	   *
	   */


	  clearFilter(option, value) {
	    if (this.items.indexOf(value) >= 0) {
	      return true;
	    }

	    return false;
	  }
	  /**
	   * Returns the dom element of the option
	   * matching the given value.
	   *
	   */


	  getOption(value, create = false) {
	    const hashed = hash_key(value);
	    if (hashed === null) return null;
	    const option = this.options[hashed];

	    if (option != undefined) {
	      if (option.$div) {
	        return option.$div;
	      }

	      if (create) {
	        return this._render('option', option);
	      }
	    }

	    return null;
	  }
	  /**
	   * Returns the dom element of the next or previous dom element of the same type
	   * Note: adjacent options may not be adjacent DOM elements (optgroups)
	   *
	   */


	  getAdjacent(option, direction, type = 'option') {
	    var self = this,
	        all;

	    if (!option) {
	      return null;
	    }

	    if (type == 'item') {
	      all = self.controlChildren();
	    } else {
	      all = self.dropdown_content.querySelectorAll('[data-selectable]');
	    }

	    for (let i = 0; i < all.length; i++) {
	      if (all[i] != option) {
	        continue;
	      }

	      if (direction > 0) {
	        return all[i + 1];
	      }

	      return all[i - 1];
	    }

	    return null;
	  }
	  /**
	   * Returns the dom element of the item
	   * matching the given value.
	   *
	   */


	  getItem(item) {
	    if (typeof item == 'object') {
	      return item;
	    }

	    var value = hash_key(item);
	    return value !== null ? this.control.querySelector(`[data-value="${addSlashes(value)}"]`) : null;
	  }
	  /**
	   * "Selects" multiple items at once. Adds them to the list
	   * at the current caret position.
	   *
	   */


	  addItems(values, silent) {
	    var self = this;
	    var items = Array.isArray(values) ? values : [values];
	    items = items.filter(x => self.items.indexOf(x) === -1);
	    const last_item = items[items.length - 1];
	    items.forEach(item => {
	      self.isPending = item !== last_item;
	      self.addItem(item, silent);
	    });
	  }
	  /**
	   * "Selects" an item. Adds it to the list
	   * at the current caret position.
	   *
	   */


	  addItem(value, silent) {
	    var events = silent ? [] : ['change', 'dropdown_close'];
	    debounce_events(this, events, () => {
	      var item, wasFull;
	      const self = this;
	      const inputMode = self.settings.mode;
	      const hashed = hash_key(value);

	      if (hashed && self.items.indexOf(hashed) !== -1) {
	        if (inputMode === 'single') {
	          self.close();
	        }

	        if (inputMode === 'single' || !self.settings.duplicates) {
	          return;
	        }
	      }

	      if (hashed === null || !self.options.hasOwnProperty(hashed)) return;
	      if (inputMode === 'single') self.clear(silent);
	      if (inputMode === 'multi' && self.isFull()) return;
	      item = self._render('item', self.options[hashed]);

	      if (self.control.contains(item)) {
	        // duplicates
	        item = item.cloneNode(true);
	      }

	      wasFull = self.isFull();
	      self.items.splice(self.caretPos, 0, hashed);
	      self.insertAtCaret(item);

	      if (self.isSetup) {
	        // update menu / remove the option (if this is not one item being added as part of series)
	        if (!self.isPending && self.settings.hideSelected) {
	          let option = self.getOption(hashed);
	          let next = self.getAdjacent(option, 1);

	          if (next) {
	            self.setActiveOption(next);
	          }
	        } // refreshOptions after setActiveOption(),
	        // otherwise setActiveOption() will be called by refreshOptions() with the wrong value


	        if (!self.isPending && !self.settings.closeAfterSelect) {
	          self.refreshOptions(self.isFocused && inputMode !== 'single');
	        } // hide the menu if the maximum number of items have been selected or no options are left


	        if (self.settings.closeAfterSelect != false && self.isFull()) {
	          self.close();
	        } else if (!self.isPending) {
	          self.positionDropdown();
	        }

	        self.trigger('item_add', hashed, item);

	        if (!self.isPending) {
	          self.updateOriginalInput({
	            silent: silent
	          });
	        }
	      }

	      if (!self.isPending || !wasFull && self.isFull()) {
	        self.inputState();
	        self.refreshState();
	      }
	    });
	  }
	  /**
	   * Removes the selected item matching
	   * the provided value.
	   *
	   */


	  removeItem(item = null, silent) {
	    const self = this;
	    item = self.getItem(item);
	    if (!item) return;
	    var i, idx;
	    const value = item.dataset.value;
	    i = nodeIndex(item);
	    item.remove();

	    if (item.classList.contains('active')) {
	      idx = self.activeItems.indexOf(item);
	      self.activeItems.splice(idx, 1);
	      removeClasses(item, 'active');
	    }

	    self.items.splice(i, 1);
	    self.lastQuery = null;

	    if (!self.settings.persist && self.userOptions.hasOwnProperty(value)) {
	      self.removeOption(value, silent);
	    }

	    if (i < self.caretPos) {
	      self.setCaret(self.caretPos - 1);
	    }

	    self.updateOriginalInput({
	      silent: silent
	    });
	    self.refreshState();
	    self.positionDropdown();
	    self.trigger('item_remove', value, item);
	  }
	  /**
	   * Invokes the `create` method provided in the
	   * TomSelect options that should provide the data
	   * for the new item, given the user input.
	   *
	   * Once this completes, it will be added
	   * to the item list.
	   *
	   */


	  createItem(input = null, callback = () => {}) {
	    // triggerDropdown parameter @deprecated 2.1.1
	    if (arguments.length === 3) {
	      callback = arguments[2];
	    }

	    if (typeof callback != 'function') {
	      callback = () => {};
	    }

	    var self = this;
	    var caret = self.caretPos;
	    var output;
	    input = input || self.inputValue();

	    if (!self.canCreate(input)) {
	      callback();
	      return false;
	    }

	    self.lock();
	    var created = false;

	    var create = data => {
	      self.unlock();
	      if (!data || typeof data !== 'object') return callback();
	      var value = hash_key(data[self.settings.valueField]);

	      if (typeof value !== 'string') {
	        return callback();
	      }

	      self.setTextboxValue();
	      self.addOption(data, true);
	      self.setCaret(caret);
	      self.addItem(value);
	      callback(data);
	      created = true;
	    };

	    if (typeof self.settings.create === 'function') {
	      output = self.settings.create.call(this, input, create);
	    } else {
	      output = {
	        [self.settings.labelField]: input,
	        [self.settings.valueField]: input
	      };
	    }

	    if (!created) {
	      create(output);
	    }

	    return true;
	  }
	  /**
	   * Re-renders the selected item lists.
	   */


	  refreshItems() {
	    var self = this;
	    self.lastQuery = null;

	    if (self.isSetup) {
	      self.addItems(self.items);
	    }

	    self.updateOriginalInput();
	    self.refreshState();
	  }
	  /**
	   * Updates all state-dependent attributes
	   * and CSS classes.
	   */


	  refreshState() {
	    const self = this;
	    self.refreshValidityState();
	    const isFull = self.isFull();
	    const isLocked = self.isLocked;
	    self.wrapper.classList.toggle('rtl', self.rtl);
	    const wrap_classList = self.wrapper.classList;
	    wrap_classList.toggle('focus', self.isFocused);
	    wrap_classList.toggle('disabled', self.isDisabled);
	    wrap_classList.toggle('required', self.isRequired);
	    wrap_classList.toggle('invalid', !self.isValid);
	    wrap_classList.toggle('locked', isLocked);
	    wrap_classList.toggle('full', isFull);
	    wrap_classList.toggle('input-active', self.isFocused && !self.isInputHidden);
	    wrap_classList.toggle('dropdown-active', self.isOpen);
	    wrap_classList.toggle('has-options', isEmptyObject(self.options));
	    wrap_classList.toggle('has-items', self.items.length > 0);
	  }
	  /**
	   * Update the `required` attribute of both input and control input.
	   *
	   * The `required` property needs to be activated on the control input
	   * for the error to be displayed at the right place. `required` also
	   * needs to be temporarily deactivated on the input since the input is
	   * hidden and can't show errors.
	   */


	  refreshValidityState() {
	    var self = this;

	    if (!self.input.validity) {
	      return;
	    }

	    self.isValid = self.input.validity.valid;
	    self.isInvalid = !self.isValid;
	  }
	  /**
	   * Determines whether or not more items can be added
	   * to the control without exceeding the user-defined maximum.
	   *
	   * @returns {boolean}
	   */


	  isFull() {
	    return this.settings.maxItems !== null && this.items.length >= this.settings.maxItems;
	  }
	  /**
	   * Refreshes the original <select> or <input>
	   * element to reflect the current state.
	   *
	   */


	  updateOriginalInput(opts = {}) {
	    const self = this;
	    var option, label;
	    const empty_option = self.input.querySelector('option[value=""]');

	    if (self.is_select_tag) {
	      const selected = [];
	      const has_selected = self.input.querySelectorAll('option:checked').length;

	      function AddSelected(option_el, value, label) {
	        if (!option_el) {
	          option_el = getDom('<option value="' + escape_html(value) + '">' + escape_html(label) + '</option>');
	        } // don't move empty option from top of list
	        // fixes bug in firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1725293


	        if (option_el != empty_option) {
	          self.input.append(option_el);
	        }

	        selected.push(option_el); // marking empty option as selected can break validation
	        // fixes https://github.com/orchidjs/tom-select/issues/303

	        if (option_el != empty_option || has_selected > 0) {
	          option_el.selected = true;
	        }

	        return option_el;
	      } // unselect all selected options


	      self.input.querySelectorAll('option:checked').forEach(option_el => {
	        option_el.selected = false;
	      }); // nothing selected?

	      if (self.items.length == 0 && self.settings.mode == 'single') {
	        AddSelected(empty_option, "", ""); // order selected <option> tags for values in self.items
	      } else {
	        self.items.forEach(value => {
	          option = self.options[value];
	          label = option[self.settings.labelField] || '';

	          if (selected.includes(option.$option)) {
	            const reuse_opt = self.input.querySelector(`option[value="${addSlashes(value)}"]:not(:checked)`);
	            AddSelected(reuse_opt, value, label);
	          } else {
	            option.$option = AddSelected(option.$option, value, label);
	          }
	        });
	      }
	    } else {
	      self.input.value = self.getValue();
	    }

	    if (self.isSetup) {
	      if (!opts.silent) {
	        self.trigger('change', self.getValue());
	      }
	    }
	  }
	  /**
	   * Shows the autocomplete dropdown containing
	   * the available options.
	   */


	  open() {
	    var self = this;
	    if (self.isLocked || self.isOpen || self.settings.mode === 'multi' && self.isFull()) return;
	    self.isOpen = true;
	    setAttr(self.focus_node, {
	      'aria-expanded': 'true'
	    });
	    self.refreshState();
	    applyCSS(self.dropdown, {
	      visibility: 'hidden',
	      display: 'block'
	    });
	    self.positionDropdown();
	    applyCSS(self.dropdown, {
	      visibility: 'visible',
	      display: 'block'
	    });
	    self.focus();
	    self.trigger('dropdown_open', self.dropdown);
	  }
	  /**
	   * Closes the autocomplete dropdown menu.
	   */


	  close(setTextboxValue = true) {
	    var self = this;
	    var trigger = self.isOpen;

	    if (setTextboxValue) {
	      // before blur() to prevent form onchange event
	      self.setTextboxValue();

	      if (self.settings.mode === 'single' && self.items.length) {
	        self.hideInput();
	      }
	    }

	    self.isOpen = false;
	    setAttr(self.focus_node, {
	      'aria-expanded': 'false'
	    });
	    applyCSS(self.dropdown, {
	      display: 'none'
	    });

	    if (self.settings.hideSelected) {
	      self.clearActiveOption();
	    }

	    self.refreshState();
	    if (trigger) self.trigger('dropdown_close', self.dropdown);
	  }
	  /**
	   * Calculates and applies the appropriate
	   * position of the dropdown if dropdownParent = 'body'.
	   * Otherwise, position is determined by css
	   */


	  positionDropdown() {
	    if (this.settings.dropdownParent !== 'body') {
	      return;
	    }

	    var context = this.control;
	    var rect = context.getBoundingClientRect();
	    var top = context.offsetHeight + rect.top + window.scrollY;
	    var left = rect.left + window.scrollX;
	    applyCSS(this.dropdown, {
	      width: rect.width + 'px',
	      top: top + 'px',
	      left: left + 'px'
	    });
	  }
	  /**
	   * Resets / clears all selected items
	   * from the control.
	   *
	   */


	  clear(silent) {
	    var self = this;
	    if (!self.items.length) return;
	    var items = self.controlChildren();
	    iterate$1(items, item => {
	      self.removeItem(item, true);
	    });
	    self.showInput();
	    if (!silent) self.updateOriginalInput();
	    self.trigger('clear');
	  }
	  /**
	   * A helper method for inserting an element
	   * at the current caret position.
	   *
	   */


	  insertAtCaret(el) {
	    const self = this;
	    const caret = self.caretPos;
	    const target = self.control;
	    target.insertBefore(el, target.children[caret] || null);
	    self.setCaret(caret + 1);
	  }
	  /**
	   * Removes the current selected item(s).
	   *
	   */


	  deleteSelection(e) {
	    var direction, selection, caret, tail;
	    var self = this;
	    direction = e && e.keyCode === KEY_BACKSPACE ? -1 : 1;
	    selection = getSelection(self.control_input); // determine items that will be removed

	    const rm_items = [];

	    if (self.activeItems.length) {
	      tail = getTail(self.activeItems, direction);
	      caret = nodeIndex(tail);

	      if (direction > 0) {
	        caret++;
	      }

	      iterate$1(self.activeItems, item => rm_items.push(item));
	    } else if ((self.isFocused || self.settings.mode === 'single') && self.items.length) {
	      const items = self.controlChildren();
	      let rm_item;

	      if (direction < 0 && selection.start === 0 && selection.length === 0) {
	        rm_item = items[self.caretPos - 1];
	      } else if (direction > 0 && selection.start === self.inputValue().length) {
	        rm_item = items[self.caretPos];
	      }

	      if (rm_item !== undefined) {
	        rm_items.push(rm_item);
	      }
	    }

	    if (!self.shouldDelete(rm_items, e)) {
	      return false;
	    }

	    preventDefault(e, true); // perform removal

	    if (typeof caret !== 'undefined') {
	      self.setCaret(caret);
	    }

	    while (rm_items.length) {
	      self.removeItem(rm_items.pop());
	    }

	    self.showInput();
	    self.positionDropdown();
	    self.refreshOptions(false);
	    return true;
	  }
	  /**
	   * Return true if the items should be deleted
	   */


	  shouldDelete(items, evt) {
	    const values = items.map(item => item.dataset.value); // allow the callback to abort

	    if (!values.length || typeof this.settings.onDelete === 'function' && this.settings.onDelete(values, evt) === false) {
	      return false;
	    }

	    return true;
	  }
	  /**
	   * Selects the previous / next item (depending on the `direction` argument).
	   *
	   * > 0 - right
	   * < 0 - left
	   *
	   */


	  advanceSelection(direction, e) {
	    var last_active,
	        adjacent,
	        self = this;
	    if (self.rtl) direction *= -1;
	    if (self.inputValue().length) return; // add or remove to active items

	    if (isKeyDown(KEY_SHORTCUT, e) || isKeyDown('shiftKey', e)) {
	      last_active = self.getLastActive(direction);

	      if (last_active) {
	        if (!last_active.classList.contains('active')) {
	          adjacent = last_active;
	        } else {
	          adjacent = self.getAdjacent(last_active, direction, 'item');
	        } // if no active item, get items adjacent to the control input

	      } else if (direction > 0) {
	        adjacent = self.control_input.nextElementSibling;
	      } else {
	        adjacent = self.control_input.previousElementSibling;
	      }

	      if (adjacent) {
	        if (adjacent.classList.contains('active')) {
	          self.removeActiveItem(last_active);
	        }

	        self.setActiveItemClass(adjacent); // mark as last_active !! after removeActiveItem() on last_active
	      } // move caret to the left or right

	    } else {
	      self.moveCaret(direction);
	    }
	  }

	  moveCaret(direction) {}
	  /**
	   * Get the last active item
	   *
	   */


	  getLastActive(direction) {
	    let last_active = this.control.querySelector('.last-active');

	    if (last_active) {
	      return last_active;
	    }

	    var result = this.control.querySelectorAll('.active');

	    if (result) {
	      return getTail(result, direction);
	    }
	  }
	  /**
	   * Moves the caret to the specified index.
	   *
	   * The input must be moved by leaving it in place and moving the
	   * siblings, due to the fact that focus cannot be restored once lost
	   * on mobile webkit devices
	   *
	   */


	  setCaret(new_pos) {
	    this.caretPos = this.items.length;
	  }
	  /**
	   * Return list of item dom elements
	   *
	   */


	  controlChildren() {
	    return Array.from(this.control.querySelectorAll('[data-ts-item]'));
	  }
	  /**
	   * Disables user input on the control. Used while
	   * items are being asynchronously created.
	   */


	  lock() {
	    this.isLocked = true;
	    this.refreshState();
	  }
	  /**
	   * Re-enables user input on the control.
	   */


	  unlock() {
	    this.isLocked = false;
	    this.refreshState();
	  }
	  /**
	   * Disables user input on the control completely.
	   * While disabled, it cannot receive focus.
	   */


	  disable() {
	    var self = this;
	    self.input.disabled = true;
	    self.control_input.disabled = true;
	    self.focus_node.tabIndex = -1;
	    self.isDisabled = true;
	    this.close();
	    self.lock();
	  }
	  /**
	   * Enables the control so that it can respond
	   * to focus and user input.
	   */


	  enable() {
	    var self = this;
	    self.input.disabled = false;
	    self.control_input.disabled = false;
	    self.focus_node.tabIndex = self.tabIndex;
	    self.isDisabled = false;
	    self.unlock();
	  }
	  /**
	   * Completely destroys the control and
	   * unbinds all event listeners so that it can
	   * be garbage collected.
	   */


	  destroy() {
	    var self = this;
	    var revertSettings = self.revertSettings;
	    self.trigger('destroy');
	    self.off();
	    self.wrapper.remove();
	    self.dropdown.remove();
	    self.input.innerHTML = revertSettings.innerHTML;
	    self.input.tabIndex = revertSettings.tabIndex;
	    removeClasses(self.input, 'tomselected', 'ts-hidden-accessible');

	    self._destroy();

	    delete self.input.tomselect;
	  }
	  /**
	   * A helper method for rendering "item" and
	   * "option" templates, given the data.
	   *
	   */


	  render(templateName, data) {
	    var id, html;
	    const self = this;

	    if (typeof this.settings.render[templateName] !== 'function') {
	      return null;
	    } // render markup


	    html = self.settings.render[templateName].call(this, data, escape_html);

	    if (!html) {
	      return null;
	    }

	    html = getDom(html); // add mandatory attributes

	    if (templateName === 'option' || templateName === 'option_create') {
	      if (data[self.settings.disabledField]) {
	        setAttr(html, {
	          'aria-disabled': 'true'
	        });
	      } else {
	        setAttr(html, {
	          'data-selectable': ''
	        });
	      }
	    } else if (templateName === 'optgroup') {
	      id = data.group[self.settings.optgroupValueField];
	      setAttr(html, {
	        'data-group': id
	      });

	      if (data.group[self.settings.disabledField]) {
	        setAttr(html, {
	          'data-disabled': ''
	        });
	      }
	    }

	    if (templateName === 'option' || templateName === 'item') {
	      const value = get_hash(data[self.settings.valueField]);
	      setAttr(html, {
	        'data-value': value
	      }); // make sure we have some classes if a template is overwritten

	      if (templateName === 'item') {
	        addClasses(html, self.settings.itemClass);
	        setAttr(html, {
	          'data-ts-item': ''
	        });
	      } else {
	        addClasses(html, self.settings.optionClass);
	        setAttr(html, {
	          role: 'option',
	          id: data.$id
	        }); // update cache

	        data.$div = html;
	        self.options[value] = data;
	      }
	    }

	    return html;
	  }
	  /**
	   * Type guarded rendering
	   *
	   */


	  _render(templateName, data) {
	    const html = this.render(templateName, data);

	    if (html == null) {
	      throw 'HTMLElement expected';
	    }

	    return html;
	  }
	  /**
	   * Clears the render cache for a template. If
	   * no template is given, clears all render
	   * caches.
	   *
	   */


	  clearCache() {
	    iterate$1(this.options, option => {
	      if (option.$div) {
	        option.$div.remove();
	        delete option.$div;
	      }
	    });
	  }
	  /**
	   * Removes a value from item and option caches
	   *
	   */


	  uncacheValue(value) {
	    const option_el = this.getOption(value);
	    if (option_el) option_el.remove();
	  }
	  /**
	   * Determines whether or not to display the
	   * create item prompt, given a user input.
	   *
	   */


	  canCreate(input) {
	    return this.settings.create && input.length > 0 && this.settings.createFilter.call(this, input);
	  }
	  /**
	   * Wraps this.`method` so that `new_fn` can be invoked 'before', 'after', or 'instead' of the original method
	   *
	   * this.hook('instead','onKeyDown',function( arg1, arg2 ...){
	   *
	   * });
	   */


	  hook(when, method, new_fn) {
	    var self = this;
	    var orig_method = self[method];

	    self[method] = function () {
	      var result, result_new;

	      if (when === 'after') {
	        result = orig_method.apply(self, arguments);
	      }

	      result_new = new_fn.apply(self, arguments);

	      if (when === 'instead') {
	        return result_new;
	      }

	      if (when === 'before') {
	        result = orig_method.apply(self, arguments);
	      }

	      return result;
	    };
	  }

	}

	/**
	 * Plugin: "dropdown_input" (Tom Select)
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
	function caret_position () {
	  var self = this;
	  /**
	   * Moves the caret to the specified index.
	   *
	   * The input must be moved by leaving it in place and moving the
	   * siblings, due to the fact that focus cannot be restored once lost
	   * on mobile webkit devices
	   *
	   */

	  self.hook('instead', 'setCaret', new_pos => {
	    if (self.settings.mode === 'single' || !self.control.contains(self.control_input)) {
	      new_pos = self.items.length;
	    } else {
	      new_pos = Math.max(0, Math.min(self.items.length, new_pos));

	      if (new_pos != self.caretPos && !self.isPending) {
	        self.controlChildren().forEach((child, j) => {
	          if (j < new_pos) {
	            self.control_input.insertAdjacentElement('beforebegin', child);
	          } else {
	            self.control.appendChild(child);
	          }
	        });
	      }
	    }

	    self.caretPos = new_pos;
	  });
	  self.hook('instead', 'moveCaret', direction => {
	    if (!self.isFocused) return; // move caret before or after selected items

	    const last_active = self.getLastActive(direction);

	    if (last_active) {
	      const idx = nodeIndex(last_active);
	      self.setCaret(direction > 0 ? idx + 1 : idx);
	      self.setActiveItem();
	      removeClasses(last_active, 'last-active'); // move caret left or right of current position
	    } else {
	      self.setCaret(self.caretPos + direction);
	    }
	  });
	}

	/**
	 * Plugin: "dropdown_input" (Tom Select)
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
	function dropdown_input () {
	  const self = this;
	  self.settings.shouldOpen = true; // make sure the input is shown even if there are no options to display in the dropdown

	  self.hook('before', 'setup', () => {
	    self.focus_node = self.control;
	    addClasses(self.control_input, 'dropdown-input');
	    const div = getDom('<div class="dropdown-input-wrap">');
	    div.append(self.control_input);
	    self.dropdown.insertBefore(div, self.dropdown.firstChild); // set a placeholder in the select control

	    const placeholder = getDom('<input class="items-placeholder" tabindex="-1" />');
	    placeholder.placeholder = self.settings.placeholder || '';
	    self.control.append(placeholder);
	  });
	  self.on('initialize', () => {
	    // set tabIndex on control to -1, otherwise [shift+tab] will put focus right back on control_input
	    self.control_input.addEventListener('keydown', evt => {
	      //addEvent(self.control_input,'keydown' as const,(evt:KeyboardEvent) =>{
	      switch (evt.keyCode) {
	        case KEY_ESC:
	          if (self.isOpen) {
	            preventDefault(evt, true);
	            self.close();
	          }

	          self.clearActiveItems();
	          return;

	        case KEY_TAB:
	          self.focus_node.tabIndex = -1;
	          break;
	      }

	      return self.onKeyDown.call(self, evt);
	    });
	    self.on('blur', () => {
	      self.focus_node.tabIndex = self.isDisabled ? -1 : self.tabIndex;
	    }); // give the control_input focus when the dropdown is open

	    self.on('dropdown_open', () => {
	      self.control_input.focus();
	    }); // prevent onBlur from closing when focus is on the control_input

	    const orig_onBlur = self.onBlur;
	    self.hook('instead', 'onBlur', evt => {
	      if (evt && evt.relatedTarget == self.control_input) return;
	      return orig_onBlur.call(self);
	    });
	    addEvent(self.control_input, 'blur', () => self.onBlur()); // return focus to control to allow further keyboard input

	    self.hook('before', 'close', () => {
	      if (!self.isOpen) return;
	      self.focus_node.focus({
	        preventScroll: true
	      });
	    });
	  });
	}

	/**
	 * Plugin: "input_autogrow" (Tom Select)
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
	function no_backspace_delete () {
	  var self = this;
	  var orig_deleteSelection = self.deleteSelection;
	  this.hook('instead', 'deleteSelection', evt => {
	    if (self.activeItems.length) {
	      return orig_deleteSelection.call(self, evt);
	    }

	    return false;
	  });
	}

	/**
	 * Plugin: "remove_button" (Tom Select)
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
	function remove_button (userOptions) {
	  const options = Object.assign({
	    label: '&times;',
	    title: 'Remove',
	    className: 'remove',
	    append: true
	  }, userOptions); //options.className = 'remove-single';

	  var self = this; // override the render method to add remove button to each item

	  if (!options.append) {
	    return;
	  }

	  var html = '<a href="javascript:void(0)" class="' + options.className + '" tabindex="-1" title="' + escape_html(options.title) + '">' + options.label + '</a>';
	  self.hook('after', 'setupTemplates', () => {
	    var orig_render_item = self.settings.render.item;

	    self.settings.render.item = (data, escape) => {
	      var item = getDom(orig_render_item.call(self, data, escape));
	      var close_button = getDom(html);
	      item.appendChild(close_button);
	      addEvent(close_button, 'mousedown', evt => {
	        preventDefault(evt, true);
	      });
	      addEvent(close_button, 'click', evt => {
	        // propagating will trigger the dropdown to show for single mode
	        preventDefault(evt, true);
	        if (self.isLocked) return;
	        if (!self.shouldDelete([item], evt)) return;
	        self.removeItem(item);
	        self.refreshOptions(false);
	        self.inputState();
	      });
	      return item;
	    };
	  });
	}

	/**
	 * Plugin: "restore_on_backspace" (Tom Select)
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
	function restore_on_backspace (userOptions) {
	  const self = this;
	  const options = Object.assign({
	    text: option => {
	      return option[self.settings.labelField];
	    }
	  }, userOptions);
	  self.on('item_remove', function (value) {
	    if (!self.isFocused) {
	      return;
	    }

	    if (self.control_input.value.trim() === '') {
	      var option = self.options[value];

	      if (option) {
	        self.setTextboxValue(options.text.call(self, option));
	      }
	    }
	  });
	}

	TomSelect.define('caret_position', caret_position);
	TomSelect.define('dropdown_input', dropdown_input);
	TomSelect.define('no_backspace_delete', no_backspace_delete);
	TomSelect.define('remove_button', remove_button);
	TomSelect.define('restore_on_backspace', restore_on_backspace);

	return TomSelect;

}));
var tomSelect=function(el,opts){return new TomSelect(el,opts);} 
//# sourceMappingURL=tom-select.popular.js.map
