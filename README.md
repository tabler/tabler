<p align="center">
<a href="https://github.com/tabler/tabler"><img src="https://raw.githubusercontent.com/tabler/tabler/refs/heads/dev/preview/static/logo.svg" alt="A premium and open source dashboard template with a responsive and high-quality UI." width="300"></a><br><br>
A premium and open source dashboard template with a responsive and high-quality UI.
</p>

<p align="center">
<a href="https://www.npmjs.com/package/@tabler/core" target="__blank"><img src="https://img.shields.io/npm/v/@tabler/core?color=1864ab&label=Latest+version" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/@tabler/core" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@tabler/core?color=1971c2&label=Downloads"></a>
<a href="https://preview.tabler.io" target="__blank"><img src="https://img.shields.io/static/v1?label=Demo&message=preview&color=228be6" alt="Tabler preview"></a>
<a href="https://github.com/tabler/tabler/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/tabler.svg?label=License&message=MIT&color=1c7ed6" alt="License"></a>
<a href="https://github.com/tabler/tabler/archive/dev.zip" target="__blank"><img src="https://img.shields.io/static/v1?label=Download&message=ZIP&color=339af0" alt="Tabler preview"></a>
<a href="https://github.com/tabler/tabler/actions/workflows/test.yml" target="__blank"><img alt="Test build" src="https://github.com/tabler/tabler/actions/workflows/test.yml/badge.svg"></a>
<a href="https://github.com/tabler/tabler" target="__blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/tabler/tabler?style=social"></a>
</p>

## Sponsors

