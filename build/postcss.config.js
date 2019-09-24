/*
 * Tabler (v0.9.0): postcss.config.js
 * Copyright 2018-2019 The Tabler Authors
 * Copyright 2018-2019 codecalm
 * Licensed under MIT (https://github.com/tabler/tabler/blob/master/LICENSE)
 */

'use strict';

module.exports = ctx => ({
  map: ctx.file.dirname.includes('examples') ?
    false :
    {
      inline: false,
      annotation: true,
      sourcesContent: true
    },
  plugins: {
    autoprefixer: {
      cascade: false
    }
  }
});
