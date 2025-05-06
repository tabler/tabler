---
title: Breadcrumb
summary: Breadcrumbs are used to show the current website or app location and reduce the number of actions users have to take. Thanks to breadcrumbs, they can easily navigate within the website hierarchy and better understand its structure.
bootstrapLink: components/breadcrumb/
description: Navigation aid for better structure.
---

## Default markup

Use the `breadcrumb` class to add a breadcrumb to your interface design for better navigation. The `active` modifier in a `li` tag will help you indicate the current page location and facilitate navigation within your website or app.

Look at the example below to see how breadcrumbs work in practice.

{% capture html -%}
<ol class="breadcrumb">
  <li class="breadcrumb-item">
    <a href="#">Home</a>
  </li>
  <li class="breadcrumb-item">
    <a href="#">Library</a>
  </li>
  <li class="breadcrumb-item active">
    <a href="#">Data</a>
  </li>
</ol>
{%- endcapture %}
{% include "docs/example.html" html=html vertical separated %}

## Different separators

You can use different breadcrumb styles to match your website or app design. Choose between `breadcrumb-dots`, `breadcrumb-arrows`, and `breadcrumb-bullets` to create a unique look.

This example shows how to use different breadcrumb styles.

{% capture html -%}
<ol class="breadcrumb breadcrumb-dots">
  <li class="breadcrumb-item">
    <a href="#">Home</a>
  </li>
  <li class="breadcrumb-item">
    <a href="#">Library</a>
  </li>
  <li class="breadcrumb-item active">
    <a href="#">Data</a>
  </li>
</ol>
<ol class="breadcrumb breadcrumb-arrows">
  <li class="breadcrumb-item">
    <a href="#">Home</a>
  </li>
  <li class="breadcrumb-item">
    <a href="#">Library</a>
  </li>
  <li class="breadcrumb-item active">
    <a href="#">Data</a>
  </li>
</ol>
<ol class="breadcrumb breadcrumb-bullets">
  <li class="breadcrumb-item">
    <a href="#">Home</a>
  </li>
  <li class="breadcrumb-item">
    <a href="#">Library</a>
  </li>
  <li class="breadcrumb-item active">
    <a href="#">Data</a>
  </li>
</ol>
{%- endcapture %}
{% include "docs/example.html" html=html vertical separated %}

## With icon

You can use icons in breadcrumbs to make them more visually appealing. The example below demonstrates how to use icons in breadcrumbs.

{% capture html -%}
<ol class="breadcrumb">
  <li class="breadcrumb-item">
    <a href="#">
	 	{% include "ui/icon.html" icon="home" %}
    </a>
  </li>
  <li class="breadcrumb-item">
    <a href="#">Library</a>
  </li>
  <li class="breadcrumb-item active">
    <a href="#">Data</a>
  </li>
</ol>
{%- endcapture %}
{% include "docs/example.html" html=html vertical separated %}

## Muted breadcrumbs

You can use the `breadcrumb-muted` class to create a muted breadcrumb style. This style is perfect for breadcrumbs that are not the main focus of your website or app.

{% capture html -%}
<nav aria-label="breadcrumb">
  <ol class="breadcrumb breadcrumb-muted">
    <li class="breadcrumb-item">
      <a href="#">Home</a>
    </li>
    <li class="breadcrumb-item">
      <a href="#">Library</a>
    </li>
    <li class="breadcrumb-item active">
      <a href="#">Data</a>
    </li>
  </ol>
</nav>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Breadcrumb in headers

You can use breadcrumbs in headers to show the current page location and provide a better navigation experience. The example below demonstrates how to use breadcrumbs in headers.

{% capture html -%}
<div class="page-header">
  <div class="row align-items-center mw-100">
    <div class="col">
      <div class="mb-1">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li class="breadcrumb-item">
            <a href="#">Library</a>
          </li>
          <li class="breadcrumb-item active">
            <a href="#">Articles</a>
          </li>
        </ol>
      </div>
      <h2 class="page-title">
        <span class="text-truncate"
          >Knights of Ni, we are but simple travelers who seek the enchanter who lives beyond these
          woods.</span
        >
      </h2>
    </div>
    <div class="col-auto">
      <div class="btn-list">
        <a href="#" class="btn d-none d-md-inline-flex">
          {% include "ui/icon.html" icon="edit" %}
          Edit
        </a>
        <a href="#" class="btn btn-primary">Publish</a>
      </div>
    </div>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

