---
title: Statuses
menu: docs.components.statuses
description: Status dots are particularly useful if you want to make an interface element more noticeable regardless of limited space.
---

## Default markup

{% capture code %}
{% for color in site.colors %}
{% assign c = color[0] %}
{% assign t = color[1].title %}
{% include ui/status.html color=c text=t %}
{% endfor %}
{% endcapture %}
{% include example.html code=code centered=true wrapper="btn-list" %}

## Status with dot

{% capture code %}
{% for color in site.colors %}
{% assign c = color[0] %}
{% assign t = color[1].title %}
{% include ui/status.html color=c text=t dot=true %}
{% endfor %}
{% endcapture %}
{% include example.html code=code centered=true wrapper="btn-list" %}

### Animated dot

{% capture code %}
{% for color in site.colors %}
{% assign c = color[0] %}
{% assign t = color[1].title %}
{% include ui/status.html color=c text=t dot=true animated=true %}
{% endfor %}
{% endcapture %}
{% include example.html code=code centered=true wrapper="btn-list" %}

## Lite status

{% capture code %}
{% for color in site.colors %}
{% assign c = color[0] %}
{% assign t = color[1].title %}
{% include ui/status.html color=c text=t dot=true lite=true %}
{% endfor %}
{% endcapture %}
{% include example.html code=code centered=true wrapper="btn-list" %}

## Status dots

{% capture code %}
{% for color in site.colors %}
<span class="status-dot status-{{ color[0] }}"></span>
{% endfor %}
{% endcapture %}
{% include example.html code=code centered=true wrapper="btn-list" %}

### Animated dots

{% capture code %}
{% for color in site.colors %}
<span class="status-dot status-dot-animated status-{{ color[0] }}"></span>
{% endfor %}
{% endcapture %}
{% include example.html code=code centered=true wrapper="btn-list" %}

## Status indicator 

{% capture code %}
{% for color in site.colors %}
{% assign c = color[0] %}
{% include ui/status-indicator.html animated=true color=c %}
{% endfor %}
{% endcapture %}
{% include example.html code=code centered=true wrapper="btn-list" %}