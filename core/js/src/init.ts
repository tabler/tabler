import { bootstrap } from './bootstrap'
import { getRegistry, initRegistration, withDescendants } from './bootstrap/util/component-functions'
import type { RegisteredPlugin } from './bootstrap/util/component-functions'

// js-docs-start init
/**
 * Creates the Tabler plugins for the markup under `root`, the way the bundle
 * does for the whole page on load. Call it after adding HTML to the page, for
 * example after an HTMX swap or a fetched fragment. Elements that already have
 * an instance are left alone.
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
  const plugins = new Set<RegisteredPlugin>([...getRegistry().map((registration) => registration.Plugin), ...Object.values(bootstrap)])

  for (const element of withDescendants(root)) {
    for (const Plugin of plugins) {
      Plugin.getInstance(element)?.dispose()
    }
  }
}
// js-docs-end init
