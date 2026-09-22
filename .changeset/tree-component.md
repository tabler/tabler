---
"@tabler/core": minor
"@tabler/preview": minor
"@tabler/docs": minor
---

Added the Tree component (`.tree`) with expandable folders, links and checkboxes, plus a `Tree.astro` wrapper. Folders open and close with native `<details>`; folders with a checkbox use a `.tree-toggle` button instead of `<summary>`. The toggle arrow is a masked `chevron-right` icon that rotates on open, and folder icons swap between `.tree-icon-open` and `.tree-icon-closed`. With `data-bs-toggle="tree"` a folder checkbox checks its children, a partly checked folder shows the indeterminate state, and `changed.bs.tree` fires after the cascade settles.
