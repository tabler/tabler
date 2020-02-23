---
title: Tabs
menu: docs.tabs
bootstrap-link: components/navs/
---


## Default markup

{% capture code %}
{% include cards/tabs.html id="ex1" %}
{% endcapture %}
{% include example.html code=code columns=1 %}


## Tabs with icons

{% capture code %}
{% include cards/tabs.html icons=true settings=true id="ex2" %}
{% endcapture %}
{% include example.html code=code columns=1 %}


## Tabs only with icons

{% capture code %}
{% include cards/tabs.html icons=true settings=true hide-text=true id="ex3" %}
{% endcapture %}
{% include example.html code=code columns=1 %}


## Tabs with dropdown

{% capture code %}
{% include cards/tabs.html dropdown=true id="ex4" %}
{% endcapture %}
{% include example.html code=code columns=1 %}


## Full-width tabs

{% capture code %}
{% include cards/tabs.html justified=true icons=true hide-text=true activity=true id="ex5" %}
{% endcapture %}
{% include example.html code=code columns=1 %}


## Alternate style

{% capture code %}
{% include cards/tabs.html icons=true alternative=true settings=true id="ex6" %}
{% endcapture %}
{% include example.html code=code columns=1 %}
