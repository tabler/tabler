---
title: Carousel
summary: A carousel is used to display multiple pieces of visual content without taking up too much space. Carousels eliminate the need to scroll down the page to see all content and are a popular method of displaying marketing information.
bootstrapLink: components/carousel/
description: Display visual content with carousels.
---

## Default markup

Use a carousel to make your website design more visually appealing for users. In the default carousel design, respective elements slide automatically and users can go to the next slide by clicking an arrow.

{% capture html -%}
<div id="carousel-sample" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button
      type="button"
      data-bs-target="#carousel-sample"
      data-bs-slide-to="0"
      class="active"
    ></button>
    <button type="button" data-bs-target="#carousel-sample" data-bs-slide-to="1"></button>
    <button type="button" data-bs-target="#carousel-sample" data-bs-slide-to="2"></button>
    <button type="button" data-bs-target="#carousel-sample" data-bs-slide-to="3"></button>
    <button type="button" data-bs-target="#carousel-sample" data-bs-slide-to="4"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img
        class="d-block w-100"
        alt=""
        src="/static/photos/city-lights-reflected-in-the-water-at-night.jpg"
      />
    </div>
    <div class="carousel-item">
      <img
        class="d-block w-100"
        alt=""
        src="/static/photos/color-palette-guide-sample-colors-catalog-.jpg"
      />
    </div>
    <div class="carousel-item">
      <img
        class="d-block w-100"
        alt=""
        src="/static/photos/finances-us-dollars-and-bitcoins-currency-money.jpg"
      />
    </div>
    <div class="carousel-item">
      <img
        class="d-block w-100"
        alt=""
        src="/static/photos/tropical-palm-leaves-floral-pattern-background.jpg"
      />
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" alt="" src="/static/photos/young-woman-working-in-a-cafe.jpg" />
    </div>
  </div>
  <a
    class="carousel-control-prev"
    data-bs-target="#carousel-sample"
    role="button"
    data-bs-slide="prev"
  >
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </a>
  <a
    class="carousel-control-next"
    data-bs-target="#carousel-sample"
    role="button"
    data-bs-slide="next"
  >
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </a>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Dots indicators

You can replace the standard indicators with dots. Just add the `carousel-indicators-dot` class to your carousel:

{% capture html -%}
<div id="carousel-indicators-dot" class="carousel slide carousel-fade" data-bs-ride="carousel">
  <div class="carousel-indicators carousel-indicators-dot">
    <button
      type="button"
      data-bs-target="#carousel-indicators-dot"
      data-bs-slide-to="0"
      class="active"
    ></button>
    <button type="button" data-bs-target="#carousel-indicators-dot" data-bs-slide-to="1"></button>
    <button type="button" data-bs-target="#carousel-indicators-dot" data-bs-slide-to="2"></button>
    <button type="button" data-bs-target="#carousel-indicators-dot" data-bs-slide-to="3"></button>
    <button type="button" data-bs-target="#carousel-indicators-dot" data-bs-slide-to="4"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img
        class="d-block w-100"
        alt=""
        src="/static/photos/stylish-workspace-with-macbook-pro.jpg"
      />
    </div>
    <div class="carousel-item">
      <img
        class="d-block w-100"
        alt=""
        src="/static/photos/coffee-on-a-table-with-other-items.jpg"
      />
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" alt="" src="/static/photos/book-on-the-grass.jpg" />
    </div>
    <div class="carousel-item">
      <img
        class="d-block w-100"
        alt=""
        src="/static/photos/a-woman-works-at-a-desk-with-a-laptop-and-a-cup-of-coffee.jpg"
      />
    </div>
    <div class="carousel-item">
      <img
        class="d-block w-100"
        alt=""
        src="/static/photos/people-by-a-banquet-table-full-with-food.jpg"
      />
    </div>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Thumb indicators

The syntax is similar for thumbnails. Add class `carousel-indicators-thumb` and add `background-image` to element `[data-bs-target]`. Default thumbnails have an aspect ratio of 1:1. To change this use `ratio` utils.

