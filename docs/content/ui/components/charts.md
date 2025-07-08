---
title: Charts
docs-libs: [apexcharts]
summary: Tabler uses ApexCharts - a free and open-source modern charting library that helps developers to create beautiful and interactive visualizations for web pages.
description: Interactive data visualizations with ApexCharts.
---

To be able to use the charts in your application you will need to install the apexcharts dependency with `npm install apexcharts`.

See also the [ApexCharts](https://apexcharts.com/) documentation.

## Line Chart

Line charts are an essential tool for visualizing data trends over time. They are particularly useful for representing continuous data, such as stock prices, website traffic, or user activity. Below is an example of a line chart showcasing session duration, page views, and total visits:

{% capture html -%}
<div class="card">
  <div class="card-body">
    {% include "ui/chart.html" chart-id="demo-line" legend height=15 %}
  </div>
</div>
{{ script }}
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Area Chart

Area charts are ideal for representing cumulative data over time. They add visual emphasis to trends by filling the space under the line, making it easier to compare values. Here's an example of an area chart with smooth transitions and data from two series:

{% capture html -%}
<div class="card">
  <div class="card-body">
    {% include "ui/chart.html" chart-id="demo-area" height=15 %}
  </div>
</div>
{{ script }}
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Bar Chart

Bar charts are highly effective for comparing data across different categories. They provide a clear and concise way to visualize differences in values, making them perfect for analyzing categorical data. Here's an example of a bar chart with stacked bars for enhanced readability:

{% capture html -%}
<div class="card">
  <div class="card-body">
	 {% include "ui/chart.html" chart-id="demo-bar" height=15 %}
  </div>
</div>
{{ script }}
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Pie Chart

Pie charts are a simple and effective way to visualize proportions and ratios. They are commonly used to represent data as percentages of a whole, making them ideal for displaying parts of a dataset. Below is an example of a pie chart showcasing distribution across categories:

{% capture html -%}
<div class="card">
  <div class="card-body">
    {% include "ui/chart.html" chart-id="demo-pie" height=15 %}
  </div>
</div>
{{ script }}
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Heatmap Chart

Heatmaps provide a graphical representation of data where individual values are represented by color intensity. They are particularly useful for identifying patterns or anomalies within large datasets. Here's an example of a heatmap chart to visualize data distributions:

{% capture html -%}
<div class="card">
  <div class="card-body">
	 {% include "ui/chart-heatmap.html" chart-id="demo-heatmap" height=15 %}
  </div>
</div>
{{ script }}
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Advanced example

For more complex data visualizations, you can create advanced charts with multiple series and custom configurations. Below is an example of a social media referrals chart combining data from Facebook, Twitter, and Dribbble:

{% capture html -%}
<div class="card">
  <div class="card-body">
	 {% include "ui/chart.html" chart-id="social-referrals" height=15 %}
  </div>
</div>
{{ script }}
{%- endcapture %}
{% include "docs/example.html" html=html %}
