# Gallery

Based on `/preview/pages/gallery.html` in this repository.

## Base structure

### Simple image grid

```html
<div class="row row-cards">
  <div class="col-sm-6 col-lg-4">
    <div class="card card-sm">
      <a data-fslightbox="gallery" href="./static/photos/1.jpg">
        <img src="./static/photos/1.jpg" class="card-img-top" alt="Gallery image">
      </a>
    </div>
  </div>
  <div class="col-sm-6 col-lg-4">
    <div class="card card-sm">
      <a data-fslightbox="gallery" href="./static/photos/2.jpg">
        <img src="./static/photos/2.jpg" class="card-img-top" alt="Gallery image">
      </a>
    </div>
  </div>
  <div class="col-sm-6 col-lg-4">
    <div class="card card-sm">
      <a data-fslightbox="gallery" href="./static/photos/3.jpg">
        <img src="./static/photos/3.jpg" class="card-img-top" alt="Gallery image">
      </a>
    </div>
  </div>
</div>
```

## Gallery with captions

```html
<div class="row row-cards">
  <div class="col-sm-6 col-lg-4">
    <div class="card">
      <a data-fslightbox="gallery" href="./static/photos/1.jpg" data-caption="Beautiful landscape">
        <img src="./static/photos/1.jpg" class="card-img-top" alt="Landscape">
      </a>
      <div class="card-body">
        <h4 class="card-title">Mountain View</h4>
        <p class="text-secondary">Beautiful mountain scenery</p>
      </div>
    </div>
  </div>
</div>
```

## Masonry layout

```html
<div class="row" data-masonry='{"percentPosition": true }'>
  <div class="col-sm-6 col-lg-4 mb-3">
    <div class="card">
      <a data-fslightbox="masonry-gallery" href="./static/photos/1.jpg">
        <img src="./static/photos/1.jpg" class="card-img-top" alt="Gallery image">
      </a>
    </div>
  </div>
  <div class="col-sm-6 col-lg-4 mb-3">
    <div class="card">
      <a data-fslightbox="masonry-gallery" href="./static/photos/2.jpg">
        <img src="./static/photos/2.jpg" class="card-img-top" alt="Gallery image">
      </a>
    </div>
  </div>
</div>
```

## Photo grid (compact)

```html
<div class="row g-2">
  <div class="col-6 col-sm-4 col-lg-3">
    <a data-fslightbox="compact-gallery" href="./static/photos/1.jpg" class="d-block aspect-ratio-1x1">
      <img src="./static/photos/1.jpg" class="img-fluid rounded" alt="Photo">
    </a>
  </div>
  <div class="col-6 col-sm-4 col-lg-3">
    <a data-fslightbox="compact-gallery" href="./static/photos/2.jpg" class="d-block aspect-ratio-1x1">
      <img src="./static/photos/2.jpg" class="img-fluid rounded" alt="Photo">
    </a>
  </div>
  <!-- More items... -->
</div>
```

## Gallery with hover overlay

```html
<div class="row row-cards">
  <div class="col-sm-6 col-lg-4">
    <div class="card">
      <a data-fslightbox="overlay-gallery" href="./static/photos/1.jpg" class="d-block">
        <div class="img-responsive img-responsive-4x3">
          <img src="./static/photos/1.jpg" class="card-img-top" alt="Gallery image">
        </div>
        <span class="avatar avatar-sm avatar-rounded position-absolute top-0 end-0 m-3 bg-dark text-white">
          <svg class="icon"><use xlink:href="#icon-zoom-in"/></svg>
        </span>
      </a>
    </div>
  </div>
</div>
```

## Album layout

