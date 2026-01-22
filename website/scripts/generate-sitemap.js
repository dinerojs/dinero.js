const fs = require('fs');
const path = require('path');

const globby = require('globby');
const prettier = require('prettier');

(async () => {
  const prettierConfig = await prettier.resolveConfig('../.prettierrc');

  const filePath = path.join(process.cwd(), 'data', 'docs');
  const files = await globby(filePath);
  const pages = files.map((file) => file.replace(filePath, ''));

  const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((page) => {
            const path = page
              .replace('pages', '')
              .replace('.js', '')
              .replace('.mdx', '');
            const route = path === '/index' ? '' : path;

            return `
                    <url>
                      <loc>${`https://v2.dinerojs.com/docs${route}`}</loc>
                    </url>
                `;
          })
          .join('')}
      </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  fs.writeFileSync('public/sitemap.xml', formatted);
})();
