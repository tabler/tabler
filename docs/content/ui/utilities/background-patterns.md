---
title: Background patterns
summary: Use background pattern utilities to add subtle textures to elements. Combine pattern type, color, and size modifiers for different visual effects.
description: Add decorative background patterns with utility classes.
added-in: "1.4.0"
source-css: "ui/_patterns.scss"
---

{% assign patterns = "diagonal,diagonal-2,dots,rectangles,lines,lines-vertical,grid,grid-diagonal,blueprint,circles,diagonal-stripes,diagonal-stripes-2,zigzag,vertical-stripes,horizontal-stripes" | split: "," %}

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

{% for pattern in patterns %}
- `.bg-pattern-{{ pattern }}`
{%- endfor %}

Here are the available pattern types:

{% capture html -%}
<div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3">
  {% for pattern in patterns %}
  <div class="col">
    <div class="bg-pattern-{{ pattern }} rounded mb-2" style="height: 6rem;"></div>
    <code>.bg-pattern-{{ pattern }}</code>
  </div>
  {% endfor %}
</div>
{%- endcapture %}
{% capture code %}
{% for pattern in patterns -%}
<div class="bg-pattern-{{ pattern }}"></div>
{% endfor %}
{% endcapture %}
{% include "docs/example.html" html=html code=code bg="surface-primary" %}

## Pattern colors

Combine any pattern with color modifiers using `.bg-pattern-{color}`.
See the [full list of available colors](/ui/base/colors) for all color names.

{% capture html -%}
<div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-6 g-3">
  {% for color in site.colors %}
  <div class="col">
    <div class="bg-pattern-diagonal-stripes-2 bg-pattern-{{ color[0] }} rounded mb-2" style="height: 6rem;"></div>
    <code>.bg-pattern-{{ color[0] }}</code>
  </div>
  {% endfor %}
</div>
{%- endcapture %}
{% capture code %}
{% for color in site.colors -%}
<div class="bg-pattern-diagonal-stripes-2 bg-pattern-{{ color[0] }}"></div>
{% endfor %}
{% endcapture %}
{% include "docs/example.html" html=html code=code bg="surface-primary" %}

## Pattern sizes

Use size utilities to control pattern density:

- `.bg-pattern-sm`
- `.bg-pattern-md`
- `.bg-pattern-lg`

Look at the following examples to see how the pattern sizes work:

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
{% capture code %}
<div class="bg-pattern-circles bg-pattern-sm"></div>
<div class="bg-pattern-circles bg-pattern-md"></div>
<div class="bg-pattern-circles bg-pattern-lg"></div>
<div class="bg-pattern-circles bg-pattern-xl"></div>
{% endcapture %}
{% include "docs/example.html" html=html code=code bg="surface-primary" %}

## Examples

Look at the following examples to see how the pattern sizes work

### Card with background pattern

Card with a background pattern in the body can be used to add a decorative touch to the card. This is useful when you want to add a subtle pattern to the card without affecting the readability of the content.

{% capture html -%}
<div class="card">
  <div class="card-body">
    Here is example of a card with a background pattern.
  </div>
</div>
{%- endcapture %}
{% capture code %}
<div class="bg-pattern-diagonal">
  <div class="card">
    ...
  </div>
</div>
{% endcapture %}
{% include "docs/example.html" html=html code=code bg="pattern-diagonal" column %}

### Pattern of transparent background

If you want to use a pattern as a background for a transparent element, you can use the `bg-pattern-transparent` class. It can simulate a transparent background.

{% capture html -%}
{% include "ui/illustration.html" image="boy-with-key.svg" class="d-block mx-auto mw-100" height=200 %}
{%- endcapture %}
{% capture code %}
<div class="bg-pattern-rectangles p-4">
  <!-- Illustration code here -->
</div>
{% endcapture %}
{% include "docs/example.html" html=html code=code bg="pattern-rectangles" column %}

## Accessibility

Background patterns are decorative and should never reduce content readability:

- Keep sufficient contrast between text and background.
- Prefer placing patterns on containers around text-heavy content, not directly behind long paragraphs.
- For callouts and alerts, test color and pattern combinations in both light and dark contexts.

## Best practices

- Start with `.bg-pattern-sm` for dense UIs and increase size only when needed.
- Avoid stacking multiple decorative backgrounds in the same section.
- Use strong pattern colors on small surfaces (headers, badges, callouts), and subtler combinations on large sections.