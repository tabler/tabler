---
title: Buttons
icon: fe fe-plus-square
description: Use Bootstrap’s custom button styles for actions in forms, dialogs, and more. Includes support for a handful of contextual variations, sizes, states, and more.
bootstrap-link: components/buttons/
done: true
---


### Button tag

The `.btn` classes are designed to be used with the `<button>` element. However, you can also use these classes on `<a>` or `<input>` elements (though some browsers may apply a slightly different rendering).

{% example html wrapper=btn-list %}
<a href="#" class="btn btn-primary" role="button">Link</a>
<button class="btn btn-primary">Button</button>
<input type="button" class="btn btn-primary" value="Input"/>
<input type="submit" class="btn btn-primary" value="Submit"/>
<input type="reset" class="btn btn-primary" value="Reset"/>
{% endexample %}

### Button variations

Use any of the available button classes to quickly create a styled button . We provide a variety of colors for you to express different emotions.

{% example html wrapper=btn-list %}
{% for button in site.button-variants %}
{% assign btn-color = button[1].class %}
{% assign btn-title = button[1].title %}
{% include ui/button.html color=btn-color text=btn-title %}
{% endfor %}
{% endexample %}

### Disabled buttons

Make buttons look inactive by adding the disabled boolean attribute to any `.btn` element. `<a>`s don’t support the disabled attribute, so you must add the `.disabled` class to make it visually appear disabled.

{% example html wrapper=btn-list %}
{% for button in site.button-variants %}
{% assign btn-color = button[1].class %}
{% assign btn-title = button[1].title %}
{% include ui/button.html color=btn-color text=btn-title disabled=true %}
{% endfor %}
{% endexample %}


### Color variations

The classic button, in different colors.

{% example html wrapper=btn-list %}
{% for button in site.colors %}
<a href="#" class="btn btn-{{ button[0] }}">{{ button[1].title }}</a>
{% endfor %}
{% endexample %}

### Square buttons

Add `.btn-square` to button to remove border-radius.

{% example html wrapper=btn-list %}
{% for button in site.button-variants %}
{% assign btn-color = button[1].class %}
{% assign btn-title = button[1].title %}
{% include ui/button.html color=btn-color text=btn-title square=true %}
{% endfor %}
{% endexample %}

### Pill buttons

Add `.btn-pill` class to any button to make them more rounded.

{% example html wrapper=btn-list %}
{% for button in site.button-variants %}
{% assign btn-color = button[1].class %}
{% assign btn-title = button[1].title %}
{% include ui/button.html color=btn-color text=btn-title pill=true %}
{% endfor %}
{% endexample %}

### Outline buttons

In need of a button, but not the hefty background colors they bring? Replace the default modifier classes with the `.btn-outline-*` ones to remove all background images and colors on any button.

{% example html wrapper=btn-list %}
{% for button in site.button-variants %}
{% assign btn-color = button[1].class %}
{% assign btn-title = button[1].title %}
{% include ui/button.html text=btn-title color=btn-color outline=true %}
{% endfor %}
{% endexample %}

### Button size

Add `.btn-lg` or `.btn-sm` for additional sizes.

{% example html wrapper=btn-list %}
<button type="button" class="btn btn-primary btn-lg">Large button</button>
<button type="button" class="btn btn-secondary btn-lg">Large button</button>
{% endexample %}

{% example html wrapper=btn-list %}
<button type="button" class="btn btn-primary btn-sm">Small button</button>
<button type="button" class="btn btn-secondary btn-sm">Small button</button>
{% endexample %}

Create block level buttons—those that span the full width of a parent—by adding `.btn-block`.

{% example html %}
<button type="button" class="btn btn-primary btn-block">Block level button</button>
<button type="button" class="btn btn-secondary btn-block">Block level button</button>
{% endexample %}

### Button with icon

Basic buttons are traditional buttons with borders and background with an extra commponent like an icon. You can place it either on the left or the right which ever you want with different color opitons.

