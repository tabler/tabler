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
{% include "ui/breadcrumb.html" pages="Home,Library,Data" %}
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Different separators

You can use different breadcrumb styles to match your website or app design. Choose between `breadcrumb-dots`, `breadcrumb-arrows`, and `breadcrumb-bullets` to create a unique look.

This example shows how to use different breadcrumb styles.

{% capture html -%}
{% include "ui/breadcrumb.html" pages="Home,Library,Data" separator="dots" %}
{% include "ui/breadcrumb.html" pages="Home,Library,Data" separator="arrows" %}
{% include "ui/breadcrumb.html" pages="Home,Library,Data" separator="bullets" %}
{%- endcapture %}
{% include "docs/example.html" html=html vertical separated centered %}

## With icon

You can use icons in breadcrumbs to make them more visually appealing. The example below demonstrates how to use icons in breadcrumbs.

{% capture html -%}
{% include "ui/breadcrumb.html" pages="Home,Library,Data" home-icon %}
{%- endcapture %}
{% include "docs/example.html" html=html vertical separated %}

## Muted breadcrumbs

You can use the `breadcrumb-muted` class to create a muted breadcrumb style. This style is perfect for breadcrumbs that are not the main focus of your website or app.

{% capture html -%}
{% include "ui/breadcrumb.html" pages="Home,Library,Data" class="breadcrumb-muted" %}
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Breadcrumb in headers

You can use breadcrumbs in headers to show the current page location and provide a better navigation experience. The example below demonstrates how to use breadcrumbs in headers.

{% capture html -%}
<div class="page-header">
  <div class="row align-items-center mw-100">
    <div class="col">
		{% include "ui/breadcrumb.html" pages="Home,Library,Articles" -%}
      <h2 class="page-title">
        <span class="text-truncate">How to Build a Modern Dashboard with Tabler</span>
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
{% include "docs/example.html" html=html centered vertical %}

