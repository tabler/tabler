---
title: Form elements
summary: Forms are one of the most important types of interaction with a website or app. Since their aim is to enable users to make a purchase, subscribe to a service or sign up to create an account, it's important to make sure they are easy to complete and help increase conversion rates. Use the available elements to create forms which are well-structured and user-friendly.
bootstrapLink: components/forms/
docs-libs: nouislider
description: Design user-friendly and effective forms.
order: 1
---

## Classic inputs

Use classic, user-friendly inputs, label them appropriately and include input placeholders that will help users avoid confusion when completing a form. Add the `form-control` class to style your input controls.

```html
<input type="text" class="form-control" name="example-text-input" placeholder="Input placeholder" />
```

All variants of the input control are available in the examples below:

{% capture html -%}
<div class="mb-3">
  <label class="form-label">Text</label>
  <input
    type="text"
    class="form-control"
    name="example-text-input"
    placeholder="Input placeholder"
  />
</div>
<div class="mb-3">
  <label class="form-label">Password</label>
  <input
    type="password"
    class="form-control"
    name="example-password-input"
    placeholder="Input placeholder"
  />
</div>
<div class="mb-3">
  <label class="form-label">Disabled</label>
  <input
    type="text"
    class="form-control"
    name="example-password-input"
    placeholder="Input placeholder"
    disabled
  />
</div>
<div class="mb-3">
  <label class="form-label">Readonly</label>
  <input
    type="text"
    class="form-control"
    name="example-password-input"
    value="Readolny value"
    readonly
  />
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Form control rounded

Use the `form-control-rounded` class if you prefer form controls with rounded corners.

{% capture html -%}
<div class="mb-3">
  <label class="form-label">Form control rounded</label>
  <input
    type="text"
    class="form-control form-control-rounded mb-2"
    name="Form control rounded"
    placeholder="Text.."
  />
  <div class="input-icon">
    <input type="text" value="" class="form-control form-control-rounded" placeholder="Search…" />
    <span class="input-icon-addon">
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
        <circle cx="10" cy="10" r="7" />
        <line x1="21" y1="21" x2="15" y2="15" />
      </svg>
    </span>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Form control flush

You can remove borders from your form control by adding the `form-control-flush` class.

{% capture html -%}
<label class="form-label">Form control flush</label>
<input
	type="text"
	class="form-control form-control-flush"
	name="Form control flush"
	placeholder="Text.."
/>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Input with icon

Add icons to your input controls to suggest users what they should enter or inform them of the current state of a form element.

{% capture html -%}
<div class="mb-3">
  <label class="form-label">Icon input</label>
  <div class="input-icon mb-3">
    <input type="text" value="" class="form-control" placeholder="Search…" />
    <span class="input-icon-addon">
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
        <circle cx="10" cy="10" r="7" />
        <line x1="21" y1="21" x2="15" y2="15" />
      </svg>
    </span>
  </div>
  <div class="input-icon mb-3">
    <span class="input-icon-addon">
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
        <circle cx="12" cy="7" r="4" />
        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      </svg>
    </span>
    <input type="text" value="" class="form-control" placeholder="Username" />
  </div>
</div>
<div class="mb-3">
  <label class="form-label">Loader input</label>
  <div class="input-icon mb-3">
    <input type="text" value="" class="form-control" placeholder="Loading…" />
    <span class="input-icon-addon">
      <div class="spinner-border spinner-border-sm text-secondary" role="status"></div>
    </span>
  </div>
  <div class="input-icon mb-3">
    <span class="input-icon-addon">
      <div class="spinner-border spinner-border-sm text-secondary" role="status"></div>
    </span>
    <input type="text" value="" class="form-control" placeholder="Loading…" />
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Separated inputs

Include an additional element in your input section, such as a button which can be used to submit the information entered in the input control.

{% capture html -%}
<div class="mb-3">
  <label class="form-label">Separated inputs</label>
  <div class="row g-2">
    <div class="col">
      <input type="text" class="form-control" placeholder="Search for…" />
    </div>
    <div class="col-auto">
      <a href="#" class="btn btn-icon" aria-label="Button">
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
          <circle cx="10" cy="10" r="7" />
          <line x1="21" y1="21" x2="15" y2="15" />
        </svg>
      </a>
    </div>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Textarea and select

Use a multi-line text input control to enable users to enter longer pieces of text. The control will automatically adjust to the length of the text entered.

Add one of the available selects - either a dropdown or a multiple choice select - to let users choose from a predefined set of options.

{% capture html -%}
<div class="mb-3">
  <label class="form-label">Textarea</label>
  <textarea
    class="form-control"
    name="example-textarea"
    placeholder="Textarea placeholder"
  ></textarea>
