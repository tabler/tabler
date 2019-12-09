---
title: Tabs
menu: docs.tabs
bootstrap-link: https://getbootstrap.com/docs/4.4/components/navs/
---

### Default markup

{% example html columns=1 %}
{% include cards/tabs.html id="ex1" %}
{% endexample %}

### Tabs with icons

{% example html columns=1 %}
{% include cards/tabs.html icons=true settings=true id="ex2" %}
{% endexample %}

### Tabs only with icons

{% example html columns=1 %}
{% include cards/tabs.html icons=true settings=true hide-text=true id="ex3" %}
{% endexample %}

### Tabs with dropdown

{% example html columns=1 %}
{% include cards/tabs.html dropdown=true id="ex4" %}
{% endexample %}

### Full-width tabs

{% example html columns=1 %}
{% include cards/tabs.html justified=true icons=true hide-text=true activity=true id="ex5" %}
{% endexample %}

### Alternate style

{% example html columns=1 %}
{% include cards/tabs.html icons=true alternative=true settings=true id="ex6" %}
{% endexample %}
