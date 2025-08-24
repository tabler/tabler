import { appFilters } from "../shared/e11ty/filters.mjs"
import { appData } from "../shared/e11ty/data.mjs";
import { appConfig } from "../shared/e11ty/config.mjs";
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path';
import beautify from 'js-beautify';

const shiki = await import('shiki');
import { createCssVariablesTheme } from 'shiki/core'

const __dirname = dirname(fileURLToPath(import.meta.url))

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

	eleventyConfig.addShortcode('scss-docs', function (name, filename) {
		const file = join(__dirname, `../core/scss/${filename}`)

		if (existsSync(file)) {
			const content = readFileSync(file, 'utf8');
			const regex = new RegExp(`\/\/\\sscss-docs-start\\s${name}\\n(.+?)\/\/\\sscss-docs-end`, 'gs')

			const m = content.matchAll(regex)

			if (m) {
				const matches = [...m]

				if (matches[0] && matches[0][1]) {
					const lines = matches[0][1].split('\n');

					// Find minimum number of leading spaces in non-empty lines
					const minIndent = lines
						.filter(line => line.trim().length > 0)
						.reduce((min, line) => {
							const match = line.match(/^(\s*)/);
							const leadingSpaces = match ? match[1].length : 0;
							return Math.min(min, leadingSpaces);
						}, Infinity);

					// Remove that many spaces from the start of each line
					const result = lines.map(line => line.startsWith(' '.repeat(minIndent))
						? line.slice(minIndent)
						: line).join('\n');

					return "\n```scss\n" + result.trimRight() + "\n```\n"
				}
			}
		}

		return ''
	})

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
		const a = collection.map(item => {
			return {
				data: item.data,
				page: item.page,
				url: item.url,
				children: []
			}
		}).sort((a, b) => {
			const orderA = a.data.order ?? 999;
			const orderB = b.data.order ?? 999;

			if (orderA !== orderB) {
				return orderA - orderB;
			}

			const titleA = a.data.title ?? '';
			const titleB = b.data.title ?? '';

			return titleA.localeCompare(titleB);
		});

		return buildCollectionTree(a);
	});

	eleventyConfig.addFilter("collection-children", function (collection, page) {
		const url = page.url.split('/').filter(Boolean).join('/');

		const filteredCollection = collection.filter(item => {
			const parts = item.url.split('/').filter(Boolean);
			return parts.length > 1 && parts.slice(0, -1).join('/') === url;
		});

		return filteredCollection.sort((a, b) => {
			return (a.data?.order || 999) - (b.data?.order || 999);
		});
	});

	eleventyConfig.addFilter("next-prev", function (collection, page) {
		const items = collection
			.filter(item => {
				const parts = item.url.split('/').filter(Boolean);
				return parts.length > 1 && parts.slice(0, -1).join('/') === page.url.split('/').filter(Boolean).slice(0, -1).join('/');
			})
			.sort((a, b) => {
				return a.data.title.localeCompare(b.data.title);
			})
			.sort((a, b) => {
				return (a.data?.order || 999) - (b.data?.order || 999);
			});
		const index = items.findIndex(item => item.url === page.url);

		const prevPost = index > 0 ? items[index - 1] : null;
		const nextPost = index < items.length - 1 ? items[index + 1] : null;

		return {
			prev: prevPost ? prevPost : null,
			next: nextPost ? nextPost : null,
		};
	});

	const generateUniqueId = (text) => {
		return text
			.replace(/<[^>]+>/g, "")
			.replace(/\s/g, "-")
			.replace(/[^\w-]+/g, "")
			.replace(/--+/g, "-")
			.replace(/^-+|-+$/g, "")
			.toLowerCase();
	}

	eleventyConfig.addFilter("headings-id", function (content) {
		return content.replace(/<h([1-6])>([^<]+)<\/h\1>/g, (match, level, text) => {
			const headingId = generateUniqueId(text);

			return `<h${level} id="${headingId}">${text}</h${level}>`;
		});
	})

	eleventyConfig.addFilter("toc", function (name) {
		const toc = [];

		const contentWithoutExamples = name.replace(/<!--EXAMPLE-->[\s\S]*?<!--\/EXAMPLE-->/g, '');
		const headings = contentWithoutExamples.match(/<h([23])>([^<]+)<\/h\1>/g);

		if (headings) {
			headings.forEach(heading => {
				const level = parseInt(heading.match(/<h([1-6])>/)[1]);
				const text = heading.replace(/<[^>]+>/g, "");
				const id = generateUniqueId(text);

				toc.push({ level, text, id });
			});
		}

		return toc;
	})

	eleventyConfig.addFilter("remove-href", function (content) {
		return content.replace(/href="#"/g, 'href="javascript:void(0)"');
	})

	/**
	 * Data
	 */
	const pkg = JSON.parse(readFileSync(join("..", "core", "package.json"), "utf-8"))

	eleventyConfig.addGlobalData("environment", environment);
	eleventyConfig.addGlobalData("package", pkg);
	eleventyConfig.addGlobalData("cdnUrl", `https://cdn.jsdelivr.net/npm/@tabler/core@${pkg.version}`);

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