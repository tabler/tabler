---
title: Star Rating
summary: Use star rating to show score values with static stars or interactive star states.
description: Build star rating UI with stars classes and data-star-rating state selectors.
---

## Overview

Use `.stars` as the container and `.star` for each icon.
This creates an inline star row with spacing and base color.

{% capture html -%}
<div class="stars">
  <span class="star text-yellow">{% include "ui/icon.html" icon="star" type="filled" %}</span>
  <span class="star text-yellow">{% include "ui/icon.html" icon="star" type="filled" %}</span>
  <span class="star text-yellow">{% include "ui/icon.html" icon="star" type="filled" %}</span>
  <span class="star text-yellow">{% include "ui/icon.html" icon="star" type="filled" %}</span>
  <span class="star">{% include "ui/icon.html" icon="star" type="filled" %}</span>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Variants

### Static value rows

Use `.stars` for read-only values in lists and cards.
Color only the active stars and keep the rest in default color.

{% capture html -%}
<div class="space-y">
  <div class="d-flex justify-content-between align-items-center">
    <span>Product quality</span>
    <div class="stars">
      <span class="star text-yellow">{% include "ui/icon.html" icon="star" type="filled" %}</span>
      <span class="star text-yellow">{% include "ui/icon.html" icon="star" type="filled" %}</span>
      <span class="star text-yellow">{% include "ui/icon.html" icon="star" type="filled" %}</span>
      <span class="star text-yellow">{% include "ui/icon.html" icon="star" type="filled" %}</span>
      <span class="star text-yellow">{% include "ui/icon.html" icon="star" type="filled" %}</span>
    </div>
  </div>
  <div class="d-flex justify-content-between align-items-center">
    <span>Delivery speed</span>
    <div class="stars">
      <span class="star text-yellow">{% include "ui/icon.html" icon="star" type="filled" %}</span>
      <span class="star text-yellow">{% include "ui/icon.html" icon="star" type="filled" %}</span>
      <span class="star text-yellow">{% include "ui/icon.html" icon="star" type="filled" %}</span>
      <span class="star">{% include "ui/icon.html" icon="star" type="filled" %}</span>
      <span class="star">{% include "ui/icon.html" icon="star" type="filled" %}</span>
    </div>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

### Data-star-rating states

The vendor styles also target `[data-star-rating]`.
Use `.gl-active` and `.gl-star-full` to control active and inactive star color.

{% capture html -%}
<div data-star-rating class="d-flex gap-1" style="--tblr-icon-size: 1.25rem;">
  <span class="gl-active">{% include "ui/icon.html" icon="star" type="filled" class="gl-star-full" %}</span>
  <span class="gl-active">{% include "ui/icon.html" icon="star" type="filled" class="gl-star-full" %}</span>
  <span class="gl-active">{% include "ui/icon.html" icon="star" type="filled" class="gl-star-full" %}</span>
  <span>{% include "ui/icon.html" icon="star" type="filled" class="gl-star-full" %}</span>
  <span>{% include "ui/icon.html" icon="star" type="filled" class="gl-star-full" %}</span>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

### Custom rating colors

Use CSS custom properties from vendor styles to change star colors.
You can set active and inactive colors per instance.

{% capture html -%}
<div data-star-rating class="d-flex gap-1" style="--gl-star-color: var(--tblr-red); --gl-star-color-inactive: var(--tblr-border-color); --tblr-icon-size: 1.25rem;">
  <span class="gl-active">{% include "ui/icon.html" icon="heart" type="filled" class="gl-star-full" %}</span>
  <span class="gl-active">{% include "ui/icon.html" icon="heart" type="filled" class="gl-star-full" %}</span>
  <span class="gl-active">{% include "ui/icon.html" icon="heart" type="filled" class="gl-star-full" %}</span>
  <span>{% include "ui/icon.html" icon="heart" type="filled" class="gl-star-full" %}</span>
  <span>{% include "ui/icon.html" icon="heart" type="filled" class="gl-star-full" %}</span>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Examples

### Summary rating block

Combine stars with text to show score and vote count.
This pattern works for cards, reviews, and product lists.

{% capture html -%}
<div class="d-flex align-items-center gap-2">
  <div class="stars">
    <span class="star text-yellow">{% include "ui/icon.html" icon="star" type="filled" %}</span>
    <span class="star text-yellow">{% include "ui/icon.html" icon="star" type="filled" %}</span>
    <span class="star text-yellow">{% include "ui/icon.html" icon="star" type="filled" %}</span>
    <span class="star text-yellow">{% include "ui/icon.html" icon="star" type="filled" %}</span>
    <span class="star">{% include "ui/icon.html" icon="star" type="filled" %}</span>
  </div>
  <span class="text-secondary">4.0 (128 reviews)</span>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Accessibility

- Add a text label near stars, for example `4.0 out of 5`.
- For read-only stars, keep the value visible in text.
- For interactive ratings, ensure keyboard focus and clear selected state.
- Do not rely on color alone; pair color with a numeric value.
