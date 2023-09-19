// Autosize plugin

import autosize from 'autosize';

const elements = document.querySelectorAll('[data-bs-toggle="autosize"]');
if (elements.length) {
	elements.forEach(function (element) {
		autosize(element);
	});
}