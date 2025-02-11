
import { appConfig } from "@repo/e11ty"

/** @type {import('@11ty/eleventy').LocalConfig} */
export default function (eleventyConfig) {
	appConfig(eleventyConfig);

	eleventyConfig.addPassthroughCopy({
		"node_modules/@tabler/core/dist": "core",
		"pages/favicon.ico": "favicon.ico",
	});

	eleventyConfig.setIncludesDirectory("_e11ty/includes");
	eleventyConfig.setDataDirectory("_e11ty/data");
	eleventyConfig.setOutputDirectory("dist");
	eleventyConfig.setLayoutsDirectory("_e11ty/layouts");

	eleventyConfig.addPairedShortcode("example", function (content) {
		return '<div class="example">' + content + '</div>';
	})

	return {}
};