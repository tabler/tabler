---
title: Switch icon
summary: The Switch Icon component is used to create a transition between two icons. You can use any icon, both line and filled version.
banner: icons
description: Transition between two icons smoothly.
---

## Default markup

The icon transition is triggered by adding an `.active` class to the `switch-icon` component.

{% capture html -%}
<button class="switch-icon" data-bs-toggle="switch-icon">
  <span class="switch-icon-a text-secondary">
    {% include "ui/icon.html" icon="heart" %}
  </span>
  <span class="switch-icon-b text-red">
    {% include "ui/icon.html" icon="heart" type="filled" %}
  </span>
</button>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Switch animations

You can also add a fancy animation to add variety to your button. See demo below:

{% capture html -%}
<button class="switch-icon" data-bs-toggle="switch-icon">
  <span class="switch-icon-a text-secondary">
    {% include "ui/icon.html" icon="circle" %}
  </span>
  <span class="switch-icon-b text-primary">
    {% include "ui/icon.html" icon="circle" type="filled" %}
  </span>
</button>
<button class="switch-icon switch-icon-fade" data-bs-toggle="switch-icon">
  <span class="switch-icon-a text-secondary">
    {% include "ui/icon.html" icon="heart" %}
  </span>
  <span class="switch-icon-b text-red">
    {% include "ui/icon.html" icon="heart" type="filled" %}
  </span>
</button>
<button class="switch-icon switch-icon-scale" data-bs-toggle="switch-icon">
  <span class="switch-icon-a text-secondary">
    {% include "ui/icon.html" icon="star" %}
  </span>
  <span class="switch-icon-b text-yellow">
    {% include "ui/icon.html" icon="star" type="filled" %}
  </span>
</button>
<button class="switch-icon switch-icon-flip" data-bs-toggle="switch-icon">
  <span class="switch-icon-a text-secondary">
    {% include "ui/icon.html" icon="thumb-up" %}
  </span>
  <span class="switch-icon-b text-facebook">
    {% include "ui/icon.html" icon="thumb-up" type="filled" %}
  </span>
</button>
<button class="switch-icon switch-icon-slide-up" data-bs-toggle="switch-icon">
  <span class="switch-icon-a text-secondary">
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
        d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z"
      />
    </svg>
  </span>
  <span class="switch-icon-b text-twitter">
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
        d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z"
      />
    </svg>
  </span>
</button>
<button class="switch-icon switch-icon-slide-left" data-bs-toggle="switch-icon">
  <span class="switch-icon-a text-secondary">
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
      <path d="M5 12l5 5l10 -10" />
    </svg>
  </span>
  <span class="switch-icon-b text-red">
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  </span>
</button>
<button class="switch-icon switch-icon-slide-down" data-bs-toggle="switch-icon">
  <span class="switch-icon-a text-secondary">
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
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="18" y1="13" x2="12" y2="19" />
      <line x1="6" y1="13" x2="12" y2="19" />
    </svg>
  </span>
  <span class="switch-icon-b text-secondary">
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
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="18" y1="11" x2="12" y2="5" />
      <line x1="6" y1="11" x2="12" y2="5" />
    </svg>
  </span>
</button>
<button class="switch-icon switch-icon-slide-end" data-bs-toggle="switch-icon">
  <span class="switch-icon-a text-secondary">
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
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" />
    </svg>
  </span>
  <span class="switch-icon-b text-secondary">
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
      <circle cx="18" cy="17" r="2" />
      <circle cx="6" cy="17" r="2" />
      <path d="M8 17h5a6 6 0 0 1 5 -5v-5a2 2 0 0 0 -2 -2h-1" />
    </svg>
  </span>
</button>
{%- endcapture %}
{% include "docs/example.html" html=html %}
