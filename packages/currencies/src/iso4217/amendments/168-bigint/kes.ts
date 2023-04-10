import type { Currency } from '../../../types';

/**
 * Kenyan shilling.
 */
export const KES: Currency<bigint> = {
  code: 'KES',
  base: 10n,
  exponent: 2n,
};
