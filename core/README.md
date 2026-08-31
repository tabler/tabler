<p align="center">
<a href="https://tabler.io"><img src="https://raw.githubusercontent.com/tabler/tabler/refs/heads/dev/shared/static/logo.svg" alt="Tabler" width="300"></a>
</p>

<p align="center">
A premium and open source dashboard template with a responsive and high-quality UI.
</p>

<p align="center">
<a href="https://www.npmjs.com/package/@tabler/core" target="_blank"><img src="https://img.shields.io/npm/v/@tabler/core?color=1864ab&label=Latest+version" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/@tabler/core" target="_blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@tabler/core?color=1971c2&label=Downloads"></a>
<a href="https://github.com/tabler/tabler/blob/dev/LICENSE"><img src="https://img.shields.io/npm/l/tabler.svg?label=License&message=MIT&color=1c7ed6" alt="License"></a>
</p>

<p align="center">
<a href="https://preview.tabler.io">Live demo</a> · <a href="https://docs.tabler.io">Documentation</a> · <a href="https://github.com/tabler/tabler">GitHub</a> · <a href="https://github.com/tabler/tabler/blob/dev/core/CHANGELOG.md">Changelog</a>
</p>

## 🔎 Preview

Tabler is fully responsive and compatible with all modern browsers. Thanks to its modern and user-friendly design you can create a fully functional interface that users will love! Choose the layouts and components you need and customize them to make your design consistent and eye-catching. Every component has been created with attention to detail to make your interface beautiful!

<p align="center">
	<a href="https://preview.tabler.io" target="_blank">
			<img src="https://raw.githubusercontent.com/tabler/tabler/dev/shared/static/tabler-preview.png" alt="Tabler Preview">
	</a>
</p>

## 📦 Installation

Install `@tabler/core` with npm or your preferred JavaScript package manager:

```sh
npm install --save @tabler/core
```

### CDN

All files included in the `@tabler/core` npm package are also available over a CDN.

JavaScript:

```html
<script src="https://cdn.jsdelivr.net/npm/@tabler/core@latest/dist/js/tabler.min.js"></script>
```

Styles:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/core@latest/dist/css/tabler.min.css">
```

### Quick start

Create an HTML file with Tabler's CSS and JavaScript loaded from the CDN and start building:

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

Or try it without installing anything: open the [tabler-starter](https://github.com/tabler/tabler-starter) template on [StackBlitz](https://stackblitz.com/github/tabler/tabler-starter), [CodeSandbox](https://codesandbox.io/s/github/tabler/tabler-starter) or [GitHub Codespaces](https://codespaces.new/tabler/tabler-starter).

## 📖 Documentation

The full documentation is available at [docs.tabler.io](https://docs.tabler.io/). Release notes live in the [changelog](https://github.com/tabler/tabler/blob/dev/core/CHANGELOG.md).

## 🤝 Contributing

We welcome contributions of all kinds! See the [contributing guide](https://github.com/tabler/tabler/blob/dev/CONTRIBUTING.md) to get started.

## 💛 Sponsors

**If you want to support our project and help us grow it, you can [become a sponsor on GitHub](https://github.com/sponsors/codecalm) or just [donate on PayPal](https://paypal.me/codecalm) :)**

<p align="center">
	<a href="https://github.com/sponsors/codecalm">
		<img src="https://cdn.jsdelivr.net/gh/tabler/sponsors@latest/sponsors.svg" alt="Tabler sponsors">
	</a>
</p>

## 📄 License

Tabler is licensed under the [MIT License](https://github.com/tabler/tabler/blob/dev/LICENSE).

Third-party libraries shipped in `dist/libs` keep their own licenses. One of them needs
attention: **ApexCharts is not MIT from version 5 on**. It is dual-licensed - free under
its Community license for organizations under $2M in annual revenue, and paid above that
threshold, with a separate OEM license for redistribution. Check the
[ApexCharts license options](https://apexcharts.com/license/) before you ship charts in a
commercial product.
