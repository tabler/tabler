---
title: Popovers
summary: Popovers are used to provide additional information on elements where a simple tooltip is not sufficient.
bootstrapLink: components/popovers
description: Provide extra information with popovers.
---

## Default markup

To create a default popover use:

{% capture html -%}
<button
  type="button"
  class="btn"
  data-bs-toggle="popover"
  title="Popover title"
  data-bs-content="And here's some amazing content. It's very engaging. Right?"
>
  Click to toggle popover
</button>
{%- endcapture %}
{% include "docs/example.html" html=html centered bg="surface-secondary" %}

## Four directions

Four options are available: `top`, `right`, `bottom`, and `left` aligned. Directions are mirrored when using Bootstrap in RTL.

{% capture html -%}
<button
  type="button"
  class="btn"
  data-bs-container="body"
  data-bs-toggle="popover"
  data-bs-placement="top"
  data-bs-content="Top popover"
>
  Popover on top
</button>
<button
  type="button"
  class="btn"
  data-bs-container="body"
  data-bs-toggle="popover"
  data-bs-placement="right"
  data-bs-content="Right popover"
>
  Popover on right
</button>
<button
  type="button"
  class="btn"
  data-bs-container="body"
  data-bs-toggle="popover"
  data-bs-placement="bottom"
  data-bs-content="Bottom popover"
>
  Popover on bottom
</button>
<button
  type="button"
  class="btn"
  data-bs-container="body"
  data-bs-toggle="popover"
  data-bs-placement="left"
  data-bs-content="Left popover"
>
  Popover on left
</button>
{%- endcapture %}
{% include "docs/example.html" html=html centered bg="surface-secondary" %}

## Popover on hover

Popover can be triggered in one or more of the following styles: `manual`, with a `click`, on `focus`, and on `hover`. This one reacts on hover. See more details on the Popover component page of [Bootstrap's documentation](https://getbootstrap.com/docs)

{% capture html -%}
<button
  type="button"
  class="btn btn-primary"
  data-bs-trigger="hover"
  data-bs-toggle="popover"
  title="Popover title"
  data-bs-content="And here's some amazing content. It's very engaging. Right?"
>
  Hover to toggle popover
</button>
{%- endcapture %}
{% include "docs/example.html" html=html centered bg="surface-secondary" %}
