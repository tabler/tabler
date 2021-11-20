---
title: Buttons
description: Use button styles that best suit your designs and encourage users to take the desired actions. You can customize the button's properties to improve the user experience of your website or system, changing the size, shape, color and many more.
bootstrap-link: components/buttons/
menu: docs.components.buttons
---


## Button tag

As one of the most common elements of UI design, buttons have a very important function of engaging users with your website or app and guiding them in their actions. Use the `.btn` classes with the `<button>` element and add additional styling that will make your buttons serve their purpose and draw users' attention. 

{% capture code %}
<a href="#" class="btn" role="button">Link</a>
<button class="btn">Button</button>
<input type="button" class="btn" value="Input"/>
<input type="submit" class="btn" value="Submit"/>
<input type="reset" class="btn" value="Reset"/>
{% endcapture  %}
{% include example.html code=code wrapper="btn-list" centered=true %}


## Default button 

The standard button creates a white background and subtle hover animation. It's meant to look and behave as an interactive element of your page. 

{% capture code %}
<a href="#" class="btn" role="button">Link</a>
{% endcapture  %}
{% include example.html code=code wrapper="btn-list" centered=true %}

## Button variations

Use the button classes that correspond to the function of your button. The big range of available colors will help you show your buttons' purpose and make them easy to spot.

{% capture code %}
{% for button in site.theme-colors %}
{% assign btn-color = button[1].class %}
{% assign btn-title = button[1].title %}
{% include ui/button.html color=btn-color text=btn-title %}
{% endfor %}
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}


## Disabled buttons

Make buttons look inactive to show that an action is possible once the user meets certain criteria, such as completing the required fields to submit a form. 

{% capture code %}
{% for button in site.theme-colors %}
{% assign btn-color = button[1].class %}
{% assign btn-title = button[1].title %}
{% include ui/button.html color=btn-color text=btn-title disabled=true %}
{% endfor %}
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}


## Color variations

Choose the right color for your button to make it go well with your design and draw users' attention. Button colors can have a big influence on users' decisions, which is why it's important to choose them based on the intended purpose.

{% capture code %}
{% for button in site.colors %}
<a href="#" class="btn btn-{{ button[0] }}">{{ button[1].title }}</a>
{% endfor %}
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}


## Ghost buttons

Use the `.btn-ghost-*` class to make your button look simple yet aesthetically appealing. Ghost buttons help focus users' attention on the website's primary design, at the same time encouraging them to take action. 

{% capture code %}
{% for button in site.theme-colors %}
<a href="#" class="btn btn-ghost-{{ button[0] }}">{{ button[1].title }}</a>
{% endfor %}
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}


## Square buttons

Use the `.btn-square` class to remove the border radius, if you want the corners of your button to be square rather than rounded.

{% capture code %}
{% include ui/button.html text="White" square=true %}
{% for button in site.button-variants %}
{% assign btn-color = button[1].class %}
{% assign btn-title = button[1].title %}
{% include ui/button.html color=btn-color text=btn-title square=true %}
{% endfor %}
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}


## Pill buttons

Add the `.btn-pill` class to your button to make it rounded and give it a modern and attractive look.

{% capture code %}
{% include ui/button.html text="White" pill=true %}
{% for button in site.button-variants %}
{% assign btn-color = button[1].class %}
{% assign btn-title = button[1].title %}
{% include ui/button.html color=btn-color text=btn-title pill=true %}
{% endfor %}
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}


## Outline buttons

Replace the default modifier class with the `.btn-outline-*` class, if you want to remove the color and the background of your button and give it a more subtle look. Outline buttons are perfect to use as secondary buttons, as they don't distract users from the main action.

{% capture code %}
{% for button in site.theme-colors %}
{% assign btn-color = button[1].class %}
{% assign btn-title = button[1].title %}
{% include ui/button.html text=btn-title color=btn-color outline=true %}
{% endfor %}
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}


## Button size

Add `.btn-lg` or `.btn-sm` to change the size of your button and differentiate those which should have primary focus from those of secondary importance. Adapt the button size to your design and encourage users to take actions.  

{% capture code %}
<button type="button" class="btn btn-primary btn-lg">Large button</button>
<button type="button" class="btn btn-lg">Large button</button>
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}

{% capture code %}
<button type="button" class="btn btn-primary btn-sm">Small button</button>
<button type="button" class="btn btn-sm">Small button</button>
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}


## Buttons with icons

Label your button with text and add an icon to communiacate the action and make it easy to identify for users. Icons are easily recognized and improve the aesthetics of your button design, giving it a modern and atractive look.  

Icons can be found [**here**](/docs/icons.html#icons)

{% capture code %}
<button type="button" class="btn">
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
<button type="button" class="btn btn-primary">
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

You can use the icons of popular social networking sites, which users are familiar with. Thanks to buttons with social media icons users can share content or follow a website with just one click, without leaving the website.

{% capture code %}
{% for button in site.socials %}
{% assign btn-icon = button[1].icon %}
{% assign btn-title = button[1].title %}
{% assign btn-color = button[0] %}
{% include ui/button.html color=btn-color icon=btn-icon text=btn-title %}
{% endfor %}
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}

