---
title: Progress bars
summary: Progress bars are used to provide feedback on an action status and inform users of the current progress. Although seemingly small interface elements, they are extremely hepful in managing users' expectations and preventing them from abandoning a process they have initiated.
bootstrapLink: components/progress
description: Track and display progress visually.
---

## Default markup

To create a default progress bar, add a `.progress` class to a `<div>` element. Thanks to that, you will be able to notify users how long they have to wait for a process to complete.

{% capture html -%}
<div class="progress">
  <div class="progress-bar" style="width: 38%"></div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Progress size

Using Bootstrap’s typical naming structure, you can create a standard progress bar or scale it up or down to different sizes based on what’s needed.

```html
<div class="progress progress-sm">...</div>
```

Look at the example below to see how it works:

{% capture html -%}
<div class="progress progress-sm">
  <div
    class="progress-bar"
    style="width: 57%"
    role="progressbar"
    aria-valuenow="57"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-label="57% Complete"
  >
    <span class="visually-hidden">57% Complete</span>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Indeterminate progress

You can create a progress bar which shows indeterminate progress by adding `.progress-bar-indeterminate` to the `.progress-bar` element.

{% capture html -%}
<div class="progress progress-sm">
  <div class="progress-bar progress-bar-indeterminate"></div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Native progress element

You can also use the native HTML5 `<progress>` element. It is a great way to create a progress bar without the need for additional HTML elements. This is what it looks like:

{% capture html -%}
<progress class="progress progress-sm" value="15" max="100" />
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Progress color

You can change the color of the progress bar by adding a color class to the `.progress-bar` element. You can use the color classes like `.bg-primary`, `.bg-success`, etc. to change the color of the progress bar.

See the [full list of available colors](/ui/base/colors) for more details.

{% capture html -%}
<div class="progress">
  <div
    class="progress-bar bg-red"
    style="width: 24%"
    role="progressbar"
    aria-valuenow="24"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-label="24% Complete"
  >
    <span class="visually-hidden">24% Complete</span>
  </div>
</div>
<div class="progress">
  <div
    class="progress-bar bg-green"
    style="width: 45%"
    role="progressbar"
    aria-valuenow="45"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-label="45% Complete"
  >
    <span class="visually-hidden">45% Complete</span>
  </div>
</div>
<div class="progress">
  <div
    class="progress-bar bg-purple"
    style="width: 64%"
    role="progressbar"
    aria-valuenow="64"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-label="64% Complete"
  >
    <span class="visually-hidden">64% Complete</span>
  </div>
</div>
<div class="progress">
  <div
    class="progress-bar bg-blue"
    style="width: 38%"
    role="progressbar"
    aria-valuenow="38"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-label="38% Complete"
  >
    <span class="visually-hidden">38% Complete</span>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Multiple progress bars

You can stack multiple progress bars on top of each other to create a visually appealing design. This can be done by adding multiple `.progress` elements inside a `.progress-stacked` container.

```html
<div class="progress-stacked">
  <div class="progress">...</div>
</div>
```

This is how it looks:

{% capture html -%}
<div class="progress-stacked">
  <div class="progress" style="width: 15%">
    <div class="progress-bar"></div>
  </div>
  <div class="progress" style="width: 30%">
    <div class="progress-bar bg-success"></div>
  </div>
  <div class="progress" style="width: 20%">
    <div class="progress-bar bg-info"></div>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html vertical column %}

## Striped progress

You can create a striped progress bar by adding the `.progress-bar-striped` class to the `.progress-bar` element.

{% capture html -%}
<div class="progress">
  <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 60%"></div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Progress background

By using a progress bar component as a background element, designers can create a dynamic and engaging visual experience for users. For example, the progress bar could be used to represent the completion of a long-term goal or project, such as a fundraising campaign or construction project. As users interact with the page, the progress bar could gradually fill up, creating a sense of momentum and progress.

Thanks to this you can create a nice looking statistics section:

{% capture html -%}
<div class="progressbg">
  <div class="progress progressbg-progress">
    <div class="progress-bar bg-primary-lt" style="width: 65%"></div>
  </div>
  <div class="progressbg-text">Poland</div>
  <div class="progressbg-value">65%</div>
</div>
<div class="progressbg">
  <div class="progress progressbg-progress">
    <div class="progress-bar bg-primary-lt" style="width: 35%"></div>
  </div>
  <div class="progressbg-text">Germany</div>
  <div class="progressbg-value">35%</div>
</div>
<div class="progressbg">
  <div class="progress progressbg-progress">
    <div class="progress-bar bg-primary-lt" style="width: 28%"></div>
  </div>
  <div class="progressbg-text">United Stated</div>
  <div class="progressbg-value">28%</div>
</div>
<div class="progressbg">
  <div class="progress progressbg-progress">
    <div class="progress-bar bg-primary-lt" style="width: 20%"></div>
  </div>
  <div class="progressbg-text">United Kingdom</div>
  <div class="progressbg-value">20%</div>
</div>
<div class="progressbg">
  <div class="progress progressbg-progress">
    <div class="progress-bar bg-primary-lt" style="width: 15%"></div>
  </div>
  <div class="progressbg-text">France</div>
  <div class="progressbg-value">15%</div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html vertical card %}