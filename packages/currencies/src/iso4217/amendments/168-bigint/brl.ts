import type { Currency } from '../../../types';

/**
 * Brazilian real.
 */
export const BRL: Currency<bigint> = {
  code: 'BRL',
  base: 10n,
  exponent: 2n,
};
