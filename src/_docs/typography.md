---
title: Typography
icon: fe fe-type
description: Documentation and examples for common text utilities to control alignment, wrapping, weight, and more.
---

### Text alignment

Easily realign text to components with text alignment classes.

{% example html %}
<p class="text-left">Left aligned text on all viewport sizes.</p>
<p class="text-center">Center aligned text on all viewport sizes.</p>
<p class="text-right">Right aligned text on all viewport sizes.</p>
<p class="text-justify">Both aligned text on all viewport sizes. Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.</p>
{% endexample %}

### Text transform

Transform text in components with text capitalization classes.

{% example html %}
<p class="text-lowercase">Lowercased text.</p>
<p class="text-uppercase">Uppercased text.</p>
<p class="text-capitalize">Capitalized text.</p>
{% endexample %}

### Letter spacing

Utilities for controlling the tracking (letter spacing) of an element.

{% example html %}
<p class="tracking-tight">Lorem ipsum dolor sit amet. Tight letter spacing.</p>
<p class="tracking-normal">Lorem ipsum dolor sit amet. Normal letter spacing.</p>
<p class="tracking-wide">Lorem ipsum dolor sit amet. Wide letter spacing.</p>
{% endexample %}

### Line Height

Utilities for controlling the leading (line height) of an element.

{% example html %}
<p class="leading-none">Lorem ipsum dolor sit amet.<br>Dolor sit amet.</p>
<p class="leading-tight">Lorem ipsum dolor sit amet.<br>Dolor sit amet.</p>
<p class="leading-normal">Lorem ipsum dolor sit amet.<br>Dolor sit amet.</p>
<p class="leading-loose">Lorem ipsum dolor sit amet.<br>Dolor sit amet.</p>
{% endexample %}

### Basic elements

When you can't use the CSS classes you want, or when you just want to directly use HTML tags, use `.text-wrap` as container. It can handle almost any HTML tag.

{% example html %}
<div class="text-wrap">
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
{% endexample %}