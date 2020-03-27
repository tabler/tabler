# Tabler

A premium and open source dashboard template with a responsive and high-quality UI.

<strong><a href="https://preview-dev.tabler.io">View Demo</a> | <a href="https://github.com/tabler/tabler-react">View React Version</a> | <a href="https://github.com/tabler/tabler/archive/master.zip">Download ZIP</a> | <a href="https://join.slack.com/t/tabler-ui/shared_invite/enQtMzQxMTYxODk5NDYwLWU4Y2FiNWYxN2UyNWUzOTBjNmU0ZGM2ZDViMjQzMWMyZWM0ZDFkMGRhZGFiYzFhZjM1NmIxOGQ2ZDUwZjlhMTU">Join us on Slack</a></strong>

![Tabler preview](/static/tabler-preview.png?raw=true)


## Status

<a href="https://www.npmjs.com/package/tabler"><a href="#backers" alt="sponsors on Open Collective"><img src="https://opencollective.com/tabler/backers/badge.svg"/></a> <a href="#sponsors" alt="Sponsors on Open Collective"><img src="https://opencollective.com/tabler/sponsors/badge.svg"/></a> <img src="https://img.shields.io/npm/dt/tabler.svg" alt="Total Downloads"></a> <a href="https://github.com/tabler/tabler/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/tabler.svg" alt="License"></a> <a href="https://github.com/tabler/tabler/releases"><img src="https://img.shields.io/npm/v/tabler.svg" alt="Latest Release"></a>

