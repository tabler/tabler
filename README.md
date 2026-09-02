<p align="center">
<a href="https://tabler.io">
<picture>
<source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/tabler/tabler/dev/shared/static/logo-white.svg">
<img src="https://raw.githubusercontent.com/tabler/tabler/dev/shared/static/logo.svg" alt="Tabler" width="300">
</picture>
</a>
</p>

<p align="center">
Free and open source HTML dashboard UI kit built on Bootstrap 5.
</p>

<p align="center">
<a href="https://www.npmjs.com/package/@tabler/core" target="_blank"><img src="https://img.shields.io/npm/v/@tabler/core?color=1864ab&label=Latest+version" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/@tabler/core" target="_blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@tabler/core?color=1971c2&label=Downloads"></a>
<a href="https://www.jsdelivr.com/package/npm/@tabler/core" target="_blank"><img alt="jsDelivr hits" src="https://img.shields.io/jsdelivr/npm/hm/@tabler/core?color=1c7ed6&label=jsDelivr"></a>
<a href="https://github.com/tabler/tabler/actions/workflows/build.yml" target="_blank"><img alt="Build" src="https://github.com/tabler/tabler/actions/workflows/build.yml/badge.svg"></a>
<a href="https://github.com/tabler/tabler/blob/dev/LICENSE"><img src="https://img.shields.io/npm/l/@tabler/core?label=License&color=228be6" alt="License"></a>
<a href="https://github.com/tabler/tabler" target="_blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/tabler/tabler?style=social"></a>
</p>

<p align="center">
<a href="https://preview.tabler.io">Live demo</a> · <a href="https://docs.tabler.io">Documentation</a> · <a href="https://github.com/tabler/tabler/releases">Releases</a> · <a href="https://github.com/tabler/tabler/discussions">Discussions</a>
</p>

## Table of contents

