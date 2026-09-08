---
"@tabler/core": major
"@tabler/docs": patch
---

Added cascade layers to `tabler.css`: `@layer colors, config, root, reboot, layout, content, forms, components, custom, helpers, utilities`. Every Tabler rule now sits in one of these layers, so unlayered project CSS wins on every property, and a project `!important` no longer beats a Tabler `!important`. Put layered overrides in `custom` or in a layer declared after Tabler's.
