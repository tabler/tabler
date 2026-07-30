import type { APIRoute } from 'astro';
import { site } from '@shared/lib/site';

export const prerender = true;

// (build.format 'file'), index pages collapse to their directory URL.
// Entry order mirrors the Eleventy `pages` collection: top-level pages first,
// then nested ones, each group in reverse-alphabetical order.
const pages = import.meta.glob('./**/*.astro');

const urls = Object.keys(pages)
	.map((file) => file.replace(/^\.\//, '').replace(/\.astro$/, '.html'))
	.sort((a, b) => {
		const depthA = a.split('/').length;
		const depthB = b.split('/').length;
		if (depthA !== depthB) return depthA - depthB;
		// byte-wise, descending — matches the Eleventy `pages` collection order
		return a < b ? 1 : -1;
	})
	.map((path) => {
		if (path === 'index.html') return '/';
		if (path.endsWith('/index.html')) return `/${path.slice(0, -'index.html'.length)}`;
		return `/${path}`;
	});

const escapeXml = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');

export const GET: APIRoute = () => {
	const environment = process.env.NODE_ENV || 'production';
	const baseUrl = environment !== 'development' ? site.previewUrl : '';
	// ISO 8601 UTC timestamp (+00:00 suffix)
	const lastModified = new Date().toISOString().replace(/\.\d{3}Z$/, '+00:00');
	const entries = urls
		.map(
			(url) => `<url>
	<loc>${escapeXml(`${baseUrl}${url}`)}</loc>
	<lastmod>${lastModified}</lastmod>
</url>`,
		)
		.join('\n');
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${entries}
</urlset>
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
		},
	});
};
