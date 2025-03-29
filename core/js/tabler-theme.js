/**
 * demo-theme is specifically loaded right after the body and not deferred
 * to ensure we switch to the chosen dark/light theme as fast as possible.
 * This will prevent any flashes of the light theme (default) before switching.
 */
const themeConfig = {
	"theme": "light",
	"theme-base": "gray",
	"theme-font": "sans-serif",
	"theme-primary": "blue",
	"theme-radius": "1",
}

const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
})

for (const key in themeConfig) {
	const param = params[key]
	let selectedValue

	if (!!param) {
		localStorage.setItem('tabler-' + key, param)
		selectedValue = param
	} else {
		const storedTheme = localStorage.getItem('tabler-' + key)
		selectedValue = storedTheme ? storedTheme : themeConfig[key]
	}

	if (selectedValue !== themeConfig[key]) {
		document.documentElement.setAttribute('data-bs-' + key, selectedValue)
	} else {
		document.documentElement.removeAttribute('data-bs-' + key)
	}
}