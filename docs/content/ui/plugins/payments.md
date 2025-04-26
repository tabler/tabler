---
title: Payments
summary: The Tabler payments plug-in will let you use a set of payment provider icons to facilitate the payment process and make it more user-friendly.
plugin: payments
description: User-friendly payment provider icons.
---

## Installation

This part of Tabler is distributed as a plugin. To enable it you should include `tabler-payments.css` or `tabler-payments.min.css` file in your page.

You can also include the plugin via CDN:

```html
<link rel="stylesheet" href="{{ cdnUrl }}/dist/css/tabler-payments.min.css" />
```

## Payment

To create a payment provider icon, add the `payment` class to a component and specify the payment provider with the `payment-provider-*` class. The full list of payment providers can be found at the end of this page.

{% capture html -%}
<span class="payment payment-provider-shopify"></span>
<span class="payment payment-provider-visa"></span>
<span class="payment payment-provider-paypal"></span>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Payment sizes

Using Bootstrap’s typical naming structure, you can create a standard payment, or scale it up or down to different sizes based on what’s needed.

{% capture html -%}
<span class="payment payment-xl payment-provider-shopify"></span>
<span class="payment payment-lg payment-provider-visa"></span>
<span class="payment payment-md payment-provider-paypal"></span>
<span class="payment payment-sm payment-provider-amazon"></span>
<span class="payment payment-xs payment-provider-blik"></span>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## List of available payment providers

Select an icon from the list of payment providers. Each icon comes in two color variants - light and dark, so you can choose the one that goes well with your design.

{% include "docs/payments.html" %}
