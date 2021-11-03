---
title: Charts
menu: docs.plugins.charts
libs: apexcharts
description: Tabler uses ApexCharts - a free and open-source modern charting library that helps developers to create beautiful and interactive visualizations for web pages.
---

To be able to use the charts in your application you will need to install the apexcharts dependency with `npm install apexcharts`. 

See also the [ApexCharts](https://apexcharts.com/) documentation.

## Line Chart

Line charts are a typical pictorial representation that depicts trends and behaviors over time.

{% capture code %}
{% include docs/chart.html chart="demo-line" %}
{% endcapture %}
{% include example.html code=code columns=1 %}

## Area Chart

Area charts are used to represent quantitative variations.

{% capture code %}
{% include docs/chart.html chart="demo-area" %}
{% endcapture %}
{% include example.html code=code columns=1 %}

## Bar Chart

A bar chart is the best tool for displaying comparisons between categories of data.

{% capture code %}
{% include docs/chart.html chart="demo-bar" %}
{% endcapture %}
{% include example.html code=code columns=2 %}

## Pie Chart

Pie charts are an instrumental visualization tool useful in expressing data and information in terms of percentages, ratio.

{% capture code %}
{% include docs/chart.html chart="demo-pie" %}
{% endcapture %}
{% include example.html code=code columns=1 %}

# Heatmap Chart

Heatmap is a visualization tool that employs color the way a bar chart employs height and width in representing data.

{% capture code %}
{% include docs/chart.html chart="heatmap-basic" heatmap=true %}
{% endcapture %}
{% include example.html code=code columns=2 %}

# Advanced example

{% capture code %}
{% include docs/chart.html chart="social-referrals" %}
{% endcapture %}
{% include example.html code=code columns=2 %}