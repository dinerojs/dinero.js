import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import { getFiles, getFileBySlug } from '../../utils/mdx';
import { Base } from '../../layouts';

type PageProps = {
  mdxSource: MDXRemoteSerializeResult;
  frontMatter: {
    slug: string[];
    title: string;
    description: string;
  }
}

export default function Docs({ mdxSource, frontMatter }: PageProps) {
  return (
    <Base>
      <Head>
        <title>{frontMatter.title} | Dinero.js</title>
        <meta name="description" content={frontMatter.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <h1>{frontMatter.title}</h1>
        <MDXRemote
          {...mdxSource}
        />
      </>
    </Base>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = await getFileBySlug('docs', params.slug);

  return { props: page };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getFiles('docs');
  const slugs = pages.map((page) => page.replace('.mdx', '').split('/').filter(Boolean));

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false
  };
};
