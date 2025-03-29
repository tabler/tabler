import { readFileSync } from 'node:fs';
import { EleventyRenderPlugin } from "@11ty/eleventy";
import { join, dirname } from 'node:path';
import { sync } from 'glob';

/*
 * Copy list
 */
const getCopyList = () => {
	let copy = {
		"node_modules/@tabler/core/dist": "dist",
		"pages/favicon.ico": "favicon.ico",
		"static": "static",
	}

	const libs = JSON.parse(readFileSync('./pages/_data/libs.json'));

	let files = []

	Object.keys(libs.js).forEach((lib) => {
		files.push(Array.isArray(libs.js[lib]) ? libs.js[lib] : [libs.js[lib]])
	})

	Object.keys(libs.css).forEach((lib) => {
		files.push(Array.isArray(libs.css[lib]) ? libs.css[lib] : [libs.css[lib]])
	})

	Object.keys(libs['js-copy']).forEach((lib) => {
		files.push(libs['js-copy'][lib])
	})

	files = files.flat()

	files.forEach((file) => {
		if (!file.match(/^https?/)) {
			copy[`node_modules/${dirname(file)}`] = `libs/${dirname(file)}`;
		}
	})

	return copy;
}

/** @type {import('@11ty/eleventy').LocalConfig} */
export default function (eleventyConfig) {
	const environment = process.env.NODE_ENV || "production";

	eleventyConfig.setInputDirectory("pages");
	eleventyConfig.setOutputDirectory("dist");

	eleventyConfig.setLayoutsDirectory("_layouts");
	eleventyConfig.setIncludesDirectory("_includes");

	// eleventyConfig.addWatchTarget("../core/dist/**");
	// eleventyConfig.setWatchThrottleWaitTime(100);

	eleventyConfig.addPassthroughCopy(getCopyList());
	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

	eleventyConfig.addPlugin(EleventyRenderPlugin, {
		accessGlobalData: true,
	});

	eleventyConfig.setLiquidOptions({
		timezoneOffset: 0,
		jekyllInclude: true,
		dynamicPartials: true,
		jekyllWhere: true,
	});
	/**
	 * Server
	 */
	if (process.env.ELEVENTY_RUN_MODE === "serve") {
		eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
	}


	/**
	 * Data
	 */
	eleventyConfig.addGlobalData("environment", environment);

	eleventyConfig.addGlobalData("package", JSON.parse(readFileSync(join("..", "core", "package.json"), "utf-8")));
	eleventyConfig.addGlobalData("readme", readFileSync(join("..", "README.md"), "utf-8"));
	eleventyConfig.addGlobalData("license", readFileSync(join("..", "LICENSE"), "utf-8"));
	eleventyConfig.addGlobalData("changelog", readFileSync(join("..", "CHANGELOG.md"), "utf-8"));

	eleventyConfig.addGlobalData("pages", () => {
		return sync('pages/**/*.html').filter((file) => {
			return !file.includes('pages/_') && !file.includes('pages/docs/index.html');
		}).map((file) => {
			return {
				url: file.replace(/^pages\//, '/')
			}
		});
	});

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
		previewUrl: "https://preview.tabler.io",
		docsUrl: "https://tabler.io/docs",

		mapboxKey: "pk.eyJ1IjoidGFibGVyIiwiYSI6ImNscHh3dnhndjB2M3QycW85bGd0NXRmZ3YifQ.9LfHPsNoEXQH-xzz-81Ffw",
		googleMapsKey: "AIzaSyAr5mRB4U1KRkVznIrDWEvZjroYcD202DI",
		googleMapsDevKey: "AIzaSyCL-BY8-sq12m0S9H-S_yMqDmcun3A9znw",
		npmPackage: "@tabler/core",

		tablerCssPlugins: [
			{ name: "tabler-flags", sri: "css-flags" },
			{ name: "tabler-socials", sri: "css-socials" },
			{ name: "tabler-payments", sri: "css-payments" },
			{ name: "tabler-vendors", sri: "css-vendors" },
			{ name: "tabler-marketing", sri: "css-marketing" },
			{ name: "tabler-themes", sri: "css-themes" },
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

	eleventyConfig.addGlobalData("sri", {
		"css": "sha384-+ysCwUILnDsnHwK+rITa6QNp8mGFdEXZMfZ/WBpY13iTiCwas5Ah0GIagDbU8Ocy",
		"css-rtl": "sha384-kQMcoyzrq1HEu2/rW78iuKRreSYzdUb1KQhPweqwUyH8Gnydy+vaMP4MpFx2+z07",
		"css-flags": "sha384-J4S9gTOgB6a60d8OIMRu7vveDJCqxLAcDfzDN24CQxXmfi1iIFoU3uelSShCMfAD",
		"css-flags-rtl": "sha384-Rh33piKJ6K8C1b07vnxSLBK5RJSnp4UhH37XTfJxWlnVUl3FqH3mW14kOy6nU1Bd",
		"css-marketing": "sha384-RFTn6c3X2MHvEcQwCc/w1n8IBV4B/GeFHms5KPCiMkSc+tCDtZe5F6aJ+dJYu7mI",
		"css-marketing-rtl": "sha384-HZqaZjtszSlyS975Oe9Z9U9gVmMxvTBU1XziOLE3R4N/pKTmWiznOzHszVqoSufe",
		"css-payments": "sha384-YnhOMEPyU5QfErzSK9sD18FMXdRCn/HB4a+88mFXbd45fFRNWKWeARptNw1k16+/",
		"css-payments-rtl": "sha384-v6XNJfLEVre0G8WOfEeFRSDFItjdOvNGFZTlS6HpoKkkxYe/vbkJBfzhOnePD2dY",
		"css-socials": "sha384-M/p2rVRhhVGWQaE5KAPB4+/uWqFtmb6ag3/NXG8E3SL2MAROPCfB5YJvDHmS5Rms",
		"css-socials-rtl": "sha384-5h8LiZ8sjd3+w3/waxyu3/vTW2kdx90LLYaik7pugCUOR7YRQXbyP13dhp1mUrcW",
		"css-props": "sha384-D9/OSlhkMpd/Nf7168lDKk/Tg/slS3Zu8+alAFMMKXmFkoPazXHR7kiSMKKgu5D6",
		"css-props-rtl": "sha384-4v5rbYBY7WUjemTcFeoBDmH+qZUndtmwamnzHdqcUpAdopNjpVsG/+1IQOpKHNly",
		"css-themes": "sha384-Bj8pP2O3iJP6JH/ZdDBnxIH/3XOJF8DSyYUUHs8wTxb0PRUe5DU01llAmog5ybpg",
		"css-themes-rtl": "sha384-+bJhK3cbUPk0SGCLUskjOBARViddapb+MJA1CbWjerZ46uyZbm6L1Gar3Ggs4c8h",
		"css-vendors-rtl": "sha384-bO98lLX+Ldg6g5nwEiyrECPhkSytviXXblROAGrjND8u+AM4zbk8gjQsCDK7zifX",
		"css-vendors": "sha384-oxt7C0fn5FehJqUxTGaDMUo+IiNNM7wVIqvuv7aHn4hnfLyc0TxI2xXo6bMK1pyb",
		"js": "sha384-uSpys8fjyVTPrXxPMi+NhnEMIp1YSGFZSCDrRHjYIUVdInIvlHft8JHLm6Oiw3vA",
		"js-theme": "sha384-uSpys8fjyVTPrXxPMi+NhnEMIp1YSGFZSCDrRHjYIUVdInIvlHft8JHLm6Oiw3vA",
		"demo-css": "sha384-BUDq2P684xwRBf0GDlySvob+KJg4ko8y2K7njgvYBscmEuqoVVqJ75zcTDozwkFA",
		"demo-js": "sha384-UcTgbM9IZSOPHHuFa0R9H4TegQWoZkJKpeTjLV5hjem2k0CZ67Q4/bW2rT/Edf4Z",
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

	eleventyConfig.addFilter("contains", (items, item) => {
		return items && Array.isArray(items) && items.includes(item);
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
		const start = new Date(startDate ? startDate : '2024-01-01').getTime() / 1000;
		const end = new Date(endDate ? endDate : '2024-12-30').getTime() / 1000;

		const randomTimestamp = randomNumber(x, start, end);
		return new Date(randomTimestamp * 1000);
	});

	eleventyConfig.addFilter("random_item", function (x, items) {
		const index = randomNumber(x, 0, items.length - 1);
		return items[index];
	});

	eleventyConfig.addFilter("random_number", randomNumber);

	eleventyConfig.addFilter("first_letters", function capitalizeFirstLetter(string) {
		return string.split(' ').map(word => word.charAt(0)).join('');
	})

	eleventyConfig.addFilter("uc_first", function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
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
	const tags = ["highlight", "endhighlight"];
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

	let _CAPTURES = {};

	eleventyConfig.on('beforeBuild', () => {
		_CAPTURES = {};
	});

	['script', 'modal'].forEach((tag) => {
		eleventyConfig.addPairedShortcode(`capture_${tag}`, function (content, inline) {
			if (inline) {
				return content;
			}

			if (!_CAPTURES[tag]) {
				_CAPTURES[tag] = []
			}
			
			if (!_CAPTURES[tag][this.page.inputPath]) {
				_CAPTURES[tag][this.page.inputPath] = [];
			}

			_CAPTURES[tag][this.page.inputPath].push(content);

			return ''
		})

		eleventyConfig.addShortcode(`${tag}s`, function () {
			if (_CAPTURES[tag] && _CAPTURES[tag][this.page.inputPath]) {
				return _CAPTURES[tag][this.page.inputPath] ? `<!-- BEGIN PAGE ${tag.toUpperCase()}S -->\n${_CAPTURES[tag][this.page.inputPath].join('\n').trim()}\n<!-- END PAGE ${tag.toUpperCase()}S -->` : '';
			}

			return ''
		});
	});

	/**
	 * Transforms
	 */
	if (environment !== "development") {
		function prettifyHTML(content, outputPath) {
			return outputPath.endsWith('.html')
				? content
					.replace(/\/\/ @formatter:(on|off)\n+/gm, '')
					// remove empty lines
					.replace(/^\s*[\r\n]/gm, '')
				: content
		}

		eleventyConfig.addTransform('htmlformat', prettifyHTML)
	}
};