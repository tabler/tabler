export default {
	layout: 'docs/default',
	permalink: function ({page}) {
		return `${page.filePathStem.replace(/^\/content\//, '/').replace(/\/index$/, '') }/index.html`;
	},
};