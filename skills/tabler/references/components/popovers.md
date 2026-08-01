# Popovers

Based on `/preview/pages/all-elements.html` in this repository.

## Base structure

Tabler uses Bootstrap 5 popovers. It does not have a dedicated page in the official preview.

```html
<button class="btn" data-bs-toggle="popover" data-bs-placement="top" title="Popover Title" data-bs-content="This is popover content on top">
  Top Popover
</button>
```

## Positions

```html
<button class="btn" data-bs-toggle="popover" data-bs-placement="top" title="Title" data-bs-content="Content">
  Top
</button>
<button class="btn" data-bs-toggle="popover" data-bs-placement="bottom" title="Title" data-bs-content="Content">
  Bottom
</button>
<button class="btn" data-bs-toggle="popover" data-bs-placement="left" title="Title" data-bs-content="Content">
  Left
</button>
<button class="btn" data-bs-toggle="popover" data-bs-placement="right" title="Title" data-bs-content="Content">
  Right
</button>
```

## Notes

Popovers use the Popper.js library included in Tabler. No manual initialization is required when using `data-bs-toggle="popover"`.

## Attributes

| Attribute | Purpose |
|----------|-----------|
| `data-bs-toggle="popover"` | Activa popover |
| `data-bs-placement` | Position (top, bottom, left, right) |
| `title` | Popover title |
| `data-bs-content` | Popover content |
