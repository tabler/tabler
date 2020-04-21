'use strict';

(function () {
	/**
	 * Bootstrap4 tooltip plugin.
	 * @link https://getbootstrap.com/docs/4.4/components/tooltips/
	 */
	let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'));
	tooltipTriggerList.map(function (tooltipTriggerEl) {
		let options = {
			delay: {show: 50, hide: 50},
			html: true,
			placement: 'auto'
		};
		return new bootstrap.Tooltip(tooltipTriggerEl, options);
	});

	/**
	 * Bootstrap4 popover plugin.
	 * @link https://getbootstrap.com/docs/4.4/components/popovers/
	 */
	let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'));
	popoverTriggerList.map(function (popoverTriggerEl) {
		let options = {
			delay: {show: 50, hide: 50},
			html: true,
			placement: 'auto'
		};
		return new bootstrap.Popover(popoverTriggerEl, options);
	});
})();
