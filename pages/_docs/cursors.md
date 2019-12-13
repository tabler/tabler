---
title: Cursors
menu: docs.cursors
---

### Cursor utilities 

- `.cursor-auto`- cursor style depends on what's inside element
- `.cursor-pointer` - pointing cursor
- `.cursor-move` - cursor showing that user can move something
- `.cursor-not-allowed` - cursor showing that user is not allowed to do something
- `.cursor-zoom-in` - cursor showing that user can zoom in
- `.cursor-zoom-out` - cursor showing that user can zoom out

{% example %}
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
  <div class="col-4">
    <div class="cursor-not-allowed bg-light py-3">Cursor not allowed</div>
  </div>
  <div class="col-4">
    <div class="cursor-zoom-in bg-light py-3">Cursor zoom in</div>
  </div>
  <div class="col-4">
    <div class="cursor-zoom-out bg-light py-3">Cursor zoom out</div>
  </div>
</div>
{% endexample %}
