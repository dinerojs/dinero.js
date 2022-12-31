/* eslint-disable import/no-commonjs, functional/immutable-data, functional/no-expression-statement */
module.exports = {
  '**/*.ts': () => 'yarn test:types',
  '!(website/)**/*.(js|mjs|ts|)': (filenames) =>
    `eslint --ext .js,.ts --fix ${filenames.join(' ')}`,
  'website/**/*.(js|jsx|ts|tsx)': () => `yarn --cwd website lint --fix`,
  '**/*.(js|mjs|jsx|ts|tsx)': (filenames) =>
    `yarn format ${filenames.join(' ')}`,
};
