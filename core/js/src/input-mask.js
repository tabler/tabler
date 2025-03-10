// Input mask plugin

var maskElementList = [].slice.call(document.querySelectorAll('[data-mask]'));
maskElementList.map(function (maskEl) {
	window.IMask && new window.IMask(maskEl, {
		mask: maskEl.dataset.mask,
		lazy: maskEl.dataset['mask-visible'] === 'true'
	})
});