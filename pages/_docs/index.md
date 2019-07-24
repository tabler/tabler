---
title: Introduction
menu: docs.index
icon: flag
order: -1
---

We’ve created this admin panel for everyone who wants to create any templates based on our ready components. Our mission is to deliver a user-friendly, clear and easy administration panel, that can be used by both, simple websites and sophisticated systems. The only requirement is a basic HTML and CSS knowledge—as a reward, you'll be able to manage and visualize different types of data in the easiest possible way!

### Setup environment

To use our build system and run our documentation locally, you'll need a copy of Tabler's source files. Follow these steps:

1. [Install Node.js](https://nodejs.org/download/), which we use to manage our dependencies.
2. Navigate to the root `/tabler` directory and run `npm install` to install our local dependencies listed in `package.json`.
3. [Install Ruby](https://ruby-lang.org/en/documentation/installation/), recommended version is [2.5.5](https://cache.ruby-lang.org/pub/ruby/2.5/ruby-2.5.5.tar.gz).
4. [Install Bundler](https://bundler.io) with `gem install bundler`, and finally run `bundle install`. This will install all Ruby dependencies, such as [Jekyll and plugins](https://jekyllrb.com).
   
**Windows users**:
1. [Install Git](https://git-scm.com/download/win) in `C:\\Program Files\\git\\bin` directory and run `npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"` to change default shell.
2. [Install Ruby+Devkit](https://rubyinstaller.org/downloads/), recommended version is [2.5.5](https://github.com/oneclick/rubyinstaller2/releases/download/RubyInstaller-2.5.5-1/rubyinstaller-devkit-2.5.5-1-x86.exe).
3. [Read guide](https://jekyllrb.com/docs/installation/windows/) to get Jekyll up and running without problems.
  
When completed, you'll be able to run the various commands provided from the command line.

### Build Tabler locally

1. From the root `/tabler` directory, run `npm run start` in the command line.
2. Open [http://localhost:4000](http://localhost:4000) in your browser, and voilà.
3. Any change in `/pages` directory will build application and refresh the page.

**Note**:
Run `npm run build` for rerforms a one off build application without refresh.
Open [http://localhost:3001](http://localhost:3001) to configure the Web server.

### Bugs and feature requests

Have a bug or a feature request? [Please open a new issue](https://github.com/tabler/tabler/issues/new).
