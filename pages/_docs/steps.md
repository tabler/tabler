---
title: Steps
menu: docs.steps
new: true
---



Steps are progress indicators of a sequence of task steps.


## Default markup

{% capture code %}
{% include ui/steps.html show-title=true %}
{% endcapture %}
{% include example.html code=code %}


## Tooltips

{% capture code %}
{% include ui/steps.html show-title=true show-tooltip=true %}
{% endcapture %}
{% include example.html code=code %}


## Color

{% capture code %}
{% include ui/steps.html color="green" show-title=true %}
{% include ui/steps.html color="red" show-title=true %}
{% endcapture %}
{% include example.html code=code %}


## Steps without title

{% capture code %}
{% include ui/steps.html show-tooltip=true %}
{% endcapture %}
{% include example.html code=code %}


## Steps with numbers

{% capture code %}
{% include ui/steps.html count=5 active=2 numbers=true color="lime" %}
{% endcapture %}
{% include example.html code=code %}
