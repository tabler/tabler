// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { satteri } from '@astrojs/markdown-satteri';
import beautify from 'js-beautify';
import { execFileSync } from 'node:child_process';
import { globSync, readFileSync, writeFileSync } from 'node:fs';
import { devNull } from 'node:os';
import { fileURLToPath } from 'node:url';
import { copyAssets } from '../.build/copy-assets';

/** @param {string} p */
const path = (p) => fileURLToPath(new URL(p, import.meta.url));

/**
 * After build, format page HTML with prettier (users copy it 1:1).
 * @returns {import('astro').AstroIntegration}
 */
function prettifyHtml() {
	return {
		name: 'prettify-html',
		hooks: {
			'astro:build:done': async ({ dir, logger }) => {
				const outDir = fileURLToPath(dir);
				// dist/preview/ and dist/dist/ are copy-assets.mjs's copies of public/{preview,dist}
				// (demo css/js and @tabler/core's dist, including vendored libs) — not pages, and
				// some vendored libs ship their own malformed docs/*.html that trips the parser below.
				/** @param {string} file */
				const isVendorCopy = (file) => file.includes(`${outDir}preview/`) || file.includes(`${outDir}dist/`);
				// Astro appends "overflow-x: auto" to the shiki <pre> style — the
				// Eleventy pipeline doesn't have it and HTML is the product: restore 1:1.
				// node:fs is imported statically — a dynamic import() here would go
				// through Vite's module runner, which is already closed by the time
				// the astro:build:done hook runs (the config is bundled by vite-node
				// because it imports a .ts module).
				for (const file of globSync(`${outDir}**/*.html`, { exclude: isVendorCopy })) {
					const content = readFileSync(file, 'utf8');
					const cleaned = content.replaceAll('; overflow-x: auto;', '');
					if (cleaned !== content) writeFileSync(file, cleaned);
				}
				execFileSync(
					'npx',
					[
						'prettier',
						'--write',
						'--parser',
						'html',
						// Prettier's default ignore-path is [.gitignore, .prettierignore], and both
						// list "dist" (needed elsewhere so normal lint/format passes skip build
						// output) — that silently no-ops this pass on the very directory it targets.
						// Point at devNull to opt this one deliberate pass out of those ignores.
						'--ignore-path',
						devNull,
						`${outDir}**/*.html`,
						`!${outDir}preview/**`,
						`!${outDir}dist/**`,
					],
					{ stdio: 'inherit' },
				);
				logger.info('HTML formatted with prettier');
			},
		},
	};
}

// https://astro.build/config
export default defineConfig({
	// pages live at the package root (./pages) — all components/lib/data are
	// shared (see the @shared alias)
	srcDir: '.',
	server: {
		port: 3000,
		// bind on all interfaces so the dev server is reachable from Docker
		// port mappings and other devices on the local network
		host: true,
	},
	vite: {
		resolve: {
			alias: {
				// Demo data in shared/data (single source of truth).
				'@data': fileURLToPath(new URL('../shared/data', import.meta.url)),
				// Components/lib shared with docs.
				'@shared': fileURLToPath(new URL('../shared', import.meta.url)),
				'@ui': fileURLToPath(new URL('../shared/ui', import.meta.url)),
				'@components': fileURLToPath(new URL('../shared/components', import.meta.url)),
				// Used by @shared/lib/docs-children's glob.
				'@pages': fileURLToPath(new URL('./pages', import.meta.url)),
			},
		},
	},
	build: {
		// Emit sign-in.html instead of sign-in/index.html (HTML is the product).
		format: 'file',
	},
	// Keep readable HTML; prettier formats after the build.
	compressHTML: false,
	integrations: [
		copyAssets({
			repo: path('..'),
			publicDir: path('./public'),
			copies: [
				{
					// @tabler/core dist (css/js/fonts/img/libs) — same as the Eleventy passthrough.
					// Fallback keeps current assets if core rebuilds dist mid-copy in turbo dev.
					from: path('./node_modules/@tabler/core/dist'),
					to: path('./public/dist'),
					label: '@tabler/core',
					allowDestinationFallback: true,
				},
				{
					// demo css/js built by this package's sass/vite pipeline. Source is
					// tmp-assets/ (NOT dist/) on purpose — dist/ is Astro's own build output,
					// and copying from a path Astro also writes to caused unbounded growth
					// across repeated builds. See preview/.build/vite.config.mts.
					from: path('./tmp-assets'),
					to: path('./public/preview'),
					label: '@tabler/preview',
				},
				{
					// docs.css built by the @tabler/docs sass pipeline (used by docs pages)
					from: path('../docs/dist/css'),
					to: path('./public/css'),
					label: '@tabler/docs',
					required: false,
				},
				{
					// static assets (photos, avatars, tracks, brand svgs...). The real source,
					// because preview/static is a symlink that may not survive deployment packaging.
					from: path('../shared/static'),
					to: path('./public/static'),
					label: 'shared assets',
				},
				// favicons (source assets of @tabler/preview)
				{ from: path('./assets/favicon.ico'), to: path('./public/favicon.ico'), label: '@tabler/preview' },
				{ from: path('./assets/favicon-dev.ico'), to: path('./public/favicon-dev.ico'), label: '@tabler/preview' },
			],
			// Watch the real core/dist, not the node_modules symlink the startup copy
			// reads from — same directory.
			syncDirs: [
				{ from: path('../core/dist'), to: path('./public/dist') },
				{ from: path('../shared/static'), to: path('./public/static') },
			],
			// watch-css/watch-js write straight into public/preview — the file is already
			// in place, but Astro does not reload the browser on public/ changes.
			reloadDirs: [path('./public/preview')],
		}),
		mdx(),
		prettifyHtml(),
	],
	markdown: {
		// No typographic quote rewriting.
		processor: satteri({ features: { smartPunctuation: false } }),
		shikiConfig: {
			theme: 'github-dark',
			transformers: [
				{
					// Beautify html fences before highlighting.
					preprocess(code) {
						if (this.options.lang === 'html') {
							return beautify.html(code, { indent_size: 2, wrap_line_length: 80 });
						}
					},
					// Keep shiki classes only (drop Astro's astro-code / data-language).
					pre(node) {
						node.properties.class = 'shiki github-dark';
						delete node.properties.dataLanguage;
					},
				},
			],
		},
	},
});
