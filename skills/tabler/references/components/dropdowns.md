# Dropdowns

Based on `/preview/pages/dropdowns.html` and `/shared/includes/ui/dropdown-menu.html` in this repository.

## Base structure (Bootstrap 5)

```html
<div class="dropdown">
  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Actions</button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">Separated action</a>
  </div>
</div>
```

## Variants

### With icons
```html
<div class="dropdown-menu">
  <a class="dropdown-item" href="#">
    <svg class="icon"><use xlink:href="#icon-edit"/></svg>
    Edit
  </a>
  <a class="dropdown-item" href="#">
    <svg class="icon"><use xlink:href="#icon-copy"/></svg>
    Copy
  </a>
  <div class="dropdown-divider"></div>
  <a class="dropdown-item" href="#">
    <svg class="icon"><use xlink:href="#icon-trash"/></svg>
    Delete
  </a>
</div>
```

### With arrow
```html
<div class="dropdown-menu dropdown-menu-arrow">
  ...
</div>
```

### Right-aligned
```html
<div class="dropdown-menu dropdown-menu-end">
  ...
</div>
```

### With header
```html
<div class="dropdown-menu">
  <span class="dropdown-header">Section header</span>
  <a class="dropdown-item" href="#">Item</a>
</div>
```

### Active / disabled
```html
<a class="dropdown-item active" href="#">Active item</a>
<a class="dropdown-item disabled" href="#">Disabled item</a>
```

### Dark theme
```html
<div class="dropdown-menu dropdown-menu-dark">
  ...
</div>
```

### With checkboxes
```html
<div class="dropdown-menu">
  <label class="dropdown-item">
    <input class="form-check-input" type="checkbox" checked> Option 1
  </label>
  <label class="dropdown-item">
    <input class="form-check-input" type="checkbox"> Option 2
  </label>
</div>
```

### With radio buttons
```html
<div class="dropdown-menu">
  <label class="dropdown-item">
    <input class="form-check-input" type="radio" name="radio" checked> Option 1
  </label>
  <label class="dropdown-item">
    <input class="form-check-input" type="radio" name="radio"> Option 2
  </label>
</div>
```

### With badges
```html
<a class="dropdown-item" href="#">
  Notifications
  <span class="badge bg-primary ms-auto">5</span>
</a>
```

### With avatars
```html
<a class="dropdown-item" href="#">
  <span class="avatar avatar-xs me-2">JD</span>
  John Doe
</a>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `dropdown` | Container |
| `dropdown-menu` | Menu |
| `dropdown-menu-arrow` | With arrow |
| `dropdown-menu-end` | Alineado right |
| `dropdown-menu-dark` | Dark theme |
| `dropdown-item` | Menu item |
| `dropdown-item.active` | Active item |
| `dropdown-item.disabled` | Item deshabilitado |
| `dropdown-header` | Section heading |
| `dropdown-divider` | Divisor |
| `dropdown-toggle` | Toggle button |
| `btn-ghost-secondary` | Ghost button for actions |
