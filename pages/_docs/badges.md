---
title: Badges
menu: docs.badges
description: A small count and labeling component.
bootstrap-link: components/badge/
done: true
---

### Default markup

{% capture code %}
{% for color in site.colors %}
<span class="badge bg-{{ color[0] }}">{{ color[0] }}</span>
{% endfor %}
{% endcapture %}
{% include example.html code=code %}

### Pill badges

To make a pill bagde (with rounded corners) add `.bagde-pill` class.

{% capture code %}
{% for color in site.colors %}
<span class="badge badge-pill bg-{{ color[0] }}">{{ forloop.index }}</span>
{% endfor %}
{% endcapture %}
{% include example.html code=code %}


### Soft badges

Creates a soft variant of a corresponding contextual badge variation. You can click [here]({% docs_url colors %}) to see the list of available colors.

{% capture code %}
{% for color in site.colors %}
<span class="badge bg-{{ color[0] }}-lt">{{ color[0] }}</span>
{% endfor %}
{% endcapture %}
{% include example.html code=code %}


### Links

Make a badge work as a link by putting it into an `<a>` element.

{% capture code %}
{% for color in site.colors %}
<a href="#" class="badge bg-{{ color[0] }}">{{ color[0] }}</a>
{% endfor %}
{% endcapture %}
{% include example.html code=code %}


### Empty badges

If you don't want your badge to contain any text you can do it by leaving the html element empty.

{% capture code %}
{% for color in site.colors %}
<a href="#" class="badge bg-{{ color[0] }}"></a>
{% endfor %}
{% endcapture %}
{% include example.html code=code %}
