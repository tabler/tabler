---
title: Offcanvas
---

Offcanvas is a sidebar component that can be toggled via JavaScript to appear from the left, right, top, or bottom edge of the viewport. Buttons or anchors are used as triggers that are attached to specific elements you toggle, and `data` attributes are used to invoke our JavaScript.

## Basic usage

To create an offcanvas, add the `.offcanvas` class to a container element. You can also add the `.offcanvas-start`, `.offcanvas-end`, `.offcanvas-top`, or `.offcanvas-bottom` class to specify the position of the offcanvas. The `.show` class is used to display the offcanvas.

{% capture html -%}
<div
  class="offcanvas offcanvas-start show"
  tabindex="-1"
  id="offcanvas"
  aria-labelledby="offcanvasLabel"
>
  <div class="offcanvas-body">
    Content for the offcanvas goes here. You can place just about any Tabler component or custom
    elements here.
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html raw %}

## Cookies banner

The offcanvas component is used to display a cookies banner. It is a great way to inform users about the use of cookies on your website and to get their consent.

{% capture html -%}
<div
  class="offcanvas offcanvas-bottom h-auto show"
  tabindex="-1"
  id="offcanvasBottom"
  aria-modal="true"
  role="dialog"
>
  <div class="offcanvas-body">
    <div class="container">
      <div class="row align-items-center">
        <div class="col">
          <strong>Do you like cookies?</strong> 🍪 We use cookies to ensure you get the best
          experience on our website.
          <a href="./terms-of-service.html" target="_blank">Learn more</a>
        </div>
        <div class="col-auto">
          <button type="button" class="btn btn-primary" data-bs-dismiss="offcanvas">
            Essential Cookies Only
          </button>
        </div>
        <div class="col-auto">
          <button type="button" class="btn btn-primary" data-bs-dismiss="offcanvas">
            Allow All Cookies
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html raw %}