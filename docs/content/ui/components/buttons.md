---
title: Buttons
summary: Use button styles that best suit your designs and encourage users to take the desired actions. You can customize the button's properties to improve the user experience of your website or system, changing the size, shape, color and many more.
bootstrapLink: components/buttons/
description: Customizable buttons for user actions.
---

## Button tag

As one of the most common elements of UI design, buttons have a very important function of engaging users within your website or app and guiding them in their actions. Use the `.btn` classes with the `<button>` element and add additional styling that will make your buttons serve their purpose and draw users' attention.

{% capture html -%}
<a href="#" class="btn" role="button">Link</a>
<button class="btn">Button</button>
<input type="button" class="btn" value="Input" />
<input type="submit" class="btn" value="Submit" />
<input type="reset" class="btn" value="Reset" />
{%- endcapture -%}
{%- include "docs/example.html" html=html centered %}

## Default button

The standard button creates a white background and subtle hover animation. It's meant to look and behave as an interactive element of your page.

{% capture html -%}
<a href="#" class="btn" role="button">Link</a>
{%- endcapture -%}
{%- include "docs/example.html" html=html centered %}

## Button variations

Use the button classes that correspond to the function of your button. The big range of available colors will help you show your button's purpose and make it easy to spot.

{% capture html -%}
<a href="#" class="btn btn-primary">Primary</a>
<a href="#" class="btn btn-secondary">Secondary</a>
<a href="#" class="btn btn-success">Success</a>
<a href="#" class="btn btn-warning">Warning</a>
<a href="#" class="btn btn-danger">Danger</a>
<a href="#" class="btn btn-info">Info</a>
<a href="#" class="btn btn-dark">Dark</a>
<a href="#" class="btn btn-light">Light</a>
{%- endcapture -%}
{%- include "docs/example.html" html=html separated centered %}

## Disabled buttons

Make buttons look inactive to show that an action is possible once the user meets certain criteria, such as completing the required fields to submit a form.

{% capture html -%}
<a href="#" class="btn btn-primary disabled">Primary</a>
<a href="#" class="btn btn-secondary disabled">Secondary</a>
<a href="#" class="btn btn-success disabled">Success</a>
<a href="#" class="btn btn-warning disabled">Warning</a>
<a href="#" class="btn btn-danger disabled">Danger</a>
<a href="#" class="btn btn-info disabled">Info</a>
<a href="#" class="btn btn-dark disabled">Dark</a>
<a href="#" class="btn btn-light disabled">Light</a>
{%- endcapture -%}
{%- include "docs/example.html" html=html separated centered %}

## Color variations

Choose the right color for your button to make it go well with your design and draw users' attention. Button colors can have a big influence on users' decisions, which is why it's important to choose them based on the intended purpose.

{% capture html -%}
<a href="#" class="btn btn-blue">Blue</a>
<a href="#" class="btn btn-azure">Azure</a>
<a href="#" class="btn btn-indigo">Indigo</a>
<a href="#" class="btn btn-purple">Purple</a>
<a href="#" class="btn btn-pink">Pink</a>
<a href="#" class="btn btn-red">Red</a>
<a href="#" class="btn btn-orange">Orange</a>
<a href="#" class="btn btn-yellow">Yellow</a>
<a href="#" class="btn btn-lime">Lime</a>
<a href="#" class="btn btn-green">Green</a>
<a href="#" class="btn btn-teal">Teal</a>
<a href="#" class="btn btn-cyan">Cyan</a>
{%- endcapture -%}
{%- include "docs/example.html" html=html separated centered %}

## Ghost buttons

Use the `.btn-ghost-*` class to make your button look simple yet aesthetically appealing. Ghost buttons help focus users' attention on the website's primary design, encouraging them to take action at the same time.

