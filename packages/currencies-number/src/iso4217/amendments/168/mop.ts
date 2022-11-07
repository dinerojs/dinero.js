import type { Currency } from '@dinero.js/core';

/**
 * Macanese pataca.
 *
 * @public
 */
export const MOP: Currency<number> = {
  code: 'MOP',
  base: 10,
  exponent: 2,
};