You can also add an icon without the name of a social networking site, if you want to display more buttons on a small space.

{% capture code %}
{% for button in site.socials %}
{% assign btn-icon = button[1].icon %}
{% assign btn-color = button[0] %}
{% include ui/button.html color=btn-color icon=btn-icon icon-only=true %}
{% endfor %}
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}


## Icon buttons

Add the `.btn-icon` class to remove unnecessary padding from your button and use an icon without any additional label. Thanks to that, you can save space and make the action easy to recognize for international users.

{% capture code %}
{% include ui/button.html icon="activity" color="primary" icon-only=true %}
{% include ui/button.html icon="brand-github" color="github" icon-only=true %}
{% include ui/button.html icon="bell" color="success" icon-only=true %}
{% include ui/button.html icon="star" color="warning" icon-only=true %}
{% include ui/button.html icon="trash" color="danger" icon-only=true %}
{% include ui/button.html icon="chart-bar" color="purple" icon-only=true %}
{% include ui/button.html icon="git-merge" color="white" icon-only=true %}
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}


## Dropdown buttons

Create a dropdown button that will encourage users to click for more options. You can add a label with an icon or remove the label and add an icon on its own if you want to save space. Choose the option that will best suit your design and improve the user experience. 

{% capture code %}
<div class="dropdown">
  <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown">
     {% include ui/icon.html icon="calendar" %}
  </button>
  {% include ui/dropdown-menu.html %}
</div>

<div class="dropdown">
  <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown">
     {% include ui/icon.html icon="calendar" %}Show calendar
  </button>
  {% include ui/dropdown-menu.html %}
</div>

<div class="dropdown">
  <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown">
     Show calendar
  </button>
  {% include ui/dropdown-menu.html %}
</div>
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}


## Loading buttons

Add the `.btn-loading` class to show a button's loading state, which can be useful in the case of operations that take longer to process. Thanks to that, users will be aware of the current state of their action and won't give it up before it's finished.


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

Create a list of buttons using the `.btn-list` container to display different actions a user can take. If you add aditional styling, such as colours, you will be able to focus users' attention on a particular action or suggest the result. 

{% capture code %}
<div class="btn-list">
  <a href="#" class="btn btn-success">Save changes</a>
  <a href="#" class="btn">Save and continue</a>
  <a href="#" class="btn btn-danger">Cancel</a>
</div>
{% endcapture %}
{% include example.html code=code %}

If the list is long, it will be wrapped and some buttons will be moved to the next line, keeping them all evenly spaced.

{% capture code %}
<div class="btn-list">
  <a href="#" class="btn">One</a>
  <a href="#" class="btn">Two</a>
  <a href="#" class="btn">Three</a>
  <a href="#" class="btn">Four</a>
  <a href="#" class="btn">Five</a>
  <a href="#" class="btn">Six</a>
  <a href="#" class="btn">Seven</a>
  <a href="#" class="btn">Eight</a>
  <a href="#" class="btn">Nine</a>
  <a href="#" class="btn">Ten</a>
  <a href="#" class="btn">Eleven</a>
  <a href="#" class="btn">Twelve</a>
  <a href="#" class="btn">Thirteen</a>
  <a href="#" class="btn">Fourteen</a>
  <a href="#" class="btn">Fifteen</a>
  <a href="#" class="btn">Sixteen</a>
  <a href="#" class="btn">Seventeen</a>
  <a href="#" class="btn">Eighteen</a>
  <a href="#" class="btn">Nineteen</a>
</div>
{% endcapture %}
{% include example.html code=code %}

Use the `.text-center` or the `.text-end` modifiers to change the buttons' alignment and place them where they suit best.

{% capture code %}
<div class="btn-list justify-content-center">
  <a href="#" class="btn">Save and continue</a>
  <a href="#" class="btn btn-primary">Save changes</a>
</div>
{% endcapture %}
{% include example.html code=code %}

{% capture code %}
<div class="btn-list justify-content-end">
  <a href="#" class="btn">Save and continue</a>
  <a href="#" class="btn btn-primary">Save changes</a>
</div>
{% endcapture %}
{% include example.html code=code %}

{% capture code %}
<div class="btn-list">
  <a href="#" class="btn btn-outline-danger me-auto">Delete</a>
  <a href="#" class="btn">Save and continue</a>
  <a href="#" class="btn btn-primary">Save changes</a>
</div>
{% endcapture %}
{% include example.html code=code %}


## Buttons with avatars

Use buttons with avatars to simplify the process of interaction and make your design more personalized. Buttons can contain avatars and labels or only avatars, if displayed on a smaller space. 

{% capture code %}
<a href="#" class="btn">
  {% include ui/avatar.html person-id="4" %} Avatar
</a>
<a href="#" class="btn">
  {% include ui/avatar.html person-id="5" %} Avatar
</a>
<a href="#" class="btn">
  {% include ui/avatar.html person-id="6" %} Avatar
</a>
{% endcapture %}
{% include example.html code=code wrapper="btn-list" centered=true %}
