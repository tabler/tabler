# Carousel

Based on `/preview/pages/carousel.html` and `/shared/includes/ui/carousel.html` in this repository.

## Base structure (Bootstrap 5)

```html
<div id="carousel-default" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" alt="" src="./static/photos/001.jpg" height="250" style="object-fit: cover">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" alt="" src="./static/photos/002.jpg" height="250" style="object-fit: cover">
    </div>
  </div>
</div>
```

## With indicators (dots)

```html
<div id="carousel-indicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carousel-indicators" data-bs-slide-to="0" class="active"></button>
    <button type="button" data-bs-target="#carousel-indicators" data-bs-slide-to="1"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">...</div>
    <div class="carousel-item">...</div>
  </div>
</div>
```

## Variants

### With controls (prev/next)
```html
<div id="carousel-controls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">...</div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carousel-controls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carousel-controls" data-bs-slide="next">
    <span class="carousel-control-next-icon"></span>
  </button>
</div>
```

### With captions
```html
<div class="carousel-item active">
  <img class="d-block w-100" alt="" src="./static/photos/001.jpg">
  <div class="carousel-caption">
    <h5>Slide label</h5>
    <p>Some representative placeholder content for this slide.</p>
  </div>
</div>
```

### Dot indicators (fade effect)
```html
<div id="carousel-dot" class="carousel slide carousel-fade" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carousel-dot" data-bs-slide-to="0" class="active"></button>
  </div>
  <div class="carousel-inner">...</div>
</div>
```

### Thumbnail indicators
```html
<div id="carousel-thumb" class="carousel slide carousel-fade" data-bs-ride="carousel">
  <div class="carousel-indicators carousel-indicators-thumb">
    <button type="button" data-bs-target="#carousel-thumb" data-bs-slide-to="0" class="active">
      <img src="./static/photos/001.jpg" class="d-block w-100" alt="">
    </button>
  </div>
  <div class="carousel-inner">...</div>
</div>
```

### Vertical indicators
```html
<div class="carousel-indicators carousel-indicators-vertical">
  ...
</div>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `carousel` | Base Bootstrap 5 |
| `carousel slide` | With slide animation |
| `carousel-fade` | Fade effect (instead of slide) |
| `carousel-inner` | Slide container |
| `carousel-item` | Slide individual |
| `carousel-item.active` | Active slide |
| `carousel-indicators` | Indicators (dots or thumbnails) |
| `carousel-indicators-thumb` | Thumbnail indicators |
| `carousel-indicators-vertical` | Vertical indicators |
| `carousel-control-prev/next` | Controls |
| `carousel-caption` | Text over image |
| `data-bs-ride="carousel"` | Auto-play |
