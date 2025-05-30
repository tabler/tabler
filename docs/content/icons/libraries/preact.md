---
title: Preact
description: Tabler Icons library for Preact framework.
summary: Tabler Icons for Preact provides an optimized collection of icons specifically designed for use with Preact. These lightweight and scalable icons are easy to integrate into Preact-based projects.
---

![](/img/icons/package-preact.png)

## Installation

{% include "docs/tabs-package.html" name="@tabler/icons-preact" %}

or just [download from Github](https://github.com/tabler/tabler-icons/releases).

## How to use

It's built with ESmodules so it's completely tree-shakable. Each icon can be imported as a component.

```js
import { IconArrowDown } from '@tabler/icons-preact';

const App = () => {
  return <IconArrowDown />;
};

export default App;
```

You can pass additional props to adjust the icon.

```js
<IconArrowDown color="red" size={48} />
```

### Props

| name          | type     | default      |
| ------------- | -------- | ------------ |
| `size`        | _Number_ | 24           |
| `color`       | _String_ | currentColor |
| `stroke`      | _Number_ | 2            |

