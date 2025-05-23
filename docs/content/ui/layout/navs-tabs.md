---
title: Navs and tabs
summary: This guide covers the basics of creating different types of navigation bars and tabs, including horizontal, vertical, pill-shaped, and underline-styled navs.
description: "Essential guide to nav styles: tabs, pills, dropdowns, and more."
---

Navigation bars are essential components of modern web applications, providing users with intuitive ways to navigate between different sections and content. This guide explores various types of navigation bars and tabs that can be easily implemented using predefined classes in HTML and CSS. Each type serves specific use cases, from horizontal and vertical layouts to tabbed interfaces and dropdown menus. By utilizing these examples, developers can enhance the usability and aesthetics of their web projects.

## Horizontal nav

If you want to create a horizontal navigation bar, you can use the `.nav` class. The `.nav-item` class is used to style each item within the navigation bar, and `.nav-link` is applied to the links. The `.active` class highlights the current active link, while the `.disabled` class styles non-clickable links.

Look at the example below to see how the horizontal navigation bar is displayed.
 
{% capture html -%}
<ul class="nav">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#">Active</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" aria-disabled="true">Disabled</a>
  </li>
</ul>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Vertical nav

To create a vertical navigation bar, add the `.flex-column` class to the `.nav` element. This arranges the navigation items in a column instead of a row, making it suitable for sidebars or vertical menus.

```html
<ul class="nav flex-column">
  ...
</ul>
```

There is an example below to see how the vertical navigation bar is displayed.

{% capture html -%}
<ul class="nav flex-column">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#">Active</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" aria-disabled="true">Disabled</a>
  </li>
</ul>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Tabs

To create a tabbed navigation interface, use the `.nav-tabs` class. This is ideal for displaying different content sections within a single interface, where each tab represents a section.

```html
<ul class="nav nav-tabs">
  ...
</ul>
```

The example below shows how the tabbed navigation interface is displayed.

{% capture html -%}
<ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#">Active</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" aria-disabled="true">Disabled</a>
  </li>
</ul>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Pills

For a pill-shaped navigation style, use the `.nav-pills` class. This is a great choice for a sleek, modern look, especially in the interactive UI components.

{% capture html -%}
<ul class="nav nav-pills">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#">Active</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" aria-disabled="true">Disabled</a>
  </li>
</ul>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Underline

To create a navigation bar with an underline effect for active links, use the `.nav-underline` class. This provides a clean and minimalistic style.

{% capture html -%}
<ul class="nav nav-underline">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#">Active</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" aria-disabled="true">Disabled</a>
  </li>
</ul>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Tabs with Dropdown

You can enhance tabs by adding dropdown menus using the `.dropdown` class inside a `.nav-tabs` structure. This allows for additional options under a single tab, improving the navigation experience.

```html
<ul class="nav nav-tabs">
  ...
  <li class="nav-item dropdown">
    <a
      class="nav-link dropdown-toggle"
      data-bs-toggle="dropdown"
      href="#"
      role="button"
      aria-expanded="false"
      >Dropdown</a
    >
    <ul class="dropdown-menu">
      ...
    </ul>
  </li>
  ...
</ul>
```

Example below shows how tabs with dropdown menus are displayed.

{% capture html -%}
<ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#">Active</a>
  </li>
  <li class="nav-item dropdown">
    <a
      class="nav-link dropdown-toggle"
      data-bs-toggle="dropdown"
      href="#"
      role="button"
      aria-expanded="false"
      >Dropdown</a
    >
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Action</a></li>
      <li><a class="dropdown-item" href="#">Another action</a></li>
      <li><a class="dropdown-item" href="#">Something else here</a></li>
      <li><hr class="dropdown-divider" /></li>
      <li><a class="dropdown-item" href="#">Separated link</a></li>
    </ul>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" aria-disabled="true">Disabled</a>
  </li>
</ul>
{%- endcapture %}
{% include "docs/example.html" html=html overflow="visible" %}