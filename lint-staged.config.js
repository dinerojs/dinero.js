/* eslint-disable import/no-commonjs, functional/immutable-data, functional/no-expression-statement */
module.exports = {
  '**/*.ts': () => 'yarn test:types',
  '**/*.(ts|js)': (filenames) => [
    `eslint --ext .js,.ts --fix ${filenames.join(' ')}`,
    `yarn format ${filenames.join(' ')}`,
  ],
};
