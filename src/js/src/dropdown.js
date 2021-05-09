import { Dropdown } from 'bootstrap';

/*
Core dropdowns
 */
let dropdownTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'));
dropdownTriggerList.map(function (dropdownTriggerEl) {
	console.log(dropdownTriggerEl.dataset);
	return new Dropdown(dropdownTriggerEl);
});