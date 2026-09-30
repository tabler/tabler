---
"@tabler/core": minor
"@tabler/docs": patch
"@tabler/preview": patch
---

`InputMask` no longer needs IMask. It formats `data-mask` patterns natively, with the same `0`, `a` and `*` characters, and adds the `tokens` and `placeholderChar` options, a function as `mask`, the `unmaskedValue` and `isComplete` properties and the `accept.bs.input-mask` and `complete.bs.input-mask` events. IMask object masks (`Number`, `Date`, a RegExp) still work when IMask is loaded, but are deprecated.
