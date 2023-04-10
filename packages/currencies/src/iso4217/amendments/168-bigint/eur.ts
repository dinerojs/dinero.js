import type { Currency } from '../../../types';

/**
 * Euro.
 */
export const EUR: Currency<bigint> = {
  code: 'EUR',
  base: 10n,
  exponent: 2n,
};
