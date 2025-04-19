---
title: Icons
summary: Use any of over 5000 icons created specifically for Tabler and make your dashboard look even more attractive. All icons are under MIT license, so you can use them without any problem both in private and commercial projects.
banner: icons
description: Enhance dashboards with custom icons.
---

If you need to add icons to your website, you can use the Tabler Icons library. It contains over 5000 icons that you can use in your projects. All icons are under the MIT license, so you can use them without any problem both in private and commercial projects. You can find the Tabler Icons library [here](https://tabler-icons.io/).

## Base icon

To add an icon to your code copy the SVG code from the Tabler Icons website and paste it into your HTML file.

```html
{% include "ui/icon.html" icon="heart" %}
```

Results can be seen in the example below.

{% capture html -%}
{% include "ui/icon.html" icon="heart" %}
{% include "ui/icon.html" icon="ghost-2" %}
{% include "ui/icon.html" icon="lego" %}
{% include "ui/icon.html" icon="building-carousel" %}
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Filled icons

To use filled icons, you need to copy the SVG code from the Tabler Icons website and paste it into your HTML file. 

```html
{% include "ui/icon.html" icon="heart-filled" %}
```

Look at the example below to see the filled icons.

{% capture html -%}
{% include "ui/icon.html" icon="heart-filled" %}
{% include "ui/icon.html" icon="bell-ringing-filled" %}
{% include "ui/icon.html" icon="cherry-filled" %}
{% include "ui/icon.html" icon="circle-key-filled" %}
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Icon colors

To change the color of the icon, you need to add the `text-` class to the parent element of the icon. Full list of available colors can be found [here](/img/ui/colors). Color classes can be used with any HTML element.

```html
<span class="text-red">
  {% include "ui/icon.html" icon="heart" %}
</span>
```

Look at the example below to see how the color of the icon changes.

{% capture html -%}
<span class="text-red">
  {% include "ui/icon.html" icon="heart-filled" %}
</span>
<span class="text-yellow">
  {% include "ui/icon.html" icon="star-filled" %}
</span>
<span class="text-blue">
  {% include "ui/icon.html" icon="circle" %}
</span>
<span class="text-green">
  {% include "ui/icon.html" icon="square-rounded" %}
</span>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Icon animations

To add an animation to the icon, you need to add the `icon-pulse`, `icon-tada`, or `icon-rotate` class to the SVG element. 

```html
{% include "ui/icon.html" icon="heart" %}
{% include "ui/icon.html" icon="bell" %}
{% include "ui/icon.html" icon="rotate-clockwise" %}
```

Look at the example below to see the animated icons.

{% capture html -%}
<svg
  xmlns="http://www.w3.org/2000/svg"
  class="icon icon-pulse"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  stroke-width="2"
  stroke="currentColor"
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
</svg>
<svg
  xmlns="http://www.w3.org/2000/svg"
  class="icon icon-tada"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  stroke-width="2"
  stroke="currentColor"
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path
    d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"
  />
  <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
</svg>
<svg
  xmlns="http://www.w3.org/2000/svg"
  class="icon icon-rotate"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  stroke-width="2"
  stroke="currentColor"
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
</svg>
{%- endcapture %}
{% include "docs/example.html" html=html %}

