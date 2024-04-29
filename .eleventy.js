/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
const env = process.env.ELEVENTY_ENV || "development"
const { EleventyRenderPlugin } = require("@11ty/eleventy");

function random_number(x, min = 0, max = 100, round = 0) {
	let value = ((x * x * Math.PI * Math.E * (max + 1) * (Math.sin(x) / Math.cos(x * x))) % (max + 1 - min)) + min;

	value = value > max ? max : value;
	value = value < min ? min : value;

	if (round !== 0) {
		value = parseFloat(value.toFixed(round));
	} else {
		value = Math.floor(value);
	}

	return value;
}


module.exports = function (config) {
	config.addPlugin(EleventyRenderPlugin);

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

	const filters = ["timeago", "markdownify", "extract", "number_color", "htmlbeautifier",  "random_id"]
	filters.forEach((filter) => {
		config.addFilter(filter, (a) => {
			return a;
		});
	});

	config.addFilter("size", (obj) => {
		if(obj instanceof Array) {
			return obj.length;
		} else if(obj instanceof Object) {
			return Object.keys(obj).length;
		} else {
			return 0;
		}
	})

	config.addFilter("replace_regex", (text, regex, replace) => {
		return text.replace(new RegExp(regex, "g"), replace);
	})

	config.addFilter("timestamp_to_date", (timestamp) => {
		return new Date(timestamp);
	})

	config.addFilter("concat_objects", (obj1, obj2) => {
		return {...obj1, ...obj2};
	})

	config.addFilter("miliseconds_to_minutes", (miliseconds) => {
		return miliseconds / 60000;
	})

	config.addFilter("seconds_to_minutes", (seconds) => {
		return seconds / 60;
	})

	config.addFilter("first_letters", (text) => {
		return (text || '').split(" ").map((word) => word.charAt(0)).join("");
	})

	config.addFilter('jsonify', function (variable) {
		return JSON.stringify(variable);
	});

	config.addFilter('random_number', random_number);

	config.addFilter('random_item', function (x, items) {
		var index = random_number(x, 0, items.length);
		return items[index];
	});

	config.addFilter('random_date', function (x, start_date = false, end_date = false) {
		const now = new Date();
		const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

		start_date = start_date ? new Date(start_date) : new Date(now - (100 * oneDay)); // default 100 days ago
		end_date = end_date ? new Date(end_date) : now;

		const randomTime = random_number(x, start_date.getTime(), end_date.getTime());

		return new Date(randomTime);
	});

	config.addFilter('random_date_ago', function (x, days_ago = 100) {
		const today = new Date();
		const randomDays = random_number(x, 0, days_ago);
		const randomDate = new Date(today.getTime() - randomDays * 24 * 60 * 60 * 1000);
		return randomDate;
	});

	config.addFilter('format_number', function (value) {
		return value.toString().split('').reverse().join('').match(/.{1,3}/g).join(',').split('').reverse().join('');
	});

	config.addFilter('date_to_string', function (date) {
		return new Date(date).toDateString();
	});

	const tags = ["capture_global", "endcapture_global", "highlight", "endhighlight"]
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