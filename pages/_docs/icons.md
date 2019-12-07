---
title: Icons
description: Use icons anywhere you like!
bootstrap-link: https://getbootstrap.com/docs/4.4/extend/icons/
---

If you want to **choose the one you like** go [**here** {% include_cached ui/icon.html icon="search" class="icon-sm2" %}](/docs/icons.html#icons)

### Icon size

Change icon size using:

- `.icon-lg3`
- `.icon-lg2`
- `.icon-lg`
- `.icon-md2`
- `.icon-md`
- `.icon-sm2`
- `.icon-sm`

{% example %}
    {% include_cached ui/icon.html icon="smile" class="icon-lg3" %}
    {% include_cached ui/icon.html icon="smile" class="icon-lg2" %}
    {% include_cached ui/icon.html icon="smile" class="icon-lg" %}
    {% include_cached ui/icon.html icon="smile" class="icon-md2" %}
    {% include_cached ui/icon.html icon="smile" class="icon-md" %}
    {% include_cached ui/icon.html icon="smile" class="icon-sm2" %}
    {% include_cached ui/icon.html icon="smile" class="icon-sm" %}
{% endexample %}

### Icon thickness

Change icon thickness using:

- `.icon-thick`
- `.icon`
- `.icon-thin`

{% example %}
    {% include_cached ui/icon.html icon="smile" class="icon-lg2 icon-thick" %}
    {% include_cached ui/icon.html icon="smile" class="icon-lg2" %}
    {% include_cached ui/icon.html icon="smile" class="icon-lg2 icon-thin" %}
{% endexample %}

### Icon colors

Change icon color using `color` css property **or** use `text-*color*` classes that you can find [**here** {% include_cached ui/icon.html icon="search" class="icon-sm2" %}](/docs/colors.html).

{% example %}
    {% include_cached ui/icon.html icon="smile" class="icon-lg2 text-red" %}
    {% include_cached ui/icon.html icon="smile" class="icon-lg2 text-blue" %}
    {% include_cached ui/icon.html icon="smile" class="icon-lg2 text-orange" %}
    {% include_cached ui/icon.html icon="smile" class="icon-lg2 text-purple" %}
    {% include_cached ui/icon.html icon="smile" class="icon-lg2 text-green" %}
{% endexample %}

## Icons

<div class="row" id="icons">
   {% include_cached cards/icons.html title="Feather icons" group="fe" %}
</div>
<div class="row">
    {% include_cached cards/icons.html title="Brand icons" group="brand" %}
</div>
