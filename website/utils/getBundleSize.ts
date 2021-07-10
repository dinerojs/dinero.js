import fs from 'fs';
import path from 'path';

import gzipSize from 'gzip-size';
import { file as brotliSize } from 'brotli-size';
import junk from 'junk';

export type Bundle = {
  name: string,
  pkg: string,
  development: number,
  minified: number,
  gzip: number,
  brotli: number,
};

const root = path.join(process.cwd(), '..', 'packages');
const packages = fs.readdirSync(root).filter(junk.not);
const bundles = ['index.development.js', 'index.production.js'];

export async function getBundleSize() {
  const filePaths = packages.map((pkg) => ({
    filePath: path.join(root, pkg),
    pkg,
  }));

  const sizes = await Promise.all(
    filePaths.map(async ({ filePath, pkg }) => {
      const pkgFilePath = path.join(filePath, 'package.json');
      const { name } = JSON.parse(
        fs.readFileSync(pkgFilePath, { encoding: 'utf-8' })
      );
      const [development, minified] = bundles.map((bundle) =>
        path.join(filePath, 'dist/umd', bundle)
      );
      const gzip = await gzipSize.file(minified);
      const brotli = await brotliSize(minified);

      return {
        name,
        pkg,
        development: fs.statSync(development).size,
        minified: fs.statSync(minified).size,
        gzip,
        brotli,
      };
    })
  );

  return sizes;
}
