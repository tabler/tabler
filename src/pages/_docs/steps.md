---
title: Steps
menu: docs.components.steps
description: Steps are used to guide users through complex processes, making them easier and more intuitive. Breaking a multi-step process into smaller parts and tracking progress along the way helps users complete it successfully.
new: true
---


## Default markup

Steps show users where they are within a process, what steps they have already completed and what they are expected to complete. Making multi-step processes more user-friendly facilitates users' interaction with your interface. 

Use the `steps` class to create the default progress tracker and name the steps accordingly.     

{% capture code %}
{% include ui/steps.html show-title=true %}
{% endcapture %}
{% include example.html code=code %}


## Tooltips

Add tooltips, if you want to provide users with additional information about the steps they are expected to complete. Tooltips are displayed when a user hovers over a given step and help clarify what might not be clear from the interface.

{% capture code %}
{% include ui/steps.html show-title=true show-tooltip=true %}
{% endcapture %}
{% include example.html code=code %}


## Color

You can customize the default progress indicator by changing the color to one that better suits your design. Click [here]({% docs_url colors %}) to see the range of available colors.

{% capture code %}
{% include ui/steps.html color="green" show-title=true %}
{% include ui/steps.html color="red" show-title=true %}
{% endcapture %}
{% include example.html code=code %}


## Steps without title

For designs with limited space, use progress indicators without titles and add tooltips to provide the necessary details.

{% capture code %}
{% include ui/steps.html show-tooltip=true %}
{% endcapture %}
{% include example.html code=code %}


## Steps with numbers

Use the `steps-counter` class to create a progress tracker with numbers instead of titles and change the color to customize it.

{% capture code %}
{% include ui/steps.html count=5 active=2 numbers=true color="lime" %}
{% endcapture %}
{% include example.html code=code %}
