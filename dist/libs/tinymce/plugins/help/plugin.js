/**
 * TinyMCE version 6.8.2 (2023-12-11)
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

    var global$4 = tinymce.util.Tools.resolve('tinymce.PluginManager');

    let unique = 0;
    const generate = prefix => {
      const date = new Date();
      const time = date.getTime();
      const random = Math.floor(Math.random() * 1000000000);
      unique++;
      return prefix + '_' + random + unique + String(time);
    };

    const get$1 = customTabs => {
      const addTab = spec => {
        var _a;
        const name = (_a = spec.name) !== null && _a !== void 0 ? _a : generate('tab-name');
        const currentCustomTabs = customTabs.get();
        currentCustomTabs[name] = spec;
        customTabs.set(currentCustomTabs);
      };
      return { addTab };
    };

    const register$2 = (editor, dialogOpener) => {
      editor.addCommand('mceHelp', dialogOpener);
    };

    const option = name => editor => editor.options.get(name);
    const register$1 = editor => {
      const registerOption = editor.options.register;
      registerOption('help_tabs', { processor: 'array' });
    };
    const getHelpTabs = option('help_tabs');
    const getForcedPlugins = option('forced_plugins');

    const register = (editor, dialogOpener) => {
      editor.ui.registry.addButton('help', {
        icon: 'help',
        tooltip: 'Help',
        onAction: dialogOpener
      });
      editor.ui.registry.addMenuItem('help', {
        text: 'Help',
        icon: 'help',
        shortcut: 'Alt+0',
        onAction: dialogOpener
      });
    };

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
    const isSimpleType = type => value => typeof value === type;
    const eq = t => a => t === a;
    const isString = isType('string');
    const isUndefined = eq(undefined);
    const isNullable = a => a === null || a === undefined;
    const isNonNullable = a => !isNullable(a);
    const isFunction = isSimpleType('function');

    const constant = value => {
      return () => {
        return value;
      };
    };
    const never = constant(false);

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

    const nativeSlice = Array.prototype.slice;
    const nativeIndexOf = Array.prototype.indexOf;
    const rawIndexOf = (ts, t) => nativeIndexOf.call(ts, t);
    const contains = (xs, x) => rawIndexOf(xs, x) > -1;
    const map = (xs, f) => {
      const len = xs.length;
      const r = new Array(len);
      for (let i = 0; i < len; i++) {
        const x = xs[i];
        r[i] = f(x, i);
      }
      return r;
    };
    const filter = (xs, pred) => {
      const r = [];
      for (let i = 0, len = xs.length; i < len; i++) {
        const x = xs[i];
        if (pred(x, i)) {
          r.push(x);
        }
      }
      return r;
    };
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
    const find = (xs, pred) => {
      return findUntil(xs, pred, never);
    };
    const sort = (xs, comparator) => {
      const copy = nativeSlice.call(xs, 0);
      copy.sort(comparator);
      return copy;
    };

    const keys = Object.keys;
    const hasOwnProperty = Object.hasOwnProperty;
    const get = (obj, key) => {
      return has(obj, key) ? Optional.from(obj[key]) : Optional.none();
    };
    const has = (obj, key) => hasOwnProperty.call(obj, key);

    const cat = arr => {
      const r = [];
      const push = x => {
        r.push(x);
      };
      for (let i = 0; i < arr.length; i++) {
        arr[i].each(push);
      }
      return r;
    };

    var global$3 = tinymce.util.Tools.resolve('tinymce.Resource');

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.I18n');

    const pLoadHtmlByLangCode = (baseUrl, langCode) => global$3.load(`tinymce.html-i18n.help-keynav.${ langCode }`, `${ baseUrl }/js/i18n/keynav/${ langCode }.js`);
    const pLoadI18nHtml = baseUrl => pLoadHtmlByLangCode(baseUrl, global$2.getCode()).catch(() => pLoadHtmlByLangCode(baseUrl, 'en'));
    const initI18nLoad = (editor, baseUrl) => {
      editor.on('init', () => {
        pLoadI18nHtml(baseUrl);
      });
    };

    const pTab = async pluginUrl => {
      const body = {
        type: 'htmlpanel',
        presets: 'document',
        html: await pLoadI18nHtml(pluginUrl)
      };
      return {
        name: 'keyboardnav',
        title: 'Keyboard Navigation',
        items: [body]
      };
    };

    var global$1 = tinymce.util.Tools.resolve('tinymce.Env');

    const convertText = source => {
      const isMac = global$1.os.isMacOS() || global$1.os.isiOS();
      const mac = {
        alt: '&#x2325;',
        ctrl: '&#x2303;',
        shift: '&#x21E7;',
        meta: '&#x2318;',
        access: '&#x2303;&#x2325;'
      };
      const other = {
        meta: 'Ctrl ',
        access: 'Shift + Alt '
      };
      const replace = isMac ? mac : other;
      const shortcut = source.split('+');
      const updated = map(shortcut, segment => {
        const search = segment.toLowerCase().trim();
        return has(replace, search) ? replace[search] : segment;
      });
      return isMac ? updated.join('').replace(/\s/, '') : updated.join('+');
    };

    const shortcuts = [
      {
        shortcuts: ['Meta + B'],
        action: 'Bold'
      },
      {
        shortcuts: ['Meta + I'],
        action: 'Italic'
      },
      {
        shortcuts: ['Meta + U'],
        action: 'Underline'
      },
      {
        shortcuts: ['Meta + A'],
        action: 'Select all'
      },
      {
        shortcuts: [
          'Meta + Y',
          'Meta + Shift + Z'
        ],
        action: 'Redo'
      },
      {
        shortcuts: ['Meta + Z'],
        action: 'Undo'
      },
      {
        shortcuts: ['Access + 1'],
        action: 'Heading 1'
      },
      {
        shortcuts: ['Access + 2'],
        action: 'Heading 2'
      },
      {
        shortcuts: ['Access + 3'],
        action: 'Heading 3'
      },
      {
        shortcuts: ['Access + 4'],
        action: 'Heading 4'
      },
      {
        shortcuts: ['Access + 5'],
        action: 'Heading 5'
      },
      {
        shortcuts: ['Access + 6'],
        action: 'Heading 6'
      },
      {
        shortcuts: ['Access + 7'],
        action: 'Paragraph'
      },
      {
        shortcuts: ['Access + 8'],
        action: 'Div'
      },
      {
        shortcuts: ['Access + 9'],
        action: 'Address'
      },
      {
        shortcuts: ['Alt + 0'],
        action: 'Open help dialog'
      },
      {
        shortcuts: ['Alt + F9'],
        action: 'Focus to menubar'
      },
      {
        shortcuts: ['Alt + F10'],
        action: 'Focus to toolbar'
      },
      {
        shortcuts: ['Alt + F11'],
        action: 'Focus to element path'
      },
      {
        shortcuts: ['Ctrl + F9'],
        action: 'Focus to contextual toolbar'
      },
      {
        shortcuts: ['Shift + Enter'],
        action: 'Open popup menu for split buttons'
      },
      {
        shortcuts: ['Meta + K'],
        action: 'Insert link (if link plugin activated)'
      },
      {
        shortcuts: ['Meta + S'],
        action: 'Save (if save plugin activated)'
      },
      {
        shortcuts: ['Meta + F'],
        action: 'Find (if searchreplace plugin activated)'
      },
      {
        shortcuts: ['Meta + Shift + F'],
        action: 'Switch to or from fullscreen mode'
      }
    ];

    const tab$2 = () => {
      const shortcutList = map(shortcuts, shortcut => {
        const shortcutText = map(shortcut.shortcuts, convertText).join(' or ');
        return [
          shortcut.action,
          shortcutText
        ];
      });
      const tablePanel = {
        type: 'table',
        header: [
          'Action',
          'Shortcut'
        ],
        cells: shortcutList
      };
      return {
        name: 'shortcuts',
        title: 'Handy Shortcuts',
        items: [tablePanel]
      };
    };

    const urls = map([
      {
        key: 'accordion',
        name: 'Accordion'
      },
      {
        key: 'advlist',
        name: 'Advanced List'
      },
      {
        key: 'anchor',
        name: 'Anchor'
      },
      {
        key: 'autolink',
        name: 'Autolink'
      },
      {
        key: 'autoresize',
        name: 'Autoresize'
      },
      {
        key: 'autosave',
        name: 'Autosave'
      },
      {
        key: 'charmap',
        name: 'Character Map'
      },
      {
        key: 'code',
        name: 'Code'
      },
      {
        key: 'codesample',
        name: 'Code Sample'
      },
      {
        key: 'colorpicker',
        name: 'Color Picker'
      },
      {
        key: 'directionality',
        name: 'Directionality'
      },
      {
        key: 'emoticons',
        name: 'Emoticons'
      },
      {
        key: 'fullscreen',
        name: 'Full Screen'
      },
      {
        key: 'help',
        name: 'Help'
      },
      {
        key: 'image',
        name: 'Image'
      },
      {
        key: 'importcss',
        name: 'Import CSS'
      },
      {
        key: 'insertdatetime',
        name: 'Insert Date/Time'
      },
      {
        key: 'link',
        name: 'Link'
      },
      {
        key: 'lists',
        name: 'Lists'
      },
      {
        key: 'media',
        name: 'Media'
      },
      {
        key: 'nonbreaking',
        name: 'Nonbreaking'
      },
      {
        key: 'pagebreak',
        name: 'Page Break'
      },
      {
        key: 'preview',
        name: 'Preview'
      },
      {
        key: 'quickbars',
        name: 'Quick Toolbars'
      },
      {
        key: 'save',
        name: 'Save'
      },
      {
        key: 'searchreplace',
        name: 'Search and Replace'
      },
      {
        key: 'table',
        name: 'Table'
      },
      {
        key: 'template',
        name: 'Template'
      },
      {
        key: 'textcolor',
        name: 'Text Color'
      },
      {
        key: 'visualblocks',
        name: 'Visual Blocks'
      },
      {
        key: 'visualchars',
        name: 'Visual Characters'
      },
      {
        key: 'wordcount',
        name: 'Word Count'
      },
      {
        key: 'a11ychecker',
        name: 'Accessibility Checker',
        type: 'premium'
      },
      {
        key: 'advcode',
        name: 'Advanced Code Editor',
        type: 'premium'
      },
      {
        key: 'advtable',
        name: 'Advanced Tables',
        type: 'premium'
      },
      {
        key: 'advtemplate',
        name: 'Advanced Templates',
        type: 'premium',
        slug: 'advanced-templates'
      },
      {
        key: 'ai',
        name: 'AI Assistant',
        type: 'premium'
      },
      {
        key: 'casechange',
        name: 'Case Change',
        type: 'premium'
      },
      {
        key: 'checklist',
        name: 'Checklist',
        type: 'premium'
      },
      {
        key: 'editimage',
        name: 'Enhanced Image Editing',
        type: 'premium'
      },
      {
        key: 'footnotes',
        name: 'Footnotes',
        type: 'premium'
      },
      {
        key: 'typography',
        name: 'Advanced Typography',
        type: 'premium',
        slug: 'advanced-typography'
      },
      {
        key: 'mediaembed',
        name: 'Enhanced Media Embed',
        type: 'premium',
        slug: 'introduction-to-mediaembed'
      },
      {
        key: 'export',
        name: 'Export',
        type: 'premium'
      },
      {
        key: 'formatpainter',
        name: 'Format Painter',
        type: 'premium'
      },
      {
        key: 'inlinecss',
        name: 'Inline CSS',
        type: 'premium',
        slug: 'inline-css'
      },
      {
        key: 'linkchecker',
        name: 'Link Checker',
        type: 'premium'
      },
      {
        key: 'mentions',
        name: 'Mentions',
        type: 'premium'
      },
      {
        key: 'mergetags',
        name: 'Merge Tags',
        type: 'premium'
      },
      {
        key: 'pageembed',
        name: 'Page Embed',
        type: 'premium'
      },
      {
        key: 'permanentpen',
        name: 'Permanent Pen',
        type: 'premium'
      },
      {
        key: 'powerpaste',
        name: 'PowerPaste',
        type: 'premium',
        slug: 'introduction-to-powerpaste'
      },
      {
        key: 'rtc',
        name: 'Real-Time Collaboration',
        type: 'premium',
        slug: 'rtc-introduction'
      },
      {
        key: 'tinymcespellchecker',
        name: 'Spell Checker Pro',
        type: 'premium',
        slug: 'introduction-to-tiny-spellchecker'
      },
      {
        key: 'autocorrect',
        name: 'Spelling Autocorrect',
        type: 'premium'
      },
      {
        key: 'tableofcontents',
        name: 'Table of Contents',
        type: 'premium'
      },
      {
        key: 'tinycomments',
        name: 'Tiny Comments',
        type: 'premium',
        slug: 'introduction-to-tiny-comments'
      },
      {
        key: 'tinydrive',
        name: 'Tiny Drive',
        type: 'premium',
        slug: 'tinydrive-introduction'
      }
    ], item => ({
      ...item,
      type: item.type || 'opensource',
      slug: item.slug || item.key
    }));

    const tab$1 = editor => {
      const availablePlugins = () => {
        const premiumPlugins = filter(urls, ({type}) => {
          return type === 'premium';
        });
        const sortedPremiumPlugins = sort(map(premiumPlugins, p => p.name), (s1, s2) => s1.localeCompare(s2));
        const premiumPluginList = map(sortedPremiumPlugins, pluginName => `<li>${ pluginName }</li>`).join('');
        return '<div>' + '<p><b>' + global$2.translate('Premium plugins:') + '</b></p>' + '<ul>' + premiumPluginList + '<li class="tox-help__more-link" ">' + '<a href="https://www.tiny.cloud/pricing/?utm_campaign=editor_referral&utm_medium=help_dialog&utm_source=tinymce" rel="noopener" target="_blank"' + ' data-alloy-tabstop="true" tabindex="-1">' + global$2.translate('Learn more...') + '</a></li>' + '</ul>' + '</div>';
      };
      const makeLink = p => `<a data-alloy-tabstop="true" tabindex="-1" href="${ p.url }" target="_blank" rel="noopener">${ p.name }</a>`;
      const identifyUnknownPlugin = (editor, key) => {
        const getMetadata = editor.plugins[key].getMetadata;
        if (isFunction(getMetadata)) {
          const metadata = getMetadata();
          return {
            name: metadata.name,
            html: makeLink(metadata)
          };
        } else {
          return {
            name: key,
            html: key
          };
        }
      };
      const getPluginData = (editor, key) => find(urls, x => {
        return x.key === key;
      }).fold(() => {
        return identifyUnknownPlugin(editor, key);
      }, x => {
        const name = x.type === 'premium' ? `${ x.name }*` : x.name;
        const html = makeLink({
          name,
          url: `https://www.tiny.cloud/docs/tinymce/6/${ x.slug }/`
        });
        return {
          name,
          html
        };
      });
      const getPluginKeys = editor => {
        const keys$1 = keys(editor.plugins);
        const forcedPlugins = getForcedPlugins(editor);
        return isUndefined(forcedPlugins) ? keys$1 : filter(keys$1, k => !contains(forcedPlugins, k));
      };
      const pluginLister = editor => {
        const pluginKeys = getPluginKeys(editor);
        const sortedPluginData = sort(map(pluginKeys, k => getPluginData(editor, k)), (pd1, pd2) => pd1.name.localeCompare(pd2.name));
        const pluginLis = map(sortedPluginData, key => {
          return '<li>' + key.html + '</li>';
        });
        const count = pluginLis.length;
        const pluginsString = pluginLis.join('');
        const html = '<p><b>' + global$2.translate([
          'Plugins installed ({0}):',
          count
        ]) + '</b></p>' + '<ul>' + pluginsString + '</ul>';
        return html;
      };
      const installedPlugins = editor => {
        if (editor == null) {
          return '';
        }
        return '<div>' + pluginLister(editor) + '</div>';
      };
      const htmlPanel = {
        type: 'htmlpanel',
        presets: 'document',
        html: [
          installedPlugins(editor),
          availablePlugins()
        ].join('')
      };
      return {
        name: 'plugins',
        title: 'Plugins',
        items: [htmlPanel]
      };
    };

    var global = tinymce.util.Tools.resolve('tinymce.EditorManager');

    const tab = () => {
      const getVersion = (major, minor) => major.indexOf('@') === 0 ? 'X.X.X' : major + '.' + minor;
      const version = getVersion(global.majorVersion, global.minorVersion);
      const changeLogLink = '<a data-alloy-tabstop="true" tabindex="-1" href="https://www.tiny.cloud/docs/tinymce/6/changelog/?utm_campaign=editor_referral&utm_medium=help_dialog&utm_source=tinymce" rel="noopener" target="_blank">TinyMCE ' + version + '</a>';
      const htmlPanel = {
        type: 'htmlpanel',
        html: '<p>' + global$2.translate([
          'You are using {0}',
          changeLogLink
        ]) + '</p>',
        presets: 'document'
      };
      return {
        name: 'versions',
        title: 'Version',
        items: [htmlPanel]
      };
    };

    const parseHelpTabsSetting = (tabsFromSettings, tabs) => {
      const newTabs = {};
      const names = map(tabsFromSettings, t => {
        var _a;
        if (isString(t)) {
          if (has(tabs, t)) {
            newTabs[t] = tabs[t];
          }
          return t;
        } else {
          const name = (_a = t.name) !== null && _a !== void 0 ? _a : generate('tab-name');
          newTabs[name] = t;
          return name;
        }
      });
      return {
        tabs: newTabs,
        names
      };
    };
    const getNamesFromTabs = tabs => {
      const names = keys(tabs);
      const idx = names.indexOf('versions');
      if (idx !== -1) {
        names.splice(idx, 1);
        names.push('versions');
      }
      return {
        tabs,
        names
      };
    };
    const pParseCustomTabs = async (editor, customTabs, pluginUrl) => {
      const shortcuts = tab$2();
      const nav = await pTab(pluginUrl);
      const plugins = tab$1(editor);
      const versions = tab();
      const tabs = {
        [shortcuts.name]: shortcuts,
        [nav.name]: nav,
        [plugins.name]: plugins,
        [versions.name]: versions,
        ...customTabs.get()
      };
      return Optional.from(getHelpTabs(editor)).fold(() => getNamesFromTabs(tabs), tabsFromSettings => parseHelpTabsSetting(tabsFromSettings, tabs));
    };
    const init = (editor, customTabs, pluginUrl) => () => {
      pParseCustomTabs(editor, customTabs, pluginUrl).then(({tabs, names}) => {
        const foundTabs = map(names, name => get(tabs, name));
        const dialogTabs = cat(foundTabs);
        const body = {
          type: 'tabpanel',
          tabs: dialogTabs
        };
        editor.windowManager.open({
          title: 'Help',
          size: 'medium',
          body,
          buttons: [{
              type: 'cancel',
              name: 'close',
              text: 'Close',
              primary: true
            }],
          initialData: {}
        });
      });
    };

    var Plugin = () => {
      global$4.add('help', (editor, pluginUrl) => {
        const customTabs = Cell({});
        const api = get$1(customTabs);
        register$1(editor);
        const dialogOpener = init(editor, customTabs, pluginUrl);
        register(editor, dialogOpener);
        register$2(editor, dialogOpener);
        editor.shortcuts.add('Alt+0', 'Open help dialog', 'mceHelp');
        initI18nLoad(editor, pluginUrl);
        return api;
      });
    };

    Plugin();

})();
