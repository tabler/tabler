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

const pageModules = import.meta.glob('../pages/**/index.mdx', { eager: true });

function getFrontmatter(mod: unknown): DocsPageFrontmatter | null {
	if (!mod || typeof mod !== 'object') return null;

	if ('frontmatter' in mod && mod.frontmatter && typeof mod.frontmatter === 'object') {
		return mod.frontmatter as DocsPageFrontmatter;
	}

	return null;
}

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

	return Object.entries(pageModules)
		.map(([path, mod]) => {
			const pageUrl = urlFromGlobPath(path);
			const parts = pageUrl.split('/').filter(Boolean);
			const isDirectChild =
				parts.length === parentParts.length + 1 &&
				parts.slice(0, -1).join('/') === parentParts.join('/');

			if (!isDirectChild) return null;

			const fm = getFrontmatter(mod);
			if (!fm?.title) return null;

			return {
				url: pageUrl,
				title: String(fm.title),
				description: String(fm.description ?? ''),
				icon: fm.icon ? String(fm.icon) : undefined,
				order: Number(fm.order ?? 999),
			};
		})
		.filter((page): page is DocsChildPage => page !== null)
		.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}
