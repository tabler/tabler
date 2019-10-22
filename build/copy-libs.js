const libs = require('../pages/_data/libs'),
  path = require('path'),
  { exec } = require('child_process');

const all_libs = libs.js.concat(libs.css);

all_libs.forEach(function (lib) {
  let dirname = path.dirname(lib);
  let cmd = `mkdir -p "dist/libs/${dirname}" && cp -r node_modules/${lib} dist/libs/${lib}`;
  exec(cmd)
});
