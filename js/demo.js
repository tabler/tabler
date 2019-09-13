'use strict';

class TablerDemo
{
  constructor() {
    this.form = document.body.querySelector('.js-layout-form');
    if (this.form) {
      this.sidebar = document.body.querySelector('.js-sidebar');
      this.initFormControls();
    }

    // Prevents redirect at click to anchor, used to sets href attribute as `#` instead 'javascript:void(0)'.
    let anchors = document.body.querySelectorAll('a[href="#"]');
    for (let i = 0; i < anchors.length; i++) {
      anchors[i].addEventListener('click', (e) => {
        e.preventDefault();
      });
    }
  };

  getConfig() {
    return {
      colorScheme: localStorage.getItem('tablerColorScheme') || 'light',
      navPosition: localStorage.getItem('tablerNavPosition') || 'side',
      headerColor: localStorage.getItem('tablerHeaderColor') || 'light',
      headerFixed: localStorage.getItem('tablerHeaderFixed') || 'default',
      sidebarColor: localStorage.getItem('tablerSidebarColor') || 'dark',
      sidebarSize: localStorage.getItem('tablerSidebarSize') || 'default',
      sidebarPosition: localStorage.getItem('tablerSidebarPosition') || 'left',
      sidebarFixed: localStorage.getItem('tablerSidebarFixed') || 'fixed'
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
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.onSubmitForm();
    });

    let inputs = this.form.querySelectorAll('input[type="radio"]');
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('change', () => {
        this.onSubmitForm();
      });
    }
    
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
    if (this.form) {
      let elements = this.form.querySelectorAll(`[name="${name}"]`);

      if (elements) {
        elements.forEach((e) => e.checked = false);
        this.form.querySelector(`[name="${name}"][value="${value}"]`).checked = true;
      }
    }
  };

  /**
   * Color scheme toggle
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
        this.sidebar.classList.add('navbar-right');
      } else {
        this.sidebar.classList.remove('navbar-right');
      }

      this.setFormValue('sidebar-position', position);
    });
  };

  toggleSidebarSize(size) {
    return this.setConfig('sidebarSize', size, ['default', 'folded'], () => {
      if (size === 'folded') {
        this.sidebar.classList.add('navbar-folded');
      } else {
        this.sidebar.classList.remove('navbar-folded');
      }

      this.setFormValue('sidebar-size', size);
    });
  };

  toggleSidebarColor(color) {
    return this.setConfig('sidebarColor', color, ['dark', 'light'], () => {
      if (color == 'dark') {
        this.sidebar.classList.add('navbar-dark');
      } else {
        this.sidebar.classList.remove('navbar-dark');
      }

      this.setFormValue('sidebar-color', color);
    });
  };

  toggleSidebarFixed(fixed) {
    return this.setConfig('sidebarFixed', fixed, ['fixed', 'default'], () => {
      if (fixed == 'fixed') {
        this.sidebar.classList.add('navbar-fixed');
      } else {
        this.sidebar.classList.remove('navbar-fixed');
      }

      this.setFormValue('sidebar-fixed', fixed);
    });
  };

  toggleHeaderColor(color) {
    return this.setConfig('headerColor', color, ['dark', 'light'], () => {
      if (color == 'dark') {
        this.sidebar.classList.add('navbar-dark');
      } else {
        this.sidebar.classList.remove('navbar-dark');
      }

      this.setFormValue('header-color', color);
    });
  };

  toggleHeaderFixed(fixed) {
    return this.setConfig('headerFixed', fixed, ['fixed', 'default'], () => {
      if (fixed == 'fixed') {
        this.sidebar.classList.add('navbar-fixed');
      } else {
        this.sidebar.classList.remove('navbar-fixed');
      }

      this.setFormValue('header-fixed', fixed);
    });
  };
}

/**
 * Init demo
 */
(function () {
  window.DEMO = new TablerDemo();
})();
