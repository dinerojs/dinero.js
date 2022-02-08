import type { Currency } from '../../../types';

/**
 * Mexican peso.
 */
export const MXN: Currency<bigint> = {
  code: 'MXN',
  base: 10n,
  exponent: 2n,
};
