import type { Currency } from '../../../types';

/**
 * United States dollar (next day).
 */
export const USN: Currency<bigint> = {
  code: 'USN',
  base: 10n,
  exponent: 2n,
};
