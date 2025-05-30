---
title: Tracking
summary: Component for visualizing activity logs or other monitoring-related data. With its ability to show data in a visually appealing and easily understandable way, the tracking component is an essential tool for any organization that relies on data monitoring and analysis to optimize performance and user experience.
description: Monitor data activity visually.
---

## Basic example

{% capture html -%}
<div class="tracking">
  <div
    class="tracking-block bg-success"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Operational"
  ></div>
  <div
    class="tracking-block bg-success"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Operational"
  ></div>
  <div
    class="tracking-block bg-success"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Operational"
  ></div>
  <div
    class="tracking-block bg-success"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Operational"
  ></div>
  <div
    class="tracking-block bg-danger"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Downtime"
  ></div>
  <div
    class="tracking-block bg-success"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Operational"
  ></div>
  <div
    class="tracking-block bg-success"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Operational"
  ></div>
  <div
    class="tracking-block bg-success"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Operational"
  ></div>
  <div
    class="tracking-block bg-success"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Operational"
  ></div>
  <div
    class="tracking-block bg-success"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Operational"
  ></div>
  <div
    class="tracking-block bg-success"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Operational"
  ></div>
  <div
    class="tracking-block bg-success"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Operational"
  ></div>
  <div
    class="tracking-block bg-success"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Operational"
  ></div>
  <div
    class="tracking-block bg-warning"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Big load"
  ></div>
  <div
    class="tracking-block bg-success"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Operational"
  ></div>
  <div
    class="tracking-block bg-success"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Operational"
  ></div>
  <div
    class="tracking-block bg-success"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Operational"
  ></div>
  <div
    class="tracking-block bg-danger"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Downtime"
  ></div>
  <div
    class="tracking-block bg-success"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Operational"
  ></div>
  <div
    class="tracking-block bg-success"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Operational"
  ></div>
  <div
    class="tracking-block bg-success"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Operational"
  ></div>
  <div
    class="tracking-block"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="No data"
  ></div>
  <div
    class="tracking-block"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="No data"
  ></div>
  <div
    class="tracking-block bg-success"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Operational"
  ></div>
  <div
    class="tracking-block bg-success"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Operational"
  ></div>
  <div
    class="tracking-block bg-success"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Operational"
  ></div>
  <div
    class="tracking-block bg-success"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Operational"
  ></div>
  <div
    class="tracking-block bg-success"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Operational"
  ></div>
  <div
    class="tracking-block bg-success"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Operational"
  ></div>
  <div
    class="tracking-block bg-success"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Operational"
  ></div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Tracking inside a card

You can add a tracking component inside the cards to give your reports a fresh look and visualize the status of your system in an attractive way. If you want to read how to add other elements to a card it is worth reading [documentation of card](/img/components/cards).

{% capture html -%}
<div class="card">
  <div class="card-body">
    <div class="d-flex align-items-center">
      <div class="subheader">Status monitoring</div>
      <div class="ms-auto lh-1">
        <div class="dropdown">
          <a
            class="dropdown-toggle text-secondary"
            href="#"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            >Current month</a
          >
          <div class="dropdown-menu dropdown-menu-end">
            <a class="dropdown-item active" href="#">Current month</a>
            <a class="dropdown-item" href="#">Last month</a>
            <a class="dropdown-item" href="#">Last 3 months</a>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex align-items-baseline">
      <div class="h1 mb-3 me-2">99.5%</div>
      <div class="me-auto">
        <span class="text-green d-inline-flex align-items-center lh-1">
          2%
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon ms-1"
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
            <polyline points="3 17 9 11 13 15 21 7" />
            <polyline points="14 7 21 7 21 14" />
          </svg>
        </span>
      </div>
    </div>
    <div class="mt-2">
      <div class="tracking">
        <div
          class="tracking-block bg-success"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Operational"
        ></div>
        <div
          class="tracking-block bg-success"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Operational"
        ></div>
        <div
          class="tracking-block bg-success"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Operational"
        ></div>
        <div
          class="tracking-block bg-success"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Operational"
        ></div>
        <div
          class="tracking-block bg-danger"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Downtime"
        ></div>
        <div
          class="tracking-block bg-success"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Operational"
        ></div>
        <div
          class="tracking-block bg-success"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Operational"
        ></div>
        <div
          class="tracking-block bg-success"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Operational"
        ></div>
        <div
          class="tracking-block bg-success"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Operational"
        ></div>
        <div
          class="tracking-block bg-success"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Operational"
        ></div>
        <div
          class="tracking-block bg-success"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Operational"
        ></div>
        <div
          class="tracking-block bg-success"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Operational"
        ></div>
        <div
          class="tracking-block bg-success"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Operational"
        ></div>
        <div
          class="tracking-block bg-warning"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Big load"
        ></div>
        <div
          class="tracking-block bg-success"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Operational"
        ></div>
        <div
          class="tracking-block bg-success"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Operational"
        ></div>
        <div
          class="tracking-block bg-success"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Operational"
        ></div>
        <div
          class="tracking-block bg-danger"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Downtime"
        ></div>
        <div
          class="tracking-block bg-success"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Operational"
        ></div>
        <div
          class="tracking-block bg-success"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Operational"
        ></div>
        <div
          class="tracking-block bg-success"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Operational"
        ></div>
        <div
          class="tracking-block"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="No data"
        ></div>
        <div
          class="tracking-block"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="No data"
        ></div>
        <div
          class="tracking-block bg-success"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Operational"
        ></div>
        <div
          class="tracking-block bg-success"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Operational"
        ></div>
        <div
          class="tracking-block bg-success"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Operational"
        ></div>
        <div
          class="tracking-block bg-success"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Operational"
        ></div>
        <div
          class="tracking-block bg-success"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Operational"
        ></div>
        <div
          class="tracking-block bg-success"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Operational"
        ></div>
        <div
          class="tracking-block bg-success"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Operational"
        ></div>
      </div>
    </div>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}
