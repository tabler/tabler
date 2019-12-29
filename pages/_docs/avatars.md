---
title: Avatars
menu: docs.avatars
description: Create and group avatars of various shapes and sizes with one component.
done: true
---

### Default markup

{% example html wrapper=avatar-list %}
{% include_cached ui/avatar.html person-id=1 %}
{% include_cached ui/avatar.html person-id=2 %}
{% include_cached ui/avatar.html person-id=3 %}
{% endexample %}

### Avatar image

Set an image as the background.

{% example html wrapper=avatar-list %}
{% include_cached ui/avatar.html person-id=1 %}
{% include_cached ui/avatar.html person-id=3 %}
{% include_cached ui/avatar.html person-id=4 %}
{% endexample %}

### Initials

You can easily use initials instead of images.

{% example html wrapper=avatar-list %}
{% include_cached ui/avatar.html placeholder="AB" %}
{% include_cached ui/avatar.html placeholder="CD" %}
{% include_cached ui/avatar.html placeholder="EF" %}
{% include_cached ui/avatar.html placeholder="GH" %}
{% include_cached ui/avatar.html placeholder="IJ" %}
{% endexample %}

### Avatar icons

You can also use icons in avatars.

{% example html wrapper=avatar-list %}
{% include_cached ui/avatar.html icon="user" %}
{% include_cached ui/avatar.html icon="plus" %}
{% include_cached ui/avatar.html icon="user-plus" %}
{% endexample %}

### Avatar initials color

Customize the color of the avatars' background. You can click [here]({% docs_url colors %}) to see the list of available colors.

{% example html wrapper=avatar-list %}
{% include_cached ui/avatar.html placeholder="AB" color="green" %}
{% include_cached ui/avatar.html placeholder="CD" color="red" %}
{% include_cached ui/avatar.html placeholder="EF" color="yellow" %}
{% include_cached ui/avatar.html placeholder="GH" color="blue" %}
{% include_cached ui/avatar.html placeholder="IJ" color="purple" %}
{% endexample %}

### Avatar size

Using Bootstrap’s typical naming structure, you can create a standard avatar, or scale it up to different sizes based on what’s needed.

{% example html wrapper=avatar-list %}
{% include_cached ui/avatar.html person-id=10 size="xl" %}
{% include_cached ui/avatar.html person-id=9 size="lg" %}
{% include_cached ui/avatar.html person-id=8 size="md" %}
{% include_cached ui/avatar.html person-id=7 %}
{% include_cached ui/avatar.html person-id=6 size="sm" %}
{% endexample %}

### Avatar status

Add an online or offline status indicator to show user's availability.

{% example html wrapper=avatar-list %}
{% include_cached ui/avatar.html person-id=11 %}
{% include_cached ui/avatar.html person-id=12 status="danger" %}
{% include_cached ui/avatar.html person-id=13 status="success" %}
{% include_cached ui/avatar.html person-id=14 status="warning" %}
{% include_cached ui/avatar.html person-id=15 status="info" %}
{% include_cached ui/avatar.html person-id=16 status="gray" status-text="5" %}
{% endexample %}

### Avatar shape

Change the shape of an avatar with the default Bootstrap image classes.

{% example html wrapper=avatar-list %}
{% include_cached ui/avatar.html person-id=17 %}
{% include_cached ui/avatar.html person-id=18 shape="rounded" %}
{% include_cached ui/avatar.html person-id=19 shape="rounded-circle" %}
{% include_cached ui/avatar.html person-id=20 shape="rounded-0" %}
{% include_cached ui/avatar.html person-id=21 shape="rounded-lg" %}
{% endexample %}

### Avatars list

You can easily create a list of avatars.

{% example %}
{% include ui/avatar-list.html %}
{% endexample %}

### Stacked list

Make the list stack when it reaches a certain length.

{% example %}
<div class="avatar-list avatar-list-stacked">
  {% for person in site.data.people limit: 5 offset: 30 %}
  {% include_cached ui/avatar.html person=person element="a" %}
  {% endfor %}
  <span class="avatar" element="a">+8</span>
</div>
{% endexample %}
