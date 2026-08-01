# Empty States

Based on `/preview/pages/empty.html` and `/shared/includes/ui/empty.html` in this repository.

## Base structure

```html
<div class="empty">
  <div class="empty-icon">
    <svg class="icon"><use xlink:href="#icon-mood-sad"/></svg>
  </div>
  <p class="empty-title">No results found</p>
  <p class="empty-subtitle text-secondary">
    Try adjusting your search or filter to find what you're looking for.
  </p>
  <div class="empty-action">
    <a href="#" class="btn btn-primary">
      <svg class="icon"><use xlink:href="#icon-search"/></svg>
      Search again
    </a>
  </div>
</div>
```

## With SVG illustration

```html
<div class="empty">
  <div class="empty-img">
    <img src="./static/illustrations/light/computer-fix.svg" height="256" alt="">
  </div>
  <p class="empty-title">No data found</p>
  <p class="empty-subtitle text-secondary">Try adjusting your search or filter.</p>
  <div class="empty-action">
    <a href="#" class="btn btn-primary">
      <svg class="icon"><use xlink:href="#icon-plus"/></svg>
      Add your first client
    </a>
  </div>
</div>
```

## With icon text (large number)

```html
<div class="empty">
  <div class="empty-header">404</div>
  <p class="empty-title">Page not found</p>
  <p class="empty-subtitle text-secondary">The page you requested could not be found.</p>
</div>
```

## Bordered variant

```html
<div class="empty empty-bordered">
  ...
</div>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `empty` | Container |
| `empty-bordered` | With border |
| `empty-icon` | Icon |
| `empty-img` | Image/illustration |
| `empty-header` | Large text (for example, error code) |
| `empty-title` | Title |
| `empty-subtitle` | Subtitle |
| `empty-action` | Action container |
