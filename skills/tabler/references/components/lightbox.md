# Lightbox (fslightbox)

Based on `/preview/pages/lightbox.html` in this repository.

fslightbox is a vanilla JavaScript library for displaying images and videos in a lightbox.

## Base structure

### Single image

```html
<a data-fslightbox="gallery" href="path/to/image.jpg">
  <img src="path/to/thumbnail.jpg" alt="Image" class="img-fluid">
</a>
```

### Gallery with multiple images

```html
<div class="row g-2">
  <div class="col-4">
    <a data-fslightbox="gallery" href="./static/photos/1.jpg">
      <img src="./static/photos/1.jpg" class="img-fluid rounded" alt="Image 1">
    </a>
  </div>
  <div class="col-4">
    <a data-fslightbox="gallery" href="./static/photos/2.jpg">
      <img src="./static/photos/2.jpg" class="img-fluid rounded" alt="Image 2">
    </a>
  </div>
  <div class="col-4">
    <a data-fslightbox="gallery" href="./static/photos/3.jpg">
      <img src="./static/photos/3.jpg" class="img-fluid rounded" alt="Image 3">
    </a>
  </div>
</div>
```

### Different galleries

Use different data-fslightbox values for separate galleries:

```html
<!-- Gallery 1 -->
<a data-fslightbox="gallery-a" href="image1.jpg">Image A1</a>
<a data-fslightbox="gallery-a" href="image2.jpg">Image A2</a>

<!-- Gallery 2 -->
<a data-fslightbox="gallery-b" href="image3.jpg">Image B1</a>
<a data-fslightbox="gallery-b" href="image4.jpg">Image B2</a>
```

### Videos

#### YouTube

```html
<a data-fslightbox="video-gallery" data-class="youtube-video" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
  <img src="youtube-thumbnail.jpg" class="img-fluid rounded" alt="YouTube Video">
</a>
```

#### Vimeo

```html
<a data-fslightbox="video-gallery" href="https://vimeo.com/123456789">
  <img src="vimeo-thumbnail.jpg" class="img-fluid rounded" alt="Vimeo Video">
</a>
```

#### HTML5 Video

```html
<a data-fslightbox="video-gallery" href="path/to/video.mp4">
  <img src="video-thumbnail.jpg" class="img-fluid rounded" alt="HTML5 Video">
</a>
```

### With captions

```html
<a 
  data-fslightbox="gallery" 
  href="image.jpg"
  data-caption="This is the caption text"
>
  <img src="thumbnail.jpg" class="img-fluid rounded" alt="Image">
</a>
```

### Custom thumbnail vs full image

```html
<a data-fslightbox="gallery" href="full-size-image.jpg">
  <img src="thumbnail.jpg" class="img-fluid rounded" alt="Thumbnail">
</a>
```

### Zoom on hover

```html
<a data-fslightbox="gallery" href="image.jpg" class="img-zoomable">
  <img src="image.jpg" class="img-fluid rounded" alt="Image">
</a>
```

## Inside a card (Gallery card)

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Photo Gallery</h3>
  </div>
  <div class="card-body">
    <div class="row g-2">
      <div class="col-6 col-sm-4">
        <a data-fslightbox="gallery" href="photo1.jpg">
          <img src="photo1-thumb.jpg" class="img-fluid rounded" alt="Photo 1">
        </a>
      </div>
      <div class="col-6 col-sm-4">
        <a data-fslightbox="gallery" href="photo2.jpg">
          <img src="photo2-thumb.jpg" class="img-fluid rounded" alt="Photo 2">
        </a>
      </div>
      <div class="col-6 col-sm-4">
        <a data-fslightbox="gallery" href="photo3.jpg">
          <img src="photo3-thumb.jpg" class="img-fluid rounded" alt="Photo 3">
        </a>
      </div>
    </div>
  </div>
</div>
```

## Required libraries

```html
<!-- JS - No CSS required -->
<script src="https://cdn.jsdelivr.net/npm/fslightbox@3.7.5/index.min.js"></script>
```

Or via npm:
```bash
npm install fslightbox
```

## JavaScript API

```javascript
// Open specific instance
var gallery = new FsLightbox();
gallery.props.sources = ['image1.jpg', 'image2.jpg'];
gallery.open();

// Or with options
var gallery = new FsLightbox();
gallery.props.sources = [
  'image1.jpg',
  { source: 'video.mp4', type: 'video' },
  { source: 'youtube.com/watch?v=...', type: 'youtube' }
];
gallery.props.onOpen = function() {
  console.log('Lightbox opened');
};
gallery.open();
```

## Data attributes

| Attribute | Description |
|-----------|-------------|
| `data-fslightbox` | Gallery name (group images) |
| `data-caption` | Caption text |
| `data-class` | Custom CSS class |
| `data-type` | Force type: 'image', 'video', 'youtube', 'vimeo' |
| `data-width` | Custom width |
| `data-height` | Custom height |
| `data-autoplay` | Autoplay video (true/false) |

## Supported formats

| Type | Extensions/Formats |
|------|-------------------|
| Images | .jpg, .jpeg, .png, .gif, .webp, .svg |
| Videos | .mp4, .webm, .ogv |
| YouTube | youtube.com/watch?v=... , youtu.be/... |
| Vimeo | vimeo.com/123456789 |

## Customization

```css
/* Custom lightbox styles */
.fslightbox-container {
  background: rgba(0, 0, 0, 0.95);
}

.fslightbox-slide-btn {
  background: rgba(255, 255, 255, 0.1);
}

.fslightbox-toolbar-btn {
  color: #fff;
}
```

## Events

```javascript
var gallery = new FsLightbox();

gallery.props.onOpen = function() {
  console.log('Opened');
};

gallery.props.onClose = function() {
  console.log('Closed');
};

gallery.props.onSlideChange = function(currentSlide) {
  console.log('Slide changed to:', currentSlide);
};
```

## No-JS fallback

```html
<a data-fslightbox="gallery" href="image.jpg" target="_blank">
  <img src="thumbnail.jpg" class="img-fluid rounded" alt="Image">
</a>
```
The `target="_blank"` allows users to see the full image even if JavaScript fails.
