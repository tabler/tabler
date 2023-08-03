import { iconsInfo } from '@/config/tabler';
import uiConfig from '@/data/ui.json';

export const color = '#0054a6';

export const name = 'Tabler Dashboard UI Kit - Bootstrap Admin Panel';
export const description = 'Tabler comes with tons of well-designed components and features. Start your adventure with Tabler and make your dashboard great again. For free!';
export const creator = 'codecalm';

export const companyGithubUrl = 'https://github.com/tabler';
export const companyTwitterUrl = 'https://twitter.com/codecalm';
export const companyDribbbleUrl = 'https://dribbble.com/codecalm';

export const uiUrl = 'https://tabler.io';

export const uiVersion = uiConfig.version;
export const uiPackageName = '@tabler/core';
export const uiGithubUrl = 'https://github.com/tabler/tabler';
export const uiGithubReleasesUrl = 'https://github.com/tabler/tabler/releases';
export const uiInstallCmd = `npm install ${uiPackageName}`;
export const uiInstallCmdWithVersion = `npm install ${uiPackageName}@${uiVersion}`;
export const uiDemoUrl = 'https://preview.tabler.io';
export const uiPaymentsProviders = uiConfig.paymentsProviders;

export const sponsorsUrl = 'https://github.com/sponsors/codecalm';
export const statusUrl = 'https://status.tabler.io';
export const figmaPluginUrl = 'https://www.figma.com/community/plugin/1169807996149376642/Tabler-Icons';
export const figmaIconsUrl = 'https://www.figma.com/community/file/1042928259792594757';

export const uiDownloadUrl = `https://tabler.lemonsqueezy.com/checkout/buy/ac0d11e7-86fb-4fcf-ad9e-3d89e8dfbb24?embed=1&desc=0&discount=0&media=0`;
export const uiCdnUrl = `https://cdn.jsdelivr.net/npm/@tabler/core@${uiVersion}`;
export const uiCdnCSS = `${uiCdnUrl}${uiVersion}/dist/css/tabler.min.css`;
export const uiCdnJS = `${uiCdnUrl}${uiVersion}/dist/js/tabler.min.js`;

export const emailsCount = 54;
export const emailsPrice = 29;
export const emailsDownloadUrl = 'https://tabler.lemonsqueezy.com/checkout/buy/44fd4bdb-6ca0-49eb-b887-ebafd080c7bc?embed=1&desc=0&discount=0&media=0';
export const emailsSampleDownloadUrl = 'https://tabler.lemonsqueezy.com/checkout/buy/2b777bc1-09f3-4465-b2a5-50ba14dcbe49?embed=1&desc=0&discount=0&media=0';

export const componentsCount = 100; //getAllComponents().length
export const componentsRounded = (() => {
  return Math.floor(componentsCount / 10) * 10;
})();

export const blogEnabled = false;
export const changelogEnabled = false;

export const getAbsoluteURL = (path) => {
  const baseURL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:3010`;
  return baseURL + path;
};

export const iconsUrl =
  /*process.env.NODE_ENV === 'development'
		? 'http://icons.tabler.test:3010'
		: */ 'https://tabler-icons.io';
export const iconsVersion = iconsInfo.version;
export const iconsGithubUrl = 'https://github.com/tabler/tabler-icons';
export const iconsGithubDownloadUrl = ((version) => {
  return `https://github.com/tabler/tabler-icons/releases/download/v${version}/tabler-icons-${version}.zip`;
})(iconsVersion);

export const iconsCountRounded = (() => {
  return Math.floor(iconsInfo.count / 50) * 50;
})();

export const iconsCount = (() => {
  return iconsInfo.count;
})();

// export const iconsCategories = () => {
// 	return iconsConfig.icons
// 		.map((icon) => icon.category)
// 		.filter((value, index, self) => {
// 			return self.indexOf(value) === index && value !== ''
// 		})
// 		.sort()
// }

export const escapeHtml = (str) => {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
};

export const componentsUrl = process.env.NODE_ENV === 'development' ? 'http://components.tabler.test:3000' : 'https://components.tabler.io';

export const socialLinks = [
  { icon: 'brand-twitter', url: companyTwitterUrl, label: 'Follow us!' },
  { icon: 'brand-github', url: companyGithubUrl, label: 'Star us!' },
  { icon: 'brand-dribbble', url: companyDribbbleUrl, label: 'Like us!' },
];

export const footerMenu = [
  {
    title: 'Our products',
    items: [
      { title: 'UI Kit', route: '/' },
      { title: `${iconsCount} open source icons`, route: '/icons' },
      { title: 'Email templates', route: '/emails' },
      // { title: 'Pricing', route: '/pricing' },
    ],
  },
  {
    title: 'Support',
    items: [
      ...(blogEnabled ? [{ title: 'Blog', route: '/blog' }] : []),
      { title: 'Documentation', route: '/docs' },
      { title: 'Support', route: '/support' },
      { title: 'Guides', route: '/guides' },
      { title: 'Status', href: statusUrl },
      { title: 'License', route: '/license' },
    ],
  },
  {
    title: 'Tabler',
    items: [
      { title: 'About', route: '/about' },
      { title: 'Testimonials', route: '/testimonials' },
      { title: 'FAQ', route: '/docs/getting-started/faq' },
      ...(changelogEnabled ? [{ title: 'Changelog', route: '/changelog' }] : []),
      { title: 'Releases', href: uiGithubReleasesUrl },
      { title: 'Github', href: companyGithubUrl },
    ],
  },
];

export const colors = ['muted', 'red', 'pink', 'grape', 'violet', 'indigo', 'blue', 'cyan', 'teal', 'green', 'lime', 'yellow', 'orange'];

//
// Banner
//
export const banner = {
  show: true,
  id: 'tabler-icons-v2-2',
  text: '🎉 Tabler Icons v2.0 has been released: filled icons, new packages: React, Vue, Preact, Svelte, SolidJS and more!',
  link: {
    href: 'https://tabler-icons.io',
    text: 'Learn more →',
  },
};

