---
title: Flags
summary: Thanks to the Tabler flags plugin, you can create flags to visually represent countries or languages. Flags are often used in forms, as an element of a delivery address, phone number dialling code and many more.
plugin: flags
libs: tabler-flags
description: Visual representation of countries/languages.
---

## Installation

This part of Tabler is distributed as a plugin. To enable it you should include `tabler-flags.css` or `tabler-flags.min.css` file in your page.

You can also include the plugin via CDN:

```html
<link rel="stylesheet" href="{{ cdnUrl }}/dist/css/tabler-flags.min.css" />
```

## Flag

To create a flag, add the `flag` class to a component and choose the country whose flag you want to use.

{% capture html -%}
<span class="flag flag-country-us"></span>
{%- endcapture %}
{% include "docs/example.html" html=html %}


## Country flags

To use the flag of a particular country, add the `flag-country-(country name)` class. For example, to create a flag of Andorra, you should use the following class: `.flag-country-ad`. The full list of countries can be found below.

```html
<span class="flag flag-country-ad"></span>
<span class="flag flag-country-ae"></span>
```

{% capture html -%}
<span class="flag flag-country-tg"></span>
<span class="flag flag-country-br"></span>
<span class="flag flag-country-pt"></span>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Flag sizes

Using Bootstrap’s typical naming structure, you can create a standard flag, or scale it up or down to different sizes based on what’s needed.

{% capture html -%}
<span class="flag flag-xl flag-country-us"></span>
<span class="flag flag-lg flag-country-us"></span>
<span class="flag flag-md flag-country-us"></span>
<span class="flag flag-sm flag-country-us"></span>
<span class="flag flag-xs flag-country-us"></span>
{%- endcapture %}
{% include "docs/example.html" html=html %}

```html
<span class="flag flag-xl ..."></span>
<span class="flag flag-lg ..."></span>
<span class="flag flag-md ..."></span>
<span class="flag flag-sm ..."></span>
<span class="flag flag-xs ..."></span>
```

## Flags list

The full list of countries can be found below.

{% include "docs/flags.html" %}

