# Background Patterns

Based on `/preview/pages/patterns.html` in this repository.

## Base structure

Tabler includes several CSS background patterns that can be applied to any element.

```html
<div class="bg-pattern bg-pattern-checks">
  <div class="p-4">
    <h3>Pattern Background</h3>
    <p>This card has a pattern background.</p>
  </div>
</div>
```

## Available patterns

### Checks

```html
<div class="bg-pattern bg-pattern-checks p-5">
  <h3>Checks Pattern</h3>
  <p>Classic checkered pattern.</p>
</div>
```

### Dots

```html
<div class="bg-pattern bg-pattern-dots p-5">
  <h3>Dots Pattern</h3>
  <p>Dotted background pattern.</p>
</div>
```

### Grid

```html
<div class="bg-pattern bg-pattern-grid p-5">
  <h3>Grid Pattern</h3>
  <p>Grid lines pattern.</p>
</div>
```

### Vertical lines

```html
<div class="bg-pattern bg-pattern-vertical-lines p-5">
  <h3>Vertical Lines</h3>
  <p>Vertical striped pattern.</p>
</div>
```

### Horizontal lines

```html
<div class="bg-pattern bg-pattern-horizontal-lines p-5">
  <h3>Horizontal Lines</h3>
  <p>Horizontal striped pattern.</p>
</div>
```

### Diagonal lines

```html
<div class="bg-pattern bg-pattern-diagonal-lines p-5">
  <h3>Diagonal Lines</h3>
  <p>Diagonal striped pattern.</p>
</div>
```

### Zigzag

```html
<div class="bg-pattern bg-pattern-zigzag p-5">
  <h3>Zigzag Pattern</h3>
  <p>Zigzag background pattern.</p>
</div>
```

### Triangles

```html
<div class="bg-pattern bg-pattern-triangles p-5">
  <h3>Triangles Pattern</h3>
  <p>Triangle pattern.</p>
</div>
```

## Pattern sizes

```html
<!-- Small pattern -->
<div class="bg-pattern bg-pattern-checks bg-pattern-sm p-5">
  <h3>Small Pattern</h3>
</div>

<!-- Normal pattern (default) -->
<div class="bg-pattern bg-pattern-checks p-5">
  <h3>Normal Pattern</h3>
</div>

<!-- Large pattern -->
<div class="bg-pattern bg-pattern-checks bg-pattern-lg p-5">
  <h3>Large Pattern</h3>
</div>
```

## Pattern opacity

```html
<div class="bg-pattern bg-pattern-checks bg-pattern-opacity-10 p-5">
  <h3>10% Opacity Pattern</h3>
</div>

<div class="bg-pattern bg-pattern-checks bg-pattern-opacity-25 p-5">
  <h3>25% Opacity Pattern</h3>
</div>

<div class="bg-pattern bg-pattern-checks bg-pattern-opacity-50 p-5">
  <h3>50% Opacity Pattern</h3>
</div>
```

## Pattern colors

Patterns inherit the text color for their lines:

```html
<!-- Primary color pattern -->
<div class="bg-pattern bg-pattern-dots text-primary p-5">
  <h3>Primary Dots</h3>
</div>

<!-- Success color pattern -->
<div class="bg-pattern bg-pattern-checks text-success p-5">
  <h3>Success Checks</h3>
</div>

<!-- Warning color pattern -->
<div class="bg-pattern bg-pattern-grid text-warning p-5">
  <h3>Warning Grid</h3>
</div>
```

## Combining with backgrounds

```html
<!-- Pattern on primary background -->
<div class="bg-pattern bg-pattern-dots bg-primary text-white p-5">
  <h3>Pattern on Primary</h3>
</div>

<!-- Pattern on light background -->
<div class="bg-pattern bg-pattern-checks bg-light p-5">
  <h3>Pattern on Light</h3>
</div>

<!-- Pattern on dark background -->
<div class="bg-pattern bg-pattern-grid bg-dark text-white p-5">
  <h3>Pattern on Dark</h3>
</div>
```

## Usage in cards

```html
<div class="card">
  <div class="card-body bg-pattern bg-pattern-checks bg-pattern-opacity-10">
    <h3 class="card-title">Card with Pattern</h3>
    <p>This card has a subtle checkered pattern.</p>
  </div>
</div>
```

## Usage in jumbotron/hero sections

```html
<div class="bg-pattern bg-pattern-dots bg-primary text-white py-5">
  <div class="container-xl">
    <div class="row">
      <div class="col-lg-8">
        <h1 class="display-4">Welcome to Tabler</h1>
        <p class="lead">Premium admin dashboard template</p>
      </div>
    </div>
  </div>
</div>
```

## Custom pattern CSS

If you need custom patterns:

```css
.bg-pattern-custom {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    currentColor 10px,
    currentColor 11px
  );
  background-size: 16px 16px;
}
```

## Classes

| Class | Purpose |
|-------|-----------|
| `bg-pattern` | Base pattern class |
| `bg-pattern-checks` | Checkered pattern |
| `bg-pattern-dots` | Dotted pattern |
| `bg-pattern-grid` | Grid pattern |
| `bg-pattern-vertical-lines` | Vertical lines |
| `bg-pattern-horizontal-lines` | Horizontal lines |
| `bg-pattern-diagonal-lines` | Diagonal lines |
| `bg-pattern-zigzag` | Zigzag pattern |
| `bg-pattern-triangles` | Triangle pattern |
| `bg-pattern-sm` | Small pattern size |
| `bg-pattern-lg` | Large pattern size |
| `bg-pattern-opacity-10` | 10% opacity |
| `bg-pattern-opacity-25` | 25% opacity |
| `bg-pattern-opacity-50` | 50% opacity |
