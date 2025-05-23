---
title: Dropdowns
summary: Use dropdowns to display lists of options or include more items in a menu without overwhelming users with too many buttons and long lists. Dropdowns facilitate users' interaction with your website or software and make your design look clear.
bootstrapLink: components/dropdowns
description: Organize options with dropdown menus.
---

## Default dropdown

With small markup changes, you can turn any `.btn` into a dropdown toggle and use it to display more options for users to choose from. Start with the default dropdown and then use additional classes to make your dropdown more user-friendly.

{% capture html -%}
<div class="dropdown">
  <a href="#" class="btn dropdown-toggle" data-bs-toggle="dropdown">Open dropdown</a>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Third action</a>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html height="220px" %}

## Dropdown divider

Use dropdown dividers to separate groups of dropdown items for greater clarity.

{% capture html -%}
<div class="dropdown">
  <a href="#" class="btn dropdown-toggle" data-bs-toggle="dropdown">Open dropdown</a>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#"> Action </a>
    <a class="dropdown-item" href="#"> Another action </a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">Separated link</a>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html height="240px" %}

## Active state

Make a dropdown item look active, so that it highlights when a user hovers over a given option.

{% capture html -%}
<div class="dropdown">
  <a href="#" class="btn dropdown-toggle" data-bs-toggle="dropdown">Open dropdown</a>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#"> Action </a>
    <a class="dropdown-item" href="#"> Another action </a>
    <a class="dropdown-item active" href="#">Active action</a>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html height="220px" %}

## Disabled state

Make a dropdown item look disabled to display options which are currently not available but can activate once certain conditions are met.

{% capture html -%}
<div class="dropdown">
  <a href="#" class="btn dropdown-toggle" data-bs-toggle="dropdown">Open dropdown</a>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#"> Action </a>
    <a class="dropdown-item" href="#"> Another action </a>
    <a class="dropdown-item disabled" href="#">Disabled action</a>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html height="220px" %}

## Dropdown header

Add a dropdown header to group dropdown items into sections and name them accordingly.

{% capture html -%}
<div class="dropdown">
  <a href="#" class="btn dropdown-toggle" data-bs-toggle="dropdown">Open dropdown</a>
  <div class="dropdown-menu">
    <span class="dropdown-header">Dropdown header</span>
    <a class="dropdown-item" href="#"> Action </a>
    <a class="dropdown-item" href="#"> Another action </a>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html height="210px" %}

## Dropdown with icons

Use icons in your dropdowns to add more visual content and make the options easy to identify for users.

{% capture html -%}
<div class="dropdown">
  <a href="#" class="btn dropdown-toggle" data-bs-toggle="dropdown">Open dropdown</a>
  <div class="dropdown-menu">
    <span class="dropdown-header">Dropdown header</span>
    <a class="dropdown-item" href="#">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon dropdown-item-icon icon-tabler icon-tabler-settings"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path
          d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"
        ></path>
        <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
      </svg>
      Action
    </a>
    <a class="dropdown-item" href="#">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon dropdown-item-icon icon-tabler icon-tabler-pencil"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
        <path d="M13.5 6.5l4 4"></path>
      </svg>
      Another action
    </a>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html height="210px" %}

## Dropdown with arrow

Add an arrow that points at the dropdown button.

{% capture html -%}
<div class="dropdown">
  <a href="#" class="btn dropdown-toggle" data-bs-toggle="dropdown">Open dropdown</a>
  <div class="dropdown-menu dropdown-menu-arrow">
    <a class="dropdown-item" href="#"> Action </a>
    <a class="dropdown-item" href="#"> Another action </a>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html height="190px" %}

## Dropdown with badge

Add a badge to your dropdown items to show additional information related to an item or distinguish it from other elements.

{% capture html -%}
<div class="dropdown">
  <a href="#" class="btn dropdown-toggle" data-bs-toggle="dropdown">Open dropdown</a>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">
      Action
      <span class="badge bg-primary ms-auto">12</span>
    </a>
    <a class="dropdown-item" href="#">
      Another action
      <span class="badge bg-green ms-auto"></span>
    </a>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html height="190px" %}

## Dropdown with checkboxes

Use dropdowns with checkboxes to allow users to select options from a predefined list. Dropdowns with checkboxes are particularly useful for filtering.

{% capture html -%}
<div class="dropdown">
  <a href="#" class="btn dropdown-toggle" data-bs-toggle="dropdown">Open dropdown</a>
  <div class="dropdown-menu">
    <label class="dropdown-item">
      <input class="form-check-input m-0 me-2" type="radio" /> Option 1
    </label>
    <label class="dropdown-item">
      <input class="form-check-input m-0 me-2" type="radio" /> Option 2
    </label>
    <label class="dropdown-item">
      <input class="form-check-input m-0 me-2" type="radio" /> Option 3
    </label>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html height="220px" %}

## Dark dropdown

Make your dropdown suit the dark mode of your website or software.

{% capture html -%}
<div class="dropdown">
  <a href="#" class="btn dropdown-toggle" data-bs-toggle="dropdown">Open dropdown</a>
  <div class="dropdown-menu dropdown-menu-arrow bg-dark text-white">
    <span class="dropdown-header">Dropdown header</span>
    <a class="dropdown-item" href="#">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon dropdown-item-icon"
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
          d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"
        />
        <circle cx="12" cy="12" r="3" />
      </svg>
      Action
    </a>
    <a class="dropdown-item" href="#">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon dropdown-item-icon"
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
        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
        <path d="M16 5l3 3" />
      </svg>
      Another action
    </a>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html height="220px" %}

## Dropdown with card content

Use a dropdown with card content to make it easy for users to get more information on a given subject and avoid ovewhelming them with too much content at once.

{% capture html -%}
<div class="dropdown">
  <a href="#" class="btn dropdown-toggle" data-bs-toggle="dropdown">Open dropdown</a>
  <div class="dropdown-menu dropdown-menu-card" style="max-width: 16rem">
    <div class="card d-flex flex-column">
      <a href="#">
        <img
          class="card-img-top"
          src="/static/photos/friends-at-a-restaurant-drinking-wine.jpg"
          alt="How do you know she is a witch?"
        />
      </a>
      <div class="card-body d-flex flex-column">
        <h3 class="card-title">
          <a href="#">How do you know she is a witch?</a>
        </h3>
        <div class="text-secondary">
          Are you suggesting that coconuts migrate? No, no, no! Yes, yes. A bit.
        </div>
        <div class="d-flex align-items-center pt-4 mt-auto">
          <span class="avatar" style="background-image: url(/static/avatars/013m.jpg)"></span>
          <div class="ms-3">
            <a href="#" class="text-body">Maryjo Lebarree</a>
            <div class="text-secondary">3 days ago</div>
          </div>
          <div class="ms-auto">
            <a href="#" class="icon d-none d-md-inline-block ms-3 text-secondary">
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
                  d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html height="520px" %}
