import type { Currency } from '../../../types';

/**
 * Hong Kong dollar.
 */
export const HKD: Currency<bigint> = {
  code: 'HKD',
  base: 10n,
  exponent: 2n,
};
