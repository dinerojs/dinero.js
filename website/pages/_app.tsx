import type { AppProps } from 'next/app';
import { MDXProvider } from '@mdx-js/react';

import '../styles.css'

import { Alert, Parameters, Panel, Parameter, Signature } from '../components';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={{ Alert, Panel, Parameters, Parameter, Signature }}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}

export default MyApp;
