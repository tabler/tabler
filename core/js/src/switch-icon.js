/*
Switch icons
 */
let switchesTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="switch-icon"]'));
switchesTriggerList.map(function (switchTriggerEl) {
	switchTriggerEl.addEventListener('click', (e) => {
		e.stopPropagation();

		switchTriggerEl.classList.toggle('active');
	});
});