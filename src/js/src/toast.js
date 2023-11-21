import { Toast } from 'bootstrap';

/*
Toasts
 */
let toastsTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="toast"]'));
toastsTriggerList.map(function (toastTriggerEl) {
	if (!toastTriggerEl.hasAttribute('data-bs-target')) {
		return;
	}

	const toastEl = new Toast(toastTriggerEl.getAttribute('data-bs-target'));

	toastTriggerEl.addEventListener('click', () => {
		toastEl.show()
	});
});