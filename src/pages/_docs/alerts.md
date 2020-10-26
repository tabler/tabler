---
title: Alerts
menu: docs.alerts
description: Alert messages are used to inform users of the status of their action and help them solve any problems that might have occurred. Good design of alert modals is very important for the overall user experience of a website or app.
bootstrap-link: components/alerts/
---


## Default markup

Depending on the information you need to convey, you can use one of the following types of alert messages - **success**, **info**, **warning** or **danger**. Using the right type of alert modal will help draw users' attention to the message and prompt them to take action. 

{% capture code %}
{% for variant in site.variants %}
	{% capture variant-text %}
		This is a {{ variant.name }} alert — check it out!
	{% endcapture %}
	{% include ui/alert.html type=variant.name text=variant-text %}
{% endfor %}
{% endcapture %}
{% include example.html code=code %}


## Alert links

Add a link to your alert message to redirect users to the details they need to complete or additional information they should read.   

{% capture code %}
{% for variant in site.variants %}
	{% capture variant-text %}
		This is a {{ variant.name }} alert — <a href="#" class="alert-link">check it out</a>!
	{% endcapture %}
	{% include ui/alert.html type=variant.name text=variant-text %}
{% endfor %}
{% endcapture %}
{% include example.html code=code %}


## Dismissible alerts

Add the `x` close button to make an alert modal dismissible. Thanks to that, your alert modal will disappear only once the user closes it. 

{% capture code %}
{% for variant in site.variants %}
	{% capture variant-text %}
		This is a {{ variant.name }} alert — check it out!
	{% endcapture %}
	{% include ui/alert.html type=variant.name text=variant-text close=true %}
{% endfor %}
{% endcapture %}
{% include example.html code=code %}


## Alerts with icons

Add an icon to your alert modal to make it more user-friendly and help users easily identify the message.

{% capture code %}
{% for variant in site.variants %}
	{% capture variant-text %}
		This is a {{ variant.name }} alert — check it out!
	{% endcapture %}
	{% include ui/alert.html type=variant.name icon=variant.icon text=variant-text %}
{% endfor %}
{% endcapture %}
{% include example.html code=code %}


## Alert with avatar

Add an avatar to your alert modal to make it more personalized. 

{% capture code %}
{% for variant in site.variants %}
	{% capture variant-text %}
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
	{% endcapture %}
	{% include ui/alert.html type=variant.name text=variant-text person-id=forloop.index %}
{% endfor %}
{% endcapture %}
{% include example.html code=code %}


## Alert with buttons

Add primary and secondary buttons to your alert modals if you want users to take a particular action based on the information included in the modal message. 

{% capture code %}
{% capture variant-text %}
 	<h3>Some Title</h3>
 	<p>Lorem ipsum Minim ad pariatur eiusmod ea ut nulla aliqua est quis id dolore minim voluptate.</p>
 {% endcapture %}
 {% include ui/alert.html type='success' close=true text=variant-text buttons=true %}
{% endcapture %}
{% include example.html code=code %}

