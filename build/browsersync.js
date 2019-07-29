const bs = require('browser-sync').create();

bs.init({
  watch: true,
  port: 4567,
  server: {
    routes: {
      '/': 'tmp',
      '/dist': 'dist',
      '/dist/fonts': 'fonts',
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