{% capture html -%}
<a href="#" class="btn btn-ghost-primary">Primary</a>
<a href="#" class="btn btn-ghost-secondary">Secondary</a>
<a href="#" class="btn btn-ghost-success">Success</a>
<a href="#" class="btn btn-ghost-warning">Warning</a>
<a href="#" class="btn btn-ghost-danger">Danger</a>
<a href="#" class="btn btn-ghost-info">Info</a>
<a href="#" class="btn btn-ghost-dark">Dark</a>
<div class="p-2 bg-dark">
  <a href="#" class="btn btn-ghost-light">Light</a>
</div>
{%- endcapture -%}
{%- include "docs/example.html" html=html separated vertical %}

## Square buttons

Use the `.btn-square` class to remove the border radius, if you want the corners of your button to be square rather than rounded.

{% capture html -%}
<a href="#" class="btn btn-square">Square button</a>
{%- endcapture -%}
{%- include "docs/example.html" html=html centered %}

## Pill buttons

Add the `.btn-pill` class to your button to make it rounded and give it a modern and attractive look.

{% capture html -%}
<a href="#" class="btn btn-pill">Pill button</a>
{%- endcapture -%}
{%- include "docs/example.html" html=html centered %}

## Outline buttons

Replace the default modifier class with the `.btn-outline-*` class, if you want to remove the color and the background of your button and give it a more subtle look. Outline buttons are perfect to use as secondary buttons, as they don't distract users from the main action.

{% capture html -%}
<a href="#" class="btn btn-outline-primary">Primary</a>
<a href="#" class="btn btn-outline-secondary">Secondary</a>
<a href="#" class="btn btn-outline-success">Success</a>
<a href="#" class="btn btn-outline-warning">Warning</a>
<a href="#" class="btn btn-outline-danger">Danger</a>
<a href="#" class="btn btn-outline-info">Info</a>
<a href="#" class="btn btn-outline-dark">Dark</a>
<a href="#" class="btn btn-outline-light">Light</a>
{%- endcapture -%}
{%- include "docs/example.html" html=html centered %}

## Button size

Add `.btn-lg` or `.btn-sm` to change the size of your button and differentiate those which should have primary focus from those of secondary importance. Adapt the button size to your design and encourage users to take actions.

{% capture html -%}
<button type="button" class="btn btn-primary btn-lg">Large button</button>
<button type="button" class="btn btn-lg">Large button</button>
{%- endcapture -%}
{%- include "docs/example.html" html=html centered %}

{% capture html -%}
<button type="button" class="btn btn-primary btn-sm">Small button</button>
<button type="button" class="btn btn-sm">Small button</button>
{%- endcapture -%}
{%- include "docs/example.html" html=html centered %}

## Buttons with icons

Label your button with text and add an icon to communicate the action and make it easy to identify for users. Icons are easily recognized and improve the aesthetics of your button design, giving it a modern and attractive look.

See all icons at [tabler.io/icons]({{ site.icons.link }}).

{% capture html -%}
<button type="button" class="btn">
  {% include "ui/icon.html" icon="upload" -%}
  Upload
</button>
<button type="button" class="btn btn-warning">
  {% include "ui/icon.html" icon="heart" -%}
  I like
</button>
<button type="button" class="btn btn-success">
  {% include "ui/icon.html" icon="check" -%}
  I agree
</button>
<button type="button" class="btn btn-primary">
  {% include "ui/icon.html" icon="plus" -%}
  More
</button>
<button type="button" class="btn btn-danger">
  {% include "ui/icon.html" icon="link" -%}
  Link
</button>
<button type="button" class="btn btn-info">
  {% include "ui/icon.html" icon="message" -%}
  Comment
</button>
{%- endcapture -%}
{%- include "docs/example.html" html=html centered %}

## Social buttons

You can use the icons of popular social networking sites, which users are familiar with. Thanks to buttons with social media icons users can share content or follow a website with just one click, without leaving the website.

{% capture html -%}
<a href="#" class="btn btn-facebook">
  {%- include "ui/icon.html" icon="brand-facebook" -%}
  Facebook
</a>
<a href="#" class="btn btn-twitter">
  {%- include "ui/icon.html" icon="brand-twitter" -%}
  Twitter
</a>
<a href="#" class="btn btn-google">
  {%- include "ui/icon.html" icon="brand-google" -%}
  Google
