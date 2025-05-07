---
title: Vertical align
description: Quickly and easily align elements vertically with utility classes.
summary: Easily modify the vertical alignment of elements such as inline, inline-block, inline-table, and table-cell to ensure proper positioning and alignment within their parent containers, allowing for more precise control over your layout and design.
---

Choose from `.align-baseline`, `.align-top`, `.align-middle`, `.align-bottom`, `.align-text-bottom`, and `.align-text-top` as needed.

## Inline elements

Use vertical alignment utilities to align inline-level elements relative to their surrounding text or baseline. These classes are particularly useful for aligning small inline elements like icons or badges alongside text.

{% capture html -%}
<div>
  <span class="align-baseline">baseline</span>
  <span class="align-top">top</span>
  <span class="align-middle">middle</span>
  <span class="align-bottom">bottom</span>
  <span class="align-text-top">text-top</span>
  <span class="align-text-bottom">text-bottom</span>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Table cells

Vertical alignment utilities are also applicable to table cells, allowing you to control the alignment of content within a cell. This is especially useful for creating well-structured and visually appealing tables where the content aligns consistently across rows and columns.

{% capture html -%}
<table style="height: 100px" class="bg-surface">
  <tbody>
    <tr>
      <td class="align-baseline border">baseline</td>
      <td class="align-top border">top</td>
      <td class="align-middle border">middle</td>
      <td class="align-bottom border">bottom</td>
      <td class="align-text-top border">text-top</td>
      <td class="align-text-bottom border">text-bottom</td>
    </tr>
  </tbody>
</table>
{%- endcapture %}
{% include "docs/example.html" html=html %}