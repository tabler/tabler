# Alerts

Based on `/preview/pages/alerts.html` and `/shared/includes/ui/alert.html` in this repository.

## Alert types

Available alerts: `success`, `danger`, `warning`, `info`.

## Base structure

```html
<div class="alert alert-success" role="alert">
  <div class="alert-icon">
    <svg class="icon alert-icon"><use xlink:href="#icon-check"/></svg>
  </div>
  Completed successfully!
</div>
```

## Variants

### With icon by type

| Type | Icon |
|------|-------|
| success | `check` |
| warning | `alert-triangle` |
| danger | `alert-circle` |
| info | `info-circle` |

### Basic alert
```html
<div class="alert alert-info" role="alert">
  <div class="alert-icon">
    <svg class="icon"><use xlink:href="#icon-info-circle"/></svg>
  </div>
  Just a quick note!
</div>
```

### With description
```html
<div class="alert alert-success alert-dismissible" role="alert">
  <div class="alert-icon">
    <svg class="icon"><use xlink:href="#icon-check"/></svg>
  </div>
  <div>
    <h4 class="alert-heading">Completed successfully!</h4>
    <div class="alert-description">This is a custom alert box with a description.</div>
  </div>
  <a class="btn-close" data-bs-dismiss="alert" aria-label="close"></a>
</div>
```

### With list
```html
<div class="alert alert-danger alert-dismissible" role="alert">
  <div class="alert-icon">
    <svg class="icon"><use xlink:href="#icon-alert-circle"/></svg>
  </div>
  <div>
    <h4 class="alert-heading">Password does not meet requirements:</h4>
    <div class="alert-description">
      <ul class="alert-list">
        <li>Minimum 8 characters</li>
        <li>Include a special character</li>
      </ul>
    </div>
  </div>
  <a class="btn-close" data-bs-dismiss="alert" aria-label="close"></a>
</div>
```

### Important alert
```html
<div class="alert alert-important alert-danger" role="alert">...</div>
```

### Minor alert
```html
<div class="alert alert-minor alert-info" role="alert">...</div>
```

### With action
```html
<div class="alert alert-success alert-dismissible" role="alert">
  <div class="alert-icon">
    <svg class="icon"><use xlink:href="#icon-check"/></svg>
  </div>
  Completed successfully!
  <a href="#" class="alert-action">Link</a>
  <a class="btn-close" data-bs-dismiss="alert" aria-label="close"></a>
</div>
```

### With buttons
```html
<div class="alert alert-info" role="alert">
   ...
   <div class="btn-list">
     <a href="#" class="btn btn-primary">Okay</a>
     <a href="#" class="btn">Cancel</a>
   </div>
</div>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `alert-{type}` | Alert color (`success`, `danger`, `warning`, `info`) |
| `alert-important` | Important alert (thicker border) |
| `alert-minor` | Minor alert (more subtle style) |
| `alert-dismissible` | Enables close button |
| `alert-icon` | Icon container |
| `alert-heading` | Title inside the alert |
| `alert-description` | Description inside the alert |
| `alert-list` | List inside the alert |
| `alert-action` | Action link inside the alert |
| `alert-avatar` | Alert with avatar |
| `btn-close` | Close button (data-bs-dismiss="alert") |
