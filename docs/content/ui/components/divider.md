---
title: Divider
summary: Dividers help organize content and make the interface layout clear and uncluttered. Greater clarity adds up to better user experience and enhanced interaction with a website or app.
description: Separate content with clear dividers.
---

## Default markup

Use dividers to visually separate content into parts. You can use a line only or add text that will be centered by default.

{% capture html -%}
<p>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, dolore dolores doloribus est ex.
</p>
<div class="hr-text">See also</div>
<p>
  Dicta error hic illo iure necessitatibus nihil officiis omnis perferendis, praesentium repellendus
  rerum, saepe sed, sit!
</p>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Text position

You can modify the position of the text which is to be included in a separator and make it left- or right-aligned. Otherwise, the text will remain centered.

{% capture html -%}
<p>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, dolore dolores doloribus est ex.
</p>
<div class="hr-text hr-text-start">Start divider</div>
<p>
  Dicta error hic illo iure necessitatibus nihil officiis omnis perferendis, praesentium repellendus
  rerum, saepe sed, sit!
</p>
<div class="hr-text">Centered divider</div>
<p>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, dolore dolores doloribus est ex.
</p>
<div class="hr-text hr-text-end">End divider</div>
<p>
  Dicta error hic illo iure necessitatibus nihil officiis omnis perferendis, praesentium repellendus
  rerum, saepe sed, sit!
</p>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Divider color

Customize the color of dividers to make them go well with your design. See the [full list of available colors](/ui/base/colors) for more details.

{% capture html -%}
<p>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, dolore dolores doloribus est ex.
</p>
<div class="hr-text text-green">Green divider</div>
<p>
  Dicta error hic illo iure necessitatibus nihil officiis omnis perferendis, praesentium repellendus
  rerum, saepe sed, sit!
</p>
<div class="hr-text text-red">Red divider</div>
<p>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, dolore dolores doloribus est ex.
</p>
<div class="hr-text text-primary">Primary divider</div>
<p>
  Dicta error hic illo iure necessitatibus nihil officiis omnis perferendis, praesentium repellendus
  rerum, saepe sed, sit!
</p>
{%- endcapture %}
{% include "docs/example.html" html=html %}
