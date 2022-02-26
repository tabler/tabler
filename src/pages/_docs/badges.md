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
<span class="badge bg-{{ color[0] }}">{{ color[1].title }}</span>
{% endfor %}
{% endcapture %}
{% include example.html code=code centered=true %}

## Headings

{% capture code %}
<h1>Example heading <span class="badge bg-secondary">New</span></h1>
<h2>Example heading <span class="badge bg-secondary">New</span></h2>
<h3>Example heading <span class="badge bg-secondary">New</span></h3>
<h4>Example heading <span class="badge bg-secondary">New</span></h4>
<h5>Example heading <span class="badge bg-secondary">New</span></h5>
<h6>Example heading <span class="badge bg-secondary">New</span></h6>
{% endcapture %}
{% include example.html code=code %}

## Outline badges

{% capture code %}
{% for color in site.colors %}
<span class="badge badge-outline text-{{ color[0] }}">{{ color[0] }}</span>
{% endfor %}
{% endcapture %}
{% include example.html code=code centered=true %}

## Pill badges

Use the `.badge-pill` class if you want to create a badge with rounded corners. Its width will adjust to the label text.

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
<span class="badge bg-{{ color[0] }}-lt">{{ color[1].title }}</span>
{% endfor %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Links

Place the badge within an `<a>` element if you want it to perform the function of a link and make it clickable.

{% capture code %}
{% for color in site.colors %}
<a href="#" class="badge bg-{{ color[0] }}">{{ color[1].title }}</a>
{% endfor %}
{% endcapture %}
{% include example.html code=code centered=true %}


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