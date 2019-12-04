---
title: Badges
menu: docs.badges
description: A small count and labeling component.
bsLink: https://getbootstrap.com/docs/4.4/components/badge/
done: true
---

### Default markup

{% example %}
{% for color in site.colors %}
<span class="badge bg-{{ color[0] }}">{{ color[0] }}</span>
{% endfor %}
{% endexample %}

### Pill badges

{% example %}
{% for color in site.colors %}
<span class="badge badge-pill bg-{{ color[0] }}">{{ forloop.index }}</span>
{% endfor %}
{% endexample %}


### Soft badges

{% example %}
{% for color in site.colors %}
<span class="badge bg-{{ color[0] }}-lt">{{ color[0] }}</span>
{% endfor %}
{% endexample %}


### Links

{% example %}
{% for color in site.colors %}
<a href="#" class="badge bg-{{ color[0] }}">{{ color[0] }}</a>
{% endfor %}
{% endexample %}


### Empty badges

{% example %}
{% for color in site.colors %}
<a href="#" class="badge bg-{{ color[0] }}"></a>
{% endfor %}
{% endexample %}
