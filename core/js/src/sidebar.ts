import { Dropdown } from './bootstrap'

/*
Folded sidebar toggle
 */
// js-docs-start sidebar-folded-toggle
const syncSidebarToggles = (folded: boolean): void => {
  for (const toggle of document.querySelectorAll('[data-bs-toggle="sidebar-folded"]')) {
    toggle.setAttribute('aria-pressed', String(folded))
  }
}

const sidebarIsFolded = (): boolean => (document.documentElement.getAttribute('data-bs-sidebar') ?? '').startsWith('folded') || !!document.querySelector('.navbar-vertical.navbar-folded, .navbar-vertical.navbar-folded-hover')

const hideSidebarDropdowns = (except?: Element | null): void => {
  for (const toggle of document.querySelectorAll<HTMLElement>('.navbar-vertical [data-bs-toggle="dropdown"][aria-expanded="true"]')) {
    if (toggle !== except) {
      ;(Dropdown.getInstance(toggle) as InstanceType<typeof Dropdown> | null)?.hide()
    }
  }
}

// A sidebar rendered for the expanded state keeps its submenus open on outside
// clicks (data-bs-auto-close="false"). Folded flyouts must not: close them on
// any click outside their menu, and close the other flyouts when one opens.
document.addEventListener('click', (event: MouseEvent) => {
  if (!sidebarIsFolded()) {
    return
  }

  const target = event.target as Element
  if (target.closest('.navbar-vertical .dropdown-menu')) {
    return
  }

  hideSidebarDropdowns(target.closest('.navbar-vertical [data-bs-toggle="dropdown"]'))
})

// The folded state may come pre-render from localStorage (tabler-theme.js), so
// align the toggle buttons with it once the DOM is available. Server-rendered
// open submenus are also closed, so they don't hang as open flyouts.
document.addEventListener('DOMContentLoaded', () => {
  const folded = (document.documentElement.getAttribute('data-bs-sidebar') ?? '').startsWith('folded')
  syncSidebarToggles(folded)

  if (folded) {
    for (const menu of document.querySelectorAll('.navbar-vertical .dropdown-menu.show')) {
      menu.classList.remove('show')
      menu.parentElement?.querySelector('[data-bs-toggle="dropdown"]')?.setAttribute('aria-expanded', 'false')
    }
  }
})

document.addEventListener('click', (event: MouseEvent) => {
  const trigger = (event.target as Element).closest('[data-bs-toggle="sidebar-folded"]')
  if (!trigger) {
    return
  }

  const html = document.documentElement
  const willFold = !(html.getAttribute('data-bs-sidebar') ?? '').startsWith('folded')

  // Unpinning folds to the hover variant: the rail expands on hover, where
  // the pin button becomes visible again and can pin the sidebar back open.
  if (willFold) {
    html.setAttribute('data-bs-sidebar', 'folded-hover')
  } else {
    html.removeAttribute('data-bs-sidebar')
  }

  localStorage.setItem('tabler-sidebar', willFold ? 'folded-hover' : 'default')
  syncSidebarToggles(willFold)

  // Close open sidebar dropdowns so an inline submenu doesn't turn into a
  // stuck flyout (and vice versa) when the layout mode changes.
  hideSidebarDropdowns()

  document.dispatchEvent(new CustomEvent('tabler:sidebar-folded', { detail: { folded: willFold } }))
})
// js-docs-end sidebar-folded-toggle
