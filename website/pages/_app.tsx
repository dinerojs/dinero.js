import type { AppProps } from 'next/app';
import { MDXProvider } from '@mdx-js/react';

import { Alert, Parameters, Parameter, Signature } from '../components';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={{ Alert, Parameters, Parameter, Signature }}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}

export default MyApp;
