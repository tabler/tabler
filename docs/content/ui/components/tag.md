---
title: Tag
summary: Use tags to show compact metadata values with optional media, badges, and remove actions.
description: Build inline tag elements with the tag class API and related tag part classes.
---

## Overview

Use `.tag` for one inline tag item. The base style supports text and an optional `.btn-close` remove action.

{% capture html -%} <span class="tag"> Label <a href="#" class="btn-close" aria-label="Remove label"></a> </span> {%- endcapture %} {% include "docs/example.html" html=html centered %}

## Variants

### With icon

Use `.tag-icon` for a leading icon inside a tag. The icon uses compact size and secondary text color.

{% capture html -%} <span class="tag"> {% include "ui/icon.html" icon="star" class="tag-icon" %} Featured <a href="#" class="btn-close" aria-label="Remove featured tag"></a> </span> {%- endcapture %} {% include "docs/example.html" html=html centered %}

### With avatar, flag, or payment

Use `.tag-avatar`, `.tag-flag`, or `.tag-payment` to add media at the start of the tag. These classes keep spacing aligned with tag content.

{% capture html -%}
<div class="tags-list">
  <span class="tag">
    <span class="avatar avatar-xs tag-avatar">AP</span>
    Alex P.
    <a href="#" class="btn-close" aria-label="Remove Alex tag"></a>
  </span>
  <span class="tag">
    {% include "ui/flag.html" flag="us" size="xxs" class="tag-flag" %}United States
    <a href="#" class="btn-close" aria-label="Remove country tag"></a>
  </span>
  <span class="tag">
    {% include "ui/payment.html" provider="visa" size="xxs" class="tag-payment" %}Visa
    <a href="#" class="btn-close" aria-label="Remove payment tag"></a>
  </span>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

### With badge

Use `.tag-badge` for small numeric or status counters. The badge variant keeps compact padding for tag layout.

{% capture html -%} <span class="tag"> Notifications <span class="badge tag-badge">12</span> <a href="#" class="btn-close" aria-label="Remove notifications tag"></a> </span> {%- endcapture %} {% include "docs/example.html" html=html centered %}

### With checkbox

Use `.tag-check` on a checkbox when the tag should be selectable. This variant is useful for filter sets and selectable labels.

{% capture html -%} <span class="tag"> <input type="checkbox" class="form-check-input tag-check" checked /> Selected <a href="#" class="btn-close" aria-label="Remove selected tag"></a> </span> {%- endcapture %} {% include "docs/example.html" html=html centered %}

## Examples

### Tags list

Use `.tags-list` for groups of tags. It applies consistent spacing and wrapping between items.

{% capture html -%}
<div class="tags-list">
  <span class="tag">Alpha <a href="#" class="btn-close" aria-label="Remove alpha tag"></a></span>
  <span class="tag">Beta <a href="#" class="btn-close" aria-label="Remove beta tag"></a></span>
  <span class="tag">Gamma <a href="#" class="btn-close" aria-label="Remove gamma tag"></a></span>
  <span class="tag">Delta <a href="#" class="btn-close" aria-label="Remove delta tag"></a></span>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Accessibility

- Keep tag labels short and meaningful.
- Add `aria-label` to every close button action.
- Keep selectable tags keyboard reachable when using `.tag-check`.
- Ensure icon or media tags still include readable text.
