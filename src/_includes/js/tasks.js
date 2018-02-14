require(['c3'], function (c3) {
	var chart = c3.generate({
		bindto: '#chart-tasks',
		padding: {
			bottom: 24
		},
		data: {
			names: {
				data1: 'Open',
				data2: 'Resolved',
				data3: 'Closed',
				data4: 'Archived',
			},
			columns: [
				['data1', 30, 40, 10, 40, 12, 22, 4],
				['data2', 50, 20, 10, 22, 40, 52, 51],
				['data3', 8, 3, 9, 12, 13, 20, 3],
				['data4', 30, 20, 25, 42, 15, 25, 7]
			]
		},
		legend: {
			position: 'top',
			padding: 16
		},
		transition: {
			duration: 0
		},
		axis: {
			y: {
				tick: {
					fit: true
				}
			},
			x: {
				type: 'category',
				categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
				padding: {
					top: 10,
					bottom: 10
				},
				tick: {
					culling: {
						max: 7
					}
				}
			}
		},
		grid: {
			y: {
				show: true
			}
		},
		color: {
			pattern: [
				tabler.colors.blue,
                tabler.colors.green,
                tabler.colors.red,
                tabler.colors.yellow
			]
		}
	});
});