---
title: Segmented Control
summary: A segmented control is a set of two or more segments, each of which functions as a mutually exclusive button. A segmented control is used to display a set of mutually exclusive options.
---

To create a segmented control, use the `nav` element with the `nav-segmented` class. Inside the `nav` element, add `button` or `a` elements with the `nav-link` class. The `nav-link` class is used to style the buttons as links.

{% capture html -%}
<nav class="nav nav-segmented" role="tablist">
  <button
    class="nav-link active"
    role="tab"
    data-bs-toggle="tab"
    aria-selected="true"
    aria-current="page"
  >
    First
  </button>
  <button class="nav-link" role="tab" data-bs-toggle="tab" aria-selected="false" tabindex="-1">
    Second
  </button>
  <button
    class="nav-link"
    disabled
    role="tab"
    data-bs-toggle="tab"
    aria-selected="false"
    tabindex="-1"
  >
    Disabled
  </button>
</nav>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Full width

To make the segmented control full width, add the `w-100` class to the `nav` element. It will take up the full width of its parent container.

```html
<nav class="nav nav-segmented w-100" role="tablist">...</nav>
```

The results can be seen in the example below.

{% capture html -%}
<nav class="nav nav-segmented w-100" role="tablist">
  <button
    class="nav-link active"
    role="tab"
    data-bs-toggle="tab"
    aria-selected="true"
    aria-current="page"
  >
    Daily
  </button>
  <button class="nav-link" role="tab" data-bs-toggle="tab" aria-selected="false" tabindex="-1">
    Weekly
  </button>
  <button class="nav-link" role="tab" data-bs-toggle="tab" aria-selected="false" tabindex="-1">
    Monthly
  </button>
  <button class="nav-link" role="tab" data-bs-toggle="tab" aria-selected="false" tabindex="-1">
    Quarterly
  </button>
  <button class="nav-link" role="tab" data-bs-toggle="tab" aria-selected="false" tabindex="-1">
    Yearly
  </button>
</nav>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## With emojis

You can also use emojis in the segmented control. To do this, add the emoji inside the `button` element.

{% capture html -%}
<nav class="nav nav-segmented nav-1" role="tablist">
  <button
    class="nav-link active"
    role="tab"
    data-bs-toggle="tab"
    aria-selected="true"
    aria-current="page"
  >
    👦
  </button>
  <button class="nav-link" role="tab" data-bs-toggle="tab" aria-selected="false" tabindex="-1">
    👦🏿
  </button>
  <button class="nav-link" role="tab" data-bs-toggle="tab" aria-selected="false" tabindex="-1">
    👦🏾
  </button>
  <button class="nav-link" role="tab" data-bs-toggle="tab" aria-selected="false" tabindex="-1">
    👦🏽
  </button>
  <button class="nav-link" role="tab" data-bs-toggle="tab" aria-selected="false" tabindex="-1">
    👦🏼
  </button>
  <button class="nav-link" role="tab" data-bs-toggle="tab" aria-selected="false" tabindex="-1">
    👦🏻
  </button>
</nav>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## With icons

You can also use icons in the segmented control. To do this, add the icon inside the `button` element.


{% capture html -%}
<nav class="nav nav-segmented" role="tablist">
  <button
    class="nav-link active"
    role="tab"
    data-bs-toggle="tab"
    aria-selected="true"
    aria-current="page"
  >
    {% include "ui/icon.html" icon="list" %}
    List
  </button>
  <button class="nav-link" role="tab" data-bs-toggle="tab" aria-selected="false" tabindex="-1">
    {% include "ui/icon.html" icon="layout" %}
    Kanban
  </button>
  <button class="nav-link" role="tab" data-bs-toggle="tab" aria-selected="false" tabindex="-1">
    {% include "ui/icon.html" icon="calendar" %}
    Calendar
  </button>
  <button class="nav-link" role="tab" data-bs-toggle="tab" aria-selected="false" tabindex="-1">
    {% include "ui/icon.html" icon="files" %}
    Files
  </button>
</nav>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Vertical direction

To create a vertical segmented control, add the `nav-segmented-vertical` class to the `nav` element.

```html
<nav class="nav nav-segmented-vertical" role="tablist">...</nav>
```

The results can be seen in the example below.

{% capture html -%}
<nav class="nav nav-segmented nav-segmented-vertical" role="tablist">
  <button
    class="nav-link active"
    role="tab"
    data-bs-toggle="tab"
    aria-selected="true"
    aria-current="page"
  >
    {% include "ui/icon.html" icon="list" %}
    List
  </button>
  <button class="nav-link" role="tab" data-bs-toggle="tab" aria-selected="false" tabindex="-1">
    {% include "ui/icon.html" icon="layout" %}
    Kanban
  </button>
  <button class="nav-link" role="tab" data-bs-toggle="tab" aria-selected="false" tabindex="-1">
    {% include "ui/icon.html" icon="calendar" %}
    Calendar
  </button>
  <button class="nav-link" role="tab" data-bs-toggle="tab" aria-selected="false" tabindex="-1">
    {% include "ui/icon.html" icon="files" %}
    Files
  </button>
</nav>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Sizes 

You can also change the size of the segmented control. To do this, add the `nav-sm` or `nv-lg` class to the `nav` element. The `nav-sm` class will make the segmented control smaller, while the `nav-lg` class will make it larger.

```html
<nav class="nav nav-segmented nav-sm" role="tablist">...</nav>
```

The results can be seen in the examples below.

{% capture html -%}
<nav class="nav nav-segmented nav-sm" role="tablist">
  <button
    class="nav-link active"
    role="tab"
    data-bs-toggle="tab"
    aria-selected="true"
    aria-current="page"
  >
    List
  </button>
  <button class="nav-link" role="tab" data-bs-toggle="tab" aria-selected="false" tabindex="-1">
    Kanban
  </button>
  <button
    class="nav-link disabled"
    role="tab"
    data-bs-toggle="tab"
    aria-selected="false"
    aria-disabled="true"
    tabindex="-1"
  >
    Calendar
  </button>
  <button class="nav-link" role="tab" data-bs-toggle="tab" aria-selected="false" tabindex="-1">
    Files
  </button>
</nav>
<nav class="nav nav-segmented nav-lg" role="tablist">
  <button
    class="nav-link active"
    role="tab"
    data-bs-toggle="tab"
    aria-selected="true"
    aria-current="page"
  >
    List
  </button>
  <button class="nav-link" role="tab" data-bs-toggle="tab" aria-selected="false" tabindex="-1">
    Kanban
  </button>
  <button
    class="nav-link disabled"
    role="tab"
    data-bs-toggle="tab"
    aria-selected="false"
    aria-disabled="true"
    tabindex="-1"
  >
    Calendar
  </button>
  <button class="nav-link" role="tab" data-bs-toggle="tab" aria-selected="false" tabindex="-1">
    Files
  </button>
</nav>
{%- endcapture %}
{% include "docs/example.html" html=html centered vertical %}