</a>
<a href="#" class="btn btn-youtube">
  {%- include "ui/icon.html" icon="brand-youtube" -%}
  Youtube
</a>
<a href="#" class="btn btn-vimeo">
  {%- include "ui/icon.html" icon="brand-vimeo" -%}
  Vimeo
</a>
<a href="#" class="btn btn-dribbble">
  {%- include "ui/icon.html" icon="brand-dribbble" -%}
  Dribbble
</a>
<a href="#" class="btn btn-github">
  {%- include "ui/icon.html" icon="brand-github" -%}
  Github
</a>
<a href="#" class="btn btn-instagram">
  {%- include "ui/icon.html" icon="brand-instagram" -%}
  Instagram
</a>
<a href="#" class="btn btn-pinterest">
  {%- include "ui/icon.html" icon="brand-pinterest" -%}
  Pinterest
</a>
<a href="#" class="btn btn-vk">
  {%- include "ui/icon.html" icon="brand-vk" -%}
  VK
</a>
<a href="#" class="btn btn-rss">
  {%- include "ui/icon.html" icon="brand-rss" -%}
  RSS
</a>
<a href="#" class="btn btn-flickr">
  {%- include "ui/icon.html" icon="brand-flickr" -%}
  Flickr
</a>
<a href="#" class="btn btn-bitbucket">
  {%- include "ui/icon.html" icon="brand-bitbucket" -%}
  Bitbucket
</a>
<a href="#" class="btn btn-tabler">
  {%- include "ui/icon.html" icon="brand-tabler" -%}
  Tabler
</a>
{%- endcapture -%}
{%- include "docs/example.html" html=html separated centered hide-code %}

```html
<a href="#" class="btn btn-facebook">
  <svg>...</svg>
  Facebook
</a>
```

You can also add an icon without the name of a social networking site, if you want to display more buttons in a small space.

{% capture html -%}
<a href="#" class="btn btn-facebook btn-icon" aria-label="Button">
  {%- include "ui/icon.html" icon="brand-facebook" -%}
</a>
<a href="#" class="btn btn-x btn-icon" aria-label="Button">
  {%- include "ui/icon.html" icon="brand-x" -%}
</a>
<a href="#" class="btn btn-google btn-icon" aria-label="Button">
  {%- include "ui/icon.html" icon="brand-google" -%}
</a>
<a href="#" class="btn btn-youtube btn-icon" aria-label="Button">
  {%- include "ui/icon.html" icon="brand-youtube" -%}
</a>
<a href="#" class="btn btn-vimeo btn-icon" aria-label="Button">
  {%- include "ui/icon.html" icon="brand-vimeo" -%}
</a>
<a href="#" class="btn btn-dribbble btn-icon" aria-label="Button">
  {%- include "ui/icon.html" icon="brand-dribbble" -%}
</a>
<a href="#" class="btn btn-github btn-icon" aria-label="Button">
  {%- include "ui/icon.html" icon="brand-github" -%}
</a>
<a href="#" class="btn btn-instagram btn-icon" aria-label="Button">
  {%- include "ui/icon.html" icon="brand-instagram" -%}
</a>
<a href="#" class="btn btn-pinterest btn-icon" aria-label="Button">
  {%- include "ui/icon.html" icon="brand-pinterest" -%}
</a>
<a href="#" class="btn btn-vk btn-icon" aria-label="Button">
  {%- include "ui/icon.html" icon="brand-vk" -%}
</a>
<a href="#" class="btn btn-rss btn-icon" aria-label="Button">
  {%- include "ui/icon.html" icon="rss" -%}
</a>
<a href="#" class="btn btn-flickr btn-icon" aria-label="Button">
  {%- include "ui/icon.html" icon="brand-flickr" -%}
</a>
<a href="#" class="btn btn-bitbucket btn-icon" aria-label="Button">
  {%- include "ui/icon.html" icon="brand-bitbucket" -%}
</a>
<a href="#" class="btn btn-tabler btn-icon" aria-label="Button">
  {%- include "ui/icon.html" icon="brand-tabler" -%}
