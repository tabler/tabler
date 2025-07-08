// Autosize plugin
const elements = document.querySelectorAll('[data-bs-toggle="autosize"]');
if (elements.length) {
	elements.forEach(function (element) {
		window.autosize && window.autosize(element);
	});
}