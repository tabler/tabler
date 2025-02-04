
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
};