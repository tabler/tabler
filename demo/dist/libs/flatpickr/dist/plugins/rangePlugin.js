(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rangePlugin = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    function rangePlugin(config) {
        if (config === void 0) { config = {}; }
        return function (fp) {
            var dateFormat = "", secondInput, _secondInputFocused, _prevDates;
            var createSecondInput = function () {
                if (config.input) {
                    secondInput =
                        config.input instanceof Element
                            ? config.input
                            : window.document.querySelector(config.input);
                    if (!secondInput) {
                        fp.config.errorHandler(new Error("Invalid input element specified"));
                        return;
                    }
                    if (fp.config.wrap) {
                        secondInput = secondInput.querySelector("[data-input]");
                    }
                }
                else {
                    secondInput = fp._input.cloneNode();
                    secondInput.removeAttribute("id");
                    secondInput._flatpickr = undefined;
                }
                if (secondInput.value) {
                    var parsedDate = fp.parseDate(secondInput.value);
                    if (parsedDate)
                        fp.selectedDates.push(parsedDate);
                }
                secondInput.setAttribute("data-fp-omit", "");
                if (fp.config.clickOpens) {
                    fp._bind(secondInput, ["focus", "click"], function () {
                        if (fp.selectedDates[1]) {
                            fp.latestSelectedDateObj = fp.selectedDates[1];
                            fp._setHoursFromDate(fp.selectedDates[1]);
                            fp.jumpToDate(fp.selectedDates[1]);
                        }
                        _secondInputFocused = true;
                        fp.isOpen = false;
                        fp.open(undefined, config.position === "left" ? fp._input : secondInput);
                    });
                    fp._bind(fp._input, ["focus", "click"], function (e) {
                        e.preventDefault();
                        fp.isOpen = false;
                        fp.open();
                    });
                }
                if (fp.config.allowInput)
                    fp._bind(secondInput, "keydown", function (e) {
                        if (e.key === "Enter") {
                            fp.setDate([fp.selectedDates[0], secondInput.value], true, dateFormat);
                            secondInput.click();
                        }
                    });
                if (!config.input)
                    fp._input.parentNode &&
                        fp._input.parentNode.insertBefore(secondInput, fp._input.nextSibling);
            };
            var plugin = {
                onParseConfig: function () {
                    fp.config.mode = "range";
                    dateFormat = fp.config.altInput
                        ? fp.config.altFormat
                        : fp.config.dateFormat;
                },
                onReady: function () {
                    createSecondInput();
                    fp.config.ignoredFocusElements.push(secondInput);
                    if (fp.config.allowInput) {
                        fp._input.removeAttribute("readonly");
                        secondInput.removeAttribute("readonly");
                    }
                    else {
                        secondInput.setAttribute("readonly", "readonly");
                    }
                    fp._bind(fp._input, "focus", function () {
                        fp.latestSelectedDateObj = fp.selectedDates[0];
                        fp._setHoursFromDate(fp.selectedDates[0]);
                        _secondInputFocused = false;
                        fp.jumpToDate(fp.selectedDates[0]);
                    });
                    if (fp.config.allowInput)
                        fp._bind(fp._input, "keydown", function (e) {
                            if (e.key === "Enter")
                                fp.setDate([fp._input.value, fp.selectedDates[1]], true, dateFormat);
                        });
                    fp.setDate(fp.selectedDates, false);
                    plugin.onValueUpdate(fp.selectedDates);
                    fp.loadedPlugins.push("range");
                },
                onPreCalendarPosition: function () {
                    if (_secondInputFocused) {
                        fp._positionElement = secondInput;
                        setTimeout(function () {
                            fp._positionElement = fp._input;
                        }, 0);
                    }
                },
                onChange: function () {
                    if (!fp.selectedDates.length) {
                        setTimeout(function () {
                            if (fp.selectedDates.length)
                                return;
                            secondInput.value = "";
                            _prevDates = [];
                        }, 10);
                    }
                    if (_secondInputFocused) {
                        setTimeout(function () {
                            secondInput.focus();
                        }, 0);
                    }
                },
                onDestroy: function () {
                    if (!config.input)
                        secondInput.parentNode &&
                            secondInput.parentNode.removeChild(secondInput);
                },
                onValueUpdate: function (selDates) {
                    var _a, _b, _c;
                    if (!secondInput)
                        return;
                    _prevDates =
                        !_prevDates || selDates.length >= _prevDates.length
                            ? __spreadArrays(selDates) : _prevDates;
                    if (_prevDates.length > selDates.length) {
                        var newSelectedDate = selDates[0];
                        var newDates = _secondInputFocused
                            ? [_prevDates[0], newSelectedDate]
                            : [newSelectedDate, _prevDates[1]];
                        fp.setDate(newDates, false);
                        _prevDates = __spreadArrays(newDates);
                    }
                    _a = fp.selectedDates.map(function (d) { return fp.formatDate(d, dateFormat); }), _b = _a[0], fp._input.value = _b === void 0 ? "" : _b, _c = _a[1], secondInput.value = _c === void 0 ? "" : _c;
                },
            };
            return plugin;
        };
    }

    return rangePlugin;

})));
