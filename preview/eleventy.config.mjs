import { readFileSync } from 'node:fs';
import { EleventyRenderPlugin } from "@11ty/eleventy";
import { join } from 'node:path';
import { sync } from 'glob';
import { appFilters } from "../shared/e11ty/filters.mjs";
import { appData } from "../shared/e11ty/data.mjs"
import { appConfig } from "../shared/e11ty/config.mjs"

/** @type {import('@11ty/eleventy').LocalConfig} */
export default function (eleventyConfig) {
	const environment = process.env.NODE_ENV || "production";
	const currentDir = process.cwd();

	appConfig(eleventyConfig);
	appFilters(eleventyConfig);
	appData(eleventyConfig);

	eleventyConfig.addPassthroughCopy({
		"node_modules/@tabler/core/dist": "dist",
		"pages/favicon.ico": "favicon.ico",
		"pages/favicon-dev.ico": "favicon-dev.ico",
		"static": "static",
	});

	eleventyConfig.addPlugin(EleventyRenderPlugin, {
		accessGlobalData: true,
	});

	/**
	 * Data
	 */
	eleventyConfig.addGlobalData("environment", environment);
	eleventyConfig.addGlobalData("readme", readFileSync(join("..", "README.md"), "utf-8"));
	eleventyConfig.addGlobalData("license", readFileSync(join("..", "LICENSE"), "utf-8"));

	eleventyConfig.addGlobalData("pages", () => {
		return sync('pages/**/*.html').filter((file) => {
			return !file.includes('pages/_') && !file.includes('pages/docs/index.html');
		}).map((file) => {
			return {
				url: file.replace(/^pages\//, '/')
			}
		});
	});

	
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