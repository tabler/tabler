import { Dropdown } from 'bootstrap';

/*
Core dropdowns
 */
let dropdownTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'));
dropdownTriggerList.map(function (dropdownTriggerEl) {
	return new Dropdown(dropdownTriggerEl);
});


/*
Nested dropdowns
 */
const selectors = '.dropdown, .dropup, .dropend, .dropstart',
	dropdowns = document.querySelectorAll(selectors);

let currentTarget = undefined;

dropdowns.forEach(dropdown => {
	dropdown.addEventListener('mousedown', (e) => {
		e.stopPropagation();

		if (e.target.dataset.bsToggle && e.target.dataset.bsToggle === 'dropdown') {
			currentTarget = e.currentTarget;
		}
	});

	dropdown.addEventListener('hide.bs.dropdown', (e) => {
		e.stopPropagation();

		const parent = currentTarget ? currentTarget.parentElement.closest(selectors) : undefined;

		if (parent && parent === dropdown) {
			e.preventDefault();
		}

		currentTarget = undefined;
	});
});