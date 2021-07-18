import type { AppProps } from 'next/app';
import { MDXProvider } from '@mdx-js/react';
import { NextSeo } from 'next-seo';

import 'tailwindcss/tailwind.css';
import '../styles.css'

import { MDXComponents } from '../components';

export const title = 'Dinero.js';
const description = 'Create, calculate, and format money in JavaScript and TypeScript.';
const twitter = '@frontstuff_io';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={MDXComponents}>
      <NextSeo
        title={title}
        description={description}
        canonical="https://dinerojs.com/"
        openGraph={{
          url: 'https://v2.dinerojs.com/docs',
          title,
          description,
          images: [
            {
              url: 'https://v2.dinerojs.com/open-graph.jpg',
              width: 2400,
              height: 1200,
              alt: `${description} | ${title}`,
            }
          ],
          site_name: title,
        }}
        twitter={{
          handle: twitter,
          site: twitter,
          cardType: 'summary_large_image',
        }}
      />
      <Component {...pageProps} />
    </MDXProvider>
  );
}

export default MyApp;
