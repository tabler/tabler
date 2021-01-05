const locationHash = window.location.hash;

if (locationHash) {
  const tabsList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tab"]'));
  const matchedTabs = tabsList.filter(tab => tab.hash === locationHash);

  matchedTabs.map(tab => {
	 new bootstrap.Tab(tab).show();
  });
}
