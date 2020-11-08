---
title: Tabs
menu: docs.components.tabs
description: Tabs allow users to alternate between equally important views within the same context. By dividing content into meaningful sections, they improve its organization and make it easy for users to navigate.
bootstrap-link: components/navs/
---


## Default markup

Use tabs to let users access different sections within one context quickly and with ease. In the default design, the current tab is highlighted, which makes the interface clear and user-friendly.

{% capture code %}
{% include cards/tabs.html id="ex1" %}
{% endcapture %}
{% include example.html code=code columns=1 %}


## Tabs with icons

Add icons to your tab labels, if you want to use a visual element and make the tab content easier to identify. 

{% capture code %}
{% include cards/tabs.html icons=true settings=true id="ex2" %}
{% endcapture %}
{% include example.html code=code columns=1 %}


## Tabs only with icons

Use tabs without label names to save space and make the tab content easy to recognize for international users. 

{% capture code %}
{% include cards/tabs.html icons=true settings=true hide-text=true id="ex3" %}
{% endcapture %}
{% include example.html code=code columns=1 %}


## Tabs with dropdown

Make one or more of your tabs into a dropdown to add more options within one element. 

{% capture code %}
{% include cards/tabs.html dropdown=true id="ex4" %}
{% endcapture %}
{% include example.html code=code columns=1 %}


## Full-width tabs

Add the `nav-fill` class to make the tabs take up the full space of the parent element.

{% capture code %}
{% include cards/tabs.html justified=true icons=true hide-text=true activity=true id="ex5" %}
{% endcapture %}
{% include example.html code=code columns=1 %}


## Alternate style

Use the `nav-tabs-alt` class to make the labels display in capital letters.

{% capture code %}
{% include cards/tabs.html icons=true alternative=true settings=true id="ex6" %}
{% endcapture %}
{% include example.html code=code columns=1 %}
