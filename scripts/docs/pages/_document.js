import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
	 const initialProps = await NextDocument.getInitialProps(ctx)
	 return { ...initialProps }
  }

  render() {
	 return (
		  <Html lang="en">
			 <Head>
				<>
				</>
			 </Head>
			 <body>
			 <Main />
			 <NextScript />
			 <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
			 <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/core@latest/dist/css/tabler.min.css" />
			 </body>
		  </Html>
	 )
  }
}
