# Breadcrumb

Based on `/preview/pages/all-elements.html` and `/shared/includes/ui/breadcrumb.html` in this repository.

## Base structure (Bootstrap 5)

```html
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item"><a href="#">Library</a></li>
    <li class="breadcrumb-item active" aria-current="page">Data</li>
  </ol>
</nav>
```

## With home icon

```html
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item">
      <a href="#">
        <svg class="icon"><use xlink:href="#icon-home"/></svg>
      </a>
    </li>
    <li class="breadcrumb-item"><a href="#">Library</a></li>
    <li class="breadcrumb-item active" aria-current="page">Data</li>
  </ol>
</nav>
```

## Variants

```html
<!-- Breadcrumb with arrows -->
<ol class="breadcrumb breadcrumb-arrows">
  <li class="breadcrumb-item"><a href="#">Step one</a></li>
  <li class="breadcrumb-item active"><a href="#">Step two</a></li>
  <li class="breadcrumb-item disabled">Step three</li>
</ol>

<!-- Breadcrumb muted -->
<ol class="breadcrumb breadcrumb-muted">
  <li class="breadcrumb-item"><a href="#">1. Step one</a></li>
  <li class="breadcrumb-item active"><a href="#">2. Step two</a></li>
  <li class="breadcrumb-item disabled">3. Step three</li>
</ol>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `breadcrumb` | Base Bootstrap 5 |
| `breadcrumb-item` | Item individual |
| `breadcrumb-item.active` | Active item |
| `breadcrumb-item.disabled` | Item deshabilitado |
| `breadcrumb-arrows` | Arrow separator |
| `breadcrumb-muted` | More muted style |
