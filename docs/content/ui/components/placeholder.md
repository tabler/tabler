---
title: Placeholder
summary: Placeholder is used to reserve space for content that will soon appear in a layout.
description: Reserve space for upcoming content.
---

## Placeholder line

Placeholder lines can contain lines of text. Their length is different and depends on the `col-` class.

{% capture html -%}
<div class="placeholder col-9"></div>
<div class="placeholder col-11"></div>
<div class="placeholder col-10"></div>
<div class="placeholder col-8"></div>
{%- endcapture %}
{% include "docs/example.html" html=html column %}

However, it may be useful to specify the full width in order to fit the content more effectively.

{% capture html -%}
<div class="placeholder col-12"></div>
<div class="placeholder col-12"></div>
<div class="placeholder col-12"></div>
<div class="placeholder col-12"></div>
{%- endcapture %}
{% include "docs/example.html" html=html column %}

You can also move the lines to the right or center them:

{% capture html -%}
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
{%- endcapture %}
{% include "docs/example.html" html=html column %}

## Placeholder heading

A placeholder can also contain an element that looks like a header:

{% capture html -%}
<div class="placeholder col-9 mb-3"></div>
<div class="placeholder placeholder-xs col-10"></div>
<div class="placeholder placeholder-xs col-11"></div>
{%- endcapture %}
{% include "docs/example.html" html=html column %}

## Placeholder avatar

You can use a placeholder that will look like an avatar. You can use the `avatar` component, and get the image in the right proportions.

{% capture html -%}
<div class="row">
  <div class="col-auto">
    <div class="avatar placeholder"></div>
  </div>
  <div class="col">
    <div class="placeholder col-9"></div>
    <div class="placeholder col-11"></div>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html column %}

You can also use the `avatar` component with different sizes. Look at the example below to see how the avatar placeholder looks.

{% capture html -%}
<div class="avatar avatar-xl placeholder"></div>
<div class="avatar avatar-lg placeholder"></div>
<div class="avatar placeholder"></div>
<div class="avatar avatar-sm placeholder"></div>
<div class="avatar avatar-xs placeholder"></div>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Placeholder image

You can use a placeholder that will look like a picture. You can use the `ratio` component, and get the image in the right proportions.

{% capture html -%}
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
{%- endcapture %}
{% include "docs/example.html" html=html column centered vertical %}

## Placeholder color

By default, the placeholder uses `currentColor`. This can be overridden with a custom color or utility class. Full color classes are available for background colors.

{% capture html -%}
<span class="placeholder col-12"></span>
<span class="placeholder col-12 bg-primary"></span>
<span class="placeholder col-12 bg-secondary"></span>
<span class="placeholder col-12 bg-success"></span>
<span class="placeholder col-12 bg-danger"></span>
<span class="placeholder col-12 bg-warning"></span>
<span class="placeholder col-12 bg-info"></span>
<span class="placeholder col-12 bg-light"></span>
<span class="placeholder col-12 bg-dark"></span>
{%- endcapture %}
{% include "docs/example.html" html=html column %}

## Placeholder sizing

The sizes of placeholders are based on the typographic style of the parent element. Customize them with sizing modifiers: `.placeholder-lg`, `.placeholder-sm`, or `.placeholder-xs`.

{% capture html -%}
<span class="placeholder col-12 placeholder-lg"></span>
<span class="placeholder col-12"></span>
<span class="placeholder col-12 placeholder-sm"></span>
<span class="placeholder col-12 placeholder-xs"></span>
{%- endcapture %}
{% include "docs/example.html" html=html column %}

## Animation

Animate placeholders with `.placeholder-glow` or `.placeholder-wave` to better convey the perception of something being actively loaded.

{% capture html -%}
<p class="placeholder-glow">
  <span class="placeholder col-12"></span>
</p>
<p class="placeholder-wave">
  <span class="placeholder col-12"></span>
</p>
{%- endcapture %}
{% include "docs/example.html" html=html column %}

