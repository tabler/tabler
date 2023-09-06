import o from "react";
const m = ({ children: t }) => /* @__PURE__ */ o.createElement("div", null, t);
function a(t) {
  var r, e, n = "";
  if (typeof t == "string" || typeof t == "number")
    n += t;
  else if (typeof t == "object")
    if (Array.isArray(t))
      for (r = 0; r < t.length; r++)
        t[r] && (e = a(t[r])) && (n && (n += " "), n += e);
    else
      for (r in t)
        t[r] && (n && (n += " "), n += r);
  return n;
}
function l() {
  for (var t, r, e = 0, n = ""; e < arguments.length; )
    (t = arguments[e++]) && (r = a(t)) && (n && (n += " "), n += r);
  return n;
}
const p = ({ href: t, size: r, primary: e, children: n, disabled: s, className: c, ...i }) => {
  const u = l(
    "btn",
    {
      "btn-primary": e,
      [`btn-${r}`]: !!r,
      disabled: s
    },
    c
  );
  return /* @__PURE__ */ o.createElement("a", { className: u, href: t, ...i }, n);
}, y = ({ children: t, size: r, className: e }) => /* @__PURE__ */ o.createElement("div", { className: l("container", {
  [`container-${r}`]: !!r
}, e), style: { outline: "1px solid red" } }, t);
export {
  m as Alert,
  p as Button,
  y as Container
};
