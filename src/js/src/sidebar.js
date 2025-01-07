import { Tooltip } from 'bootstrap';

let sidebar = document.getElementById('sidebar');

function sidebarIsCollapsable(sidebar) {
	return sidebar.classList.contains('collapse');
}

function sidebarIsCollapsed(sidebar) {
	return sidebar.classList.contains('collapse') && !sidebar.classList.contains('show');
}

function createTooltip(tooltipElement, textElement) {
	let options = {
		delay: {show: 50, hide: 50},
		html: textElement.getAttribute("data-bs-html") === "true" ?? false,
		placement: textElement.getAttribute('data-bs-placement') ?? 'auto',
		title: textElement.getAttribute('title') ?? textElement.textContent
	};
	return new Tooltip(tooltipElement, options);
}

function registerTooltips(sidebar) {
	let tooltips = [];
	sidebar.querySelectorAll('.nav-item .nav-link .nav-link-icon').forEach(function (navLinkIcon) {
		let navLinkTitle = navLinkIcon.nextElementSibling;
		tooltips.push(createTooltip(navLinkIcon, navLinkTitle));
	});

	sidebar.querySelectorAll('.nav-item .dropdown-menu .dropdown-item:not(.nav-link)').forEach(function (dropdownItem) {
		tooltips.push(createTooltip(dropdownItem, dropdownItem));
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