import type { Currency } from '@dinero.js/core';

/**
 * Renminbi (Chinese) yuan.
 */
export const CNY: Currency<number> = {
  code: 'CNY',
  base: 10,
  exponent: 2,
};