</a>
{%- endcapture -%}
{%- include "docs/example.html" html=html separated vertical hide-code %}

```html
<a href="#" class="btn btn-facebook btn-icon" aria-label="Button">
  <svg>...</svg>
</a>
```

## Icon buttons

Add the `.btn-icon` class to remove unnecessary padding from your button and use an icon without any additional label. Thanks to that, you can save space and make the action easy to recognize for international users.

{% capture html -%}
<a href="#" class="btn btn-primary btn-icon" aria-label="Button">
  {%- include "ui/icon.html" icon="activity" -%}
</a>
<a href="#" class="btn btn-github btn-icon" aria-label="Button">
  {%- include "ui/icon.html" icon="brand-github" -%}
</a>
<a href="#" class="btn btn-success btn-icon" aria-label="Button">
  {%- include "ui/icon.html" icon="bell" -%}
</a>
<a href="#" class="btn btn-warning btn-icon" aria-label="Button">
  {%- include "ui/icon.html" icon="star" -%}
</a>
<a href="#" class="btn btn-danger btn-icon" aria-label="Button">
  {%- include "ui/icon.html" icon="trash" -%}
</a>
<a href="#" class="btn btn-purple btn-icon" aria-label="Button">
  {%- include "ui/icon.html" icon="chart-bar" -%}
</a>
<a href="#" class="btn btn-icon" aria-label="Button">
  {%- include "ui/icon.html" icon="git-merge" -%}
</a>
{%- endcapture -%}
{%- include "docs/example.html" html=html separated centered hide-code %}

```html
<a href="#" class="btn btn-primary btn-icon" aria-label="Button">
  <svg>...</svg>
</a>
```

## Dropdown buttons

Create a dropdown button that will encourage users to click for more options. You can add a label with an icon or remove the label and add an icon on its own if you want to save space. Choose the option that will best suit your design and improve the user experience.

{% capture html -%}
<div class="dropdown">
  <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown">
    {%- include "ui/icon.html" icon="calendar" -%}
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
  </div>
</div>
<div class="dropdown">
  <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown">
    {%- include "ui/icon.html" icon="calendar" -%}
    Show calendar
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
  </div>
</div>
<div class="dropdown">
  <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown">Show calendar</button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
  </div>
</div>
{%- endcapture -%}
{%- include "docs/example.html" html=html centered hide-code height="260px" %}

```html
<div class="dropdown">
  <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown">
    <svg>...</svg>
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
  </div>
</div>
```

## Loading buttons

Add the `.btn-loading` class to show a button's loading state, which can be useful in the case of operations that take longer to process. Thanks to that, users will be aware of the current state of their action and won't give it up before it's finished.

{% capture html -%}
<a href="#" class="btn btn-primary btn-loading">
	Button
</a>
<a href="#" class="btn btn-primary btn-loading">
	Loading button with loooong content
</a>
{%- endcapture -%}
{%- include "docs/example.html" html=html centered %}

{% capture html -%}
<a href="#" class="btn btn-primary">
  <span class="spinner-border spinner-border-sm me-2" role="status"></span>
  Button
</a>
{%- endcapture -%}
{%- include "docs/example.html" html=html centered %}

## Full width buttons

Add the `.w-100` class to make buttons span the full width of their container. This is useful for mobile-first designs or when you want buttons to take up the entire available space.

{% capture html -%}
<a href="#" class="btn btn-primary w-100">Full width button</a>
<a href="#" class="btn btn-outline-secondary w-100">Full width outline button</a>
{%- endcapture -%}
{%- include "docs/example.html" html=html separated %}

## List of buttons

Create a list of buttons using the `.btn-list` container to display different actions a user can take. If you add additional styling, such as colors, you will be able to focus users' attention on a particular action or suggest the result.

{% capture html -%}
<div class="btn-list">
  <a href="#" class="btn btn-success">Save changes</a>
  <a href="#" class="btn">Save and continue</a>
  <a href="#" class="btn btn-danger">Cancel</a>
