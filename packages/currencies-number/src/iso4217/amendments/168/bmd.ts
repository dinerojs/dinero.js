import type { Currency } from '@dinero.js/core';

/**
 * Bermudian dollar.
 *
 * @public
 */
export const BMD: Currency<number> = {
  code: 'BMD',
  base: 10,
  exponent: 2,
};
