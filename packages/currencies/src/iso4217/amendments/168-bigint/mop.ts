import type { Currency } from '../../../types';

/**
 * Macanese pataca.
 */
export const MOP: Currency<bigint> = {
  code: 'MOP',
  base: 10n,
  exponent: 2n,
};