</div>
{%- endcapture -%}
{%- include "docs/example.html" html=html centered %}

If the list is long, it will be wrapped and some buttons will be moved to the next line, keeping them all evenly spaced.

{% capture html -%}
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
{%- endcapture -%}
{%- include "docs/example.html" html=html centered %}

Use the `.text-center` or the `.text-end` modifiers to change the buttons' alignment and place them where they suit best.

{% capture html -%}
<div class="btn-list justify-content-center">
  <a href="#" class="btn">Save and continue</a>
  <a href="#" class="btn btn-primary">Save changes</a>
</div>
{%- endcapture -%}
{%- include "docs/example.html" html=html %}

{% capture html -%}
<div class="btn-list justify-content-end">
  <a href="#" class="btn">Save and continue</a>
  <a href="#" class="btn btn-primary">Save changes</a>
</div>
{%- endcapture -%}
{%- include "docs/example.html" html=html %}

{% capture html -%}
<div class="btn-list">
  <a href="#" class="btn btn-outline-danger me-auto">Delete</a>
  <a href="#" class="btn">Save and continue</a>
  <a href="#" class="btn btn-primary">Save changes</a>
</div>
{%- endcapture -%}
{%- include "docs/example.html" html=html %}

## Buttons with badges

Add badges to buttons to display additional information like counts, notifications, or status indicators. Badges automatically position themselves within the button layout.

{% capture html -%}
<a href="#" class="btn">
  Notifications
  <span class="badge ms-2">14</span>
</a>
<a href="#" class="btn">
  Messages
  <span class="badge ms-2">3</span>
</a>
<a href="#" class="btn">
  Alerts
  <span class="badge ms-2">7</span>
</a>
{%- endcapture -%}
{%- include "docs/example.html" html=html centered %}

## Buttons with avatars

Use buttons with avatars to simplify the process of interaction and make your design more personalized. Buttons can contain avatars and labels or only avatars, if displayed on a smaller space.

{% capture html -%}
<a href="#" class="btn">
  <span
    class="avatar"
    style="background-image: url(/static/avatars/002f.jpg);"
  ></span>
  Avatar
</a>
<a href="#" class="btn">
  <span
    class="avatar"
    style="
      background-image: url(/static/avatars/002m.jpg);
    "
  ></span>
  Avatar
</a>
<a href="#" class="btn">
  <span
    class="avatar"
    style="
      background-image: url(/static/avatars/004f.jpg);
    "
  ></span>
  Avatar
</a>
{%- endcapture -%}
{%- include "docs/example.html" html=html centered %}

## Buttons with animations on hover

Add a subtle animation effect to your buttons when users hover over them. This can enhance the interactivity and provide visual feedback to improve the user experience.

{% capture html -%}
<div class="btn-list">
  <a class="btn btn-animate-icon">
    Save {% include "ui/icon.html" icon="arrow-right" class="icon-end" %}
  </a>
  <a class="btn btn-animate-icon btn-animate-icon-rotate">
    {% include "ui/icon.html" icon="plus" %} Add
  </a>
  <a class="btn btn-animate-icon btn-animate-icon-shake">
    {% include "ui/icon.html" icon="bell" %} Notifications
  </a>
  <a class="btn btn-animate-icon btn-animate-icon-rotate">
    {% include "ui/icon.html" icon="settings" %} Settings
  </a>
  <a class="btn btn-animate-icon btn-animate-icon-pulse">
    {% include "ui/icon.html" icon="heart" %} Love
  </a>
  <a class="btn btn-animate-icon btn-animate-icon-rotate">
    {% include "ui/icon.html" icon="x" %} Close
  </a>
  <a class="btn btn-animate-icon btn-animate-icon-tada">
    {% include "ui/icon.html" icon="check" %} Confirm
  </a>
  <a class="btn btn-animate-icon">
    Next {% include "ui/icon.html" icon="chevron-right" class="icon-end" %}
  </a>
  <a class="btn btn-animate-icon btn-animate-icon-move-start">
    {% include "ui/icon.html" icon="chevron-left" %} Previous
  </a>
