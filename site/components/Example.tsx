'use client';

import { useState } from 'react';
import clsx from 'clsx';



import { uiCdnUrl, uiUrl } from '@/config/site';





const previewHtml = (
  example,
  {
    background = '',
    vertical = false,
    scrollable = false,
    columns = 0,
    centered = false,
    vcentered = false,
    separated = false,
    vendors = false,
    overview = false,
    fullpage = false,
    plugins = [],
    libs = [],
  }: {
    vertical?: boolean
    background?: string
    scrollable?: boolean
    columns?: number
    centered?: boolean
    vcentered?: boolean
    separated?: boolean
    vendors?: boolean
    overview?: boolean
    fullpage?: boolean
    plugins?: string[]
    libs?: string[]
  }
) => {
  let assetsUrl = uiCdnUrl;

  if (process.env.TABLER_LOCAL) {
    assetsUrl = uiUrl;
  }

  let content = example;
  if (!fullpage) {
    content = `<main class="min-vh-100 ${vertical ? 'p-4' : 'py-4 px-4'}${
      centered
        ? ' d-flex justify-content-center align-items-center flex-wrap'
        : ''
    }${vcentered ? ' d-flex justify-content-center flex-column' : ''}">

			${
        columns
          ? `<div class="mx-auto w-100" style="max-width: ${columns * 20}rem">`
          : ''
      }
			${
        separated
          ? vertical
            ? '<div class="space-y">'
            : '<div class="space-x">'
          : ''
      }

			 ${example}

			${separated ? '</div>' : ''}
			${columns ? '</div>' : ''}
		 </main>`;
  }

  example = example
    .replace(/a href="[^"]+"/g, 'a href="javascript:void(0)"')
    .replace(/action="[^"]+"/g, 'action="javascript:void(0)"');

  return `<html lang="en">
	<head>
	<title>Example</title>
	<link rel="stylesheet" href="${assetsUrl}/dist/css/tabler.css">
	${
    plugins
      ? plugins.map(
          (plugin) =>
            `	<link rel="stylesheet" href="${assetsUrl}/dist/css/tabler-${plugin}.css" />`
        )
      : ''
  }
</head>
	<body class="h-100${background ? ` bg-${background}` : ''}${
    scrollable || fullpage ? ' auto-scroll' : ' no-scroll'
  }"${!background && ' style="--tblr-body-bg: #fbfcfd"'}>
		 ${content}
	${
    vendors
      ? `<link rel="stylesheet" href="${assetsUrl}/dist/css/tabler-vendors.css" />`
      : ''
  }
	<script src="${assetsUrl}/dist/js/tabler.js"></script>
	</body>
</html>`;
};

export default function Example({
  height = 200,
  vertical = false,
  background = '',
  scrollable = false,
  columns = 0,
  centered = false,
  vcentered = false,
  separated = false,
  vendors = false,
  overview = false,
  fullpage = false,
  plugins = '',
  resizable = false,
  libs = '',
  html,
}) {
  const [iframeHeight, setIframeHeight] = useState(height);
  const srcDoc = previewHtml(html, {
    vertical,
    background,
    scrollable,
    columns,
    centered,
    vcentered,
    separated,
    vendors,
    overview,
    fullpage,
    plugins: plugins ? plugins.split(',') : [],
    libs: libs ? libs.split(',') : [],
  });

  return (
    <div className="example">
      <iframe className={clsx('example-frame', {
        'example-frame-resizable': resizable,
      })} srcDoc={srcDoc} style={{ height: iframeHeight }} />
    </div>
  );
}
