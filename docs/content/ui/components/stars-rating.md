---
title: Stars Rating
summary: Create interactive star rating components with customizable icons, colors, and sizes. Perfect for product reviews, user feedback, and rating systems.
description: Interactive star rating component with customizable options.
---

## Overview

The Stars Rating component provides an interactive way to display and collect user ratings. Built on top of the `star-rating.js` library, it offers extensive customization options including different icons, colors, sizes, and interactive functionality.

## Basic Usage

Create a basic star rating with default settings:

{% capture html -%}
{% include "ui/rating.html" value=4 %}
{%- endcapture -%}
{%- include "docs/example.html" html=html centered %}

## Different Icons

Use various icons instead of stars for different rating contexts:

{% capture html -%}
<div class="space-y">
  <!-- Default star icon -->
  {% include "ui/rating.html" value=4 %}
  
  <!-- Heart icon -->
  {% include "ui/rating.html" value=4 icon="heart" %}
  
  <!-- Ghost icon -->
  {% include "ui/rating.html" value=4 icon="ghost" %}
</div>

{%- endcapture -%}
{%- include "docs/example.html" html=html %}

## Color Variations

Customize the color of your rating icons to match your design:

{% capture html -%}
<div class="space-y">
  <div>
    <label class="form-label">Default (Yellow)</label>
    <select id="rating-default">
      <option value="">Select a rating</option>
      <option value="5">Excellent</option>
      <option value="4">Very Good</option>
      <option value="3">Average</option>
      <option value="2">Poor</option>
      <option value="1">Terrible</option>
    </select>
  </div>
  
  <div>
    <label class="form-label">Primary Color</label>
    <select id="rating-primary">
      <option value="">Select a rating</option>
      <option value="5">Excellent</option>
      <option value="4">Very Good</option>
      <option value="3">Average</option>
      <option value="2">Poor</option>
      <option value="1">Terrible</option>
    </select>
  </div>
  
  <div>
    <label class="form-label">Red Color</label>
    <select id="rating-red">
      <option value="">Select a rating</option>
      <option value="5">Excellent</option>
      <option value="4">Very Good</option>
      <option value="3">Average</option>
      <option value="2">Poor</option>
      <option value="1">Terrible</option>
    </select>
  </div>
  
  <div>
    <label class="form-label">Green Color</label>
    <select id="rating-green">
      <option value="">Select a rating</option>
      <option value="5">Excellent</option>
      <option value="4">Very Good</option>
      <option value="3">Average</option>
      <option value="2">Poor</option>
      <option value="1">Terrible</option>
    </select>
  </div>
</div>

<script>
document.addEventListener("DOMContentLoaded", function () {
  // Default (yellow)
  new StarRating('#rating-default', {
    tooltip: false,
    clearable: false,
    stars: function (el, item, index) {
      el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.925l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor"/></svg>';
    }
  });
  
  // Primary color
  new StarRating('#rating-primary', {
    tooltip: false,
    clearable: false,
    stars: function (el, item, index) {
      el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star-filled text-primary" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.925l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor"/></svg>';
    }
  });
  
  // Red color
  new StarRating('#rating-red', {
    tooltip: false,
    clearable: false,
    stars: function (el, item, index) {
      el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star-filled text-red" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.925l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor"/></svg>';
    }
  });
  
  // Green color
  new StarRating('#rating-green', {
    tooltip: false,
    clearable: false,
    stars: function (el, item, index) {
      el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star-filled text-green" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.925l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor"/></svg>';
    }
  });
});
</script>
{%- endcapture -%}
{%- include "docs/example.html" html=html %}

## Size Variations

Adjust the size of your rating icons to fit different contexts:

{% capture html -%}
<div class="space-y">
  <div>
    <label class="form-label">Small Size</label>
    <select id="rating-small">
      <option value="">Select a rating</option>
      <option value="5">Excellent</option>
      <option value="4">Very Good</option>
      <option value="3">Average</option>
      <option value="2">Poor</option>
      <option value="1">Terrible</option>
    </select>
  </div>
  
  <div>
    <label class="form-label">Default Size</label>
    <select id="rating-default-size">
      <option value="">Select a rating</option>
      <option value="5">Excellent</option>
      <option value="4">Very Good</option>
      <option value="3">Average</option>
      <option value="2">Poor</option>
      <option value="1">Terrible</option>
    </select>
  </div>
  
  <div>
    <label class="form-label">Medium Size</label>
    <select id="rating-medium">
      <option value="">Select a rating</option>
      <option value="5">Excellent</option>
      <option value="4">Very Good</option>
      <option value="3">Average</option>
      <option value="2">Poor</option>
      <option value="1">Terrible</option>
    </select>
  </div>
  
  <div>
    <label class="form-label">Large Size</label>
    <select id="rating-large">
      <option value="">Select a rating</option>
      <option value="5">Excellent</option>
      <option value="4">Very Good</option>
      <option value="3">Average</option>
      <option value="2">Poor</option>
      <option value="1">Terrible</option>
    </select>
  </div>
</div>

<script>
document.addEventListener("DOMContentLoaded", function () {
  // Small size
  new StarRating('#rating-small', {
    tooltip: false,
    clearable: false,
    stars: function (el, item, index) {
      el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star-filled" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.925l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor"/></svg>';
    }
  });
  
  // Default size
  new StarRating('#rating-default-size', {
    tooltip: false,
    clearable: false,
    stars: function (el, item, index) {
      el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.925l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor"/></svg>';
    }
  });
  
  // Medium size
  new StarRating('#rating-medium', {
    tooltip: false,
    clearable: false,
    stars: function (el, item, index) {
      el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star-filled" width="32" height="32" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.925l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor"/></svg>';
    }
  });
  
  // Large size
  new StarRating('#rating-large', {
    tooltip: false,
    clearable: false,
    stars: function (el, item, index) {
      el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star-filled" width="48" height="48" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.925l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor"/></svg>';
    }
  });
});
</script>
{%- endcapture -%}
{%- include "docs/example.html" html=html %}

