export default {
	layout: 'default',
	tags: 'docs',
	permalink: function ({page}) {
		return `${page.filePathStem.replace(/^\/content\//, '/').replace(/\/index$/, '') }/index.html`;
	},
};