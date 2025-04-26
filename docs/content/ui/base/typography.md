---
title: Typography
summary: Typography plays an important role in creating an attractive and clear interface design. Good typography will make the content easy to follow and improve the usability of your website.
bootstrapLink: content/typography/
description: Role of typography in interface design.
---

## Headings

Use HTML headings to organize content on your website and make the structure clear and user-friendly. The `h1` to `h6` tags are used to define HTML headings.
The `h1` tag is the highest level and the `h6` tag is the lowest level.

Below are examples of headings with different levels:

{% capture html -%}
<h1>H1 Heading</h1>
<h2>H2 Heading</h2>
<h3>H3 Heading</h3>
<h4>H4 Heading</h4>
<h5>H5 Heading</h5>
<h6>H6 Heading</h6>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Paragraphs

Organize longer pieces of text into paragraphs using the `p` tag. It is the most common element for text content.

```html
<p>At vero eos et accusam et justo duo dolores et ea rebum.</p>
```

If you use a second paragraph, it will be separated from the first one by a blank line.

{% capture html -%}
<p>
	Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
	ut labore et dolore magna aliquyam erat, sed diam voluptua.
</p>
<p>At vero eos et accusam et justo duo dolores et ea rebum.</p>
{%- endcapture %}
{% include "docs/example.html" html=html vertical %}


## Semantic text elements

Use a variety of semantic text elements, depending on how you want to display particular fragments of content.

Here are examples of semantic text elements:

{% capture html -%}
<div>
  <abbr title="Internationalization">I18N</abbr>
</div>
<div>
	<strong>Bold</strong>
</div>
<div>
  <cite>Citation</cite>
</div>
<div>
  <code>Hello World!</code>
</div>
<div>
  <del>Deleted</del>
</div>
<div>
  <em>Emphasis</em>
</div>
<div>
  <i>Italic</i>
</div>
<div>
  <ins>Inserted</ins>
</div>
<div>
  <kbd>Ctrl + S</kbd>
</div>
<div>
  <mark>Highlighted</mark>
</div>
<div>
  <s>Strikethrough</s>
</div>
<div>
  <samp>Sample</samp>
</div>
<div>
	Text <sub>Subscript</sub>
</div>
<div>
	Text <sup>Superscript</sup>
</div>
<div>
  <time>20:00</time>
</div>
<div>
  <u>Underline</u>
</div>
<div>
	<var>x</var> = <var>y</var> + 2
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Horizontal rules

Use the `hr` tag to represent a thematic break between paragraphs within one section.

{% capture html -%}
<div>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque ex excepturi fuga magnam nam
    reiciendis velit. Amet eius eos eveniet fuga in ipsa, ipsum voluptatum. Dolorem expedita
    quibusdam veniam?
  </p>
  <hr />
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque ex excepturi fuga magnam nam
    reiciendis velit. Amet eius eos eveniet fuga in ipsa, ipsum voluptatum. Dolorem expedita
    quibusdam veniam?
  </p>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Horizontal rules with label

You can also add a label to a horizontal rule and align it as you see fit. Centered label is the default.

{% capture html -%}
<p>
  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
  labore et dolore magna aliquyam erat, sed diam voluptua.
</p>
<div class="hr-text">
  <span>Rule text</span>
</div>
<p>
  At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
  takimata sanctus est Lorem ipsum dolor sit amet.
</p>
<div class="hr-text hr-text-center">
  <span>Rule text</span>
</div>
<p>
  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
  labore et dolore magna aliquyam erat, sed diam voluptua.
</p>
<div class="hr-text hr-text-start">
  <span>Rule text</span>
</div>
<p>
  At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
  takimata sanctus est Lorem ipsum dolor sit amet.
</p>
<div class="hr-text hr-text-end">
  <span>Rule text</span>
</div>
<p>
  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
  labore et dolore magna aliquyam erat, sed diam voluptua.
</p>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Optimized for different alphabets

Tabler has been optimized to correctly display content in any language. It supports most Asian, African and Middle Eastern languages.

{% capture html -%}
<p>汉字</p>
<p>日本語の表記体系</p>
<p>Кириллица</p>
<p>Eλληνική</p>
<p>ქართული დამწერლობა</p>
<p>Հայերենի այբուբեն</p>
<p>الحروف العربية</p>
<p>אלפבית עברי</p>
<p>อักษรไทย</p>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Text transform

Transform the content of components with text capitalization classes.

{% capture html -%}
<p class="text-lowercase">Lowercased text.</p>
<p class="text-uppercase">Uppercased text.</p>
<p class="text-capitalize">Capitalized text.</p>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Letter spacing

Control the tracking (letter spacing) of an element and make it tight, wide or normal.

{% capture html -%}
<p class="tracking-tight">Lorem ipsum dolor sit amet. Tight letter spacing.</p>
<p class="tracking-normal">Lorem ipsum dolor sit amet. Normal letter spacing.</p>
<p class="tracking-wide">Lorem ipsum dolor sit amet. Wide letter spacing.</p>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Line height

Control the leading (line height) of an element using the `.lh-*` classes. The line height is the vertical space between lines of text.

{% capture html -%}
<p class="lh-1">
  This is the long text with line height 1. Lorem ipsum dolor sit amet. Dolor sit amet.
</p>
<p class="lh-sm">
  This is the long text with small line height. Lorem ipsum dolor sit amet. Dolor sit amet.
</p>
<p class="lh-base">
  This is the long text with base line height. Lorem ipsum dolor sit amet. Dolor sit amet.
</p>
<p class="lh-lg">
  This is the long text with large line height. Lorem ipsum dolor sit amet. Dolor sit amet.
</p>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Antialiasing

Control the font smoothing of an element.

Use the `.antialiased` utility to render text using subpixel antialiasing or use the `.subpixel-antialiased` utility to remove antialiasing.

{% capture html -%}
<div class="antialiased">Text with antialiasing</div>
<div class="subpixel-antialiased">Text without antialiasing</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Keyboard input

Use the `<kbd>` to indicate input that is typically entered via keyboard.

{% capture html -%}
To edit settings, press <kbd>ctrl</kbd> + <kbd>,</kbd> or <kbd>ctrl</kbd> + <kbd>C</kbd>.
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Markdown elements

If you can't use the CSS classes you want, or you just want to use HTML tags, use the `.markdown` class in a container. It will apply the default styles for markdown elements.

{% capture html -%}
<div class="markdown">
  <h1>Hello World</h1>
  <p>
    Lorem ipsum<sup>[1]</sup> dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus
    ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut
    vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque. Sub<sub
      >script</sub
    >
    works as well!
  </p>
  <h2>Second level</h2>
  <p>
    Curabitur accumsan turpis pharetra <strong>augue tincidunt</strong> blandit. Quisque condimentum
    maximus mi, sit amet commodo arcu rutrum id. Proin pretium urna vel cursus venenatis.
    Suspendisse potenti. Etiam mattis sem rhoncus lacus dapibus facilisis. Donec at dignissim dui.
    Ut et neque nisl.
  </p>
  <ul>
    <li>In fermentum leo eu lectus mollis, quis dictum mi aliquet.</li>
    <li>Morbi eu nulla lobortis, lobortis est in, fringilla felis.</li>
    <li>Aliquam nec felis in sapien venenatis viverra fermentum nec lectus.</li>
    <li>Ut non enim metus.</li>
  </ul>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}
