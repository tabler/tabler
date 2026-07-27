import type { APIRoute } from 'astro';
import { site } from '@shared/lib/site';

export const prerender = true;

// Both page conventions are supported: `foo/index.mdx` and flat `foo.mdx`
// produce the same route (/foo/) with the default 'directory' build format.
const pages = import.meta.glob('./**/*.{astro,mdx}');

const urls = [
	...new Set(
		Object.keys(pages).map((file) => {
			const path = file
				.replace(/^\.\//, '')
				.replace(/\/?index\.(?:astro|mdx)$/, '')
				.replace(/\.(?:astro|mdx)$/, '');
			return path ? `/${path}/` : '/';
		}),
	),
]
	.sort((a, b) => {
		if (a === '/') return -1;
		if (b === '/') return 1;
		return a.localeCompare(b);
	});

const escapeXml = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');

export const GET: APIRoute = () => {
	const isDevelopment = process.env.NODE_ENV === 'development';
	const baseUrl = isDevelopment ? '' : site.docsUrl;
	const lastModified = new Date().toISOString();
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
