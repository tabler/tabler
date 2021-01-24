---
title: Borders
menu: docs.utils.borders
description: Use border utilities to quickly style the border and border-radius of an element. Great for images, buttons, or any other element.
---

## Border direction

The following border utilities classes will add border to any side of an element.

{% capture code %}
<div class="w-5 h-5 bg-light border"></div>
<div class="w-5 h-5 bg-light border-top"></div>
<div class="w-5 h-5 bg-light border-end"></div>
<div class="w-5 h-5 bg-light border-bottom"></div>
<div class="w-5 h-5 bg-light border-start"></div>
<div class="w-5 h-5 bg-light border-x"></div>
<div class="w-5 h-5 bg-light border-y"></div>
{% endcapture %}
{% include example.html code=code centered=true wrapper="d-flex space-x-3" %}

## Border size

Below are the available border size utilities classes.

{% capture code %}
<div class="w-5 h-5 bg-light border-0"></div>
<div class="w-5 h-5 bg-light border"></div>
<div class="w-5 h-5 bg-light border-wide"></div>
{% endcapture %}
{% include example.html code=code centered=true wrapper="d-flex space-x-3" %}


## Remove border

You can remove a border on a single side of an element by using the following border utilities classes.

{% capture code %}
<div class="w-5 h-5 bg-light border border-top-0"></div>
<div class="w-5 h-5 bg-light border border-end-0"></div>
<div class="w-5 h-5 bg-light border border-bottom-0"></div>
<div class="w-5 h-5 bg-light border border-start-0"></div>
<div class="w-5 h-5 bg-light border border-x-0"></div>
<div class="w-5 h-5 bg-light border border-y-0"></div>
{% endcapture %}
{% include example.html code=code centered=true wrapper="d-flex space-x-3" %}

## Border color

You can set a border color of any side of an element by adding the following utilities classes below.

{% capture code %}
{% for color in site.theme-colors %}
<div class="w-5 h-5 bg-light border border-{{ color[1].class }}"></div>
{% endfor %}
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}


## Border radius

You can set a border to any element by using the following utilities classes below.

{% capture code %}
<div class="w-5 h-5 bg-light border rounded-0"></div>
<div class="w-5 h-5 bg-light border rounded"></div>
<div class="w-5 h-5 bg-light border rounded-1"></div>
<div class="w-5 h-5 bg-light border rounded-2"></div>
<div class="w-5 h-5 bg-light border rounded-3"></div>
<div class="w-5 h-5 bg-light border rounded-circle"></div>
{% endcapture %}
{% include example.html code=code centered=true wrapper="d-flex space-x-3" %}