```html
<div class="row row-cards">
  <div class="col-md-6 col-lg-4">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Summer Vacation</h3>
      </div>
      <div class="card-body p-0">
        <div class="row g-0">
          <div class="col-6">
            <a data-fslightbox="album-1" href="./static/photos/1.jpg">
              <img src="./static/photos/1.jpg" class="w-100 h-100 object-cover" alt="Album photo">
            </a>
          </div>
          <div class="col-6">
            <div class="row g-0">
              <div class="col-6">
                <a data-fslightbox="album-1" href="./static/photos/2.jpg">
                  <img src="./static/photos/2.jpg" class="w-100" alt="Album photo">
                </a>
              </div>
              <div class="col-6">
                <a data-fslightbox="album-1" href="./static/photos/3.jpg">
                  <img src="./static/photos/3.jpg" class="w-100" alt="Album photo">
                </a>
              </div>
              <div class="col-12 position-relative">
                <a data-fslightbox="album-1" href="./static/photos/4.jpg">
                  <img src="./static/photos/4.jpg" class="w-100" alt="Album photo">
                  <div class="position-absolute inset-0 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center text-white">
                    +12 more
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Gallery with actions

```html
<div class="row row-cards">
  <div class="col-sm-6 col-lg-4">
    <div class="card">
      <a data-fslightbox="action-gallery" href="./static/photos/1.jpg">
        <img src="./static/photos/1.jpg" class="card-img-top" alt="Gallery image">
      </a>
      <div class="card-body">
        <div class="d-flex align-items-center">
          <div>
            <div class="font-weight-medium">Image Title</div>
            <div class="text-secondary">2.4 MB • Jan 12, 2024</div>
          </div>
          <div class="ms-auto">
            <button class="btn btn-icon btn-ghost-secondary">
              <svg class="icon"><use xlink:href="#icon-download"/></svg>
            </button>
            <button class="btn btn-icon btn-ghost-secondary">
              <svg class="icon"><use xlink:href="#icon-trash"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Gallery inside dropdown

```html
<div class="dropdown">
  <button class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
    View Gallery
  </button>
  <div class="dropdown-menu p-2" style="width: 300px;">
    <div class="row g-2">
      <div class="col-4">
        <a data-fslightbox="dropdown-gallery" href="./static/photos/1.jpg">
          <img src="./static/photos/1.jpg" class="img-fluid rounded" alt="Thumbnail">
        </a>
      </div>
      <div class="col-4">
        <a data-fslightbox="dropdown-gallery" href="./static/photos/2.jpg">
          <img src="./static/photos/2.jpg" class="img-fluid rounded" alt="Thumbnail">
        </a>
      </div>
      <div class="col-4">
        <a data-fslightbox="dropdown-gallery" href="./static/photos/3.jpg">
          <img src="./static/photos/3.jpg" class="img-fluid rounded" alt="Thumbnail">
        </a>
      </div>
    </div>
  </div>
</div>
```

## Lazy loading images

```html
<div class="row row-cards">
  <div class="col-sm-6 col-lg-4">
    <div class="card card-sm">
      <a data-fslightbox="lazy-gallery" href="./static/photos/1.jpg">
        <img 
          src="placeholder.jpg" 
          data-src="./static/photos/1.jpg" 
          class="card-img-top lazyload" 
          alt="Gallery image"
        >
      </a>
    </div>
  </div>
</div>
```

## Required libraries

```html
<!-- For lightbox functionality -->
<script src="https://cdn.jsdelivr.net/npm/fslightbox@3.7.5/index.min.js"></script>

<!-- For masonry layout (optional) -->
<script src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js"></script>

<!-- For lazy loading (optional) -->
<script src="https://cdn.jsdelivr.net/npm/lazysizes@5.3.2/lazysizes.min.js"></script>
```

## JavaScript initialization

```javascript
// fslightbox auto-initializes for elements with data-fslightbox
// No JavaScript needed for basic usage

// For custom initialization:
document.addEventListener('DOMContentLoaded', function() {
  refreshFsLightbox();
});

// If dynamically adding images:
function addGalleryImage(src) {
  // Add image to DOM
  // Then refresh:
  refreshFsLightbox();
}
```

## Classes

| Class | Purpose |
|-------|-----------|
| `card-img-top` | Image at top of card |
| `img-fluid` | Responsive image |
| `rounded` | Border radius |
| `aspect-ratio-1x1` | Square aspect ratio |
| `object-cover` | Cover fit for images |
| `lazyload` | Lazy loading class |
| `position-absolute` | Absolute positioning |
| `inset-0` | Full coverage positioning |
| `bg-opacity-50` | 50% opacity background |
