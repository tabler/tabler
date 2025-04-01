/**
 * HugeRTE version 1.0.9 (2025-03-15)
 * Copyright (c) 2022 Ephox Corporation DBA Tiny Technologies, Inc.
 * Copyright (c) 2024 HugeRTE contributors
 * Licensed under the MIT license (https://github.com/hugerte/hugerte/blob/main/LICENSE.TXT)
 */

(function () {
    'use strict';

    const Cell = initial => {
      let value = initial;
      const get = () => {
        return value;
      };
      const set = v => {
        value = v;
      };
      return {
        get,
        set
      };
    };

    var global$1 = hugerte.util.Tools.resolve('hugerte.PluginManager');

    const constant = value => {
      return () => {
        return value;
      };
    };

    var global = hugerte.util.Tools.resolve('hugerte.Env');

    const fireResizeEditor = editor => editor.dispatch('ResizeEditor');

    const option = name => editor => editor.options.get(name);
    const register$1 = editor => {
      const registerOption = editor.options.register;
      registerOption('autoresize_overflow_padding', {
        processor: 'number',
        default: 1
      });
      registerOption('autoresize_bottom_margin', {
        processor: 'number',
        default: 50
      });
    };
    const getMinHeight = option('min_height');
    const getMaxHeight = option('max_height');
    const getAutoResizeOverflowPadding = option('autoresize_overflow_padding');
    const getAutoResizeBottomMargin = option('autoresize_bottom_margin');

    const isFullscreen = editor => editor.plugins.fullscreen && editor.plugins.fullscreen.isFullscreen();
    const toggleScrolling = (editor, state) => {
      const body = editor.getBody();
      if (body) {
        body.style.overflowY = state ? '' : 'hidden';
        if (!state) {
          body.scrollTop = 0;
        }
      }
    };
    const parseCssValueToInt = (dom, elm, name, computed) => {
      var _a;
      const value = parseInt((_a = dom.getStyle(elm, name, computed)) !== null && _a !== void 0 ? _a : '', 10);
      return isNaN(value) ? 0 : value;
    };
    const shouldScrollIntoView = trigger => {
      if ((trigger === null || trigger === void 0 ? void 0 : trigger.type.toLowerCase()) === 'setcontent') {
        const setContentEvent = trigger;
        return setContentEvent.selection === true || setContentEvent.paste === true;
      } else {
        return false;
      }
    };
    const resize = (editor, oldSize, trigger, getExtraMarginBottom) => {
      var _a;
      const dom = editor.dom;
      const doc = editor.getDoc();
      if (!doc) {
        return;
      }
      if (isFullscreen(editor)) {
        toggleScrolling(editor, true);
        return;
      }
      const docEle = doc.documentElement;
      const resizeBottomMargin = getExtraMarginBottom ? getExtraMarginBottom() : getAutoResizeOverflowPadding(editor);
      const minHeight = (_a = getMinHeight(editor)) !== null && _a !== void 0 ? _a : editor.getElement().offsetHeight;
      let resizeHeight = minHeight;
      const marginTop = parseCssValueToInt(dom, docEle, 'margin-top', true);
      const marginBottom = parseCssValueToInt(dom, docEle, 'margin-bottom', true);
      let contentHeight = docEle.offsetHeight + marginTop + marginBottom + resizeBottomMargin;
      if (contentHeight < 0) {
        contentHeight = 0;
      }
      const containerHeight = editor.getContainer().offsetHeight;
      const contentAreaHeight = editor.getContentAreaContainer().offsetHeight;
      const chromeHeight = containerHeight - contentAreaHeight;
      if (contentHeight + chromeHeight > minHeight) {
        resizeHeight = contentHeight + chromeHeight;
      }
      const maxHeight = getMaxHeight(editor);
      if (maxHeight && resizeHeight > maxHeight) {
        resizeHeight = maxHeight;
        toggleScrolling(editor, true);
      } else {
        toggleScrolling(editor, false);
      }
      if (resizeHeight !== oldSize.get()) {
        const deltaSize = resizeHeight - oldSize.get();
        dom.setStyle(editor.getContainer(), 'height', resizeHeight + 'px');
        oldSize.set(resizeHeight);
        fireResizeEditor(editor);
        if (global.browser.isSafari() && (global.os.isMacOS() || global.os.isiOS())) {
          const win = editor.getWin();
          win.scrollTo(win.pageXOffset, win.pageYOffset);
        }
        if (editor.hasFocus() && shouldScrollIntoView(trigger)) {
          editor.selection.scrollIntoView();
        }
        if ((global.browser.isSafari() || global.browser.isChromium()) && deltaSize < 0) {
          resize(editor, oldSize, trigger, getExtraMarginBottom);
        }
      }
    };
    const setup = (editor, oldSize) => {
      let getExtraMarginBottom = () => getAutoResizeBottomMargin(editor);
      let resizeCounter;
      let sizeAfterFirstResize;
      editor.on('init', e => {
        resizeCounter = 0;
        const overflowPadding = getAutoResizeOverflowPadding(editor);
        const dom = editor.dom;
        dom.setStyles(editor.getDoc().documentElement, { height: 'auto' });
        if (global.browser.isEdge() || global.browser.isIE()) {
          dom.setStyles(editor.getBody(), {
            'paddingLeft': overflowPadding,
            'paddingRight': overflowPadding,
            'min-height': 0
          });
        } else {
          dom.setStyles(editor.getBody(), {
            paddingLeft: overflowPadding,
            paddingRight: overflowPadding
          });
        }
        resize(editor, oldSize, e, getExtraMarginBottom);
        resizeCounter += 1;
      });
      editor.on('NodeChange SetContent keyup FullscreenStateChanged ResizeContent', e => {
        if (resizeCounter === 1) {
          sizeAfterFirstResize = editor.getContainer().offsetHeight;
          resize(editor, oldSize, e, getExtraMarginBottom);
          resizeCounter += 1;
        } else if (resizeCounter === 2) {
          const isLooping = sizeAfterFirstResize < editor.getContainer().offsetHeight;
          if (isLooping) {
            const dom = editor.dom;
            const doc = editor.getDoc();
            dom.setStyles(doc.documentElement, { 'min-height': 0 });
            dom.setStyles(editor.getBody(), { 'min-height': 'inherit' });
          }
          getExtraMarginBottom = isLooping ? constant(0) : getExtraMarginBottom;
          resizeCounter += 1;
        } else {
          resize(editor, oldSize, e, getExtraMarginBottom);
        }
      });
    };

    const register = (editor, oldSize) => {
      editor.addCommand('mceAutoResize', () => {
        resize(editor, oldSize);
      });
    };

    var Plugin = () => {
      global$1.add('autoresize', editor => {
        register$1(editor);
        if (!editor.options.isSet('resize')) {
          editor.options.set('resize', false);
        }
        if (!editor.inline) {
          const oldSize = Cell(0);
          register(editor, oldSize);
          setup(editor, oldSize);
        }
      });
    };

    Plugin();

})();
