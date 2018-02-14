require(['c3'], function (c3) {
	var chart = c3.generate({
		bindto: '#chart-pie',
		padding: {
			bottom: 24,
			top: 0
		},
		data: {
			type: 'donut',
			names: {
				data1: 'Open',
				data2: 'Resolved',
				data3: 'Closed',
				data4: 'Archived',
			},
			columns: [
				['data1', 30],
				['data2', 50],
				['data3', 8],
				['data4', 30]
			]
		},
		donut: {
			label: {
				show: false
			}
		},
		color: {
			pattern: [
				'{{ site.colors.blue }}',
				'{{ site.colors.green }}',
				'{{ site.colors.red }}',
				'{{ site.colors.yellow }}',
				'{{ site.colors.orange }}',
				'{{ site.colors.pink }}',
			]
		}
	});
});