**If you want to support our project and help us grow it, you can [become a sponsor on GitHub](https://github.com/sponsors/codecalm) or just [donate on PayPal](https://paypal.me/codecalm) :)**

<p align="center">
	<a href="https://github.com/sponsors/codecalm">
		<img src="https://cdn.jsdelivr.net/gh/tabler/sponsors@latest/sponsors.svg" alt="Tabler sponsors">
	</a>
</p>

<p align="center">
	<a href="https://github.com/sponsors/codecalm" target="_blank">
			<img src="https://raw.githubusercontent.com/tabler/tabler/dev/preview/static/sponsor-banner-homepage.svg" alt="Sponsor Banner">
	</a>
</p>

## Testing

<p align="center">Visual testing with:</p>

<p align="center">
	<a href="https://argos-ci.com/" target="_blank">
		<picture>
			<img src="https://github.com/user-attachments/assets/7d231a26-eff5-4fc5-8392-b2a679a7c572" alt="Argos-CI" height="164" />
		</picture>
	</a>
</p>

<p align="center">Browser testing via:</p>

<p align="center">
	<a href="https://www.lambdatest.com/" target="_blank">
		<picture>
			<source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/14dd2a0a-bafe-436e-a6cb-29636278c781">
			<source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/d3dede5a-d702-47c3-bb66-4d887948ed83">
			<img src="https://github.com/user-attachments/assets/d3dede5a-d702-47c3-bb66-4d887948ed83" alt="labmdatest" width="296">
		</picture>
	</a>
</p>

## 🔎 Preview

Tabler is fully responsive and compatible with all modern browsers. Thanks to its modern and user-friendly design you can create a fully functional interface that users will love! Choose the layouts and components you need and customize them to make your design consistent and eye-catching. Every component has been created with attention to detail to make your interface beautiful! <a href="https://preview.tabler.io">Show me a demo</a>

<p align="center">
	<a href="https://preview.tabler.io" target="_blank">
			<img src="https://raw.githubusercontent.com/tabler/tabler/dev/preview/static/tabler-preview.png" alt="Tabler Preview">
	</a>
</p>

## 🚀 Features

We've created this admin panel for everyone who wants to create templates based on our pre-made components. Our mission is to deliver a user-friendly, clear and easy administration panel that can be used by both simple websites and sophisticated systems. The only requirement is basic HTML and CSS (and some [Liquid](https://github.com/Shopify/liquid/wiki)) knowledge — as a reward, you'll be able to manage and visualize different types of data in the easiest possible way!

* **Responsive:** With the support for mobile, tablet and desktop displays, it doesn’t matter what device you’re using. Tabler is responsive in all major browsers.
* **Cross Browser:** Our theme works perfectly with the latest Chrome, Firefox+, Safari, Opera, Edge and mobile browsers. We work hard to provide continuous support for them.
* **HTML5 & CSS3:** We use only modern web technologies, such as HTML5 and CSS3. Our theme includes some subtle CSS3 animations, which will help you attract attention.
* **Clean Code:** We followed Bootstrap’s guidelines carefully to make your integration as easy as possible. All code is handwritten and W3C valid.
* **Demo pages**: Tabler features over 20 individual pages using various components, which gives you the freedom to choose and combine. All components can vary in color and styling that you can easily modify using Sass. Sky is the limit!

## 📖 Documentation

The documentation is available at https://tabler.io/docs/

## 🪴 Project Activity

<p align="center">
	<img src="https://repobeats.axiom.co/api/embed/61d1db34446967b0848af68198a392067e0f5870.svg" alt="Repobeats analytics image" />
</p>

## Installation

### Package Managers

Tabler is distributed via npm. You can install it with this or your preferred JavaScript package manager:

```sh
npm install --save @tabler/core
```

### CDN support

All files included in `@tabler/core` npm package are also available over a CDN.

#### Javascript

```html
<script src="https://cdn.jsdelivr.net/npm/@tabler/core@latest/dist/js/tabler.min.js"></script>
```

#### Styles

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/core@latest/dist/css/tabler.min.css">
```

## Building locally

To build a copy of Tabler locally, you have two options. You can either set up your device directly with the development tools required to build Tabler, or if you would prefer not to install all the development dependencies directly onto your device, you can use a Dockerfile that Tabler provides to build a docker image. Instructions follow below.

### First steps: Downloading the Tabler source files

With either method, the first thing you'll want to do is download a copy of the Tabler source files to your device.

#### From the Tabler GitHub releases page

If you don't want to edit the source code once you've downloaded it, and aren't interested in merging future project updates into your copy, you can just download the source files straight from the [Tabler releases on GitHub](https://github.com/tabler/tabler/releases) and extract the contents to a directory called `tabler`.

#### Cloning with Git

If you **do** wish to edit the source code after downloading it, for example to contribute changes back to the Tabler project, you'll want to do this by cloning it with Git:
1. If you don't have Git installed on your device, download and install it. You can find instructions at [https://git-scm.com/downloads](https://git-scm.com/downloads).
2. (Optional) **Windows users:** you could optionally install Git in the `C:\Program Files\git\bin` directory and run `npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"` to change the default shell.
3. Clone the Tabler project into a folder on your device. Instructions can be found at [cloning a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

### Installing and running development tools directly

1. [Install Node.js](https://nodejs.org/download/), which we use to manage our dependencies.
2. [Install pnpm](https://pnpm.io/installation) (We recommend either by [Using Corepack](https://pnpm.io/installation#using-corepack) or by [Using npm](https://pnpm.io/installation#using-npm))
3. From the root `/tabler` directory where you downloaded the Tabler source files, run installation on the command line:
```sh
pnpm install
```
4. Then execute the following to start up the application stack:
```sh
pnpm run start
```
5. Open [http://localhost:3000](http://localhost:3000) in your browser, and voilà.
Any change in the `/src` directory will rebuild the application and refresh the page.

**Note**:
If you wish to perform a one-off build without auto-refresh on any changes, you can run:
```sh
pnpm run build
```
You can open [http://localhost:3001](http://localhost:3001) to configure the Web server.


### Installing and running development tools with Docker

**Plain Docker**

Here is an example of how to use this image:

1. From the root `/tabler` directory where you downloaded the Tabler source files, build the tabler image:
```sh
docker build -t tabler .
```
2. Run the tabler image. The following command mounts the `src` directory into the container, exposes port 3000 to browse the website locally, and exposes port 3001 to automatically sync changes:
```sh
docker run -p 3000:3000 -p 3001:3001 -v $(pwd)/src:/app/src tabler
```
3. Open your browser to [http://localhost:3000](http://localhost:3000). Edit anything in the `src/` folder and watch your browser refresh the page after it has been rebuilt.

**Docker Compose**

You can also use the docker compose config from this repo. From the root `/tabler` directory where you downloaded the Tabler source files, use `docker compose build && docker compose up` or `docker compose up --build` to build and start the container. Edit anything in the `src/` folder the same way as with plain docker and access the same URLs and ports in your browser.

## Bugs and feature requests

Found a bug or have a feature request? [Please open a new issue](https://github.com/tabler/tabler/issues/new).

## 🤓 Creators

**Paweł Kuna**

- <https://x.com/codecalm>
- <https://github.com/codecalm>
- <https://codecalm.net>

**Bartłomiej Gawęda**

- <https://x.com/B_Gaweda>
- <https://github.com/BG-Software-BG>

## 👨‍🚀 Contributors

This project exists thanks to all the people who contribute.

<img src="https://opencollective.com/tabler/contributors.svg?width=890&button=false" />

## Social media

Stay up to date by joining our community on <a href="https://x.com/tabler_io" >X</a> and <a href="https://www.facebook.com/tabler.io">Facebook</a>

## License

See the [LICENSE](https://github.com/tabler/tabler/blob/master/LICENSE) file.

