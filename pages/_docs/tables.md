---
title: Tables
menu: docs.tables
bootstrap-link: content/tables/
---


## Basic Table

A basic Bootstrap table has a light padding and only horizontal dividers.

The `.table` class adds basic styling to a table:

{% capture code %}
{% include ui/table.html %}
{% endcapture %}
{% include example.html code=code %}



## Responsive tables

Across each breakpoint, use `.table-responsive` class for horizontal scrolling tables. Use `.table-responsive{-sm|-md|-lg|-xl}` as needed to create responsive tables up to a specific breakpoint. From that breakpoint and up, the table will behave normally and not scroll horizontally.

{% capture code %}
<table class="table table-responsive">
    <thead>
    <tr>
        <th>#</th>
        {% for i in (1..10) %}
        <th class="text-nowrap">Heading {{ i }}</th>
        {% endfor %}
    </tr>
    </thead>
    <tbody>
    {% for j in (1..2) %}
    <tr>
        <th>{{ j }}</th>
        {% for i in (1..10) %}
        <td>Cell</td>
        {% endfor %}
    </tr>
    {% endfor %}
    </tbody>
</table>
{% endcapture %}
{% include example.html code=code %}

## No wrap

Prevents table cell content from wrapping to another line.

{% capture code %}
{% include ui/table.html nowrap=true responsive=true %}
{% endcapture %}
{% include example.html code=code %}