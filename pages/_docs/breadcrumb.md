---
title: Breadcrumb
menu: docs.breadcrumb
description: Indicate the current page’s location within a navigational hierarchy that automatically adds separators via CSS.
bootstrap-link: components/breadcrumb/
---


## Default markup

The dividers are automatically created in the content of the `:before` pseudo-element of li tags. You can inform the current page using the `active` modifier in a `li` tag. It will disable the navigation of inner links.

{% capture code %}
{% include ui/breadcrumb.html %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Breadcrumb variations

You can add more variations by modify `$breadcrumb-variants` variable in Tabler config.

{% capture code %}
{% include ui/breadcrumb.html class="breadcrumb-dots" %}
{% endcapture %}
{% include example.html code=code centered=true %}

{% capture code %}
{% include ui/breadcrumb.html class="breadcrumb-arrows" %}
{% endcapture %}
{% include example.html code=code centered=true %}

{% capture code %}
{% include ui/breadcrumb.html class="breadcrumb-bullets" %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Alternate version

{% capture code %}
{% include ui/breadcrumb.html class="breadcrumb-alternate" %}
{% endcapture %}
{% include example.html code=code centered=true %}
