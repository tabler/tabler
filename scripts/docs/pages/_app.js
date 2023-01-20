import BaseLayout from '../layouts/BaseLayout'
import Example from '../components/Example'

import { MDXProvider } from '@mdx-js/react'

const components = {
  Example
}

function App({ Component, pageProps }) {
  return <>
	 <MDXProvider components={components}>
		<BaseLayout>
		  <Component {...pageProps} />
		</BaseLayout>
	 </MDXProvider>
  </>
}

export default App
