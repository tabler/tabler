const libs = require('../pages/_data/libs');
const { exec } = require('child_process');

libs.forEach(function (lib) {
  let cmd = `mkdir -p "dist/libs/${lib}" && cp -r node_modules/${lib} dist/libs/${lib}`;
  exec(cmd)
});
