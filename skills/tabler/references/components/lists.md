# Lists

Based on `/preview/pages/lists.html` in this repository.

## Base structure

```html
<div class="list-group list-group-flush">
  <div class="list-group-item">First item</div>
  <div class="list-group-item">Second item</div>
  <div class="list-group-item">Third item</div>
</div>
```

## Variants

### List with links

```html
<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active">
    Active item
  </a>
  <a href="#" class="list-group-item list-group-item-action">
    Normal item
  </a>
  <a href="#" class="list-group-item list-group-item-action disabled">
    Disabled item
  </a>
</div>
```

### List with icons

```html
<div class="list-group list-group-flush">
  <a class="list-group-item list-group-item-action d-flex align-items-center" href="#">
    <svg class="icon me-2"><use xlink:href="#icon-mail"/></svg>
    Messages
    <span class="badge bg-primary ms-auto">14</span>
  </a>
  <a class="list-group-item list-group-item-action d-flex align-items-center" href="#">
    <svg class="icon me-2"><use xlink:href="#icon-bell"/></svg>
    Notifications
    <span class="badge bg-red ms-auto">3</span>
  </a>
</div>
```

### List with avatars

```html
<div class="list-group list-group-flush">
  <div class="list-group-item d-flex align-items-center">
    <span class="avatar avatar-sm me-3" style="background-image: url(...)"></span>
    <div class="flex-fill">
      <div class="font-weight-medium">John Doe</div>
      <div class="text-secondary text-truncate">john@example.com</div>
    </div>
    <span class="badge bg-green">Online</span>
  </div>
  <div class="list-group-item d-flex align-items-center">
    <span class="avatar avatar-sm me-3">JL</span>
    <div class="flex-fill">
      <div class="font-weight-medium">Jane Lee</div>
      <div class="text-secondary">jane@example.com</div>
    </div>
    <span class="badge bg-secondary">Offline</span>
  </div>
</div>
```

### List with checkboxes

```html
<div class="list-group list-group-flush">
  <label class="list-group-item">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="">
      <span class="form-check-label">First checkbox</span>
    </div>
  </label>
  <label class="list-group-item">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" checked>
      <span class="form-check-label">Second checkbox</span>
    </div>
  </label>
</div>
```

### List with radios

```html
<div class="list-group list-group-flush">
  <label class="list-group-item cursor-pointer">
    <div class="form-check">
      <input class="form-check-input" type="radio" name="radio-group" value="">
      <span class="form-check-label">First radio</span>
    </div>
  </label>
  <label class="list-group-item cursor-pointer">
    <div class="form-check">
      <input class="form-check-input" type="radio" name="radio-group" value="" checked>
      <span class="form-check-label">Second radio</span>
    </div>
  </label>
</div>
```

### Color variants

```html
<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action list-group-item-success">Success item</a>
  <a href="#" class="list-group-item list-group-item-action list-group-item-info">Info item</a>
  <a href="#" class="list-group-item list-group-item-action list-group-item-warning">Warning item</a>
  <a href="#" class="list-group-item list-group-item-action list-group-item-danger">Danger item</a>
</div>
```

### Horizontal list

```html
<div class="list-group list-group-horizontal">
  <a href="#" class="list-group-item list-group-item-action active">Active</a>
  <a href="#" class="list-group-item list-group-item-action">Link</a>
  <a href="#" class="list-group-item list-group-item-action">Link</a>
</div>
```

### List with content

```html
<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action">
    <div class="row align-items-center">
      <div class="col-auto">
        <span class="avatar">JL</span>
      </div>
      <div class="col text-truncate">
        <span class="text-body d-block">John Lee</span>
        <small class="d-block text-secondary text-truncate mt-n1">Sent you a message</small>
      </div>
      <div class="col-auto">
        <span class="text-secondary">2h ago</span>
      </div>
    </div>
  </a>
</div>
```

## Inside a card

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Recent Activity</h3>
  </div>
  <div class="list-group list-group-flush">
    <div class="list-group-item">Item 1</div>
    <div class="list-group-item">Item 2</div>
  </div>
</div>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `list-group` | Base container |
| `list-group-flush` | No outer borders |
| `list-group-item` | Single item |
| `list-group-item-action` | Clickable/hoverable item |
| `list-group-item-{color}` | Color variant |
| `active` | Active state |
| `disabled` | Disabled state |
| `list-group-horizontal` | Horizontal layout |
