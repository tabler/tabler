---
title: Icons
menu: docs.content.icons
description: Use one of over 1500 icons created specifically for Tabler and make your dashboard look even more attractive. All icons are under MIT license, so you can use them without any problem both in private and commercial projects.
banner: icons
---

## Base icon

{% capture code %}
  {% include ui/icon.html icon="heart" %}
  {% include ui/icon.html icon="ghost" %}
  {% include ui/icon.html icon="star" %}
  {% include ui/icon.html icon="bike" %}
{% endcapture %}
{% include example.html code=code %}

## Filled icons 

{% capture code %}
  {% include ui/icon.html icon="heart" class="icon-filled" %}
  {% include ui/icon.html icon="circle" class="icon-filled" %}
  {% include ui/icon.html icon="star" class="icon-filled" %}
  {% include ui/icon.html icon="square" class="icon-filled" %}
{% endcapture %}
{% include example.html code=code %}

## Icon colors

{% capture code %}
  <span class="text-red">
    {% include ui/icon.html icon="heart" class="icon-filled" %}
  </span>
  <span class="text-yellow">
    {% include ui/icon.html icon="star" class="icon-filled" %}
  </span>
  <span class="text-blue">
    {% include ui/icon.html icon="circle" %}
  </span>
  <span class="text-green">
    {% include ui/icon.html icon="square" %}
  </span>
{% endcapture %}
{% include example.html code=code %}


