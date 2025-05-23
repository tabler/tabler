---
title: Modals
summary: Use Bootstrap’s JavaScript modal plugin to add dialogs to your site for lightboxes, user notifications, or completely custom content.
description: Dialogs for notifications and content.
---

Modals are built with HTML, CSS, and JavaScript. They’re positioned over everything else in the document and remove scroll from the `<body>` so that modal content scrolls instead.

## Default markup

To create a modal, you need to add a `.modal` element to the document. Inside the `.modal`, you need to add a `.modal-dialog` element, which contains a `.modal-content` element. The `.modal-content` element contains the modal’s header, body, and footer.

```html
<div class="modal" tabindex="-1">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">...</div>
      <div class="modal-body">...</div>
      <div class="modal-footer">...</div>
    </div>
  </div>
</div>
```

Look at the example below to see how the modal looks.

{% capture html -%}
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
<div class="modal" id="exampleModal" tabindex="-1">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi beatae delectus
        deleniti dolorem eveniet facere fuga iste nemo nesciunt nihil odio perspiciatis, quia quis
        reprehenderit sit tempora totam unde.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn me-auto" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
      </div>
    </div>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html centered bg="surface-secondary" %}

## Prompt and alert

You can use the modal to create a prompt or alert. Look at the example below to see how the prompt and alert look.

{% capture html -%}
<div class="modal" id="exampleModal" tabindex="-1">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content">
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      <div class="modal-status bg-danger"></div>
      <div class="modal-body text-center py-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon mb-2 text-danger icon-lg"
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
          <path d="M12 9v2m0 4v.01" />
          <path
            d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75"
          />
        </svg>
        <h3>Are you sure?</h3>
        <div class="text-secondary">
          Do you really want to remove 84 files? What you've done cannot be undone.
        </div>
      </div>
      <div class="modal-footer">
        <div class="w-100">
          <div class="row">
            <div class="col">
              <a href="#" class="btn w-100" data-bs-dismiss="modal"> Cancel </a>
            </div>
            <div class="col">
              <a href="#" class="btn btn-danger w-100" data-bs-dismiss="modal"> Delete 84 items </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html raw bg="surface-secondary" %}

{% capture html -%}
<div class="modal" id="exampleModal" tabindex="-1">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content">
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      <div class="modal-status bg-success"></div>
      <div class="modal-body text-center py-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon mb-2 text-green icon-lg"
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
          <path d="M9 12l2 2l4 -4" />
        </svg>
        <h3>Payment succeeded</h3>
        <div class="text-secondary">
          Your payment of $290 has been successfully submitted. Your invoice has been sent to
          support@tabler.io.
        </div>
      </div>
      <div class="modal-footer">
        <div class="w-100">
          <div class="row">
            <div class="col">
              <a href="#" class="btn w-100" data-bs-dismiss="modal"> Go to dashboard </a>
            </div>
            <div class="col">
              <a href="#" class="btn btn-success w-100" data-bs-dismiss="modal"> View invoice </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html raw bg="surface-secondary" %}

## Modal with form

You can use the modal to create a form. Look at the example below to see how the form looks.

{% capture html -%}
<div class="modal" id="exampleModal" tabindex="-1">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">New report</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            name="example-text-input"
            placeholder="Your report name"
          />
        </div>
        <label class="form-label">Report type</label>
        <div class="form-selectgroup-boxes row mb-3">
          <div class="col-md-6">
            <label class="form-selectgroup-item">
              <input
                type="radio"
                name="report-type"
                value="1"
                class="form-selectgroup-input"
                checked
              />
              <span class="form-selectgroup-label d-flex align-items-center p-3">
                <span class="me-3">
                  <span class="form-selectgroup-check"></span>
                </span>
                <span class="form-selectgroup-label-content">
                  <span class="form-selectgroup-title strong mb-1">Simple</span>
                  <span class="d-block text-secondary"
                    >Provide only basic data needed for the report</span
                  >
                </span>
              </span>
            </label>
          </div>
          <div class="col-md-6">
            <label class="form-selectgroup-item">
              <input type="radio" name="report-type" value="1" class="form-selectgroup-input" />
              <span class="form-selectgroup-label d-flex align-items-center p-3">
                <span class="me-3">
                  <span class="form-selectgroup-check"></span>
                </span>
                <span class="form-selectgroup-label-content">
                  <span class="form-selectgroup-title strong mb-1">Advanced</span>
                  <span class="d-block text-secondary"
                    >Insert charts and additional advanced analyses to be inserted in the
                    report</span
                  >
                </span>
              </span>
            </label>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-8">
            <div class="mb-3">
              <label class="form-label">Report url</label>
              <div class="input-group input-group-flat">
                <span class="input-group-text"> https://tabler.io/reports/ </span>
                <input type="text" class="form-control ps-0" value="report-01" autocomplete="off" />
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="mb-3">
              <label class="form-label">Visibility</label>
              <select class="form-select">
                <option value="1" selected>Private</option>
                <option value="2">Public</option>
                <option value="3">Hidden</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-lg-6">
            <div class="mb-3">
              <label class="form-label">Client name</label>
              <input type="text" class="form-control" />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="mb-3">
              <label class="form-label">Reporting period</label>
              <input type="date" class="form-control" />
            </div>
          </div>
          <div class="col-lg-12">
            <div>
              <label class="form-label">Additional information</label>
              <textarea class="form-control" rows="3"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a href="#" class="btn btn-link link-secondary" data-bs-dismiss="modal"> Cancel </a>
        <a href="#" class="btn btn-primary ms-auto" data-bs-dismiss="modal">
          {% include "ui/icon.html" icon="plus" %}
          Create new report
        </a>
      </div>
    </div>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html raw bg="surface-secondary" class="px-5" %}
