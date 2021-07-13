import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en" className="spt-24">
        <Head>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="twitter:description" content="Create, calculate, and format money in JavaScript and TypeScript"/>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content="https://v2.dinerojs.com/open-graph.jpg"/>
          <meta property="og:image" content="https://v2.dinerojs.com/open-graph.jpg"/>
        </Head>
        <body className="sm:overflow-auto">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
