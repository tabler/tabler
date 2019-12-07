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
{% for button in site.button-variants %}
{% assign btn-color = button[1].class %}
{% assign btn-title = button[1].title %}
{% include_cached ui/button.html color=btn-color text=btn-title %}
{% endfor %}
{% endexample %}

### Disabled buttons

Make buttons look inactive by adding the disabled boolean attribute to any `.btn` element. `<a>`s don’t support the disabled attribute, so you must add the `.disabled` class to make it visually appear disabled.

{% example html wrapper=btn-list %}
{% for button in site.button-variants %}
{% assign btn-color = button[1].class %}
{% assign btn-title = button[1].title %}
{% include_cached ui/button.html color=btn-color text=btn-title disabled=true %}
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
{% include_cached ui/button.html color=btn-color text=btn-title square=true %}
{% endfor %}
{% endexample %}

### Pill buttons

Add `.btn-pill` class to any button to make them more rounded.

{% example html wrapper=btn-list %}
{% for button in site.button-variants %}
{% assign btn-color = button[1].class %}
{% assign btn-title = button[1].title %}
{% include_cached ui/button.html color=btn-color text=btn-title pill=true %}
{% endfor %}
{% endexample %}

### Outline buttons

In need of a button, but not the hefty background colors they bring? Replace the default modifier classes with the `.btn-outline-*` ones to remove all background images and colors on any button.

{% example html wrapper=btn-list %}
{% for button in site.button-variants %}
{% assign btn-color = button[1].class %}
{% assign btn-title = button[1].title %}
{% include_cached ui/button.html text=btn-title color=btn-color outline=true %}
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

Icons can be found [**here** {% include_cached ui/icon.html icon="search" class="icon-sm2" %}](/docs/icons.html#icons)

{% example html wrapper=btn-list %}
<button type="button" class="btn btn-dark">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-md"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
Upload
</button>
<button type="button" class="btn btn-warning">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-md"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
I like
</button>
<button type="button" class="btn btn-success">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-md"><polyline points="20 6 9 17 4 12"></polyline></svg>
I agree
</button>
<button type="button" class="btn btn-outline-primary">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-md"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
More
</button>
<button type="button" class="btn btn-danger">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-md"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
Link
</button>
<button type="button" class="btn btn-info">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-md"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
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
{% include_cached ui/button.html color=btn-color icon=btn-icon text=btn-title %}
{% endfor %}
{% endexample %}

You can use only icons.

{% example html wrapper=btn-list %} 
{% for button in site.socials %}
{% assign btn-icon = button[1].icon %}
{% assign btn-color = button[0] %}
{% include_cached ui/button.html color=btn-color icon=btn-icon icon-only=true %}
{% endfor %}
{% endexample %}

### Icon buttons

Icon only button. Add `.btn-icon` class to remove unnecessary padding from button.

{% example html wrapper=btn-list %} 
<button type="button" class="btn btn-icon btn-primary">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-md"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
</button>
<button type="button" class="btn btn-icon btn-primary btn-github">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-md"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
</button>
<button type="button" class="btn btn-icon btn-primary btn-success">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-md"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
</button>
<button type="button" class="btn btn-icon btn-primary btn-warning">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-md"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
</button>
<button type="button" class="btn btn-icon btn-primary btn-danger">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-md"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
</button>
<button type="button" class="btn btn-icon btn-primary btn-purple">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-md"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
</button>
<button type="button" class="btn btn-icon btn-primary btn-secondary">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-md"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M6 21V9a9 9 0 0 0 9 9"></path></svg>
</button>
{% endexample %}

### Button dropdown

Wrap the dropdown’s toggle (your button or link) and the dropdown menu within `.dropdown`, or another element that declares `position: relative;`. Dropdowns can be triggered from `<a>` or `<button>` elements to better fit your potential needs.

{% example html wrapper=btn-list %}
<div class="dropdown">
  <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown">
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-md"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Dropdown link</a>
    <a class="dropdown-item" href="#">Dropdown link</a>
  </div>
</div>

<div class="dropdown">
  <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown">
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-md"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>Show calendar
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
{% include_cached ui/button.html color="primary" text="Button" spinner=true %}
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

