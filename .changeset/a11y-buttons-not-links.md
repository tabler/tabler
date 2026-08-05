---
"@tabler/preview": patch
---

Converted `<a href="#">` controls that only trigger JavaScript (dropdown toggles, toast dismiss, modal and carousel controls) into real `<button>` elements so they work with the keyboard, and removed `tabindex="-1"` from navbar toggles and links that were wrongly skipped when tabbing.
