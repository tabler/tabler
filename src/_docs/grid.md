---
title: Grid utilities
icon: fe fe-grid
in_progress: true
description: Quickly and easily create layouts with the basic 12-column.
---

### Basic layout

Create basic grid layout using columns. With `.row` and `.col`, we can easily manipulate the layout.

{% example html %}
<div class="row mb-3">
  <div class="col-12"><div class="h-5 bg-gray-lighter rounded"></div></div>
</div>
<div class="row mb-3">
  <div class="col-6"><div class="h-5 bg-gray-lighter rounded"></div></div>
  <div class="col-6"><div class="h-5 bg-gray-lightest rounded"></div></div>
</div>
<div class="row mb-3">
  <div class="col-4"><div class="h-5 bg-gray-lighter rounded"></div></div>
  <div class="col-4"><div class="h-5 bg-gray-lightest rounded"></div></div>
  <div class="col-4"><div class="h-5 bg-gray-lighter rounded"></div></div>
</div>
<div class="row mb-3">
  <div class="col-3"><div class="h-5 bg-gray-lighter rounded"></div></div>
  <div class="col-3"><div class="h-5 bg-gray-lightest rounded"></div></div>
  <div class="col-3"><div class="h-5 bg-gray-lighter rounded"></div></div>
  <div class="col-3"><div class="h-5 bg-gray-lightest rounded"></div></div>
</div>
<div class="row mb-3">
  <div class="col-2"><div class="h-5 bg-gray-lighter rounded"></div></div>
  <div class="col-2"><div class="h-5 bg-gray-lightest rounded"></div></div>
  <div class="col-2"><div class="h-5 bg-gray-lighter rounded"></div></div>
  <div class="col-2"><div class="h-5 bg-gray-lightest rounded"></div></div>
  <div class="col-2"><div class="h-5 bg-gray-lighter rounded"></div></div>
  <div class="col-2"><div class="h-5 bg-gray-lightest rounded"></div></div>
</div>
{% endexample %}

### Column spacing

Row provides `.gutters-[size]` attribute to specify spacings between columns.

{% example html %}
<div class="row gutters-0 mb-3">
  <div class="col-3"><div class="h-5 bg-gray-lighter rounded"></div></div>
  <div class="col-3"><div class="h-5 bg-gray-lightest rounded"></div></div>
  <div class="col-3"><div class="h-5 bg-gray-lighter rounded"></div></div>
  <div class="col-3"><div class="h-5 bg-gray-lightest rounded"></div></div>
</div>
<div class="row gutters-xs mb-3">
  <div class="col-3"><div class="h-5 bg-gray-lighter rounded"></div></div>
  <div class="col-3"><div class="h-5 bg-gray-lightest rounded"></div></div>
  <div class="col-3"><div class="h-5 bg-gray-lighter rounded"></div></div>
  <div class="col-3"><div class="h-5 bg-gray-lightest rounded"></div></div>
</div>
<div class="row gutters-sm mb-3">
  <div class="col-3"><div class="h-5 bg-gray-lighter rounded"></div></div>
  <div class="col-3"><div class="h-5 bg-gray-lightest rounded"></div></div>
  <div class="col-3"><div class="h-5 bg-gray-lighter rounded"></div></div>
  <div class="col-3"><div class="h-5 bg-gray-lightest rounded"></div></div>
</div>
<div class="row gutters-md mb-3">
  <div class="col-3"><div class="h-5 bg-gray-lighter rounded"></div></div>
  <div class="col-3"><div class="h-5 bg-gray-lightest rounded"></div></div>
  <div class="col-3"><div class="h-5 bg-gray-lighter rounded"></div></div>
  <div class="col-3"><div class="h-5 bg-gray-lightest rounded"></div></div>
</div>
<div class="row gutters-lg mb-3">
  <div class="col-3"><div class="h-5 bg-gray-lighter rounded"></div></div>
  <div class="col-3"><div class="h-5 bg-gray-lightest rounded"></div></div>
  <div class="col-3"><div class="h-5 bg-gray-lighter rounded"></div></div>
  <div class="col-3"><div class="h-5 bg-gray-lightest rounded"></div></div>
</div>
{% endexample %}