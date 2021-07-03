import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import { Base } from '../../layouts';
import { getHeadings, getFiles, getFileBySlug, Heading } from '../../utils';
import { ArrowNarrowRightIcon } from '../../components/icons';
import { InlineCode } from '../../components';

type PageProps = {
  headings: Heading[],
  mdxSource: MDXRemoteSerializeResult,
  frontMatter:
    | {
        slug: string[],
        title: string,
        description: string,
        returns?: string,
      }
    | undefined,
};

export default function Docs({ headings, mdxSource, frontMatter }: PageProps) {
  return (
    <Base headings={headings}>
      <Head>
        <title>{frontMatter?.title} | Dinero.js</title>
        <meta name="description" content={frontMatter?.description} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&amp;display=swap"
          rel="stylesheet"
        />
      </Head>
      <>
        <div className="flex items-end mb-10 space-x-3">
          <h1 className="text-4xl font-bold text-gray-800">
            {frontMatter?.title}
          </h1>
          {frontMatter?.returns && (
            <>
              <ArrowNarrowRightIcon className="h-4 mb-2 text-gray-400" />
              <InlineCode>
                <span className="inline-block mb-1.5">
                  {frontMatter.returns}
                </span>
              </InlineCode>
            </>
          )}
        </div>
        <MDXRemote {...mdxSource} />
      </>
    </Base>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug || ['index'];
  const { source, mdxSource, frontMatter } = await getFileBySlug(
    'docs',
    [slug].flat()
  );
  const headings = getHeadings(source);

  return { props: { headings, mdxSource, frontMatter } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getFiles('docs');
  const paths = pages.map((page) => {
    const slug = page.replace('.mdx', '').split('/').filter(Boolean);
    const [root] = slug;

    return { params: { slug: root === 'index' ? [] : slug } };
  });

  return {
    paths,
    fallback: false,
  };
};
