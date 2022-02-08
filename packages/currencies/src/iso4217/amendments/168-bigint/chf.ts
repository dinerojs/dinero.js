import type { Currency } from '../../../types';

/**
 * Swiss franc.
 */
export const CHF: Currency<bigint> = {
  code: 'CHF',
  base: 10n,
  exponent: 2n,
};
