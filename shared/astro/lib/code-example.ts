// Docs code-block pipeline: js-beautify + shiki (github-dark) — exactly the
// same options as in docs/eleventy.config.mjs (markdown-it highlight hook).
import beautify from 'js-beautify';
import { createHighlighter, type Highlighter } from 'shiki';

let highlighterPromise: Promise<Highlighter> | undefined;

function getHighlighter(): Promise<Highlighter> {
	highlighterPromise ??= createHighlighter({
		themes: ['github-dark'],
		langs: ['html', 'yaml', 'js', 'ts', 'shell', 'diff', 'scss', 'css'],
	});
	return highlighterPromise;
}

export function beautifyHtml(code: string): string {
	return beautify.html(code, {
		indent_size: 2,
		wrap_line_length: 80,
	});
}

export async function highlightCode(code: string, lang = 'html'): Promise<string> {
	const highlighter = await getHighlighter();
	return highlighter.codeToHtml(code, { lang, theme: 'github-dark' });
}

/** Equivalent of the escape_attribute filter (data-clipboard-text). */
export function escapeAttribute(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/'/g, '&apos;')
		.replace(/"/g, '&quot;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/\r\n/g, '&#13;')
		.replace(/[\r\n]/g, '&#13;');
}

/** Equivalent of the remove-href filter. */
export function removeHref(content: string): string {
	return content.replace(/href="#"/g, 'href="javascript:void(0)"');
}
