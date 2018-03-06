---
title: Colors
icon: fe fe-feather
description: Convey meaning through color with a handful of color utility classes.
---

### Contextual colors

A background fill can be applied to a container using one of the `.bg-[color]` classes.

{% example html %}
{% for color in site.theme-colors %}
<div class="d-flex align-items-center mb-4">
  <div class="w-7 h-7 bg-{{ color[0] }} rounded mr-4"></div>
  <div>
    <strong>{{ color[1].name }}</strong><br />
    <code>.bg-{{ color[0] }}</code>
  </div>
</div>
{% endfor %}
{% endexample %}

### Other colors

Instead of using contextual classes you can use ordinary color names.

{% example html %}
{% assign groups = site.colors | each_slice: 3 %}
<div class="row">
{% for group in groups %}
<div class="col-4">
{% for color in group %}
<div class="d-flex align-items-center mb-4">
  <div class="w-7 h-7 bg-{{ color[0] }} rounded mr-4"></div>
  <div>
    <strong>{{ color[1].name }}</strong><br />
    <code>.bg-{{ color[0] }}</code>
  </div>
</div>
{% endfor %}
</div>
{% endfor %}
</div>
{% endexample %}

### Tinting backgrounds

Translucent background fills to shade an element against a background. You can use one of few suffixes:  
`-darkest`, `-darker`, `-dark`, `-lightest`, `-lighter` or `-light`. 
 
{% example html %}
{% for variant in site.color_variants %}
<div class="d-flex align-items-center mb-4">
  <div class="w-7 h-7 bg-blue{{ variant.suffix }} rounded mr-4"></div>
  <div>
    <strong>{{ variant.name }} blue</strong><br />
    <code>.bg-blue{{ variant.suffix }}</code>
  </div>
</div>
{% endfor %}
{% endexample %}
