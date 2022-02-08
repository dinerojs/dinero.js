import type { Currency } from '../../../types';

/**
 * Pound sterling.
 */
export const GBP: Currency<bigint> = {
  code: 'GBP',
  base: 10n,
  exponent: 2n,
};
