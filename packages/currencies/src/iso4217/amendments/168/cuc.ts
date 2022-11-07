import type { Currency } from '@dinero.js/core';

/**
 * Cuban convertible peso.
 */
export const CUC: Currency<number> = {
  code: 'CUC',
  base: 10,
  exponent: 2,
};
