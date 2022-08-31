/**
 * TinyMCE version 6.1.2 (2022-07-29)
 */

(function () {
  'use strict';

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  const link = () => /(?:[A-Za-z][A-Za-z\d.+-]{0,14}:\/\/(?:[-.~*+=!&;:'%@?^${}(),\w]+@)?|www\.|[-;:&=+$,.\w]+@)[A-Za-z\d-]+(?:\.[A-Za-z\d-]+)*(?::\d+)?(?:\/(?:[-.~*+=!;:'%@$(),\/\w]*[-~*+=%@$()\/\w])?)?(?:\?(?:[-.~*+=!&;:'%@?^${}(),\/\w]+))?(?:#(?:[-.~*+=!&;:'%@?^${}(),\/\w]+))?/g;

  const option = name => editor => editor.options.get(name);
  const register = editor => {
    const registerOption = editor.options.register;
    registerOption('autolink_pattern', {
      processor: 'regexp',
      default: new RegExp('^' + link().source + '$', 'i')
    });
    registerOption('link_default_target', { processor: 'string' });
    registerOption('link_default_protocol', {
      processor: 'string',
      default: 'https'
    });
  };
  const getAutoLinkPattern = option('autolink_pattern');
  const getDefaultLinkTarget = option('link_default_target');
  const getDefaultLinkProtocol = option('link_default_protocol');

  const hasProto = (v, constructor, predicate) => {
    var _a;
    if (predicate(v, constructor.prototype)) {
      return true;
    } else {
      return ((_a = v.constructor) === null || _a === void 0 ? void 0 : _a.name) === constructor.name;
    }
  };
  const typeOf = x => {
    const t = typeof x;
    if (x === null) {
      return 'null';
    } else if (t === 'object' && Array.isArray(x)) {
      return 'array';
    } else if (t === 'object' && hasProto(x, String, (o, proto) => proto.isPrototypeOf(o))) {
      return 'string';
    } else {
      return t;
    }
  };
  const isType = type => value => typeOf(value) === type;
  const isString = isType('string');
  const isNullable = a => a === null || a === undefined;
  const isNonNullable = a => !isNullable(a);

  const checkRange = (str, substr, start) => substr === '' || str.length >= substr.length && str.substr(start, start + substr.length) === substr;
  const contains = (str, substr) => {
    return str.indexOf(substr) !== -1;
  };
  const startsWith = (str, prefix) => {
    return checkRange(str, prefix, 0);
  };

  const rangeEqualsBracketOrSpace = rangeString => /^[(\[{ \u00a0]$/.test(rangeString);
  const isTextNode = node => node.nodeType === 3;
  const isElement = node => node.nodeType === 1;
  const scopeIndex = (container, index) => {
    if (index < 0) {
      index = 0;
    }
    if (isTextNode(container)) {
      const len = container.data.length;
      if (index > len) {
        index = len;
      }
    }
    return index;
  };
  const setStart = (rng, container, offset) => {
    if (!isElement(container) || container.hasChildNodes()) {
      rng.setStart(container, scopeIndex(container, offset));
    } else {
      rng.setStartBefore(container);
    }
  };
  const setEnd = (rng, container, offset) => {
    if (!isElement(container) || container.hasChildNodes()) {
      rng.setEnd(container, scopeIndex(container, offset));
    } else {
      rng.setEndAfter(container);
    }
  };
  const hasProtocol = url => /^([A-Za-z][A-Za-z\d.+-]*:\/\/)|mailto:/.test(url);
  const isPunctuation = char => /[?!,.;:]/.test(char);
  const parseCurrentLine = (editor, endOffset) => {
    let end, endContainer, text, prev, len, rngText;
    const autoLinkPattern = getAutoLinkPattern(editor);
    if (editor.dom.getParent(editor.selection.getNode(), 'a[href]') !== null) {
      return;
    }
    const rng = editor.selection.getRng().cloneRange();
    if (rng.startOffset < 5) {
      prev = rng.endContainer.previousSibling;
      if (!prev) {
        if (!rng.endContainer.firstChild || !rng.endContainer.firstChild.nextSibling) {
          return;
        }
        prev = rng.endContainer.firstChild.nextSibling;
      }
      len = prev.length;
      setStart(rng, prev, len);
      setEnd(rng, prev, len);
      if (rng.endOffset < 5) {
        return;
      }
      end = rng.endOffset;
      endContainer = prev;
    } else {
      endContainer = rng.endContainer;
      if (!isTextNode(endContainer) && endContainer.firstChild) {
        while (!isTextNode(endContainer) && endContainer.firstChild) {
          endContainer = endContainer.firstChild;
        }
        if (isTextNode(endContainer)) {
          setStart(rng, endContainer, 0);
          setEnd(rng, endContainer, endContainer.nodeValue.length);
        }
      }
      if (rng.endOffset === 1) {
        end = 2;
      } else {
        end = rng.endOffset - 1 - endOffset;
      }
    }
    const start = end;
    do {
      setStart(rng, endContainer, end >= 2 ? end - 2 : 0);
      setEnd(rng, endContainer, end >= 1 ? end - 1 : 0);
      end -= 1;
      rngText = rng.toString();
    } while (!rangeEqualsBracketOrSpace(rngText) && end - 2 >= 0);
    if (rangeEqualsBracketOrSpace(rng.toString())) {
      setStart(rng, endContainer, end);
      setEnd(rng, endContainer, start);
      end += 1;
    } else if (rng.startOffset === 0) {
      setStart(rng, endContainer, 0);
      setEnd(rng, endContainer, start);
    } else {
      setStart(rng, endContainer, end);
      setEnd(rng, endContainer, start);
    }
    text = rng.toString();
    if (isPunctuation(text.charAt(text.length - 1))) {
      setEnd(rng, endContainer, start - 1);
    }
    text = rng.toString().trim();
    const matches = text.match(autoLinkPattern);
    const protocol = getDefaultLinkProtocol(editor);
    if (matches) {
      let url = matches[0];
      if (startsWith(url, 'www.')) {
        url = protocol + '://' + url;
      } else if (contains(url, '@') && !hasProtocol(url)) {
        url = 'mailto:' + url;
      }
      return {
        rng,
        url
      };
    } else {
      return null;
    }
  };
  const convertToLink = (editor, result) => {
    const defaultLinkTarget = getDefaultLinkTarget(editor);
    const {rng, url} = result;
    const bookmark = editor.selection.getBookmark();
    editor.selection.setRng(rng);
    const command = 'createlink';
    const args = {
      command,
      ui: false,
      value: url
    };
    const beforeExecEvent = editor.dispatch('BeforeExecCommand', args);
    if (!beforeExecEvent.isDefaultPrevented()) {
      editor.getDoc().execCommand(command, false, url);
      editor.dispatch('ExecCommand', args);
      if (isString(defaultLinkTarget)) {
        editor.dom.setAttrib(editor.selection.getNode(), 'target', defaultLinkTarget);
      }
    }
    editor.selection.moveToBookmark(bookmark);
    editor.nodeChanged();
  };
  const handleSpacebar = editor => {
    const result = parseCurrentLine(editor, 0);
    if (isNonNullable(result)) {
      convertToLink(editor, result);
    }
  };
  const handleBracket = handleSpacebar;
  const handleEnter = editor => {
    const result = parseCurrentLine(editor, -1);
    if (isNonNullable(result)) {
      convertToLink(editor, result);
    }
  };
  const setup = editor => {
    editor.on('keydown', e => {
      if (e.keyCode === 13 && !e.isDefaultPrevented()) {
        handleEnter(editor);
      }
    });
    editor.on('keyup', e => {
      if (e.keyCode === 32) {
        handleSpacebar(editor);
      } else if (e.keyCode === 48 && e.shiftKey || e.keyCode === 221) {
        handleBracket(editor);
      }
    });
  };

  var Plugin = () => {
    global.add('autolink', editor => {
      register(editor);
      setup(editor);
    });
  };

  Plugin();

})();
