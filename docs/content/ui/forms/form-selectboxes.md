---
title: Form selectgroup
summary: Use selectgroup to make your form more intuitive by providing users with a set of options to choose from. You can add simple selectgroup with a label, use icons only or icons with labels. Alternatively, you can use pill selectgroup if they go well with your design.
description: Improve form UX with select groups.
---

## Simple selectgroup

To create a simple selectgroup, use the `.form-selectgroup` class. You should add a label to the selectgroup by using the `.form-selectgroup-item` class for the input element and the `.form-selectgroup-label` class for the label.

```html
<label class="form-selectgroup-item">
  <input type="checkbox" name="name" value="..." class="form-selectgroup-input" checked />
  <span class="form-selectgroup-label">...</span>
</label>
```

Look at the example below to see how the simple selectgroup works:

{% capture html -%}
<div>
  <div class="form-selectgroup">
    <label class="form-selectgroup-item">
      <input type="radio" name="name" value="HTML" class="form-selectgroup-input" checked />
      <span class="form-selectgroup-label">HTML</span>
    </label>
    <label class="form-selectgroup-item">
      <input type="radio" name="name" value="CSS" class="form-selectgroup-input" />
      <span class="form-selectgroup-label">CSS</span>
    </label>
    <label class="form-selectgroup-item">
      <input type="radio" name="name" value="PHP" class="form-selectgroup-input" />
      <span class="form-selectgroup-label">PHP</span>
    </label>
    <label class="form-selectgroup-item">
      <input type="radio" name="name" value="JavaScript" class="form-selectgroup-input" />
      <span class="form-selectgroup-label">JavaScript</span>
    </label>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Multiple choices

You can also create a selectgroup with multiple choices. To do this, change the `type` attribute of the input element to `checkbox`.

```html
<label class="form-selectgroup-item">
  <input type="checkbox" name="name" value="..." class="form-selectgroup-input" checked />
  <span class="form-selectgroup-label">...</span>
</label>
```

Look at the example below to see how the multiple choices selectgroup works:

{% capture html -%}
<div>
  <div class="form-selectgroup">
    <label class="form-selectgroup-item">
      <input type="checkbox" name="name" value="HTML" class="form-selectgroup-input" checked />
      <span class="form-selectgroup-label">HTML</span>
    </label>
    <label class="form-selectgroup-item">
      <input type="checkbox" name="name" value="CSS" class="form-selectgroup-input" />
      <span class="form-selectgroup-label">CSS</span>
    </label>
    <label class="form-selectgroup-item">
      <input type="checkbox" name="name" value="PHP" class="form-selectgroup-input" />
      <span class="form-selectgroup-label">PHP</span>
    </label>
    <label class="form-selectgroup-item">
      <input type="checkbox" name="name" value="JavaScript" class="form-selectgroup-input" />
      <span class="form-selectgroup-label">JavaScript</span>
    </label>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Icon input

To create an icon input, use the `.form-selectgroup` class. You should add a label to the selectgroup by using the `.form-selectgroup-item` class for the input element and the `.form-selectgroup-label` class for the label. You can use the `.icon` class to style the icon.

```html
<label class="form-selectgroup-item">
  <input type="checkbox" name="name" value="sun" class="form-selectgroup-input" checked />
  <span class="form-selectgroup-label">
    <svg class="icon" width="24" height="24">...</svg>
  </span>
</label>
```

