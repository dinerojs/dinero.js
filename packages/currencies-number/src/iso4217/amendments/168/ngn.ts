import type { Currency } from '@dinero.js/core';

/**
 * Nigerian naira.
 *
 * @public
 */
export const NGN: Currency<number> = {
  code: 'NGN',
  base: 10,
  exponent: 2,
};
