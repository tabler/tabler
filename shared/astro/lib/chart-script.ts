// Port of ui/chart.html (Liquid) — generator of the ApexCharts <style> block and
// config object. chartStyle() returns plain CSS text (rendered via set:html — inert,
// not executable, so there's no injection surface to harden). chartConfig() returns a
// real, JSON-serializable config object, rendered by Chart.astro via
// <script define:vars> — no string-built script here at all.

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
	colors?: string[];
	datalabels?: boolean;
	'fill-type'?: string;
	'fill-gradient-shade'?: string;
	'fill-gradient-type'?: string;
	'fill-gradient-shade-intensity'?: number;
	'fill-gradient-to-color'?: string;
	'fill-gradient-inverse-colors'?: boolean;
	'fill-gradient-opacity-from'?: number;
	'fill-gradient-opacity-to'?: number;
	'fill-gradient-stops'?: number[];
	'radial-start-angle'?: number;
	'radial-end-angle'?: number;
	'radial-hollow-margin'?: number;
	'radial-hollow-size'?: string;
	'radial-labels-show'?: boolean;
	'radial-name-show'?: boolean;
	'radial-name-offset-y'?: number;
	'radial-name-font-size'?: string;
	'radial-name-color'?: string;
	'radial-value-offset-y'?: number;
	'radial-value-font-size'?: string;
	'radial-value-font-weight'?: number;
	'stroke-linecap'?: string;
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

/** The :root custom-property block (chart series colors, area fill gradient). */
export function chartStyle(opts: { id: string; data: ChartData }): string {
	const { id, data } = opts;
	const type = data.type ?? 'bar';
	const series = data.series ?? [];

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
	return `<style>\n  :root {\n${css}  }\n</style>`;
}

/**
 * The ApexCharts config, as a real JSON-serializable object (rendered via
 * <script define:vars> — no string-built script). The one exception is
 * `x-formatter`: a handful of charts.json entries carry a raw JS expression for
 * the x-axis label formatter (e.g. `val + "K"`), which can't be represented as
 * data. It comes back as `xFormatterExpr` instead of being embedded in `config`,
 * for the caller to turn into a real function with `new Function` — see
 * Chart.astro. This is data-driven (from our own charts.json, not user input),
 * same trust level as everything else here.
 */
