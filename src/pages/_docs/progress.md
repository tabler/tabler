---
title: Progress bars
description: Progress bars are used to provide feedback on an action status and inform users of the current progress. Although seemingly small interface elements, they are extremely hepful in managing users' expectations and preventing them from abandoning a process they have initiated.
bootstrap-link: components/progress
menu: docs.components.progress
---


## Default markup

To create a default progress bar, add a `.progress` class to a `<div>` element. Thanks to that, you will be able to notify users how long they have to wait for a process to complete.

{% capture code %}
{% include ui/progress.html %}
{% endcapture %}
{% include example.html code=code %}


## Progress size

Using Bootstrap’s typical naming structure, you can create a standard progress bar or scale it up or down to different sizes based on what’s needed.

{% capture code %}
{% include ui/progress.html value=57 size="sm" %}
{% endcapture %}
{% include example.html code=code %}


## Progress without value

Remove the displayed value by adding the `.visually-hidden` class.

{% capture code %}
{% include ui/progress.html value=75 show-value=false %}
{% endcapture %}
{% include example.html code=code %}


## Indeterminate progress

You can create a progress bar which shows indeterminate progress by adding `.progress-bar-indeterminate` to the `.progress-bar` element.

{% capture code %}
{% include ui/progress.html indeterminate=true size="sm" %}
{% endcapture %}
{% include example.html code=code %}


## Native progress element

You can also use native HTML5 `<progress>` element.

{% capture code %}
<progress class="progress progress-sm" value="15" max="100"/>
{% endcapture %}
{% include example.html code=code %}


## Progress color

Customize the color of the progress bar to suit your design. Click [here]({% docs_url colors %}) to see the list of available colors.

{% capture code %}
{% include ui/progress.html size="sm" color="red" class="mb-2" value=24 %} 
{% include ui/progress.html size="sm" color="green" class="mb-2" value=45 %} 
{% include ui/progress.html size="sm" color="purple" class="mb-2" value=64 %} 
{% include ui/progress.html size="sm" color="pink" %} 
{% endcapture %}
{% include example.html code=code %}
