import BaseLayout from '@/layouts/BaseLayout'
import Example from '@/components/Example'

import { MDXProvider } from '@mdx-js/react'

const components = {
  Example
}

function App({ Component, pageProps }) {
  return <>
	 <BaseLayout>
		<MDXProvider components={components}>
		  <Component {...pageProps} />
		</MDXProvider>
	 </BaseLayout>
  </>
}

export default App
