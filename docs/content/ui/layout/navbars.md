---
title: Navbars
summary: A navbar serves as a central navigation tool, offering users quick and easy access to key sections of a website or application, improving usability and enhancing the overall user experience.
description: Create and customize responsive navigation bars with ease.
---

The navbar is a core component of any website or application, serving as the primary navigation tool. It provides users with quick access to key sections, enhancing usability and improving the overall user experience. Positioned typically at the top of the page, the navbar can contain links, buttons, branding elements, and even interactive components like dropdown menus or search bars.

With Tabler's utility classes, creating and customizing a responsive navbar is straightforward. Whether you’re building a simple site or a complex dashboard, Tabler’s navbar utilities offer the flexibility to design navigation that aligns perfectly with your project’s requirements.



## Sample navbar

To create a navbar, use the `.navbar` class. The navbar is a horizontal bar that contains links to different sections of a website. It is typically placed at the top of the page and is used to provide navigation to the rest of the site.

```html
<header class="navbar navbar-expand-md d-print-none">...</header>
```

The navbar can contain links, buttons, and other elements. You can customize the appearance of the navbar by adding classes to the elements inside it.

{% capture html -%}
<header class="navbar navbar-expand-md d-print-none">
  <div class="container-xl">
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbar-menu"
      aria-controls="navbar-menu"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
	{% include "layout/navbar-logo.html" class="me-3" %}
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">
          <span class="nav-link-icon">
            {% include "ui/icon.html" icon="home" %}
          </span>
          <span class="nav-link-title"> Home </span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <span class="nav-link-icon"
            >{% include "ui/icon.html" icon="checkbox" %}
          </span>
          <span class="nav-link-title"> Profile </span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <span class="nav-link-icon"
            >{% include "ui/icon.html" icon="checkbox" %}
          </span>
          <span class="nav-link-title"> Settings </span>
        </a>
      </li>
    </ul>
    <div class="navbar-nav flex-row order-md-last ms-auto">
      <div class="nav-item dropdown">
        <a
          href="#"
          class="nav-link d-flex lh-1 text-reset"
          data-bs-toggle="dropdown"
          aria-label="Open user menu"
        >
          <span
            class="avatar avatar-sm"
            style="background-image: url(/static/avatars/044m.jpg)"
          ></span>
          <div class="d-none d-xl-block ps-2">
            <div>Paweł Kuna</div>
            <div class="mt-1 small text-secondary">UI Designer</div>
          </div>
        </a>
        <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
          <a href="#" class="dropdown-item">Status</a>
          <a href="./profile.html" class="dropdown-item">Profile</a>
          <a href="#" class="dropdown-item">Feedback</a>
          <div class="dropdown-divider"></div>
          <a href="./settings.html" class="dropdown-item">Settings</a>
          <a href="./sign-in.html" class="dropdown-item">Logout</a>
        </div>
      </div>
    </div>
  </div>
</header>
{%- endcapture %}
{% include "docs/example.html" html=html raw class="pb-10" bg="surface-secondary" overflow="visible" %}