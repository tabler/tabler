import { Tab } from './bootstrap'

export const EnableActivationTabsFromLocationHash = (): void => {
  const locationHash: string = window.location.hash

  if (locationHash) {
    const tabsList: HTMLElement[] = [].slice.call(document.querySelectorAll<HTMLElement>('[data-bs-toggle="tab"]'))
    const matchedTabs = tabsList.filter((tab: HTMLElement) => tab.hash === locationHash)

    matchedTabs.map((tab: HTMLElement) => {
      new Tab(tab).show()
    })
  }
}

EnableActivationTabsFromLocationHash()
