---
"@tabler/core": patch
---

Fixed tab, tooltip, popover, dropdown and toast init running before `DOMContentLoaded`, dropping early listeners.
