---
title: Empty states
description: Empty states or blank pages are commonly used as placeholders for first-use, empty data or error screens. Their aim is to engage users when there is no content to display and that is why their design is extremely important from the point of view of the user experience of your website or app.
menu: docs.components.empty
---


## Default markup

Use the default empty state to engage users in the critical moments of their experience with your website or app. A good empty state screen should let users know what is happening and what they should do next as well as encourage them to take action.

{% capture code %}
{% include ui/empty.html %}
{% endcapture %}
{% include example.html code=code %}


## Empty state with illustration

Make your empty state screen more attractive and engaging by adding an illustration. Thanks to a more personalized design, you will improve your brand image and make your website or app more user friendly.

{% capture code %}
{% include ui/empty.html illustration=true title="Invoices are managed from here" description="You can see which ones are sent, viewed, partially or fully paid." button-icon="plus" button-text="New invoice" %}
{% endcapture %}
{% include example.html code=code %}

## Empty state with header

Instead of adding an icon or illustration you can simply give the text:

{% capture code %}
{% include ui/empty.html icon-text="404" title="Oops… You just found an error page" description="We are sorry but the page you are looking for was not found" button-text="Take me home" button-icon="arrow-left" %}
{% endcapture %}
{% include example.html code=code %}
