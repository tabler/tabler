/*!
  * Tabler v1.0.0 (https://tabler.io)
  * Copyright 2018-2024 codecalm
  * Licensed under MIT (https://github.com/tabler/tabler/blob/main/LICENSE)
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('autosize'), require('imask'), require('bootstrap')) :
	typeof define === 'function' && define.amd ? define(['autosize', 'imask', 'bootstrap'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.autosize, global.IMask, global.Bootstrap));
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
	  return new bootstrap.Dropdown(dropdownTriggerEl, options);
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
	  return new bootstrap.Tooltip(tooltipTriggerEl, options);
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
	  return new bootstrap.Popover(popoverTriggerEl, options);
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

	var EnableActivationTabsFromLocationHash = function EnableActivationTabsFromLocationHash() {
	  var locationHash = window.location.hash;
	  if (locationHash) {
	    var tabsList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tab"]'));
	    var matchedTabs = tabsList.filter(function (tab) {
	      return tab.hash === locationHash;
	    });
	    matchedTabs.map(function (tab) {
	      new bootstrap.Tab(tab).show();
	    });
	  }
	};
	EnableActivationTabsFromLocationHash();

	/*
	Toasts
	 */
	var toastsTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="toast"]'));
	toastsTriggerList.map(function (toastTriggerEl) {
	  if (!toastTriggerEl.hasAttribute('data-bs-target')) {
	    return;
	  }
	  var toastEl = new bootstrap.Toast(toastTriggerEl.getAttribute('data-bs-target'));
	  toastTriggerEl.addEventListener('click', function () {
	    toastEl.show();
	  });
	});

	var prefix = 'tblr-';
	var hexToRgba = function hexToRgba(hex, opacity) {
	  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	  return result ? "rgba(".concat(parseInt(result[1], 16), ", ").concat(parseInt(result[2], 16), ", ").concat(parseInt(result[3], 16), ", ").concat(opacity, ")") : null;
	};
	var getColor = function getColor(color) {
	  var opacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	  var c = getComputedStyle(document.body).getPropertyValue("--".concat(prefix).concat(color)).trim();
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
//# sourceMappingURL=tabler.js.map
