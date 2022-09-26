---
title: Tables
menu: help.docs.components.tables
description: Tables are a useful interface element that allows to visualise data and arrange it in a clear way. Thanks to that, users can browse a lot of information at once and a good table design will help you take care of its clarity.
bootstrap-link: content/tables/
---


## Basic Table

The basic table design has light padding and the presented data is separated wih horizontal dividers. It helps provide users with all the necessary information, without overwheling them with visuals.

The `.table` class adds basic styling to a table:

{% capture code %}
{% include ui/table.html %}
{% endcapture %}
{% include example.html code=code %}


## Responsive tables

Use the `.table-responsive` class across each breakpoint for horizontal scrolling tables. If you want to create responsive tables up to a specific breakpoint, use `.table-responsive{-sm|-md|-lg|-xl}`. From that breakpoint and up, the table will behave normally, rather than scroll horizontally.

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

If you don't want the table cell content to wrap to another line, use the `table-nowrap` class. 

{% capture code %}
{% include ui/table.html nowrap=true responsive=true %}
{% endcapture %}
{% include example.html code=code %}

## Table Variants

{% capture code %}
<table class="table">
    <thead>
      <tr>
        <th scope="col">Class</th>
        <th scope="col">Heading</th>
        <th scope="col">Heading</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Default</th>
        <td>Cell</td>
        <td>Cell</td>
      </tr>
        <tr class="table-primary">
          <th scope="row">Primary</th>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
        <tr class="table-secondary">
          <th scope="row">Secondary</th>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
        <tr class="table-success">
          <th scope="row">Success</th>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
        <tr class="table-danger">
          <th scope="row">Danger</th>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
        <tr class="table-warning">
          <th scope="row">Warning</th>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
        <tr class="table-info">
          <th scope="row">Info</th>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
        <tr class="table-light">
          <th scope="row">Light</th>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
        <tr class="table-dark">
          <th scope="row">Dark</th>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
    </tbody>
  </table>
{% endcapture %}
{% include example.html code=code %}