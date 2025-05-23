---
title: Data grid
summary: Use the data grid component to display detailed information about your product. The data is displayed as a column of items consisting of a title and content.
description: Detailed product information in grids.
---

{% capture html -%}
<div class="datagrid">
  <div class="datagrid-item">
    <div class="datagrid-title">Registrar</div>
    <div class="datagrid-content">Third Party</div>
  </div>
  <div class="datagrid-item">
    <div class="datagrid-title">Nameservers</div>
    <div class="datagrid-content">Third Party</div>
  </div>
  <div class="datagrid-item">
    <div class="datagrid-title">Port number</div>
    <div class="datagrid-content">3306</div>
  </div>
  <div class="datagrid-item">
    <div class="datagrid-title">Expiration date</div>
    <div class="datagrid-content">–</div>
  </div>
  <div class="datagrid-item">
    <div class="datagrid-title">Creator</div>
    <div class="datagrid-content">
      <div class="d-flex align-items-center">
        <span
          class="avatar avatar-xs me-2 rounded"
          style="background-image: url(/static/avatars/027m.jpg)"
        ></span>
        Paweł Kuna
      </div>
    </div>
  </div>
  <div class="datagrid-item">
    <div class="datagrid-title">Age</div>
    <div class="datagrid-content">15 days</div>
  </div>
  <div class="datagrid-item">
    <div class="datagrid-title">Edge network</div>
    <div class="datagrid-content">
      <span class="status status-green"> Active </span>
    </div>
  </div>
  <div class="datagrid-item">
    <div class="datagrid-title">Avatars list</div>
    <div class="datagrid-content">
      <div class="avatar-list avatar-list-stacked">
        <span
          class="avatar avatar-xs rounded"
          style="background-image: url(/static/avatars/029f.jpg)"
        ></span>
        <span class="avatar avatar-xs rounded">JL</span>
        <span
          class="avatar avatar-xs rounded"
          style="background-image: url(/static/avatars/015f.jpg)"
        ></span>
        <span
          class="avatar avatar-xs rounded"
          style="background-image: url(/static/avatars/004m.jpg)"
        ></span>
        <span
          class="avatar avatar-xs rounded"
          style="background-image: url(/static/avatars/037m.jpg)"
        ></span>
        <span class="avatar avatar-xs rounded">+3</span>
      </div>
    </div>
  </div>
  <div class="datagrid-item">
    <div class="datagrid-title">Checkbox</div>
    <div class="datagrid-content">
      <label class="form-check">
        <input class="form-check-input" type="checkbox" checked />
        <span class="form-check-label">Click me</span>
      </label>
    </div>
  </div>
  <div class="datagrid-item">
    <div class="datagrid-title">Icon</div>
    <div class="datagrid-content">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon text-green"
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
      Checked
    </div>
  </div>
  <div class="datagrid-item">
    <div class="datagrid-title">Form control</div>
    <div class="datagrid-content">
      <input type="text" class="form-control form-control-flush" placeholder="Input placeholder" />
    </div>
  </div>
  <div class="datagrid-item">
    <div class="datagrid-title">Longer description</div>
    <div class="datagrid-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

You can adjust the datagrid to your needs by setting the values of variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `--tblr-datagrid-item-width` | Width of the datagrid item | `15rem` |
| `--tblr-datagrid-padding` | Gap between the datagrid items | `1.5rem` |
