import { renderToString } from 'react-dom/server'
import { useEffect, useRef, useState } from 'react'

const previewHtml = (example, {
  vertical = false,
  background = false,
  scrollable = false,
  columns = false,
  centered = false,
  separated = false,
  plugins = []
}) => {
  let assetsUrl = 'https://cdn.jsdelivr.net/npm/@tabler/core@latest'

  if(process.env.TABLER_LOCAL) {
	 assetsUrl = 'http://localhost:3000'
  }

  return `<html lang="en">
	<head>
	<title>Example</title>
	<link rel="stylesheet" href="${assetsUrl}/dist/css/tabler.css">
	${plugins.map(plugin => `	<link rel="stylesheet" href="${assetsUrl}/dist/css/tabler-${plugin}.css" />`)}
</head>
	<body class="h-100${background ? ` bg-${background}` : ''}${scrollable ? ' auto-scroll' : ' no-scroll'}"${!background && ` style="background: #fbfcfd"`}>
		 <main class="min-vh-100 ${vertical ? `p-4` : `py-4 px-4`}${centered ? ` d-flex justify-content-center align-items-center flex-wrap` : ''}">
	
			${columns ? `<div class="mx-auto w-100" style="max-width: ${columns * 20}rem">` : ''}
			${separated ? (vertical ? `<div class="space-y">` : `<div class="space-x">`) : ''}
		
			 ${example}
		
			${separated ? '</div>' : ''}
			${columns ? '</div>' : ''}
		 </main>
	<script src="${assetsUrl}/dist/js/tabler.js"></script>
	</body>
</html>`
}

export default function Example({
  height = 200,
  vertical = false,
  background = null,
  scrollable = false,
  columns = false,
  centered = false,
  separated = false,
  plugins = [],
  children
}) {
  const [iframeHeight, setIframeHeight] = useState(height)
  const html = previewHtml(renderToString(children), {
	 vertical,
	 background,
	 scrollable,
	 columns,
	 centered,
	 separated,
	 plugins
  })

  return (
		<iframe
			 className="nx-block nx-w-full nx-border nx-rounded nx-mt-6"
			 srcDoc={html}
			 height={iframeHeight}
		/>
  )
}