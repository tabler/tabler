/*!
  * Tabler v1.0.0 (https://tabler.io)
  * Copyright 2018-2024 codecalm
  * Licensed under MIT (https://github.com/tabler/tabler/blob/main/LICENSE)
  */
import autosize from 'autosize';
import IMask from 'imask';
import { Dropdown, Tooltip, Popover, Toast } from 'bootstrap';

// Autosize plugin

var elements = document.querySelectorAll('[data-bs-toggle="autosize"]');
if (elements.length) {
  elements.forEach(function (element) {
    autosize(element);
  });
}

// Input mask plugin

var maskElementList = [].slice.call(document.querySelectorAll('[data-mask]'));
maskElementList.map(function (maskEl) {
  return new IMask(maskEl, {
    mask: maskEl.dataset.mask,
    lazy: maskEl.dataset['mask-visible'] === 'true'
  });
});

/*
Core dropdowns
 */
var dropdownTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'));
dropdownTriggerList.map(function (dropdownTriggerEl) {
  var options = {
    boundary: dropdownTriggerEl.getAttribute('data-bs-boundary') === 'viewport' ? document.querySelector('.btn') : 'clippingParents'
  };
  return new Dropdown(dropdownTriggerEl, options);
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (tooltipTriggerEl) {
  var _ref, _tooltipTriggerEl$get;
  var options = {
    delay: {
      show: 50,
      hide: 50
    },
    html: (_ref = tooltipTriggerEl.getAttribute("data-bs-html") === "true") !== null && _ref !== void 0 ? _ref : false,
    placement: (_tooltipTriggerEl$get = tooltipTriggerEl.getAttribute('data-bs-placement')) !== null && _tooltipTriggerEl$get !== void 0 ? _tooltipTriggerEl$get : 'auto'
  };
  return new Tooltip(tooltipTriggerEl, options);
});

/*
Core popovers
 */
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
popoverTriggerList.map(function (popoverTriggerEl) {
  var _ref, _popoverTriggerEl$get;
  var options = {
    delay: {
      show: 50,
      hide: 50
    },
    html: (_ref = popoverTriggerEl.getAttribute('data-bs-html') === "true") !== null && _ref !== void 0 ? _ref : false,
    placement: (_popoverTriggerEl$get = popoverTriggerEl.getAttribute('data-bs-placement')) !== null && _popoverTriggerEl$get !== void 0 ? _popoverTriggerEl$get : 'auto'
  };
  return new Popover(popoverTriggerEl, options);
});

/*
Switch icons
 */
var switchesTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="switch-icon"]'));
switchesTriggerList.map(function (switchTriggerEl) {
  switchTriggerEl.addEventListener('click', function (e) {
    e.stopPropagation();
    switchTriggerEl.classList.toggle('active');
  });
});

/*
Toasts
 */
var toastsTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="toast"]'));
toastsTriggerList.map(function (toastTriggerEl) {
  if (!toastTriggerEl.hasAttribute('data-bs-target')) {
    return;
  }
  var toastEl = new Toast(toastTriggerEl.getAttribute('data-bs-target'));
  toastTriggerEl.addEventListener('click', function () {
    toastEl.show();
  });
});
//# sourceMappingURL=tabler.esm.js.map
