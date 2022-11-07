import type { Currency } from '@dinero.js/core';

/**
 * Serbian dinar.
 *
 * @public
 */
export const RSD: Currency<number> = {
  code: 'RSD',
  base: 10,
  exponent: 2,
};
