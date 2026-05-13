# Cards

Based on `/preview/pages/cards.html` and `/shared/includes/cards/` in this repository.

## Base structure

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Card title</h3>
  </div>
  <div class="card-body">
    Card content
  </div>
  <div class="card-footer">
    Card footer
  </div>
</div>
```

## Variants

### Header light
```html
<div class="card">
  <div class="card-header card-header-light">
    <h3 class="card-title">Card title</h3>
  </div>
  <div class="card-body">Card with header background</div>
</div>
```

### Borderless
```html
<div class="card card-borderless">
  <div class="card-body">
    <h3 class="card-title">Card title</h3>
    <div>Card without border</div>
  </div>
</div>
```

### With subtitle
```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Card title <span class="card-subtitle">Subtitle</span></h3>
  </div>
  <div class="card-body">...</div>
</div>
```

### Clickable cards

```html
<a href="#" class="card card-link">
  <div class="card-body">Default hover effect</div>
</a>

<a href="#" class="card card-link card-link-rotate">
  <div class="card-body">Rotate hover effect</div>
</a>

<a href="#" class="card card-link card-link-pop">
  <div class="card-body">Pop hover effect</div>
</a>
```

### Rotation
```html
<div class="card card-rotate-end"><div class="card-body">Card rotate end</div></div>
<div class="card card-rotate-start"><div class="card-body">Card rotate start</div></div>
```

### States active/inactive
```html
<div class="card card-active"><div class="card-body"><p>Active state</p></div></div>
<div class="card card-inactive"><div class="card-body"><p>Inactive state</p></div></div>
```

### Card stamp (decorative icon)
```html
<div class="card">
  <div class="card-stamp">
    <div class="card-stamp-icon bg-yellow">
      <svg class="icon"><use xlink:href="#icon-bell"/></svg>
    </div>
  </div>
  <div class="card-body">
    <h3 class="card-title">Card with icon bg</h3>
    <p class="text-secondary">Lorem ipsum dolor sit amet...</p>
  </div>
</div>
```

### Background light tint
```html
<div class="card bg-primary-lt">
  <div class="card-body">
    <h3 class="card-title">Card with primary light background</h3>
  </div>
</div>
```

### Status bars (colored borders)
```html
<div class="card">
  <div class="card-status-top bg-danger"></div>
  <div class="card-body">...</div>
</div>

<div class="card">
  <div class="card-status-bottom bg-success"></div>
  <div class="card-body">...</div>
</div>

<div class="card">
  <div class="card-status-start bg-primary"></div>
  <div class="card-body">...</div>
</div>
```

### Stacked card
```html
<div class="card card-stacked">
  <div class="card-body">Stacked card</div>
</div>
```

### Footer transparent
```html
<div class="card">
  <div class="card-body">...</div>
  <div class="card-footer card-footer-transparent">Transparent footer</div>
</div>
```

### Card group
```html
<div class="card-group">
  <div class="card">...</div>
  <div class="card">...</div>
  <div class="card">...</div>
</div>
```

### Card with progress
```html
<div class="card">
  <div class="card-body">
    <h3 class="card-title">Card with progress bar</h3>
  </div>
  <div class="progress progress-sm">
    <div class="progress-bar bg-primary" style="width: 75%"></div>
  </div>
</div>
```

### Card with image
```html
<div class="card">
  <div class="row g-0">
    <div class="col-4">
      <img src="./static/photos/001.jpg" class="img-fluid rounded-start" alt="">
    </div>
    <div class="col-8">
      <div class="card-body">Card with left side image</div>
    </div>
  </div>
</div>
```

### Card with tabs
```html
<div class="card">
  <div class="card-header">
    <ul class="nav nav-tabs card-header-tabs">
      <li class="nav-item">
        <a class="nav-link active" href="#">Active</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
    </ul>
  </div>
  <div class="card-body">Tab content</div>
</div>
```

### Card gradient
```html
<div class="card card-gradient">
  <div class="card-body">
    <h3 class="card-title">Gradient card</h3>
  </div>
</div>
```

### Card ribbon
```html
<div class="card">
  <div class="card-body position-relative">
    <div class="ribbon bg-success">New</div>
    <h3 class="card-title">Card with ribbon</h3>
  </div>
</div>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `card` | Base |
| `card-header` | Header |
| `card-header-light` | Header with light background |
| `card-body` | Body |
| `card-footer` | Footer |
| `card-footer-transparent` | Footer transparent |
| `card-title` | Title |
| `card-subtitle` | Subtitle |
| `card-borderless` | No border |
| `card-link` | Card clickeable |
| `card-link-rotate` | Hover rotate |
| `card-link-pop` | Hover pop |
| `card-rotate-end` | Rotated right |
| `card-rotate-start` | Rotated left |
| `card-active` | Active state |
| `card-inactive` | Inactive state |
| `card-stack` | Stacked effect |
| `card-stamp` / `card-stamp-icon` | Decorative icon |
| `card-status-top/bottom/start` | Status bar |
| `card-group` | Horizontal group |
| `card-table` | Table inside card |
| `bg-{color}-lt` | Light tint background |
| `card-actions` | Actions in header |
