---
title: Dropdowns
description: Toggle contextual overlays for displaying lists of links and more with the Bootstrap dropdown plugin.
bootstrap-link: components/dropdowns
---

## Default dropdown

Any single `.btn` can be turned into a dropdown toggle with some markup changes. Here’s how you can do this:

{% capture code %}
{% include ui/dropdown-menu.html show=true %}
{% endcapture %}
{% include example.html code=code centered=true %}

## Dropdown divider

Separate groups of related menu items with a divider.

{% capture code %}
{% include ui/dropdown-menu.html show=true separated=true %}
{% endcapture %}
{% include example.html code=code centered=true %}

## Active state

{% capture code %}
{% include ui/dropdown-menu.html show=true active=true %}
{% endcapture %}
{% include example.html code=code centered=true %}

## Disabled state

{% capture code %}
{% include ui/dropdown-menu.html show=true disabled=true %}
{% endcapture %}
{% include example.html code=code centered=true %}

## Dropdown header

Add a header to label sections of actions in any dropdown menu.

{% capture code %}
{% include ui/dropdown-menu.html show=true header=true %}
{% endcapture %}
{% include example.html code=code centered=true %}

## Dropdown with icons

{% capture code %}
{% include ui/dropdown-menu.html show=true icons=true header=true %}
{% endcapture %}
{% include example.html code=code centered=true %}

## Dropdown with arrow

{% capture code %}
{% include ui/dropdown-menu.html show=true arrow=true %}
{% endcapture %}
{% include example.html code=code centered=true %}

## Dropdown with badge

{% capture code %}
{% include ui/dropdown-menu.html show=true badge=true %}
{% endcapture %}
{% include example.html code=code centered=true %}

## Dropdown with checkboxes

{% capture code %}
{% include ui/dropdown-menu.html show=true check=true %}
{% endcapture %}
{% include example.html code=code centered=true %}

{% capture code %}
{% include ui/dropdown-menu.html show=true radio=true %}
{% endcapture %}
{% include example.html code=code centered=true %}

## Dark dropdown

{% capture code %}
{% include ui/dropdown-menu.html show=true dark=true header=true icons=true arrow=true %}
{% endcapture %}
{% include example.html code=code centered=true %}

## Dropdown with card content

{% capture code %}
{% include ui/button.html color="secondary" text="Button" %}
<div class="dropdown{% hide %} show{% endhide %}">
    <a href="#" class="btn btn-primary dropdown-toggle">Dropdown</a>
    <div class="dropdown-menu dropdown-menu-card{% hide %} show position-static{% endhide %}" style="max-width: 20rem;">
        {% include cards/blog-single.html type="image" %}
    </div>
</div>
{% endcapture %}
{% include example.html code=code centered=true wrapper="btn-list align-items-start" %}