import type { Currency } from '../../../types';

/**
 * Israeli new shekel.
 */
export const ILS: Currency<bigint> = {
  code: 'ILS',
  base: 10n,
  exponent: 2n,
};
