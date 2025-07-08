---
title: Spinners
summary: Spinners are used to show the loading state of a component or page. They provide feedback for an action a user has taken, when it takes a bit longer to complete.
bootstrapLink: components/spinners/
description: Indicate loading state with spinners.
---

## Default markup

Use the default spinner to notify users that an action they have taken is in progress, helping them avoid confusion.

{% capture html -%}
<div class="spinner-border"></div>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}


## Colors

Choose one of the available colors to customize the spinner and make it suit your design. Full list of available colors can be found in the [Colors](/ui/base/colors) section.

{% capture html -%}
<div class="spinner-border text-blue" role="status"></div>
<div class="spinner-border text-azure" role="status"></div>
<div class="spinner-border text-indigo" role="status"></div>
<div class="spinner-border text-purple" role="status"></div>
<div class="spinner-border text-pink" role="status"></div>
<div class="spinner-border text-red" role="status"></div>
<div class="spinner-border text-orange" role="status"></div>
<div class="spinner-border text-yellow" role="status"></div>
<div class="spinner-border text-lime" role="status"></div>
<div class="spinner-border text-green" role="status"></div>
<div class="spinner-border text-teal" role="status"></div>
<div class="spinner-border text-cyan" role="status"></div>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Size

Choose the size of your spinner. You can use the default size or use the `spinner-border-sm` class to display a smaller spinner.

{% capture html -%}
<div class="spinner-border" role="status"></div>
<div class="spinner-border spinner-border-sm" role="status"></div>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Growing spinner

Use the growing spinner, if you are looking for a more original design than a border spinner. The spinner grows to show the loading state.

{% capture html -%}
<div class="spinner-grow" role="status"></div>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

Growing spinners also come in a variety of colors to choose from.

{% capture html -%}
<div class="spinner-grow text-blue" role="status"></div>
<div class="spinner-grow text-azure" role="status"></div>
<div class="spinner-grow text-indigo" role="status"></div>
<div class="spinner-grow text-purple" role="status"></div>
<div class="spinner-grow text-pink" role="status"></div>
<div class="spinner-grow text-red" role="status"></div>
<div class="spinner-grow text-orange" role="status"></div>
<div class="spinner-grow text-yellow" role="status"></div>
<div class="spinner-grow text-lime" role="status"></div>
<div class="spinner-grow text-green" role="status"></div>
<div class="spinner-grow text-teal" role="status"></div>
<div class="spinner-grow text-cyan" role="status"></div>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Button with spinner

Use buttons with spinners to notify users that an action they have taken by clicking the button is in progress and prevent them from clicking multiple times or giving up.

{% capture html -%}
<a href="#" class="btn btn-primary">
  <span class="spinner-border spinner-border-sm me-2" role="status"></span>
  Button
</a>
<a href="#" class="btn btn-danger">
  <span class="spinner-border spinner-border-sm me-2" role="status"></span>
  Button
</a>
<a href="#" class="btn btn-warning">
  <span class="spinner-border spinner-border-sm me-2" role="status"></span>
  Button
</a>
<a href="#" class="btn btn-success">
  <span class="spinner-border spinner-border-sm me-2" role="status"></span>
  Button
</a>
<a href="#" class="btn">
  <span class="spinner-border spinner-border-sm me-2" role="status"></span>
  Button
</a>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Animated dots

Use animated dots to show the loading state of a component. They provide feedback for an action a user has taken, when it takes a bit longer to complete. To do it you need to use the `.animated-dots` class on a `span` element.

{% capture html -%}
<h1>Loading<span class="animated-dots"></span></h1>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

Use buttons with animated dots to notify users that an action they have taken by clicking the button is in progress and prevent them from clicking multiple times or giving up.

{% capture html -%}
<a href="#" class="btn btn-primary">
	Loading<span class="animated-dots"></span>
</a>
<a href="#" class="btn btn-primary disabled">
	Loading<span class="animated-dots"></span>
</a>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

