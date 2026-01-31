if (process.env.NODE_ENV !== 'production') {
  console.warn(
    '[@dinero.js/calculator-number] This package is deprecated. ' +
      'The number calculator is now built into "dinero.js". ' +
      'See https://v2.dinerojs.com/getting-started/upgrade-guide for migration instructions.'
  );
}

export * from './api';
export * from './calculator';
