module.exports = {
  monorepo: {
    mainVersionFile: 'package.json',
    packagesToBump: ['packages/*', 'examples/*', 'website'],
    packagesToPublish: ['packages/*'],
  },
  publishCommand({ tag }) {
    return `npm publish --access public --tag ${tag}`;
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
