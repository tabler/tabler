import { Dropdown } from './bootstrap'
import { onDOMContentLoaded } from './bootstrap/util/index'

/*
Folded sidebar toggle
 */
// js-docs-start sidebar-folded-toggle
const syncSidebarToggles = (folded: boolean): void => {
  for (const toggle of document.querySelectorAll('[data-bs-toggle="sidebar-folded"], [data-tblr-toggle="sidebar-folded"]')) {
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

document.addEventListener('click', (event: MouseEvent) => {
  if (!sidebarIsFolded()) {
    return
  }

  const target = event.target
  if (!(target instanceof Element) || target.closest('.navbar-vertical .dropdown-menu')) {
    return
  }

  hideSidebarDropdowns(target.closest('.navbar-vertical [data-bs-toggle="dropdown"]'))
})

document.addEventListener(
  'mouseleave',
  (event: MouseEvent) => {
    const target = event.target as Element
    if (!(target instanceof Element) || !target.matches('.navbar-vertical')) {
      return
    }

    const hoverVariant = document.documentElement.getAttribute('data-bs-sidebar') === 'folded-hover' || target.classList.contains('navbar-folded-hover')
    if (hoverVariant) {
      hideSidebarDropdowns()
    }
  },
  true,
)

onDOMContentLoaded(() => {
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
  const trigger = event.target instanceof Element ? event.target.closest('[data-bs-toggle="sidebar-folded"], [data-tblr-toggle="sidebar-folded"]') : null
  if (!trigger) {
    return
  }

  const html = document.documentElement
  const willFold = !(html.getAttribute('data-bs-sidebar') ?? '').startsWith('folded')

  if (willFold) {
    html.setAttribute('data-bs-sidebar', 'folded-hover')
  } else {
    html.removeAttribute('data-bs-sidebar')
  }

  try {
    localStorage.setItem('tabler-sidebar', willFold ? 'folded-hover' : 'default')
  } catch {
    // ignore
  }
  syncSidebarToggles(willFold)

  hideSidebarDropdowns()

  document.dispatchEvent(new CustomEvent('tabler:sidebar-folded', { detail: { folded: willFold } }))
})
// js-docs-end sidebar-folded-toggle
