// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { satteri } from '@astrojs/markdown-satteri';
import beautify from 'js-beautify';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

/**
 * Equivalent of the Eleventy "html-prettify" step (@tabler/preview): the
 * generated HTML is the product (users copy it 1:1), so after the build we
 * format it with prettier per .prettierrc.
 * @returns {import('astro').AstroIntegration}
 */
function prettifyHtml() {
	return {
		name: 'prettify-html',
		hooks: {
			'astro:build:done': async ({ dir, logger }) => {
				const outDir = fileURLToPath(dir);
				// Astro appends "overflow-x: auto" to the shiki <pre> style — the
				// Eleventy pipeline doesn't have it and HTML is the product: restore 1:1.
				const { globSync } = await import('node:fs');
				const { readFileSync, writeFileSync } = await import('node:fs');
				for (const file of globSync(`${outDir}**/*.html`)) {
					const content = readFileSync(file, 'utf8');
					const cleaned = content.replaceAll('; overflow-x: auto;', '');
					if (cleaned !== content) writeFileSync(file, cleaned);
				}
				execFileSync('npx', ['prettier', '--write', '--parser', 'html', `${outDir}**/*.html`], {
					stdio: 'inherit',
				});
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
		// InlineScript.astro renders nothing here — scripts go through the
		// addPageScript() registry and the <PageScripts /> drain (Eleventy model)
		define: {
			'import.meta.env.INLINE_PAGE_SCRIPTS': 'false',
		},
		resolve: {
			alias: {
				// demo data lives in the monorepo's shared/data — single source of
				// truth shared with the Eleventy packages (no copies in src/data)
				'@data': fileURLToPath(new URL('../shared/data', import.meta.url)),
				// Astro components/lib shared with docs-astro (single source of truth)
				'@shared': fileURLToPath(new URL('../shared/astro', import.meta.url)),
				// this package's pages dir — used by @shared/lib/docs-children's glob
				'@pages': fileURLToPath(new URL('./pages', import.meta.url)),
			},
		},
	},
	build: {
		// emit sign-in.html instead of sign-in/index.html — matches the Eleventy
		// preview package layout, where the HTML files are the distributed product
		format: 'file',
	},
	// Do not collapse whitespace in the output — the HTML must stay readable
	// (like the Eleventy build); prettier finalizes formatting after the build.
	compressHTML: false,
	integrations: [mdx(), prettifyHtml()],
	markdown: {
		// markdown-it in Eleventy does not produce typographic quotes — neither do we
		processor: satteri({ features: { smartPunctuation: false } }),
		shikiConfig: {
			theme: 'github-dark',
			transformers: [
				{
					// The Eleventy docs pipeline beautifies html fences before highlighting
					preprocess(code) {
						if (this.options.lang === 'html') {
							return beautify.html(code, { indent_size: 2, wrap_line_length: 80 });
						}
					},
					// Eleventy docs emits raw shiki output: <pre class="shiki github-dark">.
					// Astro adds its own astro-code class and data-language — restore the
					// exact markdown-it + shiki pipeline markup.
					pre(node) {
						node.properties.class = 'shiki github-dark';
						delete node.properties.dataLanguage;
					},
				},
			],
		},
	},
});