Icons can be found [**here**](/docs/icons.html#icons)

{% example html wrapper=btn-list %}
<button type="button" class="btn btn-dark">
{% include ui/icon.html icon="upload" class="icon-sm" %}
Upload
</button>
<button type="button" class="btn btn-warning">
{% include ui/icon.html icon="heart" class="icon-sm" %}
I like
</button>
<button type="button" class="btn btn-success">
{% include ui/icon.html icon="check" class="icon-sm" %}
I agree
</button>
<button type="button" class="btn btn-outline-primary">
{% include ui/icon.html icon="plus" class="icon-sm" %}
More
</button>
<button type="button" class="btn btn-danger">
{% include ui/icon.html icon="link" class="icon-sm" %}
Link
</button>
<button type="button" class="btn btn-info">
{% include ui/icon.html icon="message-circle" class="icon-sm" %}
Comment
</button>
{% endexample %}

### Social buttons

A button can be formatted to link to a social website

{% example html wrapper=btn-list %} 
{% for button in site.socials %}
{% assign btn-icon = button[1].icon %}
{% assign btn-title = button[1].title %}
{% assign btn-color = button[0] %}
{% include ui/button.html color=btn-color icon=btn-icon text=btn-title %}
{% endfor %}
{% endexample %}

You can use only icons.

{% example html wrapper=btn-list %} 
{% for button in site.socials %}
{% assign btn-icon = button[1].icon %}
{% assign btn-color = button[0] %}
{% include ui/button.html color=btn-color icon=btn-icon icon-only=true %}
{% endfor %}
{% endexample %}

### Icon buttons

Icon only button. Add `.btn-icon` class to remove unnecessary padding from button.

{% example html wrapper=btn-list %} 
<button type="button" class="btn btn-icon btn-primary">
{% include ui/icon.html icon="activity" class="icon-sm" %}
</button>
<button type="button" class="btn btn-icon btn-primary btn-github">
{% include ui/icon.html icon="github" class="icon-sm" %}
</button>
<button type="button" class="btn btn-icon btn-primary btn-success">
{% include ui/icon.html icon="bell" class="icon-sm" %}
</button>
<button type="button" class="btn btn-icon btn-primary btn-warning">
{% include ui/icon.html icon="star" class="icon-sm" %}
</button>
<button type="button" class="btn btn-icon btn-primary btn-danger">
{% include ui/icon.html icon="trash-2" class="icon-sm" %}
</button>
<button type="button" class="btn btn-icon btn-primary btn-purple">
{% include ui/icon.html icon="bar-chart" class="icon-sm" %}
</button>
<button type="button" class="btn btn-icon btn-primary btn-secondary">
{% include ui/icon.html icon="git-merge" class="icon-sm" %}
</button>
{% endexample %}

### Button dropdown

Wrap the dropdown’s toggle (your button or link) and the dropdown menu within `.dropdown`, or another element that declares `position: relative;`. Dropdowns can be triggered from `<a>` or `<button>` elements to better fit your potential needs.

{% example html wrapper=btn-list %}
<div class="dropdown">
  <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown">
     {% include ui/icon.html icon="calendar" class="icon-sm" %}
  </button>
  {% include ui/dropdown-menu.html %}
</div>

<div class="dropdown">
  <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown">
     {% include ui/icon.html icon="calendar" class="icon-sm" %}Show calendar
  </button>
  {% include ui/dropdown-menu.html %}
</div>

<div class="dropdown">
  <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown">
     Show calendar
  </button>
  {% include ui/dropdown-menu.html %}
</div>
{% endexample %}

### Loading button

Add `.btn-loading` to use a loading state on a button. The width of the button depends on the length of the text inside.

Since the loading spinner is implemented using the `:after` pseudo-element, it is not supported by the `<input type="submit">` element.

{% example html wrapper=btn-list %}
{% include ui/button.html color="primary" text="Button" spinner=true %}
{% endexample %}

### List of buttons

You can now create a list of buttons with the `.btn-list` container.

{% example html %}
<div class="btn-list">
  <a href="#" class="btn btn-success">Save changes</a>
  <a href="#" class="btn btn-secondary">Save and continue</a>
  <a href="#" class="btn btn-danger">Cancel</a>
</div>
{% endexample %}

If the list is very long, it will automatically wrap on multiple lines, while keeping all buttons evenly spaced.

{% example html %}
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
{% endexample %}

Use the `.text-center` or the `.text-right` modifiers to alter the alignment.

{% example html %}
<div class="btn-list text-center">
  <a href="#" class="btn btn-primary">Save changes</a>
  <a href="#" class="btn btn-secondary">Save and continue</a>
</div>
{% endexample %}

{% example html %}
<div class="btn-list text-right">
  <a href="#" class="btn btn-primary">Save changes</a>
  <a href="#" class="btn btn-secondary">Save and continue</a>
</div>
{% endexample %}

### Button with avatar

{% example html wrapper=btn-list %}
<a href="#" class="btn btn-secondary">
  {% include ui/avatar.html person-id="4" %} Avatar
</a>
<a href="#" class="btn btn-secondary">
  {% include ui/avatar.html person-id="5" %} Avatar
</a>
<a href="#" class="btn btn-secondary">
  {% include ui/avatar.html person-id="6" %} Avatar
</a>
{% endexample %}

