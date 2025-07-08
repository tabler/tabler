---
title: Pagination
summary: Pagination is a user interface element that allows users to navigate through a set of data or content that is divided into multiple pages. It is commonly used in web applications, blogs, and e-commerce sites to display large amounts of information in a manageable way.
---

## Basic Example

Use slightly customized pagination with previous and next icon links:

{% capture html -%}
{% include "ui/pagination.html" %}
{%- endcapture %}
{% include "docs/example.html" html=html centered vertical %}

## With First and Last links

When you have a lot of pages, you can use first and last links to quickly navigate to the beginning or end of the pagination.

{% capture html -%}
{% include "ui/pagination.html" first-last %}
{%- endcapture %}
{% include "docs/example.html" html=html centered vertical %}

## Offset

If the count of pages is too large, you can use offset to show only a few pages at a time. 

{% capture html -%}
{% include "ui/pagination.html" offset=3 count=20 %}
{%- endcapture %}
{% include "docs/example.html" html=html centered vertical %}

## Button With Text

When you want to use pagination with text, you can use text buttons. This will give you a more traditional look and feel, which is great for applications where you want to keep the focus on the content rather than the navigation.

{% capture html -%}
{% include "ui/pagination.html" text %}
{%- endcapture %}
{% include "docs/example.html" html=html centered vertical %}

## Outline version

If you want to use an outline version of the pagination, you can use the `.pagination-outline` class. This will give you a more subtle look and feel, which is great for applications where you want to keep the focus on the content rather than the navigation.

{% capture html -%}
{% include "ui/pagination.html" class="pagination-outline" %}
{%- endcapture %}
{% include "docs/example.html" html=html centered vertical %}

## Circle version

If you want to use a circle version of the pagination, you can use the `.pagination-circle` class. This will give you a more subtle look and feel, which is great for applications where you want to keep the focus on the content rather than the navigation. This can also be combined with the `.pagination-outline` class for a more prominent look.

{% capture html -%}
{% include "ui/pagination.html" class="pagination-circle" %}
{% include "ui/pagination.html" class="pagination-circle pagination-outline" -%}
{%- endcapture %}
{% include "docs/example.html" html=html centered vertical separated %}