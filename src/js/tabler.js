//Vendor

import './autosize';
import './input-mask';
import './dropdown';

(function() {
	/**
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

	let dropdownTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="dropdown"]'));
	dropdownTriggerList.map(function (dropdownTriggerEl) {
		return new bootstrap.Dropdown(dropdownTriggerEl);
	});


	let switchesTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="switch-icon"]'));
	switchesTriggerList.map(function (switchTriggerEl) {
		switchTriggerEl.addEventListener('click', (e) => {
			e.stopPropagation();

			switchTriggerEl.classList.toggle('active');
		});
	});

})();