</div>
<div class="mb-3">
  <div class="form-label">Select</div>
  <select class="form-select">
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>
</div>
<div class="mb-3">
  <div class="form-label">Select multiple</div>
  <select class="form-select" multiple>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Input size

Choose the size of an input control that will go well with your form design. Besides the default size, you can also use small and large input controls.

{% capture html -%}
<div class="mb-3">
  <label class="form-label">Input sizing</label>
  <input class="form-control form-control-lg mb-2" type="text" placeholder=".form-control-lg" />
  <input class="form-control mb-2" type="text" placeholder="Default input" />
  <input class="form-control form-control-sm" type="text" placeholder=".form-control-sm" />
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Datalists

Use the `datalist` element to add an autocomplete feature to your input control. The list of available options will display once a user starts to type and will make it quicker to complete form sections.

{% capture html -%}
<div class="mb-3">
  <label class="form-label">Datalist example</label>
  <input class="form-control" list="datalistOptions" placeholder="Type to search..." />
  <datalist id="datalistOptions">
    <option value="Aruba" />
    <option value="Afghanistan" />
    <option value="Angola" />
    <option value="Anguilla" />
    <option value="Albania" />
    <option value="Andorra" />
    <option value="United Arab Emirates" />
    <option value="Argentina" />
    <option value="Armenia" />
    <option value="American Samoa" />
  </datalist>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Toggle switches

Use toggle switches for the elements of your form which require choosing between two opposing states.

{% capture html -%}
<div class="mb-3">
  <div class="form-label">Toggle switches</div>
  <label class="form-check form-switch">
    <input class="form-check-input" type="checkbox" checked />
    <span class="form-check-label">Option 1</span>
  </label>
  <label class="form-check form-switch">
    <input class="form-check-input" type="checkbox" />
    <span class="form-check-label">Option 2</span>
  </label>
  <label class="form-check form-switch">
    <input class="form-check-input" type="checkbox" />
    <span class="form-check-label">Option 3</span>
  </label>
</div>
<div class="mb-3">
  <div class="form-label">Single switch</div>
  <label class="form-check form-switch">
    <input class="form-check-input" type="checkbox" />
    <span class="form-check-label">I agree with terms and conditions</span>
  </label>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Radios

Use radio buttons for the parts of your form which require users to choose one option from a set of two or more mutually exclusive options.

{% capture html -%}
<div class="mb-3">
  <div class="form-label">Radios</div>
  <div>
    <label class="form-check">
      <input class="form-check-input" type="radio" name="radios" checked />
      <span class="form-check-label">Option 1</span>
    </label>
    <label class="form-check">
      <input class="form-check-input" type="radio" name="radios" />
      <span class="form-check-label">Option 2</span>
    </label>
    <label class="form-check">
      <input class="form-check-input" type="radio" disabled />
      <span class="form-check-label">Option 3</span>
    </label>
    <label class="form-check">
      <input class="form-check-input" type="radio" checked disabled />
      <span class="form-check-label">Option 4</span>
    </label>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

{% capture html -%}
<div class="mb-3">
  <div class="form-label">Inline Radios</div>
  <div>
    <label class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="radios-inline" checked />
      <span class="form-check-label">Option 1</span>
    </label>
    <label class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="radios-inline" />
      <span class="form-check-label">Option 2</span>
    </label>
    <label class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="radios-inline" disabled />
      <span class="form-check-label">Option 3</span>
    </label>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Checkboxes

Use checkboxes if you want to allow users to select more than one option from a set of predefined options or to turn an option on or off.

{% capture html -%}
<div class="mb-3">
  <div class="form-label">Checkboxes</div>
  <div>
    <label class="form-check">
      <input class="form-check-input" type="checkbox" />
      <span class="form-check-label">Checkbox input</span>
    </label>
    <label class="form-check">
      <input class="form-check-input" type="checkbox" disabled />
      <span class="form-check-label">Disabled checkbox input</span>
    </label>
    <label class="form-check">
      <input class="form-check-input" type="checkbox" checked />
      <span class="form-check-label">Checked checkbox input</span>
    </label>
  </div>
</div>
<div class="mb-3">
  <div class="form-label">Inline Checkboxes</div>
  <div>
    <label class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" />
      <span class="form-check-label">Option 1</span>
    </label>
    <label class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" disabled />
      <span class="form-check-label">Option 2</span>
    </label>
    <label class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" checked />
      <span class="form-check-label">Option 3</span>
    </label>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Range input

