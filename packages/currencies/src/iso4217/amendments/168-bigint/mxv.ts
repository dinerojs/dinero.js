import type { Currency } from '../../../types';

/**
 * Mexican Unidad de Inversion.
 */
export const MXV: Currency<bigint> = {
  code: 'MXV',
  base: 10n,
  exponent: 2n,
};
