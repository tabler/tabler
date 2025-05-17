---
title: Vector Maps
docs-libs: [jsvectormap]
description: Interactive guide to creating vector maps with jsVectorMap.
summary: Vector maps are a great way to display geographical data in an interactive and visually appealing way. Learn how to create vector maps with jsVectorMap.
---

## Installation

To use vector maps in your project, you need to include the jsVectorMap library in your project. You can install it via npm or include it directly from a CDN. The following example demonstrates how to include the jsVectorMap library from a CDN:

```html
<script src="{{ cdnUrl }}/dist/libs/jsvectormap/dist/js/jsvectormap.min.js"></script>
<script src="{{ cdnUrl }}/dist/libs/jsvectormap/dist/maps/js/jsvectormap-world.js"></script>
```

## Default map

Integrating the vector map into your website is straightforward. Below is a sample implementation for a world map:

```html
{% include "ui/map-vector.html" map-id="empty" %}
{{ script }}
```

## Sample demo

Look at the example below to see how the vector map works with a world map.

{% capture html -%}
{% include "ui/map-vector.html" map-id="world" %}
{{ script }}
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Markers

You can add markers to the map to highlight specific locations. Below is a sample implementation for a world map with markers:

{% capture html -%}
{% include "ui/map-vector.html" map-id="world-markers" %}
{{ script }}
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Lines 

You can also draw lines on the map to represent routes or connections between different locations. Below is a sample implementation for a world map with lines:

{% capture html -%}
{% include "ui/map-vector.html" map-id="world-lines" %}
{{ script }}
{%- endcapture %}
{% include "docs/example.html" html=html %}