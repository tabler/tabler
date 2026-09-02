<p align="center">
<a href="https://tabler.io"><img src="https://raw.githubusercontent.com/tabler/tabler/dev/shared/static/logo.svg" alt="Tabler" width="300"></a>
</p>

<p align="center">
Free and open source HTML dashboard UI kit built on Bootstrap 5.
</p>

<p align="center">
<a href="https://www.npmjs.com/package/@tabler/core" target="_blank"><img src="https://img.shields.io/npm/v/@tabler/core?color=1864ab&label=Latest+version" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/@tabler/core" target="_blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@tabler/core?color=1971c2&label=Downloads"></a>
<a href="https://github.com/tabler/tabler/blob/dev/LICENSE"><img src="https://img.shields.io/npm/l/@tabler/core?label=License&color=228be6" alt="License"></a>
</p>

<p align="center">
<a href="https://preview.tabler.io">Live demo</a> · <a href="https://docs.tabler.io">Documentation</a> · <a href="https://github.com/tabler/tabler">GitHub</a> · <a href="https://github.com/tabler/tabler/blob/dev/core/CHANGELOG.md">Changelog</a>
</p>

`@tabler/core` is the CSS and JavaScript framework behind [Tabler](https://tabler.io): layouts, components and utilities for admin panels, dashboards and web apps. Bootstrap 5 ships inside the package, every component works in light and dark mode, and every stylesheet has an RTL version.

## Installation

Install the package with npm or your preferred JavaScript package manager:

```sh
npm install @tabler/core
```

All files in the package are also available over a CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/core@latest/dist/css/tabler.min.css" />
<script src="https://cdn.jsdelivr.net/npm/@tabler/core@latest/dist/js/tabler.min.js"></script>
```

If you don't use a package manager, [download the latest release](https://github.com/tabler/tabler/releases) as a ZIP archive.

## Usage

### Compiled CSS and JavaScript

Import the compiled files once in your entry file. The JavaScript bundle includes Bootstrap, so you don't need to install it separately:

```js
import '@tabler/core/dist/css/tabler.min.css'
import '@tabler/core/dist/js/tabler.min.js'
```

The package also has an ES module build with named exports, useful when you create components from code:

```js
import { Tooltip } from '@tabler/core'

new Tooltip(document.querySelector('[data-bs-toggle="tooltip"]'))
```

TypeScript declarations are included in `dist/types`.

### Optional stylesheets

`tabler.css` covers the UI kit. Load the extra stylesheets only when you need them:

| File                   | Adds                                                 |
| ---------------------- | ---------------------------------------------------- |
| `tabler-flags.css`     | Country flag icons                                   |
| `tabler-payments.css`  | Payment provider logos                               |
| `tabler-socials.css`   | Social media icons                                   |
| `tabler-marketing.css` | Landing page and marketing layouts                   |
| `tabler-themes.css`    | Alternative gray palettes for `data-bs-theme-base`   |
| `tabler-vendors.css`   | Styles for the bundled third-party plugins           |
| `tabler-props.css`     | Design tokens as CSS custom properties, on their own |

Each file has a `.min` version and a `.rtl` version in `dist/css`.

### Sass

To customize the theme, compile the Sass sources and override variables with `@use … with ()`:

```scss
@use '@tabler/core/scss/tabler' with (
  $primary: #f11d46,
  $border-radius: 8px
);
```

The sources write custom properties without a prefix. Add [postcss-prefix-custom-properties](https://www.npmjs.com/package/postcss-prefix-custom-properties) after Sass in your pipeline to get the public `--tblr-` names. The [upgrade guide](https://docs.tabler.io/ui/getting-started/upgrade/#custom-property-prefix-moved-to-postcss) has the full setup.

### Plugins

The third-party libraries used by the demo pages (ApexCharts, Tom Select, Litepicker, FullCalendar, Dropzone and others) are bundled in `dist/libs`. The list of shipped files is in [libs.json](https://github.com/tabler/tabler/blob/dev/core/libs.json), and each plugin has its own page in the
[plugins documentation](https://docs.tabler.io/ui/plugins/).

## What's included

```text
@tabler/core/
├── dist/
│   ├── css/       tabler.css and the optional stylesheets, each with .min and .rtl versions
│   ├── js/        tabler.js and tabler.esm.js, plus the standalone tabler-theme.js
│   ├── libs/      bundled third-party plugins
│   ├── types/     TypeScript declarations
│   ├── fonts/
│   └── img/
├── scss/          Sass sources
├── js/            TypeScript sources
└── libs.json      list of bundled plugin files
```

## Upgrading

Updating from an older version? Read the [upgrade guide](https://docs.tabler.io/ui/getting-started/upgrade/) first. It lists every breaking change with a before-and-after example. Release notes live in the [changelog](https://github.com/tabler/tabler/blob/dev/core/CHANGELOG.md).

## Browser support

Tabler runs in every current browser. The CSS relies on `light-dark()`, `color-mix()`, `:has()` and `@property` without a fallback, which sets the floor at Chrome and Edge 123, Firefox 128, Safari 17.5, Opera 109, iOS 17.5 and Samsung Internet 27. See the
[browser support page](https://docs.tabler.io/ui/getting-started/browser-support/) for details.

## Documentation

The full documentation is available at [docs.tabler.io](https://docs.tabler.io/): installation, [framework guides](https://docs.tabler.io/ui/getting-started/frameworks/), customization, color modes, RTL, and every component and plugin. Demo pages are at [preview.tabler.io](https://preview.tabler.io).

## Contributing

We welcome contributions of all kinds. See the [contributing guide](https://github.com/tabler/tabler/blob/dev/CONTRIBUTING.md) to get started, [open an issue](https://github.com/tabler/tabler/issues/new/choose) to report a bug or request a feature, or join the
[discussions](https://github.com/tabler/tabler/discussions).

## Sponsors

Tabler is free to use, and its development is funded by sponsors. If it saves you time, consider [becoming a sponsor on GitHub](https://github.com/sponsors/codecalm) or [donating on PayPal](https://paypal.me/codecalm).

<p align="center">
<a href="https://github.com/sponsors/codecalm">
<img src="https://raw.githubusercontent.com/tabler/sponsors/main/sponsors.svg" alt="Tabler sponsors">
</a>
</p>

## License

Tabler is licensed under the [MIT License](https://github.com/tabler/tabler/blob/dev/LICENSE).

Third-party libraries shipped in `dist/libs` keep their own licenses. One of them needs attention: **ApexCharts is not MIT from version 5 on**. It is dual-licensed, free under its Community license for organizations under $2M in annual revenue and paid above that threshold, with a separate OEM license for
redistribution. Check the [ApexCharts license options](https://apexcharts.com/license/) before you ship charts in a commercial product.
