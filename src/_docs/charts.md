---
title: Charts
icon: fe fe-pie-chart
---

### c3.js charts 

{% example html columns=2 %}
<div class="card">
	<div class="card-header">
		<h3 class="card-title">Chart name</h3>
	</div>
	<div class="card-body">
		<div id="chart-wrapper" style="height: 16rem"></div>
	</div>
</div>
{% include js-charts.html id="chart-wrapper" data='temperature' %}
{% endexample %}