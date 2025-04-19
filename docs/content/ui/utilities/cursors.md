---
title: Cursors
summary: You can use different cursors to reflect the intended user interaction with particular elements of an interface. The cursor will change when a user hovers over a given element to indicate the action which can be performed.
description: Custom cursors for enhanced interaction.
---

## Cursor utilities

Use one of the available cursor utilities depending on the action you want to indicate.

- `.cursor-auto`- the cursor style depends on what's inside a given element
- `.cursor-pointer` - a pointing cursor, used to show that an element is clickable
- `.cursor-move` - a cursor which shows that a given element can be moved
- `.cursor-not-allowed` - a cursor which shows that a user is not allowed to perform an action on an element
- `.cursor-zoom-in` - a cursor which shows that a user can zoom in
- `.cursor-zoom-out` - a cursor which shows that a user can zoom out
- `.cursor-default` - the default cursor
- `.cursor-none` - no cursor
- `.cursor-help` - a cursor which shows that help information is available
- `.cursor-progress` - a cursor which shows that an action is in progress
- `.cursor-wait` - a cursor which shows that a user cannot interact with the element because it is busy
- `.cursor-text` - a cursor which shows that a user can type
- `.cursor-v-text` - a cursor which shows that a user can type in a vertical text input
- `.cursor-grab` - a cursor which shows that a user can grab an element
- `.cursor-grabbing` - a cursor which shows that a user is grabbing an element

```html
<div class="cursor-auto">auto</div>
<div class="cursor-pointer">pointer</div>
<div class="cursor-move">move</div>
<div class="cursor-not-allowed">not-allowed</div>
<div class="cursor-zoom-in">zoom-in</div>
<div class="cursor-zoom-out">zoom-out</div>
<div class="cursor-default">default</div>
<div class="cursor-none">none</div>
<div class="cursor-help">help</div>
<div class="cursor-progress">progress</div>
<div class="cursor-wait">wait</div>
<div class="cursor-text">text</div>
<div class="cursor-v-text">vertical-text</div>
<div class="cursor-grab">grab</div>
<div class="cursor-grabbing">grabbing</div>
```

The results can be seen in the example below.

{% capture html -%}
<div class="row g-4 row-cols-4">
	<div><div class="cursor-auto bg-surface-secondary p-3">auto</div></div>
	<div><div class="cursor-pointer bg-surface-secondary p-3">pointer</div></div>
	<div><div class="cursor-move bg-surface-secondary p-3">move</div></div>
	<div><div class="cursor-not-allowed bg-surface-secondary p-3">not-allowed</div></div>
	<div><div class="cursor-zoom-in bg-surface-secondary p-3">zoom-in</div></div>
	<div><div class="cursor-zoom-out bg-surface-secondary p-3">zoom-out</div></div>
	<div><div class="cursor-default bg-surface-secondary p-3">default</div></div>
	<div><div class="cursor-none bg-surface-secondary p-3">none</div></div>
	<div><div class="cursor-help bg-surface-secondary p-3">help</div></div>
	<div><div class="cursor-progress bg-surface-secondary p-3">progress</div></div>
	<div><div class="cursor-wait bg-surface-secondary p-3">wait</div></div>
	<div><div class="cursor-text bg-surface-secondary p-3">text</div></div>
	<div><div class="cursor-v-text bg-surface-secondary p-3">vertical-text</div></div>
	<div><div class="cursor-grab bg-surface-secondary p-3">grab</div></div>
	<div><div class="cursor-grabbing bg-surface-secondary p-3">grabbing</div></div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html hide-code %}