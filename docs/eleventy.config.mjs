
import { appConfig } from "@repo/e11ty"
import { createHash } from 'crypto';
import flatCache from 'flat-cache';
import { resolve } from 'node:path';

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

	eleventyConfig.addPairedLiquidShortcode("example", function (content, ...params) {
		return '<div class="example p-5 border mb-6 rounded">' + params + content + '</div>';
	})

	eleventyConfig.amendLibrary('md', () => { });

	eleventyConfig.on('eleventy.before', async () => {

		const shiki = await import('shiki');
		const highlighter = await shiki.createHighlighter({
			themes: ['github-dark', 'github-light'],
			langs: [
				'html',
				'svelte',
				'blade',
				'php',
				'yaml',
				'js',
				'jsx',
				'ts',
				'shell',
				'diff',
				'vue',
				'scss',
				'css'
			],
		});

		eleventyConfig.amendLibrary('md', function (mdLib) {
			return mdLib.set({
				highlight: function (code, lang) {
					// const hash = createHash('md5').update(code).digest('hex');
					// const cache = flatCache.load(hash, resolve('./.cache/shiki'));
					// const cachedValue = cache.getKey(hash);

					// if (cachedValue) {
					// 	return cachedValue;
					// }

					let highlightedCode = highlighter.codeToHtml(code.trim(), {
						lang: lang,
						themes: {
							light: 'github-light',
							dark: 'github-dark',
						}
					});

					// cache.setKey(hash, highlightedCode);
					// cache.save();

					return highlightedCode;
				},
			});
		}
		);
	});

	return {}
};