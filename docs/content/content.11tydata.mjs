export default {
	layout: 'default',
	permalink: function ({page}) {
		return `${page.filePathStem.replace(/^\/content\//, '/').replace(/\/index$/, '') }/index.html`;
	},
};