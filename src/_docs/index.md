---
title: Introduction
icon: fe fe-flag
order: -1
---

We’ve created this admin panel for everyone who wants to create any templates based on our ready components. Our mission is to deliver a user-friendly, clear and easy administration panel, that can be used by both, simple websites and sophisticated systems. The only requirement is a basic HTML and CSS knowledge—as a reward, you'll be able to manage and visualize different types of data in the easiest possible way!



### Setup environment

To use our build system and run our documentation locally, you'll need a copy of Tabler's source files and Node. Follow these steps:

1. [Download and install Node.js](https://nodejs.org/download/), which we use to manage our dependencies.
2. Navigate to the root `/tabler` directory and run `npm install` to install our local dependencies listed in `package.json`.
3. [Install Ruby](https://www.ruby-lang.org/en/documentation/installation/), install [Bundler](https://bundler.io/) with `gem install bundler`, and finally run `bundle install`. This will install all Ruby dependencies, such as Jekyll and plugins.
   
   **Windows users:** Read [this guide](https://jekyllrb.com/docs/windows/) to get Jekyll up and running without problems.
  
When completed, you'll be able to run the various commands provided from the command line.

### Build Tabler locally

1. From the root `/tabler` directory, run `npm run serve` in the command line.
2. Open [http://localhost:4000](http://localhost:4000) in your browser, and voilà.
3. Any change in `/src` directory will build application and refresh the page.

<div class="alert alert-warning">
<strong>Warning!</strong> all changes made in <code>_site/</code> folder would be overwriten on application build.
</div>

### Bugs and feature requests

Have a bug or a feature request? [Please open a new issue](https://github.com/tabler/tabler/issues/new).