## Read-only Display

Display ratings without interaction for showing existing ratings:

{% capture html -%}
<div class="space-y">
  <div class="d-flex align-items-center">
    <div class="stars me-2">
      <span class="star">★</span>
      <span class="star">★</span>
      <span class="star">★</span>
      <span class="star">★</span>
      <span class="star inactive">★</span>
    </div>
    <span class="text-muted">4.0 out of 5</span>
  </div>
  
  <div class="d-flex align-items-center">
    <div class="stars me-2">
      <span class="star">★</span>
      <span class="star">★</span>
      <span class="star">★</span>
      <span class="star inactive">★</span>
      <span class="star inactive">★</span>
    </div>
    <span class="text-muted">3.0 out of 5</span>
  </div>
  
  <div class="d-flex align-items-center">
    <div class="stars me-2">
      <span class="star">★</span>
      <span class="star">★</span>
      <span class="star inactive">★</span>
      <span class="star inactive">★</span>
      <span class="star inactive">★</span>
    </div>
    <span class="text-muted">2.0 out of 5</span>
  </div>
</div>
{%- endcapture -%}
{%- include "docs/example.html" html=html centered %}

## Advanced Configuration

### JavaScript Options

The Stars Rating component uses the `star-rating.js` library with the following configuration options:

```javascript
const rating = new StarRating('#rating-selector', {
  // Enable/disable tooltips
  tooltip: false,
  
  // Allow clearing the rating
  clearable: false,
  
  // Custom star rendering function
  stars: function (el, item, index) {
    el.innerHTML = '<svg>...</svg>';
  },
  
  // Custom CSS classes
  classNames: {
    // Add custom classes here
  }
});
```

### CSS Custom Properties

Customize the appearance using CSS custom properties:

```css
:root {
  --gl-star-size: auto;
  --gl-star-color: var(--tblr-yellow);
  --gl-star-color-inactive: var(--tblr-border-color);
}
```

### Event Handling

Listen for rating changes:

```javascript
const rating = new StarRating('#rating-selector', {
  // ... options
});

rating.on('change', function(e) {
  console.log('Rating changed to:', e.detail.rating);
});
```

## Accessibility

The Stars Rating component includes proper accessibility features:

- **ARIA labels** for screen readers
- **Keyboard navigation** support
- **Focus indicators** for better usability
- **Semantic HTML** structure

## Browser Support

The Stars Rating component is compatible with all modern browsers that support:
- ES6 JavaScript
- CSS Custom Properties
- SVG icons

## Dependencies

The Stars Rating component requires:
- `star-rating.js` library (included in Tabler)
- Tabler CSS framework
- Tabler Icons (for custom icons)

## Examples in Context

### Product Review Form

{% capture html -%}
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Write a Review</h3>
  </div>
  <div class="card-body">
    <div class="mb-3">
      <label class="form-label">Overall Rating</label>
      <select id="product-rating">
        <option value="">Select a rating</option>
        <option value="5">Excellent</option>
        <option value="4">Very Good</option>
        <option value="3">Average</option>
        <option value="2">Poor</option>
        <option value="1">Terrible</option>
      </select>
    </div>
    
    <div class="mb-3">
      <label class="form-label">Review Title</label>
      <input type="text" class="form-control" placeholder="Summarize your experience">
    </div>
    
    <div class="mb-3">
      <label class="form-label">Review Details</label>
      <textarea class="form-control" rows="4" placeholder="Share your experience with this product..."></textarea>
    </div>
    
    <button type="submit" class="btn btn-primary">Submit Review</button>
  </div>
</div>

<script>
document.addEventListener("DOMContentLoaded", function () {
  new StarRating('#product-rating', {
    tooltip: false,
    clearable: false,
    stars: function (el, item, index) {
      el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.925l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor"/></svg>';
    }
  });
});
</script>
{%- endcapture -%}
{%- include "docs/example.html" html=html %}

### Hotel Rating Display

{% capture html -%}
<div class="card">
  <div class="card-body">
    <div class="d-flex align-items-center mb-3">
      <h3 class="card-title mb-0">Grand Hotel</h3>
      <div class="stars ms-auto">
        <span class="star">★</span>
        <span class="star">★</span>
        <span class="star">★</span>
        <span class="star">★</span>
        <span class="star inactive">★</span>
      </div>
      <span class="text-muted ms-2">4.0</span>
    </div>
    
    <p class="text-muted mb-3">Luxury hotel in the heart of the city with excellent amenities and service.</p>
    
    <div class="row g-3">
      <div class="col-6">
        <div class="d-flex align-items-center">
          <span class="text-muted me-2">Cleanliness</span>
          <div class="stars">
            <span class="star">★</span>
            <span class="star">★</span>
            <span class="star">★</span>
            <span class="star">★</span>
            <span class="star">★</span>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="d-flex align-items-center">
          <span class="text-muted me-2">Service</span>
          <div class="stars">
            <span class="star">★</span>
            <span class="star">★</span>
            <span class="star">★</span>
            <span class="star">★</span>
            <span class="star inactive">★</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{%- endcapture -%}
{%- include "docs/example.html" html=html %}


