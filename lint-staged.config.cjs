module.exports = {
  'packages/**/*.ts': () => 'npx tsc -p tsconfig.json --noEmit',
  '!(docs/)**/*.(js|mjs|ts)': (filenames) => `oxlint ${filenames.join(' ')}`,
  '!(docs/)**/*.(js|mjs|jsx|ts|tsx)': (filenames) =>
    `npm run format -- ${filenames.join(' ')}`,
};
