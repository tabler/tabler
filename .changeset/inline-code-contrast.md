---
"@tabler/core": patch
---

Fixed inline `code` blending into the surrounding text or becoming unreadable on colored surfaces such as buttons: it now takes the color of the surrounding text and uses a 10% tint of that color as its background, instead of gray text on `--tblr-fill-tertiary`.
