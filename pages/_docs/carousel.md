---
title: Carousel
menu: docs.carousel
description: A carousel is used to display multiple pieces of visual content without taking up too much space. Carousels eliminate the need to scroll down the page to see all content and are a popular method of displaying marketing information.  
bootstrap-link: components/carousel/
---


## Default markup

Use a carousel to make your website design more visually appealing for users. In the default carousel design, respective elements slide automatically and users can go to the next slide by clicking an arrow.

{% capture code %}
{% include ui/carousel.html show-indicators=true show-controls=true id="carousel-sample" %}
{% endcapture %}
{% include example.html code=code max-width="20rem" centered=true %}
