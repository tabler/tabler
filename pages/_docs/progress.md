---
title: Progress
description: A progress bar can be used to show a user how far along he is in a process.
bootstrap-link: https://getbootstrap.com/docs/4.4/components/progress/
---

### Default markup

To create a default progress bar, add a `.progress` class to a `<div>` element:

{% example html %}
{% include ui/progress.html %}
{% endexample %}

### Progress size

Using Bootstrap’s typical naming structure, you can create a standard progress, or scale it up to different sizes based on what’s needed.

{% example html %}
{% include ui/progress.html value=57 size="sm" %}
{% endexample %}

### Progress without value

Remove the showed value by adding a class called `.sr-only`.

{% example html %}
{% include ui/progress.html value=75 show-value=false %}
{% endexample %}

### Indeterminate progress

To create indeterminate progress add `.progress-bar-indeterminate` to the `.progress-bar` element.

{% example html %}
{% include ui/progress.html indeterminate=true size="sm" %}
{% endexample %}

### Native progress element

You can also use native HTML5 `<progress>` element.

{% example html %}
<progress class="progress progress-sm" value="15" max="100"/>
{% endexample %}

### Progress color

Customize the color of the progress bar. You can click [here]({% docs_url colors %}) to see the list of available colors.

{% example %}
{% include ui/progress.html size="sm" color="purple"%} 
{% endexample %}