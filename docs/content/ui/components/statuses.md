---
title: Statuses
summary: Status dots are particularly useful if you want to make an interface element more noticeable regardless of limited space.
description: Highlight interface elements with status dots.
---

## Default markup

Use the default status to notify users about the status of a component or page, helping them avoid confusion. Full list of available colors can be found in the [Colors](/ui/base/colors) section.

{% capture html -%}
<span class="status status-blue">Blue</span>
<span class="status status-azure">Azure</span>
<span class="status status-indigo">Indigo</span>
<span class="status status-purple">Purple</span>
<span class="status status-pink">Pink</span>
<span class="status status-red">Red</span>
<span class="status status-orange">Orange</span>
<span class="status status-yellow">Yellow</span>
<span class="status status-lime">Lime</span>
<span class="status status-green">Green</span>
<span class="status status-teal">Teal</span>
<span class="status status-cyan">Cyan</span>
{%- endcapture %}
{% include "docs/example.html" html=html %}


## Status with dot

You can add a dot to the status to make it more noticeable. To do this, use the `.status-dot` element inside the `.status` element.

{% capture html -%}
<span class="status status-blue">
  <span class="status-dot"></span>
  Blue
</span>
<span class="status status-azure">
  <span class="status-dot"></span>
  Azure
</span>
<span class="status status-indigo">
  <span class="status-dot"></span>
  Indigo
</span>
<span class="status status-purple">
  <span class="status-dot"></span>
  Purple
</span>
<span class="status status-pink">
  <span class="status-dot"></span>
  Pink
</span>
<span class="status status-red">
  <span class="status-dot"></span>
  Red
</span>
<span class="status status-orange">
  <span class="status-dot"></span>
  Orange
</span>
<span class="status status-yellow">
  <span class="status-dot"></span>
  Yellow
</span>
<span class="status status-lime">
  <span class="status-dot"></span>
  Lime
</span>
<span class="status status-green">
  <span class="status-dot"></span>
  Green
</span>
<span class="status status-teal">
  <span class="status-dot"></span>
  Teal
</span>
<span class="status status-cyan">
  <span class="status-dot"></span>
  Cyan
</span>
{%- endcapture %}
{% include "docs/example.html" html=html %}

### Animated dot

You can also animate the dot to make it more noticeable. To do this, add a `.status-dot-animated` class to the `.status-dot` element.

{% capture html -%}
<span class="status status-blue">
  <span class="status-dot status-dot-animated"></span>
  Blue
</span>
<span class="status status-azure">
  <span class="status-dot status-dot-animated"></span>
  Azure
</span>
<span class="status status-indigo">
  <span class="status-dot status-dot-animated"></span>
  Indigo
</span>
<span class="status status-purple">
  <span class="status-dot status-dot-animated"></span>
  Purple
</span>
<span class="status status-pink">
  <span class="status-dot status-dot-animated"></span>
  Pink
</span>
<span class="status status-red">
  <span class="status-dot status-dot-animated"></span>
  Red
</span>
<span class="status status-orange">
  <span class="status-dot status-dot-animated"></span>
  Orange
</span>
<span class="status status-yellow">
  <span class="status-dot status-dot-animated"></span>
  Yellow
</span>
<span class="status status-lime">
  <span class="status-dot status-dot-animated"></span>
  Lime
</span>
<span class="status status-green">
  <span class="status-dot status-dot-animated"></span>
  Green
</span>
<span class="status status-teal">
  <span class="status-dot status-dot-animated"></span>
  Teal
</span>
<span class="status status-cyan">
  <span class="status-dot status-dot-animated"></span>
  Cyan
</span>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Lite status

Use the lite status to make the status less noticeable. To do this, add a `.status-lite` class to the `.status` element.

{% capture html -%}
<span class="status status-blue status-lite">
  <span class="status-dot"></span>
  Blue
</span>
<span class="status status-azure status-lite">
  <span class="status-dot"></span>
  Azure
</span>
<span class="status status-indigo status-lite">
  <span class="status-dot"></span>
  Indigo
</span>
<span class="status status-purple status-lite">
  <span class="status-dot"></span>
  Purple
</span>
<span class="status status-pink status-lite">
  <span class="status-dot"></span>
  Pink
</span>
<span class="status status-red status-lite">
  <span class="status-dot"></span>
  Red
</span>
<span class="status status-orange status-lite">
  <span class="status-dot"></span>
  Orange
</span>
<span class="status status-yellow status-lite">
  <span class="status-dot"></span>
  Yellow
</span>
<span class="status status-lime status-lite">
  <span class="status-dot"></span>
  Lime
