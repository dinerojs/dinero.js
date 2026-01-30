/* eslint-disable import/no-commonjs, functional/no-expression-statement, functional/immutable-data */
module.exports = {
  monorepo: {
    mainVersionFile: 'package.json',
    packagesToBump: ['packages/*', 'website'],
    packagesToPublish: ['packages/*'],
  },
  installCommand() {
    return null; // Skip install in CI (already done)
  },
  buildCommand() {
    return 'yarn build'; // Use yarn build for ReScript compilation
  },
  publishCommand({ tag }) {
    return `yarn publish --access public --tag ${tag}`;
  },
  // Skip preparation if it contains only `chore` commits
  shouldPrepare({ releaseType, commitNumbersPerType }) {
    const { fix = 0 } = commitNumbersPerType;

    return releaseType !== 'patch' || fix !== 0;
  },
};
