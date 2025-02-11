
/** @type {import('@11ty/eleventy').LocalConfig} */
export default function (eleventyConfig) {

	eleventyConfig.addPassthroughCopy({
		"node_modules/@tabler/core/dist": "core",
		"pages/favicon.ico": "favicon.ico",
	});

	eleventyConfig.setLiquidOptions({
		timezoneOffset: 0,
		jekyllInclude: true,
		dynamicPartials: true,
		jekyllWhere: true,
	});

	return {
		dir: {
			output: "dist",
			includes: "_includes",
			data: "_data",
			layouts: "_layouts",
		},
		passthroughFileCopy: true,
		templateFormats: ["html", "md", "liquid"],
		htmlTemplateEngine: "liquid",
		markdownTemplateEngine: "liquid",
	}
};