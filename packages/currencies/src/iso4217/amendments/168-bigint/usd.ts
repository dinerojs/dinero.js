import type { Currency } from '../../../types';

/**
 * United States dollar.
 */
export const USD: Currency<bigint> = {
  code: 'USD',
  base: 10n,
  exponent: 2n,
};
