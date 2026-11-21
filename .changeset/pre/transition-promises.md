---
"@tabler/core": minor
"@tabler/docs": patch
---

Added Promise return values to `show()`, `hide()`, `toggle()` and `close()` that resolve when the transition ends. Projects that lint with `@typescript-eslint/no-floating-promises` need to mark the calls they do not await with `void`, for example `void modal.show()`.
