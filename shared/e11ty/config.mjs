import { join } from 'node:path';

export function appConfig(eleventyConfig) {
	const currentDir = process.cwd();

	eleventyConfig.setOutputDirectory(join(currentDir, "dist"));

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