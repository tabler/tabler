# Vanilla JavaScript Fullscreen Lightbox Basic

## Description
A vanilla JavaScript plug-in without production dependencies for displaying images, videos, or, through custom sources, anything you want in a clean overlying box.
The project's website: https://fslightbox.com.

## Installation
### Through an archive downloaded from the website.
Just before the end of the &lt;body&gt; tag:
```html
<script src="fslightbox.js"></script>
```
### Or, through a package manager.
```
npm install fslightbox
```
And import it in your project's JavaScript file, for example through the Node.js "require" function:
```
require("fslightbox")
```

## Basic usage
```html
<a data-fslightbox="gallery" href="https://i.imgur.com/fsyrScY.jpg">
	Open the first slide (an image)
</a>
<a 
	data-fslightbox="gallery"
	href="https://www.youtube.com/watch?v=xshEZzpS4CQ"
>
	Open the second slide (a YouTube video)
</a>
<a
	data-fslightbox="gallery"
	href="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
>
	Open the third slide (an HTML video)
</a>
<a data-fslightbox="gallery" href="#vimeo">
	Open the fourth slide (a Vimeo video—a custom source)
</a>
<iframe
	id="vimeo"
	src="https://player.vimeo.com/video/22439234"
	width="1920px"
	height="1080px"
	frameBorder="0"
	allow="autoplay; fullscreen"
	allowFullScreen
></iframe>
```

## Documentation
Available at: https://fslightbox.com/javascript/documentation.

## Demo
Available at: https://fslightbox.com/javascript.

## Browser Compatibility

| Browser | Works? |
| --- | --- |
| Chrome | Yes |
| Firefox | Yes |
| Opera | Yes |
| Safari | Yes |
| Edge | Yes |
| IE 11 | Yes |
