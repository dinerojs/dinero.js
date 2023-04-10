import type { Currency } from '../../../types';

/**
 * Swedish krona.
 */
export const SEK: Currency<bigint> = {
  code: 'SEK',
  base: 10n,
  exponent: 2n,
};
