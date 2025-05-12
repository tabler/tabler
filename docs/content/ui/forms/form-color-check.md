---
title: Color check
summary: The color check is a great way to make your form more user-friendly and engaging. You can use the color check to create a visually appealing form that will help users make decisions quickly and easily.
description: Enhance forms with color checks.
---

Your input controls can come in a variety of colors, depending on your preferences. See the [full list of available colors](/ui/base/colors) for more details.

```html
<label class="form-colorinput">
  <input name="..." type="radio" value="..." class="form-colorinput-input" />
  <span class="form-colorinput-color bg-lime"></span>
</label>
```

There is also an example of a color input:

{% capture html -%}
{% include "parts/form/input-color.html" type="checkbox" %}
{%- endcapture %}
{% include "docs/example.html" html=html %}

If you need to select only one color, you can use the radio input type:

{% capture html -%}
{% include "parts/form/input-color.html" name="color-rounded" rounded=true %}
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Input color picker

Add an color picker to your form to let users customize it according to their preferences.

{% capture html -%}
<div class="mb-3">
  <label class="form-label">Color picker</label>
  <input
    type="color"
    class="form-control form-control-color"
    value="#066fd1"
    title="Choose your color"
  />
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

