---
title: Avatars
icon: fe fe-user
---

### Simple avatar

{% example html wrapper=avatar-list %}
{% for user in site.data.users limit: 5 offset: 20 %}
<span class="avatar" style="background-image: url({{ site.base }}/{{ user.photo }})"></span>
{% endfor %}
{% endexample %}

### Avatar size

{% example html wrapper=avatar-list %}
<span class="avatar avatar-sm" style="background-image: url({{ site.base }}/{{ site.data.users[10].photo }})"></span>
<span class="avatar" style="background-image: url({{ site.base }}/{{ site.data.users[11].photo }})"></span>
<span class="avatar avatar-md" style="background-image: url({{ site.base }}/{{ site.data.users[12].photo }})"></span>
<span class="avatar avatar-lg" style="background-image: url({{ site.base }}/{{ site.data.users[13].photo }})"></span>
<span class="avatar avatar-xl" style="background-image: url({{ site.base }}/{{ site.data.users[14].photo }})"></span>
<span class="avatar avatar-xxl" style="background-image: url({{ site.base }}/{{ site.data.users[15].photo }})"></span>
{% endexample %}


### Avatar status

{% example html wrapper=avatar-list %}
<span class="avatar" style="background-image: url({{ site.base }}/{{ site.data.users[39].photo }})"></span>
<span class="avatar" style="background-image: url({{ site.base }}/{{ site.data.users[40].photo }})">
  <span class="avatar-status"></span>
</span>
<span class="avatar" style="background-image: url({{ site.base }}/{{ site.data.users[41].photo }})">
  <span class="avatar-status bg-red"></span>
</span>
<span class="avatar" style="background-image: url({{ site.base }}/{{ site.data.users[42].photo }})">
  <span class="avatar-status bg-green"></span>
</span>
<span class="avatar" style="background-image: url({{ site.base }}/{{ site.data.users[43].photo }})">
  <span class="avatar-status bg-yellow"></span>
</span>
{% endexample %}

### Avatar placeholder

{% example html wrapper=avatar-list %}
{% for user in site.data.users limit: 3 offset: 10 %}
<span class="avatar">{{ user.name | first_letter }}{{ user.surname | first_letter }}</span>
{% endfor %}
<span class="avatar avatar-placeholder"></span>
<span class="avatar"><i class="fe fe-more-horizontal"></i></span>
{% endexample %}

{% example html wrapper=avatar-list %}
{% for color in site.colors %}
{% assign user = site.data.users[forloop.index] %}
<span class="avatar avatar-{{ color[0] }}">{{ user.name | first_letter }}{{ user.surname | first_letter }}</span>
{% endfor %}
{% endexample %}

### Avatars list

{% example html %}
<div class="avatar-list">
{% for user in site.data.users limit: 5 offset: 20 %}
  <span class="avatar" style="background-image: url({{ site.base }}/{{ user.photo }})"></span>
{% endfor %}
</div>
{% endexample %}

{% example html %}
<div class="avatar-list avatar-list-stacked">
  {% for user in site.data.users limit: 5 offset: 30 %}
  <span class="avatar" style="background-image: url({{ site.base }}/{{ user.photo }})"></span>
  {% endfor %}
  <span class="avatar">+8</span>
</div>
{% endexample %}