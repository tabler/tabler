---
title: Icons
description: Use icons anywhere you like!
bootstrap-link: extend/icons/
---

If you want to **choose the one you like** go [**here** {% include ui/icon.html icon="search" class="icon-sm" %}](/docs/icons.html#icons)

### Icon size

Change icon size using:

- `.icon-xl`
- `.icon-lg`
- `.icon-md`
- `.icon-sm`
- `.icon-xs`

{% example %}
    {% include ui/icon.html icon="smile" class="icon-xl" %}
    {% include ui/icon.html icon="smile" class="icon-lg" %}
    {% include ui/icon.html icon="smile" class="icon-md" %}
    {% include ui/icon.html icon="smile" class="icon-sm" %}
    {% include ui/icon.html icon="smile" class="icon-xs" %}
{% endexample %}

### Icon thickness

Change icon thickness using:

- `.icon-thick`
- `.icon`
- `.icon-thin`

{% example %}
    {% include ui/icon.html icon="smile" class="icon-xl icon-thick" %}
    {% include ui/icon.html icon="smile" class="icon-xl" %}
    {% include ui/icon.html icon="smile" class="icon-xl icon-thin" %}
{% endexample %}

### Icon colors

Change icon color using `color` css property **or** use `text-*color*` classes that you can find [**here** {% include ui/icon.html icon="search" class="icon-sm" %}](/docs/colors.html).

{% example %}
    {% include ui/icon.html icon="smile" class="icon-xl text-red" %}
    {% include ui/icon.html icon="smile" class="icon-xl text-blue" %}
    {% include ui/icon.html icon="smile" class="icon-xl text-orange" %}
    {% include ui/icon.html icon="smile" class="icon-xl text-purple" %}
    {% include ui/icon.html icon="smile" class="icon-xl text-green" %}
{% endexample %}

## Icons

<div class="row" id="icons">
    {% include cards/icons.html title="Feather icons" group="fe" %}
</div>
<div class="row">
    {% include cards/icons.html title="Brand icons" group="brand" %}
</div>
<div class="row">
    {% include cards/icons.html title="Bootstrap icons" group="bootstrap" %}
</div>
