module.exports = {
  '**/*.ts': () => 'npm run test:types',
  '!(website/)**/*.(js|mjs|ts)': (filenames) => `oxlint ${filenames.join(' ')}`,
  '!(website/)**/*.(js|mjs|jsx|ts|tsx)': (filenames) =>
    `npm run format -- ${filenames.join(' ')}`,
};
