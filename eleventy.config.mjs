import { relative } from 'path';
import htmlmin from 'html-minifier';

/** @type {import('@11ty/eleventy').LocalConfig} */
export default function (eleventyConfig) {
	const env = process.env.NODE_ENV || "development";
	const isDevelopment = env === "development";

	eleventyConfig.setInputDirectory("src/pages");
	eleventyConfig.setOutputDirectory(process.env.DIST_DIR || "demo");

	eleventyConfig.setLayoutsDirectory("_layouts");
	eleventyConfig.setIncludesDirectory("_includes");

	eleventyConfig.addPassthroughCopy("favicon.ico");

	eleventyConfig.setWatchThrottleWaitTime(100);

	eleventyConfig.setLiquidOptions({
		timezoneOffset: 0,
		dynamicPartials: true
	});

	if (isDevelopment) {
		// eleventyConfig.addWatchTarget("src/pages/**");
	}

	eleventyConfig.addPassthroughCopy({
		"dist": "dist"
	});

	/**
	 * Data
	 */
	eleventyConfig.addGlobalData("environment", env);

	eleventyConfig.addGlobalData("site", {
		title: "Tabler",
		description: "Premium and Open Source dashboard template with responsive and high quality UI.",
		themeColor: "#066fd1",

		email: "support@tabler.io",
		homepage: "https://tabler.io",
		githubUrl: "https://github.com/tabler/tabler",
		githubSponsorsUrl: "https://github.com/sponsors/codecalm",
		changelogUrl: "https://github.com/tabler/tabler/releases",
		sponsorUrl: "https://github.com/sponsors/codecalm",
		previewUrl: "https://tabler.io/demo",
		docsUrl: "https://tabler.io/docs",

		mapboxKey: "pk.eyJ1IjoidGFibGVyIiwiYSI6ImNscHh3dnhndjB2M3QycW85bGd0NXRmZ3YifQ.9LfHPsNoEXQH-xzz-81Ffw",
		googleMapsKey: "AIzaSyAr5mRB4U1KRkVznIrDWEvZjroYcD202DI",
		googleMapsDevKey: "AIzaSyCL-BY8-sq12m0S9H-S_yMqDmcun3A9znw",
		npmPackage: "@tabler/core",

		icons: {
			link: "https://tabler.io/icons"
		},
		emails: {
			price: "$29",
			buy_link: "https://r.tabler.io/buy-emails"
		},
		illustrations: {
			price: "$59",
			count: 50,
			buy_link: "https://r.tabler.io/buy-illustrations"
		}
	});

	/**
	 * Filters
	 */
	eleventyConfig.addFilter("markdownify", function (value) { return value });
	eleventyConfig.addFilter("quote", function (value) { return value });
	eleventyConfig.addFilter("extract", function (value) { return value });
	eleventyConfig.addFilter("miliseconds_to_minutes", function (value) { return value });
	eleventyConfig.addFilter("random_id", function (value) { return value });

	eleventyConfig.addFilter("relative", (page) => {
		return relative(page.url, '/') || '.';
	});

	eleventyConfig.addFilter("concat_objects", function (object, object2) {
		if (
			object &&
			object2 &&
			typeof object === 'object' &&
			typeof object2 === 'object' &&
			!Array.isArray(object) &&
			!Array.isArray(object2)
		) {
			return { ...object, ...object2 };
		}
		return object;
	});

	eleventyConfig.addFilter("replace_regex", function (input, regStr, replStr) {
		const regex = new RegExp(regStr, 'gm');
		return input.replace(regex, replStr);
	});

	eleventyConfig.addFilter("timestamp_to_date", function (timestamp) {
		const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
		return date.toISOString().split('T')[0]; // Extract the date in 'YYYY-MM-DD' format
	});

	eleventyConfig.addFilter("split_to_n", function (arr, n) {
		const chunkSize = Math.round(arr.length / n);
		const result = [];
		for (let i = 0; i < arr.length; i += chunkSize) {
			result.push(arr.slice(i, i + chunkSize));
		}
		return result;
	})

	eleventyConfig.addFilter("format_number", function (value) {
		return value.toString()
			.split('')
			.reverse()
			.reduce((acc, char, index) => {
				if (index > 0 && index % 3 === 0) {
					acc.push(',');
				}
				acc.push(char);
				return acc;
			}, [])
			.reverse()
			.join('');
	});

	function randomNumber(x, min = 0, max = 100, round = 0) {
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

	eleventyConfig.addFilter("random_date_ago", function (x, daysAgo = 100) {
		const today = new Date();
		const randomDaysAgo = randomNumber(x, 0, daysAgo);
		today.setDate(today.getDate() - randomDaysAgo);
		return today;
	});

	eleventyConfig.addFilter("random_date", function (x, startDate = null, endDate = null) {
		const start = startDate ? new Date(startDate).getTime() : Date.now() - 100 * 24 * 60 * 60 * 1000;
		const end = endDate ? new Date(endDate).getTime() : Date.now();

		const randomTimestamp = randomNumber(x, start, end);
		return new Date(randomTimestamp);
	});

	eleventyConfig.addFilter("random_item", function (x, items) {
		const index = randomNumber(x, 0, items.length - 1);
		return items[index];
	});

	eleventyConfig.addFilter("random_number", randomNumber);

	eleventyConfig.addFilter("first_letters", function capitalizeFirstLetter(string) {
		return string.split(' ').map(word => word.charAt(0)).join('');
	})

	eleventyConfig.addFilter("size", function (elem) {
		if (elem instanceof Object) {
			return Object.keys(elem).length;
		}

		return elem.length;
	})

	// time ago from today
	eleventyConfig.addFilter("timeago", function (date) {
		const seconds = Math.floor((new Date() - date) / 1000);

		let interval = Math.floor(seconds / 31536000);

		if (interval > 1) {
			return interval + " years ago";
		}
		interval = Math.floor(seconds / 2592000);
		if (interval > 1) {
			return interval + " months ago";
		}
		interval = Math.floor(seconds / 86400);
		if (interval > 1) {
			return interval + " days ago";
		}
		interval = Math.floor(seconds / 3600);
		if (interval > 1) {
			return interval + " hours ago";
		}
		interval = Math.floor(seconds / 60);
		if (interval > 1) {
			return interval + " minutes ago";
		}
		if (seconds > 0) {
			return Math.floor(seconds) + " seconds ago";
		}

		return "now";
	})

	/**
	 * Shortcodes
	 */
	const tags = ["removeemptylines", "endremoveemptylines", "capture_global", "endcapture_global", "highlight", "endhighlight"];
	tags.forEach(tag => {
		eleventyConfig.addLiquidTag(tag, function (liquidEngine) {
			return {
				parse: function (tagToken, remainingTokens) {
					this.str = tagToken.args;
				},
				render: function (scope, hash) {
					return "";
				},
			};
		});
	});

	/**
	 * Transforms
	 */
	function minifyHTML(content, outputPath) {
		return outputPath.endsWith('.html')
			? htmlmin.minify(content, {
				collapseBooleanAttributes: true,
				collapseWhitespace: true,
				conservativeCollapse: true,
				minifyCSS: true,
				minifyJS: true,
				removeComments: true,
				sortAttributes: true,
				sortClassName: true,
				useShortDoctype: true,
			})
			: content
	}

	if (env !== 'development') {
		eleventyConfig.addTransform('htmlmin', minifyHTML)
	}
};