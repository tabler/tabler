---
title: Avatars
menu: docs.components.avatars
description: Avatars help customise various elements of a user interface and make the product experience more personalised. They are often used in communication apps, collaboration tools and social media.
---


## Default markup

Use the `avatar` class to add an avatar to your interface design for greater customisation.

{% capture code %}
{% include ui/avatar.html person-id=1 %}
{% include ui/avatar.html person-id=2 %}
{% include ui/avatar.html person-id=3 %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Avatar image

Set an image as the background to make users easy to indentify and create a personalised experience.

{% capture code %}
{% include ui/avatar.html person-id=1 %}
{% include ui/avatar.html person-id=3 %}
{% include ui/avatar.html person-id=4 %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Initials

You can also use initials instead of pictures.

{% capture code %}
{% include ui/avatar.html placeholder="AB" %}
{% include ui/avatar.html placeholder="CD" %}
{% include ui/avatar.html placeholder="EF" %}
{% include ui/avatar.html placeholder="GH" %}
{% include ui/avatar.html placeholder="IJ" %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Avatar icons

Apart from pictures and initials, you can also use icons to make the avatars more universal.

{% capture code %}
{% include ui/avatar.html icon="user" %}
{% include ui/avatar.html icon="plus" %}
{% include ui/avatar.html icon="user-plus" %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Avatar initials color

Customize the color of the avatars' background. You can click [here]({% docs_url colors %}) to see the list of available colors.

{% capture code %}
{% include ui/avatar.html placeholder="AB" color="green" %}
{% include ui/avatar.html placeholder="CD" color="red" %}
{% include ui/avatar.html placeholder="EF" color="yellow" %}
{% include ui/avatar.html placeholder="GH" color="blue" %}
{% include ui/avatar.html placeholder="IJ" color="purple" %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Avatar size

Using Bootstrap’s typical naming structure, you can create a standard avatar or scale it up or down to different sizes based on what you need.

{% capture code %}
{% include ui/avatar.html person-id=10 size="xl" %}
{% include ui/avatar.html person-id=9 size="lg" %}
{% include ui/avatar.html person-id=8 size="md" %}
{% include ui/avatar.html person-id=7 %}
{% include ui/avatar.html person-id=6 size="sm" %}
{% include ui/avatar.html person-id=5 size="xs" %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Avatar status

Add a status indicator to your avatar to show, for instance, if a users is online or offline or indicate the number of messages they have received.

{% capture code %}
{% include ui/avatar.html person-id=11 %}
{% include ui/avatar.html person-id=12 status="danger" %}
{% include ui/avatar.html person-id=13 status="success" %}
{% include ui/avatar.html person-id=14 status="warning" %}
{% include ui/avatar.html person-id=15 status="info" %}
{% include ui/avatar.html person-id=16 status="gray" status-text="5" %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Avatar shape

Change the shape of an avatar with the default Bootstrap image classes. You can make them round or square and change their border radius.

{% capture code %}
{% include ui/avatar.html person-id=17 %}
{% include ui/avatar.html person-id=18 shape="rounded" %}
{% include ui/avatar.html person-id=19 shape="rounded-circle" %}
{% include ui/avatar.html person-id=20 shape="rounded-0" %}
{% include ui/avatar.html person-id=21 shape="rounded-lg" %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Avatars list

Create a list of avatars within one parent container.

{% capture code %}
{% include ui/avatar-list.html %}
{% endcapture %}
{% include example.html code=code centered=true %}


## Stacked list

Make the list stack once a certain number of avatars is reached to make it look clear and display well regardless of the screen size.

{% capture code %}
<div class="avatar-list avatar-list-stacked">
  {% for person in site.data.people limit: 5 offset: 30 %}
  {% include ui/avatar.html person=person element="a" %}
  {% endfor %}
  <span class="avatar">+8</span>
</div>
{% endcapture %}
{% include example.html code=code centered=true %}
