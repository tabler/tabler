---
"@tabler/core": patch
---

Fixed a stray vertical line and extra indentation on the `.steps` component, caused by the unrelated typographic `.steps` rule in `ui/_type.scss` leaking its guideline, padding and margins onto it. The typographic rule now skips any element with `.step-item` children, so the two no longer collide. It also no longer inherits the component's flex layout, and so works without `.steps-vertical` alongside it.
