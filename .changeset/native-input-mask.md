---
"@tabler/core": minor
"@tabler/docs": patch
"@tabler/preview": patch
---

`InputMask` no longer needs IMask. It formats `data-mask` patterns natively, with the same `0`, `a` and `*` characters, and adds the `tokens` and `placeholderChar` options, a function as `mask`, the `unmaskedValue` and `isComplete` properties and the `accept.bs.input-mask` and `complete.bs.input-mask` events. Added a number type, `data-mask-type="number"`, with `scale`, `radix`, `thousandsSeparator`, `min`, `max`, `prefix`, `suffix` and `padFractionalZeros`. Added a date type, `data-mask-type="date"` with `data-mask-format`, and `data-mask-ranges` to limit the groups of digits of a pattern. IMask object masks (`Number`, `Date`, a RegExp) still work when IMask is loaded, but are deprecated.
