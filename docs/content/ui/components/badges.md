---
title: Badges
summary: Badges are small count and labeling components, which are used to add extra information to an interface element. You can use them to draw users' attention to a new element, notify about unread messages or provide any kind of additional info.
description: Add extra information with badges.
bootstrapLink: components/badge/
---

## Default markup

The default badges are square and come in the basic set of colors.

{% capture html -%}
<div class="badges-list">
{% for color in site.colors -%}
{% include "ui/badge.html" color=color[0] text=color[1].title %}
{%- endfor -%}
</div>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Headings

Badges can be used in headings to draw attention to new or important information. You can use them in any heading level, from `<h1>` to `<h6>`. The example below shows how to use badges in headings.

{% capture html -%}
<h1>
  Example heading 
  {% include "ui/badge.html" text="New" -%}
</h1>
<h2>
  Example heading 
  {% include "ui/badge.html" text="New" -%}
</h2>
<h3>
  Example heading 
  {% include "ui/badge.html" text="New" -%}
</h3>
<h4>
  Example heading 
  {% include "ui/badge.html" text="New" -%}
</h4>
<h5>
  Example heading 
  {% include "ui/badge.html" text="New" -%}
</h5>
<h6>
  Example heading 
  {% include "ui/badge.html" text="New" -%}
</h6>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Light versions of badges

You can use the `-lt` classes to create a light version of the badge. This is useful for creating a more subtle look.

For example you can use the `bg-blue-lt` class to create a light blue badge. If you add the `text-blue-lt-fg` class, the text will be blue as well.

{% capture html -%}
{%- for color in site.colors -%}
{% include "ui/badge.html" color=color[0] text=color[1].title light %}
{%- endfor -%}
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Pill badges

Use the `.badge-pill` class if you want to create a badge with rounded corners. Its width will adjust to the label text.

{% capture html -%}
{%- for color in site.colors -%}
{% include "ui/badge.html" color=color[0] text=color[1].title class="badge-pill" %}
{%- endfor -%}
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

You can use it to create a pill with numbers, for example, to show the number of unread messages. The badge will adjust its width to the number of digits.

{% capture html -%}
{%- for color in site.colors -%}
{% include "ui/badge.html" color=color[0] text=forloop.index class="badge-pill" %}
{%- endfor -%}
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Badges with icons

You can use icons in badges to make them more visually appealing. The example below demonstrates how to use icons in badges.

{% capture html -%}
{% include "ui/badge.html" text="Star" icon="star" -%}
{% include "ui/badge.html" text="Heart" icon="heart" -%}
{% include "ui/badge.html" text="Check" icon="check" -%}
{% include "ui/badge.html" text="X" icon="x" -%}
{% include "ui/badge.html" text="Plus" icon="plus" -%}
{% include "ui/badge.html" text="Minus" icon="minus" -%}
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

You can also use an icon on the right side of the badge. The example below demonstrates how to use icons on the right side of badges.

{% capture html -%}
{% include "ui/badge.html" text="Star" icon-end="arrow-right" -%}
{% include "ui/badge.html" text="Heart" icon-end="arrow-right" -%}
{% include "ui/badge.html" text="Check" icon-end="arrow-right" -%}
{% include "ui/badge.html" text="X" icon-end="arrow-right" -%}
{% include "ui/badge.html" text="Plus" icon-end="arrow-right" -%}
{% include "ui/badge.html" text="Minus" icon-end="arrow-right" -%}
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Links

Place the badge within an `<a>` element if you want it to perform the function of a link and make it clickable.

{% capture html -%}
<a href="#" class="badge bg-blue-lt">Blue</a>
<a href="#" class="badge bg-azure-lt">Azure</a>
<a href="#" class="badge bg-indigo-lt">Indigo</a>
<a href="#" class="badge bg-purple-lt">Purple</a>
<a href="#" class="badge bg-pink-lt">Pink</a>
<a href="#" class="badge bg-red-lt">Red</a>
<a href="#" class="badge bg-orange-lt">Orange</a>
<a href="#" class="badge bg-yellow-lt">Yellow</a>
<a href="#" class="badge bg-lime-lt">Lime</a>
<a href="#" class="badge bg-green-lt">Green</a>
<a href="#" class="badge bg-teal-lt">Teal</a>
<a href="#" class="badge bg-cyan-lt">Cyan</a>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Button with badge

Badges can be used as parts of links or buttons to provide, for example, a counter. Use the `.badge-notification` class to create a notification badge. This class will position the badge in the top right corner of the button.

If you don't provide text for the badge, you end up with a small dot. This is useful for creating a simple notification button.

{% capture html -%}
<button type="button" class="btn">
	Notifications {% include "ui/badge.html" text="2" color="red" class="ms-2" -%}
</button>
<button type="button" class="btn">
  Inbox {% include "ui/badge.html" text="4" color="red" class="badge-notification" -%}
</button>
<button type="button" class="btn">
  Profile {% include "ui/badge.html" text="" color="red" class="badge-notification" -%}
</button>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Animated badges

You can use the `.badge-blink` class to create a blinking effect. This class will add a CSS animation to the badge, so it will blink to draw attention.

{% capture html -%}
<button type="button" class="btn">
  Profile {% include "ui/badge.html" text="" color="red" class="badge-notification badge-blink" -%}
</button>
{% endcapture %}
{% include "docs/example.html" html=html centered %}

## Size Options

Use `.badge-sm` or `.badge-lg` to change badge size according to your needs. The default size is `.badge` and it is used in the examples above.

{% capture html -%}
<div>
  {% include "ui/badge.html" color="primary" scale="sm" text="New" class="badge-sm" -%}
  {% include "ui/badge.html" color="primary" scale="sm" text="1" class="badge-pill" -%}
</div>
<div>
  {% include "ui/badge.html" color="primary" text="New" class="badge-sm" -%}
  {% include "ui/badge.html" color="primary" text="1" class="badge-pill" -%}
</div>
<div>
  {% include "ui/badge.html" color="primary" scale="lg" text="New" class="badge-sm" -%}
  {% include "ui/badge.html" color="primary" scale="lg" text="1" class="badge-pill" -%}
</div>
{%- endcapture %}
{% include "docs/example.html" html=html centered vertical %}


## More examples 

If you want to see more examples of badges, you can check out the [Bootstrap documentation](https://getbootstrap.com/docs/5.3/components/badge/) for badges. You can also find more examples in the Tabler [Badges](https://preview.tabler.io/badges.html) preview.