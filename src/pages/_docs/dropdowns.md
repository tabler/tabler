---
title: Dropdowns
description: Use dropdowns to display lists of options or include more positions in a menu without overwhelming users with too many buttons and long lists. Dropdowns facilitate users' interaction with your website or software and make your design look clear.
bootstrap-link: components/dropdowns
---


## Default dropdown

With small markup changes, you can turn any `.btn` into a dropdown toggle and use it to display more options for users to choose from. Start with the default dropdown and then use additional classes to make your dropdown more user-friendly.

{% capture code %}
{% include ui/dropdown-menu.html show=true %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Dropdown divider

Use dropdown dividers to separate groups of dropdown items for greater clarity.

{% capture code %}
{% include ui/dropdown-menu.html show=true separated=true %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Active state

Make a dropdown item look active, so that it highlights when a user hovers over a given option.

{% capture code %}
{% include ui/dropdown-menu.html show=true active=true %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Disabled state

Make a dropdown item look disabled to display options which are currently not available but can activate once certain conditions are met.

{% capture code %}
{% include ui/dropdown-menu.html show=true disabled=true %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Dropdown header

Add a dropdown header to group dropdown items into sections and name them accordingly. 

{% capture code %}
{% include ui/dropdown-menu.html show=true header=true %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Dropdown with icons

Use icons in your dropdowns to add more visual content and make the options easy to identify for users.

{% capture code %}
{% include ui/dropdown-menu.html show=true icons=true header=true %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Dropdown with arrow

Add an arrow that points at the dropdown button.

{% capture code %}
{% include ui/dropdown-menu.html show=true arrow=true %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Dropdown with badge

Add a badge to your dropdown items to show additional information related to an item or distinguish it from other elements.

{% capture code %}
{% include ui/dropdown-menu.html show=true badge=true %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Dropdown with checkboxes

Use dropdowns with checkboxes to allow users to select options from a predefined list. Dropdowns with checkboxes are particularly useful for filtering. 

{% capture code %}
{% include ui/dropdown-menu.html show=true check=true %}
{% endcapture %}
{% include example.html code=code centered=true %}

{% capture code %}
{% include ui/dropdown-menu.html show=true radio=true %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Dark dropdown

Make your dropdown suit the dark mode of your website or software. 

{% capture code %}
{% include ui/dropdown-menu.html show=true dark=true header=true icons=true arrow=true %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Dropdown with card content

Use a dropdown with card content to make it easy for users to get more information on a given subject and avoid ovewhelming them with too much content at once.

{% capture code %}
{% include ui/button.html color="white" text="Button" %}
<div class="dropdown{% hide %} show{% endhide %}">
    <a href="#" class="btn btn-primary dropdown-toggle">Dropdown</a>
    <div class="dropdown-menu dropdown-menu-card{% hide %} show position-static{% endhide %}" style="max-width: 20rem;">
        {% include cards/blog-single.html type="image" %}
    </div>
</div>
{% endcapture %}
{% include example.html code=code centered=true wrapper="btn-list align-items-start" %}