---
title: Background patterns
summary: Use background pattern utilities to add subtle textures to elements. Combine pattern type, color, and size modifiers for different visual effects.
description: Add decorative background patterns with utility classes.
---

## Overview

Background pattern utilities let you apply decorative, repeatable textures to elements like cards, sections, and placeholders.
Start with a pattern type class, then optionally combine it with color and size modifiers.

```html
<div class="bg-pattern-diagonal"></div>
<div class="bg-pattern-grid bg-pattern-primary"></div>
<div class="bg-pattern-circles bg-pattern-lg"></div>
```

## Pattern types

Use one of the available pattern classes to define the shape and direction of the texture:

- `.bg-pattern-diagonal`
- `.bg-pattern-diagonal-2`
- `.bg-pattern-dots`
- `.bg-pattern-rectangles`
- `.bg-pattern-lines`
- `.bg-pattern-lines-vertical`
- `.bg-pattern-grid`
- `.bg-pattern-grid-diagonal`
- `.bg-pattern-blueprint`
- `.bg-pattern-circles`
- `.bg-pattern-diagonal-stripes`
- `.bg-pattern-diagonal-stripes-2`
- `.bg-pattern-zigzag`
- `.bg-pattern-vertical-stripes`
- `.bg-pattern-horizontal-stripes`

{% capture html -%}
<div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3">
  <div class="col">
    <div class="bg-pattern-diagonal rounded mb-2" style="height: 6rem;"></div>
    <code>.bg-pattern-diagonal</code>
  </div>
  <div class="col">
    <div class="bg-pattern-diagonal-2 rounded mb-2" style="height: 6rem;"></div>
    <code>.bg-pattern-diagonal-2</code>
  </div>
  <div class="col">
    <div class="bg-pattern-dots rounded mb-2" style="height: 6rem;"></div>
    <code>.bg-pattern-dots</code>
  </div>
  <div class="col">
    <div class="bg-pattern-rectangles rounded mb-2" style="height: 6rem;"></div>
    <code>.bg-pattern-rectangles</code>
  </div>
  <div class="col">
    <div class="bg-pattern-lines rounded mb-2" style="height: 6rem;"></div>
    <code>.bg-pattern-lines</code>
  </div>
  <div class="col">
    <div class="bg-pattern-lines-vertical rounded mb-2" style="height: 6rem;"></div>
    <code>.bg-pattern-lines-vertical</code>
  </div>
  <div class="col">
    <div class="bg-pattern-grid rounded mb-2" style="height: 6rem;"></div>
    <code>.bg-pattern-grid</code>
  </div>
  <div class="col">
    <div class="bg-pattern-grid-diagonal rounded mb-2" style="height: 6rem;"></div>
    <code>.bg-pattern-grid-diagonal</code>
  </div>
  <div class="col">
    <div class="bg-pattern-blueprint rounded mb-2" style="height: 6rem;"></div>
    <code>.bg-pattern-blueprint</code>
  </div>
  <div class="col">
    <div class="bg-pattern-circles rounded mb-2" style="height: 6rem;"></div>
    <code>.bg-pattern-circles</code>
  </div>
  <div class="col">
    <div class="bg-pattern-diagonal-stripes rounded mb-2" style="height: 6rem;"></div>
    <code>.bg-pattern-diagonal-stripes</code>
  </div>
  <div class="col">
    <div class="bg-pattern-diagonal-stripes-2 rounded mb-2" style="height: 6rem;"></div>
    <code>.bg-pattern-diagonal-stripes-2</code>
  </div>
  <div class="col">
    <div class="bg-pattern-zigzag rounded mb-2" style="height: 6rem;"></div>
    <code>.bg-pattern-zigzag</code>
  </div>
  <div class="col">
    <div class="bg-pattern-vertical-stripes rounded mb-2" style="height: 6rem;"></div>
    <code>.bg-pattern-vertical-stripes</code>
  </div>
  <div class="col">
    <div class="bg-pattern-horizontal-stripes rounded mb-2" style="height: 6rem;"></div>
    <code>.bg-pattern-horizontal-stripes</code>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html bg="surface-primary" %}

## Pattern colors

Combine any pattern with color modifiers using `.bg-pattern-{color}`.
See the [full list of available colors](/ui/base/colors) for all color names.

```html
<div class="bg-pattern-rectangles bg-pattern-primary"></div>
<div class="bg-pattern-rectangles bg-pattern-success"></div>
<div class="bg-pattern-rectangles bg-pattern-danger"></div>
<div class="bg-pattern-rectangles bg-pattern-warning"></div>
```

{% capture html -%}
<div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-6 g-3">
  <div class="col">
    <div class="bg-pattern-rectangles bg-pattern-primary rounded mb-2" style="height: 6rem;"></div>
    <code>.bg-pattern-primary</code>
  </div>
  <div class="col">
    <div class="bg-pattern-rectangles bg-pattern-secondary rounded mb-2" style="height: 6rem;"></div>
    <code>.bg-pattern-secondary</code>
  </div>
  <div class="col">
    <div class="bg-pattern-rectangles bg-pattern-success rounded mb-2" style="height: 6rem;"></div>
    <code>.bg-pattern-success</code>
  </div>
  <div class="col">
    <div class="bg-pattern-rectangles bg-pattern-danger rounded mb-2" style="height: 6rem;"></div>
    <code>.bg-pattern-danger</code>
  </div>
  <div class="col">
    <div class="bg-pattern-rectangles bg-pattern-warning rounded mb-2" style="height: 6rem;"></div>
    <code>.bg-pattern-warning</code>
  </div>
  <div class="col">
    <div class="bg-pattern-rectangles bg-pattern-info rounded mb-2" style="height: 6rem;"></div>
    <code>.bg-pattern-info</code>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html bg="surface-primary" %}

## Pattern sizes

Use size utilities to control pattern density:

- `.bg-pattern-sm`
- `.bg-pattern-md`
- `.bg-pattern-lg`

```html
<div class="bg-pattern-circles bg-pattern-sm"></div>
<div class="bg-pattern-circles bg-pattern-md"></div>
<div class="bg-pattern-circles bg-pattern-lg"></div>
```

{% capture html -%}
<div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
  <div class="col">
    <div class="bg-pattern-circles bg-pattern-sm rounded mb-2" style="height: 6rem;"></div>
    <code>.bg-pattern-sm</code>
  </div>
  <div class="col">
    <div class="bg-pattern-circles bg-pattern-md rounded mb-2" style="height: 6rem;"></div>
    <code>.bg-pattern-md</code>
  </div>
  <div class="col">
    <div class="bg-pattern-circles bg-pattern-lg rounded mb-2" style="height: 6rem;"></div>
    <code>.bg-pattern-lg</code>
  </div>
  <div class="col">
    <div class="bg-pattern-circles bg-pattern-xl rounded mb-2" style="height: 6rem;"></div>
    <code>.bg-pattern-xl</code>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html bg="surface-primary" %}
