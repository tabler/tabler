---
title: Tags
icon: fe fe-tag
description: Small tag labels to insert anywhere
---

### Default tag

{% example html wrapper=tags %}
<span class="tag">First tag</span>
<span class="tag">Second tag</span>
<span class="tag">Third tag</span>
{% endexample %}

### Link tag

{% example html wrapper=tags %}
<a href="#" class="tag">First tag</a>
<a href="#" class="tag">Second tag</a>
<a href="#" class="tag">Third tag</a>
{% endexample %}

### Rounded tag

{% example html wrapper=tags %}
<span class="tag tag-rounded">First tag</span>
<span class="tag tag-rounded">Second tag</span>
<span class="tag tag-rounded">Third tag</span>
{% endexample %}

### Color tag

{% example html wrapper=tags %}
{% for color in site.colors %}
<span class="tag tag-{{ color[0] }}">{{ color[1].name }} tag</span>
{% endfor %}
{% endexample %}

### Avatar tag

{% example html wrapper=tags %}
{% for user in site.data.users limit: 8 %}
<span class="tag">
  <span class="tag-avatar avatar" style="background-image: url({{ site.base }}/{{ user.photo }})"></span>
  {{ user.name }}
</span>
{% endfor %}
{% endexample %}

### List of tags

You can create a list of tags with the `.tags` container.

{% example html %}
<div class="tags">
  <span class="tag">First tag</span>
  <span class="tag">Second tag</span>
  <span class="tag">Third tag</span>
</div>
{% endexample %}

If the list is very long, it will automatically wrap on multiple lines, while keeping all tags evenly spaced.

{% example html %}
<div class="tags">
  <span class="tag">One</span>
  <span class="tag">Two</span>
  <span class="tag">Three</span>
  <span class="tag">Four</span>
  <span class="tag">Five</span>
  <span class="tag">Six</span>
  <span class="tag">Seven</span>
  <span class="tag">Eight</span>
  <span class="tag">Nine</span>
  <span class="tag">Ten</span>
  <span class="tag">Eleven</span>
  <span class="tag">Twelve</span>
  <span class="tag">Thirteen</span>
  <span class="tag">Fourteen</span>
  <span class="tag">Fifteen</span>
  <span class="tag">Sixteen</span>
  <span class="tag">Seventeen</span>
  <span class="tag">Eighteen</span>
  <span class="tag">Nineteen</span>
  <span class="tag">Twenty</span>
</div>
{% endexample %}


### Tag remove

{% example html %}
<div class="tags">
  <span class="tag">
    One 
    <a href="javascript:void(0)" class="tag-addon"><i class="fe fe-x"></i></a>
  </span>
  <span class="tag">
    Two 
    <a href="javascript:void(0)" class="tag-addon"><i class="fe fe-x"></i></a>
  </span>
  <span class="tag">
    Three 
    <a href="javascript:void(0)" class="tag-addon"><i class="fe fe-x"></i></a>
  </span>
  <span class="tag">
    Four 
    <a href="javascript:void(0)" class="tag-addon"><i class="fe fe-x"></i></a>
  </span>
</div>
{% endexample %}

### Tag addons

{% example html wrapper=tags %}
<div class="tag">
  npm
  <a href="#" class="tag-addon"><i class="fe fe-x"></i></a>
</div>
<div class="tag tag-danger">
  npm
  <span class="tag-addon"><i class="fe fe-activity"></i></span>
</div>
<div class="tag">
  bundle
  <span class="tag-addon tag-success">passing</span>
</div>
<span class="tag tag-dark">
  CSS gzip size
  <span class="tag-addon tag-warning">20.9 kB</span>
</span>
{% endexample %}