import type { Currency } from '@dinero.js/core';

/**
 * Euro.
 *
 * @public
 */
export const EUR: Currency<number> = {
  code: 'EUR',
  base: 10,
  exponent: 2,
};
