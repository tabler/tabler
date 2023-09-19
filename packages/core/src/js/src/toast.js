import { Toast } from 'bootstrap';

/*
Toasts
 */
let toastsTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="toast"]'));
toastsTriggerList.map(function (toastTriggerEl) {
	return new Toast(toastTriggerEl);
});