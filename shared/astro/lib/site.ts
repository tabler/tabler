import corePackage from '@tabler/core/package.json';

const version = corePackage.version;

export const site = {
	title: 'Tabler',
	version,
	docsUrl: 'https://docs.tabler.io',
	cdnUrl: `https://cdn.jsdelivr.net/npm/@tabler/core@${version}`,
	// site.email — used by parts/modals/success.html ({{ site.email }}). Verified
	// against the reference build (support@tabler.io).
	email: 'support@tabler.io',
	previewUrl: 'https://preview.tabler.io',
	githubUrl: 'https://github.com/tabler/tabler',
	githubSponsorsUrl: 'https://github.com/sponsors/codecalm',
	icons: { link: 'https://tabler.io/icons' },
	// site.emails — used by preview/pages/emails.html. From shared/data/site.json.
	// `count` is intentionally absent in the source data (site.emails.count is
	// undefined → renders empty, producing "Buy  emails" with a double space).
	emails: { price: '$29', buy_link: 'https://r.tabler.io/buy-emails', count: '' },
	// dev key used in the development build (Liquid: site.googleMapsDevKey)
	googleMapsDevKey: 'AIzaSyCL-BY8-sq12m0S9H-S_yMqDmcun3A9znw',
	// From shared/data/icons-info.json.
	iconsCount: 5986,
	descriptionShort: 'Premium and Open Source dashboard template with responsive and high quality UI.',
	description:
		'Tabler is packed with beautifully crafted components and powerful features. Jump in and start building a stunning dashboard — all for free!',
	themeColor: '#066fd1',
	cssPlugins: ['flags', 'socials', 'payments', 'vendors', 'marketing', 'themes'],
	themeColors: [
		'blue',
		'azure',
		'indigo',
		'purple',
		'pink',
		'red',
		'orange',
		'yellow',
		'lime',
		'green',
		'teal',
		'cyan',
	],
	themeFonts: ['sans-serif', 'serif', 'monospace', 'comic'],
	themeBases: ['slate', 'gray', 'zinc', 'neutral', 'stone'],
	themeRadiuses: ['0', '0.5', '1', '1.5', '2'],
};
