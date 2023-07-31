import '@/styles/website.scss';

import { creator, description, name, uiUrl } from '@/config/site';
import PageProgress from '@/components/PageProgress';

export const metadata = {
  title: {
    default: name,
    template: `%s - ${name}`,
  },
  description: description,
  keywords: [
    'css',
    'html',
    'jekyll',
    'sass',
    'bootstrap',
    'modular',
    'html5',
    'dashboard',
    'sponsors',
    'uikit',
    'boilerplate-template',
    'scss',
    'admin-dashboard',
    'themes',
    'dashboards',
    'ui-kit',
    'adminpanel',
    'dashboard-templates',
    'bootstrap4-theme',
    'bootstrap5',
    'bootstrap',
  ],
  authors: [
    {
      name: creator,
      url: uiUrl,
    },
  ],
  creator: creator,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: uiUrl,
    siteName: name,
  },
  twitter: {
    card: 'summary_large_image',
    images: ['og.jpg'],
    creator: `@${creator}`,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {process.env.NODE_ENV !== 'development' && (
          <>
            <script defer data-api="/stats/api/event" data-domain="tabler.io,tabler" src="/stats/js/script.js" />
            <script>{'window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}'}</script>
          </>
        )}
      </head>
      <body className="body-gradient">
        <PageProgress />
        {children}
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <script src="https://assets.lemonsqueezy.com/lemon.js" defer />
      </body>
    </html>
  );
}
