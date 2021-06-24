import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import { Base } from '../../layouts';
import { getHeadings, getFiles, getFileBySlug, Heading } from '../../utils';
import { ArrowNarrowRightIcon } from '../../components/icons';

type PageProps = {
  headings: Heading[];
  mdxSource: MDXRemoteSerializeResult;
  frontMatter: {
    slug: string[];
    title: string;
    description: string;
    returns?: string;
  };
};

export default function Docs({ headings, mdxSource, frontMatter }: PageProps) {
  return (
    <Base headings={headings}>
      <Head>
        <title>{frontMatter.title} | Dinero.js</title>
        <meta name="description" content={frontMatter.description} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&amp;display=swap" rel="stylesheet" />
      </Head>
      <>
        <div className="flex items-end mb-10 space-x-3">
          <h1 className="text-4xl font-bold text-gray-800">
            {frontMatter.title}
          </h1>
          {frontMatter.returns && <><ArrowNarrowRightIcon className="h-4 mb-2 text-gray-400" /><code className="mb-1">{frontMatter.returns}</code></>}
        </div>
        <MDXRemote {...mdxSource} />
      </>
    </Base>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug || ['index'];
  const { source, mdxSource, frontMatter } = await getFileBySlug('docs', [slug].flat());
  const headings = getHeadings(source);

  return { props: { headings, mdxSource, frontMatter } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getFiles('docs');
  const slugs = pages.map((page) =>
    page.replace('.mdx', '').split('/').filter(Boolean)
  );

  return {
    paths: slugs
      .map((slug) => {
        const [root] = slug;

        return { params: { slug: root === 'index' ? [] : slug } }
      }),
    fallback: true,
  };
};
