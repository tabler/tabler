---
title: Badges
menu: docs.components.badges
description: Badges are small count and labeling components, which are used to add extra information to an interface element. You can use them to draw users' attention to a new element, notify about unread messages or provide any kind of additional info.
bootstrap-link: components/badge/
---


## Default markup

The default badges are square and come in the basic set of colors. 

{% capture code %}
{% for color in site.colors %}
<span class="badge bg-{{ color[0] }}">{{ color[0] }}</span>
{% endfor %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Pill badges

Use the `.bagde-pill` class if you want to create a badge with rounded corners. Its width will adjust to the label text.

{% capture code %}
{% for color in site.colors %}
<span class="badge badge-pill bg-{{ color[0] }}">{{ forloop.index }}</span>
{% endfor %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Soft color badges

You can create a soft colour variant of a corresponding contextual badge variation, to make it look more subtle. Click [here]({% docs_url colors %}) to see the list of available colors and choose ones that best suit your design.

{% capture code %}
{% for color in site.colors %}
<span class="badge bg-{{ color[0] }}-lt">{{ color[0] }}</span>
{% endfor %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Links

Place the badge within an `<a>` element if you want it to perform the function of a link and make it clickable.

{% capture code %}
{% for color in site.colors %}
<a href="#" class="badge bg-{{ color[0] }}">{{ color[0] }}</a>
{% endfor %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Empty badges

Leave the HTML element empty if you want to create badges without any text. Empty badges are particularly useful if you want to make an interface element more noticeable regardless of limited space.

{% capture code %}
{% for color in site.colors %}
<a href="#" class="badge bg-{{ color[0] }}"></a>
{% endfor %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Badge avatars

Create the `.badge-avatar` class to add an avatar that will make a badge more personalized.

{% capture code %}
{% include ui/badge.html person-id=1 %}
{% include ui/badge.html person-id=2 %}
{% include ui/badge.html person-id=3 %}
{% include ui/badge.html person-id=4 %}
{% include ui/badge.html person-id=5 %}
{% endcapture %}
{% include example.html code=code %}

## Button with badge

Badges can be used as part of links or buttons to provide a counter.

{% capture code %}
<button type="button" class="btn">
  Notifications <span class="badge bg-red ms-2">4</span>
</button>
<button type="button" class="btn">
  Notifications <span class="badge bg-green ms-2">4</span>
</button>
{% endcapture %}
{% include example.html code=code wrapper="btn-list" %}