## Live examples

See in the following examples how else you can use the placeholder component

{% capture html -%}
<div class="card placeholder-glow">
  <div class="ratio ratio-21x9 card-img-top placeholder"></div>
  <div class="card-body">
    <div class="placeholder col-9 mb-3"></div>
    <div class="placeholder placeholder-xs col-10"></div>
    <div class="placeholder placeholder-xs col-11"></div>
    <div class="mt-3">
      <a
        href="#"
        tabindex="-1"
        class="btn btn-primary disabled placeholder col-4"
        aria-hidden="true"
      ></a>
    </div>
  </div>
</div>
<div class="card">
  <div class="row g-0 align-items-center placeholder-glow">
    <div class="col-3">
      <div class="ratio ratio-1x1 card-img-start placeholder"></div>
    </div>
    <div class="col">
      <div class="card-body">
        <div class="placeholder col-9 mb-3"></div>
        <div class="placeholder placeholder-xs col-10"></div>
        <div class="placeholder placeholder-xs col-11"></div>
      </div>
    </div>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <div class="row">
      <div class="col-auto">
        <div class="avatar avatar-rounded placeholder"></div>
      </div>
      <div class="col">
        <div class="placeholder placeholder-xs col-9"></div>
        <div class="placeholder placeholder-xs col-7"></div>
      </div>
    </div>
  </div>
</div>
<div class="card">
  <div class="card-body py-5 text-center">
    <div>
      <div class="avatar avatar-rounded avatar-lg placeholder mb-3"></div>
    </div>
    <div class="mt w-75 mx-auto">
      <div class="placeholder col-9 mb-3"></div>
      <div class="placeholder placeholder-xs col-10"></div>
    </div>
  </div>
</div>
<div class="card">
  <ul class="list-group list-group-flush placeholder-glow">
    <li class="list-group-item">
      <div class="row align-items-center">
        <div class="col-auto">
          <div class="avatar avatar-rounded placeholder"></div>
        </div>
        <div class="col-7">
          <div class="placeholder placeholder-xs col-9"></div>
          <div class="placeholder placeholder-xs col-7"></div>
        </div>
        <div class="col-2 ms-auto text-end">
          <div class="placeholder placeholder-xs col-8"></div>
          <div class="placeholder placeholder-xs col-10"></div>
        </div>
      </div>
    </li>
    <li class="list-group-item">
      <div class="row align-items-center">
        <div class="col-auto">
          <div class="avatar avatar-rounded placeholder"></div>
        </div>
        <div class="col-7">
          <div class="placeholder placeholder-xs col-9"></div>
          <div class="placeholder placeholder-xs col-7"></div>
        </div>
        <div class="col-2 ms-auto text-end">
          <div class="placeholder placeholder-xs col-8"></div>
          <div class="placeholder placeholder-xs col-10"></div>
        </div>
      </div>
    </li>
    <li class="list-group-item">
      <div class="row align-items-center">
        <div class="col-auto">
          <div class="avatar avatar-rounded placeholder"></div>
        </div>
        <div class="col-7">
          <div class="placeholder placeholder-xs col-9"></div>
          <div class="placeholder placeholder-xs col-7"></div>
        </div>
        <div class="col-2 ms-auto text-end">
          <div class="placeholder placeholder-xs col-8"></div>
          <div class="placeholder placeholder-xs col-10"></div>
        </div>
      </div>
    </li>
    <li class="list-group-item">
      <div class="row align-items-center">
        <div class="col-auto">
          <div class="avatar avatar-rounded placeholder"></div>
        </div>
        <div class="col-7">
          <div class="placeholder placeholder-xs col-9"></div>
          <div class="placeholder placeholder-xs col-7"></div>
        </div>
        <div class="col-2 ms-auto text-end">
          <div class="placeholder placeholder-xs col-8"></div>
          <div class="placeholder placeholder-xs col-10"></div>
        </div>
      </div>
    </li>
  </ul>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html column centered vertical %}
