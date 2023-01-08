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

  example = example.replace(/href="#"/g, 'href="javascript:void(0)"')

  return `<html lang="en">
	<head>
	<title>Example</title>
	<link rel="stylesheet" href="${assetsUrl}/dist/css/tabler.css">
	${plugins.map(plugin => `	<link rel="stylesheet" href="${assetsUrl}/dist/css/tabler-${plugin}.css" />`)}
</head>
	<body class="h-100 d-flex${background ? ` bg-${background}` : ''}${scrollable ? ' auto-scroll' : ' no-scroll'}"${!background && ` style="background: #fbfcfd"`}>
		 <main class="my-auto w-100${vertical ? ` p-4` : ` py-4 px-4`}${centered ? ` d-flex justify-content-center align-items-center flex-wrap` : ''}${separated ? (vertical ? ` space-y` : ` space-x`) : ''}${columns ? ` mx-auto w-100` : ''}"${columns ? ` style="max-width: ${columns * 22}rem"` : ''}>
	
			
			 ${example}
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