- [Preview](#-preview)
- [Quick start](#-quick-start)
- [What's included](#-whats-included)
- [Frameworks](#-frameworks)
- [Ecosystem](#-ecosystem)
- [Documentation](#-documentation)
- [Browser support](#-browser-support)
- [Contributing](#-contributing)
- [Sponsors](#-sponsors)
- [Creators](#-creators)
- [Contributors](#-contributors)
- [License](#-license)

## 🔎 Preview

Tabler is a set of ready-made layouts, components and demo pages for admin panels, dashboards and web apps. Every component is built on Bootstrap 5, works in light and dark mode, and can be customized with Sass or CSS custom properties.

<p align="center">
<a href="https://preview.tabler.io" target="_blank">
<picture>
<source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/tabler/tabler/dev/shared/static/tabler-preview-dark.png">
<img src="https://raw.githubusercontent.com/tabler/tabler/dev/shared/static/tabler-preview.png" alt="Tabler preview">
</picture>
</a>
</p>

- **Built on Bootstrap 5.** Bootstrap ships inside the package, so you only need one CSS and one JS file.
- **120+ demo pages.** Dashboards, forms, tables, auth screens, error pages, marketing layouts and more, all in the [live demo](https://preview.tabler.io).
- **Dark mode and RTL.** Every component has a dark color scheme, and every stylesheet ships in an RTL version.
- **Over 6,000 icons.** [Tabler Icons](https://tabler.io/icons) are drawn on a 24×24 grid and match the UI kit.
- **20+ plugins included.** Charts, date pickers, selects, sliders, editors, drag and drop and other libraries are bundled in `dist/libs`.
- **Sass sources and TypeScript types.** Customize the theme with `@use … with ()` and use typed JavaScript components.

## 🚀 Quick start

Load Tabler from the CDN and start building:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Tabler demo</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/core@latest/dist/css/tabler.min.css" />
  </head>
  <body>
    <h1>Hello, Tabler!</h1>
    <button class="btn btn-primary">Primary button</button>
    <script src="https://cdn.jsdelivr.net/npm/@tabler/core@latest/dist/js/tabler.min.js"></script>
  </body>
</html>
```

Or install the package with npm or your preferred JavaScript package manager:

```sh
npm install @tabler/core
```

Then import the styles and scripts in your entry file:

```js
import '@tabler/core/dist/css/tabler.min.css'
import '@tabler/core/dist/js/tabler.min.js'
```

You can also [download the latest release](https://github.com/tabler/tabler/releases) as a ZIP archive, or try Tabler without installing anything: open the [tabler-starter](https://github.com/tabler/tabler-starter) template on [StackBlitz](https://stackblitz.com/github/tabler/tabler-starter),
[CodeSandbox](https://codesandbox.io/s/github/tabler/tabler-starter) or [GitHub Codespaces](https://codespaces.new/tabler/tabler-starter).

See the [installation guide](https://docs.tabler.io/ui/getting-started/installation/) for more options.

## 📦 What's included

The `@tabler/core` package contains compiled and minified CSS and JavaScript, the Sass and TypeScript sources, and the third-party plugins used by the demo pages:

```text
@tabler/core/
├── dist/
│   ├── css/       tabler.css and the optional stylesheets (flags, marketing, payments, socials,
│   │              themes, vendors), each with .min and .rtl versions
│   ├── js/        tabler.js and tabler.esm.js, plus the standalone tabler-theme.js
│   ├── libs/      bundled plugins: ApexCharts, Tom Select, Litepicker, FullCalendar and others
│   ├── types/     TypeScript declarations
│   ├── fonts/
│   └── img/
├── scss/          Sass sources
└── js/            TypeScript sources
```

The stylesheets are split so that you load only what you use. `tabler.css` is enough for most projects; the other files add country flags, payment provider logos, social icons, marketing layouts or alternative gray palettes.

## 🧩 Frameworks

Tabler is plain HTML and CSS, so it works with any framework. The documentation has a setup guide for each of these:

[React](https://docs.tabler.io/ui/getting-started/frameworks/react/) · [Vue](https://docs.tabler.io/ui/getting-started/frameworks/vue/) · [Angular](https://docs.tabler.io/ui/getting-started/frameworks/angular/) · [Next.js](https://docs.tabler.io/ui/getting-started/frameworks/nextjs/) ·
[Nuxt](https://docs.tabler.io/ui/getting-started/frameworks/nuxt/) · [SvelteKit](https://docs.tabler.io/ui/getting-started/frameworks/sveltekit/) · [Astro](https://docs.tabler.io/ui/getting-started/frameworks/astro/) · [Laravel](https://docs.tabler.io/ui/getting-started/frameworks/laravel/) ·
[Django](https://docs.tabler.io/ui/getting-started/frameworks/django/) · [Rails](https://docs.tabler.io/ui/getting-started/frameworks/rails/) · [Symfony](https://docs.tabler.io/ui/getting-started/frameworks/symfony/)

## 🌍 Ecosystem

Tabler is more than the UI kit. These projects share the same design language:

| Project                                                                | What it is                                                                               |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [Tabler Icons](https://github.com/tabler/tabler-icons)                 | Over 6,000 free MIT-licensed SVG icons, with packages for React, Vue, Svelte and Angular |
| [Tabler Illustrations](https://tabler.io/illustrations)                | Customizable SVG illustrations in light and dark variants                                |
| [Tabler Emails](https://tabler.io/emails)                              | Responsive HTML email templates tested in more than 90 clients                           |
| [Tabler Avatars](https://tabler.io/avatars)                            | Avatar illustrations for user profiles and placeholders                                  |
| [Tabler Flags](https://github.com/tabler/tabler-flags)                 | Over 250 optimized SVG country flags, shipped in `tabler-flags.css`                      |
| [Tabler Payments](https://docs.tabler.io/payments/)                    | Payment provider logos in light and dark versions, shipped in `tabler-payments.css`      |
| [tabler-starter](https://github.com/tabler/tabler-starter)             | Minimal starter template, ready to open in StackBlitz, CodeSandbox or Codespaces         |
| [Tabler Icons for Figma](https://github.com/tabler/tabler-icons-figma) | Figma plugin for inserting Tabler Icons into your designs                                |

## 📖 Documentation

The full documentation is available at [docs.tabler.io](https://docs.tabler.io/). It covers installation, customization, color modes, RTL, every component and plugin, and the [frequently asked questions](https://docs.tabler.io/ui/getting-started/faq/).

To see what changed in each release, check the [changelog](core/CHANGELOG.md) and [GitHub releases](https://github.com/tabler/tabler/releases). Updating from an older version? Read the [upgrade guide](https://docs.tabler.io/ui/getting-started/upgrade/) first, it lists every breaking change with a before-and-after
example.

Tabler follows [Semantic Versioning](https://semver.org/). Breaking changes only land in major releases, and every release ships a changeset-based changelog.

## 🌐 Browser support

Tabler runs in every current browser. The minimum versions below come from the CSS features it relies on without a fallback: `light-dark()`, `color-mix()`, `:has()` and `@property`.

| Browser          | Minimum version |
| ---------------- | --------------- |
| Chrome, Edge     | 123             |
| Firefox          | 128             |
| Safari           | 17.5            |
| Opera            | 109             |
| iOS Safari       | 17.5            |
| Samsung Internet | 27              |

See the [browser support page](https://docs.tabler.io/ui/getting-started/browser-support/) for details.

## 🤝 Contributing

We welcome contributions of all kinds. The [contributing guide](CONTRIBUTING.md) explains how to run the project locally (with Node.js and pnpm, Docker, or [GitHub Codespaces](https://codespaces.new/tabler/tabler)), where things live in the repository, and what a pull request needs. By participating, you agree to
follow our [Code of Conduct](.github/CODE_OF_CONDUCT.md).

The short version:

```sh
git clone https://github.com/tabler/tabler.git
cd tabler
pnpm install
pnpm run dev
```

This starts the preview at [http://localhost:3000](http://localhost:3000) and the documentation at [http://localhost:3010](http://localhost:3010), both with live reload.

- **Found a bug?** [Open a bug report](https://github.com/tabler/tabler/issues/new?template=bug_report.yml).
- **Have an idea?** [Open a feature request](https://github.com/tabler/tabler/issues/new?template=feature_request.yml) or start a [discussion](https://github.com/tabler/tabler/discussions).
- **Found a security issue?** Please report it privately, see our [security policy](SECURITY.md).

## 💛 Sponsors

Tabler is free to use, and its development is funded by sponsors. If it saves you time, consider [becoming a sponsor on GitHub](https://github.com/sponsors/codecalm) or [donating on PayPal](https://paypal.me/codecalm).

<p align="center">
<a href="https://github.com/sponsors/codecalm">
<img src="https://raw.githubusercontent.com/tabler/sponsors/main/sponsors.svg" alt="Tabler sponsors">
</a>
</p>

## 🤓 Creators

- **Paweł Kuna** · [@codecalm](https://github.com/codecalm) · [codecalm.net](https://codecalm.net)
- **Bartłomiej Gawęda** · [@BG-Software-BG](https://github.com/BG-Software-BG)
- **Bartosz Dobija** · [@Bartosz-Do](https://github.com/Bartosz-Do)

Follow Tabler on [X](https://x.com/tabler_io) and [Facebook](https://www.facebook.com/tabler.io) for updates.

## 👨‍🚀 Contributors

This project exists thanks to all the people who contribute.

<a href="https://github.com/tabler/tabler/graphs/contributors">
<img src="https://opencollective.com/tabler/contributors.svg?width=890&button=false" alt="Tabler contributors">
</a>

## 📄 License

Tabler is licensed under the [MIT License](LICENSE).

Third-party libraries shipped in `dist/libs` keep their own licenses. One of them needs attention: **ApexCharts is not MIT from version 5 on**. It is dual-licensed, free under its Community license for organizations under $2M in annual revenue and paid above that threshold, with a separate OEM license for
redistribution. Check the [ApexCharts license options](https://apexcharts.com/license/) before you ship charts in a commercial product.
