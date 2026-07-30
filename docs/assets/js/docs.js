//#region ../node_modules/.pnpm/@docsearch+js@4.6.3/node_modules/@docsearch/js/dist/esm/index.js
/*! @docsearch/js 4.6.3 | MIT License | © Algolia, Inc. and contributors | https://docsearch.algolia.com */
function e(e, t) {
	(null == t || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function t(e) {
	if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function n(e, t, n, r, u, a, i) {
	try {
		var o = e[a](i), s = o.value;
	} catch (e) {
		n(e);
		return;
	}
	o.done ? t(s) : Promise.resolve(s).then(r, u);
}
function r(e) {
	return function() {
		var t = this, r = arguments;
		return new Promise(function(u, a) {
			var i = e.apply(t, r);
			function o(e) {
				n(i, u, a, o, s, "next", e);
			}
			function s(e) {
				n(i, u, a, o, s, "throw", e);
			}
			o(void 0);
		});
	};
}
function u(e, n, r) {
	return n = l(n), function(e, n) {
		if (n && ("object" == typeof n || "function" == typeof n)) return n;
		if (void 0 !== n) throw new TypeError("Derived constructors may only return object or undefined");
		return t(e);
	}(e, d() ? Reflect.construct(n, r || [], l(e).constructor) : n.apply(e, r));
}
function a(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function i(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, E(r.key), r);
	}
}
function o(e, t, n) {
	return t && i(e.prototype, t), n && i(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function s(e, t) {
	var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
	if (!n) {
		if (Array.isArray(e) || (n = _(e)) || t) {
			n && (e = n);
			var r = 0, u = function() {};
			return {
				s: u,
				n: function() {
					return r >= e.length ? { done: !0 } : {
						done: !1,
						value: e[r++]
					};
				},
				e: function(e) {
					throw e;
				},
				f: u
			};
		}
		throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	var a, i = !0, o = !1;
	return {
		s: function() {
			n = n.call(e);
		},
		n: function() {
			var e = n.next();
			return i = e.done, e;
		},
		e: function(e) {
			o = !0, a = e;
		},
		f: function() {
			try {
				i || null == n.return || n.return();
			} finally {
				if (o) throw a;
			}
		}
	};
}
function c(e, t, n) {
	return (t = E(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function l(e) {
	return l = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
		return e.__proto__ || Object.getPrototypeOf(e);
	}, l(e);
}
function f(e, t) {
	if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
	e.prototype = Object.create(t && t.prototype, { constructor: {
		value: e,
		writable: !0,
		configurable: !0
	} }), Object.defineProperty(e, "prototype", { writable: !1 }), t && y(e, t);
}
function d() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (e) {}
	return (d = function() {
		return !!e;
	})();
}
function p(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function h(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {};
		t % 2 ? p(Object(n), !0).forEach(function(t) {
			c(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : p(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function v(e, t) {
	if (null == e) return {};
	var n, r, u = function(e, t) {
		if (null == e) return {};
		var n = {};
		for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
			if (-1 !== t.indexOf(r)) continue;
			n[r] = e[r];
		}
		return n;
	}(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], -1 === t.indexOf(n) && {}.propertyIsEnumerable.call(e, n) && (u[n] = e[n]);
	}
	return u;
}
function m() {
	/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
	var e, t, n = "function" == typeof Symbol ? Symbol : {}, r = n.iterator || "@@iterator", u = n.toStringTag || "@@toStringTag";
	function a(n, r, u, a) {
		var s = r && r.prototype instanceof o ? r : o, c = Object.create(s.prototype);
		return D(c, "_invoke", function(n, r, u) {
			var a, o, s, c = 0, l = u || [], f = !1, d = {
				p: 0,
				n: 0,
				v: e,
				a: p,
				f: p.bind(e, 4),
				d: function(t, n) {
					return a = t, o = 0, s = e, d.n = n, i;
				}
			};
			function p(n, r) {
				for (o = n, s = r, t = 0; !f && c && !u && t < l.length; t++) {
					var u, a = l[t], p = d.p, h = a[2];
					n > 3 ? (u = h === r) && (s = a[(o = a[4]) ? 5 : (o = 3, 3)], a[4] = a[5] = e) : a[0] <= p && ((u = n < 2 && p < a[1]) ? (o = 0, d.v = r, d.n = a[1]) : p < h && (u = n < 3 || a[0] > r || r > h) && (a[4] = n, a[5] = r, d.n = h, o = 0));
				}
				if (u || n > 1) return i;
				throw f = !0, r;
			}
			return function(u, l, h) {
				if (c > 1) throw TypeError("Generator is already running");
				for (f && 1 === l && p(l, h), o = l, s = h; (t = o < 2 ? e : s) || !f;) {
					a || (o ? o < 3 ? (o > 1 && (d.n = -1), p(o, s)) : d.n = s : d.v = s);
					try {
						if (c = 2, a) {
							if (o || (u = "next"), t = a[u]) {
								if (!(t = t.call(a, s))) throw TypeError("iterator result is not an object");
								if (!t.done) return t;
								s = t.value, o < 2 && (o = 0);
							} else 1 === o && (t = a.return) && t.call(a), o < 2 && (s = TypeError("The iterator does not provide a '" + u + "' method"), o = 1);
							a = e;
						} else if ((t = (f = d.n < 0) ? s : n.call(r, d)) !== i) break;
					} catch (t) {
						a = e, o = 1, s = t;
					} finally {
						c = 1;
					}
				}
				return {
					value: t,
					done: f
				};
			};
		}(n, u, a), !0), c;
	}
	var i = {};
	function o() {}
	function s() {}
	function c() {}
	t = Object.getPrototypeOf;
	var l = [][r] ? t(t([][r]())) : (D(t = {}, r, function() {
		return this;
	}), t), f = c.prototype = o.prototype = Object.create(l);
	function d(e) {
		return Object.setPrototypeOf ? Object.setPrototypeOf(e, c) : (e.__proto__ = c, D(e, u, "GeneratorFunction")), e.prototype = Object.create(f), e;
	}
	return s.prototype = c, D(f, "constructor", c), D(c, "constructor", s), s.displayName = "GeneratorFunction", D(c, u, "GeneratorFunction"), D(f), D(f, u, "Generator"), D(f, r, function() {
		return this;
	}), D(f, "toString", function() {
		return "[object Generator]";
	}), (m = function() {
		return {
			w: a,
			m: d
		};
	})();
}
function D(e, t, n, r) {
	var u = Object.defineProperty;
	try {
		u({}, "", {});
	} catch (e) {
		u = 0;
	}
	D = function(e, t, n, r) {
		function a(t, n) {
			D(e, t, function(e) {
				return this._invoke(t, n, e);
			});
		}
		t ? u ? u(e, t, {
			value: n,
			enumerable: !r,
			configurable: !r,
			writable: !r
		}) : e[t] = n : (a("next", 0), a("throw", 1), a("return", 2));
	}, D(e, t, n, r);
}
function y(e, t) {
	return y = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
		return e.__proto__ = t, e;
	}, y(e, t);
}
function g(e, t) {
	return function(e) {
		if (Array.isArray(e)) return e;
	}(e) || function(e, t) {
		var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
		if (null != n) {
			var r, u, a, i, o = [], s = !0, c = !1;
			try {
				if (a = (n = n.call(e)).next, 0 === t);
				else for (; !(s = (r = a.call(n)).done) && (o.push(r.value), o.length !== t); s = !0);
			} catch (e) {
				c = !0, u = e;
			} finally {
				try {
					if (!s && null != n.return && (i = n.return(), Object(i) !== i)) return;
				} finally {
					if (c) throw u;
				}
			}
			return o;
		}
	}(e, t) || _(e, t) || function() {
		throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}();
}
function F(t) {
	return function(t) {
		if (Array.isArray(t)) return e(t);
	}(t) || function(e) {
		if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e);
	}(t) || _(t) || function() {
		throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}();
}
function E(e) {
	var t = function(e, t) {
		if ("object" != typeof e || !e) return e;
		var n = e[Symbol.toPrimitive];
		if (void 0 !== n) {
			var r = n.call(e, t);
			if ("object" != typeof r) return r;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === t ? String : Number)(e);
	}(e, "string");
	return "symbol" == typeof t ? t : t + "";
}
function b(e) {
	return b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
		return typeof e;
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, b(e);
}
function _(t, n) {
	if (t) {
		if ("string" == typeof t) return e(t, n);
		var r = {}.toString.call(t).slice(8, -1);
		return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? e(t, n) : void 0;
	}
}
function k(e) {
	var t = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
	return k = function(e) {
		if (null === e || !function(e) {
			try {
				return -1 !== Function.toString.call(e).indexOf("[native code]");
			} catch (t) {
				return "function" == typeof e;
			}
		}(e)) return e;
		if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
		if (void 0 !== t) {
			if (t.has(e)) return t.get(e);
			t.set(e, n);
		}
		function n() {
			return function(e, t, n) {
				if (d()) return Reflect.construct.apply(null, arguments);
				var r = [null];
				r.push.apply(r, t);
				var u = new (e.bind.apply(e, r))();
				return n && y(u, n.prototype), u;
			}(e, arguments, l(this).constructor);
		}
		return n.prototype = Object.create(e.prototype, { constructor: {
			value: n,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), y(n, e);
	}, k(e);
}
var C, A, w, S, x, O, B, I, T, P, j, N = {}, z = [], R = Array.isArray, M = z.slice, Z = Object.assign;
function L(e) {
	e && e.parentNode && e.remove();
}
function $(e, t, n) {
	var r, u, a, i = {};
	for (a in t) "key" == a ? r = t[a] : "ref" == a && "function" != typeof e ? u = t[a] : i[a] = t[a];
	return arguments.length > 2 && (i.children = arguments.length > 3 ? M.call(arguments, 2) : n), q(e, i, r, u, null);
}
function q(e, t, n, r, u) {
	var a = {
		type: e,
		props: t,
		key: n,
		ref: r,
		__k: null,
		__: null,
		__b: 0,
		__e: null,
		__c: null,
		constructor: void 0,
		__v: null == u ? ++A : u,
		__i: -1,
		__u: 0
	};
	return null == u && null != C.vnode && C.vnode(a), a;
}
function U() {
	return { current: null };
}
function H(e) {
	return e.children;
}
function V(e, t) {
	this.props = e, this.context = t, this.__g = 0;
}
function W(e, t) {
	if (null == t) return e.__ ? W(e.__, e.__i + 1) : null;
	for (var n; t < e.__k.length; t++) if (null != (n = e.__k[t]) && null != n.__e) return n.__e;
	return "function" == typeof e.type ? W(e) : null;
}
function K(e) {
	var t, n;
	if (null != (e = e.__) && null != e.__c) {
		for (e.__e = null, t = 0; t < e.__k.length; t++) if (null != (n = e.__k[t]) && null != n.__e) {
			e.__e = n.__e;
			break;
		}
		return K(e);
	}
}
function J(e) {
	(8 & e.__g || !(e.__g |= 8) || !w.push(e) || x++) && S == C.debounceRendering || ((S = C.debounceRendering) || queueMicrotask)(Q);
}
function Q() {
	for (var e, t, n, r, u, a, i, o, s = 1; w.length;) w.length > s && w.sort(O), e = w.shift(), s = w.length, 8 & e.__g && (n = void 0, u = (r = (t = e).__v).__e, a = [], i = [], (o = t.__P) && ((n = Z({}, r)).__v = r.__v + 1, C.vnode && C.vnode(n), ue(o, n, r, t.__n, o.namespaceURI, 32 & r.__u ? [u] : null, a, null == u ? W(r) : u, !!(32 & r.__u), i, o.ownerDocument), n.__v = r.__v, n.__.__k[n.__i] = n, ie(a, n, i), n.__e != u && K(n)));
	x = 0;
}
function G(e, t, n, r, u, a, i, o, s, c, l, f) {
	var d, p, h, v, m, D, y, g = r && r.__k || z, F = t.length;
	for (s = function(e, t, n, r, u) {
		var a, i, o, s, c, l = n.length, f = l, d = 0;
		for (e.__k = new Array(u), a = 0; a < u; a++) null != (i = t[a]) && "boolean" != typeof i && "function" != typeof i ? (s = a + d, (i = e.__k[a] = "string" == typeof i || "number" == typeof i || "bigint" == typeof i || i.constructor == String ? q(null, i, null, null, null) : R(i) ? q(H, { children: i }, null, null, null) : null == i.constructor && i.__b > 0 ? q(i.type, i.props, i.key, i.ref ? i.ref : null, i.__v) : i).__ = e, i.__b = e.__b + 1, o = null, -1 != (c = i.__i = ee(i, n, s, f)) && (f--, (o = n[c]) && (o.__u |= 2)), null == o || null == o.__v ? (-1 == c && (u > l ? d-- : u < l && d++), "function" != typeof i.type && (i.__u |= 4)) : c != s && (c == s - 1 ? d-- : c == s + 1 ? d++ : (c > s ? d-- : d++, i.__u |= 4))) : e.__k[a] = null;
		if (f) for (a = 0; a < l; a++) null != (o = n[a]) && !(2 & o.__u) && (o.__e == r && (r = W(o)), ce(o, o));
		return r;
	}(n, t, g, s, F), d = 0; d < F; d++) null != (h = n.__k[d]) && (p = -1 == h.__i ? N : g[h.__i] || N, h.__i = d, D = ue(e, h, p, u, a, i, o, s, c, l, f), v = h.__e, h.ref && p.ref != h.ref && (p.ref && se(p.ref, null, h), l.push(h.ref, h.__c || v, h)), null == m && null != v && (m = v), (y = !!(4 & h.__u)) || p.__k === h.__k ? s = Y(h, s, e, y) : "function" == typeof h.type && void 0 !== D ? s = D : v && (s = v.nextSibling), h.__u &= -7);
	return n.__e = m, s;
}
function Y(e, t, n, r) {
	var u, a;
	if ("function" == typeof e.type) {
		for (u = e.__k, a = 0; u && a < u.length; a++) u[a] && (u[a].__ = e, t = Y(u[a], t, n, r));
		return t;
	}
	e.__e != t && (r && (t && e.type && !t.parentNode && (t = W(e)), n.insertBefore(e.__e, t || null)), t = e.__e);
	do
		t = t && t.nextSibling;
	while (null != t && 8 == t.nodeType);
	return t;
}
function X(e, t) {
	return t = t || [], null == e || "boolean" == typeof e || (R(e) ? e.some(function(e) {
		X(e, t);
	}) : t.push(e)), t;
}
function ee(e, t, n, r) {
	var u, a, i, o = e.key, s = e.type, c = t[n], l = null != c && !(2 & c.__u);
	if (null === c && null == e.key || l && o == c.key && s == c.type) return n;
	if (r > (l ? 1 : 0)) {
		for (u = n - 1, a = n + 1; u >= 0 || a < t.length;) if (null != (c = t[i = u >= 0 ? u-- : a++]) && !(2 & c.__u) && o == c.key && s == c.type) return i;
	}
	return -1;
}
function te(e, t, n) {
	"-" == t[0] ? e.setProperty(t, null == n ? "" : n) : e[t] = null == n ? "" : n;
}
function ne(e, t, n, r, u) {
	var a;
	e: if ("style" == t) if ("string" == typeof n) e.style.cssText = n;
	else {
		if ("string" == typeof r && (e.style.cssText = r = ""), r) for (t in r) n && t in n || te(e.style, t, "");
		if (n) for (t in n) r && n[t] == r[t] || te(e.style, t, n[t]);
	}
	else if ("o" == t[0] && "n" == t[1]) a = t != (t = t.replace(B, "$1")), (t = t.slice(2))[0].toLowerCase() != t[0] && (t = t.toLowerCase()), e.__l || (e.__l = {}), e.__l[t + a] = n, n ? r ? n.l = r.l : (n.l = I, e.addEventListener(t, a ? P : T, a)) : e.removeEventListener(t, a ? P : T, a);
	else {
		if ("http://www.w3.org/2000/svg" == u) t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
		else if ("width" != t && "height" != t && "href" != t && "list" != t && "form" != t && "tabIndex" != t && "download" != t && "rowSpan" != t && "colSpan" != t && "role" != t && "popover" != t && t in e) try {
			e[t] = null == n ? "" : n;
			break e;
		} catch (e) {}
		"function" == typeof n || (null == n || !1 === n && "-" != t[4] ? e.removeAttribute(t) : e.setAttribute(t, "popover" == t && 1 == n ? "" : n));
	}
}
function re(e) {
	return function(t) {
		if (this.__l) {
			var n = this.__l[t.type + e];
			if (null == t.u) t.u = I++;
			else if (t.u < n.l) return;
			return n(C.event ? C.event(t) : t);
		}
	};
}
function ue(e, t, n, r, u, a, i, o, s, c, l) {
	var f, d, p, h, v, m, D, y, g, F, E, b, _, k, A, w, S, x, O, B, I, T = t.type;
	if (null != t.constructor) return null;
	128 & n.__u && (s = !!(32 & n.__u), n.__c.__z && (o = t.__e = n.__e = (a = n.__c.__z)[0], n.__c.__z = null)), (f = C.__b) && f(t);
	e: if ("function" == typeof T) try {
		if (y = t.props, g = "prototype" in T && T.prototype.render, F = (f = T.contextType) && r[f.__c], E = f ? F ? F.props.value : f.__ : r, n.__c ? 2 & (d = t.__c = n.__c).__g && (d.__g |= 1, D = !0) : (g ? t.__c = d = new T(y, E) : (t.__c = d = new V(y, E), d.constructor = T, d.render = le), F && F.sub(d), d.props = y, d.state || (d.state = {}), d.context = E, d.__n = r, p = !0, d.__g |= 8, d.__h = [], d._sb = []), g && null == d.__s && (d.__s = d.state), g && null != T.getDerivedStateFromProps && (d.__s == d.state && (d.__s = Z({}, d.__s)), Z(d.__s, T.getDerivedStateFromProps(y, d.__s))), h = d.props, v = d.state, d.__v = t, p) g && null == T.getDerivedStateFromProps && null != d.componentWillMount && d.componentWillMount(), g && null != d.componentDidMount && d.__h.push(d.componentDidMount);
		else {
			if (g && null == T.getDerivedStateFromProps && y !== h && null != d.componentWillReceiveProps && d.componentWillReceiveProps(y, E), !(4 & d.__g) && null != d.shouldComponentUpdate && !1 === d.shouldComponentUpdate(y, d.__s, E) || t.__v == n.__v) {
				for (t.__v != n.__v && (d.props = y, d.state = d.__s, d.__g &= -9), t.__e = n.__e, t.__k = n.__k, t.__k.some(function(e) {
					e && (e.__ = t);
				}), b = 0; b < d._sb.length; b++) d.__h.push(d._sb[b]);
				d._sb = [], d.__h.length && i.push(d);
				break e;
			}
			null != d.componentWillUpdate && d.componentWillUpdate(y, d.__s, E), g && null != d.componentDidUpdate && d.__h.push(function() {
				d.componentDidUpdate(h, v, m);
			});
		}
		if (d.context = E, d.props = y, d.__P = e, d.__g &= -5, _ = C.__r, k = 0, g) {
			for (d.state = d.__s, d.__g &= -9, _ && _(t), f = d.render(d.props, d.state, d.context), A = 0; A < d._sb.length; A++) d.__h.push(d._sb[A]);
			d._sb = [];
		} else do
			d.__g &= -9, _ && _(t), f = d.render(d.props, d.state, d.context), d.state = d.__s;
		while (8 & d.__g && ++k < 25);
		d.state = d.__s, null != d.getChildContext && (r = Z({}, r, d.getChildContext())), g && !p && null != d.getSnapshotBeforeUpdate && (m = d.getSnapshotBeforeUpdate(h, v)), w = f, null != f && f.type === H && null == f.key && (w = oe(f.props.children)), o = G(e, R(w) ? w : [w], t, n, r, u, a, i, o, s, c, l), t.__u &= -161, d.__h.length && i.push(d), D && (d.__g &= -4);
	} catch (e) {
		if (t.__v = null, s || null != a) if (e.then) {
			for (S = 0, x = !1, t.__u |= s ? 160 : 128, t.__c.__z = [], O = 0; O < a.length; O++) null == (B = a[O]) || x || (8 == B.nodeType && "$s" == B.data ? (S > 0 && t.__c.__z.push(B), S++, a[O] = null) : 8 == B.nodeType && "/$s" == B.data ? (--S > 0 && t.__c.__z.push(B), x = 0 === S, o = a[O], a[O] = null) : S > 0 && (t.__c.__z.push(B), a[O] = null));
			if (!x) {
				for (; o && 8 == o.nodeType && o.nextSibling;) o = o.nextSibling;
				a[a.indexOf(o)] = null, t.__c.__z = [o];
			}
			t.__e = o;
		} else {
			for (I = a.length; I--;) L(a[I]);
			ae(t);
		}
		else t.__e = n.__e, t.__k = n.__k, e.then || ae(t);
		C.__e(e, t, n);
	}
	else o = t.__e = function(e, t, n, r, u, a, i, o, s, c) {
		var l, f, d, p, h, v, m, D, y = n.props, g = t.props, F = t.type;
		if ("svg" == F ? u = "http://www.w3.org/2000/svg" : "math" == F ? u = "http://www.w3.org/1998/Math/MathML" : u || (u = "http://www.w3.org/1999/xhtml"), null != a) {
			for (l = 0; l < a.length; l++) if ((h = a[l]) && "setAttribute" in h == !!F && (F ? h.localName == F : 3 == h.nodeType)) {
				e = h, a[l] = null;
				break;
			}
		}
		if (null == e) {
			if (null == F) return c.createTextNode(g);
			e = c.createElementNS(u, F, g.is && g), o && (C.__m && C.__m(t, a), o = !1), a = null;
		}
		if (null == F) y === g || o && e.data == g || (e.data = g);
		else {
			if (a = a && M.call(e.childNodes), y = n.props || N, !o && null != a) for (y = {}, l = 0; l < e.attributes.length; l++) y[(h = e.attributes[l]).name] = h.value;
			for (l in y) if (h = y[l], "children" == l);
			else if ("dangerouslySetInnerHTML" == l) d = h;
			else if (!(l in g)) {
				if ("value" == l && "defaultValue" in g || "checked" == l && "defaultChecked" in g) continue;
				ne(e, l, null, h, u);
			}
			for (l in D = 1 & n.__u, g) h = g[l], "children" == l ? p = h : "dangerouslySetInnerHTML" == l ? f = h : "value" == l ? v = h : "checked" == l ? m = h : o && "function" != typeof h || y[l] === h && !D || ne(e, l, h, y[l], u);
			if (f) o || d && (f.__html == d.__html || f.__html == e.innerHTML) || (e.innerHTML = f.__html), t.__k = [];
			else if (d && (e.innerHTML = ""), G("template" == F ? e.content : e, R(p) ? p : [p], t, n, r, "foreignObject" == F ? "http://www.w3.org/1999/xhtml" : u, a, i, a ? a[0] : n.__k && W(n, 0), o, s, c), null != a) for (l = a.length; l--;) L(a[l]);
			o || (l = "value", "progress" == F && null == v ? e.removeAttribute("value") : null == v || v === e[l] && ("progress" !== F || v) || ne(e, l, v, y[l], u), l = "checked", null != m && m != e[l] && ne(e, l, m, y[l], u));
		}
		return e;
	}(n.__e, t, n, r, u, a, i, s, c, l);
	return (f = C.diffed) && f(t), 128 & t.__u ? void 0 : o;
}
function ae(e) {
	e && e.__c && (e.__c.__g |= 4), e && e.__k && e.__k.forEach(ae);
}
function ie(e, t, n) {
	for (var r = 0; r < n.length; r++) se(n[r], n[++r], n[++r]);
	C.__c && C.__c(t, e), e.some(function(t) {
		try {
			e = t.__h, t.__h = [], e.some(function(e) {
				e.call(t);
			});
		} catch (e) {
			C.__e(e, t.__v);
		}
	});
}
function oe(e) {
	return "object" != typeof e || null == e || e.__b && e.__b > 0 ? e : R(e) ? e.map(oe) : Z({}, e);
}
function se(e, t, n) {
	try {
		if ("function" == typeof e) {
			var r = "function" == typeof e.__u;
			r && e.__u(), r && null == t || (e.__u = e(t));
		} else e.current = t;
	} catch (e) {
		C.__e(e, n);
	}
}
function ce(e, t, n) {
	var r, u;
	if (C.unmount && C.unmount(e), (r = e.ref) && (r.current && r.current != e.__e || se(r, null, t)), null != (r = e.__c)) {
		if (r.componentWillUnmount) try {
			r.componentWillUnmount();
		} catch (e) {
			C.__e(e, t);
		}
		r.__P = null;
	}
	if (r = e.__k) for (u = 0; u < r.length; u++) r[u] && ce(r[u], t, n || "function" != typeof e.type);
	n || L(e.__e), e.__e && e.__e.__l && (e.__e.__l = null), e.__e = e.__c = e.__ = null;
}
function le(e, t, n) {
	return this.constructor(e, n);
}
function fe(e, t) {
	var n, r, u, a;
	t == document && (t = document.documentElement), C.__ && C.__(e, t), r = (n = !!(e && 32 & e.__u)) ? null : t.__k, e = t.__k = $(H, null, [e]), u = [], a = [], ue(t, e, r || N, N, t.namespaceURI, r ? null : t.firstChild ? M.call(t.childNodes) : null, u, r ? r.__e : t.firstChild, n, a, t.ownerDocument), ie(u, e, a);
}
function de(e, t, n) {
	var r, u, a, i = Z({}, e.props);
	for (a in t) "key" == a ? r = t[a] : "ref" == a && "function" != typeof e.type ? u = t[a] : i[a] = t[a];
	return arguments.length > 2 && (i.children = arguments.length > 3 ? M.call(arguments, 2) : n), q(e.type, i, r || e.key, u || e.ref, null);
}
C = { __e: function(e, t, n, r) {
	for (var u, a, i; t = t.__;) if ((u = t.__c) && !(1 & u.__g)) {
		u.__g |= 4;
		try {
			if ((a = u.constructor) && null != a.getDerivedStateFromError && (u.setState(a.getDerivedStateFromError(e)), i = 8 & u.__g), null != u.componentDidCatch && (u.componentDidCatch(e, r || {}), i = 8 & u.__g), i) return void (u.__g |= 2);
		} catch (t) {
			e = t;
		}
	}
	throw x = 0, e;
} }, A = 0, V.prototype.setState = function(e, t) {
	var n = null != this.__s && this.__s != this.state ? this.__s : this.__s = Z({}, this.state);
	"function" == typeof e && (e = e(Z({}, n), this.props)), e && Z(n, e), null != e && this.__v && (t && this._sb.push(t), J(this));
}, V.prototype.forceUpdate = function(e) {
	this.__v && (this.__g |= 4, e && this.__h.push(e), J(this));
}, V.prototype.render = H, w = [], x = 0, O = function(e, t) {
	return e.__v.__b - t.__v.__b;
}, B = /(PointerCapture)$|Capture$/i, I = 0, T = re(!1), P = re(!0), j = 0;
var pe, he, ve, me, De = Object.is, ye = 0, ge = [], Fe = C, Ee = Fe.__b, be = Fe.__r, _e = Fe.diffed, ke = Fe.__c, Ce = Fe.unmount, Ae = Fe.__;
function we(e, t) {
	Fe.__h && Fe.__h(he, e, ye || t), ye = 0;
	var n = he.__H || (he.__H = {
		__: [],
		__h: []
	});
	return e >= n.__.length && n.__.push({}), n.__[e];
}
function Se(e) {
	return ye = 1, xe(He, e);
}
function xe(e, t, n) {
	var r = we(pe++, 2);
	if (r.t = e, !r.__c && (r.__ = [n ? n(t) : He(void 0, t), function(e) {
		var t = r.__N ? r.__N[0] : r.__[0], n = r.t(t, e);
		De(t, n) || (r.__N = [n, r.__[1]], r.__c.setState({}));
	}], r.__c = he, !he.__f)) {
		var u = function(e, t, n) {
			if (!r.__c.__H) return !0;
			var u = r.__c.__H.__.filter(function(e) {
				return !!e.__c;
			});
			if (u.every(function(e) {
				return !e.__N;
			})) return !a || a.call(this, e, t, n);
			var i = r.__c.props !== e;
			return u.forEach(function(e) {
				if (e.__N) {
					var t = e.__[0];
					e.__ = e.__N, e.__N = void 0, De(t, e.__[0]) || (i = !0);
				}
			}), a && a.call(this, e, t, n) || i;
		};
		he.__f = !0;
		var a = he.shouldComponentUpdate, i = he.componentWillUpdate;
		he.componentWillUpdate = function(e, t, n) {
			if (4 & this.__g) {
				var r = a;
				a = void 0, u(e, t, n), a = r;
			}
			i && i.call(this, e, t, n);
		}, he.shouldComponentUpdate = u;
	}
	return r.__N || r.__;
}
function Oe(e, t) {
	var n = we(pe++, 3);
	!Fe.__s && Ue(n.__H, t) && (n.__ = e, n.u = t, he.__H.__h.push(n));
}
function Be(e, t) {
	var n = we(pe++, 4);
	!Fe.__s && Ue(n.__H, t) && (n.__ = e, n.u = t, he.__h.push(n));
}
function Ie(e) {
	return ye = 5, Pe(function() {
		return { current: e };
	}, []);
}
function Te(e, t, n) {
	ye = 6, Be(function() {
		if ("function" == typeof e) {
			var n = e(t());
			return function() {
				e(null), n && "function" == typeof n && n();
			};
		}
		if (e) return e.current = t(), function() {
			return e.current = null;
		};
	}, null == n ? n : n.concat(e));
}
function Pe(e, t) {
	var n = we(pe++, 7);
	return Ue(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
}
function je(e, t) {
	return ye = 8, Pe(function() {
		return e;
	}, t);
}
function Ne(e) {
	var t = he.context[e.__c], n = we(pe++, 9);
	return n.c = e, t ? (null == n.__ && (n.__ = !0, t.sub(he)), t.props.value) : e.__;
}
function ze(e, t) {
	Fe.useDebugValue && Fe.useDebugValue(t ? t(e) : e);
}
function Re() {
	var e = we(pe++, 11);
	if (!e.__) {
		for (var t = he.__v; null !== t && !t.__m && null !== t.__;) t = t.__;
		var n = t.__m || (t.__m = [0, 0]);
		e.__ = "P" + n[0] + "-" + n[1]++;
	}
	return e.__;
}
function Me() {
	for (var e; e = ge.shift();) if (e.__P && e.__H) try {
		e.__H.__h.forEach($e), e.__H.__h.forEach(qe), e.__H.__h = [];
	} catch (t) {
		e.__H.__h = [], Fe.__e(t, e.__v);
	}
}
Fe.__b = function(e) {
	he = null, Ee && Ee(e);
}, Fe.__ = function(e, t) {
	e && t.__k && t.__k.__m && (e.__m = t.__k.__m), Ae && Ae(e, t);
}, Fe.__r = function(e) {
	be && be(e), pe = 0;
	var t = (he = e.__c).__H;
	t && (ve === he ? (t.__h = [], he.__h = [], t.__.forEach(function(e) {
		e.__N && (e.__ = e.__N), e.u = e.__N = void 0;
	})) : (t.__h.forEach($e), t.__h.forEach(qe), t.__h = [], pe = 0)), ve = he;
}, Fe.diffed = function(e) {
	_e && _e(e);
	var t = e.__c;
	t && t.__H && (t.__H.__h.length && (1 !== ge.push(t) && me === Fe.requestAnimationFrame || ((me = Fe.requestAnimationFrame) || Le)(Me)), t.__H.__.forEach(function(e) {
		e.u && (e.__H = e.u), e.u = void 0;
	})), ve = he = null;
}, Fe.__c = function(e, t) {
	t.some(function(e) {
		try {
			e.__h.forEach($e), e.__h = e.__h.filter(function(e) {
				return !e.__ || qe(e);
			});
		} catch (n) {
			t.some(function(e) {
				e.__h && (e.__h = []);
			}), t = [], Fe.__e(n, e.__v);
		}
	}), ke && ke(e, t);
}, Fe.unmount = function(e) {
	Ce && Ce(e);
	var t, n = e.__c;
	n && n.__H && (n.__H.__.forEach(function(e) {
		try {
			$e(e);
		} catch (e) {
			t = e;
		}
	}), n.__H = void 0, t && Fe.__e(t, n.__v));
};
var Ze = "function" == typeof requestAnimationFrame;
function Le(e) {
	var t, n = function() {
		clearTimeout(r), Ze && cancelAnimationFrame(t), setTimeout(e);
	}, r = setTimeout(n, 35);
	Ze && (t = requestAnimationFrame(n));
}
function $e(e) {
	var t = he, n = e.__c;
	"function" == typeof n && (e.__c = void 0, n()), he = t;
}
function qe(e) {
	var t = he;
	e.__c = e.__(), he = t;
}
function Ue(e, t) {
	return !e || e.length !== t.length || t.some(function(t, n) {
		return !De(t, e[n]);
	});
}
function He(e, t) {
	return "function" == typeof t ? t(e) : t;
}
function Ve(e, t) {
	var n = t(), r = Se({ t: {
		__: n,
		u: t
	} }), u = r[0].t, a = r[1];
	return Be(function() {
		u.__ = n, u.u = t, We(u) && a({ t: u });
	}, [
		e,
		n,
		t
	]), Oe(function() {
		return We(u) && a({ t: u }), e(function() {
			We(u) && a({ t: u });
		});
	}, [e]), n;
}
function We(e) {
	var t = e.u, n = e.__;
	try {
		var r = t();
		return !Object.is(n, r);
	} catch (e) {
		return !0;
	}
}
function Ke(e) {
	e();
}
function Je(e) {
	return e;
}
function Qe() {
	return [!1, Ke];
}
var Ge = Be, Ye = Object.assign;
function Xe(e, t) {
	for (var n in e) if ("__source" !== n && !(n in t)) return !0;
	for (var r in t) if ("__source" !== r && e[r] !== t[r]) return !0;
	return !1;
}
var et = /^(-|f[lo].*[^se]$|g.{5,}[^ps]$|z|o[pr]|(W.{5})?[lL]i.*(t|mp)$|an|(bo|s).{4}Im|sca|m.{6}[ds]|ta|c.*[st]$|wido|ini)/;
function tt(e, t) {
	this.props = e, this.context = t;
}
function nt(e, t) {
	function n(e) {
		var n = this.props.ref, r = n == e.ref;
		return !r && n && (n.call ? n(null) : n.current = null), t ? !t(this.props, e) || !r : Xe(this.props, e);
	}
	function r(t) {
		return this.shouldComponentUpdate = n, $(e, t);
	}
	return r.displayName = "Memo(" + (e.displayName || e.name) + ")", r.prototype.isReactComponent = !0, r.type = e, r;
}
(tt.prototype = new V()).isPureReactComponent = !0, tt.prototype.shouldComponentUpdate = function(e, t) {
	return Xe(this.props, e) || Xe(this.state, t);
};
var rt = Symbol.for("react.forward_ref");
var ut = function(e, t, n) {
	return null == e ? null : X(X(e).map(t.bind(n)));
}, at = {
	map: ut,
	forEach: ut,
	count: function(e) {
		return e ? X(e).length : 0;
	},
	only: function(e) {
		var t = X(e);
		if (1 !== t.length) throw "Children.only";
		return t[0];
	},
	toArray: X
}, it = C.__e;
C.__e = function(e, t, n, r) {
	if (e.then) {
		for (var u, a = t; a = a.__;) if ((u = a.__c) && u.__c) return null == t.__e && (t.__e = n.__e, t.__k = n.__k), u.__c(e, t);
	}
	it(e, t, n, r);
};
var ot = C.unmount;
function st(e, t, n) {
	return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(e) {
		"function" == typeof e.__c && e.__c();
	}), e.__c.__H = null), null != (e = Ye({}, e)).__c && (e.__c.__P === n && (e.__c.__P = t), e.__c.__g |= 4, e.__c = null), e.__k = e.__k && e.__k.map(function(e) {
		return st(e, t, n);
	})), e;
}
function ct(e, t, n) {
	return e && n && ("string" == typeof e.type && (e.__u |= 1), e.__v = null, e.__k = e.__k && e.__k.map(function(e) {
		return ct(e, t, n);
	}), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__g |= 4, e.__c.__P = n)), e;
}
function lt() {
	this.__u = 0, this.o = null, this.__b = null;
}
function ft(e) {
	return this.getChildContext = function() {
		return e.context;
	}, e.children;
}
function dt(e) {
	var t = this, n = e.i;
	if (t.componentWillUnmount = function() {
		fe(null, t.l), t.l = null, t.i = null;
	}, t.i && t.i !== n && t.componentWillUnmount(), !t.l) {
		for (var r = t.__v; null !== r && !r.__m && null !== r.__;) r = r.__;
		t.i = n, t.l = {
			nodeType: 1,
			parentNode: n,
			childNodes: [],
			__k: { __m: r.__m },
			ownerDocument: n.ownerDocument,
			insertBefore: function(e, n) {
				this.childNodes.push(e), t.i.insertBefore(e, n);
			}
		};
	}
	fe($(ft, { context: t.context }, e.__v), t.l);
}
function pt(e, t) {
	var n = $(dt, {
		__v: e,
		i: t
	});
	return n.containerInfo = t, n;
}
C.unmount = function(e) {
	var t = e.__c;
	t && t.__R && t.__R(), ot && ot(e);
}, (lt.prototype = new V()).__c = function(e, t) {
	var n = t.__c, r = this;
	null == r.o && (r.o = []), r.o.push(n);
	var u = !1, a = function() {
		u || (u = !0, n.__R = null, i());
	};
	n.__R = a;
	var i = function() {
		if (!--r.__u) {
			if (r.state.__a) {
				var e = r.state.__a;
				r.__v.__k[0] = ct(e, e.__c.__P, e.__c.__O);
			}
			var t;
			for (r.setState({ __a: r.__b = null }); t = r.o.pop();) t.forceUpdate();
		}
	};
	r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(a, a);
}, lt.prototype.componentWillUnmount = function() {
	this.o = [];
}, lt.prototype.render = function(e, t) {
	if (this.__b) {
		if (this.__v.__k) {
			var n = document.createElement("div"), r = this.__v.__k[0].__c;
			this.__v.__k[0] = st(this.__b, n, r.__O = r.__P);
		}
		this.__b = null;
	}
	return [$(H, null, t.__a ? null : e.children), t.__a && $(H, null, e.fallback)];
};
var ht = Symbol.for("react.element"), vt = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, mt = /[A-Z0-9]/g, Dt = "undefined" != typeof document, yt = function(e) {
	return /fil|che|rad/.test(e);
};
function gt(e, t, n) {
	return null == t.__k && (t.textContent = ""), fe(e, t), "function" == typeof n && n(), e ? e.__c : null;
}
V.prototype.isReactComponent = {}, [
	"componentWillMount",
	"componentWillReceiveProps",
	"componentWillUpdate"
].forEach(function(e) {
	Object.defineProperty(V.prototype, e, {
		configurable: !0,
		get: function() {
			return this["UNSAFE_" + e];
		},
		set: function(t) {
			Object.defineProperty(this, e, {
				configurable: !0,
				writable: !0,
				value: t
			});
		}
	});
});
var Ft = C.event;
function Et() {}
function bt() {
	return this.cancelBubble;
}
function _t() {
	return this.defaultPrevented;
}
C.event = function(e) {
	return Ft && (e = Ft(e)), e.persist = Et, e.isPropagationStopped = bt, e.isDefaultPrevented = _t, e.nativeEvent = e;
};
var kt, Ct = {
	enumerable: !1,
	configurable: !0,
	get: function() {
		return this.class;
	}
}, At = C.vnode;
C.vnode = function(e) {
	if ("string" == typeof e.type) (function(e) {
		var t = e.props, n = e.type, r = {}, u = -1 === n.indexOf("-");
		for (var a in t) {
			var i = t[a];
			if (!("value" === a && "defaultValue" in t && null == i || Dt && "children" === a && "noscript" === n || "class" === a || "className" === a)) {
				if ("style" === a && "object" == typeof i) for (var o in i) "number" != typeof i[o] || et.test(o) || (i[o] += "px");
				else if ("defaultValue" === a && "value" in t && null == t.value) a = "value";
				else if ("download" === a && !0 === i) i = "";
				else if ("translate" === a && "no" === i) i = !1;
				else if ("o" === a[0] && "n" === a[1]) {
					var s = a.toLowerCase();
					"ondoubleclick" === s ? a = "ondblclick" : "onchange" !== s || "input" !== n && "textarea" !== n || yt(t.type) ? "onfocus" === s ? a = "onfocusin" : "onblur" === s && (a = "onfocusout") : s = a = "oninput", "oninput" === s && r[a = s] && (a = "oninputCapture");
				} else u && vt.test(a) ? a = a.replace(mt, "-$&").toLowerCase() : null === i && (i = void 0);
				r[a] = i;
			}
		}
		"select" == n && r.multiple && Array.isArray(r.value) && (r.value = X(t.children).forEach(function(e) {
			e.props.selected = -1 != r.value.indexOf(e.props.value);
		})), "select" == n && null != r.defaultValue && (r.value = X(t.children).forEach(function(e) {
			e.props.selected = r.multiple ? -1 != r.defaultValue.indexOf(e.props.value) : r.defaultValue == e.props.value;
		})), t.class && !t.className ? (r.class = t.class, Object.defineProperty(r, "className", Ct)) : (t.className && !t.class || t.class && t.className) && (r.class = r.className = t.className), e.props = r;
	})(e);
	else if ("function" == typeof e.type && ("ref" in e.props && "prototype" in e.type && e.type.prototype.render && (e.ref = e.props.ref, delete e.props.ref), e.type.defaultProps)) {
		var t = Ye({}, e.props);
		for (var n in e.type.defaultProps) void 0 === t[n] && (t[n] = e.type.defaultProps[n]);
		e.props = t;
	}
	e.$$typeof = ht, At && At(e);
};
var wt = C.__r;
C.__r = function(e) {
	wt && wt(e), kt = e.__c;
};
var St = C.diffed;
C.diffed = function(e) {
	St && St(e);
	var t = e.props, n = e.__e;
	null != n && "textarea" === e.type && "value" in t && t.value !== n.value && (n.value = null == t.value ? "" : t.value), kt = null;
};
var xt = { ReactCurrentDispatcher: { current: {
	readContext: function(e) {
		return kt.__n[e.__c].props.value;
	},
	useCallback: je,
	useContext: Ne,
	useDebugValue: ze,
	useDeferredValue: Je,
	useEffect: Oe,
	useId: Re,
	useImperativeHandle: Te,
	useInsertionEffect: Ge,
	useLayoutEffect: Be,
	useMemo: Pe,
	useReducer: xe,
	useRef: Ie,
	useState: Se,
	useSyncExternalStore: Ve,
	useTransition: Qe
} } };
function Ot(e) {
	return !!e && e.$$typeof === ht;
}
function Bt(e) {
	return !!e.__k && (fe(null, e), !0);
}
var It = {
	useState: Se,
	useId: Re,
	useReducer: xe,
	useEffect: Oe,
	useLayoutEffect: Be,
	useInsertionEffect: Ge,
	useTransition: Qe,
	useDeferredValue: Je,
	useSyncExternalStore: Ve,
	startTransition: Ke,
	useRef: Ie,
	useImperativeHandle: Te,
	useMemo: Pe,
	useCallback: je,
	useContext: Ne,
	useDebugValue: ze,
	version: "18.3.1",
	Children: at,
	render: gt,
	hydrate: function(e, t, n) {
		return function(e, t) {
			e.__u |= 32, fe(e, t);
		}(e, t), "function" == typeof n && n(), e ? e.__c : null;
	},
	unmountComponentAtNode: Bt,
	createPortal: pt,
	createElement: $,
	createContext: function(e) {
		function t(e) {
			var n, r;
			return this.getChildContext || (n = /* @__PURE__ */ new Set(), (r = {})[t.__c] = this, this.getChildContext = function() {
				return r;
			}, this.componentWillUnmount = function() {
				n = null;
			}, this.shouldComponentUpdate = function(e) {
				this.props.value != e.value && n.forEach(function(e) {
					e.__g |= 4, J(e);
				});
			}, this.sub = function(e) {
				n.add(e);
				var t = e.componentWillUnmount;
				e.componentWillUnmount = function() {
					n && n.delete(e), t && t.call(e);
				};
			}), e.children;
		}
		return t.__c = "__cC" + j++, t.__ = e, t.Provider = t.__l = (t.Consumer = function(e, t) {
			return e.children(t);
		}).contextType = t, t;
	},
	createFactory: function(e) {
		return $.bind(null, e);
	},
	cloneElement: function(e) {
		return Ot(e) ? de.apply(null, arguments) : e;
	},
	createRef: U,
	Fragment: H,
	isValidElement: Ot,
	isElement: Ot,
	isFragment: function(e) {
		return Ot(e) && e.type === H;
	},
	isMemo: function(e) {
		return !!e && !!e.displayName && ("string" == typeof e.displayName || e.displayName instanceof String) && e.displayName.startsWith("Memo(");
	},
	findDOMNode: function(e) {
		return e && (e.__v && e.__v.__e || 1 === e.nodeType && e) || null;
	},
	Component: V,
	PureComponent: tt,
	memo: nt,
	forwardRef: function(e) {
		function t(t) {
			var n = Ye({}, t);
			return delete n.ref, e(n, t.ref || null);
		}
		return t.$$typeof = rt, t.render = e, t.prototype.isReactComponent = !0, t.displayName = "ForwardRef(" + (e.displayName || e.name) + ")", t;
	},
	flushSync: function(e, t) {
		return e(t);
	},
	unstable_batchedUpdates: function(e, t) {
		return e(t);
	},
	StrictMode: H,
	Suspense: lt,
	lazy: function(e) {
		var t, n, r;
		function u(u) {
			if (t || (t = e()).then(function(e) {
				n = e.default || e;
			}, function(e) {
				r = e;
			}), r) throw r;
			if (!n) throw t;
			return $(n, u);
		}
		return u.displayName = "Lazy", u;
	},
	__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: xt
};
function Tt(e, t) {
	(null == t || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Pt(e, t, n) {
	return (t = function(e) {
		var t = function(e, t) {
			if ("object" != b(e) || !e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t);
				if ("object" != b(r)) return r;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return String(e);
		}(e, "string");
		return "symbol" == b(t) ? t : t + "";
	}(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function jt(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Nt(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {};
		t % 2 ? jt(Object(n), !0).forEach(function(t) {
			Pt(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : jt(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function zt(e, t) {
	return function(e) {
		if (Array.isArray(e)) return e;
	}(e) || function(e, t) {
		var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
		if (null != n) {
			var r, u, a, i, o = [], s = !0, c = !1;
			try {
				if (a = (n = n.call(e)).next, 0 === t);
				else for (; !(s = (r = a.call(n)).done) && (o.push(r.value), o.length !== t); s = !0);
			} catch (e) {
				c = !0, u = e;
			} finally {
				try {
					if (!s && null != n.return && (i = n.return(), Object(i) !== i)) return;
				} finally {
					if (c) throw u;
				}
			}
			return o;
		}
	}(e, t) || function(e, t) {
		if (e) {
			if ("string" == typeof e) return Tt(e, t);
			var n = {}.toString.call(e).slice(8, -1);
			return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Tt(e, t) : void 0;
		}
	}(e, t) || function() {
		throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}();
}
var Rt = {
	"Ctrl/Cmd+K": !0,
	"/": !0,
	"Ctrl/Cmd+I": !0
};
function Mt(e) {
	return Nt(Nt({}, Rt), e);
}
function Zt(e) {
	var t = e.isOpen, n = e.isAskAiActive, r = e.onAskAiToggle, u = e.onClose, a = e.onOpen, i = e.keyboardShortcuts, o = void 0 === i ? Rt : i;
	It.useEffect(function() {
		function e(e) {
			var i;
			if (t && "Escape" === e.code && n) r(!1);
			else {
				var s = o["Ctrl/Cmd+K"] && "k" === (null === (i = e.key) || void 0 === i ? void 0 : i.toLowerCase()) && (e.metaKey || e.ctrlKey), c = o["/"] && "/" === e.key;
				("Escape" === e.code && t || s || !function(e) {
					var t = e.composedPath()[0], n = t.tagName;
					return t.isContentEditable || "INPUT" === n || "SELECT" === n || "TEXTAREA" === n;
				}(e) && c && !t) && (e.preventDefault(), t ? u() : document.body.classList.contains("DocSearch--active") || a());
			}
		}
		return window.addEventListener("keydown", e), function() {
			window.removeEventListener("keydown", e);
		};
	}, [
		t,
		n,
		o,
		a,
		u,
		r
	]);
}
var Lt = [
	"children",
	"theme",
	"onReady",
	"onOpen",
	"onClose",
	"onSidepanelOpen",
	"onSidepanelClose"
], $t = It.createContext(void 0);
$t.displayName = "DocSearchContext";
var qt = It.forwardRef(function(e, t) {
	var n = e.children, r = e.theme, u = e.onReady, a = e.onOpen, i = e.onClose, o = e.onSidepanelOpen, s = e.onSidepanelClose, c = function(e, t) {
		if (null == e) return {};
		var n, r, u = function(e, t) {
			if (null == e) return {};
			var n = {};
			for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
				if (-1 !== t.indexOf(r)) continue;
				n[r] = e[r];
			}
			return n;
		}(e, t);
		if (Object.getOwnPropertySymbols) {
			var a = Object.getOwnPropertySymbols(e);
			for (r = 0; r < a.length; r++) n = a[r], -1 === t.indexOf(n) && {}.propertyIsEnumerable.call(e, n) && (u[n] = e[n]);
		}
		return u;
	}(e, Lt), l = zt(It.useState("ready"), 2), f = l[0], d = l[1], p = zt(It.useState(c.initialQuery || ""), 2), h = p[0], v = p[1], m = It.useRef(null), D = Mt(c.keyboardShortcuts), y = zt(It.useState(), 2), g = y[0], F = y[1], E = zt(It.useState(function() {
		return /* @__PURE__ */ new Set();
	}), 2), b = E[0], _ = E[1], k = function() {
		var e = zt(It.useState(!1), 2), t = e[0], n = e[1];
		return It.useEffect(function() {
			var e = function() {
				n(window.matchMedia("(max-width: 768px)").matches);
			};
			return e(), window.addEventListener("resize", e), function() {
				window.removeEventListener("resize", e);
			};
		}, []), t;
	}(), C = It.useRef("ready"), A = ["modal-search", "modal-askai"].includes(f), w = "modal-askai" === f, S = !k && b.has("sidepanel"), x = "sidepanel" === f;
	It.useEffect(function() {
		null == u || u();
	}, [u]), It.useEffect(function() {
		var e = C.current, t = f;
		"modal-search" !== t && "modal-askai" !== t || "modal-search" === e || "modal-askai" === e || null == a || a(), "ready" !== t || "modal-search" !== e && "modal-askai" !== e || null == i || i(), "sidepanel" === t && "sidepanel" !== e && (null == o || o()), "sidepanel" !== t && "sidepanel" === e && (null == s || s()), C.current = t;
	}, [
		f,
		a,
		i,
		o,
		s
	]);
	var O = It.useCallback(function() {
		d("modal-search");
	}, []), B = It.useCallback(function() {
		var e, t;
		d("ready"), null === (e = m.current) || void 0 === e || e.focus(), v(null !== (t = c.initialQuery) && void 0 !== t ? t : "");
	}, [d, c.initialQuery]), I = It.useCallback(function(e, t) {
		if (!k && e && S) return F(t), void d("sidepanel");
		d(e ? "modal-askai" : "modal-search");
	}, [
		d,
		k,
		S
	]), T = It.useCallback(function(e) {
		b.has("sidepanel") && (F(e), d("sidepanel"));
	}, [d, b]);
	It.useCallback(function(e) {
		d("modal-search"), v(e.key);
	}, [d, v]);
	var P = It.useCallback(function() {
		F(void 0);
	}, []), j = It.useCallback(function(e) {
		b.has(e) || _(function(t) {
			var n = new Set(t);
			return n.add(e), n;
		});
	}, [b]);
	It.useImperativeHandle(t, function() {
		return {
			open: O,
			close: B,
			openAskAi: function(e) {
				return I(!0, e);
			},
			openSidepanel: T,
			get isReady() {
				return !0;
			},
			get isOpen() {
				return A;
			},
			get isSidepanelOpen() {
				return x;
			},
			get isSidepanelSupported() {
				return S;
			}
		};
	}, [
		O,
		B,
		I,
		T,
		A,
		x,
		S
	]), function(e) {
		var t = e.theme;
		Oe(function() {
			if (t) {
				var e = document.documentElement.dataset.theme;
				if (t !== e) return document.documentElement.dataset.theme = t, function() {
					void 0 === e ? delete document.documentElement.dataset.theme : document.documentElement.dataset.theme = e;
				};
			}
		}, [t]);
	}({ theme: r }), Zt({
		isOpen: A,
		onOpen: O,
		onClose: B,
		onAskAiToggle: I,
		isAskAiActive: w,
		keyboardShortcuts: D
	});
	var N = It.useMemo(function() {
		return {
			docsearchState: f,
			setDocsearchState: d,
			searchButtonRef: m,
			initialQuery: h,
			keyboardShortcuts: D,
			openModal: O,
			closeModal: B,
			isAskAiActive: w,
			isModalActive: A,
			onAskAiToggle: I,
			initialAskAiMessage: g,
			clearInitialAskAiMessage: P,
			registerView: j,
			isHybridModeSupported: S
		};
	}, [
		f,
		m,
		h,
		D,
		O,
		B,
		w,
		A,
		I,
		g,
		P,
		j,
		S
	]);
	return It.createElement($t.Provider, { value: N }, n);
});
qt.displayName = "DocSearch";
var Ut = ["type"], Ht = ["type"], Vt = ["additionalProperties"], Wt = ["abortSignal"], Kt = ["messageId"], Jt = ["messages"], Qt = ["experimental_throttle", "resume"];
function Gt(e, t) {
	(null == t || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Yt(e, t, n, r, u, a, i) {
	try {
		var o = e[a](i), s = o.value;
	} catch (e) {
		n(e);
		return;
	}
	o.done ? t(s) : Promise.resolve(s).then(r, u);
}
function Xt(e) {
	return function() {
		var t = this, n = arguments;
		return new Promise(function(r, u) {
			var a = e.apply(t, n);
			function i(e) {
				Yt(a, r, u, i, o, "next", e);
			}
			function o(e) {
				Yt(a, r, u, i, o, "throw", e);
			}
			i(void 0);
		});
	};
}
function en(e, t, n) {
	return t = cn(t), function(e, t) {
		if (t && ("object" == b(t) || "function" == typeof t)) return t;
		if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
		return function(e) {
			if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return e;
		}(e);
	}(e, fn() ? Reflect.construct(t, n || [], cn(e).constructor) : t.apply(e, n));
}
function tn(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function nn(e, t, n) {
	if (fn()) return Reflect.construct.apply(null, arguments);
	var r = [null];
	r.push.apply(r, t);
	var u = new (e.bind.apply(e, r))();
	return n && Dn(u, n.prototype), u;
}
function rn(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, Fn(r.key), r);
	}
}
function un(e, t, n) {
	return t && rn(e.prototype, t), n && rn(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function an(e, t) {
	var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
	if (!n) {
		if (Array.isArray(e) || (n = bn(e)) || t) {
			n && (e = n);
			var r = 0, u = function() {};
			return {
				s: u,
				n: function() {
					return r >= e.length ? { done: !0 } : {
						done: !1,
						value: e[r++]
					};
				},
				e: function(e) {
					throw e;
				},
				f: u
			};
		}
		throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	var a, i = !0, o = !1;
	return {
		s: function() {
			n = n.call(e);
		},
		n: function() {
			var e = n.next();
			return i = e.done, e;
		},
		e: function(e) {
			o = !0, a = e;
		},
		f: function() {
			try {
				i || null == n.return || n.return();
			} finally {
				if (o) throw a;
			}
		}
	};
}
function on(e, t, n) {
	return (t = Fn(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function sn() {
	return sn = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, sn.apply(null, arguments);
}
function cn(e) {
	return cn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
		return e.__proto__ || Object.getPrototypeOf(e);
	}, cn(e);
}
function ln(e, t) {
	if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
	e.prototype = Object.create(t && t.prototype, { constructor: {
		value: e,
		writable: !0,
		configurable: !0
	} }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Dn(e, t);
}
function fn() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (e) {}
	return (fn = function() {
		return !!e;
	})();
}
function dn(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function pn(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {};
		t % 2 ? dn(Object(n), !0).forEach(function(t) {
			on(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : dn(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function hn(e, t) {
	if (null == e) return {};
	var n, r, u = function(e, t) {
		if (null == e) return {};
		var n = {};
		for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
			if (-1 !== t.indexOf(r)) continue;
			n[r] = e[r];
		}
		return n;
	}(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], -1 === t.indexOf(n) && {}.propertyIsEnumerable.call(e, n) && (u[n] = e[n]);
	}
	return u;
}
function vn() {
	/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
	var e, t, n = "function" == typeof Symbol ? Symbol : {}, r = n.iterator || "@@iterator", u = n.toStringTag || "@@toStringTag";
	function a(n, r, u, a) {
		var s = r && r.prototype instanceof o ? r : o, c = Object.create(s.prototype);
		return mn(c, "_invoke", function(n, r, u) {
			var a, o, s, c = 0, l = u || [], f = !1, d = {
				p: 0,
				n: 0,
				v: e,
				a: p,
				f: p.bind(e, 4),
				d: function(t, n) {
					return a = t, o = 0, s = e, d.n = n, i;
				}
			};
			function p(n, r) {
				for (o = n, s = r, t = 0; !f && c && !u && t < l.length; t++) {
					var u, a = l[t], p = d.p, h = a[2];
					n > 3 ? (u = h === r) && (s = a[(o = a[4]) ? 5 : (o = 3, 3)], a[4] = a[5] = e) : a[0] <= p && ((u = n < 2 && p < a[1]) ? (o = 0, d.v = r, d.n = a[1]) : p < h && (u = n < 3 || a[0] > r || r > h) && (a[4] = n, a[5] = r, d.n = h, o = 0));
				}
				if (u || n > 1) return i;
				throw f = !0, r;
			}
			return function(u, l, h) {
				if (c > 1) throw TypeError("Generator is already running");
				for (f && 1 === l && p(l, h), o = l, s = h; (t = o < 2 ? e : s) || !f;) {
					a || (o ? o < 3 ? (o > 1 && (d.n = -1), p(o, s)) : d.n = s : d.v = s);
					try {
						if (c = 2, a) {
							if (o || (u = "next"), t = a[u]) {
								if (!(t = t.call(a, s))) throw TypeError("iterator result is not an object");
								if (!t.done) return t;
								s = t.value, o < 2 && (o = 0);
							} else 1 === o && (t = a.return) && t.call(a), o < 2 && (s = TypeError("The iterator does not provide a '" + u + "' method"), o = 1);
							a = e;
						} else if ((t = (f = d.n < 0) ? s : n.call(r, d)) !== i) break;
					} catch (t) {
						a = e, o = 1, s = t;
					} finally {
						c = 1;
					}
				}
				return {
					value: t,
					done: f
				};
			};
		}(n, u, a), !0), c;
	}
	var i = {};
	function o() {}
	function s() {}
	function c() {}
	t = Object.getPrototypeOf;
	var l = [][r] ? t(t([][r]())) : (mn(t = {}, r, function() {
		return this;
	}), t), f = c.prototype = o.prototype = Object.create(l);
	function d(e) {
		return Object.setPrototypeOf ? Object.setPrototypeOf(e, c) : (e.__proto__ = c, mn(e, u, "GeneratorFunction")), e.prototype = Object.create(f), e;
	}
	return s.prototype = c, mn(f, "constructor", c), mn(c, "constructor", s), s.displayName = "GeneratorFunction", mn(c, u, "GeneratorFunction"), mn(f), mn(f, u, "Generator"), mn(f, r, function() {
		return this;
	}), mn(f, "toString", function() {
		return "[object Generator]";
	}), (vn = function() {
		return {
			w: a,
			m: d
		};
	})();
}
function mn(e, t, n, r) {
	var u = Object.defineProperty;
	try {
		u({}, "", {});
	} catch (e) {
		u = 0;
	}
	mn = function(e, t, n, r) {
		function a(t, n) {
			mn(e, t, function(e) {
				return this._invoke(t, n, e);
			});
		}
		t ? u ? u(e, t, {
			value: n,
			enumerable: !r,
			configurable: !r,
			writable: !r
		}) : e[t] = n : (a("next", 0), a("throw", 1), a("return", 2));
	}, mn(e, t, n, r);
}
function Dn(e, t) {
	return Dn = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
		return e.__proto__ = t, e;
	}, Dn(e, t);
}
function yn(e, t) {
	return function(e) {
		if (Array.isArray(e)) return e;
	}(e) || function(e, t) {
		var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
		if (null != n) {
			var r, u, a, i, o = [], s = !0, c = !1;
			try {
				if (a = (n = n.call(e)).next, 0 === t) {
					if (Object(n) !== n) return;
					s = !1;
				} else for (; !(s = (r = a.call(n)).done) && (o.push(r.value), o.length !== t); s = !0);
			} catch (e) {
				c = !0, u = e;
			} finally {
				try {
					if (!s && null != n.return && (i = n.return(), Object(i) !== i)) return;
				} finally {
					if (c) throw u;
				}
			}
			return o;
		}
	}(e, t) || bn(e, t) || function() {
		throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}();
}
function gn(e) {
	return function(e) {
		if (Array.isArray(e)) return Gt(e);
	}(e) || function(e) {
		if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e);
	}(e) || bn(e) || function() {
		throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}();
}
function Fn(e) {
	var t = function(e, t) {
		if ("object" != b(e) || !e) return e;
		var n = e[Symbol.toPrimitive];
		if (void 0 !== n) {
			var r = n.call(e, t);
			if ("object" != b(r)) return r;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return String(e);
	}(e, "string");
	return "symbol" == b(t) ? t : t + "";
}
function En(e) {
	return En = "function" == typeof Symbol && "symbol" == b(Symbol.iterator) ? function(e) {
		return b(e);
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : b(e);
	}, En(e);
}
function bn(e, t) {
	if (e) {
		if ("string" == typeof e) return Gt(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Gt(e, t) : void 0;
	}
}
function _n(e) {
	var t = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
	return _n = function(e) {
		if (null === e || !function(e) {
			try {
				return -1 !== Function.toString.call(e).indexOf("[native code]");
			} catch (t) {
				return "function" == typeof e;
			}
		}(e)) return e;
		if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
		if (void 0 !== t) {
			if (t.has(e)) return t.get(e);
			t.set(e, n);
		}
		function n() {
			return nn(e, arguments, cn(this).constructor);
		}
		return n.prototype = Object.create(e.prototype, { constructor: {
			value: n,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), Dn(n, e);
	}, _n(e);
}
function kn() {
	kn = function(e, t) {
		return new n(e, void 0, t);
	};
	var e = RegExp.prototype, t = /* @__PURE__ */ new WeakMap();
	function n(e, r, u) {
		var a = RegExp(e, r);
		return t.set(a, u || t.get(e)), Dn(a, n.prototype);
	}
	function r(e, n) {
		var r = t.get(n);
		return Object.keys(r).reduce(function(t, n) {
			var u = r[n];
			if ("number" == typeof u) t[n] = e[u];
			else {
				for (var a = 0; void 0 === e[u[a]] && a + 1 < u.length;) a++;
				t[n] = e[u[a]];
			}
			return t;
		}, Object.create(null));
	}
	return ln(n, RegExp), n.prototype.exec = function(t) {
		var n = e.exec.call(this, t);
		if (n) {
			n.groups = r(n, this);
			var u = n.indices;
			u && (u.groups = r(u, this));
		}
		return n;
	}, n.prototype[Symbol.replace] = function(n, u) {
		if ("string" == typeof u) {
			var a = t.get(this);
			return e[Symbol.replace].call(this, n, u.replace(/\$<([^>]+)(>|$)/g, function(e, t, n) {
				if ("" === n) return e;
				var r = a[t];
				return Array.isArray(r) ? "$" + r.join("$") : "number" == typeof r ? "$" + r : "";
			}));
		}
		if ("function" == typeof u) {
			var i = this;
			return e[Symbol.replace].call(this, n, function() {
				var e = arguments;
				return "object" != b(e[e.length - 1]) && (e = [].slice.call(e)).push(r(e, i)), u.apply(this, e);
			});
		}
		return e[Symbol.replace].call(this, n, u);
	}, kn.apply(this, arguments);
}
var Cn = /* @__PURE__ */ new Set([
	"AI-203",
	"AI-205",
	"AI-224",
	"AI-225"
]);
function An(e, t) {
	for (var n = 0, r = Object.entries(e); n < r.length; n++) {
		var u = yn(r[n], 2), a = u[0], i = u[1];
		if (a.toLowerCase() === t.toLowerCase() && "string" == typeof i && "" !== i.trim()) return i.trim();
	}
}
function wn(e) {
	var t = /\b(AI-\d{3})\b/i.exec(e);
	if (t) return t[1].toUpperCase();
	try {
		var n, r = JSON.parse(e), u = null !== (n = r.code) && void 0 !== n ? n : r.errorCode;
		if ("string" == typeof u && /AI-\d{3}/i.test(u)) return u.trim().toUpperCase();
	} catch (e) {}
}
function Sn(e) {
	return /\brequest blocked for this domain\b/.test(e) || /\bblocked for this domain\b/.test(e);
}
var xn = [
	{ matches: function(e) {
		return "string" == typeof e.extractedCodeUpper && Cn.has(e.extractedCodeUpper);
	} },
	{
		matches: function(e) {
			return null !== e.parsedJson && Sn((null !== (t = An(e.parsedJson, "message")) && void 0 !== t ? t : "").toLowerCase());
			var t;
		},
		showNewConversationLink: !1
	},
	{ matches: function(e) {
		return null !== e.parsedJson && function(e) {
			var t, n, r = "string" == typeof e.type ? e.type : "";
			if (/tokenoutput|outputlimit|steplimit|maxstep|ratelimit|domainnotallowed/i.test(r)) return !0;
			var u = null !== (t = An(e, "error")) && void 0 !== t ? t : "";
			if ("TOO_MANY_REQUESTS" === u.toUpperCase()) return !0;
			if (/token output|output limits|token limits|rate limit|whitelist|step limit|max steps|could not complete response due to token/i.test(u)) return !0;
			var a = null !== (n = An(e, "message")) && void 0 !== n ? n : "";
			if (/rate limit exceeded|retry after \d+/i.test(a)) return !0;
			if (/whitelist/i.test(a)) return !0;
			var i = a.toLowerCase(), o = i.indexOf("not allowed");
			return -1 !== o && -1 !== i.indexOf("domain", o);
		}(e.parsedJson);
	} },
	{
		matches: function(e) {
			return function(e) {
				return /\bTokenOutputLimitError\b/i.test(e);
			}(e.message);
		},
		showNewConversationLink: !1
	},
	{ matches: function(e) {
		return function(e) {
			return /\b429\b/.test(e) || /\brate\s*limit/i.test(e) || /\btoo\s+many\s+attempts\b/.test(e) || /\btoo_many_requests\b/.test(e);
		}(e.messageLower);
	} },
	{
		matches: function(e) {
			return Sn(e.messageLower);
		},
		showNewConversationLink: !1
	},
	{ matches: function(e) {
		return function(e) {
			return /\bwhitelist(ed)?\b/.test(e) || /\bnot\s+allowed\s+for\s+this\s+domain\b/.test(e);
		}(e.messageLower);
	} },
	{ matches: function(e) {
		return function(e) {
			var t = e;
			return /\bcontext\s+length\b/.test(t) || /\bmax tokens\b/.test(t) || /\bmax token\b/.test(t) || /\bmaximum tokens\b/.test(t) || /\bmaximum token\b/.test(t) || /\btoken\s+limit\b/.test(t) || /\btoken\s+output\b/.test(t) || /\boutput\s+limits?\b/.test(t);
		}(e.messageLower);
	} },
	{ matches: function(e) {
		return function(e) {
			var t = e;
			return /\bstep limit\b/.test(t) || /\bmax steps\b/.test(t) || /\bmax step\b/.test(t) || /\bmaximum steps\b/.test(t) || /\bmaximum step\b/.test(t) || /\bmax agent steps\b/.test(t) || /\bmax agent step\b/.test(t) || /\bmaximum agent steps\b/.test(t) || /\bmaximum agent step\b/.test(t);
		}(e.messageLower);
	} }
];
function On(e) {
	var t = function(e) {
		var t, n = null !== (t = e.message) && void 0 !== t ? t : "", r = n.toLowerCase(), u = null;
		try {
			var a = JSON.parse(n);
			a && "object" === En(a) && !Array.isArray(a) && (u = a);
		} catch (e) {}
		return {
			message: n,
			messageLower: r,
			parsedJson: u,
			extractedCodeUpper: wn(n)
		};
	}(e), n = xn.filter(function(e) {
		return e.matches(t);
	});
	if (0 === n.length) return {
		blocking: !1,
		showNewConversationLink: !0
	};
	return {
		blocking: !0,
		showNewConversationLink: n.every(function(e) {
			return !1 !== e.showNewConversationLink;
		})
	};
}
function Bn(e) {
	return e.replace(/<[^>]*>/g, "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
var In = function(e, t) {
	var n = t[0].parts.find(function(e) {
		return "text" === e.type;
	}), r = null != n && n.text ? Bn(n.text) : "";
	return {
		query: e,
		objectID: r,
		messages: t,
		type: "askAI",
		anchor: "stored",
		content: null,
		hierarchy: {
			lvl0: "askAI",
			lvl1: r,
			lvl2: null,
			lvl3: null,
			lvl4: null,
			lvl5: null,
			lvl6: null
		},
		url: "",
		url_without_anchor: ""
	};
}, Tn = function(e) {
	return null == e ? void 0 : e.parts.find(function(e) {
		return "text" === e.type;
	});
};
function Pn(e) {
	return !!e && function(e) {
		return e.includes("ai-217") || /thread\s+depth/.test(e);
	}(e.toLowerCase());
}
function jn(e) {
	var t;
	return !!e && function(e) {
		if (Pn(e)) return !0;
		try {
			var t, n = JSON.parse(e), r = null !== (t = n.code) && void 0 !== t ? t : n.errorCode;
			return "string" == typeof r && "AI-217" === r.toUpperCase() || Pn("string" == typeof n.message ? n.message : "");
		} catch (e) {
			return !1;
		}
	}(null !== (t = e.message) && void 0 !== t ? t : "");
}
function Nn(e, t) {
	return !!e && (!!jn(e) || !!t && function(e) {
		return On(e).blocking;
	}(e));
}
function zn(e) {
	var t;
	if (!e) return !1;
	var n = null !== (t = e.message) && void 0 !== t ? t : "";
	if (/TokenOutputLimitError/i.test(n)) return !0;
	if (/could not complete response due to token output limits/i.test(n)) return !0;
	try {
		var r = JSON.parse(n);
		if ("string" == typeof r.type && /^TokenOutputLimitError$/i.test(r.type.trim())) return !0;
		if ("string" == typeof r.error && /token output limits/i.test(r.error)) return !0;
	} catch (e) {}
	return !1;
}
function Rn(e) {
	var t = e.trim();
	if (t) for (var n = 0; n < 10;) {
		n += 1;
		try {
			var r = JSON.parse(t);
			if ("string" != typeof r) {
				if (r && "object" === En(r) && !Array.isArray(r)) {
					var u = r;
					return An(u, "message") || An(u, "error") || void 0;
				}
				return;
			}
			var i = r.trim();
			if (!i) return;
			t = i;
		} catch (e) {
			if (!/\\"/.test(t)) {
				var o = /"message"\s*:\s*"((?:[^"\\]|\\.)*)"/.exec(t);
				if (null != o && o[1]) return o[1].replace(/\\"/g, "\"").replace(/\\\\/g, "\\").trim();
				var s = /"error"\s*:\s*"((?:[^"\\]|\\.)*)"/.exec(t);
				return null != s && s[1] ? s[1].replace(/\\"/g, "\"").replace(/\\\\/g, "\\").trim() : void 0;
			}
			t = t.replace(/\\"/g, "\"").replace(/\\\\/g, "\\").trim();
		}
	}
}
function Mn(e) {
	var t;
	if (e) {
		var n = null !== (t = e.message) && void 0 !== t ? t : "", r = Rn(n);
		if (r) return r;
		var u = n.trim().replace(/\s*\(AI-\d{3}\)\s*$/i, "").trim();
		return "" !== u ? u : void 0;
	}
}
var Zn = function(e) {
	var t = e.theme;
	Oe(function() {
		if (t) {
			var e = document.documentElement.dataset.theme;
			if (t !== e) return document.documentElement.dataset.theme = t, function() {
				void 0 === e ? delete document.documentElement.dataset.theme : document.documentElement.dataset.theme = e;
			};
		}
	}, [t]);
}, Ln = {
	"Ctrl/Cmd+K": !0,
	"/": !0
};
function $n(e) {
	var t = e.size, n = void 0 === t ? 20 : t, r = e.color, u = void 0 === r ? "currentColor" : r;
	return It.createElement("svg", {
		width: n,
		height: n,
		className: "DocSearch-Search-Icon",
		viewBox: "0 0 24 24",
		"aria-hidden": "true"
	}, It.createElement("circle", {
		cx: "11",
		cy: "11",
		r: "8",
		stroke: u,
		fill: "none",
		strokeWidth: "1.4"
	}), It.createElement("path", {
		d: "m21 21-4.3-4.3",
		stroke: u,
		fill: "none",
		strokeLinecap: "round",
		strokeLinejoin: "round"
	}));
}
function qn(e, t, n) {
	return e.reduce(function(e, r) {
		var u = t(r);
		return e.hasOwnProperty(u) || (e[u] = []), e[u].length < (n || 5) && e[u].push(r), e;
	}, {});
}
function Un(e) {
	return e;
}
function Hn(e) {
	return 1 === e.button || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
}
var Vn = "Ctrl";
function Wn() {}
var Kn = /(<mark>|<\/mark>)/g, Jn = RegExp(Kn.source);
function Qn(e) {
	var t, n, r = e;
	if (!r.__docsearch_parent && !e._highlightResult) return e.hierarchy.lvl0;
	var u = r.__docsearch_parent ? null === (t = r.__docsearch_parent) || void 0 === t || null === (t = t._highlightResult) || void 0 === t || null === (t = t.hierarchy) || void 0 === t ? void 0 : t.lvl0 : null === (n = e._highlightResult) || void 0 === n || null === (n = n.hierarchy) || void 0 === n ? void 0 : n.lvl0;
	return u ? u.value && Jn.test(u.value) ? u.value.replace(Kn, "") : u.value : e.hierarchy.lvl0;
}
var Gn = ["translations", "keyboardShortcuts"], Yn = It.forwardRef(function(e, t) {
	var n = e.translations, r = void 0 === n ? {} : n, u = e.keyboardShortcuts, a = hn(e, Gn), i = r.buttonText, o = void 0 === i ? "Search" : i, s = r.buttonAriaLabel, c = void 0 === s ? "Search" : s, l = function(e) {
		return pn(pn({}, Ln), e);
	}(u), f = yn(Se(null), 2), d = f[0], p = f[1];
	Zn({ theme: a.theme }), Oe(function() {
		"undefined" != typeof navigator && (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? p("⌘") : p(Vn));
	}, []);
	var h = yn(d === Vn ? [
		Vn,
		"Control",
		"Ctrl"
	] : [
		"Meta",
		"Meta",
		"⌘"
	], 3), v = h[0], m = h[1], D = h[2], y = l["Ctrl/Cmd+K"], g = "".concat(m, "+k");
	return It.createElement("button", sn({
		type: "button",
		className: "DocSearch DocSearch-Button",
		"aria-label": y ? "".concat(c, " (").concat(g, ")") : c,
		"aria-keyshortcuts": y ? g : void 0
	}, a, { ref: t }), It.createElement("span", { className: "DocSearch-Button-Container" }, It.createElement($n, null), It.createElement("span", { className: "DocSearch-Button-Placeholder" }, o)), It.createElement("span", { className: "DocSearch-Button-Keys" }, null !== d && y && It.createElement(It.Fragment, null, It.createElement(Xn, { reactsToKey: v }, D), It.createElement(Xn, { reactsToKey: "k" }, "K"))));
});
function Xn(e) {
	var t = e.reactsToKey, n = e.children, r = yn(Se(!1), 2), u = r[0], a = r[1];
	return Oe(function() {
		if (t) return window.addEventListener("keydown", e), window.addEventListener("keyup", n), function() {
			window.removeEventListener("keydown", e), window.removeEventListener("keyup", n);
		};
		function e(e) {
			e.key === t && a(!0);
		}
		function n(e) {
			e.key !== t && "Meta" !== e.key || a(!1);
		}
	}, [t]), It.createElement("kbd", { className: u ? "DocSearch-Button-Key DocSearch-Button-Key--pressed" : "DocSearch-Button-Key" + ("Ctrl" === t ? " DocSearch-Button-Key--ctrl" : "") }, n);
}
function er(e, t) {
	var n = void 0;
	return function() {
		for (var r = arguments.length, u = new Array(r), a = 0; a < r; a++) u[a] = arguments[a];
		n && clearTimeout(n), n = setTimeout(function() {
			return e.apply(void 0, u);
		}, t);
	};
}
function tr(e) {
	return e.reduce(function(e, t) {
		return e.concat(t);
	}, []);
}
var nr = 0;
function rr(e) {
	return 0 === e.collections.length ? 0 : e.collections.reduce(function(e, t) {
		return e + t.items.length;
	}, 0);
}
function ur(e) {
	return e !== Object(e);
}
function ar(e, t) {
	if (e === t) return !0;
	if (ur(e) || ur(t) || "function" == typeof e || "function" == typeof t) return e === t;
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (var n = 0, r = Object.keys(e); n < r.length; n++) {
		var u = r[n];
		if (!(u in t)) return !1;
		if (!ar(e[u], t[u])) return !1;
	}
	return !0;
}
var ir = function() {}, or = [{
	segment: "autocomplete-core",
	version: "1.19.2"
}];
function sr(e) {
	var t = e.item, n = e.items, r = void 0 === n ? [] : n;
	return {
		index: t.__autocomplete_indexName,
		items: [t],
		positions: [1 + r.findIndex(function(e) {
			return e.objectID === t.objectID;
		})],
		queryID: t.__autocomplete_queryID,
		algoliaSource: ["autocomplete"]
	};
}
function cr(e, t) {
	(null == t || t > e.length) && (t = e.length);
	for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
	return r;
}
var lr = ["items"], fr = ["items"];
function dr(e) {
	return dr = "function" == typeof Symbol && "symbol" == b(Symbol.iterator) ? function(e) {
		return b(e);
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : b(e);
	}, dr(e);
}
function pr(e) {
	return function(e) {
		if (Array.isArray(e)) return hr(e);
	}(e) || function(e) {
		if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e);
	}(e) || function(e, t) {
		if (e) {
			if ("string" == typeof e) return hr(e, t);
			var n = Object.prototype.toString.call(e).slice(8, -1);
			return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? hr(e, t) : void 0;
		}
	}(e) || function() {
		throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}();
}
function hr(e, t) {
	(null == t || t > e.length) && (t = e.length);
	for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function vr(e, t) {
	if (null == e) return {};
	var n, r, u = function(e, t) {
		if (null == e) return {};
		var n, r, u = {}, a = Object.keys(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || (u[n] = e[n]);
		return u;
	}(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (u[n] = e[n]);
	}
	return u;
}
function mr(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Dr(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {};
		t % 2 ? mr(Object(n), !0).forEach(function(t) {
			yr(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : mr(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function yr(e, t, n) {
	return (t = function(e) {
		var t = function(e, t) {
			if ("object" !== dr(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t);
				if ("object" !== dr(r)) return r;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return String(e);
		}(e, "string");
		return "symbol" === dr(t) ? t : String(t);
	}(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function gr(e) {
	return e.map(function(e) {
		var t = e.items, n = vr(e, lr);
		return Dr(Dr({}, n), {}, { objectIDs: (null == t ? void 0 : t.map(function(e) {
			return e.objectID;
		})) || n.objectIDs });
	});
}
function Fr(e) {
	var t, n, r, u = (t = function(e, t) {
		return function(e) {
			if (Array.isArray(e)) return e;
		}(e) || function(e, t) {
			var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
			if (null != n) {
				var r, u, a, i, o = [], s = !0, c = !1;
				try {
					if (a = (n = n.call(e)).next, 0 === t);
					else for (; !(s = (r = a.call(n)).done) && (o.push(r.value), o.length !== t); s = !0);
				} catch (e) {
					c = !0, u = e;
				} finally {
					try {
						if (!s && null != n.return && (i = n.return(), Object(i) !== i)) return;
					} finally {
						if (c) throw u;
					}
				}
				return o;
			}
		}(e, t) || function(e, t) {
			if (e) {
				if ("string" == typeof e) return cr(e, t);
				var n = Object.prototype.toString.call(e).slice(8, -1);
				return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? cr(e, t) : void 0;
			}
		}(e, t) || function() {
			throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
		}();
	}((e.version || "").split(".").map(Number), 2), n = t[0], r = t[1], n >= 3 || 2 === n && r >= 4 || 1 === n && r >= 10);
	function a(t, n, r) {
		if (u && void 0 !== r) {
			var a = r[0].__autocomplete_algoliaCredentials, i = {
				"X-Algolia-Application-Id": a.appId,
				"X-Algolia-API-Key": a.apiKey
			};
			e.apply(void 0, [t].concat(pr(n), [{ headers: i }]));
		} else e.apply(void 0, [t].concat(pr(n)));
	}
	return {
		init: function(t, n) {
			e("init", {
				appId: t,
				apiKey: n
			});
		},
		setAuthenticatedUserToken: function(t) {
			e("setAuthenticatedUserToken", t);
		},
		setUserToken: function(t) {
			e("setUserToken", t);
		},
		clickedObjectIDsAfterSearch: function() {
			for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
			t.length > 0 && a("clickedObjectIDsAfterSearch", gr(t), t[0].items);
		},
		clickedObjectIDs: function() {
			for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
			t.length > 0 && a("clickedObjectIDs", gr(t), t[0].items);
		},
		clickedFilters: function() {
			for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
			n.length > 0 && e.apply(void 0, ["clickedFilters"].concat(n));
		},
		convertedObjectIDsAfterSearch: function() {
			for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
			t.length > 0 && a("convertedObjectIDsAfterSearch", gr(t), t[0].items);
		},
		convertedObjectIDs: function() {
			for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
			t.length > 0 && a("convertedObjectIDs", gr(t), t[0].items);
		},
		convertedFilters: function() {
			for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
			n.length > 0 && e.apply(void 0, ["convertedFilters"].concat(n));
		},
		viewedObjectIDs: function() {
			for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
			t.length > 0 && t.reduce(function(e, t) {
				var n = t.items, r = vr(t, fr);
				return [].concat(pr(e), pr(function(e) {
					for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 20, n = [], r = 0; r < e.objectIDs.length; r += t) n.push(Dr(Dr({}, e), {}, { objectIDs: e.objectIDs.slice(r, r + t) }));
					return n;
				}(Dr(Dr({}, r), {}, { objectIDs: (null == n ? void 0 : n.map(function(e) {
					return e.objectID;
				})) || r.objectIDs })).map(function(e) {
					return {
						items: n,
						payload: e
					};
				})));
			}, []).forEach(function(e) {
				var t = e.items;
				return a("viewedObjectIDs", [e.payload], t);
			});
		},
		viewedFilters: function() {
			for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
			n.length > 0 && e.apply(void 0, ["viewedFilters"].concat(n));
		}
	};
}
function Er(e) {
	var t = e.items.reduce(function(e, t) {
		var n;
		return e[t.__autocomplete_indexName] = (null !== (n = e[t.__autocomplete_indexName]) && void 0 !== n ? n : []).concat(t), e;
	}, {});
	return Object.keys(t).map(function(e) {
		return {
			index: e,
			items: t[e],
			algoliaSource: ["autocomplete"]
		};
	});
}
function br(e) {
	return e.objectID && e.__autocomplete_indexName && e.__autocomplete_queryID;
}
function _r(e) {
	return _r = "function" == typeof Symbol && "symbol" == b(Symbol.iterator) ? function(e) {
		return b(e);
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : b(e);
	}, _r(e);
}
function kr(e) {
	return function(e) {
		if (Array.isArray(e)) return Cr(e);
	}(e) || function(e) {
		if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e);
	}(e) || function(e, t) {
		if (e) {
			if ("string" == typeof e) return Cr(e, t);
			var n = Object.prototype.toString.call(e).slice(8, -1);
			return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Cr(e, t) : void 0;
		}
	}(e) || function() {
		throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}();
}
function Cr(e, t) {
	(null == t || t > e.length) && (t = e.length);
	for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Ar(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function wr(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {};
		t % 2 ? Ar(Object(n), !0).forEach(function(t) {
			Sr(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ar(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Sr(e, t, n) {
	return (t = function(e) {
		var t = function(e, t) {
			if ("object" !== _r(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t);
				if ("object" !== _r(r)) return r;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return String(e);
		}(e, "string");
		return "symbol" === _r(t) ? t : String(t);
	}(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
var xr = "2.15.0", Or = "https://cdn.jsdelivr.net/npm/search-insights@".concat(xr, "/dist/search-insights.min.js"), Br = er(function(e) {
	var t = e.onItemsChange, n = e.items, r = e.insights, u = e.state;
	t({
		insights: r,
		insightsEvents: Er({ items: n }).map(function(e) {
			return wr({ eventName: "Items Viewed" }, e);
		}),
		state: u
	});
}, 400);
function Ir(e) {
	var t = function(e) {
		return wr({
			onItemsChange: function(e) {
				var t = e.insights, n = e.insightsEvents, r = e.state;
				t.viewedObjectIDs.apply(t, kr(n.map(function(e) {
					return wr(wr({}, e), {}, { algoliaSource: Tr(e.algoliaSource, r.context) });
				})));
			},
			onSelect: function(e) {
				var t = e.insights, n = e.insightsEvents, r = e.state;
				t.clickedObjectIDsAfterSearch.apply(t, kr(n.map(function(e) {
					return wr(wr({}, e), {}, { algoliaSource: Tr(e.algoliaSource, r.context) });
				})));
			},
			onActive: ir,
			__autocomplete_clickAnalytics: !0
		}, e);
	}(e), n = t.insightsClient, r = t.insightsInitParams, u = t.onItemsChange, a = t.onSelect, i = t.onActive, o = t.__autocomplete_clickAnalytics, s = n;
	if (n || "undefined" != typeof window && function(e) {
		var t = e.window, n = t.AlgoliaAnalyticsObject || "aa";
		"string" == typeof n && (s = t[n]), s || (t.AlgoliaAnalyticsObject = n, t[n] || (t[n] = function() {
			t[n].queue || (t[n].queue = []);
			for (var e = arguments.length, r = new Array(e), u = 0; u < e; u++) r[u] = arguments[u];
			t[n].queue.push(r);
		}), t[n].version = xr, s = t[n], function(e) {
			var t = "[Autocomplete]: Could not load search-insights.js. Please load it manually following https://alg.li/insights-autocomplete";
			try {
				var n = e.document.createElement("script");
				n.async = !0, n.src = Or, n.onerror = function() {
					console.error(t);
				}, document.body.appendChild(n);
			} catch (e) {
				console.error(t);
			}
		}(t));
	}({ window }), !s) return {};
	r && s("init", wr({ partial: !0 }, r));
	var c = Fr(s), l = { current: [] }, f = er(function(e) {
		var t = e.state;
		if (t.isOpen) {
			var n = t.collections.reduce(function(e, t) {
				return [].concat(kr(e), kr(t.items));
			}, []).filter(br);
			ar(l.current.map(function(e) {
				return e.objectID;
			}), n.map(function(e) {
				return e.objectID;
			})) || (l.current = n, n.length > 0 && Br({
				onItemsChange: u,
				items: n,
				insights: c,
				state: t
			}));
		}
	}, 0);
	return {
		name: "aa.algoliaInsightsPlugin",
		subscribe: function(e) {
			var t = e.setContext, n = e.onSelect, r = e.onActive;
			function u(e) {
				t({ algoliaInsightsPlugin: {
					__algoliaSearchParameters: wr(wr({}, o ? { clickAnalytics: !0 } : {}), e ? { userToken: Pr(e) } : {}),
					insights: c
				} });
			}
			s("addAlgoliaAgent", "insights-plugin"), u(), s("onUserTokenChange", function(e) {
				u(e);
			}), s("getUserToken", null, function(e, t) {
				u(t);
			}), n(function(e) {
				var t = e.item, n = e.state, r = e.event, u = e.source;
				br(t) && a({
					state: n,
					event: r,
					insights: c,
					item: t,
					insightsEvents: [wr({ eventName: "Item Selected" }, sr({
						item: t,
						items: u.getItems().filter(br)
					}))]
				});
			}), r(function(e) {
				var t = e.item, n = e.source, r = e.state, u = e.event;
				br(t) && i({
					state: r,
					event: u,
					insights: c,
					item: t,
					insightsEvents: [wr({ eventName: "Item Active" }, sr({
						item: t,
						items: n.getItems().filter(br)
					}))]
				});
			});
		},
		onStateChange: function(e) {
			var t = e.state;
			f({ state: t });
		},
		__autocomplete_pluginOptions: e
	};
}
function Tr() {
	var e, t = arguments.length > 1 ? arguments[1] : void 0;
	return [].concat(kr(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []), ["autocomplete-internal"], kr(null !== (e = t.algoliaInsightsPlugin) && void 0 !== e && e.__automaticInsights ? ["autocomplete-automatic"] : []));
}
function Pr(e) {
	return "number" == typeof e ? e.toString() : e;
}
function jr(e, t) {
	var n = t;
	return {
		then: function(t, r) {
			return jr(e.then(zr(t, n, e), zr(r, n, e)), n);
		},
		catch: function(t) {
			return jr(e.catch(zr(t, n, e)), n);
		},
		finally: function(t) {
			return t && n.onCancelList.push(t), jr(e.finally(zr(t && function() {
				return n.onCancelList = [], t();
			}, n, e)), n);
		},
		cancel: function() {
			n.isCanceled = !0;
			var e = n.onCancelList;
			n.onCancelList = [], e.forEach(function(e) {
				e();
			});
		},
		isCanceled: function() {
			return !0 === n.isCanceled;
		}
	};
}
function Nr(e) {
	return jr(e, {
		isCanceled: !1,
		onCancelList: []
	});
}
function zr(e, t, n) {
	return e ? function(n) {
		return t.isCanceled ? n : e(n);
	} : n;
}
var Rr, Mr = !0;
function Zr(e, t, n, r) {
	if (!n) return null;
	if (e < 0 && (null === t || null !== r && 0 === t)) return n + e;
	var u = (null === t ? -1 : t) + e;
	return u <= -1 || u >= n ? null === r ? null : 0 : u;
}
function Lr(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function $r(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {};
		t % 2 ? Lr(Object(n), !0).forEach(function(t) {
			qr(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Lr(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function qr(e, t, n) {
	return (t = function(e) {
		var t = function(e, t) {
			if ("object" !== Ur(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t);
				if ("object" !== Ur(r)) return r;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return String(e);
		}(e, "string");
		return "symbol" === Ur(t) ? t : String(t);
	}(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Ur(e) {
	return Ur = "function" == typeof Symbol && "symbol" == b(Symbol.iterator) ? function(e) {
		return b(e);
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : b(e);
	}, Ur(e);
}
function Hr(e, t) {
	(null == t || t > e.length) && (t = e.length);
	for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
	return r;
}
var Vr = function(e, t) {
	var n, r = !1, u = [], a = function(e, t) {
		var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
		if (!n) {
			if (Array.isArray(e) || (n = function(e, t) {
				if (e) {
					if ("string" == typeof e) return Hr(e, t);
					var n = Object.prototype.toString.call(e).slice(8, -1);
					return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Hr(e, t) : void 0;
				}
			}(e)) || t) {
				n && (e = n);
				var r = 0, u = function() {};
				return {
					s: u,
					n: function() {
						return r >= e.length ? { done: !0 } : {
							done: !1,
							value: e[r++]
						};
					},
					e: function(e) {
						throw e;
					},
					f: u
				};
			}
			throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
		}
		var a, i = !0, o = !1;
		return {
			s: function() {
				n = n.call(e);
			},
			n: function() {
				var e = n.next();
				return i = e.done, e;
			},
			e: function(e) {
				o = !0, a = e;
			},
			f: function() {
				try {
					i || null == n.return || n.return();
				} finally {
					if (o) throw a;
				}
			}
		};
	}(e);
	try {
		for (a.s(); !(n = a.n()).done;) {
			var i, o, s, c = null === (i = n.value.__autocomplete_pluginOptions) || void 0 === i || null === (o = (s = i).awaitSubmit) || void 0 === o ? void 0 : o.call(s);
			if ("number" == typeof c) u.push(c);
			else if (!0 === c) {
				r = !0;
				break;
			}
		}
	} catch (e) {
		a.e(e);
	} finally {
		a.f();
	}
	return r ? t.wait() : u.length > 0 ? t.wait(Math.max.apply(Math, u)) : void 0;
};
function Wr(e) {
	var t = function(e) {
		var t = e.collections.map(function(e) {
			return e.items.length;
		}).reduce(function(e, t, n) {
			var r = (e[n - 1] || 0) + t;
			return e.push(r), e;
		}, []).reduce(function(t, n) {
			return n <= e.activeItemId ? t + 1 : t;
		}, 0);
		return e.collections[t];
	}(e);
	if (!t) return null;
	var n = t.items[function(e) {
		for (var t = e.state, n = e.collection, r = !1, u = 0, a = 0; !1 === r;) {
			var i = t.collections[u];
			if (i === n) {
				r = !0;
				break;
			}
			a += i.items.length, u++;
		}
		return t.activeItemId - a;
	}({
		state: e,
		collection: t
	})], r = t.source;
	return {
		item: n,
		itemInputValue: r.getItemInputValue({
			item: n,
			state: e
		}),
		itemUrl: r.getItemUrl({
			item: n,
			state: e
		}),
		source: r
	};
}
function Kr(e, t, n) {
	return [
		e,
		null == n ? void 0 : n.sourceId,
		t
	].filter(Boolean).join("-").replace(/\s/g, "");
}
var Jr = /((gt|sm)-|galaxy nexus)|samsung[- ]|samsungbrowser/i;
function Qr(e) {
	return e.nativeEvent || e;
}
function Gr(e) {
	return Gr = "function" == typeof Symbol && "symbol" == b(Symbol.iterator) ? function(e) {
		return b(e);
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : b(e);
	}, Gr(e);
}
function Yr(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Xr(e, t, n) {
	return (t = function(e) {
		var t = function(e, t) {
			if ("object" !== Gr(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t);
				if ("object" !== Gr(r)) return r;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return String(e);
		}(e, "string");
		return "symbol" === Gr(t) ? t : String(t);
	}(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function eu(e) {
	return eu = "function" == typeof Symbol && "symbol" == b(Symbol.iterator) ? function(e) {
		return b(e);
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : b(e);
	}, eu(e);
}
function tu(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function nu(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {};
		t % 2 ? tu(Object(n), !0).forEach(function(t) {
			ru(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : tu(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function ru(e, t, n) {
	return (t = function(e) {
		var t = function(e, t) {
			if ("object" !== eu(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t);
				if ("object" !== eu(r)) return r;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return String(e);
		}(e, "string");
		return "symbol" === eu(t) ? t : String(t);
	}(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function uu(e) {
	return uu = "function" == typeof Symbol && "symbol" == b(Symbol.iterator) ? function(e) {
		return b(e);
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : b(e);
	}, uu(e);
}
function au(e, t) {
	(null == t || t > e.length) && (t = e.length);
	for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function iu(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function ou(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {};
		t % 2 ? iu(Object(n), !0).forEach(function(t) {
			su(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : iu(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function su(e, t, n) {
	return (t = function(e) {
		var t = function(e, t) {
			if ("object" !== uu(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t);
				if ("object" !== uu(r)) return r;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return String(e);
		}(e, "string");
		return "symbol" === uu(t) ? t : String(t);
	}(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function cu(e, t) {
	var n, r = "undefined" != typeof window ? window : {}, u = e.plugins || [];
	return ou(ou({
		debug: !1,
		openOnFocus: !1,
		enterKeyHint: void 0,
		ignoreCompositionEvents: !1,
		placeholder: "",
		autoFocus: !1,
		defaultActiveItemId: null,
		stallThreshold: 300,
		insights: void 0,
		environment: r,
		shouldPanelOpen: function(e) {
			return rr(e.state) > 0;
		},
		reshape: function(e) {
			return e.sources;
		}
	}, e), {}, {
		id: null !== (n = e.id) && void 0 !== n ? n : "autocomplete-".concat(nr++),
		plugins: u,
		initialState: ou({
			activeItemId: null,
			query: "",
			completion: null,
			collections: [],
			isOpen: !1,
			status: "idle",
			context: {}
		}, e.initialState),
		onStateChange: function(t) {
			var n;
			null === (n = e.onStateChange) || void 0 === n || n.call(e, t), u.forEach(function(e) {
				var n;
				return null === (n = e.onStateChange) || void 0 === n ? void 0 : n.call(e, t);
			});
		},
		onSubmit: function(t) {
			var n;
			null === (n = e.onSubmit) || void 0 === n || n.call(e, t), u.forEach(function(e) {
				var n;
				return null === (n = e.onSubmit) || void 0 === n ? void 0 : n.call(e, t);
			});
		},
		onReset: function(t) {
			var n;
			null === (n = e.onReset) || void 0 === n || n.call(e, t), u.forEach(function(e) {
				var n;
				return null === (n = e.onReset) || void 0 === n ? void 0 : n.call(e, t);
			});
		},
		getSources: function(n) {
			return Promise.all([].concat(function(e) {
				return function(e) {
					if (Array.isArray(e)) return au(e);
				}(e) || function(e) {
					if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e);
				}(e) || function(e, t) {
					if (e) {
						if ("string" == typeof e) return au(e, t);
						var n = Object.prototype.toString.call(e).slice(8, -1);
						return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? au(e, t) : void 0;
					}
				}(e) || function() {
					throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
				}();
			}(u.map(function(e) {
				return e.getSources;
			})), [e.getSources]).filter(Boolean).map(function(e) {
				return function(e, t) {
					var n = [];
					return Promise.resolve(e(t)).then(function(e) {
						return Promise.all(e.filter(function(e) {
							return Boolean(e);
						}).map(function(e) {
							if (e.sourceId, n.includes(e.sourceId)) throw new Error("[Autocomplete] The `sourceId` ".concat(JSON.stringify(e.sourceId), " is not unique."));
							n.push(e.sourceId);
							var t = {
								getItemInputValue: function(e) {
									return e.state.query;
								},
								getItemUrl: function() {},
								onSelect: function(e) {
									(0, e.setIsOpen)(!1);
								},
								onActive: ir,
								onResolve: ir
							};
							Object.keys(t).forEach(function(e) {
								t[e].__default = !0;
							});
							var r = $r($r({}, t), e);
							return Promise.resolve(r);
						}));
					});
				}(e, n);
			})).then(function(e) {
				return tr(e);
			}).then(function(e) {
				return e.map(function(e) {
					return ou(ou({}, e), {}, {
						onSelect: function(n) {
							e.onSelect(n), t.forEach(function(e) {
								var t;
								return null === (t = e.onSelect) || void 0 === t ? void 0 : t.call(e, n);
							});
						},
						onActive: function(n) {
							e.onActive(n), t.forEach(function(e) {
								var t;
								return null === (t = e.onActive) || void 0 === t ? void 0 : t.call(e, n);
							});
						},
						onResolve: function(n) {
							e.onResolve(n), t.forEach(function(e) {
								var t;
								return null === (t = e.onResolve) || void 0 === t ? void 0 : t.call(e, n);
							});
						}
					});
				});
			});
		},
		navigator: ou({
			navigate: function(e) {
				var t = e.itemUrl;
				r.location.assign(t);
			},
			navigateNewTab: function(e) {
				var t = e.itemUrl, n = r.open(t, "_blank", "noopener");
				null == n || n.focus();
			},
			navigateNewWindow: function(e) {
				var t = e.itemUrl;
				r.open(t, "_blank", "noopener");
			}
		}, e.navigator)
	});
}
function lu(e) {
	return lu = "function" == typeof Symbol && "symbol" == b(Symbol.iterator) ? function(e) {
		return b(e);
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : b(e);
	}, lu(e);
}
function fu(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function du(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {};
		t % 2 ? fu(Object(n), !0).forEach(function(t) {
			pu(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : fu(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function pu(e, t, n) {
	return (t = function(e) {
		var t = function(e, t) {
			if ("object" !== lu(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t);
				if ("object" !== lu(r)) return r;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return String(e);
		}(e, "string");
		return "symbol" === lu(t) ? t : String(t);
	}(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function hu(e) {
	return hu = "function" == typeof Symbol && "symbol" == b(Symbol.iterator) ? function(e) {
		return b(e);
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : b(e);
	}, hu(e);
}
function vu(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function mu(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {};
		t % 2 ? vu(Object(n), !0).forEach(function(t) {
			Du(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : vu(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Du(e, t, n) {
	return (t = function(e) {
		var t = function(e, t) {
			if ("object" !== hu(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t);
				if ("object" !== hu(r)) return r;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return String(e);
		}(e, "string");
		return "symbol" === hu(t) ? t : String(t);
	}(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function yu(e) {
	return function(e) {
		if (Array.isArray(e)) return gu(e);
	}(e) || function(e) {
		if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e);
	}(e) || function(e, t) {
		if (e) {
			if ("string" == typeof e) return gu(e, t);
			var n = Object.prototype.toString.call(e).slice(8, -1);
			return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? gu(e, t) : void 0;
		}
	}(e) || function() {
		throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}();
}
function gu(e, t) {
	(null == t || t > e.length) && (t = e.length);
	for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Fu(e) {
	return Boolean(e.execute);
}
function Eu(e) {
	var t = e.reduce(function(e, t) {
		if (!Fu(t)) return e.push(t), e;
		var n = t.searchClient, r = t.execute, u = t.requesterId, a = t.requests, i = e.find(function(e) {
			return Fu(t) && Fu(e) && e.searchClient === n && Boolean(u) && e.requesterId === u;
		});
		if (i) {
			var o;
			(o = i.items).push.apply(o, yu(a));
		} else {
			var s = {
				execute: r,
				requesterId: u,
				items: a,
				searchClient: n
			};
			e.push(s);
		}
		return e;
	}, []).map(function(e) {
		if (!Fu(e)) return Promise.resolve(e);
		var t = e, n = t.execute, r = t.items;
		return n({
			searchClient: t.searchClient,
			requests: r
		});
	});
	return Promise.all(t).then(function(e) {
		return tr(e);
	});
}
function bu(e) {
	return bu = "function" == typeof Symbol && "symbol" == b(Symbol.iterator) ? function(e) {
		return b(e);
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : b(e);
	}, bu(e);
}
var _u = [
	"event",
	"nextState",
	"props",
	"query",
	"refresh",
	"store"
];
function ku(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Cu(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {};
		t % 2 ? ku(Object(n), !0).forEach(function(t) {
			Au(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ku(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Au(e, t, n) {
	return (t = function(e) {
		var t = function(e, t) {
			if ("object" !== bu(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t);
				if ("object" !== bu(r)) return r;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return String(e);
		}(e, "string");
		return "symbol" === bu(t) ? t : String(t);
	}(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
var wu, Su, xu, Ou = null, Bu = (wu = -1, Su = -1, xu = void 0, function(e) {
	var t = ++wu;
	return Promise.resolve(e).then(function(e) {
		return xu && t < Su ? xu : (Su = t, xu = e, e);
	});
});
function Iu(e) {
	var t = e.event, n = e.nextState, r = void 0 === n ? {} : n, u = e.props, a = e.query, i = e.refresh, o = e.store, s = function(e, t) {
		if (null == e) return {};
		var n, r, u = function(e, t) {
			if (null == e) return {};
			var n, r, u = {}, a = Object.keys(e);
			for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || (u[n] = e[n]);
			return u;
		}(e, t);
		if (Object.getOwnPropertySymbols) {
			var a = Object.getOwnPropertySymbols(e);
			for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (u[n] = e[n]);
		}
		return u;
	}(e, _u);
	Ou && u.environment.clearTimeout(Ou);
	var c = s.setCollections, l = s.setIsOpen, f = s.setQuery, d = s.setActiveItemId, p = s.setStatus, h = s.setContext;
	if (f(a), d(u.defaultActiveItemId), !a && !1 === u.openOnFocus) {
		var v, m = o.getState().collections.map(function(e) {
			return Cu(Cu({}, e), {}, { items: [] });
		});
		p("idle"), c(m), l(null !== (v = r.isOpen) && void 0 !== v ? v : u.shouldPanelOpen({ state: o.getState() }));
		var D = Nr(Bu(m).then(function() {
			return Promise.resolve();
		}));
		return o.pendingRequests.add(D);
	}
	p("loading"), Ou = u.environment.setTimeout(function() {
		p("stalled");
	}, u.stallThreshold);
	var y = Nr(Bu(u.getSources(Cu({
		query: a,
		refresh: i,
		state: o.getState()
	}, s)).then(function(e) {
		return Promise.all(e.map(function(e) {
			return Promise.resolve(e.getItems(Cu({
				query: a,
				refresh: i,
				state: o.getState()
			}, s))).then(function(t) {
				return function(e, t, n) {
					if (u = e, Boolean(null == u ? void 0 : u.execute)) {
						var r = "algolia" === e.requesterId ? Object.assign.apply(Object, [{}].concat(yu(Object.keys(n.context).map(function(e) {
							var t;
							return null === (t = n.context[e]) || void 0 === t ? void 0 : t.__algoliaSearchParameters;
						})))) : {};
						return mu(mu({}, e), {}, { requests: e.queries.map(function(n) {
							return {
								query: "algolia" === e.requesterId ? mu(mu({}, n), {}, { params: mu(mu({}, r), n.params) }) : n,
								sourceId: t,
								transformResponse: e.transformResponse
							};
						}) });
					}
					var u;
					return {
						items: e,
						sourceId: t
					};
				}(t, e.sourceId, o.getState());
			});
		})).then(Eu).then(function(t) {
			var n, r = t.some(function(e) {
				return function(e) {
					return !Array.isArray(e) && Boolean(null == e ? void 0 : e._automaticInsights);
				}(e.items);
			});
			return r && h({ algoliaInsightsPlugin: Cu(Cu({}, (null === (n = o.getState().context) || void 0 === n ? void 0 : n.algoliaInsightsPlugin) || {}), {}, { __automaticInsights: r }) }), function(e, t, n) {
				return t.map(function(t) {
					var r, u = e.filter(function(e) {
						return e.sourceId === t.sourceId;
					}), a = u.map(function(e) {
						return e.items;
					}), i = u[0].transformResponse, o = i ? i({
						results: r = a,
						hits: r.map(function(e) {
							return e.hits;
						}).filter(Boolean),
						facetHits: r.map(function(e) {
							var t;
							return null === (t = e.facetHits) || void 0 === t ? void 0 : t.map(function(e) {
								return {
									label: e.value,
									count: e.count,
									_highlightResult: { label: { value: e.highlighted } }
								};
							});
						}).filter(Boolean)
					}) : a;
					return t.onResolve({
						source: t,
						results: a,
						items: o,
						state: n.getState()
					}), o.every(Boolean), "The `getItems` function from source \"".concat(t.sourceId, "\" must return an array of items but returned ").concat(JSON.stringify(void 0), ".\n\nDid you forget to return items?\n\nSee: https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/sources/#param-getitems"), {
						source: t,
						items: o
					};
				});
			}(t, e, o);
		}).then(function(e) {
			return function(e) {
				var t = e.props, n = e.state, r = e.collections.reduce(function(e, t) {
					return du(du({}, e), {}, pu({}, t.source.sourceId, du(du({}, t.source), {}, { getItems: function() {
						return tr(t.items);
					} })));
				}, {}), u = t.plugins.reduce(function(e, t) {
					return t.reshape ? t.reshape(e) : e;
				}, {
					sourcesBySourceId: r,
					state: n
				}).sourcesBySourceId;
				return tr(t.reshape({
					sourcesBySourceId: u,
					sources: Object.values(u),
					state: n
				})).filter(Boolean).map(function(e) {
					return {
						source: e,
						items: e.getItems()
					};
				});
			}({
				collections: e,
				props: u,
				state: o.getState()
			});
		});
	}))).then(function(e) {
		var n;
		p("idle"), c(e);
		var f = u.shouldPanelOpen({ state: o.getState() });
		l(null !== (n = r.isOpen) && void 0 !== n ? n : u.openOnFocus && !a && f || f);
		var d = Wr(o.getState());
		if (null !== o.getState().activeItemId && d) {
			var h = d.item, v = d.itemInputValue, m = d.itemUrl, D = d.source;
			D.onActive(Cu({
				event: t,
				item: h,
				itemInputValue: v,
				itemUrl: m,
				refresh: i,
				source: D,
				state: o.getState()
			}, s));
		}
	}).finally(function() {
		p("idle"), Ou && u.environment.clearTimeout(Ou);
	});
	return o.pendingRequests.add(y);
}
function Tu(e) {
	return Tu = "function" == typeof Symbol && "symbol" == b(Symbol.iterator) ? function(e) {
		return b(e);
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : b(e);
	}, Tu(e);
}
var Pu = [
	"event",
	"props",
	"refresh",
	"store"
];
function ju(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Nu(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {};
		t % 2 ? ju(Object(n), !0).forEach(function(t) {
			zu(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ju(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function zu(e, t, n) {
	return (t = function(e) {
		var t = function(e, t) {
			if ("object" !== Tu(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t);
				if ("object" !== Tu(r)) return r;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return String(e);
		}(e, "string");
		return "symbol" === Tu(t) ? t : String(t);
	}(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Ru(e) {
	return Ru = "function" == typeof Symbol && "symbol" == b(Symbol.iterator) ? function(e) {
		return b(e);
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : b(e);
	}, Ru(e);
}
var Mu = [
	"props",
	"refresh",
	"store"
], Zu = [
	"inputElement",
	"formElement",
	"panelElement"
], Lu = ["inputElement"], $u = ["inputElement", "maxLength"], qu = ["source"], Uu = ["item", "source"];
function Hu(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Vu(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {};
		t % 2 ? Hu(Object(n), !0).forEach(function(t) {
			Wu(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Hu(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Wu(e, t, n) {
	return (t = function(e) {
		var t = function(e, t) {
			if ("object" !== Ru(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t);
				if ("object" !== Ru(r)) return r;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return String(e);
		}(e, "string");
		return "symbol" === Ru(t) ? t : String(t);
	}(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Ku(e, t) {
	if (null == e) return {};
	var n, r, u = function(e, t) {
		if (null == e) return {};
		var n, r, u = {}, a = Object.keys(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || (u[n] = e[n]);
		return u;
	}(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (u[n] = e[n]);
	}
	return u;
}
function Ju(e) {
	var t = e.props, n = e.refresh, r = e.store, u = Ku(e, Mu);
	return {
		getEnvironmentProps: function(e) {
			var n = e.inputElement, u = e.formElement, a = e.panelElement;
			function i(e) {
				!r.getState().isOpen && r.pendingRequests.isEmpty() || e.target === n || !1 === [u, a].some(function(t) {
					return (n = t) === (r = e.target) || n.contains(r);
					var n, r;
				}) && (r.dispatch("blur", null), t.debug || r.pendingRequests.cancelAll());
			}
			return Vu({
				onTouchStart: i,
				onMouseDown: i,
				onTouchMove: function(e) {
					!1 !== r.getState().isOpen && n === t.environment.document.activeElement && e.target !== n && n.blur();
				}
			}, Ku(e, Zu));
		},
		getRootProps: function(e) {
			return Vu({
				role: "combobox",
				"aria-expanded": r.getState().isOpen,
				"aria-haspopup": "listbox",
				"aria-controls": r.getState().isOpen ? r.getState().collections.map(function(e) {
					var n = e.source;
					return Kr(t.id, "list", n);
				}).join(" ") : void 0,
				"aria-labelledby": Kr(t.id, "label")
			}, e);
		},
		getFormProps: function(e) {
			e.inputElement;
			var a = Ku(e, Lu), i = function(a) {
				var i;
				t.onSubmit(Vu({
					event: a,
					refresh: n,
					state: r.getState()
				}, u)), r.dispatch("submit", null), null === (i = e.inputElement) || void 0 === i || i.blur();
			};
			return Vu({
				action: "",
				noValidate: !0,
				role: "search",
				onSubmit: function(e) {
					e.preventDefault();
					var n = Vr(t.plugins, r.pendingRequests);
					void 0 !== n ? n.then(function() {
						return i(e);
					}) : i(e);
				},
				onReset: function(a) {
					var i;
					a.preventDefault(), t.onReset(Vu({
						event: a,
						refresh: n,
						state: r.getState()
					}, u)), r.dispatch("reset", null), null === (i = e.inputElement) || void 0 === i || i.focus();
				}
			}, a);
		},
		getLabelProps: function(e) {
			return Vu({
				htmlFor: Kr(t.id, "input"),
				id: Kr(t.id, "label")
			}, e);
		},
		getInputProps: function(e) {
			var a;
			function i(e) {
				(t.openOnFocus || Boolean(r.getState().query)) && Iu(Vu({
					event: e,
					props: t,
					query: r.getState().completion || r.getState().query,
					refresh: n,
					store: r
				}, u)), r.dispatch("focus", null);
			}
			var o = e || {};
			o.inputElement;
			var s = o.maxLength, c = void 0 === s ? 512 : s, l = Ku(o, $u), f = Wr(r.getState()), d = function(e) {
				return Boolean(e && e.match(Jr));
			}((null === (a = t.environment.navigator) || void 0 === a ? void 0 : a.userAgent) || ""), p = t.enterKeyHint || (null != f && f.itemUrl && !d ? "go" : "search");
			return Vu({
				"aria-autocomplete": "both",
				"aria-activedescendant": r.getState().isOpen && null !== r.getState().activeItemId ? Kr(t.id, "item-".concat(r.getState().activeItemId), null == f ? void 0 : f.source) : void 0,
				"aria-controls": r.getState().isOpen ? r.getState().collections.filter(function(e) {
					return e.items.length > 0;
				}).map(function(e) {
					var n = e.source;
					return Kr(t.id, "list", n);
				}).join(" ") : void 0,
				"aria-labelledby": Kr(t.id, "label"),
				value: r.getState().completion || r.getState().query,
				id: Kr(t.id, "input"),
				autoComplete: "off",
				autoCorrect: "off",
				autoCapitalize: "off",
				enterKeyHint: p,
				spellCheck: "false",
				autoFocus: t.autoFocus,
				placeholder: t.placeholder,
				maxLength: c,
				type: "search",
				onChange: function(e) {
					var a = e.currentTarget.value;
					t.ignoreCompositionEvents && Qr(e).isComposing ? u.setQuery(a) : Iu(Vu({
						event: e,
						props: t,
						query: a.slice(0, c),
						refresh: n,
						store: r
					}, u));
				},
				onCompositionEnd: function(e) {
					Iu(Vu({
						event: e,
						props: t,
						query: e.currentTarget.value.slice(0, c),
						refresh: n,
						store: r
					}, u));
				},
				onKeyDown: function(e) {
					Qr(e).isComposing || function(e) {
						var t = e.event, n = e.props, r = e.refresh, u = e.store, a = function(e, t) {
							if (null == e) return {};
							var n, r, u = function(e, t) {
								if (null == e) return {};
								var n, r, u = {}, a = Object.keys(e);
								for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || (u[n] = e[n]);
								return u;
							}(e, t);
							if (Object.getOwnPropertySymbols) {
								var a = Object.getOwnPropertySymbols(e);
								for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (u[n] = e[n]);
							}
							return u;
						}(e, Pu);
						if ("ArrowUp" === t.key || "ArrowDown" === t.key) {
							var i = function() {
								var e = Wr(u.getState()), t = n.environment.document.getElementById(Kr(n.id, "item-".concat(u.getState().activeItemId), null == e ? void 0 : e.source));
								t && (t.scrollIntoViewIfNeeded ? t.scrollIntoViewIfNeeded(!1) : t.scrollIntoView(!1));
							}, o = function() {
								var e = Wr(u.getState());
								if (null !== u.getState().activeItemId && e) {
									var n = e.item, i = e.itemInputValue, o = e.itemUrl, s = e.source;
									s.onActive(Nu({
										event: t,
										item: n,
										itemInputValue: i,
										itemUrl: o,
										refresh: r,
										source: s,
										state: u.getState()
									}, a));
								}
							};
							t.preventDefault(), !1 === u.getState().isOpen && (n.openOnFocus || Boolean(u.getState().query)) ? Iu(Nu({
								event: t,
								props: n,
								query: u.getState().query,
								refresh: r,
								store: u
							}, a)).then(function() {
								u.dispatch(t.key, { nextActiveItemId: n.defaultActiveItemId }), o(), setTimeout(i, 0);
							}) : (u.dispatch(t.key, {}), o(), i());
						} else if ("Escape" === t.key) t.preventDefault(), u.dispatch(t.key, null), u.pendingRequests.cancelAll();
						else if ("Tab" === t.key) u.dispatch("blur", null), u.pendingRequests.cancelAll();
						else if ("Enter" === t.key) {
							if (null === u.getState().activeItemId || u.getState().collections.every(function(e) {
								return 0 === e.items.length;
							})) {
								var s = Vr(n.plugins, u.pendingRequests);
								void 0 !== s ? s.then(u.pendingRequests.cancelAll) : n.debug || u.pendingRequests.cancelAll();
								return;
							}
							t.preventDefault();
							var c = Wr(u.getState()), l = c.item, f = c.itemInputValue, d = c.itemUrl, p = c.source;
							if (t.metaKey || t.ctrlKey) void 0 !== d && (p.onSelect(Nu({
								event: t,
								item: l,
								itemInputValue: f,
								itemUrl: d,
								refresh: r,
								source: p,
								state: u.getState()
							}, a)), n.navigator.navigateNewTab({
								itemUrl: d,
								item: l,
								state: u.getState()
							}));
							else if (t.shiftKey) void 0 !== d && (p.onSelect(Nu({
								event: t,
								item: l,
								itemInputValue: f,
								itemUrl: d,
								refresh: r,
								source: p,
								state: u.getState()
							}, a)), n.navigator.navigateNewWindow({
								itemUrl: d,
								item: l,
								state: u.getState()
							}));
							else if (t.altKey);
							else {
								if (void 0 !== d) return p.onSelect(Nu({
									event: t,
									item: l,
									itemInputValue: f,
									itemUrl: d,
									refresh: r,
									source: p,
									state: u.getState()
								}, a)), void n.navigator.navigate({
									itemUrl: d,
									item: l,
									state: u.getState()
								});
								Iu(Nu({
									event: t,
									nextState: { isOpen: !1 },
									props: n,
									query: f,
									refresh: r,
									store: u
								}, a)).then(function() {
									p.onSelect(Nu({
										event: t,
										item: l,
										itemInputValue: f,
										itemUrl: d,
										refresh: r,
										source: p,
										state: u.getState()
									}, a));
								});
							}
						}
					}(Vu({
						event: e,
						props: t,
						refresh: n,
						store: r
					}, u));
				},
				onFocus: i,
				onBlur: ir,
				onClick: function(n) {
					e.inputElement !== t.environment.document.activeElement || r.getState().isOpen || i(n);
				}
			}, l);
		},
		getPanelProps: function(e) {
			return Vu({
				onMouseDown: function(e) {
					e.preventDefault();
				},
				onMouseLeave: function() {
					r.dispatch("mouseleave", null);
				}
			}, e);
		},
		getListProps: function(e) {
			var n = e || {}, r = n.source, u = Ku(n, qu);
			return Vu({
				role: "listbox",
				"aria-labelledby": Kr(t.id, "label"),
				id: Kr(t.id, "list", r)
			}, u);
		},
		getItemProps: function(e) {
			var a = e.item, i = e.source, o = Ku(e, Uu);
			return Vu({
				id: Kr(t.id, "item-".concat(a.__autocomplete_id), i),
				role: "option",
				"aria-selected": r.getState().activeItemId === a.__autocomplete_id,
				onMouseMove: function(e) {
					if (a.__autocomplete_id !== r.getState().activeItemId) {
						r.dispatch("mousemove", a.__autocomplete_id);
						var t = Wr(r.getState());
						if (null !== r.getState().activeItemId && t) {
							var i = t.item, o = t.itemInputValue, s = t.itemUrl, c = t.source;
							c.onActive(Vu({
								event: e,
								item: i,
								itemInputValue: o,
								itemUrl: s,
								refresh: n,
								source: c,
								state: r.getState()
							}, u));
						}
					}
				},
				onMouseDown: function(e) {
					e.preventDefault();
				},
				onClick: function(e) {
					var o = i.getItemInputValue({
						item: a,
						state: r.getState()
					}), s = i.getItemUrl({
						item: a,
						state: r.getState()
					});
					(s ? Promise.resolve() : Iu(Vu({
						event: e,
						nextState: { isOpen: !1 },
						props: t,
						query: o,
						refresh: n,
						store: r
					}, u))).then(function() {
						i.onSelect(Vu({
							event: e,
							item: a,
							itemInputValue: o,
							itemUrl: s,
							refresh: n,
							source: i,
							state: r.getState()
						}, u));
					});
				}
			}, o);
		}
	};
}
function Qu(e) {
	return Qu = "function" == typeof Symbol && "symbol" == b(Symbol.iterator) ? function(e) {
		return b(e);
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : b(e);
	}, Qu(e);
}
function Gu(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Yu(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {};
		t % 2 ? Gu(Object(n), !0).forEach(function(t) {
			Xu(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Gu(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Xu(e, t, n) {
	return (t = function(e) {
		var t = function(e, t) {
			if ("object" !== Qu(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t);
				if ("object" !== Qu(r)) return r;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return String(e);
		}(e, "string");
		return "symbol" === Qu(t) ? t : String(t);
	}(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function ea(e) {
	var t, n, r, u, a = e.plugins, i = e.options, o = null === (t = ((null === (n = i.__autocomplete_metadata) || void 0 === n ? void 0 : n.userAgents) || [])[0]) || void 0 === t ? void 0 : t.segment, s = o ? Xu({}, o, Object.keys((null === (r = i.__autocomplete_metadata) || void 0 === r ? void 0 : r.options) || {})) : {};
	return {
		plugins: a.map(function(e) {
			return {
				name: e.name,
				options: Object.keys(e.__autocomplete_pluginOptions || [])
			};
		}),
		options: Yu({ "autocomplete-core": Object.keys(i) }, s),
		ua: or.concat((null === (u = i.__autocomplete_metadata) || void 0 === u ? void 0 : u.userAgents) || [])
	};
}
function ta(e) {
	var t, n = e.state;
	return !1 === n.isOpen || null === n.activeItemId ? null : (null === (t = Wr(n)) || void 0 === t ? void 0 : t.itemInputValue) || null;
}
function na(e) {
	return na = "function" == typeof Symbol && "symbol" == b(Symbol.iterator) ? function(e) {
		return b(e);
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : b(e);
	}, na(e);
}
function ra(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function ua(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {};
		t % 2 ? ra(Object(n), !0).forEach(function(t) {
			aa(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ra(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function aa(e, t, n) {
	return (t = function(e) {
		var t = function(e, t) {
			if ("object" !== na(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t);
				if ("object" !== na(r)) return r;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return String(e);
		}(e, "string");
		return "symbol" === na(t) ? t : String(t);
	}(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
var ia = function(e, t) {
	switch (t.type) {
		case "setActiveItemId":
		case "mousemove": return ua(ua({}, e), {}, { activeItemId: t.payload });
		case "setQuery": return ua(ua({}, e), {}, {
			query: t.payload,
			completion: null
		});
		case "setCollections": return ua(ua({}, e), {}, { collections: t.payload });
		case "setIsOpen": return ua(ua({}, e), {}, { isOpen: t.payload });
		case "setStatus": return ua(ua({}, e), {}, { status: t.payload });
		case "setContext": return ua(ua({}, e), {}, { context: ua(ua({}, e.context), t.payload) });
		case "ArrowDown":
			var n = ua(ua({}, e), {}, { activeItemId: t.payload.hasOwnProperty("nextActiveItemId") ? t.payload.nextActiveItemId : Zr(1, e.activeItemId, rr(e), t.props.defaultActiveItemId) });
			return ua(ua({}, n), {}, { completion: ta({ state: n }) });
		case "ArrowUp":
			var r = ua(ua({}, e), {}, { activeItemId: Zr(-1, e.activeItemId, rr(e), t.props.defaultActiveItemId) });
			return ua(ua({}, r), {}, { completion: ta({ state: r }) });
		case "Escape": return e.isOpen ? ua(ua({}, e), {}, {
			activeItemId: null,
			isOpen: !1,
			completion: null
		}) : ua(ua({}, e), {}, {
			activeItemId: null,
			query: "",
			status: "idle",
			collections: []
		});
		case "submit": return ua(ua({}, e), {}, {
			activeItemId: null,
			isOpen: !1,
			status: "idle"
		});
		case "reset": return ua(ua({}, e), {}, {
			activeItemId: !0 === t.props.openOnFocus ? t.props.defaultActiveItemId : null,
			status: "idle",
			completion: null,
			query: ""
		});
		case "focus": return ua(ua({}, e), {}, {
			activeItemId: t.props.defaultActiveItemId,
			isOpen: (t.props.openOnFocus || Boolean(e.query)) && t.props.shouldPanelOpen({ state: e })
		});
		case "blur": return t.props.debug ? e : ua(ua({}, e), {}, {
			isOpen: !1,
			activeItemId: null
		});
		case "mouseleave": return ua(ua({}, e), {}, { activeItemId: t.props.defaultActiveItemId });
		default: return "The reducer action ".concat(JSON.stringify(t.type), " is not supported."), e;
	}
};
function oa(e) {
	return oa = "function" == typeof Symbol && "symbol" == b(Symbol.iterator) ? function(e) {
		return b(e);
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : b(e);
	}, oa(e);
}
function sa(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function ca(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {};
		t % 2 ? sa(Object(n), !0).forEach(function(t) {
			la(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : sa(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function la(e, t, n) {
	return (t = function(e) {
		var t = function(e, t) {
			if ("object" !== oa(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t);
				if ("object" !== oa(r)) return r;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return String(e);
		}(e, "string");
		return "symbol" === oa(t) ? t : String(t);
	}(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function fa(e) {
	var t = [], n = cu(e, t), r = function(e, t, n) {
		var r, u = t.initialState;
		return {
			getState: function() {
				return u;
			},
			dispatch: function(r, a) {
				var i = function(e) {
					for (var t = 1; t < arguments.length; t++) {
						var n = null != arguments[t] ? arguments[t] : {};
						t % 2 ? Yr(Object(n), !0).forEach(function(t) {
							Xr(e, t, n[t]);
						}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Yr(Object(n)).forEach(function(t) {
							Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
						});
					}
					return e;
				}({}, u);
				u = e(u, {
					type: r,
					props: t,
					payload: a
				}), n({
					state: u,
					prevState: i
				});
			},
			pendingRequests: (r = [], {
				add: function(e) {
					return r.push(e), e.finally(function() {
						r = r.filter(function(t) {
							return t !== e;
						});
					});
				},
				cancelAll: function() {
					r.forEach(function(e) {
						return e.cancel();
					});
				},
				isEmpty: function() {
					return 0 === r.length;
				},
				wait: function(e) {
					return Mr ? (Mr = !1, Rr = e ? Promise.race([Promise.all(r), new Promise(function(t) {
						return setTimeout(t, e);
					})]) : Promise.all(r), Rr.then(function() {
						Mr = !0;
					})) : Rr;
				}
			})
		};
	}(ia, n, function(e) {
		var t, r, a = e.prevState, c = e.state;
		if (n.onStateChange(ca({
			prevState: a,
			state: c,
			refresh: i,
			navigator: n.navigator
		}, u)), !s() && null !== (t = c.context) && void 0 !== t && null !== (r = t.algoliaInsightsPlugin) && void 0 !== r && r.__automaticInsights && !1 !== n.insights) {
			var l = Ir({ __autocomplete_clickAnalytics: !1 });
			n.plugins.push(l), o([l]);
		}
	}), u = function(e) {
		var t = e.store;
		return {
			setActiveItemId: function(e) {
				t.dispatch("setActiveItemId", e);
			},
			setQuery: function(e) {
				t.dispatch("setQuery", e);
			},
			setCollections: function(e) {
				var n = 0, r = e.map(function(e) {
					return nu(nu({}, e), {}, { items: tr(e.items).map(function(e) {
						return nu(nu({}, e), {}, { __autocomplete_id: n++ });
					}) });
				});
				t.dispatch("setCollections", r);
			},
			setIsOpen: function(e) {
				t.dispatch("setIsOpen", e);
			},
			setStatus: function(e) {
				t.dispatch("setStatus", e);
			},
			setContext: function(e) {
				t.dispatch("setContext", e);
			}
		};
	}({ store: r }), a = Ju(ca({
		props: n,
		refresh: i,
		store: r,
		navigator: n.navigator
	}, u));
	function i() {
		return Iu(ca({
			event: new Event("input"),
			nextState: { isOpen: r.getState().isOpen },
			props: n,
			navigator: n.navigator,
			query: r.getState().query,
			refresh: i,
			store: r
		}, u));
	}
	function o(e) {
		e.forEach(function(e) {
			var r;
			return null === (r = e.subscribe) || void 0 === r ? void 0 : r.call(e, ca(ca({}, u), {}, {
				navigator: n.navigator,
				refresh: i,
				onSelect: function(e) {
					t.push({ onSelect: e });
				},
				onActive: function(e) {
					t.push({ onActive: e });
				},
				onResolve: function(e) {
					t.push({ onResolve: e });
				}
			}));
		});
	}
	function s() {
		return n.plugins.some(function(e) {
			return "aa.algoliaInsightsPlugin" === e.name;
		});
	}
	if (n.insights && !s()) {
		var c = "boolean" == typeof n.insights ? {} : n.insights;
		n.plugins.push(Ir(c));
	}
	return o(n.plugins), function(e) {
		var t, n, r = e.metadata, u = e.environment;
		if (null === (t = u.navigator) || void 0 === t || null === (n = t.userAgent) || void 0 === n ? void 0 : n.includes("Algolia Crawler")) {
			var a = u.document.createElement("meta"), i = u.document.querySelector("head");
			a.name = "algolia:metadata", setTimeout(function() {
				a.content = JSON.stringify(r), i.appendChild(a);
			}, 0);
		}
	}({
		metadata: ea({
			plugins: n.plugins,
			options: e
		}),
		environment: n.environment
	}), ca(ca({
		refresh: i,
		navigator: n.navigator
	}, a), u);
}
var da = "https://askai.algolia.com/chat", pa = "https://beta-chat-askai.algolia.com";
function ha(e) {
	var t = e.translations, n = (void 0 === t ? {} : t).poweredByText, r = void 0 === n ? "Powered by" : n;
	return It.createElement("a", {
		href: "https://www.algolia.com/ref/docsearch/?utm_source=".concat(window.location.hostname, "&utm_medium=referral&utm_content=powered_by&utm_campaign=docsearch"),
		target: "_blank",
		rel: "noopener noreferrer"
	}, It.createElement("span", { className: "DocSearch-Label" }, r), It.createElement("svg", {
		width: "80",
		height: "24",
		"aria-label": "Algolia",
		role: "img",
		id: "Layer_1",
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 2196.2 500"
	}, It.createElement("defs", null, It.createElement("style", null, ".cls-1,.cls-2{fill:#003dff;}.cls-2{fill-rule:evenodd;}")), It.createElement("path", {
		className: "cls-2",
		d: "M1070.38,275.3V5.91c0-3.63-3.24-6.39-6.82-5.83l-50.46,7.94c-2.87,.45-4.99,2.93-4.99,5.84l.17,273.22c0,12.92,0,92.7,95.97,95.49,3.33,.1,6.09-2.58,6.09-5.91v-40.78c0-2.96-2.19-5.51-5.12-5.84-34.85-4.01-34.85-47.57-34.85-54.72Z"
	}), It.createElement("rect", {
		className: "cls-1",
		x: "1845.88",
		y: "104.73",
		width: "62.58",
		height: "277.9",
		rx: "5.9",
		ry: "5.9"
	}), It.createElement("path", {
		className: "cls-2",
		d: "M1851.78,71.38h50.77c3.26,0,5.9-2.64,5.9-5.9V5.9c0-3.62-3.24-6.39-6.82-5.83l-50.77,7.95c-2.87,.45-4.99,2.92-4.99,5.83v51.62c0,3.26,2.64,5.9,5.9,5.9Z"
	}), It.createElement("path", {
		className: "cls-2",
		d: "M1764.03,275.3V5.91c0-3.63-3.24-6.39-6.82-5.83l-50.46,7.94c-2.87,.45-4.99,2.93-4.99,5.84l.17,273.22c0,12.92,0,92.7,95.97,95.49,3.33,.1,6.09-2.58,6.09-5.91v-40.78c0-2.96-2.19-5.51-5.12-5.84-34.85-4.01-34.85-47.57-34.85-54.72Z"
	}), It.createElement("path", {
		className: "cls-2",
		d: "M1631.95,142.72c-11.14-12.25-24.83-21.65-40.78-28.31-15.92-6.53-33.26-9.85-52.07-9.85-18.78,0-36.15,3.17-51.92,9.85-15.59,6.66-29.29,16.05-40.76,28.31-11.47,12.23-20.38,26.87-26.76,44.03-6.38,17.17-9.24,37.37-9.24,58.36,0,20.99,3.19,36.87,9.55,54.21,6.38,17.32,15.14,32.11,26.45,44.36,11.29,12.23,24.83,21.62,40.6,28.46,15.77,6.83,40.12,10.33,52.4,10.48,12.25,0,36.78-3.82,52.7-10.48,15.92-6.68,29.46-16.23,40.78-28.46,11.29-12.25,20.05-27.04,26.25-44.36,6.22-17.34,9.24-33.22,9.24-54.21,0-20.99-3.34-41.19-10.03-58.36-6.38-17.17-15.14-31.8-26.43-44.03Zm-44.43,163.75c-11.47,15.75-27.56,23.7-48.09,23.7-20.55,0-36.63-7.8-48.1-23.7-11.47-15.75-17.21-34.01-17.21-61.2,0-26.89,5.59-49.14,17.06-64.87,11.45-15.75,27.54-23.52,48.07-23.52,20.55,0,36.63,7.78,48.09,23.52,11.47,15.57,17.36,37.98,17.36,64.87,0,27.19-5.72,45.3-17.19,61.2Z"
	}), It.createElement("path", {
		className: "cls-2",
		d: "M894.42,104.73h-49.33c-48.36,0-90.91,25.48-115.75,64.1-14.52,22.58-22.99,49.63-22.99,78.73,0,44.89,20.13,84.92,51.59,111.1,2.93,2.6,6.05,4.98,9.31,7.14,12.86,8.49,28.11,13.47,44.52,13.47,1.23,0,2.46-.03,3.68-.09,.36-.02,.71-.05,1.07-.07,.87-.05,1.75-.11,2.62-.2,.34-.03,.68-.08,1.02-.12,.91-.1,1.82-.21,2.73-.34,.21-.03,.42-.07,.63-.1,32.89-5.07,61.56-30.82,70.9-62.81v57.83c0,3.26,2.64,5.9,5.9,5.9h50.42c3.26,0,5.9-2.64,5.9-5.9V110.63c0-3.26-2.64-5.9-5.9-5.9h-56.32Zm0,206.92c-12.2,10.16-27.97,13.98-44.84,15.12-.16,.01-.33,.03-.49,.04-1.12,.07-2.24,.1-3.36,.1-42.24,0-77.12-35.89-77.12-79.37,0-10.25,1.96-20.01,5.42-28.98,11.22-29.12,38.77-49.74,71.06-49.74h49.33v142.83Z"
	}), It.createElement("path", {
		className: "cls-2",
		d: "M2133.97,104.73h-49.33c-48.36,0-90.91,25.48-115.75,64.1-14.52,22.58-22.99,49.63-22.99,78.73,0,44.89,20.13,84.92,51.59,111.1,2.93,2.6,6.05,4.98,9.31,7.14,12.86,8.49,28.11,13.47,44.52,13.47,1.23,0,2.46-.03,3.68-.09,.36-.02,.71-.05,1.07-.07,.87-.05,1.75-.11,2.62-.2,.34-.03,.68-.08,1.02-.12,.91-.1,1.82-.21,2.73-.34,.21-.03,.42-.07,.63-.1,32.89-5.07,61.56-30.82,70.9-62.81v57.83c0,3.26,2.64,5.9,5.9,5.9h50.42c3.26,0,5.9-2.64,5.9-5.9V110.63c0-3.26-2.64-5.9-5.9-5.9h-56.32Zm0,206.92c-12.2,10.16-27.97,13.98-44.84,15.12-.16,.01-.33,.03-.49,.04-1.12,.07-2.24,.1-3.36,.1-42.24,0-77.12-35.89-77.12-79.37,0-10.25,1.96-20.01,5.42-28.98,11.22-29.12,38.77-49.74,71.06-49.74h49.33v142.83Z"
	}), It.createElement("path", {
		className: "cls-2",
		d: "M1314.05,104.73h-49.33c-48.36,0-90.91,25.48-115.75,64.1-11.79,18.34-19.6,39.64-22.11,62.59-.58,5.3-.88,10.68-.88,16.14s.31,11.15,.93,16.59c4.28,38.09,23.14,71.61,50.66,94.52,2.93,2.6,6.05,4.98,9.31,7.14,12.86,8.49,28.11,13.47,44.52,13.47h0c17.99,0,34.61-5.93,48.16-15.97,16.29-11.58,28.88-28.54,34.48-47.75v50.26h-.11v11.08c0,21.84-5.71,38.27-17.34,49.36-11.61,11.08-31.04,16.63-58.25,16.63-11.12,0-28.79-.59-46.6-2.41-2.83-.29-5.46,1.5-6.27,4.22l-12.78,43.11c-1.02,3.46,1.27,7.02,4.83,7.53,21.52,3.08,42.52,4.68,54.65,4.68,48.91,0,85.16-10.75,108.89-32.21,21.48-19.41,33.15-48.89,35.2-88.52V110.63c0-3.26-2.64-5.9-5.9-5.9h-56.32Zm0,64.1s.65,139.13,0,143.36c-12.08,9.77-27.11,13.59-43.49,14.7-.16,.01-.33,.03-.49,.04-1.12,.07-2.24,.1-3.36,.1-1.32,0-2.63-.03-3.94-.1-40.41-2.11-74.52-37.26-74.52-79.38,0-10.25,1.96-20.01,5.42-28.98,11.22-29.12,38.77-49.74,71.06-49.74h49.33Z"
	}), It.createElement("path", {
		className: "cls-1",
		d: "M249.83,0C113.3,0,2,110.09,.03,246.16c-2,138.19,110.12,252.7,248.33,253.5,42.68,.25,83.79-10.19,120.3-30.03,3.56-1.93,4.11-6.83,1.08-9.51l-23.38-20.72c-4.75-4.21-11.51-5.4-17.36-2.92-25.48,10.84-53.17,16.38-81.71,16.03-111.68-1.37-201.91-94.29-200.13-205.96,1.76-110.26,92-199.41,202.67-199.41h202.69V407.41l-115-102.18c-3.72-3.31-9.42-2.66-12.42,1.31-18.46,24.44-48.53,39.64-81.93,37.34-46.33-3.2-83.87-40.5-87.34-86.81-4.15-55.24,39.63-101.52,94-101.52,49.18,0,89.68,37.85,93.91,85.95,.38,4.28,2.31,8.27,5.52,11.12l29.95,26.55c3.4,3.01,8.79,1.17,9.63-3.3,2.16-11.55,2.92-23.58,2.07-35.92-4.82-70.34-61.8-126.93-132.17-131.26-80.68-4.97-148.13,58.14-150.27,137.25-2.09,77.1,61.08,143.56,138.19,145.26,32.19,.71,62.03-9.41,86.14-26.95l150.26,133.2c6.44,5.71,16.61,1.14,16.61-7.47V9.48C499.66,4.25,495.42,0,490.18,0H249.83Z"
	})));
}
function va(e) {
	return It.createElement("svg", {
		width: "20",
		height: "20",
		"aria-label": e.ariaLabel,
		viewBox: "0 0 24 24",
		role: "img"
	}, It.createElement("g", {
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: "1.4"
	}, e.children));
}
function ma(e) {
	var t = e.translations, n = void 0 === t ? {} : t, r = e.isAskAiActive, u = void 0 !== r && r, a = n.selectText, i = void 0 === a ? "Select" : a, o = n.selectKeyAriaLabel, s = void 0 === o ? "Enter key" : o, c = n.submitQuestionText, l = void 0 === c ? "Submit question" : c, f = n.navigateText, d = void 0 === f ? "Navigate" : f, p = n.navigateUpKeyAriaLabel, h = void 0 === p ? "Arrow up" : p, v = n.navigateDownKeyAriaLabel, m = void 0 === v ? "Arrow down" : v, D = n.closeText, y = void 0 === D ? "Close" : D, g = n.backToSearchText, F = void 0 === g ? "Back to search" : g, E = n.closeKeyAriaLabel, b = void 0 === E ? "Escape key" : E, _ = n.poweredByText, k = void 0 === _ ? "Powered by" : _;
	return It.createElement(It.Fragment, null, It.createElement("div", { className: "DocSearch-Logo" }, It.createElement(ha, { translations: { poweredByText: k } })), It.createElement("ul", { className: "DocSearch-Commands" }, It.createElement("li", null, It.createElement("kbd", { className: "DocSearch-Commands-Key" }, It.createElement(va, { ariaLabel: m }, It.createElement("path", { d: "M12 5v14" }), It.createElement("path", { d: "m19 12-7 7-7-7" }))), It.createElement("kbd", { className: "DocSearch-Commands-Key" }, It.createElement(va, { ariaLabel: h }, It.createElement("path", { d: "m5 12 7-7 7 7" }), It.createElement("path", { d: "M12 19V5" }))), It.createElement("span", { className: "DocSearch-Label" }, d)), It.createElement("li", null, It.createElement("kbd", { className: "DocSearch-Commands-Key" }, It.createElement(va, { ariaLabel: s }, It.createElement("polyline", { points: "9 10 4 15 9 20" }), It.createElement("path", { d: "M20 4v7a4 4 0 0 1-4 4H4" }))), It.createElement("span", { className: "DocSearch-Label" }, u ? l : i)), It.createElement("li", null, It.createElement("kbd", { className: "DocSearch-Commands-Key" }, It.createElement("span", { className: "DocSearch-Escape-Key" }, "ESC")), It.createElement("span", {
		className: "DocSearch-Label",
		"aria-label": b
	}, u ? F : y))));
}
function Da(e) {
	var t = e.hit, n = e.children;
	return It.createElement("a", { href: t.url }, n);
}
function ya(e) {
	var t = e.className;
	return It.createElement("svg", {
		viewBox: "0 0 38 38",
		className: t,
		stroke: "currentColor",
		strokeOpacity: ".5"
	}, It.createElement("g", {
		fill: "none",
		fillRule: "evenodd"
	}, It.createElement("g", {
		transform: "translate(1 1)",
		strokeWidth: "2"
	}, It.createElement("circle", {
		strokeOpacity: ".3",
		cx: "18",
		cy: "18",
		r: "18"
	}), It.createElement("path", { d: "M36 18c0-9.94-8.06-18-18-18" }, It.createElement("animateTransform", {
		attributeName: "transform",
		type: "rotate",
		from: "0 18 18",
		to: "360 18 18",
		dur: "1s",
		repeatCount: "indefinite"
	})))));
}
function ga(e) {
	var t = e.className, n = void 0 === t ? "" : t;
	return It.createElement("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.3",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className: "DocSearch-Hit-icon-sparkles ".concat(n)
	}, It.createElement("path", { d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" }), It.createElement("path", { d: "M20 3v4" }), It.createElement("path", { d: "M22 5h-4" }), It.createElement("path", { d: "M4 17v2" }), It.createElement("path", { d: "M5 18H3" }));
}
function Fa() {
	return It.createElement("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 20 20"
	}, It.createElement("g", {
		stroke: "currentColor",
		fill: "none",
		fillRule: "evenodd",
		strokeLinecap: "round",
		strokeLinejoin: "round"
	}, It.createElement("path", { d: "M3.18 6.6a8.23 8.23 0 1112.93 9.94h0a8.23 8.23 0 01-11.63 0" }), It.createElement("path", { d: "M6.44 7.25H2.55V3.36M10.45 6v5.6M10.45 11.6L13 13" })));
}
function Ea() {
	return It.createElement("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 20 20"
	}, It.createElement("path", {
		d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
		stroke: "currentColor",
		fill: "none",
		fillRule: "evenodd",
		strokeLinecap: "round",
		strokeLinejoin: "round"
	}));
}
function ba() {
	return It.createElement("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		fillRule: "evenodd",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: "2",
		className: "lucide lucide-triangle-alert-icon lucide-triangle-alert"
	}, It.createElement("path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" }), It.createElement("path", { d: "M12 9v4" }), It.createElement("path", { d: "M12 17h.01" }));
}
function _a() {
	return It.createElement("svg", {
		className: "DocSearch-Hit-Select-Icon",
		width: "20",
		height: "20",
		viewBox: "0 0 20 20"
	}, It.createElement("g", {
		stroke: "currentColor",
		fill: "none",
		fillRule: "evenodd",
		strokeLinecap: "round",
		strokeLinejoin: "round"
	}, It.createElement("path", { d: "M18 3v4c0 2-2 4-4 4H2" }), It.createElement("path", { d: "M8 17l-6-6 6-6" })));
}
var ka = function() {
	return It.createElement("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round"
	}, It.createElement("path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }), It.createElement("path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }), It.createElement("path", { d: "M10 9H8" }), It.createElement("path", { d: "M16 13H8" }), It.createElement("path", { d: "M16 17H8" }));
};
function Ca(e) {
	switch (e.type) {
		case "lvl1": return It.createElement(ka, null);
		case "content": return It.createElement(wa, null);
		default: return It.createElement(Aa, null);
	}
}
function Aa() {
	return It.createElement("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round"
	}, It.createElement("line", {
		x1: "4",
		x2: "20",
		y1: "9",
		y2: "9"
	}), It.createElement("line", {
		x1: "4",
		x2: "20",
		y1: "15",
		y2: "15"
	}), It.createElement("line", {
		x1: "10",
		x2: "8",
		y1: "3",
		y2: "21"
	}), It.createElement("line", {
		x1: "16",
		x2: "14",
		y1: "3",
		y2: "21"
	}));
}
function wa() {
	return It.createElement("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 20 20"
	}, It.createElement("path", {
		d: "M17 5H3h14zm0 5H3h14zm0 5H3h14z",
		stroke: "currentColor",
		fill: "none",
		fillRule: "evenodd",
		strokeLinejoin: "round"
	}));
}
function Sa() {
	return It.createElement("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 20 20"
	}, It.createElement("path", {
		d: "M10 14.2L5 17l1-5.6-4-4 5.5-.7 2.5-5 2.5 5 5.6.8-4 4 .9 5.5z",
		stroke: "currentColor",
		fill: "none",
		fillRule: "evenodd",
		strokeLinejoin: "round"
	}));
}
function xa() {
	return It.createElement("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: 18,
		height: 18,
		viewBox: "0 0 18 18",
		fill: "none"
	}, It.createElement("path", {
		fillRule: "evenodd",
		clipRule: "evenodd",
		d: "M8.99984 1.29102C4.74264 1.29102 1.2915 4.74215 1.2915 8.99935C1.2915 13.2565 4.74264 16.7077 8.99984 16.7077C13.257 16.7077 16.7082 13.2565 16.7082 8.99935C16.7082 4.74215 13.257 1.29102 8.99984 1.29102ZM0.0415039 8.99935C0.0415039 4.0518 4.05229 0.0410156 8.99984 0.0410156C13.9474 0.0410156 17.9582 4.0518 17.9582 8.99935C17.9582 13.9469 13.9474 17.9577 8.99984 17.9577C4.05229 17.9577 0.0415039 13.9469 0.0415039 8.99935ZM5.87484 6.49935C5.87484 6.15417 6.15466 5.87435 6.49984 5.87435H11.4998C11.845 5.87435 12.1248 6.15417 12.1248 6.49935V11.4993C12.1248 11.8445 11.845 12.1243 11.4998 12.1243H6.49984C6.15466 12.1243 5.87484 11.8445 5.87484 11.4993V6.49935ZM7.12484 7.12435V10.8743H10.8748V7.12435H7.12484Z",
		fill: "currentcolor"
	}));
}
function Oa() {
	return It.createElement("svg", {
		width: "40",
		height: "40",
		viewBox: "0 0 20 20",
		fill: "none",
		fillRule: "evenodd",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round"
	}, It.createElement("path", { d: "M19 4.8a16 16 0 00-2-1.2m-3.3-1.2A16 16 0 001.1 4.7M16.7 8a12 12 0 00-2.8-1.4M10 6a12 12 0 00-6.7 2M12.3 14.7a4 4 0 00-4.5 0M14.5 11.4A8 8 0 0010 10M3 16L18 2M10 18h0" }));
}
function Ba() {
	return It.createElement("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "64",
		height: "64",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "#5a5e9a",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round"
	}, It.createElement("path", { d: "m13.5 8.5-5 5" }), It.createElement("path", { d: "m8.5 8.5 5 5" }), It.createElement("circle", {
		cx: "11",
		cy: "11",
		r: "8"
	}), It.createElement("path", { d: "m21 21-4.3-4.3" }));
}
function Ia() {
	return It.createElement("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: 4,
		height: 16,
		viewBox: "0 0 4 16",
		fill: "none"
	}, It.createElement("path", {
		fillRule: "evenodd",
		clipRule: "evenodd",
		d: "M1.99984 1.95898C1.88478 1.95898 1.7915 2.05226 1.7915 2.16732C1.7915 2.28238 1.88478 2.37565 1.99984 2.37565C2.1149 2.37565 2.20817 2.28238 2.20817 2.16732C2.20817 2.05226 2.1149 1.95898 1.99984 1.95898ZM0.541504 2.16732C0.541504 1.3619 1.19442 0.708984 1.99984 0.708984C2.80525 0.708984 3.45817 1.3619 3.45817 2.16732C3.45817 2.97273 2.80525 3.62565 1.99984 3.62565C1.19442 3.62565 0.541504 2.97273 0.541504 2.16732ZM1.99984 7.79232C1.88478 7.79232 1.7915 7.88559 1.7915 8.00065C1.7915 8.11571 1.88478 8.20898 1.99984 8.20898C2.1149 8.20898 2.20817 8.11571 2.20817 8.00065C2.20817 7.88559 2.1149 7.79232 1.99984 7.79232ZM0.541504 8.00065C0.541504 7.19524 1.19442 6.54232 1.99984 6.54232C2.80525 6.54232 3.45817 7.19524 3.45817 8.00065C3.45817 8.80607 2.80525 9.45898 1.99984 9.45898C1.19442 9.45898 0.541504 8.80607 0.541504 8.00065ZM1.99984 13.6257C1.88478 13.6257 1.7915 13.7189 1.7915 13.834C1.7915 13.949 1.88478 14.0423 1.99984 14.0423C2.1149 14.0423 2.20817 13.949 2.20817 13.834C2.20817 13.7189 2.1149 13.6257 1.99984 13.6257ZM0.541504 13.834C0.541504 13.0286 1.19442 12.3757 1.99984 12.3757C2.80525 12.3757 3.45817 13.0286 3.45817 13.834C3.45817 14.6394 2.80525 15.2923 1.99984 15.2923C1.19442 15.2923 0.541504 14.6394 0.541504 13.834Z",
		fill: "currentcolor"
	}));
}
function Ta() {
	return It.createElement("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "18",
		height: "18",
		viewBox: "0 0 18 18",
		fill: "none"
	}, It.createElement("path", {
		d: "M9 0.875C10.6068 0.875 12.1776 1.35149 13.5137 2.24414C14.8498 3.13693 15.8919 4.40598 16.5068 5.89062C17.1218 7.37522 17.2822 9.00892 16.9688 10.585C16.6552 12.1611 15.8814 13.6088 14.7451 14.7451C13.6088 15.8814 12.1611 16.6552 10.585 16.9688C9.00892 17.2822 7.37523 17.1218 5.89062 16.5068C4.40598 15.8919 3.13693 14.8498 2.24414 13.5137C1.35149 12.1776 0.875 10.6068 0.875 9C0.875 8.65482 1.15482 8.375 1.5 8.375C1.84518 8.375 2.125 8.65482 2.125 9C2.125 10.3596 2.52792 11.6888 3.2832 12.8193C4.03864 13.9499 5.1129 14.8312 6.36914 15.3516C7.62523 15.8718 9.00736 16.0083 10.3408 15.7432C11.6744 15.4779 12.8998 14.8228 13.8613 13.8613C14.8228 12.8998 15.4779 11.6744 15.7432 10.3408C16.0083 9.00736 15.8718 7.62523 15.3516 6.36914C14.8312 5.1129 13.9499 4.03864 12.8193 3.2832C11.6888 2.52792 10.3596 2.125 9 2.125C7.06829 2.125 5.21604 2.89096 3.82129 4.22949L3.00879 5.04199H5.66699C6.01202 5.04217 6.29199 5.32192 6.29199 5.66699C6.29182 6.01191 6.01191 6.29182 5.66699 6.29199H1.5C1.45939 6.29199 1.41889 6.28716 1.37891 6.2793C1.36148 6.27587 1.345 6.26949 1.32812 6.26465C1.267 6.24714 1.20782 6.22205 1.15332 6.18555C1.08536 6.14005 1.02604 6.08256 0.980469 6.01465C0.970244 5.99942 0.962841 5.98268 0.954102 5.9668C0.904937 5.87756 0.875056 5.77606 0.875 5.66699V1.5C0.875 1.15482 1.15482 0.875002 1.5 0.875C1.84518 0.875 2.125 1.15482 2.125 1.5V4.15723L2.94141 3.3418L2.9502 3.33301C4.57158 1.77433 6.73388 0.875 9 0.875ZM9.33301 4.20801C9.67808 4.20801 9.95783 4.48798 9.95801 4.83301V9.44727L12.9463 10.9414C13.2548 11.0958 13.3798 11.4707 13.2256 11.7793C13.0712 12.088 12.6955 12.213 12.3867 12.0586L9.05371 10.3926C8.84198 10.2867 8.70801 10.0697 8.70801 9.83301V4.83301C8.70818 4.48809 8.98809 4.20819 9.33301 4.20801Z",
		fill: "currentcolor"
	}));
}
function Pa() {
	return It.createElement("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "19",
		height: "19",
		viewBox: "0 0 19 19",
		fill: "none"
	}, It.createElement("path", {
		fillRule: "evenodd",
		clipRule: "evenodd",
		d: "M0.712717 3.38039C1.14249 2.95062 1.72538 2.70917 2.33317 2.70917H8.1665C8.51168 2.70917 8.7915 2.989 8.7915 3.33417C8.7915 3.67935 8.51168 3.95917 8.1665 3.95917H2.33317C2.0569 3.95917 1.79195 4.06892 1.5966 4.26427C1.40125 4.45962 1.2915 4.72457 1.2915 5.00084V16.6675C1.2915 16.9438 1.40125 17.2087 1.5966 17.4041C1.79195 17.5994 2.0569 17.7092 2.33317 17.7092H13.9998C14.2761 17.7092 14.5411 17.5994 14.7364 17.4041C14.9318 17.2087 15.0415 16.9438 15.0415 16.6675V10.8342C15.0415 10.489 15.3213 10.2092 15.6665 10.2092C16.0117 10.2092 16.2915 10.489 16.2915 10.8342V16.6675C16.2915 17.2753 16.0501 17.8582 15.6203 18.288C15.1905 18.7177 14.6076 18.9592 13.9998 18.9592H2.33317C1.72538 18.9592 1.14249 18.7177 0.712717 18.288C0.282947 17.8582 0.0415039 17.2753 0.0415039 16.6675V5.00084C0.0415039 4.39305 0.282947 3.81016 0.712717 3.38039Z",
		fill: "currentcolor"
	}), It.createElement("path", {
		fillRule: "evenodd",
		clipRule: "evenodd",
		d: "M15.6665 2.19141C15.3634 2.19141 15.0728 2.3118 14.8584 2.52611L7.06419 10.3204L6.52548 12.4752L8.68031 11.9365L16.4746 4.14223C16.6889 3.92792 16.8093 3.63725 16.8093 3.33417C16.8093 3.03109 16.6889 2.74043 16.4746 2.52611C16.2603 2.3118 15.9696 2.19141 15.6665 2.19141ZM13.9746 1.64223C14.4233 1.1935 15.0319 0.941406 15.6665 0.941406C16.3011 0.941406 16.9097 1.1935 17.3584 1.64223C17.8072 2.09096 18.0593 2.69957 18.0593 3.33417C18.0593 3.96877 17.8072 4.57738 17.3584 5.02611L9.44178 12.9428C9.36168 13.0229 9.26132 13.0797 9.15142 13.1072L5.81809 13.9405C5.6051 13.9938 5.3798 13.9314 5.22456 13.7761C5.06932 13.6209 5.00692 13.3956 5.06016 13.1826L5.8935 9.84925C5.92097 9.73936 5.9778 9.639 6.0579 9.5589L13.9746 1.64223Z",
		fill: "currentcolor"
	}));
}
var ja, Na = {
	before: "Searched for ",
	separator: ", ",
	lastSeparator: " and ",
	after: ""
};
function za(e) {
	var t = e.queries, n = e.translations, r = e.onSearchQueryClick;
	if (0 === t.length) return null;
	if ("function" == typeof n.aggregatedToolCallNode) return It.createElement(It.Fragment, null, n.aggregatedToolCallNode(t, r));
	var u = (n.aggregatedToolCallText ? n.aggregatedToolCallText(t) : Na) || {}, a = u.before, i = void 0 === a ? "" : a, o = u.separator, s = void 0 === o ? ", " : o, c = u.lastSeparator, l = void 0 === c ? " and " : c, f = u.after, d = void 0 === f ? "" : f;
	return It.createElement("div", { className: "DocSearch-AskAiScreen-MessageContent-Tool Tool--AggregatedResult" }, It.createElement($n, { size: 18 }), It.createElement("span", null, i && It.createElement("span", null, i), t.map(function(e, n) {
		return It.createElement(H, { key: e + n }, It.createElement("span", {
			role: "button",
			tabIndex: 0,
			className: "DocSearch-AskAiScreen-MessageContent-Tool-Query",
			onKeyDown: function(t) {
				"enter" !== t.key && " " !== t.key || (t.preventDefault(), r(e));
			},
			onClick: function() {
				return r(e);
			}
		}, "\"", e, "\""), n < t.length - 2 && s, n === t.length - 2 && l);
	}), d && It.createElement("span", null, d)));
}
var Ra = {
	async: !1,
	breaks: !1,
	extensions: null,
	gfm: !0,
	hooks: null,
	pedantic: !1,
	renderer: null,
	silent: !1,
	tokenizer: null,
	walkTokens: null
};
function Ma(e) {
	Ra = e;
}
var Za = { exec: function() {
	return null;
} };
function La(e) {
	var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", n = "string" == typeof e ? e : e.source, r = {
		replace: function(e, t) {
			var u = "string" == typeof t ? t : t.source;
			return u = u.replace(qa.caret, "$1"), n = n.replace(e, u), r;
		},
		getRegex: function() {
			return new RegExp(n, t);
		}
	};
	return r;
}
var $a = function() {
	try {
		return true;
	} catch (e) {
		return !1;
	}
}(), qa = {
	codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
	outputLinkReplace: /\\([\[\]])/g,
	indentCodeCompensation: /^(\s+)(?:```)/,
	beginningSpace: /^\s+/,
	endingHash: /#$/,
	startingSpaceChar: /^ /,
	endingSpaceChar: / $/,
	nonSpaceChar: /[^ ]/,
	newLineCharGlobal: /\n/g,
	tabCharGlobal: /\t/g,
	multipleSpaceGlobal: /\s+/g,
	blankLine: /^[ \t]*$/,
	doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
	blockquoteStart: /^ {0,3}>/,
	blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
	blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
	listReplaceTabs: /^\t+/,
	listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
	listIsTask: /^\[[ xX]\] /,
	listReplaceTask: /^\[[ xX]\] +/,
	anyLine: /\n.*\n/,
	hrefBrackets: /^<(.*)>$/,
	tableDelimiter: /[:|]/,
	tableAlignChars: /^\||\| *$/g,
	tableRowBlankLine: /\n[ \t]*$/,
	tableAlignRight: /^ *-+: *$/,
	tableAlignCenter: /^ *:-+: *$/,
	tableAlignLeft: /^ *:-+ *$/,
	startATag: /^<a /i,
	endATag: /^<\/a>/i,
	startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
	endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
	startAngleBracket: /^</,
	endAngleBracket: />$/,
	pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
	unicodeAlphaNumeric: /(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088F\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5C\u0C5D\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDC-\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7DC\uA7F1-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD40-\uDD59\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDD40-\uDD65\uDD6F-\uDD85\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC7\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDF70-\uDF81\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDED0-\uDEE3\uDF00-\uDF1A\uDF30-\uDF3B\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0\uDFF0-\uDFF9]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDDB0-\uDDDB\uDDE0-\uDDE9\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDF50-\uDF59\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD822\uD840-\uD868\uD86A-\uD86D\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD88C][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D\uDD30-\uDD39]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDD70-\uDD79\uDE40-\uDE96\uDEA0-\uDEB8\uDEBB-\uDED3\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3\uDFF2-\uDFF6]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD1E\uDD80-\uDDF2]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD833[\uDCF0-\uDCF9]|\uD834[\uDEC0-\uDED3\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD839[\uDCD0-\uDCEB\uDCF0-\uDCF9\uDDD0-\uDDED\uDDF0-\uDDFA\uDEC0-\uDEDE\uDEE0-\uDEE2\uDEE4\uDEE5\uDEE7-\uDEED\uDEF0-\uDEF4\uDEFE\uDEFF\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEAD\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD88D[\uDC00-\uDC79])/,
	escapeTest: /[&<>"']/,
	escapeReplace: /[&<>"']/g,
	escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
	escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
	unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,
	caret: /(^|[^\[])\^/g,
	percentDecode: /%25/g,
	findPipe: /\|/g,
	splitPipe: / \|/,
	slashPipe: /\\\|/g,
	carriageReturn: /\r\n|\r/g,
	spaceLine: /^ +$/gm,
	notSpaceStart: /^\S*/,
	endingNewline: /\n$/,
	listItemRegex: function(e) {
		return new RegExp("^( {0,3}".concat(e, ")((?:[	 ][^\\n]*)?(?:\\n|$))"));
	},
	nextBulletRegex: function(e) {
		return new RegExp("^ {0,".concat(Math.min(3, e - 1), "}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))"));
	},
	hrRegex: function(e) {
		return new RegExp("^ {0,".concat(Math.min(3, e - 1), "}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)"));
	},
	fencesBeginRegex: function(e) {
		return new RegExp("^ {0,".concat(Math.min(3, e - 1), "}(?:```|~~~)"));
	},
	headingBeginRegex: function(e) {
		return new RegExp("^ {0,".concat(Math.min(3, e - 1), "}#"));
	},
	htmlBeginRegex: function(e) {
		return new RegExp("^ {0,".concat(Math.min(3, e - 1), "}<(?:[a-z].*>|!--)"), "i");
	}
}, Ua = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Ha = /(?:[*+-]|\d{1,9}[.)])/, Va = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, Wa = La(Va).replace(/bull/g, Ha).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Ka = La(Va).replace(/bull/g, Ha).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), Ja = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Qa = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, Ga = La(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Qa).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Ya = La(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, Ha).getRegex(), Xa = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", ei = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, ti = La("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", ei).replace("tag", Xa).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), ni = La(Ja).replace("hr", Ua).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Xa).getRegex(), ri = {
	blockquote: La(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", ni).getRegex(),
	code: /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,
	def: Ga,
	fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
	heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
	hr: Ua,
	html: ti,
	lheading: Wa,
	list: Ya,
	newline: /^(?:[ \t]*(?:\n|$))+/,
	paragraph: ni,
	table: Za,
	text: /^[^\n]+/
}, ui = La("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Ua).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Xa).getRegex(), ai = pn(pn({}, ri), {}, {
	lheading: Ka,
	table: ui,
	paragraph: La(Ja).replace("hr", Ua).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", ui).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Xa).getRegex()
}), ii = pn(pn({}, ri), {}, {
	html: La("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", ei).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
	def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
	heading: /^(#{1,6})(.*)(?:\n+|$)/,
	fences: Za,
	lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
	paragraph: La(Ja).replace("hr", Ua).replace("heading", " *#{1,6} *[^\n]").replace("lheading", Wa).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}), oi = /^( {2,}|\\)\n(?!\s*$)/, si = /(?:[!-\/:-@\[-`\{-~\xA1-\xA9\xAB\xAC\xAE-\xB1\xB4\xB6-\xB8\xBB\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u037E\u0384\u0385\u0387\u03F6\u0482\u055A-\u055F\u0589\u058A\u058D-\u058F\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0606-\u060F\u061B\u061D-\u061F\u066A-\u066D\u06D4\u06DE\u06E9\u06FD\u06FE\u0700-\u070D\u07F6-\u07F9\u07FE\u07FF\u0830-\u083E\u085E\u0888\u0964\u0965\u0970\u09F2\u09F3\u09FA\u09FB\u09FD\u0A76\u0AF0\u0AF1\u0B70\u0BF3-\u0BFA\u0C77\u0C7F\u0C84\u0D4F\u0D79\u0DF4\u0E3F\u0E4F\u0E5A\u0E5B\u0F01-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0F3A-\u0F3D\u0F85\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE-\u0FDA\u104A-\u104F\u109E\u109F\u10FB\u1360-\u1368\u1390-\u1399\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DB\u1800-\u180A\u1940\u1944\u1945\u19DE-\u19FF\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B4E\u1B4F\u1B5A-\u1B6A\u1B74-\u1B7F\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2010-\u2027\u2030-\u205E\u207A-\u207E\u208A-\u208E\u20A0-\u20C1\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2429\u2440-\u244A\u249C-\u24E9\u2500-\u2775\u2794-\u2B73\u2B76-\u2BFF\u2CE5-\u2CEA\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E5D\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3001-\u3004\u3008-\u3020\u3030\u3036\u3037\u303D-\u303F\u309B\u309C\u30A0\u30FB\u3190\u3191\u3196-\u319F\u31C0-\u31E5\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAA77-\uAA79\uAADE\uAADF\uAAF0\uAAF1\uAB5B\uAB6A\uAB6B\uABEB\uFB29\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDCF\uFDFC-\uFDFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFF01-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF40\uFF5B-\uFF65\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD00-\uDD02\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDC77\uDC78\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEC8\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDD6E\uDD8E\uDD8F\uDEAD\uDED0-\uDED8\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9\uDFD4\uDFD5\uDFD7\uDFD8]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3F]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09\uDFE1]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFD5-\uDFF1\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3F\uDF44\uDF45]|\uD81B[\uDD6D-\uDD6F\uDE97-\uDE9A\uDFE2]|\uD82F[\uDC9C\uDC9F]|\uD833[\uDC00-\uDCEF\uDCFA-\uDCFC\uDD00-\uDEB3\uDEBA-\uDED0\uDEE0-\uDEF0\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85-\uDE8B]|\uD838[\uDD4F\uDEFF]|\uD839\uDDFF|\uD83A[\uDD5E\uDD5F]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED8\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0-\uDCBB\uDCC0\uDCC1\uDCD0-\uDCD8\uDD00-\uDE57\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF-\uDEF8\uDF00-\uDF92\uDF94-\uDFEF\uDFFA])/, ci = /(?:[\t-\r -\/:-@\[-`\{-~\xA0-\xA9\xAB\xAC\xAE-\xB1\xB4\xB6-\xB8\xBB\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u037E\u0384\u0385\u0387\u03F6\u0482\u055A-\u055F\u0589\u058A\u058D-\u058F\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0606-\u060F\u061B\u061D-\u061F\u066A-\u066D\u06D4\u06DE\u06E9\u06FD\u06FE\u0700-\u070D\u07F6-\u07F9\u07FE\u07FF\u0830-\u083E\u085E\u0888\u0964\u0965\u0970\u09F2\u09F3\u09FA\u09FB\u09FD\u0A76\u0AF0\u0AF1\u0B70\u0BF3-\u0BFA\u0C77\u0C7F\u0C84\u0D4F\u0D79\u0DF4\u0E3F\u0E4F\u0E5A\u0E5B\u0F01-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0F3A-\u0F3D\u0F85\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE-\u0FDA\u104A-\u104F\u109E\u109F\u10FB\u1360-\u1368\u1390-\u1399\u1400\u166D\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DB\u1800-\u180A\u1940\u1944\u1945\u19DE-\u19FF\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B4E\u1B4F\u1B5A-\u1B6A\u1B74-\u1B7F\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2000-\u200A\u2010-\u2029\u202F-\u205F\u207A-\u207E\u208A-\u208E\u20A0-\u20C1\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2429\u2440-\u244A\u249C-\u24E9\u2500-\u2775\u2794-\u2B73\u2B76-\u2BFF\u2CE5-\u2CEA\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E5D\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u3004\u3008-\u3020\u3030\u3036\u3037\u303D-\u303F\u309B\u309C\u30A0\u30FB\u3190\u3191\u3196-\u319F\u31C0-\u31E5\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAA77-\uAA79\uAADE\uAADF\uAAF0\uAAF1\uAB5B\uAB6A\uAB6B\uABEB\uFB29\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDCF\uFDFC-\uFDFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFEFF\uFF01-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF40\uFF5B-\uFF65\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD00-\uDD02\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDC77\uDC78\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEC8\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDD6E\uDD8E\uDD8F\uDEAD\uDED0-\uDED8\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9\uDFD4\uDFD5\uDFD7\uDFD8]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3F]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09\uDFE1]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFD5-\uDFF1\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3F\uDF44\uDF45]|\uD81B[\uDD6D-\uDD6F\uDE97-\uDE9A\uDFE2]|\uD82F[\uDC9C\uDC9F]|\uD833[\uDC00-\uDCEF\uDCFA-\uDCFC\uDD00-\uDEB3\uDEBA-\uDED0\uDEE0-\uDEF0\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85-\uDE8B]|\uD838[\uDD4F\uDEFF]|\uD839\uDDFF|\uD83A[\uDD5E\uDD5F]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED8\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0-\uDCBB\uDCC0\uDCC1\uDCD0-\uDCD8\uDD00-\uDE57\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF-\uDEF8\uDF00-\uDF92\uDF94-\uDFEF\uDFFA])/, li = /(?:[\0-\x08\x0E-\x1F0-9A-Za-z\x7F-\x9F\xAA\xAD\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376-\u037D\u037F-\u0383\u0386\u0388-\u03F5\u03F7-\u0481\u0483-\u0559\u0560-\u0588\u058B\u058C\u0590-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7-\u05F2\u05F5-\u0605\u0610-\u061A\u061C\u0620-\u0669\u066E-\u06D3\u06D5-\u06DD\u06DF-\u06E8\u06EA-\u06FC\u06FF\u070E-\u07F5\u07FA-\u07FD\u0800-\u082F\u083F-\u085D\u085F-\u0887\u0889-\u0963\u0966-\u096F\u0971-\u09F1\u09F4-\u09F9\u09FC\u09FE-\u0A75\u0A77-\u0AEF\u0AF2-\u0B6F\u0B71-\u0BF2\u0BFB-\u0C76\u0C78-\u0C7E\u0C80-\u0C83\u0C85-\u0D4E\u0D50-\u0D78\u0D7A-\u0DF3\u0DF5-\u0E3E\u0E40-\u0E4E\u0E50-\u0E59\u0E5C-\u0F00\u0F18\u0F19\u0F20-\u0F33\u0F35\u0F37\u0F39\u0F3E-\u0F84\u0F86-\u0FBD\u0FC6\u0FCD\u0FDB-\u1049\u1050-\u109D\u10A0-\u10FA\u10FC-\u135F\u1369-\u138F\u139A-\u13FF\u1401-\u166C\u166F-\u167F\u1681-\u169A\u169D-\u16EA\u16EE-\u1734\u1737-\u17D3\u17D7\u17DC-\u17FF\u180B-\u193F\u1941-\u1943\u1946-\u19DD\u1A00-\u1A1D\u1A20-\u1A9F\u1AA7\u1AAE-\u1B4D\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BFB\u1C00-\u1C3A\u1C40-\u1C7D\u1C80-\u1CBF\u1CC8-\u1CD2\u1CD4-\u1FBC\u1FBE\u1FC2-\u1FCC\u1FD0-\u1FDC\u1FE0-\u1FEC\u1FF0-\u1FFC\u1FFF\u200B-\u200F\u202A-\u202E\u2060-\u2079\u207F-\u2089\u208F-\u209F\u20C2-\u20FF\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u218C-\u218F\u242A-\u243F\u244B-\u249B\u24EA-\u24FF\u2776-\u2793\u2B74\u2B75\u2C00-\u2CE4\u2CEB-\u2CF8\u2CFD\u2D00-\u2D6F\u2D71-\u2DFF\u2E2F\u2E5E-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3040-\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u318F\u3192-\u3195\u31A0-\u31BF\u31E6-\u31EE\u31F0-\u31FF\u321F-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\uA48F\uA4C7-\uA4FD\uA500-\uA60C\uA610-\uA672\uA674-\uA67D\uA67F-\uA6F1\uA6F8-\uA6FF\uA717-\uA71F\uA722-\uA788\uA78B-\uA827\uA82C-\uA835\uA83A-\uA873\uA878-\uA8CD\uA8D0-\uA8F7\uA8FB\uA8FD-\uA92D\uA930-\uA95E\uA960-\uA9C0\uA9CE-\uA9DD\uA9E0-\uAA5B\uAA60-\uAA76\uAA7A-\uAADD\uAAE0-\uAAEF\uAAF2-\uAB5A\uAB5C-\uAB69\uAB6C-\uABEA\uABEC-\uD7FF\uE000-\uFB28\uFB2A-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDD0-\uFDFB\uFE00-\uFE0F\uFE1A-\uFE2F\uFE53\uFE67\uFE6C-\uFEFE\uFF00\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFDF\uFFE7\uFFEF-\uFFFB\uFFFE\uFFFF]|\uD800[\uDC00-\uDCFF\uDD03-\uDD36\uDD40-\uDD78\uDD8A\uDD8B\uDD8F\uDD9D-\uDD9F\uDDA1-\uDDCF\uDDFD-\uDF9E\uDFA0-\uDFCF\uDFD1-\uDFFF]|\uD801[\uDC00-\uDD6E\uDD70-\uDFFF]|\uD802[\uDC00-\uDC56\uDC58-\uDC76\uDC79-\uDD1E\uDD20-\uDD3E\uDD40-\uDE4F\uDE59-\uDE7E\uDE80-\uDEC7\uDEC9-\uDEEF\uDEF7-\uDF38\uDF40-\uDF98\uDF9D-\uDFFF]|\uD803[\uDC00-\uDD6D\uDD6F-\uDD8D\uDD90-\uDEAC\uDEAE-\uDECF\uDED9-\uDF54\uDF5A-\uDF85\uDF8A-\uDFFF]|\uD804[\uDC00-\uDC46\uDC4E-\uDCBA\uDCBD\uDCC2-\uDD3F\uDD44-\uDD73\uDD76-\uDDC4\uDDC9-\uDDCC\uDDCE-\uDDDA\uDDDC\uDDE0-\uDE37\uDE3E-\uDEA8\uDEAA-\uDFD3\uDFD6\uDFD9-\uDFFF]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC5C\uDC5E-\uDCC5\uDCC7-\uDDC0\uDDD8-\uDE40\uDE44-\uDE5F\uDE6D-\uDEB8\uDEBA-\uDF3B\uDF40-\uDFFF]|\uD806[\uDC00-\uDC3A\uDC3C-\uDD43\uDD47-\uDDE1\uDDE3-\uDE3E\uDE47-\uDE99\uDE9D\uDEA3-\uDEFF\uDF0A-\uDFE0\uDFE2-\uDFFF]|\uD807[\uDC00-\uDC40\uDC46-\uDC6F\uDC72-\uDEF6\uDEF9-\uDF42\uDF50-\uDFD4\uDFF2-\uDFFE]|[\uD808\uD80A\uD80C-\uD819\uD81C-\uD82E\uD830-\uD832\uD837\uD83F-\uDBFF][\uDC00-\uDFFF]|\uD809[\uDC00-\uDC6F\uDC75-\uDFFF]|\uD80B[\uDC00-\uDFF0\uDFF3-\uDFFF]|\uD81A[\uDC00-\uDE6D\uDE70-\uDEF4\uDEF6-\uDF36\uDF40-\uDF43\uDF46-\uDFFF]|\uD81B[\uDC00-\uDD6C\uDD70-\uDE96\uDE9B-\uDFE1\uDFE3-\uDFFF]|\uD82F[\uDC00-\uDC9B\uDC9D\uDC9E\uDCA0-\uDFFF]|\uD833[\uDCF0-\uDCF9\uDCFD-\uDCFF\uDEB4-\uDEB9\uDED1-\uDEDF\uDEF1-\uDF4F\uDFC4-\uDFFF]|\uD834[\uDCF6-\uDCFF\uDD27\uDD28\uDD65-\uDD69\uDD6D-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDDEB-\uDDFF\uDE42-\uDE44\uDE46-\uDEFF\uDF57-\uDFFF]|\uD835[\uDC00-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE8C-\uDFFF]|\uD838[\uDC00-\uDD4E\uDD50-\uDEFE\uDF00-\uDFFF]|\uD839[\uDC00-\uDDFE\uDE00-\uDFFF]|\uD83A[\uDC00-\uDD5D\uDD60-\uDFFF]|\uD83B[\uDC00-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDD2D\uDD2F-\uDEEF\uDEF2-\uDFFF]|\uD83C[\uDC2C-\uDC2F\uDC94-\uDC9F\uDCAF\uDCB0\uDCC0\uDCD0\uDCF6-\uDD0C\uDDAE-\uDDE5\uDE03-\uDE0F\uDE3C-\uDE3F\uDE49-\uDE4F\uDE52-\uDE5F\uDE66-\uDEFF]|\uD83D[\uDED9-\uDEDB\uDEED-\uDEEF\uDEFD-\uDEFF\uDFDA-\uDFDF\uDFEC-\uDFEF\uDFF1-\uDFFF]|\uD83E[\uDC0C-\uDC0F\uDC48-\uDC4F\uDC5A-\uDC5F\uDC88-\uDC8F\uDCAE\uDCAF\uDCBC-\uDCBF\uDCC2-\uDCCF\uDCD9-\uDCFF\uDE58-\uDE5F\uDE6E\uDE6F\uDE7D-\uDE7F\uDE8B-\uDE8D\uDEC7\uDEC9-\uDECC\uDEDD\uDEDE\uDEEB-\uDEEE\uDEF9-\uDEFF\uDF93\uDFF0-\uDFF9\uDFFB-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/, fi = La(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, ci).getRegex(), di = /(?!~)(?:[!-\/:-@\[-`\{-~\xA1-\xA9\xAB\xAC\xAE-\xB1\xB4\xB6-\xB8\xBB\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u037E\u0384\u0385\u0387\u03F6\u0482\u055A-\u055F\u0589\u058A\u058D-\u058F\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0606-\u060F\u061B\u061D-\u061F\u066A-\u066D\u06D4\u06DE\u06E9\u06FD\u06FE\u0700-\u070D\u07F6-\u07F9\u07FE\u07FF\u0830-\u083E\u085E\u0888\u0964\u0965\u0970\u09F2\u09F3\u09FA\u09FB\u09FD\u0A76\u0AF0\u0AF1\u0B70\u0BF3-\u0BFA\u0C77\u0C7F\u0C84\u0D4F\u0D79\u0DF4\u0E3F\u0E4F\u0E5A\u0E5B\u0F01-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0F3A-\u0F3D\u0F85\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE-\u0FDA\u104A-\u104F\u109E\u109F\u10FB\u1360-\u1368\u1390-\u1399\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DB\u1800-\u180A\u1940\u1944\u1945\u19DE-\u19FF\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B4E\u1B4F\u1B5A-\u1B6A\u1B74-\u1B7F\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2010-\u2027\u2030-\u205E\u207A-\u207E\u208A-\u208E\u20A0-\u20C1\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2429\u2440-\u244A\u249C-\u24E9\u2500-\u2775\u2794-\u2B73\u2B76-\u2BFF\u2CE5-\u2CEA\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E5D\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3001-\u3004\u3008-\u3020\u3030\u3036\u3037\u303D-\u303F\u309B\u309C\u30A0\u30FB\u3190\u3191\u3196-\u319F\u31C0-\u31E5\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAA77-\uAA79\uAADE\uAADF\uAAF0\uAAF1\uAB5B\uAB6A\uAB6B\uABEB\uFB29\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDCF\uFDFC-\uFDFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFF01-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF40\uFF5B-\uFF65\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD00-\uDD02\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDC77\uDC78\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEC8\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDD6E\uDD8E\uDD8F\uDEAD\uDED0-\uDED8\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9\uDFD4\uDFD5\uDFD7\uDFD8]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3F]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09\uDFE1]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFD5-\uDFF1\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3F\uDF44\uDF45]|\uD81B[\uDD6D-\uDD6F\uDE97-\uDE9A\uDFE2]|\uD82F[\uDC9C\uDC9F]|\uD833[\uDC00-\uDCEF\uDCFA-\uDCFC\uDD00-\uDEB3\uDEBA-\uDED0\uDEE0-\uDEF0\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85-\uDE8B]|\uD838[\uDD4F\uDEFF]|\uD839\uDDFF|\uD83A[\uDD5E\uDD5F]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED8\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0-\uDCBB\uDCC0\uDCC1\uDCD0-\uDCD8\uDD00-\uDE57\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF-\uDEF8\uDF00-\uDF92\uDF94-\uDFEF\uDFFA])/, pi = La(/link|precode-code|html/, "g").replace("link", kn(/\[(?:[^\[\]`]|(`+)[^`]+\1(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/, { a: 1 })).replace("precode-", $a ? "(?<!`)()" : "(^^|[^`])").replace("code", kn(/(`+)[^`]+\1(?!`)/, { b: 1 })).replace("html", /<(?! )[^<>]*?>/).getRegex(), hi = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, vi = La(hi, "u").replace(/punct/g, si).getRegex(), mi = La(hi, "u").replace(/punct/g, di).getRegex(), Di = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", yi = La(Di, "gu").replace(/notPunctSpace/g, li).replace(/punctSpace/g, ci).replace(/punct/g, si).getRegex(), gi = La(Di, "gu").replace(/notPunctSpace/g, /(?:(?:[\0-\x08\x0E-\x1F0-9A-Za-z\x7F-\x9F\xAA\xAD\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376-\u037D\u037F-\u0383\u0386\u0388-\u03F5\u03F7-\u0481\u0483-\u0559\u0560-\u0588\u058B\u058C\u0590-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7-\u05F2\u05F5-\u0605\u0610-\u061A\u061C\u0620-\u0669\u066E-\u06D3\u06D5-\u06DD\u06DF-\u06E8\u06EA-\u06FC\u06FF\u070E-\u07F5\u07FA-\u07FD\u0800-\u082F\u083F-\u085D\u085F-\u0887\u0889-\u0963\u0966-\u096F\u0971-\u09F1\u09F4-\u09F9\u09FC\u09FE-\u0A75\u0A77-\u0AEF\u0AF2-\u0B6F\u0B71-\u0BF2\u0BFB-\u0C76\u0C78-\u0C7E\u0C80-\u0C83\u0C85-\u0D4E\u0D50-\u0D78\u0D7A-\u0DF3\u0DF5-\u0E3E\u0E40-\u0E4E\u0E50-\u0E59\u0E5C-\u0F00\u0F18\u0F19\u0F20-\u0F33\u0F35\u0F37\u0F39\u0F3E-\u0F84\u0F86-\u0FBD\u0FC6\u0FCD\u0FDB-\u1049\u1050-\u109D\u10A0-\u10FA\u10FC-\u135F\u1369-\u138F\u139A-\u13FF\u1401-\u166C\u166F-\u167F\u1681-\u169A\u169D-\u16EA\u16EE-\u1734\u1737-\u17D3\u17D7\u17DC-\u17FF\u180B-\u193F\u1941-\u1943\u1946-\u19DD\u1A00-\u1A1D\u1A20-\u1A9F\u1AA7\u1AAE-\u1B4D\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BFB\u1C00-\u1C3A\u1C40-\u1C7D\u1C80-\u1CBF\u1CC8-\u1CD2\u1CD4-\u1FBC\u1FBE\u1FC2-\u1FCC\u1FD0-\u1FDC\u1FE0-\u1FEC\u1FF0-\u1FFC\u1FFF\u200B-\u200F\u202A-\u202E\u2060-\u2079\u207F-\u2089\u208F-\u209F\u20C2-\u20FF\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u218C-\u218F\u242A-\u243F\u244B-\u249B\u24EA-\u24FF\u2776-\u2793\u2B74\u2B75\u2C00-\u2CE4\u2CEB-\u2CF8\u2CFD\u2D00-\u2D6F\u2D71-\u2DFF\u2E2F\u2E5E-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3040-\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u318F\u3192-\u3195\u31A0-\u31BF\u31E6-\u31EE\u31F0-\u31FF\u321F-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\uA48F\uA4C7-\uA4FD\uA500-\uA60C\uA610-\uA672\uA674-\uA67D\uA67F-\uA6F1\uA6F8-\uA6FF\uA717-\uA71F\uA722-\uA788\uA78B-\uA827\uA82C-\uA835\uA83A-\uA873\uA878-\uA8CD\uA8D0-\uA8F7\uA8FB\uA8FD-\uA92D\uA930-\uA95E\uA960-\uA9C0\uA9CE-\uA9DD\uA9E0-\uAA5B\uAA60-\uAA76\uAA7A-\uAADD\uAAE0-\uAAEF\uAAF2-\uAB5A\uAB5C-\uAB69\uAB6C-\uABEA\uABEC-\uD7FF\uE000-\uFB28\uFB2A-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDD0-\uFDFB\uFE00-\uFE0F\uFE1A-\uFE2F\uFE53\uFE67\uFE6C-\uFEFE\uFF00\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFDF\uFFE7\uFFEF-\uFFFB\uFFFE\uFFFF]|\uD800[\uDC00-\uDCFF\uDD03-\uDD36\uDD40-\uDD78\uDD8A\uDD8B\uDD8F\uDD9D-\uDD9F\uDDA1-\uDDCF\uDDFD-\uDF9E\uDFA0-\uDFCF\uDFD1-\uDFFF]|\uD801[\uDC00-\uDD6E\uDD70-\uDFFF]|\uD802[\uDC00-\uDC56\uDC58-\uDC76\uDC79-\uDD1E\uDD20-\uDD3E\uDD40-\uDE4F\uDE59-\uDE7E\uDE80-\uDEC7\uDEC9-\uDEEF\uDEF7-\uDF38\uDF40-\uDF98\uDF9D-\uDFFF]|\uD803[\uDC00-\uDD6D\uDD6F-\uDD8D\uDD90-\uDEAC\uDEAE-\uDECF\uDED9-\uDF54\uDF5A-\uDF85\uDF8A-\uDFFF]|\uD804[\uDC00-\uDC46\uDC4E-\uDCBA\uDCBD\uDCC2-\uDD3F\uDD44-\uDD73\uDD76-\uDDC4\uDDC9-\uDDCC\uDDCE-\uDDDA\uDDDC\uDDE0-\uDE37\uDE3E-\uDEA8\uDEAA-\uDFD3\uDFD6\uDFD9-\uDFFF]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC5C\uDC5E-\uDCC5\uDCC7-\uDDC0\uDDD8-\uDE40\uDE44-\uDE5F\uDE6D-\uDEB8\uDEBA-\uDF3B\uDF40-\uDFFF]|\uD806[\uDC00-\uDC3A\uDC3C-\uDD43\uDD47-\uDDE1\uDDE3-\uDE3E\uDE47-\uDE99\uDE9D\uDEA3-\uDEFF\uDF0A-\uDFE0\uDFE2-\uDFFF]|\uD807[\uDC00-\uDC40\uDC46-\uDC6F\uDC72-\uDEF6\uDEF9-\uDF42\uDF50-\uDFD4\uDFF2-\uDFFE]|[\uD808\uD80A\uD80C-\uD819\uD81C-\uD82E\uD830-\uD832\uD837\uD83F-\uDBFF][\uDC00-\uDFFF]|\uD809[\uDC00-\uDC6F\uDC75-\uDFFF]|\uD80B[\uDC00-\uDFF0\uDFF3-\uDFFF]|\uD81A[\uDC00-\uDE6D\uDE70-\uDEF4\uDEF6-\uDF36\uDF40-\uDF43\uDF46-\uDFFF]|\uD81B[\uDC00-\uDD6C\uDD70-\uDE96\uDE9B-\uDFE1\uDFE3-\uDFFF]|\uD82F[\uDC00-\uDC9B\uDC9D\uDC9E\uDCA0-\uDFFF]|\uD833[\uDCF0-\uDCF9\uDCFD-\uDCFF\uDEB4-\uDEB9\uDED1-\uDEDF\uDEF1-\uDF4F\uDFC4-\uDFFF]|\uD834[\uDCF6-\uDCFF\uDD27\uDD28\uDD65-\uDD69\uDD6D-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDDEB-\uDDFF\uDE42-\uDE44\uDE46-\uDEFF\uDF57-\uDFFF]|\uD835[\uDC00-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE8C-\uDFFF]|\uD838[\uDC00-\uDD4E\uDD50-\uDEFE\uDF00-\uDFFF]|\uD839[\uDC00-\uDDFE\uDE00-\uDFFF]|\uD83A[\uDC00-\uDD5D\uDD60-\uDFFF]|\uD83B[\uDC00-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDD2D\uDD2F-\uDEEF\uDEF2-\uDFFF]|\uD83C[\uDC2C-\uDC2F\uDC94-\uDC9F\uDCAF\uDCB0\uDCC0\uDCD0\uDCF6-\uDD0C\uDDAE-\uDDE5\uDE03-\uDE0F\uDE3C-\uDE3F\uDE49-\uDE4F\uDE52-\uDE5F\uDE66-\uDEFF]|\uD83D[\uDED9-\uDEDB\uDEED-\uDEEF\uDEFD-\uDEFF\uDFDA-\uDFDF\uDFEC-\uDFEF\uDFF1-\uDFFF]|\uD83E[\uDC0C-\uDC0F\uDC48-\uDC4F\uDC5A-\uDC5F\uDC88-\uDC8F\uDCAE\uDCAF\uDCBC-\uDCBF\uDCC2-\uDCCF\uDCD9-\uDCFF\uDE58-\uDE5F\uDE6E\uDE6F\uDE7D-\uDE7F\uDE8B-\uDE8D\uDEC7\uDEC9-\uDECC\uDEDD\uDEDE\uDEEB-\uDEEE\uDEF9-\uDEFF\uDF93\uDFF0-\uDFF9\uDFFB-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])|~)/).replace(/punctSpace/g, /(?!~)(?:[\t-\r -\/:-@\[-`\{-~\xA0-\xA9\xAB\xAC\xAE-\xB1\xB4\xB6-\xB8\xBB\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u037E\u0384\u0385\u0387\u03F6\u0482\u055A-\u055F\u0589\u058A\u058D-\u058F\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0606-\u060F\u061B\u061D-\u061F\u066A-\u066D\u06D4\u06DE\u06E9\u06FD\u06FE\u0700-\u070D\u07F6-\u07F9\u07FE\u07FF\u0830-\u083E\u085E\u0888\u0964\u0965\u0970\u09F2\u09F3\u09FA\u09FB\u09FD\u0A76\u0AF0\u0AF1\u0B70\u0BF3-\u0BFA\u0C77\u0C7F\u0C84\u0D4F\u0D79\u0DF4\u0E3F\u0E4F\u0E5A\u0E5B\u0F01-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0F3A-\u0F3D\u0F85\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE-\u0FDA\u104A-\u104F\u109E\u109F\u10FB\u1360-\u1368\u1390-\u1399\u1400\u166D\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DB\u1800-\u180A\u1940\u1944\u1945\u19DE-\u19FF\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B4E\u1B4F\u1B5A-\u1B6A\u1B74-\u1B7F\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2000-\u200A\u2010-\u2029\u202F-\u205F\u207A-\u207E\u208A-\u208E\u20A0-\u20C1\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2429\u2440-\u244A\u249C-\u24E9\u2500-\u2775\u2794-\u2B73\u2B76-\u2BFF\u2CE5-\u2CEA\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E5D\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u3004\u3008-\u3020\u3030\u3036\u3037\u303D-\u303F\u309B\u309C\u30A0\u30FB\u3190\u3191\u3196-\u319F\u31C0-\u31E5\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAA77-\uAA79\uAADE\uAADF\uAAF0\uAAF1\uAB5B\uAB6A\uAB6B\uABEB\uFB29\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDCF\uFDFC-\uFDFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFEFF\uFF01-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF40\uFF5B-\uFF65\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD00-\uDD02\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDC77\uDC78\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEC8\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDD6E\uDD8E\uDD8F\uDEAD\uDED0-\uDED8\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9\uDFD4\uDFD5\uDFD7\uDFD8]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3F]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09\uDFE1]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFD5-\uDFF1\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3F\uDF44\uDF45]|\uD81B[\uDD6D-\uDD6F\uDE97-\uDE9A\uDFE2]|\uD82F[\uDC9C\uDC9F]|\uD833[\uDC00-\uDCEF\uDCFA-\uDCFC\uDD00-\uDEB3\uDEBA-\uDED0\uDEE0-\uDEF0\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85-\uDE8B]|\uD838[\uDD4F\uDEFF]|\uD839\uDDFF|\uD83A[\uDD5E\uDD5F]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED8\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0-\uDCBB\uDCC0\uDCC1\uDCD0-\uDCD8\uDD00-\uDE57\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF-\uDEF8\uDF00-\uDF92\uDF94-\uDFEF\uDFFA])/).replace(/punct/g, di).getRegex(), Fi = La("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, li).replace(/punctSpace/g, ci).replace(/punct/g, si).getRegex(), Ei = La(/\\(punct)/, "gu").replace(/punct/g, si).getRegex(), bi = La(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), _i = La(ei).replace("(?:-->|$)", "-->").getRegex(), ki = La("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", _i).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Ci = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, Ai = La(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", Ci).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), wi = La(/^!?\[(label)\]\[(ref)\]/).replace("label", Ci).replace("ref", Qa).getRegex(), Si = La(/^!?\[(ref)\](?:\[\])?/).replace("ref", Qa).getRegex(), xi = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, Oi = {
	_backpedal: Za,
	anyPunctuation: Ei,
	autolink: bi,
	blockSkip: pi,
	br: oi,
	code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
	del: Za,
	emStrongLDelim: vi,
	emStrongRDelimAst: yi,
	emStrongRDelimUnd: Fi,
	escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
	link: Ai,
	nolink: Si,
	punctuation: fi,
	reflink: wi,
	reflinkSearch: La("reflink|nolink(?!\\()", "g").replace("reflink", wi).replace("nolink", Si).getRegex(),
	tag: ki,
	text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
	url: Za
}, Bi = pn(pn({}, Oi), {}, {
	link: La(/^!?\[(label)\]\((.*?)\)/).replace("label", Ci).getRegex(),
	reflink: La(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Ci).getRegex()
}), Ii = pn(pn({}, Oi), {}, {
	emStrongRDelimAst: gi,
	emStrongLDelim: mi,
	url: La(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", xi).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
	_backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
	del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,
	text: La(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", xi).getRegex()
}), Ti = pn(pn({}, Ii), {}, {
	br: La(oi).replace("{2,}", "*").getRegex(),
	text: La(Ii.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}), Pi = {
	normal: ri,
	gfm: ai,
	pedantic: ii
}, ji = {
	normal: Oi,
	gfm: Ii,
	breaks: Ti,
	pedantic: Bi
}, Ni = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
}, zi = function(e) {
	return Ni[e];
};
function Ri(e, t) {
	if (t) {
		if (qa.escapeTest.test(e)) return e.replace(qa.escapeReplace, zi);
	} else if (qa.escapeTestNoEncode.test(e)) return e.replace(qa.escapeReplaceNoEncode, zi);
	return e;
}
function Mi(e) {
	try {
		e = encodeURI(e).replace(qa.percentDecode, "%");
	} catch (e) {
		return null;
	}
	return e;
}
function Zi(e, t) {
	var n, r = e.replace(qa.findPipe, function(e, t, n) {
		for (var r = !1, u = t; --u >= 0 && "\\" === n[u];) r = !r;
		return r ? "|" : " |";
	}).split(qa.splitPipe), u = 0;
	if (r[0].trim() || r.shift(), r.length > 0 && !(null !== (n = r.at(-1)) && void 0 !== n && n.trim()) && r.pop(), t) if (r.length > t) r.splice(t);
	else for (; r.length < t;) r.push("");
	for (; u < r.length; u++) r[u] = r[u].trim().replace(qa.slashPipe, "|");
	return r;
}
function Li(e, t, n) {
	var r = e.length;
	if (0 === r) return "";
	for (var u = 0; u < r && e.charAt(r - u - 1) === t;) u++;
	return e.slice(0, r - u);
}
function $i(e, t, n, r, u) {
	var a = t.href, i = t.title || null, o = e[1].replace(u.other.outputLinkReplace, "$1");
	r.state.inLink = !0;
	var s = {
		type: "!" === e[0].charAt(0) ? "image" : "link",
		raw: n,
		href: a,
		title: i,
		text: o,
		tokens: r.inlineTokens(o)
	};
	return r.state.inLink = !1, s;
}
var qi = un(function e(t) {
	tn(this, e), on(this, "options", void 0), on(this, "rules", void 0), on(this, "lexer", void 0), this.options = t || Ra;
}, [
	{
		key: "space",
		value: function(e) {
			var t = this.rules.block.newline.exec(e);
			if (t && t[0].length > 0) return {
				type: "space",
				raw: t[0]
			};
		}
	},
	{
		key: "code",
		value: function(e) {
			var t = this.rules.block.code.exec(e);
			if (t) {
				var n = t[0].replace(this.rules.other.codeRemoveIndent, "");
				return {
					type: "code",
					raw: t[0],
					codeBlockStyle: "indented",
					text: this.options.pedantic ? n : Li(n, "\n")
				};
			}
		}
	},
	{
		key: "fences",
		value: function(e) {
			var t = this.rules.block.fences.exec(e);
			if (t) {
				var n = t[0], r = function(e, t, n) {
					var r = e.match(n.other.indentCodeCompensation);
					if (null === r) return t;
					var u = r[1];
					return t.split("\n").map(function(e) {
						var t = e.match(n.other.beginningSpace);
						return null === t ? e : yn(t, 1)[0].length >= u.length ? e.slice(u.length) : e;
					}).join("\n");
				}(n, t[3] || "", this.rules);
				return {
					type: "code",
					raw: n,
					lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
					text: r
				};
			}
		}
	},
	{
		key: "heading",
		value: function(e) {
			var t = this.rules.block.heading.exec(e);
			if (t) {
				var n = t[2].trim();
				if (this.rules.other.endingHash.test(n)) {
					var r = Li(n, "#");
					(this.options.pedantic || !r || this.rules.other.endingSpaceChar.test(r)) && (n = r.trim());
				}
				return {
					type: "heading",
					raw: t[0],
					depth: t[1].length,
					text: n,
					tokens: this.lexer.inline(n)
				};
			}
		}
	},
	{
		key: "hr",
		value: function(e) {
			var t = this.rules.block.hr.exec(e);
			if (t) return {
				type: "hr",
				raw: Li(t[0], "\n")
			};
		}
	},
	{
		key: "blockquote",
		value: function(e) {
			var t = this.rules.block.blockquote.exec(e);
			if (t) {
				for (var n = Li(t[0], "\n").split("\n"), r = "", u = "", a = []; n.length > 0;) {
					var i = !1, o = [], s = void 0;
					for (s = 0; s < n.length; s++) if (this.rules.other.blockquoteStart.test(n[s])) o.push(n[s]), i = !0;
					else {
						if (i) break;
						o.push(n[s]);
					}
					n = n.slice(s);
					var c = o.join("\n"), l = c.replace(this.rules.other.blockquoteSetextReplace, "\n    $1").replace(this.rules.other.blockquoteSetextReplace2, "");
					r = r ? "".concat(r, "\n").concat(c) : c, u = u ? "".concat(u, "\n").concat(l) : l;
					var f = this.lexer.state.top;
					if (this.lexer.state.top = !0, this.lexer.blockTokens(l, a, !0), this.lexer.state.top = f, 0 === n.length) break;
					var d = a.at(-1);
					if ("code" === (null == d ? void 0 : d.type)) break;
					if ("blockquote" === (null == d ? void 0 : d.type)) {
						var p = d, h = p.raw + "\n" + n.join("\n"), v = this.blockquote(h);
						a[a.length - 1] = v, r = r.substring(0, r.length - p.raw.length) + v.raw, u = u.substring(0, u.length - p.text.length) + v.text;
						break;
					}
					if ("list" !== (null == d ? void 0 : d.type));
					else {
						var m = d, D = m.raw + "\n" + n.join("\n"), y = this.list(D);
						a[a.length - 1] = y, r = r.substring(0, r.length - d.raw.length) + y.raw, u = u.substring(0, u.length - m.raw.length) + y.raw, n = D.substring(a.at(-1).raw.length).split("\n");
					}
				}
				return {
					type: "blockquote",
					raw: r,
					tokens: a,
					text: u
				};
			}
		}
	},
	{
		key: "list",
		value: function(e) {
			var t = this, n = this.rules.block.list.exec(e);
			if (n) {
				var r = n[1].trim(), u = r.length > 1, a = {
					type: "list",
					raw: "",
					ordered: u,
					start: u ? +r.slice(0, -1) : "",
					loose: !1,
					items: []
				};
				r = u ? "\\d{1,9}\\".concat(r.slice(-1)) : "\\".concat(r), this.options.pedantic && (r = u ? r : "[*+-]");
				for (var i = this.rules.other.listItemRegex(r), o = !1; e;) {
					var s = !1, c = "", l = "";
					if (!(n = i.exec(e)) || this.rules.block.hr.test(e)) break;
					c = n[0], e = e.substring(c.length);
					var f = n[2].split("\n", 1)[0].replace(this.rules.other.listReplaceTabs, function(e) {
						return " ".repeat(3 * e.length);
					}), d = e.split("\n", 1)[0], p = !f.trim(), h = 0;
					if (this.options.pedantic ? (h = 2, l = f.trimStart()) : p ? h = n[1].length + 1 : (h = (h = n[2].search(this.rules.other.nonSpaceChar)) > 4 ? 1 : h, l = f.slice(h), h += n[1].length), p && this.rules.other.blankLine.test(d) && (c += d + "\n", e = e.substring(d.length + 1), s = !0), !s) for (var v = this.rules.other.nextBulletRegex(h), m = this.rules.other.hrRegex(h), D = this.rules.other.fencesBeginRegex(h), y = this.rules.other.headingBeginRegex(h), g = this.rules.other.htmlBeginRegex(h); e;) {
						var F = e.split("\n", 1)[0], E = void 0;
						if (d = F, E = this.options.pedantic ? d = d.replace(this.rules.other.listReplaceNesting, "  ") : d.replace(this.rules.other.tabCharGlobal, "    "), D.test(d) || y.test(d) || g.test(d) || v.test(d) || m.test(d)) break;
						if (E.search(this.rules.other.nonSpaceChar) >= h || !d.trim()) l += "\n" + E.slice(h);
						else {
							if (p || f.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || D.test(f) || y.test(f) || m.test(f)) break;
							l += "\n" + d;
						}
						!p && !d.trim() && (p = !0), c += F + "\n", e = e.substring(F.length + 1), f = E.slice(h);
					}
					a.loose || (o ? a.loose = !0 : this.rules.other.doubleBlankLine.test(c) && (o = !0));
					var b = null, _ = void 0;
					this.options.gfm && (b = this.rules.other.listIsTask.exec(l)) && (_ = "[ ] " !== b[0], l = l.replace(this.rules.other.listReplaceTask, "")), a.items.push({
						type: "list_item",
						raw: c,
						task: !!b,
						checked: _,
						loose: !1,
						text: l,
						tokens: []
					}), a.raw += c;
				}
				var k = a.items.at(-1);
				if (!k) return;
				k.raw = k.raw.trimEnd(), k.text = k.text.trimEnd(), a.raw = a.raw.trimEnd();
				for (var C = 0; C < a.items.length; C++) if (this.lexer.state.top = !1, a.items[C].tokens = this.lexer.blockTokens(a.items[C].text, []), !a.loose) {
					var A = a.items[C].tokens.filter(function(e) {
						return "space" === e.type;
					});
					a.loose = A.length > 0 && A.some(function(e) {
						return t.rules.other.anyLine.test(e.raw);
					});
				}
				if (a.loose) for (var S = 0; S < a.items.length; S++) a.items[S].loose = !0;
				return a;
			}
		}
	},
	{
		key: "html",
		value: function(e) {
			var t = this.rules.block.html.exec(e);
			if (t) return {
				type: "html",
				block: !0,
				raw: t[0],
				pre: "pre" === t[1] || "script" === t[1] || "style" === t[1],
				text: t[0]
			};
		}
	},
	{
		key: "def",
		value: function(e) {
			var t = this.rules.block.def.exec(e);
			if (t) {
				var n = t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), r = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", u = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
				return {
					type: "def",
					tag: n,
					raw: t[0],
					href: r,
					title: u
				};
			}
		}
	},
	{
		key: "table",
		value: function(e) {
			var t, n = this, r = this.rules.block.table.exec(e);
			if (r && this.rules.other.tableDelimiter.test(r[2])) {
				var u = Zi(r[1]), a = r[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = null !== (t = r[3]) && void 0 !== t && t.trim() ? r[3].replace(this.rules.other.tableRowBlankLine, "").split("\n") : [], o = {
					type: "table",
					raw: r[0],
					header: [],
					align: [],
					rows: []
				};
				if (u.length === a.length) {
					var s, c = an(a);
					try {
						for (c.s(); !(s = c.n()).done;) {
							var l = s.value;
							this.rules.other.tableAlignRight.test(l) ? o.align.push("right") : this.rules.other.tableAlignCenter.test(l) ? o.align.push("center") : this.rules.other.tableAlignLeft.test(l) ? o.align.push("left") : o.align.push(null);
						}
					} catch (e) {
						c.e(e);
					} finally {
						c.f();
					}
					for (var f = 0; f < u.length; f++) o.header.push({
						text: u[f],
						tokens: this.lexer.inline(u[f]),
						header: !0,
						align: o.align[f]
					});
					var d, p = an(i);
					try {
						for (p.s(); !(d = p.n()).done;) {
							var h = d.value;
							o.rows.push(Zi(h, o.header.length).map(function(e, t) {
								return {
									text: e,
									tokens: n.lexer.inline(e),
									header: !1,
									align: o.align[t]
								};
							}));
						}
					} catch (e) {
						p.e(e);
					} finally {
						p.f();
					}
					return o;
				}
			}
		}
	},
	{
		key: "lheading",
		value: function(e) {
			var t = this.rules.block.lheading.exec(e);
			if (t) return {
				type: "heading",
				raw: t[0],
				depth: "=" === t[2].charAt(0) ? 1 : 2,
				text: t[1],
				tokens: this.lexer.inline(t[1])
			};
		}
	},
	{
		key: "paragraph",
		value: function(e) {
			var t = this.rules.block.paragraph.exec(e);
			if (t) {
				var n = "\n" === t[1].charAt(t[1].length - 1) ? t[1].slice(0, -1) : t[1];
				return {
					type: "paragraph",
					raw: t[0],
					text: n,
					tokens: this.lexer.inline(n)
				};
			}
		}
	},
	{
		key: "text",
		value: function(e) {
			var t = this.rules.block.text.exec(e);
			if (t) return {
				type: "text",
				raw: t[0],
				text: t[0],
				tokens: this.lexer.inline(t[0])
			};
		}
	},
	{
		key: "escape",
		value: function(e) {
			var t = this.rules.inline.escape.exec(e);
			if (t) return {
				type: "escape",
				raw: t[0],
				text: t[1]
			};
		}
	},
	{
		key: "tag",
		value: function(e) {
			var t = this.rules.inline.tag.exec(e);
			if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
				type: "html",
				raw: t[0],
				inLink: this.lexer.state.inLink,
				inRawBlock: this.lexer.state.inRawBlock,
				block: !1,
				text: t[0]
			};
		}
	},
	{
		key: "link",
		value: function(e) {
			var t = this.rules.inline.link.exec(e);
			if (t) {
				var n = t[2].trim();
				if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n)) {
					if (!this.rules.other.endAngleBracket.test(n)) return;
					var r = Li(n.slice(0, -1), "\\");
					if ((n.length - r.length) % 2 == 0) return;
				} else {
					var u = function(e, t) {
						if (-1 === e.indexOf(t[1])) return -1;
						for (var n = 0, r = 0; r < e.length; r++) if ("\\" === e[r]) r++;
						else if (e[r] === t[0]) n++;
						else if (e[r] === t[1] && --n < 0) return r;
						return n > 0 ? -2 : -1;
					}(t[2], "()");
					if (-2 === u) return;
					if (u > -1) {
						var a = (0 === t[0].indexOf("!") ? 5 : 4) + t[1].length + u;
						t[2] = t[2].substring(0, u), t[0] = t[0].substring(0, a).trim(), t[3] = "";
					}
				}
				var i = t[2], o = "";
				if (this.options.pedantic) {
					var s = this.rules.other.pedanticHrefTitle.exec(i);
					s && (i = s[1], o = s[3]);
				} else o = t[3] ? t[3].slice(1, -1) : "";
				return i = i.trim(), this.rules.other.startAngleBracket.test(i) && (i = this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? i.slice(1) : i.slice(1, -1)), $i(t, {
					href: i && i.replace(this.rules.inline.anyPunctuation, "$1"),
					title: o && o.replace(this.rules.inline.anyPunctuation, "$1")
				}, t[0], this.lexer, this.rules);
			}
		}
	},
	{
		key: "reflink",
		value: function(e, t) {
			var n;
			if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
				var r = t[(n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " ").toLowerCase()];
				if (!r) {
					var u = n[0].charAt(0);
					return {
						type: "text",
						raw: u,
						text: u
					};
				}
				return $i(n, r, n[0], this.lexer, this.rules);
			}
		}
	},
	{
		key: "emStrong",
		value: function(e, t) {
			var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "", r = this.rules.inline.emStrongLDelim.exec(e);
			if (!(!r || r[3] && n.match(this.rules.other.unicodeAlphaNumeric)) && (!r[1] && !r[2] || !n || this.rules.inline.punctuation.exec(n))) {
				var u, a, i = gn(r[0]).length - 1, o = i, s = 0, c = "*" === r[0][0] ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
				for (c.lastIndex = 0, t = t.slice(-1 * e.length + i); null != (r = c.exec(t));) if (u = r[1] || r[2] || r[3] || r[4] || r[5] || r[6]) if (a = gn(u).length, r[3] || r[4]) o += a;
				else if (!((r[5] || r[6]) && i % 3) || (i + a) % 3) {
					if (!((o -= a) > 0)) {
						a = Math.min(a, a + o + s);
						var l = gn(r[0])[0].length, f = e.slice(0, i + r.index + l + a);
						if (Math.min(i, a) % 2) {
							var d = f.slice(1, -1);
							return {
								type: "em",
								raw: f,
								text: d,
								tokens: this.lexer.inlineTokens(d)
							};
						}
						var p = f.slice(2, -2);
						return {
							type: "strong",
							raw: f,
							text: p,
							tokens: this.lexer.inlineTokens(p)
						};
					}
				} else s += a;
			}
		}
	},
	{
		key: "codespan",
		value: function(e) {
			var t = this.rules.inline.code.exec(e);
			if (t) {
				var n = t[2].replace(this.rules.other.newLineCharGlobal, " "), r = this.rules.other.nonSpaceChar.test(n), u = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
				return r && u && (n = n.substring(1, n.length - 1)), {
					type: "codespan",
					raw: t[0],
					text: n
				};
			}
		}
	},
	{
		key: "br",
		value: function(e) {
			var t = this.rules.inline.br.exec(e);
			if (t) return {
				type: "br",
				raw: t[0]
			};
		}
	},
	{
		key: "del",
		value: function(e) {
			var t = this.rules.inline.del.exec(e);
			if (t) return {
				type: "del",
				raw: t[0],
				text: t[2],
				tokens: this.lexer.inlineTokens(t[2])
			};
		}
	},
	{
		key: "autolink",
		value: function(e) {
			var t, n, r = this.rules.inline.autolink.exec(e);
			if (r) return n = "@" === r[2] ? "mailto:" + (t = r[1]) : t = r[1], {
				type: "link",
				raw: r[0],
				text: t,
				href: n,
				tokens: [{
					type: "text",
					raw: t,
					text: t
				}]
			};
		}
	},
	{
		key: "url",
		value: function(e) {
			var t;
			if (t = this.rules.inline.url.exec(e)) {
				var n, r;
				if ("@" === t[2]) r = "mailto:" + (n = t[0]);
				else {
					var u;
					do {
						var a, i;
						u = t[0], t[0] = null !== (a = null === (i = this.rules.inline._backpedal.exec(t[0])) || void 0 === i ? void 0 : i[0]) && void 0 !== a ? a : "";
					} while (u !== t[0]);
					n = t[0], r = "www." === t[1] ? "http://" + t[0] : t[0];
				}
				return {
					type: "link",
					raw: t[0],
					text: n,
					href: r,
					tokens: [{
						type: "text",
						raw: n,
						text: n
					}]
				};
			}
		}
	},
	{
		key: "inlineText",
		value: function(e) {
			var t = this.rules.inline.text.exec(e);
			if (t) {
				var n = this.lexer.state.inRawBlock;
				return {
					type: "text",
					raw: t[0],
					text: t[0],
					escaped: n
				};
			}
		}
	}
]), Ui = function() {
	function e(t) {
		tn(this, e), on(this, "tokens", void 0), on(this, "options", void 0), on(this, "state", void 0), on(this, "tokenizer", void 0), on(this, "inlineQueue", void 0), this.tokens = [], this.tokens.links = Object.create(null), this.options = t || Ra, this.options.tokenizer = this.options.tokenizer || new qi(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
			inLink: !1,
			inRawBlock: !1,
			top: !0
		};
		var n = {
			other: qa,
			block: Pi.normal,
			inline: ji.normal
		};
		this.options.pedantic ? (n.block = Pi.pedantic, n.inline = ji.pedantic) : this.options.gfm && (n.block = Pi.gfm, this.options.breaks ? n.inline = ji.breaks : n.inline = ji.gfm), this.tokenizer.rules = n;
	}
	return un(e, [
		{
			key: "lex",
			value: function(e) {
				e = e.replace(qa.carriageReturn, "\n"), this.blockTokens(e, this.tokens);
				for (var t = 0; t < this.inlineQueue.length; t++) {
					var n = this.inlineQueue[t];
					this.inlineTokens(n.src, n.tokens);
				}
				return this.inlineQueue = [], this.tokens;
			}
		},
		{
			key: "blockTokens",
			value: function(e) {
				var t, n = this, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], u = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], a = function() {
					var t, a, i;
					if (null !== (t = n.options.extensions) && void 0 !== t && null !== (t = t.block) && void 0 !== t && t.some(function(t) {
						return !!(i = t.call({ lexer: n }, e, r)) && (e = e.substring(i.raw.length), r.push(i), !0);
					})) return 0;
					if (i = n.tokenizer.space(e)) {
						e = e.substring(i.raw.length);
						var o = r.at(-1);
						return 1 === i.raw.length && void 0 !== o ? o.raw += "\n" : r.push(i), 0;
					}
					if (i = n.tokenizer.code(e)) {
						e = e.substring(i.raw.length);
						var s = r.at(-1);
						return "paragraph" === (null == s ? void 0 : s.type) || "text" === (null == s ? void 0 : s.type) ? (s.raw += (s.raw.endsWith("\n") ? "" : "\n") + i.raw, s.text += "\n" + i.text, n.inlineQueue.at(-1).src = s.text) : r.push(i), 0;
					}
					if (i = n.tokenizer.fences(e)) return e = e.substring(i.raw.length), r.push(i), 0;
					if (i = n.tokenizer.heading(e)) return e = e.substring(i.raw.length), r.push(i), 0;
					if (i = n.tokenizer.hr(e)) return e = e.substring(i.raw.length), r.push(i), 0;
					if (i = n.tokenizer.blockquote(e)) return e = e.substring(i.raw.length), r.push(i), 0;
					if (i = n.tokenizer.list(e)) return e = e.substring(i.raw.length), r.push(i), 0;
					if (i = n.tokenizer.html(e)) return e = e.substring(i.raw.length), r.push(i), 0;
					if (i = n.tokenizer.def(e)) {
						e = e.substring(i.raw.length);
						var c = r.at(-1);
						return "paragraph" === (null == c ? void 0 : c.type) || "text" === (null == c ? void 0 : c.type) ? (c.raw += (c.raw.endsWith("\n") ? "" : "\n") + i.raw, c.text += "\n" + i.raw, n.inlineQueue.at(-1).src = c.text) : n.tokens.links[i.tag] || (n.tokens.links[i.tag] = {
							href: i.href,
							title: i.title
						}, r.push(i)), 0;
					}
					if (i = n.tokenizer.table(e)) return e = e.substring(i.raw.length), r.push(i), 0;
					if (i = n.tokenizer.lheading(e)) return e = e.substring(i.raw.length), r.push(i), 0;
					var l = e;
					if (null !== (a = n.options.extensions) && void 0 !== a && a.startBlock) {
						var f, d = Infinity, p = e.slice(1);
						n.options.extensions.startBlock.forEach(function(e) {
							"number" == typeof (f = e.call({ lexer: n }, p)) && f >= 0 && (d = Math.min(d, f));
						}), d < Infinity && d >= 0 && (l = e.substring(0, d + 1));
					}
					if (n.state.top && (i = n.tokenizer.paragraph(l))) {
						var h = r.at(-1);
						return u && "paragraph" === (null == h ? void 0 : h.type) ? (h.raw += (h.raw.endsWith("\n") ? "" : "\n") + i.raw, h.text += "\n" + i.text, n.inlineQueue.pop(), n.inlineQueue.at(-1).src = h.text) : r.push(i), u = l.length !== e.length, e = e.substring(i.raw.length), 0;
					}
					if (i = n.tokenizer.text(e)) {
						e = e.substring(i.raw.length);
						var v = r.at(-1);
						return "text" === (null == v ? void 0 : v.type) ? (v.raw += (v.raw.endsWith("\n") ? "" : "\n") + i.raw, v.text += "\n" + i.text, n.inlineQueue.pop(), n.inlineQueue.at(-1).src = v.text) : r.push(i), 0;
					}
					if (e) {
						var m = "Infinite loop on byte: " + e.charCodeAt(0);
						if (n.options.silent) return console.error(m), 1;
						throw new Error(m);
					}
				};
				for (this.options.pedantic && (e = e.replace(qa.tabCharGlobal, "    ").replace(qa.spaceLine, "")); e && (0 === (t = a()) || 1 !== t););
				return this.state.top = !0, r;
			}
		},
		{
			key: "inline",
			value: function(e) {
				var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
				return this.inlineQueue.push({
					src: e,
					tokens: t
				}), t;
			}
		},
		{
			key: "inlineTokens",
			value: function(e) {
				var t, n, r, u = this, a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], i = e, o = null;
				if (this.tokens.links) {
					var s = Object.keys(this.tokens.links);
					if (s.length > 0) for (; null != (o = this.tokenizer.rules.inline.reflinkSearch.exec(i));) s.includes(o[0].slice(o[0].lastIndexOf("[") + 1, -1)) && (i = i.slice(0, o.index) + "[" + "a".repeat(o[0].length - 2) + "]" + i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
				}
				for (; null != (o = this.tokenizer.rules.inline.anyPunctuation.exec(i));) i = i.slice(0, o.index) + "++" + i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
				for (; null != (o = this.tokenizer.rules.inline.blockSkip.exec(i));) r = o[2] ? o[2].length : 0, i = i.slice(0, o.index + r) + "[" + "a".repeat(o[0].length - r - 2) + "]" + i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
				i = null !== (t = null === (n = this.options.hooks) || void 0 === n || null === (n = n.emStrongMask) || void 0 === n ? void 0 : n.call({ lexer: this }, i)) && void 0 !== t ? t : i;
				for (var c, l = !1, f = "", d = function() {
					var t, n, r;
					if (l || (f = ""), l = !1, null !== (t = u.options.extensions) && void 0 !== t && null !== (t = t.inline) && void 0 !== t && t.some(function(t) {
						return !!(r = t.call({ lexer: u }, e, a)) && (e = e.substring(r.raw.length), a.push(r), !0);
					})) return 0;
					if (r = u.tokenizer.escape(e)) return e = e.substring(r.raw.length), a.push(r), 0;
					if (r = u.tokenizer.tag(e)) return e = e.substring(r.raw.length), a.push(r), 0;
					if (r = u.tokenizer.link(e)) return e = e.substring(r.raw.length), a.push(r), 0;
					if (r = u.tokenizer.reflink(e, u.tokens.links)) {
						e = e.substring(r.raw.length);
						var o = a.at(-1);
						return "text" === r.type && "text" === (null == o ? void 0 : o.type) ? (o.raw += r.raw, o.text += r.text) : a.push(r), 0;
					}
					if (r = u.tokenizer.emStrong(e, i, f)) return e = e.substring(r.raw.length), a.push(r), 0;
					if (r = u.tokenizer.codespan(e)) return e = e.substring(r.raw.length), a.push(r), 0;
					if (r = u.tokenizer.br(e)) return e = e.substring(r.raw.length), a.push(r), 0;
					if (r = u.tokenizer.del(e)) return e = e.substring(r.raw.length), a.push(r), 0;
					if (r = u.tokenizer.autolink(e)) return e = e.substring(r.raw.length), a.push(r), 0;
					if (!u.state.inLink && (r = u.tokenizer.url(e))) return e = e.substring(r.raw.length), a.push(r), 0;
					var s = e;
					if (null !== (n = u.options.extensions) && void 0 !== n && n.startInline) {
						var c, d = Infinity, p = e.slice(1);
						u.options.extensions.startInline.forEach(function(e) {
							"number" == typeof (c = e.call({ lexer: u }, p)) && c >= 0 && (d = Math.min(d, c));
						}), d < Infinity && d >= 0 && (s = e.substring(0, d + 1));
					}
					if (r = u.tokenizer.inlineText(s)) {
						e = e.substring(r.raw.length), "_" !== r.raw.slice(-1) && (f = r.raw.slice(-1)), l = !0;
						var h = a.at(-1);
						return "text" === (null == h ? void 0 : h.type) ? (h.raw += r.raw, h.text += r.text) : a.push(r), 0;
					}
					if (e) {
						var v = "Infinite loop on byte: " + e.charCodeAt(0);
						if (u.options.silent) return console.error(v), 1;
						throw new Error(v);
					}
				}; e && (0 === (c = d()) || 1 !== c););
				return a;
			}
		}
	], [
		{
			key: "rules",
			get: function() {
				return {
					block: Pi,
					inline: ji
				};
			}
		},
		{
			key: "lex",
			value: function(t, n) {
				return new e(n).lex(t);
			}
		},
		{
			key: "lexInline",
			value: function(t, n) {
				return new e(n).inlineTokens(t);
			}
		}
	]);
}(), Hi = un(function e(t) {
	tn(this, e), on(this, "options", void 0), on(this, "parser", void 0), this.options = t || Ra;
}, [
	{
		key: "space",
		value: function(e) {
			return "";
		}
	},
	{
		key: "code",
		value: function(e) {
			var t, n = e.text, r = e.lang, u = e.escaped, a = null === (t = (r || "").match(qa.notSpaceStart)) || void 0 === t ? void 0 : t[0], i = n.replace(qa.endingNewline, "") + "\n";
			return a ? "<pre><code class=\"language-" + Ri(a) + "\">" + (u ? i : Ri(i, !0)) + "</code></pre>\n" : "<pre><code>" + (u ? i : Ri(i, !0)) + "</code></pre>\n";
		}
	},
	{
		key: "blockquote",
		value: function(e) {
			var t = e.tokens;
			return "<blockquote>\n".concat(this.parser.parse(t), "</blockquote>\n");
		}
	},
	{
		key: "html",
		value: function(e) {
			return e.text;
		}
	},
	{
		key: "def",
		value: function(e) {
			return "";
		}
	},
	{
		key: "heading",
		value: function(e) {
			var t = e.tokens, n = e.depth;
			return "<h".concat(n, ">").concat(this.parser.parseInline(t), "</h").concat(n, ">\n");
		}
	},
	{
		key: "hr",
		value: function(e) {
			return "<hr>\n";
		}
	},
	{
		key: "list",
		value: function(e) {
			for (var t = e.ordered, n = e.start, r = "", u = 0; u < e.items.length; u++) {
				var a = e.items[u];
				r += this.listitem(a);
			}
			var i = t ? "ol" : "ul";
			return "<" + i + (t && 1 !== n ? " start=\"" + n + "\"" : "") + ">\n" + r + "</" + i + ">\n";
		}
	},
	{
		key: "listitem",
		value: function(e) {
			var t = "";
			if (e.task) {
				var n, r = this.checkbox({ checked: !!e.checked });
				e.loose ? "paragraph" === (null === (n = e.tokens[0]) || void 0 === n ? void 0 : n.type) ? (e.tokens[0].text = r + " " + e.tokens[0].text, e.tokens[0].tokens && e.tokens[0].tokens.length > 0 && "text" === e.tokens[0].tokens[0].type && (e.tokens[0].tokens[0].text = r + " " + Ri(e.tokens[0].tokens[0].text), e.tokens[0].tokens[0].escaped = !0)) : e.tokens.unshift({
					type: "text",
					raw: r + " ",
					text: r + " ",
					escaped: !0
				}) : t += r + " ";
			}
			return t += this.parser.parse(e.tokens, !!e.loose), "<li>".concat(t, "</li>\n");
		}
	},
	{
		key: "checkbox",
		value: function(e) {
			return "<input " + (e.checked ? "checked=\"\" " : "") + "disabled=\"\" type=\"checkbox\">";
		}
	},
	{
		key: "paragraph",
		value: function(e) {
			var t = e.tokens;
			return "<p>".concat(this.parser.parseInline(t), "</p>\n");
		}
	},
	{
		key: "table",
		value: function(e) {
			for (var t = "", n = "", r = 0; r < e.header.length; r++) n += this.tablecell(e.header[r]);
			t += this.tablerow({ text: n });
			for (var u = "", a = 0; a < e.rows.length; a++) {
				var i = e.rows[a];
				n = "";
				for (var o = 0; o < i.length; o++) n += this.tablecell(i[o]);
				u += this.tablerow({ text: n });
			}
			return u && (u = "<tbody>".concat(u, "</tbody>")), "<table>\n<thead>\n" + t + "</thead>\n" + u + "</table>\n";
		}
	},
	{
		key: "tablerow",
		value: function(e) {
			var t = e.text;
			return "<tr>\n".concat(t, "</tr>\n");
		}
	},
	{
		key: "tablecell",
		value: function(e) {
			var t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
			return (e.align ? "<".concat(n, " align=\"").concat(e.align, "\">") : "<".concat(n, ">")) + t + "</".concat(n, ">\n");
		}
	},
	{
		key: "strong",
		value: function(e) {
			var t = e.tokens;
			return "<strong>".concat(this.parser.parseInline(t), "</strong>");
		}
	},
	{
		key: "em",
		value: function(e) {
			var t = e.tokens;
			return "<em>".concat(this.parser.parseInline(t), "</em>");
		}
	},
	{
		key: "codespan",
		value: function(e) {
			var t = e.text;
			return "<code>".concat(Ri(t, !0), "</code>");
		}
	},
	{
		key: "br",
		value: function(e) {
			return "<br>";
		}
	},
	{
		key: "del",
		value: function(e) {
			var t = e.tokens;
			return "<del>".concat(this.parser.parseInline(t), "</del>");
		}
	},
	{
		key: "link",
		value: function(e) {
			var t = e.href, n = e.title, r = e.tokens, u = this.parser.parseInline(r), a = Mi(t);
			if (null === a) return u;
			var i = "<a href=\"" + (t = a) + "\"";
			return n && (i += " title=\"" + Ri(n) + "\""), i + ">" + u + "</a>";
		}
	},
	{
		key: "image",
		value: function(e) {
			var t = e.href, n = e.title, r = e.text, u = e.tokens;
			u && (r = this.parser.parseInline(u, this.parser.textRenderer));
			var a = Mi(t);
			if (null === a) return Ri(r);
			var i = "<img src=\"".concat(t = a, "\" alt=\"").concat(r, "\"");
			return n && (i += " title=\"".concat(Ri(n), "\"")), i + ">";
		}
	},
	{
		key: "text",
		value: function(e) {
			return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : Ri(e.text);
		}
	}
]), Vi = un(function e() {
	tn(this, e);
}, [
	{
		key: "strong",
		value: function(e) {
			return e.text;
		}
	},
	{
		key: "em",
		value: function(e) {
			return e.text;
		}
	},
	{
		key: "codespan",
		value: function(e) {
			return e.text;
		}
	},
	{
		key: "del",
		value: function(e) {
			return e.text;
		}
	},
	{
		key: "html",
		value: function(e) {
			return e.text;
		}
	},
	{
		key: "text",
		value: function(e) {
			return e.text;
		}
	},
	{
		key: "link",
		value: function(e) {
			return "" + e.text;
		}
	},
	{
		key: "image",
		value: function(e) {
			return "" + e.text;
		}
	},
	{
		key: "br",
		value: function() {
			return "";
		}
	}
]), Wi = function() {
	function e(t) {
		tn(this, e), on(this, "options", void 0), on(this, "renderer", void 0), on(this, "textRenderer", void 0), this.options = t || Ra, this.options.renderer = this.options.renderer || new Hi(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Vi();
	}
	return un(e, [{
		key: "parse",
		value: function(e) {
			for (var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n = "", r = 0; r < e.length; r++) {
				var u, a = e[r];
				if (null !== (u = this.options.extensions) && void 0 !== u && null !== (u = u.renderers) && void 0 !== u && u[a.type]) {
					var i = a, o = this.options.extensions.renderers[i.type].call({ parser: this }, i);
					if (!1 !== o || ![
						"space",
						"hr",
						"heading",
						"code",
						"table",
						"blockquote",
						"list",
						"html",
						"def",
						"paragraph",
						"text"
					].includes(i.type)) {
						n += o || "";
						continue;
					}
				}
				var s = a;
				switch (s.type) {
					case "space":
						n += this.renderer.space(s);
						continue;
					case "hr":
						n += this.renderer.hr(s);
						continue;
					case "heading":
						n += this.renderer.heading(s);
						continue;
					case "code":
						n += this.renderer.code(s);
						continue;
					case "table":
						n += this.renderer.table(s);
						continue;
					case "blockquote":
						n += this.renderer.blockquote(s);
						continue;
					case "list":
						n += this.renderer.list(s);
						continue;
					case "html":
						n += this.renderer.html(s);
						continue;
					case "def":
						n += this.renderer.def(s);
						continue;
					case "paragraph":
						n += this.renderer.paragraph(s);
						continue;
					case "text":
						for (var c = s, l = this.renderer.text(c); r + 1 < e.length && "text" === e[r + 1].type;) c = e[++r], l += "\n" + this.renderer.text(c);
						n += t ? this.renderer.paragraph({
							type: "paragraph",
							raw: l,
							text: l,
							tokens: [{
								type: "text",
								raw: l,
								text: l,
								escaped: !0
							}]
						}) : l;
						continue;
					default:
						var f = "Token with \"" + s.type + "\" type was not found.";
						if (this.options.silent) return console.error(f), "";
						throw new Error(f);
				}
			}
			return n;
		}
	}, {
		key: "parseInline",
		value: function(e) {
			for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.renderer, n = "", r = 0; r < e.length; r++) {
				var u, a = e[r];
				if (null !== (u = this.options.extensions) && void 0 !== u && null !== (u = u.renderers) && void 0 !== u && u[a.type]) {
					var i = this.options.extensions.renderers[a.type].call({ parser: this }, a);
					if (!1 !== i || ![
						"escape",
						"html",
						"link",
						"image",
						"strong",
						"em",
						"codespan",
						"br",
						"del",
						"text"
					].includes(a.type)) {
						n += i || "";
						continue;
					}
				}
				var o = a;
				switch (o.type) {
					case "escape":
					case "text":
						n += t.text(o);
						break;
					case "html":
						n += t.html(o);
						break;
					case "link":
						n += t.link(o);
						break;
					case "image":
						n += t.image(o);
						break;
					case "strong":
						n += t.strong(o);
						break;
					case "em":
						n += t.em(o);
						break;
					case "codespan":
						n += t.codespan(o);
						break;
					case "br":
						n += t.br(o);
						break;
					case "del":
						n += t.del(o);
						break;
					default:
						var s = "Token with \"" + o.type + "\" type was not found.";
						if (this.options.silent) return console.error(s), "";
						throw new Error(s);
				}
			}
			return n;
		}
	}], [{
		key: "parse",
		value: function(t, n) {
			return new e(n).parse(t);
		}
	}, {
		key: "parseInline",
		value: function(t, n) {
			return new e(n).parseInline(t);
		}
	}]);
}(), Ki = (ja = un(function e(t) {
	tn(this, e), on(this, "options", void 0), on(this, "block", void 0), this.options = t || Ra;
}, [
	{
		key: "preprocess",
		value: function(e) {
			return e;
		}
	},
	{
		key: "postprocess",
		value: function(e) {
			return e;
		}
	},
	{
		key: "processAllTokens",
		value: function(e) {
			return e;
		}
	},
	{
		key: "emStrongMask",
		value: function(e) {
			return e;
		}
	},
	{
		key: "provideLexer",
		value: function() {
			return this.block ? Ui.lex : Ui.lexInline;
		}
	},
	{
		key: "provideParser",
		value: function() {
			return this.block ? Wi.parse : Wi.parseInline;
		}
	}
]), on(ja, "passThroughHooks", /* @__PURE__ */ new Set([
	"preprocess",
	"postprocess",
	"processAllTokens",
	"emStrongMask"
])), on(ja, "passThroughHooksRespectAsync", /* @__PURE__ */ new Set([
	"preprocess",
	"postprocess",
	"processAllTokens"
])), ja), Qi = new (un(function e() {
	tn(this, e), on(this, "defaults", {
		async: !1,
		breaks: !1,
		extensions: null,
		gfm: !0,
		hooks: null,
		pedantic: !1,
		renderer: null,
		silent: !1,
		tokenizer: null,
		walkTokens: null
	}), on(this, "options", this.setOptions), on(this, "parse", this.parseMarkdown(!0)), on(this, "parseInline", this.parseMarkdown(!1)), on(this, "Parser", Wi), on(this, "Renderer", Hi), on(this, "TextRenderer", Vi), on(this, "Lexer", Ui), on(this, "Tokenizer", qi), on(this, "Hooks", Ki), this.use.apply(this, arguments);
}, [
	{
		key: "walkTokens",
		value: function(e, t) {
			var n, r = this, u = [], a = an(e);
			try {
				var i = function() {
					var e = n.value;
					switch (u = u.concat(t.call(r, e)), e.type) {
						case "table":
							var a, i = e, o = an(i.header);
							try {
								for (o.s(); !(a = o.n()).done;) {
									var s = a.value;
									u = u.concat(r.walkTokens(s.tokens, t));
								}
							} catch (e) {
								o.e(e);
							} finally {
								o.f();
							}
							var c, l = an(i.rows);
							try {
								for (l.s(); !(c = l.n()).done;) {
									var f, d = an(c.value);
									try {
										for (d.s(); !(f = d.n()).done;) {
											var p = f.value;
											u = u.concat(r.walkTokens(p.tokens, t));
										}
									} catch (e) {
										d.e(e);
									} finally {
										d.f();
									}
								}
							} catch (e) {
								l.e(e);
							} finally {
								l.f();
							}
							break;
						case "list":
							var h = e;
							u = u.concat(r.walkTokens(h.items, t));
							break;
						default:
							var v, m = e;
							null !== (v = r.defaults.extensions) && void 0 !== v && null !== (v = v.childTokens) && void 0 !== v && v[m.type] ? r.defaults.extensions.childTokens[m.type].forEach(function(e) {
								var n = m[e].flat(Infinity);
								u = u.concat(r.walkTokens(n, t));
							}) : m.tokens && (u = u.concat(r.walkTokens(m.tokens, t)));
					}
				};
				for (a.s(); !(n = a.n()).done;) i();
			} catch (e) {
				a.e(e);
			} finally {
				a.f();
			}
			return u;
		}
	},
	{
		key: "use",
		value: function() {
			for (var e = this, t = this.defaults.extensions || {
				renderers: {},
				childTokens: {}
			}, n = arguments.length, r = new Array(n), u = 0; u < n; u++) r[u] = arguments[u];
			return r.forEach(function(n) {
				var r = pn({}, n);
				if (r.async = e.defaults.async || r.async || !1, n.extensions && (n.extensions.forEach(function(e) {
					if (!e.name) throw new Error("extension name required");
					if ("renderer" in e) {
						var n = t.renderers[e.name];
						t.renderers[e.name] = n ? function() {
							for (var t = arguments.length, r = new Array(t), u = 0; u < t; u++) r[u] = arguments[u];
							var a = e.renderer.apply(this, r);
							return !1 === a && (a = n.apply(this, r)), a;
						} : e.renderer;
					}
					if ("tokenizer" in e) {
						if (!e.level || "block" !== e.level && "inline" !== e.level) throw new Error("extension level must be 'block' or 'inline'");
						var r = t[e.level];
						r ? r.unshift(e.tokenizer) : t[e.level] = [e.tokenizer], e.start && ("block" === e.level ? t.startBlock ? t.startBlock.push(e.start) : t.startBlock = [e.start] : "inline" === e.level && (t.startInline ? t.startInline.push(e.start) : t.startInline = [e.start]));
					}
					"childTokens" in e && e.childTokens && (t.childTokens[e.name] = e.childTokens);
				}), r.extensions = t), n.renderer) {
					var u = e.defaults.renderer || new Hi(e.defaults), a = function() {
						if (!(i in u)) throw new Error("renderer '".concat(i, "' does not exist"));
						if (["options", "parser"].includes(i)) return 1;
						var e = i, t = n.renderer[e], r = u[e];
						u[e] = function() {
							for (var e = arguments.length, n = new Array(e), a = 0; a < e; a++) n[a] = arguments[a];
							var i = t.apply(u, n);
							return !1 === i && (i = r.apply(u, n)), i || "";
						};
					};
					for (var i in n.renderer) a();
					r.renderer = u;
				}
				if (n.tokenizer) {
					var o = e.defaults.tokenizer || new qi(e.defaults), s = function() {
						if (!(c in o)) throw new Error("tokenizer '".concat(c, "' does not exist"));
						if ([
							"options",
							"rules",
							"lexer"
						].includes(c)) return 1;
						var e = c, t = n.tokenizer[e], r = o[e];
						o[e] = function() {
							for (var e = arguments.length, n = new Array(e), u = 0; u < e; u++) n[u] = arguments[u];
							var a = t.apply(o, n);
							return !1 === a && (a = r.apply(o, n)), a;
						};
					};
					for (var c in n.tokenizer) s();
					r.tokenizer = o;
				}
				if (n.hooks) {
					var l = e.defaults.hooks || new Ki(), f = function(t) {
						if (!(t in l)) throw new Error("hook '".concat(t, "' does not exist"));
						if (["options", "block"].includes(t)) return 1;
						var r = t, u = n.hooks[r], a = l[r];
						Ki.passThroughHooks.has(t) ? l[r] = function(n) {
							if (e.defaults.async && Ki.passThroughHooksRespectAsync.has(t)) return Xt(vn().m(function e() {
								var t;
								return vn().w(function(e) {
									for (;;) switch (e.n) {
										case 0: return e.n = 1, u.call(l, n);
										case 1: return t = e.v, e.a(2, a.call(l, t));
									}
								}, e);
							}))();
							var r = u.call(l, n);
							return a.call(l, r);
						} : l[r] = function() {
							for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
							if (e.defaults.async) return Xt(vn().m(function e() {
								var t;
								return vn().w(function(e) {
									for (;;) switch (e.n) {
										case 0: return e.n = 1, u.apply(l, n);
										case 1:
											if (!1 !== (t = e.v)) {
												e.n = 3;
												break;
											}
											return e.n = 2, a.apply(l, n);
										case 2: t = e.v;
										case 3: return e.a(2, t);
									}
								}, e);
							}))();
							var i = u.apply(l, n);
							return !1 === i && (i = a.apply(l, n)), i;
						};
					};
					for (var d in n.hooks) f(d);
					r.hooks = l;
				}
				if (n.walkTokens) {
					var p = e.defaults.walkTokens, h = n.walkTokens;
					r.walkTokens = function(e) {
						var t = [];
						return t.push(h.call(this, e)), p && (t = t.concat(p.call(this, e))), t;
					};
				}
				e.defaults = pn(pn({}, e.defaults), r);
			}), this;
		}
	},
	{
		key: "setOptions",
		value: function(e) {
			return this.defaults = pn(pn({}, this.defaults), e), this;
		}
	},
	{
		key: "lexer",
		value: function(e, t) {
			return Ui.lex(e, null != t ? t : this.defaults);
		}
	},
	{
		key: "parser",
		value: function(e, t) {
			return Wi.parse(e, null != t ? t : this.defaults);
		}
	},
	{
		key: "parseMarkdown",
		value: function(e) {
			var t = this;
			return function(n, r) {
				var u = pn({}, r), a = pn(pn({}, t.defaults), u), i = t.onError(!!a.silent, !!a.async);
				if (!0 === t.defaults.async && !1 === u.async) return i(/* @__PURE__ */ new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
				if (En(n) > "u" || null === n) return i(/* @__PURE__ */ new Error("marked(): input parameter is undefined or null"));
				if ("string" != typeof n) return i(/* @__PURE__ */ new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
				if (a.hooks && (a.hooks.options = a, a.hooks.block = e), a.async) return Xt(vn().m(function r() {
					var u, i, o, s, c, l, f, d, p, h, v;
					return vn().w(function(r) {
						for (;;) switch (r.n) {
							case 0:
								if (!a.hooks) {
									r.n = 2;
									break;
								}
								return r.n = 1, a.hooks.preprocess(n);
							case 1:
								c = r.v, r.n = 3;
								break;
							case 2: c = n;
							case 3:
								if (u = c, !a.hooks) {
									r.n = 5;
									break;
								}
								return r.n = 4, a.hooks.provideLexer();
							case 4:
								l = r.v, r.n = 6;
								break;
							case 5: l = e ? Ui.lex : Ui.lexInline;
							case 6: return f = l, r.n = 7, f(u, a);
							case 7:
								if (i = r.v, !a.hooks) {
									r.n = 9;
									break;
								}
								return r.n = 8, a.hooks.processAllTokens(i);
							case 8:
								d = r.v, r.n = 10;
								break;
							case 9: d = i;
							case 10:
								if (o = d, !a.walkTokens) {
									r.n = 11;
									break;
								}
								return r.n = 11, Promise.all(t.walkTokens(o, a.walkTokens));
							case 11:
								if (!a.hooks) {
									r.n = 13;
									break;
								}
								return r.n = 12, a.hooks.provideParser();
							case 12:
								p = r.v, r.n = 14;
								break;
							case 13: p = e ? Wi.parse : Wi.parseInline;
							case 14: return h = p, r.n = 15, h(o, a);
							case 15:
								if (s = r.v, !a.hooks) {
									r.n = 17;
									break;
								}
								return r.n = 16, a.hooks.postprocess(s);
							case 16:
								v = r.v, r.n = 18;
								break;
							case 17: v = s;
							case 18: return r.a(2, v);
						}
					}, r);
				}))().catch(i);
				try {
					a.hooks && (n = a.hooks.preprocess(n));
					var o = (a.hooks ? a.hooks.provideLexer() : e ? Ui.lex : Ui.lexInline)(n, a);
					a.hooks && (o = a.hooks.processAllTokens(o)), a.walkTokens && t.walkTokens(o, a.walkTokens);
					var s = (a.hooks ? a.hooks.provideParser() : e ? Wi.parse : Wi.parseInline)(o, a);
					return a.hooks && (s = a.hooks.postprocess(s)), s;
				} catch (e) {
					return i(e);
				}
			};
		}
	},
	{
		key: "onError",
		value: function(e, t) {
			return function(n) {
				if (n.message += "\nPlease report this to https://github.com/markedjs/marked.", e) {
					var r = "<p>An error occurred:</p><pre>" + Ri(n.message + "", !0) + "</pre>";
					return t ? Promise.resolve(r) : r;
				}
				if (t) return Promise.reject(n);
				throw n;
			};
		}
	}
]))();
function Gi(e, t) {
	return Qi.parse(e, t);
}
function Yi(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
Gi.options = Gi.setOptions = function(e) {
	return Qi.setOptions(e), Gi.defaults = Qi.defaults, Ma(Gi.defaults), Gi;
}, Gi.getDefaults = function() {
	return {
		async: !1,
		breaks: !1,
		extensions: null,
		gfm: !0,
		hooks: null,
		pedantic: !1,
		renderer: null,
		silent: !1,
		tokenizer: null,
		walkTokens: null
	};
}, Gi.defaults = Ra, Gi.use = function() {
	return Qi.use.apply(Qi, arguments), Gi.defaults = Qi.defaults, Ma(Gi.defaults), Gi;
}, Gi.walkTokens = function(e, t) {
	return Qi.walkTokens(e, t);
}, Gi.parseInline = Qi.parseInline, Gi.Parser = Wi, Gi.parser = Wi.parse, Gi.Renderer = Hi, Gi.TextRenderer = Vi, Gi.Lexer = Ui, Gi.lexer = Ui.lex, Gi.Tokenizer = qi, Gi.Hooks = Ki, Gi.parse = Gi, Gi.options, Gi.setOptions, Gi.use, Gi.walkTokens, Gi.parseInline, Wi.parse, Ui.lex;
var Xi = new Gi.Renderer();
Xi.code = function(e) {
	var t = e.text, n = e.lang, r = void 0 === n ? "" : n, u = e.escaped, a = r ? "language-".concat(r) : "", i = u ? t : Yi(t), o = encodeURIComponent(t);
	return "\n    <div class=\"DocSearch-CodeSnippet\">\n      <button class=\"DocSearch-CodeSnippet-CopyButton\" data-code=\"".concat(o, "\" aria-label=\"copy code\">").concat("<svg class=\"DocSearch-CodeSnippet-CopyIcon\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect width=\"14\" height=\"14\" x=\"8\" y=\"8\" rx=\"2\" ry=\"2\" /><path d=\"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2\" /></svg>").concat("<svg class=\"DocSearch-CodeSnippet-CheckIcon\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 6 9 17l-5-5\" /></svg>", "<span class=\"DocSearch-CodeSnippet-CopyButton-Label\"></span></button>\n      <pre><code class=\"").concat(a, "\">").concat(i, "</code></pre>\n    </div>\n  ");
}, Xi.link = function(e) {
	var t = e.href, n = e.title, r = e.text, u = n ? " title=\"".concat(Yi(n), "\"") : "", a = t ? Yi(t) : "", i = Yi(r);
	return "<a href=\"".concat(a, "\"").concat(u, " target=\"_blank\" rel=\"noopener noreferrer\">").concat(i, "</a>");
};
var eo = nt(function(e) {
	var t = e.content, n = e.copyButtonText, r = e.copyButtonCopiedText, u = e.isStreaming, a = Pe(function() {
		return Gi.parse(t, {
			gfm: !0,
			breaks: !0,
			renderer: Xi
		});
	}, [t]), i = Ie(null);
	return Oe(function() {
		var e = i.current;
		if (e) return Array.from(e.querySelectorAll(".DocSearch-CodeSnippet-CopyButton")).forEach(function(e) {
			var t = e.querySelector(".DocSearch-CodeSnippet-CopyButton-Label");
			t && (t.textContent = n), e.classList.remove("DocSearch-CodeSnippet-CopyButton--copied");
		}), e.addEventListener("click", t), function() {
			e.removeEventListener("click", t);
		};
		function t(e) {
			var t, u = e.target.closest(".DocSearch-CodeSnippet-CopyButton");
			if (u) {
				var a = null !== (t = u.getAttribute("data-code")) && void 0 !== t ? t : "";
				navigator.clipboard.writeText(decodeURIComponent(a)).catch(function() {});
				var i = u.querySelector(".DocSearch-CodeSnippet-CopyButton-Label");
				if (i) {
					u.classList.add("DocSearch-CodeSnippet-CopyButton--copied");
					var o = n;
					i.textContent = r, setTimeout(function() {
						u.classList.remove("DocSearch-CodeSnippet-CopyButton--copied"), i.textContent = o;
					}, 1500);
				}
			}
		}
	}, [
		a,
		n,
		r
	]), It.createElement("div", {
		ref: i,
		className: "DocSearch-Markdown-Content ".concat(u ? "DocSearch-Markdown-Content--streaming" : ""),
		dangerouslySetInnerHTML: { __html: a }
	});
});
function to(e) {
	var t = e.part, n = e.translations, r = e.onSearchQueryClick, u = n.searchingText, a = n.preToolCallText, i = n.toolCallResultText;
	switch (t.state) {
		case "input-streaming": return It.createElement("div", { className: "DocSearch-AskAiScreen-MessageContent-Tool Tool--PartialCall shimmer" }, It.createElement(ya, { className: "DocSearch-AskAiScreen-SmallerLoadingIcon" }), It.createElement("span", null, u));
		case "input-available": return It.createElement("div", { className: "DocSearch-AskAiScreen-MessageContent-Tool Tool--Call shimmer" }, It.createElement(ya, { className: "DocSearch-AskAiScreen-SmallerLoadingIcon" }), It.createElement("span", null, a, " ", "\"".concat(t.input.query || "", "\" ...")));
		case "output-available":
			var o, s, c = "tool-searchIndex" === t.type ? t.output.query : t.input.query, l = null !== (o = null === (s = t.output.hits) || void 0 === s ? void 0 : s.length) && void 0 !== o ? o : 0;
			return It.createElement("div", { className: "DocSearch-AskAiScreen-MessageContent-Tool Tool--Result" }, It.createElement($n, null), It.createElement("span", null, i, " ", r ? It.createElement("span", {
				role: "button",
				tabIndex: 0,
				className: "DocSearch-AskAiScreen-MessageContent-Tool-Query",
				onKeyDown: function(e) {
					"Enter" !== e.key && " " !== e.key || (e.preventDefault(), r(c || ""));
				},
				onClick: function() {
					return r(c || "");
				}
			}, " ", "\"", c || "", "\"") : It.createElement("span", { className: "DocSearch-AskAiScreen-MessageContent-Tool-Query" }, " \"", c || "", "\""), " ", "found ", l, " results"));
		default: return null;
	}
}
eo.displayName = "MemoizedMarkdown";
var no = ["translations"];
function ro(e) {
	var t = e.disclaimerText;
	return It.createElement("p", { className: "DocSearch-AskAiScreen-Disclaimer" }, t);
}
function uo(e) {
	var t, n, r, u = e.exchange, a = e.askAiError, i = e.isLastExchange, o = e.loadingStatus, s = e.onSearchQueryClick, c = e.translations, l = e.conversations, f = e.onFeedback, d = e.agentStudio, p = u.userMessage, h = u.assistantMessage, v = c.stoppedStreamingText, m = void 0 === v ? "You stopped this response" : v, D = c.errorTitleText, y = void 0 === D ? "Chat error" : D, g = c.preToolCallText, F = void 0 === g ? "Searching..." : g, E = c.afterToolCallText, b = void 0 === E ? "Searched for" : E, _ = c.duringToolCallText, k = void 0 === _ ? "Searching..." : _, C = Nn(a, Boolean(d)), A = Pe(function() {
		return Tn(h);
	}, [h]), w = Pe(function() {
		return Tn(p);
	}, [p]), S = It.useMemo(function() {
		return e = h, t = [], n = /* @__PURE__ */ new Set(), e ? (e.parts.forEach(function(e) {
			if ("text" === e.type && 0 !== e.text.length) {
				var r, u = e.text.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, ""), a = an(u.matchAll(/\[([^\]]*)\]\(([^)]+)\)/g));
				try {
					for (a.s(); !(r = a.n()).done;) {
						var i = r.value, o = i[1].trim(), s = i[2];
						n.has(s) || (n.add(s), t.push({
							url: s,
							title: o || void 0
						}));
					}
				} catch (e) {
					a.e(e);
				} finally {
					a.f();
				}
				var c, l = an(u.matchAll(/* @__PURE__ */ new RegExp("(?<!\\]\\()https?:\\/\\/[^\\s<>\"{}|\\\\^`[\\]]+", "g")));
				try {
					for (l.s(); !(c = l.n()).done;) {
						var f = c.value[0].replace(/[.,;:!?]+$/, "");
						n.has(f) || (n.add(f), t.push({ url: f }));
					}
				} catch (e) {
					l.e(e);
				} finally {
					l.f();
				}
			}
		}), t) : [];
		var e, t, n;
	}, [h]), x = It.useMemo(function() {
		return function(e) {
			for (var t = [], n = 0; n < e.length; n++) {
				var r = e[n];
				if ("tool-searchIndex" === r.type && "output-available" === r.state) {
					for (var u = [], a = n; a < e.length;) {
						var i = e[a];
						if ("tool-searchIndex" !== i.type || "output-available" !== i.state) break;
						var o, s, c = (null !== (o = null === (s = i.output) || void 0 === s ? void 0 : s.query) && void 0 !== o ? o : "").trim();
						c && c.length > 0 && u.push(c), a++;
					}
					u.length > 1 ? t.push({
						type: "aggregated-tool-call",
						queries: u
					}) : 1 === u.length && t.push(r), n = a - 1;
				} else t.push(r);
			}
			return t;
		}((null == h ? void 0 : h.parts) || []);
	}, [h]), O = (null === (t = p.metadata) || void 0 === t ? void 0 : t.stopped) || (null == h || null === (n = h.metadata) || void 0 === n ? void 0 : n.stopped), B = !O && (!i || i && "ready" === o && Boolean(h)), I = ["submitted", "streaming"].includes(o) && i && !x.some(function(e) {
		return "step-start" !== e.type;
	}), T = d ? (null == h ? void 0 : h.id) || u.id : (null == p ? void 0 : p.id) || u.id;
	return It.createElement("div", { className: "DocSearch-AskAiScreen-Response-Container" }, It.createElement("div", { className: "DocSearch-AskAiScreen-Response" }, It.createElement("div", { className: "DocSearch-AskAiScreen-Message DocSearch-AskAiScreen-Message--user" }, It.createElement("p", { className: "DocSearch-AskAiScreen-Query" }, null !== (r = null == w ? void 0 : w.text) && void 0 !== r ? r : "")), It.createElement("div", { className: "DocSearch-AskAiScreen-Message DocSearch-AskAiScreen-Message--assistant" }, It.createElement("div", { className: "DocSearch-AskAiScreen-MessageContent" }, "error" === o && a && i && !C && It.createElement("div", { className: "DocSearch-AskAiScreen-MessageContent DocSearch-AskAiScreen-Error" }, It.createElement(ba, null), It.createElement("div", { className: "DocSearch-AskAiScreen-Error-Content" }, It.createElement("h4", { className: "DocSearch-AskAiScreen-Error-Title" }, y), It.createElement(eo, {
		content: a.message,
		copyButtonText: "",
		copyButtonCopiedText: "",
		isStreaming: !1
	}))), I && It.createElement("div", { className: "DocSearch-AskAiScreen-MessageContent-Reasoning" }, It.createElement("span", { className: "shimmer" }, c.thinkingText || "Thinking...")), x.map(function(e, t) {
		var n = t;
		return "string" == typeof e ? It.createElement(eo, {
			key: n,
			content: e,
			copyButtonText: c.copyButtonText || "Copy",
			copyButtonCopiedText: c.copyButtonCopiedText || "Copied!",
			isStreaming: "streaming" === o
		}) : "aggregated-tool-call" === e.type ? It.createElement(za, {
			key: n,
			queries: e.queries,
			translations: c,
			onSearchQueryClick: s
		}) : "reasoning" === e.type && "streaming" === e.state ? It.createElement("div", {
			key: n,
			className: "DocSearch-AskAiScreen-MessageContent-Reasoning shimmer"
		}, It.createElement(ya, { className: "DocSearch-AskAiScreen-SmallerLoadingIcon" }), It.createElement("span", { className: "shimmer" }, "Reasoning...")) : "text" === e.type ? It.createElement(eo, {
			key: n,
			content: e.text,
			copyButtonText: c.copyButtonText || "Copy",
			copyButtonCopiedText: c.copyButtonCopiedText || "Copied!",
			isStreaming: "streaming" === e.state
		}) : "tool-searchIndex" === e.type || "tool-algolia_search_index" === e.type ? It.createElement(to, {
			key: n,
			translations: {
				preToolCallText: F,
				searchingText: k,
				toolCallResultText: b
			},
			part: e,
			onSearchQueryClick: s
		}) : null;
	})), O && It.createElement("p", { className: "DocSearck-AskAiScreen-MessageContent-Stopped" }, m)), It.createElement("div", { className: "DocSearch-AskAiScreen-Answer-Footer" }, It.createElement(ao, {
		id: T,
		showActions: B,
		latestAssistantMessageContent: (null == A ? void 0 : A.text) || null,
		translations: c,
		conversations: l,
		onFeedback: f
	}))), S.length > 0 ? It.createElement(io, {
		urlsToDisplay: S,
		relatedSourcesText: c.relatedSourcesText
	}) : null);
}
function ao(e) {
	var t = e.id, n = e.showActions, r = e.latestAssistantMessageContent, u = e.translations, a = e.conversations, i = e.onFeedback, o = It.useMemo(function() {
		var e, n, r = null === (e = a.getOne) || void 0 === e ? void 0 : e.call(a, t);
		return null !== (n = null == r ? void 0 : r.feedback) && void 0 !== n ? n : null;
	}, [a, t]), s = yn(It.useState(o), 2), c = s[0], l = s[1], f = yn(It.useState(!1), 2), d = f[0], p = f[1], h = yn(It.useState(null), 2), v = h[0], m = h[1], D = function() {
		var e = Xt(vn().m(function e(n) {
			var r;
			return vn().w(function(e) {
				for (;;) switch (e.p = e.n) {
					case 0:
						if (!d) {
							e.n = 1;
							break;
						}
						return e.a(2);
					case 1: return m(null), p(!0), e.p = 2, e.n = 3, null == i ? void 0 : i(t, "like" === n ? 1 : 0);
					case 3:
						l(n), e.n = 5;
						break;
					case 4: e.p = 4, r = e.v, m(r);
					case 5: return e.p = 5, p(!1), e.f(5);
					case 6: return e.a(2);
				}
			}, e, null, [[
				2,
				4,
				5,
				6
			]]);
		}));
		return function(t) {
			return e.apply(this, arguments);
		};
	}(), y = u.likeButtonTitle, g = void 0 === y ? "Like" : y, F = u.dislikeButtonTitle, E = void 0 === F ? "Dislike" : F, b = u.thanksForFeedbackText, _ = void 0 === b ? "Thanks for your feedback!" : b;
	return n && r ? It.createElement("div", { className: "DocSearch-AskAiScreen-Actions" }, null === c ? It.createElement(It.Fragment, null, d ? It.createElement(ya, { className: "DocSearch-AskAiScreen-SmallerLoadingIcon" }) : It.createElement(It.Fragment, null, It.createElement(lo, {
		title: g,
		onClick: function() {
			return D("like");
		}
	}), It.createElement(fo, {
		title: E,
		onClick: function() {
			return D("dislike");
		}
	})), v && It.createElement("p", { className: "DocSearch-AskAiScreen-FeedbackText" }, v.message || "An error occured")) : It.createElement("p", { className: "DocSearch-AskAiScreen-FeedbackText DocSearch-AskAiScreen-FeedbackText--visible" }, _), It.createElement(co, {
		translations: u,
		onClick: function() {
			return navigator.clipboard.writeText(r);
		}
	})) : null;
}
function io(e) {
	var t = e.urlsToDisplay, n = e.relatedSourcesText;
	return It.createElement("div", { className: "DocSearch-AskAiScreen-RelatedSources" }, It.createElement("p", { className: "DocSearch-AskAiScreen-RelatedSources-Title" }, n || "Related sources"), It.createElement("div", { className: "DocSearch-AskAiScreen-RelatedSources-List" }, t.length > 0 && t.map(function(e) {
		return It.createElement("a", {
			key: e.url,
			href: e.url,
			className: "DocSearch-AskAiScreen-RelatedSources-Item-Link",
			target: "_blank",
			rel: "noopener noreferrer"
		}, It.createElement(so, null), It.createElement("span", null, e.title || e.url));
	})));
}
function oo(e) {
	var t = e.translations, n = void 0 === t ? {} : t, r = hn(e, no), u = n.disclaimerText, a = void 0 === u ? "Answers are generated with AI which can make mistakes. Verify responses." : u, i = n.startNewConversationButtonText, o = void 0 === i ? "Start a new conversation" : i, s = r.messages, c = r.askAiError, l = r.status, f = r.agentStudio, d = Pe(function() {
		return "error" === l && Nn(c, Boolean(f));
	}, [
		l,
		c,
		f
	]), p = Pe(function() {
		return function(e) {
			if (e) {
				if (zn(e)) {
					var t = Mn(e);
					return t && !function(e) {
						var t = e.trim();
						return t.startsWith("{") && t.endsWith("}");
					}(t) ? t : "Could not complete response due to token output limits";
				}
				return Mn(e);
			}
		}(c);
	}, [c]), h = function(e, t) {
		return !e || !zn(e) && (!!jn(e) || !t || On(e).showNewConversationLink);
	}(c, Boolean(f)), v = Pe(function() {
		for (var e = [], t = 0; t < s.length; t++) if ("user" === s[t].role) {
			var n, r = s[t], u = "assistant" === (null === (n = s[t + 1]) || void 0 === n ? void 0 : n.role) ? s[t + 1] : null;
			e.push({
				id: r.id,
				userMessage: r,
				assistantMessage: u
			}), u && t++;
		}
		return function(e) {
			return e;
		}(e);
	}, [s, d]), m = function(e) {
		r.onAskAiToggle(!1), r.setQuery(e);
	}, D = d && (!jn(c) || s.some(function(e) {
		return "assistant" === e.role;
	}));
	return It.createElement("div", { className: "DocSearch-AskAiScreen DocSearch-AskAiScreen-Container" }, D && It.createElement("div", { className: "DocSearch-AskAiScreen-MessageContent DocSearch-AskAiScreen-Error DocSearch-AskAiScreen-Error--ThreadDepth" }, It.createElement("div", { className: "DocSearch-AskAiScreen-Error-Content" }, p ? It.createElement("p", { className: "DocSearch-AskAiScreen-Error-Title" }, p) : null, h ? It.createElement("p", null, It.createElement("button", {
		type: "button",
		className: "DocSearch-ThreadDepthError-Link",
		onClick: r.onNewConversation
	}, o), " ", "to continue.") : null)), It.createElement(ro, { disclaimerText: a }), It.createElement("div", { className: "DocSearch-AskAiScreen-Body" }, It.createElement("div", { className: "DocSearch-AskAiScreen-ExchangesList" }, v.slice().reverse().map(function(e, t) {
		return It.createElement(uo, {
			key: e.id,
			exchange: e,
			askAiError: r.askAiError,
			isLastExchange: 0 === t,
			loadingStatus: r.status,
			translations: n,
			conversations: r.conversations,
			agentStudio: f,
			onSearchQueryClick: m,
			onFeedback: r.onFeedback
		});
	}))));
}
function so() {
	return It.createElement("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round"
	}, It.createElement("line", {
		x1: "4",
		x2: "20",
		y1: "9",
		y2: "9"
	}), It.createElement("line", {
		x1: "4",
		x2: "20",
		y1: "15",
		y2: "15"
	}), It.createElement("line", {
		x1: "10",
		x2: "8",
		y1: "3",
		y2: "21"
	}), It.createElement("line", {
		x1: "16",
		x2: "14",
		y1: "3",
		y2: "21"
	}));
}
function co(e) {
	var t = e.onClick, n = e.translations, r = n.copyButtonTitle, u = void 0 === r ? "Copy" : r, a = n.copyButtonCopiedText, i = void 0 === a ? "Copied!" : a, o = yn(Se(!1), 2), s = o[0], c = o[1];
	return Oe(function() {
		if (s) {
			var e = setTimeout(function() {
				c(!1);
			}, 1500);
			return function() {
				return clearTimeout(e);
			};
		}
	}, [s]), It.createElement("button", {
		type: "button",
		className: "DocSearch-AskAiScreen-ActionButton DocSearch-AskAiScreen-CopyButton ".concat(s ? "DocSearch-AskAiScreen-CopyButton--copied" : ""),
		disabled: s,
		title: s ? i : u,
		onClick: function() {
			t(), c(!0);
		}
	}, s ? It.createElement("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "24",
		height: "24",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className: "lucide lucide-check-icon lucide-check"
	}, It.createElement("path", { d: "M20 6 9 17l-5-5" })) : It.createElement("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "24",
		height: "24",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className: "lucide lucide-copy-icon lucide-copy"
	}, It.createElement("rect", {
		width: "14",
		height: "14",
		x: "8",
		y: "8",
		rx: "2",
		ry: "2"
	}), It.createElement("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })));
}
function lo(e) {
	var t = e.title, n = e.onClick;
	return It.createElement("button", {
		type: "button",
		className: "DocSearch-AskAiScreen-ActionButton DocSearch-AskAiScreen-LikeButton",
		title: t,
		onClick: n
	}, It.createElement("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "24",
		height: "24",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className: "lucide lucide-thumbs-up-icon lucide-thumbs-up"
	}, It.createElement("path", { d: "M7 10v12" }), It.createElement("path", { d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" })));
}
function fo(e) {
	var t = e.title, n = e.onClick;
	return It.createElement("button", {
		type: "button",
		className: "DocSearch-AskAiScreen-ActionButton DocSearch-AskAiScreen-DislikeButton",
		title: t,
		onClick: n
	}, It.createElement("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "24",
		height: "24",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className: "lucide lucide-thumbs-down-icon lucide-thumbs-down"
	}, It.createElement("path", { d: "M17 14V2" }), It.createElement("path", { d: "M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" })));
}
var po = [
	"hit",
	"attribute",
	"tagName"
];
function ho(e, t) {
	return t.split(".").reduce(function(e, t) {
		return null != e && e[t] ? e[t] : null;
	}, e);
}
function vo(e) {
	var t = e.hit, n = e.attribute, r = e.tagName;
	return $(void 0 === r ? "span" : r, pn(pn({}, hn(e, po)), {}, { dangerouslySetInnerHTML: { __html: ho(t, "_snippetResult.".concat(n, ".value")) || ho(t, n) } }));
}
var mo = [
	"item",
	"getItemProps",
	"onItemClick",
	"translations",
	"collection"
];
function Do(e) {
	var t = It.useMemo(function() {
		return e.title ? e.title.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&#039;/g, "'") : null;
	}, [e.title]);
	return e.collection && 0 !== e.collection.items.length ? "askAI" === e.collection.source.sourceId ? It.createElement("section", { className: "DocSearch-AskAi-Section" }, It.createElement("ul", e.getListProps({ source: e.collection.source }), It.createElement(go, sn({
		item: e.collection.items[0],
		translations: e.translations
	}, e)))) : (e.collection.source.sourceId, It.createElement("section", { className: "DocSearch-Hits" }, It.createElement("div", { className: "DocSearch-Hit-source" }, t), It.createElement("ul", e.getListProps({ source: e.collection.source }), e.collection.items.map(function(t, n) {
		return It.createElement(yo, sn({
			key: [e.title, t.objectID].join(":"),
			item: t,
			index: n
		}, e));
	})))) : null;
}
function yo(e) {
	var t = e.item, n = e.index, r = e.renderIcon, u = e.renderAction, a = e.getItemProps, i = e.onItemClick, o = e.collection, s = e.hitComponent;
	return It.createElement("li", sn({ className: ["DocSearch-Hit", t.__docsearch_parent && "DocSearch-Hit--Child"].filter(Boolean).join(" ") }, a({
		item: t,
		source: o.source,
		onClick: function(e) {
			i(t, e);
		}
	})), It.createElement(s, { hit: t }, It.createElement("div", { className: "DocSearch-Hit-Container" }, r({
		item: t,
		index: n
	}), t.hierarchy[t.type] && "lvl1" === t.type && It.createElement("div", { className: "DocSearch-Hit-content-wrapper" }, It.createElement(vo, {
		className: "DocSearch-Hit-title",
		hit: t,
		attribute: "hierarchy.lvl1"
	}), t.content && It.createElement(vo, {
		className: "DocSearch-Hit-path",
		hit: t,
		attribute: "content"
	})), "askAI" === t.type && It.createElement("div", { className: "DocSearch-Hit-content-wrapper" }, It.createElement("span", { className: "DocSearch-Hit-title" }, Bn(t.hierarchy.lvl1 || ""))), t.hierarchy[t.type] && ("lvl2" === t.type || "lvl3" === t.type || "lvl4" === t.type || "lvl5" === t.type || "lvl6" === t.type) && It.createElement("div", { className: "DocSearch-Hit-content-wrapper" }, It.createElement(vo, {
		className: "DocSearch-Hit-title",
		hit: t,
		attribute: "hierarchy.".concat(t.type)
	}), It.createElement(vo, {
		className: "DocSearch-Hit-path",
		hit: t,
		attribute: "hierarchy.lvl1"
	})), "content" === t.type && It.createElement("div", { className: "DocSearch-Hit-content-wrapper" }, It.createElement(vo, {
		className: "DocSearch-Hit-title",
		hit: t,
		attribute: "content"
	}), It.createElement(vo, {
		className: "DocSearch-Hit-path",
		hit: t,
		attribute: "hierarchy.lvl1"
	})), u({ item: t }))));
}
function go(e) {
	var t = e.item, n = e.getItemProps, r = e.onItemClick, u = e.translations, a = e.collection, i = hn(e, mo), o = u || {}, s = o.askAiPlaceholder, c = void 0 === s ? "Ask AI: " : s, l = o.noResultsAskAiPlaceholder, f = void 0 === l ? "Didn't find it in the docs? Ask AI to help: " : l, d = 1 === i.state.collections.length ? f : c;
	return It.createElement("li", sn({ className: "DocSearch-Hit" }, n({
		item: t,
		source: a.source,
		onClick: function(e) {
			r(t, e);
		}
	})), It.createElement("div", { className: "DocSearch-Hit--AskAI" }, It.createElement("div", { className: "DocSearch-Hit-AskAIButton DocSearch-Hit-Container" }, It.createElement("div", { className: " DocSearch-Hit-AskAIButton-icon DocSearch-Hit-icon" }, It.createElement(ga, null)), It.createElement("div", { className: "DocSearch-Hit-AskAIButton-title" }, It.createElement("span", { className: "DocSearch-Hit-AskAIButton-title-highlight" }, d), It.createElement("mark", { className: "DocSearch-Hit-AskAIButton-title-query" }, String(t.query || ""))))));
}
var Fo = ["onAskAiToggle"];
function Eo(e) {
	var t = e.onAskAiToggle, n = hn(e, Fo), r = It.useMemo(function() {
		return n.state.collections[2];
	}, [n.state]);
	return It.useEffect(function() {
		r && 0 !== r.items.length || t(!0);
	}, [r, t]), It.createElement("div", { className: "DocSearch-Dropdown-Container DocSearch-Conversation-History" }, It.createElement(Do, sn({}, n, {
		key: r.source.sourceId,
		title: "",
		translations: n.translations,
		collection: r,
		renderIcon: function() {
			return It.createElement("div", { className: "DocSearch-Hit-icon" }, It.createElement(ga, null));
		},
		renderAction: function(e) {
			var t = e.item;
			return It.createElement("div", { className: "DocSearch-Hit-action" }, It.createElement("button", {
				type: "button",
				className: "DocSearch-Hit-action-button",
				onClick: function(e) {
					e.preventDefault(), e.stopPropagation(), n.conversations.remove(t), n.refresh();
				}
			}, It.createElement(Ea, null)));
		}
	})));
}
function bo(e) {
	var t = e.translations, n = void 0 === t ? {} : t, r = n.titleText, u = void 0 === r ? "Unable to fetch results" : r, a = n.helpText, i = void 0 === a ? "You might want to check your network connection." : a;
	return It.createElement("div", { className: "DocSearch-ErrorScreen" }, It.createElement("div", { className: "DocSearch-Screen-Icon" }, It.createElement(Oa, null)), It.createElement("p", { className: "DocSearch-Title" }, u), It.createElement("p", { className: "DocSearch-Help" }, i));
}
function _o(e) {
	var t = e.translations, n = void 0 === t ? {} : t, r = e.suggestedQuestions, u = void 0 === r ? [] : r, a = e.selectSuggestedQuestion, i = n.newConversationTitle, o = void 0 === i ? "How can I help you today?" : i, s = n.newConversationDescription, c = void 0 === s ? "I search through your documentation to help you find setup guides, feature details and troubleshooting tips, fast." : s;
	return It.createElement("div", { className: "DocSearch-NewConversationScreen" }, It.createElement("h3", { className: "DocSearch-NewConversationScreen-Title" }, o), It.createElement("p", { className: "DocSearch-NewConversationScreen-Description" }, c), It.createElement("div", { className: "DocSearch-NewConversationScreen-SuggestedQuestions" }, u.map(function(e) {
		return It.createElement("button", {
			key: e.objectID,
			type: "button",
			className: "DocSearch-NewConversationScreen-SuggestedQuestion",
			onClick: function() {
				return a(e);
			}
		}, e.question);
	})));
}
var ko = ["translations"];
function Co(e) {
	var t = e.translations, n = void 0 === t ? {} : t, r = hn(e, ko), u = n.noResultsText, a = void 0 === u ? "No results found for" : u, i = n.suggestedQueryText, o = void 0 === i ? "Try searching for" : i, s = n.reportMissingResultsText, c = void 0 === s ? "Believe this query should return results?" : s, l = n.reportMissingResultsLinkText, f = void 0 === l ? "Let us know." : l, d = r.state.context.searchSuggestions;
	return It.createElement("div", { className: "DocSearch-NoResults ".concat(r.canHandleAskAi ? "DocSearch-NoResults--withAskAi" : "") }, It.createElement("div", { className: "DocSearch-Screen-Icon" }, It.createElement(Ba, null)), It.createElement("p", { className: "DocSearch-Title" }, a, " \"", It.createElement("strong", null, r.state.query), "\""), d && d.length > 0 && It.createElement("div", { className: "DocSearch-NoResults-Prefill-List" }, It.createElement("p", { className: "DocSearch-Help" }, o, ":"), It.createElement("div", { className: "DocSearch-NoResults-Prefill-List-Items" }, d.slice(0, 3).reduce(function(e, t) {
		return [].concat(gn(e), [It.createElement("p", { key: t }, It.createElement($n, { size: 16 }), It.createElement("button", {
			className: "DocSearch-Prefill",
			key: t,
			type: "button",
			onClick: function() {
				r.setQuery(t.toLowerCase() + " "), r.refresh(), r.inputRef.current.focus();
			}
		}, t))]);
	}, []))), r.getMissingResultsUrl && It.createElement("p", { className: "DocSearch-Help" }, "".concat(c, " "), It.createElement("a", {
		href: r.getMissingResultsUrl({ query: r.state.query }),
		target: "_blank",
		rel: "noopener noreferrer"
	}, f)));
}
var Ao = ["translations"];
function wo(e) {
	var t = e.translations, n = void 0 === t ? {} : t, r = hn(e, Ao);
	return It.createElement("div", { className: "DocSearch-Dropdown-Container" }, r.state.collections.map(function(e) {
		if (0 === e.items.length) return null;
		var t = Qn(e.items[0]);
		return It.createElement(Do, sn({}, r, {
			key: e.source.sourceId,
			translations: n,
			title: t,
			collection: e,
			renderIcon: function(t) {
				var n, r = t.item, u = t.index;
				return It.createElement(It.Fragment, null, r.__docsearch_parent && It.createElement("svg", {
					className: "DocSearch-Hit-Tree",
					viewBox: "0 0 24 54"
				}, It.createElement("g", {
					stroke: "currentColor",
					fill: "none",
					fillRule: "evenodd",
					strokeLinecap: "round",
					strokeLinejoin: "round"
				}, r.__docsearch_parent !== (null === (n = e.items[u + 1]) || void 0 === n ? void 0 : n.__docsearch_parent) ? It.createElement("path", { d: "M8 6v21M20 27H8.3" }) : It.createElement("path", { d: "M8 6v42M20 27H8.3" }))), It.createElement("div", { className: "DocSearch-Hit-icon" }, It.createElement(Ca, { type: r.type })));
			},
			renderAction: function() {
				return It.createElement("div", { className: "DocSearch-Hit-action" }, It.createElement(_a, null));
			}
		}));
	}), r.resultsFooterComponent && It.createElement("section", { className: "DocSearch-HitsFooter" }, It.createElement(r.resultsFooterComponent, { state: r.state })));
}
var So = ["translations"];
function xo(e) {
	var t = e.translations, n = void 0 === t ? {} : t, r = hn(e, So), u = n.recentSearchesTitle, a = void 0 === u ? "Recent" : u, i = n.saveRecentSearchButtonTitle, o = void 0 === i ? "Save this search" : i, s = n.removeRecentSearchButtonTitle, c = void 0 === s ? "Remove this search from history" : s, l = n.favoriteSearchesTitle, f = void 0 === l ? "Favorite" : l, d = n.removeFavoriteSearchButtonTitle, p = void 0 === d ? "Remove this search from favorites" : d, h = n.recentConversationsTitle, v = void 0 === h ? "Recent conversations" : h, m = n.removeRecentConversationButtonTitle, D = void 0 === m ? "Remove this conversation from history" : m;
	return It.createElement("div", { className: "DocSearch-Dropdown-Container" }, It.createElement(Do, sn({}, r, {
		title: a,
		collection: r.state.collections[0],
		renderIcon: function() {
			return It.createElement("div", { className: "DocSearch-Hit-icon" }, It.createElement(Fa, null));
		},
		renderAction: function(e) {
			var t = e.item;
			return It.createElement(It.Fragment, null, It.createElement("div", { className: "DocSearch-Hit-action" }, It.createElement("button", {
				className: "DocSearch-Hit-action-button",
				title: o,
				type: "submit",
				onClick: function(e) {
					e.preventDefault(), e.stopPropagation(), r.favoriteSearches.add(t), r.recentSearches.remove(t), r.refresh();
				}
			}, It.createElement(Sa, null))), It.createElement("div", { className: "DocSearch-Hit-action" }, It.createElement("button", {
				className: "DocSearch-Hit-action-button",
				title: c,
				type: "submit",
				onClick: function(e) {
					e.preventDefault(), e.stopPropagation(), r.recentSearches.remove(t), r.refresh();
				}
			}, It.createElement(Ea, null))));
		}
	})), It.createElement(Do, sn({}, r, {
		title: f,
		collection: r.state.collections[1],
		renderIcon: function() {
			return It.createElement("div", { className: "DocSearch-Hit-icon" }, It.createElement(Sa, null));
		},
		renderAction: function(e) {
			var t = e.item;
			return It.createElement("div", { className: "DocSearch-Hit-action" }, It.createElement("button", {
				className: "DocSearch-Hit-action-button",
				title: p,
				type: "submit",
				onClick: function(e) {
					e.preventDefault(), e.stopPropagation(), r.favoriteSearches.remove(t), r.refresh();
				}
			}, It.createElement(Ea, null)));
		}
	})), It.createElement(Do, sn({}, r, {
		title: v,
		collection: r.state.collections[2],
		renderIcon: function() {
			return It.createElement("div", { className: "DocSearch-Hit-icon" }, It.createElement(ga, null));
		},
		renderAction: function(e) {
			var t = e.item;
			return It.createElement("div", { className: "DocSearch-Hit-action" }, It.createElement("button", {
				className: "DocSearch-Hit-action-button",
				title: D,
				type: "submit",
				onClick: function(e) {
					e.preventDefault(), e.stopPropagation(), r.conversations.remove(t), r.refresh();
				}
			}, It.createElement(Ea, null)));
		}
	})));
}
var Oo = ["translations"], Bo = It.memo(function(e) {
	var t, n = e.translations, r = void 0 === n ? {} : n, u = hn(e, Oo);
	return u.canHandleAskAi && u.isAskAiActive && "conversation-history" === u.askAiState ? It.createElement(Eo, u) : u.canHandleAskAi && u.isAskAiActive && "new-conversation" === u.askAiState ? It.createElement(_o, {
		translations: null == r ? void 0 : r.newConversation,
		selectSuggestedQuestion: u.selectSuggestedQuestion,
		suggestedQuestions: u.suggestedQuestions
	}) : u.isAskAiActive && u.canHandleAskAi ? It.createElement(oo, sn({}, u, {
		messages: u.messages,
		status: u.status,
		askAiError: u.askAiError,
		translations: null == r ? void 0 : r.askAiScreen,
		agentStudio: u.agentStudio
	})) : "error" === (null === (t = u.state) || void 0 === t ? void 0 : t.status) ? It.createElement(bo, { translations: null == r ? void 0 : r.errorScreen }) : u.state.query ? u.hasCollections || u.canHandleAskAi ? It.createElement(It.Fragment, null, It.createElement(wo, sn({}, u, { translations: null == r ? void 0 : r.resultsScreen })), u.canHandleAskAi && 1 === u.state.collections.length && It.createElement(Co, sn({}, u, { translations: null == r ? void 0 : r.noResultsScreen }))) : It.createElement(Co, sn({}, u, { translations: null == r ? void 0 : r.noResultsScreen })) : It.createElement(xo, sn({}, u, {
		hasCollections: u.hasCollections,
		translations: null == r ? void 0 : r.startScreen
	}));
}, function(e, t) {
	return "loading" === t.state.status || "stalled" === t.state.status;
});
function Io(e) {
	var t = e.size, n = void 0 === t ? 20 : t, r = e.color, u = void 0 === r ? "currentColor" : r;
	return It.createElement("svg", {
		width: n,
		height: n,
		className: "DocSearch-Back-Icon",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: u,
		strokeWidth: "1.6",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true"
	}, It.createElement("path", { d: "m12 19-7-7 7-7" }), It.createElement("path", { d: "M19 12H5" }));
}
var To = [
	"children",
	"className",
	"onClick"
], Po = It.createContext({
	open: !1,
	setOpen: function(e) {}
});
function jo(e) {
	var t = e.children, n = yn(It.useState(!1), 2), r = n[0], u = n[1], a = It.useRef(null);
	return It.useEffect(function() {
		function e(e) {
			var t;
			null !== (t = a.current) && void 0 !== t && t.contains(e.target) || u(!1);
		}
		return r && window.addEventListener("click", e), function() {
			window.removeEventListener("click", e);
		};
	}, [r]), It.createElement(Po.Provider, { value: {
		open: r,
		setOpen: u
	} }, It.createElement("div", {
		ref: a,
		className: "DocSearch-Menu"
	}, t));
}
function No(e) {
	var t = e.heading, n = e.shimmer, r = void 0 !== n && n;
	return It.createElement("span", { className: "DocSearch-Modal-heading".concat(r ? " shimmer" : "") }, t);
}
jo.Trigger = function(e) {
	var t = e.children, n = e.className, r = void 0 === n ? "" : n, u = e.disabled, a = It.useContext(Po), i = a.open, o = a.setOpen;
	return It.createElement("button", {
		type: "button",
		className: "DocSearch-Menu-trigger ".concat(r).concat(u ? " disabled" : ""),
		"aria-disabled": u,
		onClick: function() {
			u || o(!i);
		}
	}, t);
}, jo.Content = function(e) {
	var t = e.children, n = It.useContext(Po).open;
	return It.createElement("div", { className: "DocSearch-Menu-content".concat(n ? " open" : "") }, t);
}, jo.Item = function(e) {
	var t = e.children, n = e.className, r = void 0 === n ? "" : n, u = e.onClick, a = hn(e, To), i = It.useContext(Po).setOpen;
	return It.createElement("button", sn({
		type: "button",
		className: "DocSearch-Menu-item ".concat(r),
		onClick: function(e) {
			u && (u(e), i(!1));
		}
	}, a), t);
};
var zo = [
	"translations",
	"askAiState",
	"onAskAiToggle",
	"setAskAiState"
];
function Ro(e) {
	var t = e.translations, n = void 0 === t ? {} : t, r = e.askAiState, u = e.onAskAiToggle, a = e.setAskAiState, i = hn(e, zo), o = n.clearButtonTitle, s = void 0 === o ? "Clear" : o, c = n.clearButtonAriaLabel, l = void 0 === c ? "Clear the query" : c, f = n.closeButtonText, d = void 0 === f ? "Close" : f, p = n.closeButtonAriaLabel, h = void 0 === p ? "Close" : p, v = n.searchInputLabel, m = void 0 === v ? "Search" : v, D = n.backToKeywordSearchButtonText, y = void 0 === D ? "Back to keyword search" : D, g = n.backToKeywordSearchButtonAriaLabel, F = void 0 === g ? "Back to keyword search" : g, E = n.placeholderTextAskAiStreaming, b = void 0 === E ? "Answering..." : E, _ = n.newConversationPlaceholder, k = void 0 === _ ? "Ask a question" : _, C = n.conversationHistoryTitle, A = void 0 === C ? "My conversation history" : C, w = n.startNewConversationText, S = void 0 === w ? "Start a new conversation" : w, x = n.viewConversationHistoryText, O = void 0 === x ? "Conversation history" : x, B = n.threadDepthErrorPlaceholder, I = void 0 === B ? "Conversation limit reached" : B, T = i.getFormProps({ inputElement: i.inputRef.current }).onReset;
	It.useEffect(function() {
		i.autoFocus && i.inputRef.current && i.inputRef.current.focus();
	}, [i.autoFocus, i.inputRef]), It.useEffect(function() {
		i.isFromSelection && i.inputRef.current && i.inputRef.current.select();
	}, [i.isFromSelection, i.inputRef]);
	var P = It.useMemo(function() {
		var e = i.state.collections[2];
		return !!e && e.items.length > 0;
	}, [i.state.collections]), j = i.getInputProps({
		inputElement: i.inputRef.current,
		autoFocus: i.autoFocus,
		maxLength: 512
	}), N = /* @__PURE__ */ new Set([
		"ArrowUp",
		"ArrowDown",
		"Enter"
	]), z = j.onKeyDown, R = j.onChange, M = "streaming" === i.askAiStatus || "submitted" === i.askAiStatus, Z = "stalled" === i.state.status, L = i.isAskAiActive && "conversation-history" !== r, $ = i.isThreadDepthError || !1, q = i.placeholder;
	"new-conversation" === r && (q = k), $ && i.isAskAiActive && "minimal" !== i.askAiBlockingChrome && (q = I);
	var U = null;
	M && (U = b), "conversation-history" === r && (U = A), It.useEffect(function() {
		"streaming" !== i.askAiStatus && "submitted" !== i.askAiStatus && i.inputRef.current && i.inputRef.current.focus();
	}, [i.askAiStatus, i.inputRef]);
	var H = pn(pn({}, j), {}, {
		enterKeyHint: i.isAskAiActive ? "enter" : "search",
		onKeyDown: function(e) {
			if (i.isAskAiActive && N.has(e.key)) return "Enter" === e.key && !M && i.state.query && i.onAskAgain(i.state.query), e.preventDefault(), void e.stopPropagation();
			null == z || z(e);
		},
		onChange: function(e) {
			if (i.isAskAiActive) return i.setQuery(e.currentTarget.value), e.preventDefault(), void e.stopPropagation();
			null == R || R(e);
		},
		disabled: M || $ && i.isAskAiActive
	}), V = It.useCallback(function() {
		if (!$) return "conversation-history" === r ? (u(!0), void a("initial")) : void u(!1);
		i.onNewConversation();
	}, [
		r,
		$,
		u,
		a,
		i
	]);
	return It.createElement(It.Fragment, null, It.createElement("form", {
		className: "DocSearch-Form",
		onSubmit: function(e) {
			e.preventDefault();
		},
		onReset: T
	}, i.isAskAiActive ? It.createElement(It.Fragment, null, It.createElement("button", {
		type: "button",
		tabIndex: 0,
		className: "DocSearch-Action DocSearch-AskAi-Return",
		title: y,
		"aria-label": F,
		onClick: V
	}, It.createElement(Io, null))) : It.createElement(It.Fragment, null, Z && It.createElement("div", { className: "DocSearch-LoadingIndicator" }, It.createElement(ya, null)), !Z && It.createElement("label", sn({ className: "DocSearch-MagnifierLabel" }, i.getLabelProps()), It.createElement($n, null), It.createElement("span", { className: "DocSearch-VisuallyHiddenForAccessibility" }, m))), U && It.createElement(No, {
		heading: U,
		shimmer: M
	}), It.createElement("input", sn({
		className: "DocSearch-Input",
		ref: i.inputRef
	}, H, {
		placeholder: q,
		hidden: Boolean(U)
	})), It.createElement("div", { className: "DocSearch-Actions" }, It.createElement("button", {
		className: "DocSearch-Clear",
		type: "reset",
		"aria-label": l,
		hidden: !i.state.query,
		tabIndex: i.state.query ? 0 : -1,
		"aria-hidden": i.state.query ? "false" : "true"
	}, s), i.state.query && It.createElement("div", { className: "DocSearch-Divider" }), M && It.createElement(It.Fragment, null, It.createElement("button", {
		type: "button",
		className: "DocSearch-Action DocSearch-StopStreaming",
		onClick: i.onStopAskAiStreaming
	}, It.createElement(xa, null)), It.createElement("div", { className: "DocSearch-Divider" })), L && It.createElement(It.Fragment, null, It.createElement(jo, null, It.createElement(jo.Trigger, { className: "DocSearch-Action" }, It.createElement(Ia, null)), It.createElement(jo.Content, null, It.createElement(jo.Item, { onClick: i.onNewConversation }, It.createElement(Pa, null), S), P && It.createElement(jo.Item, { onClick: i.onViewConversationHistory }, It.createElement(Ta, null), O))), It.createElement("div", { className: "DocSearch-Divider" })), It.createElement("button", {
		type: "button",
		title: d,
		className: "DocSearch-Action DocSearch-Close",
		"aria-label": h,
		onClick: i.onClose
	}, It.createElement(Ea, null)))));
}
function Mo() {
	if ("undefined" != typeof window && window.localStorage) {
		var e = [];
		for (var t in window.localStorage) if (t.includes("__DOCSEARCH_")) {
			var n = window.localStorage[t];
			e.push({
				key: t,
				size: n.length + t.length
			});
		}
		e.sort(function(e, t) {
			return t.size - e.size;
		});
		for (var r = Math.ceil(e.length / 2), u = 0; u < r && u < e.length; u++) try {
			window.localStorage.removeItem(e[u].key);
		} catch (e) {}
	}
}
function Zo(e) {
	return !1 === function() {
		if ("undefined" == typeof window || !("localStorage" in window)) return !1;
		var e = "__TEST_KEY__";
		try {
			return window.localStorage.setItem(e, ""), window.localStorage.removeItem(e), !0;
		} catch (e) {
			return !1;
		}
	}() ? {
		setItem: function() {},
		getItem: function() {
			return [];
		}
	} : {
		setItem: function(t) {
			(function(e, t) {
				try {
					window.localStorage.setItem(e, JSON.stringify(t));
				} catch (n) {
					if (n instanceof DOMException && "QuotaExceededError" === n.name) try {
						Mo(), window.localStorage.setItem(e, JSON.stringify(t));
					} catch (e) {}
				}
			})(e, t);
		},
		getItem: function() {
			var t = window.localStorage.getItem(e);
			if (null === t) return [];
			try {
				var n = JSON.parse(t);
				return Array.isArray(n) ? n : [];
			} catch (t) {
				return window.localStorage.removeItem(e), [];
			}
		}
	};
}
var Lo = ["_highlightResult", "_snippetResult"];
function $o(e) {
	var t = e.key, n = e.limit, r = void 0 === n ? 5 : n, u = Zo(t), a = u.getItem().slice(0, r);
	return {
		add: function(e) {
			var t = e;
			t._highlightResult, t._snippetResult;
			var n = hn(t, Lo), i = a.findIndex(function(e) {
				return e.objectID === n.objectID;
			});
			i > -1 && a.splice(i, 1), a.unshift(n), a = a.slice(0, r), u.setItem(a);
		},
		remove: function(e) {
			a = a.filter(function(t) {
				return t.objectID !== e.objectID;
			}), u.setItem(a);
		},
		getAll: function() {
			return a;
		}
	};
}
var qo, Uo = "vercel.ai.error", Ho = Symbol.for(Uo), Vo = function() {
	function e(t) {
		var n, r = t.name, i = t.message, o = t.cause;
		return a(this, e), (n = u(this, e, [i]))[qo] = !0, n.name = r, n.cause = o, n;
	}
	return f(e, k(Error)), o(e, null, [{
		key: "isInstance",
		value: function(t) {
			return e.hasMarker(t, Uo);
		}
	}, {
		key: "hasMarker",
		value: function(e, t) {
			var n = Symbol.for(t);
			return null != e && "object" == b(e) && n in e && "boolean" == typeof e[n] && !0 === e[n];
		}
	}]);
}();
qo = Ho;
var Wo = Vo;
function Ko(e) {
	return null == e ? "unknown error" : "string" == typeof e ? e : e instanceof Error ? e.message : JSON.stringify(e);
}
var Jo, Qo = "AI_InvalidArgumentError", Go = "vercel.ai.error.".concat(Qo), Yo = Symbol.for(Go), Xo = function() {
	function e(t) {
		var n, r = t.message, i = t.cause, o = t.argument;
		return a(this, e), (n = u(this, e, [{
			name: Qo,
			message: r,
			cause: i
		}]))[Jo] = !0, n.argument = o, n;
	}
	return f(e, Wo), o(e, null, [{
		key: "isInstance",
		value: function(e) {
			return Wo.hasMarker(e, Go);
		}
	}]);
}();
Jo = Yo;
var es, ts = "AI_JSONParseError", ns = "vercel.ai.error.".concat(ts), rs = Symbol.for(ns), us = function() {
	function e(t) {
		var n, r = t.text, i = t.cause;
		return a(this, e), (n = u(this, e, [{
			name: ts,
			message: "JSON parsing failed: Text: ".concat(r, ".\nError message: ").concat(Ko(i)),
			cause: i
		}]))[es] = !0, n.text = r, n;
	}
	return f(e, Wo), o(e, null, [{
		key: "isInstance",
		value: function(e) {
			return Wo.hasMarker(e, ns);
		}
	}]);
}();
es = rs;
var as, is = "AI_TypeValidationError", os = "vercel.ai.error.".concat(is);
as = Symbol.for(os);
var cs = function() {
	function e(t) {
		var n, r = t.value, i = t.cause;
		return a(this, e), (n = u(this, e, [{
			name: is,
			message: "Type validation failed: Value: ".concat(JSON.stringify(r), ".\nError message: ").concat(Ko(i)),
			cause: i
		}]))[as] = !0, n.value = r, n;
	}
	return f(e, Wo), o(e, null, [{
		key: "isInstance",
		value: function(e) {
			return Wo.hasMarker(e, os);
		}
	}, {
		key: "wrap",
		value: function(t) {
			var n = t.value, r = t.cause;
			return e.isInstance(r) && r.value === n ? r : new e({
				value: n,
				cause: r
			});
		}
	}]);
}(), ls = function() {
	function e(t, n) {
		var r;
		return tn(this, e), (r = en(this, e, [t])).name = "ParseError", r.type = n.type, r.field = n.field, r.value = n.value, r.line = n.line, r;
	}
	return ln(e, _n(Error)), un(e);
}();
function fs(e) {}
var ds = function() {
	function e() {
		var t, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = n.onError, u = n.onRetry, a = n.onComment;
		return tn(this, e), en(this, e, [{
			start: function(e) {
				t = function(e) {
					if ("function" == typeof e) throw new TypeError("`callbacks` must be an object, got a function instead. Did you mean `{onEvent: fn}`?");
					var t, n = e.onEvent, r = void 0 === n ? fs : n, u = e.onError, a = void 0 === u ? fs : u, i = e.onRetry, o = void 0 === i ? fs : i, s = e.onComment, c = "", l = !0, f = "", d = "";
					function p(e) {
						if ("" === e) return f.length > 0 && r({
							id: t,
							event: d || void 0,
							data: f.endsWith("\n") ? f.slice(0, -1) : f
						}), t = void 0, f = "", void (d = "");
						if (e.startsWith(":")) s && s(e.slice(e.startsWith(": ") ? 2 : 1));
						else {
							var n = e.indexOf(":");
							if (-1 === n) h(e, "", e);
							else {
								var u = e.slice(0, n), a = " " === e[n + 1] ? 2 : 1;
								h(u, e.slice(n + a), e);
							}
						}
					}
					function h(e, n, r) {
						switch (e) {
							case "event":
								d = n;
								break;
							case "data":
								f = "".concat(f).concat(n, "\n");
								break;
							case "id":
								t = n.includes("\0") ? void 0 : n;
								break;
							case "retry":
								/^\d+$/.test(n) ? o(parseInt(n, 10)) : a(new ls("Invalid `retry` value: \"".concat(n, "\""), {
									type: "invalid-retry",
									value: n,
									line: r
								}));
								break;
							default: a(new ls("Unknown field \"".concat(e.length > 20 ? "".concat(e.slice(0, 20), "…") : e, "\""), {
								type: "unknown-field",
								field: e,
								value: n,
								line: r
							}));
						}
					}
					return {
						feed: function(e) {
							var t, n = l ? e.replace(/^\xEF\xBB\xBF/, "") : e, u = yn(function(e) {
								for (var t = [], n = "", r = 0; r < e.length;) {
									var u = e.indexOf("\r", r), a = e.indexOf("\n", r), i = -1;
									if (-1 !== u && -1 !== a ? i = Math.min(u, a) : -1 !== u ? i = u === e.length - 1 ? -1 : u : -1 !== a && (i = a), -1 === i) {
										n = e.slice(r);
										break;
									}
									var o = e.slice(r, i);
									t.push(o), "\r" === e[(r = i + 1) - 1] && "\n" === e[r] && r++;
								}
								return [t, n];
							}("".concat(c).concat(n)), 2), a = u[0], i = u[1], o = an(a);
							try {
								for (o.s(); !(t = o.n()).done;) p(t.value);
							} catch (e) {
								o.e(e);
							} finally {
								o.f();
							}
							c = i, l = !1;
						},
						reset: function() {
							c && (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).consume && p(c), l = !0, t = void 0, f = "", d = "", c = "";
						}
					};
				}({
					onEvent: function(t) {
						e.enqueue(t);
					},
					onError: function(t) {
						"terminate" === r ? e.error(t) : "function" == typeof r && r(t);
					},
					onRetry: u,
					onComment: a
				});
			},
			transform: function(e) {
				t.feed(e);
			}
		}]);
	}
	return ln(e, _n(TransformStream)), un(e);
}();
function ps(e, t, n) {
	var r;
	function u(n, r) {
		var u, a, o;
		for (var s in Object.defineProperty(n, "_zod", {
			value: null !== (u = n._zod) && void 0 !== u ? u : {},
			enumerable: !1
		}), null !== (a = (o = n._zod).traits) && void 0 !== a || (o.traits = /* @__PURE__ */ new Set()), n._zod.traits.add(e), t(n, r), i.prototype) s in n || Object.defineProperty(n, s, { value: i.prototype[s].bind(n) });
		n._zod.constr = i, n._zod.def = r;
	}
	var a = function(e) {
		function t() {
			return tn(this, t), en(this, t, arguments);
		}
		return ln(t, e), un(t);
	}(null !== (r = null == n ? void 0 : n.Parent) && void 0 !== r ? r : Object);
	function i(e) {
		var t, r, i = null != n && n.Parent ? new a() : this;
		u(i, e), null !== (t = (r = i._zod).deferred) && void 0 !== t || (r.deferred = []);
		var o, s = an(i._zod.deferred);
		try {
			for (s.s(); !(o = s.n()).done;) (0, o.value)();
		} catch (e) {
			s.e(e);
		} finally {
			s.f();
		}
		return i;
	}
	return Object.defineProperty(a, "name", { value: e }), Object.defineProperty(i, "init", { value: u }), Object.defineProperty(i, Symbol.hasInstance, { value: function(t) {
		var r;
		return !!(null != n && n.Parent && t instanceof n.Parent) || (null == t || null === (r = t._zod) || void 0 === r || null === (r = r.traits) || void 0 === r ? void 0 : r.has(e));
	} }), Object.defineProperty(i, "name", { value: e }), i;
}
var hs = function() {
	function e() {
		return tn(this, e), en(this, e, ["Encountered Promise during synchronous parse. Use .parseAsync() instead."]);
	}
	return ln(e, _n(Error)), un(e);
}(), vs = function() {
	function e(t) {
		var n;
		return tn(this, e), (n = en(this, e, ["Encountered unidirectional transform during encode: ".concat(t)])).name = "ZodEncodeError", n;
	}
	return ln(e, _n(Error)), un(e);
}(), ms = {};
function Ds(e) {
	return ms;
}
function ys(e) {
	var t = Object.values(e).filter(function(e) {
		return "number" == typeof e;
	});
	return Object.entries(e).filter(function(e) {
		var n = yn(e, 2), r = n[0];
		return n[1], -1 === t.indexOf(+r);
	}).map(function(e) {
		var t = yn(e, 2);
		return t[0], t[1];
	});
}
function gs(e, t) {
	return "bigint" == typeof t ? t.toString() : t;
}
function Fs(e) {
	return { get value() {
		var t = e();
		return Object.defineProperty(this, "value", { value: t }), t;
	} };
}
function Es(e) {
	return null == e;
}
function bs(e) {
	var t = e.startsWith("^") ? 1 : 0, n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
var _s = Symbol("evaluating");
function ks(e, t, n) {
	var r = void 0;
	Object.defineProperty(e, t, {
		get: function() {
			if (r !== _s) return void 0 === r && (r = _s, r = n()), r;
		},
		set: function(n) {
			Object.defineProperty(e, t, { value: n });
		},
		configurable: !0
	});
}
function Cs(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function As() {
	for (var e = {}, t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
	for (var u = 0, a = n; u < a.length; u++) {
		var i = a[u], o = Object.getOwnPropertyDescriptors(i);
		Object.assign(e, o);
	}
	return Object.defineProperties({}, e);
}
function ws(e) {
	return JSON.stringify(e);
}
var Ss = "captureStackTrace" in Error ? Error.captureStackTrace : function() {};
function xs(e) {
	return "object" === En(e) && null !== e && !Array.isArray(e);
}
var Os = Fs(function() {
	var e;
	if ("undefined" != typeof navigator && null !== (e = navigator) && void 0 !== e && null !== (e = e.userAgent) && void 0 !== e && e.includes("Cloudflare")) return !1;
	try {
		return new Function(""), !0;
	} catch (e) {
		return !1;
	}
});
function Bs(e) {
	if (!1 === xs(e)) return !1;
	var t = e.constructor;
	if (void 0 === t) return !0;
	var n = t.prototype;
	return !1 !== xs(n) && !1 !== Object.prototype.hasOwnProperty.call(n, "isPrototypeOf");
}
function Is(e) {
	return Bs(e) ? pn({}, e) : Array.isArray(e) ? gn(e) : e;
}
var Ts = /* @__PURE__ */ new Set([
	"string",
	"number",
	"symbol"
]);
function Ps(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function js(e, t, n) {
	var r = new e._zod.constr(null != t ? t : e._zod.def);
	return (!t || null != n && n.parent) && (r._zod.parent = e), r;
}
function Ns(e) {
	var t = e;
	if (!t) return {};
	if ("string" == typeof t) return { error: function() {
		return t;
	} };
	if (void 0 !== (null == t ? void 0 : t.message)) {
		if (void 0 !== (null == t ? void 0 : t.error)) throw new Error("Cannot specify both `message` and `error` params");
		t.error = t.message;
	}
	return delete t.message, "string" == typeof t.error ? pn(pn({}, t), {}, { error: function() {
		return t.error;
	} }) : t;
}
var zs = {
	safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function Rs(e) {
	var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
	if (!0 === e.aborted) return !0;
	for (var n = t; n < e.issues.length; n++) {
		var r;
		if (!0 !== (null === (r = e.issues[n]) || void 0 === r ? void 0 : r.continue)) return !0;
	}
	return !1;
}
function Ms(e, t) {
	return t.map(function(t) {
		var n, r;
		return null !== (n = (r = t).path) && void 0 !== n || (r.path = []), t.path.unshift(e), t;
	});
}
function Zs(e) {
	return "string" == typeof e ? e : null == e ? void 0 : e.message;
}
function Ls(e, t, n) {
	var r, u = pn(pn({}, e), {}, { path: null !== (r = e.path) && void 0 !== r ? r : [] });
	if (!e.message) {
		var a, i, o, s, c, l, f, d, p;
		u.message = null !== (a = null !== (i = null !== (o = null !== (s = Zs(null === (c = e.inst) || void 0 === c || null === (c = c._zod.def) || void 0 === c || null === (l = c.error) || void 0 === l ? void 0 : l.call(c, e))) && void 0 !== s ? s : Zs(null == t || null === (f = t.error) || void 0 === f ? void 0 : f.call(t, e))) && void 0 !== o ? o : Zs(null === (d = n.customError) || void 0 === d ? void 0 : d.call(n, e))) && void 0 !== i ? i : Zs(null === (p = n.localeError) || void 0 === p ? void 0 : p.call(n, e))) && void 0 !== a ? a : "Invalid input";
	}
	return delete u.inst, delete u.continue, null != t && t.reportInput || delete u.input, u;
}
function $s(e) {
	return e instanceof Set ? "set" : e instanceof Map ? "map" : e instanceof File ? "file" : "unknown";
}
function qs(e) {
	return Array.isArray(e) ? "array" : "string" == typeof e ? "string" : "unknown";
}
function Us() {
	for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
	var r = t[0], u = t[1], a = t[2];
	return "string" == typeof r ? {
		message: r,
		code: "custom",
		input: u,
		inst: a
	} : pn({}, r);
}
var Hs = function(e, t) {
	e.name = "$ZodError", Object.defineProperty(e, "_zod", {
		value: e._zod,
		enumerable: !1
	}), Object.defineProperty(e, "issues", {
		value: t,
		enumerable: !1
	}), e.message = JSON.stringify(t, gs, 2), Object.defineProperty(e, "toString", {
		value: function() {
			return e.message;
		},
		enumerable: !1
	});
}, Vs = ps("$ZodError", Hs), Ws = ps("$ZodError", Hs, { Parent: Error }), Ks = function(e) {
	return function(t, n, r, u) {
		var a = r ? Object.assign(r, { async: !1 }) : { async: !1 }, i = t._zod.run({
			value: n,
			issues: []
		}, a);
		if (i instanceof Promise) throw new hs();
		if (i.issues.length) {
			var o, s = new (null !== (o = null == u ? void 0 : u.Err) && void 0 !== o ? o : e)(i.issues.map(function(e) {
				return Ls(e, a, Ds());
			}));
			throw Ss(s, null == u ? void 0 : u.callee), s;
		}
		return i.value;
	};
}, Js = function(e) {
	return function() {
		var t = Xt(vn().m(function t(n, r, u, a) {
			var i, o, s, c;
			return vn().w(function(t) {
				for (;;) switch (t.n) {
					case 0:
						if (i = u ? Object.assign(u, { async: !0 }) : { async: !0 }, !((o = n._zod.run({
							value: r,
							issues: []
						}, i)) instanceof Promise)) {
							t.n = 2;
							break;
						}
						return t.n = 1, o;
					case 1: o = t.v;
					case 2:
						if (!o.issues.length) {
							t.n = 3;
							break;
						}
						throw c = new (null !== (s = null == a ? void 0 : a.Err) && void 0 !== s ? s : e)(o.issues.map(function(e) {
							return Ls(e, i, Ds());
						})), Ss(c, null == a ? void 0 : a.callee), c;
					case 3: return t.a(2, o.value);
				}
			}, t);
		}));
		return function(e, n, r, u) {
			return t.apply(this, arguments);
		};
	}();
}, Qs = function(e) {
	return function(t, n, r) {
		var u = r ? pn(pn({}, r), {}, { async: !1 }) : { async: !1 }, a = t._zod.run({
			value: n,
			issues: []
		}, u);
		if (a instanceof Promise) throw new hs();
		return a.issues.length ? {
			success: !1,
			error: new (null != e ? e : Vs)(a.issues.map(function(e) {
				return Ls(e, u, Ds());
			}))
		} : {
			success: !0,
			data: a.value
		};
	};
}, Gs = Qs(Ws), Ys = function(e) {
	return function() {
		var t = Xt(vn().m(function t(n, r, u) {
			var a, i;
			return vn().w(function(t) {
				for (;;) switch (t.n) {
					case 0:
						if (a = u ? Object.assign(u, { async: !0 }) : { async: !0 }, !((i = n._zod.run({
							value: r,
							issues: []
						}, a)) instanceof Promise)) {
							t.n = 2;
							break;
						}
						return t.n = 1, i;
					case 1: i = t.v;
					case 2: return t.a(2, i.issues.length ? {
						success: !1,
						error: new e(i.issues.map(function(e) {
							return Ls(e, a, Ds());
						}))
					} : {
						success: !0,
						data: i.value
					});
				}
			}, t);
		}));
		return function(e, n, r) {
			return t.apply(this, arguments);
		};
	}();
}, Xs = Ys(Ws), ec = /^[cC][^\s-]{8,}$/, tc = /^[0-9a-z]+$/, nc = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, rc = /^[0-9a-vA-V]{20}$/, uc = /^[A-Za-z0-9]{27}$/, ac = /^[a-zA-Z0-9_-]{21}$/, ic = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, oc = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, sc = function(e) {
	return e ? new RegExp("^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-".concat(e, "[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$")) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
}, cc = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, lc = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, fc = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, dc = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, pc = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, hc = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, vc = /^[A-Za-z0-9_-]*$/, mc = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/, Dc = /^\+(?:[0-9]){6,14}[0-9]$/, yc = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", gc = new RegExp("^".concat(yc, "$"));
function Fc(e) {
	var t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return "number" == typeof e.precision ? -1 === e.precision ? "".concat(t) : 0 === e.precision ? "".concat(t, ":[0-5]\\d") : "".concat(t, ":[0-5]\\d\\.\\d{").concat(e.precision, "}") : "".concat(t, "(?::[0-5]\\d(?:\\.\\d+)?)?");
}
var Ec = /^-?\d+$/, bc = /^-?\d+(?:\.\d+)?/, _c = /^(?:true|false)$/i, kc = /^null$/i, Cc = /^[^A-Z]*$/, Ac = /^[^a-z]*$/, wc = ps("$ZodCheck", function(e, t) {
	var n, r, u;
	null !== (n = e._zod) && void 0 !== n || (e._zod = {}), e._zod.def = t, null !== (r = (u = e._zod).onattach) && void 0 !== r || (u.onattach = []);
}), Sc = {
	number: "number",
	bigint: "bigint",
	object: "date"
}, xc = ps("$ZodCheckLessThan", function(e, t) {
	wc.init(e, t);
	var n = Sc[En(t.value)];
	e._zod.onattach.push(function(e) {
		var n, r = e._zod.bag, u = null !== (n = t.inclusive ? r.maximum : r.exclusiveMaximum) && void 0 !== n ? n : Number.POSITIVE_INFINITY;
		t.value < u && (t.inclusive ? r.maximum = t.value : r.exclusiveMaximum = t.value);
	}), e._zod.check = function(r) {
		(t.inclusive ? r.value <= t.value : r.value < t.value) || r.issues.push({
			origin: n,
			code: "too_big",
			maximum: t.value,
			input: r.value,
			inclusive: t.inclusive,
			inst: e,
			continue: !t.abort
		});
	};
}), Oc = ps("$ZodCheckGreaterThan", function(e, t) {
	wc.init(e, t);
	var n = Sc[En(t.value)];
	e._zod.onattach.push(function(e) {
		var n, r = e._zod.bag, u = null !== (n = t.inclusive ? r.minimum : r.exclusiveMinimum) && void 0 !== n ? n : Number.NEGATIVE_INFINITY;
		t.value > u && (t.inclusive ? r.minimum = t.value : r.exclusiveMinimum = t.value);
	}), e._zod.check = function(r) {
		(t.inclusive ? r.value >= t.value : r.value > t.value) || r.issues.push({
			origin: n,
			code: "too_small",
			minimum: t.value,
			input: r.value,
			inclusive: t.inclusive,
			inst: e,
			continue: !t.abort
		});
	};
}), Bc = ps("$ZodCheckMultipleOf", function(e, t) {
	wc.init(e, t), e._zod.onattach.push(function(e) {
		var n, r;
		null !== (n = (r = e._zod.bag).multipleOf) && void 0 !== n || (r.multipleOf = t.value);
	}), e._zod.check = function(n) {
		if (En(n.value) !== En(t.value)) throw new Error("Cannot mix number and bigint in multiple_of check.");
		("bigint" == typeof n.value ? n.value % t.value === BigInt(0) : 0 === function(e, t) {
			var n = (e.toString().split(".")[1] || "").length, r = t.toString(), u = (r.split(".")[1] || "").length;
			if (0 === u && /\d?e-\d?/.test(r)) {
				var a = r.match(/\d?e-(\d?)/);
				null != a && a[1] && (u = Number.parseInt(a[1]));
			}
			var i = n > u ? n : u;
			return Number.parseInt(e.toFixed(i).replace(".", "")) % Number.parseInt(t.toFixed(i).replace(".", "")) / Math.pow(10, i);
		}(n.value, t.value)) || n.issues.push({
			origin: En(n.value),
			code: "not_multiple_of",
			divisor: t.value,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Ic = ps("$ZodCheckNumberFormat", function(e, t) {
	var n;
	wc.init(e, t), t.format = t.format || "float64";
	var r = null === (n = t.format) || void 0 === n ? void 0 : n.includes("int"), u = r ? "int" : "number", a = yn(zs[t.format], 2), i = a[0], o = a[1];
	e._zod.onattach.push(function(e) {
		var n = e._zod.bag;
		n.format = t.format, n.minimum = i, n.maximum = o, r && (n.pattern = Ec);
	}), e._zod.check = function(n) {
		var a = n.value;
		if (r) {
			if (!Number.isInteger(a)) return void n.issues.push({
				expected: u,
				format: t.format,
				code: "invalid_type",
				continue: !1,
				input: a,
				inst: e
			});
			if (!Number.isSafeInteger(a)) return void (a > 0 ? n.issues.push({
				input: a,
				code: "too_big",
				maximum: Number.MAX_SAFE_INTEGER,
				note: "Integers must be within the safe integer range.",
				inst: e,
				origin: u,
				continue: !t.abort
			}) : n.issues.push({
				input: a,
				code: "too_small",
				minimum: Number.MIN_SAFE_INTEGER,
				note: "Integers must be within the safe integer range.",
				inst: e,
				origin: u,
				continue: !t.abort
			}));
		}
		a < i && n.issues.push({
			origin: "number",
			input: a,
			code: "too_small",
			minimum: i,
			inclusive: !0,
			inst: e,
			continue: !t.abort
		}), a > o && n.issues.push({
			origin: "number",
			input: a,
			code: "too_big",
			maximum: o,
			inst: e
		});
	};
}), Tc = ps("$ZodCheckMaxSize", function(e, t) {
	var n, r;
	wc.init(e, t), null !== (n = (r = e._zod.def).when) && void 0 !== n || (r.when = function(e) {
		var t = e.value;
		return !Es(t) && void 0 !== t.size;
	}), e._zod.onattach.push(function(e) {
		var n, r = null !== (n = e._zod.bag.maximum) && void 0 !== n ? n : Number.POSITIVE_INFINITY;
		t.maximum < r && (e._zod.bag.maximum = t.maximum);
	}), e._zod.check = function(n) {
		var r = n.value;
		r.size <= t.maximum || n.issues.push({
			origin: $s(r),
			code: "too_big",
			maximum: t.maximum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), Pc = ps("$ZodCheckMinSize", function(e, t) {
	var n, r;
	wc.init(e, t), null !== (n = (r = e._zod.def).when) && void 0 !== n || (r.when = function(e) {
		var t = e.value;
		return !Es(t) && void 0 !== t.size;
	}), e._zod.onattach.push(function(e) {
		var n, r = null !== (n = e._zod.bag.minimum) && void 0 !== n ? n : Number.NEGATIVE_INFINITY;
		t.minimum > r && (e._zod.bag.minimum = t.minimum);
	}), e._zod.check = function(n) {
		var r = n.value;
		r.size >= t.minimum || n.issues.push({
			origin: $s(r),
			code: "too_small",
			minimum: t.minimum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), jc = ps("$ZodCheckSizeEquals", function(e, t) {
	var n, r;
	wc.init(e, t), null !== (n = (r = e._zod.def).when) && void 0 !== n || (r.when = function(e) {
		var t = e.value;
		return !Es(t) && void 0 !== t.size;
	}), e._zod.onattach.push(function(e) {
		var n = e._zod.bag;
		n.minimum = t.size, n.maximum = t.size, n.size = t.size;
	}), e._zod.check = function(n) {
		var r = n.value, u = r.size;
		if (u !== t.size) {
			var a = u > t.size;
			n.issues.push(pn(pn({ origin: $s(r) }, a ? {
				code: "too_big",
				maximum: t.size
			} : {
				code: "too_small",
				minimum: t.size
			}), {}, {
				inclusive: !0,
				exact: !0,
				input: n.value,
				inst: e,
				continue: !t.abort
			}));
		}
	};
}), Nc = ps("$ZodCheckMaxLength", function(e, t) {
	var n, r;
	wc.init(e, t), null !== (n = (r = e._zod.def).when) && void 0 !== n || (r.when = function(e) {
		var t = e.value;
		return !Es(t) && void 0 !== t.length;
	}), e._zod.onattach.push(function(e) {
		var n, r = null !== (n = e._zod.bag.maximum) && void 0 !== n ? n : Number.POSITIVE_INFINITY;
		t.maximum < r && (e._zod.bag.maximum = t.maximum);
	}), e._zod.check = function(n) {
		var r = n.value;
		if (!(r.length <= t.maximum)) {
			var u = qs(r);
			n.issues.push({
				origin: u,
				code: "too_big",
				maximum: t.maximum,
				inclusive: !0,
				input: r,
				inst: e,
				continue: !t.abort
			});
		}
	};
}), zc = ps("$ZodCheckMinLength", function(e, t) {
	var n, r;
	wc.init(e, t), null !== (n = (r = e._zod.def).when) && void 0 !== n || (r.when = function(e) {
		var t = e.value;
		return !Es(t) && void 0 !== t.length;
	}), e._zod.onattach.push(function(e) {
		var n, r = null !== (n = e._zod.bag.minimum) && void 0 !== n ? n : Number.NEGATIVE_INFINITY;
		t.minimum > r && (e._zod.bag.minimum = t.minimum);
	}), e._zod.check = function(n) {
		var r = n.value;
		if (!(r.length >= t.minimum)) {
			var u = qs(r);
			n.issues.push({
				origin: u,
				code: "too_small",
				minimum: t.minimum,
				inclusive: !0,
				input: r,
				inst: e,
				continue: !t.abort
			});
		}
	};
}), Rc = ps("$ZodCheckLengthEquals", function(e, t) {
	var n, r;
	wc.init(e, t), null !== (n = (r = e._zod.def).when) && void 0 !== n || (r.when = function(e) {
		var t = e.value;
		return !Es(t) && void 0 !== t.length;
	}), e._zod.onattach.push(function(e) {
		var n = e._zod.bag;
		n.minimum = t.length, n.maximum = t.length, n.length = t.length;
	}), e._zod.check = function(n) {
		var r = n.value, u = r.length;
		if (u !== t.length) {
			var a = qs(r), i = u > t.length;
			n.issues.push(pn(pn({ origin: a }, i ? {
				code: "too_big",
				maximum: t.length
			} : {
				code: "too_small",
				minimum: t.length
			}), {}, {
				inclusive: !0,
				exact: !0,
				input: n.value,
				inst: e,
				continue: !t.abort
			}));
		}
	};
}), Mc = ps("$ZodCheckStringFormat", function(e, t) {
	var n, r, u, a;
	wc.init(e, t), e._zod.onattach.push(function(e) {
		var n, r = e._zod.bag;
		r.format = t.format, t.pattern && (null !== (n = r.patterns) && void 0 !== n || (r.patterns = /* @__PURE__ */ new Set()), r.patterns.add(t.pattern));
	}), t.pattern ? null !== (n = (u = e._zod).check) && void 0 !== n || (u.check = function(n) {
		t.pattern.lastIndex = 0, t.pattern.test(n.value) || n.issues.push(pn(pn({
			origin: "string",
			code: "invalid_format",
			format: t.format,
			input: n.value
		}, t.pattern ? { pattern: t.pattern.toString() } : {}), {}, {
			inst: e,
			continue: !t.abort
		}));
	}) : null !== (r = (a = e._zod).check) && void 0 !== r || (a.check = function() {});
}), Zc = ps("$ZodCheckRegex", function(e, t) {
	Mc.init(e, t), e._zod.check = function(n) {
		t.pattern.lastIndex = 0, t.pattern.test(n.value) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "regex",
			input: n.value,
			pattern: t.pattern.toString(),
			inst: e,
			continue: !t.abort
		});
	};
}), Lc = ps("$ZodCheckLowerCase", function(e, t) {
	var n;
	null !== (n = t.pattern) && void 0 !== n || (t.pattern = Cc), Mc.init(e, t);
}), $c = ps("$ZodCheckUpperCase", function(e, t) {
	var n;
	null !== (n = t.pattern) && void 0 !== n || (t.pattern = Ac), Mc.init(e, t);
}), qc = ps("$ZodCheckIncludes", function(e, t) {
	wc.init(e, t);
	var n = Ps(t.includes), r = new RegExp("number" == typeof t.position ? "^.{".concat(t.position, "}").concat(n) : n);
	t.pattern = r, e._zod.onattach.push(function(e) {
		var t, n = e._zod.bag;
		null !== (t = n.patterns) && void 0 !== t || (n.patterns = /* @__PURE__ */ new Set()), n.patterns.add(r);
	}), e._zod.check = function(n) {
		n.value.includes(t.includes, t.position) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "includes",
			includes: t.includes,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Uc = ps("$ZodCheckStartsWith", function(e, t) {
	var n;
	wc.init(e, t);
	var r = new RegExp("^".concat(Ps(t.prefix), ".*"));
	null !== (n = t.pattern) && void 0 !== n || (t.pattern = r), e._zod.onattach.push(function(e) {
		var t, n = e._zod.bag;
		null !== (t = n.patterns) && void 0 !== t || (n.patterns = /* @__PURE__ */ new Set()), n.patterns.add(r);
	}), e._zod.check = function(n) {
		n.value.startsWith(t.prefix) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "starts_with",
			prefix: t.prefix,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Hc = ps("$ZodCheckEndsWith", function(e, t) {
	var n;
	wc.init(e, t);
	var r = new RegExp(".*".concat(Ps(t.suffix), "$"));
	null !== (n = t.pattern) && void 0 !== n || (t.pattern = r), e._zod.onattach.push(function(e) {
		var t, n = e._zod.bag;
		null !== (t = n.patterns) && void 0 !== t || (n.patterns = /* @__PURE__ */ new Set()), n.patterns.add(r);
	}), e._zod.check = function(n) {
		n.value.endsWith(t.suffix) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "ends_with",
			suffix: t.suffix,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
});
function Vc(e, t, n) {
	var r;
	e.issues.length && (r = t.issues).push.apply(r, gn(Ms(n, e.issues)));
}
var Wc = ps("$ZodCheckProperty", function(e, t) {
	wc.init(e, t), e._zod.check = function(e) {
		var n = t.schema._zod.run({
			value: e.value[t.property],
			issues: []
		}, {});
		if (n instanceof Promise) return n.then(function(n) {
			return Vc(n, e, t.property);
		});
		Vc(n, e, t.property);
	};
}), Kc = ps("$ZodCheckMimeType", function(e, t) {
	wc.init(e, t);
	var n = new Set(t.mime);
	e._zod.onattach.push(function(e) {
		e._zod.bag.mime = t.mime;
	}), e._zod.check = function(r) {
		n.has(r.value.type) || r.issues.push({
			code: "invalid_value",
			values: t.mime,
			input: r.value.type,
			inst: e,
			continue: !t.abort
		});
	};
}), Jc = ps("$ZodCheckOverwrite", function(e, t) {
	wc.init(e, t), e._zod.check = function(e) {
		e.value = t.tx(e.value);
	};
}), Qc = un(function e() {
	var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
	tn(this, e), this.content = [], this.indent = 0, this && (this.args = t);
}, [
	{
		key: "indented",
		value: function(e) {
			this.indent += 1, e(this), this.indent -= 1;
		}
	},
	{
		key: "write",
		value: function(e) {
			var t = this;
			if ("function" == typeof e) return e(this, { execution: "sync" }), void e(this, { execution: "async" });
			var n, r = e.split("\n").filter(function(e) {
				return e;
			}), u = Math.min.apply(Math, gn(r.map(function(e) {
				return e.length - e.trimStart().length;
			}))), i = an(r.map(function(e) {
				return e.slice(u);
			}).map(function(e) {
				return " ".repeat(2 * t.indent) + e;
			}));
			try {
				for (i.s(); !(n = i.n()).done;) {
					var o = n.value;
					this.content.push(o);
				}
			} catch (e) {
				i.e(e);
			} finally {
				i.f();
			}
		}
	},
	{
		key: "compile",
		value: function() {
			var e, t = Function, n = null == this ? void 0 : this.args, r = gn((null !== (e = null == this ? void 0 : this.content) && void 0 !== e ? e : [""]).map(function(e) {
				return "  ".concat(e);
			}));
			return nn(t, gn(n).concat([r.join("\n")]));
		}
	}
]), Gc = {
	major: 4,
	minor: 1,
	patch: 12
}, Yc = ps("$ZodType", function(e, t) {
	var n, r;
	null != e || (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Gc;
	var u = gn(null !== (n = e._zod.def.checks) && void 0 !== n ? n : []);
	e._zod.traits.has("$ZodCheck") && u.unshift(e);
	var a, i = an(u);
	try {
		for (i.s(); !(a = i.n()).done;) {
			var o, s = an(a.value._zod.onattach);
			try {
				for (s.s(); !(o = s.n()).done;) (0, o.value)(e);
			} catch (e) {
				s.e(e);
			} finally {
				s.f();
			}
		}
	} catch (e) {
		i.e(e);
	} finally {
		i.f();
	}
	if (0 === u.length) {
		var c, l;
		null !== (c = (r = e._zod).deferred) && void 0 !== c || (r.deferred = []), null === (l = e._zod.deferred) || void 0 === l || l.push(function() {
			e._zod.run = e._zod.parse;
		});
	} else {
		var f = function(e, t, n) {
			var r, u, a = Rs(e), i = an(t);
			try {
				var o = function() {
					var t = u.value;
					if (t._zod.def.when) {
						if (!t._zod.def.when(e)) return 0;
					} else if (a) return 0;
					var i = e.issues.length, o = t._zod.check(e);
					if (o instanceof Promise && !1 === (null == n ? void 0 : n.async)) throw new hs();
					if (r || o instanceof Promise) r = (null != r ? r : Promise.resolve()).then(Xt(vn().m(function t() {
						return vn().w(function(t) {
							for (;;) switch (t.n) {
								case 0: return t.n = 1, o;
								case 1:
									if (e.issues.length !== i) {
										t.n = 2;
										break;
									}
									return t.a(2);
								case 2: a || (a = Rs(e, i));
								case 3: return t.a(2);
							}
						}, t);
					})));
					else {
						if (e.issues.length === i) return 0;
						a || (a = Rs(e, i));
					}
				};
				for (i.s(); !(u = i.n()).done;) o();
			} catch (e) {
				i.e(e);
			} finally {
				i.f();
			}
			return r ? r.then(function() {
				return e;
			}) : e;
		}, d = function(t, n, r) {
			if (Rs(t)) return t.aborted = !0, t;
			var a = f(n, u, r);
			if (a instanceof Promise) {
				if (!1 === r.async) throw new hs();
				return a.then(function(t) {
					return e._zod.parse(t, r);
				});
			}
			return e._zod.parse(a, r);
		};
		e._zod.run = function(t, n) {
			if (n.skipChecks) return e._zod.parse(t, n);
			if ("backward" === n.direction) {
				var r = e._zod.parse({
					value: t.value,
					issues: []
				}, pn(pn({}, n), {}, { skipChecks: !0 }));
				return r instanceof Promise ? r.then(function(e) {
					return d(e, t, n);
				}) : d(r, t, n);
			}
			var a = e._zod.parse(t, n);
			if (a instanceof Promise) {
				if (!1 === n.async) throw new hs();
				return a.then(function(e) {
					return f(e, u, n);
				});
			}
			return f(a, u, n);
		};
	}
	e["~standard"] = {
		validate: function(t) {
			try {
				var n, r = Gs(e, t);
				return r.success ? { value: r.data } : { issues: null === (n = r.error) || void 0 === n ? void 0 : n.issues };
			} catch (n) {
				return Xs(e, t).then(function(e) {
					var t;
					return e.success ? { value: e.data } : { issues: null === (t = e.error) || void 0 === t ? void 0 : t.issues };
				});
			}
		},
		vendor: "zod",
		version: 1
	};
}), Xc = ps("$ZodString", function(e, t) {
	var n, r, u;
	Yc.init(e, t), e._zod.pattern = null !== (n = gn(null !== (r = null == e || null === (u = e._zod.bag) || void 0 === u ? void 0 : u.patterns) && void 0 !== r ? r : []).pop()) && void 0 !== n ? n : function(e) {
		var t, n, r = e ? "[\\s\\S]{".concat(null !== (t = null == e ? void 0 : e.minimum) && void 0 !== t ? t : 0, ",").concat(null !== (n = null == e ? void 0 : e.maximum) && void 0 !== n ? n : "", "}") : "[\\s\\S]*";
		return new RegExp("^".concat(r, "$"));
	}(e._zod.bag), e._zod.parse = function(n, r) {
		if (t.coerce) try {
			n.value = String(n.value);
		} catch (r) {}
		return "string" == typeof n.value || n.issues.push({
			expected: "string",
			code: "invalid_type",
			input: n.value,
			inst: e
		}), n;
	};
}), el = ps("$ZodStringFormat", function(e, t) {
	Mc.init(e, t), Xc.init(e, t);
}), tl = ps("$ZodGUID", function(e, t) {
	var n;
	null !== (n = t.pattern) && void 0 !== n || (t.pattern = oc), el.init(e, t);
}), nl = ps("$ZodUUID", function(e, t) {
	var n;
	if (t.version) {
		var r, u = {
			v1: 1,
			v2: 2,
			v3: 3,
			v4: 4,
			v5: 5,
			v6: 6,
			v7: 7,
			v8: 8
		}[t.version];
		if (void 0 === u) throw new Error("Invalid UUID version: \"".concat(t.version, "\""));
		null !== (r = t.pattern) && void 0 !== r || (t.pattern = sc(u));
	} else null !== (n = t.pattern) && void 0 !== n || (t.pattern = sc());
	el.init(e, t);
}), rl = ps("$ZodEmail", function(e, t) {
	var n;
	null !== (n = t.pattern) && void 0 !== n || (t.pattern = cc), el.init(e, t);
}), ul = ps("$ZodURL", function(e, t) {
	el.init(e, t), e._zod.check = function(n) {
		try {
			var r = n.value.trim(), u = new URL(r);
			t.hostname && (t.hostname.lastIndex = 0, t.hostname.test(u.hostname) || n.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid hostname",
				pattern: mc.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			})), t.protocol && (t.protocol.lastIndex = 0, t.protocol.test(u.protocol.endsWith(":") ? u.protocol.slice(0, -1) : u.protocol) || n.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid protocol",
				pattern: t.protocol.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			})), t.normalize ? n.value = u.href : n.value = r;
			return;
		} catch (r) {
			n.issues.push({
				code: "invalid_format",
				format: "url",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
}), al = ps("$ZodEmoji", function(e, t) {
	var n;
	null !== (n = t.pattern) && void 0 !== n || (t.pattern = /* @__PURE__ */ new RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u")), el.init(e, t);
}), il = ps("$ZodNanoID", function(e, t) {
	var n;
	null !== (n = t.pattern) && void 0 !== n || (t.pattern = ac), el.init(e, t);
}), ol = ps("$ZodCUID", function(e, t) {
	var n;
	null !== (n = t.pattern) && void 0 !== n || (t.pattern = ec), el.init(e, t);
}), sl = ps("$ZodCUID2", function(e, t) {
	var n;
	null !== (n = t.pattern) && void 0 !== n || (t.pattern = tc), el.init(e, t);
}), cl = ps("$ZodULID", function(e, t) {
	var n;
	null !== (n = t.pattern) && void 0 !== n || (t.pattern = nc), el.init(e, t);
}), ll = ps("$ZodXID", function(e, t) {
	var n;
	null !== (n = t.pattern) && void 0 !== n || (t.pattern = rc), el.init(e, t);
}), fl = ps("$ZodKSUID", function(e, t) {
	var n;
	null !== (n = t.pattern) && void 0 !== n || (t.pattern = uc), el.init(e, t);
}), dl = ps("$ZodISODateTime", function(e, t) {
	var n;
	null !== (n = t.pattern) && void 0 !== n || (t.pattern = function(e) {
		var t = Fc({ precision: e.precision }), n = ["Z"];
		e.local && n.push(""), e.offset && n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
		var r = "".concat(t, "(?:").concat(n.join("|"), ")");
		return new RegExp("^".concat(yc, "T(?:").concat(r, ")$"));
	}(t)), el.init(e, t);
}), pl = ps("$ZodISODate", function(e, t) {
	var n;
	null !== (n = t.pattern) && void 0 !== n || (t.pattern = gc), el.init(e, t);
}), hl = ps("$ZodISOTime", function(e, t) {
	var n;
	null !== (n = t.pattern) && void 0 !== n || (t.pattern = new RegExp("^".concat(Fc(t), "$"))), el.init(e, t);
}), vl = ps("$ZodISODuration", function(e, t) {
	var n;
	null !== (n = t.pattern) && void 0 !== n || (t.pattern = ic), el.init(e, t);
}), ml = ps("$ZodIPv4", function(e, t) {
	var n;
	null !== (n = t.pattern) && void 0 !== n || (t.pattern = lc), el.init(e, t), e._zod.onattach.push(function(e) {
		e._zod.bag.format = "ipv4";
	});
}), Dl = ps("$ZodIPv6", function(e, t) {
	var n;
	null !== (n = t.pattern) && void 0 !== n || (t.pattern = fc), el.init(e, t), e._zod.onattach.push(function(e) {
		e._zod.bag.format = "ipv6";
	}), e._zod.check = function(n) {
		try {
			new URL("http://[".concat(n.value, "]"));
		} catch (r) {
			n.issues.push({
				code: "invalid_format",
				format: "ipv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
}), yl = ps("$ZodCIDRv4", function(e, t) {
	var n;
	null !== (n = t.pattern) && void 0 !== n || (t.pattern = dc), el.init(e, t);
}), gl = ps("$ZodCIDRv6", function(e, t) {
	var n;
	null !== (n = t.pattern) && void 0 !== n || (t.pattern = pc), el.init(e, t), e._zod.check = function(n) {
		var r = n.value.split("/");
		try {
			if (2 !== r.length) throw new Error();
			var u = yn(r, 2), a = u[0], i = u[1];
			if (!i) throw new Error();
			var o = Number(i);
			if ("".concat(o) !== i) throw new Error();
			if (o < 0 || o > 128) throw new Error();
			new URL("http://[".concat(a, "]"));
		} catch (r) {
			n.issues.push({
				code: "invalid_format",
				format: "cidrv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
});
function Fl(e) {
	if ("" === e) return !0;
	if (e.length % 4 != 0) return !1;
	try {
		return atob(e), !0;
	} catch (e) {
		return !1;
	}
}
var El = ps("$ZodBase64", function(e, t) {
	var n;
	null !== (n = t.pattern) && void 0 !== n || (t.pattern = hc), el.init(e, t), e._zod.onattach.push(function(e) {
		e._zod.bag.contentEncoding = "base64";
	}), e._zod.check = function(n) {
		Fl(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), bl = ps("$ZodBase64URL", function(e, t) {
	var n;
	null !== (n = t.pattern) && void 0 !== n || (t.pattern = vc), el.init(e, t), e._zod.onattach.push(function(e) {
		e._zod.bag.contentEncoding = "base64url";
	}), e._zod.check = function(n) {
		(function(e) {
			if (!vc.test(e)) return !1;
			var t = e.replace(/[-_]/g, function(e) {
				return "-" === e ? "+" : "/";
			});
			return Fl(t.padEnd(4 * Math.ceil(t.length / 4), "="));
		})(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64url",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), _l = ps("$ZodE164", function(e, t) {
	var n;
	null !== (n = t.pattern) && void 0 !== n || (t.pattern = Dc), el.init(e, t);
}), kl = ps("$ZodJWT", function(e, t) {
	el.init(e, t), e._zod.check = function(n) {
		(function(e) {
			var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
			try {
				var n = e.split(".");
				if (3 !== n.length) return !1;
				var r = yn(n, 1)[0];
				if (!r) return !1;
				var u = JSON.parse(atob(r));
				return !("typ" in u && "JWT" !== (null == u ? void 0 : u.typ) || !u.alg || t && (!("alg" in u) || u.alg !== t));
			} catch (e) {
				return !1;
			}
		})(n.value, t.alg) || n.issues.push({
			code: "invalid_format",
			format: "jwt",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Cl = ps("$ZodNumber", function(e, t) {
	var n;
	Yc.init(e, t), e._zod.pattern = null !== (n = e._zod.bag.pattern) && void 0 !== n ? n : bc, e._zod.parse = function(n, r) {
		if (t.coerce) try {
			n.value = Number(n.value);
		} catch (e) {}
		var u = n.value;
		if ("number" == typeof u && !Number.isNaN(u) && Number.isFinite(u)) return n;
		var a = "number" == typeof u ? Number.isNaN(u) ? "NaN" : Number.isFinite(u) ? void 0 : "Infinity" : void 0;
		return n.issues.push(pn({
			expected: "number",
			code: "invalid_type",
			input: u,
			inst: e
		}, a ? { received: a } : {})), n;
	};
}), Al = ps("$ZodNumber", function(e, t) {
	Ic.init(e, t), Cl.init(e, t);
}), wl = ps("$ZodBoolean", function(e, t) {
	Yc.init(e, t), e._zod.pattern = _c, e._zod.parse = function(n, r) {
		if (t.coerce) try {
			n.value = Boolean(n.value);
		} catch (e) {}
		var u = n.value;
		return "boolean" == typeof u || n.issues.push({
			expected: "boolean",
			code: "invalid_type",
			input: u,
			inst: e
		}), n;
	};
}), Sl = ps("$ZodNull", function(e, t) {
	Yc.init(e, t), e._zod.pattern = kc, e._zod.values = /* @__PURE__ */ new Set([null]), e._zod.parse = function(t, n) {
		var r = t.value;
		return null === r || t.issues.push({
			expected: "null",
			code: "invalid_type",
			input: r,
			inst: e
		}), t;
	};
}), xl = ps("$ZodUnknown", function(e, t) {
	Yc.init(e, t), e._zod.parse = function(e) {
		return e;
	};
}), Ol = ps("$ZodNever", function(e, t) {
	Yc.init(e, t), e._zod.parse = function(t, n) {
		return t.issues.push({
			expected: "never",
			code: "invalid_type",
			input: t.value,
			inst: e
		}), t;
	};
});
function Bl(e, t, n) {
	var r;
	e.issues.length && (r = t.issues).push.apply(r, gn(Ms(n, e.issues))), t.value[n] = e.value;
}
var Il = ps("$ZodArray", function(e, t) {
	Yc.init(e, t), e._zod.parse = function(n, r) {
		var u = n.value;
		if (!Array.isArray(u)) return n.issues.push({
			expected: "array",
			code: "invalid_type",
			input: u,
			inst: e
		}), n;
		n.value = Array(u.length);
		for (var a = [], i = function(e) {
			var i = u[e], o = t.element._zod.run({
				value: i,
				issues: []
			}, r);
			o instanceof Promise ? a.push(o.then(function(t) {
				return Bl(t, n, e);
			})) : Bl(o, n, e);
		}, o = 0; o < u.length; o++) i(o);
		return a.length ? Promise.all(a).then(function() {
			return n;
		}) : n;
	};
});
function Tl(e, t, n, r) {
	var u;
	e.issues.length && (u = t.issues).push.apply(u, gn(Ms(n, e.issues))), void 0 === e.value ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
function Pl(e) {
	for (var t = Object.keys(e.shape), n = 0, r = t; n < r.length; n++) {
		var u, a = r[n];
		if (null === (u = e.shape) || void 0 === u || null === (u = u[a]) || void 0 === u || null === (u = u._zod) || void 0 === u || null === (u = u.traits) || void 0 === u || !u.has("$ZodType")) throw new Error("Invalid element at key \"".concat(a, "\": expected a Zod schema"));
	}
	var i, o = (i = e.shape, Object.keys(i).filter(function(e) {
		return "optional" === i[e]._zod.optin && "optional" === i[e]._zod.optout;
	}));
	return pn(pn({}, e), {}, {
		keys: t,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(o)
	});
}
function jl(e, t, n, r, u, a) {
	for (var i = [], o = u.keySet, s = u.catchall._zod, c = s.def.type, l = function() {
		var u = d[f];
		if (o.has(u)) return 0;
		if ("never" === c) return i.push(u), 0;
		var a = s.run({
			value: t[u],
			issues: []
		}, r);
		a instanceof Promise ? e.push(a.then(function(e) {
			return Tl(e, n, u, t);
		})) : Tl(a, n, u, t);
	}, f = 0, d = Object.keys(t); f < d.length; f++) l();
	return i.length && n.issues.push({
		code: "unrecognized_keys",
		keys: i,
		input: t,
		inst: a
	}), e.length ? Promise.all(e).then(function() {
		return n;
	}) : n;
}
var Nl = ps("$ZodObject", function(e, t) {
	Yc.init(e, t);
	var n = Object.getOwnPropertyDescriptor(t, "shape");
	if (null == n || !n.get) {
		var r = t.shape;
		Object.defineProperty(t, "shape", { get: function() {
			var e = pn({}, r);
			return Object.defineProperty(t, "shape", { value: e }), e;
		} });
	}
	var u = Fs(function() {
		return Pl(t);
	});
	ks(e._zod, "propValues", function() {
		var e = t.shape, n = {};
		for (var r in e) {
			var u = e[r]._zod;
			if (u.values) {
				var a;
				null !== (a = n[r]) && void 0 !== a || (n[r] = /* @__PURE__ */ new Set());
				var i, o = an(u.values);
				try {
					for (o.s(); !(i = o.n()).done;) {
						var s = i.value;
						n[r].add(s);
					}
				} catch (e) {
					o.e(e);
				} finally {
					o.f();
				}
			}
		}
		return n;
	});
	var a, i = xs, o = t.catchall;
	e._zod.parse = function(t, n) {
		null != a || (a = u.value);
		var r = t.value;
		if (!i(r)) return t.issues.push({
			expected: "object",
			code: "invalid_type",
			input: r,
			inst: e
		}), t;
		t.value = {};
		var s, c = [], l = a.shape, f = an(a.keys);
		try {
			var d = function() {
				var e = s.value, u = l[e]._zod.run({
					value: r[e],
					issues: []
				}, n);
				u instanceof Promise ? c.push(u.then(function(n) {
					return Tl(n, t, e, r);
				})) : Tl(u, t, e, r);
			};
			for (f.s(); !(s = f.n()).done;) d();
		} catch (e) {
			f.e(e);
		} finally {
			f.f();
		}
		return o ? jl(c, r, t, n, u.value, e) : c.length ? Promise.all(c).then(function() {
			return t;
		}) : t;
	};
}), zl = ps("$ZodObjectJIT", function(e, t) {
	Nl.init(e, t);
	var n, r, u = e._zod.parse, a = Fs(function() {
		return Pl(t);
	}), i = xs, o = !ms.jitless, s = o && Os.value, c = t.catchall;
	e._zod.parse = function(l, f) {
		null != r || (r = a.value);
		var d = l.value;
		return i(d) ? o && s && !1 === (null == f ? void 0 : f.async) && !0 !== f.jitless ? (n || (n = function(e) {
			var t = new Qc([
				"shape",
				"payload",
				"ctx"
			]), n = a.value, r = function(e) {
				var t = ws(e);
				return "shape[".concat(t, "]._zod.run({ value: input[").concat(t, "], issues: [] }, ctx)");
			};
			t.write("const input = payload.value;");
			var u, i = Object.create(null), o = 0, s = an(n.keys);
			try {
				for (s.s(); !(u = s.n()).done;) i[u.value] = "key_".concat(o++);
			} catch (e) {
				s.e(e);
			} finally {
				s.f();
			}
			t.write("const newResult = {};");
			var c, l = an(n.keys);
			try {
				for (l.s(); !(c = l.n()).done;) {
					var f = c.value, d = i[f], p = ws(f);
					t.write("const ".concat(d, " = ").concat(r(f), ";")), t.write("\n        if (".concat(d, ".issues.length) {\n          payload.issues = payload.issues.concat(").concat(d, ".issues.map(iss => ({\n            ...iss,\n            path: iss.path ? [").concat(p, ", ...iss.path] : [").concat(p, "]\n          })));\n        }\n        \n        \n        if (").concat(d, ".value === undefined) {\n          if (").concat(p, " in input) {\n            newResult[").concat(p, "] = undefined;\n          }\n        } else {\n          newResult[").concat(p, "] = ").concat(d, ".value;\n        }\n        \n      "));
				}
			} catch (e) {
				l.e(e);
			} finally {
				l.f();
			}
			t.write("payload.value = newResult;"), t.write("return payload;");
			var h = t.compile();
			return function(t, n) {
				return h(e, t, n);
			};
		}(t.shape)), l = n(l, f), c ? jl([], d, l, f, r, e) : l) : u(l, f) : (l.issues.push({
			expected: "object",
			code: "invalid_type",
			input: d,
			inst: e
		}), l);
	};
});
function Rl(e, t, n, r) {
	var u, a = an(e);
	try {
		for (a.s(); !(u = a.n()).done;) {
			var i = u.value;
			if (0 === i.issues.length) return t.value = i.value, t;
		}
	} catch (e) {
		a.e(e);
	} finally {
		a.f();
	}
	var o = e.filter(function(e) {
		return !Rs(e);
	});
	return 1 === o.length ? (t.value = o[0].value, o[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map(function(e) {
			return e.issues.map(function(e) {
				return Ls(e, r, Ds());
			});
		})
	}), t);
}
var Ml = ps("$ZodUnion", function(e, t) {
	Yc.init(e, t), ks(e._zod, "optin", function() {
		return t.options.some(function(e) {
			return "optional" === e._zod.optin;
		}) ? "optional" : void 0;
	}), ks(e._zod, "optout", function() {
		return t.options.some(function(e) {
			return "optional" === e._zod.optout;
		}) ? "optional" : void 0;
	}), ks(e._zod, "values", function() {
		if (t.options.every(function(e) {
			return e._zod.values;
		})) return new Set(t.options.flatMap(function(e) {
			return Array.from(e._zod.values);
		}));
	}), ks(e._zod, "pattern", function() {
		if (t.options.every(function(e) {
			return e._zod.pattern;
		})) {
			var e = t.options.map(function(e) {
				return e._zod.pattern;
			});
			return new RegExp("^(".concat(e.map(function(e) {
				return bs(e.source);
			}).join("|"), ")$"));
		}
	});
	var n = 1 === t.options.length, r = t.options[0]._zod.run;
	e._zod.parse = function(u, a) {
		if (n) return r(u, a);
		var i, o = !1, s = [], c = an(t.options);
		try {
			for (c.s(); !(i = c.n()).done;) {
				var l = i.value._zod.run({
					value: u.value,
					issues: []
				}, a);
				if (l instanceof Promise) s.push(l), o = !0;
				else {
					if (0 === l.issues.length) return l;
					s.push(l);
				}
			}
		} catch (e) {
			c.e(e);
		} finally {
			c.f();
		}
		return o ? Promise.all(s).then(function(t) {
			return Rl(t, u, e, a);
		}) : Rl(s, u, e, a);
	};
}), Zl = ps("$ZodDiscriminatedUnion", function(e, t) {
	Ml.init(e, t);
	var n = e._zod.parse;
	ks(e._zod, "propValues", function() {
		var e, n = {}, r = an(t.options);
		try {
			for (r.s(); !(e = r.n()).done;) {
				var u = e.value, a = u._zod.propValues;
				if (!a || 0 === Object.keys(a).length) throw new Error("Invalid discriminated union option at index \"".concat(t.options.indexOf(u), "\""));
				for (var i = 0, o = Object.entries(a); i < o.length; i++) {
					var s = yn(o[i], 2), c = s[0], l = s[1];
					n[c] || (n[c] = /* @__PURE__ */ new Set());
					var f, d = an(l);
					try {
						for (d.s(); !(f = d.n()).done;) {
							var p = f.value;
							n[c].add(p);
						}
					} catch (e) {
						d.e(e);
					} finally {
						d.f();
					}
				}
			}
		} catch (e) {
			r.e(e);
		} finally {
			r.f();
		}
		return n;
	});
	var r = Fs(function() {
		var e, n = t.options, r = /* @__PURE__ */ new Map(), u = an(n);
		try {
			for (u.s(); !(e = u.n()).done;) {
				var a, i = e.value, o = null === (a = i._zod.propValues) || void 0 === a ? void 0 : a[t.discriminator];
				if (!o || 0 === o.size) throw new Error("Invalid discriminated union option at index \"".concat(t.options.indexOf(i), "\""));
				var s, c = an(o);
				try {
					for (c.s(); !(s = c.n()).done;) {
						var l = s.value;
						if (r.has(l)) throw new Error("Duplicate discriminator value \"".concat(String(l), "\""));
						r.set(l, i);
					}
				} catch (e) {
					c.e(e);
				} finally {
					c.f();
				}
			}
		} catch (e) {
			u.e(e);
		} finally {
			u.f();
		}
		return r;
	});
	e._zod.parse = function(u, a) {
		var i = u.value;
		if (!xs(i)) return u.issues.push({
			code: "invalid_type",
			expected: "object",
			input: i,
			inst: e
		}), u;
		var o = r.value.get(null == i ? void 0 : i[t.discriminator]);
		return o ? o._zod.run(u, a) : t.unionFallback ? n(u, a) : (u.issues.push({
			code: "invalid_union",
			errors: [],
			note: "No matching discriminator",
			discriminator: t.discriminator,
			input: i,
			path: [t.discriminator],
			inst: e
		}), u);
	};
}), Ll = ps("$ZodIntersection", function(e, t) {
	Yc.init(e, t), e._zod.parse = function(e, n) {
		var r = e.value, u = t.left._zod.run({
			value: r,
			issues: []
		}, n), a = t.right._zod.run({
			value: r,
			issues: []
		}, n);
		return u instanceof Promise || a instanceof Promise ? Promise.all([u, a]).then(function(t) {
			var n = yn(t, 2), r = n[0], u = n[1];
			return ql(e, r, u);
		}) : ql(e, u, a);
	};
});
function $l(e, t) {
	if (e === t) return {
		valid: !0,
		data: e
	};
	if (e instanceof Date && t instanceof Date && +e === +t) return {
		valid: !0,
		data: e
	};
	if (Bs(e) && Bs(t)) {
		var n, r = Object.keys(t), u = Object.keys(e).filter(function(e) {
			return -1 !== r.indexOf(e);
		}), a = pn(pn({}, e), t), i = an(u);
		try {
			for (i.s(); !(n = i.n()).done;) {
				var o = n.value, s = $l(e[o], t[o]);
				if (!s.valid) return {
					valid: !1,
					mergeErrorPath: [o].concat(gn(s.mergeErrorPath))
				};
				a[o] = s.data;
			}
		} catch (e) {
			i.e(e);
		} finally {
			i.f();
		}
		return {
			valid: !0,
			data: a
		};
	}
	if (Array.isArray(e) && Array.isArray(t)) {
		if (e.length !== t.length) return {
			valid: !1,
			mergeErrorPath: []
		};
		for (var c = [], l = 0; l < e.length; l++) {
			var f = $l(e[l], t[l]);
			if (!f.valid) return {
				valid: !1,
				mergeErrorPath: [l].concat(gn(f.mergeErrorPath))
			};
			c.push(f.data);
		}
		return {
			valid: !0,
			data: c
		};
	}
	return {
		valid: !1,
		mergeErrorPath: []
	};
}
function ql(e, t, n) {
	var r, u;
	if (t.issues.length && (r = e.issues).push.apply(r, gn(t.issues)), n.issues.length && (u = e.issues).push.apply(u, gn(n.issues)), Rs(e)) return e;
	var a = $l(t.value, n.value);
	if (!a.valid) throw new Error("Unmergable intersection. Error path: " + "".concat(JSON.stringify(a.mergeErrorPath)));
	return e.value = a.data, e;
}
var Ul = ps("$ZodRecord", function(e, t) {
	Yc.init(e, t), e._zod.parse = function(n, r) {
		var u = n.value;
		if (!Bs(u)) return n.issues.push({
			expected: "record",
			code: "invalid_type",
			input: u,
			inst: e
		}), n;
		var a = [];
		if (t.keyType._zod.values) {
			var i = t.keyType._zod.values;
			n.value = {};
			var o, s, c = an(i);
			try {
				var l = function() {
					var e = o.value;
					if ("string" == typeof e || "number" == typeof e || "symbol" === En(e)) {
						var i, s = t.valueType._zod.run({
							value: u[e],
							issues: []
						}, r);
						if (s instanceof Promise) a.push(s.then(function(t) {
							var r;
							t.issues.length && (r = n.issues).push.apply(r, gn(Ms(e, t.issues))), n.value[e] = t.value;
						}));
						else s.issues.length && (i = n.issues).push.apply(i, gn(Ms(e, s.issues))), n.value[e] = s.value;
					}
				};
				for (c.s(); !(o = c.n()).done;) l();
			} catch (e) {
				c.e(e);
			} finally {
				c.f();
			}
			for (var f in u) i.has(f) || (s = null != s ? s : []).push(f);
			s && s.length > 0 && n.issues.push({
				code: "unrecognized_keys",
				input: u,
				inst: e,
				keys: s
			});
		} else {
			n.value = {};
			var d, p = an(Reflect.ownKeys(u));
			try {
				var h = function() {
					var i = d.value;
					if ("__proto__" === i) return 0;
					var o = t.keyType._zod.run({
						value: i,
						issues: []
					}, r);
					if (o instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
					if (o.issues.length) return n.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: o.issues.map(function(e) {
							return Ls(e, r, Ds());
						}),
						input: i,
						path: [i],
						inst: e
					}), n.value[o.value] = o.value, 0;
					var s, c = t.valueType._zod.run({
						value: u[i],
						issues: []
					}, r);
					c instanceof Promise ? a.push(c.then(function(e) {
						var t;
						e.issues.length && (t = n.issues).push.apply(t, gn(Ms(i, e.issues))), n.value[o.value] = e.value;
					})) : (c.issues.length && (s = n.issues).push.apply(s, gn(Ms(i, c.issues))), n.value[o.value] = c.value);
				};
				for (p.s(); !(d = p.n()).done;) h();
			} catch (e) {
				p.e(e);
			} finally {
				p.f();
			}
		}
		return a.length ? Promise.all(a).then(function() {
			return n;
		}) : n;
	};
}), Hl = ps("$ZodEnum", function(e, t) {
	Yc.init(e, t);
	var n = ys(t.entries), r = new Set(n);
	e._zod.values = r, e._zod.pattern = new RegExp("^(".concat(n.filter(function(e) {
		return Ts.has(En(e));
	}).map(function(e) {
		return "string" == typeof e ? Ps(e) : e.toString();
	}).join("|"), ")$")), e._zod.parse = function(t, u) {
		var a = t.value;
		return r.has(a) || t.issues.push({
			code: "invalid_value",
			values: n,
			input: a,
			inst: e
		}), t;
	};
}), Vl = ps("$ZodLiteral", function(e, t) {
	if (Yc.init(e, t), 0 === t.values.length) throw new Error("Cannot create literal schema with no valid values");
	e._zod.values = new Set(t.values), e._zod.pattern = new RegExp("^(".concat(t.values.map(function(e) {
		return "string" == typeof e ? Ps(e) : e ? Ps(e.toString()) : String(e);
	}).join("|"), ")$")), e._zod.parse = function(n, r) {
		var u = n.value;
		return e._zod.values.has(u) || n.issues.push({
			code: "invalid_value",
			values: t.values,
			input: u,
			inst: e
		}), n;
	};
}), Wl = ps("$ZodTransform", function(e, t) {
	Yc.init(e, t), e._zod.parse = function(n, r) {
		if ("backward" === r.direction) throw new vs(e.constructor.name);
		var u = t.transform(n.value, n);
		if (r.async) return (u instanceof Promise ? u : Promise.resolve(u)).then(function(e) {
			return n.value = e, n;
		});
		if (u instanceof Promise) throw new hs();
		return n.value = u, n;
	};
});
function Kl(e, t) {
	return e.issues.length && void 0 === t ? {
		issues: [],
		value: void 0
	} : e;
}
var Jl = ps("$ZodOptional", function(e, t) {
	Yc.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", ks(e._zod, "values", function() {
		return t.innerType._zod.values ? new Set([].concat(gn(t.innerType._zod.values), [void 0])) : void 0;
	}), ks(e._zod, "pattern", function() {
		var e = t.innerType._zod.pattern;
		return e ? new RegExp("^(".concat(bs(e.source), ")?$")) : void 0;
	}), e._zod.parse = function(e, n) {
		if ("optional" === t.innerType._zod.optin) {
			var r = t.innerType._zod.run(e, n);
			return r instanceof Promise ? r.then(function(t) {
				return Kl(t, e.value);
			}) : Kl(r, e.value);
		}
		return void 0 === e.value ? e : t.innerType._zod.run(e, n);
	};
}), Ql = ps("$ZodNullable", function(e, t) {
	Yc.init(e, t), ks(e._zod, "optin", function() {
		return t.innerType._zod.optin;
	}), ks(e._zod, "optout", function() {
		return t.innerType._zod.optout;
	}), ks(e._zod, "pattern", function() {
		var e = t.innerType._zod.pattern;
		return e ? new RegExp("^(".concat(bs(e.source), "|null)$")) : void 0;
	}), ks(e._zod, "values", function() {
		return t.innerType._zod.values ? new Set([].concat(gn(t.innerType._zod.values), [null])) : void 0;
	}), e._zod.parse = function(e, n) {
		return null === e.value ? e : t.innerType._zod.run(e, n);
	};
}), Gl = ps("$ZodDefault", function(e, t) {
	Yc.init(e, t), e._zod.optin = "optional", ks(e._zod, "values", function() {
		return t.innerType._zod.values;
	}), e._zod.parse = function(e, n) {
		if ("backward" === n.direction) return t.innerType._zod.run(e, n);
		if (void 0 === e.value) return e.value = t.defaultValue, e;
		var r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then(function(e) {
			return Yl(e, t);
		}) : Yl(r, t);
	};
});
function Yl(e, t) {
	return void 0 === e.value && (e.value = t.defaultValue), e;
}
var Xl = ps("$ZodPrefault", function(e, t) {
	Yc.init(e, t), e._zod.optin = "optional", ks(e._zod, "values", function() {
		return t.innerType._zod.values;
	}), e._zod.parse = function(e, n) {
		return "backward" === n.direction || void 0 === e.value && (e.value = t.defaultValue), t.innerType._zod.run(e, n);
	};
}), ef = ps("$ZodNonOptional", function(e, t) {
	Yc.init(e, t), ks(e._zod, "values", function() {
		var e = t.innerType._zod.values;
		return e ? new Set(gn(e).filter(function(e) {
			return void 0 !== e;
		})) : void 0;
	}), e._zod.parse = function(n, r) {
		var u = t.innerType._zod.run(n, r);
		return u instanceof Promise ? u.then(function(t) {
			return tf(t, e);
		}) : tf(u, e);
	};
});
function tf(e, t) {
	return e.issues.length || void 0 !== e.value || e.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: e.value,
		inst: t
	}), e;
}
var nf = ps("$ZodCatch", function(e, t) {
	Yc.init(e, t), ks(e._zod, "optin", function() {
		return t.innerType._zod.optin;
	}), ks(e._zod, "optout", function() {
		return t.innerType._zod.optout;
	}), ks(e._zod, "values", function() {
		return t.innerType._zod.values;
	}), e._zod.parse = function(e, n) {
		if ("backward" === n.direction) return t.innerType._zod.run(e, n);
		var r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then(function(r) {
			return e.value = r.value, r.issues.length && (e.value = t.catchValue(pn(pn({}, e), {}, {
				error: { issues: r.issues.map(function(e) {
					return Ls(e, n, Ds());
				}) },
				input: e.value
			})), e.issues = []), e;
		}) : (e.value = r.value, r.issues.length && (e.value = t.catchValue(pn(pn({}, e), {}, {
			error: { issues: r.issues.map(function(e) {
				return Ls(e, n, Ds());
			}) },
			input: e.value
		})), e.issues = []), e);
	};
}), rf = ps("$ZodPipe", function(e, t) {
	Yc.init(e, t), ks(e._zod, "values", function() {
		return t.in._zod.values;
	}), ks(e._zod, "optin", function() {
		return t.in._zod.optin;
	}), ks(e._zod, "optout", function() {
		return t.out._zod.optout;
	}), ks(e._zod, "propValues", function() {
		return t.in._zod.propValues;
	}), e._zod.parse = function(e, n) {
		if ("backward" === n.direction) {
			var r = t.out._zod.run(e, n);
			return r instanceof Promise ? r.then(function(e) {
				return uf(e, t.in, n);
			}) : uf(r, t.in, n);
		}
		var u = t.in._zod.run(e, n);
		return u instanceof Promise ? u.then(function(e) {
			return uf(e, t.out, n);
		}) : uf(u, t.out, n);
	};
});
function uf(e, t, n) {
	return e.issues.length ? (e.aborted = !0, e) : t._zod.run({
		value: e.value,
		issues: e.issues
	}, n);
}
var af = ps("$ZodReadonly", function(e, t) {
	Yc.init(e, t), ks(e._zod, "propValues", function() {
		return t.innerType._zod.propValues;
	}), ks(e._zod, "values", function() {
		return t.innerType._zod.values;
	}), ks(e._zod, "optin", function() {
		return t.innerType._zod.optin;
	}), ks(e._zod, "optout", function() {
		return t.innerType._zod.optout;
	}), e._zod.parse = function(e, n) {
		if ("backward" === n.direction) return t.innerType._zod.run(e, n);
		var r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then(of) : of(r);
	};
});
function of(e) {
	return e.value = Object.freeze(e.value), e;
}
var sf = ps("$ZodLazy", function(e, t) {
	Yc.init(e, t), ks(e._zod, "innerType", function() {
		return t.getter();
	}), ks(e._zod, "pattern", function() {
		return e._zod.innerType._zod.pattern;
	}), ks(e._zod, "propValues", function() {
		return e._zod.innerType._zod.propValues;
	}), ks(e._zod, "optin", function() {
		var t;
		return null !== (t = e._zod.innerType._zod.optin) && void 0 !== t ? t : void 0;
	}), ks(e._zod, "optout", function() {
		var t;
		return null !== (t = e._zod.innerType._zod.optout) && void 0 !== t ? t : void 0;
	}), e._zod.parse = function(t, n) {
		return e._zod.innerType._zod.run(t, n);
	};
}), cf = ps("$ZodCustom", function(e, t) {
	wc.init(e, t), Yc.init(e, t), e._zod.parse = function(e, t) {
		return e;
	}, e._zod.check = function(n) {
		var r = n.value, u = t.fn(r);
		if (u instanceof Promise) return u.then(function(t) {
			return lf(t, n, r, e);
		});
		lf(u, n, r, e);
	};
});
function lf(e, t, n, r) {
	if (!e) {
		var u, a = {
			code: "custom",
			input: n,
			inst: r,
			path: gn(null !== (u = r._zod.def.path) && void 0 !== u ? u : []),
			continue: !r._zod.def.abort
		};
		r._zod.def.params && (a.params = r._zod.def.params), t.issues.push(Us(a));
	}
}
var ff = un(function e() {
	tn(this, e), this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
}, [
	{
		key: "add",
		value: function(e) {
			var t = arguments.length <= 1 ? void 0 : arguments[1];
			if (this._map.set(e, t), t && "object" === En(t) && "id" in t) {
				if (this._idmap.has(t.id)) throw new Error("ID ".concat(t.id, " already exists in the registry"));
				this._idmap.set(t.id, e);
			}
			return this;
		}
	},
	{
		key: "clear",
		value: function() {
			return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
		}
	},
	{
		key: "remove",
		value: function(e) {
			var t = this._map.get(e);
			return t && "object" === En(t) && "id" in t && this._idmap.delete(t.id), this._map.delete(e), this;
		}
	},
	{
		key: "get",
		value: function(e) {
			var t = e._zod.parent;
			if (t) {
				var n, r = pn({}, null !== (n = this.get(t)) && void 0 !== n ? n : {});
				delete r.id;
				var u = pn(pn({}, r), this._map.get(e));
				return Object.keys(u).length ? u : void 0;
			}
			return this._map.get(e);
		}
	},
	{
		key: "has",
		value: function(e) {
			return this._map.has(e);
		}
	}
]);
var df = new ff();
function pf(e, t) {
	return new e(pn({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: !1
	}, Ns(t)));
}
function hf(e, t) {
	return new xc(pn(pn({ check: "less_than" }, Ns(t)), {}, {
		value: e,
		inclusive: !1
	}));
}
function vf(e, t) {
	return new xc(pn(pn({ check: "less_than" }, Ns(t)), {}, {
		value: e,
		inclusive: !0
	}));
}
function mf(e, t) {
	return new Oc(pn(pn({ check: "greater_than" }, Ns(t)), {}, {
		value: e,
		inclusive: !1
	}));
}
function Df(e, t) {
	return new Oc(pn(pn({ check: "greater_than" }, Ns(t)), {}, {
		value: e,
		inclusive: !0
	}));
}
function yf(e, t) {
	return new Bc(pn(pn({ check: "multiple_of" }, Ns(t)), {}, { value: e }));
}
function gf(e, t) {
	return new Nc(pn(pn({ check: "max_length" }, Ns(t)), {}, { maximum: e }));
}
function Ff(e, t) {
	return new zc(pn(pn({ check: "min_length" }, Ns(t)), {}, { minimum: e }));
}
function Ef(e, t) {
	return new Rc(pn(pn({ check: "length_equals" }, Ns(t)), {}, { length: e }));
}
function bf(e, t) {
	return new Zc(pn(pn({
		check: "string_format",
		format: "regex"
	}, Ns(t)), {}, { pattern: e }));
}
function _f(e) {
	return new Lc(pn({
		check: "string_format",
		format: "lowercase"
	}, Ns(e)));
}
function kf(e) {
	return new $c(pn({
		check: "string_format",
		format: "uppercase"
	}, Ns(e)));
}
function Cf(e, t) {
	return new qc(pn(pn({
		check: "string_format",
		format: "includes"
	}, Ns(t)), {}, { includes: e }));
}
function Af(e, t) {
	return new Uc(pn(pn({
		check: "string_format",
		format: "starts_with"
	}, Ns(t)), {}, { prefix: e }));
}
function wf(e, t) {
	return new Hc(pn(pn({
		check: "string_format",
		format: "ends_with"
	}, Ns(t)), {}, { suffix: e }));
}
function Sf(e) {
	return new Jc({
		check: "overwrite",
		tx: e
	});
}
function xf(e) {
	return Sf(function(t) {
		return t.normalize(e);
	});
}
function Of() {
	return Sf(function(e) {
		return e.trim();
	});
}
function Bf() {
	return Sf(function(e) {
		return e.toLowerCase();
	});
}
function If() {
	return Sf(function(e) {
		return e.toUpperCase();
	});
}
var Tf = un(function e(t) {
	var n, r, u, a, i;
	tn(this, e), this.counter = 0, this.metadataRegistry = null !== (n = null == t ? void 0 : t.metadata) && void 0 !== n ? n : df, this.target = null !== (r = null == t ? void 0 : t.target) && void 0 !== r ? r : "draft-2020-12", this.unrepresentable = null !== (u = null == t ? void 0 : t.unrepresentable) && void 0 !== u ? u : "throw", this.override = null !== (a = null == t ? void 0 : t.override) && void 0 !== a ? a : function() {}, this.io = null !== (i = null == t ? void 0 : t.io) && void 0 !== i ? i : "output", this.seen = /* @__PURE__ */ new Map();
}, [{
	key: "process",
	value: function(e) {
		var t, n, r, u, a = this, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
			path: [],
			schemaPath: []
		}, o = e._zod.def, s = this.seen.get(e);
		if (s) return s.count++, i.schemaPath.includes(e) && (s.cycle = i.path), s.schema;
		var c = {
			schema: {},
			count: 1,
			cycle: void 0,
			path: i.path
		};
		this.seen.set(e, c);
		var l = null === (t = (n = e._zod).toJSONSchema) || void 0 === t ? void 0 : t.call(n);
		if (l) c.schema = l;
		else {
			var f = pn(pn({}, i), {}, {
				schemaPath: [].concat(gn(i.schemaPath), [e]),
				path: i.path
			}), d = e._zod.parent;
			if (d) c.ref = d, this.process(d, f), this.seen.get(d).isParent = !0;
			else {
				var p = c.schema;
				switch (o.type) {
					case "string":
						var h = p;
						h.type = "string";
						var v, m = e._zod.bag, D = m.minimum, y = m.maximum, g = m.format, F = m.patterns, E = m.contentEncoding;
						if ("number" == typeof D && (h.minLength = D), "number" == typeof y && (h.maxLength = y), g && (h.format = null !== (v = {
							guid: "uuid",
							url: "uri",
							datetime: "date-time",
							json_string: "json-string",
							regex: ""
						}[g]) && void 0 !== v ? v : g, "" === h.format && delete h.format), E && (h.contentEncoding = E), F && F.size > 0) {
							var b = gn(F);
							1 === b.length ? h.pattern = b[0].source : b.length > 1 && (c.schema.allOf = gn(b.map(function(e) {
								return pn(pn({}, "draft-7" === a.target || "draft-4" === a.target || "openapi-3.0" === a.target ? { type: "string" } : {}), {}, { pattern: e.source });
							})));
						}
						break;
					case "number":
						var _ = p, k = e._zod.bag, C = k.minimum, A = k.maximum, w = k.format, S = k.multipleOf, x = k.exclusiveMaximum, O = k.exclusiveMinimum;
						"string" == typeof w && w.includes("int") ? _.type = "integer" : _.type = "number", "number" == typeof O && ("draft-4" === this.target || "openapi-3.0" === this.target ? (_.minimum = O, _.exclusiveMinimum = !0) : _.exclusiveMinimum = O), "number" == typeof C && (_.minimum = C, "number" == typeof O && "draft-4" !== this.target && (O >= C ? delete _.minimum : delete _.exclusiveMinimum)), "number" == typeof x && ("draft-4" === this.target || "openapi-3.0" === this.target ? (_.maximum = x, _.exclusiveMaximum = !0) : _.exclusiveMaximum = x), "number" == typeof A && (_.maximum = A, "number" == typeof x && "draft-4" !== this.target && (x <= A ? delete _.maximum : delete _.exclusiveMaximum)), "number" == typeof S && (_.multipleOf = S);
						break;
					case "boolean":
					case "success":
						p.type = "boolean";
						break;
					case "bigint":
						if ("throw" === this.unrepresentable) throw new Error("BigInt cannot be represented in JSON Schema");
						break;
					case "symbol":
						if ("throw" === this.unrepresentable) throw new Error("Symbols cannot be represented in JSON Schema");
						break;
					case "null":
						"openapi-3.0" === this.target ? (p.type = "string", p.nullable = !0, p.enum = [null]) : p.type = "null";
						break;
					case "any":
					case "unknown": break;
					case "undefined":
						if ("throw" === this.unrepresentable) throw new Error("Undefined cannot be represented in JSON Schema");
						break;
					case "void":
						if ("throw" === this.unrepresentable) throw new Error("Void cannot be represented in JSON Schema");
						break;
					case "never":
						p.not = {};
						break;
					case "date":
						if ("throw" === this.unrepresentable) throw new Error("Date cannot be represented in JSON Schema");
						break;
					case "array":
						var B = p, I = e._zod.bag, T = I.minimum, P = I.maximum;
						"number" == typeof T && (B.minItems = T), "number" == typeof P && (B.maxItems = P), B.type = "array", B.items = this.process(o.element, pn(pn({}, f), {}, { path: [].concat(gn(f.path), ["items"]) }));
						break;
					case "object":
						var j, N = p;
						N.type = "object", N.properties = {};
						var z = o.shape;
						for (var R in z) N.properties[R] = this.process(z[R], pn(pn({}, f), {}, { path: [].concat(gn(f.path), ["properties", R]) }));
						var M = new Set(Object.keys(z)), Z = new Set(gn(M).filter(function(e) {
							var t = o.shape[e]._zod;
							return "input" === a.io ? void 0 === t.optin : void 0 === t.optout;
						}));
						Z.size > 0 && (N.required = Array.from(Z)), "never" === (null === (j = o.catchall) || void 0 === j ? void 0 : j._zod.def.type) ? N.additionalProperties = !1 : o.catchall ? o.catchall && (N.additionalProperties = this.process(o.catchall, pn(pn({}, f), {}, { path: [].concat(gn(f.path), ["additionalProperties"]) }))) : "output" === this.io && (N.additionalProperties = !1);
						break;
					case "union":
						var L = p;
						L.anyOf = o.options.map(function(e, t) {
							return a.process(e, pn(pn({}, f), {}, { path: [].concat(gn(f.path), ["anyOf", t]) }));
						});
						break;
					case "intersection":
						var q = p, U = this.process(o.left, pn(pn({}, f), {}, { path: [].concat(gn(f.path), ["allOf", 0]) })), H = this.process(o.right, pn(pn({}, f), {}, { path: [].concat(gn(f.path), ["allOf", 1]) })), V = function(e) {
							return "allOf" in e && 1 === Object.keys(e).length;
						};
						q.allOf = [].concat(gn(V(U) ? U.allOf : [U]), gn(V(H) ? H.allOf : [H]));
						break;
					case "tuple":
						var K = p;
						K.type = "array";
						var J = "draft-2020-12" === this.target ? "prefixItems" : "items", Q = "draft-2020-12" === this.target || "openapi-3.0" === this.target ? "items" : "additionalItems", G = o.items.map(function(e, t) {
							return a.process(e, pn(pn({}, f), {}, { path: [].concat(gn(f.path), [J, t]) }));
						}), Y = o.rest ? this.process(o.rest, pn(pn({}, f), {}, { path: [].concat(gn(f.path), [Q], gn("openapi-3.0" === this.target ? [o.items.length] : [])) })) : null;
						"draft-2020-12" === this.target ? (K.prefixItems = G, Y && (K.items = Y)) : "openapi-3.0" === this.target ? (K.items = { anyOf: G }, Y && K.items.anyOf.push(Y), K.minItems = G.length, Y || (K.maxItems = G.length)) : (K.items = G, Y && (K.additionalItems = Y));
						var X = e._zod.bag, ee = X.minimum, te = X.maximum;
						"number" == typeof ee && (K.minItems = ee), "number" == typeof te && (K.maxItems = te);
						break;
					case "record":
						var ne = p;
						ne.type = "object", "draft-7" !== this.target && "draft-2020-12" !== this.target || (ne.propertyNames = this.process(o.keyType, pn(pn({}, f), {}, { path: [].concat(gn(f.path), ["propertyNames"]) }))), ne.additionalProperties = this.process(o.valueType, pn(pn({}, f), {}, { path: [].concat(gn(f.path), ["additionalProperties"]) }));
						break;
					case "map":
						if ("throw" === this.unrepresentable) throw new Error("Map cannot be represented in JSON Schema");
						break;
					case "set":
						if ("throw" === this.unrepresentable) throw new Error("Set cannot be represented in JSON Schema");
						break;
					case "enum":
						var re = p, ue = ys(o.entries);
						ue.every(function(e) {
							return "number" == typeof e;
						}) && (re.type = "number"), ue.every(function(e) {
							return "string" == typeof e;
						}) && (re.type = "string"), re.enum = ue;
						break;
					case "literal":
						var ae, ie = p, oe = [], se = an(o.values);
						try {
							for (se.s(); !(ae = se.n()).done;) {
								var ce = ae.value;
								if (void 0 === ce) {
									if ("throw" === this.unrepresentable) throw new Error("Literal `undefined` cannot be represented in JSON Schema");
								} else if ("bigint" == typeof ce) {
									if ("throw" === this.unrepresentable) throw new Error("BigInt literals cannot be represented in JSON Schema");
									oe.push(Number(ce));
								} else oe.push(ce);
							}
						} catch (e) {
							se.e(e);
						} finally {
							se.f();
						}
						if (0 === oe.length);
						else if (1 === oe.length) {
							var le = oe[0];
							ie.type = null === le ? "null" : En(le), "draft-4" === this.target || "openapi-3.0" === this.target ? ie.enum = [le] : ie.const = le;
						} else oe.every(function(e) {
							return "number" == typeof e;
						}) && (ie.type = "number"), oe.every(function(e) {
							return "string" == typeof e;
						}) && (ie.type = "string"), oe.every(function(e) {
							return "boolean" == typeof e;
						}) && (ie.type = "string"), oe.every(function(e) {
							return null === e;
						}) && (ie.type = "null"), ie.enum = oe;
						break;
					case "file":
						var fe = p, de = {
							type: "string",
							format: "binary",
							contentEncoding: "binary"
						}, pe = e._zod.bag, he = pe.minimum, ve = pe.maximum, me = pe.mime;
						void 0 !== he && (de.minLength = he), void 0 !== ve && (de.maxLength = ve), me ? 1 === me.length ? (de.contentMediaType = me[0], Object.assign(fe, de)) : fe.anyOf = me.map(function(e) {
							return pn(pn({}, de), {}, { contentMediaType: e });
						}) : Object.assign(fe, de);
						break;
					case "transform":
						if ("throw" === this.unrepresentable) throw new Error("Transforms cannot be represented in JSON Schema");
						break;
					case "nullable":
						var De = this.process(o.innerType, f);
						"openapi-3.0" === this.target ? (c.ref = o.innerType, p.nullable = !0) : p.anyOf = [De, { type: "null" }];
						break;
					case "nonoptional":
					case "promise":
					case "optional":
						this.process(o.innerType, f), c.ref = o.innerType;
						break;
					case "default":
						this.process(o.innerType, f), c.ref = o.innerType, p.default = JSON.parse(JSON.stringify(o.defaultValue));
						break;
					case "prefault":
						this.process(o.innerType, f), c.ref = o.innerType, "input" === this.io && (p._prefault = JSON.parse(JSON.stringify(o.defaultValue)));
						break;
					case "catch":
						var ye;
						this.process(o.innerType, f), c.ref = o.innerType;
						try {
							ye = o.catchValue(void 0);
						} catch (e) {
							throw new Error("Dynamic catch values are not supported in JSON Schema");
						}
						p.default = ye;
						break;
					case "nan":
						if ("throw" === this.unrepresentable) throw new Error("NaN cannot be represented in JSON Schema");
						break;
					case "template_literal":
						var ge = p, Fe = e._zod.pattern;
						if (!Fe) throw new Error("Pattern not found in template literal");
						ge.type = "string", ge.pattern = Fe.source;
						break;
					case "pipe":
						var Ee = "input" === this.io ? "transform" === o.in._zod.def.type ? o.out : o.in : o.out;
						this.process(Ee, f), c.ref = Ee;
						break;
					case "readonly":
						this.process(o.innerType, f), c.ref = o.innerType, p.readOnly = !0;
						break;
					case "lazy":
						var be = e._zod.innerType;
						this.process(be, f), c.ref = be;
						break;
					case "custom":
						if ("throw" === this.unrepresentable) throw new Error("Custom types cannot be represented in JSON Schema");
						break;
					case "function": if ("throw" === this.unrepresentable) throw new Error("Function types cannot be represented in JSON Schema");
				}
			}
		}
		var _e = this.metadataRegistry.get(e);
		return _e && Object.assign(c.schema, _e), "input" === this.io && Pf(e) && (delete c.schema.examples, delete c.schema.default), "input" === this.io && c.schema._prefault && (null !== (r = (u = c.schema).default) && void 0 !== r || (u.default = c.schema._prefault)), delete c.schema._prefault, this.seen.get(e).schema;
	}
}, {
	key: "emit",
	value: function(e, t) {
		var n, r, u, a, i, o, s = this, c = {
			cycles: null !== (n = null == t ? void 0 : t.cycles) && void 0 !== n ? n : "ref",
			reused: null !== (r = null == t ? void 0 : t.reused) && void 0 !== r ? r : "inline",
			external: null !== (u = null == t ? void 0 : t.external) && void 0 !== u ? u : void 0
		}, l = this.seen.get(e);
		if (!l) throw new Error("Unprocessed schema. This is a bug in Zod.");
		var f = function(e) {
			if (!e[1].schema.$ref) {
				var t = e[1], n = function(e) {
					var t, n = "draft-2020-12" === s.target ? "$defs" : "definitions";
					if (c.external) {
						var r, u, a, i, o = null === (r = c.external.registry.get(e[0])) || void 0 === r ? void 0 : r.id, f = null !== (u = c.external.uri) && void 0 !== u ? u : function(e) {
							return e;
						};
						if (o) return { ref: f(o) };
						var d = null !== (a = null !== (i = e[1].defId) && void 0 !== i ? i : e[1].schema.id) && void 0 !== a ? a : "schema".concat(s.counter++);
						return e[1].defId = d, {
							defId: d,
							ref: "".concat(f("__shared"), "#/").concat(n, "/").concat(d)
						};
					}
					if (e[1] === l) return { ref: "#" };
					var p = "".concat("#", "/").concat(n, "/"), h = null !== (t = e[1].schema.id) && void 0 !== t ? t : "__schema".concat(s.counter++);
					return {
						defId: h,
						ref: p + h
					};
				}(e), r = n.ref, u = n.defId;
				t.def = pn({}, t.schema), u && (t.defId = u);
				var a = t.schema;
				for (var i in a) delete a[i];
				a.$ref = r;
			}
		};
		if ("throw" === c.cycles) {
			var d, p = an(this.seen.entries());
			try {
				for (p.s(); !(d = p.n()).done;) {
					var h, v = d.value[1];
					if (v.cycle) throw new Error("Cycle detected: " + "#/".concat(null === (h = v.cycle) || void 0 === h ? void 0 : h.join("/"), "/<root>") + "\n\nSet the `cycles` parameter to `\"ref\"` to resolve cyclical schemas with defs.");
				}
			} catch (e) {
				p.e(e);
			} finally {
				p.f();
			}
		}
		var m, D = an(this.seen.entries());
		try {
			for (D.s(); !(m = D.n()).done;) {
				var y, g = m.value, F = g[1];
				if (e !== g[0]) {
					if (c.external) {
						var E, b = null === (E = c.external.registry.get(g[0])) || void 0 === E ? void 0 : E.id;
						if (e !== g[0] && b) {
							f(g);
							continue;
						}
					}
					(!(null === (y = this.metadataRegistry.get(g[0])) || void 0 === y) && y.id || F.cycle || F.count > 1 && "ref" === c.reused) && f(g);
				} else f(g);
			}
		} catch (e) {
			D.e(e);
		} finally {
			D.f();
		}
		var _, k = function(e, t) {
			var n, r, u = s.seen.get(e), a = null !== (n = u.def) && void 0 !== n ? n : u.schema, i = pn({}, a);
			if (null !== u.ref) {
				var o = u.ref;
				if (u.ref = null, o) {
					k(o, t);
					var c, l = s.seen.get(o).schema;
					!l.$ref || "draft-7" !== t.target && "draft-4" !== t.target && "openapi-3.0" !== t.target ? (Object.assign(a, l), Object.assign(a, i)) : (a.allOf = null !== (c = a.allOf) && void 0 !== c ? c : [], a.allOf.push(l));
				}
				u.isParent || s.override({
					zodSchema: e,
					jsonSchema: a,
					path: null !== (r = u.path) && void 0 !== r ? r : []
				});
			}
		}, C = an(gn(this.seen.entries()).reverse());
		try {
			for (C.s(); !(_ = C.n()).done;) {
				var A = _.value;
				k(A[0], { target: this.target });
			}
		} catch (e) {
			C.e(e);
		} finally {
			C.f();
		}
		var w = {};
		if ("draft-2020-12" === this.target ? w.$schema = "https://json-schema.org/draft/2020-12/schema" : "draft-7" === this.target ? w.$schema = "http://json-schema.org/draft-07/schema#" : "draft-4" === this.target ? w.$schema = "http://json-schema.org/draft-04/schema#" : "openapi-3.0" === this.target || console.warn("Invalid target: ".concat(this.target)), null !== (a = c.external) && void 0 !== a && a.uri) {
			var S, x = null === (S = c.external.registry.get(e)) || void 0 === S ? void 0 : S.id;
			if (!x) throw new Error("Schema is missing an `id` property");
			w.$id = c.external.uri(x);
		}
		Object.assign(w, l.def);
		var O, B = null !== (i = null === (o = c.external) || void 0 === o ? void 0 : o.defs) && void 0 !== i ? i : {}, I = an(this.seen.entries());
		try {
			for (I.s(); !(O = I.n()).done;) {
				var T = O.value[1];
				T.def && T.defId && (B[T.defId] = T.def);
			}
		} catch (e) {
			I.e(e);
		} finally {
			I.f();
		}
		c.external || Object.keys(B).length > 0 && ("draft-2020-12" === this.target ? w.$defs = B : w.definitions = B);
		try {
			return JSON.parse(JSON.stringify(w));
		} catch (e) {
			throw new Error("Error converting schema to JSON.");
		}
	}
}]);
function Pf(e, t) {
	var n = null != t ? t : { seen: /* @__PURE__ */ new Set() };
	if (n.seen.has(e)) return !1;
	n.seen.add(e);
	var r = e._zod.def;
	switch (r.type) {
		case "string":
		case "number":
		case "bigint":
		case "boolean":
		case "date":
		case "symbol":
		case "undefined":
		case "null":
		case "any":
		case "unknown":
		case "never":
		case "void":
		case "literal":
		case "enum":
		case "nan":
		case "file":
		case "template_literal":
		case "custom":
		case "success":
		case "catch":
		case "function": return !1;
		case "array": return Pf(r.element, n);
		case "object":
			for (var u in r.shape) if (Pf(r.shape[u], n)) return !0;
			return !1;
		case "union":
			var a, i = an(r.options);
			try {
				for (i.s(); !(a = i.n()).done;) if (Pf(a.value, n)) return !0;
			} catch (e) {
				i.e(e);
			} finally {
				i.f();
			}
			return !1;
		case "intersection": return Pf(r.left, n) || Pf(r.right, n);
		case "tuple":
			var o, s = an(r.items);
			try {
				for (s.s(); !(o = s.n()).done;) if (Pf(o.value, n)) return !0;
			} catch (e) {
				s.e(e);
			} finally {
				s.f();
			}
			return !(!r.rest || !Pf(r.rest, n));
		case "record":
		case "map": return Pf(r.keyType, n) || Pf(r.valueType, n);
		case "set": return Pf(r.valueType, n);
		case "promise":
		case "optional":
		case "nonoptional":
		case "nullable":
		case "readonly":
		case "default":
		case "prefault": return Pf(r.innerType, n);
		case "lazy": return Pf(r.getter(), n);
		case "transform": return !0;
		case "pipe": return Pf(r.in, n) || Pf(r.out, n);
	}
	throw new Error("Unknown schema type: ".concat(r.type));
}
var jf = Object.freeze({
	__proto__: null,
	endsWith: wf,
	gt: mf,
	gte: Df,
	includes: Cf,
	length: Ef,
	lowercase: _f,
	lt: hf,
	lte: vf,
	maxLength: gf,
	maxSize: function(e, t) {
		return new Tc(pn(pn({ check: "max_size" }, Ns(t)), {}, { maximum: e }));
	},
	mime: function(e, t) {
		return new Kc(pn({
			check: "mime_type",
			mime: e
		}, Ns(t)));
	},
	minLength: Ff,
	minSize: function(e, t) {
		return new Pc(pn(pn({ check: "min_size" }, Ns(t)), {}, { minimum: e }));
	},
	multipleOf: yf,
	negative: function(e) {
		return hf(0, e);
	},
	nonnegative: function(e) {
		return Df(0, e);
	},
	nonpositive: function(e) {
		return vf(0, e);
	},
	normalize: xf,
	overwrite: Sf,
	positive: function(e) {
		return mf(0, e);
	},
	property: function(e, t, n) {
		return new Wc(pn({
			check: "property",
			property: e,
			schema: t
		}, Ns(n)));
	},
	regex: bf,
	size: function(e, t) {
		return new jc(pn(pn({ check: "size_equals" }, Ns(t)), {}, { size: e }));
	},
	startsWith: Af,
	toLowerCase: Bf,
	toUpperCase: If,
	trim: Of,
	uppercase: kf
}), Nf = ps("ZodISODateTime", function(e, t) {
	dl.init(e, t), rd.init(e, t);
});
var zf = ps("ZodISODate", function(e, t) {
	pl.init(e, t), rd.init(e, t);
});
var Rf = ps("ZodISOTime", function(e, t) {
	hl.init(e, t), rd.init(e, t);
});
var Mf = ps("ZodISODuration", function(e, t) {
	vl.init(e, t), rd.init(e, t);
});
var Zf = ps("ZodError", function(e, t) {
	Vs.init(e, t), e.name = "ZodError", Object.defineProperties(e, {
		format: { value: function(t) {
			return function(e) {
				var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function(e) {
					return e.message;
				}, n = { _errors: [] }, r = function(e) {
					var u, a = an(e.issues);
					try {
						for (a.s(); !(u = a.n()).done;) {
							var i = u.value;
							if ("invalid_union" === i.code && i.errors.length) i.errors.map(function(e) {
								return r({ issues: e });
							});
							else if ("invalid_key" === i.code) r({ issues: i.issues });
							else if ("invalid_element" === i.code) r({ issues: i.issues });
							else if (0 === i.path.length) n._errors.push(t(i));
							else for (var o = n, s = 0; s < i.path.length;) {
								var c = i.path[s];
								s === i.path.length - 1 ? (o[c] = o[c] || { _errors: [] }, o[c]._errors.push(t(i))) : o[c] = o[c] || { _errors: [] }, o = o[c], s++;
							}
						}
					} catch (e) {
						a.e(e);
					} finally {
						a.f();
					}
				};
				return r(e), n;
			}(e, t);
		} },
		flatten: { value: function(t) {
			return function(e) {
				var t, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function(e) {
					return e.message;
				}, r = {}, u = [], a = an(e.issues);
				try {
					for (a.s(); !(t = a.n()).done;) {
						var i = t.value;
						i.path.length > 0 ? (r[i.path[0]] = r[i.path[0]] || [], r[i.path[0]].push(n(i))) : u.push(n(i));
					}
				} catch (e) {
					a.e(e);
				} finally {
					a.f();
				}
				return {
					formErrors: u,
					fieldErrors: r
				};
			}(e, t);
		} },
		addIssue: { value: function(t) {
			e.issues.push(t), e.message = JSON.stringify(e.issues, gs, 2);
		} },
		addIssues: { value: function(t) {
			var n;
			(n = e.issues).push.apply(n, gn(t)), e.message = JSON.stringify(e.issues, gs, 2);
		} },
		isEmpty: { get: function() {
			return 0 === e.issues.length;
		} }
	});
}, { Parent: Error }), Lf = Ks(Zf), $f = Js(Zf), qf = Qs(Zf), Uf = Ys(Zf), Hf = function(e) {
	return function(t, n, r) {
		var u = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
		return Ks(e)(t, n, u);
	};
}(Zf), Vf = function(e) {
	return function(t, n, r) {
		return Ks(e)(t, n, r);
	};
}(Zf), Wf = function(e) {
	return function() {
		var t = Xt(vn().m(function t(n, r, u) {
			var a;
			return vn().w(function(t) {
				for (;;) if (0 === t.n) return a = u ? Object.assign(u, { direction: "backward" }) : { direction: "backward" }, t.a(2, Js(e)(n, r, a));
			}, t);
		}));
		return function(e, n, r) {
			return t.apply(this, arguments);
		};
	}();
}(Zf), Kf = function(e) {
	return function() {
		var t = Xt(vn().m(function t(n, r, u) {
			return vn().w(function(t) {
				for (;;) if (0 === t.n) return t.a(2, Js(e)(n, r, u));
			}, t);
		}));
		return function(e, n, r) {
			return t.apply(this, arguments);
		};
	}();
}(Zf), Jf = function(e) {
	return function(t, n, r) {
		var u = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
		return Qs(e)(t, n, u);
	};
}(Zf), Qf = function(e) {
	return function(t, n, r) {
		return Qs(e)(t, n, r);
	};
}(Zf), Gf = function(e) {
	return function() {
		var t = Xt(vn().m(function t(n, r, u) {
			var a;
			return vn().w(function(t) {
				for (;;) if (0 === t.n) return a = u ? Object.assign(u, { direction: "backward" }) : { direction: "backward" }, t.a(2, Ys(e)(n, r, a));
			}, t);
		}));
		return function(e, n, r) {
			return t.apply(this, arguments);
		};
	}();
}(Zf), Yf = function(e) {
	return function() {
		var t = Xt(vn().m(function t(n, r, u) {
			return vn().w(function(t) {
				for (;;) if (0 === t.n) return t.a(2, Ys(e)(n, r, u));
			}, t);
		}));
		return function(e, n, r) {
			return t.apply(this, arguments);
		};
	}();
}(Zf), Xf = ps("ZodType", function(e, t) {
	return Yc.init(e, t), e.def = t, e.type = t.type, Object.defineProperty(e, "_def", { value: t }), e.check = function() {
		for (var n, r = arguments.length, u = new Array(r), a = 0; a < r; a++) u[a] = arguments[a];
		return e.clone(As(t, { checks: [].concat(gn(null !== (n = t.checks) && void 0 !== n ? n : []), gn(u.map(function(e) {
			return "function" == typeof e ? { _zod: {
				check: e,
				def: { check: "custom" },
				onattach: []
			} } : e;
		}))) }));
	}, e.clone = function(t, n) {
		return js(e, t, n);
	}, e.brand = function() {
		return e;
	}, e.register = function(t, n) {
		return t.add(e, n), e;
	}, e.parse = function(t, n) {
		return Lf(e, t, n, { callee: e.parse });
	}, e.safeParse = function(t, n) {
		return qf(e, t, n);
	}, e.parseAsync = function() {
		var t = Xt(vn().m(function t(n, r) {
			return vn().w(function(t) {
				for (;;) if (0 === t.n) return t.a(2, $f(e, n, r, { callee: e.parseAsync }));
			}, t);
		}));
		return function(e, n) {
			return t.apply(this, arguments);
		};
	}(), e.safeParseAsync = function() {
		var t = Xt(vn().m(function t(n, r) {
			return vn().w(function(t) {
				for (;;) if (0 === t.n) return t.a(2, Uf(e, n, r));
			}, t);
		}));
		return function(e, n) {
			return t.apply(this, arguments);
		};
	}(), e.spa = e.safeParseAsync, e.encode = function(t, n) {
		return Hf(e, t, n);
	}, e.decode = function(t, n) {
		return Vf(e, t, n);
	}, e.encodeAsync = function() {
		var t = Xt(vn().m(function t(n, r) {
			return vn().w(function(t) {
				for (;;) if (0 === t.n) return t.a(2, Wf(e, n, r));
			}, t);
		}));
		return function(e, n) {
			return t.apply(this, arguments);
		};
	}(), e.decodeAsync = function() {
		var t = Xt(vn().m(function t(n, r) {
			return vn().w(function(t) {
				for (;;) if (0 === t.n) return t.a(2, Kf(e, n, r));
			}, t);
		}));
		return function(e, n) {
			return t.apply(this, arguments);
		};
	}(), e.safeEncode = function(t, n) {
		return Jf(e, t, n);
	}, e.safeDecode = function(t, n) {
		return Qf(e, t, n);
	}, e.safeEncodeAsync = function() {
		var t = Xt(vn().m(function t(n, r) {
			return vn().w(function(t) {
				for (;;) if (0 === t.n) return t.a(2, Gf(e, n, r));
			}, t);
		}));
		return function(e, n) {
			return t.apply(this, arguments);
		};
	}(), e.safeDecodeAsync = function() {
		var t = Xt(vn().m(function t(n, r) {
			return vn().w(function(t) {
				for (;;) if (0 === t.n) return t.a(2, Yf(e, n, r));
			}, t);
		}));
		return function(e, n) {
			return t.apply(this, arguments);
		};
	}(), e.refine = function(t, n) {
		return e.check(function(e) {
			return function(e, t, n) {
				return new fp(pn({
					type: "custom",
					check: "custom",
					fn: t
				}, Ns(n)));
			}(0, e, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {});
		}(t, n));
	}, e.superRefine = function(t) {
		return e.check(function(e) {
			var t = function(e) {
				var t = new wc(pn({ check: "custom" }, Ns(void 0)));
				return t._zod.check = e, t;
			}(function(n) {
				return n.addIssue = function(e) {
					if ("string" == typeof e) n.issues.push(Us(e, n.value, t._zod.def));
					else {
						var r, u, a, i, o = e;
						o.fatal && (o.continue = !1), null !== (r = o.code) && void 0 !== r || (o.code = "custom"), null !== (u = o.input) && void 0 !== u || (o.input = n.value), null !== (a = o.inst) && void 0 !== a || (o.inst = t), null !== (i = o.continue) && void 0 !== i || (o.continue = !t._zod.def.abort), n.issues.push(Us(o));
					}
				}, e(n.value, n);
			});
			return t;
		}(t));
	}, e.overwrite = function(t) {
		return e.check(Sf(t));
	}, e.optional = function() {
		return Yd(e);
	}, e.nullable = function() {
		return ep(e);
	}, e.nullish = function() {
		return Yd(ep(e));
	}, e.nonoptional = function(t) {
		return function(e, t) {
			return new rp(pn({
				type: "nonoptional",
				innerType: e
			}, Ns(t)));
		}(e, t);
	}, e.array = function() {
		return Nd(e);
	}, e.or = function(t) {
		return Ld([e, t]);
	}, e.and = function(t) {
		return new qd({
			type: "intersection",
			left: e,
			right: t
		});
	}, e.transform = function(t) {
		return ip(e, new Qd({
			type: "transform",
			transform: t
		}));
	}, e.default = function(t) {
		return n = t, new tp({
			type: "default",
			innerType: e,
			get defaultValue() {
				return "function" == typeof n ? n() : Is(n);
			}
		});
		var n;
	}, e.prefault = function(t) {
		return n = t, new np({
			type: "prefault",
			innerType: e,
			get defaultValue() {
				return "function" == typeof n ? n() : Is(n);
			}
		});
		var n;
	}, e.catch = function(t) {
		return new up({
			type: "catch",
			innerType: e,
			catchValue: "function" == typeof (n = t) ? n : function() {
				return n;
			}
		});
		var n;
	}, e.pipe = function(t) {
		return ip(e, t);
	}, e.readonly = function() {
		return new cp({
			type: "readonly",
			innerType: e
		});
	}, e.describe = function(t) {
		var n = e.clone();
		return df.add(n, { description: t }), n;
	}, Object.defineProperty(e, "description", {
		get: function() {
			var t;
			return null === (t = df.get(e)) || void 0 === t ? void 0 : t.description;
		},
		configurable: !0
	}), e.meta = function() {
		if (0 === arguments.length) return df.get(e);
		var t = e.clone();
		return df.add(t, arguments.length <= 0 ? void 0 : arguments[0]), t;
	}, e.isOptional = function() {
		return e.safeParse(void 0).success;
	}, e.isNullable = function() {
		return e.safeParse(null).success;
	}, e;
}), ed = ps("_ZodString", function(e, t) {
	var n, r, u;
	Xc.init(e, t), Xf.init(e, t);
	var a = e._zod.bag;
	e.format = null !== (n = a.format) && void 0 !== n ? n : null, e.minLength = null !== (r = a.minimum) && void 0 !== r ? r : null, e.maxLength = null !== (u = a.maximum) && void 0 !== u ? u : null, e.regex = function() {
		return e.check(bf.apply(jf, arguments));
	}, e.includes = function() {
		return e.check(Cf.apply(jf, arguments));
	}, e.startsWith = function() {
		return e.check(Af.apply(jf, arguments));
	}, e.endsWith = function() {
		return e.check(wf.apply(jf, arguments));
	}, e.min = function() {
		return e.check(Ff.apply(jf, arguments));
	}, e.max = function() {
		return e.check(gf.apply(jf, arguments));
	}, e.length = function() {
		return e.check(Ef.apply(jf, arguments));
	}, e.nonempty = function() {
		for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
		return e.check(Ff.apply(jf, [1].concat(n)));
	}, e.lowercase = function(t) {
		return e.check(_f(t));
	}, e.uppercase = function(t) {
		return e.check(kf(t));
	}, e.trim = function() {
		return e.check(Of());
	}, e.normalize = function() {
		return e.check(xf.apply(jf, arguments));
	}, e.toLowerCase = function() {
		return e.check(Bf());
	}, e.toUpperCase = function() {
		return e.check(If());
	};
}), td = ps("ZodString", function(e, t) {
	Xc.init(e, t), ed.init(e, t), e.email = function(t) {
		return e.check(function(e, t) {
			return new ud(pn({
				type: "string",
				format: "email",
				check: "string_format",
				abort: !1
			}, Ns(t)));
		}(0, t));
	}, e.url = function(t) {
		return e.check(function(e, t) {
			return new od(pn({
				type: "string",
				format: "url",
				check: "string_format",
				abort: !1
			}, Ns(t)));
		}(0, t));
	}, e.jwt = function(t) {
		return e.check(function(e, t) {
			return new bd(pn({
				type: "string",
				format: "jwt",
				check: "string_format",
				abort: !1
			}, Ns(t)));
		}(0, t));
	}, e.emoji = function(t) {
		return e.check(function(e, t) {
			return new sd(pn({
				type: "string",
				format: "emoji",
				check: "string_format",
				abort: !1
			}, Ns(t)));
		}(0, t));
	}, e.guid = function(t) {
		return e.check(pf(ad, t));
	}, e.uuid = function(t) {
		return e.check(function(e, t) {
			return new id(pn({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: !1
			}, Ns(t)));
		}(0, t));
	}, e.uuidv4 = function(t) {
		return e.check(function(e, t) {
			return new id(pn({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: !1,
				version: "v4"
			}, Ns(t)));
		}(0, t));
	}, e.uuidv6 = function(t) {
		return e.check(function(e, t) {
			return new id(pn({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: !1,
				version: "v6"
			}, Ns(t)));
		}(0, t));
	}, e.uuidv7 = function(t) {
		return e.check(function(e, t) {
			return new id(pn({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: !1,
				version: "v7"
			}, Ns(t)));
		}(0, t));
	}, e.nanoid = function(t) {
		return e.check(function(e, t) {
			return new cd(pn({
				type: "string",
				format: "nanoid",
				check: "string_format",
				abort: !1
			}, Ns(t)));
		}(0, t));
	}, e.guid = function(t) {
		return e.check(pf(ad, t));
	}, e.cuid = function(t) {
		return e.check(function(e, t) {
			return new ld(pn({
				type: "string",
				format: "cuid",
				check: "string_format",
				abort: !1
			}, Ns(t)));
		}(0, t));
	}, e.cuid2 = function(t) {
		return e.check(function(e, t) {
			return new fd(pn({
				type: "string",
				format: "cuid2",
				check: "string_format",
				abort: !1
			}, Ns(t)));
		}(0, t));
	}, e.ulid = function(t) {
		return e.check(function(e, t) {
			return new dd(pn({
				type: "string",
				format: "ulid",
				check: "string_format",
				abort: !1
			}, Ns(t)));
		}(0, t));
	}, e.base64 = function(t) {
		return e.check(function(e, t) {
			return new gd(pn({
				type: "string",
				format: "base64",
				check: "string_format",
				abort: !1
			}, Ns(t)));
		}(0, t));
	}, e.base64url = function(t) {
		return e.check(function(e, t) {
			return new Fd(pn({
				type: "string",
				format: "base64url",
				check: "string_format",
				abort: !1
			}, Ns(t)));
		}(0, t));
	}, e.xid = function(t) {
		return e.check(function(e, t) {
			return new pd(pn({
				type: "string",
				format: "xid",
				check: "string_format",
				abort: !1
			}, Ns(t)));
		}(0, t));
	}, e.ksuid = function(t) {
		return e.check(function(e, t) {
			return new hd(pn({
				type: "string",
				format: "ksuid",
				check: "string_format",
				abort: !1
			}, Ns(t)));
		}(0, t));
	}, e.ipv4 = function(t) {
		return e.check(function(e, t) {
			return new vd(pn({
				type: "string",
				format: "ipv4",
				check: "string_format",
				abort: !1
			}, Ns(t)));
		}(0, t));
	}, e.ipv6 = function(t) {
		return e.check(function(e, t) {
			return new md(pn({
				type: "string",
				format: "ipv6",
				check: "string_format",
				abort: !1
			}, Ns(t)));
		}(0, t));
	}, e.cidrv4 = function(t) {
		return e.check(function(e, t) {
			return new Dd(pn({
				type: "string",
				format: "cidrv4",
				check: "string_format",
				abort: !1
			}, Ns(t)));
		}(0, t));
	}, e.cidrv6 = function(t) {
		return e.check(function(e, t) {
			return new yd(pn({
				type: "string",
				format: "cidrv6",
				check: "string_format",
				abort: !1
			}, Ns(t)));
		}(0, t));
	}, e.e164 = function(t) {
		return e.check(function(e, t) {
			return new Ed(pn({
				type: "string",
				format: "e164",
				check: "string_format",
				abort: !1
			}, Ns(t)));
		}(0, t));
	}, e.datetime = function(t) {
		return e.check(function(e) {
			return function(e, t) {
				return new Nf(pn({
					type: "string",
					format: "datetime",
					check: "string_format",
					offset: !1,
					local: !1,
					precision: null
				}, Ns(t)));
			}(0, e);
		}(t));
	}, e.date = function(t) {
		return e.check(function(e) {
			return function(e, t) {
				return new zf(pn({
					type: "string",
					format: "date",
					check: "string_format"
				}, Ns(t)));
			}(0, e);
		}(t));
	}, e.time = function(t) {
		return e.check(function(e) {
			return function(e, t) {
				return new Rf(pn({
					type: "string",
					format: "time",
					check: "string_format",
					precision: null
				}, Ns(t)));
			}(0, e);
		}(t));
	}, e.duration = function(t) {
		return e.check(function(e) {
			return function(e, t) {
				return new Mf(pn({
					type: "string",
					format: "duration",
					check: "string_format"
				}, Ns(t)));
			}(0, e);
		}(t));
	};
});
function nd(e) {
	return function(e, t) {
		return new td(pn({ type: "string" }, Ns(t)));
	}(0, e);
}
var rd = ps("ZodStringFormat", function(e, t) {
	el.init(e, t), ed.init(e, t);
}), ud = ps("ZodEmail", function(e, t) {
	rl.init(e, t), rd.init(e, t);
}), ad = ps("ZodGUID", function(e, t) {
	tl.init(e, t), rd.init(e, t);
}), id = ps("ZodUUID", function(e, t) {
	nl.init(e, t), rd.init(e, t);
}), od = ps("ZodURL", function(e, t) {
	ul.init(e, t), rd.init(e, t);
}), sd = ps("ZodEmoji", function(e, t) {
	al.init(e, t), rd.init(e, t);
}), cd = ps("ZodNanoID", function(e, t) {
	il.init(e, t), rd.init(e, t);
}), ld = ps("ZodCUID", function(e, t) {
	ol.init(e, t), rd.init(e, t);
}), fd = ps("ZodCUID2", function(e, t) {
	sl.init(e, t), rd.init(e, t);
}), dd = ps("ZodULID", function(e, t) {
	cl.init(e, t), rd.init(e, t);
}), pd = ps("ZodXID", function(e, t) {
	ll.init(e, t), rd.init(e, t);
}), hd = ps("ZodKSUID", function(e, t) {
	fl.init(e, t), rd.init(e, t);
}), vd = ps("ZodIPv4", function(e, t) {
	ml.init(e, t), rd.init(e, t);
}), md = ps("ZodIPv6", function(e, t) {
	Dl.init(e, t), rd.init(e, t);
}), Dd = ps("ZodCIDRv4", function(e, t) {
	yl.init(e, t), rd.init(e, t);
}), yd = ps("ZodCIDRv6", function(e, t) {
	gl.init(e, t), rd.init(e, t);
}), gd = ps("ZodBase64", function(e, t) {
	El.init(e, t), rd.init(e, t);
}), Fd = ps("ZodBase64URL", function(e, t) {
	bl.init(e, t), rd.init(e, t);
}), Ed = ps("ZodE164", function(e, t) {
	_l.init(e, t), rd.init(e, t);
}), bd = ps("ZodJWT", function(e, t) {
	kl.init(e, t), rd.init(e, t);
}), _d = ps("ZodNumber", function(e, t) {
	var n, r, u, a, i, o, s, c, l;
	Cl.init(e, t), Xf.init(e, t), e.gt = function(t, n) {
		return e.check(mf(t, n));
	}, e.gte = function(t, n) {
		return e.check(Df(t, n));
	}, e.min = function(t, n) {
		return e.check(Df(t, n));
	}, e.lt = function(t, n) {
		return e.check(hf(t, n));
	}, e.lte = function(t, n) {
		return e.check(vf(t, n));
	}, e.max = function(t, n) {
		return e.check(vf(t, n));
	}, e.int = function(t) {
		return e.check(Ad(t));
	}, e.safe = function(t) {
		return e.check(Ad(t));
	}, e.positive = function(t) {
		return e.check(mf(0, t));
	}, e.nonnegative = function(t) {
		return e.check(Df(0, t));
	}, e.negative = function(t) {
		return e.check(hf(0, t));
	}, e.nonpositive = function(t) {
		return e.check(vf(0, t));
	}, e.multipleOf = function(t, n) {
		return e.check(yf(t, n));
	}, e.step = function(t, n) {
		return e.check(yf(t, n));
	}, e.finite = function() {
		return e;
	};
	var f = e._zod.bag;
	e.minValue = null !== (n = Math.max(null !== (r = f.minimum) && void 0 !== r ? r : Number.NEGATIVE_INFINITY, null !== (u = f.exclusiveMinimum) && void 0 !== u ? u : Number.NEGATIVE_INFINITY)) && void 0 !== n ? n : null, e.maxValue = null !== (a = Math.min(null !== (i = f.maximum) && void 0 !== i ? i : Number.POSITIVE_INFINITY, null !== (o = f.exclusiveMaximum) && void 0 !== o ? o : Number.POSITIVE_INFINITY)) && void 0 !== a ? a : null, e.isInt = (null !== (s = f.format) && void 0 !== s ? s : "").includes("int") || Number.isSafeInteger(null !== (c = f.multipleOf) && void 0 !== c ? c : .5), e.isFinite = !0, e.format = null !== (l = f.format) && void 0 !== l ? l : null;
});
function kd(e) {
	return function(e, t) {
		return new _d(pn({
			type: "number",
			checks: []
		}, Ns(t)));
	}(0, e);
}
var Cd = ps("ZodNumberFormat", function(e, t) {
	Al.init(e, t), _d.init(e, t);
});
function Ad(e) {
	return function(e, t) {
		return new Cd(pn({
			type: "number",
			check: "number_format",
			abort: !1,
			format: "safeint"
		}, Ns(t)));
	}(0, e);
}
var wd = ps("ZodBoolean", function(e, t) {
	wl.init(e, t), Xf.init(e, t);
});
function Sd(e) {
	return function(e, t) {
		return new wd(pn({ type: "boolean" }, Ns(t)));
	}(0, e);
}
var xd = ps("ZodNull", function(e, t) {
	Sl.init(e, t), Xf.init(e, t);
});
function Od(e) {
	return function(e, t) {
		return new xd(pn({ type: "null" }, Ns(t)));
	}(0, e);
}
var Bd = ps("ZodUnknown", function(e, t) {
	xl.init(e, t), Xf.init(e, t);
});
function Id() {
	return new Bd({ type: "unknown" });
}
var Td = ps("ZodNever", function(e, t) {
	Ol.init(e, t), Xf.init(e, t);
});
function Pd(e) {
	return function(e, t) {
		return new Td(pn({ type: "never" }, Ns(t)));
	}(0, e);
}
var jd = ps("ZodArray", function(e, t) {
	Il.init(e, t), Xf.init(e, t), e.element = t.element, e.min = function(t, n) {
		return e.check(Ff(t, n));
	}, e.nonempty = function(t) {
		return e.check(Ff(1, t));
	}, e.max = function(t, n) {
		return e.check(gf(t, n));
	}, e.length = function(t, n) {
		return e.check(Ef(t, n));
	}, e.unwrap = function() {
		return e.element;
	};
});
function Nd(e, t) {
	return function(e, t, n) {
		return new jd(pn({
			type: "array",
			element: t
		}, Ns(n)));
	}(0, e, t);
}
var zd = ps("ZodObject", function(e, t) {
	zl.init(e, t), Xf.init(e, t), ks(e, "shape", function() {
		return t.shape;
	}), e.keyof = function() {
		return Wd(Object.keys(e._zod.def.shape));
	}, e.catchall = function(t) {
		return e.clone(pn(pn({}, e._zod.def), {}, { catchall: t }));
	}, e.passthrough = function() {
		return e.clone(pn(pn({}, e._zod.def), {}, { catchall: Id() }));
	}, e.loose = function() {
		return e.clone(pn(pn({}, e._zod.def), {}, { catchall: Id() }));
	}, e.strict = function() {
		return e.clone(pn(pn({}, e._zod.def), {}, { catchall: Pd() }));
	}, e.strip = function() {
		return e.clone(pn(pn({}, e._zod.def), {}, { catchall: void 0 }));
	}, e.extend = function(t) {
		return function(e, t) {
			if (!Bs(t)) throw new Error("Invalid input to extend: expected a plain object");
			var n = e._zod.def.checks;
			if (n && n.length > 0) throw new Error("Object schemas containing refinements cannot be extended. Use `.safeExtend()` instead.");
			return js(e, As(e._zod.def, {
				get shape() {
					var n = pn(pn({}, e._zod.def.shape), t);
					return Cs(this, "shape", n), n;
				},
				checks: []
			}));
		}(e, t);
	}, e.safeExtend = function(t) {
		return function(e, t) {
			if (!Bs(t)) throw new Error("Invalid input to safeExtend: expected a plain object");
			return js(e, pn(pn({}, e._zod.def), {}, {
				get shape() {
					var n = pn(pn({}, e._zod.def.shape), t);
					return Cs(this, "shape", n), n;
				},
				checks: e._zod.def.checks
			}));
		}(e, t);
	}, e.merge = function(t) {
		return function(e, t) {
			return js(e, As(e._zod.def, {
				get shape() {
					var n = pn(pn({}, e._zod.def.shape), t._zod.def.shape);
					return Cs(this, "shape", n), n;
				},
				get catchall() {
					return t._zod.def.catchall;
				},
				checks: []
			}));
		}(e, t);
	}, e.pick = function(t) {
		return function(e, t) {
			var n = e._zod.def;
			return js(e, As(e._zod.def, {
				get shape() {
					var e = {};
					for (var r in t) {
						if (!(r in n.shape)) throw new Error("Unrecognized key: \"".concat(r, "\""));
						t[r] && (e[r] = n.shape[r]);
					}
					return Cs(this, "shape", e), e;
				},
				checks: []
			}));
		}(e, t);
	}, e.omit = function(t) {
		return function(e, t) {
			var n = e._zod.def;
			return js(e, As(e._zod.def, {
				get shape() {
					var r = pn({}, e._zod.def.shape);
					for (var u in t) {
						if (!(u in n.shape)) throw new Error("Unrecognized key: \"".concat(u, "\""));
						t[u] && delete r[u];
					}
					return Cs(this, "shape", r), r;
				},
				checks: []
			}));
		}(e, t);
	}, e.partial = function() {
		return function(e, t, n) {
			return js(t, As(t._zod.def, {
				get shape() {
					var r = t._zod.def.shape, u = pn({}, r);
					if (n) for (var a in n) {
						if (!(a in r)) throw new Error("Unrecognized key: \"".concat(a, "\""));
						n[a] && (u[a] = e ? new e({
							type: "optional",
							innerType: r[a]
						}) : r[a]);
					}
					else for (var i in r) u[i] = e ? new e({
						type: "optional",
						innerType: r[i]
					}) : r[i];
					return Cs(this, "shape", u), u;
				},
				checks: []
			}));
		}(Gd, e, arguments.length <= 0 ? void 0 : arguments[0]);
	}, e.required = function() {
		return function(e, t, n) {
			return js(t, As(t._zod.def, {
				get shape() {
					var r = t._zod.def.shape, u = pn({}, r);
					if (n) for (var a in n) {
						if (!(a in u)) throw new Error("Unrecognized key: \"".concat(a, "\""));
						n[a] && (u[a] = new e({
							type: "nonoptional",
							innerType: r[a]
						}));
					}
					else for (var i in r) u[i] = new e({
						type: "nonoptional",
						innerType: r[i]
					});
					return Cs(this, "shape", u), u;
				},
				checks: []
			}));
		}(rp, e, arguments.length <= 0 ? void 0 : arguments[0]);
	};
});
function Rd(e, t) {
	return new zd(pn({
		type: "object",
		shape: null != e ? e : {}
	}, Ns(t)));
}
function Md(e, t) {
	return new zd(pn({
		type: "object",
		shape: e,
		catchall: Pd()
	}, Ns(t)));
}
var Zd = ps("ZodUnion", function(e, t) {
	Ml.init(e, t), Xf.init(e, t), e.options = t.options;
});
function Ld(e, t) {
	return new Zd(pn({
		type: "union",
		options: e
	}, Ns(t)));
}
var $d = ps("ZodDiscriminatedUnion", function(e, t) {
	Zd.init(e, t), Zl.init(e, t);
}), qd = ps("ZodIntersection", function(e, t) {
	Ll.init(e, t), Xf.init(e, t);
}), Ud = ps("ZodRecord", function(e, t) {
	Ul.init(e, t), Xf.init(e, t), e.keyType = t.keyType, e.valueType = t.valueType;
});
function Hd(e, t, n) {
	return new Ud(pn({
		type: "record",
		keyType: e,
		valueType: t
	}, Ns(n)));
}
var Vd = ps("ZodEnum", function(e, t) {
	Hl.init(e, t), Xf.init(e, t), e.enum = t.entries, e.options = Object.values(t.entries);
	var n = new Set(Object.keys(t.entries));
	e.extract = function(e, r) {
		var u, a = {}, i = an(e);
		try {
			for (i.s(); !(u = i.n()).done;) {
				var o = u.value;
				if (!n.has(o)) throw new Error("Key ".concat(o, " not found in enum"));
				a[o] = t.entries[o];
			}
		} catch (e) {
			i.e(e);
		} finally {
			i.f();
		}
		return new Vd(pn(pn(pn({}, t), {}, { checks: [] }, Ns(r)), {}, { entries: a }));
	}, e.exclude = function(e, r) {
		var u, a = pn({}, t.entries), i = an(e);
		try {
			for (i.s(); !(u = i.n()).done;) {
				var o = u.value;
				if (!n.has(o)) throw new Error("Key ".concat(o, " not found in enum"));
				delete a[o];
			}
		} catch (e) {
			i.e(e);
		} finally {
			i.f();
		}
		return new Vd(pn(pn(pn({}, t), {}, { checks: [] }, Ns(r)), {}, { entries: a }));
	};
});
function Wd(e, t) {
	return new Vd(pn({
		type: "enum",
		entries: Array.isArray(e) ? Object.fromEntries(e.map(function(e) {
			return [e, e];
		})) : e
	}, Ns(t)));
}
var Kd = ps("ZodLiteral", function(e, t) {
	Vl.init(e, t), Xf.init(e, t), e.values = new Set(t.values), Object.defineProperty(e, "value", { get: function() {
		if (t.values.length > 1) throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
		return t.values[0];
	} });
});
function Jd(e, t) {
	return new Kd(pn({
		type: "literal",
		values: Array.isArray(e) ? e : [e]
	}, Ns(t)));
}
var Qd = ps("ZodTransform", function(e, t) {
	Wl.init(e, t), Xf.init(e, t), e._zod.parse = function(n, r) {
		if ("backward" === r.direction) throw new vs(e.constructor.name);
		n.addIssue = function(r) {
			if ("string" == typeof r) n.issues.push(Us(r, n.value, t));
			else {
				var u, a, i, o = r;
				o.fatal && (o.continue = !1), null !== (u = o.code) && void 0 !== u || (o.code = "custom"), null !== (a = o.input) && void 0 !== a || (o.input = n.value), null !== (i = o.inst) && void 0 !== i || (o.inst = e), n.issues.push(Us(o));
			}
		};
		var u = t.transform(n.value, n);
		return u instanceof Promise ? u.then(function(e) {
			return n.value = e, n;
		}) : (n.value = u, n);
	};
}), Gd = ps("ZodOptional", function(e, t) {
	Jl.init(e, t), Xf.init(e, t), e.unwrap = function() {
		return e._zod.def.innerType;
	};
});
function Yd(e) {
	return new Gd({
		type: "optional",
		innerType: e
	});
}
var Xd = ps("ZodNullable", function(e, t) {
	Ql.init(e, t), Xf.init(e, t), e.unwrap = function() {
		return e._zod.def.innerType;
	};
});
function ep(e) {
	return new Xd({
		type: "nullable",
		innerType: e
	});
}
var tp = ps("ZodDefault", function(e, t) {
	Gl.init(e, t), Xf.init(e, t), e.unwrap = function() {
		return e._zod.def.innerType;
	}, e.removeDefault = e.unwrap;
}), np = ps("ZodPrefault", function(e, t) {
	Xl.init(e, t), Xf.init(e, t), e.unwrap = function() {
		return e._zod.def.innerType;
	};
}), rp = ps("ZodNonOptional", function(e, t) {
	ef.init(e, t), Xf.init(e, t), e.unwrap = function() {
		return e._zod.def.innerType;
	};
}), up = ps("ZodCatch", function(e, t) {
	nf.init(e, t), Xf.init(e, t), e.unwrap = function() {
		return e._zod.def.innerType;
	}, e.removeCatch = e.unwrap;
}), ap = ps("ZodPipe", function(e, t) {
	rf.init(e, t), Xf.init(e, t), e.in = t.in, e.out = t.out;
});
function ip(e, t) {
	return new ap({
		type: "pipe",
		in: e,
		out: t
	});
}
var op, sp, cp = ps("ZodReadonly", function(e, t) {
	af.init(e, t), Xf.init(e, t), e.unwrap = function() {
		return e._zod.def.innerType;
	};
}), lp = ps("ZodLazy", function(e, t) {
	sf.init(e, t), Xf.init(e, t), e.unwrap = function() {
		return e._zod.def.getter();
	};
}), fp = ps("ZodCustom", function(e, t) {
	cf.init(e, t), Xf.init(e, t);
});
function dp(e, t) {
	return function(e, t, n) {
		var r, u = Ns(n);
		return null !== (r = u.abort) && void 0 !== r || (u.abort = !0), new e(pn({
			type: "custom",
			check: "custom",
			fn: t
		}, u));
	}(fp, null != e ? e : function() {
		return !0;
	}, t);
}
function pp(e) {
	var n = new fp(pn({
		type: "custom",
		check: "custom",
		fn: function(t) {
			return t instanceof e;
		},
		abort: !0
	}, Ns(arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : { error: "Input not instance of ".concat(e.name) })));
	return n._zod.bag.Class = e, n;
}
(function(e) {
	e.assertEqual = function(e) {}, e.assertIs = function(e) {}, e.assertNever = function(e) {
		throw new Error();
	}, e.arrayToEnum = function(e) {
		var t, n = {}, r = an(e);
		try {
			for (r.s(); !(t = r.n()).done;) {
				var u = t.value;
				n[u] = u;
			}
		} catch (e) {
			r.e(e);
		} finally {
			r.f();
		}
		return n;
	}, e.getValidEnumValues = function(t) {
		var n, r = {}, u = an(e.objectKeys(t).filter(function(e) {
			return "number" != typeof t[t[e]];
		}));
		try {
			for (u.s(); !(n = u.n()).done;) {
				var a = n.value;
				r[a] = t[a];
			}
		} catch (e) {
			u.e(e);
		} finally {
			u.f();
		}
		return e.objectValues(r);
	}, e.objectValues = function(t) {
		return e.objectKeys(t).map(function(e) {
			return t[e];
		});
	}, e.objectKeys = "function" == typeof Object.keys ? function(e) {
		return Object.keys(e);
	} : function(e) {
		var t = [];
		for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
		return t;
	}, e.find = function(e, t) {
		var n, r = an(e);
		try {
			for (r.s(); !(n = r.n()).done;) {
				var u = n.value;
				if (t(u)) return u;
			}
		} catch (e) {
			r.e(e);
		} finally {
			r.f();
		}
	}, e.isInteger = "function" == typeof Number.isInteger ? function(e) {
		return Number.isInteger(e);
	} : function(e) {
		return "number" == typeof e && Number.isFinite(e) && Math.floor(e) === e;
	}, e.joinValues = function(e) {
		var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : " | ";
		return e.map(function(e) {
			return "string" == typeof e ? "'".concat(e, "'") : e;
		}).join(t);
	}, e.jsonStringifyReplacer = function(e, t) {
		return "bigint" == typeof t ? t.toString() : t;
	};
})(op || (op = {})), (sp || (sp = {})).mergeShapes = function(e, t) {
	return pn(pn({}, e), t);
};
var hp = op.arrayToEnum([
	"string",
	"nan",
	"number",
	"integer",
	"float",
	"boolean",
	"date",
	"bigint",
	"symbol",
	"function",
	"undefined",
	"null",
	"array",
	"object",
	"unknown",
	"promise",
	"void",
	"never",
	"map",
	"set"
]), vp = function(e) {
	switch (En(e)) {
		case "undefined": return hp.undefined;
		case "string": return hp.string;
		case "number": return Number.isNaN(e) ? hp.nan : hp.number;
		case "boolean": return hp.boolean;
		case "function": return hp.function;
		case "bigint": return hp.bigint;
		case "symbol": return hp.symbol;
		case "object": return Array.isArray(e) ? hp.array : null === e ? hp.null : e.then && "function" == typeof e.then && e.catch && "function" == typeof e.catch ? hp.promise : "undefined" != typeof Map && e instanceof Map ? hp.map : "undefined" != typeof Set && e instanceof Set ? hp.set : "undefined" != typeof Date && e instanceof Date ? hp.date : hp.object;
		default: return hp.unknown;
	}
}, mp = op.arrayToEnum([
	"invalid_type",
	"invalid_literal",
	"custom",
	"invalid_union",
	"invalid_union_discriminator",
	"invalid_enum_value",
	"unrecognized_keys",
	"invalid_arguments",
	"invalid_return_type",
	"invalid_date",
	"invalid_string",
	"too_small",
	"too_big",
	"invalid_intersection_types",
	"not_multiple_of",
	"not_finite"
]), Dp = function() {
	function e(t) {
		var n;
		tn(this, e), (n = en(this, e)).issues = [], n.addIssue = function(e) {
			n.issues = [].concat(gn(n.issues), [e]);
		}, n.addIssues = function() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
			n.issues = [].concat(gn(n.issues), gn(e));
		};
		var r = (this instanceof e ? this.constructor : void 0).prototype;
		return Object.setPrototypeOf ? Object.setPrototypeOf(n, r) : n.__proto__ = r, n.name = "ZodError", n.issues = t, n;
	}
	return ln(e, _n(Error)), un(e, [
		{
			key: "errors",
			get: function() {
				return this.issues;
			}
		},
		{
			key: "format",
			value: function(e) {
				var t = e || function(e) {
					return e.message;
				}, n = { _errors: [] }, r = function(e) {
					var u, a = an(e.issues);
					try {
						for (a.s(); !(u = a.n()).done;) {
							var i = u.value;
							if ("invalid_union" === i.code) i.unionErrors.map(r);
							else if ("invalid_return_type" === i.code) r(i.returnTypeError);
							else if ("invalid_arguments" === i.code) r(i.argumentsError);
							else if (0 === i.path.length) n._errors.push(t(i));
							else for (var o = n, s = 0; s < i.path.length;) {
								var c = i.path[s];
								s === i.path.length - 1 ? (o[c] = o[c] || { _errors: [] }, o[c]._errors.push(t(i))) : o[c] = o[c] || { _errors: [] }, o = o[c], s++;
							}
						}
					} catch (e) {
						a.e(e);
					} finally {
						a.f();
					}
				};
				return r(this), n;
			}
		},
		{
			key: "toString",
			value: function() {
				return this.message;
			}
		},
		{
			key: "message",
			get: function() {
				return JSON.stringify(this.issues, op.jsonStringifyReplacer, 2);
			}
		},
		{
			key: "isEmpty",
			get: function() {
				return 0 === this.issues.length;
			}
		},
		{
			key: "flatten",
			value: function() {
				var e, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function(e) {
					return e.message;
				}, n = Object.create(null), r = [], u = an(this.issues);
				try {
					for (u.s(); !(e = u.n()).done;) {
						var a = e.value;
						if (a.path.length > 0) {
							var i = a.path[0];
							n[i] = n[i] || [], n[i].push(t(a));
						} else r.push(t(a));
					}
				} catch (e) {
					u.e(e);
				} finally {
					u.f();
				}
				return {
					formErrors: r,
					fieldErrors: n
				};
			}
		},
		{
			key: "formErrors",
			get: function() {
				return this.flatten();
			}
		}
	], [{
		key: "assert",
		value: function(t) {
			if (!(t instanceof e)) throw new Error("Not a ZodError: ".concat(t));
		}
	}]);
}();
Dp.create = function(e) {
	return new Dp(e);
};
var yp = function(e, t) {
	var n;
	switch (e.code) {
		case mp.invalid_type:
			n = e.received === hp.undefined ? "Required" : "Expected ".concat(e.expected, ", received ").concat(e.received);
			break;
		case mp.invalid_literal:
			n = "Invalid literal value, expected ".concat(JSON.stringify(e.expected, op.jsonStringifyReplacer));
			break;
		case mp.unrecognized_keys:
			n = "Unrecognized key(s) in object: ".concat(op.joinValues(e.keys, ", "));
			break;
		case mp.invalid_union:
			n = "Invalid input";
			break;
		case mp.invalid_union_discriminator:
			n = "Invalid discriminator value. Expected ".concat(op.joinValues(e.options));
			break;
		case mp.invalid_enum_value:
			n = "Invalid enum value. Expected ".concat(op.joinValues(e.options), ", received '").concat(e.received, "'");
			break;
		case mp.invalid_arguments:
			n = "Invalid function arguments";
			break;
		case mp.invalid_return_type:
			n = "Invalid function return type";
			break;
		case mp.invalid_date:
			n = "Invalid date";
			break;
		case mp.invalid_string:
			"object" === En(e.validation) ? "includes" in e.validation ? (n = "Invalid input: must include \"".concat(e.validation.includes, "\""), "number" == typeof e.validation.position && (n = "".concat(n, " at one or more positions greater than or equal to ").concat(e.validation.position))) : "startsWith" in e.validation ? n = "Invalid input: must start with \"".concat(e.validation.startsWith, "\"") : "endsWith" in e.validation ? n = "Invalid input: must end with \"".concat(e.validation.endsWith, "\"") : op.assertNever(e.validation) : n = "regex" !== e.validation ? "Invalid ".concat(e.validation) : "Invalid";
			break;
		case mp.too_small:
			n = "array" === e.type ? "Array must contain ".concat(e.exact ? "exactly" : e.inclusive ? "at least" : "more than", " ").concat(e.minimum, " element(s)") : "string" === e.type ? "String must contain ".concat(e.exact ? "exactly" : e.inclusive ? "at least" : "over", " ").concat(e.minimum, " character(s)") : "number" === e.type || "bigint" === e.type ? "Number must be ".concat(e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than ").concat(e.minimum) : "date" === e.type ? "Date must be ".concat(e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than ").concat(new Date(Number(e.minimum))) : "Invalid input";
			break;
		case mp.too_big:
			n = "array" === e.type ? "Array must contain ".concat(e.exact ? "exactly" : e.inclusive ? "at most" : "less than", " ").concat(e.maximum, " element(s)") : "string" === e.type ? "String must contain ".concat(e.exact ? "exactly" : e.inclusive ? "at most" : "under", " ").concat(e.maximum, " character(s)") : "number" === e.type ? "Number must be ".concat(e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than", " ").concat(e.maximum) : "bigint" === e.type ? "BigInt must be ".concat(e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than", " ").concat(e.maximum) : "date" === e.type ? "Date must be ".concat(e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than", " ").concat(new Date(Number(e.maximum))) : "Invalid input";
			break;
		case mp.custom:
			n = "Invalid input";
			break;
		case mp.invalid_intersection_types:
			n = "Intersection results could not be merged";
			break;
		case mp.not_multiple_of:
			n = "Number must be a multiple of ".concat(e.multipleOf);
			break;
		case mp.not_finite:
			n = "Number must be finite";
			break;
		default: n = t.defaultError, op.assertNever(e);
	}
	return { message: n };
}, gp = yp;
function Fp() {
	return gp;
}
var Ep = function(e) {
	var t = e.data, n = e.path, r = e.errorMaps, u = e.issueData, a = [].concat(gn(n), gn(u.path || [])), i = pn(pn({}, u), {}, { path: a });
	if (void 0 !== u.message) return pn(pn({}, u), {}, {
		path: a,
		message: u.message
	});
	var o, s = "", l = an(r.filter(function(e) {
		return !!e;
	}).slice().reverse());
	try {
		for (l.s(); !(o = l.n()).done;) s = (0, o.value)(i, {
			data: t,
			defaultError: s
		}).message;
	} catch (e) {
		l.e(e);
	} finally {
		l.f();
	}
	return pn(pn({}, u), {}, {
		path: a,
		message: s
	});
};
function bp(e, t) {
	var n = Fp(), r = Ep({
		issueData: t,
		data: e.data,
		path: e.path,
		errorMaps: [
			e.common.contextualErrorMap,
			e.schemaErrorMap,
			n,
			n === yp ? void 0 : yp
		].filter(function(e) {
			return !!e;
		})
	});
	e.common.issues.push(r);
}
var _p, kp = function() {
	function e() {
		tn(this, e), this.value = "valid";
	}
	return un(e, [{
		key: "dirty",
		value: function() {
			"valid" === this.value && (this.value = "dirty");
		}
	}, {
		key: "abort",
		value: function() {
			"aborted" !== this.value && (this.value = "aborted");
		}
	}], [
		{
			key: "mergeArray",
			value: function(e, t) {
				var n, r = [], u = an(t);
				try {
					for (u.s(); !(n = u.n()).done;) {
						var a = n.value;
						if ("aborted" === a.status) return Cp;
						"dirty" === a.status && e.dirty(), r.push(a.value);
					}
				} catch (e) {
					u.e(e);
				} finally {
					u.f();
				}
				return {
					status: e.value,
					value: r
				};
			}
		},
		{
			key: "mergeObjectAsync",
			value: (t = Xt(vn().m(function t(n, r) {
				var u, a, i, o, s, c, l;
				return vn().w(function(t) {
					for (;;) switch (t.p = t.n) {
						case 0: u = [], a = an(r), t.p = 1, a.s();
						case 2:
							if ((i = a.n()).done) {
								t.n = 6;
								break;
							}
							return o = i.value, t.n = 3, o.key;
						case 3: return s = t.v, t.n = 4, o.value;
						case 4: c = t.v, u.push({
							key: s,
							value: c
						});
						case 5:
							t.n = 2;
							break;
						case 6:
							t.n = 8;
							break;
						case 7: t.p = 7, l = t.v, a.e(l);
						case 8: return t.p = 8, a.f(), t.f(8);
						case 9: return t.a(2, e.mergeObjectSync(n, u));
					}
				}, t, null, [[
					1,
					7,
					8,
					9
				]]);
			})), function(e, n) {
				return t.apply(this, arguments);
			})
		},
		{
			key: "mergeObjectSync",
			value: function(e, t) {
				var n, r = {}, u = an(t);
				try {
					for (u.s(); !(n = u.n()).done;) {
						var a = n.value, i = a.key, o = a.value;
						if ("aborted" === i.status) return Cp;
						if ("aborted" === o.status) return Cp;
						"dirty" === i.status && e.dirty(), "dirty" === o.status && e.dirty(), "__proto__" === i.value || void 0 === o.value && !a.alwaysSet || (r[i.value] = o.value);
					}
				} catch (e) {
					u.e(e);
				} finally {
					u.f();
				}
				return {
					status: e.value,
					value: r
				};
			}
		}
	]);
	var t;
}(), Cp = Object.freeze({ status: "aborted" }), Ap = function(e) {
	return {
		status: "dirty",
		value: e
	};
}, wp = function(e) {
	return {
		status: "valid",
		value: e
	};
}, Sp = function(e) {
	return "aborted" === e.status;
}, xp = function(e) {
	return "dirty" === e.status;
}, Op = function(e) {
	return "valid" === e.status;
}, Bp = function(e) {
	return "undefined" != typeof Promise && e instanceof Promise;
};
(function(e) {
	e.errToObj = function(e) {
		return "string" == typeof e ? { message: e } : e || {};
	}, e.toString = function(e) {
		return "string" == typeof e ? e : null == e ? void 0 : e.message;
	};
})(_p || (_p = {}));
var Ip = un(function e(t, n, r, u) {
	tn(this, e), this._cachedPath = [], this.parent = t, this.data = n, this._path = r, this._key = u;
}, [{
	key: "path",
	get: function() {
		var e, t;
		return this._cachedPath.length || (Array.isArray(this._key) ? (e = this._cachedPath).push.apply(e, gn(this._path).concat(gn(this._key))) : (t = this._cachedPath).push.apply(t, gn(this._path).concat([this._key]))), this._cachedPath;
	}
}]), Tp = function(e, t) {
	if (Op(t)) return {
		success: !0,
		data: t.value
	};
	if (!e.common.issues.length) throw new Error("Validation failed but no issues detected.");
	return {
		success: !1,
		get error() {
			if (this._error) return this._error;
			var t = new Dp(e.common.issues);
			return this._error = t, this._error;
		}
	};
};
function Pp(e) {
	if (!e) return {};
	var t = e.errorMap, n = e.invalid_type_error, r = e.required_error, u = e.description;
	if (t && (n || r)) throw new Error("Can't use \"invalid_type_error\" or \"required_error\" in conjunction with custom error map.");
	return t ? {
		errorMap: t,
		description: u
	} : {
		errorMap: function(t, u) {
			var a, i, o = e.message;
			return "invalid_enum_value" === t.code ? { message: null != o ? o : u.defaultError } : void 0 === u.data ? { message: null !== (i = null != o ? o : r) && void 0 !== i ? i : u.defaultError } : "invalid_type" !== t.code ? { message: u.defaultError } : { message: null !== (a = null != o ? o : n) && void 0 !== a ? a : u.defaultError };
		},
		description: u
	};
}
var jp, Np = function() {
	return un(function e(t) {
		var n = this;
		tn(this, e), this.spa = this.safeParseAsync, this._def = t, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
			version: 1,
			vendor: "zod",
			validate: function(e) {
				return n["~validate"](e);
			}
		};
	}, [
		{
			key: "description",
			get: function() {
				return this._def.description;
			}
		},
		{
			key: "_getType",
			value: function(e) {
				return vp(e.data);
			}
		},
		{
			key: "_getOrReturnCtx",
			value: function(e, t) {
				return t || {
					common: e.parent.common,
					data: e.data,
					parsedType: vp(e.data),
					schemaErrorMap: this._def.errorMap,
					path: e.path,
					parent: e.parent
				};
			}
		},
		{
			key: "_processInputParams",
			value: function(e) {
				return {
					status: new kp(),
					ctx: {
						common: e.parent.common,
						data: e.data,
						parsedType: vp(e.data),
						schemaErrorMap: this._def.errorMap,
						path: e.path,
						parent: e.parent
					}
				};
			}
		},
		{
			key: "_parseSync",
			value: function(e) {
				var t = this._parse(e);
				if (Bp(t)) throw new Error("Synchronous parse encountered promise.");
				return t;
			}
		},
		{
			key: "_parseAsync",
			value: function(e) {
				var t = this._parse(e);
				return Promise.resolve(t);
			}
		},
		{
			key: "parse",
			value: function(e, t) {
				var n = this.safeParse(e, t);
				if (n.success) return n.data;
				throw n.error;
			}
		},
		{
			key: "safeParse",
			value: function(e, t) {
				var n, r = {
					common: {
						issues: [],
						async: null !== (n = null == t ? void 0 : t.async) && void 0 !== n && n,
						contextualErrorMap: null == t ? void 0 : t.errorMap
					},
					path: (null == t ? void 0 : t.path) || [],
					schemaErrorMap: this._def.errorMap,
					parent: null,
					data: e,
					parsedType: vp(e)
				};
				return Tp(r, this._parseSync({
					data: e,
					path: r.path,
					parent: r
				}));
			}
		},
		{
			key: "~validate",
			value: function(e) {
				var t = {
					common: {
						issues: [],
						async: !!this["~standard"].async
					},
					path: [],
					schemaErrorMap: this._def.errorMap,
					parent: null,
					data: e,
					parsedType: vp(e)
				};
				if (!this["~standard"].async) try {
					var n = this._parseSync({
						data: e,
						path: [],
						parent: t
					});
					return Op(n) ? { value: n.value } : { issues: t.common.issues };
				} catch (e) {
					var r;
					null != e && null !== (r = e.message) && void 0 !== r && null !== (r = r.toLowerCase()) && void 0 !== r && r.includes("encountered") && (this["~standard"].async = !0), t.common = {
						issues: [],
						async: !0
					};
				}
				return this._parseAsync({
					data: e,
					path: [],
					parent: t
				}).then(function(e) {
					return Op(e) ? { value: e.value } : { issues: t.common.issues };
				});
			}
		},
		{
			key: "parseAsync",
			value: (e = Xt(vn().m(function e(t, n) {
				var r;
				return vn().w(function(e) {
					for (;;) switch (e.n) {
						case 0: return e.n = 1, this.safeParseAsync(t, n);
						case 1:
							if (!(r = e.v).success) {
								e.n = 2;
								break;
							}
							return e.a(2, r.data);
						case 2: throw r.error;
						case 3: return e.a(2);
					}
				}, e, this);
			})), function(t, n) {
				return e.apply(this, arguments);
			})
		},
		{
			key: "safeParseAsync",
			value: function() {
				var e = Xt(vn().m(function e(t, n) {
					var r, u, a;
					return vn().w(function(e) {
						for (;;) switch (e.n) {
							case 0: return r = {
								common: {
									issues: [],
									contextualErrorMap: null == n ? void 0 : n.errorMap,
									async: !0
								},
								path: (null == n ? void 0 : n.path) || [],
								schemaErrorMap: this._def.errorMap,
								parent: null,
								data: t,
								parsedType: vp(t)
							}, u = this._parse({
								data: t,
								path: r.path,
								parent: r
							}), e.n = 1, Bp(u) ? u : Promise.resolve(u);
							case 1: return a = e.v, e.a(2, Tp(r, a));
						}
					}, e, this);
				}));
				return function(t, n) {
					return e.apply(this, arguments);
				};
			}()
		},
		{
			key: "refine",
			value: function(e, t) {
				return this._refinement(function(n, r) {
					var u = e(n), a = function() {
						return r.addIssue(pn({ code: mp.custom }, function(e) {
							return "string" == typeof t || void 0 === t ? { message: t } : "function" == typeof t ? t(e) : t;
						}(n)));
					};
					return "undefined" != typeof Promise && u instanceof Promise ? u.then(function(e) {
						return !!e || (a(), !1);
					}) : !!u || (a(), !1);
				});
			}
		},
		{
			key: "refinement",
			value: function(e, t) {
				return this._refinement(function(n, r) {
					return !!e(n) || (r.addIssue("function" == typeof t ? t(n, r) : t), !1);
				});
			}
		},
		{
			key: "_refinement",
			value: function(e) {
				return new zh({
					schema: this,
					typeName: qh.ZodEffects,
					effect: {
						type: "refinement",
						refinement: e
					}
				});
			}
		},
		{
			key: "superRefine",
			value: function(e) {
				return this._refinement(e);
			}
		},
		{
			key: "optional",
			value: function() {
				return Rh.create(this, this._def);
			}
		},
		{
			key: "nullable",
			value: function() {
				return Mh.create(this, this._def);
			}
		},
		{
			key: "nullish",
			value: function() {
				return this.nullable().optional();
			}
		},
		{
			key: "array",
			value: function() {
				return yh.create(this);
			}
		},
		{
			key: "promise",
			value: function() {
				return Nh.create(this, this._def);
			}
		},
		{
			key: "or",
			value: function(e) {
				return Eh.create([this, e], this._def);
			}
		},
		{
			key: "and",
			value: function(e) {
				return Ch.create(this, e, this._def);
			}
		},
		{
			key: "transform",
			value: function(e) {
				return new zh(pn(pn({}, Pp(this._def)), {}, {
					schema: this,
					typeName: qh.ZodEffects,
					effect: {
						type: "transform",
						transform: e
					}
				}));
			}
		},
		{
			key: "default",
			value: function(e) {
				var t = "function" == typeof e ? e : function() {
					return e;
				};
				return new Zh(pn(pn({}, Pp(this._def)), {}, {
					innerType: this,
					defaultValue: t,
					typeName: qh.ZodDefault
				}));
			}
		},
		{
			key: "brand",
			value: function() {
				return new Uh(pn({
					typeName: qh.ZodBranded,
					type: this
				}, Pp(this._def)));
			}
		},
		{
			key: "catch",
			value: function(e) {
				var t = "function" == typeof e ? e : function() {
					return e;
				};
				return new Lh(pn(pn({}, Pp(this._def)), {}, {
					innerType: this,
					catchValue: t,
					typeName: qh.ZodCatch
				}));
			}
		},
		{
			key: "describe",
			value: function(e) {
				return new this.constructor(pn(pn({}, this._def), {}, { description: e }));
			}
		},
		{
			key: "pipe",
			value: function(e) {
				return Hh.create(this, e);
			}
		},
		{
			key: "readonly",
			value: function() {
				return Vh.create(this);
			}
		},
		{
			key: "isOptional",
			value: function() {
				return this.safeParse(void 0).success;
			}
		},
		{
			key: "isNullable",
			value: function() {
				return this.safeParse(null).success;
			}
		}
	]);
	var e;
}(), zp = /^c[^\s-]{8,}$/i, Rp = /^[0-9a-z]+$/, Mp = /^[0-9A-HJKMNP-TV-Z]{26}$/i, Zp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, Lp = /^[a-z0-9_-]{21}$/i, $p = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, qp = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, Up = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, Hp = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Vp = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, Wp = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, Kp = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Jp = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Qp = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, Gp = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", Yp = new RegExp("^".concat(Gp, "$"));
function Xp(e) {
	var t = "[0-5]\\d";
	e.precision ? t = "".concat(t, "\\.\\d{").concat(e.precision, "}") : null == e.precision && (t = "".concat(t, "(\\.\\d+)?"));
	var n = e.precision ? "+" : "?";
	return "([01]\\d|2[0-3]):[0-5]\\d(:".concat(t, ")").concat(n);
}
function eh(e) {
	return new RegExp("^".concat(Xp(e), "$"));
}
function th(e) {
	var t = "".concat(Gp, "T").concat(Xp(e)), n = [];
	return n.push(e.local ? "Z?" : "Z"), e.offset && n.push("([+-]\\d{2}:?\\d{2})"), t = "".concat(t, "(").concat(n.join("|"), ")"), new RegExp("^".concat(t, "$"));
}
function nh(e, t) {
	return !("v4" !== t && t || !Hp.test(e)) || !("v6" !== t && t || !Wp.test(e));
}
function rh(e, t) {
	if (!$p.test(e)) return !1;
	try {
		var n = yn(e.split("."), 1)[0];
		if (!n) return !1;
		var r = n.replace(/-/g, "+").replace(/_/g, "/").padEnd(n.length + (4 - n.length % 4) % 4, "="), u = JSON.parse(atob(r));
		return !("object" !== En(u) || null === u || "typ" in u && "JWT" !== (null == u ? void 0 : u.typ) || !u.alg || t && u.alg !== t);
	} catch (e) {
		return !1;
	}
}
function uh(e, t) {
	return !("v4" !== t && t || !Vp.test(e)) || !("v6" !== t && t || !Kp.test(e));
}
var ah = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [
		{
			key: "_parse",
			value: function(e) {
				if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== hp.string) {
					var t = this._getOrReturnCtx(e);
					return bp(t, {
						code: mp.invalid_type,
						expected: hp.string,
						received: t.parsedType
					}), Cp;
				}
				var n, r = new kp(), u = void 0, a = an(this._def.checks);
				try {
					for (a.s(); !(n = a.n()).done;) {
						var i = n.value;
						if ("min" === i.kind) e.data.length < i.value && (bp(u = this._getOrReturnCtx(e, u), {
							code: mp.too_small,
							minimum: i.value,
							type: "string",
							inclusive: !0,
							exact: !1,
							message: i.message
						}), r.dirty());
						else if ("max" === i.kind) e.data.length > i.value && (bp(u = this._getOrReturnCtx(e, u), {
							code: mp.too_big,
							maximum: i.value,
							type: "string",
							inclusive: !0,
							exact: !1,
							message: i.message
						}), r.dirty());
						else if ("length" === i.kind) {
							var o = e.data.length > i.value, s = e.data.length < i.value;
							(o || s) && (u = this._getOrReturnCtx(e, u), o ? bp(u, {
								code: mp.too_big,
								maximum: i.value,
								type: "string",
								inclusive: !0,
								exact: !0,
								message: i.message
							}) : s && bp(u, {
								code: mp.too_small,
								minimum: i.value,
								type: "string",
								inclusive: !0,
								exact: !0,
								message: i.message
							}), r.dirty());
						} else if ("email" === i.kind) Up.test(e.data) || (bp(u = this._getOrReturnCtx(e, u), {
							validation: "email",
							code: mp.invalid_string,
							message: i.message
						}), r.dirty());
						else if ("emoji" === i.kind) jp || (jp = /* @__PURE__ */ new RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u")), jp.test(e.data) || (bp(u = this._getOrReturnCtx(e, u), {
							validation: "emoji",
							code: mp.invalid_string,
							message: i.message
						}), r.dirty());
						else if ("uuid" === i.kind) Zp.test(e.data) || (bp(u = this._getOrReturnCtx(e, u), {
							validation: "uuid",
							code: mp.invalid_string,
							message: i.message
						}), r.dirty());
						else if ("nanoid" === i.kind) Lp.test(e.data) || (bp(u = this._getOrReturnCtx(e, u), {
							validation: "nanoid",
							code: mp.invalid_string,
							message: i.message
						}), r.dirty());
						else if ("cuid" === i.kind) zp.test(e.data) || (bp(u = this._getOrReturnCtx(e, u), {
							validation: "cuid",
							code: mp.invalid_string,
							message: i.message
						}), r.dirty());
						else if ("cuid2" === i.kind) Rp.test(e.data) || (bp(u = this._getOrReturnCtx(e, u), {
							validation: "cuid2",
							code: mp.invalid_string,
							message: i.message
						}), r.dirty());
						else if ("ulid" === i.kind) Mp.test(e.data) || (bp(u = this._getOrReturnCtx(e, u), {
							validation: "ulid",
							code: mp.invalid_string,
							message: i.message
						}), r.dirty());
						else if ("url" === i.kind) try {
							new URL(e.data);
						} catch (t) {
							bp(u = this._getOrReturnCtx(e, u), {
								validation: "url",
								code: mp.invalid_string,
								message: i.message
							}), r.dirty();
						}
						else "regex" === i.kind ? (i.regex.lastIndex = 0, i.regex.test(e.data) || (bp(u = this._getOrReturnCtx(e, u), {
							validation: "regex",
							code: mp.invalid_string,
							message: i.message
						}), r.dirty())) : "trim" === i.kind ? e.data = e.data.trim() : "includes" === i.kind ? e.data.includes(i.value, i.position) || (bp(u = this._getOrReturnCtx(e, u), {
							code: mp.invalid_string,
							validation: {
								includes: i.value,
								position: i.position
							},
							message: i.message
						}), r.dirty()) : "toLowerCase" === i.kind ? e.data = e.data.toLowerCase() : "toUpperCase" === i.kind ? e.data = e.data.toUpperCase() : "startsWith" === i.kind ? e.data.startsWith(i.value) || (bp(u = this._getOrReturnCtx(e, u), {
							code: mp.invalid_string,
							validation: { startsWith: i.value },
							message: i.message
						}), r.dirty()) : "endsWith" === i.kind ? e.data.endsWith(i.value) || (bp(u = this._getOrReturnCtx(e, u), {
							code: mp.invalid_string,
							validation: { endsWith: i.value },
							message: i.message
						}), r.dirty()) : "datetime" === i.kind ? th(i).test(e.data) || (bp(u = this._getOrReturnCtx(e, u), {
							code: mp.invalid_string,
							validation: "datetime",
							message: i.message
						}), r.dirty()) : "date" === i.kind ? Yp.test(e.data) || (bp(u = this._getOrReturnCtx(e, u), {
							code: mp.invalid_string,
							validation: "date",
							message: i.message
						}), r.dirty()) : "time" === i.kind ? eh(i).test(e.data) || (bp(u = this._getOrReturnCtx(e, u), {
							code: mp.invalid_string,
							validation: "time",
							message: i.message
						}), r.dirty()) : "duration" === i.kind ? qp.test(e.data) || (bp(u = this._getOrReturnCtx(e, u), {
							validation: "duration",
							code: mp.invalid_string,
							message: i.message
						}), r.dirty()) : "ip" === i.kind ? nh(e.data, i.version) || (bp(u = this._getOrReturnCtx(e, u), {
							validation: "ip",
							code: mp.invalid_string,
							message: i.message
						}), r.dirty()) : "jwt" === i.kind ? rh(e.data, i.alg) || (bp(u = this._getOrReturnCtx(e, u), {
							validation: "jwt",
							code: mp.invalid_string,
							message: i.message
						}), r.dirty()) : "cidr" === i.kind ? uh(e.data, i.version) || (bp(u = this._getOrReturnCtx(e, u), {
							validation: "cidr",
							code: mp.invalid_string,
							message: i.message
						}), r.dirty()) : "base64" === i.kind ? Jp.test(e.data) || (bp(u = this._getOrReturnCtx(e, u), {
							validation: "base64",
							code: mp.invalid_string,
							message: i.message
						}), r.dirty()) : "base64url" === i.kind ? Qp.test(e.data) || (bp(u = this._getOrReturnCtx(e, u), {
							validation: "base64url",
							code: mp.invalid_string,
							message: i.message
						}), r.dirty()) : op.assertNever(i);
					}
				} catch (e) {
					a.e(e);
				} finally {
					a.f();
				}
				return {
					status: r.value,
					value: e.data
				};
			}
		},
		{
			key: "_regex",
			value: function(e, t, n) {
				return this.refinement(function(t) {
					return e.test(t);
				}, pn({
					validation: t,
					code: mp.invalid_string
				}, _p.errToObj(n)));
			}
		},
		{
			key: "_addCheck",
			value: function(t) {
				return new e(pn(pn({}, this._def), {}, { checks: [].concat(gn(this._def.checks), [t]) }));
			}
		},
		{
			key: "email",
			value: function(e) {
				return this._addCheck(pn({ kind: "email" }, _p.errToObj(e)));
			}
		},
		{
			key: "url",
			value: function(e) {
				return this._addCheck(pn({ kind: "url" }, _p.errToObj(e)));
			}
		},
		{
			key: "emoji",
			value: function(e) {
				return this._addCheck(pn({ kind: "emoji" }, _p.errToObj(e)));
			}
		},
		{
			key: "uuid",
			value: function(e) {
				return this._addCheck(pn({ kind: "uuid" }, _p.errToObj(e)));
			}
		},
		{
			key: "nanoid",
			value: function(e) {
				return this._addCheck(pn({ kind: "nanoid" }, _p.errToObj(e)));
			}
		},
		{
			key: "cuid",
			value: function(e) {
				return this._addCheck(pn({ kind: "cuid" }, _p.errToObj(e)));
			}
		},
		{
			key: "cuid2",
			value: function(e) {
				return this._addCheck(pn({ kind: "cuid2" }, _p.errToObj(e)));
			}
		},
		{
			key: "ulid",
			value: function(e) {
				return this._addCheck(pn({ kind: "ulid" }, _p.errToObj(e)));
			}
		},
		{
			key: "base64",
			value: function(e) {
				return this._addCheck(pn({ kind: "base64" }, _p.errToObj(e)));
			}
		},
		{
			key: "base64url",
			value: function(e) {
				return this._addCheck(pn({ kind: "base64url" }, _p.errToObj(e)));
			}
		},
		{
			key: "jwt",
			value: function(e) {
				return this._addCheck(pn({ kind: "jwt" }, _p.errToObj(e)));
			}
		},
		{
			key: "ip",
			value: function(e) {
				return this._addCheck(pn({ kind: "ip" }, _p.errToObj(e)));
			}
		},
		{
			key: "cidr",
			value: function(e) {
				return this._addCheck(pn({ kind: "cidr" }, _p.errToObj(e)));
			}
		},
		{
			key: "datetime",
			value: function(e) {
				var t, n;
				return "string" == typeof e ? this._addCheck({
					kind: "datetime",
					precision: null,
					offset: !1,
					local: !1,
					message: e
				}) : this._addCheck(pn({
					kind: "datetime",
					precision: void 0 === (null == e ? void 0 : e.precision) ? null : null == e ? void 0 : e.precision,
					offset: null !== (t = null == e ? void 0 : e.offset) && void 0 !== t && t,
					local: null !== (n = null == e ? void 0 : e.local) && void 0 !== n && n
				}, _p.errToObj(null == e ? void 0 : e.message)));
			}
		},
		{
			key: "date",
			value: function(e) {
				return this._addCheck({
					kind: "date",
					message: e
				});
			}
		},
		{
			key: "time",
			value: function(e) {
				return "string" == typeof e ? this._addCheck({
					kind: "time",
					precision: null,
					message: e
				}) : this._addCheck(pn({
					kind: "time",
					precision: void 0 === (null == e ? void 0 : e.precision) ? null : null == e ? void 0 : e.precision
				}, _p.errToObj(null == e ? void 0 : e.message)));
			}
		},
		{
			key: "duration",
			value: function(e) {
				return this._addCheck(pn({ kind: "duration" }, _p.errToObj(e)));
			}
		},
		{
			key: "regex",
			value: function(e, t) {
				return this._addCheck(pn({
					kind: "regex",
					regex: e
				}, _p.errToObj(t)));
			}
		},
		{
			key: "includes",
			value: function(e, t) {
				return this._addCheck(pn({
					kind: "includes",
					value: e,
					position: null == t ? void 0 : t.position
				}, _p.errToObj(null == t ? void 0 : t.message)));
			}
		},
		{
			key: "startsWith",
			value: function(e, t) {
				return this._addCheck(pn({
					kind: "startsWith",
					value: e
				}, _p.errToObj(t)));
			}
		},
		{
			key: "endsWith",
			value: function(e, t) {
				return this._addCheck(pn({
					kind: "endsWith",
					value: e
				}, _p.errToObj(t)));
			}
		},
		{
			key: "min",
			value: function(e, t) {
				return this._addCheck(pn({
					kind: "min",
					value: e
				}, _p.errToObj(t)));
			}
		},
		{
			key: "max",
			value: function(e, t) {
				return this._addCheck(pn({
					kind: "max",
					value: e
				}, _p.errToObj(t)));
			}
		},
		{
			key: "length",
			value: function(e, t) {
				return this._addCheck(pn({
					kind: "length",
					value: e
				}, _p.errToObj(t)));
			}
		},
		{
			key: "nonempty",
			value: function(e) {
				return this.min(1, _p.errToObj(e));
			}
		},
		{
			key: "trim",
			value: function() {
				return new e(pn(pn({}, this._def), {}, { checks: [].concat(gn(this._def.checks), [{ kind: "trim" }]) }));
			}
		},
		{
			key: "toLowerCase",
			value: function() {
				return new e(pn(pn({}, this._def), {}, { checks: [].concat(gn(this._def.checks), [{ kind: "toLowerCase" }]) }));
			}
		},
		{
			key: "toUpperCase",
			value: function() {
				return new e(pn(pn({}, this._def), {}, { checks: [].concat(gn(this._def.checks), [{ kind: "toUpperCase" }]) }));
			}
		},
		{
			key: "isDatetime",
			get: function() {
				return !!this._def.checks.find(function(e) {
					return "datetime" === e.kind;
				});
			}
		},
		{
			key: "isDate",
			get: function() {
				return !!this._def.checks.find(function(e) {
					return "date" === e.kind;
				});
			}
		},
		{
			key: "isTime",
			get: function() {
				return !!this._def.checks.find(function(e) {
					return "time" === e.kind;
				});
			}
		},
		{
			key: "isDuration",
			get: function() {
				return !!this._def.checks.find(function(e) {
					return "duration" === e.kind;
				});
			}
		},
		{
			key: "isEmail",
			get: function() {
				return !!this._def.checks.find(function(e) {
					return "email" === e.kind;
				});
			}
		},
		{
			key: "isURL",
			get: function() {
				return !!this._def.checks.find(function(e) {
					return "url" === e.kind;
				});
			}
		},
		{
			key: "isEmoji",
			get: function() {
				return !!this._def.checks.find(function(e) {
					return "emoji" === e.kind;
				});
			}
		},
		{
			key: "isUUID",
			get: function() {
				return !!this._def.checks.find(function(e) {
					return "uuid" === e.kind;
				});
			}
		},
		{
			key: "isNANOID",
			get: function() {
				return !!this._def.checks.find(function(e) {
					return "nanoid" === e.kind;
				});
			}
		},
		{
			key: "isCUID",
			get: function() {
				return !!this._def.checks.find(function(e) {
					return "cuid" === e.kind;
				});
			}
		},
		{
			key: "isCUID2",
			get: function() {
				return !!this._def.checks.find(function(e) {
					return "cuid2" === e.kind;
				});
			}
		},
		{
			key: "isULID",
			get: function() {
				return !!this._def.checks.find(function(e) {
					return "ulid" === e.kind;
				});
			}
		},
		{
			key: "isIP",
			get: function() {
				return !!this._def.checks.find(function(e) {
					return "ip" === e.kind;
				});
			}
		},
		{
			key: "isCIDR",
			get: function() {
				return !!this._def.checks.find(function(e) {
					return "cidr" === e.kind;
				});
			}
		},
		{
			key: "isBase64",
			get: function() {
				return !!this._def.checks.find(function(e) {
					return "base64" === e.kind;
				});
			}
		},
		{
			key: "isBase64url",
			get: function() {
				return !!this._def.checks.find(function(e) {
					return "base64url" === e.kind;
				});
			}
		},
		{
			key: "minLength",
			get: function() {
				var e, t = null, n = an(this._def.checks);
				try {
					for (n.s(); !(e = n.n()).done;) {
						var r = e.value;
						"min" === r.kind && (null === t || r.value > t) && (t = r.value);
					}
				} catch (e) {
					n.e(e);
				} finally {
					n.f();
				}
				return t;
			}
		},
		{
			key: "maxLength",
			get: function() {
				var e, t = null, n = an(this._def.checks);
				try {
					for (n.s(); !(e = n.n()).done;) {
						var r = e.value;
						"max" === r.kind && (null === t || r.value < t) && (t = r.value);
					}
				} catch (e) {
					n.e(e);
				} finally {
					n.f();
				}
				return t;
			}
		}
	]);
}();
function ih(e, t) {
	var n = (e.toString().split(".")[1] || "").length, r = (t.toString().split(".")[1] || "").length, u = n > r ? n : r;
	return Number.parseInt(e.toFixed(u).replace(".", "")) % Number.parseInt(t.toFixed(u).replace(".", "")) / Math.pow(10, u);
}
ah.create = function(e) {
	var t;
	return new ah(pn({
		checks: [],
		typeName: qh.ZodString,
		coerce: null !== (t = null == e ? void 0 : e.coerce) && void 0 !== t && t
	}, Pp(e)));
};
var oh = function() {
	function e() {
		var t;
		return tn(this, e), (t = en(this, e, arguments)).min = t.gte, t.max = t.lte, t.step = t.multipleOf, t;
	}
	return ln(e, Np), un(e, [
		{
			key: "_parse",
			value: function(e) {
				if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== hp.number) {
					var t = this._getOrReturnCtx(e);
					return bp(t, {
						code: mp.invalid_type,
						expected: hp.number,
						received: t.parsedType
					}), Cp;
				}
				var n, r = void 0, u = new kp(), a = an(this._def.checks);
				try {
					for (a.s(); !(n = a.n()).done;) {
						var i = n.value;
						"int" === i.kind ? op.isInteger(e.data) || (bp(r = this._getOrReturnCtx(e, r), {
							code: mp.invalid_type,
							expected: "integer",
							received: "float",
							message: i.message
						}), u.dirty()) : "min" === i.kind ? (i.inclusive ? e.data < i.value : e.data <= i.value) && (bp(r = this._getOrReturnCtx(e, r), {
							code: mp.too_small,
							minimum: i.value,
							type: "number",
							inclusive: i.inclusive,
							exact: !1,
							message: i.message
						}), u.dirty()) : "max" === i.kind ? (i.inclusive ? e.data > i.value : e.data >= i.value) && (bp(r = this._getOrReturnCtx(e, r), {
							code: mp.too_big,
							maximum: i.value,
							type: "number",
							inclusive: i.inclusive,
							exact: !1,
							message: i.message
						}), u.dirty()) : "multipleOf" === i.kind ? 0 !== ih(e.data, i.value) && (bp(r = this._getOrReturnCtx(e, r), {
							code: mp.not_multiple_of,
							multipleOf: i.value,
							message: i.message
						}), u.dirty()) : "finite" === i.kind ? Number.isFinite(e.data) || (bp(r = this._getOrReturnCtx(e, r), {
							code: mp.not_finite,
							message: i.message
						}), u.dirty()) : op.assertNever(i);
					}
				} catch (e) {
					a.e(e);
				} finally {
					a.f();
				}
				return {
					status: u.value,
					value: e.data
				};
			}
		},
		{
			key: "gte",
			value: function(e, t) {
				return this.setLimit("min", e, !0, _p.toString(t));
			}
		},
		{
			key: "gt",
			value: function(e, t) {
				return this.setLimit("min", e, !1, _p.toString(t));
			}
		},
		{
			key: "lte",
			value: function(e, t) {
				return this.setLimit("max", e, !0, _p.toString(t));
			}
		},
		{
			key: "lt",
			value: function(e, t) {
				return this.setLimit("max", e, !1, _p.toString(t));
			}
		},
		{
			key: "setLimit",
			value: function(t, n, r, u) {
				return new e(pn(pn({}, this._def), {}, { checks: [].concat(gn(this._def.checks), [{
					kind: t,
					value: n,
					inclusive: r,
					message: _p.toString(u)
				}]) }));
			}
		},
		{
			key: "_addCheck",
			value: function(t) {
				return new e(pn(pn({}, this._def), {}, { checks: [].concat(gn(this._def.checks), [t]) }));
			}
		},
		{
			key: "int",
			value: function(e) {
				return this._addCheck({
					kind: "int",
					message: _p.toString(e)
				});
			}
		},
		{
			key: "positive",
			value: function(e) {
				return this._addCheck({
					kind: "min",
					value: 0,
					inclusive: !1,
					message: _p.toString(e)
				});
			}
		},
		{
			key: "negative",
			value: function(e) {
				return this._addCheck({
					kind: "max",
					value: 0,
					inclusive: !1,
					message: _p.toString(e)
				});
			}
		},
		{
			key: "nonpositive",
			value: function(e) {
				return this._addCheck({
					kind: "max",
					value: 0,
					inclusive: !0,
					message: _p.toString(e)
				});
			}
		},
		{
			key: "nonnegative",
			value: function(e) {
				return this._addCheck({
					kind: "min",
					value: 0,
					inclusive: !0,
					message: _p.toString(e)
				});
			}
		},
		{
			key: "multipleOf",
			value: function(e, t) {
				return this._addCheck({
					kind: "multipleOf",
					value: e,
					message: _p.toString(t)
				});
			}
		},
		{
			key: "finite",
			value: function(e) {
				return this._addCheck({
					kind: "finite",
					message: _p.toString(e)
				});
			}
		},
		{
			key: "safe",
			value: function(e) {
				return this._addCheck({
					kind: "min",
					inclusive: !0,
					value: Number.MIN_SAFE_INTEGER,
					message: _p.toString(e)
				})._addCheck({
					kind: "max",
					inclusive: !0,
					value: Number.MAX_SAFE_INTEGER,
					message: _p.toString(e)
				});
			}
		},
		{
			key: "minValue",
			get: function() {
				var e, t = null, n = an(this._def.checks);
				try {
					for (n.s(); !(e = n.n()).done;) {
						var r = e.value;
						"min" === r.kind && (null === t || r.value > t) && (t = r.value);
					}
				} catch (e) {
					n.e(e);
				} finally {
					n.f();
				}
				return t;
			}
		},
		{
			key: "maxValue",
			get: function() {
				var e, t = null, n = an(this._def.checks);
				try {
					for (n.s(); !(e = n.n()).done;) {
						var r = e.value;
						"max" === r.kind && (null === t || r.value < t) && (t = r.value);
					}
				} catch (e) {
					n.e(e);
				} finally {
					n.f();
				}
				return t;
			}
		},
		{
			key: "isInt",
			get: function() {
				return !!this._def.checks.find(function(e) {
					return "int" === e.kind || "multipleOf" === e.kind && op.isInteger(e.value);
				});
			}
		},
		{
			key: "isFinite",
			get: function() {
				var e, t = null, n = null, r = an(this._def.checks);
				try {
					for (r.s(); !(e = r.n()).done;) {
						var u = e.value;
						if ("finite" === u.kind || "int" === u.kind || "multipleOf" === u.kind) return !0;
						"min" === u.kind ? (null === n || u.value > n) && (n = u.value) : "max" === u.kind && (null === t || u.value < t) && (t = u.value);
					}
				} catch (e) {
					r.e(e);
				} finally {
					r.f();
				}
				return Number.isFinite(n) && Number.isFinite(t);
			}
		}
	]);
}();
oh.create = function(e) {
	return new oh(pn({
		checks: [],
		typeName: qh.ZodNumber,
		coerce: (null == e ? void 0 : e.coerce) || !1
	}, Pp(e)));
};
var sh = function() {
	function e() {
		var t;
		return tn(this, e), (t = en(this, e, arguments)).min = t.gte, t.max = t.lte, t;
	}
	return ln(e, Np), un(e, [
		{
			key: "_parse",
			value: function(e) {
				if (this._def.coerce) try {
					e.data = BigInt(e.data);
				} catch (t) {
					return this._getInvalidInput(e);
				}
				if (this._getType(e) !== hp.bigint) return this._getInvalidInput(e);
				var t, n = void 0, r = new kp(), u = an(this._def.checks);
				try {
					for (u.s(); !(t = u.n()).done;) {
						var a = t.value;
						"min" === a.kind ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (bp(n = this._getOrReturnCtx(e, n), {
							code: mp.too_small,
							type: "bigint",
							minimum: a.value,
							inclusive: a.inclusive,
							message: a.message
						}), r.dirty()) : "max" === a.kind ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (bp(n = this._getOrReturnCtx(e, n), {
							code: mp.too_big,
							type: "bigint",
							maximum: a.value,
							inclusive: a.inclusive,
							message: a.message
						}), r.dirty()) : "multipleOf" === a.kind ? e.data % a.value !== BigInt(0) && (bp(n = this._getOrReturnCtx(e, n), {
							code: mp.not_multiple_of,
							multipleOf: a.value,
							message: a.message
						}), r.dirty()) : op.assertNever(a);
					}
				} catch (e) {
					u.e(e);
				} finally {
					u.f();
				}
				return {
					status: r.value,
					value: e.data
				};
			}
		},
		{
			key: "_getInvalidInput",
			value: function(e) {
				var t = this._getOrReturnCtx(e);
				return bp(t, {
					code: mp.invalid_type,
					expected: hp.bigint,
					received: t.parsedType
				}), Cp;
			}
		},
		{
			key: "gte",
			value: function(e, t) {
				return this.setLimit("min", e, !0, _p.toString(t));
			}
		},
		{
			key: "gt",
			value: function(e, t) {
				return this.setLimit("min", e, !1, _p.toString(t));
			}
		},
		{
			key: "lte",
			value: function(e, t) {
				return this.setLimit("max", e, !0, _p.toString(t));
			}
		},
		{
			key: "lt",
			value: function(e, t) {
				return this.setLimit("max", e, !1, _p.toString(t));
			}
		},
		{
			key: "setLimit",
			value: function(t, n, r, u) {
				return new e(pn(pn({}, this._def), {}, { checks: [].concat(gn(this._def.checks), [{
					kind: t,
					value: n,
					inclusive: r,
					message: _p.toString(u)
				}]) }));
			}
		},
		{
			key: "_addCheck",
			value: function(t) {
				return new e(pn(pn({}, this._def), {}, { checks: [].concat(gn(this._def.checks), [t]) }));
			}
		},
		{
			key: "positive",
			value: function(e) {
				return this._addCheck({
					kind: "min",
					value: BigInt(0),
					inclusive: !1,
					message: _p.toString(e)
				});
			}
		},
		{
			key: "negative",
			value: function(e) {
				return this._addCheck({
					kind: "max",
					value: BigInt(0),
					inclusive: !1,
					message: _p.toString(e)
				});
			}
		},
		{
			key: "nonpositive",
			value: function(e) {
				return this._addCheck({
					kind: "max",
					value: BigInt(0),
					inclusive: !0,
					message: _p.toString(e)
				});
			}
		},
		{
			key: "nonnegative",
			value: function(e) {
				return this._addCheck({
					kind: "min",
					value: BigInt(0),
					inclusive: !0,
					message: _p.toString(e)
				});
			}
		},
		{
			key: "multipleOf",
			value: function(e, t) {
				return this._addCheck({
					kind: "multipleOf",
					value: e,
					message: _p.toString(t)
				});
			}
		},
		{
			key: "minValue",
			get: function() {
				var e, t = null, n = an(this._def.checks);
				try {
					for (n.s(); !(e = n.n()).done;) {
						var r = e.value;
						"min" === r.kind && (null === t || r.value > t) && (t = r.value);
					}
				} catch (e) {
					n.e(e);
				} finally {
					n.f();
				}
				return t;
			}
		},
		{
			key: "maxValue",
			get: function() {
				var e, t = null, n = an(this._def.checks);
				try {
					for (n.s(); !(e = n.n()).done;) {
						var r = e.value;
						"max" === r.kind && (null === t || r.value < t) && (t = r.value);
					}
				} catch (e) {
					n.e(e);
				} finally {
					n.f();
				}
				return t;
			}
		}
	]);
}();
sh.create = function(e) {
	var t;
	return new sh(pn({
		checks: [],
		typeName: qh.ZodBigInt,
		coerce: null !== (t = null == e ? void 0 : e.coerce) && void 0 !== t && t
	}, Pp(e)));
};
var ch = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [{
		key: "_parse",
		value: function(e) {
			if (this._def.coerce && (e.data = Boolean(e.data)), this._getType(e) !== hp.boolean) {
				var t = this._getOrReturnCtx(e);
				return bp(t, {
					code: mp.invalid_type,
					expected: hp.boolean,
					received: t.parsedType
				}), Cp;
			}
			return wp(e.data);
		}
	}]);
}();
ch.create = function(e) {
	return new ch(pn({
		typeName: qh.ZodBoolean,
		coerce: (null == e ? void 0 : e.coerce) || !1
	}, Pp(e)));
};
var lh = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [
		{
			key: "_parse",
			value: function(e) {
				if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== hp.date) {
					var t = this._getOrReturnCtx(e);
					return bp(t, {
						code: mp.invalid_type,
						expected: hp.date,
						received: t.parsedType
					}), Cp;
				}
				if (Number.isNaN(e.data.getTime())) return bp(this._getOrReturnCtx(e), { code: mp.invalid_date }), Cp;
				var n, r = new kp(), u = void 0, a = an(this._def.checks);
				try {
					for (a.s(); !(n = a.n()).done;) {
						var i = n.value;
						"min" === i.kind ? e.data.getTime() < i.value && (bp(u = this._getOrReturnCtx(e, u), {
							code: mp.too_small,
							message: i.message,
							inclusive: !0,
							exact: !1,
							minimum: i.value,
							type: "date"
						}), r.dirty()) : "max" === i.kind ? e.data.getTime() > i.value && (bp(u = this._getOrReturnCtx(e, u), {
							code: mp.too_big,
							message: i.message,
							inclusive: !0,
							exact: !1,
							maximum: i.value,
							type: "date"
						}), r.dirty()) : op.assertNever(i);
					}
				} catch (e) {
					a.e(e);
				} finally {
					a.f();
				}
				return {
					status: r.value,
					value: new Date(e.data.getTime())
				};
			}
		},
		{
			key: "_addCheck",
			value: function(t) {
				return new e(pn(pn({}, this._def), {}, { checks: [].concat(gn(this._def.checks), [t]) }));
			}
		},
		{
			key: "min",
			value: function(e, t) {
				return this._addCheck({
					kind: "min",
					value: e.getTime(),
					message: _p.toString(t)
				});
			}
		},
		{
			key: "max",
			value: function(e, t) {
				return this._addCheck({
					kind: "max",
					value: e.getTime(),
					message: _p.toString(t)
				});
			}
		},
		{
			key: "minDate",
			get: function() {
				var e, t = null, n = an(this._def.checks);
				try {
					for (n.s(); !(e = n.n()).done;) {
						var r = e.value;
						"min" === r.kind && (null === t || r.value > t) && (t = r.value);
					}
				} catch (e) {
					n.e(e);
				} finally {
					n.f();
				}
				return null != t ? new Date(t) : null;
			}
		},
		{
			key: "maxDate",
			get: function() {
				var e, t = null, n = an(this._def.checks);
				try {
					for (n.s(); !(e = n.n()).done;) {
						var r = e.value;
						"max" === r.kind && (null === t || r.value < t) && (t = r.value);
					}
				} catch (e) {
					n.e(e);
				} finally {
					n.f();
				}
				return null != t ? new Date(t) : null;
			}
		}
	]);
}();
lh.create = function(e) {
	return new lh(pn({
		checks: [],
		coerce: (null == e ? void 0 : e.coerce) || !1,
		typeName: qh.ZodDate
	}, Pp(e)));
};
var fh = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [{
		key: "_parse",
		value: function(e) {
			if (this._getType(e) !== hp.symbol) {
				var t = this._getOrReturnCtx(e);
				return bp(t, {
					code: mp.invalid_type,
					expected: hp.symbol,
					received: t.parsedType
				}), Cp;
			}
			return wp(e.data);
		}
	}]);
}();
fh.create = function(e) {
	return new fh(pn({ typeName: qh.ZodSymbol }, Pp(e)));
};
var dh = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [{
		key: "_parse",
		value: function(e) {
			if (this._getType(e) !== hp.undefined) {
				var t = this._getOrReturnCtx(e);
				return bp(t, {
					code: mp.invalid_type,
					expected: hp.undefined,
					received: t.parsedType
				}), Cp;
			}
			return wp(e.data);
		}
	}]);
}();
dh.create = function(e) {
	return new dh(pn({ typeName: qh.ZodUndefined }, Pp(e)));
};
var ph = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [{
		key: "_parse",
		value: function(e) {
			if (this._getType(e) !== hp.null) {
				var t = this._getOrReturnCtx(e);
				return bp(t, {
					code: mp.invalid_type,
					expected: hp.null,
					received: t.parsedType
				}), Cp;
			}
			return wp(e.data);
		}
	}]);
}();
ph.create = function(e) {
	return new ph(pn({ typeName: qh.ZodNull }, Pp(e)));
};
var hh = function() {
	function e() {
		var t;
		return tn(this, e), (t = en(this, e, arguments))._any = !0, t;
	}
	return ln(e, Np), un(e, [{
		key: "_parse",
		value: function(e) {
			return wp(e.data);
		}
	}]);
}();
hh.create = function(e) {
	return new hh(pn({ typeName: qh.ZodAny }, Pp(e)));
};
var vh = function() {
	function e() {
		var t;
		return tn(this, e), (t = en(this, e, arguments))._unknown = !0, t;
	}
	return ln(e, Np), un(e, [{
		key: "_parse",
		value: function(e) {
			return wp(e.data);
		}
	}]);
}();
vh.create = function(e) {
	return new vh(pn({ typeName: qh.ZodUnknown }, Pp(e)));
};
var mh = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [{
		key: "_parse",
		value: function(e) {
			var t = this._getOrReturnCtx(e);
			return bp(t, {
				code: mp.invalid_type,
				expected: hp.never,
				received: t.parsedType
			}), Cp;
		}
	}]);
}();
mh.create = function(e) {
	return new mh(pn({ typeName: qh.ZodNever }, Pp(e)));
};
var Dh = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [{
		key: "_parse",
		value: function(e) {
			if (this._getType(e) !== hp.undefined) {
				var t = this._getOrReturnCtx(e);
				return bp(t, {
					code: mp.invalid_type,
					expected: hp.void,
					received: t.parsedType
				}), Cp;
			}
			return wp(e.data);
		}
	}]);
}();
Dh.create = function(e) {
	return new Dh(pn({ typeName: qh.ZodVoid }, Pp(e)));
};
var yh = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [
		{
			key: "_parse",
			value: function(e) {
				var t = this._processInputParams(e), n = t.ctx, r = t.status, u = this._def;
				if (n.parsedType !== hp.array) return bp(n, {
					code: mp.invalid_type,
					expected: hp.array,
					received: n.parsedType
				}), Cp;
				if (null !== u.exactLength) {
					var a = n.data.length > u.exactLength.value, i = n.data.length < u.exactLength.value;
					(a || i) && (bp(n, {
						code: a ? mp.too_big : mp.too_small,
						minimum: i ? u.exactLength.value : void 0,
						maximum: a ? u.exactLength.value : void 0,
						type: "array",
						inclusive: !0,
						exact: !0,
						message: u.exactLength.message
					}), r.dirty());
				}
				if (null !== u.minLength && n.data.length < u.minLength.value && (bp(n, {
					code: mp.too_small,
					minimum: u.minLength.value,
					type: "array",
					inclusive: !0,
					exact: !1,
					message: u.minLength.message
				}), r.dirty()), null !== u.maxLength && n.data.length > u.maxLength.value && (bp(n, {
					code: mp.too_big,
					maximum: u.maxLength.value,
					type: "array",
					inclusive: !0,
					exact: !1,
					message: u.maxLength.message
				}), r.dirty()), n.common.async) return Promise.all(gn(n.data).map(function(e, t) {
					return u.type._parseAsync(new Ip(n, e, n.path, t));
				})).then(function(e) {
					return kp.mergeArray(r, e);
				});
				var o = gn(n.data).map(function(e, t) {
					return u.type._parseSync(new Ip(n, e, n.path, t));
				});
				return kp.mergeArray(r, o);
			}
		},
		{
			key: "element",
			get: function() {
				return this._def.type;
			}
		},
		{
			key: "min",
			value: function(t, n) {
				return new e(pn(pn({}, this._def), {}, { minLength: {
					value: t,
					message: _p.toString(n)
				} }));
			}
		},
		{
			key: "max",
			value: function(t, n) {
				return new e(pn(pn({}, this._def), {}, { maxLength: {
					value: t,
					message: _p.toString(n)
				} }));
			}
		},
		{
			key: "length",
			value: function(t, n) {
				return new e(pn(pn({}, this._def), {}, { exactLength: {
					value: t,
					message: _p.toString(n)
				} }));
			}
		},
		{
			key: "nonempty",
			value: function(e) {
				return this.min(1, e);
			}
		}
	]);
}();
function gh(e) {
	if (e instanceof Fh) {
		var t = {};
		for (var n in e.shape) {
			var r = e.shape[n];
			t[n] = Rh.create(gh(r));
		}
		return new Fh(pn(pn({}, e._def), {}, { shape: function() {
			return t;
		} }));
	}
	return e instanceof yh ? new yh(pn(pn({}, e._def), {}, { type: gh(e.element) })) : e instanceof Rh ? Rh.create(gh(e.unwrap())) : e instanceof Mh ? Mh.create(gh(e.unwrap())) : e instanceof Ah ? Ah.create(e.items.map(function(e) {
		return gh(e);
	})) : e;
}
yh.create = function(e, t) {
	return new yh(pn({
		type: e,
		minLength: null,
		maxLength: null,
		exactLength: null,
		typeName: qh.ZodArray
	}, Pp(t)));
};
var Fh = function() {
	function e() {
		var t;
		return tn(this, e), (t = en(this, e, arguments))._cached = null, t.nonstrict = t.passthrough, t.augment = t.extend, t;
	}
	return ln(e, Np), un(e, [
		{
			key: "_getCached",
			value: function() {
				if (null !== this._cached) return this._cached;
				var e = this._def.shape(), t = op.objectKeys(e);
				return this._cached = {
					shape: e,
					keys: t
				}, this._cached;
			}
		},
		{
			key: "_parse",
			value: function(e) {
				if (this._getType(e) !== hp.object) {
					var t = this._getOrReturnCtx(e);
					return bp(t, {
						code: mp.invalid_type,
						expected: hp.object,
						received: t.parsedType
					}), Cp;
				}
				var n = this._processInputParams(e), r = n.status, u = n.ctx, a = this._getCached(), i = a.shape, o = a.keys, s = [];
				if (!(this._def.catchall instanceof mh && "strip" === this._def.unknownKeys)) for (var c in u.data) o.includes(c) || s.push(c);
				var l, f = [], d = an(o);
				try {
					for (d.s(); !(l = d.n()).done;) {
						var p = l.value, h = i[p], v = u.data[p];
						f.push({
							key: {
								status: "valid",
								value: p
							},
							value: h._parse(new Ip(u, v, u.path, p)),
							alwaysSet: p in u.data
						});
					}
				} catch (e) {
					d.e(e);
				} finally {
					d.f();
				}
				if (this._def.catchall instanceof mh) {
					var m = this._def.unknownKeys;
					if ("passthrough" === m) {
						var D, y = an(s);
						try {
							for (y.s(); !(D = y.n()).done;) {
								var g = D.value;
								f.push({
									key: {
										status: "valid",
										value: g
									},
									value: {
										status: "valid",
										value: u.data[g]
									}
								});
							}
						} catch (e) {
							y.e(e);
						} finally {
							y.f();
						}
					} else if ("strict" === m) s.length > 0 && (bp(u, {
						code: mp.unrecognized_keys,
						keys: s
					}), r.dirty());
					else if ("strip" !== m) throw new Error("Internal ZodObject error: invalid unknownKeys value.");
				} else {
					var F, E = this._def.catchall, b = an(s);
					try {
						for (b.s(); !(F = b.n()).done;) {
							var _ = F.value, k = u.data[_];
							f.push({
								key: {
									status: "valid",
									value: _
								},
								value: E._parse(new Ip(u, k, u.path, _)),
								alwaysSet: _ in u.data
							});
						}
					} catch (e) {
						b.e(e);
					} finally {
						b.f();
					}
				}
				return u.common.async ? Promise.resolve().then(Xt(vn().m(function e() {
					var t, n, r, u, a, i, o;
					return vn().w(function(e) {
						for (;;) switch (e.p = e.n) {
							case 0: t = [], n = an(f), e.p = 1, n.s();
							case 2:
								if ((r = n.n()).done) {
									e.n = 6;
									break;
								}
								return u = r.value, e.n = 3, u.key;
							case 3: return a = e.v, e.n = 4, u.value;
							case 4: i = e.v, t.push({
								key: a,
								value: i,
								alwaysSet: u.alwaysSet
							});
							case 5:
								e.n = 2;
								break;
							case 6:
								e.n = 8;
								break;
							case 7: e.p = 7, o = e.v, n.e(o);
							case 8: return e.p = 8, n.f(), e.f(8);
							case 9: return e.a(2, t);
						}
					}, e, null, [[
						1,
						7,
						8,
						9
					]]);
				}))).then(function(e) {
					return kp.mergeObjectSync(r, e);
				}) : kp.mergeObjectSync(r, f);
			}
		},
		{
			key: "shape",
			get: function() {
				return this._def.shape();
			}
		},
		{
			key: "strict",
			value: function(t) {
				var n = this;
				return _p.errToObj, new e(pn(pn({}, this._def), {}, { unknownKeys: "strict" }, void 0 !== t ? { errorMap: function(e, r) {
					var u, a, i, o, s = null !== (u = null === (a = (i = n._def).errorMap) || void 0 === a ? void 0 : a.call(i, e, r).message) && void 0 !== u ? u : r.defaultError;
					return "unrecognized_keys" === e.code ? { message: null !== (o = _p.errToObj(t).message) && void 0 !== o ? o : s } : { message: s };
				} } : {}));
			}
		},
		{
			key: "strip",
			value: function() {
				return new e(pn(pn({}, this._def), {}, { unknownKeys: "strip" }));
			}
		},
		{
			key: "passthrough",
			value: function() {
				return new e(pn(pn({}, this._def), {}, { unknownKeys: "passthrough" }));
			}
		},
		{
			key: "extend",
			value: function(t) {
				var n = this;
				return new e(pn(pn({}, this._def), {}, { shape: function() {
					return pn(pn({}, n._def.shape()), t);
				} }));
			}
		},
		{
			key: "merge",
			value: function(t) {
				var n = this;
				return new e({
					unknownKeys: t._def.unknownKeys,
					catchall: t._def.catchall,
					shape: function() {
						return pn(pn({}, n._def.shape()), t._def.shape());
					},
					typeName: qh.ZodObject
				});
			}
		},
		{
			key: "setKey",
			value: function(e, t) {
				return this.augment(on({}, e, t));
			}
		},
		{
			key: "catchall",
			value: function(t) {
				return new e(pn(pn({}, this._def), {}, { catchall: t }));
			}
		},
		{
			key: "pick",
			value: function(t) {
				var n, r = {}, u = an(op.objectKeys(t));
				try {
					for (u.s(); !(n = u.n()).done;) {
						var a = n.value;
						t[a] && this.shape[a] && (r[a] = this.shape[a]);
					}
				} catch (e) {
					u.e(e);
				} finally {
					u.f();
				}
				return new e(pn(pn({}, this._def), {}, { shape: function() {
					return r;
				} }));
			}
		},
		{
			key: "omit",
			value: function(t) {
				var n, r = {}, u = an(op.objectKeys(this.shape));
				try {
					for (u.s(); !(n = u.n()).done;) {
						var a = n.value;
						t[a] || (r[a] = this.shape[a]);
					}
				} catch (e) {
					u.e(e);
				} finally {
					u.f();
				}
				return new e(pn(pn({}, this._def), {}, { shape: function() {
					return r;
				} }));
			}
		},
		{
			key: "deepPartial",
			value: function() {
				return gh(this);
			}
		},
		{
			key: "partial",
			value: function(t) {
				var n, r = {}, u = an(op.objectKeys(this.shape));
				try {
					for (u.s(); !(n = u.n()).done;) {
						var a = n.value, i = this.shape[a];
						t && !t[a] ? r[a] = i : r[a] = i.optional();
					}
				} catch (e) {
					u.e(e);
				} finally {
					u.f();
				}
				return new e(pn(pn({}, this._def), {}, { shape: function() {
					return r;
				} }));
			}
		},
		{
			key: "required",
			value: function(t) {
				var n, r = {}, u = an(op.objectKeys(this.shape));
				try {
					for (u.s(); !(n = u.n()).done;) {
						var a = n.value;
						if (t && !t[a]) r[a] = this.shape[a];
						else {
							for (var i = this.shape[a]; i instanceof Rh;) i = i._def.innerType;
							r[a] = i;
						}
					}
				} catch (e) {
					u.e(e);
				} finally {
					u.f();
				}
				return new e(pn(pn({}, this._def), {}, { shape: function() {
					return r;
				} }));
			}
		},
		{
			key: "keyof",
			value: function() {
				return Th(op.objectKeys(this.shape));
			}
		}
	]);
}();
Fh.create = function(e, t) {
	return new Fh(pn({
		shape: function() {
			return e;
		},
		unknownKeys: "strip",
		catchall: mh.create(),
		typeName: qh.ZodObject
	}, Pp(t)));
}, Fh.strictCreate = function(e, t) {
	return new Fh(pn({
		shape: function() {
			return e;
		},
		unknownKeys: "strict",
		catchall: mh.create(),
		typeName: qh.ZodObject
	}, Pp(t)));
}, Fh.lazycreate = function(e, t) {
	return new Fh(pn({
		shape: e,
		unknownKeys: "strip",
		catchall: mh.create(),
		typeName: qh.ZodObject
	}, Pp(t)));
};
var Eh = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [{
		key: "_parse",
		value: function(e) {
			var t = this._processInputParams(e).ctx, n = this._def.options;
			if (t.common.async) return Promise.all(n.map(function() {
				var e = Xt(vn().m(function e(n) {
					var r, u, a;
					return vn().w(function(e) {
						for (;;) switch (e.n) {
							case 0: return r = pn(pn({}, t), {}, {
								common: pn(pn({}, t.common), {}, { issues: [] }),
								parent: null
							}), e.n = 1, n._parseAsync({
								data: t.data,
								path: t.path,
								parent: r
							});
							case 1: return u = e.v, a = r, e.a(2, {
								result: u,
								ctx: a
							});
						}
					}, e);
				}));
				return function(t) {
					return e.apply(this, arguments);
				};
			}())).then(function(e) {
				var n, r = an(e);
				try {
					for (r.s(); !(n = r.n()).done;) {
						var u = n.value;
						if ("valid" === u.result.status) return u.result;
					}
				} catch (e) {
					r.e(e);
				} finally {
					r.f();
				}
				var a, i = an(e);
				try {
					for (i.s(); !(a = i.n()).done;) {
						var o, s = a.value;
						if ("dirty" === s.result.status) return (o = t.common.issues).push.apply(o, gn(s.ctx.common.issues)), s.result;
					}
				} catch (e) {
					i.e(e);
				} finally {
					i.f();
				}
				var c = e.map(function(e) {
					return new Dp(e.ctx.common.issues);
				});
				return bp(t, {
					code: mp.invalid_union,
					unionErrors: c
				}), Cp;
			});
			var r, u, a = void 0, i = [], o = an(n);
			try {
				for (o.s(); !(r = o.n()).done;) {
					var s = r.value, c = pn(pn({}, t), {}, {
						common: pn(pn({}, t.common), {}, { issues: [] }),
						parent: null
					}), l = s._parseSync({
						data: t.data,
						path: t.path,
						parent: c
					});
					if ("valid" === l.status) return l;
					"dirty" !== l.status || a || (a = {
						result: l,
						ctx: c
					}), c.common.issues.length && i.push(c.common.issues);
				}
			} catch (e) {
				o.e(e);
			} finally {
				o.f();
			}
			if (a) return (u = t.common.issues).push.apply(u, gn(a.ctx.common.issues)), a.result;
			var f = i.map(function(e) {
				return new Dp(e);
			});
			return bp(t, {
				code: mp.invalid_union,
				unionErrors: f
			}), Cp;
		}
	}, {
		key: "options",
		get: function() {
			return this._def.options;
		}
	}]);
}();
Eh.create = function(e, t) {
	return new Eh(pn({
		options: e,
		typeName: qh.ZodUnion
	}, Pp(t)));
};
var bh = function(e) {
	return e instanceof Bh ? bh(e.schema) : e instanceof zh ? bh(e.innerType()) : e instanceof Ih ? [e.value] : e instanceof Ph ? e.options : e instanceof jh ? op.objectValues(e.enum) : e instanceof Zh ? bh(e._def.innerType) : e instanceof dh ? [void 0] : e instanceof ph ? [null] : e instanceof Rh ? [void 0].concat(gn(bh(e.unwrap()))) : e instanceof Mh ? [null].concat(gn(bh(e.unwrap()))) : e instanceof Uh || e instanceof Vh ? bh(e.unwrap()) : e instanceof Lh ? bh(e._def.innerType) : [];
}, _h = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [
		{
			key: "_parse",
			value: function(e) {
				var t = this._processInputParams(e).ctx;
				if (t.parsedType !== hp.object) return bp(t, {
					code: mp.invalid_type,
					expected: hp.object,
					received: t.parsedType
				}), Cp;
				var n = this.discriminator, r = t.data[n], u = this.optionsMap.get(r);
				return u ? t.common.async ? u._parseAsync({
					data: t.data,
					path: t.path,
					parent: t
				}) : u._parseSync({
					data: t.data,
					path: t.path,
					parent: t
				}) : (bp(t, {
					code: mp.invalid_union_discriminator,
					options: Array.from(this.optionsMap.keys()),
					path: [n]
				}), Cp);
			}
		},
		{
			key: "discriminator",
			get: function() {
				return this._def.discriminator;
			}
		},
		{
			key: "options",
			get: function() {
				return this._def.options;
			}
		},
		{
			key: "optionsMap",
			get: function() {
				return this._def.optionsMap;
			}
		}
	], [{
		key: "create",
		value: function(t, n, r) {
			var u, a = /* @__PURE__ */ new Map(), i = an(n);
			try {
				for (i.s(); !(u = i.n()).done;) {
					var o = u.value, s = bh(o.shape[t]);
					if (!s.length) throw new Error("A discriminator value for key `".concat(t, "` could not be extracted from all schema options"));
					var c, l = an(s);
					try {
						for (l.s(); !(c = l.n()).done;) {
							var f = c.value;
							if (a.has(f)) throw new Error("Discriminator property ".concat(String(t), " has duplicate value ").concat(String(f)));
							a.set(f, o);
						}
					} catch (e) {
						l.e(e);
					} finally {
						l.f();
					}
				}
			} catch (e) {
				i.e(e);
			} finally {
				i.f();
			}
			return new e(pn({
				typeName: qh.ZodDiscriminatedUnion,
				discriminator: t,
				options: n,
				optionsMap: a
			}, Pp(r)));
		}
	}]);
}();
function kh(e, t) {
	var n = vp(e), r = vp(t);
	if (e === t) return {
		valid: !0,
		data: e
	};
	if (n === hp.object && r === hp.object) {
		var u, a = op.objectKeys(t), i = op.objectKeys(e).filter(function(e) {
			return -1 !== a.indexOf(e);
		}), o = pn(pn({}, e), t), s = an(i);
		try {
			for (s.s(); !(u = s.n()).done;) {
				var c = u.value, l = kh(e[c], t[c]);
				if (!l.valid) return { valid: !1 };
				o[c] = l.data;
			}
		} catch (e) {
			s.e(e);
		} finally {
			s.f();
		}
		return {
			valid: !0,
			data: o
		};
	}
	if (n === hp.array && r === hp.array) {
		if (e.length !== t.length) return { valid: !1 };
		for (var f = [], d = 0; d < e.length; d++) {
			var p = kh(e[d], t[d]);
			if (!p.valid) return { valid: !1 };
			f.push(p.data);
		}
		return {
			valid: !0,
			data: f
		};
	}
	return n === hp.date && r === hp.date && +e === +t ? {
		valid: !0,
		data: e
	} : { valid: !1 };
}
var Ch = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [{
		key: "_parse",
		value: function(e) {
			var t = this._processInputParams(e), n = t.status, r = t.ctx, u = function(e, t) {
				if (Sp(e) || Sp(t)) return Cp;
				var u = kh(e.value, t.value);
				return u.valid ? ((xp(e) || xp(t)) && n.dirty(), {
					status: n.value,
					value: u.data
				}) : (bp(r, { code: mp.invalid_intersection_types }), Cp);
			};
			return r.common.async ? Promise.all([this._def.left._parseAsync({
				data: r.data,
				path: r.path,
				parent: r
			}), this._def.right._parseAsync({
				data: r.data,
				path: r.path,
				parent: r
			})]).then(function(e) {
				var t = yn(e, 2), n = t[0], r = t[1];
				return u(n, r);
			}) : u(this._def.left._parseSync({
				data: r.data,
				path: r.path,
				parent: r
			}), this._def.right._parseSync({
				data: r.data,
				path: r.path,
				parent: r
			}));
		}
	}]);
}();
Ch.create = function(e, t, n) {
	return new Ch(pn({
		left: e,
		right: t,
		typeName: qh.ZodIntersection
	}, Pp(n)));
};
var Ah = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [
		{
			key: "_parse",
			value: function(e) {
				var t = this, n = this._processInputParams(e), r = n.status, u = n.ctx;
				if (u.parsedType !== hp.array) return bp(u, {
					code: mp.invalid_type,
					expected: hp.array,
					received: u.parsedType
				}), Cp;
				if (u.data.length < this._def.items.length) return bp(u, {
					code: mp.too_small,
					minimum: this._def.items.length,
					inclusive: !0,
					exact: !1,
					type: "array"
				}), Cp;
				!this._def.rest && u.data.length > this._def.items.length && (bp(u, {
					code: mp.too_big,
					maximum: this._def.items.length,
					inclusive: !0,
					exact: !1,
					type: "array"
				}), r.dirty());
				var a = gn(u.data).map(function(e, n) {
					var r = t._def.items[n] || t._def.rest;
					return r ? r._parse(new Ip(u, e, u.path, n)) : null;
				}).filter(function(e) {
					return !!e;
				});
				return u.common.async ? Promise.all(a).then(function(e) {
					return kp.mergeArray(r, e);
				}) : kp.mergeArray(r, a);
			}
		},
		{
			key: "items",
			get: function() {
				return this._def.items;
			}
		},
		{
			key: "rest",
			value: function(t) {
				return new e(pn(pn({}, this._def), {}, { rest: t }));
			}
		}
	]);
}();
Ah.create = function(e, t) {
	if (!Array.isArray(e)) throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
	return new Ah(pn({
		items: e,
		typeName: qh.ZodTuple,
		rest: null
	}, Pp(t)));
};
var wh = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [
		{
			key: "keySchema",
			get: function() {
				return this._def.keyType;
			}
		},
		{
			key: "valueSchema",
			get: function() {
				return this._def.valueType;
			}
		},
		{
			key: "_parse",
			value: function(e) {
				var t = this._processInputParams(e), n = t.status, r = t.ctx;
				if (r.parsedType !== hp.object) return bp(r, {
					code: mp.invalid_type,
					expected: hp.object,
					received: r.parsedType
				}), Cp;
				var u = [], a = this._def.keyType, i = this._def.valueType;
				for (var o in r.data) u.push({
					key: a._parse(new Ip(r, o, r.path, o)),
					value: i._parse(new Ip(r, r.data[o], r.path, o)),
					alwaysSet: o in r.data
				});
				return r.common.async ? kp.mergeObjectAsync(n, u) : kp.mergeObjectSync(n, u);
			}
		},
		{
			key: "element",
			get: function() {
				return this._def.valueType;
			}
		}
	], [{
		key: "create",
		value: function(t, n, r) {
			return new e(n instanceof Np ? pn({
				keyType: t,
				valueType: n,
				typeName: qh.ZodRecord
			}, Pp(r)) : pn({
				keyType: ah.create(),
				valueType: t,
				typeName: qh.ZodRecord
			}, Pp(n)));
		}
	}]);
}(), Sh = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [
		{
			key: "keySchema",
			get: function() {
				return this._def.keyType;
			}
		},
		{
			key: "valueSchema",
			get: function() {
				return this._def.valueType;
			}
		},
		{
			key: "_parse",
			value: function(e) {
				var t = this._processInputParams(e), n = t.status, r = t.ctx;
				if (r.parsedType !== hp.map) return bp(r, {
					code: mp.invalid_type,
					expected: hp.map,
					received: r.parsedType
				}), Cp;
				var u = this._def.keyType, a = this._def.valueType, i = gn(r.data.entries()).map(function(e, t) {
					var n = yn(e, 2), i = n[0], o = n[1];
					return {
						key: u._parse(new Ip(r, i, r.path, [t, "key"])),
						value: a._parse(new Ip(r, o, r.path, [t, "value"]))
					};
				});
				if (r.common.async) {
					var o = /* @__PURE__ */ new Map();
					return Promise.resolve().then(Xt(vn().m(function e() {
						var t, r, u, a, s, c;
						return vn().w(function(e) {
							for (;;) switch (e.p = e.n) {
								case 0: t = an(i), e.p = 1, t.s();
								case 2:
									if ((r = t.n()).done) {
										e.n = 7;
										break;
									}
									return u = r.value, e.n = 3, u.key;
								case 3: return a = e.v, e.n = 4, u.value;
								case 4:
									if (s = e.v, "aborted" !== a.status && "aborted" !== s.status) {
										e.n = 5;
										break;
									}
									return e.a(2, Cp);
								case 5: "dirty" !== a.status && "dirty" !== s.status || n.dirty(), o.set(a.value, s.value);
								case 6:
									e.n = 2;
									break;
								case 7:
									e.n = 9;
									break;
								case 8: e.p = 8, c = e.v, t.e(c);
								case 9: return e.p = 9, t.f(), e.f(9);
								case 10: return e.a(2, {
									status: n.value,
									value: o
								});
							}
						}, e, null, [[
							1,
							8,
							9,
							10
						]]);
					})));
				}
				var s, c = /* @__PURE__ */ new Map(), l = an(i);
				try {
					for (l.s(); !(s = l.n()).done;) {
						var f = s.value, d = f.key, p = f.value;
						if ("aborted" === d.status || "aborted" === p.status) return Cp;
						"dirty" !== d.status && "dirty" !== p.status || n.dirty(), c.set(d.value, p.value);
					}
				} catch (e) {
					l.e(e);
				} finally {
					l.f();
				}
				return {
					status: n.value,
					value: c
				};
			}
		}
	]);
}();
Sh.create = function(e, t, n) {
	return new Sh(pn({
		valueType: t,
		keyType: e,
		typeName: qh.ZodMap
	}, Pp(n)));
};
var xh = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [
		{
			key: "_parse",
			value: function(e) {
				var t = this._processInputParams(e), n = t.status, r = t.ctx;
				if (r.parsedType !== hp.set) return bp(r, {
					code: mp.invalid_type,
					expected: hp.set,
					received: r.parsedType
				}), Cp;
				var u = this._def;
				null !== u.minSize && r.data.size < u.minSize.value && (bp(r, {
					code: mp.too_small,
					minimum: u.minSize.value,
					type: "set",
					inclusive: !0,
					exact: !1,
					message: u.minSize.message
				}), n.dirty()), null !== u.maxSize && r.data.size > u.maxSize.value && (bp(r, {
					code: mp.too_big,
					maximum: u.maxSize.value,
					type: "set",
					inclusive: !0,
					exact: !1,
					message: u.maxSize.message
				}), n.dirty());
				var a = this._def.valueType;
				function i(e) {
					var t, r = /* @__PURE__ */ new Set(), u = an(e);
					try {
						for (u.s(); !(t = u.n()).done;) {
							var a = t.value;
							if ("aborted" === a.status) return Cp;
							"dirty" === a.status && n.dirty(), r.add(a.value);
						}
					} catch (e) {
						u.e(e);
					} finally {
						u.f();
					}
					return {
						status: n.value,
						value: r
					};
				}
				var o = gn(r.data.values()).map(function(e, t) {
					return a._parse(new Ip(r, e, r.path, t));
				});
				return r.common.async ? Promise.all(o).then(function(e) {
					return i(e);
				}) : i(o);
			}
		},
		{
			key: "min",
			value: function(t, n) {
				return new e(pn(pn({}, this._def), {}, { minSize: {
					value: t,
					message: _p.toString(n)
				} }));
			}
		},
		{
			key: "max",
			value: function(t, n) {
				return new e(pn(pn({}, this._def), {}, { maxSize: {
					value: t,
					message: _p.toString(n)
				} }));
			}
		},
		{
			key: "size",
			value: function(e, t) {
				return this.min(e, t).max(e, t);
			}
		},
		{
			key: "nonempty",
			value: function(e) {
				return this.min(1, e);
			}
		}
	]);
}();
xh.create = function(e, t) {
	return new xh(pn({
		valueType: e,
		minSize: null,
		maxSize: null,
		typeName: qh.ZodSet
	}, Pp(t)));
};
var Oh = function() {
	function e() {
		var t;
		return tn(this, e), (t = en(this, e, arguments)).validate = t.implement, t;
	}
	return ln(e, Np), un(e, [
		{
			key: "_parse",
			value: function(e) {
				var t = this._processInputParams(e).ctx;
				if (t.parsedType !== hp.function) return bp(t, {
					code: mp.invalid_type,
					expected: hp.function,
					received: t.parsedType
				}), Cp;
				function n(e, n) {
					return Ep({
						data: e,
						path: t.path,
						errorMaps: [
							t.common.contextualErrorMap,
							t.schemaErrorMap,
							Fp(),
							yp
						].filter(function(e) {
							return !!e;
						}),
						issueData: {
							code: mp.invalid_arguments,
							argumentsError: n
						}
					});
				}
				function r(e, n) {
					return Ep({
						data: e,
						path: t.path,
						errorMaps: [
							t.common.contextualErrorMap,
							t.schemaErrorMap,
							Fp(),
							yp
						].filter(function(e) {
							return !!e;
						}),
						issueData: {
							code: mp.invalid_return_type,
							returnTypeError: n
						}
					});
				}
				var u = { errorMap: t.common.contextualErrorMap }, a = t.data;
				if (this._def.returns instanceof Nh) {
					var i = this;
					return wp(Xt(vn().m(function e() {
						var t, o, s, c, l, f, d, p = arguments;
						return vn().w(function(e) {
							for (;;) switch (e.n) {
								case 0:
									for (t = p.length, o = new Array(t), s = 0; s < t; s++) o[s] = p[s];
									return c = new Dp([]), e.n = 1, i._def.args.parseAsync(o, u).catch(function(e) {
										throw c.addIssue(n(o, e)), c;
									});
								case 1: return l = e.v, e.n = 2, Reflect.apply(a, this, l);
								case 2: return f = e.v, e.n = 3, i._def.returns._def.type.parseAsync(f, u).catch(function(e) {
									throw c.addIssue(r(f, e)), c;
								});
								case 3: return d = e.v, e.a(2, d);
							}
						}, e, this);
					})));
				}
				var o = this;
				return wp(function() {
					for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
					var s = o._def.args.safeParse(t, u);
					if (!s.success) throw new Dp([n(t, s.error)]);
					var c = Reflect.apply(a, this, s.data), l = o._def.returns.safeParse(c, u);
					if (!l.success) throw new Dp([r(c, l.error)]);
					return l.data;
				});
			}
		},
		{
			key: "parameters",
			value: function() {
				return this._def.args;
			}
		},
		{
			key: "returnType",
			value: function() {
				return this._def.returns;
			}
		},
		{
			key: "args",
			value: function() {
				for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
				return new e(pn(pn({}, this._def), {}, { args: Ah.create(n).rest(vh.create()) }));
			}
		},
		{
			key: "returns",
			value: function(t) {
				return new e(pn(pn({}, this._def), {}, { returns: t }));
			}
		},
		{
			key: "implement",
			value: function(e) {
				return this.parse(e);
			}
		},
		{
			key: "strictImplement",
			value: function(e) {
				return this.parse(e);
			}
		}
	], [{
		key: "create",
		value: function(t, n, r) {
			return new e(pn({
				args: t || Ah.create([]).rest(vh.create()),
				returns: n || vh.create(),
				typeName: qh.ZodFunction
			}, Pp(r)));
		}
	}]);
}(), Bh = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [{
		key: "schema",
		get: function() {
			return this._def.getter();
		}
	}, {
		key: "_parse",
		value: function(e) {
			var t = this._processInputParams(e).ctx;
			return this._def.getter()._parse({
				data: t.data,
				path: t.path,
				parent: t
			});
		}
	}]);
}();
Bh.create = function(e, t) {
	return new Bh(pn({
		getter: e,
		typeName: qh.ZodLazy
	}, Pp(t)));
};
var Ih = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [{
		key: "_parse",
		value: function(e) {
			if (e.data !== this._def.value) {
				var t = this._getOrReturnCtx(e);
				return bp(t, {
					received: t.data,
					code: mp.invalid_literal,
					expected: this._def.value
				}), Cp;
			}
			return {
				status: "valid",
				value: e.data
			};
		}
	}, {
		key: "value",
		get: function() {
			return this._def.value;
		}
	}]);
}();
function Th(e, t) {
	return new Ph(pn({
		values: e,
		typeName: qh.ZodEnum
	}, Pp(t)));
}
Ih.create = function(e, t) {
	return new Ih(pn({
		value: e,
		typeName: qh.ZodLiteral
	}, Pp(t)));
};
var Ph = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [
		{
			key: "_parse",
			value: function(e) {
				if ("string" != typeof e.data) {
					var t = this._getOrReturnCtx(e), n = this._def.values;
					return bp(t, {
						expected: op.joinValues(n),
						received: t.parsedType,
						code: mp.invalid_type
					}), Cp;
				}
				if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e.data)) {
					var r = this._getOrReturnCtx(e), u = this._def.values;
					return bp(r, {
						received: r.data,
						code: mp.invalid_enum_value,
						options: u
					}), Cp;
				}
				return wp(e.data);
			}
		},
		{
			key: "options",
			get: function() {
				return this._def.values;
			}
		},
		{
			key: "enum",
			get: function() {
				var e, t = {}, n = an(this._def.values);
				try {
					for (n.s(); !(e = n.n()).done;) {
						var r = e.value;
						t[r] = r;
					}
				} catch (e) {
					n.e(e);
				} finally {
					n.f();
				}
				return t;
			}
		},
		{
			key: "Values",
			get: function() {
				var e, t = {}, n = an(this._def.values);
				try {
					for (n.s(); !(e = n.n()).done;) {
						var r = e.value;
						t[r] = r;
					}
				} catch (e) {
					n.e(e);
				} finally {
					n.f();
				}
				return t;
			}
		},
		{
			key: "Enum",
			get: function() {
				var e, t = {}, n = an(this._def.values);
				try {
					for (n.s(); !(e = n.n()).done;) {
						var r = e.value;
						t[r] = r;
					}
				} catch (e) {
					n.e(e);
				} finally {
					n.f();
				}
				return t;
			}
		},
		{
			key: "extract",
			value: function(t) {
				var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this._def;
				return e.create(t, pn(pn({}, this._def), n));
			}
		},
		{
			key: "exclude",
			value: function(t) {
				var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this._def;
				return e.create(this.options.filter(function(e) {
					return !t.includes(e);
				}), pn(pn({}, this._def), n));
			}
		}
	]);
}();
Ph.create = Th;
var jh = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [{
		key: "_parse",
		value: function(e) {
			var t = op.getValidEnumValues(this._def.values), n = this._getOrReturnCtx(e);
			if (n.parsedType !== hp.string && n.parsedType !== hp.number) {
				var r = op.objectValues(t);
				return bp(n, {
					expected: op.joinValues(r),
					received: n.parsedType,
					code: mp.invalid_type
				}), Cp;
			}
			if (this._cache || (this._cache = new Set(op.getValidEnumValues(this._def.values))), !this._cache.has(e.data)) {
				var u = op.objectValues(t);
				return bp(n, {
					received: n.data,
					code: mp.invalid_enum_value,
					options: u
				}), Cp;
			}
			return wp(e.data);
		}
	}, {
		key: "enum",
		get: function() {
			return this._def.values;
		}
	}]);
}();
jh.create = function(e, t) {
	return new jh(pn({
		values: e,
		typeName: qh.ZodNativeEnum
	}, Pp(t)));
};
var Nh = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [{
		key: "unwrap",
		value: function() {
			return this._def.type;
		}
	}, {
		key: "_parse",
		value: function(e) {
			var t = this, n = this._processInputParams(e).ctx;
			if (n.parsedType !== hp.promise && !1 === n.common.async) return bp(n, {
				code: mp.invalid_type,
				expected: hp.promise,
				received: n.parsedType
			}), Cp;
			return wp((n.parsedType === hp.promise ? n.data : Promise.resolve(n.data)).then(function(e) {
				return t._def.type.parseAsync(e, {
					path: n.path,
					errorMap: n.common.contextualErrorMap
				});
			}));
		}
	}]);
}();
Nh.create = function(e, t) {
	return new Nh(pn({
		type: e,
		typeName: qh.ZodPromise
	}, Pp(t)));
};
var zh = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [
		{
			key: "innerType",
			value: function() {
				return this._def.schema;
			}
		},
		{
			key: "sourceType",
			value: function() {
				return this._def.schema._def.typeName === qh.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
			}
		},
		{
			key: "_parse",
			value: function(e) {
				var t = this, n = this._processInputParams(e), r = n.status, u = n.ctx, a = this._def.effect || null, i = {
					addIssue: function(e) {
						bp(u, e), e.fatal ? r.abort() : r.dirty();
					},
					get path() {
						return u.path;
					}
				};
				if (i.addIssue = i.addIssue.bind(i), "preprocess" === a.type) {
					var o = a.transform(u.data, i);
					if (u.common.async) return Promise.resolve(o).then(function() {
						var e = Xt(vn().m(function e(n) {
							var a;
							return vn().w(function(e) {
								for (;;) switch (e.n) {
									case 0:
										if ("aborted" !== r.value) {
											e.n = 1;
											break;
										}
										return e.a(2, Cp);
									case 1: return e.n = 2, t._def.schema._parseAsync({
										data: n,
										path: u.path,
										parent: u
									});
									case 2:
										if ("aborted" !== (a = e.v).status) {
											e.n = 3;
											break;
										}
										return e.a(2, Cp);
									case 3:
										if ("dirty" !== a.status) {
											e.n = 4;
											break;
										}
										return e.a(2, Ap(a.value));
									case 4:
										if ("dirty" !== r.value) {
											e.n = 5;
											break;
										}
										return e.a(2, Ap(a.value));
									case 5: return e.a(2, a);
								}
							}, e);
						}));
						return function(t) {
							return e.apply(this, arguments);
						};
					}());
					if ("aborted" === r.value) return Cp;
					var s = this._def.schema._parseSync({
						data: o,
						path: u.path,
						parent: u
					});
					return "aborted" === s.status ? Cp : "dirty" === s.status || "dirty" === r.value ? Ap(s.value) : s;
				}
				if ("refinement" === a.type) {
					var c = function(e) {
						var t = a.refinement(e, i);
						if (u.common.async) return Promise.resolve(t);
						if (t instanceof Promise) throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
						return e;
					};
					if (!1 === u.common.async) {
						var l = this._def.schema._parseSync({
							data: u.data,
							path: u.path,
							parent: u
						});
						return "aborted" === l.status ? Cp : ("dirty" === l.status && r.dirty(), c(l.value), {
							status: r.value,
							value: l.value
						});
					}
					return this._def.schema._parseAsync({
						data: u.data,
						path: u.path,
						parent: u
					}).then(function(e) {
						return "aborted" === e.status ? Cp : ("dirty" === e.status && r.dirty(), c(e.value).then(function() {
							return {
								status: r.value,
								value: e.value
							};
						}));
					});
				}
				if ("transform" === a.type) {
					if (!1 === u.common.async) {
						var f = this._def.schema._parseSync({
							data: u.data,
							path: u.path,
							parent: u
						});
						if (!Op(f)) return Cp;
						var d = a.transform(f.value, i);
						if (d instanceof Promise) throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
						return {
							status: r.value,
							value: d
						};
					}
					return this._def.schema._parseAsync({
						data: u.data,
						path: u.path,
						parent: u
					}).then(function(e) {
						return Op(e) ? Promise.resolve(a.transform(e.value, i)).then(function(e) {
							return {
								status: r.value,
								value: e
							};
						}) : Cp;
					});
				}
				op.assertNever(a);
			}
		}
	]);
}();
zh.create = function(e, t, n) {
	return new zh(pn({
		schema: e,
		typeName: qh.ZodEffects,
		effect: t
	}, Pp(n)));
}, zh.createWithPreprocess = function(e, t, n) {
	return new zh(pn({
		schema: t,
		effect: {
			type: "preprocess",
			transform: e
		},
		typeName: qh.ZodEffects
	}, Pp(n)));
};
var Rh = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [{
		key: "_parse",
		value: function(e) {
			return this._getType(e) === hp.undefined ? wp(void 0) : this._def.innerType._parse(e);
		}
	}, {
		key: "unwrap",
		value: function() {
			return this._def.innerType;
		}
	}]);
}();
Rh.create = function(e, t) {
	return new Rh(pn({
		innerType: e,
		typeName: qh.ZodOptional
	}, Pp(t)));
};
var Mh = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [{
		key: "_parse",
		value: function(e) {
			return this._getType(e) === hp.null ? wp(null) : this._def.innerType._parse(e);
		}
	}, {
		key: "unwrap",
		value: function() {
			return this._def.innerType;
		}
	}]);
}();
Mh.create = function(e, t) {
	return new Mh(pn({
		innerType: e,
		typeName: qh.ZodNullable
	}, Pp(t)));
};
var Zh = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [{
		key: "_parse",
		value: function(e) {
			var t = this._processInputParams(e).ctx, n = t.data;
			return t.parsedType === hp.undefined && (n = this._def.defaultValue()), this._def.innerType._parse({
				data: n,
				path: t.path,
				parent: t
			});
		}
	}, {
		key: "removeDefault",
		value: function() {
			return this._def.innerType;
		}
	}]);
}();
Zh.create = function(e, t) {
	return new Zh(pn({
		innerType: e,
		typeName: qh.ZodDefault,
		defaultValue: "function" == typeof t.default ? t.default : function() {
			return t.default;
		}
	}, Pp(t)));
};
var Lh = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [{
		key: "_parse",
		value: function(e) {
			var t = this, n = this._processInputParams(e).ctx, r = pn(pn({}, n), {}, { common: pn(pn({}, n.common), {}, { issues: [] }) }), u = this._def.innerType._parse({
				data: r.data,
				path: r.path,
				parent: pn({}, r)
			});
			return Bp(u) ? u.then(function(e) {
				return {
					status: "valid",
					value: "valid" === e.status ? e.value : t._def.catchValue({
						get error() {
							return new Dp(r.common.issues);
						},
						input: r.data
					})
				};
			}) : {
				status: "valid",
				value: "valid" === u.status ? u.value : this._def.catchValue({
					get error() {
						return new Dp(r.common.issues);
					},
					input: r.data
				})
			};
		}
	}, {
		key: "removeCatch",
		value: function() {
			return this._def.innerType;
		}
	}]);
}();
Lh.create = function(e, t) {
	return new Lh(pn({
		innerType: e,
		typeName: qh.ZodCatch,
		catchValue: "function" == typeof t.catch ? t.catch : function() {
			return t.catch;
		}
	}, Pp(t)));
};
var $h = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [{
		key: "_parse",
		value: function(e) {
			if (this._getType(e) !== hp.nan) {
				var t = this._getOrReturnCtx(e);
				return bp(t, {
					code: mp.invalid_type,
					expected: hp.nan,
					received: t.parsedType
				}), Cp;
			}
			return {
				status: "valid",
				value: e.data
			};
		}
	}]);
}();
$h.create = function(e) {
	return new $h(pn({ typeName: qh.ZodNaN }, Pp(e)));
};
var qh, Uh = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [{
		key: "_parse",
		value: function(e) {
			var t = this._processInputParams(e).ctx, n = t.data;
			return this._def.type._parse({
				data: n,
				path: t.path,
				parent: t
			});
		}
	}, {
		key: "unwrap",
		value: function() {
			return this._def.type;
		}
	}]);
}(), Hh = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [{
		key: "_parse",
		value: function(e) {
			var t = this, n = this._processInputParams(e), r = n.status, u = n.ctx;
			if (u.common.async) return function() {
				var e = Xt(vn().m(function e() {
					var n;
					return vn().w(function(e) {
						for (;;) switch (e.n) {
							case 0: return e.n = 1, t._def.in._parseAsync({
								data: u.data,
								path: u.path,
								parent: u
							});
							case 1:
								if ("aborted" !== (n = e.v).status) {
									e.n = 2;
									break;
								}
								return e.a(2, Cp);
							case 2:
								if ("dirty" !== n.status) {
									e.n = 3;
									break;
								}
								return r.dirty(), e.a(2, Ap(n.value));
							case 3: return e.a(2, t._def.out._parseAsync({
								data: n.value,
								path: u.path,
								parent: u
							}));
							case 4: return e.a(2);
						}
					}, e);
				}));
				return function() {
					return e.apply(this, arguments);
				};
			}()();
			var i = this._def.in._parseSync({
				data: u.data,
				path: u.path,
				parent: u
			});
			return "aborted" === i.status ? Cp : "dirty" === i.status ? (r.dirty(), {
				status: "dirty",
				value: i.value
			}) : this._def.out._parseSync({
				data: i.value,
				path: u.path,
				parent: u
			});
		}
	}], [{
		key: "create",
		value: function(t, n) {
			return new e({
				in: t,
				out: n,
				typeName: qh.ZodPipeline
			});
		}
	}]);
}(), Vh = function() {
	function e() {
		return tn(this, e), en(this, e, arguments);
	}
	return ln(e, Np), un(e, [{
		key: "_parse",
		value: function(e) {
			var t = this._def.innerType._parse(e), n = function(e) {
				return Op(e) && (e.value = Object.freeze(e.value)), e;
			};
			return Bp(t) ? t.then(function(e) {
				return n(e);
			}) : n(t);
		}
	}, {
		key: "unwrap",
		value: function() {
			return this._def.innerType;
		}
	}]);
}();
Vh.create = function(e, t) {
	return new Vh(pn({
		innerType: e,
		typeName: qh.ZodReadonly
	}, Pp(t)));
}, Fh.lazycreate, function(e) {
	e.ZodString = "ZodString", e.ZodNumber = "ZodNumber", e.ZodNaN = "ZodNaN", e.ZodBigInt = "ZodBigInt", e.ZodBoolean = "ZodBoolean", e.ZodDate = "ZodDate", e.ZodSymbol = "ZodSymbol", e.ZodUndefined = "ZodUndefined", e.ZodNull = "ZodNull", e.ZodAny = "ZodAny", e.ZodUnknown = "ZodUnknown", e.ZodNever = "ZodNever", e.ZodVoid = "ZodVoid", e.ZodArray = "ZodArray", e.ZodObject = "ZodObject", e.ZodUnion = "ZodUnion", e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", e.ZodIntersection = "ZodIntersection", e.ZodTuple = "ZodTuple", e.ZodRecord = "ZodRecord", e.ZodMap = "ZodMap", e.ZodSet = "ZodSet", e.ZodFunction = "ZodFunction", e.ZodLazy = "ZodLazy", e.ZodLiteral = "ZodLiteral", e.ZodEnum = "ZodEnum", e.ZodEffects = "ZodEffects", e.ZodNativeEnum = "ZodNativeEnum", e.ZodOptional = "ZodOptional", e.ZodNullable = "ZodNullable", e.ZodDefault = "ZodDefault", e.ZodCatch = "ZodCatch", e.ZodPromise = "ZodPromise", e.ZodBranded = "ZodBranded", e.ZodPipeline = "ZodPipeline", e.ZodReadonly = "ZodReadonly";
}(qh || (qh = {})), ah.create, oh.create, $h.create, sh.create, ch.create, lh.create, fh.create, dh.create, ph.create, hh.create, vh.create, mh.create, Dh.create, yh.create, Fh.create, Fh.strictCreate, Eh.create, _h.create, Ch.create, Ah.create, wh.create, Sh.create, xh.create, Oh.create, Bh.create, Ih.create, Ph.create, jh.create, Nh.create, zh.create, Rh.create, Mh.create, zh.createWithPreprocess, Hh.create;
var Wh = function() {
	var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.prefix, n = e.size, r = void 0 === n ? 16 : n, u = e.alphabet, a = void 0 === u ? "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" : u, i = e.separator, o = void 0 === i ? "-" : i, s = function() {
		for (var e = a.length, t = new Array(r), n = 0; n < r; n++) t[n] = a[Math.random() * e | 0];
		return t.join("");
	};
	if (null == t) return s;
	if (a.includes(o)) throw new Xo({
		argument: "separator",
		message: "The separator \"".concat(o, "\" must not be part of the alphabet \"").concat(a, "\".")
	});
	return function() {
		return "".concat(t).concat(o).concat(s());
	};
}, Kh = Wh();
function Jh() {
	var e, t, n, r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : globalThis;
	return r.window ? "runtime/browser" : (null == (e = r.navigator) ? void 0 : e.userAgent) ? "runtime/".concat(r.navigator.userAgent.toLowerCase()) : (null == (n = null == (t = r.process) ? void 0 : t.versions) ? void 0 : n.node) ? "runtime/node.js/".concat(r.process.version.substring(0)) : r.EdgeRuntime ? "runtime/vercel-edge" : "runtime/unknown";
}
function Qh(e) {
	if (null == e) return {};
	var t = {};
	if (e instanceof Headers) e.forEach(function(e, n) {
		t[n.toLowerCase()] = e;
	});
	else {
		Array.isArray(e) || (e = Object.entries(e));
		var n, r = s(e);
		try {
			for (r.s(); !(n = r.n()).done;) {
				var u = g(n.value, 2), a = u[0], i = u[1];
				null != i && (t[a.toLowerCase()] = i);
			}
		} catch (e) {
			r.e(e);
		} finally {
			r.f();
		}
	}
	return t;
}
function Gh(e) {
	for (var t = new Headers(Qh(e)), n = t.get("user-agent") || "", r = arguments.length, u = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) u[a - 1] = arguments[a];
	return t.set("user-agent", [n].concat(u).filter(Boolean).join(" ")), Object.fromEntries(t.entries());
}
var Yh = /"__proto__"\s*:/, Xh = /"constructor"\s*:/;
function ev(e) {
	var t = JSON.parse(e);
	return null === t || "object" != b(t) || !1 === Yh.test(e) && !1 === Xh.test(e) ? t : function(e) {
		for (var t = [e]; t.length;) {
			var n = t;
			t = [];
			var r, u = s(n);
			try {
				for (u.s(); !(r = u.n()).done;) {
					var a = r.value;
					if (Object.prototype.hasOwnProperty.call(a, "__proto__")) throw new SyntaxError("Object contains forbidden prototype property");
					if (Object.prototype.hasOwnProperty.call(a, "constructor") && Object.prototype.hasOwnProperty.call(a.constructor, "prototype")) throw new SyntaxError("Object contains forbidden prototype property");
					for (var i in a) {
						var o = a[i];
						o && "object" == b(o) && t.push(o);
					}
				}
			} catch (e) {
				u.e(e);
			} finally {
				u.f();
			}
		}
		return e;
	}(t);
}
var tv = Symbol.for("vercel.ai.validator");
function nv(e) {
	return function(e) {
		return "object" == b(e) && null !== e && tv in e && !0 === e[tv] && "validate" in e;
	}(e) ? e : "function" == typeof e ? e() : (t = e, n = function() {
		var e = r(m().m(function e(n) {
			var r;
			return m().w(function(e) {
				for (;;) switch (e.n) {
					case 0: return e.n = 1, t["~standard"].validate(n);
					case 1: return r = e.v, e.a(2, null == r.issues ? {
						success: !0,
						value: r.value
					} : {
						success: !1,
						error: new cs({
							value: n,
							cause: r.issues
						})
					});
				}
			}, e);
		}));
		return function(t) {
			return e.apply(this, arguments);
		};
	}(), c(c({}, tv, !0), "validate", n));
	var t, n;
}
function rv(e) {
	return uv.apply(this, arguments);
}
function uv() {
	return uv = r(m().m(function e(t) {
		var n, r, u;
		return m().w(function(e) {
			for (;;) switch (e.n) {
				case 0: return n = t.value, r = t.schema, e.n = 1, av({
					value: n,
					schema: r
				});
				case 1:
					if ((u = e.v).success) {
						e.n = 2;
						break;
					}
					throw cs.wrap({
						value: n,
						cause: u.error
					});
				case 2: return e.a(2, u.value);
			}
		}, e);
	})), uv.apply(this, arguments);
}
function av(e) {
	return iv.apply(this, arguments);
}
function iv() {
	return iv = r(m().m(function e(t) {
		var n, r, u, a, i;
		return m().w(function(e) {
			for (;;) switch (e.p = e.n) {
				case 0:
					if (n = t.value, r = t.schema, u = nv(r), e.p = 1, null != u.validate) {
						e.n = 2;
						break;
					}
					return e.a(2, {
						success: !0,
						value: n,
						rawValue: n
					});
				case 2: return e.n = 3, u.validate(n);
				case 3: return a = e.v, e.a(2, a.success ? {
					success: !0,
					value: a.value,
					rawValue: n
				} : {
					success: !1,
					error: cs.wrap({
						value: n,
						cause: a.error
					}),
					rawValue: n
				});
				case 4: return e.p = 4, i = e.v, e.a(2, {
					success: !1,
					error: cs.wrap({
						value: n,
						cause: i
					}),
					rawValue: n
				});
			}
		}, e, null, [[1, 4]]);
	})), iv.apply(this, arguments);
}
function ov(e) {
	return sv.apply(this, arguments);
}
function sv() {
	return sv = r(m().m(function e(t) {
		var n, r, u, a, i;
		return m().w(function(e) {
			for (;;) switch (e.p = e.n) {
				case 0:
					if (n = t.text, r = t.schema, e.p = 1, u = function(e) {
						var t = Error.stackTraceLimit;
						try {
							Error.stackTraceLimit = 0;
						} catch (t) {
							return ev(e);
						}
						try {
							return ev(e);
						} finally {
							Error.stackTraceLimit = t;
						}
					}(n), null != r) {
						e.n = 2;
						break;
					}
					a = {
						success: !0,
						value: u,
						rawValue: u
					}, e.n = 4;
					break;
				case 2: return e.n = 3, av({
					value: u,
					schema: r
				});
				case 3: a = e.v;
				case 4: return e.a(2, a);
				case 5: return e.p = 5, i = e.v, e.a(2, {
					success: !1,
					error: us.isInstance(i) ? i : new us({
						text: n,
						cause: i
					}),
					rawValue: void 0
				});
			}
		}, e, null, [[1, 5]]);
	})), sv.apply(this, arguments);
}
function cv(e) {
	return lv.apply(this, arguments);
}
function lv() {
	return lv = r(m().m(function e(t) {
		return m().w(function(e) {
			for (;;) if (0 === e.n) return e.a(2, ("function" == typeof t && (t = t()), Promise.resolve(t)));
		}, e);
	})), lv.apply(this, arguments);
}
var fv = function(e, t) {
	for (var n = 0; n < e.length && n < t.length && e[n] === t[n]; n++);
	return [(e.length - n).toString()].concat(F(t.slice(n))).join("/");
}, dv = Symbol("Let zodToJsonSchema decide on which parser to use"), pv = {
	name: void 0,
	$refStrategy: "root",
	basePath: ["#"],
	effectStrategy: "input",
	pipeStrategy: "all",
	dateStrategy: "format:date-time",
	mapStrategy: "entries",
	removeAdditionalStrategy: "passthrough",
	allowedAdditionalProperties: !0,
	rejectedAdditionalProperties: !1,
	definitionPath: "definitions",
	strictUnions: !1,
	definitions: {},
	errorMessages: !1,
	patternStrategy: "escape",
	applyRegexFlags: !1,
	emailStrategy: "format:email",
	base64Strategy: "contentEncoding:base64",
	nameStrategy: "ref"
};
function hv(e, t) {
	return Mv(e.type._def, t);
}
function vv(e, t, n) {
	var r = null != n ? n : t.dateStrategy;
	if (Array.isArray(r)) return { anyOf: r.map(function(n, r) {
		return vv(e, t, n);
	}) };
	switch (r) {
		case "string":
		case "format:date-time": return {
			type: "string",
			format: "date-time"
		};
		case "format:date": return {
			type: "string",
			format: "date"
		};
		case "integer": return mv(e);
	}
}
var mv = function(e) {
	var t, n = {
		type: "integer",
		format: "unix-time"
	}, r = s(e.checks);
	try {
		for (r.s(); !(t = r.n()).done;) {
			var u = t.value;
			switch (u.kind) {
				case "min":
					n.minimum = u.value;
					break;
				case "max": n.maximum = u.value;
			}
		}
	} catch (e) {
		r.e(e);
	} finally {
		r.f();
	}
	return n;
}, Dv = void 0, yv = /^[cC][^\s-]{8,}$/, gv = /^[0-9a-z]+$/, Fv = /^[0-9A-HJKMNP-TV-Z]{26}$/, Ev = /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/, bv = function() {
	return void 0 === Dv && (Dv = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u")), Dv;
}, _v = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, kv = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Cv = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Av = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, wv = /^[a-zA-Z0-9_-]{21}$/, Sv = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
function xv(e, t) {
	var n = { type: "string" };
	if (e.checks) {
		var r, u = s(e.checks);
		try {
			for (u.s(); !(r = u.n()).done;) {
				var a = r.value;
				switch (a.kind) {
					case "min":
						n.minLength = "number" == typeof n.minLength ? Math.max(n.minLength, a.value) : a.value;
						break;
					case "max":
						n.maxLength = "number" == typeof n.maxLength ? Math.min(n.maxLength, a.value) : a.value;
						break;
					case "email":
						switch (t.emailStrategy) {
							case "format:email":
								Iv(n, "email", a.message, t);
								break;
							case "format:idn-email":
								Iv(n, "idn-email", a.message, t);
								break;
							case "pattern:zod": Tv(n, Ev, a.message, t);
						}
						break;
					case "url":
						Iv(n, "uri", a.message, t);
						break;
					case "uuid":
						Iv(n, "uuid", a.message, t);
						break;
					case "regex":
						Tv(n, a.regex, a.message, t);
						break;
					case "cuid":
						Tv(n, yv, a.message, t);
						break;
					case "cuid2":
						Tv(n, gv, a.message, t);
						break;
					case "startsWith":
						Tv(n, RegExp("^".concat(Ov(a.value, t))), a.message, t);
						break;
					case "endsWith":
						Tv(n, RegExp("".concat(Ov(a.value, t), "$")), a.message, t);
						break;
					case "datetime":
						Iv(n, "date-time", a.message, t);
						break;
					case "date":
						Iv(n, "date", a.message, t);
						break;
					case "time":
						Iv(n, "time", a.message, t);
						break;
					case "duration":
						Iv(n, "duration", a.message, t);
						break;
					case "length":
						n.minLength = "number" == typeof n.minLength ? Math.max(n.minLength, a.value) : a.value, n.maxLength = "number" == typeof n.maxLength ? Math.min(n.maxLength, a.value) : a.value;
						break;
					case "includes":
						Tv(n, RegExp(Ov(a.value, t)), a.message, t);
						break;
					case "ip":
						"v6" !== a.version && Iv(n, "ipv4", a.message, t), "v4" !== a.version && Iv(n, "ipv6", a.message, t);
						break;
					case "base64url":
						Tv(n, Av, a.message, t);
						break;
					case "jwt":
						Tv(n, Sv, a.message, t);
						break;
					case "cidr":
						"v6" !== a.version && Tv(n, _v, a.message, t), "v4" !== a.version && Tv(n, kv, a.message, t);
						break;
					case "emoji":
						Tv(n, bv(), a.message, t);
						break;
					case "ulid":
						Tv(n, Fv, a.message, t);
						break;
					case "base64":
						switch (t.base64Strategy) {
							case "format:binary":
								Iv(n, "binary", a.message, t);
								break;
							case "contentEncoding:base64":
								n.contentEncoding = "base64";
								break;
							case "pattern:zod": Tv(n, Cv, a.message, t);
						}
						break;
					case "nanoid": Tv(n, wv, a.message, t);
				}
			}
		} catch (e) {
			u.e(e);
		} finally {
			u.f();
		}
	}
	return n;
}
function Ov(e, t) {
	return "escape" === t.patternStrategy ? function(e) {
		for (var t = "", n = 0; n < e.length; n++) Bv.has(e[n]) || (t += "\\"), t += e[n];
		return t;
	}(e) : e;
}
var Bv = /* @__PURE__ */ new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
function Iv(e, t, n, r) {
	var u;
	e.format || (null == (u = e.anyOf) ? void 0 : u.some(function(e) {
		return e.format;
	})) ? (e.anyOf || (e.anyOf = []), e.format && (e.anyOf.push({ format: e.format }), delete e.format), e.anyOf.push(h({ format: t }, n && r.errorMessages && { errorMessage: { format: n } }))) : e.format = t;
}
function Tv(e, t, n, r) {
	var u;
	e.pattern || (null == (u = e.allOf) ? void 0 : u.some(function(e) {
		return e.pattern;
	})) ? (e.allOf || (e.allOf = []), e.pattern && (e.allOf.push({ pattern: e.pattern }), delete e.pattern), e.allOf.push(h({ pattern: Pv(t, r) }, n && r.errorMessages && { errorMessage: { pattern: n } }))) : e.pattern = Pv(t, r);
}
function Pv(e, t) {
	var n;
	if (!t.applyRegexFlags || !e.flags) return e.source;
	for (var r = e.flags.includes("i"), u = e.flags.includes("m"), a = e.flags.includes("s"), i = r ? e.source.toLowerCase() : e.source, o = "", s = !1, c = !1, l = !1, f = 0; f < i.length; f++) if (s) o += i[f], s = !1;
	else {
		if (r) {
			if (c) {
				if (i[f].match(/[a-z]/)) {
					l ? (o += i[f], o += "".concat(i[f - 2], "-").concat(i[f]).toUpperCase(), l = !1) : "-" === i[f + 1] && (null == (n = i[f + 2]) ? void 0 : n.match(/[a-z]/)) ? (o += i[f], l = !0) : o += "".concat(i[f]).concat(i[f].toUpperCase());
					continue;
				}
			} else if (i[f].match(/[a-z]/)) {
				o += "[".concat(i[f]).concat(i[f].toUpperCase(), "]");
				continue;
			}
		}
		if (u) {
			if ("^" === i[f]) {
				o += "(^|(?<=[\r\n]))";
				continue;
			}
			if ("$" === i[f]) {
				o += "($|(?=[\r\n]))";
				continue;
			}
		}
		a && "." === i[f] ? o += c ? "".concat(i[f], "\r\n") : "[".concat(i[f], "\r\n]") : (o += i[f], "\\" === i[f] ? s = !0 : c && "]" === i[f] ? c = !1 : c || "[" !== i[f] || (c = !0));
	}
	try {
		new RegExp(o);
	} catch (n) {
		return console.warn("Could not convert regex pattern at ".concat(t.currentPath.join("/"), " to a flag-independent form! Falling back to the flag-ignorant source")), e.source;
	}
	return o;
}
function jv(e, t) {
	var n, r, u, a, i, o, s = {
		type: "object",
		additionalProperties: null != (n = Mv(e.valueType._def, h(h({}, t), {}, { currentPath: [].concat(F(t.currentPath), ["additionalProperties"]) }))) ? n : t.allowedAdditionalProperties
	};
	if ((null == (r = e.keyType) ? void 0 : r._def.typeName) === qh.ZodString && (null == (u = e.keyType._def.checks) ? void 0 : u.length)) {
		var c = xv(e.keyType._def, t);
		c.type;
		var l = v(c, Ut);
		return h(h({}, s), {}, { propertyNames: l });
	}
	if ((null == (a = e.keyType) ? void 0 : a._def.typeName) === qh.ZodEnum) return h(h({}, s), {}, { propertyNames: { enum: e.keyType._def.values } });
	if ((null == (i = e.keyType) ? void 0 : i._def.typeName) === qh.ZodBranded && e.keyType._def.type._def.typeName === qh.ZodString && (null == (o = e.keyType._def.type._def.checks) ? void 0 : o.length)) {
		var f = hv(e.keyType._def, t);
		f.type;
		var d = v(f, Ht);
		return h(h({}, s), {}, { propertyNames: d });
	}
	return s;
}
var Nv = {
	ZodString: "string",
	ZodNumber: "number",
	ZodBigInt: "integer",
	ZodBoolean: "boolean",
	ZodNull: "null"
};
function zv(e) {
	try {
		return e.isOptional();
	} catch (e) {
		return !0;
	}
}
var Rv = function(e, t, n) {
	switch (t) {
		case qh.ZodString: return xv(e, n);
		case qh.ZodNumber: return function(e) {
			var t = { type: "number" };
			if (!e.checks) return t;
			var n, r = s(e.checks);
			try {
				for (r.s(); !(n = r.n()).done;) {
					var u = n.value;
					switch (u.kind) {
						case "int":
							t.type = "integer";
							break;
						case "min":
							u.inclusive ? t.minimum = u.value : t.exclusiveMinimum = u.value;
							break;
						case "max":
							u.inclusive ? t.maximum = u.value : t.exclusiveMaximum = u.value;
							break;
						case "multipleOf": t.multipleOf = u.value;
					}
				}
			} catch (e) {
				r.e(e);
			} finally {
				r.f();
			}
			return t;
		}(e);
		case qh.ZodObject: return function(e, t) {
			var n = {
				type: "object",
				properties: {}
			}, r = [], u = e.shape();
			for (var a in u) {
				var i = u[a];
				if (void 0 !== i && void 0 !== i._def) {
					var o = zv(i), s = Mv(i._def, h(h({}, t), {}, {
						currentPath: [].concat(F(t.currentPath), ["properties", a]),
						propertyPath: [].concat(F(t.currentPath), ["properties", a])
					}));
					void 0 !== s && (n.properties[a] = s, o || r.push(a));
				}
			}
			r.length && (n.required = r);
			var c = function(e, t) {
				if ("ZodNever" !== e.catchall._def.typeName) return Mv(e.catchall._def, h(h({}, t), {}, { currentPath: [].concat(F(t.currentPath), ["additionalProperties"]) }));
				switch (e.unknownKeys) {
					case "passthrough": return t.allowedAdditionalProperties;
					case "strict": return t.rejectedAdditionalProperties;
					case "strip": return "strict" === t.removeAdditionalStrategy ? t.allowedAdditionalProperties : t.rejectedAdditionalProperties;
				}
			}(e, t);
			return void 0 !== c && (n.additionalProperties = c), n;
		}(e, n);
		case qh.ZodBigInt: return function(e) {
			var t = {
				type: "integer",
				format: "int64"
			};
			if (!e.checks) return t;
			var n, r = s(e.checks);
			try {
				for (r.s(); !(n = r.n()).done;) {
					var u = n.value;
					switch (u.kind) {
						case "min":
							u.inclusive ? t.minimum = u.value : t.exclusiveMinimum = u.value;
							break;
						case "max":
							u.inclusive ? t.maximum = u.value : t.exclusiveMaximum = u.value;
							break;
						case "multipleOf": t.multipleOf = u.value;
					}
				}
			} catch (e) {
				r.e(e);
			} finally {
				r.f();
			}
			return t;
		}(e);
		case qh.ZodBoolean: return { type: "boolean" };
		case qh.ZodDate: return vv(e, n);
		case qh.ZodUndefined: return { not: {} };
		case qh.ZodNull: return { type: "null" };
		case qh.ZodArray: return function(e, t) {
			var n, r, u, a = { type: "array" };
			return null != (n = e.type) && n._def && (null == (u = null == (r = e.type) ? void 0 : r._def) ? void 0 : u.typeName) !== qh.ZodAny && (a.items = Mv(e.type._def, h(h({}, t), {}, { currentPath: [].concat(F(t.currentPath), ["items"]) }))), e.minLength && (a.minItems = e.minLength.value), e.maxLength && (a.maxItems = e.maxLength.value), e.exactLength && (a.minItems = e.exactLength.value, a.maxItems = e.exactLength.value), a;
		}(e, n);
		case qh.ZodUnion:
		case qh.ZodDiscriminatedUnion: return function(e, t) {
			var n = e.options instanceof Map ? Array.from(e.options.values()) : e.options;
			if (n.every(function(e) {
				return e._def.typeName in Nv && (!e._def.checks || !e._def.checks.length);
			})) {
				var r = n.reduce(function(e, t) {
					var n = Nv[t._def.typeName];
					return n && !e.includes(n) ? [].concat(F(e), [n]) : e;
				}, []);
				return { type: r.length > 1 ? r : r[0] };
			}
			if (n.every(function(e) {
				return "ZodLiteral" === e._def.typeName && !e.description;
			})) {
				var u = n.reduce(function(e, t) {
					var n = b(t._def.value);
					switch (n) {
						case "string":
						case "number":
						case "boolean": return [].concat(F(e), [n]);
						case "bigint": return [].concat(F(e), ["integer"]);
						case "object": if (null === t._def.value) return [].concat(F(e), ["null"]);
						default: return e;
					}
				}, []);
				if (u.length === n.length) {
					var a = u.filter(function(e, t, n) {
						return n.indexOf(e) === t;
					});
					return {
						type: a.length > 1 ? a : a[0],
						enum: n.reduce(function(e, t) {
							return e.includes(t._def.value) ? e : [].concat(F(e), [t._def.value]);
						}, [])
					};
				}
			} else if (n.every(function(e) {
				return "ZodEnum" === e._def.typeName;
			})) return {
				type: "string",
				enum: n.reduce(function(e, t) {
					return [].concat(F(e), F(t._def.values.filter(function(t) {
						return !e.includes(t);
					})));
				}, [])
			};
			return function(e, t) {
				var n = (e.options instanceof Map ? Array.from(e.options.values()) : e.options).map(function(e, n) {
					return Mv(e._def, h(h({}, t), {}, { currentPath: [].concat(F(t.currentPath), ["anyOf", "".concat(n)]) }));
				}).filter(function(e) {
					return !!e && (!t.strictUnions || "object" == b(e) && Object.keys(e).length > 0);
				});
				return n.length ? { anyOf: n } : void 0;
			}(e, t);
		}(e, n);
		case qh.ZodIntersection: return function(e, t) {
			var n = [Mv(e.left._def, h(h({}, t), {}, { currentPath: [].concat(F(t.currentPath), ["allOf", "0"]) })), Mv(e.right._def, h(h({}, t), {}, { currentPath: [].concat(F(t.currentPath), ["allOf", "1"]) }))].filter(function(e) {
				return !!e;
			}), r = [];
			return n.forEach(function(e) {
				if ("type" in (n = e) && "string" === n.type || !("allOf" in n)) {
					var t = e;
					if ("additionalProperties" in e && !1 === e.additionalProperties) e.additionalProperties, t = v(e, Vt);
					r.push(t);
				} else r.push.apply(r, F(e.allOf));
				var n;
			}), r.length ? { allOf: r } : void 0;
		}(e, n);
		case qh.ZodTuple: return function(e, t) {
			return e.rest ? {
				type: "array",
				minItems: e.items.length,
				items: e.items.map(function(e, n) {
					return Mv(e._def, h(h({}, t), {}, { currentPath: [].concat(F(t.currentPath), ["items", "".concat(n)]) }));
				}).reduce(function(e, t) {
					return void 0 === t ? e : [].concat(F(e), [t]);
				}, []),
				additionalItems: Mv(e.rest._def, h(h({}, t), {}, { currentPath: [].concat(F(t.currentPath), ["additionalItems"]) }))
			} : {
				type: "array",
				minItems: e.items.length,
				maxItems: e.items.length,
				items: e.items.map(function(e, n) {
					return Mv(e._def, h(h({}, t), {}, { currentPath: [].concat(F(t.currentPath), ["items", "".concat(n)]) }));
				}).reduce(function(e, t) {
					return void 0 === t ? e : [].concat(F(e), [t]);
				}, [])
			};
		}(e, n);
		case qh.ZodRecord: return jv(e, n);
		case qh.ZodLiteral: return function(e) {
			var t = b(e.value);
			return "bigint" !== t && "number" !== t && "boolean" !== t && "string" !== t ? { type: Array.isArray(e.value) ? "array" : "object" } : {
				type: "bigint" === t ? "integer" : t,
				const: e.value
			};
		}(e);
		case qh.ZodEnum: return function(e) {
			return {
				type: "string",
				enum: Array.from(e.values)
			};
		}(e);
		case qh.ZodNativeEnum: return function(e) {
			var t = e.values, n = Object.keys(e.values).filter(function(e) {
				return "number" != typeof t[t[e]];
			}).map(function(e) {
				return t[e];
			}), r = Array.from(new Set(n.map(function(e) {
				return b(e);
			})));
			return {
				type: 1 === r.length ? "string" === r[0] ? "string" : "number" : ["string", "number"],
				enum: n
			};
		}(e);
		case qh.ZodNullable: return function(e, t) {
			if ([
				"ZodString",
				"ZodNumber",
				"ZodBigInt",
				"ZodBoolean",
				"ZodNull"
			].includes(e.innerType._def.typeName) && (!e.innerType._def.checks || !e.innerType._def.checks.length)) return { type: [Nv[e.innerType._def.typeName], "null"] };
			var n = Mv(e.innerType._def, h(h({}, t), {}, { currentPath: [].concat(F(t.currentPath), ["anyOf", "0"]) }));
			return n && { anyOf: [n, { type: "null" }] };
		}(e, n);
		case qh.ZodOptional: return function(e, t) {
			var n;
			if (t.currentPath.toString() === (null == (n = t.propertyPath) ? void 0 : n.toString())) return Mv(e.innerType._def, t);
			var r = Mv(e.innerType._def, h(h({}, t), {}, { currentPath: [].concat(F(t.currentPath), ["anyOf", "1"]) }));
			return r ? { anyOf: [{ not: {} }, r] } : {};
		}(e, n);
		case qh.ZodMap: return function(e, t) {
			return "record" === t.mapStrategy ? jv(e, t) : {
				type: "array",
				maxItems: 125,
				items: {
					type: "array",
					items: [Mv(e.keyType._def, h(h({}, t), {}, { currentPath: [].concat(F(t.currentPath), [
						"items",
						"items",
						"0"
					]) })) || {}, Mv(e.valueType._def, h(h({}, t), {}, { currentPath: [].concat(F(t.currentPath), [
						"items",
						"items",
						"1"
					]) })) || {}],
					minItems: 2,
					maxItems: 2
				}
			};
		}(e, n);
		case qh.ZodSet: return function(e, t) {
			var n = {
				type: "array",
				uniqueItems: !0,
				items: Mv(e.valueType._def, h(h({}, t), {}, { currentPath: [].concat(F(t.currentPath), ["items"]) }))
			};
			return e.minSize && (n.minItems = e.minSize.value), e.maxSize && (n.maxItems = e.maxSize.value), n;
		}(e, n);
		case qh.ZodLazy: return function() {
			return e.getter()._def;
		};
		case qh.ZodPromise: return function(e, t) {
			return Mv(e.type._def, t);
		}(e, n);
		case qh.ZodNaN:
		case qh.ZodNever: return { not: {} };
		case qh.ZodEffects: return function(e, t) {
			return "input" === t.effectStrategy ? Mv(e.schema._def, t) : {};
		}(e, n);
		case qh.ZodAny:
		case qh.ZodUnknown: return {};
		case qh.ZodDefault: return function(e, t) {
			return h(h({}, Mv(e.innerType._def, t)), {}, { default: e.defaultValue() });
		}(e, n);
		case qh.ZodBranded: return hv(e, n);
		case qh.ZodReadonly:
		case qh.ZodCatch: return function(e, t) {
			return Mv(e.innerType._def, t);
		}(e, n);
		case qh.ZodPipeline: return function(e, t) {
			if ("input" === t.pipeStrategy) return Mv(e.in._def, t);
			if ("output" === t.pipeStrategy) return Mv(e.out._def, t);
			var n = Mv(e.in._def, h(h({}, t), {}, { currentPath: [].concat(F(t.currentPath), ["allOf", "0"]) }));
			return { allOf: [n, Mv(e.out._def, h(h({}, t), {}, { currentPath: [].concat(F(t.currentPath), ["allOf", n ? "1" : "0"]) }))].filter(function(e) {
				return void 0 !== e;
			}) };
		}(e, n);
		case qh.ZodFunction:
		case qh.ZodVoid:
		case qh.ZodSymbol:
		default: return;
	}
};
function Mv(e, t) {
	var n, r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], u = t.seen.get(e);
	if (t.override) {
		var a = null == (n = t.override) ? void 0 : n.call(t, e, t, u, r);
		if (a !== dv) return a;
	}
	if (u && !r) {
		var i = Zv(u, t);
		if (void 0 !== i) return i;
	}
	var o = {
		def: e,
		path: t.currentPath,
		jsonSchema: void 0
	};
	t.seen.set(e, o);
	var s = Rv(e, e.typeName, t), c = "function" == typeof s ? Mv(s(), t) : s;
	if (c && Lv(e, t, c), t.postProcess) {
		var l = t.postProcess(c, e, t);
		return o.jsonSchema = c, l;
	}
	return o.jsonSchema = c, c;
}
var Zv = function(e, t) {
	switch (t.$refStrategy) {
		case "root": return { $ref: e.path.join("/") };
		case "relative": return { $ref: fv(t.currentPath, e.path) };
		case "none":
		case "seen": return e.path.length < t.currentPath.length && e.path.every(function(e, n) {
			return t.currentPath[n] === e;
		}) ? (console.warn("Recursive reference detected at ".concat(t.currentPath.join("/"), "! Defaulting to any")), {}) : "seen" === t.$refStrategy ? {} : void 0;
	}
}, Lv = function(e, t, n) {
	return e.description && (n.description = e.description), n;
}, $v = function(e, t) {
	var n, r = function(e) {
		var t = function(e) {
			return "string" == typeof e ? h(h({}, pv), {}, { name: e }) : h(h({}, pv), e);
		}(e), n = void 0 !== t.name ? [].concat(F(t.basePath), [t.definitionPath, t.name]) : t.basePath;
		return h(h({}, t), {}, {
			currentPath: n,
			propertyPath: void 0,
			seen: new Map(Object.entries(t.definitions).map(function(e) {
				var n = g(e, 2), r = n[0], u = n[1];
				return [u._def, {
					def: u._def,
					path: [].concat(F(t.basePath), [t.definitionPath, r]),
					jsonSchema: void 0
				}];
			}))
		});
	}(t), u = "object" == b(t) && t.definitions ? Object.entries(t.definitions).reduce(function(e, t) {
		var n, u = g(t, 2), a = u[0], i = u[1];
		return h(h({}, e), {}, c({}, a, null != (n = Mv(i._def, h(h({}, r), {}, { currentPath: [].concat(F(r.basePath), [r.definitionPath, a]) }), !0)) ? n : {}));
	}, {}) : void 0, a = "string" == typeof t ? t : "title" === (null == t ? void 0 : t.nameStrategy) || null == t ? void 0 : t.name, i = null != (n = Mv(e._def, void 0 === a ? r : h(h({}, r), {}, { currentPath: [].concat(F(r.basePath), [r.definitionPath, a]) }), !1)) ? n : {}, o = "object" == b(t) && void 0 !== t.name && "title" === t.nameStrategy ? t.name : void 0;
	void 0 !== o && (i.title = o);
	var s = void 0 === a ? u ? h(h({}, i), {}, c({}, r.definitionPath, u)) : i : c({ $ref: [].concat(F("relative" === r.$refStrategy ? [] : r.basePath), [r.definitionPath, a]).join("/") }, r.definitionPath, h(h({}, u), {}, c({}, a, i)));
	return s.$schema = "http://json-schema.org/draft-07/schema#", s;
};
function qv(e, t) {
	return function(e) {
		return "_zod" in e;
	}(e) ? function(e) {
		return Hv(function() {
			return function(e, t) {
				if (e instanceof ff) {
					var n, r = new Tf(t), u = {}, a = an(e._idmap.entries());
					try {
						for (a.s(); !(n = a.n()).done;) {
							var i = yn(n.value, 2), o = (i[0], i[1]);
							r.process(o);
						}
					} catch (e) {
						a.e(e);
					} finally {
						a.f();
					}
					var s, c = {}, l = {
						registry: e,
						uri: null == t ? void 0 : t.uri,
						defs: u
					}, f = an(e._idmap.entries());
					try {
						for (f.s(); !(s = f.n()).done;) {
							var d = yn(s.value, 2), p = d[0], h = d[1];
							c[p] = r.emit(h, pn(pn({}, t), {}, { external: l }));
						}
					} catch (e) {
						f.e(e);
					} finally {
						f.f();
					}
					if (Object.keys(u).length > 0) c.__shared = on({}, "draft-2020-12" === r.target ? "$defs" : "definitions", u);
					return { schemas: c };
				}
				var m = new Tf(t);
				return m.process(e), m.emit(e, t);
			}(e, {
				target: "draft-7",
				io: "output",
				reused: "inline"
			});
		}, { validate: (t = r(m().m(function t(n) {
			var r;
			return m().w(function(t) {
				for (;;) switch (t.n) {
					case 0: return t.n = 1, Uf(e, n);
					case 1: return r = t.v, t.a(2, r.success ? {
						success: !0,
						value: r.data
					} : {
						success: !1,
						error: r.error
					});
				}
			}, t);
		})), function(e) {
			return t.apply(this, arguments);
		}) });
		var t;
	}(e) : function(e) {
		return Hv(function() {
			return $v(e, { $refStrategy: "none" });
		}, { validate: (t = r(m().m(function t(n) {
			var r;
			return m().w(function(t) {
				for (;;) switch (t.n) {
					case 0: return t.n = 1, e.safeParseAsync(n);
					case 1: return r = t.v, t.a(2, r.success ? {
						success: !0,
						value: r.data
					} : {
						success: !1,
						error: r.error
					});
				}
			}, t);
		})), function(e) {
			return t.apply(this, arguments);
		}) });
		var t;
	}(e);
}
var Uv = Symbol.for("vercel.ai.schema");
function Hv(e) {
	var t = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).validate;
	return c(function(e, t, n, r) {
		var u = {
			configurable: !0,
			enumerable: !0
		};
		return u[e] = r, Object.defineProperty(t, n, u);
	}("get", c(c(c({}, Uv, !0), "_type", void 0), tv, !0), "jsonSchema", function() {
		return "function" == typeof e && (e = e()), e;
	}), "validate", t);
}
var Vv, Wv = Object.defineProperty, Kv = "AI_NoObjectGeneratedError", Jv = "vercel.ai.error.".concat(Kv), Qv = Symbol.for(Jv), Gv = function() {
	function e(t) {
		var n, r = t.message, i = void 0 === r ? "No object generated." : r, o = t.cause, s = t.text, c = t.response, l = t.usage, f = t.finishReason;
		return a(this, e), (n = u(this, e, [{
			name: Kv,
			message: i,
			cause: o
		}]))[Vv] = !0, n.text = s, n.response = c, n.usage = l, n.finishReason = f, n;
	}
	return f(e, Wo), o(e, null, [{
		key: "isInstance",
		value: function(e) {
			return Wo.hasMarker(e, Jv);
		}
	}]);
}();
Vv = Qv;
var Yv = "5.0.93", Xv = Ld([
	nd(),
	pp(Uint8Array),
	pp(ArrayBuffer),
	dp(function(e) {
		var t, n;
		return null != (n = null == (t = globalThis.Buffer) ? void 0 : t.isBuffer(e)) && n;
	}, { message: "Must be a Buffer" })
]), em = new lp({
	type: "lazy",
	getter: function() {
		return Ld([
			Od(),
			nd(),
			kd(),
			Sd(),
			Hd(nd(), em),
			Nd(em)
		]);
	}
}), tm = Hd(nd(), Hd(nd(), em)), nm = Rd({
	type: Jd("text"),
	text: nd(),
	providerOptions: tm.optional()
}), rm = Rd({
	type: Jd("image"),
	image: Ld([Xv, pp(URL)]),
	mediaType: nd().optional(),
	providerOptions: tm.optional()
}), um = Rd({
	type: Jd("file"),
	data: Ld([Xv, pp(URL)]),
	filename: nd().optional(),
	mediaType: nd(),
	providerOptions: tm.optional()
}), am = Rd({
	type: Jd("reasoning"),
	text: nd(),
	providerOptions: tm.optional()
}), im = Rd({
	type: Jd("tool-call"),
	toolCallId: nd(),
	toolName: nd(),
	input: Id(),
	providerOptions: tm.optional(),
	providerExecuted: Sd().optional()
}), om = new $d(pn({
	type: "union",
	options: [
		Rd({
			type: Jd("text"),
			value: nd()
		}),
		Rd({
			type: Jd("json"),
			value: em
		}),
		Rd({
			type: Jd("error-text"),
			value: nd()
		}),
		Rd({
			type: Jd("error-json"),
			value: em
		}),
		Rd({
			type: Jd("content"),
			value: Nd(Ld([Rd({
				type: Jd("text"),
				text: nd()
			}), Rd({
				type: Jd("media"),
				data: nd(),
				mediaType: nd()
			})]))
		})
	],
	discriminator: "type"
}, Ns(void 0))), sm = Rd({
	type: Jd("tool-result"),
	toolCallId: nd(),
	toolName: nd(),
	output: om,
	providerOptions: tm.optional()
});
Ld([
	Rd({
		role: Jd("system"),
		content: nd(),
		providerOptions: tm.optional()
	}),
	Rd({
		role: Jd("user"),
		content: Ld([nd(), Nd(Ld([
			nm,
			rm,
			um
		]))]),
		providerOptions: tm.optional()
	}),
	Rd({
		role: Jd("assistant"),
		content: Ld([nd(), Nd(Ld([
			nm,
			um,
			am,
			im,
			sm
		]))]),
		providerOptions: tm.optional()
	}),
	Rd({
		role: Jd("tool"),
		content: Nd(sm),
		providerOptions: tm.optional()
	})
]), Wh({
	prefix: "aitxt",
	size: 24
}), TransformStream;
var dm = function() {
	var e;
	return function() {
		return null == e && (e = qv(Ld([
			Md({
				type: Jd("text-start"),
				id: nd(),
				providerMetadata: tm.optional()
			}),
			Md({
				type: Jd("text-delta"),
				id: nd(),
				delta: nd(),
				providerMetadata: tm.optional()
			}),
			Md({
				type: Jd("text-end"),
				id: nd(),
				providerMetadata: tm.optional()
			}),
			Md({
				type: Jd("error"),
				errorText: nd()
			}),
			Md({
				type: Jd("tool-input-start"),
				toolCallId: nd(),
				toolName: nd(),
				providerExecuted: Sd().optional(),
				dynamic: Sd().optional()
			}),
			Md({
				type: Jd("tool-input-delta"),
				toolCallId: nd(),
				inputTextDelta: nd()
			}),
			Md({
				type: Jd("tool-input-available"),
				toolCallId: nd(),
				toolName: nd(),
				input: Id(),
				providerExecuted: Sd().optional(),
				providerMetadata: tm.optional(),
				dynamic: Sd().optional()
			}),
			Md({
				type: Jd("tool-input-error"),
				toolCallId: nd(),
				toolName: nd(),
				input: Id(),
				providerExecuted: Sd().optional(),
				providerMetadata: tm.optional(),
				dynamic: Sd().optional(),
				errorText: nd()
			}),
			Md({
				type: Jd("tool-output-available"),
				toolCallId: nd(),
				output: Id(),
				providerExecuted: Sd().optional(),
				dynamic: Sd().optional(),
				preliminary: Sd().optional()
			}),
			Md({
				type: Jd("tool-output-error"),
				toolCallId: nd(),
				errorText: nd(),
				providerExecuted: Sd().optional(),
				dynamic: Sd().optional()
			}),
			Md({
				type: Jd("reasoning-start"),
				id: nd(),
				providerMetadata: tm.optional()
			}),
			Md({
				type: Jd("reasoning-delta"),
				id: nd(),
				delta: nd(),
				providerMetadata: tm.optional()
			}),
			Md({
				type: Jd("reasoning-end"),
				id: nd(),
				providerMetadata: tm.optional()
			}),
			Md({
				type: Jd("source-url"),
				sourceId: nd(),
				url: nd(),
				title: nd().optional(),
				providerMetadata: tm.optional()
			}),
			Md({
				type: Jd("source-document"),
				sourceId: nd(),
				mediaType: nd(),
				title: nd(),
				filename: nd().optional(),
				providerMetadata: tm.optional()
			}),
			Md({
				type: Jd("file"),
				url: nd(),
				mediaType: nd(),
				providerMetadata: tm.optional()
			}),
			Md({
				type: dp(function(e) {
					return "string" == typeof e && e.startsWith("data-");
				}, { message: "Type must start with \"data-\"" }),
				id: nd().optional(),
				data: Id(),
				transient: Sd().optional()
			}),
			Md({ type: Jd("start-step") }),
			Md({ type: Jd("finish-step") }),
			Md({
				type: Jd("start"),
				messageId: nd().optional(),
				messageMetadata: Id().optional()
			}),
			Md({
				type: Jd("finish"),
				finishReason: Wd([
					"stop",
					"length",
					"content-filter",
					"tool-calls",
					"error",
					"other",
					"unknown"
				]).optional(),
				messageMetadata: Id().optional()
			}),
			Md({ type: Jd("abort") }),
			Md({
				type: Jd("message-metadata"),
				messageMetadata: Id()
			})
		]))), e;
	};
}();
function pm(e, t) {
	if (void 0 !== e || void 0 !== t) {
		if (void 0 === e) return t;
		if (void 0 === t) return e;
		var n = h({}, e);
		for (var r in t) if (Object.prototype.hasOwnProperty.call(t, r)) {
			var u = t[r];
			if (void 0 === u) continue;
			var a = r in e ? e[r] : void 0, i = !(null === u || "object" != b(u) || Array.isArray(u) || u instanceof Date || u instanceof RegExp), o = !(null == a || "object" != b(a) || Array.isArray(a) || a instanceof Date || a instanceof RegExp);
			n[r] = i && o ? pm(a, u) : u;
		}
		return n;
	}
}
function hm(e) {
	var t = ["ROOT"], n = -1, r = null;
	function u(e, u, a) {
		switch (e) {
			case "\"":
				n = u, t.pop(), t.push(a), t.push("INSIDE_STRING");
				break;
			case "f":
			case "t":
			case "n":
				n = u, r = u, t.pop(), t.push(a), t.push("INSIDE_LITERAL");
				break;
			case "-":
				t.pop(), t.push(a), t.push("INSIDE_NUMBER");
				break;
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
				n = u, t.pop(), t.push(a), t.push("INSIDE_NUMBER");
				break;
			case "{":
				n = u, t.pop(), t.push(a), t.push("INSIDE_OBJECT_START");
				break;
			case "[": n = u, t.pop(), t.push(a), t.push("INSIDE_ARRAY_START");
		}
	}
	function a(e, r) {
		switch (e) {
			case ",":
				t.pop(), t.push("INSIDE_OBJECT_AFTER_COMMA");
				break;
			case "}": n = r, t.pop();
		}
	}
	function i(e, r) {
		switch (e) {
			case ",":
				t.pop(), t.push("INSIDE_ARRAY_AFTER_COMMA");
				break;
			case "]": n = r, t.pop();
		}
	}
	for (var o = 0; o < e.length; o++) {
		var s = e[o];
		switch (t[t.length - 1]) {
			case "ROOT":
				u(s, o, "FINISH");
				break;
			case "INSIDE_OBJECT_START":
				switch (s) {
					case "\"":
						t.pop(), t.push("INSIDE_OBJECT_KEY");
						break;
					case "}": n = o, t.pop();
				}
				break;
			case "INSIDE_OBJECT_AFTER_COMMA":
				"\"" === s && (t.pop(), t.push("INSIDE_OBJECT_KEY"));
				break;
			case "INSIDE_OBJECT_KEY":
				"\"" === s && (t.pop(), t.push("INSIDE_OBJECT_AFTER_KEY"));
				break;
			case "INSIDE_OBJECT_AFTER_KEY":
				":" === s && (t.pop(), t.push("INSIDE_OBJECT_BEFORE_VALUE"));
				break;
			case "INSIDE_OBJECT_BEFORE_VALUE":
				u(s, o, "INSIDE_OBJECT_AFTER_VALUE");
				break;
			case "INSIDE_OBJECT_AFTER_VALUE":
				a(s, o);
				break;
			case "INSIDE_STRING":
				switch (s) {
					case "\"":
						t.pop(), n = o;
						break;
					case "\\":
						t.push("INSIDE_STRING_ESCAPE");
						break;
					default: n = o;
				}
				break;
			case "INSIDE_ARRAY_START":
				"]" === s ? (n = o, t.pop()) : (n = o, u(s, o, "INSIDE_ARRAY_AFTER_VALUE"));
				break;
			case "INSIDE_ARRAY_AFTER_VALUE":
				switch (s) {
					case ",":
						t.pop(), t.push("INSIDE_ARRAY_AFTER_COMMA");
						break;
					case "]":
						n = o, t.pop();
						break;
					default: n = o;
				}
				break;
			case "INSIDE_ARRAY_AFTER_COMMA":
				u(s, o, "INSIDE_ARRAY_AFTER_VALUE");
				break;
			case "INSIDE_STRING_ESCAPE":
				t.pop(), n = o;
				break;
			case "INSIDE_NUMBER":
				switch (s) {
					case "0":
					case "1":
					case "2":
					case "3":
					case "4":
					case "5":
					case "6":
					case "7":
					case "8":
					case "9":
						n = o;
						break;
					case "e":
					case "E":
					case "-":
					case ".": break;
					case ",":
						t.pop(), "INSIDE_ARRAY_AFTER_VALUE" === t[t.length - 1] && i(s, o), "INSIDE_OBJECT_AFTER_VALUE" === t[t.length - 1] && a(s, o);
						break;
					case "}":
						t.pop(), "INSIDE_OBJECT_AFTER_VALUE" === t[t.length - 1] && a(s, o);
						break;
					case "]":
						t.pop(), "INSIDE_ARRAY_AFTER_VALUE" === t[t.length - 1] && i(s, o);
						break;
					default: t.pop();
				}
				break;
			case "INSIDE_LITERAL":
				var c = e.substring(r, o + 1);
				"false".startsWith(c) || "true".startsWith(c) || "null".startsWith(c) ? n = o : (t.pop(), "INSIDE_OBJECT_AFTER_VALUE" === t[t.length - 1] ? a(s, o) : "INSIDE_ARRAY_AFTER_VALUE" === t[t.length - 1] && i(s, o));
		}
	}
	for (var l = e.slice(0, n + 1), f = t.length - 1; f >= 0; f--) switch (t[f]) {
		case "INSIDE_STRING":
			l += "\"";
			break;
		case "INSIDE_OBJECT_KEY":
		case "INSIDE_OBJECT_AFTER_KEY":
		case "INSIDE_OBJECT_AFTER_COMMA":
		case "INSIDE_OBJECT_START":
		case "INSIDE_OBJECT_BEFORE_VALUE":
		case "INSIDE_OBJECT_AFTER_VALUE":
			l += "}";
			break;
		case "INSIDE_ARRAY_START":
		case "INSIDE_ARRAY_AFTER_COMMA":
		case "INSIDE_ARRAY_AFTER_VALUE":
			l += "]";
			break;
		case "INSIDE_LITERAL":
			var d = e.substring(r, e.length);
			"true".startsWith(d) ? l += "true".slice(d.length) : "false".startsWith(d) ? l += "false".slice(d.length) : "null".startsWith(d) && (l += "null".slice(d.length));
	}
	return l;
}
function vm(e) {
	return mm.apply(this, arguments);
}
function mm() {
	return mm = r(m().m(function e(t) {
		var n, r;
		return m().w(function(e) {
			for (;;) switch (e.n) {
				case 0:
					if (void 0 !== t) {
						e.n = 1;
						break;
					}
					return e.a(2, {
						value: void 0,
						state: "undefined-input"
					});
				case 1: return e.n = 2, ov({ text: t });
				case 2:
					if (!(n = e.v).success) {
						e.n = 3;
						break;
					}
					r = {
						value: n.value,
						state: "successful-parse"
					}, e.n = 5;
					break;
				case 3: return e.n = 4, ov({ text: hm(t) });
				case 4: n = e.v, r = n.success ? {
					value: n.value,
					state: "repaired-parse"
				} : {
					value: void 0,
					state: "failed-parse"
				};
				case 5: return e.a(2, r);
			}
		}, e);
	})), mm.apply(this, arguments);
}
function Dm(e) {
	return e.type.startsWith("tool-");
}
function ym(e) {
	return Dm(e) || function(e) {
		return "dynamic-tool" === e.type;
	}(e);
}
function gm(e) {
	return e.type.split("-").slice(1).join("-");
}
function Fm(e) {
	var t = e.lastMessage, n = e.messageId;
	return {
		message: "assistant" === (null == t ? void 0 : t.role) ? t : {
			id: n,
			metadata: void 0,
			role: "assistant",
			parts: []
		},
		activeTextParts: {},
		activeReasoningParts: {},
		partialToolCalls: {}
	};
}
function Em(e) {
	var t = e.stream, n = e.messageMetadataSchema, u = e.dataPartSchemas, a = e.runUpdateMessageJob, i = e.onError, o = e.onToolCall, s = e.onData;
	return t.pipeThrough(new TransformStream({ transform: function(e, t) {
		return r(m().m(function c() {
			return m().w(function(c) {
				for (;;) switch (c.n) {
					case 0: return c.n = 1, a(function() {
						var a = r(m().m(function a(c) {
							var l, f, d, p, v, D, y, g, F, E, b, _, k, C, A, w, S, x, O, B, I, T, P, j, N, z, R, M, Z;
							return m().w(function(a) {
								for (;;) switch (a.n) {
									case 0:
										_ = function() {
											return _ = r(m().m(function e(t) {
												var r;
												return m().w(function(e) {
													for (;;) switch (e.n) {
														case 0:
															if (null == t) {
																e.n = 2;
																break;
															}
															if (r = null != l.message.metadata ? pm(l.message.metadata, t) : t, !(null != n)) {
																e.n = 1;
																break;
															}
															return e.n = 1, rv({
																value: r,
																schema: n
															});
														case 1: l.message.metadata = r;
														case 2: return e.a(2);
													}
												}, e);
											})), _.apply(this, arguments);
										}, b = function(e) {
											return _.apply(this, arguments);
										}, E = function(e) {
											var t, n, r = l.message.parts.find(function(t) {
												return "dynamic-tool" === t.type && t.toolCallId === e.toolCallId;
											}), u = e, a = r;
											null != r ? (r.state = e.state, a.toolName = e.toolName, a.input = u.input, a.output = u.output, a.errorText = u.errorText, a.rawInput = null != (t = u.rawInput) ? t : a.rawInput, a.preliminary = u.preliminary, a.providerExecuted = null != (n = u.providerExecuted) ? n : r.providerExecuted, null != u.providerMetadata && "input-available" === r.state && (r.callProviderMetadata = u.providerMetadata)) : l.message.parts.push(h({
												type: "dynamic-tool",
												toolName: e.toolName,
												toolCallId: e.toolCallId,
												state: e.state,
												input: u.input,
												output: u.output,
												errorText: u.errorText,
												preliminary: u.preliminary,
												providerExecuted: u.providerExecuted
											}, null != u.providerMetadata ? { callProviderMetadata: u.providerMetadata } : {}));
										}, F = function(e) {
											var t, n = l.message.parts.find(function(t) {
												return Dm(t) && t.toolCallId === e.toolCallId;
											}), r = e, u = n;
											null != n ? (n.state = e.state, u.input = r.input, u.output = r.output, u.errorText = r.errorText, u.rawInput = r.rawInput, u.preliminary = r.preliminary, u.providerExecuted = null != (t = r.providerExecuted) ? t : n.providerExecuted, null != r.providerMetadata && "input-available" === n.state && (n.callProviderMetadata = r.providerMetadata)) : l.message.parts.push(h({
												type: "tool-".concat(e.toolName),
												toolCallId: e.toolCallId,
												state: e.state,
												input: r.input,
												output: r.output,
												rawInput: r.rawInput,
												errorText: r.errorText,
												providerExecuted: r.providerExecuted,
												preliminary: r.preliminary
											}, null != r.providerMetadata ? { callProviderMetadata: r.providerMetadata } : {}));
										}, g = function(e) {
											var t = l.message.parts.filter(function(e) {
												return "dynamic-tool" === e.type;
											}).find(function(t) {
												return t.toolCallId === e;
											});
											if (null == t) throw new Error("tool-output-error must be preceded by a tool-input-available");
											return t;
										}, y = function(e) {
											var t = l.message.parts.filter(Dm).find(function(t) {
												return t.toolCallId === e;
											});
											if (null == t) throw new Error("tool-output-error must be preceded by a tool-input-available");
											return t;
										}, l = c.state, f = c.write, Z = e.type, a.n = "text-start" === Z ? 1 : "text-delta" === Z ? 2 : "text-end" === Z ? 3 : "reasoning-start" === Z ? 4 : "reasoning-delta" === Z ? 5 : "reasoning-end" === Z ? 6 : "file" === Z ? 7 : "source-url" === Z ? 8 : "source-document" === Z ? 9 : "tool-input-start" === Z ? 10 : "tool-input-delta" === Z ? 11 : "tool-input-available" === Z ? 13 : "tool-input-error" === Z ? 15 : "tool-output-available" === Z ? 16 : "tool-output-error" === Z ? 17 : "start-step" === Z ? 18 : "finish-step" === Z ? 19 : "start" === Z ? 20 : "finish" === Z ? 22 : "message-metadata" === Z ? 24 : "error" === Z ? 26 : 27;
										break;
									case 1: return k = {
										type: "text",
										text: "",
										providerMetadata: e.providerMetadata,
										state: "streaming"
									}, l.activeTextParts[e.id] = k, l.message.parts.push(k), f(), a.a(3, 30);
									case 2: return (C = l.activeTextParts[e.id]).text += e.delta, C.providerMetadata = null != (d = e.providerMetadata) ? d : C.providerMetadata, f(), a.a(3, 30);
									case 3: return (A = l.activeTextParts[e.id]).state = "done", A.providerMetadata = null != (p = e.providerMetadata) ? p : A.providerMetadata, delete l.activeTextParts[e.id], f(), a.a(3, 30);
									case 4: return w = {
										type: "reasoning",
										text: "",
										providerMetadata: e.providerMetadata,
										state: "streaming"
									}, l.activeReasoningParts[e.id] = w, l.message.parts.push(w), f(), a.a(3, 30);
									case 5: return (S = l.activeReasoningParts[e.id]).text += e.delta, S.providerMetadata = null != (v = e.providerMetadata) ? v : S.providerMetadata, f(), a.a(3, 30);
									case 6: return (x = l.activeReasoningParts[e.id]).providerMetadata = null != (D = e.providerMetadata) ? D : x.providerMetadata, x.state = "done", delete l.activeReasoningParts[e.id], f(), a.a(3, 30);
									case 7: return l.message.parts.push({
										type: "file",
										mediaType: e.mediaType,
										url: e.url
									}), f(), a.a(3, 30);
									case 8: return l.message.parts.push({
										type: "source-url",
										sourceId: e.sourceId,
										url: e.url,
										title: e.title,
										providerMetadata: e.providerMetadata
									}), f(), a.a(3, 30);
									case 9: return l.message.parts.push({
										type: "source-document",
										sourceId: e.sourceId,
										mediaType: e.mediaType,
										title: e.title,
										filename: e.filename,
										providerMetadata: e.providerMetadata
									}), f(), a.a(3, 30);
									case 10: return O = l.message.parts.filter(Dm), l.partialToolCalls[e.toolCallId] = {
										text: "",
										toolName: e.toolName,
										index: O.length,
										dynamic: e.dynamic
									}, e.dynamic ? E({
										toolCallId: e.toolCallId,
										toolName: e.toolName,
										state: "input-streaming",
										input: void 0,
										providerExecuted: e.providerExecuted
									}) : F({
										toolCallId: e.toolCallId,
										toolName: e.toolName,
										state: "input-streaming",
										input: void 0,
										providerExecuted: e.providerExecuted
									}), f(), a.a(3, 30);
									case 11: return (B = l.partialToolCalls[e.toolCallId]).text += e.inputTextDelta, a.n = 12, vm(B.text);
									case 12: return I = a.v, T = I.value, B.dynamic ? E({
										toolCallId: e.toolCallId,
										toolName: B.toolName,
										state: "input-streaming",
										input: T
									}) : F({
										toolCallId: e.toolCallId,
										toolName: B.toolName,
										state: "input-streaming",
										input: T
									}), f(), a.a(3, 30);
									case 13:
										if (e.dynamic ? E({
											toolCallId: e.toolCallId,
											toolName: e.toolName,
											state: "input-available",
											input: e.input,
											providerExecuted: e.providerExecuted,
											providerMetadata: e.providerMetadata
										}) : F({
											toolCallId: e.toolCallId,
											toolName: e.toolName,
											state: "input-available",
											input: e.input,
											providerExecuted: e.providerExecuted,
											providerMetadata: e.providerMetadata
										}), f(), !(o && !e.providerExecuted)) {
											a.n = 14;
											break;
										}
										return a.n = 14, o({ toolCall: e });
									case 14: return a.a(3, 30);
									case 15: return e.dynamic ? E({
										toolCallId: e.toolCallId,
										toolName: e.toolName,
										state: "output-error",
										input: e.input,
										errorText: e.errorText,
										providerExecuted: e.providerExecuted,
										providerMetadata: e.providerMetadata
									}) : F({
										toolCallId: e.toolCallId,
										toolName: e.toolName,
										state: "output-error",
										input: void 0,
										rawInput: e.input,
										errorText: e.errorText,
										providerExecuted: e.providerExecuted,
										providerMetadata: e.providerMetadata
									}), f(), a.a(3, 30);
									case 16: return e.dynamic ? (P = g(e.toolCallId), E({
										toolCallId: e.toolCallId,
										toolName: P.toolName,
										state: "output-available",
										input: P.input,
										output: e.output,
										preliminary: e.preliminary
									})) : (j = y(e.toolCallId), F({
										toolCallId: e.toolCallId,
										toolName: gm(j),
										state: "output-available",
										input: j.input,
										output: e.output,
										providerExecuted: e.providerExecuted,
										preliminary: e.preliminary
									})), f(), a.a(3, 30);
									case 17: return e.dynamic ? (N = g(e.toolCallId), E({
										toolCallId: e.toolCallId,
										toolName: N.toolName,
										state: "output-error",
										input: N.input,
										errorText: e.errorText,
										providerExecuted: e.providerExecuted
									})) : (z = y(e.toolCallId), F({
										toolCallId: e.toolCallId,
										toolName: gm(z),
										state: "output-error",
										input: z.input,
										rawInput: z.rawInput,
										errorText: e.errorText,
										providerExecuted: e.providerExecuted
									})), f(), a.a(3, 30);
									case 18: return l.message.parts.push({ type: "step-start" }), a.a(3, 30);
									case 19: return l.activeTextParts = {}, l.activeReasoningParts = {}, a.a(3, 30);
									case 20: return null != e.messageId && (l.message.id = e.messageId), a.n = 21, b(e.messageMetadata);
									case 21: return null == e.messageId && null == e.messageMetadata || f(), a.a(3, 30);
									case 22: return null != e.finishReason && (l.finishReason = e.finishReason), a.n = 23, b(e.messageMetadata);
									case 23: return null != e.messageMetadata && f(), a.a(3, 30);
									case 24: return a.n = 25, b(e.messageMetadata);
									case 25: return null != e.messageMetadata && f(), a.a(3, 30);
									case 26: return null == i || i(new Error(e.errorText)), a.a(3, 30);
									case 27:
										if (!function(e) {
											return e.type.startsWith("data-");
										}(e)) {
											a.n = 30;
											break;
										}
										if (!(null != (null == u ? void 0 : u[e.type]))) {
											a.n = 28;
											break;
										}
										return a.n = 28, rv({
											value: e.data,
											schema: u[e.type]
										});
									case 28:
										if (!(R = e).transient) {
											a.n = 29;
											break;
										}
										return null == s || s(R), a.a(3, 30);
									case 29: M = null != R.id ? l.message.parts.find(function(e) {
										return R.type === e.type && R.id === e.id;
									}) : void 0, null != M ? M.data = R.data : l.message.parts.push(R), null == s || s(R), f();
									case 30: t.enqueue(e);
									case 31: return a.a(2);
								}
							}, a);
						}));
						return function(e) {
							return a.apply(this, arguments);
						};
					}());
					case 1: return c.a(2);
				}
			}, c);
		}))();
	} }));
}
Wh({
	prefix: "aitxt",
	size: 24
}), Wh({
	prefix: "aiobj",
	size: 24
});
var bm = function() {
	return o(function e() {
		a(this, e), this.queue = [], this.isProcessing = !1;
	}, [{
		key: "processQueue",
		value: (t = r(m().m(function e() {
			return m().w(function(e) {
				for (;;) switch (e.n) {
					case 0:
						if (this.isProcessing) {
							e.n = 5;
							break;
						}
						this.isProcessing = !0;
					case 1:
						if (!(this.queue.length > 0)) {
							e.n = 4;
							break;
						}
						return e.n = 2, this.queue[0]();
					case 2: this.queue.shift();
					case 3:
						e.n = 1;
						break;
					case 4: this.isProcessing = !1;
					case 5: return e.a(2);
				}
			}, e, this);
		})), function() {
			return t.apply(this, arguments);
		})
	}, {
		key: "run",
		value: (e = r(m().m(function e(t) {
			var n = this;
			return m().w(function(e) {
				for (;;) if (0 === e.n) return e.a(2, new Promise(function(e, u) {
					n.queue.push(r(m().m(function n() {
						var r;
						return m().w(function(n) {
							for (;;) switch (n.p = n.n) {
								case 0: return n.p = 0, n.n = 1, t();
								case 1:
									e(), n.n = 3;
									break;
								case 2: n.p = 2, r = n.v, u(r);
								case 3: return n.a(2);
							}
						}, n, null, [[0, 2]]);
					}))), n.processQueue();
				}));
			}, e);
		})), function(t) {
			return e.apply(this, arguments);
		})
	}]);
	var e, t;
}();
Wh({
	prefix: "aiobj",
	size: 24
}), function(e, t) {
	for (var n in t) Wv(e, n, {
		get: t[n],
		enumerable: !0
	});
}({}, {
	object: function() {
		return Am;
	},
	text: function() {
		return Cm;
	}
});
var _m, km, Cm = function() {
	return {
		type: "text",
		responseFormat: { type: "text" },
		parsePartial: (t = r(m().m(function e(t) {
			var n;
			return m().w(function(e) {
				for (;;) if (0 === e.n) return n = t.text, e.a(2, { partial: n });
			}, e);
		})), function(e) {
			return t.apply(this, arguments);
		}),
		parseOutput: (e = r(m().m(function e(t) {
			var n;
			return m().w(function(e) {
				for (;;) if (0 === e.n) return n = t.text, e.a(2, n);
			}, e);
		})), function(t) {
			return e.apply(this, arguments);
		})
	};
	var e, t;
}, Am = function(e) {
	var t = function(e) {
		return null == e ? Hv({
			properties: {},
			additionalProperties: !1
		}) : "object" == b(t = e) && null !== t && Uv in t && !0 === t[Uv] && "jsonSchema" in t && "validate" in t ? e : "function" == typeof e ? e() : qv(e);
		var t;
	}(e.schema);
	return {
		type: "object",
		responseFormat: {
			type: "json",
			schema: t.jsonSchema
		},
		parsePartial: function(e) {
			return r(m().m(function t() {
				var n, r, u, a;
				return m().w(function(t) {
					for (;;) switch (t.n) {
						case 0: return n = e.text, t.n = 1, vm(n);
						case 1:
							r = t.v, a = r.state, t.n = "failed-parse" === a || "undefined-input" === a ? 2 : "repaired-parse" === a || "successful-parse" === a ? 3 : 4;
							break;
						case 2:
						case 5: return t.a(2);
						case 3: return t.a(2, { partial: r.value });
						case 4: throw u = r.state, new Error("Unsupported parse state: ".concat(u));
					}
				}, t);
			}))();
		},
		parseOutput: function(e, n) {
			return r(m().m(function r() {
				var u, a, i;
				return m().w(function(r) {
					for (;;) switch (r.n) {
						case 0: return u = e.text, r.n = 1, ov({ text: u });
						case 1:
							if ((a = r.v).success) {
								r.n = 2;
								break;
							}
							throw new Gv({
								message: "No object generated: could not parse the response.",
								cause: a.error,
								text: u,
								response: n.response,
								usage: n.usage,
								finishReason: n.finishReason
							});
						case 2: return r.n = 3, av({
							value: a.value,
							schema: t
						});
						case 3:
							if ((i = r.v).success) {
								r.n = 4;
								break;
							}
							throw new Gv({
								message: "No object generated: response did not match schema.",
								cause: i.error,
								text: u,
								response: n.response,
								usage: n.usage,
								finishReason: n.finishReason
							});
						case 4: return r.a(2, i.value);
					}
				}, r);
			}))();
		}
	};
}, wm = function() {
	return o(function e(t) {
		var n = t.api, r = void 0 === n ? "/api/chat" : n, u = t.credentials, i = t.headers, o = t.body, s = t.fetch, c = t.prepareSendMessagesRequest, l = t.prepareReconnectToStreamRequest;
		a(this, e), this.api = r, this.credentials = u, this.headers = i, this.body = o, this.fetch = s, this.prepareSendMessagesRequest = c, this.prepareReconnectToStreamRequest = l;
	}, [{
		key: "sendMessages",
		value: (t = r(m().m(function e(t) {
			var n, r, u, a, i, o, s, c, l, f, d, p, D, y, g, F, E, b, _, k;
			return m().w(function(e) {
				for (;;) switch (e.n) {
					case 0: return n = t.abortSignal, r = v(t, Wt), e.n = 1, cv(this.body);
					case 1: return c = e.v, e.n = 2, cv(this.headers);
					case 2: return l = e.v, e.n = 3, cv(this.credentials);
					case 3: return f = e.v, d = h(h({}, Qh(l)), Qh(r.headers)), e.n = 4, null == (u = this.prepareSendMessagesRequest) ? void 0 : u.call(this, {
						api: this.api,
						id: r.chatId,
						messages: r.messages,
						body: h(h({}, c), r.body),
						headers: d,
						credentials: f,
						requestMetadata: r.metadata,
						trigger: r.trigger,
						messageId: r.messageId
					});
					case 4: return p = e.v, D = null != (a = null == p ? void 0 : p.api) ? a : this.api, y = void 0 !== (null == p ? void 0 : p.headers) ? Qh(p.headers) : d, g = void 0 !== (null == p ? void 0 : p.body) ? p.body : h(h(h({}, c), r.body), {}, {
						id: r.chatId,
						messages: r.messages,
						trigger: r.trigger,
						messageId: r.messageId
					}), F = null != (i = null == p ? void 0 : p.credentials) ? i : f, E = null != (o = this.fetch) ? o : globalThis.fetch, e.n = 5, E(D, {
						method: "POST",
						headers: Gh(h({ "Content-Type": "application/json" }, y), "ai-sdk/".concat(Yv), Jh()),
						body: JSON.stringify(g),
						credentials: F,
						signal: n
					});
					case 5:
						if ((b = e.v).ok) {
							e.n = 9;
							break;
						}
						return _ = Error, e.n = 6, b.text();
					case 6:
						if (null == (s = e.v)) {
							e.n = 7;
							break;
						}
						k = s, e.n = 8;
						break;
					case 7: k = "Failed to fetch the chat response.";
					case 8: throw new _(k);
					case 9:
						if (b.body) {
							e.n = 10;
							break;
						}
						throw new Error("The response body is empty.");
					case 10: return e.a(2, this.processResponseStream(b.body));
				}
			}, e, this);
		})), function(e) {
			return t.apply(this, arguments);
		})
	}, {
		key: "reconnectToStream",
		value: (e = r(m().m(function e(t) {
			var n, r, u, a, i, o, s, c, l, f, d, p, v, D, y, g, F;
			return m().w(function(e) {
				for (;;) switch (e.n) {
					case 0: return e.n = 1, cv(this.body);
					case 1: return o = e.v, e.n = 2, cv(this.headers);
					case 2: return s = e.v, e.n = 3, cv(this.credentials);
					case 3: return c = e.v, l = h(h({}, Qh(s)), Qh(t.headers)), e.n = 4, null == (n = this.prepareReconnectToStreamRequest) ? void 0 : n.call(this, {
						api: this.api,
						id: t.chatId,
						body: h(h({}, o), t.body),
						headers: l,
						credentials: c,
						requestMetadata: t.metadata
					});
					case 4: return f = e.v, d = null != (r = null == f ? void 0 : f.api) ? r : "".concat(this.api, "/").concat(t.chatId, "/stream"), p = void 0 !== (null == f ? void 0 : f.headers) ? Qh(f.headers) : l, v = null != (u = null == f ? void 0 : f.credentials) ? u : c, D = null != (a = this.fetch) ? a : globalThis.fetch, e.n = 5, D(d, {
						method: "GET",
						headers: Gh(p, "ai-sdk/".concat(Yv), Jh()),
						credentials: v
					});
					case 5:
						if (204 !== (y = e.v).status) {
							e.n = 6;
							break;
						}
						return e.a(2, null);
					case 6:
						if (y.ok) {
							e.n = 10;
							break;
						}
						return g = Error, e.n = 7, y.text();
					case 7:
						if (null == (i = e.v)) {
							e.n = 8;
							break;
						}
						F = i, e.n = 9;
						break;
					case 8: F = "Failed to fetch the chat response.";
					case 9: throw new g(F);
					case 10:
						if (y.body) {
							e.n = 11;
							break;
						}
						throw new Error("The response body is empty.");
					case 11: return e.a(2, this.processResponseStream(y.body));
				}
			}, e, this);
		})), function(t) {
			return e.apply(this, arguments);
		})
	}]);
	var e, t;
}(), Sm = function() {
	function e() {
		var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
		return a(this, e), u(this, e, [t]);
	}
	return f(e, wm), o(e, [{
		key: "processResponseStream",
		value: function(e) {
			return function(e) {
				var t = e.schema;
				return e.stream.pipeThrough(new TextDecoderStream()).pipeThrough(new ds()).pipeThrough(new TransformStream({ transform: function(e, n) {
					return r(m().m(function r() {
						var u, a;
						return m().w(function(r) {
							for (;;) switch (r.n) {
								case 0:
									if (u = e.data, !("[DONE]" !== u)) {
										r.n = 2;
										break;
									}
									return a = n, r.n = 1, ov({
										text: u,
										schema: t
									});
								case 1: a.enqueue.call(a, r.v);
								case 2: return r.a(2);
							}
						}, r);
					}))();
				} }));
			}({
				stream: e,
				schema: dm
			}).pipeThrough(new TransformStream({ transform: function(e, t) {
				return r(m().m(function n() {
					return m().w(function(n) {
						for (;;) switch (n.n) {
							case 0:
								if (e.success) {
									n.n = 1;
									break;
								}
								throw e.error;
							case 1: t.enqueue(e.value);
							case 2: return n.a(2);
						}
					}, n);
				}))();
			} }));
		}
	}]);
}(), xm = function() {
	return o(function e(t) {
		var n = this, u = t.generateId, i = void 0 === u ? Kh : u, o = t.id, s = void 0 === o ? i() : o, c = t.transport, l = void 0 === c ? new Sm() : c, f = t.messageMetadataSchema, d = t.dataPartSchemas, p = t.state, D = t.onError, y = t.onToolCall, g = t.onFinish, E = t.onData, b = t.sendAutomaticallyWhen;
		a(this, e), this.activeResponse = void 0, this.jobExecutor = new bm(), this.sendMessage = function() {
			var e = r(m().m(function e(t, u) {
				var a, i, o, s, c, l, f;
				return m().w(function(e) {
					for (;;) switch (e.n) {
						case 0:
							if (null != t) {
								e.n = 2;
								break;
							}
							return e.n = 1, n.makeRequest(h({
								trigger: "submit-message",
								messageId: null == (a = n.lastMessage) ? void 0 : a.id
							}, u));
						case 1: return e.a(2, void e.v);
						case 2:
							if (!("text" in t) && !("files" in t)) {
								e.n = 6;
								break;
							}
							if (!Array.isArray(t.files)) {
								e.n = 3;
								break;
							}
							f = t.files, e.n = 5;
							break;
						case 3: return e.n = 4, function() {
							var e = r(m().m(function e(t) {
								return m().w(function(e) {
									for (;;) switch (e.n) {
										case 0:
											if (null != t) {
												e.n = 1;
												break;
											}
											return e.a(2, []);
										case 1:
											if (globalThis.FileList && t instanceof globalThis.FileList) {
												e.n = 2;
												break;
											}
											throw new Error("FileList is not supported in the current environment");
										case 2: return e.a(2, Promise.all(Array.from(t).map(function() {
											var e = r(m().m(function e(t) {
												var n, r, u, a, i;
												return m().w(function(e) {
													for (;;) switch (e.n) {
														case 0: return n = t.name, r = t.type, u = r, a = n, e.n = 1, new Promise(function(e, n) {
															var r = new FileReader();
															r.onload = function(t) {
																var n;
																e(null == (n = t.target) ? void 0 : n.result);
															}, r.onerror = function(e) {
																return n(e);
															}, r.readAsDataURL(t);
														});
														case 1: return i = e.v, e.a(2, {
															type: "file",
															mediaType: u,
															filename: a,
															url: i
														});
													}
												}, e);
											}));
											return function(t) {
												return e.apply(this, arguments);
											};
										}())));
									}
								}, e);
							}));
							return function(t) {
								return e.apply(this, arguments);
							};
						}()(t.files);
						case 4: f = e.v;
						case 5:
							c = { parts: [].concat(F(f), F("text" in t && null != t.text ? [{
								type: "text",
								text: t.text
							}] : [])) }, e.n = 7;
							break;
						case 6: c = t;
						case 7:
							if (null == t.messageId) {
								e.n = 10;
								break;
							}
							if (l = n.state.messages.findIndex(function(e) {
								return e.id === t.messageId;
							}), -1 !== l) {
								e.n = 8;
								break;
							}
							throw new Error("message with id ".concat(t.messageId, " not found"));
						case 8:
							if ("user" === n.state.messages[l].role) {
								e.n = 9;
								break;
							}
							throw new Error("message with id ".concat(t.messageId, " is not a user message"));
						case 9:
							n.state.messages = n.state.messages.slice(0, l + 1), n.state.replaceMessage(l, h(h({}, c), {}, {
								id: t.messageId,
								role: null != (i = c.role) ? i : "user",
								metadata: t.metadata
							})), e.n = 11;
							break;
						case 10: n.state.pushMessage(h(h({}, c), {}, {
							id: null != (o = c.id) ? o : n.generateId(),
							role: null != (s = c.role) ? s : "user",
							metadata: t.metadata
						}));
						case 11: return e.n = 12, n.makeRequest(h({
							trigger: "submit-message",
							messageId: t.messageId
						}, u));
						case 12: return e.a(2);
					}
				}, e);
			}));
			return function(t, n) {
				return e.apply(this, arguments);
			};
		}(), this.regenerate = r(m().m(function e() {
			var t, r, u, a, i = arguments;
			return m().w(function(e) {
				for (;;) switch (e.n) {
					case 0:
						if (r = (t = i.length > 0 && void 0 !== i[0] ? i[0] : {}).messageId, u = v(t, Kt), a = null == r ? n.state.messages.length - 1 : n.state.messages.findIndex(function(e) {
							return e.id === r;
						}), -1 !== a) {
							e.n = 1;
							break;
						}
						throw new Error("message ".concat(r, " not found"));
					case 1: return n.state.messages = n.state.messages.slice(0, "assistant" === n.messages[a].role ? a : a + 1), e.n = 2, n.makeRequest(h({
						trigger: "regenerate-message",
						messageId: r
					}, u));
					case 2: return e.a(2);
				}
			}, e);
		})), this.resumeStream = r(m().m(function e() {
			var t, r = arguments;
			return m().w(function(e) {
				for (;;) switch (e.n) {
					case 0: return t = r.length > 0 && void 0 !== r[0] ? r[0] : {}, e.n = 1, n.makeRequest(h({ trigger: "resume-stream" }, t));
					case 1: return e.a(2);
				}
			}, e);
		})), this.clearError = function() {
			"error" === n.status && (n.state.error = void 0, n.setStatus({ status: "ready" }));
		}, this.addToolOutput = function() {
			var e = r(m().m(function e(t) {
				var u, a, i, o, s;
				return m().w(function(e) {
					for (;;) if (0 === e.n) return u = t.state, a = void 0 === u ? "output-available" : u, t.tool, i = t.toolCallId, o = t.output, s = t.errorText, e.a(2, n.jobExecutor.run(r(m().m(function e() {
						var t, r, u, c;
						return m().w(function(e) {
							for (;;) switch (e.n) {
								case 0: u = n.state.messages, c = u[u.length - 1], n.state.replaceMessage(u.length - 1, h(h({}, c), {}, { parts: c.parts.map(function(e) {
									return ym(e) && e.toolCallId === i ? h(h({}, e), {}, {
										state: a,
										output: o,
										errorText: s
									}) : e;
								}) })), n.activeResponse && (n.activeResponse.state.message.parts = n.activeResponse.state.message.parts.map(function(e) {
									return ym(e) && e.toolCallId === i ? h(h({}, e), {}, {
										state: a,
										output: o,
										errorText: s
									}) : e;
								})), "streaming" !== n.status && "submitted" !== n.status && null != (t = n.sendAutomaticallyWhen) && t.call(n, { messages: n.state.messages }) && n.makeRequest({
									trigger: "submit-message",
									messageId: null == (r = n.lastMessage) ? void 0 : r.id
								});
								case 1: return e.a(2);
							}
						}, e);
					}))));
				}, e);
			}));
			return function(t) {
				return e.apply(this, arguments);
			};
		}(), this.addToolResult = this.addToolOutput, this.stop = r(m().m(function e() {
			var t;
			return m().w(function(e) {
				for (;;) switch (e.n) {
					case 0: "streaming" !== n.status && "submitted" !== n.status || null != (t = n.activeResponse) && t.abortController && n.activeResponse.abortController.abort();
					case 1: return e.a(2);
				}
			}, e);
		})), this.id = s, this.transport = l, this.generateId = i, this.messageMetadataSchema = f, this.dataPartSchemas = d, this.state = p, this.onError = D, this.onToolCall = y, this.onFinish = g, this.onData = E, this.sendAutomaticallyWhen = b;
	}, [
		{
			key: "status",
			get: function() {
				return this.state.status;
			}
		},
		{
			key: "setStatus",
			value: function(e) {
				var t = e.status, n = e.error;
				this.status !== t && (this.state.status = t, this.state.error = n);
			}
		},
		{
			key: "error",
			get: function() {
				return this.state.error;
			}
		},
		{
			key: "messages",
			get: function() {
				return this.state.messages;
			},
			set: function(e) {
				this.state.messages = e;
			}
		},
		{
			key: "lastMessage",
			get: function() {
				return this.state.messages[this.state.messages.length - 1];
			}
		},
		{
			key: "makeRequest",
			value: (e = r(m().m(function e(t) {
				var n, u, a, i, o, s, c, l, f, d, p, h, v, D, y, g, F, E, b = this;
				return m().w(function(e) {
					for (;;) switch (e.p = e.n) {
						case 0:
							if (n = t.trigger, u = t.metadata, a = t.headers, i = t.body, o = t.messageId, this.setStatus({
								status: "submitted",
								error: void 0
							}), d = this.lastMessage, p = !1, h = !1, v = !1, e.p = 1, (D = {
								state: Fm({
									lastMessage: this.state.snapshot(d),
									messageId: this.generateId()
								}),
								abortController: new AbortController()
							}).abortController.signal.addEventListener("abort", function() {
								p = !0;
							}), this.activeResponse = D, "resume-stream" !== n) {
								e.n = 4;
								break;
							}
							return e.n = 2, this.transport.reconnectToStream({
								chatId: this.id,
								metadata: u,
								headers: a,
								body: i
							});
						case 2:
							if (null != (g = e.v)) {
								e.n = 3;
								break;
							}
							return e.a(2, void this.setStatus({ status: "ready" }));
						case 3:
							y = g, e.n = 6;
							break;
						case 4: return e.n = 5, this.transport.sendMessages({
							chatId: this.id,
							messages: this.state.messages,
							abortSignal: D.abortController.signal,
							metadata: u,
							headers: a,
							body: i,
							trigger: n,
							messageId: o
						});
						case 5: y = e.v;
						case 6: return F = function(e) {
							return b.jobExecutor.run(function() {
								return e({
									state: D.state,
									write: function() {
										var e;
										b.setStatus({ status: "streaming" }), D.state.message.id === (null == (e = b.lastMessage) ? void 0 : e.id) ? b.state.replaceMessage(b.state.messages.length - 1, D.state.message) : b.state.pushMessage(D.state.message);
									}
								});
							});
						}, e.n = 7, function() {
							var e = r(m().m(function e(t) {
								var n, r, u, a;
								return m().w(function(e) {
									for (;;) switch (e.p = e.n) {
										case 0: n = t.stream, r = t.onError, u = n.getReader(), e.p = 1;
										case 2: return e.n = 3, u.read();
										case 3:
											if (!e.v.done) {
												e.n = 4;
												break;
											}
											return e.a(3, 5);
										case 4:
											e.n = 2;
											break;
										case 5:
											e.n = 7;
											break;
										case 6: e.p = 6, a = e.v, null == r || r(a);
										case 7: return e.p = 7, u.releaseLock(), e.f(7);
										case 8: return e.a(2);
									}
								}, e, null, [[
									1,
									6,
									7,
									8
								]]);
							}));
							return function(t) {
								return e.apply(this, arguments);
							};
						}()({
							stream: Em({
								stream: y,
								onToolCall: this.onToolCall,
								onData: this.onData,
								messageMetadataSchema: this.messageMetadataSchema,
								dataPartSchemas: this.dataPartSchemas,
								runUpdateMessageJob: F,
								onError: function(e) {
									throw e;
								}
							}),
							onError: function(e) {
								throw e;
							}
						});
						case 7:
							this.setStatus({ status: "ready" }), e.n = 10;
							break;
						case 8:
							if (e.p = 8, E = e.v, !p && "AbortError" !== E.name) {
								e.n = 9;
								break;
							}
							return e.a(2, (p = !0, this.setStatus({ status: "ready" }), null));
						case 9: v = !0, E instanceof TypeError && (E.message.toLowerCase().includes("fetch") || E.message.toLowerCase().includes("network")) && (h = !0), this.onError && E instanceof Error && this.onError(E), this.setStatus({
							status: "error",
							error: E
						});
						case 10:
							e.p = 10;
							try {
								null == (c = this.onFinish) || c.call(this, {
									message: this.activeResponse.state.message,
									messages: this.state.messages,
									isAbort: p,
									isDisconnect: h,
									isError: v,
									finishReason: null == (s = this.activeResponse) ? void 0 : s.state.finishReason
								});
							} catch (e) {
								console.error(e);
							}
							return this.activeResponse = void 0, e.f(10);
						case 11:
							if (!(null == (l = this.sendAutomaticallyWhen) ? void 0 : l.call(this, { messages: this.state.messages })) || v) {
								e.n = 12;
								break;
							}
							return e.n = 12, this.makeRequest({
								trigger: "submit-message",
								messageId: null == (f = this.lastMessage) ? void 0 : f.id,
								metadata: u,
								headers: a,
								body: i
							});
						case 12: return e.a(2);
					}
				}, e, this, [[
					1,
					8,
					10,
					11
				]]);
			})), function(t) {
				return e.apply(this, arguments);
			})
		}
	]);
	var e;
}();
function Om(e) {
	var t = e.messages, n = t[t.length - 1];
	if (!n) return !1;
	if ("assistant" !== n.role) return !1;
	var r = n.parts.reduce(function(e, t, n) {
		return "step-start" === t.type ? n : e;
	}, -1), u = n.parts.slice(r + 1).filter(ym).filter(function(e) {
		return !e.providerExecuted;
	});
	return u.length > 0 && u.every(function(e) {
		return "output-available" === e.state || "output-error" === e.state;
	});
}
var Bm, Im, Tm, Pm, jm, Nm, zm, Rm, Mm, Zm, Lm = function(e) {
	return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}((km || (km = 1, _m = function(e, t) {
	if ("function" != typeof e) throw new TypeError("Expected the first argument to be a `function`, got `".concat(En(e), "`."));
	var n, r = 0;
	return function() {
		for (var u = this, a = arguments.length, i = new Array(a), o = 0; o < a; o++) i[o] = arguments[o];
		clearTimeout(n);
		var s = Date.now(), c = t - (s - r);
		c <= 0 ? (r = s, e.apply(this, i)) : n = setTimeout(function() {
			r = Date.now(), e.apply(u, i);
		}, c);
	};
}), _m)), $m = function(e, t, n) {
	if (!t.has(e)) throw TypeError("Cannot " + n);
}, qm = function(e, t, n) {
	return $m(e, t, "read from private field"), n ? n.call(e) : t.get(e);
}, Um = function(e, t, n) {
	if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
	t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, Hm = function(e, t, n, r) {
	return $m(e, t, "write to private field"), t.set(e, n), n;
}, Vm = function() {
	return o(function e() {
		var t = this, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
		a(this, e), Um(this, Bm, void 0), Um(this, Im, "ready"), Um(this, Tm, void 0), Um(this, Pm, /* @__PURE__ */ new Set()), Um(this, jm, /* @__PURE__ */ new Set()), Um(this, Nm, /* @__PURE__ */ new Set()), this.pushMessage = function(e) {
			Hm(t, Bm, qm(t, Bm).concat(e)), qm(t, zm).call(t);
		}, this.popMessage = function() {
			Hm(t, Bm, qm(t, Bm).slice(0, -1)), qm(t, zm).call(t);
		}, this.replaceMessage = function(e, n) {
			Hm(t, Bm, [].concat(F(qm(t, Bm).slice(0, e)), [t.snapshot(n)], F(qm(t, Bm).slice(e + 1)))), qm(t, zm).call(t);
		}, this.snapshot = function(e) {
			return structuredClone(e);
		}, this["~registerMessagesCallback"] = function(e, n) {
			var r, u, a = n ? (r = e, null != (u = n) ? Lm(r, u) : r) : e;
			return qm(t, Pm).add(a), function() {
				qm(t, Pm).delete(a);
			};
		}, this["~registerStatusCallback"] = function(e) {
			return qm(t, jm).add(e), function() {
				qm(t, jm).delete(e);
			};
		}, this["~registerErrorCallback"] = function(e) {
			return qm(t, Nm).add(e), function() {
				qm(t, Nm).delete(e);
			};
		}, Um(this, zm, function() {
			qm(t, Pm).forEach(function(e) {
				return e();
			});
		}), Um(this, Rm, function() {
			qm(t, jm).forEach(function(e) {
				return e();
			});
		}), Um(this, Mm, function() {
			qm(t, Nm).forEach(function(e) {
				return e();
			});
		}), Hm(this, Bm, n);
	}, [
		{
			key: "status",
			get: function() {
				return qm(this, Im);
			},
			set: function(e) {
				Hm(this, Im, e), qm(this, Rm).call(this);
			}
		},
		{
			key: "error",
			get: function() {
				return qm(this, Tm);
			},
			set: function(e) {
				Hm(this, Tm, e), qm(this, Mm).call(this);
			}
		},
		{
			key: "messages",
			get: function() {
				return qm(this, Bm);
			},
			set: function(e) {
				Hm(this, Bm, F(e)), qm(this, zm).call(this);
			}
		}
	]);
}();
Bm = /* @__PURE__ */ new WeakMap(), Im = /* @__PURE__ */ new WeakMap(), Tm = /* @__PURE__ */ new WeakMap(), Pm = /* @__PURE__ */ new WeakMap(), jm = /* @__PURE__ */ new WeakMap(), Nm = /* @__PURE__ */ new WeakMap(), zm = /* @__PURE__ */ new WeakMap(), Rm = /* @__PURE__ */ new WeakMap(), Mm = /* @__PURE__ */ new WeakMap();
var Wm = function() {
	function e(n) {
		var r, i = n.messages, o = v(n, Jt);
		a(this, e);
		var s = new Vm(i);
		return r = u(this, e, [h(h({}, o), {}, { state: s })]), Um(t(r), Zm, void 0), r["~registerMessagesCallback"] = function(e, n) {
			return qm(t(r), Zm)["~registerMessagesCallback"](e, n);
		}, r["~registerStatusCallback"] = function(e) {
			return qm(t(r), Zm)["~registerStatusCallback"](e);
		}, r["~registerErrorCallback"] = function(e) {
			return qm(t(r), Zm)["~registerErrorCallback"](e);
		}, Hm(t(r), Zm, s), r;
	}
	return f(e, xm), o(e);
}();
Zm = /* @__PURE__ */ new WeakMap();
var Km = "askai_token", Jm = function(e) {
	return "https://".concat(e, ".algolia.net/agent-studio/1");
}, Qm = function(e) {
	if (!e) return !0;
	try {
		var n = function(e) {
			var t = yn(e.split("."), 1)[0];
			return JSON.parse(atob(t));
		}(e).exp;
		return Date.now() / 1e3 > n - 30;
	} catch (e) {
		return !0;
	}
}, Gm = null, Ym = function() {
	var e = Xt(vn().m(function e(t) {
		var n, r, u, a, i, o;
		return vn().w(function(e) {
			for (;;) switch (e.n) {
				case 0:
					if (n = t.assistantId, r = t.abortSignal, u = t.useStagingEnv, a = void 0 !== u && u, i = sessionStorage.getItem(Km), Qm(i)) {
						e.n = 1;
						break;
					}
					return e.a(2, i);
				case 1: return o = a ? pa : da, Gm || (Gm = fetch("".concat(o, "/token"), {
					method: "POST",
					headers: {
						"x-algolia-assistant-id": n,
						"content-type": "application/json"
					},
					signal: r
				}).then(function(e) {
					return e.json();
				}).then(function(e) {
					var t = e.token, n = e.success, r = e.message;
					if (!n && r) throw new Error(r);
					return sessionStorage.setItem(Km, t), t;
				}).finally(function() {
					return Gm = null;
				})), e.a(2, Gm);
			}
		}, e);
	}));
	return function(t) {
		return e.apply(this, arguments);
	};
}(), Xm = function() {
	var e = Xt(vn().m(function e(t) {
		var n, r, u, a, i, o, s, c, l, f;
		return vn().w(function(e) {
			for (;;) switch (e.n) {
				case 0: return n = t.assistantId, r = t.thumbs, u = t.messageId, a = t.appId, i = t.abortSignal, o = t.useStagingEnv, s = void 0 !== o && o, (c = new Headers()).set("x-algolia-assistant-id", n), c.set("content-type", "application/json"), e.n = 1, Ym({
					assistantId: n,
					abortSignal: i,
					useStagingEnv: s
				});
				case 1: return l = e.v, c.set("authorization", "TOKEN ".concat(l)), f = s ? pa : da, e.a(2, fetch("".concat(f, "/feedback"), {
					method: "POST",
					body: JSON.stringify({
						appId: a,
						messageId: u,
						thumbs: r
					}),
					headers: c
				}));
			}
		}, e);
	}));
	return function(t) {
		return e.apply(this, arguments);
	};
}(), eD = function(e) {
	var t = e.agentId, n = e.vote, r = e.messageId, u = e.appId, a = e.apiKey, i = e.abortSignal, o = new Headers();
	o.set("x-algolia-application-id", u), o.set("x-algolia-api-key", a), o.set("content-type", "application/json");
	var s = "".concat(Jm(u), "/feedback");
	return fetch(s, {
		method: "POST",
		body: JSON.stringify({
			messageId: r,
			agentId: t,
			vote: n
		}),
		headers: o,
		signal: i
	});
}, tD = [
	"assistantId",
	"apiKey",
	"appId",
	"indexName",
	"useStagingEnv"
], nD = function(e) {
	var t = e.assistantId, n = e.apiKey, r = e.appId, u = e.indexName, a = e.useStagingEnv, i = void 0 !== a && a, o = hn(e, tD), s = Ie(new AbortController()), c = yn(Se(function() {
		return Kh();
	}), 2), l = c[0], f = c[1], d = Ie(null), p = Ie(null), h = Ie(null), m = Pe(function() {
		return o.agentStudio ? function(e) {
			var t = e.appId, n = e.apiKey, r = e.assistantId, u = e.searchParameters;
			return new Sm({
				api: "".concat(Jm(t), "/agents/").concat(r, "/completions?stream=true&compatibilityMode=ai-sdk-5"),
				headers: {
					"x-algolia-application-id": t,
					"x-algolia-api-key": n
				},
				body: u ? { algolia: { searchParameters: u } } : {}
			});
		}({
			apiKey: n,
			appId: r,
			assistantId: null != t ? t : "",
			searchParameters: o.searchParameters
		}) : function(e) {
			var t, n = e.assistantId, r = e.apiKey, u = e.indexName, a = e.searchParameters, i = e.appId, o = e.abortControllerRef, s = e.useStagingEnv;
			return new Sm({
				api: s ? pa : da,
				headers: (t = Xt(vn().m(function e() {
					var t;
					return vn().w(function(e) {
						for (;;) switch (e.n) {
							case 0:
								if (n) {
									e.n = 1;
									break;
								}
								throw new Error("Ask AI assistant ID is required");
							case 1: return e.n = 2, Ym({
								assistantId: n,
								abortSignal: o.current.signal,
								useStagingEnv: s
							});
							case 2: return t = e.v, e.a(2, pn(pn({}, t ? { authorization: "TOKEN ".concat(t) } : {}), {}, {
								"X-Algolia-API-Key": r,
								"X-Algolia-Application-Id": i,
								"X-Algolia-Index-Name": u,
								"X-Algolia-Assistant-Id": n || "",
								"X-AI-SDK-Version": "v5"
							}));
						}
					}, e);
				})), function() {
					return t.apply(this, arguments);
				}),
				body: a ? { searchParameters: a } : {}
			});
		}({
			assistantId: null != t ? t : "",
			apiKey: n,
			appId: r,
			indexName: u,
			searchParameters: o.searchParameters,
			abortControllerRef: s,
			useStagingEnv: i
		});
	}, [
		n,
		r,
		t,
		u,
		i,
		o
	]), D = function() {
		var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.experimental_throttle, n = e.resume, r = void 0 !== n && n, u = v(e, Qt), a = Ie("chat" in u ? u.chat : new Wm(u));
		("chat" in u && u.chat !== a.current || "id" in u && a.current.id !== u.id) && (a.current = "chat" in u ? u.chat : new Wm(u));
		var s = Ve(je(function(e) {
			return a.current["~registerMessagesCallback"](e, t);
		}, [t, "id" in u ? u.id : null]), function() {
			return a.current.messages;
		}), c = Ve(a.current["~registerStatusCallback"], function() {
			return a.current.status;
		}), l = Ve(a.current["~registerErrorCallback"], function() {
			return a.current.error;
		}), f = je(function(e) {
			"function" == typeof e && (e = e(a.current.messages)), a.current.messages = e;
		}, [a]);
		return Oe(function() {
			r && a.current.resumeStream();
		}, [r, a]), {
			id: a.current.id,
			messages: s,
			setMessages: f,
			sendMessage: a.current.sendMessage,
			regenerate: a.current.regenerate,
			clearError: a.current.clearError,
			stop: a.current.stop,
			error: l,
			resumeStream: a.current.resumeStream,
			status: c,
			addToolResult: a.current.addToolOutput,
			addToolOutput: a.current.addToolOutput
		};
	}(Pe(function() {
		return {
			id: l,
			sendAutomaticallyWhen: Om,
			transport: m
		};
	}, [l, m])), y = D.messages, g = D.sendMessage, F = D.status, E = D.setMessages, b = D.error, _ = D.stop, k = D.clearError;
	p.current = g, h.current = E;
	var C = Ie(function(e) {
		var t = e.limit, n = void 0 === t ? 5 : t, r = Zo(e.key), u = r.getItem().slice(0, n);
		return {
			add: function(e) {
				var t = e.objectID, a = e.query, i = u.findIndex(function(e) {
					return e.objectID === t || e.query === a;
				});
				i > -1 ? u[i] = e : (u.unshift(e), u = u.slice(0, n)), r.setItem(u);
			},
			addFeedback: function(e, t) {
				var n = u.find(function(t) {
					var n;
					return null === (n = t.messages) || void 0 === n ? void 0 : n.some(function(t) {
						return t.id === e;
					});
				});
				if (n && n.messages) {
					var a = n.messages.find(function(t) {
						return t.id === e;
					});
					a && (a.feedback = t, r.setItem(u));
				}
			},
			getOne: function(e) {
				var t, n = u.find(function(t) {
					var n;
					return null === (n = t.messages) || void 0 === n ? void 0 : n.some(function(t) {
						return t.id === e;
					});
				});
				return null == n || null === (t = n.messages) || void 0 === t ? void 0 : t.find(function(t) {
					return t.id === e;
				});
			},
			getAll: function() {
				return u;
			},
			remove: function(e) {
				u = u.filter(function(t) {
					return t.objectID !== e.objectID;
				}), r.setItem(u);
			},
			getConversation: function(e) {
				var t = u.find(function(t) {
					var n;
					return null === (n = t.messages) || void 0 === n ? void 0 : n.some(function(t) {
						return t.id === e;
					});
				});
				if (t && t.messages) return t;
			}
		};
	}({
		key: "__DOCSEARCH_ASKAI_CONVERSATIONS__".concat(u),
		limit: 10
	})).current, A = je(function() {
		var e = Xt(vn().m(function e(u, a) {
			var c;
			return vn().w(function(e) {
				for (;;) switch (e.n) {
					case 0:
						if (t) {
							e.n = 1;
							break;
						}
						return e.a(2);
					case 1: return e.n = 2, o.agentStudio ? eD({
						agentId: t,
						vote: a,
						messageId: u,
						appId: r,
						apiKey: n,
						abortSignal: s.current.signal
					}) : Xm({
						assistantId: t,
						thumbs: a,
						messageId: u,
						appId: r,
						abortSignal: s.current.signal,
						useStagingEnv: i
					});
					case 2:
						if (!(e.v.status >= 300)) {
							e.n = 3;
							break;
						}
						throw new Error("Failed, try again later.");
					case 3: null === (c = C.addFeedback) || void 0 === c || c.call(C, u, 1 === a ? "like" : "dislike");
					case 4: return e.a(2);
				}
			}, e);
		}));
		return function(t, n) {
			return e.apply(this, arguments);
		};
	}(), [
		t,
		o.agentStudio,
		r,
		n,
		i,
		C
	]), w = je(function() {
		s.current.abort(), s.current = new AbortController();
	}, []), S = je(function(e) {
		w(), d.current = null != e ? e : null, f(Kh());
	}, [w]);
	Oe(function() {
		var e = d.current;
		if (null !== e) {
			var t = p.current, n = h.current;
			if ("sendText" === e.kind) {
				var r;
				if (!t) return;
				d.current = null, t({ text: e.text }, null !== (r = e.requestOptions) && void 0 !== r ? r : {});
				return;
			}
			if ("sendUserMessage" === e.kind) {
				var u;
				if (!t) return;
				d.current = null, t(e.message, null !== (u = e.requestOptions) && void 0 !== u ? u : {});
				return;
			}
			n && (d.current = null, n(e.messages));
		}
	}, [l]);
	var x = function() {
		var e = Xt(vn().m(function e() {
			return vn().w(function(e) {
				for (;;) switch (e.n) {
					case 0: return s.current.abort(), e.n = 1, _();
					case 1: s.current = new AbortController();
					case 2: return e.a(2);
				}
			}, e);
		}));
		return function() {
			return e.apply(this, arguments);
		};
	}(), O = Pe(function() {
		for (var e = [], t = 0; t < y.length; t++) if ("user" === y[t].role) {
			var n, r = y[t], u = "assistant" === (null === (n = y[t + 1]) || void 0 === n ? void 0 : n.role) ? y[t + 1] : null;
			e.push({
				id: r.id,
				userMessage: r,
				assistantMessage: u
			}), u && t++;
		}
		return e;
	}, [y]), B = "streaming" === F || "submitted" === F;
	return {
		messages: y,
		sendMessage: g,
		status: F,
		setMessages: E,
		clearError: k,
		resetAskAiAbortScope: w,
		resetAskAiChatSession: S,
		askAiError: Pe(function() {
			if (b) return o.agentStudio ? function(e) {
				var t, n, r = e.message;
				try {
					n = JSON.parse(r);
				} catch (e) {
					var u = Rn(r);
					return new Error(null != u ? u : r);
				}
				for (; "string" == typeof n;) try {
					n = JSON.parse(n.trim());
				} catch (e) {
					var a = Rn(r);
					return new Error(null != a ? a : n);
				}
				if ("object" !== En(n) || null === n || Array.isArray(n)) {
					var i = Rn(r);
					return new Error(null != i ? i : r);
				}
				var o, s = n;
				if ("ValidationError" === s.name) {
					var c = s, l = r;
					if (c.detail && c.detail.length > 0) {
						var f = c.detail[0], d = f.msg, p = f.loc.at(-1);
						l = "".concat(d, ": ").concat(p);
					}
					return new Error(l);
				}
				o = Rn(r) || ("string" == typeof s.message && "" !== s.message.trim() ? s.message.trim() : "string" == typeof s.error && "" !== s.error.trim() ? s.error.trim() : r);
				var h = null !== (t = s.code) && void 0 !== t ? t : s.errorCode;
				if ("string" == typeof h && "" !== h.trim()) {
					var v = h.trim();
					o.toUpperCase().includes(v.toUpperCase()) || (o = "".concat(o, " (").concat(v, ")"));
				}
				return new Error(o);
			}(b) : b;
		}, [b, o.agentStudio]),
		stopAskAiStreaming: x,
		isStreaming: B,
		exchanges: O,
		conversations: C,
		sendFeedback: A
	};
};
function rD(e) {
	var t, n = "algolia-client-js-".concat(e.key);
	function r() {
		return void 0 === t && (t = e.localStorage || window.localStorage), t;
	}
	function u() {
		return JSON.parse(r().getItem(n) || "{}");
	}
	function a(e) {
		r().setItem(n, JSON.stringify(e));
	}
	return {
		get: function(t, n) {
			var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
				return Promise.resolve();
			} };
			return Promise.resolve().then(function() {
				var n, r, i;
				return n = e.timeToLive ? 1e3 * e.timeToLive : null, r = u(), a(i = Object.fromEntries(Object.entries(r).filter(function(e) {
					return void 0 !== yn(e, 2)[1].timestamp;
				}))), n && a(Object.fromEntries(Object.entries(i).filter(function(e) {
					var t = yn(e, 2)[1], r = (/* @__PURE__ */ new Date()).getTime();
					return !(t.timestamp + n < r);
				}))), u()[JSON.stringify(t)];
			}).then(function(e) {
				return Promise.all([e ? e.value : n(), void 0 !== e]);
			}).then(function(e) {
				var t = yn(e, 2), n = t[0], u = t[1];
				return Promise.all([n, u || r.miss(n)]);
			}).then(function(e) {
				return yn(e, 1)[0];
			});
		},
		set: function(e, t) {
			return Promise.resolve().then(function() {
				var a = u();
				return a[JSON.stringify(e)] = {
					timestamp: (/* @__PURE__ */ new Date()).getTime(),
					value: t
				}, r().setItem(n, JSON.stringify(a)), t;
			});
		},
		delete: function(e) {
			return Promise.resolve().then(function() {
				var t = u();
				delete t[JSON.stringify(e)], r().setItem(n, JSON.stringify(t));
			});
		},
		clear: function() {
			return Promise.resolve().then(function() {
				r().removeItem(n);
			});
		}
	};
}
function uD(e) {
	var t = gn(e.caches), n = t.shift();
	return void 0 === n ? {
		get: function(e, t) {
			var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
				return Promise.resolve();
			} };
			return t().then(function(e) {
				return Promise.all([e, n.miss(e)]);
			}).then(function(e) {
				return yn(e, 1)[0];
			});
		},
		set: function(e, t) {
			return Promise.resolve(t);
		},
		delete: function(e) {
			return Promise.resolve();
		},
		clear: function() {
			return Promise.resolve();
		}
	} : {
		get: function(e, r) {
			var u = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
				return Promise.resolve();
			} };
			return n.get(e, r, u).catch(function() {
				return uD({ caches: t }).get(e, r, u);
			});
		},
		set: function(e, r) {
			return n.set(e, r).catch(function() {
				return uD({ caches: t }).set(e, r);
			});
		},
		delete: function(e) {
			return n.delete(e).catch(function() {
				return uD({ caches: t }).delete(e);
			});
		},
		clear: function() {
			return n.clear().catch(function() {
				return uD({ caches: t }).clear();
			});
		}
	};
}
function aD() {
	var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { serializable: !0 }, t = {};
	return {
		get: function(n, r) {
			var u = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
				return Promise.resolve();
			} }, a = JSON.stringify(n);
			if (a in t) return Promise.resolve(e.serializable ? JSON.parse(t[a]) : t[a]);
			var i = r();
			return i.then(function(e) {
				return u.miss(e);
			}).then(function() {
				return i;
			});
		},
		set: function(n, r) {
			return t[JSON.stringify(n)] = e.serializable ? JSON.stringify(r) : r, Promise.resolve(r);
		},
		delete: function(e) {
			return delete t[JSON.stringify(e)], Promise.resolve();
		},
		clear: function() {
			return t = {}, Promise.resolve();
		}
	};
}
function iD(e) {
	var t = e.algoliaAgents, n = e.client, r = e.version, u = function(e) {
		var t = {
			value: "Algolia for JavaScript (".concat(e, ")"),
			add: function(e) {
				var n = "; ".concat(e.segment).concat(void 0 !== e.version ? " (".concat(e.version, ")") : "");
				return -1 === t.value.indexOf(n) && (t.value = "".concat(t.value).concat(n)), t;
			}
		};
		return t;
	}(r).add({
		segment: n,
		version: r
	});
	return t.forEach(function(e) {
		return u.add(e);
	}), u;
}
var oD = 12e4;
function sD(e) {
	var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "up", n = Date.now();
	return pn(pn({}, e), {}, {
		status: t,
		lastUpdate: n,
		isUp: function() {
			return "up" === t || Date.now() - n > oD;
		},
		isTimedOut: function() {
			return "timed out" === t && Date.now() - n <= oD;
		}
	});
}
var cD = function() {
	function e(t, n) {
		var r;
		return tn(this, e), on(r = en(this, e, [t]), "name", "AlgoliaError"), n && (r.name = n), r;
	}
	return ln(e, _n(Error)), un(e);
}(), lD = function() {
	function e(t, n, r) {
		var u;
		return tn(this, e), on(u = en(this, e, [t, r]), "stackTrace", void 0), u.stackTrace = n, u;
	}
	return ln(e, cD), un(e);
}(), fD = function() {
	function e(t) {
		return tn(this, e), en(this, e, [
			"Unreachable hosts - your application id may be incorrect. If the error persists, please visit our help center https://alg.li/support-unreachable-hosts or reach out to the Algolia Support team: https://alg.li/support",
			t,
			"RetryError"
		]);
	}
	return ln(e, lD), un(e);
}(), dD = function() {
	function e(t, n, r) {
		var u, a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "ApiError";
		return tn(this, e), on(u = en(this, e, [
			t,
			r,
			a
		]), "status", void 0), u.status = n, u;
	}
	return ln(e, lD), un(e);
}(), pD = function() {
	function e(t, n) {
		var r;
		return tn(this, e), on(r = en(this, e, [t, "DeserializationError"]), "response", void 0), r.response = n, r;
	}
	return ln(e, cD), un(e);
}(), hD = function() {
	function e(t, n, r, u) {
		var a;
		return tn(this, e), on(a = en(this, e, [
			t,
			n,
			u,
			"DetailedApiError"
		]), "error", void 0), a.error = r, a;
	}
	return ln(e, dD), un(e);
}();
function vD(e, t, n) {
	var r, u = (r = n, Object.keys(r).filter(function(e) {
		return void 0 !== r[e];
	}).sort().map(function(e) {
		return "".concat(e, "=").concat(encodeURIComponent("[object Array]" === Object.prototype.toString.call(r[e]) ? r[e].join(",") : r[e]).replace(/\+/g, "%20"));
	}).join("&")), a = "".concat(e.protocol, "://").concat(e.url).concat(e.port ? ":".concat(e.port) : "", "/").concat("/" === t.charAt(0) ? t.substring(1) : t);
	return u.length && (a += "?".concat(u)), a;
}
function mD(e, t) {
	if ("GET" !== e.method && (void 0 !== e.data || void 0 !== t.data)) {
		var n = Array.isArray(e.data) ? e.data : pn(pn({}, e.data), t.data);
		return JSON.stringify(n);
	}
}
function DD(e, t, n) {
	var r = pn(pn(pn({ Accept: "application/json" }, e), t), n), u = {};
	return Object.keys(r).forEach(function(e) {
		var t = r[e];
		u[e.toLowerCase()] = t;
	}), u;
}
function yD(e) {
	try {
		return JSON.parse(e.content);
	} catch (t) {
		throw new pD(t.message, e);
	}
}
function gD(e, t) {
	var n = e.content, r = e.status;
	try {
		var u = JSON.parse(n);
		return "error" in u ? new hD(u.message, r, u.error, t) : new dD(u.message, r, t);
	} catch (e) {}
	return new dD(n, r, t);
}
function FD(e) {
	var t = e.isTimedOut, n = e.status;
	return t || function(e) {
		return !e.isTimedOut && 0 === ~~e.status;
	}({
		isTimedOut: t,
		status: n
	}) || 2 != ~~(n / 100) && 4 != ~~(n / 100);
}
function ED(e) {
	return 2 == ~~(e.status / 100);
}
function bD(e) {
	return e.map(function(e) {
		return _D(e);
	});
}
function _D(e) {
	var t = e.request.headers["x-algolia-api-key"] ? { "x-algolia-api-key": "*****" } : {};
	return pn(pn({}, e), {}, { request: pn(pn({}, e.request), {}, { headers: pn(pn({}, e.request.headers), t) }) });
}
var kD = [
	"appId",
	"apiKey",
	"authMode",
	"algoliaAgents"
], CD = ["params"], AD = "5.43.0";
function wD(e) {
	return [{
		url: "".concat(e, "-dsn.algolia.net"),
		accept: "read",
		protocol: "https"
	}, {
		url: "".concat(e, ".algolia.net"),
		accept: "write",
		protocol: "https"
	}].concat(function(e) {
		for (var t = e, n = e.length - 1; n > 0; n--) {
			var r = Math.floor(Math.random() * (n + 1)), u = e[n];
			t[n] = e[r], t[r] = u;
		}
		return t;
	}([
		{
			url: "".concat(e, "-1.algolianet.com"),
			accept: "readWrite",
			protocol: "https"
		},
		{
			url: "".concat(e, "-2.algolianet.com"),
			accept: "readWrite",
			protocol: "https"
		},
		{
			url: "".concat(e, "-3.algolianet.com"),
			accept: "readWrite",
			protocol: "https"
		}
	]));
}
var SD = "4.6.3";
function xD(e, t, n) {
	return It.useMemo(function() {
		var r = function(e, t) {
			if (!e || "string" != typeof e) throw new Error("`appId` is missing.");
			if (!t || "string" != typeof t) throw new Error("`apiKey` is missing.");
			return function(e) {
				var t = e.appId, n = e.apiKey, r = e.authMode, u = e.algoliaAgents, a = hn(e, kD), i = function(e, t) {
					var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "WithinHeaders", r = {
						"x-algolia-api-key": t,
						"x-algolia-application-id": e
					};
					return {
						headers: function() {
							return "WithinHeaders" === n ? r : {};
						},
						queryParameters: function() {
							return "WithinQueryParameters" === n ? r : {};
						}
					};
				}(t, n, r), o = function(e) {
					var t = e.hosts, n = e.hostsCache, r = e.baseHeaders, u = e.logger, a = e.baseQueryParameters, i = e.algoliaAgent, o = e.timeouts, s = e.requester, c = e.requestsCache, l = e.responsesCache;
					function f(e) {
						return d.apply(this, arguments);
					}
					function d() {
						return (d = Xt(vn().m(function e(t) {
							var r, u, a, i, o;
							return vn().w(function(e) {
								for (;;) switch (e.n) {
									case 0: return e.n = 1, Promise.all(t.map(function(e) {
										return n.get(e, function() {
											return Promise.resolve(sD(e));
										});
									}));
									case 1: return r = e.v, u = r.filter(function(e) {
										return e.isUp();
									}), a = r.filter(function(e) {
										return e.isTimedOut();
									}), i = [].concat(gn(u), gn(a)), o = i.length > 0 ? i : t, e.a(2, {
										hosts: o,
										getTimeout: function(e, t) {
											return (0 === a.length && 0 === e ? 1 : a.length + 3 + e) * t;
										}
									});
								}
							}, e);
						}))).apply(this, arguments);
					}
					function p(e, t) {
						return h.apply(this, arguments);
					}
					function h() {
						return h = Xt(vn().m(function e(c, l) {
							var d, p, h, v, m, D, y, g, F, E, b, _, k, C = arguments;
							return vn().w(function(e) {
								for (;;) switch (e.n) {
									case 0:
										if (d = !(C.length > 2 && void 0 !== C[2]) || C[2], p = [], h = mD(c, l), v = DD(r, c.headers, l.headers), m = "GET" === c.method ? pn(pn({}, c.data), l.data) : {}, D = pn(pn(pn({}, a), c.queryParameters), m), i.value && (D["x-algolia-agent"] = i.value), l && l.queryParameters) for (y = 0, g = Object.keys(l.queryParameters); y < g.length; y++) F = g[y], l.queryParameters[F] && "[object Object]" !== Object.prototype.toString.call(l.queryParameters[F]) ? D[F] = l.queryParameters[F].toString() : D[F] = l.queryParameters[F];
										return E = 0, b = function() {
											var e = Xt(vn().m(function e(t, r) {
												var a, i, f, m, y, g;
												return vn().w(function(e) {
													for (;;) switch (e.n) {
														case 0:
															if (void 0 !== (a = t.pop())) {
																e.n = 1;
																break;
															}
															throw new fD(bD(p));
														case 1: return i = pn(pn({}, o), l.timeouts), f = {
															data: h,
															headers: v,
															method: c.method,
															url: vD(a, c.path, D),
															connectTimeout: r(E, i.connect),
															responseTimeout: r(E, d ? i.read : i.write)
														}, m = function(e) {
															var n = {
																request: f,
																response: e,
																host: a,
																triesLeft: t.length
															};
															return p.push(n), n;
														}, e.n = 2, s.send(f);
														case 2:
															if (!FD(y = e.v)) {
																e.n = 4;
																break;
															}
															return g = m(y), y.isTimedOut && E++, u.info("Retryable failure", _D(g)), e.n = 3, n.set(a, sD(a, y.isTimedOut ? "timed out" : "down"));
														case 3: return e.a(2, b(t, r));
														case 4:
															if (!ED(y)) {
																e.n = 5;
																break;
															}
															return e.a(2, yD(y));
														case 5: throw m(y), gD(y, p);
														case 6: return e.a(2);
													}
												}, e);
											}));
											return function(t, n) {
												return e.apply(this, arguments);
											};
										}(), _ = t.filter(function(e) {
											return "readWrite" === e.accept || (d ? "read" === e.accept : "write" === e.accept);
										}), e.n = 1, f(_);
									case 1: return k = e.v, e.a(2, b(gn(k.hosts).reverse(), k.getTimeout));
								}
							}, e);
						})), h.apply(this, arguments);
					}
					return {
						hostsCache: n,
						requester: s,
						timeouts: o,
						logger: u,
						algoliaAgent: i,
						baseHeaders: r,
						baseQueryParameters: a,
						hosts: t,
						request: function(e) {
							var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = e.useReadTransporter || "GET" === e.method;
							if (!n) return p(e, t, n);
							var u = function() {
								return p(e, t);
							};
							if (!0 !== (t.cacheable || e.cacheable)) return u();
							var i = {
								request: e,
								requestOptions: t,
								transporter: {
									queryParameters: a,
									headers: r
								}
							};
							return l.get(i, function() {
								return c.get(i, function() {
									return c.set(i, u()).then(function(e) {
										return Promise.all([c.delete(i), e]);
									}, function(e) {
										return Promise.all([c.delete(i), Promise.reject(e)]);
									}).then(function(e) {
										var t = yn(e, 2);
										return t[0], t[1];
									});
								});
							}, { miss: function(e) {
								return l.set(i, e);
							} });
						},
						requestsCache: c,
						responsesCache: l
					};
				}(pn(pn({ hosts: wD(t) }, a), {}, {
					algoliaAgent: iD({
						algoliaAgents: u,
						client: "Lite",
						version: AD
					}),
					baseHeaders: pn(pn({ "content-type": "text/plain" }, i.headers()), a.baseHeaders),
					baseQueryParameters: pn(pn({}, i.queryParameters()), a.baseQueryParameters)
				}));
				return {
					transporter: o,
					appId: t,
					apiKey: n,
					clearCache: function() {
						return Promise.all([o.requestsCache.clear(), o.responsesCache.clear()]).then(function() {});
					},
					get _ua() {
						return o.algoliaAgent.value;
					},
					addAlgoliaAgent: function(e, t) {
						o.algoliaAgent.add({
							segment: e,
							version: t
						});
					},
					setClientApiKey: function(e) {
						var t = e.apiKey;
						r && "WithinHeaders" !== r ? o.baseQueryParameters["x-algolia-api-key"] = t : o.baseHeaders["x-algolia-api-key"] = t;
					},
					searchForHits: function(e, t) {
						return this.search(e, t);
					},
					searchForFacets: function(e, t) {
						return this.search(e, t);
					},
					customPost: function(e, t) {
						var n = e.path, r = e.parameters, u = e.body;
						if (!n) throw new Error("Parameter `path` is required when calling `customPost`.");
						var a = {
							method: "POST",
							path: "/{path}".replace("{path}", n),
							queryParameters: r || {},
							headers: {},
							data: u || {}
						};
						return o.request(a, t);
					},
					getRecommendations: function(e, t) {
						if (e && Array.isArray(e) && (e = { requests: e }), !e) throw new Error("Parameter `getRecommendationsParams` is required when calling `getRecommendations`.");
						if (!e.requests) throw new Error("Parameter `getRecommendationsParams.requests` is required when calling `getRecommendations`.");
						var n = {
							method: "POST",
							path: "/1/indexes/*/recommendations",
							queryParameters: {},
							headers: {},
							data: e,
							useReadTransporter: !0,
							cacheable: !0
						};
						return o.request(n, t);
					},
					search: function(e, t) {
						if (e && Array.isArray(e)) e = { requests: e.map(function(e) {
							var t = e.params, n = hn(e, CD);
							return "facet" === n.type ? pn(pn(pn({}, n), t), {}, { type: "facet" }) : pn(pn(pn({}, n), t), {}, {
								facet: void 0,
								maxFacetHits: void 0,
								facetQuery: void 0
							});
						}) };
						if (!e) throw new Error("Parameter `searchMethodParams` is required when calling `search`.");
						if (!e.requests) throw new Error("Parameter `searchMethodParams.requests` is required when calling `search`.");
						var r = {
							method: "POST",
							path: "/1/indexes/*/queries",
							queryParameters: {},
							headers: {},
							data: e,
							useReadTransporter: !0,
							cacheable: !0
						};
						return o.request(r, t);
					}
				};
			}(pn({
				appId: e,
				apiKey: t,
				timeouts: {
					connect: 1e3,
					read: 2e3,
					write: 3e4
				},
				logger: {
					debug: function(e, t) {
						return Promise.resolve();
					},
					info: function(e, t) {
						return Promise.resolve();
					},
					error: function(e, t) {
						return Promise.resolve();
					}
				},
				requester: { send: function(e) {
					return new Promise(function(t) {
						var n = new XMLHttpRequest();
						n.open(e.method, e.url, !0), Object.keys(e.headers).forEach(function(t) {
							return n.setRequestHeader(t, e.headers[t]);
						});
						var r, u = function(e, r) {
							return setTimeout(function() {
								n.abort(), t({
									status: 0,
									content: r,
									isTimedOut: !0
								});
							}, e);
						}, a = u(e.connectTimeout, "Connection timeout");
						n.onreadystatechange = function() {
							n.readyState > n.OPENED && void 0 === r && (clearTimeout(a), r = u(e.responseTimeout, "Socket timeout"));
						}, n.onerror = function() {
							0 === n.status && (clearTimeout(a), clearTimeout(r), t({
								content: n.responseText || "Network request failed",
								status: n.status,
								isTimedOut: !1
							}));
						}, n.onload = function() {
							clearTimeout(a), clearTimeout(r), t({
								content: n.responseText,
								status: n.status,
								isTimedOut: !1
							});
						}, n.send(e.data);
					});
				} },
				algoliaAgents: [{ segment: "Browser" }],
				authMode: "WithinQueryParameters",
				responsesCache: aD(),
				requestsCache: aD({ serializable: !1 }),
				hostsCache: uD({ caches: [rD({ key: "".concat(AD, "-").concat(e) }), aD()] })
			}, void 0));
		}(e, t);
		return r.addAlgoliaAgent("docsearch", SD), !1 === /docsearch.js \(.*\)/.test(r.transporter.algoliaAgent.value) && r.addAlgoliaAgent("docsearch-react", SD), n(r);
	}, [
		e,
		t,
		n
	]);
}
var OD = [
	"appId",
	"apiKey",
	"askAi",
	"maxResultsPerGroup",
	"theme",
	"onClose",
	"transformItems",
	"hitComponent",
	"resultsFooterComponent",
	"navigator",
	"initialScrollY",
	"transformSearchClient",
	"disableUserPersonalization",
	"initialQuery",
	"translations",
	"getMissingResultsUrl",
	"insights",
	"onAskAiToggle",
	"interceptAskAiEvent",
	"isAskAiActive",
	"recentSearchesLimit",
	"recentSearchesWithFavoritesLimit",
	"indices",
	"indexName",
	"searchParameters",
	"isHybridModeSupported"
], BD = ["footer", "searchBox"], ID = function() {
	var e = Xt(vn().m(function e(t) {
		var n, r, u, a, i, o, s, c, l, f, d, p, h, v, m, D, y, g, F;
		return vn().w(function(e) {
			for (;;) switch (e.p = e.n) {
				case 0: return n = t.query, r = t.state, u = t.setContext, a = t.setStatus, i = t.searchClient, o = t.indexes, s = t.snippetLength, c = t.insights, l = t.appId, f = t.apiKey, d = t.maxResultsPerGroup, p = t.transformItems, h = void 0 === p ? Un : p, v = t.saveRecentSearch, m = t.onClose, D = c, e.p = 1, e.n = 2, i.search({ requests: o.map(function(e) {
					var t, r, u, a, i, o, c, l = "string" == typeof e ? e : e.name, f = "string" == typeof e ? {} : e.searchParameters;
					return pn({
						query: n,
						indexName: l,
						attributesToRetrieve: null !== (t = null == f ? void 0 : f.attributesToRetrieve) && void 0 !== t ? t : [
							"hierarchy.lvl0",
							"hierarchy.lvl1",
							"hierarchy.lvl2",
							"hierarchy.lvl3",
							"hierarchy.lvl4",
							"hierarchy.lvl5",
							"hierarchy.lvl6",
							"content",
							"type",
							"url"
						],
						attributesToSnippet: null !== (r = null == f ? void 0 : f.attributesToSnippet) && void 0 !== r ? r : [
							"hierarchy.lvl1:".concat(s.current),
							"hierarchy.lvl2:".concat(s.current),
							"hierarchy.lvl3:".concat(s.current),
							"hierarchy.lvl4:".concat(s.current),
							"hierarchy.lvl5:".concat(s.current),
							"hierarchy.lvl6:".concat(s.current),
							"content:".concat(s.current)
						],
						snippetEllipsisText: null !== (u = null == f ? void 0 : f.snippetEllipsisText) && void 0 !== u ? u : "…",
						highlightPreTag: null !== (a = null == f ? void 0 : f.highlightPreTag) && void 0 !== a ? a : "<mark>",
						highlightPostTag: null !== (i = null == f ? void 0 : f.highlightPostTag) && void 0 !== i ? i : "</mark>",
						hitsPerPage: null !== (o = null == f ? void 0 : f.hitsPerPage) && void 0 !== o ? o : 20,
						clickAnalytics: null !== (c = null == f ? void 0 : f.clickAnalytics) && void 0 !== c ? c : D
					}, null != f ? f : {});
				}) });
				case 2: return y = e.v, g = y.results, e.a(2, g.flatMap(function(e) {
					var t, n = e, a = n.hits, i = n.nbHits, o = qn(h(a), function(e) {
						return Qn(e);
					}, d);
					if (r.context.searchSuggestions.length < Object.keys(o).length && u({ searchSuggestions: pn(pn({}, null !== (t = r.context.searchSuggestions) && void 0 !== t ? t : []), Object.keys(o)) }), i) {
						var s = r.context.nbHits;
						u({ nbHits: (null != s ? s : 0) + i });
					}
					var c = {};
					return D && (c = {
						__autocomplete_indexName: n.index,
						__autocomplete_queryID: n.queryID,
						__autocomplete_algoliaCredentials: {
							appId: l,
							apiKey: f
						}
					}), Object.values(o).map(function(e, t) {
						return {
							sourceId: "hits_".concat(n.index, "_").concat(t),
							onSelect: function(e) {
								var t = e.item, n = e.event;
								v(t), Hn(n) || m();
							},
							getItemUrl: function(e) {
								return e.item.url;
							},
							getItems: function() {
								return Object.values(qn(e, function(e) {
									return e.hierarchy.lvl1;
								}, d)).map(function(e) {
									return e.map(function(t) {
										var n = null, r = e.find(function(e) {
											return "lvl1" === e.type && e.hierarchy.lvl1 === t.hierarchy.lvl1;
										});
										return "lvl1" !== t.type && r && (n = r), pn(pn({}, t), {}, { __docsearch_parent: n }, c);
									});
								}).flat();
							}
						};
					});
				}));
				case 3: throw e.p = 3, "RetryError" === (F = e.v).name && a("error"), F;
				case 4: return e.a(2);
			}
		}, e, null, [[1, 3]]);
	}));
	return function(t) {
		return e.apply(this, arguments);
	};
}();
function TD(e) {
	var t, n, r, u, a = e.appId, i = e.apiKey, o = e.askAi, s = e.maxResultsPerGroup, c = e.theme, l = e.onClose, f = void 0 === l ? Wn : l, d = e.transformItems, p = void 0 === d ? Un : d, h = e.hitComponent, v = void 0 === h ? Da : h, m = e.resultsFooterComponent, D = void 0 === m ? function() {
		return null;
	} : m, y = e.navigator, g = e.initialScrollY, F = void 0 === g ? 0 : g, E = e.transformSearchClient, b = void 0 === E ? Un : E, _ = e.disableUserPersonalization, k = void 0 !== _ && _, C = e.initialQuery, A = void 0 === C ? "" : C, w = e.translations, S = void 0 === w ? {} : w, x = e.getMissingResultsUrl, O = e.insights, B = void 0 !== O && O, I = e.onAskAiToggle, T = e.interceptAskAiEvent, P = e.isAskAiActive, j = void 0 !== P && P, N = e.recentSearchesLimit, z = void 0 === N ? 7 : N, R = e.recentSearchesWithFavoritesLimit, M = void 0 === R ? 4 : R, Z = e.indices, L = void 0 === Z ? [] : Z, $ = e.indexName, q = e.searchParameters, U = e.isHybridModeSupported, H = void 0 !== U && U, V = hn(e, OD), W = S.footer, K = S.searchBox, J = hn(S, BD), Q = yn(It.useState({
		query: "",
		collections: [],
		completion: null,
		context: {},
		isOpen: !1,
		activeItemId: null,
		status: "idle"
	}), 2), G = Q[0], Y = Q[1], X = Boolean(o), ee = (null == S || null === (t = S.searchBox) || void 0 === t ? void 0 : t.placeholderText) || V.placeholder || "Search docs";
	X && (ee = (null == S || null === (r = S.searchBox) || void 0 === r ? void 0 : r.placeholderText) || "Search docs or ask AI a question"), j && (ee = (null == S || null === (u = S.searchBox) || void 0 === u ? void 0 : u.placeholderTextAskAi) || "Ask another question...");
	var te = It.useRef(null), ne = It.useRef(null), re = It.useRef(null), ue = It.useRef(null), ae = It.useRef(null), ie = It.useRef(15), oe = It.useRef("undefined" != typeof window ? window.getSelection().toString().slice(0, 512) : "").current, se = It.useRef(A || oe).current, ce = xD(a, i, b), le = "object" === En(o) ? o : null, fe = "string" == typeof o ? o : (null == le ? void 0 : le.assistantId) || null, de = null == le ? void 0 : le.searchParameters, pe = (null == le ? void 0 : le.useStagingEnv) || !1, he = yn(It.useState("initial"), 2), ve = he[0], me = he[1], De = function(e) {
		var t = e.assistantId, n = e.searchClient, r = e.suggestedQuestionsEnabled, u = void 0 !== r && r, a = yn(Se([]), 2), i = a[0], o = a[1];
		return Oe(function() {
			var e = function() {
				var e = Xt(vn().m(function e() {
					var r, u, a;
					return vn().w(function(e) {
						for (;;) switch (e.n) {
							case 0: return e.n = 1, n.search({ requests: [{
								indexName: "algolia_ask_ai_suggested_questions",
								filters: "state:published AND assistantId:".concat(t),
								hitsPerPage: 3
							}] });
							case 1: r = e.v, u = r.results, a = u[0], o(a.hits);
							case 2: return e.a(2);
						}
					}, e);
				}));
				return function() {
					return e.apply(this, arguments);
				};
			}();
			u && t && "" !== t && e();
		}, [
			u,
			t,
			n
		]), i;
	}({
		assistantId: fe,
		searchClient: ce,
		suggestedQuestionsEnabled: null == le ? void 0 : le.suggestedQuestions
	}), ye = null !== (n = null == le ? void 0 : le.agentStudio) && void 0 !== n && n, ge = [];
	if ($ && "" !== $ && ge.push({
		name: $,
		searchParameters: q
	}), L.length > 0 && L.forEach(function(e) {
		ge.push("string" == typeof e ? { name: e } : e);
	}), ge.length < 1) throw new Error("Must supply either `indexName` or `indices` for DocSearch to work");
	var Fe = ge[0].name, Ee = It.useRef($o({
		key: "__DOCSEARCH_FAVORITE_SEARCHES__".concat(Fe),
		limit: 10
	})).current, be = It.useRef($o({
		key: "__DOCSEARCH_RECENT_SEARCHES__".concat(Fe),
		limit: 0 === Ee.getAll().length ? z : M
	})).current, _e = yn(It.useState(!1), 2), ke = _e[0], Ce = _e[1], Ae = nD({
		assistantId: fe,
		apiKey: (null == le ? void 0 : le.apiKey) || i,
		appId: (null == le ? void 0 : le.appId) || a,
		indexName: (null == le ? void 0 : le.indexName) || Fe,
		searchParameters: de,
		useStagingEnv: pe,
		agentStudio: ye
	}), we = Ae.messages, xe = Ae.status, Be = Ae.sendMessage, Ie = Ae.stopAskAiStreaming, Te = Ae.askAiError, Pe = Ae.sendFeedback, je = Ae.conversations, Ne = Ae.clearError, ze = Ae.resetAskAiAbortScope, Re = Ae.resetAskAiChatSession, Me = It.useRef(xe);
	It.useEffect(function() {
		if (!k) {
			if ("streaming" === Me.current && "ready" === xe) {
				ke && we.at(-1) && (we.at(-1).metadata = { stopped: !0 });
				var e = we[0];
				if (null != e && e.parts) {
					var t, n = an(e.parts);
					try {
						for (n.s(); !(t = n.n()).done;) {
							var r = t.value;
							"text" === r.type && je.add(In(r.text, we));
						}
					} catch (e) {
						n.e(e);
					} finally {
						n.f();
					}
				}
			}
			Me.current = xe;
		}
	}, [
		xe,
		we,
		je,
		k,
		ke
	]);
	var Ze = It.useMemo(function() {
		return "error" === xe && Nn(Te, ye);
	}, [
		xe,
		Te,
		ye
	]), Le = It.useMemo(function() {
		if (Ze && "new-conversation" !== ve) return zn(Te) ? "minimal" : "thread-depth";
	}, [
		Ze,
		ve,
		Te
	]), $e = It.useCallback(function(e) {
		var t = e.hierarchy, n = [
			"lvl6",
			"lvl5",
			"lvl4",
			"lvl3",
			"lvl2",
			"lvl1",
			"lvl0"
		].find(function(e) {
			return t[e];
		});
		return pn(pn({}, e), {}, {
			type: n || "lvl0",
			content: null
		});
	}, []), qe = It.useCallback(function(e) {
		if (!k) {
			var t = "content" === e.type ? e.__docsearch_parent || $e(e) : e;
			t && -1 === Ee.getAll().findIndex(function(e) {
				return e.objectID === t.objectID;
			}) && be.add(t);
		}
	}, [
		Ee,
		be,
		k,
		$e
	]), Ue = It.useCallback(function(e) {
		if (G.context.algoliaInsightsPlugin && e.__autocomplete_id) {
			var t = e, n = {
				eventName: "Item Selected",
				index: t.__autocomplete_indexName,
				items: [t],
				positions: [e.__autocomplete_id],
				queryID: t.__autocomplete_queryID
			};
			G.context.algoliaInsightsPlugin.insights.clickedObjectIDsAfterSearch(n);
		}
	}, [G.context.algoliaInsightsPlugin]), He = It.useRef(void 0), Ve = It.useCallback(function(e, t) {
		var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
		if (e) {
			var r = {
				query: t,
				suggestedQuestionId: null == n ? void 0 : n.objectID
			};
			if (null != T && T(r)) return void (He.current && He.current.setQuery(""));
		}
		if (e && "new-conversation" === ve && me("initial"), I(e, {
			query: t,
			suggestedQuestionId: null == n ? void 0 : n.objectID
		}), !H) {
			Ce(!1), ze(), Ne();
			var u = {};
			if (n && (u.body = { suggestedQuestionId: n.objectID }), Be({
				role: "user",
				parts: [{
					type: "text",
					text: t
				}]
			}, u), ue.current) {
				var a = ue.current;
				"function" == typeof a.scrollTo ? a.scrollTo({
					top: 0,
					behavior: "smooth"
				}) : a.scrollTop = 0;
			}
			He.current && He.current.setQuery("");
		}
	}, [
		I,
		T,
		ve,
		me,
		H,
		Ne,
		ze,
		Be
	]), We = It.useCallback(function() {
		var e = Xt(vn().m(function e(t, n) {
			return vn().w(function(e) {
				for (;;) switch (e.n) {
					case 0:
						if (fe && a) {
							e.n = 1;
							break;
						}
						return e.a(2);
					case 1: return e.n = 2, Pe(t, n);
					case 2: return e.a(2);
				}
			}, e);
		}));
		return function(t, n) {
			return e.apply(this, arguments);
		};
	}(), [
		fe,
		a,
		Pe
	]);
	He.current || (He.current = fa({
		id: "docsearch",
		defaultActiveItemId: 0,
		openOnFocus: !0,
		initialState: {
			query: se,
			context: { searchSuggestions: [] }
		},
		insights: Boolean(B),
		navigator: y,
		onStateChange: function(e) {
			Y(e.state);
		},
		getSources: function(e) {
			var t = e.query, n = e.state, r = e.setContext, u = e.setStatus;
			if (!t) {
				var o = function(e) {
					var t = e.recentSearches, n = e.favoriteSearches, r = e.saveRecentSearch, u = e.onClose;
					return e.disableUserPersonalization ? [] : [{
						sourceId: "recentSearches",
						onSelect: function(e) {
							var t = e.item, n = e.event;
							r(t), Hn(n) || u();
						},
						getItemUrl: function(e) {
							return e.item.url;
						},
						getItems: function() {
							return t.getAll();
						}
					}, {
						sourceId: "favoriteSearches",
						onSelect: function(e) {
							var t = e.item, n = e.event;
							r(t), Hn(n) || u();
						},
						getItemUrl: function(e) {
							return e.item.url;
						},
						getItems: function() {
							return n.getAll();
						}
					}];
				}({
					recentSearches: be,
					favoriteSearches: Ee,
					saveRecentSearch: qe,
					onClose: f,
					disableUserPersonalization: k
				}), c = X ? [{
					sourceId: "recentConversations",
					getItems: function() {
						return k ? [] : je.getAll();
					},
					onSelect: function(e) {
						var t = e.item;
						t.messages && (Re({
							kind: "setMessages",
							messages: t.messages
						}), I(!0));
					}
				}] : [];
				return [].concat(gn(o), c);
			}
			var d = ID({
				query: t,
				state: { context: n.context },
				setContext: r,
				setStatus: u,
				searchClient: ce,
				indexes: ge,
				snippetLength: ie,
				insights: Boolean(B),
				appId: a,
				apiKey: i,
				maxResultsPerGroup: s,
				transformItems: p,
				saveRecentSearch: qe,
				onClose: f
			}), h = X ? [{
				sourceId: "askAI",
				getItems: function() {
					return [{
						type: "askAI",
						query: t,
						url_without_anchor: "",
						objectID: "ask-ai-button",
						content: null,
						url: "",
						anchor: null,
						hierarchy: {
							lvl0: "Ask AI",
							lvl1: t,
							lvl2: null,
							lvl3: null,
							lvl4: null,
							lvl5: null,
							lvl6: null
						},
						_highlightResult: {},
						_snippetResult: {},
						__docsearch_parent: null
					}];
				},
				onSelect: function(e) {
					var t = e.item;
					"askAI" === t.type && t.query && Ve(!0, t.query);
				}
			}] : [];
			return d.then(function(e) {
				return [].concat(h, gn(e));
			});
		}
	}));
	var Ke, Je, Qe = He.current, Ge = Qe.getEnvironmentProps, Ye = Qe.getRootProps, Xe = Qe.refresh;
	(function(e) {
		var t = e.getEnvironmentProps, n = e.panelElement, r = e.formElement, u = e.inputElement;
		It.useEffect(function() {
			if (n && r && u) {
				var e = t({
					panelElement: n,
					formElement: r,
					inputElement: u
				}), a = e.onTouchStart, i = e.onTouchMove;
				return window.addEventListener("touchstart", a), window.addEventListener("touchmove", i), function() {
					window.removeEventListener("touchstart", a), window.removeEventListener("touchmove", i);
				};
			}
		}, [
			t,
			n,
			r,
			u
		]);
	})({
		getEnvironmentProps: Ge,
		panelElement: ue.current,
		formElement: re.current,
		inputElement: ae.current
	}), Ke = { container: te.current }, Je = Ke.container, It.useEffect(function() {
		if (Je) {
			var e = Je.querySelectorAll("a[href]:not([disabled]), button:not([disabled]), input:not([disabled])"), t = e[0], n = e[e.length - 1];
			return Je.addEventListener("keydown", r), function() {
				Je.removeEventListener("keydown", r);
			};
		}
		function r(e) {
			"Tab" === e.key && (e.shiftKey ? document.activeElement === t && (e.preventDefault(), n.focus()) : document.activeElement === n && (e.preventDefault(), t.focus()));
		}
	}, [Je]), Zn({ theme: c }), It.useEffect(function() {
		return document.body.classList.add("DocSearch--active"), function() {
			var e, t;
			document.body.classList.remove("DocSearch--active"), null === (e = (t = window).scrollTo) || void 0 === e || e.call(t, 0, F);
		};
	}, []), It.useEffect(function() {
		"undefined" != typeof window && window.localStorage && function() {
			if ("undefined" == typeof window || !window.localStorage) return 0;
			var e = 0;
			for (var t in window.localStorage) window.localStorage.hasOwnProperty(t) && (e += window.localStorage[t].length + t.length);
			return e;
		}() > 4194304 && Mo();
	}, []), It.useLayoutEffect(function() {
		var e = window.innerWidth - document.body.clientWidth;
		return document.body.style.marginInlineEnd = "".concat(e, "px"), function() {
			document.body.style.marginInlineEnd = "0px";
		};
	}, []), It.useEffect(function() {
		window.matchMedia("(max-width: 768px)").matches && (ie.current = 5);
	}, []), It.useEffect(function() {
		var e;
		ue.current && !j && ("function" == typeof (e = ue.current).scrollTo ? e.scrollTo({
			top: 0,
			behavior: "smooth"
		}) : e.scrollTop = 0);
	}, [G.query, j]), It.useEffect(function() {
		se.length > 0 && (Xe(), ae.current && ae.current.focus());
	}, [se, Xe]), It.useEffect(function() {
		function e() {
			if (ne.current) {
				var e = .01 * window.innerHeight;
				ne.current.style.setProperty("--docsearch-vh", "".concat(e, "px"));
			}
		}
		return e(), window.addEventListener("resize", e), function() {
			window.removeEventListener("resize", e);
		};
	}, []);
	var et = It.useRef(j);
	It.useEffect(function() {
		et.current && !j && (Qe.refresh(), Ne(), Re()), et.current = j;
	}, [
		j,
		Qe,
		Ne,
		Re
	]), It.useEffect(function() {
		me("initial");
	}, [j, me]);
	var tt = function() {
		var e = Xt(vn().m(function e() {
			return vn().w(function(e) {
				for (;;) switch (e.n) {
					case 0: return Ce(!0), e.n = 1, Ie();
					case 1: return e.a(2);
				}
			}, e);
		}));
		return function() {
			return e.apply(this, arguments);
		};
	}(), nt = function() {
		Ne(), Re(), me("new-conversation");
	}, rt = !0, ut = G.collections.some(function(e) {
		return e.items.length > 0;
	});
	return "idle" !== G.status || !1 !== ut || 0 !== G.query.length || j || (rt = !1), It.createElement("div", sn({ ref: te }, Ye({ "aria-expanded": !0 }), {
		className: [
			"DocSearch",
			"DocSearch-Container",
			"stalled" === G.status && "DocSearch-Container--Stalled",
			"error" === G.status && "DocSearch-Container--Errored"
		].filter(Boolean).join(" "),
		role: "button",
		tabIndex: 0,
		onMouseDown: function(e) {
			e.target === e.currentTarget && f();
		}
	}), It.createElement("div", {
		className: "DocSearch-Modal",
		ref: ne
	}, It.createElement("header", {
		className: "DocSearch-SearchBar",
		ref: re
	}, It.createElement(Ro, sn({}, Qe, {
		state: G,
		placeholder: ee || "Search docs",
		autoFocus: 0 === se.length,
		inputRef: ae,
		isFromSelection: Boolean(se) && se === oe,
		translations: K,
		isAskAiActive: j,
		askAiStatus: xe,
		askAiError: Te,
		askAiState: ve,
		setAskAiState: me,
		isThreadDepthError: Ze && "new-conversation" !== ve,
		askAiBlockingChrome: Le,
		onClose: f,
		onAskAiToggle: I,
		onAskAgain: function(e) {
			Ve(!0, e);
		},
		onStopAskAiStreaming: tt,
		onNewConversation: nt,
		onViewConversationHistory: function() {
			me("conversation-history");
		}
	}))), rt && It.createElement("div", {
		className: "DocSearch-Dropdown",
		ref: ue
	}, It.createElement(Bo, sn({}, Qe, {
		indexName: Fe,
		state: G,
		hitComponent: v,
		resultsFooterComponent: D,
		disableUserPersonalization: k,
		recentSearches: be,
		favoriteSearches: Ee,
		conversations: je,
		inputRef: ae,
		translations: J,
		getMissingResultsUrl: x,
		isAskAiActive: j,
		canHandleAskAi: X,
		messages: we,
		askAiError: Te,
		status: xe,
		hasCollections: ut,
		askAiState: ve,
		selectAskAiQuestion: Ve,
		suggestedQuestions: De,
		selectSuggestedQuestion: function(e) {
			Ve(!0, e.question, e);
		},
		agentStudio: ye,
		onAskAiToggle: I,
		onNewConversation: nt,
		onItemClick: function(e, t) {
			if ("askAI" === e.type && e.query) {
				if ("stored" === e.anchor && "messages" in e) {
					Re({
						kind: "setMessages",
						messages: e.messages
					});
					var n = {
						query: e.query,
						messageId: e.messages[0].id
					};
					if (null != T && T(n)) return He.current && He.current.setQuery(""), void t.preventDefault();
					I(!0, n);
				} else Ve(!0, e.query);
				me("initial"), t.preventDefault();
				return;
			}
			Ue(e), qe(e), Hn(t) || f();
		},
		onFeedback: We
	}))), It.createElement("footer", { className: "DocSearch-Footer" }, It.createElement(ma, {
		translations: W,
		isAskAiActive: j
	}))));
}
var PD = It.forwardRef(function(e, t) {
	return It.createElement(qt, sn({}, e, { ref: t }), It.createElement(jD, e));
});
function jD(e) {
	var t, n, r, u = function() {
		var e = It.useContext($t);
		if (void 0 === e) throw new Error("`useDocSearch` must be used within the `DocSearch` provider");
		return e;
	}(), a = u.searchButtonRef, i = u.keyboardShortcuts, o = u.isModalActive, s = u.isAskAiActive, c = u.initialQuery, l = u.onAskAiToggle, f = u.openModal, d = u.closeModal;
	return It.createElement(It.Fragment, null, It.createElement(Yn, {
		keyboardShortcuts: i,
		ref: a,
		translations: null === (t = e.translations) || void 0 === t ? void 0 : t.button,
		onClick: f
	}), o && pt(It.createElement(TD, sn({}, e, {
		initialScrollY: window.scrollY,
		initialQuery: c,
		translations: null == e || null === (n = e.translations) || void 0 === n ? void 0 : n.modal,
		isAskAiActive: s,
		onAskAiToggle: l,
		onClose: d
	})), null !== (r = e.portalContainer) && void 0 !== r ? r : document.body));
}
var ND = function(e, t, n, r) {
	var u;
	t[0] = 0;
	for (var a = 1; a < t.length; a++) {
		var i = t[a++], o = t[a] ? (t[0] |= i ? 1 : 2, n[t[a++]]) : t[++a];
		3 === i ? r[0] = o : 4 === i ? r[1] = Object.assign(r[1] || {}, o) : 5 === i ? (r[1] = r[1] || {})[t[++a]] = o : 6 === i ? r[1][t[++a]] += o + "" : i ? (u = e.apply(o, ND(e, o, n, ["", null])), r.push(u), o[0] ? t[0] |= 2 : (t[a - 2] = 0, t[a] = u)) : r.push(o);
	}
	return r;
}, zD = /* @__PURE__ */ new Map();
var RD = [
	"container",
	"environment",
	"transformSearchClient",
	"hitComponent",
	"resultsFooterComponent"
];
var MD = function(e) {
	var t = zD.get(this);
	return t || (t = /* @__PURE__ */ new Map(), zD.set(this, t)), (t = ND(this, t.get(e) || (t.set(e, t = function(e) {
		for (var t, n, r = 1, u = "", a = "", i = [0], o = function(e) {
			1 === r && (e || (u = u.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? i.push(0, e, u) : 3 === r && (e || u) ? (i.push(3, e, u), r = 2) : 2 === r && "..." === u && e ? i.push(4, e, 0) : 2 === r && u && !e ? i.push(5, 0, !0, u) : r >= 5 && ((u || !e && 5 === r) && (i.push(r, 0, u, n), r = 6), e && (i.push(r, e, 0, n), r = 6)), u = "";
		}, s = 0; s < e.length; s++) {
			s && (1 === r && o(), o(s));
			for (var c = 0; c < e[s].length; c++) t = e[s][c], 1 === r ? "<" === t ? (o(), i = [i], r = 3) : u += t : 4 === r ? "--" === u && ">" === t ? (r = 1, u = "") : u = t + u[0] : a ? t === a ? a = "" : u += t : "\"" === t || "'" === t ? a = t : ">" === t ? (o(), r = 1) : r && ("=" === t ? (r = 5, n = u, u = "") : "/" === t && (r < 5 || ">" === e[s][c + 1]) ? (o(), 3 === r && (i = i[0]), r = i, (i = i[0]).push(2, 0, r), r = 0) : " " === t || "	" === t || "\n" === t || "\r" === t ? (o(), r = 2) : u += t), 3 === r && "!--" === u && (r = 4, i = i[0]);
		}
		return o(), i;
	}(e)), t), arguments, [])).length > 1 ? t : t[0];
}.bind($);
function ZD(e) {
	if (e) return function(t) {
		var n = e(t, { html: MD });
		return Ot(n) ? n : "function" == typeof n ? n(t) : "string" == typeof n ? $("span", null, n) : n;
	};
}
function LD(e) {
	var t = e.container, n = e.environment, r = e.transformSearchClient, u = e.hitComponent, a = e.resultsFooterComponent, i = v(e, RD), o = function(e, t) {
		if ("string" != typeof e) return e;
		if (!t) throw new Error("Cannot resolve a selector without a browser environment.");
		var n = t.document.querySelector(e);
		if (!n) throw new Error("Container selector did not match any element: \"".concat(e, "\""));
		return n;
	}(t, n || ("undefined" != typeof window ? window : void 0)), s = { current: null }, c = !1;
	return gt($(PD, h(h({}, i), {}, {
		ref: s,
		hitComponent: ZD(u),
		resultsFooterComponent: ZD(a),
		transformSearchClient: function(e) {
			return null != e && e.addAlgoliaAgent && e.addAlgoliaAgent("docsearch.js", SD), "function" == typeof r ? r(e) : e;
		}
	})), o), c = !0, {
		open: function() {
			var e;
			null === (e = s.current) || void 0 === e || e.open();
		},
		close: function() {
			var e;
			null === (e = s.current) || void 0 === e || e.close();
		},
		openAskAi: function(e) {
			var t;
			null === (t = s.current) || void 0 === t || t.openAskAi(e);
		},
		get isReady() {
			return c;
		},
		get isOpen() {
			var e, t;
			return null !== (e = null === (t = s.current) || void 0 === t ? void 0 : t.isOpen) && void 0 !== e && e;
		},
		destroy: function() {
			Bt(o), c = !1;
		}
	};
}
//#endregion
//#region js/docs.ts
LD({
	container: "#docsearch",
	appId: "NE1EGTYLS9",
	indexName: "tabler",
	apiKey: "016353235ef1dd32a6c392be0e939058"
});
//#endregion

//# sourceMappingURL=docs.js.map