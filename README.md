<p align="center">
<a href="https://tabler.io"><img src="https://raw.githubusercontent.com/tabler/tabler/refs/heads/dev/shared/static/logo.svg" alt="Tabler" width="300"></a>
</p>

<p align="center">
A premium and open source dashboard template with a responsive and high-quality UI.
</p>

<p align="center">
<a href="https://www.npmjs.com/package/@tabler/core" target="__blank"><img src="https://img.shields.io/npm/v/@tabler/core?color=1864ab&label=Latest+version" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/@tabler/core" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@tabler/core?color=1971c2&label=Downloads"></a>
<a href="https://preview.tabler.io" target="__blank"><img src="https://img.shields.io/static/v1?label=Demo&message=preview&color=228be6" alt="Tabler preview"></a>
<a href="https://github.com/tabler/tabler/blob/dev/LICENSE"><img src="https://img.shields.io/npm/l/tabler.svg?label=License&message=MIT&color=1c7ed6" alt="License"></a>
<a href="https://github.com/tabler/tabler/archive/dev.zip" target="__blank"><img src="https://img.shields.io/static/v1?label=Download&message=ZIP&color=339af0" alt="Download ZIP"></a>
<a href="https://github.com/tabler/tabler/actions/workflows/test.yml" target="__blank"><img alt="Test build" src="https://github.com/tabler/tabler/actions/workflows/test.yml/badge.svg"></a>
<a href="https://github.com/tabler/tabler" target="__blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/tabler/tabler?style=social"></a>
</p>

<p align="center">
<a href="https://preview.tabler.io">Live demo</a> · <a href="https://docs.tabler.io">Documentation</a> · <a href="https://github.com/tabler/tabler/releases">Releases</a> · <a href="https://github.com/tabler/tabler/discussions">Discussions</a>
</p>

## 💛 Sponsors

