// Input mask plugin

import IMask from 'imask';

var maskElementList = [].slice.call(document.querySelectorAll('[data-mask]'));
maskElementList.map(function (maskEl) {
	return new IMask(maskEl, {
		mask: maskEl.dataset.mask,
		lazy: maskEl.dataset['mask-visible'] === 'true'
	})
});