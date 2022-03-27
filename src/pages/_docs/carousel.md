---
title: Carousel
menu: docs.components.carousel
description: A carousel is used to display multiple pieces of visual content without taking up too much space. Carousels eliminate the need to scroll down the page to see all content and are a popular method of displaying marketing information.  
bootstrap-link: components/carousel/
---


## Default markup

Use a carousel to make your website design more visually appealing for users. In the default carousel design, respective elements slide automatically and users can go to the next slide by clicking an arrow.

{% capture code %}
{% include ui/carousel.html indicators=true controls=true id="carousel-sample" %}
{% endcapture %}
{% include example.html code=code max-width="30rem" centered=true %}

## Dots indicators

You can replace the standard indicators with dots. Just add the `carousel-indicators-dot` class to your carousel:

{% capture code %}
{% include ui/carousel.html id="carousel-indicators-dot" title="Carousel with dot indicators" indicators=true indicators-dot=true offset=20 fade=true %}
{% endcapture %}
{% include example.html code=code max-width="30rem" centered=true %}

## Thumb indicators

The syntax is similar with thumbnails. Add class `carousel-indicators-thumb` and add `background-image` to element `[data-bs-target]`. Default thumbnails have an aspect ratio of 1:1. To change this use `ratio` utils.

{% capture code %}
{% include ui/carousel.html id="carousel-indicators-thumb" title="Carousel with thumbnail indicators" indicators=true indicators-thumb=true indicators-thumb-ratio=true offset=25 fade=true %}
{% endcapture %}
{% include example.html code=code max-width="30rem" centered=true %}

## Vertical indicators

To make the indicators go to the right side, add the `carousel-indicators-vertical` class. You can combine it with other classes that are responsible for dots or thumbnails.

{% capture code %}
{% include ui/carousel.html id="carousel-indicators-dot-vertical" title="Carousel with vertical dot indicators" indicators=true indicators-vertical=true indicators-dot=true offset=30 fade=true %}
{% endcapture %}
{% include example.html code=code max-width="30rem" centered=true %}

Likewise, you can add thumbnails on the right side:

{% capture code %}
{% include ui/carousel.html id="carousel-indicators-thumb-vertical" title="Carousel with thumbnail indicators" indicators=true indicators-vertical=true indicators-thumb=true indicators-thumb-ratio=true offset=22 fade=true %}
{% endcapture %}
{% include example.html code=code max-width="30rem" centered=true %}

## Carousel with captions

Add captions to your slides easily with the `.carousel-caption` element within any `.carousel-item`. To make the text more readable on the image you can add `carousel-caption-background` which will add a black overlay over the image.

{% capture code %}
{% include ui/carousel.html id="carousel-captions" title="Carousel with captions" captions=true controls=true offset=15 %}
{% endcapture %}
{% include example.html code=code max-width="30rem" centered=true %}