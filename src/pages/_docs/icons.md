---
title: Icons
menu: docs.content.icons
---

All icons come from the Tabler Icons set and are MIT-licensed. Visit <a href="https://tabler-icons.io" target="_blank">tabler-icons.io</a>, download the icons you need in SVG, PNG or React and use them in your favourite design tools. You can show all icons and SVG codes [here]({{ site.base }}/icons.html).


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


