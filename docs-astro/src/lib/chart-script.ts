// Port of ui/chart.html (Liquid) — generator of the <style> + <script> ApexCharts block.
// The structure and order of the config fields mirror the Liquid template 1:1 so the
// generated JS is token-identical to the Eleventy output.

type Serie = {
	name?: string;
	data?: number[] | number;
	color?: string;
	'color-opacity'?: string;
	'candlestick-data'?: { x: number; y: number[] }[];
};

export type ChartData = {
	type?: string;
	height?: number;
	extend?: string;
	series?: Serie[];
	categories?: Array<string | number>;
	datetime?: boolean;
	sparkline?: boolean;
	stacked?: boolean;
	animations?: boolean;
	toolbar?: boolean;
	horizontal?: boolean;
	legend?: boolean;
	title?: string;
	color?: string;
	datalabels?: boolean;
	'stroke-width'?: number[];
	'stroke-dash'?: number[];
	'stroke-curve'?: string;
	'hide-grid'?: boolean;
	'show-x'?: boolean;
	'x-formatter'?: string;
	'y-max'?: number;
	'y-title'?: string;
	'y-tooltip'?: boolean;
	'show-data-labels'?: boolean;
	'hide-tooltip'?: boolean;
	'hide-points'?: boolean;
	'show-markers'?: boolean;
	'start-date'?: string;
	[key: string]: unknown;
};

const escapeHtml = (value: string) =>
	value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Equivalent of the datetime loop: consecutive days from start-date (YYYY-MM-DD). */
function datetimeLabels(startDate: string, count: number): string[] {
	const start = new Date(`${startDate}T00:00:00Z`);
	return Array.from({ length: count }, (_, i) => {
		const d = new Date(start.getTime() + i * 86400_000);
		return d.toISOString().slice(0, 10);
	});
}

