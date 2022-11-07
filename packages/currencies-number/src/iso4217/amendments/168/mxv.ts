import type { Currency } from '@dinero.js/core';

/**
 * Mexican Unidad de Inversion.
 *
 * @public
 */
export const MXV: Currency<number> = {
  code: 'MXV',
  base: 10,
  exponent: 2,
};
