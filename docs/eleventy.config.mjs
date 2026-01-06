import { appFilters } from "../shared/e11ty/filters.mjs"
import { appData } from "../shared/e11ty/data.mjs";
import { appConfig } from "../shared/e11ty/config.mjs";
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import beautify from 'js-beautify';

const shiki = await import('shiki');
import { createCssVariablesTheme } from 'shiki/core'

export default function (eleventyConfig) {
	const environment = process.env.NODE_ENV || "production";

	appConfig(eleventyConfig);
	appFilters(eleventyConfig);
	appData(eleventyConfig);

	eleventyConfig.addPassthroughCopy({
		"node_modules/@tabler/core/dist": "dist",
		"public": "/",
		"static": "static",
	});

	eleventyConfig.addCollection('docs', collection => {
		return [...collection.getFilteredByGlob('./content/**/*.md')].sort((a, b) => {
			return a.data.title - b.data.title;
		});
	});

	eleventyConfig.setInputDirectory("content");

	eleventyConfig.amendLibrary('md', () => { });

	// Shiki
	eleventyConfig.on('eleventy.before', async () => {
		const myTheme = createCssVariablesTheme({
			name: 'css-variables',
			variablePrefix: '--shiki-',
			variableDefaults: {},
			fontStyle: true
		})

		const highlighter = await shiki.createHighlighter({
			themes: ['github-dark', myTheme],
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
					// prettify code
					if(lang === 'html') {
						code = beautify.html(code, {
							indent_size: 2,
							wrap_line_length: 80,
						});
					}

					let highlightedCode = highlighter.codeToHtml(code, {
						lang: lang,
						theme: 'github-dark'
					});

					return highlightedCode;
				},
			});
		}
		);
	});
	/**
	 * Data
	 */
	const pkg = JSON.parse(readFileSync(join("..", "core", "package.json"), "utf-8"))

	eleventyConfig.addGlobalData("environment", environment);
	eleventyConfig.addGlobalData("package", pkg);
	eleventyConfig.addGlobalData("cdnUrl", `https://cdn.jsdelivr.net/npm/@tabler/core@${pkg.version}`);
	
	// PostHog Analytics Environment Variables
	eleventyConfig.addGlobalData("posthogApiKey", process.env.POSTHOG_API_KEY || "");
	eleventyConfig.addGlobalData("posthogHost", process.env.POSTHOG_HOST || "https://us.i.posthog.com");

	const data = {
		iconsCount: () => 123,
		emailsCount: () => 123,
		illustrationsCount: () => 123
	};

	for (const [key, value] of Object.entries(data)) {
		eleventyConfig.addGlobalData(key, value);
	}

	eleventyConfig.addGlobalData("docs-links", [
		{ title: 'Website', url: 'https://tabler.io', icon: 'world' },
		{ title: 'Preview', url: 'https://preview.tabler.io', icon: 'layout-dashboard' },
		{ title: 'Support', url: 'https://tabler.io/support', icon: 'headset' },
	]);

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