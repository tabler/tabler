/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
const env = process.env.ELEVENTY_ENV || "development"

module.exports = function (config) {
	config.addWatchTarget("./dist/css/*");
	config.addWatchTarget("./dist/js/*");
	config.addWatchTarget("./scss/*");
	
	config.addPassthroughCopy("dist");
	config.addPassthroughCopy("pages/assets");
	
	config.addGlobalData('env', env);
	config.addGlobalData('time', new Date());
	config.addGlobalData('base', '.');

	config.setLiquidOptions({
		dynamicPartials: true,
		strictVariables: false,
		strictFilters: true,
		jekyllInclude: true,
		extname: ".html",
	});

	const filters = ["timeago", "random_date_ago", "replace_regex", "timestamp_to_date", "random_date", "markdownify", "random_item", "extract", "format_number", "divide", "number_color", "svg_icon", "hex_to_rgb", "concat_objects", "seconds_to_minutes", "miliseconds_to_minutes", "htmlbeautifier", "hex_to_rgb", "random_id", "date_to_string"]
	filters.forEach((filter) => {
		config.addFilter(filter, (a) => {
			return a;
		});
	});

	config.addFilter("first_letters", (text) => {
		return (text || '').split(" ").map((word) => word.charAt(0)).join("");
	})

	config.addFilter('jsonify', function (variable) {
		return JSON.stringify(variable);
	});

	config.addFilter('random_number', function (value) {
		return 123;
	});

	const tags = ["removeemptylines", "endremoveemptylines", "capture_global", "endcapture_global", "highlight", "endhighlight"]
	tags.forEach((tag) => {
		config.addLiquidTag(tag, (liquidEngine) => {
			return {
				parse: function (tagToken, remainingTokens) {
					this.str = tagToken.args; // myVar or "alice"
				},
				render: async function (scope, hash) {
					// Resolve variables
					var str = await this.liquid.evalValue(this.str, scope); // "alice"

					// Do the uppercasing
					return str
				}
			};
		});
	});


	return {
		dir: {
			input: "pages",
			output: "_site",
			includes: "_includes",
			layouts: "_layouts",
			data: "_data",
		}
	}
};