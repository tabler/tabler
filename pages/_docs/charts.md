---
title: Charts
menu: docs.charts
---

### c3.js charts 

{% for chart in site.data.charts %}
{% if chart[1].display %}
{% example html %}
{% assign data = chart[0] %}
{% assign key = 'chart-' | append: data %}
	<div class="card">
		<div class="card-header">
			<h3 class="card-title">{{ chart[1].name }} {{ chart[0] }}</h3>
		</div>
		<div class="card-body">
			<div id="{{ key }}" style="height: 16rem"></div>
		</div>
	</div>
	{% include js/charts.html id=key chart-id=data %}
{% endexample %}
{% endif %}
{% endfor %}
