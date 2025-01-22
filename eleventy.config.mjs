import beautify from 'simply-beautiful';
import { readFileSync } from 'fs';
import { EleventyRenderPlugin } from "@11ty/eleventy";

/** @type {import('@11ty/eleventy').LocalConfig} */
export default function (eleventyConfig) {
	const env = process.env.NODE_ENV || "development";
	const isDevelopment = env === "development";

	eleventyConfig.setInputDirectory("src/pages");
	eleventyConfig.setOutputDirectory(process.env.DIST_DIR || "demo");

	eleventyConfig.setLayoutsDirectory("_layouts");
	eleventyConfig.setIncludesDirectory("_includes");

	eleventyConfig.setWatchThrottleWaitTime(100);

	eleventyConfig.addPlugin(EleventyRenderPlugin, {
		accessGlobalData: true,
	});

	eleventyConfig.setLiquidOptions({
		timezoneOffset: 0,
		jekyllInclude: true,
		dynamicPartials: true,
		jekyllWhere: true,
	});

	if (isDevelopment) {
		eleventyConfig.addWatchTarget("dist");
	}

	eleventyConfig.addPassthroughCopy("favicon.ico");

	/**
	 * Data
	 */
	eleventyConfig.addGlobalData("environment", env);

	eleventyConfig.addGlobalData("package", JSON.parse(readFileSync("package.json", "utf-8")));
	eleventyConfig.addGlobalData("readme", readFileSync("README.md", "utf-8"));
	eleventyConfig.addGlobalData("license", readFileSync("LICENSE", "utf-8"));
	eleventyConfig.addGlobalData("changelog", readFileSync("CHANGELOG.md", "utf-8"));

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

		tablerCssPlugins: [
			"tabler-flags",
			"tabler-socials",
			"tabler-payments",
			"tabler-vendors",
			"tabler-marketing"
		],

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
		},

		colors: {
			"blue": {
				"class": "blue",
				"hex": "#066fd1",
				"title": "Blue"
			},
			"azure": {
				"class": "azure",
				"hex": "#45aaf2",
				"title": "Azure"
			},
			"indigo": {
				"class": "indigo",
				"hex": "#6574cd",
				"title": "Indigo"
			},
			"purple": {
				"class": "purple",
				"hex": "#a55eea",
				"title": "Purple"
			},
			"pink": {
				"class": "pink",
				"hex": "#f66d9b",
				"title": "Pink"
			},
			"red": {
				"class": "red",
				"hex": "#fa4654",
				"title": "Red"
			},
			"orange": {
				"class": "orange",
				"hex": "#fd9644",
				"title": "Orange"
			},
			"yellow": {
				"class": "yellow",
				"hex": "#f1c40f",
				"title": "Yellow"
			},
			"lime": {
				"class": "lime",
				"hex": "#7bd235",
				"title": "Lime"
			},
			"green": {
				"class": "green",
				"hex": "#5eba00",
				"title": "Green"
			},
			"teal": {
				"class": "teal",
				"hex": "#2bcbba",
				"title": "Teal"
			},
			"cyan": {
				"class": "cyan",
				"hex": "#17a2b8",
				"title": "Cyan"
			}
		},
		skinColors: {
			"rose": {
				"hex": "#FFCB9D",
				"title": "Rose",
				"class": "rose"
			},
			"yellow": {
				"hex": "#F0BA60",
				"title": "Yellow",
				"class": "yellow"
			},
			"skin-1": {
				"hex": "#e2c6a7",
				"title": "Skin 1",
				"class": "skin-1"
			},
			"skin-2": {
				"hex": "#c7a786",
				"title": "Skin 2",
				"class": "skin-2"
			},
			"skin-3": {
				"hex": "#a68063",
				"title": "Skin 3",
				"class": "skin-3"
			},
			"skin-4": {
				"hex": "#926241",
				"title": "Skin 4",
				"class": "skin-4"
			},
			"skin-5": {
				"hex": "#654c45",
				"title": "Skin 5",
				"class": "skin-5"
			},
			"gray": {
				"hex": "#d5d7dd",
				"title": "Gray",
				"class": "gray"
			}
		},
		colorsExtra: {
			"white": {
				"hex": "#ffffff",
				"title": "White"
			},
			"dark": {
				"hex": "#303645",
				"title": "Dark"
			},
			"gray": {
				"hex": "#868e96",
				"title": "Gray"
			}
		},
		variants: [
			{
				"name": "success",
				"icon": "check"
			},
			{
				"name": "info",
				"icon": "info-circle"
			},
			{
				"name": "warning",
				"icon": "alert-triangle"
			},
			{
				"name": "danger",
				"icon": "alert-circle"
			}
		],
		"themeColors": {
			"primary": {
				"class": "primary",
				"title": "Primary"
			},
			"secondary": {
				"class": "secondary",
				"title": "Secondary"
			},
			"success": {
				"class": "success",
				"title": "Success"
			},
			"warning": {
				"class": "warning",
				"title": "Warning"
			},
			"danger": {
				"class": "danger",
				"title": "Danger"
			},
			"info": {
				"class": "info",
				"title": "Info"
			},
			"dark": {
				"class": "dark",
				"title": "Dark"
			},
			"light": {
				"class": "light",
				"title": "Light"
			}
		},
		"buttonStates": [
			{
				"class": null,
				"title": "Normal"
			},
			{
				"class": "active",
				"title": "Active state"
			},
			{
				"class": "disabled",
				"title": "Disabled"
			}
		],
		"socials": {
			"x": {
				"icon": "brand-x",
				"title": "X"
			},
			"facebook": {
				"icon": "brand-facebook",
				"title": "Facebook"
			},
			"twitter": {
				"icon": "brand-twitter",
				"title": "Twitter"
			},
			"google": {
				"icon": "brand-google",
				"title": "Google"
			},
			"youtube": {
				"icon": "brand-youtube",
				"title": "Youtube"
			},
			"vimeo": {
				"icon": "brand-vimeo",
				"title": "Vimeo"
			},
			"dribbble": {
				"icon": "brand-dribbble",
				"title": "Dribbble"
			},
			"github": {
				"icon": "brand-github",
				"title": "Github"
			},
			"instagram": {
				"icon": "brand-instagram",
				"title": "Instagram"
			},
			"pinterest": {
				"icon": "brand-pinterest",
				"title": "Pinterest"
			},
			"vk": {
				"icon": "brand-vk",
				"title": "VK"
			},
			"rss": {
				"icon": "rss",
				"title": "RSS"
			},
			"flickr": {
				"icon": "brand-flickr",
				"title": "Flickr"
			},
			"bitbucket": {
				"icon": "brand-bitbucket",
				"title": "Bitbucket"
			},
			"tabler": {
				"icon": "brand-tabler",
				"title": "Tabler"
			}
		},
		"months-short": [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		],
		"months-long": [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		]
	});

	/**
	 * Filters
	 */
	eleventyConfig.addFilter("miliseconds_to_minutes", function (value) { 
		// Raturn 3:45 time format
		const minutes = Math.floor(value / 60000);
		const seconds = ((value % 60000) / 1000).toFixed(0);
		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	 });

	eleventyConfig.addFilter("relative", (page) => {
		const segments = (page.url || '').replace(/^\//).split('/');
		if (segments.length === 1) {
			return '.';
		} else {
			return '../'.repeat(segments.length - 1).slice(0, -1);
		}
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

	eleventyConfig.addFilter("first", function (elem) {
		if (elem instanceof Object) {
			return elem[Object.keys(elem)[0]];
		}

		return elem[0];
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
	const tags = ["capture_global", "endcapture_global", "highlight", "endhighlight"];
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
	function prettifyHTML(content, outputPath) {
		return outputPath.endsWith('.html')
			? content
				.replace(/\/\/ @formatter:(on|off)\n+/gm, '')
			: content
	}

	eleventyConfig.addTransform('htmlformat', prettifyHTML)
};