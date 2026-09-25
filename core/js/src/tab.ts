import { Tab } from './bootstrap'
import { onDOMContentLoaded } from './bootstrap/util/index'

// js-docs-start tab-init
export const EnableActivationTabsFromLocationHash = (): void => {
  const locationHash: string = window.location.hash

  if (!locationHash) {
    return
  }

  for (const tab of document.querySelectorAll<HTMLAnchorElement>('[data-bs-toggle="tab"], [data-tblr-toggle="tab"]')) {
    if (tab.hash !== locationHash) {
      continue
    }

    // A tab link outside a .nav/.list-group has no parent to switch in;
    // show() would throw and stop the rest of the bundle.
    try {
      ;(Tab.getOrCreateInstance(tab) as InstanceType<typeof Tab>).show()
    } catch (error) {
      console.error(error)
    }
  }
}

onDOMContentLoaded(EnableActivationTabsFromLocationHash)
// js-docs-end tab-init
