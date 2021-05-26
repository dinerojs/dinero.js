import type { AppProps } from 'next/app';
import { MDXProvider } from '@mdx-js/react';

import { Alert } from '../components';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={{ Alert }}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}

export default MyApp;
