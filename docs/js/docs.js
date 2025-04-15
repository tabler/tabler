import docsearch from '@docsearch/js';

docsearch({
	container: '#docsearch',
	appId: process.env.DOCSEARCH_APP_ID,
	indexName: process.env.DOCSEARCH_INDEX_NAME,
	apiKey: process.env.DOCSEARCH_API_KEY,
});