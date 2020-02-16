---
title: Buttons
icon: fe fe-plus-square
description: Use Bootstrap’s custom button styles for actions in forms, dialogs, and more. Includes support for a handful of contextual variations, sizes, states, and more.
bootstrap-link: components/buttons/
done: true
---


## Button tag

The `.btn` classes are designed to be used with the `<button>` element. However, you can also use these classes on `<a>` or `<input>` elements (though some browsers may apply a slightly different rendering).

{% capture code %}
<a href="#" class="btn btn-primary" role="button">Link</a>
<button class="btn btn-primary">Button</button>
<input type="button" class="btn btn-primary" value="Input"/>
<input type="submit" class="btn btn-primary" value="Submit"/>
<input type="reset" class="btn btn-primary" value="Reset"/>
{% endcapture  %}
{% include example.html code=code wrapper="btn-list" centered=true %}


## Button variations

Use any of the available button classes to quickly create a styled button . We provide a variety of colors for you to express different emotions.

{% capture code %}
{% for button in site.button-variants %}
{% assign btn-color = button[1].class %}
{% assign btn-title = button[1].title %}
{% include ui/button.html color=btn-color text=btn-title %}
{% endfor %}
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}


## Disabled buttons

Make buttons look inactive by adding the disabled boolean attribute to any `.btn` element. `<a>`s don’t support the disabled attribute, so you must add the `.disabled` class to make it visually appear disabled.

{% capture code %}
{% for button in site.button-variants %}
{% assign btn-color = button[1].class %}
{% assign btn-title = button[1].title %}
{% include ui/button.html color=btn-color text=btn-title disabled=true %}
{% endfor %}
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}


## Color variations

The classic button, in different colors.

{% capture code %}
{% for button in site.colors %}
<a href="#" class="btn btn-{{ button[0] }}">{{ button[1].title }}</a>
{% endfor %}
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}


## Ghost Buttons

Use `.btn-ghost-*` class for ghost buttons.

{% capture code %}
{% for button in site.button-variants %}
<a href="#" class="btn btn-ghost-{{ button[0] }}">{{ button[1].title }}</a>
{% endfor %}
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}


## Square buttons

Add `.btn-square` to button to remove border-radius.

{% capture code %}
{% for button in site.button-variants %}
{% assign btn-color = button[1].class %}
{% assign btn-title = button[1].title %}
{% include ui/button.html color=btn-color text=btn-title square=true %}
{% endfor %}
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}


## Pill buttons

Add `.btn-pill` class to any button to make them more rounded.

{% capture code %}
{% for button in site.button-variants %}
{% assign btn-color = button[1].class %}
{% assign btn-title = button[1].title %}
{% include ui/button.html color=btn-color text=btn-title pill=true %}
{% endfor %}
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}


## Outline buttons

In need of a button, but not the hefty background colors they bring? Replace the default modifier classes with the `.btn-outline-*` ones to remove all background images and colors on any button.

{% capture code %}
{% for button in site.button-variants %}
{% assign btn-color = button[1].class %}
{% assign btn-title = button[1].title %}
{% include ui/button.html text=btn-title color=btn-color outline=true %}
{% endfor %}
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}


## Button size

Add `.btn-lg` or `.btn-sm` for additional sizes.

{% capture code %}
<button type="button" class="btn btn-primary btn-lg">Large button</button>
<button type="button" class="btn btn-secondary btn-lg">Large button</button>
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}

{% capture code %}
<button type="button" class="btn btn-primary btn-sm">Small button</button>
<button type="button" class="btn btn-secondary btn-sm">Small button</button>
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}

Create block level buttons—those that span the full width of a parent—by adding `.btn-block`.

{% capture code %}
<button type="button" class="btn btn-primary btn-block">Block level button</button>
<button type="button" class="btn btn-secondary btn-block">Block level button</button>
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}


## Button with icon

Basic buttons are traditional buttons with borders and background with an extra commponent like an icon. You can place it either on the left or the right which ever you want with different color opitons.

Icons can be found [**here**](/docs/icons.html#icons)

{% capture code %}
<button type="button" class="btn btn-dark">
{% include ui/icon.html icon="upload" %}
Upload
</button>
<button type="button" class="btn btn-warning">
{% include ui/icon.html icon="heart" %}
I like
</button>
<button type="button" class="btn btn-success">
{% include ui/icon.html icon="check" %}
I agree
</button>
<button type="button" class="btn btn-outline-primary">
{% include ui/icon.html icon="plus" %}
More
</button>
<button type="button" class="btn btn-danger">
{% include ui/icon.html icon="link" %}
Link
</button>
<button type="button" class="btn btn-info">
{% include ui/icon.html icon="message-circle" %}
Comment
</button>
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}


## Social buttons

A button can be formatted to link to a social website

{% capture code %}
{% for button in site.socials %}
{% assign btn-icon = button[1].icon %}
{% assign btn-title = button[1].title %}
{% assign btn-color = button[0] %}
{% include ui/button.html color=btn-color icon=btn-icon text=btn-title %}
{% endfor %}
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}

You can use only icons.

