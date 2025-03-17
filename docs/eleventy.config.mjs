
import { appConfig } from "@repo/e11ty"
import { readFileSync } from 'node:fs';
import { url } from 'node:inspector';
import { join } from 'node:path';

export default function (eleventyConfig) {
	const environment = process.env.NODE_ENV || "production";

	appConfig(eleventyConfig);

	eleventyConfig.addPassthroughCopy({
		"node_modules/@tabler/core/dist": "core",
		"public": "/"
	});

	eleventyConfig.addCollection('docs', collection => {
		return [...collection.getFilteredByGlob('./content/**/*.mdx')].sort((a, b) => {
			return a.data.title - b.data.title;
		});
	});

	/**
	 * Server
	 */
	if (process.env.ELEVENTY_RUN_MODE === "serve") {
		eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
	}

	eleventyConfig.addTemplateFormats("mdx");
	eleventyConfig.addExtension("mdx", {
		key: "md",
	});

	// eleventyConfig.setInputDirectory("pages");
	eleventyConfig.setOutputDirectory("dist");
	eleventyConfig.setLayoutsDirectory("_includes");
	eleventyConfig.setIncludesDirectory("_includes");

	eleventyConfig.amendLibrary('md', () => { });

	// Shiki
	eleventyConfig.on('eleventy.before', async () => {
		const shiki = await import('shiki');
		const highlighter = await shiki.createHighlighter({
			themes: ['github-dark', 'github-light'],
			langs: [
				'html',
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
					let highlightedCode = highlighter.codeToHtml(code.trim(), {
						lang: lang,
						themes: {
							light: 'github-dark',
							dark: 'github-dark',
						}
					});

					return highlightedCode;
				},
			});
		}
		);
	});
	/**
	 *  Filters
	 */

	function buildCollectionTree(flatData) {
		const tree = [];
		const lookup = {};

		flatData
			.filter(item => item.url !== '/')
			.forEach(item => {
				lookup[item.url] = { ...item, children: [] };
			});

		flatData.forEach(item => {
			const parts = item.url.split('/').filter(Boolean);
			if (parts.length === 1) {
				tree.push(lookup[item.url]);
			} else {
				const parentUrl = '/' + parts.slice(0, -1).join('/') + '/';
				if (lookup[parentUrl]) {
					lookup[parentUrl].children.push(lookup[item.url]);
				} else {
					tree.push(lookup[item.url]);
				}
			}
		});

		return tree;
	}

	eleventyConfig.addFilter("collection-tree", function (collection) {
		console.log(collection.slice(0, 1));

		const a = collection.map(item => {
			return {
				data: item.data,
				page: item.page,
				url: item.url,
				children: []
			}
		}).sort((a, b) => {
			return (a.data.order || 999) - (b.data.order || 999);
		});

		return buildCollectionTree(a);
	});

	/**
	 * Data
	 */
	const pkg = JSON.parse(readFileSync(join("..", "core", "package.json"), "utf-8"))
	const libs = JSON.parse(readFileSync(join("..", "preview", "pages", "_data", "libs.json"), "utf-8"))

	eleventyConfig.addGlobalData("environment", environment);
	eleventyConfig.addGlobalData("package", pkg);
	eleventyConfig.addGlobalData("cdnUrl", `https://cdn.jsdelivr.net/npm/@tabler/core@${pkg.version}`);
	eleventyConfig.addGlobalData("libs", libs);

	const data = {
		iconsCount: 1234,
		emailsCount: 1234,
		illustrationsCount: 1234,
	};

	for (const [key, value] of Object.entries(data)) {
		eleventyConfig.addGlobalData(key, value);
	}

	/** 
	 * Tags
	 */
	eleventyConfig.addPairedShortcode("cards", function (content) {
		return `<div class="mt-6"><div class="row g-3">${content}</div></div>`;
	});

	eleventyConfig.addPairedShortcode("card", function (content, title, href) {
		return `<div class="col-6">
		<${href ? "a" : "div"} href="${href}" class="card ${href ? "" : " bg-surface-tertiary"}">
			<div class="card-body">
				<div class="position-relative">${href ? "" : `<span class="badge position-absolute top-0 end-0">Coming soon</span>`}
					<div class="row align-items-center">
						<div class="col">
							<h3 class="card-title mb-2">${title}</h3>
							<div class="text-secondary small">${content}</div>
						</div>
						<div class="col-auto">
							<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>
						</div>
					</div>
				</div>
			</div>
		</${href ? "a" : "div"}>
		</div>`;
	});
};