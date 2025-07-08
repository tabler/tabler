---
title: Avatars
summary: Avatars help customize various elements of a user interface and make the product experience more personalized. They are often used in communication apps, collaboration tools and social media.
description: Personalize UI with user avatars.
---

## Default markup

Use the `avatar` class to add an avatar to your interface design for greater customization.

{% capture html -%}
<span class="avatar" style="background-image: url(/static/avatars/002f.jpg)"></span>
<span class="avatar">JL</span>
<span class="avatar" style="background-image: url(/static/avatars/004f.jpg)"></span>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Avatar image

Set an image as the background to make users easy to indentify and create a personalized experience.

{% capture html -%}
<span class="avatar" style="background-image: url(/static/avatars/016f.jpg)"></span>
<span class="avatar" style="background-image: url(/static/avatars/022m.jpg)"></span>
<span class="avatar" style="background-image: url(/static/avatars/036m.jpg)"></span>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Initials

You can also use initials instead of pictures.

{% capture html -%}
<span class="avatar">AB</span>
<span class="avatar">CD</span>
<span class="avatar">EF</span>
<span class="avatar">GH</span>
<span class="avatar">IJ</span>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Avatar icons

Besides pictures and initials, you can also use icons to make the avatars more universal.

{% capture html -%}
<span class="avatar">
  {% include "ui/icon.html" icon="user" %}
</span>
<span class="avatar">
  {% include "ui/icon.html" icon="plus" %}
</span>
<span class="avatar">
  {% include "ui/icon.html" icon="settings" %}
</span>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Avatar initials color

Customize the color of the avatars' background. See the [full list of available colors](/ui/base/colors) for more details.

{% capture html -%}
<span class="avatar bg-green-lt">AB</span>
<span class="avatar bg-red-lt">CD</span>
<span class="avatar bg-yellow-lt">EF</span>
<span class="avatar bg-primary-lt">GH</span>
<span class="avatar bg-purple-lt">IJ</span>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Avatar size

Using Bootstrap’s typical naming structure, you can create a standard avatar or scale it up or down to different sizes based on what you need.

{% capture html -%}
<span class="avatar avatar-xl" style="background-image: url(/static/avatars/000m.jpg)"></span>
<span class="avatar avatar-lg" style="background-image: url(/static/avatars/000m.jpg)"></span>
<span class="avatar" style="background-image: url(/static/avatars/000m.jpg)"></span>
<span class="avatar avatar-sm" style="background-image: url(/static/avatars/000m.jpg)"></span>
<span class="avatar avatar-xs" style="background-image: url(/static/avatars/000m.jpg)"></span>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Avatar status

Add a status indicator to your avatar to show, for instance, if a user is online or offline or indicate the number of messages they have received.

{% capture html -%}
<span class="avatar" style="background-image: url(/static/avatars/018m.jpg)"></span>
<span class="avatar" style="background-image: url(/static/avatars/015m.jpg)">
  <span class="badge bg-danger"></span>
</span>
<span class="avatar" style="background-image: url(/static/avatars/022m.jpg)">
  <span class="badge bg-success"></span>
</span>
<span class="avatar"> <span class="badge bg-warning"></span>SA </span>
<span class="avatar" style="background-image: url(/static/avatars/022m.jpg)">
  <span class="badge bg-info"></span>
</span>
<span class="avatar" style="background-image: url(/static/avatars/048m.jpg)">
  <span class="badge bg-gray">5</span>
</span>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Avatar shape

Change the shape of an avatar with the default Bootstrap image classes. You can make them round or square and change their border radius.

{% capture html -%}
<span class="avatar" style="background-image: url(/static/avatars/019m.jpg)"></span>
<span class="avatar rounded" style="background-image: url(/static/avatars/039f.jpg)"></span>
<span class="avatar rounded-circle">AA</span>
<span class="avatar rounded-0" style="background-image: url(/static/avatars/043f.jpg)"></span>
<span class="avatar rounded-3" style="background-image: url(/static/avatars/044f.jpg)"></span>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Avatars list

Create a list of avatars within one parent container.

{% capture html -%}
<div class="avatar-list">
  <span class="avatar rounded" style="background-image: url(/static/avatars/031f.jpg)"></span>
  <span class="avatar rounded">JL</span>
  <span class="avatar rounded" style="background-image: url(/static/avatars/033f.jpg)"></span>
  <span class="avatar rounded" style="background-image: url(/static/avatars/017m.jpg)"></span>
  <span class="avatar rounded" style="background-image: url(/static/avatars/024m.jpg)"></span>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Stacked list

Make the list stack once a certain number of avatars is reached to make it look clear and display well regardless of the screen size.

{% capture html -%}
<div class="avatar-list avatar-list-stacked">
  <span class="avatar">EB</span>
  <span class="avatar" style="background-image: url(/static/avatars/026m.jpg)"></span>
  <span class="avatar" style="background-image: url(/static/avatars/016f.jpg)"></span>
  <span class="avatar" style="background-image: url(/static/avatars/028m.jpg)"></span>
  <span class="avatar" style="background-image: url(/static/avatars/030m.jpg)"></span>
  <span class="avatar">+8</span>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

{% capture html -%}
<div class="avatar-list avatar-list-stacked">
  <span
    class="avatar avatar-sm rounded-circle"
    style="background-image: url(/static/avatars/035m.jpg)"
  ></span>
  <span
    class="avatar avatar-sm rounded-circle"
    style="background-image: url(/static/avatars/027f.jpg)"
  ></span>
  <span
    class="avatar avatar-sm rounded-circle"
    style="background-image: url(/static/avatars/036f.jpg)"
  ></span>
  <span class="avatar avatar-sm rounded-circle">SA</span>
  <span
    class="avatar avatar-sm rounded-circle"
    style="background-image: url(/static/avatars/034f.jpg)"
  ></span>
  <span
    class="avatar avatar-sm rounded-circle"
    style="background-image: url(/static/avatars/043f.jpg)"
  ></span>
  <span
    class="avatar avatar-sm rounded-circle"
    style="background-image: url(/static/avatars/039f.jpg)"
  ></span>
  <span
    class="avatar avatar-sm rounded-circle"
    style="background-image: url(/static/avatars/020m.jpg)"
  ></span>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}