**If you want to support our project and help us grow it, you can [become a sponsor on GitHub](https://github.com/sponsors/codecalm) or just [donate on PayPal](https://paypal.me/codecalm) :)**

<p align="center">
	<a href="https://github.com/sponsors/codecalm">
		<img src="https://cdn.jsdelivr.net/gh/tabler/sponsors@latest/sponsors.svg" alt="Tabler sponsors">
	</a>
</p>

## 🔎 Preview

Tabler is fully responsive and compatible with all modern browsers. Thanks to its modern and user-friendly design you can create a fully functional interface that users will love! Choose the layouts and components you need and customize them to make your design consistent and eye-catching. Every component has been created with attention to detail to make your interface beautiful! [Show me a demo](https://preview.tabler.io)

<p align="center">
	<a href="https://preview.tabler.io" target="_blank">
			<img src="https://raw.githubusercontent.com/tabler/tabler/dev/shared/static/tabler-preview.png" alt="Tabler Preview">
	</a>
</p>

## 🚀 Features

We've created this admin panel for everyone who wants to create templates based on our pre-made components. Our mission is to deliver a user-friendly, clear and easy administration panel that can be used by both simple websites and sophisticated systems. The only requirement is basic HTML and CSS knowledge — as a reward, you'll be able to manage and visualize different types of data in the easiest possible way!

- **Responsive:** With the support for mobile, tablet and desktop displays, it doesn't matter what device you're using. Tabler is responsive in all major browsers.
- **Cross Browser:** Our theme works perfectly with the latest Chrome, Firefox, Safari, Opera, Edge and mobile browsers. We work hard to provide continuous support for them.
- **HTML5 & CSS3:** We use only modern web technologies, such as HTML5 and CSS3. Our theme includes some subtle CSS3 animations, which will help you attract attention.
- **Clean Code:** We followed Bootstrap's guidelines carefully to make your integration as easy as possible. All code is handwritten and W3C valid.
- **Demo pages:** Tabler features over 20 individual pages using various components, which gives you the freedom to choose and combine. All components can vary in color and styling that you can easily modify using Sass. Sky is the limit!

## 📦 Installation

### Package managers

Tabler is distributed via npm. You can install it with npm or your preferred JavaScript package manager:

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

### Download

If you don't use a package manager, you can [download the latest release](https://github.com/tabler/tabler/releases) as a ZIP archive.

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

The full documentation is available at [docs.tabler.io](https://docs.tabler.io/). To see what changed in each release, check the [changelog](core/CHANGELOG.md) and [GitHub releases](https://github.com/tabler/tabler/releases).

## 🛠️ Development

To build a copy of Tabler locally, you have two options: set up the development tools directly on your device, or use the provided Docker setup. You can also start right away in the cloud with [GitHub Codespaces](https://codespaces.new/tabler/tabler) — the dev container installs everything for you.

### Local setup

1. Install [Node.js](https://nodejs.org/download/) (version 22.12 or newer) and [pnpm](https://pnpm.io/installation) (we recommend [Corepack](https://pnpm.io/installation#using-corepack)).
2. Clone the repository:

   ```sh
   git clone https://github.com/tabler/tabler.git
   cd tabler
   ```

3. Install dependencies:

   ```sh
   pnpm install
   ```

4. Start the development servers:

   ```sh
   pnpm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the preview website, or [http://localhost:3010](http://localhost:3010) to view the documentation website. Changes to most source files of Tabler core, preview and docs will rebuild the application and refresh the page.

To perform a one-off production build without a dev server, run:

```sh
pnpm run build
```

### Docker

1. From the root `tabler` directory, build the image:

   ```sh
   docker build -t tabler .
   ```

2. Run the image. The following command mounts the source directories into the container and exposes port 3000 (preview) and port 3010 (documentation):

   ```sh
   docker run -p 3000:3000 -p 3010:3010 -v $(pwd)/core:/app/core -v $(pwd)/preview:/app/preview -v $(pwd)/docs:/app/docs -v $(pwd)/shared:/app/shared tabler
   ```

3. Open [http://localhost:3000](http://localhost:3000) (preview) or [http://localhost:3010](http://localhost:3010) (documentation). Edit anything in the `core/`, `preview/`, `docs/` or `shared/` folders and watch your browser refresh the page after it has been rebuilt.

Alternatively, use Docker Compose: `docker compose up --build` builds and starts the container with the same mounts, ports and URLs.

## 🤝 Contributing

We welcome contributions of all kinds! Please read the [contributing guide](CONTRIBUTING.md) to learn about the development workflow, project structure and conventions. By participating, you agree to follow our [Code of Conduct](.github/CODE_OF_CONDUCT.md).

- **Found a bug?** [Open a bug report](https://github.com/tabler/tabler/issues/new?template=bug_report.yml).
- **Have an idea?** [Open a feature request](https://github.com/tabler/tabler/issues/new?template=feature_request.yml) or start a [discussion](https://github.com/tabler/tabler/discussions).
- **Found a security issue?** Please report it privately — see our [security policy](SECURITY.md).

## 🪴 Project activity

<p align="center">
	<img src="https://repobeats.axiom.co/api/embed/61d1db34446967b0848af68198a392067e0f5870.svg" alt="Repobeats analytics image" />
</p>

## 🤓 Creators

**Paweł Kuna**

- <https://x.com/codecalm>
- <https://github.com/codecalm>
- <https://codecalm.net>

**Bartłomiej Gawęda**

- <https://x.com/B_Gaweda>
- <https://github.com/BG-Software-BG>

**Bartosz Dobija**

- <https://github.com/Bartosz-Do>

## 👨‍🚀 Contributors

This project exists thanks to all the people who contribute.

<a href="https://github.com/tabler/tabler/graphs/contributors">
	<img src="https://opencollective.com/tabler/contributors.svg?width=890&button=false" alt="Tabler contributors">
</a>

## 📣 Social media

Stay up to date by joining our community on [X](https://x.com/tabler_io) and [Facebook](https://www.facebook.com/tabler.io).

## 📄 License

Tabler is licensed under the [MIT License](LICENSE).
