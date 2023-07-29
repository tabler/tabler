import Head from 'next/head';
import { uiUrl } from '@/config/site';
import { useRouter } from 'next/router';

export default function Title({ meta = {
  title: '',
  image: '',
  description: '',
}}) {
  const router = useRouter(),
    path = router.pathname;

  let section = '';

  if (path.match(/\/docs/)) {
    section = 'Documentation';
  }

  const title = meta.title
    ? `${meta.title} - ${section ? `${section} - ` : ''}Tabler`
    : 'Tabler: Premium dashboard template with responsive and high quality UI';

  const image = `${meta.image ? meta.image : `${uiUrl}/img/tabler/og.png?2`}`;

  const description = meta.description
    ? meta.description
    : 'Tabler comes with tons of well-designed components and features. Start your adventure with Tabler and make your dashboard great again. For free!';

  const canonical = `${uiUrl}${(path === '/' ? '' : path).split('?')[0]}`;

  return (
    <Head>
      <link rel="canonical" href={canonical} />

      <title key="title">{title}</title>
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:url" property="og:url" content={canonical} />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="twitter:title" name="twitter:title" content={title} />

      <meta key="description" name="description" content={description} />
      <meta key="og:description" property="og:description" content={description} />

      <meta key="og:image" property="og:image" content={`${image}`} />
      <meta key="twitter:image" name="twitter:image" content={`${image}`} />

      <meta key="og:image:width" property="og:image:width" content="1200" />
      <meta key="og:image:height" property="og:image:height" content="630" />

      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:site" name="twitter:site" content="@codecalm" />
      <meta key="twitter:creator" name="twitter:creator" content="@codecalm" />

      <link rel="preconnect" href="https://rsms.me/" />
      <link rel="preconnect" href="https://vitals.vercel-insights.com/" />

      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="48x48" href="/favicons/favicon-48x48.png" />
      <link rel="manifest" href="/favicons/manifest.json" />
      <meta name="theme-color" content="#fff" />
      <meta name="application-name" content="tabler" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon-180x180.png" />
      <meta name="msapplication-TileColor" content="#206bc4" />

      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta httpEquiv="pragma" content="no-cache" />
    </Head>
  );
}
