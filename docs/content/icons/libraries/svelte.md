---
title: Svelte
description: Tabler Icons library for Svelte framework.
summary: Tabler Icons for Svelte provides a clean and efficient way to use Tabler's comprehensive icon set in Svelte applications, helping developers deliver polished, user-friendly designs.
---

![](/img/icons/package-svelte.png)


## Installation

{% include "docs/tabs-package.html" name="@tabler/icons-svelte" %}

or just [download from Github](https://github.com/tabler/tabler-icons/releases).

## How to use

It's built with ESmodules so it's completely tree-shakable. Each icon can be imported as a component.

```html
<script lang="ts">
import { IconHeart } from '@tabler/icons-svelte';
</script>

<main>
  <IconHeart />
</main>
```

You can pass additional props to adjust the icon.

```html
<IconHeart size={48} stroke={1} />
```

### Props

| name          | type     | default      |
| ------------- | -------- | ------------ |
| `size`        | _Number_ | 24           |
| `color`       | _String_ | currentColor |
| `stroke`      | _Number_ | 2            |
| `class`       | _String_ |              |
