# Offcanvas

Based on `/preview/pages/offcanvas.html` in this repository.

## Base structure

```html
<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-header">
    <h2 class="offcanvas-title" id="offcanvasRightLabel">Offcanvas</h2>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <p>Content here...</p>
  </div>
</div>
```

## Directions

```html
<div class="offcanvas offcanvas-start" id="offcanvasStart">...</div>
<div class="offcanvas offcanvas-end" id="offcanvasEnd">...</div>
<div class="offcanvas offcanvas-top" id="offcanvasTop">...</div>
<div class="offcanvas offcanvas-bottom" id="offcanvasBottom">...</div>
```

## Button to open

```html
<a class="btn" data-bs-toggle="offcanvas" href="#offcanvasRight" role="button" aria-controls="offcanvasRight">
  Toggle offcanvas
</a>
```

```html
<button class="btn" type="button" data-bs-dismiss="offcanvas">
  Close offcanvas
</button>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `offcanvas` | Base |
| `offcanvas-start/end/top/bottom` | Direction |
| `offcanvas-header` | Header |
| `offcanvas-body` | Body |
| `offcanvas-title` | Title |
| `btn-close` | Close button |
