# Pagination

Based on `/preview/pages/pagination.html` and `/shared/includes/ui/pagination.html` in this repository.

## Base structure (Bootstrap 5)

```html
<nav aria-label="Page navigation">
  <ul class="pagination">
    <li class="page-item disabled">
      <a class="page-link" href="#" tabindex="-1">Previous</a>
    </li>
    <li class="page-item active"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#">Next</a>
    </li>
  </ul>
</nav>
```

## With descriptive text

```html
<nav aria-label="Page navigation">
  <ul class="pagination">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <svg class="icon"><use xlink:href="#icon-chevron-left"/></svg>
        Getting started
      </a>
    </li>
    <li class="page-item active"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        Breadcrumbs
        <svg class="icon"><use xlink:href="#icon-chevron-right"/></svg>
      </a>
    </li>
  </ul>
</nav>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `pagination` | Base Bootstrap 5 |
| `page-item` | Pagination item |
| `page-item.active` | Active item |
| `page-item.disabled` | Item deshabilitado |
| `page-link` | Item link |
