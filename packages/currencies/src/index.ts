if (__DEV__) {
  console.warn(
    '[@dinero.js/currencies] This package is deprecated. ' +
      'Please use "dinero.js/currencies" instead. ' +
      'See https://v2.dinerojs.com/getting-started/upgrade-guide for migration instructions.'
  );
}

export * from './iso4217/amendments/168';
export * from './types';
