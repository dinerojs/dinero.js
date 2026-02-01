module.exports = {
  '**/*.ts': () => 'npm run test:types',
  '!(docs/)**/*.(js|mjs|ts)': (filenames) => `oxlint ${filenames.join(' ')}`,
  '!(docs/)**/*.(js|mjs|jsx|ts|tsx)': (filenames) =>
    `npm run format -- ${filenames.join(' ')}`,
};