</span>
<span class="status status-green status-lite">
  <span class="status-dot"></span>
  Green
</span>
<span class="status status-teal status-lite">
  <span class="status-dot"></span>
  Teal
</span>
<span class="status status-cyan status-lite">
  <span class="status-dot"></span>
  Cyan
</span>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Status dots

If you need only dot status, you can use the `.status-dot` class.

{% capture html -%}
<span class="status-dot status-blue"></span>
<span class="status-dot status-azure"></span>
<span class="status-dot status-indigo"></span>
<span class="status-dot status-purple"></span>
<span class="status-dot status-pink"></span>
<span class="status-dot status-red"></span>
<span class="status-dot status-orange"></span>
<span class="status-dot status-yellow"></span>
<span class="status-dot status-lime"></span>
<span class="status-dot status-green"></span>
<span class="status-dot status-teal"></span>
<span class="status-dot status-cyan"></span>
{%- endcapture %}
{% include "docs/example.html" html=html %}

The dots can also be animated. To do this, add the `.status-dot-animated` class.

```html
<span class="status-dot status-dot-animated status-blue"></span>
```

The animated status dots can be used in the same way as the regular status dots. 

{% capture html -%}
<span class="status-dot status-dot-animated status-blue"></span>
<span class="status-dot status-dot-animated status-azure"></span>
<span class="status-dot status-dot-animated status-indigo"></span>
<span class="status-dot status-dot-animated status-purple"></span>
<span class="status-dot status-dot-animated status-pink"></span>
<span class="status-dot status-dot-animated status-red"></span>
<span class="status-dot status-dot-animated status-orange"></span>
<span class="status-dot status-dot-animated status-yellow"></span>
<span class="status-dot status-dot-animated status-lime"></span>
<span class="status-dot status-dot-animated status-green"></span>
<span class="status-dot status-dot-animated status-teal"></span>
<span class="status-dot status-dot-animated status-cyan"></span>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Status indicator

Use the status indicator to show the status of a component or page. The status indicator can be animated. To do this, also add the `.status-indicator-animated` class.

{% capture html -%}
<span class="status-indicator status-blue status-indicator-animated">
  <span class="status-indicator-circle"></span>
  <span class="status-indicator-circle"></span>
  <span class="status-indicator-circle"></span>
</span>
<span class="status-indicator status-azure status-indicator-animated">
  <span class="status-indicator-circle"></span>
  <span class="status-indicator-circle"></span>
  <span class="status-indicator-circle"></span>
</span>
<span class="status-indicator status-indigo status-indicator-animated">
  <span class="status-indicator-circle"></span>
  <span class="status-indicator-circle"></span>
  <span class="status-indicator-circle"></span>
</span>
<span class="status-indicator status-purple status-indicator-animated">
  <span class="status-indicator-circle"></span>
  <span class="status-indicator-circle"></span>
  <span class="status-indicator-circle"></span>
</span>
<span class="status-indicator status-pink status-indicator-animated">
  <span class="status-indicator-circle"></span>
  <span class="status-indicator-circle"></span>
  <span class="status-indicator-circle"></span>
</span>
<span class="status-indicator status-red status-indicator-animated">
  <span class="status-indicator-circle"></span>
  <span class="status-indicator-circle"></span>
  <span class="status-indicator-circle"></span>
</span>
<span class="status-indicator status-orange status-indicator-animated">
  <span class="status-indicator-circle"></span>
  <span class="status-indicator-circle"></span>
  <span class="status-indicator-circle"></span>
</span>
<span class="status-indicator status-yellow status-indicator-animated">
  <span class="status-indicator-circle"></span>
  <span class="status-indicator-circle"></span>
  <span class="status-indicator-circle"></span>
</span>
<span class="status-indicator status-lime status-indicator-animated">
  <span class="status-indicator-circle"></span>
  <span class="status-indicator-circle"></span>
  <span class="status-indicator-circle"></span>
</span>
<span class="status-indicator status-green status-indicator-animated">
  <span class="status-indicator-circle"></span>
  <span class="status-indicator-circle"></span>
  <span class="status-indicator-circle"></span>
</span>
<span class="status-indicator status-teal status-indicator-animated">
  <span class="status-indicator-circle"></span>
  <span class="status-indicator-circle"></span>
  <span class="status-indicator-circle"></span>
</span>
<span class="status-indicator status-cyan status-indicator-animated">
  <span class="status-indicator-circle"></span>
  <span class="status-indicator-circle"></span>
  <span class="status-indicator-circle"></span>
</span>
{%- endcapture %}
{% include "docs/example.html" html=html %}
