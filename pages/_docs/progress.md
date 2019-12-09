---
title: Progress
description: A progress bar can be used to show a user how far along he is in a process.
---

### Default markup

To create a default progress bar, add a `.progress` class to a `<div>` element:

{% example %}
{% include ui/progress.html %}
{% endexample %}

### Small progress

{% example %}
{% include ui/progress.html value=57 size="sm" %}
{% endexample %}

### Progress with value

{% example %}
{% include ui/progress.html value=75 show-value=true %}
{% endexample %}

### Indeterminate progress

{% example %}
{% include ui/progress.html indeterminate=true size="sm" %}
{% endexample %}

### Native progress element

You can also use native HTML5 `<progress>` element.

{% example %}
<progress class="progress progress-sm" value="15" max="100" />
{% endexample %}
