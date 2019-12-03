---
title: Cursors
menu: docs.cursors
---

### Cursor utilities

Change the cursor style on the element's hover.

<div style="line-height:2rem;">
  <code>.cursor-auto</code> - cursor style depends on what's inside element<br>
  <code>.cursor-pointer</code> - pointing cursor<br>
  <code>.cursor-move</code> - cursor showing that user can move something<br>
  <code>.cursor-not-allowed</code> - cursor showing that user is not allowed to do something<br>
  <code>.cursor-zoom-in</code> - cursor showing that user can zoom in<br>
  <code>.cursor-zoom-out</code> - cursor showing that user can zoom out<br>
</div>


{% example html %}
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
