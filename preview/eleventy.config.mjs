import { readFileSync } from 'node:fs';
import { EleventyRenderPlugin } from "@11ty/eleventy";
import { join, dirname } from 'node:path';
import { sync } from 'glob';
import { appConfig } from "@repo/e11ty"

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

	appConfig(eleventyConfig);

	eleventyConfig.setInputDirectory("pages");
	eleventyConfig.setOutputDirectory("dist");

	eleventyConfig.setLayoutsDirectory("_layouts");
	eleventyConfig.setIncludesDirectory("_includes");

	eleventyConfig.addPassthroughCopy(getCopyList());

	eleventyConfig.addPlugin(EleventyRenderPlugin, {
		accessGlobalData: true,
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

	/**
	 * Shortcodes
	 */
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