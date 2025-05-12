---
title: Badges
summary: Badges are small count and labeling components, which are used to add extra information to an interface element. You can use them to draw users' attention to a new element, notify about unread messages or provide any kind of additional info.
description: Add extra information with badges.
bootstrapLink: components/badge/
---

## Default markup

The default badges are square and come in the basic set of colors.

{% capture html -%}
<span class="badge bg-blue-lt">Blue</span>
<span class="badge bg-azure-lt">Azure</span>
<span class="badge bg-indigo-lt">Indigo</span>
<span class="badge bg-purple-lt">Purple</span>
<span class="badge bg-pink-lt">Pink</span>
<span class="badge bg-red-lt">Red</span>
<span class="badge bg-orange-lt">Orange</span>
<span class="badge bg-yellow-lt">Yellow</span>
<span class="badge bg-lime-lt">Lime</span>
<span class="badge bg-green-lt">Green</span>
<span class="badge bg-teal-lt">Teal</span>
<span class="badge bg-cyan-lt">Cyan</span>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Headings

{% capture html -%}
<h1>Example heading <span class="badge">New</span></h1>
<h2>Example heading <span class="badge">New</span></h2>
<h3>Example heading <span class="badge">New</span></h3>
<h4>Example heading <span class="badge">New</span></h4>
<h5>Example heading <span class="badge">New</span></h5>
<h6>Example heading <span class="badge">New</span></h6>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Outline badges



{% capture html -%}
<span class="badge badge-outline text-blue">blue</span>
<span class="badge badge-outline text-azure">azure</span>
<span class="badge badge-outline text-indigo">indigo</span>
<span class="badge badge-outline text-purple">purple</span>
<span class="badge badge-outline text-pink">pink</span>
<span class="badge badge-outline text-red">red</span>
<span class="badge badge-outline text-orange">orange</span>
<span class="badge badge-outline text-yellow">yellow</span>
<span class="badge badge-outline text-lime">lime</span>
<span class="badge badge-outline text-green">green</span>
<span class="badge badge-outline text-teal">teal</span>
<span class="badge badge-outline text-cyan">cyan</span>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Pill badges

Use the `.badge-pill` class if you want to create a badge with rounded corners. Its width will adjust to the label text.

{% capture html -%}
<span class="badge badge-pill bg-blue-lt">1</span>
<span class="badge badge-pill bg-azure-lt">2</span>
<span class="badge badge-pill bg-indigo-lt">3</span>
<span class="badge badge-pill bg-purple-lt">4</span>
<span class="badge badge-pill bg-pink-lt">5</span>
<span class="badge badge-pill bg-red-lt">6</span>
<span class="badge badge-pill bg-orange-lt">7</span>
<span class="badge badge-pill bg-yellow-lt">8</span>
<span class="badge badge-pill bg-lime-lt">9</span>
<span class="badge badge-pill bg-green-lt">10</span>
<span class="badge badge-pill bg-teal-lt">11</span>
<span class="badge badge-pill bg-cyan-lt">12</span>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Links

Place the badge within an `<a>` element if you want it to perform the function of a link and make it clickable.

{% capture html -%}
<a href="#" class="badge bg-blue-lt">Blue</a>
<a href="#" class="badge bg-azure-lt">Azure</a>
<a href="#" class="badge bg-indigo-lt">Indigo</a>
<a href="#" class="badge bg-purple-lt">Purple</a>
<a href="#" class="badge bg-pink-lt">Pink</a>
<a href="#" class="badge bg-red-lt">Red</a>
<a href="#" class="badge bg-orange-lt">Orange</a>
<a href="#" class="badge bg-yellow-lt">Yellow</a>
<a href="#" class="badge bg-lime-lt">Lime</a>
<a href="#" class="badge bg-green-lt">Green</a>
<a href="#" class="badge bg-teal-lt">Teal</a>
<a href="#" class="badge bg-cyan-lt">Cyan</a>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Button with badge

Badges can be used as part of links or buttons to provide, for example, a counter.

{% capture html -%}
<button type="button" class="btn">
	Notifications <span class="badge bg-red-lt ms-2">4</span>
</button>
<button type="button" class="btn">
  Notifications <span class="badge bg-green-lt ms-2">4</span>
</button>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}
