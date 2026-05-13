# Tabs

Based on `/preview/pages/tabs.html` in this repository.

## Base structure (Bootstrap 5)

```html
<ul class="nav nav-tabs" data-bs-toggle="tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <a href="#tab-1" class="nav-link active" data-bs-toggle="tab" role="tab">Tab 1</a>
  </li>
  <li class="nav-item" role="presentation">
    <a href="#tab-2" class="nav-link" data-bs-toggle="tab" role="tab">Tab 2</a>
  </li>
</ul>
<div class="tab-content">
  <div class="tab-pane active" id="tab-1" role="tabpanel">Content 1</div>
  <div class="tab-pane" id="tab-2" role="tabpanel">Content 2</div>
</div>
```

## Inside a card

```html
<div class="card">
  <div class="card-header">
    <ul class="nav nav-tabs card-header-tabs" data-bs-toggle="tabs" role="tablist">
      <li class="nav-item" role="presentation">
        <a href="#tab-simple-1" class="nav-link active" data-bs-toggle="tab" role="tab">Active</a>
      </li>
      <li class="nav-item" role="presentation">
        <a href="#tab-simple-2" class="nav-link" data-bs-toggle="tab" role="tab">Link</a>
      </li>
    </ul>
  </div>
  <div class="card-body">
    <div class="tab-content">
      <div class="tab-pane active" id="tab-simple-1" role="tabpanel">Content for tab 1</div>
      <div class="tab-pane" id="tab-simple-2" role="tabpanel">Content for tab 2</div>
    </div>
  </div>
</div>
```

## Variants

### Reverse (tabs below the content)
```html
<div class="card">
  <div class="card-body">
    <div class="tab-content">
      <div class="tab-pane active" id="tab-reverse-1">Content</div>
      <div class="tab-pane" id="tab-reverse-2">Content 2</div>
    </div>
  </div>
  <div class="card-footer">
    <ul class="nav nav-tabs" data-bs-toggle="tabs">
      <li class="nav-item"><a href="#tab-reverse-1" class="nav-link active" data-bs-toggle="tab">Tab 1</a></li>
      <li class="nav-item"><a href="#tab-reverse-2" class="nav-link" data-bs-toggle="tab">Tab 2</a></li>
    </ul>
  </div>
</div>
```

### With icons
```html
<ul class="nav nav-tabs" data-bs-toggle="tabs">
  <li class="nav-item">
    <a href="#tab-icon-1" class="nav-link active" data-bs-toggle="tab">
      <svg class="icon"><use xlink:href="#icon-home"/></svg>
      Home
    </a>
  </li>
  <li class="nav-item">
    <a href="#tab-icon-2" class="nav-link" data-bs-toggle="tab">
      <svg class="icon"><use xlink:href="#icon-settings"/></svg>
      Settings
    </a>
  </li>
</ul>
```

### Justified
```html
<ul class="nav nav-tabs nav-fill" data-bs-toggle="tabs">
  <li class="nav-item"><a class="nav-link active" href="#">Tab</a></li>
  <li class="nav-item"><a class="nav-link" href="#">Tab</a></li>
</ul>
```

### Disabled tab
```html
<li class="nav-item">
  <a class="nav-link disabled" href="#">Disabled</a>
</li>
```

### Dropdown in tabs
```html
<li class="nav-item dropdown">
  <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#">Dropdown</a>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Action</a>
  </div>
</li>
```

## Activity indicator (dot)
```html
<li class="nav-item">
  <a class="nav-link active" href="#">
    Tab with activity
    <span class="badge bg-success badge-dot"></span>
  </a>
</li>
```

## Animation
```html
<ul class="nav nav-tabs" data-bs-toggle="tabs" data-bs-animate="true">
```

## Classes

| Class | Purpose |
|-------|-----------|
| `nav` | Base |
| `nav-tabs` | Tab style |
| `nav-link` | Tab link |
| `nav-link.active` | Active tab |
| `nav-item` | Tab item |
| `card-header-tabs` | Tabs inside card-header |
| `nav-fill` | Equal-width tabs |
| `tab-content` | Content container |
| `tab-pane` | Content panel |
| `tab-pane.active` | Active panel |
| `data-bs-toggle="tabs"` | Activa tabs JS |
| `data-bs-animate` | Transition animation |
