---
'@tabler/core': patch
'@tabler/preview': patch
'@tabler/docs': patch
---

Renamed `.badges-list` to `.badge-list` and `.tags-list` to `.tag-list` so every element list follows the same singular naming as `.btn-list` and `.avatar-list`. The old class names still work as deprecated aliases. Documentation examples and preview pages that show several buttons, badges, avatars, or tags in one
row now use the matching list container, including the job listing page, which was using a `badges`
class that had no styles at all.
