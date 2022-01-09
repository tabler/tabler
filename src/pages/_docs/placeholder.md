---
title: Placeholder
menu: docs.components.placeholder
description: Placeholder is used to reserve space for content that soon will appear in a layout.
redirect_from:
    - /docs/skeleton.html
---

## Placeholder line

Placeholder lines can contain have lines of text. Their length is different and depends on the `col-` class.

{% capture code %}
<div class="placeholder col-9"></div>
<div class="placeholder col-11"></div>
<div class="placeholder col-10"></div>
<div class="placeholder col-8"></div>
{% endcapture %}
{% include example.html code=code %}

However, it may be useful, however, to specify the full width in order to fit the content more effectively.

{% capture code %}
<div class="placeholder col-12"></div>
<div class="placeholder col-12"></div>
<div class="placeholder col-12"></div>
<div class="placeholder col-12"></div>
{% endcapture %}
{% include example.html code=code %}

You can also move the lines to right or to center:

{% capture code %}
<div class="text-end">
  <div class="placeholder col-11"></div>
  <div class="placeholder col-10"></div>
  <div class="placeholder col-8"></div>
</div>
<div class="text-center mt-3">
  <div class="placeholder col-11"></div>
  <div class="placeholder col-10"></div>
  <div class="placeholder col-8"></div>
</div>
{% endcapture %}
{% include example.html code=code %}


## Placeholder heading

A placeholder can contain also a header element looks like header:

{% capture code %}
<div class="placeholder col-9 mb-3"></div>
<div class="placeholder placeholder-xs col-10"></div>
<div class="placeholder placeholder-xs col-11"></div>
{% endcapture %}
{% include example.html code=code %}

## Placeholder avatar

You can make your placeholder item look like an avatar.

{% capture code %}
<div class="row">
  <div class="col-auto">
    <div class="avatar placeholder"></div>
  </div>
  <div class="col">
    <div class="placeholder col-9"></div>
    <div class="placeholder col-11"></div>
  </div>
</div>
{% endcapture %}
{% include example.html code=code %}

The size of avatars is exactly the same as a regular avatar.

{% capture code %}
<div class="avatar avatar-xl placeholder"></div>
<div class="avatar avatar-lg placeholder"></div>
<div class="avatar avatar-md placeholder"></div>
<div class="avatar placeholder"></div>
<div class="avatar avatar-sm placeholder"></div>
<div class="avatar avatar-xs placeholder"></div>
{% endcapture %}
{% include example.html code=code %}

## Placeholder image

You can use a placeholder, which will look like a picture. You can use the `ratio` component, and get the image in the right proportions.


You can also use the `ratio` component, and get the image in the right proportions.

{% capture code %}
<div class="ratio ratio-1x1 placeholder">
  <div class="placeholder-image"></div>
</div>
<div class="ratio ratio-4x3 placeholder">
  <div class="placeholder-image"></div>
</div>
<div class="ratio ratio-16x9 placeholder">
  <div class="placeholder-image"></div>
</div>
<div class="ratio ratio-21x9 placeholder">
  <div class="placeholder-image"></div>
</div>
{% endcapture %}
{% include example.html code=code max-width="200px" wrapper="space-y" %}

## Placeholder color

By default, the `placeholder` uses `currentColor`. This can be overridden with a custom color or utility class.

{% capture code %}
<span class="placeholder col-12"></span>

<span class="placeholder col-12 bg-primary"></span>
<span class="placeholder col-12 bg-secondary"></span>
<span class="placeholder col-12 bg-success"></span>
<span class="placeholder col-12 bg-danger"></span>
<span class="placeholder col-12 bg-warning"></span>
<span class="placeholder col-12 bg-info"></span>
<span class="placeholder col-12 bg-light"></span>
<span class="placeholder col-12 bg-dark"></span>
{% endcapture %}
{% include example.html code=code wrapper="space-y" %}

## Placeholder sizing

The size of `.placeholders` are based on the typographic style of the parent element. Customize them with sizing modifiers: `.placeholder-lg`, `.placeholder-sm`, or `.placeholder-xs`.

{% capture code %}
<span class="placeholder col-12 placeholder-lg"></span>
<span class="placeholder col-12"></span>
<span class="placeholder col-12 placeholder-sm"></span>
<span class="placeholder col-12 placeholder-xs"></span>
{% endcapture %}
{% include example.html code=code wrapper="space-y" %}

## Animation

Animate placeholders with `.placeholder-glow` or `.placeholder-wave` to better convey the perception of something being actively loaded.

{% capture code %}
<p class="placeholder-glow">
  <span class="placeholder col-12"></span>
</p>
<p class="placeholder-wave">
  <span class="placeholder col-12"></span>
</p>
{% endcapture %}
{% include example.html code=code wrapper="space-y" %}

## Live examples

See in the following examples how else you can use the placeholder component

{% capture code %}
{% include cards/placeholder/card-1.html %}
{% include cards/placeholder/card-2.html %}
{% include cards/placeholder/card-3.html %}
{% include cards/placeholder/card-4.html %}
{% include cards/placeholder/card-6.html %}
{% endcapture %}
{% include example.html code=code columns=1 wrapper="space-y" %}