/*!
* Tabler Demo v1.4.0 (https://tabler.io)
* Copyright 2018-2026 The Tabler Authors
* Copyright 2018-2026 codecalm.net Paweł Kuna
* Licensed under MIT (https://github.com/tabler/tabler/blob/master/LICENSE)
*/
//#region js/demo.ts
var items = {
	"menu-position": {
		localStorage: "tablerMenuPosition",
		default: "top"
	},
	"menu-behavior": {
		localStorage: "tablerMenuBehavior",
		default: "sticky"
	},
	"container-layout": {
		localStorage: "tablerContainerLayout",
		default: "boxed"
	}
};
var config = {};
for (const [key, params] of Object.entries(items)) {
	const lsParams = localStorage.getItem(params.localStorage);
	config[key] = lsParams ? lsParams : params.default;
}
var parseUrl = () => {
	const params = window.location.search.substring(1).split("&");
	for (let i = 0; i < params.length; i++) {
		const arr = params[i].split("=");
		const key = arr[0];
		const value = arr[1];
		if (!!items[key]) {
			localStorage.setItem(items[key].localStorage, value);
			config[key] = value;
		}
	}
};
var toggleFormControls = (form) => {
	for (const [key, params] of Object.entries(items)) {
		const elem = form.querySelector(`[name="settings-${key}"][value="${config[key]}"]`);
		if (elem) elem.checked = true;
	}
};
var submitForm = (form) => {
	for (const [key, params] of Object.entries(items)) {
		const checkedInput = form.querySelector(`[name="settings-${key}"]:checked`);
		if (checkedInput) {
			const value = checkedInput.value;
			localStorage.setItem(params.localStorage, value);
			config[key] = value;
		}
	}
	window.dispatchEvent(new Event("resize"));
	const bootstrap = window.bootstrap;
	if (bootstrap) new bootstrap.Offcanvas(form).hide();
};
parseUrl();
var form = document.querySelector("#offcanvas-settings");
if (form) {
	form.addEventListener("submit", function(e) {
		e.preventDefault();
		submitForm(form);
	});
	toggleFormControls(form);
}
//#endregion

//# sourceMappingURL=demo.js.map