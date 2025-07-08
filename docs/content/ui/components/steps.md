---
title: Steps
summary: Steps are used to guide users through complex processes, making them easier and more intuitive. Breaking a multi-step process into smaller parts and tracking progress along the way helps users complete it successfully.
new: true
description: Simplify complex processes with steps.
---

## Default markup

Steps provide a clear visual representation of a user’s progress through a multi-step process. By showing what has been completed and what remains, steps enhance usability and encourage task completion.

To create a default progress tracker, use the `.steps` class and define each step as a `.step-item`. The active step clearly indicates the current position in the process. 

```html
<div class="steps">
  <a href="#" class="step-item"> Step 1 </a>
  <a href="#" class="step-item"> Step 2 </a>
  <a href="#" class="step-item active"> Step 3 </a>
</div>
```

The example below demonstrates a simple progress tracker with four steps, where the third step is active.

{% capture html -%}
<div class="steps">
  <a href="#" class="step-item"> Step 1 </a>
  <a href="#" class="step-item"> Step 2 </a>
  <a href="#" class="step-item active"> Step 3 </a>
  <span href="#" class="step-item"> Step 4 </span>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Tooltips

Add tooltips if you want to provide users with additional information about the steps they are expected to complete. Tooltips are displayed when a user hovers over a given step and help clarify what might not be clear from the interface.

To add a tooltip, use the `data-bs-toggle="tooltip"` attribute and specify the tooltip content with the `title` attribute.

```html
<a
  href="#"
  class="step-item"
  data-bs-toggle="tooltip"
  data-bs-placement="top"
  title="Step 1 description"
>
  Step 1
</a>
```

The example below demonstrates a progress tracker with tooltips for each step.

{% capture html -%}
<div class="steps">
  <a
    href="#"
    class="step-item"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Step 1 description"
  >
    Step 1
  </a>
  <a
    href="#"
    class="step-item"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Step 2 description"
  >
    Step 2
  </a>
  <a
    href="#"
    class="step-item active"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Step 3 description"
  >
    Step 3
  </a>
  <span
    href="#"
    class="step-item"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Step 4 description"
  >
    Step 4
  </span>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Color

You can customize the default progress indicator by changing the color to one that better suits your design. See the [full list of available colors](/ui/base/colors) for more details.

```html
<div class="steps steps-green">...</div>
```

The example below demonstrates a progress tracker with two different color schemes.

{% capture html -%}
<div class="steps steps-green">
  <a href="#" class="step-item"> Step 1 </a>
  <a href="#" class="step-item"> Step 2 </a>
  <a href="#" class="step-item active"> Step 3 </a>
  <span href="#" class="step-item"> Step 4 </span>
</div>
<div class="steps steps-red">
  <a href="#" class="step-item"> Step 1 </a>
  <a href="#" class="step-item"> Step 2 </a>
  <a href="#" class="step-item active"> Step 3 </a>
  <span href="#" class="step-item"> Step 4 </span>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Steps without title

For designs with limited space, use progress indicators without titles and add tooltips to provide the necessary details.

{% capture html -%}
<div class="steps">
  <a
    href="#"
    class="step-item"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Step 1 description"
  ></a>
  <a
    href="#"
    class="step-item"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Step 2 description"
  ></a>
  <a
    href="#"
    class="step-item active"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Step 3 description"
  ></a>
  <span
    href="#"
    class="step-item"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Step 4 description"
  ></span>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Steps with numbers

Use the `steps-counter` class to create a progress tracker with numbers instead of titles and change the color to customize it. 

```html
<div class="steps steps-counter">...</div>
```

The example below demonstrates a progress tracker with numbers and a different color scheme.

{% capture html -%}
<div class="steps steps-counter">
  <a href="#" class="step-item"></a>
  <a href="#" class="step-item active"></a>
  <span href="#" class="step-item"></span>
  <span href="#" class="step-item"></span>
  <span href="#" class="step-item"></span>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}
