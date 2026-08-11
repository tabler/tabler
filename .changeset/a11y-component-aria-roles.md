---
"@tabler/preview": patch
---

Added missing ARIA roles and states to `Pagination`, `NavSegmented`, `Accordion`, `Steps`, tab components, `Modal`, `Offcanvas` and `CarouselCard`, including `aria-current`, `aria-controls`, `aria-labelledby`, `aria-modal` and `role="tabpanel"`, and fixed a bug where the active `Steps` index was never highlighted because it compared a string prop to a number.
