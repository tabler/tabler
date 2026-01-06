import { Tab } from './bootstrap'

export const EnableActivationTabsFromLocationHash = (): void => {
  const locationHash: string = window.location.hash

  if (locationHash) {
    const tabsList: HTMLAnchorElement[] = [].slice.call(document.querySelectorAll<HTMLAnchorElement>('[data-bs-toggle="tab"]'))
    const matchedTabs = tabsList.filter((tab: HTMLAnchorElement) => tab.hash === locationHash)

    matchedTabs.map((tab: HTMLAnchorElement) => {
      new Tab(tab).show()
    })
  }
}

EnableActivationTabsFromLocationHash()
