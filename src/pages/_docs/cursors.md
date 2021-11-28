---
title: Cursors
description: You can use different cursors to reflect the intended user interaction with particular elements of an interface. The cursor will change when a user hovers over a given element to indicate the action which can be performed.
menu: docs.utils.cursors
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

{% capture code %}
<div class="row text-center">
  <div class="col-4 mb-3">
    <div class="cursor-auto bg-light py-3">Cursor auto</div>
  </div>
  <div class="col-4 mb-3">
    <div class="cursor-pointer bg-light py-3">Cursor pointer</div>
  </div>
  <div class="col-4 mb-3">
    <div class="cursor-move bg-light py-3">Cursor move</div>
  </div>
  <div class="col-4 mb-3">
    <div class="cursor-not-allowed bg-light py-3">Cursor not allowed</div>
  </div>
  <div class="col-4 mb-3">
    <div class="cursor-zoom-in bg-light py-3">Cursor zoom in</div>
  </div>
  <div class="col-4 mb-3">
    <div class="cursor-zoom-out bg-light py-3">Cursor zoom out</div>
  </div>
  <div class="col-4 mb-3">
    <div class="cursor-default bg-light py-3">Cursor default</div>
  </div>
  <div class="col-4 mb-3">
    <div class="cursor-none bg-light py-3">Cursor none</div>
  </div>
  <div class="col-4 mb-3">
    <div class="cursor-help bg-light py-3">Cursor help</div>
  </div>
  <div class="col-4 mb-3">
    <div class="cursor-progress bg-light py-3">Cursor progress</div>
  </div>
  <div class="col-4 mb-3">
    <div class="cursor-wait bg-light py-3">Cursor wait</div>
  </div>
  <div class="col-4 mb-3">
    <div class="cursor-text bg-light py-3">Cursor text</div>
  </div>
  <div class="col-4">
    <div class="cursor-v-text bg-light py-3">Cursor vertical text</div>
  </div>
  <div class="col-4">
    <div class="cursor-grab bg-light py-3">Cursor grab</div>
  </div>
  <div class="col-4">
    <div class="cursor-grabbing bg-light py-3">Cursor grabbing</div>
  </div>
</div>
{% endcapture %}
{% include example.html code=code %}
