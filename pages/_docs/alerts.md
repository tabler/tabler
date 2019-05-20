---
title: Alerts
menu: docs.alerts
---

Bootstrap provides an easy way to create predefined alert messages.

## Default markup

{% example %}
{% for variant in site.variants %}
	{% capture variant-text %}
		This is a {{ variant.name }} alert — check it out!
	{% endcapture %}
	{% include ui/alert.html type=variant.name text=variant-text %}
{% endfor %}
{% endexample %}


## Alert Links

Add the `alert-link` class to any links inside the alert box to create "matching colored links":

{% example %}
{% for variant in site.variants %}
	{% capture variant-text %}
		This is a {{ variant.name }} alert — <a href="#">check it out!</a>
	{% endcapture %}
	{% include ui/alert.html type=variant.name text=variant-text %}
{% endfor %}
{% endexample %}


## Closing Alerts

{% example %}
{% for variant in site.variants %}
	{% capture variant-text %}
		This is a {{ variant.name }} alert — check it out!
	{% endcapture %}
	{% include ui/alert.html type=variant.name text=variant-text close=true %}
{% endfor %}
{% endexample %}

## Alerts with icons

{% example %}
{% for variant in site.variants %}
	{% capture variant-text %}
		This is a {{ variant.name }} alert — check it out!
	{% endcapture %}
	{% include ui/alert.html type=variant.name icon=variant.icon text=variant-text close=true %}
{% endfor %}
{% endexample %}
