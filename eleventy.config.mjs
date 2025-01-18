import { relative } from 'path';

export default function (eleventyConfig) {
	const env = process.env.NODE_ENV || "development";
	const isDevelopment = env === "development";

	eleventyConfig.setInputDirectory("src/pages");
	eleventyConfig.setOutputDirectory(process.env.DIST_DIR || "demo");

	eleventyConfig.setLayoutsDirectory("_layouts");
	eleventyConfig.setIncludesDirectory("_includes");

	if (isDevelopment) {
		eleventyConfig.addWatchTarget("src/pages/**");
	}

	eleventyConfig.addPassthroughCopy({
		"dist": "dist"
	});

	eleventyConfig.addGlobalData("environment", env);

	eleventyConfig.addFilter("relative", (page) => {
		return relative(page.url, '/') || '.';
	});

	eleventyConfig.addFilter("random_date_ago", function (value) { return value });
	eleventyConfig.addFilter("timeago", function (value) { return value });
	eleventyConfig.addFilter("replace_regex", function (value) { return value });
	eleventyConfig.addFilter("timestamp_to_date", function (value) { return value });
	eleventyConfig.addFilter("concat_objects", function (value) { return value });
	eleventyConfig.addFilter("first_letters", function (value) { return value });
	eleventyConfig.addFilter("random_number", function (value) { return value });
	eleventyConfig.addFilter("random_item", function (value) { return value });
	eleventyConfig.addFilter("random_date", function (value) { return value });
	eleventyConfig.addFilter("markdownify", function (value) { return value });
	eleventyConfig.addFilter("quote", function (value) { return value });
	eleventyConfig.addFilter("extract", function (value) { return value });
	eleventyConfig.addFilter("miliseconds_to_minutes", function (value) { return value });
	eleventyConfig.addFilter("random_id", function (value) { return value });
	eleventyConfig.addFilter("split_to_n", function (value) { return value });
	eleventyConfig.addFilter("format_number", function (value) { return value });

	const tags = ["removeemptylines", "endremoveemptylines", "capture_global", "endcapture_global", "highlight", "endhighlight" ];
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

};