{% capture code %}
{% for button in site.socials %}
{% assign btn-icon = button[1].icon %}
{% assign btn-color = button[0] %}
{% include ui/button.html color=btn-color icon=btn-icon icon-only=true %}
{% endfor %}
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}


## Icon buttons

Icon only button. Add `.btn-icon` class to remove unnecessary padding from button.

{% capture code %}
{% include ui/button.html icon="activity" color="primary" icon-only=true %}
{% include ui/button.html icon="github" color="github" icon-only=true %}
{% include ui/button.html icon="bell" color="success" icon-only=true %}
{% include ui/button.html icon="star" color="warning" icon-only=true %}
{% include ui/button.html icon="trash-2" color="danger" icon-only=true %}
{% include ui/button.html icon="bar-chart" color="purple" icon-only=true %}
{% include ui/button.html icon="git-merge" color="secondary" icon-only=true %}
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}


## Button dropdown

Wrap the dropdown’s toggle (your button or link) and the dropdown menu within `.dropdown`, or another element that declares `position: relative;`. Dropdowns can be triggered from `<a>` or `<button>` elements to better fit your potential needs.

{% capture code %}
<div class="dropdown">
  <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown">
     {% include ui/icon.html icon="calendar" %}
  </button>
  {% include ui/dropdown-menu.html %}
</div>

<div class="dropdown">
  <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown">
     {% include ui/icon.html icon="calendar" %}Show calendar
  </button>
  {% include ui/dropdown-menu.html %}
</div>

<div class="dropdown">
  <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown">
     Show calendar
  </button>
  {% include ui/dropdown-menu.html %}
</div>
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}


## Loading button

Add `.btn-loading` to use a loading state on a button. The width of the button depends on the length of the text inside.


{% capture code %}
{% include ui/button.html color="primary" text="Button" loading=true %}
{% include ui/button.html color="primary" text="Loading button with loooong content" loading=true %}
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}



{% capture code %}
{% include ui/button.html color="primary" text="Button" spinner=true %}
{% endcapture %}
{% include example.html code=code centered=true %}


## List of buttons

You can now create a list of buttons with the `.btn-list` container.

{% capture code %}
<div class="btn-list">
  <a href="#" class="btn btn-success">Save changes</a>
  <a href="#" class="btn btn-secondary">Save and continue</a>
  <a href="#" class="btn btn-danger">Cancel</a>
</div>
{% endcapture %}
{% include example.html code=code %}

If the list is very long, it will automatically wrap on multiple lines, while keeping all buttons evenly spaced.

{% capture code %}
<div class="btn-list">
  <a href="#" class="btn btn-secondary">One</a>
  <a href="#" class="btn btn-secondary">Two</a>
  <a href="#" class="btn btn-secondary">Three</a>
  <a href="#" class="btn btn-secondary">Four</a>
  <a href="#" class="btn btn-secondary">Five</a>
  <a href="#" class="btn btn-secondary">Six</a>
  <a href="#" class="btn btn-secondary">Seven</a>
  <a href="#" class="btn btn-secondary">Eight</a>
  <a href="#" class="btn btn-secondary">Nine</a>
  <a href="#" class="btn btn-secondary">Ten</a>
  <a href="#" class="btn btn-secondary">Eleven</a>
  <a href="#" class="btn btn-secondary">Twelve</a>
  <a href="#" class="btn btn-secondary">Thirteen</a>
  <a href="#" class="btn btn-secondary">Fourteen</a>
  <a href="#" class="btn btn-secondary">Fifteen</a>
  <a href="#" class="btn btn-secondary">Sixteen</a>
  <a href="#" class="btn btn-secondary">Seventeen</a>
  <a href="#" class="btn btn-secondary">Eighteen</a>
  <a href="#" class="btn btn-secondary">Nineteen</a>
</div>
{% endcapture %}
{% include example.html code=code %}

Use the `.text-center` or the `.text-right` modifiers to alter the alignment.

{% capture code %}
<div class="btn-list justify-content-center">
  <a href="#" class="btn btn-secondary">Save and continue</a>
  <a href="#" class="btn btn-primary">Save changes</a>
</div>
{% endcapture %}
{% include example.html code=code %}

{% capture code %}
<div class="btn-list justify-content-end">
  <a href="#" class="btn btn-secondary">Save and continue</a>
  <a href="#" class="btn btn-primary">Save changes</a>
</div>
{% endcapture %}
{% include example.html code=code %}

{% capture code %}
<div class="btn-list">
  <a href="#" class="btn btn-outline-danger mr-auto">Delete</a>
  <a href="#" class="btn btn-secondary">Save and continue</a>
  <a href="#" class="btn btn-primary">Save changes</a>
</div>
{% endcapture %}
{% include example.html code=code %}


## Button with avatar

{% capture code %}
<a href="#" class="btn btn-secondary">
  {% include ui/avatar.html person-id="4" %} Avatar
</a>
<a href="#" class="btn btn-secondary">
  {% include ui/avatar.html person-id="5" %} Avatar
</a>
<a href="#" class="btn btn-secondary">
  {% include ui/avatar.html person-id="6" %} Avatar
</a>
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}
