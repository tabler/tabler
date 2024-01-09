/*!
  * Tabler v1.0.0-beta20 (https://tabler.io)
  * Copyright 2018-2023 codecalm
  * Licensed under MIT (https://github.com/tabler/tabler/blob/main/LICENSE)
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('autosize'), require('imask'), require('bootstrap')) :
	typeof define === 'function' && define.amd ? define(['autosize', 'imask', 'bootstrap'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.autosize, global.IMask, global.bootstrap));
})(this, (function (autosize, IMask, bootstrap) { 'use strict';

	function _interopNamespaceDefault(e) {
		const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
		if (e) {
			for (const k in e) {
				if (k !== 'default') {
					const d = Object.getOwnPropertyDescriptor(e, k);
					Object.defineProperty(n, k, d.get ? d : {
						enumerable: true,
						get: () => e[k]
					});
				}
			}
		}
		n.default = e;
		return Object.freeze(n);
	}

	const bootstrap__namespace = /*#__PURE__*/_interopNamespaceDefault(bootstrap);

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
	  return new bootstrap.Dropdown(dropdownTriggerEl, options);
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
	  return new bootstrap.Tooltip(tooltipTriggerEl, options);
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
	  return new bootstrap.Popover(popoverTriggerEl, options);
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

	const EnableActivationTabsFromLocationHash = () => {
	  const locationHash = window.location.hash;
	  if (locationHash) {
	    const tabsList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tab"]'));
	    const matchedTabs = tabsList.filter(tab => tab.hash === locationHash);
	    matchedTabs.map(tab => {
	      new bootstrap.Tab(tab).show();
	    });
	  }
	};
	EnableActivationTabsFromLocationHash();

	/*
	Toasts
	 */
	let toastsTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="toast"]'));
	toastsTriggerList.map(function (toastTriggerEl) {
	  return new bootstrap.Toast(toastTriggerEl);
	});

	const prefix = 'tblr-';
	const hexToRgba = (hex, opacity) => {
	  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	  return result ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${opacity})` : null;
	};
	const getColor = (color, opacity = 1) => {
	  const c = getComputedStyle(document.body).getPropertyValue(`--${prefix}${color}`).trim();
	  if (opacity !== 1) {
	    return hexToRgba(c, opacity);
	  }
	  return c;
	};

	const tabler = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
		__proto__: null,
		getColor,
		hexToRgba,
		prefix
	}, Symbol.toStringTag, { value: 'Module' }));

	//Vendor

	globalThis.bootstrap = bootstrap__namespace;
	globalThis.tabler = tabler;

}));