{% capture html -%}
<div id="carousel-indicators-thumb" class="carousel slide carousel-fade" data-bs-ride="carousel">
  <div class="carousel-indicators carousel-indicators-thumb">
    <button
      type="button"
      data-bs-target="#carousel-indicators-thumb"
      data-bs-slide-to="0"
      class="ratio ratio-4x3 active"
      style="background-image: url(/static/photos/group-of-people-sightseeing-in-the-city.jpg)"
    ></button>
    <button
      type="button"
      data-bs-target="#carousel-indicators-thumb"
      data-bs-slide-to="1"
      class="ratio ratio-4x3"
      style="background-image: url(/static/photos/young-woman-working-in-a-cafe.jpg)"
    ></button>
    <button
      type="button"
      data-bs-target="#carousel-indicators-thumb"
      data-bs-slide-to="2"
      class="ratio ratio-4x3"
      style="
        background-image: url(/static/photos/soft-photo-of-woman-on-the-bed-with-the-book-and-cup-of-coffee-in-hands.jpg);
      "
    ></button>
    <button
      type="button"
      data-bs-target="#carousel-indicators-thumb"
      data-bs-slide-to="3"
      class="ratio ratio-4x3"
      style="background-image: url(/static/photos/stylish-workplace-with-computer-at-home.jpg)"
    ></button>
    <button
      type="button"
      data-bs-target="#carousel-indicators-thumb"
      data-bs-slide-to="4"
      class="ratio ratio-4x3"
      style="background-image: url(/static/photos/stylish-workspace-with-macbook-pro.jpg)"
    ></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img
        class="d-block w-100"
        alt=""
        src="/static/photos/group-of-people-sightseeing-in-the-city.jpg"
      />
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" alt="" src="/static/photos/young-woman-working-in-a-cafe.jpg" />
    </div>
    <div class="carousel-item">
      <img
        class="d-block w-100"
        alt=""
        src="/static/photos/soft-photo-of-woman-on-the-bed-with-the-book-and-cup-of-coffee-in-hands.jpg"
      />
    </div>
    <div class="carousel-item">
      <img
        class="d-block w-100"
        alt=""
        src="/static/photos/stylish-workplace-with-computer-at-home.jpg"
      />
    </div>
    <div class="carousel-item">
      <img
        class="d-block w-100"
        alt=""
        src="/static/photos/stylish-workspace-with-macbook-pro.jpg"
      />
    </div>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Vertical indicators

To make the indicators go to the right side, add the `carousel-indicators-vertical` class. You can combine it with other classes that are responsible for dots or thumbnails.

{% capture html -%}
<div
  id="carousel-indicators-dot-vertical"
  class="carousel slide carousel-fade"
  data-bs-ride="carousel"
>
  <div class="carousel-indicators carousel-indicators-vertical carousel-indicators-dot">
    <button
      type="button"
      data-bs-target="#carousel-indicators-dot-vertical"
      data-bs-slide-to="0"
      class="active"
    ></button>
    <button
      type="button"
      data-bs-target="#carousel-indicators-dot-vertical"
      data-bs-slide-to="1"
    ></button>
    <button
      type="button"
      data-bs-target="#carousel-indicators-dot-vertical"
      data-bs-slide-to="2"
    ></button>
    <button
      type="button"
      data-bs-target="#carousel-indicators-dot-vertical"
      data-bs-slide-to="3"
    ></button>
    <button
      type="button"
      data-bs-target="#carousel-indicators-dot-vertical"
      data-bs-slide-to="4"
    ></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" alt="" src="/static/photos/man-looking-out-to-sea.jpg" />
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" alt="" src="/static/photos/making-magic-with-fairy-lights.jpg" />
    </div>
    <div class="carousel-item">
      <img
        class="d-block w-100"
        alt=""
        src="/static/photos/finances-us-dollars-and-bitcoins-currency-money-5.jpg"
      />
    </div>
    <div class="carousel-item">
      <img
        class="d-block w-100"
        alt=""
        src="/static/photos/cup-of-coffee-on-table-in-cafe-2.jpg"
      />
    </div>
    <div class="carousel-item">
      <img
        class="d-block w-100"
        alt=""
        src="/static/photos/young-woman-sitting-on-the-sofa-and-working-on-her-laptop-2.jpg"
      />
    </div>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

An example of adding thumbnails on the right side:

{% capture html -%}
<div
  id="carousel-indicators-thumb-vertical"
  class="carousel slide carousel-fade"
  data-bs-ride="carousel"
