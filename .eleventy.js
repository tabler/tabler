/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = function (config) {
	config.addWatchTarget("./dist/css/*");
	config.addWatchTarget("./dist/js/*");
	config.addWatchTarget("./scss/*");

	config.addPassthroughCopy("dist");

	config.addGlobalData('env', process.env.ELEVENTY_ENV || "development");

	const filters = ["timeago", "random_date_ago", "replace_regex", "first_letters", "timestamp_to_date", "random_number", "random_date", "markdownify", "random_item", "extract", "format_number", "divide", "number_color", "svg_icon", "hex_to_rgb", "concat_objects", "seconds_to_minutes", "miliseconds_to_minutes", "htmlbeautifier", "hex_to_rgb", "random_id", "date_to_string"]
	filters.forEach((filter) => {
		config.addFilter(filter, (a) => {
			return a;
		});
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

	config.addGlobalData('time', new Date());

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