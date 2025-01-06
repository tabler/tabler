import { Tooltip } from 'bootstrap';

let sidebar = document.getElementById('sidebar');

function sidebarIsCollapsable(sidebar) {
	return sidebar.classList.contains('collapse');
}

function sidebarIsCollapsed(sidebar) {
	return sidebar.classList.contains('collapse') && !sidebar.classList.contains('show');
}

function registerTooltips(sidebar) {
	let tooltips = [];
	sidebar.querySelectorAll('.nav-item .nav-link .nav-link-icon').forEach(function (navLinkIcon) {
		let navLinkTitle = navLinkIcon.nextElementSibling;
		let options = {
			delay: {show: 50, hide: 50},
			html: navLinkTitle.getAttribute("data-bs-html") === "true" ?? false,
			placement: navLinkTitle.getAttribute('data-bs-placement') ?? 'auto',
			title: navLinkTitle.getAttribute('title') ?? navLinkTitle.textContent
		};
		tooltips.push(new Tooltip(navLinkIcon, options));
	});

	sidebar.querySelectorAll('.nav-item .dropdown-menu .dropdown-item:not(.nav-link)').forEach(function (dropdownItem) {
		let options = {
			delay: {show: 50, hide: 50},
			html: dropdownItem.getAttribute("data-bs-html") === "true" ?? false,
			placement: dropdownItem.getAttribute('data-bs-placement') ?? 'auto',
			title: dropdownItem.getAttribute('title') ?? dropdownItem.textContent
		};
		tooltips.push(new Tooltip(dropdownItem, options));
	});
	return tooltips;
}

function toggleTooltips(sidebar, tooltips) {
	let isCollapsed = sidebarIsCollapsed(sidebar);
	tooltips.forEach(function (tooltip) {
		return isCollapsed ? tooltip.enable() : tooltip.disable();
	});
}

function listenSidebarCollapse(sidebar, callback) {
	(new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			callback();
		});
	})).observe(sidebar, {
		attributes: true,
		attributeFilter: ['class']
	});
}

if (sidebarIsCollapsable(sidebar)) {
	let tooltips = registerTooltips(sidebar);
	toggleTooltips(sidebar, tooltips);
	listenSidebarCollapse(sidebar, () => toggleTooltips(sidebar, tooltips));
}