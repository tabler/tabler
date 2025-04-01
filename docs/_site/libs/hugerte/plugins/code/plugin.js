/**
 * HugeRTE version 1.0.9 (2025-03-15)
 * Copyright (c) 2022 Ephox Corporation DBA Tiny Technologies, Inc.
 * Copyright (c) 2024 HugeRTE contributors
 * Licensed under the MIT license (https://github.com/hugerte/hugerte/blob/main/LICENSE.TXT)
 */

(function () {
    'use strict';

    var global = hugerte.util.Tools.resolve('hugerte.PluginManager');

    const setContent = (editor, html) => {
      editor.focus();
      editor.undoManager.transact(() => {
        editor.setContent(html);
      });
      editor.selection.setCursorLocation();
      editor.nodeChanged();
    };
    const getContent = editor => {
      return editor.getContent({ source_view: true });
    };

    const open = editor => {
      const editorContent = getContent(editor);
      editor.windowManager.open({
        title: 'Source Code',
        size: 'large',
        body: {
          type: 'panel',
          items: [{
              type: 'textarea',
              name: 'code'
            }]
        },
        buttons: [
          {
            type: 'cancel',
            name: 'cancel',
            text: 'Cancel'
          },
          {
            type: 'submit',
            name: 'save',
            text: 'Save',
            primary: true
          }
        ],
        initialData: { code: editorContent },
        onSubmit: api => {
          setContent(editor, api.getData().code);
          api.close();
        }
      });
    };

    const register$1 = editor => {
      editor.addCommand('mceCodeEditor', () => {
        open(editor);
      });
    };

    const register = editor => {
      const onAction = () => editor.execCommand('mceCodeEditor');
      editor.ui.registry.addButton('code', {
        icon: 'sourcecode',
        tooltip: 'Source code',
        onAction
      });
      editor.ui.registry.addMenuItem('code', {
        icon: 'sourcecode',
        text: 'Source code',
        onAction
      });
    };

    var Plugin = () => {
      global.add('code', editor => {
        register$1(editor);
        register(editor);
        return {};
      });
    };

    Plugin();

})();