</div>
{%- endcapture -%} 
{%- include "docs/example.html" html=html %}

## Button sizes

Use size modifiers to change the size of your buttons. Available sizes: `.btn-xs`, `.btn-sm`, default, `.btn-lg`, `.btn-xl`.

{% capture html -%}
<button type="button" class="btn btn-sm">Small button</button>
<button type="button" class="btn">Default button</button>
<button type="button" class="btn btn-lg">Large button</button>
<button type="button" class="btn btn-xl">Extra large button</button>
{%- endcapture -%}
{%- include "docs/example.html" html=html separated centered vertical %}

## Link buttons

Use the `.btn-link` class to create buttons that look like links but maintain button functionality. These are useful for secondary actions that shouldn't compete with primary buttons for attention.

{% capture html -%}
<a href="#" class="btn btn-link">Link button</a>
<button type="button" class="btn btn-link">Link button</button>
{%- endcapture -%}
{%- include "docs/example.html" html=html centered %}

## Action buttons

Use the `.btn-action` class to create subtle action buttons that are perfect for card headers, toolbars, or other interface elements where you want minimal visual impact.

{% capture html -%}
<div class="btn-actions">
  <a href="#" class="btn btn-action" aria-label="Edit">
    {%- include "ui/icon.html" icon="edit" -%}
  </a>
  <a href="#" class="btn btn-action" aria-label="Copy">
    {%- include "ui/icon.html" icon="copy" -%}
  </a>
  <a href="#" class="btn btn-action" aria-label="Settings">
    {%- include "ui/icon.html" icon="settings" -%}
  </a>
  <a href="#" class="btn btn-action" aria-label="Delete">
    {%- include "ui/icon.html" icon="trash" -%}
  </a>
</div>
{%- endcapture -%}
{%- include "docs/example.html" html=html centered %}

## Action button groups

Use the `.btn-actions` container to group multiple action buttons together. This creates a cohesive set of related actions that work well in card headers, toolbars, or other interface elements.

{% capture html -%}
<div class="btn-actions">
  <a href="#" class="btn btn-action">
    {%- include "ui/icon.html" icon="refresh" -%}
  </a>
  <a href="#" class="btn btn-action">
    {%- include "ui/icon.html" icon="chevron-up" -%}
  </a>
  <a href="#" class="btn btn-action">
    {%- include "ui/icon.html" icon="dots-vertical" -%}
  </a>
  <a href="#" class="btn btn-action">
    {%- include "ui/icon.html" icon="x" -%}
  </a>
</div>
{%- endcapture -%}
{%- include "docs/example.html" html=html centered %}

## Button groups

Use button groups to combine related buttons together. Button groups are perfect for creating toolbars, segmented controls, or any interface where multiple related actions should be visually grouped.

{% capture html -%}
<div class="btn-group" role="group">
  <button type="button" class="btn">Left</button>
  <button type="button" class="btn">Middle</button>
  <button type="button" class="btn">Right</button>
</div>
{%- endcapture -%}
{%- include "docs/example.html" html=html centered %}

{% capture html -%}
<div class="btn-group" role="group">
  <input type="radio" class="btn-check" name="btn-radio" id="btn-radio-1" autocomplete="off" checked>
  <label class="btn" for="btn-radio-1">Radio 1</label>
  
  <input type="radio" class="btn-check" name="btn-radio" id="btn-radio-2" autocomplete="off">
  <label class="btn" for="btn-radio-2">Radio 2</label>
  
  <input type="radio" class="btn-check" name="btn-radio" id="btn-radio-3" autocomplete="off">
  <label class="btn" for="btn-radio-3">Radio 3</label>
</div>
{%- endcapture -%}
{%- include "docs/example.html" html=html centered %}

{% capture html -%}
<div class="btn-group-vertical" role="group">
  <button type="button" class="btn">Top</button>
  <button type="button" class="btn">Middle</button>
  <button type="button" class="btn">Bottom</button>
</div>
{%- endcapture -%}
{%- include "docs/example.html" html=html centered %}
