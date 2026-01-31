if (__DEV__) {
  console.warn(
    '[@dinero.js/core] This package is deprecated. ' +
      'Please use "dinero.js" instead. ' +
      'See https://v2.dinerojs.com/getting-started/upgrade-guide for migration instructions.'
  );
}

export * from './api';
export * from './checks';
export * from './helpers';
export * from './divide';
export * from './types';
