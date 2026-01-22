import fs from 'fs';
import path from 'path';
import { brotliCompressSync } from 'zlib';

import gzipSize from 'gzip-size';

export type Bundle = {
  name: string;
  pkg: string;
  development: number;
  minified: number;
  gzip: number;
  brotli: number;
};

export async function getBundleSize(packages: string[], root: string) {
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
      // ReScript packages may output different file names
      const possiblePaths = [
        path.join(filePath, 'lib/es6/src', 'index.res.js'), // For packages with .res files
        path.join(filePath, 'lib/es6/src', 'index.js')      // For packages with .js files
      ];
      
      const bundlePath = possiblePaths.find(p => {
        try {
          fs.accessSync(p);
          return true;
        } catch {
          return false;
        }
      });

      if (!bundlePath) {
        throw new Error(`Could not find index file for package ${pkg}`);
      }
      const gzip = await gzipSize.file(bundlePath);
      const fileContent = fs.readFileSync(bundlePath);
      const brotli = brotliCompressSync(fileContent).length;
      const size = fs.statSync(bundlePath).size;

      return {
        name,
        pkg,
        development: size, // ReScript outputs single optimized version
        minified: size,    // Same file for both development and production
        gzip,
        brotli,
      };
    })
  );

  return sizes;
}
