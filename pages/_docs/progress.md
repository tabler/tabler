---
title: Progress
description: A progress bar can be used to show a user how far along he is in a process.
bootstrap-link: components/progress
done: true
---


## Default markup

To create a default progress bar, add a `.progress` class to a `<div>` element:

{% capture code %}
{% include ui/progress.html %}
{% endcapture %}
{% include example.html code=code %}


## Progress size

Using Bootstrap’s typical naming structure, you can create a standard progress, or scale it up to different sizes based on what’s needed.

{% capture code %}
{% include ui/progress.html value=57 size="sm" %}
{% endcapture %}
{% include example.html code=code %}


## Progress without value

Remove the showed value by adding a class called `.sr-only`.

{% capture code %}
{% include ui/progress.html value=75 show-value=false %}
{% endcapture %}
{% include example.html code=code %}


## Indeterminate progress

To create indeterminate progress add `.progress-bar-indeterminate` to the `.progress-bar` element.

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

Customize the color of the progress bar. You can click [here]({% docs_url colors %}) to see the list of available colors.

{% capture code %}
{% include ui/progress.html size="sm" color="red" class="mb-2" value=24 %} 
{% include ui/progress.html size="sm" color="green" class="mb-2" value=45 %} 
{% include ui/progress.html size="sm" color="purple" class="mb-2" value=64 %} 
{% include ui/progress.html size="sm" color="pink" %} 
{% endcapture %}
{% include example.html code=code %}
