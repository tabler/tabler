---
title: Prose
summary: Use the `.prose` wrapper to style long-form content without adding classes to every element.
bootstrapLink: content/prose/
description: Long-form content styles for markdown-like HTML.
---

## How it works

Wrap your content in the `.prose` class to apply long-form typography styles to headings, paragraphs, lists, tables, and other common elements. This is especially useful when rendering Markdown, MDX, or content from a WYSIWYG editor.

- Sets a base `font-size` and `line-height` for comfortable reading.
- Normalizes list spacing and nested list indentation.
- Adds consistent `margin-bottom` on headings and paragraphs.
- Gives blockquotes, code, and tables a readable default style.

## Example

This example shows typical content wrapped in `.prose`.

{% capture html -%}
<div class="prose">
  <h1>Getting started with documentation</h1>
  <p>
    Writing clear and effective documentation is essential for any project. When you create content that others
    will read and use, proper formatting makes all the difference. <em>Good documentation</em> helps users
    understand complex concepts quickly and efficiently.
  </p>
  <blockquote>
    <p>Documentation is a love letter that you write to your future self.</p>
  </blockquote>
  <p>
    The foundation of great documentation starts with <strong>understanding your audience</strong> and their needs.
  </p>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Inline HTML elements

HTML provides a long list of inline tags. These are commonly used inside `.prose`.

- **Bold text** uses `<strong>`.
- *Italic text* uses `<em>`.
- ==Highlighting== uses `<mark>`.
- Abbreviations like HTML use `<abbr>` with a `title`.
- Citations use `<cite>`.
- Deleted text uses `<del>` and inserted text uses `<ins>`.
- Superscript uses `<sup>` and subscript uses `<sub>`.

Most of these elements are styled by browsers with only light adjustments from Tabler.

## Headings

Headings help readers scan long documents quickly. Use them to create a clear hierarchy and maintain a logical flow.

### Code

Inline code is available with `<code>`. For multi-line snippets, use `<pre><code>`.

{% capture html -%}
<div class="prose">
  <p>Inline code looks like <code>console.log("Hello")</code> and uses monospace styling.</p>
  <pre><code>// Create a function that returns a sum
function add(a, b) {
  return a + b;
}
</code></pre>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

### Lists

Use ordered lists for steps and unordered lists for related points.

{% capture html -%}
<div class="prose">
  <ol>
    <li>Start with the most important information.</li>
    <li>Provide context before technical details.</li>
    <li>Include practical examples.</li>
  </ol>
  <ul>
    <li>Write clear, concise list items.</li>
    <li>Keep the structure consistent.</li>
    <li>Avoid overly long items.</li>
  </ul>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

### Images

Images should support the text and provide useful context.

{% capture html -%}
<div class="prose">
  <img src="/static/photos/cup-of-coffee-and-an-open-book.jpg" alt="Open book and coffee" />
  <img src="/static/photos/book-on-the-grass.jpg" alt="Book on the grass" />
  <img src="/static/photos/stylish-workspace-with-macbook-pro.jpg" alt="Workspace with laptop" />
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

### Tables

Tables work best for comparing related data points.

{% capture html -%}
<div class="prose">
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Up-votes</th>
        <th>Down-votes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Alice</td>
        <td>10</td>
        <td>11</td>
      </tr>
      <tr>
        <td>Bob</td>
        <td>4</td>
        <td>3</td>
      </tr>
      <tr>
        <td>Charlie</td>
        <td>7</td>
        <td>9</td>
      </tr>
      <tr>
        <td>Totals</td>
        <td>21</td>
        <td>23</td>
      </tr>
    </tbody>
  </table>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}
