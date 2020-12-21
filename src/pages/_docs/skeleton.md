---
title: Skeleton
menu: docs.components.skeleton
description: Skeleton is used to reserve space for content that soon will appear in a layout.
---

## Skeleton line

Skeleton lines can contain have lines of text. Their length is different and depends on the `text-align` property.

{% capture code %}
<div class="skeleton-line"></div>
<div class="skeleton-line"></div>
<div class="skeleton-line"></div>
<div class="skeleton-line"></div>
{% endcapture %}
{% include example.html code=code %}

However, it may be useful, however, to specify the full width in order to fit the content more effectively.

{% capture code %}
<div class="skeleton-line skeleton-line-full"></div>
<div class="skeleton-line skeleton-line-full"></div>
<div class="skeleton-line skeleton-line-full"></div>
<div class="skeleton-line skeleton-line-full"></div>
{% endcapture %}
{% include example.html code=code %}

You can also move the lines to right or to center:

{% capture code %}
<div class="text-end">
  <div class="skeleton-line"></div>
  <div class="skeleton-line"></div>
  <div class="skeleton-line"></div>
</div>
<div class="text-center mt-3">
  <div class="skeleton-line"></div>
  <div class="skeleton-line"></div>
  <div class="skeleton-line"></div>
</div>
{% endcapture %}
{% include example.html code=code %}


## Skeleton heading

A skeleton can contain also a header element looks like header:

{% capture code %}
<div class="skeleton-heading"></div>
<div class="skeleton-line"></div>
<div class="skeleton-line"></div>
{% endcapture %}
{% include example.html code=code %}

## Skeleton avatar

You can make your skeleton item look like an avatar.

{% capture code %}
<div class="row">
  <div class="col-auto">
    <div class="skeleton-avatar"></div>
  </div>
  <div class="col">
    <div class="skeleton-line"></div>
    <div class="skeleton-line"></div>
  </div>
</div>
{% endcapture %}
{% include example.html code=code %}

The size of avatars is exactly the same as a regular avatar.

{% capture code %}
<div class="skeleton-avatar skeleton-avatar-xl"></div>
<div class="skeleton-avatar skeleton-avatar-lg"></div>
<div class="skeleton-avatar skeleton-avatar-md"></div>
<div class="skeleton-avatar"></div>
<div class="skeleton-avatar skeleton-avatar-sm"></div>
<div class="skeleton-avatar skeleton-avatar-xs"></div>
{% endcapture %}
{% include example.html code=code %}

## Skeleton image

You can use a skeleton, which will look like a picture. You can easily change its height and width. Standard image ratio is 16:9.

{% capture code %}
<div class="skeleton-image"></div>
<div class="skeleton-image" style="width: 80px; height: 200px;"></div>
<div class="skeleton-image" style="width: 80px; height: 80px;"></div>
{% endcapture %}
{% include example.html code=code max-width="200px" wrapper="space-y" %}

You can also use the `ratio` component, and get the image in the right proportions.

{% capture code %}
<div class="ratio ratio-1x1">
  <div class="skeleton-image"></div>
</div>
<div class="ratio ratio-4x3">
  <div class="skeleton-image"></div>
</div>
<div class="ratio ratio-16x9">
  <div class="skeleton-image"></div>
</div>
<div class="ratio ratio-21x9">
  <div class="skeleton-image"></div>
</div>
{% endcapture %}
{% include example.html code=code max-width="200px" wrapper="space-y" %}

## Live examples

See in the following examples how else you can use the skeleton component

{% capture code %}
{% include cards/skeleton/card-1.html %}
{% include cards/skeleton/card-2.html %}
{% include cards/skeleton/card-3.html %}
{% include cards/skeleton/card-4.html %}
{% include cards/skeleton/card-6.html %}
{% endcapture %}
{% include example.html code=code columns=1 wrapper="space-y" %}