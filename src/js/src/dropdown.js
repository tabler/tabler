import { Dropdown } from 'bootstrap';

/*
Core dropdowns
 */
let dropdownTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'));
dropdownTriggerList.map(function (dropdownTriggerEl) {
	let oprions = {
		boundary: dropdownTriggerEl.getAttribute('data-bs-boundary') === 'viewport' ? document.querySelector('.btn') : 'clippingParents',
	}
	return new Dropdown(dropdownTriggerEl, oprions);
});
