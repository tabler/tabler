import { bootstrap } from './bootstrap'
import { getRegistry, initRegistration } from './bootstrap/util/component-functions'

interface Disposable {
  dispose(): void
}

interface InstanceSource {
  getInstance(element: HTMLElement): Disposable | null
}

const elementsIn = (root: ParentNode): HTMLElement[] => {
  const elements = Array.from(root.querySelectorAll<HTMLElement>('*'))
  if (root instanceof HTMLElement) {
    elements.unshift(root)
  }

  return elements
}

// js-docs-start init
/**
 * Creates the Tabler plugins for the markup under `root`, the way the bundle
 * does for the whole page on load. Call it after adding HTML to the page, for
 * example after an HTMX swap or a fetched fragment. Elements that already have
 * an instance are left alone. The Bootstrap components (dropdowns, modals,
 * tooltips…) need no call: they are created on the first interaction.
 */
export const init = (root: ParentNode = document): void => {
  for (const registration of getRegistry()) {
    initRegistration(registration, root)
  }
}

/**
 * Disposes every Tabler plugin and Bootstrap component instance on the
 * elements under `root`. Call it before removing or replacing markup, so the
 * instances release their listeners, observers and timers.
 */
export const dispose = (root: ParentNode = document): void => {
  const sources: InstanceSource[] = [...getRegistry().map((registration) => registration.Plugin as unknown as InstanceSource), ...(Object.values(bootstrap) as unknown as InstanceSource[])]

  for (const element of elementsIn(root)) {
    for (const source of sources) {
      source.getInstance(element)?.dispose()
    }
  }
}
// js-docs-end init