We recommend you use Tabler Icons for the best experience. You can find {{ iconsCount }}  free icons in the [Tabler Icons](https://tabler-icons.io/) library. Just copy the SVG code and paste it into your project.

{% capture html -%}
<div class="mb-3">
  <label class="form-label">Icon input</label>
  <div class="form-selectgroup">
    <label class="form-selectgroup-item">
      <input type="checkbox" name="name" value="sun" class="form-selectgroup-input" checked />
      <span class="form-selectgroup-label">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx="12" cy="12" r="4" />
          <path
            d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"
          />
        </svg>
      </span>
    </label>
    <label class="form-selectgroup-item">
      <input type="checkbox" name="name" value="moon" class="form-selectgroup-input" />
      <span class="form-selectgroup-label">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"
          />
        </svg>
      </span>
    </label>
    <label class="form-selectgroup-item">
      <input type="checkbox" name="name" value="cloud-rain" class="form-selectgroup-input" />
      <span class="form-selectgroup-label">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7" />
          <path d="M11 13v2m0 3v2m4 -5v2m0 3v2" />
        </svg>
      </span>
    </label>
    <label class="form-selectgroup-item">
      <input type="checkbox" name="name" value="cloud" class="form-selectgroup-input" />
      <span class="form-selectgroup-label">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M6.657 18c-2.572 0 -4.657 -2.007 -4.657 -4.483c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 .996c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.913 0 3.464 1.56 3.464 3.486c0 1.927 -1.551 3.487 -3.465 3.487h-11.878"
          />
        </svg>
      </span>
    </label>
    <label class="form-selectgroup-item">
      <input type="checkbox" name="name" value="Other" class="form-selectgroup-input" />
      <span class="form-selectgroup-label">Other</span>
    </label>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

You can also add text to the element. Look at the example below to see how it works:

{% capture html -%}
<div class="mb-3">
  <label class="form-label">Selectgroup with icons and text</label>
  <div class="form-selectgroup">
    <label class="form-selectgroup-item">
      <input type="radio" name="icons" value="home" class="form-selectgroup-input" checked />
      <span class="form-selectgroup-label">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon me-1"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <polyline points="5 12 3 12 12 3 21 12 19 12" />
          <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
          <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
        </svg>
        Home
      </span>
    </label>
    <label class="form-selectgroup-item">
      <input type="radio" name="icons" value="user" class="form-selectgroup-input" />
      <span class="form-selectgroup-label">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon me-1"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx="12" cy="7" r="4" />
          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        </svg>
        User
      </span>
    </label>
    <label class="form-selectgroup-item">
      <input type="radio" name="icons" value="circle" class="form-selectgroup-input" />
      <span class="form-selectgroup-label">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon me-1"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx="12" cy="12" r="9" />
        </svg>
        Circle
      </span>
    </label>
    <label class="form-selectgroup-item">
      <input type="radio" name="icons" value="square" class="form-selectgroup-input" />
      <span class="form-selectgroup-label">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon me-1"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <rect x="4" y="4" width="16" height="16" rx="2" />
        </svg>
        Square
      </span>
    </label>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Pill selectgroup

If you want to use pill selectgroup, use the `.form-selectgroup-pills` class. All the other classes are the same as in the simple selectgroup.

```html
<div class="form-selectgroup form-selectgroup-pills">...</div>
```

Look at the example below to see how the pill selectgroup works:

{% capture html -%}
<div class="mb-3">
  <label class="form-label">Different style</label>
  <div class="form-selectgroup form-selectgroup-pills">
    <label class="form-selectgroup-item">
      <input type="checkbox" name="name" value="HTML" class="form-selectgroup-input" checked />
      <span class="form-selectgroup-label">HTML</span>
    </label>
    <label class="form-selectgroup-item">
      <input type="checkbox" name="name" value="CSS" class="form-selectgroup-input" />
      <span class="form-selectgroup-label">CSS</span>
    </label>
    <label class="form-selectgroup-item">
      <input type="checkbox" name="name" value="PHP" class="form-selectgroup-input" />
      <span class="form-selectgroup-label">PHP</span>
    </label>
    <label class="form-selectgroup-item">
      <input type="checkbox" name="name" value="JavaScript" class="form-selectgroup-input" />
      <span class="form-selectgroup-label">JavaScript</span>
    </label>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Advanced selectboxes

Use more advanced selectboxes to display the range of available options. You can choose selectboxes with radio buttons if you want users to select only one option, or with checkboxes if they are allowed to choose multiple options.

{% capture html -%}
<div class="mb-3">
  <label class="form-label">Payment method</label>
  <div class="form-selectgroup form-selectgroup-boxes d-flex flex-column">
    <label class="form-selectgroup-item flex-fill">
      <input type="radio" name="form-payment" value="visa" class="form-selectgroup-input" />
      <div class="form-selectgroup-label d-flex align-items-center p-3">
        <div class="me-3">
          <span class="form-selectgroup-check"></span>
        </div>
        <div>
          <span class="payment payment-provider-visa payment-xs me-2"></span>
          ending in <strong>7998</strong>
        </div>
      </div>
    </label>
    <label class="form-selectgroup-item flex-fill">
      <input
        type="radio"
        name="form-payment"
        value="mastercard"
        class="form-selectgroup-input"
        checked
      />
      <div class="form-selectgroup-label d-flex align-items-center p-3">
        <div class="me-3">
          <span class="form-selectgroup-check"></span>
        </div>
        <div>
          <span class="payment payment-provider-mastercard payment-xs me-2"></span>
          ending in <strong>2807</strong>
        </div>
      </div>
    </label>
    <label class="form-selectgroup-item flex-fill">
      <input type="radio" name="form-payment" value="paypal" class="form-selectgroup-input" />
      <div class="form-selectgroup-label d-flex align-items-center p-3">
        <div class="me-3">
          <span class="form-selectgroup-check"></span>
        </div>
        <div>
          <span class="payment payment-provider-paypal payment-xs me-2"></span>
        </div>
      </div>
    </label>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html column %}
