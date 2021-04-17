/* eslint-disable import/no-commonjs, functional/immutable-data, functional/no-expression-statement */
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-proposal-nullish-coalescing-operator'
  ]
};
