//Vendor
import 'bootstrap';

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

