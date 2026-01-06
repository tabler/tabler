// Setting items
interface SettingItem {
	localStorage: string
	default: string
}

interface SettingsItems {
	[key: string]: SettingItem
}

const items: SettingsItems = {
	"menu-position": { localStorage: "tablerMenuPosition", default: "top" },
	"menu-behavior": { localStorage: "tablerMenuBehavior", default: "sticky" },
	"container-layout": {
		localStorage: "tablerContainerLayout",
		default: "boxed",
	},
}

// Theme config
const config: Record<string, string> = {}
for (const [key, params] of Object.entries(items)) {
	const lsParams = localStorage.getItem(params.localStorage)
	config[key] = lsParams ? lsParams : params.default
}

// Parse url params
const parseUrl = (): void => {
	const search = window.location.search.substring(1)
	const params = search.split("&")

	for (let i = 0; i < params.length; i++) {
		const arr = params[i].split("=")
		const key = arr[0]
		const value = arr[1]

		if (!!items[key]) {
			// Save to localStorage
			localStorage.setItem(items[key].localStorage, value)

			// Update local variables
			config[key] = value
		}
	}
}

// Toggle form controls
const toggleFormControls = (form: HTMLFormElement): void => {
	for (const [key, params] of Object.entries(items)) {
		const elem = form.querySelector(
			`[name="settings-${key}"][value="${config[key]}"]`,
		) as HTMLInputElement | null

		if (elem) {
			elem.checked = true
		}
	}
}

// Submit form
const submitForm = (form: HTMLFormElement): void => {
	// Save data to localStorage
	for (const [key, params] of Object.entries(items)) {
		// Save to localStorage
		const checkedInput = form.querySelector(`[name="settings-${key}"]:checked`) as HTMLInputElement
		if (checkedInput) {
			const value = checkedInput.value
			localStorage.setItem(params.localStorage, value)

			// Update local variables
			config[key] = value
		}
	}

	window.dispatchEvent(new Event("resize"))

	// Bootstrap is available globally
	const bootstrap = (window as any).bootstrap
	if (bootstrap) {
		new bootstrap.Offcanvas(form).hide()
	}
}

// Parse url
parseUrl()

// Elements
const form = document.querySelector("#offcanvas-settings") as HTMLFormElement | null

// Toggle form controls
if (form) {
	form.addEventListener("submit", function (e) {
		e.preventDefault()

		submitForm(form)
	})

	toggleFormControls(form)
}

