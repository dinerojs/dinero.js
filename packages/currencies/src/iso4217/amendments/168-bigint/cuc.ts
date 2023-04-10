import type { Currency } from '../../../types';

/**
 * Cuban convertible peso.
 */
export const CUC: Currency<bigint> = {
  code: 'CUC',
  base: 10n,
  exponent: 2n,
};
