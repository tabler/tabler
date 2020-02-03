---
title: Badges
menu: docs.badges
description: A small count and labeling component.
bootstrap-link: components/badge/
done: true
---

### Default markup

{% example %}
{% for color in site.colors %}
<span class="badge bg-{{ color[0] }}">{{ color[0] }}</span>
{% endfor %}
{% endexample %}

### Pill badges

To make a pill bagde (with rounded corners) add `.bagde-pill` class.

{% example %}
{% for color in site.colors %}
<span class="badge badge-pill bg-{{ color[0] }}">{{ forloop.index }}</span>
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

Make a badge work as a link by putting it into an `<a>` element.

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

### Badge addons

You can add badge addon by adding `.badge-addon` class.

{% example %}
{% include ui/badge.html text="task" color="green" addon="finished" %}
{% include ui/badge.html text="bundle" color="purple" addon="passing" %}
{% include ui/badge.html text="CSS gzip size" color="red-lt" addon="20.9kB" addon-color="red" %}
{% endexample %}

### Badge avatars

If you want to add an avatar to your badge just create `.badge-avatar` class.

{% example %}
{% include ui/badge.html person-id=1 color="blue" %}
{% include ui/badge.html person-id=2 color="blue" %}
{% include ui/badge.html person-id=3 color="blue" %}
{% include ui/badge.html person-id=4 color="blue" %}
{% include ui/badge.html person-id=5 color="blue" %}
{% endexample %}