# Tooltips

Based on `/preview/pages/all-elements.html` in this repository.

## Base structure

Tabler uses Bootstrap 5 tooltips. It does not have a dedicated page in the official preview.

```html
<button class="btn" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top">
  Top
</button>
```

## Positions

```html
<button class="btn" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top">Top</button>
<button class="btn" data-bs-toggle="tooltip" data-bs-placement="right" title="Tooltip on right">Right</button>
<button class="btn" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Tooltip on bottom">Bottom</button>
<button class="btn" data-bs-toggle="tooltip" data-bs-placement="left" title="Tooltip on left">Left</button>
```

## Notes

Tooltips use Popper.js included in Tabler. They are automatically activated with the attribute `data-bs-toggle="tooltip"`.

## Attributes

| Attribute | Purpose |
|----------|-----------|
| `data-bs-toggle="tooltip"` | Activa tooltip |
| `data-bs-placement` | Position (top, bottom, left, right) |
| `title` | Tooltip text |
