'use strict';

class TablerDemo {
  constructor() {
    this.init();

    this.form = document.querySelector('.js-layout-form');

    if(this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.onSubmitForm();
      });

      var inputs = this.form.querySelectorAll('input[type="radio"]');
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', () => {
          this.onSubmitForm();
        });
      }
    }

    this.initFormControls();
  };

  init() {
    this.config = this.getConfig();
  };

  getConfig() {
    return {
      colorScheme: (localStorage.getItem('tablerColorScheme')) ? localStorage.getItem('tablerColorScheme') : 'light',
      navPosition: (localStorage.getItem('tablerNavPosition')) ? localStorage.getItem('tablerNavPosition') : 'side',
      headerColor: (localStorage.getItem('tablerHeaderColor')) ? localStorage.getItem('tablerHeaderColor') : 'light',
      headerFixed: (localStorage.getItem('tablerHeaderFixed')) ? localStorage.getItem('tablerHeaderFixed') : 'default',
      sidebarColor: (localStorage.getItem('tablerSidebarColor')) ? localStorage.getItem('tablerSidebarColor') : 'dark',
      sidebarSize: (localStorage.getItem('tablerSidebarSize')) ? localStorage.getItem('tablerSidebarSize') : 'default',
      sidebarPosition: (localStorage.getItem('tablerSidebarPosition')) ? localStorage.getItem('tablerSidebarPosition') : 'left',
      sidebarFixed: (localStorage.getItem('tablerSidebarFixed')) ? localStorage.getItem('tablerSidebarFixed') : 'fixed',
    };
  };

  setConfig(key, value, availableValues, onSuccess) {
    if (availableValues && availableValues.indexOf(value) !== -1) {
      key = 'tabler' + key.charAt(0).toUpperCase() + key.slice(1);

      localStorage.setItem(key, value);

      onSuccess && onSuccess(value);
    }

    return this.getConfig();
  };

  onSubmitForm() {
    const form = this.form;

    this.toggleColorScheme(form.querySelector('[name="color-scheme"]:checked').value);
    this.toggleNavPosition(form.querySelector('[name="nav-position"]:checked').value);
    this.toggleHeaderColor(form.querySelector('[name="header-color"]:checked').value);
    // this.toggleHeaderFixed(form.querySelector('[name="header-fixed"]:checked').value);
    this.toggleSidebarSize(form.querySelector('[name="sidebar-size"]:checked').value);
    this.toggleSidebarColor(form.querySelector('[name="sidebar-color"]:checked').value);
    this.toggleSidebarPosition(form.querySelector('[name="sidebar-position"]:checked').value);
    this.toggleSidebarFixed(form.querySelector('[name="sidebar-fixed"]:checked').value);
  };

  initFormControls() {
    const config = this.getConfig();

    this.toggleColorScheme(config.colorScheme);
    this.toggleNavPosition(config.navPosition);
    this.toggleHeaderColor(config.headerColor);
    // this.toggleHeaderFixed(config.headerFixed);
    this.toggleSidebarPosition(config.sidebarPosition);
    this.toggleSidebarSize(config.sidebarSize);
    this.toggleSidebarColor(config.sidebarColor);
    this.toggleSidebarFixed(config.sidebarFixed);
  };

  setFormValue(name, value) {
    if(this.form) {
      let elements = this.form.querySelectorAll(`[name="${name}"]`);

      if (elements) {
        elements.forEach((e) => e.checked = false);
        this.form.querySelector(`[name="${name}"][value="${value}"]`).checked = true;
      }
    }
  };

  /*
  Color scheme toggle
   */
  toggleColorScheme(color) {
    return this.setConfig('colorScheme', color, ['dark', 'light'], () => {
      if (color === 'dark') {
        document.body.classList.add('theme-dark');
      } else {
        document.body.classList.remove('theme-dark');
      }

      this.setFormValue('color-scheme', color);
    });
  };

  toggleNavPosition(position) {
    return this.setConfig('navPosition', position, ['top', 'side'], () => {
      this.setFormValue('nav-position', position);
    });
  };

  toggleSidebarPosition(position) {
    return this.setConfig('sidebarPosition', position, ['left', 'right'], () => {
      if (position === 'right') {
        document.querySelector('.js-sidebar').classList.add('navbar-right');
      } else {
        document.querySelector('.js-sidebar').classList.remove('navbar-right');
      }

      this.setFormValue('sidebar-position', position);
    });
  };

  toggleSidebarSize(size) {
    return this.setConfig('sidebarSize', size, ['default', 'folded'], () => {
      if (size === 'folded') {
        document.querySelector('.js-sidebar').classList.add('navbar-folded');
      } else {
        document.querySelector('.js-sidebar').classList.remove('navbar-folded');
      }

      this.setFormValue('sidebar-size', size);
    });
  };

  toggleSidebarColor(color) {
    console.log('color', color);
    return this.setConfig('sidebarColor', color, ['dark', 'light'], () => {
      if (color === 'dark') {
        document.querySelector('.js-sidebar').classList.add('navbar-dark');
      } else {
        document.querySelector('.js-sidebar').classList.remove('navbar-dark');
      }

      this.setFormValue('sidebar-color', color);
    });
  };

  toggleSidebarFixed(fixed) {
    return this.setConfig('sidebarFixed', fixed, ['fixed', 'default'], () => {
      if (fixed === 'fixed') {
        document.querySelector('.js-sidebar').classList.add('navbar-fixed');
      } else {
        document.querySelector('.js-sidebar').classList.remove('navbar-fixed');
      }

      this.setFormValue('sidebar-fixed', fixed);
    });
  };

  toggleHeaderColor(color) {
    return this.setConfig('headerColor', color, ['dark', 'light'], () => {
      if (color === 'dark') {
        document.querySelector('.js-header').classList.add('navbar-dark');
      } else {
        document.querySelector('.js-header').classList.remove('navbar-dark');
      }

      this.setFormValue('header-color', color);
    });
  };

  toggleHeaderFixed(fixed) {
    return this.setConfig('headerFixed', fixed, ['fixed', 'default'], () => {
      if (fixed === 'fixed') {
        document.querySelector('.js-header').classList.add('navbar-fixed');
      } else {
        document.querySelector('.js-header').classList.remove('navbar-fixed');
      }

      this.setFormValue('header-fixed', fixed);
    });
  };
}

/*
Init demo
 */


(function () {
  const demo = new TablerDemo();
  window.DEMO = demo;

  let elem = document.getElementById('layout-manager');

  if (elem) {
    demo.renderManagerHtml(elem);
  }
})();
