export function appConfig(eleventyConfig) {
	eleventyConfig.setLiquidOptions({
		timezoneOffset: 0,
		jekyllInclude: true,
		dynamicPartials: true,
		jekyllWhere: true,
	});
}