# Fullscreen Lightbox Basic

## Description
Modern and easy plugin for displaying images and videos in clean overlaying box.
Display single source or create beautiful gallery with powerful lightbox.

Website: https://fslightbox.com

### No jQuery and other dependencies.
 
## Basic usage

### Installation
 
```
npm install fslightbox
``` 

### Example

In your application .js file:
```javascript
require('fslightbox');
```

In HTML file
```html
<a data-fslightbox="gallery" href="https://i.imgur.com/fsyrScY.jpg">
    Open first slide (image)
</a>
<a data-fslightbox="gallery" href="https://www.youtube.com/watch?v=xshEZzpS4CQ">
    Open second slide (YouTube)
</a>
<a data-fslightbox="gallery" href="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4">
    Open third slide (HTML video)
</a>
<a data-fslightbox="gallery" href="#vimeo">
    Open fourth slide (custom source)
</a>
<iframe id="vimeo" src="https://player.vimeo.com/video/22439234" width="1920px" height="1080px"
    frameBorder="0" allow="autoplay; fullscreen" allowFullScreen />

<script src="fslightbox.js"></script>
```


## Demo
Available at: https://fslightbox.com/javascript

## Documentation
Available at: https://fslightbox.com/javascript/documentation

## Browser Compatibility

| Browser | Works? |
| --- | --- |
| Chrome | Yes |
| Firefox | Yes |
| Opera | Yes |
| Safari | Yes |
| Edge | Yes |
| IE 11 | Yes |
