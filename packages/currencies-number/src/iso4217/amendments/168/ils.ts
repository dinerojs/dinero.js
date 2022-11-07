import type { Currency } from '@dinero.js/core';

/**
 * Israeli new shekel.
 *
 * @public
 */
export const ILS: Currency<number> = {
  code: 'ILS',
  base: 10,
  exponent: 2,
};