export function chartConfig(opts: {
	id: string;
	data: ChartData;
	height: number;
}): { config: Record<string, unknown>; xFormatterExpr?: string } {
	const { id, data, height } = opts;
	const type = data.type ?? 'bar';
	const series = data.series ?? [];
	const isRound = type === 'pie' || type === 'donut' || type === 'radialBar';

	const config: Record<string, unknown> = {};

	config.chart = {
		type,
		fontFamily: 'inherit',
		height: height * 16,
		...(data.sparkline
			? { sparkline: { enabled: true } }
			: { parentHeightOffset: 0, toolbar: { show: Boolean(data.toolbar) } }),
		animations: data.animations ? undefined : { enabled: false },
		stacked: data.stacked ? true : undefined,
	};

	if (type === 'bar') {
		config.plotOptions = {
			bar: data.horizontal ? { barHeight: '50%', horizontal: true } : { columnWidth: '50%' },
		};
	}

	if (type === 'radialBar') {
		config.plotOptions = {
			radialBar: {
				startAngle: data['radial-start-angle'] ?? -120,
				endAngle: data['radial-end-angle'] ?? 120,
				hollow: {
					margin: data['radial-hollow-margin'] ?? 16,
					size: data['radial-hollow-size'] ?? '50%',
				},
				dataLabels: {
					show: data['radial-labels-show'] !== false,
					name: {
						show: Boolean(data['radial-name-show']),
						offsetY: data['radial-name-offset-y'] ?? 0,
						fontSize: data['radial-name-font-size'] ?? '16px',
						color: data['radial-name-color'] ?? 'inherit',
					},
					value: {
						offsetY: data['radial-value-offset-y'] ?? -8,
						fontSize: data['radial-value-font-size'] ?? '24px',
						fontWeight: data['radial-value-font-weight'] ?? 600,
					},
				},
			},
		};
	}

	if (type === 'bar' || type === 'area') {
		config.dataLabels = { enabled: Boolean(data.datalabels) };
	}

	if (data['fill-type']) {
		config.fill = {
			type: data['fill-type'],
			gradient:
				data['fill-type'] === 'gradient'
					? {
							shade: data['fill-gradient-shade'] ?? 'light',
							type: data['fill-gradient-type'] ?? 'horizontal',
							shadeIntensity: data['fill-gradient-shade-intensity'] ?? 0.5,
							gradientToColors: [data['fill-gradient-to-color'] ?? '#9ec2fb'],
							inverseColors: Boolean(data['fill-gradient-inverse-colors']),
							opacityFrom: data['fill-gradient-opacity-from'] ?? 1,
							opacityTo: data['fill-gradient-opacity-to'] ?? 1,
							stops: data['fill-gradient-stops'] ?? [0, 100],
						}
					: undefined,
		};
	} else if (type === 'area') {
		config.fill = {
			colors: [`var(--chart-${id}-fill-0)`, `var(--chart-${id}-fill-1)`],
			type: 'solid',
		};
	}

	if (data.title) {
		config.title = {
			text: escapeHtml(data.title),
			margin: 0,
			floating: true,
			offsetX: 10,
			style: { fontSize: '18px' },
		};
	}

	if (type === 'radialBar' && data['stroke-linecap']) {
		config.stroke = { lineCap: data['stroke-linecap'] };
	} else if (type === 'area' || type === 'line') {
		config.stroke = {
			width: data['stroke-width'] ?? 2,
			dashArray: data['stroke-dash'],
			lineCap: 'round',
			curve: data['stroke-curve'] ?? 'smooth',
		};
	}

	if (series.length > 0) {
		if (isRound) {
			config.series = series.map((s) => s.data);
			config.labels = series.map((s) => s.name ?? '');
		} else {
			config.series = series.map((s) => ({
				name: s.name ?? '',
				data: s['candlestick-data']
					? s['candlestick-data'].map((c) => ({ x: c.x, y: c.y }))
					: (s.data as number[]),
			}));
		}
	}

	config.tooltip = { theme: 'dark' };

	config.grid = {
		padding: data.sparkline ? undefined : { top: -20, right: 0, left: -4, bottom: -4 },
		show: data['hide-grid'] ? false : undefined,
		strokeDashArray: data['hide-grid'] ? undefined : 4,
		xaxis: !data['hide-grid'] && data['show-x'] ? { lines: { show: true } } : undefined,
	};

	if (data['show-data-labels']) {
		// Liquid emits a second `dataLabels:` here, shadowing the earlier one — a
		// plain reassignment (not a merge) reproduces that.
		config.dataLabels = { enabled: true };
	}

	if (data.categories || data.datetime) {
		config.xaxis = {
			labels: { padding: 0 },
			tooltip: { enabled: false },
			axisBorder: type === 'area' || type === 'bar' ? { show: false } : undefined,
			categories: data.categories?.map(String),
			type: data.datetime ? 'datetime' : undefined,
		};
	}

	if (!isRound) {
		config.yaxis = {
			labels: { padding: 4 },
			max: data['y-max'],
			title: data['y-title'] ? { text: escapeHtml(data['y-title']) } : undefined,
			tooltip: data['y-tooltip'] ? { enabled: true } : undefined,
		};
	}

	if (data.datetime) {
		const count = Array.isArray(series[0]?.data) ? (series[0].data as number[]).length : 0;
		config.labels = datetimeLabels(data['start-date'] ?? '2020-06-20', count);
	}

	if (data.colors) {
		config.colors = data.colors;
	} else if (series.length > 0) {
		config.colors = series.map((_, i) => `var(--chart-${id}-color-${i})`);
	}

	config.legend = data.legend
		? {
				show: true,
				position: 'bottom',
				offsetY: 12,
				markers: { width: 10, height: 10, radius: 100 },
				itemMargin: { horizontal: 8, vertical: 8 },
			}
		: { show: false };

	if (data['hide-tooltip'] || type === 'pie' || type === 'donut') {
		// Same reassignment-not-merge behavior as dataLabels above — the earlier
		// `theme: 'dark'` is intentionally dropped, matching the Liquid source.
		config.tooltip = {
			enabled: data['hide-tooltip'] ? false : undefined,
			fillSeriesColor: type === 'pie' || type === 'donut' ? false : undefined,
		};
	}

	if (data['hide-points']) {
		config.point = { show: false };
	}

	if (data['show-markers']) {
		config.markers = { size: 2 };
	}

	return { config, xFormatterExpr: data['x-formatter'] };
}
