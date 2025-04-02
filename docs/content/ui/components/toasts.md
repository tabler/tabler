---
title: Toasts
summary: Toasts are lightweight alert boxes which display for a few seconds after a user has taken an action, to inform them of the state or outcome. They can be used when a user clicks a button or submits a form and their aim is to provide feedback, rather than encourage to take action.
bootstrapLink: components/toasts/
description: Display lightweight alert notifications.
---

## Default markup

Use the default toast message to inform users of the outcome of their action and provide additional information. It contains an `x` close button to make it possible for users to close the toast if they wish.

{% capture html -%}
<div
  class="toast show"
  role="alert"
  aria-live="assertive"
  aria-atomic="true"
  data-bs-autohide="false"
  data-bs-toggle="toast"
>
  <div class="toast-header">
    <span
      class="avatar avatar-xs me-2"
      style="background-image: url(/static/avatars/018f.jpg)"
    ></span>
    <strong class="me-auto">Mallory Hulme</strong>
    <small>11 mins ago</small>
    <button
      type="button"
      class="ms-2 btn-close"
      data-bs-dismiss="toast"
      aria-label="Close"
    ></button>
  </div>
  <div class="toast-body">Hello, world! This is a toast message.</div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Translucent

Toasts blend over the elements they appear over. If a browser supports the `backdrop-filter` CSS property, the elements under a toast will be blurred.

{% capture html -%}
<div
  class="toast show"
  role="alert"
  aria-live="assertive"
  aria-atomic="true"
  data-bs-autohide="false"
  data-bs-toggle="toast"
>
  <div class="toast-header">
    <span
      class="avatar avatar-xs me-2"
      style="background-image: url(/static/avatars/029m.jpg)"
    ></span>
    <strong class="me-auto">Mallory Hulme</strong>
    <small>11 mins ago</small>
    <button
      type="button"
      class="ms-2 btn-close"
      data-bs-dismiss="toast"
      aria-label="Close"
    ></button>
  </div>
  <div class="toast-body">Hello, world! This is a toast message.</div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Stacking toasts

Stack multiple toasts together by putting them within one `.toast-container`.

{% capture html -%}
<div class="toast-container">
  <div
    class="toast show"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    data-bs-autohide="false"
    data-bs-toggle="toast"
  >
    <div class="toast-header">
      <span
        class="avatar avatar-xs me-2"
        style="background-image: url(/static/avatars/008m.jpg)"
      ></span>
      <strong class="me-auto">Dunn Slane</strong>
      <small>11 mins ago</small>
      <button
        type="button"
        class="ms-2 btn-close"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
    <div class="toast-body">Hello, world! This is a toast message.</div>
  </div>
  <div
    class="toast show"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    data-bs-autohide="false"
    data-bs-toggle="toast"
  >
    <div class="toast-header">
      <span
        class="avatar avatar-xs me-2"
        style="background-image: url(/static/avatars/020m.jpg)"
      ></span>
      <strong class="me-auto">Mallory Hulme</strong>
      <small>7 mins ago</small>
      <button
        type="button"
        class="ms-2 btn-close"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
    <div class="toast-body">This is another toast message.</div>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html height="25rem" centered bg="surface-secondary" %}

