---
title: Charts
---

### c3.js charts 

Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.

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