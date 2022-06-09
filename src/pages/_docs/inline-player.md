---
title: Inline player
menu: docs.plugins.plyr
libs: plyr
description: A simple, lightweight, accessible and customizable HTML5, YouTube and Vimeo media player that supports modern browsers.
---

## Sample demo

{% capture code %}
{% include ui/inline-player.html id="youtube" embed-id="dQw4w9WgXcQ" %}
{% endcapture %}
{% include example.html code=code %}


## Vimeo file

{% capture code %}
{% include ui/inline-player.html id="vimeo" type="vimeo" embed-id="515937365" %}
{% endcapture %}
{% include example.html code=code %}