Add a range slider to make it possible for users to set a value or range, such as a price range or a time frame.

{% capture html -%}
<div class="mb-3">
  <label class="form-label">Range input</label>
  <input type="range" class="form-range mb-2" value="40" min="0" max="100" step="10" />
  <div class="form-range mb-2 text-green" id="range-color"></div>
</div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    window.noUiSlider &&
      noUiSlider.create(document.getElementById("range-color"), {
        start: 40,
        connect: [true, false],
        step: 10,
        range: {
          min: 0,
          max: 100,
        },
      });
  });
</script>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Input group

Create a group of input controls and place add-ons on either side of an input.

{% capture html -%}
<div class="mb-3">
  <label class="form-label">Input group</label>
  <div class="input-group mb-2">
    <span class="input-group-text"> @ </span>
    <input type="text" class="form-control" placeholder="username" autocomplete="off" />
  </div>
  <div class="input-group mb-2">
    <input type="text" class="form-control" placeholder="subdomain" autocomplete="off" />
    <span class="input-group-text"> .tabler.io </span>
  </div>
  <div class="input-group">
    <span class="input-group-text"> https:// </span>
    <input type="text" class="form-control" placeholder="subdomain" autocomplete="off" />
    <span class="input-group-text"> .tabler.io </span>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Input with checkboxes or radios

Add checkboxes or radio buttons on either side of your input control.

{% capture html -%}
<div class="mb-3">
  <label class="form-label">Input with checkbox or radios</label>
  <div class="input-group mb-2">
    <span class="input-group-text">
      <input class="form-check-input m-0" type="checkbox" checked />
    </span>
    <input type="text" class="form-control" autocomplete="off" />
  </div>
  <div class="input-group">
    <input type="text" class="form-control" autocomplete="off" />
    <span class="input-group-text">
      <input class="form-check-input m-0" type="radio" checked />
    </span>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Input with prepended or appended text

Add text to your input control, either before or after the text which is to be entered by a user.

{% capture html -%}
<div class="mb-3">
  <label class="form-label">Input with prepended text</label>
  <div class="input-group input-group-flat mb-2">
    <span class="input-group-text"> https://tabler.io/users/ </span>
    <input type="text" class="form-control ps-0" value="yourfancyusername" autocomplete="off" />
  </div>
  <div class="input-group input-group-flat">
    <input
      type="text"
      class="form-control text-end pe-0"
      value="yourfancydomain"
      autocomplete="off"
    />
    <span class="input-group-text"> .tabler.io </span>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Input with appended link

Include a link in your input control to add a clickable element within the control.

{% capture html -%}
<div class="mb-3">
  <label class="form-label">Input with appended link</label>
  <div class="input-group input-group-flat">
    <input type="password" class="form-control" value="ultrastrongpassword" autocomplete="off" />
    <span class="input-group-text">
      <a href="#" class="input-group-link">Show password</a>
    </span>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Input with appended kbd

Include a `<kbd>` in your input control to add a shortcut hint to the control.

{% capture html -%}
<div class="mb-3">
  <label class="form-label">Input with appended kbd</label>
  <div class="input-group input-group-flat">
    <input type="password" class="form-control" value="ultrastrongpassword" autocomplete="off" />
    <span class="input-group-text">
      <kbd>ctrl + K</kbd>
    </span>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Input with appended icon links

Add an icon link which you want to display at the end of your input control to visually represent actions which a user can take.

{% capture html -%}
<div class="mb-3">
  <label class="form-label">Input with appended icon links</label>
  <div class="input-group input-group-flat">
    <input type="text" class="form-control" autocomplete="off" />
    <span class="input-group-text">
      <a href="#" class="link-secondary" title="Clear search" data-bs-toggle="tooltip">
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
      </a>
      <a href="#" class="link-secondary ms-2" title="Search settings" data-bs-toggle="tooltip">
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
          <circle cx="6" cy="10" r="2" />
          <line x1="6" y1="4" x2="6" y2="8" />
          <line x1="6" y1="12" x2="6" y2="20" />
          <circle cx="12" cy="16" r="2" />
          <line x1="12" y1="4" x2="12" y2="14" />
          <line x1="12" y1="18" x2="12" y2="20" />
          <circle cx="18" cy="7" r="2" />
          <line x1="18" y1="4" x2="18" y2="5" />
          <line x1="18" y1="9" x2="18" y2="20" />
        </svg>
      </a>
      <a
        href="#"
        class="link-secondary ms-2 disabled"
        title="Add notification"
        data-bs-toggle="tooltip"
      >
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
            d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"
          />
          <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
        </svg>
      </a>
    </span>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

