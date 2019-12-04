---
title: Ribbons
menu: docs.ribbons
new: true
---

### Default markup

{% example html columns=1 %}
{% include cards/ribbon.html %}
{% endexample %}

### Ribbon position

You can easily change the position of a ribbon by adding a class to the element.
<ul>
    <li><code>ribbon-top</code> - moves it to the top</li>
    <li><code>ribbon-right</code> - moves it to the right</li>
    <li><code>ribbon-bottom</code> - moves it to the bottom</li>
    <li><code>ribbon-left</code> - moves it to the lefg</li>
</ul>
You can also use multiple classes at once for example: <code><div class="ribbon ribbon-top ribbon-left"></div></code> moves the ribbon to the top left corner.

{% example html columns=1 %}
{% include cards/ribbon.html top=true left=true %}
{% endexample %}

### Ribbon color

Customize the ribbon's background color. You can click [here]({% docs_url colors %}) to see the list of available colors.

{% example html columns=1 %}
{% include cards/ribbon.html color="red" %}
{% endexample %}

### Ribbon text

Set your own text in a ribbon.

{% example html columns=1 %}
{% include cards/ribbon.html color="green" text="-50%" %}
{% endexample %}

### Ribbon style

Change the style of a ribbon. Available styles:
<ul>
    <li><code>ribbon-bookmark</code> - creates a indentation on the left</li>
</ul>

{% example html columns=1 %}
{% include cards/ribbon.html bookmark=true color="orange" text="-50%" %}
{% endexample %}
