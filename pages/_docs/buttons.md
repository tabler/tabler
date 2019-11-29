---
title: Buttons
icon: fe fe-plus-square
description: Use Bootstrap’s custom button styles for actions in forms, dialogs, and more. Includes support for a handful of contextual variations, sizes, states, and more.
---


### Button tag

The `.btn` classes are designed to be used with the `<button>` element. However, you can also use these classes on `<a>` or `<input>` elements (though some browsers may apply a slightly different rendering).

{% example html wrapper=btn-list %}
<a href="#" class="btn btn-primary" role="button">Link</a>
<button class="btn btn-primary">Button</button>
<input type="button" class="btn btn-primary" value="Input" />
<input type="submit" class="btn btn-primary" value="Submit" />
<input type="reset" class="btn btn-primary" value="Reset" />
{% endexample %}

### Button variations

Use any of the available button classes to quickly create a styled button . We provide a variety of colors for you to express different emotions.

{% example html wrapper=btn-list %}
{% for button in site.button_variants %}
<a href="#" class="btn btn-{{ button.name }}">{{ button.title }}</a>
{% endfor %}
<a href="#" class="btn btn-link">Link</a>
{% endexample %}

### Disabled buttons

Make buttons look inactive by adding the disabled boolean attribute to any `.btn` element. `<a>`s don’t support the disabled attribute, so you must add the `.disabled` class to make it visually appear disabled.
{% example html wrapper=btn-list %}
{% for button in site.button_variants %}
{% include_cached ui/button.html color=button.name text=button.title disabled="true" %}
{% endfor %}

{% endexample %}


### Color variations

The classic button, in different colors.

{% example html wrapper=btn-list %}
{% for button in site.colors %}
<a href="#" class="btn btn-{{ button[0] }}">{{ button[1].name }}</a>
{% endfor %}
{% endexample %}

### Square buttons

Add `.btn-square` to button to remove border-radius.

{% example html wrapper=btn-list %}
{% for button in site.button_variants %}
{% include_cached ui/button.html text=button.title color=button.name square=true %}
{% endfor %}
{% endexample %}

### Pill buttons

Add `.btn-pill` class to any button to make them more rounded.

{% example html wrapper=btn-list %}
{% for button in site.button_variants %}
{% include_cached ui/button.html text=button.title color=button.name pill=true %}
{% endfor %}
{% endexample %}

### Outline buttons

In need of a button, but not the hefty background colors they bring? Replace the default modifier classes with the `.btn-outline-*` ones to remove all background images and colors on any button.

{% example html wrapper=btn-list %}
{% for button in site.button_variants %}
{% include_cached ui/button.html text=button.title color=button.name outline=true %}
{% endfor %}
{% endexample %}

### Button with star

{% example html %}
{% for button in site.button_variants %}
  {% include_cached ui/button.html text="Button" label="star" color=button.name class="mr-2" %}
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

{% example html wrapper=btn-list %}
<button type="button" class="btn btn-dark"><i class="icon fe fe-upload mr-2"></i>Upload</button>
<button type="button" class="btn btn-warning"><i class="icon fe fe-heart mr-2"></i>I like</button>
<button type="button" class="btn btn-success"><i class="icon fe fe-check mr-2"></i>I agree</button>
<button type="button" class="btn btn-outline-primary"><i class="icon fe fe-plus mr-2"></i>More</button>
<button type="button" class="btn btn-danger"><i class="icon fe fe-link mr-2"></i>Link</button>
<button type="button" class="btn btn-info"><i class="icon fe fe-message-circle mr-2"></i>Comment</button>
{% endexample %}

### Social buttons

A button can be formatted to link to a social website

{% example html wrapper=btn-list %} 
{% for button in site.socials %}
{% include_cached ui/button.html color=button.name icon=button.icon text=button.title %}
{% endfor %}
{% endexample %}

You can use only icons.

{% example html wrapper=btn-list %} 
{% for button in site.socials %}
{% include_cached ui/button.html color=button.name icon=button.icon %}
{% endfor %}
{% endexample %}

### Icon buttons

Icon only button. Add `.btn-icon` class to remove unnecessary padding from button.

{% example html wrapper=btn-list %} 
<button type="button" class="btn btn-icon btn-primary"><i class="icon fe fe-activity"></i></button>
<button type="button" class="btn btn-icon btn-primary btn-github"><i class="icon fe fe-github"></i></button>
<button type="button" class="btn btn-icon btn-primary btn-success"><i class="icon fe fe-bell"></i></button>
<button type="button" class="btn btn-icon btn-primary btn-warning"><i class="icon fe fe-star"></i></button>
<button type="button" class="btn btn-icon btn-primary btn-danger"><i class="icon fe fe-trash"></i></button>
<button type="button" class="btn btn-icon btn-primary btn-purple"><i class="icon fe fe-bar-chart"></i></button>
<button type="button" class="btn btn-icon btn-primary btn-secondary"><i class="icon fe fe-git-merge"></i></button>
{% endexample %}

### Button dropdown

Wrap the dropdown’s toggle (your button or link) and the dropdown menu within `.dropdown`, or another element that declares `position: relative;`. Dropdowns can be triggered from `<a>` or `<button>` elements to better fit your potential needs.

{% example html wrapper=btn-list %}
<div class="dropdown">
  <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown">
     <i class="icon fe fe-calendar"></i>
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Dropdown link</a>
    <a class="dropdown-item" href="#">Dropdown link</a>
  </div>
</div>

<div class="dropdown">
  <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown">
     <i class="icon fe fe-calendar mr-2"></i>Show calendar
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Dropdown link</a>
    <a class="dropdown-item" href="#">Dropdown link</a>
  </div>
</div>

<div class="dropdown">
  <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown">
     Show calendar
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Dropdown link</a>
    <a class="dropdown-item" href="#">Dropdown link</a>
  </div>
</div>
{% endexample %}

### Loading button

Add `.btn-loading` to use a loading state on a button. The width of the button depends on the length of the text inside.

Since the loading spinner is implemented using the `:after` pseudo-element, it is not supported by the `<input type="submit">` element.

{% example html wrapper=btn-list %}
{% include_cached ui/button.html spinner=true text="Button" color="primary" %}
{% include_cached ui/button.html spinner=true text="Button" color="danger" %}
{% include_cached ui/button.html spinner=true text="Button" color="warning" %}
{% include_cached ui/button.html spinner=true color="success" %}
{% include_cached ui/button.html spinner=true color="secondary" %}
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

{% example html%}
<a href="#" class="btn btn-secondary mr-2">{% include ui/avatar.html person-id="4" class="btn-avatar" %} Avatar</a>
<a href="#" class="btn btn-secondary mr-2">{% include ui/avatar.html person-id="5" class="btn-avatar" %} Avatar</a>
<a href="#" class="btn btn-secondary mr-2">{% include ui/avatar.html person-id="6" class="btn-avatar" %} Avatar</a>
{% endexample %}

