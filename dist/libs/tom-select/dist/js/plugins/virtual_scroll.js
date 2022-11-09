/**
* Tom Select v2.2.2
* Licensed under the Apache License, Version 2.0 (the "License");
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.virtual_scroll = factory());
})(this, (function () { 'use strict';

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
  function plugin () {
    const self = this;
    const orig_canLoad = self.canLoad;
    const orig_clearActiveOption = self.clearActiveOption;
    const orig_loadCallback = self.loadCallback;
    var pagination = {};
    var dropdown_content;
    var loading_more = false;
    var load_more_opt;
    var default_values = [];

    if (!self.settings.shouldLoadMore) {
      // return true if additional results should be loaded
      self.settings.shouldLoadMore = () => {
        const scroll_percent = dropdown_content.clientHeight / (dropdown_content.scrollHeight - dropdown_content.scrollTop);

        if (scroll_percent > 0.9) {
          return true;
        }

        if (self.activeOption) {
          var selectable = self.selectable();
          var index = Array.from(selectable).indexOf(self.activeOption);

          if (index >= selectable.length - 2) {
            return true;
          }
        }

        return false;
      };
    }

    if (!self.settings.firstUrl) {
      throw 'virtual_scroll plugin requires a firstUrl() method';
    } // in order for virtual scrolling to work,
    // options need to be ordered the same way they're returned from the remote data source


    self.settings.sortField = [{
      field: '$order'
    }, {
      field: '$score'
    }]; // can we load more results for given query?

    const canLoadMore = query => {
      if (typeof self.settings.maxOptions === 'number' && dropdown_content.children.length >= self.settings.maxOptions) {
        return false;
      }

      if (query in pagination && pagination[query]) {
        return true;
      }

      return false;
    };

    const clearFilter = (option, value) => {
      if (self.items.indexOf(value) >= 0 || default_values.indexOf(value) >= 0) {
        return true;
      }

      return false;
    }; // set the next url that will be


    self.setNextUrl = (value, next_url) => {
      pagination[value] = next_url;
    }; // getUrl() to be used in settings.load()


    self.getUrl = query => {
      if (query in pagination) {
        const next_url = pagination[query];
        pagination[query] = false;
        return next_url;
      } // if the user goes back to a previous query
      // we need to load the first page again


      pagination = {};
      return self.settings.firstUrl.call(self, query);
    }; // don't clear the active option (and cause unwanted dropdown scroll)
    // while loading more results


    self.hook('instead', 'clearActiveOption', () => {
      if (loading_more) {
        return;
      }

      return orig_clearActiveOption.call(self);
    }); // override the canLoad method

    self.hook('instead', 'canLoad', query => {
      // first time the query has been seen
      if (!(query in pagination)) {
        return orig_canLoad.call(self, query);
      }

      return canLoadMore(query);
    }); // wrap the load

    self.hook('instead', 'loadCallback', (options, optgroups) => {
      if (!loading_more) {
        self.clearOptions(clearFilter);
      } else if (load_more_opt) {
        const first_option = options[0];

        if (first_option !== undefined) {
          load_more_opt.dataset.value = first_option[self.settings.valueField];
        }
      }

      orig_loadCallback.call(self, options, optgroups);
      loading_more = false;
    }); // add templates to dropdown
    //	loading_more if we have another url in the queue
    //	no_more_results if we don't have another url in the queue

    self.hook('after', 'refreshOptions', () => {
      const query = self.lastValue;
      var option;

      if (canLoadMore(query)) {
        option = self.render('loading_more', {
          query: query
        });

        if (option) {
          option.setAttribute('data-selectable', ''); // so that navigating dropdown with [down] keypresses can navigate to this node

          load_more_opt = option;
        }
      } else if (query in pagination && !dropdown_content.querySelector('.no-results')) {
        option = self.render('no_more_results', {
          query: query
        });
      }

      if (option) {
        addClasses(option, self.settings.optionClass);
        dropdown_content.append(option);
      }
    }); // add scroll listener and default templates

    self.on('initialize', () => {
      default_values = Object.keys(self.options);
      dropdown_content = self.dropdown_content; // default templates

      self.settings.render = Object.assign({}, {
        loading_more: () => {
          return `<div class="loading-more-results">Loading more results ... </div>`;
        },
        no_more_results: () => {
          return `<div class="no-more-results">No more results</div>`;
        }
      }, self.settings.render); // watch dropdown content scroll position

      dropdown_content.addEventListener('scroll', () => {
        if (!self.settings.shouldLoadMore.call(self)) {
          return;
        } // !important: this will get checked again in load() but we still need to check here otherwise loading_more will be set to true


        if (!canLoadMore(self.lastValue)) {
          return;
        } // don't call load() too much


        if (loading_more) return;
        loading_more = true;
        self.load.call(self, self.lastValue);
      });
    });
  }

  return plugin;

}));
//# sourceMappingURL=virtual_scroll.js.map
