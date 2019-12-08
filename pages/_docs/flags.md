---
title: Flags
menu: docs.flags
plugin: flags
done: true
---

### Flag

{% example html %}
{% include ui/flag.html flag="tg" class="mr-1" %}
{% include ui/flag.html flag="br" class="mr-1" %}
{% include ui/flag.html flag="pt" %}
{% endexample %}

### Flag sizes

Change the flag size. 

- `xl` - large
- `mr` - big
- `md` - medium

{% example html %}
{% include ui/flag.html flag="pl" class="flag-size-xl mr-1" %}
{% include ui/flag.html flag="pl" class="flag-size-lg mr-1" %}
{% include ui/flag.html flag="pl" class="flag-size-md" %}
{% include ui/flag.html flag="pl" class="mr-1" %}
{% endexample %}

### Types

To set the flag of the country you want add a class flag-(country name). For example to create a flag of Andorra your class should look like this: flag-ad.

<table>
{% for flag in site.data.flags %}
<tr>
<td>{% include ui/flag.html flag=flag.flag %}</td>
<td><code>{{ flag.flag }}</code></td>
<td>{{ flag.name }}</td>
</tr>
{% endfor %}
</table>
