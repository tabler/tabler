---
title: Typography
menu: docs.content.typography
description: Typography plays an important role in creating an attractive and clear interface design. Good typography will make the content easy to follow and improve the usability of your website.
bootstrap-link: content/typography/
---


## Headings

Use HTML headings to organize content on your website and make the structure clear and user-friendly. 

{% capture code %}
{% for i in (1..6) %}<h{{ i }}>H{{ i }} Heading</h{{ i }}>
{% endfor %}
{% endcapture %}
{% include example.html code=code %}


## Paragraphs

Organize longer pieces of text into paragraphs using the `p` tag.

{% capture code %}
<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
<p>At vero eos et accusam et justo duo dolores et ea rebum.</p>
{% endcapture %}
{% include example.html code=code %}


## Semantic text elements

Use a variety of semantic text elements, depending of how you want to display particular fragments of content.

{% capture code %}
<abbr title="Internationalization">I18N</abbr>{% hide %} <code class="ms-2">abbr</code><br/>{% endhide %}
<strong>Bold</strong>{% hide %} <code class="ms-2">strong</code> <code>b</code><br/>{% endhide %}
<cite>Citation</cite>{% hide %} <code class="ms-2">cite</code><br/>{% endhide %}
<code>Hello World!</code>{% hide %} <code class="ms-2">code</code><br/>{% endhide %}
<del>Deleted</del>{% hide %} <code class="ms-2">del</code><br/>{% endhide %}
<em>Emphasis</em>{% hide %} <code class="ms-2">em</code><br/>{% endhide %}
<i>Italic</i>{% hide %} <code class="ms-2">i</code><br/>{% endhide %}
<ins>Inserted</ins>{% hide %} <code class="ms-2">ins</code><br/>{% endhide %}
<kbd>Ctrl + S</kbd>{% hide %} <code class="ms-2">kbd</code><br/>{% endhide %}
<mark>Highlighted</mark>{% hide %} <code class="ms-2">mark</code><br/>{% endhide %}
<s>Strikethrough</s{% hide %}> <code class="ms-2">s</code><br/>{% endhide %}
<samp>Sample</samp>{% hide %} <code class="ms-2">samp</code><br/>{% endhide %}
Text <sub>Subscripted</sub>{% hide %} <code class="ms-2">sub</code><br/>{% endhide %}
Text <sup>Superscripted</sup>{% hide %} <code class="ms-2">sup</code><br/>{% endhide %}
<time>20:00</time>{% hide %} <code class="ms-2">time</code><br/>{% endhide %}
<u>Underline</u>{% hide %} <code class="ms-2">u</code><br/>{% endhide %}
<var>x</var> = <var>y</var> + 2{% hide %} <code class="ms-2">var</code><br/>{% endhide %}
{% endcapture %}
{% include example.html code=code %}


## Horizontal rules

Use the `hr` tag to represent a thematic break between paragraphs within one section.

{% capture code %}
<hr> 
{% endcapture %}
{% include example.html code=code %}


## Horizontal rules with label

You can also add a label to a horizontal rule and align it as you see fit.

{% capture code %}
<p>
  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
</p>
<div class="hr-text">
  <span>Rule text</span>
</div>
<p>
  At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
</p>
<div class="hr-text hr-text-center">
  <span>Rule text</span>
</div>
<p>
  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
</p>
<div class="hr-text hr-text-end">
  <span>Rule text</span>
</div>
<p>
  At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
</p>
{% endcapture %}
{% include example.html code=code %}


## Optimized for different alphabets

Tabler has been optimized to correctly display content in any language. It supports most Asian, African and Middle Eastern languages.

{% capture code %}
<h5>Chinese</h5>
<p>汉字</p>

<h5>Japanese</h5>
<p>日本語の表記体系</p>

<h5>Korean</h5>
<p>한글</p>

<h5>Cyrillic</h5>
<p>Кириллица</p>

<h5>Greek</h5>
<p>Eλληνική</p>

<h5>Georgian</h5>
<p>ქართული დამწერლობა</p>

<h5>Armenian</h5>
<p>Հայերենի այբուբեն</p>

<h5>Arabic</h5>
<p>الحروف العربية</p>

<h5>Hebrew</h5>
<p>אלפבית עברי</p>

<h5>Thai</h5>
<p>อักษรไทย</p>
{% endcapture %}
{% include example.html code=code %}


## Text transform

Transform the content of components with text capitalization classes.

{% capture code %}
<p class="text-lowercase">Lowercased text.</p>
<p class="text-uppercase">Uppercased text.</p>
<p class="text-capitalize">Capitalized text.</p>
{% endcapture %}
{% include example.html code=code %}


## Letter spacing

Control the tracking (letter spacing) of an element and make it tight, wide or normal.

{% capture code %}
<p class="tracking-tight">Lorem ipsum dolor sit amet. Tight letter spacing.</p>
<p class="tracking-normal">Lorem ipsum dolor sit amet. Normal letter spacing.</p>
<p class="tracking-wide">Lorem ipsum dolor sit amet. Wide letter spacing.</p>
{% endcapture %}
{% include example.html code=code %}


## Line height

Control the leading (line height) of an element.

{% capture code %}
<p class="lh-1">Lorem ipsum dolor sit amet.<br>Dolor sit amet.</p>
<p class="lh-sm">Lorem ipsum dolor sit amet.<br>Dolor sit amet.</p>
<p class="lh-base">Lorem ipsum dolor sit amet.<br>Dolor sit amet.</p>
<p class="lh-lg">Lorem ipsum dolor sit amet.<br>Dolor sit amet.</p>
{% endcapture %}
{% include example.html code=code %}


## Antialiasing

Control the font smoothing of an element.

Use the `.antialiased` utility to render text using subpixel antialiasing or use the `.subpixel-antialiased` utility to remove antialiasing.

{% capture code %}
<div class="antialiased">Text with antialiasing</div>
<div class="subpixel-antialiased">Text without antialiasing</div>
{% endcapture %}
{% include example.html code=code %}


## Markdown elements

If you can't use the CSS classes you want or if you just want to use HTML tags, use the `.markdown` class in a container. It can handle almost any HTML tag.

{% capture code %}
<div class="markdown">
   <h1>Hello World</h1>
   <p>Lorem ipsum<sup><a>[1]</a></sup> dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque. Sub<sub>script</sub> works as well!</p>
   <h2>Second level</h2>
   <p>Curabitur accumsan turpis pharetra <strong>augue tincidunt</strong> blandit. Quisque condimentum maximus mi, sit amet commodo arcu rutrum id. Proin pretium urna vel cursus venenatis. Suspendisse potenti. Etiam mattis sem rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut et neque nisl.</p>
   <ul>
      <li>In fermentum leo eu lectus mollis, quis dictum mi aliquet.</li>
      <li>Morbi eu nulla lobortis, lobortis est in, fringilla felis.</li>
      <li>Aliquam nec felis in sapien venenatis viverra fermentum nec lectus.</li>
      <li>Ut non enim metus.</li>
   </ul>
</div>
{% endcapture %}
{% include example.html code=code %}
