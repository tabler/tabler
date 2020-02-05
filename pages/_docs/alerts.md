---
title: Alerts
menu: docs.alerts
description: Bootstrap provides an easy way to create predefined alert messages.
bootstrap-link: components/alerts/
done: true
---

### Default markup

description here

22222 test mmmm 2222

{% example %}
{% for variant in site.variants %}
	{% capture variant-text %}
		This is a {{ variant.name }} alert — check it out!
	{% endcapture %}
	{% include ui/alert.html type=variant.name text=variant-text %}
{% endfor %}
{% endexample %}


### Alert Links

Add the `alert-link` class to any links inside the alert box to create "matching colored links":

{% example %}
{% for variant in site.variants %}
	{% capture variant-text %}
		This is a {{ variant.name }} alert — <a href="#" class="alert-link">check it out</a>!
	{% endcapture %}
	{% include ui/alert.html type=variant.name text=variant-text %}
{% endfor %}
{% endexample %}


### Dismissible Alerts

{% example %}
{% for variant in site.variants %}
	{% capture variant-text %}
		This is a {{ variant.name }} alert — check it out!
	{% endcapture %}
	{% include ui/alert.html type=variant.name text=variant-text close=true %}
{% endfor %}
{% endexample %}

### Alerts with icons

{% example %}
{% for variant in site.variants %}
	{% capture variant-text %}
		This is a {{ variant.name }} alert — check it out!
	{% endcapture %}
	{% include ui/alert.html type=variant.name icon=variant.icon text=variant-text %}
{% endfor %}
{% endexample %}

### Alert with avatar
{% example %}
{% for variant in site.variants %}
	{% capture variant-text %}
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
	{% endcapture %}
	{% include ui/alert.html type=variant.name text=variant-text person-id=forloop.index %}
{% endfor %}
{% endexample %}

### Alert with buttons
{% example %}
 {% capture variant-text %}
 	<h3>Some Title</h3>
 	<p>Lorem ipsum Minim ad pariatur eiusmod ea ut nulla aliqua est quis id dolore minim voluptate.</p>
 {% endcapture %}
 {% include ui/alert.html type='success' close=true text=variant-text buttons=true %}
{% endexample %}

