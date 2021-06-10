import type { AppProps } from 'next/app';
import { MDXProvider } from '@mdx-js/react';

import 'tailwindcss/tailwind.css';
import '../styles.css'

import { MDXComponents } from '../components';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={MDXComponents}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}

export default MyApp;
