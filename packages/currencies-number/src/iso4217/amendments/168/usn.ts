import type { Currency } from '@dinero.js/core';

/**
 * United States dollar (next day).
 *
 * @public
 */
export const USN: Currency<number> = {
  code: 'USN',
  base: 10,
  exponent: 2,
};