export function chartSnippet(opts: {
	id: string;
	chartId: string;
	data: ChartData;
	height: number;
}): string {
	const { id, chartId, data, height } = opts;
	const type = data.type ?? 'bar';
	const series = data.series ?? [];
	const isRound = type === 'pie' || type === 'donut' || type === 'radialBar';

	// --- <style> ---
	let css = '';
	for (const [i, serie] of series.entries()) {
		const color = serie.color ?? data.color ?? 'primary';
		const opacity = serie['color-opacity'] ?? '100%';
		css += `    --chart-${id}-color-${i}: color-mix(in srgb, transparent, var(--tblr-${color}) ${opacity});\n`;
	}
	if (type === 'area') {
		css += `    --chart-${id}-fill-0: color-mix(in srgb, transparent, var(--tblr-primary) 16%);\n`;
		css += `    --chart-${id}-fill-1: color-mix(in srgb, transparent, var(--tblr-primary) 16%);\n`;
	}
	const style = `<style>\n  :root {\n${css}  }\n</style>`;

	// --- <script> ---
	const p: string[] = [];

	p.push(`chart: {
\ttype: "${type}",
\tfontFamily: 'inherit',
\theight: ${height * 16},
${
	data.sparkline
		? `\tsparkline: {\n\t\tenabled: true\n\t},`
		: `\tparentHeightOffset: 0,\n\ttoolbar: {\n\t\tshow: ${data.toolbar ? 'true' : 'false'},\n\t},`
}
${data.animations ? '' : `\tanimations: {\n\t\tenabled: false\n\t},`}
${data.stacked ? `\tstacked: true,` : ''}
},`);

	if (type === 'bar') {
		p.push(`plotOptions: {
\tbar: {
${data.horizontal ? `\t\tbarHeight: '50%',\n\t\thorizontal: true,` : `\t\tcolumnWidth: '50%',`}
\t}
},`);
	}

	if (type === 'radialBar') {
		p.push(`plotOptions: {
\tradialBar: {
\t\tstartAngle: -120,
\t\tendAngle: 120,
\t\thollow: {
\t\t\tmargin: 16,
\t\t\tsize: "50%"
\t\t},
\t\tdataLabels: {
\t\t\tshow: true,
\t\t\tvalue: {
\t\t\t\toffsetY: -8,
\t\t\t\tfontSize: '24px',
\t\t\t}
\t\t},
\t},
},`);
	}

	if (type === 'bar' || type === 'area') {
		p.push(`dataLabels: {\n\tenabled: ${data.datalabels ? 'true' : 'false'},\n},`);
	}

	if (type === 'area') {
		p.push(`fill: {
\tcolors: [
\t\t'var(--chart-${id}-fill-0)',
\t\t'var(--chart-${id}-fill-1)',
\t],
\ttype: 'solid'
},`);
	}

	if (data.title) {
		p.push(`title: {
\ttext: "${escapeHtml(data.title)}",
\tmargin: 0,
\tfloating: true,
\toffsetX: 10,
\tstyle: {
\t\tfontSize: '18px',
\t},
},`);
	}

	if (type === 'area' || type === 'line') {
		const width = data['stroke-width'] ? `[${data['stroke-width'].join(', ')}]` : '2';
		const dash = data['stroke-dash'] ? `dashArray: [${data['stroke-dash'].join(', ')}],\n\t` : '';
		p.push(`stroke: {
\twidth: ${width},
\t${dash}lineCap: "round",
\tcurve: "${data['stroke-curve'] ?? 'smooth'}",
},`);
	}

	if (series.length > 0) {
		if (isRound) {
			p.push(`series: [${series.map((s) => s.data).join(', ')}],`);
			p.push(`labels: [${series.map((s) => `"${s.name ?? ''}"`).join(', ')}],`);
		} else if (type === 'candlestick') {
			p.push(
				`series: [${series
					.map((s) => {
						const body = s['candlestick-data']
							? s['candlestick-data'].map((c) => `{x: ${c.x}, y: [${c.y.join(', ')}]}`).join(', ')
							: (s.data as number[]).join(', ');
						return `{\n\tname: "${s.name ?? ''}",\n\tdata: [${body}]\n}`;
					})
					.join(',')}],`,
			);
		} else {
			p.push(
				`series: [${series
					.map((s) => `{\n\tname: "${s.name ?? ''}",\n\tdata: [${(s.data as number[]).join(', ')}]\n}`)
					.join(',')}],`,
			);
		}
	}

	p.push(`tooltip: {\n\ttheme: 'dark'\n},`);

	{
		let grid = 'grid: {\n';
		if (!data.sparkline) {
			grid += `\tpadding: {\n\t\ttop: -20,\n\t\tright: 0,\n\t\tleft: -4,\n\t\tbottom: -4\n\t},\n`;
		}
		if (data['hide-grid']) {
			grid += `\tshow: false,\n`;
		} else {
			grid += `\tstrokeDashArray: 4,\n`;
			if (data['show-x']) {
				grid += `\txaxis: {\n\t\tlines: {\n\t\t\tshow: true\n\t\t}\n\t},\n`;
			}
		}
		grid += '},';
		p.push(grid);
	}

	if (data['show-data-labels']) {
		p.push(`dataLabels: {\n\tenabled: true,\n},`);
	}

	if (data.categories || data.datetime) {
		let xaxis = 'xaxis: {\n\tlabels: {\n\t\tpadding: 0,\n';
		if (data['x-formatter']) {
			xaxis += `\t\tformatter: function(val) {\n\t\t\treturn ${data['x-formatter']}\n\t\t},\n`;
		}
		xaxis += '\t},\n\ttooltip: {\n\t\tenabled: false\n\t},\n';
		if (type === 'area' || type === 'bar') {
			xaxis += `\taxisBorder: {\n\t\tshow: false,\n\t},\n`;
		}
		if (data.categories) {
			xaxis += `\tcategories: [${data.categories.map((c) => `'${c}'`).join(', ')}],\n`;
		}
		if (data.datetime) {
			xaxis += `\ttype: 'datetime',\n`;
		}
		xaxis += '},';
		p.push(xaxis);
	}

	if (!isRound) {
		let yaxis = 'yaxis: {\n\tlabels: {\n\t\tpadding: 4\n\t},\n';
		if (data['y-max'] !== undefined) yaxis += `\tmax: ${data['y-max']},\n`;
		if (data['y-title']) yaxis += `\ttitle: {\n\t\ttext: '${escapeHtml(data['y-title'])}'\n\t}\n`;
		if (data['y-tooltip']) yaxis += `\ttooltip: {\n\t\tenabled: true\n\t}\n`;
		yaxis += '},';
		p.push(yaxis);
	}

	if (data.datetime) {
		const count = Array.isArray(series[0]?.data) ? (series[0].data as number[]).length : 0;
		const labels = datetimeLabels(data['start-date'] ?? '2020-06-20', count);
		p.push(`labels: [\n\t${labels.map((l) => `'${l}'`).join(', ')}\n],`);
	}

	if (series.length > 0) {
		p.push(`colors: [${series.map((_, i) => `'var(--chart-${id}-color-${i})'`).join(', ')}],`);
	}

	p.push(
		data.legend
			? `legend: {
\tshow: true,
\tposition: 'bottom',
\toffsetY: 12,
\tmarkers: {
\t\twidth: 10,
\t\theight: 10,
\t\tradius: 100,
\t},
\titemMargin: {
\t\thorizontal: 8,
\t\tvertical: 8
\t},
},`
			: `legend: {\n\tshow: false,\n},`,
	);

	if (data['hide-tooltip'] || type === 'pie' || type === 'donut') {
		let tooltip = 'tooltip: {\n';
		if (data['hide-tooltip']) tooltip += `\tenabled: false,\n`;
		if (type === 'pie' || type === 'donut') tooltip += `\tfillSeriesColor: false\n`;
		tooltip += '},';
		p.push(tooltip);
	}

	if (data['hide-points']) {
		p.push(`point: {\n\tshow: false\n},`);
	}

	if (data['show-markers']) {
		p.push(`markers: {\n\tsize: 2\n},`);
	}

	// environment === 'development' → window.tabler_chart registry
	const script = `<script>
\tdocument.addEventListener("DOMContentLoaded", function () {
\t\twindow.tabler_chart = window.tabler_chart || {};
\t\twindow.ApexCharts && (window.tabler_chart["chart-${chartId}"] = new ApexCharts(document.getElementById('chart-${id}'), {
${p.join('\n')}
\t\t})).render();
\t});
</script>`;

	return `${style}\n${script}`;
}
