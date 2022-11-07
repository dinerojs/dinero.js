import type { Currency } from '@dinero.js/core';

/**
 * Unidad de Valor Real.
 */
export const COU: Currency<number> = {
  code: 'COU',
  base: 10,
  exponent: 2,
};
