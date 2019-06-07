'use strict';

const fs = require('fs'),
  path = require('path'),
  yaml = require('yaml');

const data = fs.readFileSync(path.resolve(__dirname, '../scss/fonts/_tabler-webfont.scss'), "utf8"),
  re = /\$icon-([^\-\s]+)-([^:\s]+):\s'([^'\n]+)';/g;

let items = {};

data.replace(re, function (match, g1, g2, g3) {
  if(!items[g1]) {
    items[g1] = {};
  }

  items[g1][g2] = g3;
});


fs.writeFileSync('pages/_data/icons.yml', yaml.stringify(items));
