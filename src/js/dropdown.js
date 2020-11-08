// Nested dropdowns

const selectors = '.dropdown, .dropup, .dropright, .dropleft',
	dropdowns = document.querySelectorAll(selectors);

let currentTarget = undefined;

dropdowns.forEach(dropdown => {
	dropdown.addEventListener('mousedown', (e) => {
		e.stopPropagation();

		if (e.target.dataset.toggle && e.target.dataset.toggle === 'dropdown') {
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