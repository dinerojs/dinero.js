if (process.env.NODE_ENV !== 'production') {
  console.warn(
    '[@dinero.js/calculator-bigint] This package is deprecated. ' +
      'Please use "dinero.js/bigint" instead. ' +
      'See https://v2.dinerojs.com/getting-started/upgrade-guide for migration instructions.'
  );
}

export * from './api';
export * from './calculator';
