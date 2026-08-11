---
"@tabler/preview": patch
"@tabler/docs": patch
---

Fixed the "Skip to main content" link so it becomes visible on keyboard focus, added missing `<main>` landmarks to layouts that had none, gave the sidebar and docs navigation `<nav aria-label>` landmarks instead of unlabeled `<div>`s, and fixed heading hierarchy and duplicate page `<title>`s across several preview pages.