[![Backers on Open Collective](https://opencollective.com/tabler/backers/badge.svg)](#backers)
 [![Sponsors on Open Collective](https://opencollective.com/tabler/sponsors/badge.svg)](#sponsors)


## Features

We've created this admin panel for everyone who wants to create templates based on our pre-made components. Our mission is to deliver a user-friendly, clear and easy administration panel that can be used by both simple websites and sophisticated systems. The only requirement is basic HTML and CSS (and some [Liquid](https://github.com/Shopify/liquid/wiki)) knowledge — as a reward, you'll be able to manage and visualise different types of data in the easiest possible way!

* **Responsive:** With the support for mobile, tablet and desktop displays, it doesn’t matter what device you’re using. Tabler is responsive in all major browsers.
* **Cross Browser:** Our theme works perfectly with the latest Chrome, Firefox+, latest Safari, Opera, Edge and mobile browsers. We work hard to to provide continuous support for them.
* **HTML5 & CSS3:** We use only modern web technologies, such as HTML5 and CSS3. Our theme includes some subtle CSS3 animations, which will help you attract attention.
* **Clean Code:** We followed Bootstrap’s guidelines carefully to make your integration as easy as possible. All code is handwritten and W3C valid.
* **Demo pages**: Tabler features over 20 individual pages using various components, which gives you the freedom to choose and combine. All components can vary in color and styling that you can easily modify using Sass. Sky is the limit!
* **Single Page Application versions:** [Tabler React](https://github.com/tabler/tabler-react) has React components for Tabler.


## Sponsor Tabler

<a href="https://github.com/sponsors/codecalm" target="_blank"><img src="/static/sponsor-banner-readme.png?raw=true" alt="Sponsor Tabler" /></a>


### Sponsors

Support this project by becoming a sponsor. Your logo will show up in this README with a link to your website. [Become a sponsor!](https://opencollective.com/tabler#sponsor)

<a href="https://opencollective.com/tabler/tiers/sponsor/0/website" target="_blank"><img src="https://opencollective.com/tabler/tiers/sponsor/0/avatar.svg" /></a>
<a href="https://opencollective.com/tabler/tiers/sponsor/1/website" target="_blank"><img src="https://opencollective.com/tabler/tiers/sponsor/1/avatar.svg" /></a>
<a href="https://opencollective.com/tabler/tiers/sponsor/2/website" target="_blank"><img src="https://opencollective.com/tabler/tiers/sponsor/2/avatar.svg" /></a>
<a href="https://opencollective.com/tabler/tiers/sponsor/3/website" target="_blank"><img src="https://opencollective.com/tabler/tiers/sponsor/3/avatar.svg" /></a>
<a href="https://opencollective.com/tabler/tiers/sponsor/4/website" target="_blank"><img src="https://opencollective.com/tabler/tiers/sponsor/4/avatar.svg" /></a>
<a href="https://opencollective.com/tabler/tiers/sponsor/5/website" target="_blank"><img src="https://opencollective.com/tabler/tiers/sponsor/5/avatar.svg" /></a>
<a href="https://opencollective.com/tabler/tiers/sponsor/6/website" target="_blank"><img src="https://opencollective.com/tabler/tiers/sponsor/6/avatar.svg" /></a>
<a href="https://opencollective.com/tabler/tiers/sponsor/7/website" target="_blank"><img src="https://opencollective.com/tabler/tiers/sponsor/7/avatar.svg" /></a>
<a href="https://opencollective.com/tabler/tiers/sponsor/8/website" target="_blank"><img src="https://opencollective.com/tabler/tiers/sponsor/8/avatar.svg" /></a>
<a href="https://opencollective.com/tabler/tiers/sponsor/9/website" target="_blank"><img src="https://opencollective.com/tabler/tiers/sponsor/9/avatar.svg" /></a>


## Setup environment

To use our build system and run our documentation locally, you'll need a copy of Tabler's source files. Follow the steps below:

1. [Install Node.js](https://nodejs.org/download/), which we use to manage our dependencies.
2. Navigate to the root `/tabler` directory and run `npm install` to install our local dependencies listed in `package.json`.
3. [Install Ruby](https://www.ruby-lang.org/en/documentation/installation/) - the recommended version is [2.5.5](https://cache.ruby-lang.org/pub/ruby/2.5/ruby-2.5.5.tar.gz).
4. [Install Bundler](https://bundler.io) with `gem install bundler` and finally run `bundle install`. It will install all Ruby dependencies, such as [Jekyll and plugins](https://jekyllrb.com).

**Windows users**:

1. [Install Git](https://git-scm.com/download/win) in `C:\Program Files\git\bin` directory and run `npm config set script-shell "C:\\Program Files\git\bin\bash.exe"` to change the default shell.
2. [Install Ruby+Devkit](https://rubyinstaller.org/downloads/) - the recommended version is [2.5.5](https://github.com/oneclick/rubyinstaller2/releases/download/RubyInstaller-2.5.5-1/rubyinstaller-devkit-2.5.5-1-x86.exe).
3. [Read guide](https://jekyllrb.com/docs/installation/windows/) to get Jekyll up and running without problems.

Once you complete the setup, you'll be able to run the various commands provided from the command line.


## Build locally

1. From the root `/tabler` directory, run `npm run start` in the command line.
2. Open [http://localhost:3000](http://localhost:3000) in your browser, and voilà.
3. Any change in the `/pages` directory will build the application and refresh the page.

**Note**:
Run `npm run build` for reforms a one off build application without refresh.
Open [http://localhost:3001](http://localhost:3001) to configure the Web server.


## Feature requests

https://tabler.canny.io/feature-requests


## Bugs and feature requests

Found a bug or have a feature request? [Please open a new issue](https://github.com/tabler/tabler/issues/new).


## Creators

**Paweł Kuna**

- <https://twitter.com/codecalm>
- <https://github.com/codecalm>
- <https://codecalm.net>


### Contributors

This project exists thanks to all the people who contribute.

<img src="https://opencollective.com/tabler/contributors.svg?width=890&button=false" />

### Backers

Thank you to all our backers! 🙏 [Become a backer](https://opencollective.com/tabler#backer)

<a href="https://opencollective.com/tabler#backers" target="_blank"><img src="https://opencollective.com/tabler/tiers/backer.svg?width=890&button=false" /></a>

## License

See the [LICENSE](https://github.com/tabler/tabler/blob/master/LICENSE) file.
