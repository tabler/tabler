/**
 * TinyMCE version 6.8.2 (2023-12-11)
 */

(function () {
    'use strict';

    var global$4 = tinymce.util.Tools.resolve('tinymce.PluginManager');

    let unique = 0;
    const generate = prefix => {
      const date = new Date();
      const time = date.getTime();
      const random = Math.floor(Math.random() * 1000000000);
      unique++;
      return prefix + '_' + random + unique + String(time);
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
    const isType$1 = type => value => typeOf(value) === type;
    const isSimpleType = type => value => typeof value === type;
    const isString = isType$1('string');
    const isBoolean = isSimpleType('boolean');
    const isNullable = a => a === null || a === undefined;
    const isNonNullable = a => !isNullable(a);
    const isFunction = isSimpleType('function');
    const isNumber = isSimpleType('number');

    const compose1 = (fbc, fab) => a => fbc(fab(a));
    const constant = value => {
      return () => {
        return value;
      };
    };
    const tripleEquals = (a, b) => {
      return a === b;
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
    const each$1 = (xs, f) => {
      for (let i = 0, len = xs.length; i < len; i++) {
        const x = xs[i];
        f(x, i);
      }
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
    const foldl = (xs, f, acc) => {
      each$1(xs, (x, i) => {
        acc = f(acc, x, i);
      });
      return acc;
    };

    const keys = Object.keys;
    const each = (obj, f) => {
      const props = keys(obj);
      for (let k = 0, len = props.length; k < len; k++) {
        const i = props[k];
        const x = obj[i];
        f(x, i);
      }
    };

    typeof window !== 'undefined' ? window : Function('return this;')();

    const COMMENT = 8;
    const DOCUMENT = 9;
    const DOCUMENT_FRAGMENT = 11;
    const ELEMENT = 1;
    const TEXT = 3;

    const name = element => {
      const r = element.dom.nodeName;
      return r.toLowerCase();
    };
    const type = element => element.dom.nodeType;
    const isType = t => element => type(element) === t;
    const isComment = element => type(element) === COMMENT || name(element) === '#comment';
    const isElement = isType(ELEMENT);
    const isText = isType(TEXT);
    const isDocument = isType(DOCUMENT);
    const isDocumentFragment = isType(DOCUMENT_FRAGMENT);

    const rawSet = (dom, key, value) => {
      if (isString(value) || isBoolean(value) || isNumber(value)) {
        dom.setAttribute(key, value + '');
      } else {
        console.error('Invalid call to Attribute.set. Key ', key, ':: Value ', value, ':: Element ', dom);
        throw new Error('Attribute value was not simple');
      }
    };
    const set$2 = (element, key, value) => {
      rawSet(element.dom, key, value);
    };
    const setAll = (element, attrs) => {
      const dom = element.dom;
      each(attrs, (v, k) => {
        rawSet(dom, k, v);
      });
    };
    const get$2 = (element, key) => {
      const v = element.dom.getAttribute(key);
      return v === null ? undefined : v;
    };
    const getOpt = (element, key) => Optional.from(get$2(element, key));
    const remove$2 = (element, key) => {
      element.dom.removeAttribute(key);
    };
    const clone = element => foldl(element.dom.attributes, (acc, attr) => {
      acc[attr.name] = attr.value;
      return acc;
    }, {});

    const fromHtml = (html, scope) => {
      const doc = scope || document;
      const div = doc.createElement('div');
      div.innerHTML = html;
      if (!div.hasChildNodes() || div.childNodes.length > 1) {
        const message = 'HTML does not have a single root node';
        console.error(message, html);
        throw new Error(message);
      }
      return fromDom(div.childNodes[0]);
    };
    const fromTag = (tag, scope) => {
      const doc = scope || document;
      const node = doc.createElement(tag);
      return fromDom(node);
    };
    const fromText = (text, scope) => {
      const doc = scope || document;
      const node = doc.createTextNode(text);
      return fromDom(node);
    };
    const fromDom = node => {
      if (node === null || node === undefined) {
        throw new Error('Node cannot be null or undefined');
      }
      return { dom: node };
    };
    const fromPoint = (docElm, x, y) => Optional.from(docElm.dom.elementFromPoint(x, y)).map(fromDom);
    const SugarElement = {
      fromHtml,
      fromTag,
      fromText,
      fromDom,
      fromPoint
    };

    const is$2 = (element, selector) => {
      const dom = element.dom;
      if (dom.nodeType !== ELEMENT) {
        return false;
      } else {
        const elem = dom;
        if (elem.matches !== undefined) {
          return elem.matches(selector);
        } else if (elem.msMatchesSelector !== undefined) {
          return elem.msMatchesSelector(selector);
        } else if (elem.webkitMatchesSelector !== undefined) {
          return elem.webkitMatchesSelector(selector);
        } else if (elem.mozMatchesSelector !== undefined) {
          return elem.mozMatchesSelector(selector);
        } else {
          throw new Error('Browser lacks native selectors');
        }
      }
    };
    const bypassSelector = dom => dom.nodeType !== ELEMENT && dom.nodeType !== DOCUMENT && dom.nodeType !== DOCUMENT_FRAGMENT || dom.childElementCount === 0;
    const all = (selector, scope) => {
      const base = scope === undefined ? document : scope.dom;
      return bypassSelector(base) ? [] : map(base.querySelectorAll(selector), SugarElement.fromDom);
    };
    const one = (selector, scope) => {
      const base = scope === undefined ? document : scope.dom;
      return bypassSelector(base) ? Optional.none() : Optional.from(base.querySelector(selector)).map(SugarElement.fromDom);
    };

    const eq = (e1, e2) => e1.dom === e2.dom;
    const is$1 = is$2;

    const is = (lhs, rhs, comparator = tripleEquals) => lhs.exists(left => comparator(left, rhs));

    const blank = r => s => s.replace(r, '');
    const trim = blank(/^\s+|\s+$/g);

    const isSupported = dom => dom.style !== undefined && isFunction(dom.style.getPropertyValue);

    const owner = element => SugarElement.fromDom(element.dom.ownerDocument);
    const documentOrOwner = dos => isDocument(dos) ? dos : owner(dos);
    const parent = element => Optional.from(element.dom.parentNode).map(SugarElement.fromDom);
    const parents = (element, isRoot) => {
      const stop = isFunction(isRoot) ? isRoot : never;
      let dom = element.dom;
      const ret = [];
      while (dom.parentNode !== null && dom.parentNode !== undefined) {
        const rawParent = dom.parentNode;
        const p = SugarElement.fromDom(rawParent);
        ret.push(p);
        if (stop(p) === true) {
          break;
        } else {
          dom = rawParent;
        }
      }
      return ret;
    };
    const prevSibling = element => Optional.from(element.dom.previousSibling).map(SugarElement.fromDom);
    const nextSibling = element => Optional.from(element.dom.nextSibling).map(SugarElement.fromDom);
    const children = element => map(element.dom.childNodes, SugarElement.fromDom);
    const child = (element, index) => {
      const cs = element.dom.childNodes;
      return Optional.from(cs[index]).map(SugarElement.fromDom);
    };
    const firstChild = element => child(element, 0);

    const isShadowRoot = dos => isDocumentFragment(dos) && isNonNullable(dos.dom.host);
    const supported = isFunction(Element.prototype.attachShadow) && isFunction(Node.prototype.getRootNode);
    const getRootNode = supported ? e => SugarElement.fromDom(e.dom.getRootNode()) : documentOrOwner;
    const getShadowRoot = e => {
      const r = getRootNode(e);
      return isShadowRoot(r) ? Optional.some(r) : Optional.none();
    };
    const getShadowHost = e => SugarElement.fromDom(e.dom.host);

    const inBody = element => {
      const dom = isText(element) ? element.dom.parentNode : element.dom;
      if (dom === undefined || dom === null || dom.ownerDocument === null) {
        return false;
      }
      const doc = dom.ownerDocument;
      return getShadowRoot(SugarElement.fromDom(dom)).fold(() => doc.body.contains(dom), compose1(inBody, getShadowHost));
    };

    const internalSet = (dom, property, value) => {
      if (!isString(value)) {
        console.error('Invalid call to CSS.set. Property ', property, ':: Value ', value, ':: Element ', dom);
        throw new Error('CSS value must be a string: ' + value);
      }
      if (isSupported(dom)) {
        dom.style.setProperty(property, value);
      }
    };
    const internalRemove = (dom, property) => {
      if (isSupported(dom)) {
        dom.style.removeProperty(property);
      }
    };
    const set$1 = (element, property, value) => {
      const dom = element.dom;
      internalSet(dom, property, value);
    };
    const get$1 = (element, property) => {
      const dom = element.dom;
      const styles = window.getComputedStyle(dom);
      const r = styles.getPropertyValue(property);
      return r === '' && !inBody(element) ? getUnsafeProperty(dom, property) : r;
    };
    const getUnsafeProperty = (dom, property) => isSupported(dom) ? dom.style.getPropertyValue(property) : '';
    const getRaw = (element, property) => {
      const dom = element.dom;
      const raw = getUnsafeProperty(dom, property);
      return Optional.from(raw).filter(r => r.length > 0);
    };
    const remove$1 = (element, property) => {
      const dom = element.dom;
      internalRemove(dom, property);
      if (is(getOpt(element, 'style').map(trim), '')) {
        remove$2(element, 'style');
      }
    };

    const before = (marker, element) => {
      const parent$1 = parent(marker);
      parent$1.each(v => {
        v.dom.insertBefore(element.dom, marker.dom);
      });
    };
    const after$1 = (marker, element) => {
      const sibling = nextSibling(marker);
      sibling.fold(() => {
        const parent$1 = parent(marker);
        parent$1.each(v => {
          append$1(v, element);
        });
      }, v => {
        before(v, element);
      });
    };
    const prepend = (parent, element) => {
      const firstChild$1 = firstChild(parent);
      firstChild$1.fold(() => {
        append$1(parent, element);
      }, v => {
        parent.dom.insertBefore(element.dom, v.dom);
      });
    };
    const append$1 = (parent, element) => {
      parent.dom.appendChild(element.dom);
    };
    const wrap = (element, wrapper) => {
      before(element, wrapper);
      append$1(wrapper, element);
    };

    const after = (marker, elements) => {
      each$1(elements, (x, i) => {
        const e = i === 0 ? marker : elements[i - 1];
        after$1(e, x);
      });
    };
    const append = (parent, elements) => {
      each$1(elements, x => {
        append$1(parent, x);
      });
    };

    const descendants$1 = (scope, predicate) => {
      let result = [];
      each$1(children(scope), x => {
        if (predicate(x)) {
          result = result.concat([x]);
        }
        result = result.concat(descendants$1(x, predicate));
      });
      return result;
    };

    var ClosestOrAncestor = (is, ancestor, scope, a, isRoot) => {
      if (is(scope, a)) {
        return Optional.some(scope);
      } else if (isFunction(isRoot) && isRoot(scope)) {
        return Optional.none();
      } else {
        return ancestor(scope, a, isRoot);
      }
    };

    const ancestor$1 = (scope, predicate, isRoot) => {
      let element = scope.dom;
      const stop = isFunction(isRoot) ? isRoot : never;
      while (element.parentNode) {
        element = element.parentNode;
        const el = SugarElement.fromDom(element);
        if (predicate(el)) {
          return Optional.some(el);
        } else if (stop(el)) {
          break;
        }
      }
      return Optional.none();
    };

    const remove = element => {
      const dom = element.dom;
      if (dom.parentNode !== null) {
        dom.parentNode.removeChild(dom);
      }
    };
    const unwrap = wrapper => {
      const children$1 = children(wrapper);
      if (children$1.length > 0) {
        after(wrapper, children$1);
      }
      remove(wrapper);
    };

    const descendants = (scope, selector) => all(selector, scope);

    const ancestor = (scope, selector, isRoot) => ancestor$1(scope, e => is$2(e, selector), isRoot);
    const descendant = (scope, selector) => one(selector, scope);
    const closest = (scope, selector, isRoot) => {
      const is = (element, selector) => is$2(element, selector);
      return ClosestOrAncestor(is, ancestor, scope, selector, isRoot);
    };

    const NodeValue = (is, name) => {
      const get = element => {
        if (!is(element)) {
          throw new Error('Can only get ' + name + ' value of a ' + name + ' node');
        }
        return getOption(element).getOr('');
      };
      const getOption = element => is(element) ? Optional.from(element.dom.nodeValue) : Optional.none();
      const set = (element, value) => {
        if (!is(element)) {
          throw new Error('Can only set raw ' + name + ' value of a ' + name + ' node');
        }
        element.dom.nodeValue = value;
      };
      return {
        get,
        getOption,
        set
      };
    };

    const api = NodeValue(isText, 'text');
    const get = element => api.get(element);
    const set = (element, value) => api.set(element, value);

    var TagBoundaries = [
      'body',
      'p',
      'div',
      'article',
      'aside',
      'figcaption',
      'figure',
      'footer',
      'header',
      'nav',
      'section',
      'ol',
      'ul',
      'li',
      'table',
      'thead',
      'tbody',
      'tfoot',
      'caption',
      'tr',
      'td',
      'th',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'pre',
      'address'
    ];

    var DomUniverse = () => {
      const clone$1 = element => {
        return SugarElement.fromDom(element.dom.cloneNode(false));
      };
      const document = element => documentOrOwner(element).dom;
      const isBoundary = element => {
        if (!isElement(element)) {
          return false;
        }
        if (name(element) === 'body') {
          return true;
        }
        return contains(TagBoundaries, name(element));
      };
      const isEmptyTag = element => {
        if (!isElement(element)) {
          return false;
        }
        return contains([
          'br',
          'img',
          'hr',
          'input'
        ], name(element));
      };
      const isNonEditable = element => isElement(element) && get$2(element, 'contenteditable') === 'false';
      const comparePosition = (element, other) => {
        return element.dom.compareDocumentPosition(other.dom);
      };
      const copyAttributesTo = (source, destination) => {
        const as = clone(source);
        setAll(destination, as);
      };
      const isSpecial = element => {
        const tag = name(element);
        return contains([
          'script',
          'noscript',
          'iframe',
          'noframes',
          'noembed',
          'title',
          'style',
          'textarea',
          'xmp'
        ], tag);
      };
      const getLanguage = element => isElement(element) ? getOpt(element, 'lang') : Optional.none();
      return {
        up: constant({
          selector: ancestor,
          closest: closest,
          predicate: ancestor$1,
          all: parents
        }),
        down: constant({
          selector: descendants,
          predicate: descendants$1
        }),
        styles: constant({
          get: get$1,
          getRaw: getRaw,
          set: set$1,
          remove: remove$1
        }),
        attrs: constant({
          get: get$2,
          set: set$2,
          remove: remove$2,
          copyTo: copyAttributesTo
        }),
        insert: constant({
          before: before,
          after: after$1,
          afterAll: after,
          append: append$1,
          appendAll: append,
          prepend: prepend,
          wrap: wrap
        }),
        remove: constant({
          unwrap: unwrap,
          remove: remove
        }),
        create: constant({
          nu: SugarElement.fromTag,
          clone: clone$1,
          text: SugarElement.fromText
        }),
        query: constant({
          comparePosition,
          prevSibling: prevSibling,
          nextSibling: nextSibling
        }),
        property: constant({
          children: children,
          name: name,
          parent: parent,
          document,
          isText: isText,
          isComment: isComment,
          isElement: isElement,
          isSpecial,
          getLanguage,
          getText: get,
          setText: set,
          isBoundary,
          isEmptyTag,
          isNonEditable
        }),
        eq: eq,
        is: is$1
      };
    };

    const point = (element, offset) => ({
      element,
      offset
    });

    const scan = (universe, element, direction) => {
      if (universe.property().isText(element) && universe.property().getText(element).trim().length === 0 || universe.property().isComment(element)) {
        return direction(element).bind(elem => {
          return scan(universe, elem, direction).orThunk(() => {
            return Optional.some(elem);
          });
        });
      } else {
        return Optional.none();
      }
    };
    const toEnd = (universe, element) => {
      if (universe.property().isText(element)) {
        return universe.property().getText(element).length;
      }
      const children = universe.property().children(element);
      return children.length;
    };
    const freefallRtl$2 = (universe, element) => {
      const candidate = scan(universe, element, universe.query().prevSibling).getOr(element);
      if (universe.property().isText(candidate)) {
        return point(candidate, toEnd(universe, candidate));
      }
      const children = universe.property().children(candidate);
      return children.length > 0 ? freefallRtl$2(universe, children[children.length - 1]) : point(candidate, toEnd(universe, candidate));
    };

    const freefallRtl$1 = freefallRtl$2;

    const universe = DomUniverse();
    const freefallRtl = element => {
      return freefallRtl$1(universe, element);
    };

    const fireToggleAccordionEvent = (editor, element, state) => editor.dispatch('ToggledAccordion', {
      element,
      state
    });
    const fireToggleAllAccordionsEvent = (editor, elements, state) => editor.dispatch('ToggledAllAccordions', {
      elements,
      state
    });

    const accordionTag = 'details';
    const accordionDetailsClass = 'mce-accordion';
    const accordionSummaryClass = 'mce-accordion-summary';
    const accordionBodyWrapperClass = 'mce-accordion-body';
    const accordionBodyWrapperTag = 'div';

    var global$3 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    const isSummary = node => (node === null || node === void 0 ? void 0 : node.nodeName) === 'SUMMARY';
    const isDetails = node => (node === null || node === void 0 ? void 0 : node.nodeName) === 'DETAILS';
    const isOpen = details => details.hasAttribute('open');
    const isInSummary = editor => {
      const node = editor.selection.getNode();
      return isSummary(node) || Boolean(editor.dom.getParent(node, isSummary));
    };
    const isAtDetailsStart = editor => {
      const rng = editor.selection.getRng();
      return isDetails(rng.startContainer) && rng.collapsed && rng.startOffset === 0;
    };
    const isInsertAllowed = editor => !isInSummary(editor) && editor.dom.isEditable(editor.selection.getNode());
    const getSelectedDetails = editor => Optional.from(editor.dom.getParent(editor.selection.getNode(), isDetails));
    const isDetailsSelected = editor => getSelectedDetails(editor).isSome();
    const insertBogus = element => {
      element.innerHTML = '<br data-mce-bogus="1" />';
      return element;
    };
    const createParagraph = editor => insertBogus(editor.dom.create('p'));
    const createSummary = editor => insertBogus(editor.dom.create('summary'));
    const insertAndSelectParagraphAfter = (editor, target) => {
      const paragraph = createParagraph(editor);
      target.insertAdjacentElement('afterend', paragraph);
      editor.selection.setCursorLocation(paragraph, 0);
    };
    const normalizeContent = (editor, accordion) => {
      if (isSummary(accordion === null || accordion === void 0 ? void 0 : accordion.lastChild)) {
        const paragraph = createParagraph(editor);
        accordion.appendChild(paragraph);
        editor.selection.setCursorLocation(paragraph, 0);
      }
    };
    const normalizeSummary = (editor, accordion) => {
      if (!isSummary(accordion === null || accordion === void 0 ? void 0 : accordion.firstChild)) {
        const summary = createSummary(editor);
        accordion.prepend(summary);
        editor.selection.setCursorLocation(summary, 0);
      }
    };
    const normalizeAccordion = editor => accordion => {
      normalizeContent(editor, accordion);
      normalizeSummary(editor, accordion);
    };
    const normalizeDetails = editor => {
      global$3.each(global$3.grep(editor.dom.select('details', editor.getBody())), normalizeAccordion(editor));
    };

    const insertAccordion = editor => {
      if (!isInsertAllowed(editor)) {
        return;
      }
      const editorBody = SugarElement.fromDom(editor.getBody());
      const uid = generate('acc');
      const summaryText = editor.dom.encode(editor.selection.getRng().toString() || editor.translate('Accordion summary...'));
      const bodyText = editor.dom.encode(editor.translate('Accordion body...'));
      const accordionSummaryHtml = `<summary class="${ accordionSummaryClass }">${ summaryText }</summary>`;
      const accordionBodyHtml = `<${ accordionBodyWrapperTag } class="${ accordionBodyWrapperClass }"><p>${ bodyText }</p></${ accordionBodyWrapperTag }>`;
      editor.undoManager.transact(() => {
        editor.insertContent([
          `<details data-mce-id="${ uid }" class="${ accordionDetailsClass }" open="open">`,
          accordionSummaryHtml,
          accordionBodyHtml,
          `</details>`
        ].join(''));
        descendant(editorBody, `[data-mce-id="${ uid }"]`).each(detailsElm => {
          remove$2(detailsElm, 'data-mce-id');
          descendant(detailsElm, `summary`).each(summaryElm => {
            const rng = editor.dom.createRng();
            const des = freefallRtl(summaryElm);
            rng.setStart(des.element.dom, des.offset);
            rng.setEnd(des.element.dom, des.offset);
            editor.selection.setRng(rng);
          });
        });
      });
    };
    const toggleDetailsElement = (details, state) => {
      const shouldOpen = state !== null && state !== void 0 ? state : !isOpen(details);
      if (shouldOpen) {
        details.setAttribute('open', 'open');
      } else {
        details.removeAttribute('open');
      }
      return shouldOpen;
    };
    const toggleAccordion = (editor, state) => {
      getSelectedDetails(editor).each(details => {
        fireToggleAccordionEvent(editor, details, toggleDetailsElement(details, state));
      });
    };
    const removeAccordion = editor => {
      getSelectedDetails(editor).each(details => {
        const {nextSibling} = details;
        if (nextSibling) {
          editor.selection.select(nextSibling, true);
          editor.selection.collapse(true);
        } else {
          insertAndSelectParagraphAfter(editor, details);
        }
        details.remove();
      });
    };
    const toggleAllAccordions = (editor, state) => {
      const accordions = Array.from(editor.getBody().querySelectorAll('details'));
      if (accordions.length === 0) {
        return;
      }
      each$1(accordions, accordion => toggleDetailsElement(accordion, state !== null && state !== void 0 ? state : !isOpen(accordion)));
      fireToggleAllAccordionsEvent(editor, accordions, state);
    };

    const register$1 = editor => {
      editor.addCommand('InsertAccordion', () => insertAccordion(editor));
      editor.addCommand('ToggleAccordion', (_ui, value) => toggleAccordion(editor, value));
      editor.addCommand('ToggleAllAccordions', (_ui, value) => toggleAllAccordions(editor, value));
      editor.addCommand('RemoveAccordion', () => removeAccordion(editor));
    };

    var global$2 = tinymce.util.Tools.resolve('tinymce.html.Node');

    const getClassList = node => {
      var _a, _b;
      return (_b = (_a = node.attr('class')) === null || _a === void 0 ? void 0 : _a.split(' ')) !== null && _b !== void 0 ? _b : [];
    };
    const addClasses = (node, classes) => {
      const classListSet = new Set([
        ...getClassList(node),
        ...classes
      ]);
      const newClassList = Array.from(classListSet);
      if (newClassList.length > 0) {
        node.attr('class', newClassList.join(' '));
      }
    };
    const removeClasses = (node, classes) => {
      const newClassList = filter(getClassList(node), clazz => !classes.has(clazz));
      node.attr('class', newClassList.length > 0 ? newClassList.join(' ') : null);
    };
    const isAccordionDetailsNode = node => node.name === accordionTag && contains(getClassList(node), accordionDetailsClass);
    const isAccordionBodyWrapperNode = node => node.name === accordionBodyWrapperTag && contains(getClassList(node), accordionBodyWrapperClass);
    const getAccordionChildren = accordionNode => {
      const children = accordionNode.children();
      let summaryNode;
      let wrapperNode;
      const otherNodes = [];
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.name === 'summary' && isNullable(summaryNode)) {
          summaryNode = child;
        } else if (isAccordionBodyWrapperNode(child) && isNullable(wrapperNode)) {
          wrapperNode = child;
        } else {
          otherNodes.push(child);
        }
      }
      return {
        summaryNode,
        wrapperNode,
        otherNodes
      };
    };
    const padInputNode = node => {
      const br = new global$2('br', 1);
      br.attr('data-mce-bogus', '1');
      node.empty();
      node.append(br);
    };
    const setup$2 = editor => {
      editor.on('PreInit', () => {
        const {serializer, parser} = editor;
        parser.addNodeFilter(accordionTag, nodes => {
          for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (isAccordionDetailsNode(node)) {
              const accordionNode = node;
              const {summaryNode, wrapperNode, otherNodes} = getAccordionChildren(accordionNode);
              const hasSummaryNode = isNonNullable(summaryNode);
              const newSummaryNode = hasSummaryNode ? summaryNode : new global$2('summary', 1);
              if (isNullable(newSummaryNode.firstChild)) {
                padInputNode(newSummaryNode);
              }
              addClasses(newSummaryNode, [accordionSummaryClass]);
              if (!hasSummaryNode) {
                if (isNonNullable(accordionNode.firstChild)) {
                  accordionNode.insert(newSummaryNode, accordionNode.firstChild, true);
                } else {
                  accordionNode.append(newSummaryNode);
                }
              }
              const hasWrapperNode = isNonNullable(wrapperNode);
              const newWrapperNode = hasWrapperNode ? wrapperNode : new global$2(accordionBodyWrapperTag, 1);
              newWrapperNode.attr('data-mce-bogus', '1');
              addClasses(newWrapperNode, [accordionBodyWrapperClass]);
              if (otherNodes.length > 0) {
                for (let j = 0; j < otherNodes.length; j++) {
                  const otherNode = otherNodes[j];
                  newWrapperNode.append(otherNode);
                }
              }
              if (isNullable(newWrapperNode.firstChild)) {
                const pNode = new global$2('p', 1);
                padInputNode(pNode);
                newWrapperNode.append(pNode);
              }
              if (!hasWrapperNode) {
                accordionNode.append(newWrapperNode);
              }
            }
          }
        });
        serializer.addNodeFilter(accordionTag, nodes => {
          const summaryClassRemoveSet = new Set([accordionSummaryClass]);
          for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (isAccordionDetailsNode(node)) {
              const accordionNode = node;
              const {summaryNode, wrapperNode} = getAccordionChildren(accordionNode);
              if (isNonNullable(summaryNode)) {
                removeClasses(summaryNode, summaryClassRemoveSet);
              }
              if (isNonNullable(wrapperNode)) {
                wrapperNode.unwrap();
              }
            }
          }
        });
      });
    };

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.VK');

    const setupEnterKeyInSummary = editor => {
      editor.on('keydown', event => {
        if (!event.shiftKey && event.keyCode === global$1.ENTER && isInSummary(editor) || isAtDetailsStart(editor)) {
          event.preventDefault();
          editor.execCommand('ToggleAccordion');
        }
      });
    };
    const setup$1 = editor => {
      setupEnterKeyInSummary(editor);
      editor.on('ExecCommand', e => {
        const cmd = e.command.toLowerCase();
        if ((cmd === 'delete' || cmd === 'forwarddelete') && isDetailsSelected(editor)) {
          normalizeDetails(editor);
        }
      });
    };

    var global = tinymce.util.Tools.resolve('tinymce.Env');

    const setup = editor => {
      if (global.browser.isSafari()) {
        editor.on('click', e => {
          if (isSummary(e.target)) {
            const summary = e.target;
            const rng = editor.selection.getRng();
            if (rng.collapsed && rng.startContainer === summary.parentNode && rng.startOffset === 0) {
              editor.selection.setCursorLocation(summary, 0);
            }
          }
        });
      }
    };

    const onSetup = editor => buttonApi => {
      const onNodeChange = () => buttonApi.setEnabled(isInsertAllowed(editor));
      editor.on('NodeChange', onNodeChange);
      return () => editor.off('NodeChange', onNodeChange);
    };
    const register = editor => {
      const onAction = () => editor.execCommand('InsertAccordion');
      editor.ui.registry.addButton('accordion', {
        icon: 'accordion',
        tooltip: 'Insert accordion',
        onSetup: onSetup(editor),
        onAction
      });
      editor.ui.registry.addMenuItem('accordion', {
        icon: 'accordion',
        text: 'Accordion',
        onSetup: onSetup(editor),
        onAction
      });
      editor.ui.registry.addToggleButton('accordiontoggle', {
        icon: 'accordion-toggle',
        tooltip: 'Toggle accordion',
        onAction: () => editor.execCommand('ToggleAccordion')
      });
      editor.ui.registry.addToggleButton('accordionremove', {
        icon: 'remove',
        tooltip: 'Delete accordion',
        onAction: () => editor.execCommand('RemoveAccordion')
      });
      editor.ui.registry.addContextToolbar('accordion', {
        predicate: accordion => editor.dom.is(accordion, 'details') && editor.getBody().contains(accordion) && editor.dom.isEditable(accordion.parentNode),
        items: 'accordiontoggle accordionremove',
        scope: 'node',
        position: 'node'
      });
    };

    var Plugin = () => {
      global$4.add('accordion', editor => {
        register(editor);
        register$1(editor);
        setup$1(editor);
        setup$2(editor);
        setup(editor);
      });
    };

    Plugin();

})();
