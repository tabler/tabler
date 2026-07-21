import type { APIRoute } from 'astro';
import { site } from '../lib/site';

export const prerender = true;

export const GET: APIRoute = () => {
	const isProduction = (process.env.NODE_ENV || 'production') === 'production';
	const sitemapUrl = `${isProduction ? site.docsUrl : ''}/sitemap.xml`;
	const body = `Sitemap: ${sitemapUrl}

User-agent: *
Disallow:${isProduction ? '' : ' /'}
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
		},
	});
};
