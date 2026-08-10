// Lazy loader for the DocSearch bundle (js/docs-search.js, ~650 KB).
// Renders a static copy of the DocSearch button and loads the real bundle
// only when the user interacts with search (click, hover or Cmd/Ctrl+K).
(function () {
	var container = document.getElementById('docsearch');
	if (!container) return;

	var isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);
	var keyLabel = isMac ? '⌘' : 'Ctrl';

	// Static markup identical to what @docsearch/js renders, so the button
	// looks the same before and after the bundle loads (styles live in docs.css).
	container.innerHTML =
		'<button type="button" aria-label="Search" class="DocSearch DocSearch-Button">' +
		'<span class="DocSearch-Button-Container">' +
		'<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" class="DocSearch-Search-Icon">' +
		'<circle cx="11" cy="11" r="8" stroke="currentColor" fill="none" stroke-width="1.4"></circle>' +
		'<path d="m21 21-4.3-4.3" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>' +
		'</svg>' +
		'<span class="DocSearch-Button-Placeholder">Search</span>' +
		'</span>' +
		'<span class="DocSearch-Button-Keys">' +
		'<kbd class="DocSearch-Button-Key">' + keyLabel + '</kbd>' +
		'<kbd class="DocSearch-Button-Key">K</kbd>' +
		'</span>' +
		'</button>';

	var state = 'idle'; // idle -> loading -> ready
	var openWhenReady = false;

	function openModal() {
		var button = container.querySelector('.DocSearch-Button');
		if (button) button.click();
	}

	function load(open) {
		openWhenReady = openWhenReady || open;
		if (state === 'ready') {
			if (open) openModal();
			return;
		}
		if (state === 'loading') return;
		state = 'loading';
		var script = document.createElement('script');
		script.src = '/js/docs-search.js';
		script.onload = function () {
			state = 'ready';
			// The bundle re-renders the button and binds its own shortcuts.
			if (openWhenReady) openModal();
		};
		script.onerror = function () {
			state = 'idle';
		};
		document.head.appendChild(script);
	}

	container.addEventListener('click', function () {
		load(true);
	});
	container.addEventListener('pointerenter', function () {
		load(false);
	});
	container.addEventListener('focusin', function () {
		load(false);
	});
	document.addEventListener('keydown', function (event) {
		if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k' && state !== 'ready') {
			event.preventDefault();
			load(true);
		}
	});
})();
