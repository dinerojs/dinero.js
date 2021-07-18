import fs from 'fs';
import path from 'path';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { NextSeo } from 'next-seo';
import junk from 'junk';

import { Base } from '../../layouts';
import {
  getHeadings,
  getFiles,
  getFileBySlug,
  Heading,
  getBundleSize,
  Bundle,
} from '../../utils';
import { ArrowNarrowRightIcon, PencilIcon } from '../../components/icons';
import {
  ExternalLink,
  InlineCode,
  BundleSizeTable as InnerBundleSizeTable,
  BundleSize as InnerBundleSize,
} from '../../components';
import { init, intro } from '../../utils/console';
import { title } from '../_app';

type PageProps = {
  headings: Heading[];
  mdxSource: MDXRemoteSerializeResult;
  filePath: string[];
  bundleSize: Array<Bundle>;
  frontMatter:
    | {
        slug: string[];
        title: string;
        description: string;
        returns?: string;
      }
    | undefined;
};

export default function Docs({
  headings,
  mdxSource,
  frontMatter,
  filePath,
  bundleSize,
}: PageProps) {
  const githubLink = `https://github.com/dinerojs/dinero.js/blob/main/website/data/docs/${filePath.join(
    '/'
  )}.mdx`;

  useEffect(() => {
    window.init = init;
    console.log(...intro);
  }, []);

  function BundleSizeTable() {
    return <InnerBundleSizeTable bundles={bundleSize} />;
  }

  function BundleSize(...[props]: Parameters<typeof InnerBundleSize>) {
    return <InnerBundleSize {...props} bundles={bundleSize} />;
  }

  const description = frontMatter?.description;

  return (
    <Base headings={headings}>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, user-scalable=0"
        />
      </Head>
      <NextSeo
        title={`${frontMatter?.title} | ${title}`}
        description={description}
        openGraph={{ description }}
      />
      <>
        <div className="flex items-start mb-10 space-x-3 group">
          <div className="flex items-end flex-1 space-x-3">
            <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
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
          <ExternalLink
            href={githubLink}
            title="Edit this page on GitHub"
            className="w-5 h-5 mt-3 text-gray-400 transition-opacity duration-100 ease-in-out opacity-0 group-hover:opacity-100"
          >
            <PencilIcon />
          </ExternalLink>
        </div>
        <MDXRemote
          {...mdxSource}
          components={{ BundleSizeTable, BundleSize }}
        />
      </>
    </Base>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug || ['index'];
  const filePath = [slug].flat();
  const { source, mdxSource, frontMatter } = await getFileBySlug(
    'docs',
    filePath
  );
  const headings = getHeadings(source);

  const root = path.join(process.cwd(), '..', 'packages');
  const packages = fs.readdirSync(root).filter(junk.not);
  const bundleSize = await getBundleSize(packages, root);

  return { props: { headings, mdxSource, frontMatter, filePath, bundleSize } };
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
