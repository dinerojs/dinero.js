module.exports = {
  '**/*.ts': () => 'npm run test:types',
  '!(website/)**/*.(js|mjs|ts)': (filenames) =>
    `oxlint ${filenames.join(' ')}`,
  'website/**/*.(js|jsx|ts|tsx)': () => `npm -w website run lint -- --fix`,
  '**/*.(js|mjs|jsx|ts|tsx)': (filenames) =>
    `npm run format -- ${filenames.join(' ')}`,
};
