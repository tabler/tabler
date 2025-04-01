(() => {
	const themeSwitcher = document.querySelector('#theme-switcher');
	const preferredTheme = localStorage.getItem('preferred-theme') ?? 'system';

	if (!themeSwitcher) {
		return;
	}

	themeSwitcher.addEventListener('click', (e) => {
		if (!e.target.matches('[data-action]')) {
			return;
		}

		const theme = e.target.getAttribute('data-action');
		const systemMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		document.documentElement.classList.add('no-transition');

		localStorage.setItem('preferred-theme', theme);
		document.documentElement.setAttribute('data-bs-mode', theme === 'system' ? systemMode : theme);
		themeSwitcher.setAttribute('data-theme-mode', theme);
		themeSwitcher.querySelector(`.theme-switcher__${theme}-mode`).focus();
		document.documentElement.classList.remove('no-transition');
	});

	themeSwitcher.setAttribute('data-theme-mode', preferredTheme);
})();