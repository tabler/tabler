/*!
  * Tabler v1.0.0-beta20 (https://tabler.io)
  * Copyright 2018-2023 codecalm
  * Licensed under MIT (https://github.com/tabler/tabler/blob/main/LICENSE)
  */
import autosize from 'autosize';
import IMask from 'imask';
import { Dropdown, Tooltip, Popover, Toast } from 'bootstrap';

// Autosize plugin

const elements = document.querySelectorAll('[data-bs-toggle="autosize"]');
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
let dropdownTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'));
dropdownTriggerList.map(function (dropdownTriggerEl) {
  let options = {
    boundary: dropdownTriggerEl.getAttribute('data-bs-boundary') === 'viewport' ? document.querySelector('.btn') : 'clippingParents'
  };
  return new Dropdown(dropdownTriggerEl, options);
});

let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (tooltipTriggerEl) {
  let options = {
    delay: {
      show: 50,
      hide: 50
    },
    html: tooltipTriggerEl.getAttribute("data-bs-html") === "true" ?? false,
    placement: tooltipTriggerEl.getAttribute('data-bs-placement') ?? 'auto'
  };
  return new Tooltip(tooltipTriggerEl, options);
});

/*
Core popovers
 */
let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
popoverTriggerList.map(function (popoverTriggerEl) {
  let options = {
    delay: {
      show: 50,
      hide: 50
    },
    html: popoverTriggerEl.getAttribute('data-bs-html') === "true" ?? false,
    placement: popoverTriggerEl.getAttribute('data-bs-placement') ?? 'auto'
  };
  return new Popover(popoverTriggerEl, options);
});

/*
Switch icons
 */
let switchesTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="switch-icon"]'));
switchesTriggerList.map(function (switchTriggerEl) {
  switchTriggerEl.addEventListener('click', e => {
    e.stopPropagation();
    switchTriggerEl.classList.toggle('active');
  });
});

/*
Toasts
 */
let toastsTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="toast"]'));
toastsTriggerList.map(function (toastTriggerEl) {
  return new Toast(toastTriggerEl);
});
