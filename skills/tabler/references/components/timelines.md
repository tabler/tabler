# Timelines

Based on `/preview/pages/all-elements.html` and `/shared/includes/ui/timeline.html` in this repository.

## Base structure

```html
<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-badge">
      <svg class="icon"><use xlink:href="#icon-check"/></svg>
    </div>
    <div class="timeline-content">
      <div class="timeline-header">
        <span class="timeline-title">Event title</span>
        <span class="timeline-date text-secondary">2 hours ago</span>
      </div>
      <div class="timeline-description">
        <p>Event description here.</p>
      </div>
    </div>
  </div>
</div>
```

## Variants

### Simple timeline (without badge)
```html
<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-header">
        <span class="timeline-title">Order placed</span>
        <span class="timeline-date text-secondary">Just now</span>
      </div>
    </div>
  </div>
</div>
```

### Timeline with avatar
```html
<div class="timeline-item">
  <div class="timeline-badge">
    <span class="avatar avatar-xs">JD</span>
  </div>
  <div class="timeline-content">...</div>
</div>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `timeline` | Container |
| `timeline-item` | Item individual |
| `timeline-badge` | Icon/avatar on the line |
| `timeline-content` | Item content |
| `timeline-header` | Header (title + date) |
| `timeline-title` | Event title |
| `timeline-date` | Fecha |
| `timeline-description` | Description |
