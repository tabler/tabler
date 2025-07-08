---
title: Interactions
summary: Utility classes that change how users interact with contents of a website.
description: Modify user interactions efficiently.
---

## Text selection

Change the way in which the content is selected when the user interacts with it.

{% capture html -%}
<p class="user-select-all">This paragraph will be entirely selected when clicked by the user.</p>
<p class="user-select-auto">This paragraph has default select behavior.</p>
<p class="user-select-none">This paragraph will not be selectable when clicked by the user.</p>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Pointer events

Tabler provides `.pe-none` and `.pe-auto` classes to prevent or add element interactions.

{% capture html -%}
<div>
  <a href="#" class="pe-none" tabindex="-1" aria-disabled="true">This link</a> can not be clicked.
</div>
<div><a href="#" class="pe-auto">This link</a> can be clicked (this is default behavior).</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}
