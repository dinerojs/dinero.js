import type { Currency } from '../../../types';

/**
 * Unidad de Valor Real.
 */
export const COU: Currency<bigint> = {
  code: 'COU',
  base: 10n,
  exponent: 2n,
};
