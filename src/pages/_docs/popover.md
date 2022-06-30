---
title: Popovers
description: Popovers are used to provide additional information on elements where a simple tooltip is not sufficient.
bootstrap-link: components/popovers
menu: docs.components.popover
---


## Default markup

To create a default popover use:

{% capture code %}
<button type="button" class="btn btn-lg btn-danger" data-bs-toggle="popover" title="Popover title" data-bs-content="And here's some amazing content. It's very engaging. Right?">Click to toggle popover</button>
{% endcapture %}
{% include example.html code=code %}

## Four directions

Four options are available: top, right, bottom, and left aligned. Directions are mirrored when using Bootstrap in RTL.

{% capture code %}
<button type="button" class="btn btn-secondary" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Top popover">
Popover on top
</button>
<button type="button" class="btn btn-secondary" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="right" data-bs-content="Right popover">
Popover on right
</button>
<button type="button" class="btn btn-secondary" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Bottom popover">
Popover on bottom
</button>
<button type="button" class="btn btn-secondary" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="left" data-bs-content="Left popover">
Popover on left
</button>
{% endcapture %}
{% include example.html code=code %}

## Popover on hover

Popover can be triggered `manual`, with a `click` and on `focus` and on `hover`. This one reacts on hover.

{% capture code %}
<button type="button" class="btn btn-primary" data-bs-trigger="hover" data-bs-toggle="popover" title="Popover title" data-bs-content="And here's some amazing content. It's very engaging. Right?">Hover to toggle popover</button>
{% endcapture %}
{% include example.html code=code %}
