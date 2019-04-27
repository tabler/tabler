'use strict';

const pkg = require('../package.json');
const year = new Date().getFullYear();

function getBanner(pluginFilename) {
  return `/*!
  * Tabler${pluginFilename ? ` ${pluginFilename}` : ''} v${pkg.version} (${pkg.homepage})
  * Copyright 2018-${year} ${pkg.author}
  * Licensed under MIT (https://github.com/twbs/tabler/blob/master/LICENSE)
  */`;
}

module.exports = getBanner;
