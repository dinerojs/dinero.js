import type { Currency } from '../../../types';

/**
 * Czech koruna.
 */
export const CZK: Currency<bigint> = {
  code: 'CZK',
  base: 10n,
  exponent: 2n,
};
