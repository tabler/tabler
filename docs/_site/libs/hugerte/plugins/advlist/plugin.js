/**
 * HugeRTE version 1.0.9 (2025-03-15)
 * Copyright (c) 2022 Ephox Corporation DBA Tiny Technologies, Inc.
 * Copyright (c) 2024 HugeRTE contributors
 * Licensed under the MIT license (https://github.com/hugerte/hugerte/blob/main/LICENSE.TXT)
 */

(function () {
    'use strict';

    var global$1 = hugerte.util.Tools.resolve('hugerte.PluginManager');

    const applyListFormat = (editor, listName, styleValue) => {
      const cmd = listName === 'UL' ? 'InsertUnorderedList' : 'InsertOrderedList';
      editor.execCommand(cmd, false, styleValue === false ? null : { 'list-style-type': styleValue });
    };

    const register$2 = editor => {
      editor.addCommand('ApplyUnorderedListStyle', (ui, value) => {
        applyListFormat(editor, 'UL', value['list-style-type']);
      });
      editor.addCommand('ApplyOrderedListStyle', (ui, value) => {
        applyListFormat(editor, 'OL', value['list-style-type']);
      });
    };

    const option = name => editor => editor.options.get(name);
    const register$1 = editor => {
      const registerOption = editor.options.register;
      registerOption('advlist_number_styles', {
        processor: 'string[]',
        default: 'default,lower-alpha,lower-greek,lower-roman,upper-alpha,upper-roman'.split(',')
      });
      registerOption('advlist_bullet_styles', {
        processor: 'string[]',
        default: 'default,circle,square'.split(',')
      });
    };
    const getNumberStyles = option('advlist_number_styles');
    const getBulletStyles = option('advlist_bullet_styles');

    const isNullable = a => a === null || a === undefined;
    const isNonNullable = a => !isNullable(a);

    var global = hugerte.util.Tools.resolve('hugerte.util.Tools');

    class Optional {
      constructor(tag, value) {
        this.tag = tag;
        this.value = value;
      }
      static some(value) {
        return new Optional(true, value);
      }
      static none() {
        return Optional.singletonNone;
      }
      fold(onNone, onSome) {
        if (this.tag) {
          return onSome(this.value);
        } else {
          return onNone();
        }
      }
      isSome() {
        return this.tag;
      }
      isNone() {
        return !this.tag;
      }
      map(mapper) {
        if (this.tag) {
          return Optional.some(mapper(this.value));
        } else {
          return Optional.none();
        }
      }
      bind(binder) {
        if (this.tag) {
          return binder(this.value);
        } else {
          return Optional.none();
        }
      }
      exists(predicate) {
        return this.tag && predicate(this.value);
      }
      forall(predicate) {
        return !this.tag || predicate(this.value);
      }
      filter(predicate) {
        if (!this.tag || predicate(this.value)) {
          return this;
        } else {
          return Optional.none();
        }
      }
      getOr(replacement) {
        return this.tag ? this.value : replacement;
      }
      or(replacement) {
        return this.tag ? this : replacement;
      }
      getOrThunk(thunk) {
        return this.tag ? this.value : thunk();
      }
      orThunk(thunk) {
        return this.tag ? this : thunk();
      }
      getOrDie(message) {
        if (!this.tag) {
          throw new Error(message !== null && message !== void 0 ? message : 'Called getOrDie on None');
        } else {
          return this.value;
        }
      }
      static from(value) {
        return isNonNullable(value) ? Optional.some(value) : Optional.none();
      }
      getOrNull() {
        return this.tag ? this.value : null;
      }
      getOrUndefined() {
        return this.value;
      }
      each(worker) {
        if (this.tag) {
          worker(this.value);
        }
      }
      toArray() {
        return this.tag ? [this.value] : [];
      }
      toString() {
        return this.tag ? `some(${ this.value })` : 'none()';
      }
    }
    Optional.singletonNone = new Optional(false);

    const findUntil = (xs, pred, until) => {
      for (let i = 0, len = xs.length; i < len; i++) {
        const x = xs[i];
        if (pred(x, i)) {
          return Optional.some(x);
        } else if (until(x, i)) {
          break;
        }
      }
      return Optional.none();
    };

    const isCustomList = list => /\btox\-/.test(list.className);
    const isChildOfBody = (editor, elm) => {
      return editor.dom.isChildOf(elm, editor.getBody());
    };
    const matchNodeNames = regex => node => isNonNullable(node) && regex.test(node.nodeName);
    const isListNode = matchNodeNames(/^(OL|UL|DL)$/);
    const isTableCellNode = matchNodeNames(/^(TH|TD)$/);
    const inList = (editor, parents, nodeName) => findUntil(parents, parent => isListNode(parent) && !isCustomList(parent), isTableCellNode).exists(list => list.nodeName === nodeName && isChildOfBody(editor, list));
    const getSelectedStyleType = editor => {
      const listElm = editor.dom.getParent(editor.selection.getNode(), 'ol,ul');
      const style = editor.dom.getStyle(listElm, 'listStyleType');
      return Optional.from(style);
    };
    const isWithinNonEditable = (editor, element) => element !== null && !editor.dom.isEditable(element);
    const isWithinNonEditableList = (editor, element) => {
      const parentList = editor.dom.getParent(element, 'ol,ul,dl');
      return isWithinNonEditable(editor, parentList) && editor.selection.isEditable();
    };
    const setNodeChangeHandler = (editor, nodeChangeHandler) => {
      const initialNode = editor.selection.getNode();
      nodeChangeHandler({
        parents: editor.dom.getParents(initialNode),
        element: initialNode
      });
      editor.on('NodeChange', nodeChangeHandler);
      return () => editor.off('NodeChange', nodeChangeHandler);
    };

    const styleValueToText = styleValue => {
      return styleValue.replace(/\-/g, ' ').replace(/\b\w/g, chr => {
        return chr.toUpperCase();
      });
    };
    const normalizeStyleValue = styleValue => isNullable(styleValue) || styleValue === 'default' ? '' : styleValue;
    const makeSetupHandler = (editor, nodeName) => api => {
      const updateButtonState = (editor, parents) => {
        const element = editor.selection.getStart(true);
        api.setActive(inList(editor, parents, nodeName));
        api.setEnabled(!isWithinNonEditableList(editor, element) && editor.selection.isEditable());
      };
      const nodeChangeHandler = e => updateButtonState(editor, e.parents);
      return setNodeChangeHandler(editor, nodeChangeHandler);
    };
    const addSplitButton = (editor, id, tooltip, cmd, nodeName, styles) => {
      editor.ui.registry.addSplitButton(id, {
        tooltip,
        icon: nodeName === 'OL' ? 'ordered-list' : 'unordered-list',
        presets: 'listpreview',
        columns: 3,
        fetch: callback => {
          const items = global.map(styles, styleValue => {
            const iconStyle = nodeName === 'OL' ? 'num' : 'bull';
            const iconName = styleValue === 'disc' || styleValue === 'decimal' ? 'default' : styleValue;
            const itemValue = normalizeStyleValue(styleValue);
            const displayText = styleValueToText(styleValue);
            return {
              type: 'choiceitem',
              value: itemValue,
              icon: 'list-' + iconStyle + '-' + iconName,
              text: displayText
            };
          });
          callback(items);
        },
        onAction: () => editor.execCommand(cmd),
        onItemAction: (_splitButtonApi, value) => {
          applyListFormat(editor, nodeName, value);
        },
        select: value => {
          const listStyleType = getSelectedStyleType(editor);
          return listStyleType.map(listStyle => value === listStyle).getOr(false);
        },
        onSetup: makeSetupHandler(editor, nodeName)
      });
    };
    const addButton = (editor, id, tooltip, cmd, nodeName, styleValue) => {
      editor.ui.registry.addToggleButton(id, {
        active: false,
        tooltip,
        icon: nodeName === 'OL' ? 'ordered-list' : 'unordered-list',
        onSetup: makeSetupHandler(editor, nodeName),
        onAction: () => editor.queryCommandState(cmd) || styleValue === '' ? editor.execCommand(cmd) : applyListFormat(editor, nodeName, styleValue)
      });
    };
    const addControl = (editor, id, tooltip, cmd, nodeName, styles) => {
      if (styles.length > 1) {
        addSplitButton(editor, id, tooltip, cmd, nodeName, styles);
      } else {
        addButton(editor, id, tooltip, cmd, nodeName, normalizeStyleValue(styles[0]));
      }
    };
    const register = editor => {
      addControl(editor, 'numlist', 'Numbered list', 'InsertOrderedList', 'OL', getNumberStyles(editor));
      addControl(editor, 'bullist', 'Bullet list', 'InsertUnorderedList', 'UL', getBulletStyles(editor));
    };

    var Plugin = () => {
      global$1.add('advlist', editor => {
        if (editor.hasPlugin('lists')) {
          register$1(editor);
          register(editor);
          register$2(editor);
        } else {
          console.error('Please use the Lists plugin together with the Advanced List plugin.');
        }
      });
    };

    Plugin();

})();
