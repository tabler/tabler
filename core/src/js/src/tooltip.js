import { Tooltip } from 'bootstrap';

let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (tooltipTriggerEl) {
	let options = {
		delay: {show: 50, hide: 50},
		html: tooltipTriggerEl.getAttribute("data-bs-html") === "true" ?? false,
		placement: tooltipTriggerEl.getAttribute('data-bs-placement') ?? 'auto'
	};
	return new Tooltip(tooltipTriggerEl, options);
});