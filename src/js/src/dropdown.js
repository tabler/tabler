import { Dropdown } from 'bootstrap';

/*
Core dropdowns
 */
let dropdownTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'));
dropdownTriggerList.map(function (dropdownTriggerEl) {
	return new Dropdown(dropdownTriggerEl);
});