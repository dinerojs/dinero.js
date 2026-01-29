/* eslint-disable import/no-commonjs, functional/no-expression-statement, functional/immutable-data */
module.exports = {
  monorepo: {
    mainVersionFile: 'package.json',
    packagesToBump: ['packages/*', 'website'],
    packagesToPublish: ['packages/*'],
  },
  installCommand() {
    return 'true'; // Skip install, use existing node_modules
  },
  publishCommand({ tag }) {
    return `npm publish --access public --tag ${tag}`;
  },
  // Skip preparation if it contains only `chore` commits
  shouldPrepare({ releaseType, commitNumbersPerType }) {
    const { fix = 0 } = commitNumbersPerType;

    return releaseType !== 'patch' || fix !== 0;
  },
};
