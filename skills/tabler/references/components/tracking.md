# Tracking (Activity Blocks)

Based on `/shared/includes/ui/tracking.html` in this repository.

## Base structure

```html
<div class="tracking">
  <div class="tracking-block bg-success"></div>
  <div class="tracking-block bg-success"></div>
  <div class="tracking-block bg-warning"></div>
  <div class="tracking-block bg-danger"></div>
  <div class="tracking-block bg-empty"></div>
</div>
```

## With tooltip

```html
<div class="tracking">
  <div class="tracking-block bg-success" data-bs-toggle="tooltip" title="12 active users"></div>
  <div class="tracking-block bg-warning" data-bs-toggle="tooltip" title="3 warnings"></div>
  <div class="tracking-block bg-danger" data-bs-toggle="tooltip" title="1 error"></div>
</div>
```

## Colors

```html
<!-- States -->
<div class="tracking-block bg-success"></div>
<div class="tracking-block bg-warning"></div>
<div class="tracking-block bg-danger"></div>
<div class="tracking-block bg-empty"></div>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `tracking` | Activity-block container |
| `tracking-block` | Individual block |
| `bg-success` | Normal activity |
| `bg-warning` | Warning |
| `bg-danger` | Error |
| `bg-empty` | No activity |
