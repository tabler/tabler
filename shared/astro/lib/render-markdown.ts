// Equivalent of Eleventy's `renderContent: "md"` filter (EleventyRenderPlugin).
// Eleventy renders markdown with markdown-it using its default options
// ({ html: true }) and disables indented code blocks — see
// @11ty/eleventy src/Engines/Markdown.js (setLibrary / getMarkdownOptions).
// markdown-it is pinned to the same major/minor Eleventy resolves (14.3.0) so
// the output stays byte-identical to the Eleventy reference build.

// @ts-ignore -- markdown-it ships no type declarations and @types/markdown-it
// is intentionally not added (build-time helper only).
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({ html: true });

// Eleventy disables indented code blocks by default (11ty/eleventy#2438).
md.disable('code');

/** Render a markdown string to HTML exactly like Eleventy's `renderContent: "md"`. */
export function renderMarkdown(src: string): string {
	return md.render(src);
}
