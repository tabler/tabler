# Card Actions

Based on `/preview/pages/card-actions.html` in this repository.

## Structure

Place card actions in `card-header` or `card-footer` using Tabler patterns.

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Card title</h3>
    <div class="card-actions">
      <a href="#" class="btn btn-primary btn-sm">Action</a>
    </div>
  </div>
  <div class="card-body">...</div>
</div>
```

## Footer with elements

```html
<div class="card">
  <div class="card-body">...</div>
  <div class="card-footer">
    <div class="d-flex">
      <a href="#" class="btn btn-link">Cancel</a>
      <a href="#" class="btn btn-primary ms-auto">Save</a>
    </div>
  </div>
</div>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `card-actions` | Card-header actions container |
| `btn-list` | Footer button list |
