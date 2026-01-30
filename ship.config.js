/* eslint-disable import/no-commonjs, functional/no-expression-statement, functional/immutable-data */
module.exports = {
  monorepo: {
    mainVersionFile: 'package.json',
    packagesToBump: ['packages/*', 'website'],
    packagesToPublish: ['packages/*'],
  },
  publishCommand({ tag }) {
    return `npm publish --access public --tag ${tag}`;
  },
  getRegistryInfo() {
    // Skip Ship.js auth token setup - it escapes ${NPM_AUTH_TOKEN} incorrectly.
    // GitHub Actions already configures npm auth via actions/setup-node.
    return null;
  },
  installCommand() {
    return 'npm ci';
  },
  // Skip preparation if it contains only `chore` commits
  shouldPrepare({ releaseType, commitNumbersPerType }) {
    const { fix = 0 } = commitNumbersPerType;

    return releaseType !== 'patch' || fix !== 0;
  },
};
