import { MDXProvider } from '@mdx-js/react';
import { load, trackPageview } from 'fathom-client';
import { NextSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import 'tailwindcss/tailwind.css';
import '../styles.css';

import { MDXComponents } from '../components';

export const title = 'Dinero.js';
const description =
  'Create, calculate, and format money in JavaScript and TypeScript.';
const twitter = '@frontstuff_io';

function MyApp({ Component, pageProps }: AppProps) {
  const { events } = useRouter();

  useEffect(() => {
    load('PSUFDDGC', {
      url: 'https://heavenly-impressive.dinerojs.com/script.js',
      includedDomains: ['v2.dinerojs.com'],
      spa: 'auto',
    });

    function onRouteChangeComplete(url: string) {
      trackPageview({
        url: `https://v2.dinerojs.com${url}`,
      });
    }

    events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      events.off('routeChangeComplete', onRouteChangeComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            },
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
