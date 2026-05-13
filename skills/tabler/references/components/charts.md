# Charts (ApexCharts)

Based on `/preview/pages/charts.html` and `/shared/includes/ui/chart.html` in this repository.

## Dependency

Tabler uses **ApexCharts** for charts. Include the library:

```html
<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
```

## Usage pattern

Tabler uses CSS custom properties for chart colors, based on Tabler CSS variables (`--tblr-{color}`). The pattern is:

```html
<div id="chart-sales" class="position-relative"></div>

<script>
document.addEventListener("DOMContentLoaded", function () {
  window.ApexCharts && (new ApexCharts(document.getElementById('chart-sales'), {
    chart: {
      type: "bar",
      fontFamily: 'inherit',
      height: 160,
      parentHeightOffset: 0,
      toolbar: { show: false },
      animations: { enabled: false }
    },
    plotOptions: {
      bar: { columnWidth: '50%' }
    },
    series: [{ name: "Sales", data: [30, 40, 35, 50, 49, 60, 70] }],
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] },
    colors: ["#206bc4"],
    stroke: { width: 2, curve: "smooth" },
    dataLabels: { enabled: false },
    grid: {
      padding: { top: -20, right: 0, left: -4, bottom: -4 },
      strokeDashArray: 4
    },
    tooltip: { theme: 'dark' },
    legend: { show: false },
    yaxis: { labels: { padding: 4 } }
  })).render();
});
</script>
```

## Recommended settings

### Line chart
```javascript
{
  chart: { type: "line", fontFamily: 'inherit', height: 300, parentHeightOffset: 0, toolbar: { show: false } },
  series: [{ name: "Sales", data: [30, 40, 35, 50, 49, 60, 70] }],
  xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] },
  colors: ["#206bc4"],
  stroke: { width: 2, curve: "smooth", lineCap: "round" },
  grid: { strokeDashArray: 4 },
  tooltip: { theme: 'dark' },
  legend: { show: false }
}
```

### Bar chart
```javascript
{
  chart: { type: "bar", fontFamily: 'inherit', height: 160, parentHeightOffset: 0, toolbar: { show: false } },
  plotOptions: { bar: { columnWidth: '50%' } },
  series: [{ name: "Sales", data: [30, 40, 35, 50] }],
  colors: ["#206bc4"],
  grid: { padding: { top: -20, right: 0, left: -4, bottom: -4 }, strokeDashArray: 4 },
  tooltip: { theme: 'dark' }
}
```

### Area chart
```javascript
{
  chart: { type: "area", fontFamily: 'inherit', height: 240, parentHeightOffset: 0, toolbar: { show: false } },
  series: [{ name: "Sales", data: [30, 40, 35, 50] }],
  fill: {
    colors: ['color-mix(in srgb, transparent, var(--tblr-primary) 16%)'],
    type: 'solid'
  },
  stroke: { width: 2, curve: "smooth" },
  grid: { strokeDashArray: 4 },
  tooltip: { theme: 'dark' }
}
```

### Donut/Pie
```javascript
{
  chart: { type: "donut", fontFamily: 'inherit', height: 240 },
  series: [44, 55, 13],
  labels: ['Direct', 'Organic', 'Referral'],
  colors: ["#206bc4", "#5eba00", "#ffc107"],
  legend: { show: true, position: 'bottom' },
  tooltip: { theme: 'dark' }
}
```

### Radial bar
```javascript
{
  chart: { type: "radialBar", fontFamily: 'inherit', height: 240 },
  plotOptions: {
    radialBar: {
      startAngle: -120,
      endAngle: 120,
      hollow: { margin: 16, size: "50%" },
      dataLabels: { show: true, value: { offsetY: -8, fontSize: '24px' } }
    }
  },
  series: [75],
  labels: ['Progress'],
  colors: ["#206bc4"],
  tooltip: { theme: 'dark' }
}
```

### Sparkline (mini chart)
```javascript
{
  chart: { type: "bar", fontFamily: 'inherit', height: 40, sparkline: { enabled: true } },
  series: [{ data: [30, 40, 35, 50, 49, 60, 70] }],
  colors: ["#206bc4"],
  tooltip: { theme: 'dark' }
}
```

## Classes

| Class | Purpose |
|-------|-----------|
| `chart-sm` | Small size |
| `chart-lg` | Large size |
