---
title: Breadcrumb
menu: docs.components.breadcrumb
description: Breadcrumbs are used to show the current website or app location and reduce the number of actions users have to take. Thanks to breadcrumbs, they can easily navigate within the website hierarchy and better understand its structure.
bootstrap-link: components/breadcrumb/
---


## Default markup

Add the `:before` pseudo-element in `li` tags to use the default separators. The `active` modifier in a `li` tag will help you indicate the current page location and facilitate navigation within your website or app. 

{% capture code %}
{% include ui/breadcrumb.html %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Breadcrumb variations

If you wish to use different separators, modify the `$breadcrumb-variants` variable in the Tabler config. Depending on the aesthetics of your design, you can choose dots, bullets or arrows.

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

## Breadcrumb in headers

If you wish to use breadcrumbs in headers, place them above the headers.

{% capture code %}
{% include layout/headers/page-header-4.html %}
{% endcapture %}
{% include example.html code=code columns=2 %}