---
title: Breadcrumb
menu: docs.breadcrumb
description: A breadcrumb navigation provide links back to each previous page the user navigated through, and shows the user's current location in a website.
done: true
---

### Default markup

The dividers are automatically created in the content of the `::before` pseudo-element of li tags. You can inform the current page using the `active` modifier in a `li` tag. It will disable the navigation of inner links.

{% example %}
{% include ui/breadcrumb.html %}
{% endexample %}

### Breadcrumb variations

You can add more variations by modify `$breadcrumb-variants` variable in Tabler config.

{% example %}
{% include ui/breadcrumb.html class="breadcrumb-dots" %}
{% endexample %}

{% example %}
{% include ui/breadcrumb.html class="breadcrumb-arrows" %}
{% endexample %}

{% example %}
{% include ui/breadcrumb.html class="breadcrumb-bullets" %}
{% endexample %}

### Alternate version

{% example %}
{% include ui/breadcrumb.html class="breadcrumb-alternate" %}
{% endexample %}
