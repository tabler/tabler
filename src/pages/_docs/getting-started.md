---
title: Getting started
menu: docs.base.getting-started
---

## What are the benefits?

Tabler is a perfect solution if you want to create an interface which is not only user-friendly but also fully responsive. Thanks to the big choice of ready-made components, you can customize your design and adapt it to the needs of even the most demanding users. On top of that, Tabler is an open source solution, continuously developed and improved by the open source community.

## Set up the environment

To use our build system and run our documentation locally, you'll need a copy of Tabler's source files. Follow the steps below:

1. [Install Node.js](https://nodejs.org/download/), which we use to manage our dependencies.
2. Navigate to the root `/tabler` directory and run `npm install` to install our local dependencies listed in `package.json`.
3. [Install Ruby](https://ruby-lang.org/en/documentation/installation/) - the recommended version is [2.5.5](https://cache.ruby-lang.org/pub/ruby/2.5/ruby-2.5.5.tar.gz).
4. [Install Bundler](https://bundler.io) with `gem install bundler` and, finally, run `bundle install`. It will install all Ruby dependencies, such as [Jekyll and plugins](https://jekyllrb.com).

### Windows users
1. [Install Git](https://git-scm.com/download/win) in `C:\Program Files\git\bin` directory and run `npm config set script-shell "C:\Program Files\git\bin\bash.exe"` to change the default shell.
2. [Install Ruby+Devkit](https://rubyinstaller.org/downloads/) - recommended version is [2.5.5](https://github.com/oneclick/rubyinstaller2/releases/download/RubyInstaller-2.5.5-1/rubyinstaller-devkit-2.5.5-1-x86.exe).
3. [Read guide](https://jekyllrb.com/docs/installation/windows/) to get Jekyll up and running without problems.

Once you've completed the setup, you'll be able to run the various commands provided from the command line.

## Build Tabler locally

1. From the root `/tabler` directory, run `npm run start` in the command line.
2. Open [http://localhost:3000](http://localhost:3000) in your browser, and voilà.
3. Any change in `/src` directory will build the application and refresh the page.


## Bugs and feature requests

Found a bug or have a feature request? [Please open a new issue](https://github.com/tabler/tabler/issues/new).