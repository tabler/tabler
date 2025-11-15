export function appConfig(eleventyConfig) {
	eleventyConfig.setOutputDirectory("dist");
	eleventyConfig.setInputDirectory("pages");

	eleventyConfig.setLayoutsDirectory("../../shared/layouts");
	eleventyConfig.setIncludesDirectory("../../shared/includes");
	eleventyConfig.setDataDirectory("../../shared/data");

	eleventyConfig.addWatchTarget("../shared/**/*.html");
	eleventyConfig.addWatchTarget("./pages/**/*.html");

	console.log('ELEVENTY CONFIG additionalWatchTargets', eleventyConfig.directoryAssignments);

	eleventyConfig.setLiquidOptions({
		timezoneOffset: 0,
		jekyllInclude: true,
		dynamicPartials: true,
		jekyllWhere: true,
	});

	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

}