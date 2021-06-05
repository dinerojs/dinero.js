import GithubSlugger from 'github-slugger';

export type Heading = {
  text: string;
  level: number;
  slug: string;
};

export function getHeadings(source: string): Heading[] {
  const slugger = new GithubSlugger();

  const headingLines = source.split('\n').filter((line) => {
    return line.match(/^###*\s/);
  });

  return headingLines.map((raw) => {
    const text = raw.replace(/^###*\s/, '');
    const level = raw.slice(0, 3) === '###' ? 3 : 2;
    const slug = slugger.slug(text);

    return { text, level, slug };
  });
}
