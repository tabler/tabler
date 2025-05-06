---
title: Ribbons
summary: Ribbons are graphical elements which attract users' attention to a given element of an interface and make it stand out.
description: Highlight elements with graphical ribbons.	
---

## Default markup

Use the `ribbon` class to add the default ribbon to any section of your interface.

{% capture html -%}
<div class="card">
  <div class="card-body" style="height: 5rem"></div>
  <div class="ribbon">
    {% include "ui/icon.html" icon="star" %}
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html card column %}

## Ribbon position

You can change the position of a ribbon by adding one of the following classes to the element:

- `ribbon-top` - moves it to the top
- `ribbon-end` - moves it to the right
- `ribbon-bottom` - moves it to the bottom
- `ribbon-start` - moves it to the left

Using multiple classes at once will give you more position options. For example, the following class: `.ribbon.ribbon-top.ribbon-left` will move the ribbon to the top left corner.

{% capture html -%}
<div class="card">
  <div class="card-body" style="height: 5rem"></div>
  <div class="ribbon ribbon-top ribbon-start">
    {% include "ui/icon.html" icon="star" %}
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html column %}

## Ribbon color

Customize the ribbon's background color. See the [full list of available colors](/ui/base/colors) for more details.

{% capture html -%}
<div class="card">
  <div class="card-body" style="height: 5rem"></div>
  <div class="ribbon bg-red">
    {% include "ui/icon.html" icon="star" %}
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html column %}

## Ribbon text

Add your own text to a ribbon to display any additional information and make it easy to spot for users.

{% capture html -%}
<div class="card">
  <div class="card-body" style="height: 5rem"></div>
  <div class="ribbon bg-green">NEW</div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html column %}

## Bookmark ribbon

Use the `.ribbon-bookmark` class to create a bookmark ribbon. It is a special style of ribbon that is used to highlight important elements in your interface.

{% capture html -%}
<div class="card w-100">
  <div class="card-body" style="height: 5rem"></div>
  <div class="ribbon ribbon-bookmark bg-orange">
    {% include "ui/icon.html" icon="star" %}
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html column %}
