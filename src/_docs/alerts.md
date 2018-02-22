---
title: Alerts
icon: fe fe-alert-triangle
description: Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.
in_progress: true
---

### Default alerts

Add color contextual class.

{% example html %}
{% for color in site.theme-colors %}
<div class="alert alert-{{ color[0] }}" role="alert">
  This is a {{ color[0] }} alert—check it out!
</div>
{% endfor %}
{% endexample %}

### Alert with icon

Add `.alert-icon` class.

{% example html %}
<div class="alert alert-icon alert-primary" role="alert">
  <i class="fe fe-bell mr-2" aria-hidden="true"></i> You have done 5 actions. 
</div>
<div class="alert alert-icon alert-success" role="alert">
  <i class="fe fe-check mr-2" aria-hidden="true"></i> The page has been added. 
</div>
<div class="alert alert-icon alert-danger" role="alert">
  <i class="fe fe-alert-triangle mr-2" aria-hidden="true"></i> The daily report has failed. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
</div>
{% endexample %}

### Alert dismissible

Add a dismiss button and the `.alert-dismissible` class, which adds extra padding to the right of the alert and positions the `.close` button. On the dismiss button, add the `data-dismiss="alert"` attribute, which triggers the JavaScript functionality. Be sure to use the `<button>` element with it for proper behavior across all devices.

{% example html %}
<div class="alert alert-warning alert-dismissible">
  <button type="button" class="close" data-dismiss="alert"></button>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
</div>
{% endexample %}

### Alert with avatar

{% example html %}
<div class="alert alert-avatar alert-primary alert-dismissible">
  <span class="avatar" style="background-image: url({{ site.base }}/{{ site.data.users[12].photo }})"></span>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
</div>
<div class="alert alert-avatar alert-success alert-dismissible">
  <span class="avatar" style="background-image: url({{ site.base }}/{{ site.data.users[13].photo }})"></span>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
</div>
{% endexample %}

### Alert with buttons

{% example html %}
<div class="alert alert-success alert-dismissible">
  <button data-dismiss="alert" class="close"></button>
    
  <h4>Some Message</h4>
  <p>
    Lorem ipsum Minim ad pariatur eiusmod ea ut nulla aliqua est quis id dolore minim
    voluptate.
  </p>
  <div class="btn-list">
    <button class="btn btn-success" type="button">Okay</button>
    <button class="btn btn-secondary" type="button">No, thanks</button>
  </div>
</div>
{% endexample %}
