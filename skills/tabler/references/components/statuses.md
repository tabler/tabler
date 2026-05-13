# Statuses (Status Indicators)

Based on `/preview/pages/all-elements.html`, `/shared/includes/ui/status-dot.html`, `/shared/includes/ui/status.html`, and `/shared/includes/ui/status-indicator.html` in this repository.

## Status Dot

```html
<span class="status-dot status-success"></span>
<span class="status-dot status-warning"></span>
<span class="status-dot status-danger"></span>
<span class="status-dot status-info"></span>
```

### Animated
```html
<span class="status-dot status-success status-dot-animated"></span>
```

## Status

```html
<span class="status status-green">Active</span>
<span class="status status-red">Inactive</span>
<span class="status status-yellow">Pending</span>
```

## Status Indicator

```html
<span class="status-indicator status-success"></span>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `status-dot` | Status dot |
| `status-{color}` | Color (success, warning, danger, info, green, red, yellow) |
| `status-dot-animated` | Pulse animation |
| `status` | Text with status indicator |
| `status-indicator` | Larger indicator |
