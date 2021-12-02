// Setting items
const items = {
	colorScheme: { localStorage: 'tablerColorScheme', default: 'light' },
	menuPosition: { localStorage: 'tablerMenuPosition', default: 'top' },
	menuBehavior: { localStorage: 'tablerMenuBehavior', default: 'sticky' },
	containerLayout: { localStorage: 'tablerContainerLayout', default: 'boxed' },
}

// Theme config
const config = {}
for (const [key, params] of Object.entries(items)) {
	config[key] = localStorage.getItem(params.localStorage) ? localStorage.getItem(params.localStorage) : params.default
}

// Parse url params
const parseUrl = () => {
	const search = window.location.search.substring(1)
	const params = search.split('&')

	for (let i = 0; i < params.length; i++) {
		const arr = params[i].split('=')
		const prop = arr[0]
		const val = arr[1]

		if (!!items[prop]) {
			// Save to localStorage
			localStorage.setItem(items[prop].localStorage, val)

			// Update local variables
			config[prop] = val
		}
	}
}

// Toggle form controls
const toggleFormControls = (form) => {
	for (const [key, params] of Object.entries(items)) {
		const elem = form.querySelector(`[name="settings-${key}"][value="${config[key]}"]`)

		if (elem) {
			elem.checked = true
		}
	}
}

const submitForm = (form) => {
	// Save data to localStorage
	for (const [key, params] of Object.entries(items)) {
		const value = form.querySelector(`[name="settings-${key}"]:checked`).value
		localStorage.setItem(params.localStorage, value)
	}

	// Reload page
	window.location = window.location.pathname
}

// Parse url
parseUrl()

document.addEventListener("DOMContentLoaded", function () {
	// Elements
	const form = document.querySelector('#offcanvasSettings')

	// Toggle form controls
	if (form) {

		form.addEventListener('submit', function (e) {
			e.preventDefault()

			submitForm(form)
		})

		toggleFormControls(form)
	}
})