>
  <div class="carousel-indicators carousel-indicators-vertical carousel-indicators-thumb">
    <button
      type="button"
      data-bs-target="#carousel-indicators-thumb-vertical"
      data-bs-slide-to="0"
      class="ratio ratio-4x3 active"
      style="
        background-image: url(/static/photos/finances-us-dollars-and-bitcoins-currency-money.jpg);
      "
    ></button>
    <button
      type="button"
      data-bs-target="#carousel-indicators-thumb-vertical"
      data-bs-slide-to="1"
      class="ratio ratio-4x3"
      style="background-image: url(/static/photos/businesswoman-working-at-her-laptop.jpg)"
    ></button>
    <button
      type="button"
      data-bs-target="#carousel-indicators-thumb-vertical"
      data-bs-slide-to="2"
      class="ratio ratio-4x3"
      style="background-image: url(/static/photos/color-palette-guide-sample-colors-catalog-.jpg)"
    ></button>
    <button
      type="button"
      data-bs-target="#carousel-indicators-thumb-vertical"
      data-bs-slide-to="3"
      class="ratio ratio-4x3"
      style="
        background-image: url(/static/photos/blue-sofa-with-pillows-in-a-designer-living-room-interior.jpg);
      "
    ></button>
    <button
      type="button"
      data-bs-target="#carousel-indicators-thumb-vertical"
      data-bs-slide-to="4"
      class="ratio ratio-4x3"
      style="
        background-image: url(/static/photos/beautiful-blonde-woman-on-a-wooden-pier-by-the-lake.jpg);
      "
    ></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img
        class="d-block w-100"
        alt=""
        src="/static/photos/finances-us-dollars-and-bitcoins-currency-money.jpg"
      />
    </div>
    <div class="carousel-item">
      <img
        class="d-block w-100"
        alt=""
        src="/static/photos/businesswoman-working-at-her-laptop.jpg"
      />
    </div>
    <div class="carousel-item">
      <img
        class="d-block w-100"
        alt=""
        src="/static/photos/color-palette-guide-sample-colors-catalog-.jpg"
      />
    </div>
    <div class="carousel-item">
      <img
        class="d-block w-100"
        alt=""
        src="/static/photos/blue-sofa-with-pillows-in-a-designer-living-room-interior.jpg"
      />
    </div>
    <div class="carousel-item">
      <img
        class="d-block w-100"
        alt=""
        src="/static/photos/beautiful-blonde-woman-on-a-wooden-pier-by-the-lake.jpg"
      />
    </div>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Carousel with captions

Add captions to your slides easily with the `.carousel-caption` element within any `.carousel-item`. To make the text more readable on the image you can add `carousel-caption-background` which will add a black overlay over the image.
Below the `md` responsive breakpoint, the captions on the following example will be hidden as they have the `d-none` class applied to them.

{% capture html -%}
<div id="carousel-captions" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img
        class="d-block w-100"
        alt=""
        src="/static/photos/workplace-with-laptop-on-table-at-home-4.jpg"
      />
      <div class="carousel-caption-background d-none d-md-block"></div>
      <div class="carousel-caption d-none d-md-block">
        <h3>Slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img
        class="d-block w-100"
        alt=""
        src="/static/photos/people-watching-a-presentation-in-a-room.jpg"
      />
      <div class="carousel-caption-background d-none d-md-block"></div>
      <div class="carousel-caption d-none d-md-block">
        <h3>Slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img
        class="d-block w-100"
        alt=""
        src="/static/photos/people-by-a-banquet-table-full-with-food.jpg"
      />
      <div class="carousel-caption-background d-none d-md-block"></div>
      <div class="carousel-caption d-none d-md-block">
        <h3>Slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img
        class="d-block w-100"
        alt=""
        src="/static/photos/books-and-purple-flowers-on-a-wooden-stool-by-the-bed.jpg"
      />
      <div class="carousel-caption-background d-none d-md-block"></div>
      <div class="carousel-caption d-none d-md-block">
        <h3>Slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" alt="" src="/static/photos/cup-of-coffee-and-an-open-book.jpg" />
      <div class="carousel-caption-background d-none d-md-block"></div>
      <div class="carousel-caption d-none d-md-block">
        <h3>Slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </div>
    </div>
  </div>
  <a
    class="carousel-control-prev"
    data-bs-target="#carousel-captions"
    role="button"
    data-bs-slide="prev"
  >
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </a>
  <a
    class="carousel-control-next"
    data-bs-target="#carousel-captions"
    role="button"
    data-bs-slide="next"
  >
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </a>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}
