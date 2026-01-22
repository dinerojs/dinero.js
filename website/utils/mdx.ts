import fs from 'fs';
import path from 'path';
import globby from 'globby';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import mdxPrism from 'mdx-prism';

const root = process.cwd();
const base = path.join(root, 'data');

export async function getFiles(type: string) {
  const filePath = path.join(base, type);
  const files = await globby(filePath);

  return files.map((file) => file.replace(filePath, ''));
}

export async function getFileBySlug(type: string, filePath: string[]) {
  const source = fs.readFileSync(
    path.join(base, type, `${filePath.join('/')}.mdx`),
    'utf8'
  );

  const { data, content } = matter(source);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        require('remark-autolink-headings'),
        require('remark-slug'),
        require('remark-code-titles'),
      ],
      rehypePlugins: [mdxPrism],
    },
  });

  return {
    source,
    mdxSource,
    frontMatter: {
      slug: filePath,
      ...data,
    },
  };
}
