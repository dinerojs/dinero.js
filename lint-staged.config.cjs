/* eslint-disable import/no-commonjs, functional/immutable-data, functional/no-expression-statement */
module.exports = {
  '**/*.ts': () => 'npm run test:types',
  '!(website/)**/*.(js|mjs|ts|)': (filenames) =>
    `eslint --ext .js,.ts --fix ${filenames.join(' ')}`,
  'website/**/*.(js|jsx|ts|tsx)': () => `npm -w website run lint -- --fix`,
  '**/*.(js|mjs|jsx|ts|tsx)': (filenames) =>
    `npm run format -- ${filenames.join(' ')}`,
};
