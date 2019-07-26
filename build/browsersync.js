const bs = require('browser-sync').create();

bs.init({
  watch: true,
  port: 4567,
  server: {
    routes: {
      '/': 'tmp',
      '/dist/fonts': 'fonts',
      '/dist': 'dist',
      '/libs': 'static/libs',
      '/img': 'static/img',
    },
  },
  files: ['tmp/**/*', 'dist/css/*.css', 'dist/js/*.js'],
  watchOptions: {
    ignoreInitial: true,
  },
  notify: false,
});
