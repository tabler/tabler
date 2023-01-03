import { renderToString } from 'react-dom/server'
import { useEffect, useRef, useState } from 'react'

const previewHtml = (example, {
  vertical = false
}) => {
  return `<html lang="en">
	<head>
	<title>Example</title>
	<script src="https://cdn.jsdelivr.net/npm/@tabler/core@latest/dist/js/tabler.min.js"></script>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/core@latest/dist/css/tabler.min.css">
</head>
	<body class="auto-scroll h-100" style="background: #fbfcfd">
		${vertical ? `
			<main class="p-4 space-y">
				${example}
			</main>
		` : `
			<main class="py-4 px-2 h-100 justify-content-center align-items-center flex-wrap space-x">
				${example}
			</main>
		`}
		
	</body>
</html>`
}

export default function Example ({
	 height = 200,
	 vertical = false,
	 children
}) {
  const [iframeHeight, setIframeHeight] = useState(height);
  const html = previewHtml(renderToString(children), {
	 vertical
  })

  return (
		<iframe
			 className="nx-block nx-w-full nx-border nx-rounded nx-mt-6"
			 srcDoc={html}
			 height={iframeHeight}
		/>
  )
}