import type { Currency } from '../../../types';

/**
 * Russian ruble.
 */
export const RUB: Currency<bigint> = {
  code: 'RUB',
  base: 10n,
  exponent: 2n,
};
