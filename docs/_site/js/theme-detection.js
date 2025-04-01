(() => {
	const systemMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	const preferredTheme = localStorage.getItem('preferred-theme');

	function setTheme(theme) {
		document.documentElement.setAttribute('data-bs-theme', theme === 'system' ? systemMode : theme);
	}

	window
		.matchMedia('(prefers-color-scheme: dark)')
		.addEventListener('change', (e) => {
			if (localStorage.getItem('preferred-theme') === 'system' || localStorage.getItem('preferred-theme') === null) {
				setTheme(e.matches ? 'dark' : 'light');
			}
		});

	setTheme(preferredTheme || systemMode);
})();