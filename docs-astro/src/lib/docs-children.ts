type DocsPageFrontmatter = {
	title?: string;
	description?: string;
	icon?: string;
	order?: number;
};

export type DocsChildPage = {
	url: string;
	title: string;
	description: string;
	icon?: string;
	order: number;
};

const pageFrontmatter = import.meta.glob('../pages/**/index.mdx', {
	eager: true,
	import: 'frontmatter',
}) as Record<string, DocsPageFrontmatter>;

function urlFromGlobPath(path: string): string {
	const rel = path.replace('../pages/', '').replace(/\/index\.mdx$/, '');
	return `/${rel}/`;
}

function normalizeUrl(url: string): string {
	const parts = url.split('/').filter(Boolean);
	return parts.length ? `/${parts.join('/')}/` : '/';
}

/** Direct child pages of a docs index URL (equivalent of Eleventy's collection-children). */
export function getDocsChildren(parentUrl: string): DocsChildPage[] {
	const parentParts = normalizeUrl(parentUrl).split('/').filter(Boolean);

	return Object.entries(pageFrontmatter)
		.map(([path, fm]) => {
			const pageUrl = urlFromGlobPath(path);
			const parts = pageUrl.split('/').filter(Boolean);
			const isDirectChild =
				parts.length === parentParts.length + 1 &&
				parts.slice(0, -1).join('/') === parentParts.join('/');

			if (!isDirectChild) return null;

			return {
				url: pageUrl,
				title: String(fm.title ?? ''),
				description: String(fm.description ?? ''),
				icon: fm.icon ? String(fm.icon) : undefined,
				order: Number(fm.order ?? 999),
			};
		})
		.filter((page): page is DocsChildPage => page !== null)
		.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}
