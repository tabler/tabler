# Progress

Based on `/preview/pages/progress.html` and `/shared/includes/ui/progress.html` in this repository.

## Base structure

```html
<div class="progress">
  <div class="progress-bar" style="width: 38%" role="progressbar" aria-valuenow="38" aria-valuemin="0" aria-valuemax="100" aria-label="38% Complete">
    <span class="visually-hidden">38% Complete</span>
  </div>
</div>
```

## With visible value

```html
<div class="progress progress-lg">
  <div class="progress-bar" style="width: 75%" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" aria-label="75% Complete">
    75%
  </div>
</div>
```

## Colors

```html
<div class="progress">
  <div class="progress-bar bg-blue" style="width: 20%"></div>
</div>
<div class="progress">
  <div class="progress-bar bg-green" style="width: 40%"></div>
</div>
<div class="progress">
  <div class="progress-bar bg-yellow" style="width: 60%"></div>
</div>
<div class="progress">
  <div class="progress-bar bg-red" style="width: 80%"></div>
</div>
```

## Sizes

```html
<div class="progress progress-sm">...</div>
<div class="progress">...</div>
<div class="progress progress-lg">...</div>
<div class="progress progress-xl">...</div>
```

## Indeterminate

```html
<div class="progress">
  <div class="progress-bar progress-bar-indeterminate"></div>
</div>
```

## Multiple values

```html
<div class="progress">
  <div class="progress-bar bg-blue" style="width: 20%"></div>
  <div class="progress-bar bg-red" style="width: 30%"></div>
  <div class="progress-bar bg-green" style="width: 10%"></div>
</div>
```

### Separated
```html
<div class="progress progress-separated">
  <div class="progress-bar bg-blue" style="width: 10%"></div>
  <div class="progress-bar bg-red" style="width: 20%"></div>
  <div class="progress-bar bg-green" style="width: 30%"></div>
  <div class="progress-bar bg-yellow" style="width: 40%"></div>
</div>
```

## Striped

```html
<div class="progress">
  <div class="progress-bar progress-bar-striped bg-blue" style="width: 20%"></div>
</div>
```

## Animated (striped + animated)

```html
<div class="progress">
  <div class="progress-bar progress-bar-striped progress-bar-animated bg-green" style="width: 40%"></div>
</div>
```

## Progress Steps

```html
<div class="progress-steps">
  <!-- N steps, some active -->
</div>
```

## Progress Background (with label)

```html
<div class="progressbg">
  <div class="progressbg-text">Poland</div>
  <div class="progress progressbg-progress">
    <div class="progress-bar bg-primary" style="width: 85%"></div>
  </div>
  <div class="progressbg-text progressbg-text-right">85%</div>
</div>
```

## Progress Description

```html
<div class="progress-description">
  <div class="progress-description-label">Project completion</div>
  <div class="progress">
    <div class="progress-bar bg-green" style="width: 85%" role="progressbar"></div>
  </div>
</div>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `progress` | Base |
| `progress-{size}` | Size (`sm`, `lg`, `xl`) |
| `progress-bar` | Progress bar |
| `progress-bar-striped` | Diagonal stripes |
| `progress-bar-animated` | Striped animation |
| `progress-bar-indeterminate` | Indeterminate state |
| `progress-separated` | Segmentos separados |
| `progress-steps` | Step progress |
| `progressbg` | Progress with background label |
| `progressbg-progress` | Bar inside progressbg |
| `progressbg-text` | Text in progressbg |
| `progress-description` | Progress with description |
| `bg-{color}` | Bar color |
