/*
 * Tabler (v0.9.0): browsersync.js
 * Copyright 2018-2019 The Tabler Authors
 * Copyright 2018-2019 codecalm
 * Licensed under MIT (https://github.com/tabler/tabler/blob/master/LICENSE)
 */

const bs = require('browser-sync').create();

bs.init({
  watch: true,
  server: {
    routes: {
      '/': 'tmp',
      '/dist': 'tmp-dist',
      '/libs': 'static/libs',
      '/tmp-dist/img': 'img',
      '/static': 'static',
      '/node_modules': 'node_modules',
    },
  },
  files: ['tmp/**/*', 'tmp-dist/css/*.css', 'tmp-dist/js/*.js', 'tmp-dist/img/*.svg'],
  watchOptions: {
    ignoreInitial: true,
  },
  reloadDelay: 1000,
  notify: false,
  open: false,
  snippetOptions: {
    rule: {
      match: /<\/head>/i,
      fn: function (snippet, match) {
        return snippet + match;
      }
    }
  }
});
