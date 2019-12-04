---
title: Badges
menu: docs.badges
description: A small count and labeling component.
done: true
---

### Default markup

{% example %}
{% for color in site.colors %}
<span class="badge text-white bg-{{ color[0] }}">{{ color[0] }}</span>
{% endfor %}
{% endexample %}

### Pill badges

To make a pill bagde (with rounded corners) add <code>.bagde-pill</code> class.

{% example %}
{% for color in site.colors %}
<span class="badge badge-pill text-white bg-{{ color[0] }}">{{ forloop.index }}</span>
{% endfor %}
{% endexample %}


### Soft badges

Creates a soft variant of a corresponding contextual badge variation. You can click [here]({% docs_url colors %}) to see the list of available colors.

{% example %}
{% for color in site.colors %}
<span class="badge bg-{{ color[0] }}-lt">{{ color[0] }}</span>
{% endfor %}
{% endexample %}


### Links

Make a badge work as a link by putting it into an <code>&lt;a&gt;</code> element.

{% example %}
{% for color in site.colors %}
<a href="#" class="badge bg-{{ color[0] }}">{{ color[0] }}</a>
{% endfor %}
{% endexample %}


### Empty badges

If you don't want your badge to contain any text you can do it by leaving the html element empty.

{% example %}
{% for color in site.colors %}
<a href="#" class="badge bg-{{ color[0] }}"></a>
{% endfor %}
{% endexample %}
