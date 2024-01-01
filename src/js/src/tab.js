/*
Activate tabs based on the location hash
*/
import { Tab } from 'bootstrap';

export const enableActivationTabsFromLocationHash = () => {
  const locationHash = window.location.hash;

  if (locationHash) {
    const tabsList = Array.from(document.querySelectorAll('[data-bs-toggle="tab"]'));
    const matchedTabs = tabsList.filter(tab => tab.hash === locationHash);

    matchedTabs.forEach(tab => new Tab(tab).show());
  }
}

enableActivationTabsFromLocationHash();
