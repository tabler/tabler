---
title: React
description: Tabler Icons library for React framework.
summary: Tabler Icons for React offers a robust set of icons tailored for React applications, providing developers with a seamless way to enhance their user interfaces with high-quality, scalable graphics.
---

![](/img/icons/package-react.png)

## Installation

{% include "docs/tabs-package.html" name="@tabler/icons-react" %}

or just [download from Github](https://github.com/tabler/tabler-icons/releases).

## How to use

It's built with ESmodules so it's completely tree-shakable. Each icon can be imported as a component.

```jsx
import { IconArrowLeft } from '@tabler/icons-react';

const App = () => {
  return <IconArrowLeft />;
};

export default App;
```

You can pass additional props to adjust the icon.

```js
<IconArrowLeft color="red" size={48} />
```

### Props

| name          | type     | default      |
| ------------- | -------- | ------------ |
| `size`        | _Number_ | 24           |
| `color`       | _String_ | currentColor |
| `stroke`      | _Number_ | 2            |

