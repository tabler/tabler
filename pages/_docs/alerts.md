---
title: Alerts
---

Bootstrap provides an easy way to create predefined alert messages.

## Default markup

{% example html %}
{% for variant in site.variants %}
	{% capture text_with_variant %}
		This is a {{ variant }} alert — check it out!
	{% endcapture %}
	{% include ui/alert.html type=variant text=text_with_variant %}
{% endfor %}
{% endexample %}


## Alert Links

Add the `alert-link` class to any links inside the alert box to create "matching colored links":

{% example html %}
{% for variant in site.variants %}
	{% capture text_with_variant %}
		This is a {{ variant }} alert — <a href="#">check it out!</a>
	{% endcapture %}
	{% include ui/alert.html type=variant text=text_with_variant %}
{% endfor %}
{% endexample %}


## Closing Alerts

{% example html %}
{% for variant in site.variants %}
	{% capture text_with_variant %}
		This is a {{ variant }} alert — check it out!
	{% endcapture %}
	{% include ui/alert.html type=variant text=text_with_variant close=true %}
{% endfor %}
{% endexample %}
