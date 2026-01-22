import GithubSlugger from 'github-slugger';
import remark from 'remark';
import strip from 'strip-markdown';

export type Heading = {
  text: string;
  level: number;
  slug: string;
};

export function getHeadings(source: string): Heading[] {
  const slugger = new GithubSlugger();
  const regex = /^#{2,3}\s/;

  const headingLines = source.split('\n').filter((line) => {
    return line.match(regex);
  });

  return headingLines.map((raw) => {
    let text = '';

    remark()
      .use(strip)
      .process(raw.replace(regex, ''), (err, { contents }) => {
        if (err) throw err;
        text = String(contents);
      });

    const level = raw.slice(0, 3) === '###' ? 3 : 2;
    const slug = slugger.slug(text);

    return { text, level, slug };
  });
}
