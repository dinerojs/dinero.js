import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import { Base } from '../../layouts';
import { getHeadings, getFiles, getFileBySlug, Heading } from '../../utils';

type PageProps = {
  headings: Heading[];
  mdxSource: MDXRemoteSerializeResult;
  frontMatter: {
    slug: string[];
    title: string;
    description: string;
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
        <h1>{frontMatter.title}</h1>
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
