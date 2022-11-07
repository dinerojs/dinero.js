import type { Currency } from '@dinero.js/core';

/**
 * Hungarian forint.
 *
 * @public
 */
export const HUF: Currency<number> = {
  code: 'HUF',
  base: 10,
  exponent: 2,
};
