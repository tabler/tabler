const STORAGE_KEY = 'tblr-navbar-narrow'

const toggleElements: HTMLElement[] = [].slice.call(
	document.querySelectorAll<HTMLElement>('[data-bs-toggle="navbar-narrow"]')
)

toggleElements.forEach((toggle: HTMLElement) => {
	const targetSelector = toggle.getAttribute('data-bs-target')
	const target = targetSelector ? document.querySelector<HTMLElement>(targetSelector) : null

	if (!target) return

	// Restore persisted state
	if (localStorage.getItem(STORAGE_KEY) === 'true') {
		target.classList.add('navbar-narrow')
	}

	toggle.addEventListener('click', () => {
		target.classList.toggle('navbar-narrow')
		localStorage.setItem(STORAGE_KEY, String(target.classList.contains('navbar-narrow')))
	})
})
