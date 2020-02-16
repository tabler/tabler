---
title: Tables
menu: docs.tables
bootstrap-link: content/tables/
---

### Basic Table

A basic Bootstrap table has a light padding and only horizontal dividers.

The `.table` class adds basic styling to a table:

{% capture code %}
{% include ui/table.html %}
{% endcapture %}
{% include example.html code=code %}

### No wrap

Prevents table cell content from wrapping to another line.

{% capture code %}
{% include ui/table.html nowrap=true responsive=true %}
{% endcapture %}
{% include example.html code=code %}
