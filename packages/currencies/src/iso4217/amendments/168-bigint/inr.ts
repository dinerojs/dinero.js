import type { Currency } from '../../../types';

/**
 * Indian rupee.
 */
export const INR: Currency<bigint> = {
  code: 'INR',
  base: 10n,
  exponent: 2n,
};
