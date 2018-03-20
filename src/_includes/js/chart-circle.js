{% assign data = include.data | json_parse %}
{% assign show-labels = include.show-labels | default: false %}
{% assign show-legend = include.show-legend | default: true %}
{% assign type = include.type | default: 'donut' %}

require(['c3', 'jquery'], function (c3, $) {
	$(document).ready(function() {
		var chart = c3.generate({
			bindto: '#{{ include.id }}',
			padding: {
				bottom: {% if show-legend %}24{% else %}0{% endif %},
				top: 0
			},
			data: {
				type: '{{ type }}',
				names: {
					{% for item in data %}
						data{{ forloop.index }}: '{{ item[0] }}',{% endfor %}
				},
				columns: [
					{% for item in data %}
						['data{{ forloop.index }}', {% if item[1].first %}{{ item[1][0] }}{% else %}{{ item[1] }}{% endif %}],{% endfor %}
				],
				colors: {
					{% for item in data %}
					{% if item[1].first %}data{{ forloop.index }}: tabler.colors.{{ item[1][1] }},{% endif %}{% endfor %}
				}
			},
			{{ type }}: {
				label: {
					show: {% if show-labels %}true{% else %}false{% endif %}
				}
			},
			legend: {
				show: {% if show-legend %}true{% else %}false{% endif %}
			},
		});
	});
});