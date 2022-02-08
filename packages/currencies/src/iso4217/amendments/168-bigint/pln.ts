import type { Currency } from '../../../types';

/**
 * Polish złoty.
 */
export const PLN: Currency<bigint> = {
  code: 'PLN',
  base: 10n,
  exponent: 2n,
};
