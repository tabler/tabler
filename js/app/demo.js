'use strict';

class TablerDemo {
  constructor() {
    this.init();
  };

  init() {
    this.config = this.getConfig();

    console.log('config', this.config);
  };

  getConfig = function () {
    return {
      colorScheme: (localStorage.getItem('tablerColorScheme')) ? localStorage.getItem('tablerColorScheme') : 'light',
      navPosition: (localStorage.getItem('tablerNavPosition')) ? localStorage.getItem('tablerNavPosition') : 'side',
      sidebarColor: (localStorage.getItem('tablerSidebarColor')) ? localStorage.getItem('tablerSidebarColor') : 'light',
      sidebarSize: (localStorage.getItem('tablerSidebarSize')) ? localStorage.getItem('tablerSidebarSize') : 'default',
      sidebarPosition: (localStorage.getItem('tablerSidebarPosition')) ? localStorage.getItem('tablerSidebarPosition') : 'left'
    };
  };

  setConfig = function (key, value, availableValues) {
    if (availableValues && availableValues.indexOf(value) !== -1) {
      key = 'tabler' + key.charAt(0).toUpperCase() + key.slice(1);

      localStorage.setItem(key, value);
    }

    return this.getConfig();
  };

  renderManagerHtml(elem) {
    elem.innerHTML = 'test2';
  };

  toggleColorScheme(colorScheme) {
    return this.setConfig('colorScheme', colorScheme, ['dark', 'light']);
  };

  toggleNavPosition(position) {
    return this.setConfig('navPosition', position, ['top', 'side']);
  };

  toggleSidebarPosition(position) {
    return this.setConfig('sidebarPosition', position, ['left', 'right']);
  };

  toggleSidebarSize(size) {
    return this.setConfig('sidebarSize', size, ['default', 'folded']);
  };

  toggleSidebarColor(color) {
    return this.setConfig('sidebarColor', color, ['dark', 'light']);
  };
}

const demo = new TablerDemo();
window.DEMO = demo;

document.addEventListener("DOMContentLoaded", function () {
  let  elem = document.getElementById('layout-manager');

  if (elem) {
    demo.renderManagerHtml(elem);
  }
});
